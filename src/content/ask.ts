import type { Locale } from "@/i18n/routing";

export type AskItem = {
  id: string;
  question: Record<Locale, string>;
  verdict: Record<Locale, string>;
  answer: Record<Locale, string>;
  linkExperience?: boolean;
  proof?: {
    label: Record<Locale, string>;
    href: string;
  };
};

export const askItems: AskItem[] = [
  {
    id: "industries",
    question: {
      zh: "做过哪些行业？产品形态和技术栈熟吗？",
      en: "Which industries — and product forms / stacks?",
    },
    verdict: {
      zh: "五段行业 · 可迁移",
      en: "Five industries · transferable",
    },
    linkExperience: true,
    answer: {
      zh: "行业按时间线覆盖：奇异牛（社交 / 生活服务）→ 升学教育（在线教育：学员 ERP、直播、习题库、IM）→ 百果园（新零售电商与供应链：门店、营销、价签同步）→ 开时（跨境支付：收付款、换汇、KYC）→ 叁陆伍（跨境电商与达人 SaaS）。产品形态上做过独立站、微信小程序 / App、B 端中后台 SaaS、直播学习站、IM 与 Electron 桌面端。技术栈以 Vue / React / Next.js / TypeScript 为前端底座，配合 Node.js 微服务、Monorepo、微前端、Docker / 云部署，以及近年的 AI Coding 工程化。换赛道对我来说主要是对齐业务域模型与合规边界，工程交付能力是可复用的。",
      en: "Industry timeline: Qiyiniu (social / lifestyle) → Shengxue (online education: student ERP, live classes, question banks, IM) → Pagoda (new-retail commerce & supply chain: stores, campaigns, shelf-label sync) → Ksher (cross-border payments: collect/payout, FX, KYC) → 365 Wisdom (cross-border commerce & creator SaaS). Product forms include storefronts, WeChat mini programs / apps, B-side admin SaaS, live learning sites, IM, and Electron desktop. Stack centers on Vue / React / Next.js / TypeScript, with Node microservices, monorepo, micro-frontends, Docker / cloud, and recent AI Coding engineering. Switching domains is mainly aligning business models and compliance — delivery skills transfer.",
    },
  },
  {
    id: "mini-program",
    question: {
      zh: "能做微信小程序 / 跨端 App 吗？",
      en: "Can you ship WeChat mini programs / cross-platform apps?",
    },
    verdict: {
      zh: "能 · 有实战",
      en: "Yes · shipped",
    },
    answer: {
      zh: "可以，而且不止停留在页面 demo。我长期做过微信小程序与 Taro / uni-app 跨端，也覆盖过 Flutter、Ionic 以及 Electron 桌面端。典型场景包括登录鉴权、支付链路、列表与表单性能、包体积控制、弱网重试与发布上架。在开时做过 Taro 跨境小程序对接 FX / KYC / 多银行能力；在教育与社交场景也交付过 C 端互动与交易流程。选型上会按团队成本与业务边界在原生小程序、Taro 与混合方案之间取舍，而不是一套模板套所有项目。",
      en: "Yes — beyond UI demos. I've shipped WeChat mini programs and Taro / uni-app cross-platform work, plus Flutter, Ionic, and Electron desktop. Typical scope: auth, payments, list/form performance, bundle size, weak-network retries, and store release. At Ksher I built a Taro mini program against FX / KYC / multi-bank capabilities; earlier education and social products covered consumer interaction and commerce flows. I choose native mini program vs Taro vs hybrid based on team cost and domain boundaries — not one template for everything.",
    },
  },
  {
    id: "dtc-store",
    question: {
      zh: "能从 0 搭跨境独立站吗？",
      en: "Can you build a cross-border storefront from zero?",
    },
    verdict: {
      zh: "能 · 线上可看",
      en: "Yes · live demo",
    },
    answer: {
      zh: "可以，这也是我当前在交付的核心项目。FBE 跨境多商户独立站基于 MedusaJS + Next.js，覆盖多国家站点、多语言页面与多币种价格；C 端具备浏览搜索、购物车、下单支付与履约，商家侧具备入驻、商品订单管理与佣金结算，并对接 Stripe / PayPal、物流、邮件通知与在线客服。我负责技术规划、全栈落地与 Docker / 云上运维，线上环境可直接体验。如果你关心的是「从需求到可售卖」而不是静态官网，这条链路我完整走过。",
      en: "Yes — and it's what I'm shipping now. FBE is a multi-vendor cross-border storefront on MedusaJS + Next.js: multi-country sites, localized UX, multi-currency pricing; B2C covers catalog/search, cart, checkout, fulfillment; vendors get onboarding, catalog/order ops, and commission settlement; integrations include Stripe / PayPal, logistics, email, and live chat. I own planning, full-stack delivery, and Docker / cloud ops — the live site is clickable. If you need sellable commerce rather than a static brochure site, I've run that full path.",
    },
    proof: {
      label: {
        zh: "打开 DTC 线上站",
        en: "Open live DTC",
      },
      href: "https://dtc.icedew.online",
    },
  },
  {
    id: "fullstack",
    question: {
      zh: "全栈到什么程度？还是偏前端？",
      en: "How full-stack — or mostly frontend?",
    },
    verdict: {
      zh: "能端到端扛",
      en: "End-to-end ready",
    },
    answer: {
      zh: "前端是我的技术底座，但岗位交付不卡在「只写页面」。我可以独立推进 Node.js 服务（Koa / Egg / Express）、REST / 微服务拆分、MySQL / PostgreSQL / MongoDB / Redis，以及 Docker 与云上部署联调。业务上跨境支付、跨境电商、达人营销 SaaS、AI 建站都走过「需求 → 研发 → 上线」闭环；架构上能定模块边界与技术选型，关键路径也会自己写。更准确的描述是：以前端架构能力做全栈交付，而不是只会调后端接口的前端。",
      en: "Frontend is my foundation, but delivery isn't limited to UI. I independently push Node services (Koa / Egg / Express), REST / microservice boundaries, MySQL / PostgreSQL / MongoDB / Redis, plus Docker and cloud deploy/integration. I've closed the loop from requirements to production on cross-border payments, commerce, creator SaaS, and AI site-building. I can set module boundaries and stack choices, and still write the critical path. More precisely: frontend-architecture strength applied to full-stack delivery — not a frontend who only calls APIs.",
    },
  },
  {
    id: "ai",
    question: {
      zh: "AI 只会调 API，还是能工程化落地？",
      en: "AI API wrappers — or real engineering?",
    },
    verdict: {
      zh: "能工程化落地",
      en: "Production AI eng",
    },
    answer: {
      zh: "我把 AI 当工程系统做，而不是 Demo 调模型。业务侧做过 AI Agent（筛选、话术、邮件生成）、流式输出、多模型路由与 Token 成本监控；研发侧推动 SDD / Vibe Coding，用 Zod 等强类型约束、任务编排、代码验证和 CI/CD 把生成结果卡在可合并、可复用、可上线的质量门槛内。在开时与叁陆伍都落地过「AI 辅助编码 → 可验证协作」的流程，目标是提升吞吐，同时不牺牲类型安全与可维护性。",
      en: "I treat AI as an engineering system, not a model demo. On the product side: agents (scoring, scripts, email), streaming, multi-model routing, and token-cost monitoring. On the delivery side: SDD / Vibe Coding with strong typing (e.g. Zod), task orchestration, verification, and CI/CD so generated output stays mergeable, reusable, and shippable. At Ksher and 365 Wisdom I've moved teams from ad-hoc AI assistance to verifiable collaboration — higher throughput without giving up type safety or maintainability.",
    },
  },
  {
    id: "mvp",
    question: {
      zh: "要一个 MVP，大概多久能出？",
      en: "How fast for an MVP?",
    },
    verdict: {
      zh: "看范围 · 可快推",
      en: "Scope-dependent · fast",
    },
    answer: {
      zh: "范围清晰、主链路明确的小程序或独立站 MVP，通常按「周」推进：第 1 周锁定信息架构与核心路径（注册 / 浏览 / 下单或任务闭环），随后补支付或后台、权限与部署。我会先砍掉非关键路径，用可上线的最小闭环换验证，而不是一次做完所有模块。配合 AI Coding + SDD，列表页、表单与样板 CRUD 会明显加速；涉及资金、合规、复杂供应链时，排期以质量与风险门槛为准，我会提前说明依赖与不可压缩项，避免空口承诺工期。",
      en: "For a clear-scope mini program or storefront MVP, I usually plan in weeks: week one locks IA and the core path (auth / browse / checkout or task loop), then payments or admin, permissions, and deploy. I cut non-critical paths first and ship a minimal verifiable loop instead of building every module upfront. AI Coding + SDD speeds lists, forms, and boilerplate CRUD; for money flows, compliance, or complex supply chain, schedule follows quality and risk gates — I'll call out dependencies and non-compressible items early rather than promise blank timelines.",
    },
  },
  {
    id: "payments",
    question: {
      zh: "支付 / 金融相关做过吗？怕踩合规坑。",
      en: "Any payments / fintech experience?",
    },
    verdict: {
      zh: "做过 · 跨境收付款",
      en: "Yes · cross-border payments",
    },
    answer: {
      zh: "做过，而且是跨境资金场景，不只是接入一个收银台 SDK。在开时主导过跨境收付款、换汇微服务、KYC 与多银行对接，并用 Taro 小程序承载相关 C / B 端流程。工程上关注订单与资金状态机、幂等与对账、失败重试与异常兜底，以及前后端对「可观测性」的要求。我清楚支付域里合规与联调成本高，会在方案阶段就区分演示可用与生产可用，避免把沙箱体验当成上线标准。",
      en: "Yes — cross-border money movement, not just wiring a checkout SDK. At Ksher I led collect/payout, FX microservices, KYC, and multi-bank adapters, with a Taro mini program for related C/B flows. Engineering focus: order/funds state machines, idempotency and reconciliation, failure retries and fallbacks, plus observability across the stack. I know compliance and bank integration are expensive; I separate demo-ready from production-ready early so sandbox UX isn't mistaken for launch criteria.",
    },
  },
  {
    id: "admin-saas",
    question: {
      zh: "复杂 B 端中后台 / SaaS 搞得定吗？",
      en: "Complex B-side admin / SaaS — manageable?",
    },
    verdict: {
      zh: "搞得定 · 长期主战场",
      en: "Yes · long-time arena",
    },
    answer: {
      zh: "B 端中后台是我长期主战场。典型复杂度包括：多角色权限与数据范围、审批 / 工作流、大数据量表格与筛选导出、可视化营销编辑器、弱网与长任务、以及 IM / 实时协作。落地过商家后台、支付运营台、达人 CRM、学员 ERP 等系统；在百果园做过组件库与低代码提效，在升学教育做过微前端拆分以支持异构栈并行。我看重信息架构与可维护性：先把对象模型与权限边界理清，再谈组件抽象，避免中后台变成「堆页面」。",
      en: "Admin / SaaS is long-time home turf. Typical complexity: role-based access and data scope, approval workflows, heavy tables with filter/export, visual campaign editors, weak-network and long-running jobs, plus IM / realtime collaboration. I've shipped vendor consoles, payment ops, creator CRM, and student ERP; at Pagoda I drove a component library and low-code efficiency, at Shengxue micro-frontends for heterogeneous stacks. I prioritize IA and maintainability: clarify domain objects and permission boundaries before abstraction — admin shouldn't become a pile of pages.",
    },
  },
  {
    id: "deploy",
    question: {
      zh: "上线运维会吗？还是只交代码？",
      en: "Can you deploy / operate — or only code?",
    },
    verdict: {
      zh: "全链路都熟",
      en: "Full delivery loop",
    },
    answer: {
      zh: "会，而且我习惯把「能访问的线上环境」当成交付定义的一部分。链路通常是：全栈开发 → 需求对齐与排期推进 → 技术决策（选型、规范、Review、关键路径）→ Docker 镜像、CI/CD、环境变量与健康检查 → 云主机 / 容器发布与回滚预案。AWS、腾讯云与轻量服务器场景都推过；本作品集站和 DTC 独立站也是我直接部署上线的。你可以把它理解成：我不只交仓库，也交可验证的运行结果。",
      en: "Yes — a reachable production environment is part of my definition of done. Typical loop: full-stack build → alignment and cadence → technical decisions (stack, standards, review, critical path) → Docker images, CI/CD, env config and health checks → cloud/host publish with a rollback plan. I've done AWS, Tencent Cloud, and lightweight VPS setups; this portfolio and the DTC storefront were deployed by me. In short: I don't only hand over a repo — I hand over a verifiable running result.",
    },
  },
  {
    id: "remote",
    question: {
      zh: "人在哪？接受远程 / 出差吗？",
      en: "Where are you based? Remote / travel OK?",
    },
    verdict: {
      zh: "广州 · 深圳",
      en: "Guangzhou · Shenzhen",
    },
    answer: {
      zh: "常驻广州、深圳，珠三角面对面协作成本低。远程协作也很熟：异步文档、周会节奏、PR Review、线上排期与问题升级路径都能稳定运转。短期出差做 kickoff、里程碑对齐或关键上线值班可以接受，具体频次与出差范围按岗位协商。沟通上我倾向「结论先行 + 风险透明」，减少远程场景下的信息损耗。",
      en: "I'm based in Guangzhou / Shenzhen — low friction for GBA onsites. Remote collaboration is familiar too: async docs, weekly cadence, PR review, online planning, and clear escalation paths. Short travel for kickoff, milestone alignment, or critical launch coverage is fine; frequency and scope are negotiable per role. I communicate conclusion-first with risks called out early to cut remote information loss.",
    },
  },
];

export const askIntro: Record<
  Locale,
  { prompt: string; idle: string; typing: string }
> = {
  zh: {
    prompt: "recruit@helong ~ % ask",
    idle: "点左侧问题，我用打字机给你一句实话。",
    typing: "正在组织答案…",
  },
  en: {
    prompt: "recruit@helong ~ % ask",
    idle: "Pick a question — I'll type a straight answer.",
    typing: "Composing answer…",
  },
};
