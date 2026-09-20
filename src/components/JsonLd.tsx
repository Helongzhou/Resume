import { getLocale } from "next-intl/server";
import { siteConfig, getSiteUrl } from "@/content/site";
import type { Locale } from "@/i18n/routing";

export async function JsonLd() {
  const locale = (await getLocale()) as Locale;
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name[locale],
    alternateName: siteConfig.name[locale === "zh" ? "en" : "zh"],
    jobTitle: siteConfig.title[locale],
    email: siteConfig.email,
    url: siteUrl,
    sameAs: [siteConfig.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location[locale],
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
    knowsAbout: [
      "Full-stack engineering",
      "Cross-border e-commerce",
      "AI engineering",
      "Next.js",
      "Node.js",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
