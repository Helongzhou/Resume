import type { Locale } from "@/i18n/routing";

export type ProjectStatus = "live" | "preview";

export type Project = {
  slug: string;
  status: ProjectStatus;
  liveUrl?: string;
  coverGradient: string;
  tags: string[];
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  role: Record<Locale, string>;
  period: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  tech: string[];
  features?: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    slug: "fbe-dtc",
    status: "live",
    liveUrl: "http://111.229.225.2:3000/ru",
    coverGradient:
      "linear-gradient(145deg, #1a2332 0%, #0d3d3a 45%, #1c2a1f 100%)",
    tags: ["MedusaJS", "Next.js", "DTC", "i18n"],
    title: {
      zh: "FBE 跨境多商户独立站",
      en: "FBE Cross-Border Multi-Vendor Storefront",
    },
    summary: {
      zh: "跨境 DTC 商城：多国家、多语言、多币种，打通购物、支付、物流、商家后台与平台结算完整链路。",
      en: "A cross-border DTC commerce platform spanning multi-country, multi-language, and multi-currency shopping, payments, fulfillment, vendor admin, and platform settlement.",
    },
    role: {
      zh: "全栈开发 · 技术规划与交付",
      en: "Full-stack · Architecture & Delivery",
    },
    period: {
      zh: "2026.06 — 至今",
      en: "Jun 2026 — Present",
    },
    highlights: {
      zh: [
        "统筹 C 端独立站、商家后台与渠道端的架构落地与上线运维",
        "支撑多国家站点、多语言页面与多币种价格展示",
        "对接 Stripe / PayPal、物流履约、邮件通知与在线客服",
        "Docker + AWS 部署，Algolia / Meilisearch 商品搜索优化",
      ],
      en: [
        "Led architecture across B2C storefront, vendor admin, and channel apps",
        "Multi-country sites with localized UX and multi-currency pricing",
        "Integrated Stripe / PayPal, fulfillment, email, and live chat",
        "Docker + AWS ops with Algolia / Meilisearch search",
      ],
    },
    tech: [
      "MedusaJS",
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Tolgee",
      "Stripe",
      "PayPal",
      "AWS",
      "Docker",
    ],
    features: {
      zh: [
        "商品浏览、搜索、购物车、下单支付与订单履约",
        "多国家 / 多语言 / 多币种自动切换",
        "商家入驻、商品与订单管理、佣金结算",
        "联盟推广、渠道管理与平台化运营",
        "ConnectyCube 在线客服，邮件触达闭环",
      ],
      en: [
        "Catalog, search, cart, checkout, and order fulfillment",
        "Auto locale / country / currency switching",
        "Vendor onboarding, catalog ops, and commission payouts",
        "Affiliate and channel management for platform growth",
        "ConnectyCube chat and transactional email loops",
      ],
    },
  },
  {
    slug: "hypit-shorts",
    status: "preview",
    coverGradient:
      "linear-gradient(145deg, #231a2e 0%, #3a2040 50%, #1a222e 100%)",
    tags: ["Hypit", "i18n", "短视频"],
    title: {
      zh: "多语言出海短视频",
      en: "Multilingual Overseas Short Video",
    },
    summary: {
      zh: "导入一条中文口播，一键转化为英语、西语、日语等十几种语言版本，笑点与词级时间轴完全对齐。",
      en: "Import one Chinese spoken clip and generate a dozen+ language versions with punchlines and word-level timelines fully aligned.",
    },
    role: {
      zh: "全栈开发",
      en: "Full-stack Development",
    },
    period: {
      zh: "近期",
      en: "Recent",
    },
    highlights: {
      zh: [
        "中文口播一键多语言生成",
        "笑点与词级时间轴对齐",
        "面向出海短视频内容生产",
      ],
      en: [
        "One-click multilingual generation from Chinese voiceover",
        "Aligned punchlines and word-level timelines",
        "Built for overseas short-form content production",
      ],
    },
    tech: ["Hypit", "i18n", "短视频 / Short Video"],
  },
  {
    slug: "creator-platform",
    status: "preview",
    coverGradient:
      "linear-gradient(145deg, #1a2433 0%, #243b55 50%, #1a1f2e 100%)",
    tags: ["TikTok", "AI Agent", "SaaS"],
    title: {
      zh: "达人平台（星策）",
      en: "Creator Growth Platform",
    },
    summary: {
      zh: "TikTok / 抖音种草全链路：任务发布、达人招募履约、资金结算，以及采量 CRM、建联插件与 AI Agent。",
      en: "End-to-end TikTok / Douyin seeding: campaign publishing, creator fulfillment, settlement, plus acquisition CRM, outreach plugins, and AI agents.",
    },
    role: {
      zh: "项目管理及技术架构",
      en: "Program Lead & Technical Architecture",
    },
    period: {
      zh: "2026.06 — 至今",
      en: "Jun 2026 — Present",
    },
    highlights: {
      zh: [
        "商家发任务 → 达人履约 → 资金结算主链路",
        "公域达人采量与 CRM 沉淀",
        "建联插件 + AI 筛选 / 话术 / 邮件生成",
      ],
      en: [
        "Merchant campaigns → creator fulfillment → settlement",
        "Public creator acquisition and CRM asset building",
        "Outreach plugin with AI scoring, scripts, and email",
      ],
    },
    tech: ["Next.js", "AI Agent", "CRM", "Browser Extension"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject() {
  return projects[0];
}
