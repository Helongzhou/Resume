"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { AgentDemo } from "@/components/agent/AgentDemo";
import { MotionSection } from "@/components/MotionSection";
import { Typewriter } from "@/components/Typewriter";
import { askIntro, askItems } from "@/content/ask";
import type { Locale } from "@/i18n/routing";

type Tab = "preset" | "agent";

function tabFromHash(): Tab {
  if (typeof window === "undefined") return "preset";
  return window.location.hash === "#ask-agent" ? "agent" : "preset";
}

export function AskSection() {
  const t = useTranslations("Ask");
  const tAgent = useTranslations("Agent");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("preset");
  const [activeId, setActiveId] = useState("industries");
  const [playId, setPlayId] = useState(1);
  const [typing, setTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = tabFromHash();
      setTab(next);
      if (window.location.hash === "#ask-agent") {
        document.getElementById("ask")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const active = askItems.find((item) => item.id === activeId) ?? null;
  const intro = askIntro[locale];

  const select = useCallback((id: string) => {
    setActiveId(id);
    setPlayId((n) => n + 1);
    setTyping(true);
    setCopied(false);
  }, []);

  const onTyped = useCallback(() => {
    setTyping(false);
  }, []);

  const copyAnswer = useCallback(async () => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.answer[locale]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }, [active, locale]);

  const switchTab = (next: Tab) => {
    setTab(next);
    const hash = next === "agent" ? "#ask-agent" : "#ask";
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  };

  return (
    <section id="ask" className="section-pad border-t border-line">
      <div className="container-page">
        <MotionSection>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            05
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t("subtitle")}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => switchTab("preset")}
              className={`ui-radius-md px-4 py-2 text-sm transition duration-200 ${
                tab === "preset"
                  ? "bg-accent font-semibold text-bg"
                  : "border border-line text-muted hover:text-text"
              }`}
            >
              {t("tabPreset")}
            </button>
            <button
              type="button"
              onClick={() => switchTab("agent")}
              className={`ui-radius-md px-4 py-2 text-sm transition duration-200 ${
                tab === "agent"
                  ? "bg-accent font-semibold text-bg"
                  : "border border-line text-muted hover:text-text"
              }`}
            >
              {tAgent("tab")}
            </button>
          </div>

          {tab === "agent" ? (
            <AgentDemo />
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8">
              <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto pr-1 md:max-h-[520px] lg:max-h-none lg:overflow-visible">
                <p className="sticky top-0 z-10 mb-1 bg-bg/90 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted backdrop-blur-sm">
                  {t("promptLabel")}
                </p>
                {askItems.map((item) => {
                  const selected = item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => select(item.id)}
                      aria-pressed={selected}
                      className={`group flex min-h-12 items-start gap-3 border px-4 py-3 text-left transition duration-200 ui-radius-md ${
                        selected
                          ? "border-accent/55 bg-accent-dim text-text"
                          : "border-line bg-bg-elevated text-muted hover:border-accent/35 hover:text-text"
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-mono text-xs ${selected ? "text-accent" : "text-muted group-hover:text-accent"}`}
                      >
                        ?
                      </span>
                      <span className="text-sm leading-snug md:text-[15px]">
                        {item.question[locale]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="ask-terminal relative overflow-hidden border border-line bg-[#06080c]">
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted">
                    fit-check.sh
                  </span>
                </div>

                <div className="min-h-[280px] space-y-4 p-5 font-mono text-sm leading-relaxed md:min-h-[320px] md:p-6">
                  <p className="text-muted">
                    <span className="text-accent">{intro.prompt}</span>
                  </p>

                  <AnimatePresence mode="wait">
                    {active ? (
                      <motion.div
                        key={`${active.id}-${playId}`}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <p className="text-text">
                          <span className="text-muted">Q › </span>
                          {active.question[locale]}
                        </p>

                        <p>
                          <span className="rounded-md bg-accent-dim px-2 py-0.5 text-xs text-accent">
                            {active.verdict[locale]}
                          </span>
                        </p>

                        <p className="text-[15px] leading-7 text-text md:text-base">
                          <span className="text-accent">A › </span>
                          {typing ? (
                            <span className="sr-only">{intro.typing}</span>
                          ) : null}
                          <Typewriter
                            key={playId}
                            text={active.answer[locale]}
                            speed={12}
                            onDone={onTyped}
                          />
                        </p>

                        {!typing ? (
                          <motion.div
                            initial={reduce ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-wrap gap-2 pt-1"
                          >
                            {active.proof ? (
                              <a
                                href={active.proof.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary min-h-10 px-4 text-xs"
                              >
                                {active.proof.label[locale]} →
                              </a>
                            ) : null}
                            {active.linkExperience ? (
                              <Link
                                href="/experience"
                                className="btn-secondary min-h-10 px-4 text-xs"
                              >
                                {t("viewExperience")} →
                              </Link>
                            ) : null}
                            <button
                              type="button"
                              onClick={copyAnswer}
                              className="btn-secondary min-h-10 px-4 text-xs"
                            >
                              {copied ? t("copied") : t("copy")}
                            </button>
                          </motion.div>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </MotionSection>
      </div>
    </section>
  );
}
