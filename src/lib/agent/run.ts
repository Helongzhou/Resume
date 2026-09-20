import { streamDemoEvents } from "@/lib/agent/demo";
import { isLiveLlmEnabled } from "@/lib/agent/quota";
import { agentToolDefinitions, executeTool } from "@/lib/agent/tools";
import type { ChatMessage, SseEvent } from "@/lib/agent/types";
import type { Locale } from "@/i18n/routing";

type LlmMessage =
  | { role: "system" | "user" | "assistant"; content: string }
  | {
      role: "assistant";
      content: string | null;
      tool_calls: Array<{
        id: string;
        type: "function";
        function: { name: string; arguments: string };
      }>;
    }
  | { role: "tool"; tool_call_id: string; content: string };

function llmConfig() {
  return {
    apiKey: process.env.LLM_API_KEY || "",
    baseUrl: (process.env.LLM_BASE_URL || "https://api.deepseek.com").replace(
      /\/$/,
      "",
    ),
    model: process.env.LLM_MODEL || "deepseek-chat",
  };
}

function systemPrompt(locale: Locale) {
  if (locale === "zh") {
    return `你是周何龙作品集里的「招聘匹配 Agent」。知识库来自作品集站点内容与《全栈简历》结构化摘录（不含手机号与薪资）。
你必须通过工具检索后再回答，禁止编造未检索到的经历。
可用工具：search_experience、search_projects、search_skills、match_jd_keywords、draft_fit_report。
回答要求：专业、结构化、引用工具结果中的证据；不确定就说明「站内/简历资料未覆盖」。
最终用中文回答。`;
  }
  return `You are the hiring-fit Agent on Helong Zhou's portfolio. Knowledge comes from the site plus structured excerpts of his full-stack resume (phone/salary excluded).
Always use tools before answering. Never invent experience.
Tools: search_experience, search_projects, search_skills, match_jd_keywords, draft_fit_report.
Be professional and structured; cite tool evidence; if unknown, say on-site/resume data does not cover it.
Answer in English.`;
}

async function callChat(messages: LlmMessage[], toolChoice: "auto" | "none") {
  const { apiKey, baseUrl, model } = llmConfig();
  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      tools: agentToolDefinitions,
      tool_choice: toolChoice,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM error ${res.status}: ${text.slice(0, 300)}`);
  }

  return (await res.json()) as {
    choices: Array<{
      message: {
        content?: string | null;
        tool_calls?: Array<{
          id: string;
          type: "function";
          function: { name: string; arguments: string };
        }>;
      };
    }>;
  };
}

export async function* runAgent(options: {
  locale: Locale;
  messages: ChatMessage[];
  scenario?: string;
}): AsyncGenerator<SseEvent> {
  const { locale, messages, scenario = "jd_match" } = options;

  if (!isLiveLlmEnabled()) {
    yield {
      type: "status",
      phase: "demo",
      detail:
        locale === "zh"
          ? "未配置 LLM_API_KEY，播放录制 Agent 轨迹"
          : "No LLM_API_KEY — playing recorded agent trajectory",
    };
    yield* streamDemoEvents(locale, scenario);
    return;
  }

  yield {
    type: "status",
    phase: "planning",
    detail: locale === "zh" ? "开始工具编排" : "Starting tool orchestration",
  };

  const history: LlmMessage[] = [
    { role: "system", content: systemPrompt(locale) },
    ...messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content })),
  ];

  for (let step = 0; step < 5; step += 1) {
    const data = await callChat(history, "auto");
    const message = data.choices[0]?.message;
    if (!message) throw new Error("Empty LLM response");

    const toolCalls = message.tool_calls || [];
    if (toolCalls.length > 0) {
      history.push({
        role: "assistant",
        content: message.content ?? null,
        tool_calls: toolCalls,
      });

      for (const call of toolCalls) {
        const name = call.function.name;
        const args = call.function.arguments || "{}";
        let parsed: Record<string, unknown> = {};
        try {
          parsed = JSON.parse(args) as Record<string, unknown>;
        } catch {
          parsed = {};
        }

        yield { type: "tool", name, state: "start", args: parsed };
        const result = executeTool(name, args, locale);
        yield {
          type: "tool",
          name,
          state: "done",
          args: parsed,
          result: result.slice(0, 1200),
        };
        history.push({
          role: "tool",
          tool_call_id: call.id,
          content: result,
        });
      }
      continue;
    }

    const content = message.content || "";
    yield {
      type: "status",
      phase: "answering",
      detail: locale === "zh" ? "生成最终回答" : "Writing final answer",
    };
    const chunkSize = Math.max(12, Math.floor(content.length / 30));
    for (let i = 0; i < content.length; i += chunkSize) {
      yield { type: "token", text: content.slice(i, i + chunkSize) };
      await new Promise((r) => setTimeout(r, 12));
    }
    yield { type: "done" };
    return;
  }

  yield {
    type: "error",
    message:
      locale === "zh"
        ? "工具调用轮次过多，已停止"
        : "Too many tool iterations, stopped",
  };
}
