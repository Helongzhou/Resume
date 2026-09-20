import type { Locale } from "@/i18n/routing";

export type ExperienceItem = {
  id: string;
  company: Record<Locale, string>;
  role: Record<Locale, string>;
  period: Record<Locale, string>;
  summary: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
};

export const experiences: ExperienceItem[] = [
  {
    id: "sanluwu",
    company: {
      zh: "叁陆伍智慧（北京）医疗科技有限公司",
      en: "365 Wisdom Medical Technology",
    },
    role: {
      zh: "技术经理（全栈架构 · 业务交付 · AI 工程化）",
      en: "Engineering Manager · Full-stack Architecture & AI Engineering",
    },
    period: {
      zh: "2026.05 — 至今",
      en: "May 2026 — Present",
    },
    summary: {
      zh: "负责达人营销 SaaS、跨境多商户商城与健康 App 后端等核心产品线的技术规划与交付，并主导团队 AI 研发工程化体系建设。",
      en: "Owns technical planning and delivery across creator marketing SaaS, cross-border multi-vendor commerce, and health app backends, while building the team's AI engineering system.",
    },
    bullets: {
      zh: [
        "TikTok/抖音达人营销增长 SaaS：CRM、建联插件与 AI Agent",
        "FBE 跨境多商户商城：MedusaJS + Next.js 多端交付与运维",
        "企业内部 AI 能力中台：多模型路由、技能配置与用量监控",
        "落地 SDD + Trellis「Plan / Execute / Finish」标准研发流程",
      ],
      en: [
        "Creator growth SaaS for TikTok/Douyin with CRM, plugins, and AI agents",
        "FBE multi-vendor commerce on MedusaJS + Next.js",
        "Internal AI platform with multi-model routing and usage monitoring",
        "SDD + Trellis Plan/Execute/Finish delivery workflow",
      ],
    },
  },
  {
    id: "ksher",
    company: {
      zh: "深圳开时科技有限公司",
      en: "Ksher (Shenzhen Kaishi Technology)",
    },
    role: {
      zh: "AI 全栈开发工程师",
      en: "AI Full-Stack Engineer",
    },
    period: {
      zh: "2023.03 — 2026.04",
      en: "Mar 2023 — Apr 2026",
    },
    summary: {
      zh: "主导跨境支付系统与 AI 建站工具全栈研发，推动团队从 AI 辅助编码升级为可验证的 Vibe Coding 协作模式。",
      en: "Led full-stack work on cross-border payments and AI site-building tools, evolving the team toward verifiable Vibe Coding collaboration.",
    },
    bullets: {
      zh: [
        "0→1 落地跨境收付款、换汇微服务、营销编辑器等大型项目",
        "Taro 跨境小程序 + Directus FX / KYC / 多银行对接",
        "Monorepo + Zod 强类型约束，将 AI 生成纳入工程流水线",
      ],
      en: [
        "Shipped payments, FX microservices, and marketing editors from zero",
        "Taro mini-program with Directus FX, KYC, and multi-bank adapters",
        "Monorepo + Zod pipeline to keep AI-generated code verifiable",
      ],
    },
  },
  {
    id: "pagoda",
    company: {
      zh: "深圳百果园实业（集团）股份有限公司",
      en: "Pagoda Group",
    },
    role: {
      zh: "前端架构师",
      en: "Frontend Architect",
    },
    period: {
      zh: "2020.09 — 2023.03",
      en: "Sep 2020 — Mar 2023",
    },
    summary: {
      zh: "带领 8 人前端团队，通过组件库、低代码与 Serverless 提升新零售多业务线并行效率。",
      en: "Led an 8-person frontend team; improved multi-line delivery via component library, low-code, and Serverless.",
    },
    bullets: {
      zh: [
        "Pagoda Design：50+ 业务组件，页面开发周期约减半",
        "营销零代码编辑：活动页搭建由约 3 天压缩至 2 小时内",
        "门店电子价签：上万 SKU 毫秒级同步变价",
      ],
      en: [
        "Pagoda Design: 50+ business components, ~50% faster page builds",
        "No-code campaign pages: ~3 days → under 2 hours",
        "Electronic shelf labels: millisecond price sync across 10k+ SKUs",
      ],
    },
  },
  {
    id: "shengxue",
    company: {
      zh: "深圳市升学文化传播有限公司",
      en: "Shengxue Education",
    },
    role: {
      zh: "前端技术负责人",
      en: "Frontend Tech Lead",
    },
    period: {
      zh: "2018.04 — 2020.09",
      en: "Apr 2018 — Sep 2020",
    },
    summary: {
      zh: "带领 15 人前端团队，统一教育产品线技术栈与工程化规范，保障多产品并行交付。",
      en: "Led a 15-person frontend team; unified stacks and engineering standards across education product lines.",
    },
    bullets: {
      zh: [
        "统筹学员 ERP、IM、习题库、直播与在线学习站点",
        "微前端改造：iframe + postMessage，支持异构栈独立部署",
        "Electron 桌面 IM：注册用户破 10 万，日均消息约 50 万",
      ],
      en: [
        "Owned ERP, IM, question bank, live classes, and learning sites",
        "Micro-frontends via iframe + postMessage for independent deploys",
        "Electron IM: 100k+ users, ~500k daily messages",
      ],
    },
  },
  {
    id: "qiyiniu",
    company: {
      zh: "奇异牛科技（深圳）有限公司",
      en: "Qiyiniu Technology",
    },
    role: {
      zh: "前端 Leader",
      en: "Frontend Leader",
    },
    period: {
      zh: "2015.03 — 2018.04",
      en: "Mar 2015 — Apr 2018",
    },
    summary: {
      zh: "带领 5 人团队支撑跨境电商 C/B 端产品，并主导 Node.js 微服务后端闭环。",
      en: "Led a 5-person team on cross-border C/B products and Node.js microservice backends.",
    },
    bullets: {
      zh: [
        "户动 App / 麦麦拍 WebApp 核心互动与交易场景",
        "高并发抢票活动页性能优化与稳定保障",
        "Egg.js + Seneca 微服务与 RabbitMQ 异步解耦",
      ],
      en: [
        "Consumer apps covering social and commerce flows",
        "High-concurrency ticket-rush landing performance",
        "Egg.js + Seneca microservices with RabbitMQ decoupling",
      ],
    },
  },
];
