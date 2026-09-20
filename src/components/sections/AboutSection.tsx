import { getTranslations } from "next-intl/server";
import { MotionSection } from "@/components/MotionSection";

export async function AboutSection() {
  const t = await getTranslations("About");
  const paragraphs = t.raw("paragraphs") as string[];
  const focus = t.raw("focus") as string[];

  return (
    <section id="about" className="section-pad border-t border-line">
      <div className="container-page">
        <MotionSection>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            02
          </p>
          <div className="mt-3 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:items-start lg:gap-14">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
                {t("title")}
              </h2>
              <div className="mt-6 space-y-5">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 28)}
                    className="text-base leading-relaxed text-muted md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="surface p-6 md:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {t("focusLabel")}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {focus.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
