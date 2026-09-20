import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { resumeKnowledgeDocs } from "@/content/resume-knowledge";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import en from "../../../messages/en.json";
import zh from "../../../messages/zh.json";

export type KnowledgeDoc = {
  id: string;
  kind:
    | "experience"
    | "project"
    | "skill"
    | "profile"
    | "education"
    | "company";
  title: string;
  text: string;
  tags: string[];
};

function normalize(input: string) {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}

export function buildKnowledge(locale: Locale): KnowledgeDoc[] {
  const messages = locale === "zh" ? zh : en;
  const docs: KnowledgeDoc[] = [
    {
      id: "profile",
      kind: "profile",
      title: siteConfig.name[locale],
      text: [
        siteConfig.title[locale],
        ...(messages.About.paragraphs as string[]),
        `email:${siteConfig.email}`,
        `location:${siteConfig.location[locale]}`,
        `years:${siteConfig.yearsExperience}`,
      ].join("\n"),
      tags: ["profile", "about", "全栈", "前端架构", "full-stack"],
    },
  ];

  for (const item of experiences) {
    docs.push({
      id: `exp-${item.id}`,
      kind: "experience",
      title: `${item.company[locale]} · ${item.role[locale]}`,
      text: [
        item.period[locale],
        item.summary[locale],
        ...item.bullets[locale],
      ].join("\n"),
      tags: [item.id, item.company.zh, item.company.en, "experience"],
    });
  }

  for (const project of projects) {
    docs.push({
      id: `proj-${project.slug}`,
      kind: "project",
      title: project.title[locale],
      text: [
        project.summary[locale],
        project.role[locale],
        project.period[locale],
        ...project.highlights[locale],
        ...(project.features?.[locale] ?? []),
        project.tech.join(", "),
      ].join("\n"),
      tags: [...project.tags, project.slug, "project"],
    });
  }

  const keywords = messages.Skills.keywords as string[];
  docs.push({
    id: "skills",
    kind: "skill",
    title: messages.Skills.title,
    text: keywords.join("\n"),
    tags: ["skills", "stack", "能力"],
  });

  for (const item of resumeKnowledgeDocs) {
    docs.push({
      id: item.id,
      kind: item.kind,
      title: item.title[locale],
      text: item.text[locale],
      tags: item.tags,
    });
  }

  return docs;
}

export function searchKnowledge(
  locale: Locale,
  query: string,
  kind?: KnowledgeDoc["kind"],
  limit = 5,
) {
  const q = normalize(query);
  const tokens = q.split(/[\s,/|，、；;]+/).filter((t) => t.length > 1);
  const docs = buildKnowledge(locale).filter((d) =>
    kind ? d.kind === kind : true,
  );

  const scored = docs
    .map((doc) => {
      const hay = normalize(`${doc.title}\n${doc.text}\n${doc.tags.join(" ")}`);
      let score = 0;
      if (q && hay.includes(q)) score += 8;
      for (const token of tokens) {
        if (hay.includes(token)) score += 3;
      }
      // Prefer denser resume detail docs slightly when tied
      if (doc.id.startsWith("proj-") && doc.id.includes("detail")) score += 1;
      if (doc.kind === "company") score += 0.5;
      return { doc, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length === 0) {
    return docs
      .filter((d) => (kind ? d.kind === kind : d.kind !== "skill"))
      .slice(0, limit)
      .map((doc) => ({ doc, score: 0 }));
  }

  return scored;
}
