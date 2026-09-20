import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticPaths = ["", "/experience"];
  const projectPaths = projects.map((p) => `/projects/${p.slug}`);
  const paths = [...staticPaths, ...projectPaths];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const zh = `${siteUrl}/zh${path}`;
    const en = `${siteUrl}/en${path}`;
    entries.push({
      url: zh,
      lastModified,
      alternates: { languages: { zh, en, "x-default": zh } },
    });
    entries.push({
      url: en,
      lastModified,
      alternates: { languages: { zh, en, "x-default": zh } },
    });
  }

  return entries;
}
