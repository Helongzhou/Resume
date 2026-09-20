"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className="inline-flex items-center border border-line bg-bg-soft p-1 text-xs font-medium tracking-wide ui-radius-md"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((item) => {
        const active = item === locale;
        return (
          <button
            key={item}
            type="button"
            onClick={() => switchTo(item)}
            className={`min-h-8 min-w-10 ui-radius-sm px-2.5 transition duration-200 ${
              active
                ? "bg-accent text-bg"
                : "text-muted hover:text-text"
            }`}
            aria-pressed={active}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
