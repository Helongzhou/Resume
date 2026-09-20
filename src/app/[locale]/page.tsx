import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/sections/AboutSection";
import { AskSection } from "@/components/sections/AskSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { getSiteUrl, siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const siteUrl = getSiteUrl();
  const typedLocale = locale as Locale;

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: siteConfig.name[typedLocale] }],
    openGraph: {
      type: "website",
      locale: typedLocale === "zh" ? "zh_CN" : "en_US",
      url: typedLocale === "zh" ? `${siteUrl}/zh` : `${siteUrl}/en`,
      title: t("title"),
      description: t("description"),
      siteName: siteConfig.name[typedLocale],
      images: [
        {
          url: "/projects/fbe-dtc-hero-v2.jpg",
          width: 1600,
          height: 1000,
          alt: "FBE DTC storefront",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/projects/fbe-dtc-hero-v2.jpg"],
    },
    alternates: {
      canonical: typedLocale === "zh" ? "/zh" : "/en",
      languages: {
        zh: "/zh",
        en: "/en",
        "x-default": "/zh",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <WorksSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <AskSection />
      <ContactSection />
    </>
  );
}
