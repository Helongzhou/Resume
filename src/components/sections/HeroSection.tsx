"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/routing";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const seeking = t.raw("seeking") as string[];
  const proofs = t.raw("proofs") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const previewRotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -3],
  );
  const floatY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 48],
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, reduce ? 1 : 0.4],
  );

  return (
    <section
      ref={sectionRef}
      className="hero-stage relative flex min-h-[min(92vh,960px)] flex-col overflow-hidden pt-14 md:pt-16"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: glowOpacity }}
        aria-hidden
      >
        <motion.div
          className="hero-orb hero-orb--a"
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 32, -14, 0],
                  y: [0, -22, 12, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-orb hero-orb--b"
          animate={
            reduce
              ? undefined
              : {
                  x: [0, -26, 18, 0],
                  y: [0, 16, -24, 0],
                  scale: [1, 0.92, 1.12, 1],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="hero-grain" />
        <div className="hero-ring" />
      </motion.div>

      <div className="container-page relative z-[1] flex flex-1 flex-col justify-center pb-8 pt-8 md:pb-12 md:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-accent/25 bg-accent-dim px-3 py-1.5"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              <span className="hero-pulse" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {t("eyebrow")}
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.85rem,7.5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease }}
            >
              {siteConfig.name[locale]}
            </motion.h1>

            <motion.h2
              className="mt-7 max-w-xl text-[1.35rem] font-medium leading-snug tracking-[-0.015em] text-text md:text-[1.75rem] text-balance"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              {t("headline")}
            </motion.h2>

            <motion.p
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted md:text-base"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease }}
            >
              {t("sub")}
              <span className="opacity-40"> · </span>
              {seeking.join(" / ")}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22, ease }}
            >
              <a href="#work" className="btn-primary">
                {t("ctaPrimary")}
              </a>
              <a href="#ask" className="link-quiet">
                {t("ctaAsk")}
              </a>
            </motion.div>

            <motion.ul
              className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-3"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease }}
            >
              {proofs.map((item, index) => (
                <li
                  key={item}
                  className="bg-bg-elevated/90 px-4 py-4 backdrop-blur-sm transition-colors duration-300 hover:bg-bg-soft md:px-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-text">
                    {item}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="relative mx-auto hidden w-full max-w-lg lg:block"
            initial={reduce ? false : { opacity: 0, x: 36, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            style={{ y: floatY }}
          >
            <div className="hero-float-glow" aria-hidden />
            <motion.a
              href="#work"
              className="hero-float-card group relative block overflow-hidden border border-line bg-bg-elevated shadow-[0_30px_80px_-28px_rgba(0,0,0,0.85)]"
              style={{ y: previewY, rotate: previewRotate }}
              whileHover={reduce ? undefined : { y: -6, rotate: -1.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="flex items-center gap-2 border-b border-line bg-bg-soft/80 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/85" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/85" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/85" />
                <span className="ml-2 truncate font-mono text-[11px] text-muted">
                  fbe-dtc.live
                </span>
              </div>
              <div className="relative aspect-[16/11]">
                <Image
                  src="/projects/fbe-dtc-hero-v2.jpg"
                  alt=""
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1200px) 45vw, 480px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-[1] mt-auto h-[min(28vh,240px)] w-full overflow-hidden border-t border-line lg:h-[120px]"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.34, ease }}
      >
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/projects/fbe-dtc-hero-v2.jpg"
            alt=""
            fill
            className="object-cover object-top opacity-80"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-bg" />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,transparent,rgba(94,228,176,0.08),transparent)] lg:block" />
        <a
          href="#work"
          className="absolute bottom-5 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
        >
          <span>{t("scroll")}</span>
          <span className="hero-scroll-line" aria-hidden />
        </a>
      </motion.div>
    </section>
  );
}
