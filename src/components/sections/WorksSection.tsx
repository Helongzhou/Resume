import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionSection } from "@/components/MotionSection";
import { ParallaxCover } from "@/components/ParallaxCover";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export async function WorksSection() {
  const t = await getTranslations("Works");
  const locale = (await getLocale()) as Locale;
  const [featured, ...previews] = projects;

  return (
    <section id="work" className="section-pad border-t border-line">
      <div className="container-page">
        <MotionSection>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            01
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </MotionSection>

        <MotionSection className="mt-10" delay={0.06}>
          <article className="surface overflow-hidden">
            <ParallaxCover
              src="/projects/fbe-dtc-hero-v2.jpg"
              alt={featured.title[locale]}
            />
            <div className="grid gap-8 border-t border-line p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:p-9 lg:p-10">
              <div>
                <span className="chip border-accent/25 bg-accent-dim text-accent">
                  {t("featured")}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {featured.title[locale]}
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  {featured.summary[locale]}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="chip text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-end gap-3 md:items-end">
                <Link
                  href={`/projects/${featured.slug}`}
                  className="btn-primary w-full md:w-auto"
                >
                  {t("viewCase")}
                </Link>
                {featured.liveUrl ? (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full md:w-auto"
                  >
                    {t("visitLive")}
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        </MotionSection>

        <MotionSection className="mt-8" delay={0.1}>
          <div className="surface divide-y divide-line overflow-hidden">
            {previews.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-bg-soft/60 md:gap-5 md:px-6 md:py-5"
              >
                <span
                  className="h-10 w-10 shrink-0 ui-radius-sm border border-line transition-transform duration-300 group-hover:scale-105"
                  style={{ background: project.coverGradient }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-[family-name:var(--font-display)] text-base font-semibold tracking-tight transition-colors group-hover:text-accent md:text-lg">
                      {project.title[locale]}
                    </h3>
                    <span className="font-mono text-[11px] text-muted">
                      {t("inProgress")}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted">
                    {project.summary[locale]}
                  </p>
                </div>
                <span className="hidden translate-x-0 text-sm text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:inline">
                  {t("more")} →
                </span>
              </Link>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
