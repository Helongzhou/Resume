"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AgentMarkdown } from "@/components/agent/AgentMarkdown";
import type {
  AgentScenario,
  ChatMessage,
  QuotaSnapshot,
  SseEvent,
} from "@/lib/agent/types";
import type { Locale } from "@/i18n/routing";

type TraceItem = {
  id: string;
  kind: "status" | "tool";
  title: string;
  detail?: string;
  state?: "start" | "done";
};

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

const SCENARIO_PROMPTS: Record<Locale, Record<AgentScenario, string>> = {
  zh: {
    jd_match:
      "我们在招全栈开发（Next.js + Node），最好有电商或支付经验。请根据简历做匹配分析，并给出风险点。",
    capability: "候选人能做微信小程序 / 跨端吗？请给结论和证据。",
    project_deep: "请深挖一下跨境支付相关经历，说明他具体做了什么。",
  },
  en: {
    jd_match:
      "We're hiring a full-stack engineer (Next.js + Node), ideally with commerce or payments experience. Match against the resume and list risks.",
    capability:
      "Can this candidate ship WeChat mini programs / cross-platform apps? Give a verdict with evidence.",
    project_deep:
      "Deep dive into the cross-border payments experience — what did he actually own?",
  },
};

function parseSseChunk(buffer: string): { events: SseEvent[]; rest: string } {
  const parts = buffer.split("\n\n");
  const rest = parts.pop() || "";
  const events: SseEvent[] = [];
  for (const part of parts) {
    const line = part.split("\n").find((l) => l.startsWith("data: "));
    if (!line) continue;
    try {
      events.push(JSON.parse(line.slice(6)) as SseEvent);
    } catch {
      // ignore
    }
  }
  return { events, rest };
}

