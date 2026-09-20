import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const t = await getTranslations("Footer");
  const locale = (await getLocale()) as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-8">
      <div className="container-page flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name[locale]} · {t("rights")}
        </p>
        <p>{t("builtWith")}</p>
      </div>
    </footer>
  );
}
