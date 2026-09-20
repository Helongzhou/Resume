import {
  consumeQuota,
  getClientIp,
  getQuotaSnapshot,
  isLiveLlmEnabled,
} from "@/lib/agent/quota";
import { runAgent } from "@/lib/agent/run";
import type { AgentRequestBody, SseEvent } from "@/lib/agent/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sseEncode(event: SseEvent) {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(request: Request) {
  let body: AgentRequestBody;
  try {
    body = (await request.json()) as AgentRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const locale = body.locale === "en" ? "en" : "zh";
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content?.trim()) {
    return Response.json({ error: "Empty message" }, { status: 400 });
  }
  if (lastUser.content.length > 4000) {
    return Response.json({ error: "Message too long" }, { status: 400 });
  }

  const ip = getClientIp(request);
  const live = isLiveLlmEnabled();

  // Demo mode still counts toward daily caps to prevent abuse of the endpoint.
  const consumed = await consumeQuota(ip);
  if (!consumed.ok) {
    const message =
      consumed.reason === "ip"
        ? locale === "zh"
          ? "今日该 IP 调用已达上限"
          : "Daily IP quota exceeded"
        : locale === "zh"
          ? "今日全站调用已达上限"
          : "Daily global quota exceeded";

    return Response.json(
      { error: message, quota: consumed.quota },
      { status: 429 },
    );
  }

  const scenario = body.scenario || "jd_match";
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const push = (event: SseEvent) => {
        controller.enqueue(encoder.encode(sseEncode(event)));
      };

      try {
        push({ type: "quota", quota: consumed.quota });
        if (!live) {
          push({
            type: "status",
            phase: "demo",
            detail:
              locale === "zh"
                ? "演示模式（未配置 LLM_API_KEY）"
                : "Demo mode (LLM_API_KEY missing)",
          });
        }
        for await (const event of runAgent({
          locale,
          messages: messages.map((m) => ({
            role: m.role,
            content: String(m.content || "").slice(0, 4000),
          })),
          scenario,
        })) {
          push(event);
        }
      } catch (error) {
        push({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : locale === "zh"
                ? "Agent 运行失败"
                : "Agent failed",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const quota = await getQuotaSnapshot(ip);
  return Response.json(quota);
}