export function AgentDemo() {
  const t = useTranslations("Agent");
  const locale = useLocale() as Locale;
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [trace, setTrace] = useState<TraceItem[]>([]);
  const [quota, setQuota] = useState<QuotaSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const busy = running || revealing;

  const refreshQuota = useCallback(async () => {
    try {
      const res = await fetch("/api/agent/chat", { method: "GET" });
      if (!res.ok) return;
      const data = (await res.json()) as QuotaSnapshot;
      setQuota(data);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    void refreshQuota();
  }, [refreshQuota]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, trace, busy]);

  const quotaLabel = useMemo(() => {
    if (!quota) return t("quotaLoading");
    return t("quotaLine", {
      ipUsed: quota.ipUsed,
      ipLimit: quota.ipLimit,
      globalUsed: quota.globalUsed,
      globalLimit: quota.globalLimit,
    });
  }, [quota, t]);

  const runChat = useCallback(
    async (userText: string, scenario: AgentScenario) => {
      const trimmed = userText.trim();
      if (!trimmed || busy) return;

      setError(null);
      setRunning(true);
      setRevealing(true);
      setTrace([]);

      const userMsg: UiMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };
      const assistantId = `a-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "", streaming: true },
      ]);

      const history: ChatMessage[] = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/agent/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale,
            scenario,
            messages: history,
          }),
          signal: controller.signal,
        });

        if (res.status === 429) {
          const data = (await res.json()) as {
            error?: string;
            quota?: QuotaSnapshot;
          };
          if (data.quota) setQuota(data.quota);
          setError(data.error || t("quotaExceeded"));
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          setRevealing(false);
          return;
        }

        if (!res.ok || !res.body) {
          setError(t("requestFailed"));
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          setRevealing(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parsed = parseSseChunk(buffer);
          buffer = parsed.rest;

          for (const event of parsed.events) {
            if (event.type === "quota") {
              setQuota(event.quota);
            } else if (event.type === "status") {
              setTrace((prev) => [
                ...prev,
                {
                  id: `s-${Date.now()}-${prev.length}`,
                  kind: "status",
                  title: event.phase,
                  detail: event.detail,
                },
              ]);
            } else if (event.type === "tool") {
              setTrace((prev) => {
                if (event.state === "start") {
                  return [
                    ...prev,
                    {
                      id: `t-${event.name}-${prev.length}`,
                      kind: "tool",
                      title: event.name,
                      detail: JSON.stringify(event.args ?? {}),
                      state: "start",
                    },
                  ];
                }
                const next = [...prev];
                for (let i = next.length - 1; i >= 0; i -= 1) {
                  if (
                    next[i].kind === "tool" &&
                    next[i].title === event.name &&
                    next[i].state === "start"
                  ) {
                    next[i] = {
                      ...next[i],
                      state: "done",
                      detail: event.result || next[i].detail,
                    };
                    break;
                  }
                }
                return next;
              });
            } else if (event.type === "token") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + event.text, streaming: true }
                    : m,
                ),
              );
            } else if (event.type === "error") {
              setError(event.message);
            } else if (event.type === "done") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, streaming: false } : m,
                ),
              );
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, streaming: false } : m,
          ),
        );
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(t("requestFailed"));
        }
        setRevealing(false);
      } finally {
        setRunning(false);
        void refreshQuota();
      }
    },
    [busy, locale, messages, refreshQuota, t],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void runChat(input, "jd_match");
    setInput("");
  };

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{t("subtitle")}</p>
          <p className="mt-1 font-mono text-xs text-accent">{quotaLabel}</p>
        </div>
        <span
          className={`chip text-xs ${
            quota?.liveEnabled
              ? "border-accent/40 text-accent"
              : "text-muted"
          }`}
        >
          {quota?.liveEnabled ? t("modeLive") : t("modeDemo")}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["jd_match", "scenarioJd"],
            ["capability", "scenarioCapability"],
            ["project_deep", "scenarioProject"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            disabled={busy}
            onClick={() => void runChat(SCENARIO_PROMPTS[locale][key], key)}
            className="chip text-muted transition duration-200 hover:border-accent/45 hover:text-accent disabled:opacity-50"
          >
            {t(label)}
          </button>
        ))}
        <button
          type="button"
          disabled={busy || messages.length === 0}
          onClick={() => {
            setMessages([]);
            setTrace([]);
            setError(null);
            setRevealing(false);
          }}
          className="chip text-muted transition duration-200 hover:border-accent/45 hover:text-accent disabled:opacity-50"
        >
          {t("clear")}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="ask-terminal overflow-hidden border border-line bg-[#06080c]">
          <div
            ref={listRef}
            className="flex max-h-[420px] min-h-[320px] flex-col gap-3 overflow-y-auto p-4 md:p-5"
          >
            {messages.length === 0 ? (
              <p className="text-sm text-muted">{t("empty")}</p>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`ui-radius-md px-3 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-6 whitespace-pre-wrap bg-accent-dim text-text"
                      : "mr-2 border border-line bg-bg-elevated text-text"
                  }`}
                >
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {m.role === "user" ? "You" : "Agent"}
                  </p>
                  {m.role === "assistant" ? (
                    <AgentMarkdown
                      content={m.content}
                      streaming={Boolean(m.streaming)}
                      onRevealIdle={() => {
                        if (!m.streaming) setRevealing(false);
                      }}
                    />
                  ) : (
                    m.content
                  )}
                </div>
              ))
            )}
          </div>

          {trace.length > 0 ? (
            <div className="border-t border-line p-3 lg:hidden">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {t("traceTitle")}
              </p>
              <div className="flex flex-wrap gap-2">
                {trace.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {item.kind === "tool" ? `tool:${item.title}` : item.title}
                    {item.state === "done"
                      ? " ✓"
                      : item.state === "start"
                        ? " …"
                        : ""}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="flex gap-2 border-t border-line p-3 md:p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              disabled={busy}
              className="min-h-11 flex-1 ui-radius-md border border-line bg-bg px-3 text-sm text-text outline-none placeholder:text-muted focus:border-accent/50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="btn-primary disabled:opacity-50"
            >
              {busy ? t("running") : t("send")}
            </button>
          </form>
        </div>

        <aside className="surface hidden overflow-hidden lg:block">
          <div className="border-b border-line px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {t("traceTitle")}
            </p>
            <p className="mt-1 text-xs text-muted">{t("traceHint")}</p>
          </div>
          <div className="max-h-[480px] space-y-3 overflow-y-auto p-4">
            {trace.length === 0 ? (
              <p className="text-sm text-muted">{t("traceEmpty")}</p>
            ) : (
              trace.map((item) => (
                <div
                  key={item.id}
                  className="ui-radius-md border border-line bg-bg p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs text-accent">
                      {item.kind === "tool" ? `tool.${item.title}` : item.title}
                    </p>
                    {item.state ? (
                      <span className="text-[11px] text-muted">
                        {item.state === "done" ? "done" : "running"}
                      </span>
                    ) : null}
                  </div>
                  {item.detail ? (
                    <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-muted">
                      {item.detail}
                    </pre>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {error ? <p className="mt-3 text-sm text-[#ff8b6a]">{error}</p> : null}
    </div>
  );
}
