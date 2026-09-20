import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionSection } from "@/components/MotionSection";
import { experiences } from "@/content/experience";
import type { Locale } from "@/i18n/routing";

export async function ExperienceSection() {
  const t = await getTranslations("Experience");
  const locale = (await getLocale()) as Locale;
  const items = experiences.slice(0, 4);

  return (
    <section id="experience" className="section-pad border-t border-line">
      <div className="container-page">
        <MotionSection>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                04
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-3 text-muted">{t("subtitle")}</p>
            </div>
            <Link
              href="/experience"
              className="inline-flex min-h-10 items-center text-sm font-medium text-accent hover:underline"
            >
              {t("viewAll")} →
            </Link>
          </div>
        </MotionSection>

        <ol className="mt-10 space-y-0">
          {items.map((item, index) => (
            <MotionSection key={item.id} delay={0.04 * index}>
              <li className="grid gap-3 border-t border-line py-6 md:grid-cols-[160px_1fr] md:gap-8 md:py-8">
                <p className="font-mono text-xs text-muted md:pt-1">
                  {item.period[locale]}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-text md:text-xl">
                    {item.role[locale]}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{item.company[locale]}</p>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
                    {item.summary[locale]}
                  </p>
                </div>
              </li>
            </MotionSection>
          ))}
        </ol>
      </div>
    </section>
  );
}
