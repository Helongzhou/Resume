import type { Locale } from "@/i18n/routing";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type AgentToolName =
  | "search_experience"
  | "search_projects"
  | "search_skills"
  | "match_jd_keywords"
  | "draft_fit_report";

export type QuotaSnapshot = {
  date: string;
  ipUsed: number;
  ipLimit: number;
  globalUsed: number;
  globalLimit: number;
  liveEnabled: boolean;
  remainingIp: number;
  remainingGlobal: number;
};

export type AgentScenario = "jd_match" | "capability" | "project_deep";

export type SseEvent =
  | { type: "quota"; quota: QuotaSnapshot }
  | { type: "status"; phase: string; detail?: string }
  | {
      type: "tool";
      name: AgentToolName | string;
      state: "start" | "done";
      args?: Record<string, unknown>;
      result?: string;
    }
  | { type: "token"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };

export type AgentRequestBody = {
  locale: Locale;
  messages: ChatMessage[];
  scenario?: AgentScenario;
};
