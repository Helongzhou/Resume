"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/content/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/routing";

const anchors = [
  { hash: "work", key: "work" as const },
  { hash: "about", key: "about" as const },
  { hash: "skills", key: "skills" as const },
  { hash: "experience", key: "experience" as const },
  { hash: "ask", key: "ask" as const },
  { hash: "contact", key: "contact" as const },
];

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");
  const [progress, setProgress] = useState(0);
  const name = siteConfig.name[locale];

  useEffect(() => {
    const ids = anchors.map((a) => a.hash);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.08, 0.2, 0.4],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? doc.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="relative sticky top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0.5 origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <div className="container-page flex h-14 items-center justify-between gap-3 md:h-16">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-text transition-colors hover:text-accent md:text-lg"
        >
          {name}
          <span className="ml-2 hidden text-sm font-normal text-muted sm:inline">
            · {siteConfig.title[locale]}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {anchors.map((item) => {
            const isActive = active === item.hash;
            return (
              <a
                key={item.key}
                href={`/${locale}#${item.hash}`}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-accent-dim text-accent shadow-[0_0_0_1px_rgba(94,228,176,0.18)]"
                    : "text-muted hover:bg-bg-soft hover:text-text"
                }`}
              >
                {t(item.key)}
              </a>
            );
          })}
          <a
            href={`/${locale}#ask-agent`}
            className="btn-primary ml-2 min-h-9 px-3.5 text-xs md:text-sm"
          >
            {t("aiAsk")}
          </a>
          <div className="ml-1">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`/${locale}#ask-agent`}
            className="btn-primary min-h-9 px-3 text-xs"
          >
            {t("aiAsk")}
          </a>
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center border border-line text-text transition-colors hover:border-accent/40 hover:text-accent ui-radius-md"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span
              className="relative flex h-3 w-4 flex-col justify-between"
              aria-hidden
            >
              <span
                className={`h-px w-full bg-current transition ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full bg-current transition ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-bg-elevated lg:hidden"
        >
          <nav
            className="container-page flex flex-col gap-1 py-3"
            aria-label="Mobile"
          >
            {anchors.map((item) => {
              const isActive = active === item.hash;
              return (
                <a
                  key={item.key}
                  href={`/${locale}#${item.hash}`}
                  className={`ui-radius-md px-3 py-3 text-base transition-colors ${
                    isActive
                      ? "bg-accent-dim text-accent"
                      : "text-text hover:bg-bg-soft"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </a>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
