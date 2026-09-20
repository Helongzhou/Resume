import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionSection } from "@/components/MotionSection";
import { ProjectDemoPanel } from "@/components/ProjectDemoPanel";
import { getProject, projects } from "@/content/projects";
import { getSiteUrl } from "@/content/site";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.flatMap((project) =>
    ["zh", "en"].map((locale) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const typedLocale = locale as Locale;
  const siteUrl = getSiteUrl();
  const path =
    typedLocale === "zh"
      ? `/zh/projects/${slug}`
      : `/en/projects/${slug}`;

  return {
    title: project.title[typedLocale],
    description: project.summary[typedLocale],
    alternates: {
      canonical: path,
      languages: {
        zh: `/zh/projects/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/zh/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title[typedLocale],
      description: project.summary[typedLocale],
      url: `${siteUrl}${path}`,
      images:
        slug === "fbe-dtc"
          ? [{ url: "/projects/fbe-dtc-hero-v2.jpg", alt: project.title[typedLocale] }]
          : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const typedLocale = (await getLocale()) as Locale;
  const t = await getTranslations("Project");
  const tWorks = await getTranslations("Works");

  return (
    <div className="section-pad">
      <div className="container-page">
        <MotionSection>
          <Link
            href="/#work"
            className="text-sm text-muted transition hover:text-accent"
          >
            ← {t("back")}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="chip border-accent/25 bg-accent-dim text-accent">
              {project.status === "live" ? tWorks("featured") : tWorks("preview")}
            </span>
            <span className="font-mono text-xs text-muted">
              {project.period[typedLocale]}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-5xl text-balance">
            {project.title[typedLocale]}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {project.summary[typedLocale]}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t("live")} →
              </a>
            ) : (
              <p className="chip text-muted">{t("previewNote")}</p>
            )}
            {project.demo ? (
              <a href="#demo" className="btn-secondary">
                {t("demoCta")}
              </a>
            ) : null}
          </div>
        </MotionSection>

        {slug === "fbe-dtc" ? (
          <MotionSection className="mt-10" delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden border border-line ui-radius-lg">
              <Image
                src="/projects/fbe-dtc-hero-v2.jpg"
                alt={project.title[typedLocale]}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1120px) 100vw, 1120px"
                priority
              />
            </div>
          </MotionSection>
        ) : (
          <MotionSection className="mt-10" delay={0.08}>
            <div
              className="flex aspect-[16/9] items-end border border-line p-8 ui-radius-lg"
              style={{ background: project.coverGradient }}
            >
              <p className="font-mono text-sm text-white/70">
                {project.tags.join(" · ")}
              </p>
            </div>
          </MotionSection>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[200px_1fr]">
          <MotionSection>
            <dl className="space-y-6 text-sm">
              <div>
                <dt className="text-muted">{t("role")}</dt>
                <dd className="mt-1 font-medium">{project.role[typedLocale]}</dd>
              </div>
              <div>
                <dt className="text-muted">{t("period")}</dt>
                <dd className="mt-1 font-medium">
                  {project.period[typedLocale]}
                </dd>
              </div>
            </dl>
          </MotionSection>

          <div className="space-y-10">
            <MotionSection delay={0.05}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                {t("highlights")}
              </h2>
              <ul className="mt-4 space-y-3">
                {project.highlights[typedLocale].map((item) => (
                  <li key={item} className="flex gap-2 text-muted">
                    <span className="text-accent">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </MotionSection>

            {project.features ? (
              <MotionSection delay={0.08}>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {t("features")}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.features[typedLocale].map((item) => (
                    <li key={item} className="surface p-4 text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </MotionSection>
            ) : null}

            <MotionSection delay={0.1}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                {t("tech")}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </MotionSection>
          </div>
        </div>

        {project.demo ? (
          <div id="demo">
            <MotionSection delay={0.06}>
              <ProjectDemoPanel demo={project.demo} locale={typedLocale} />
            </MotionSection>
          </div>
        ) : null}
      </div>
    </div>
  );
}
