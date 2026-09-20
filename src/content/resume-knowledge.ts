import type { Locale } from "@/i18n/routing";

export type ResumeKnowledgeDoc = {
  id: string;
  kind: "experience" | "project" | "skill" | "profile" | "education" | "company";
  title: Record<Locale, string>;
  text: Record<Locale, string>;
  tags: string[];
};

/**
 * Structured knowledge extracted from 周何龙简历-全栈.pdf.
 * Intentionally excludes phone number and salary expectations.
 */
export const resumeKnowledgeDocs: ResumeKnowledgeDoc[] = [
  {
    id: "resume-profile",
    kind: "profile",
    title: {
      zh: "简历摘要 · 个人优势",
      en: "Resume summary · strengths",
    },
    text: {
      zh: `周何龙，全栈工程师 / 前端架构方向，约 12–14 年从业经验，常驻深圳 / 广州。
工作语言：普通话、粤语、英语。
个人优势：
1) 全栈技术：Node.js 微服务后端；Vue/Nuxt、React/Next 前端；Taro/uni-app/Flutter/Electron 跨端；Docker + CI/CD，阿里云 / AWS / Cloudflare 云原生运维。
2) AI 工程化：主导团队 AI 辅助研发体系（Monorepo + Zod 强类型 + Cursor/Claude/GPT 标准化协作），减少联调返工、缩短交付周期。
3) 复杂业务：跨境支付 0→1（FX 汇率、KYC、清结算与资金安全）；兼具新零售、在线教育、跨境支付与跨境电商交付经验。
4) 团队与交付：7–15 人研发团队管理经验，覆盖需求评审、任务拆解、Code Review 到上线运维；多个项目 0→1 闭环。`,
      en: `Helong Zhou — full-stack / frontend architecture, ~12–14 years experience, based in Shenzhen / Guangzhou.
Languages: Mandarin, Cantonese, English.
Strengths:
1) Full-stack: Node microservices; Vue/Nuxt, React/Next; Taro/uni-app/Flutter/Electron; Docker + CI/CD; Aliyun / AWS / Cloudflare.
2) AI engineering: team AI delivery system (Monorepo + Zod + Cursor/Claude/GPT workflows) to cut rework and cycle time.
3) Complex domains: cross-border payments 0→1 (FX, KYC, settlement, fund safety); also new retail, online education, cross-border commerce.
4) Team delivery: led teams of 7–15 across review, planning, Code Review, and production ops; multiple 0→1 launches.`,
    },
    tags: ["简历", "优势", "全栈", "AI", "resume", "strengths"],
  },
  {
    id: "education",
    kind: "education",
    title: {
      zh: "教育经历",
      en: "Education",
    },
    text: {
      zh: `华南理工大学 · 本科 · 计算机科学与技术（2020–2022）
中国民航大学 · 大专 · 民航运输（2009–2012）`,
      en: `South China University of Technology — Bachelor, Computer Science & Technology (2020–2022)
Civil Aviation University of China — Associate, Civil Aviation Transport (2009–2012)`,
    },
    tags: ["教育", "华工", "民航", "education"],
  },
  {
    id: "company-sanluwu",
    kind: "company",
    title: {
      zh: "叁陆伍智慧 · 公司与业务背景",
      en: "365 Wisdom · company context",
    },
    text: {
      zh: `叁陆伍智慧（北京）医疗科技有限公司。业务线覆盖达人营销 SaaS、跨境多商户商城、健康 App 后端等。
技术侧重点：多端架构、跨团队协作、上线运维，以及 SDD + Trellis 的 AI 标准交付流程。
补充项目：享相健康 App 后端（用户鉴权、舌诊算法对接、AI 问诊、支付订单、独立部署重构）；达人管理与 AI 智能建联（批量导入分析、AI 邮件、IMAP 回复监听）；企业内部 AI 能力中台（多模型统一 API、技能配置、容灾路由、用量监控）；TypeScript + Drizzle ORM 自研 MySQL 迁移运行器（版本化脚本、checksum、幂等、可回滚、接入 CI/CD）。`,
      en: `365 Wisdom Medical Technology. Product lines: creator marketing SaaS, cross-border multi-vendor commerce, health-app backends.
Focus: multi-end architecture, cross-team delivery, production ops, and SDD + Trellis AI delivery workflow.
Also: Xiangxiang Health app backend (auth, tongue-diagnosis algorithms, AI consult, payments, redeploy planning); creator CRM + AI outreach (import/analysis, AI email, IMAP reply listening); internal AI platform (multi-model API, skill config, failover routing, usage monitoring); custom MySQL migrator on TypeScript + Drizzle (versioned scripts, checksum, idempotent/rollback, CI/CD).`,
    },
    tags: ["叁陆伍", "365", "达人", "健康", "AI中台", "sanluwu"],
  },
  {
    id: "company-ksher",
    kind: "company",
    title: {
      zh: "开时科技 · 公司与业务背景",
      en: "Ksher · company context",
    },
    text: {
      zh: `深圳开时科技有限公司（Ksher）。核心业务为跨境支付与商户增长工具。
涉及系统：B2B 商户端、Ksher 跨境小程序、OM 后台、换汇微服务、广告投放、AI 营销编辑器 / 建站工具。
工程方向：从 AI 辅助编码升级到 Vibe Coding；Monorepo + Zod + TryTrellis 强类型约束，把 AI 生成纳入可验证流水线。`,
      en: `Ksher (Shenzhen Kaishi Technology). Core: cross-border payments and merchant growth tooling.
Systems: B2B merchant portal, Ksher mini program, OM admin, FX microservices, ads, AI marketing editor / site builder.
Engineering: evolved AI-assisted coding into Vibe Coding; Monorepo + Zod + TryTrellis typing constraints for verifiable AI pipelines.`,
    },
    tags: ["开时", "Ksher", "跨境支付", "FX", "KYC"],
  },
  {
    id: "company-pagoda",
    kind: "company",
    title: {
      zh: "百果园 · 公司与业务背景",
      en: "Pagoda · company context",
    },
    text: {
      zh: `深圳百果园实业（集团）股份有限公司 · 百果科技 · 新零售门店业务线。
重点：前端基建（Pagoda Design 组件库）、低代码营销页、Serverless、小程序性能、门店电子价签 IoT 实时变价（上万 SKU 毫秒级同步）。`,
      en: `Pagoda Group / Pagoda Tech — new-retail store line.
Focus: frontend foundations (Pagoda Design), no-code campaign pages, Serverless, mini-program performance, electronic shelf-label IoT with millisecond price sync across 10k+ SKUs.`,
    },
    tags: ["百果园", "Pagoda", "新零售", "价签", "组件库"],
  },
  {
    id: "company-shengxue",
    kind: "company",
    title: {
      zh: "升学教育 · 公司与业务背景",
      en: "Shengxue Education · company context",
    },
    text: {
      zh: `深圳市升学文化传播有限公司。在线教育产品矩阵：学员 ERP、教师端/学员端 IM、习题库 App、教学直播、在线学习站点。
工程重点：统一技术栈与工程化、微前端（iframe + postMessage）、Electron 桌面 IM。`,
      en: `Shengxue Education. Product matrix: student ERP, teacher/student IM, question-bank app, live teaching, learning sites.
Engineering: unified stacks, micro-frontends (iframe + postMessage), Electron desktop IM.`,
    },
    tags: ["升学", "在线教育", "ERP", "IM", "微前端"],
  },
  {
    id: "company-qiyiniu",
    kind: "company",
    title: {
      zh: "奇异牛 · 公司与业务背景",
      en: "Qiyiniu · company context",
    },
    text: {
      zh: `奇异牛科技（深圳）有限公司。社交 / 生活服务与跨境电商相关产品：户动 App、麦麦拍 WebApp、后台与营销站、抢票高并发活动页；并有 Egg.js + Seneca + RabbitMQ 微服务后端。`,
      en: `Qiyiniu Technology. Social / lifestyle and commerce products: Hudong app, Maimaipai WebApp, admin/marketing sites, high-concurrency ticket-rush pages; Egg.js + Seneca + RabbitMQ microservice backends.`,
    },
    tags: ["奇异牛", "户动", "麦麦拍", "社交", "生活服务"],
  },
  {
    id: "proj-fbe-detail",
    kind: "project",
    title: {
      zh: "FBE 跨境多商户独立站（简历详版）",
      en: "FBE multi-vendor DTC (resume detail)",
    },
    text: {
      zh: `周期：2026.06–至今。角色：全栈开发 / 技术规划与交付。
平台能力：C 端购物站 + 商家后台 + 平台运营（佣金、联盟、渠道）；多国家 / 多语言 / 多币种。
功能：浏览搜索购物车下单支付、物流退货售后、邮件通知、ConnectyCube 客服、Algolia/Meilisearch 搜索。
技术：MedusaJS/Mercur、Next.js 15 App Router、React 19、Tolgee、Vendor/Channel Vite SPA、Stripe/PayPal、Docker、AWS（ALB/RDS/Redis/Meilisearch）、Gitea Actions、Trellis SDD。
价值：把购物、通知、客服、发货、结算、推广串成完整跨境链路。`,
      en: `Period: Jun 2026–present. Role: full-stack planning & delivery.
Capabilities: B2C storefront + vendor admin + platform ops (commission, affiliate, channels); multi-country/locale/currency.
Features: catalog/search/cart/checkout, fulfillment/returns, email, ConnectyCube chat, Algolia/Meilisearch.
Stack: MedusaJS/Mercur, Next.js 15 App Router, React 19, Tolgee, Vite vendor/channel SPAs, Stripe/PayPal, Docker, AWS, Gitea Actions, Trellis SDD.
Value: end-to-end cross-border commerce loop.`,
    },
    tags: ["FBE", "DTC", "MedusaJS", "独立站", "跨境电商"],
  },
  {
    id: "proj-creator-detail",
    kind: "project",
    title: {
      zh: "达人平台星策（简历详版）",
      en: "Creator platform (resume detail)",
    },
    text: {
      zh: `周期：2026.06–至今。角色：项目管理及技术架构。
主链路：商家发种草任务 → 达人招募履约 → 资金结算（预充值/占用/释放/退款/提现）。
增长能力：公域达人采量爬虫 + CRM；浏览器建联插件；AI Agent（筛选、画像、意向、话术/邮件）；多模型分层路由。
价值：可规模化的 TikTok/抖音种草增长飞轮。`,
      en: `Period: Jun 2026–present. Role: program lead & architecture.
Core loop: merchant campaigns → creator fulfillment → settlement (reserve/release/refund/payout).
Growth: public creator crawling + CRM; outreach browser plugin; AI agents (scoring, profiling, intent, scripts/email); tiered multi-model routing.
Value: scalable TikTok/Douyin seeding growth flywheel.`,
    },
    tags: ["达人", "星策", "TikTok", "CRM", "Agent"],
  },
  {
    id: "proj-ksher-editor",
    kind: "project",
    title: {
      zh: "Ksher AI 营销落地页编辑器",
      en: "Ksher AI marketing page editor",
    },
    text: {
      zh: `周期：约 2026.02–2026.04。从 H5 拖拽编辑演进为 AI 对话式建站。
要点：/grill-me 意图澄清 + TryTrellis Spec；Monorepo Zod→Prisma→TS 端到端类型安全；Transform Stream 缓冲与 Token 压缩（API 成本约降 40%）；自研打字机画布约 60fps；Git 式对话快照回滚；LLM Provider 隔离 + iframe Sandbox/CSP。
可视化底座：Vue + Koa + MongoDB，拖拽、iframe 预览、html2canvas/Puppeteer 截图。`,
      en: `Period: ~Feb–Apr 2026. Evolved from H5 drag editor to AI conversational site-building.
Highlights: grill-me intent clarification + TryTrellis specs; Zod→Prisma→TS typing; stream buffering + token compression (~40% API cost cut); ~60fps typewriter canvas; git-like chat snapshots; provider isolation + iframe sandbox/CSP.
Visual base: Vue + Koa + MongoDB with drag/preview/screenshot pipelines.`,
    },
    tags: ["Ksher", "AI建站", "编辑器", "Vibe Coding", "Zod"],
  },
  {
    id: "proj-ksher-mini",
    kind: "project",
    title: {
      zh: "Ksher 开时跨境小程序",
      en: "Ksher cross-border mini program",
    },
    text: {
      zh: `周期：约 2024.03–2025.12。Taro 跨端收付款小程序，对接 Shopee/Lazada/TikTok 等场景。
后端：Directus 承载 FX（UUID 主键、银行回调幂等）；多银行适配层；分层报价 + 背对背锁汇；多源最优汇率路由；提现换汇状态机；KYC 证件采集与审核；20+ 币种与多行业适配。`,
      en: `Period: ~Mar 2024–Dec 2025. Taro mini program for cross-border collect/payout across Shopee/Lazada/TikTok-like flows.
Backend: Directus FX (UUID keys, idempotent bank callbacks); multi-bank adapters; tiered pricing + back-to-back hedging; best-rate routing; withdrawal/FX state machine; KYC capture/review; 20+ currencies and industry adapters.`,
    },
    tags: ["小程序", "Taro", "FX", "KYC", "Directus", "支付"],
  },
  {
    id: "proj-pagoda-design",
    kind: "project",
    title: {
      zh: "pagoda-design 组件库",
      en: "pagoda-design component library",
    },
    text: {
      zh: `周期：约 2020.10–2023.03。Vue 双端组件库（PC Element / Mobile Vant），50+ 业务组件。
代表组件：SKU 选择、库存态、价签、增强表格（虚拟滚动）、树选、上传对接内部 OSS。
价值：页面工时约 3 天→1.5 天；统一多线 UI/UX。`,
      en: `Period: ~Oct 2020–Mar 2023. Vue dual-end library (Element PC / Vant Mobile), 50+ business components.
Examples: SKU selector, stock status, price tags, enhanced table with virtual scroll, tree select, OSS upload.
Impact: page build time ~3 days → 1.5 days; unified UX across lines.`,
    },
    tags: ["Pagoda", "组件库", "Vue", "Storybook"],
  },
  {
    id: "proj-pagoda-serverless",
    kind: "project",
    title: {
      zh: "pagoda-serverless 云函数平台",
      en: "pagoda-serverless platform",
    },
    text: {
      zh: `周期：约 2021.03–2022.11。自研 Express 类 FaaS：函数在线编辑热更新、超时/沙箱、code-server IDE、版本快照回滚、调用可观测。
价值：营销页等高频变更场景免运维、按需触发、可回滚。`,
      en: `Period: ~Mar 2021–Nov 2022. Custom Express-like FaaS: hot-edit functions, timeout/sandbox, code-server IDE, version snapshots/rollback, observability.
Value: ops-light, on-demand deploys with rollback for campaign pages.`,
    },
    tags: ["Serverless", "FaaS", "百果园", "营销页"],
  },
  {
    id: "proj-shengxue-erp",
    kind: "project",
    title: {
      zh: "升学 ERP 微前端",
      en: "Shengxue ERP micro-frontends",
    },
    text: {
      zh: `周期：约 2019.10–2020.09。iframe + postMessage + cnpm 私有包微前端。
攻克：子应用保活/LRU、origin 校验通信、样式隔离、状态快照恢复。
价值：异构栈独立部署、多产品线并行。`,
      en: `Period: ~Oct 2019–Sep 2020. Micro-frontends via iframe + postMessage + private cnpm packages.
Hard problems: keep-alive/LRU, origin-checked messaging, style isolation, state snapshot restore.
Value: independent deploys across heterogeneous stacks.`,
    },
    tags: ["微前端", "ERP", "升学", "iframe"],
  },
  {
    id: "proj-shengxue-im",
    kind: "project",
    title: {
      zh: "升学 IM 桌面端",
      en: "Shengxue Electron IM",
    },
    text: {
      zh: `周期：约 2018.10–2019.10。Electron IM：消息/群聊/文件/音视频；IndexedDB 离线；静默热更新。
成果：注册用户 10万+，日均消息约 50 万。技术：React/Redux、WebSocket、AES/RSA/HMAC、虚拟列表、安全沙箱。`,
      en: `Period: ~Oct 2018–Oct 2019. Electron IM with messaging/groups/files/AV; IndexedDB offline; silent hot update.
Results: 100k+ registered users, ~500k daily messages. Stack: React/Redux, WebSocket, AES/RSA/HMAC, virtual lists, hardened sandbox.`,
    },
    tags: ["Electron", "IM", "升学", "WebSocket"],
  },
  {
    id: "proj-hudong",
    kind: "project",
    title: {
      zh: "户动 App（Ionic 混合应用）",
      en: "Hudong app (Ionic hybrid)",
    },
    text: {
      zh: `周期：约 2016.07–2017.03。Ionic + Cordova 双端：拍照上传、外卖比价、团购、推送；独立完成安卓市场与 App Store 上架。`,
      en: `Period: ~Jul 2016–Mar 2017. Ionic + Cordova Android/iOS: camera upload, food delivery comparison, group-buy, push; owned store submissions.`,
    },
    tags: ["Ionic", "Cordova", "户动", "移动端"],
  },
  {
    id: "proj-maimaipai-backend",
    kind: "project",
    title: {
      zh: "麦麦拍后台微服务",
      en: "Maimaipai backend microservices",
    },
    text: {
      zh: `周期：约 2016.03–2016.12。Egg.js + Seneca + RabbitMQ + MySQL/Redis；JWT/Joi/Sequelize；TDD。支撑高并发活动与 B 端运营。`,
      en: `Period: ~Mar–Dec 2016. Egg.js + Seneca + RabbitMQ + MySQL/Redis; JWT/Joi/Sequelize; TDD. Supported high-concurrency campaigns and admin ops.`,
    },
    tags: ["Egg.js", "Seneca", "RabbitMQ", "微服务", "麦麦拍"],
  },
  {
    id: "exp-airchina",
    kind: "experience",
    title: {
      zh: "中国国际航空 · 航空配载",
      en: "Air China · cargo load planning",
    },
    text: {
      zh: `周期：2012.07–2015.03。天津运营基地国际航空货运配载员。使用 eTerm 黑屏系统完成舱位分配、装载方案、装卸指令与应急调整，保障载重平衡与准点。`,
      en: `Period: Jul 2012–Mar 2015. International air-cargo load planner at Tianjin base. Used eTerm for bay allocation, load plans, ground instructions, and emergency adjustments under safety/on-time constraints.`,
    },
    tags: ["国航", "航空", "配载", "eTerm"],
  },
  {
    id: "resume-skills-detail",
    kind: "skill",
    title: {
      zh: "简历技术栈详表",
      en: "Resume tech stack detail",
    },
    text: {
      zh: `前端：Vue / Nuxt、React / Next.js、TypeScript、Tailwind、微前端、组件库、低代码、可视化编辑器。
跨端：Taro、uni-app、Flutter、Ionic/Cordova、Electron、微信小程序。
后端：Node.js、Koa、Egg.js、Express、MedusaJS、Directus、微服务、RabbitMQ、REST。
数据：MySQL、PostgreSQL、MongoDB、Redis、Prisma、Drizzle、Sequelize。
工程：Monorepo（Turborepo/Yarn）、Zod 强类型、CI/CD、Docker、AWS、腾讯云、阿里云、Cloudflare。
AI：LLM API、Agent、多模型路由、流式输出、SDD/Trellis/Vibe Coding、Token 成本优化。`,
      en: `Frontend: Vue/Nuxt, React/Next.js, TypeScript, Tailwind, micro-frontends, component libs, low-code, visual editors.
Cross-platform: Taro, uni-app, Flutter, Ionic/Cordova, Electron, WeChat mini programs.
Backend: Node.js, Koa, Egg.js, Express, MedusaJS, Directus, microservices, RabbitMQ, REST.
Data: MySQL, PostgreSQL, MongoDB, Redis, Prisma, Drizzle, Sequelize.
Engineering: Monorepo (Turborepo/Yarn), Zod, CI/CD, Docker, AWS, Tencent Cloud, Aliyun, Cloudflare.
AI: LLM APIs, agents, multi-model routing, streaming, SDD/Trellis/Vibe Coding, token-cost optimization.`,
    },
    tags: ["技术栈", "skills", "stack", "Node", "Next.js"],
  },
];
