import { getLocale, getTranslations } from "next-intl/server";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { MotionSection } from "@/components/MotionSection";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/routing";

export async function ContactSection() {
  const t = await getTranslations("Contact");
  const locale = (await getLocale()) as Locale;

  return (
    <section id="contact" className="section-pad border-t border-line">
      <div className="container-page max-w-3xl">
        <MotionSection>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            06
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{t("subtitle")}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-accent md:text-base">
            {t("openStatus")}
          </p>

          <div className="mt-10 space-y-6 border-t border-line pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  {t("email")}
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 block break-all text-xl font-medium tracking-tight text-text transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </div>
              <CopyEmailButton />
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  {t("github")}
                </p>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-lg font-medium text-text transition-colors hover:text-accent"
                >
                  @{siteConfig.githubLabel} →
                </a>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-muted">
                  {t("location")}
                </p>
                <p className="mt-2 text-lg font-medium">
                  {siteConfig.location[locale]}
                  <span className="ml-2 text-sm font-normal text-muted">
                    · {siteConfig.yearsExperience}+ yrs
                  </span>
                </p>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
