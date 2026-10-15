"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/content/site";
import { copyText } from "@/lib/clipboard";

export function CopyEmailButton({ className = "" }: { className?: string }) {
  const t = useTranslations("Contact");
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await copyText(siteConfig.email);
    if (!ok) {
      // Last resort: hand off to the mail client.
      window.location.href = `mailto:${siteConfig.email}`;
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
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
