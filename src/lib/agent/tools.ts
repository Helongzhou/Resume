import { searchKnowledge } from "@/lib/agent/knowledge";
import type { AgentToolName } from "@/lib/agent/types";
import type { Locale } from "@/i18n/routing";

export const agentToolDefinitions = [
  {
    type: "function" as const,
    function: {
      name: "search_experience" satisfies AgentToolName,
      description:
        "Search Helong Zhou's work experience and company context by company, role, industry, or keyword.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "search_projects" satisfies AgentToolName,
      description:
        "Search portfolio and resume project case studies (FBE, creator platform, Ksher, Pagoda, Shengxue, etc.).",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "search_skills" satisfies AgentToolName,
      description:
        "Search skills, tech stack, education, and profile strengths from the resume knowledge base.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "match_jd_keywords" satisfies AgentToolName,
      description:
        "Extract key requirements from a job description and map them to resume evidence.",
      parameters: {
        type: "object",
        properties: {
          jd: { type: "string", description: "Job description text" },
        },
        required: ["jd"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "draft_fit_report" satisfies AgentToolName,
      description:
        "Draft a structured fit report after tools have gathered evidence.",
      parameters: {
        type: "object",
        properties: {
          role_title: { type: "string" },
          strengths: {
            type: "array",
            items: { type: "string" },
          },
          gaps: {
            type: "array",
            items: { type: "string" },
          },
          recommendation: { type: "string" },
        },
        required: ["role_title", "strengths", "recommendation"],
      },
    },
  },
];

function formatHits(
  hits: ReturnType<typeof searchKnowledge>,
  locale: Locale,
) {
  if (hits.length === 0) {
    return locale === "zh" ? "未找到相关片段。" : "No matching snippets.";
  }
  return hits
    .map(
      ({ doc, score }, i) =>
        `[${i + 1}] (${doc.kind}, score=${score}) ${doc.title}\n${doc.text}`,
    )
    .join("\n\n");
}

const JD_LEXICON = [
  "react",
  "next",
  "vue",
  "typescript",
  "node",
  "fullstack",
  "full-stack",
  "全栈",
  "前端",
  "架构",
  "小程序",
  "独立站",
  "电商",
  "支付",
  "ai",
  "agent",
  "docker",
  "微服务",
  "sass",
  "saas",
  "manager",
  "lead",
  "研发经理",
];

export function executeTool(
  name: string,
  argsJson: string,
  locale: Locale,
): string {
  let args: Record<string, unknown> = {};
  try {
    args = JSON.parse(argsJson || "{}") as Record<string, unknown>;
  } catch {
    args = {};
  }

  switch (name as AgentToolName) {
    case "search_experience": {
      const query = String(args.query ?? "");
      const expHits = searchKnowledge(locale, query, "experience");
      const companyHits = searchKnowledge(locale, query, "company", 3);
      return formatHits([...expHits, ...companyHits].slice(0, 6), locale);
    }
    case "search_projects": {
      const query = String(args.query ?? "");
      return formatHits(searchKnowledge(locale, query, "project", 6), locale);
    }
    case "search_skills": {
      const query = String(args.query ?? "");
      const skillHits = searchKnowledge(locale, query, "skill");
      const profileHits = searchKnowledge(locale, query, "profile", 2);
      const eduHits = searchKnowledge(locale, query, "education", 2);
      return formatHits([...skillHits, ...profileHits, ...eduHits], locale);
    }
    case "match_jd_keywords": {
      const jd = String(args.jd ?? "");
      const lower = jd.toLowerCase();
      const matched = JD_LEXICON.filter((k) => lower.includes(k.toLowerCase()));
      const evidence = searchKnowledge(locale, matched.join(" ") || jd, undefined, 5);
      return JSON.stringify(
        {
          matchedKeywords: matched,
          evidence: evidence.map(({ doc }) => ({
            id: doc.id,
            title: doc.title,
            kind: doc.kind,
            excerpt: doc.text.slice(0, 220),
          })),
        },
        null,
        2,
      );
    }
    case "draft_fit_report": {
      const role = String(args.role_title ?? "");
      const strengths = Array.isArray(args.strengths)
        ? args.strengths.map(String)
        : [];
      const gaps = Array.isArray(args.gaps) ? args.gaps.map(String) : [];
      const recommendation = String(args.recommendation ?? "");
      if (locale === "zh") {
        return [
          `## 匹配报告：${role || "目标岗位"}`,
          "",
          "### 匹配点",
          ...strengths.map((s) => `- ${s}`),
          "",
          "### 需确认 / 缺口",
          ...(gaps.length ? gaps.map((g) => `- ${g}`) : ["- 暂无明显硬缺口（基于站内资料）"]),
          "",
          "### 建议",
          recommendation,
        ].join("\n");
      }
      return [
        `## Fit report: ${role || "Target role"}`,
        "",
        "### Strengths",
        ...strengths.map((s) => `- ${s}`),
        "",
        "### Gaps / to confirm",
        ...(gaps.length ? gaps.map((g) => `- ${g}`) : ["- No hard gaps from on-site evidence"]),
        "",
        "### Recommendation",
        recommendation,
      ].join("\n");
    }
    default:
      return `Unknown tool: ${name}`;
  }
}
