"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { ProjectDemo } from "@/content/projects";

type Props = {
  demo: ProjectDemo;
  locale: Locale;
};

function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="group inline-flex max-w-full items-center gap-2 font-mono text-sm text-text transition-colors hover:text-accent"
      title={label}
    >
      <span className="truncate">{value}</span>
      <span className="shrink-0 text-[11px] text-muted group-hover:text-accent">
        {copied ? "✓" : "copy"}
      </span>
    </button>
  );
}

export function ProjectDemoPanel({ demo, locale }: Props) {
  const t = useTranslations("Project");

  return (
    <div className="mt-12 space-y-10 border-t border-line pt-12">
      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          {t("demoPortals")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {demo.note[locale]}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {demo.portals.map((portal) => (
            <a
              key={portal.url}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface group flex flex-col gap-3 p-5 transition-colors hover:border-accent/35"
            >
              <span className="text-sm font-medium text-text">
                {portal.role[locale]}
              </span>
              <span className="break-all font-mono text-xs text-muted transition-colors group-hover:text-accent">
                {portal.url.replace(/^https?:\/\//, "")} →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          {t("demoAccounts")}
        </h2>
        <p className="mt-2 text-sm text-muted">{demo.disclaimer[locale]}</p>
        <div className="mt-5 overflow-x-auto ui-radius-lg border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-bg-elevated text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">{t("demoRole")}</th>
                <th className="px-4 py-3 font-medium">{t("demoEmail")}</th>
                <th className="px-4 py-3 font-medium">{t("demoPassword")}</th>
                <th className="px-4 py-3 font-medium">{t("demoNote")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {demo.accounts.map((account) => (
                <tr key={account.email} className="bg-bg/40">
                  <td className="px-4 py-3.5 font-medium text-text">
                    {account.role[locale]}
                  </td>
                  <td className="px-4 py-3.5">
                    <CopyField value={account.email} label={t("demoEmail")} />
                  </td>
                  <td className="px-4 py-3.5">
                    <CopyField
                      value={account.password}
                      label={t("demoPassword")}
                    />
                  </td>
                  <td className="px-4 py-3.5 text-muted">
                    {account.note[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          {t("demoFlows")}
        </h2>
        <p className="mt-2 text-sm text-muted">{t("demoFlowsHint")}</p>
        <ol className="mt-6 space-y-5">
          {demo.flows.map((flow) => (
            <li key={flow.title.zh} className="surface p-5 md:p-6">
              <h3 className="text-base font-semibold text-text md:text-lg">
                {flow.title[locale]}
              </h3>
              <ol className="mt-4 space-y-2">
                {flow.steps[locale].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="font-mono text-xs text-accent">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-accent/90">
                {flow.point[locale]}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="surface border-accent/20 bg-accent-dim/40 p-6 md:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight md:text-2xl">
          {t("demoArchitecture")}
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-text md:text-base">
          {demo.architecture[locale]}
        </p>
      </section>
    </div>
  );
}
