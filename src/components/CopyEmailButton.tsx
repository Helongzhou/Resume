"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/content/site";

export function CopyEmailButton({ className = "" }: { className?: string }) {
  const t = useTranslations("Contact");
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`btn-secondary ${className}`}
    >
      {copied ? t("copied") : t("copy")}
    </button>
  );
}
