import { getTranslations } from "next-intl/server";
import { MotionSection } from "@/components/MotionSection";

export async function SkillsSection() {
  const t = await getTranslations("Skills");
  const keywords = t.raw("keywords") as string[];

  return (
    <section id="skills" className="section-pad border-t border-line">
      <div className="container-page">
        <MotionSection>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            03
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {keywords.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
