import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionSection } from "@/components/MotionSection";
import { experiences } from "@/content/experience";
import { getSiteUrl } from "@/content/site";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Experience" });
  const siteUrl = getSiteUrl();
  const path = locale === "zh" ? "/zh/experience" : "/en/experience";

  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: path,
      languages: {
        zh: "/zh/experience",
        en: "/en/experience",
        "x-default": "/zh/experience",
      },
    },
    openGraph: {
      title: t("pageTitle"),
      description: t("pageSubtitle"),
      url: `${siteUrl}${path}`,
    },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = (await getLocale()) as Locale;
  const t = await getTranslations("Experience");
  const tNav = await getTranslations("Nav");

  return (
    <div className="section-pad">
      <div className="container-page">
        <MotionSection>
          <Link
            href="/"
            className="text-sm text-muted transition hover:text-accent"
          >
            ← {tNav("home")}
          </Link>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-5xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-muted md:text-lg">
            {t("pageSubtitle")}
          </p>
        </MotionSection>

        <ol className="mt-12 space-y-8">
          {experiences.map((item, index) => (
            <MotionSection key={item.id} delay={0.04 * index}>
              <li className="surface p-6 md:p-8">
                <p className="font-mono text-xs text-accent">
                  {item.period[typedLocale]}
                </p>
                <h2 className="mt-3 text-xl font-semibold md:text-2xl">
                  {item.role[typedLocale]}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {item.company[typedLocale]}
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  {item.summary[typedLocale]}
                </p>
                <ul className="mt-5 space-y-2">
                  {item.bullets[typedLocale].map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-relaxed text-text md:text-[0.95rem]"
                    >
                      <span className="mt-1 text-accent">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </MotionSection>
          ))}
        </ol>
      </div>
    </div>
  );
}
