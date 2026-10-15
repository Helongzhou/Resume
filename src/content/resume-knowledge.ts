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
      zh: `周何龙，全栈开发 / 前端架构方向，约 12–14 年从业经验，常驻深圳 / 广州。
工作语言：普通话、粤语、英语。
个人优势：
1) 全栈技术：Node.js 微服务后端；Vue/Nuxt、React/Next 前端；Taro/uni-app/Flutter/Electron 跨端，覆盖 Web / 小程序 / iOS & Android App / Desktop；IoT 设备侧（MQTT / BLE / OTA）；Docker + CI/CD，阿里云 / AWS / 腾讯云 / Cloudflare 运维。
2) AI 工程化：主导团队 AI 辅助研发体系（Monorepo + Zod 强类型 + Cursor/Claude/GPT 标准化协作），减少联调返工、缩短交付周期。
3) 复杂业务：跨境支付 0→1（FX 汇率、KYC、清结算与资金安全）；兼具新零售（含门店 IoT 硬件）、在线教育、跨境支付与跨境电商交付经验。
4) 团队与交付：7–15 人研发团队管理经验，覆盖需求评审、任务拆解、Code Review 到上线运维；多个项目 0→1 闭环。`,
      en: `Helong Zhou — full-stack / frontend architecture, ~12–14 years experience, based in Shenzhen / Guangzhou.
Languages: Mandarin, Cantonese, English.
Strengths:
1) Full-stack: Node microservices; Vue/Nuxt, React/Next; Taro/uni-app/Flutter/Electron across web, mini programs, iOS & Android, and desktop; IoT device side (MQTT / BLE / OTA); Docker + CI/CD on Aliyun / AWS / Tencent Cloud / Cloudflare.
2) AI engineering: team AI delivery system (Monorepo + Zod + Cursor/Claude/GPT workflows) to cut rework and cycle time.
3) Complex domains: cross-border payments 0→1 (FX, KYC, settlement, fund safety); plus new retail (including in-store IoT hardware), online education, and cross-border commerce.
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
    id: "proj-health-backend",
    kind: "project",
    title: {
      zh: "健康 App 后端",
      en: "Health app backend",
    },
    text: {
      zh: `享相健康 App 后端：用户鉴权、舌诊算法对接、AI 问诊、支付订单，以及独立部署重构。`,
      en: `Health app backend: auth, tongue-diagnosis algorithm integration, AI consultation, payments/orders, and a standalone redeploy.`,
    },
    tags: ["健康", "后端", "AI问诊", "health"],
  },
  {
    id: "company-ksher",
    kind: "company",
    title: {
      zh: "开时科技 · 公司与业务背景",
      en: "Ksher · company context",
    },
    text: {
      zh: `深圳开时科技有限公司（Ksher），2023.03 至今。业务覆盖跨境支付、达人营销 SaaS、跨境多商户商城（FBE）、Ksher 支付 App 与 AI 建站工具。
产品线：B2B 商户端、Ksher 跨境小程序 / Flutter App、OM 后台、换汇微服务、广告投放、AI 营销编辑器、达人 CRM 与建联插件、FBE 多商户商城。
工程方向：企业内部 AI 能力中台（多模型统一 API、技能配置、容灾路由、用量监控）；从 AI 辅助编码升级到 Vibe Coding；Monorepo + Zod + Trellis 强类型约束，把 AI 生成纳入可验证流水线。`,
      en: `Ksher (Shenzhen Kaishi Technology), Mar 2023–present. Covers cross-border payments, creator marketing SaaS, FBE multi-vendor commerce, the Ksher pay app, and AI site-building.
Product lines: B2B merchant portal, Ksher mini program / Flutter app, OM admin, FX microservices, ads, AI marketing editor, creator CRM + outreach plugin, FBE marketplace.
Engineering: internal AI platform (multi-model API, skill config, failover routing, usage monitoring); evolved AI-assisted coding into Vibe Coding; Monorepo + Zod + Trellis typing constraints for verifiable AI pipelines.`,
    },
    tags: ["开时", "Ksher", "跨境支付", "FX", "KYC", "FBE", "达人"],
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
重点：前端基建（Pagoda Design 组件库）、低代码营销页、Serverless、小程序性能、百果园 App（Flutter）、门店电子价签 IoT 管理系统（Wi-Fi + MQTT + BLE，上万 SKU 毫秒级同步变价与 OTA 固件升级）。`,
      en: `Pagoda Group / Pagoda Tech — new-retail store line.
Focus: frontend foundations (Pagoda Design), no-code campaign pages, Serverless, mini-program performance, the Pagoda Flutter app, and the electronic shelf-label IoT platform (Wi-Fi + MQTT + BLE; millisecond price sync across 10k+ SKUs plus OTA firmware upgrades).`,
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
      zh: "FBE 跨境电商商城平台（简历详版）",
      en: "FBE cross-border commerce platform (resume detail)",
    },
    text: {
      zh: `周期：2026.04–至今。角色：全栈开发 · 技术架构规划与交付。
平台能力：C 端购物站 + 商家后台 + 平台运营（佣金、联盟、渠道）；多国家 / 多语言 / 多币种；多商家与品牌独立站模式。
功能：浏览搜索购物车下单支付、物流退货售后、邮件通知、ConnectyCube 客服、Shopify Search / Algolia。
技术：Shopify（Online Store 2.0 / Markets / Checkout）、Hydrogen / Liquid、TypeScript、Tailwind、Shopify Functions / Extensions、Admin GraphQL / Storefront API、Polaris Embedded App、Stripe/PayPal、Docker、AWS、CI/CD、Trellis SDD。
核心技术实现（8 项）：
1) 购物车并发优化：乐观 UI 即时反馈 + 异步提交、失败回滚；针对连续点击、重复提交与多标签页并发，用防抖节流、请求合并、操作版本号与服务端幂等校验减少无效请求和状态覆盖；购物车数量、价格与促销规则做服务端二次校验，避免客户端状态与最终结算结果不一致。
2) 库存扣减与防超卖：自建库存服务以数据库事务、悲观锁（SELECT ... FOR UPDATE）与原子条件更新控制同一 SKU 的并发扣减；高频变更引入乐观锁 / CAS 版本校验减少锁竞争，冲突时有限重试；设计库存预占、支付确认、取消与超时释放流程，结合幂等键与库存流水防止重复扣减 / 重复释放与库存负数；热门 SKU 用请求限流、排队串行化与库存分片控制数据库热点。
3) 订单创建与异步削峰：把订单创建、库存处理、支付通知、物流同步与邮件发送拆为独立步骤，降低同步调用阻塞；用消息队列异步处理非核心任务，做生产消费解耦、消费者并发控制、失败重试与死信处理；订单创建与关键状态变更用事务 + 幂等键 + 状态机，避免重复下单、重复扣库存与并发状态覆盖；按积压量、消费延迟与失败率调整并发度，但对即时性要求高的库存校验与交易确认不盲目异步化。
4) 支付回调与最终一致性：集成 Shopify Payments / Stripe / PayPal，用幂等键、Webhook 事件去重与订单状态校验避免重复处理；回调接收、事件持久化与业务处理解耦，异步执行非关键后续动作，配合有限重试、异常事件记录与定时对账处理回调延迟、乱序与失败；订单状态条件更新，保证并发回调不覆盖已完成 / 已退款等终态。
5) 缓存与数据库性能优化：商品详情、类目、站点配置等读多写少数据做缓存与合理过期策略，结合主动失效与更新事件降低数据库读取压力；优化索引、分页查询与字段投影，避免全表扫描与大结果集传输；高频查询做缓存保护、请求合并与限流，库存与价格等交易关键数据在提交订单时仍以权威数据源校验为准；针对缓存失效的并发回源，用互斥重建、随机过期与热点预热降低击穿风险。
6) 多商家订单与结算：按商家维度拆分订单明细、履约任务与佣金结算，用异步任务 + 幂等执行处理批量结算；通过结算批次号、唯一业务键与流水对账，防止任务重复执行造成佣金重复计算或重复打款；建立统一渠道适配层封装多店铺商品、订单与状态映射。
7) 多国家站点与前端性能：基于 Shopify Markets 做多国家、多语言、多币种配置与区域化展示；用 CDN 分发、图片压缩与响应式加载、代码分割、懒加载与缓存策略降低首屏体积与海外访问延迟；高频交互用局部状态更新与组件粒度拆分减少不必要的 React 渲染，搜索筛选做防抖、取消过期请求与结果缓存。
8) 工程化与线上稳定性：用 Docker、AWS 自定义服务与 GitHub / Gitea Actions 建自动化构建发布流程；围绕接口耗时、错误率、数据库连接池、缓存命中率、队列积压与支付回调失败率建立监控指标；引入 Trellis，以 Spec 规范 + Plan / Execute / Finish 任务编排与分阶段验证提升复杂需求的可追踪性与交付质量。
价值：基于 Shopify 把购物、通知、客服、发货、结算、推广串成完整跨境链路，并把并发、资金与库存风险收敛在可验证的机制内。`,
      en: `Period: Apr 2026–present. Role: full-stack · architecture planning & delivery.
Capabilities: B2C storefront + vendor admin + platform ops (commission, affiliate, channels); multi-country / locale / currency; marketplace and brand-site modes.
Features: catalog/search/cart/checkout, fulfillment/returns, email, ConnectyCube chat, Shopify Search / Algolia.
Stack: Shopify (Online Store 2.0 / Markets / Checkout), Hydrogen / Liquid, TypeScript, Tailwind, Functions / Extensions, Admin GraphQL / Storefront API, Polaris Embedded Apps, Stripe/PayPal, Docker, AWS, CI/CD, Trellis SDD.
Eight core engineering tracks:
1) Cart concurrency: optimistic UI with async submission and rollback; debounce/throttle, request coalescing, operation version numbers and server-side idempotency against double submits and multi-tab edits; server-side re-validation of quantity, price and promotions.
2) Inventory & oversell prevention: DB transactions, pessimistic locks (SELECT ... FOR UPDATE) and atomic conditional updates per SKU; optimistic lock / CAS versioning to cut contention with bounded retries; reservation, payment confirmation, cancellation and timeout release with idempotency keys and stock ledgers to prevent double deduction/release and negative stock; rate limiting, serialized queues and stock sharding for hot SKUs.
3) Order creation & load shedding: split order creation, inventory, payment notice, logistics sync and email into independent steps; message queue for non-critical work with decoupled producers/consumers, concurrency control, retries and dead-letter handling; transactions + idempotency keys + state machines for order creation and key transitions; tune consumer concurrency by backlog, lag and failure rate — without async-ifying latency-critical stock checks.
4) Payment callbacks & eventual consistency: Shopify Payments / Stripe / PayPal with idempotency keys, webhook dedupe and order-state checks; decouple receipt, event persistence and processing; bounded retries, exception logging and scheduled reconciliation for delayed, out-of-order or failed callbacks; conditional order-state updates so concurrent callbacks cannot overwrite terminal states.
5) Cache & database performance: cache read-heavy product, category and site config with sensible TTLs plus active invalidation; index, pagination and field-projection tuning to avoid full scans and large result sets; cache protection, coalescing and rate limits for hot queries while keeping stock/price authoritative at checkout; mutex rebuild, randomized expiry and hot-key warmup against stampedes.
6) Multi-vendor orders & settlement: split order lines, fulfillment tasks and commission by vendor with async, idempotent batch settlement; settlement batch numbers, unique business keys and ledger reconciliation to prevent double commission or double payout; unified channel adapter for multi-store catalog, order and status mapping.
7) Multi-country sites & frontend performance: Shopify Markets for country/locale/currency and regionalized display; CDN, image compression, responsive loading, code splitting, lazy loading and caching to cut first-load size and overseas latency; local state updates and component granularity to reduce React renders, with debounced, cancellable and cached search/filter requests.
8) Delivery engineering & stability: Docker, AWS custom services and GitHub / Gitea Actions pipelines; monitoring around latency, error rate, DB connection pool, cache hit rate, queue backlog and payment-callback failure rate; Trellis specs plus Plan / Execute / Finish orchestration and staged verification.
Value: one Shopify-based loop across shopping, notifications, support, fulfillment, settlement and promotion — with concurrency, money and stock risks contained by verifiable mechanisms.`,
    },
    tags: ["FBE", "DTC", "Shopify", "独立站", "跨境电商"],
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
      zh: "Ksher 开时跨境 App + 小程序",
      en: "Ksher cross-border app + mini program",
    },
    text: {
      zh: `周期：约 2024.03–2025.12。Flutter App（iOS / Android）+ Taro 小程序双端收付款终端，对接 Shopee / Lazada / TikTok 等电商平台及货物 / 服务贸易场景。
双端架构：Flutter + Dart 组件化分层，统一封装网络请求、鉴权、数据模型与业务状态，Platform Channel 对接文件与身份认证等原生能力；Taro + React + TS 抽象公共组件、Hooks、请求层与业务模型；两端共用核心业务模型、API 协议与状态流转，降低多端重复开发。
后端：Directus 承载 FX（UUID 主键、银行回调幂等）；多银行适配层（Adapter / Strategy 统一报价、入金、出金）；分层报价 + 背对背锁汇；多源最优汇率路由；提现换汇状态机；KYC 证件采集与审核；20+ 币种与多行业适配。`,
      en: `Period: ~Mar 2024–Dec 2025. Dual-client collect/payout terminal: Flutter app (iOS / Android) + Taro mini program, integrated with Shopee / Lazada / TikTok and goods/services trade flows.
Dual-client architecture: componentized layered Flutter (unified networking, auth, models, business state; Platform Channels for files and identity); Taro + React + TS with shared components, hooks, request layer and models; both clients share core models, API contracts and state flow to avoid duplicated work.
Backend: Directus FX (UUID keys, idempotent bank callbacks); multi-bank adapters (Adapter / Strategy for quotes, pay-in, pay-out); tiered pricing + back-to-back hedging; best-rate routing; withdrawal/FX state machine; KYC capture/review; 20+ currencies and industry adapters.`,
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
    id: "proj-pagoda-esl",
    kind: "project",
    title: {
      zh: "百果园门店电子价签 IoT 管理系统",
      en: "Pagoda electronic shelf-label IoT platform",
    },
    text: {
      zh: `周期：2022.04–2022.07。面向连锁零售门店的 IoT 电子价签管理平台：统一管理商品名称、产地、价格、介绍与促销信息并远程更新到门店硬件。基于 Wi-Fi + MQTT 构建后台与门店基站的双向通信链路，通过 BLE 蓝牙实现手机 App 与基站的近场连接及改价，打通后台 / App / 基站 / 价签的数据同步闭环，支持批量推送、设备状态管理与 OTA 固件升级。
1) MQTT 设备通信架构：按门店、基站与业务类型规划 Topic，实现商品数据下发、指令路由与执行状态回传；用 Client ID、Keep Alive、QoS、心跳检测与断线重连管理连接生命周期；通过消息 ID、超时控制与业务回执实现指令追踪与执行状态管理。
2) BLE 蓝牙状态机：封装统一 Bluetooth Manager，把设备扫描、连接建立、GATT Service/Characteristic 发现、读写、断开与重连抽象为标准状态机；用异步操作队列、连接超时、并发互斥与会话标识避免并发操作和过期回调导致的状态冲突；异常断连做有限次数重试、退避重连、资源释放及重连后的服务重新发现。
3) 商品数据一致性：以消息 ID、商品版本号、目标设备与执行状态为核心字段，通过幂等校验、版本比较、重复消息过滤与失败补偿，降低消息重复、乱序及设备离线造成的数据不一致；区分消息发送、基站接收、价签执行等阶段，结合执行回执与状态对账提升可追踪性。
4) OTA 固件升级：固件版本管理、升级任务下发、二进制分包传输与升级结果回传；按设备协议设置分包序号、偏移量、长度与校验字段，通过 ACK 确认、超时重传与发送窗口控制提高可靠性；以升级状态机管理固件传输、完整性校验、设备写入、重启验证与结果确认，并针对断线、缺包和升级失败设计断点续传与异常恢复。
价值：上万 SKU 价格毫秒级同步变价，门店改价从人工操作变成可追踪、可对账的系统能力。`,
      en: `Period: Apr–Jul 2022. IoT electronic shelf-label platform for retail stores: centrally manage product name, origin, price, description, and promotions, then push updates to in-store hardware. Wi-Fi + MQTT links the backend to store base stations; BLE connects a phone app to base stations for near-field price changes, closing the loop across backend / app / base station / label with batch push, device-state management, and OTA firmware upgrades.
1) MQTT device architecture: topics planned by store, base station, and business type for data push, command routing, and execution receipts; connection lifecycle via Client ID, Keep Alive, QoS, heartbeats, and reconnect; command tracking through message IDs, timeouts, and business ACKs.
2) BLE state machine: a unified Bluetooth Manager modelling scan, connect, GATT service/characteristic discovery, read/write, disconnect, and reconnect as a state machine; async operation queues, connect timeouts, mutual exclusion, and session IDs prevent conflicting concurrent operations and stale callbacks; bounded retries, backoff reconnect, resource release, and service re-discovery after reconnect.
3) Product data consistency: message ID, product version, target device, and execution status drive idempotency checks, version comparison, duplicate filtering, and failure compensation against duplicates, reordering, and offline devices; send / base-station receipt / label execution stages are distinguished for traceability and reconciliation.
4) OTA firmware upgrade: version management, task dispatch, chunked binary transfer, and result reporting; packet sequence, offset, length, and checksum fields with ACK, timeout retransmit, and send-window control; an upgrade state machine covers transfer, integrity check, device write, reboot verification, and confirmation, with resume-from-break and failure recovery.
Value: millisecond price sync across 10k+ SKUs — in-store price changes became a traceable, reconcilable system capability.`,
    },
    tags: ["IoT", "MQTT", "BLE", "OTA", "电子价签", "百果园"],
  },
  {
    id: "proj-pagoda-app",
    kind: "project",
    title: {
      zh: "百果园 App（Flutter）",
      en: "Pagoda app (Flutter)",
    },
    text: {
      zh: `周期：2021.04–2022.02。面向 C 端的自营水果生鲜 App，覆盖商品浏览下单、团购拼团、次日达履约；支撑多仓多店协同、鲜品履约时效与营销活动快速迭代。
1) Flutter 跨端工程化：Melos monorepo 按业务域拆包（首页、商品、交易、团购、履约、我的），沉淀共享 packages（UI Kit、network、analytics、common）；统一 GoRouter 路由、Dio 拦截器（Token 刷新 / 重试 / 签名）、Riverpod / Bloc 状态管理与 Design Token 主题体系；Flavor 多环境 + build_runner / freezed / json_serializable 代码生成。
2) 自营生鲜交易链路：商品详情、购物车、结算、支付、订单与售后闭环；库存预占倒计时、规格 / 份量校验与价格一致性校验；支付结果以 Webhook + 主动查单双通道确认，配合本地订单状态机与幂等 Key 规避重复支付与脏数据。
3) 团购业务引擎：开团 / 参团 / 成团 / 失败回滚状态机；活动库存独立池、成团倒计时、Deep Link / Universal Link 分享回流；关键写操作用乐观锁与接口幂等保障高并发拼团一致性。
4) 次日达履约：截单时间、配送波次、可配送时段与地址可达性校验；订单节点（待分拣 / 配送中 / 已签收）支持长连接 / 轮询双模刷新；异常单触发本地提醒与客服入口。
5) 多仓多店适配：定位与 Geofencing 配送围栏自动匹配门店 / 仓；切店后 Repository 层失效缓存并联动刷新 SKU 可售态、库存、运费与时效；抽象 StoreContext 降低多城市扩展成本。
6) 营销与算价能力：优惠券、满减、套餐组合、限时秒杀；结算页统一算价编排（商品价 → 活动优惠 → 运费 / 包装费 → 实付），活动规则组件化复用，保证前后端价格一致、可对账。
7) 体验与性能优化：分页 + 图片懒加载（cached_network_image）+ 列表复用；预取门店配置与购物车；Isolate 处理图片压缩 / JSON 解析；弱网重试、骨架屏与本地兜底。
8) 线上稳定与发布：Firebase Crashlytics / Sentry 崩溃监控、埋点与关键接口告警；Fastlane + CI/CD 自动化打包，支持灰度放量与版本回滚；支付回调、库存扣减、成团结果做幂等与补偿。
价值：以 Flutter 工程化缩短 iOS / Android 双端交付周期，团购与次日达能力工程化落地，交易 / 仓店 / 营销统一抽象后可快速扩展城市与业态。`,
      en: `Period: Apr 2021–Feb 2022. Consumer fresh-grocery app covering browsing and checkout, group-buy, and next-day delivery; supports multi-warehouse/multi-store coordination and fast campaign iteration.
1) Flutter engineering: Melos monorepo split by domain (home, catalog, trade, group-buy, fulfillment, profile) with shared packages (UI Kit, network, analytics, common); unified GoRouter, Dio interceptors (token refresh / retry / signing), Riverpod / Bloc state management and Design Token theming; flavor environments plus build_runner / freezed / json_serializable codegen.
2) Fresh-grocery trade flow: product detail, cart, checkout, payment, orders, and after-sales; stock reservation countdown, spec/quantity checks, and price-consistency validation; payment confirmation via webhook plus active polling with a local order state machine and idempotency keys to avoid duplicate charges and dirty data.
3) Group-buy engine: open / join / success / failure-rollback state machine; dedicated campaign stock pools, countdowns, and Deep Link / Universal Link sharing; optimistic locks and API idempotency for high-concurrency consistency.
4) Next-day fulfillment: cut-off times, delivery waves, serviceable slots, and address reachability checks; order nodes (picking / delivering / delivered) refreshed via long connection or polling; exceptions trigger local reminders and support entry points.
5) Multi-warehouse/multi-store: location and Geofencing delivery fences auto-match a store or warehouse; switching stores invalidates repository caches and refreshes SKU availability, stock, shipping, and lead time; an abstract StoreContext lowers multi-city expansion cost.
6) Marketing and pricing: coupons, threshold discounts, bundles, flash sales; a unified checkout price pipeline (item price → promotions → shipping/packaging → payable) with reusable rule components so client and server prices reconcile.
7) UX and performance: pagination, lazy images (cached_network_image), list reuse; prefetch store config and cart; Isolates for image compression and JSON parsing; retries, skeletons, and local fallbacks on weak networks.
8) Stability and release: Firebase Crashlytics / Sentry, analytics, and key-API alerting; Fastlane + CI/CD packaging with staged rollout and version rollback; idempotency and compensation for payment callbacks, stock deduction, and group-buy results.
Value: Flutter engineering shortened dual-platform delivery; group-buy and next-day delivery became engineered capabilities; unified trade/store/marketing abstractions made new cities and formats fast to add.`,
    },
    tags: ["Flutter", "生鲜电商", "团购", "次日达", "多仓多店", "百果园"],
  },
  {
    id: "proj-shengxue-erp",
    kind: "project",
    title: {
      zh: "升学 ERP 微前端",
      en: "Shengxue ERP micro-frontends",
    },
    text: {
      zh: `周期：约 2019.10–2020.09。升学企业 ERP / 经营管理系统，覆盖客户管理、销售、流量运营、业务前台、财务等核心业务域。
架构：针对各业务域独立迭代诉求，用 iframe + postMessage + cnpm 私有包构建微前端，主应用统一管理路由、子应用生命周期、登录态与跨应用通信；按业务域划分系统边界，支持多业务线并行开发与独立部署；统一 API、公共组件与基础工具包沉淀跨系统能力。
攻克：子应用保活 / LRU 缓存、origin 校验通信、样式隔离、状态快照恢复、多技术栈依赖与版本冲突（peerDependencies + 版本锁）。
价值：把客户、销售、流量、财务等复杂企业业务模块化沉淀，形成「业务流程 → 系统模块 → 数据交互 → 技术实现 → 上线迭代」的完整闭环。`,
      en: `Period: ~Oct 2019–Sep 2020. Shengxue enterprise ERP / operations system spanning customer management, sales, traffic operations, business front-end, and finance.
Architecture: micro-frontends via iframe + postMessage + private cnpm packages so each domain iterates independently; the host app owns routing, child lifecycle, session, and cross-app messaging; boundaries split by domain for parallel development and independent deploys; shared API, components, and utilities.
Hard problems: child keep-alive / LRU caching, origin-checked messaging, style isolation, state snapshot restore, and multi-stack dependency conflicts (peerDependencies + version locks).
Value: modularised customer, sales, traffic, and finance domains into a full loop from business process → system modules → data exchange → implementation → iteration.`,
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
      zh: `周期：约 2018.10–2019.10。基于 Electron 的跨平台即时通讯桌面应用：单聊、群聊、撤回 / 回复 / 转发、文件传输、消息搜索、音视频通话、离线消息同步与静默热更新。
1) 实时通信与并发调度：WebSocket 长连接 + 心跳 / 断线重连；服务端用消息队列解耦消息接入、持久化与推送，异步消费、消费者并发控制、批量写入与积压监控；群聊消息按会话 / 用户维度拆分投递任务，结合在线连接路由与限流提升分发效率。
2) 消息时序与可靠性：clientMsgId + 服务端序列号 + ACK 确认，实现乐观更新、幂等去重、乱序缓冲与顺序重排；超时重试、指数退避、缺失消息检测与游标补偿。
3) 前端高频并发优化：消息缓冲区 + 批量状态合并 + 定时批处理，减少逐条更新 Redux 造成的重复渲染；按会话拆分状态、选择性订阅与虚拟列表降低 DOM 开销。
4) 连接与异步任务管理：连接状态机、重连锁与退避策略避免重复建连；发送、历史拉取与补偿同步做并发限额与优先级调度。
5) 离线缓存与增量同步：IndexedDB 缓存会话与历史消息，按会话维护同步游标，REST 分页拉增量；批量写入、主键去重与任务合并。
6) 文件传输：分片上传、有限并发任务池、进度追踪与失败分片重试，结合完整性校验。
7) 架构与安全治理：主进程 / 渲染进程分离与 IPC 封装，Context Isolation、禁用 Node 集成与 CSP 收敛权限；Sentry + Electron-log、监听器清理与内存泄漏排查。
8) 自动更新：版本检测、更新包下载、完整性校验与安装状态管理，支持失败恢复。
成果：注册用户 10 万+，日活约 80%，次月留存约 60%，日均消息约 50 万条。技术：React / Redux、Ant Design、Node.js + MongoDB、AES / RSA / HMAC、虚拟列表、安全沙箱。`,
      en: `Period: ~Oct 2018–Oct 2019. Cross-platform Electron IM desktop app: 1:1 and group chat, recall/reply/forward, file transfer, message search, A/V calls, offline sync, and silent hot updates.
1) Realtime messaging and concurrency: WebSocket with heartbeat/reconnect; server-side message queue decoupling ingest, persistence, and push, with async consumers, concurrency control, batch writes, and backlog monitoring; group fan-out split by conversation/user with online-connection routing and rate limiting.
2) Ordering and reliability: clientMsgId + server sequence numbers + ACKs for optimistic updates, idempotent dedupe, out-of-order buffering, and reordering; timeout retries, exponential backoff, missing-message detection, and cursor compensation.
3) High-frequency frontend optimisation: message buffers, batched state merges, and timed batching to avoid per-message Redux re-renders; per-conversation state, selective subscriptions, and virtual lists.
4) Connection and async task management: connection state machine, reconnect locks and backoff to avoid duplicate sockets; concurrency limits and priority scheduling for sends, history pulls, and compensation sync.
5) Offline cache and incremental sync: IndexedDB for conversations/history with per-conversation cursors and paginated REST deltas; batch writes, primary-key dedupe, task coalescing.
6) File transfer: chunked uploads, bounded concurrency pool, progress tracking, failed-chunk retry, and integrity checks.
7) Architecture and security: main/renderer separation with IPC wrappers, Context Isolation, Node integration disabled, CSP; Sentry + Electron-log, listener cleanup, leak hunting.
8) Auto-update: version checks, package download, integrity verification, install-state management, and failure recovery.
Results: 100k+ registered users, ~80% DAU, ~60% next-month retention, ~500k messages/day. Stack: React / Redux, Ant Design, Node.js + MongoDB, AES / RSA / HMAC, virtual lists, hardened sandbox.`,
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
跨端：Taro、uni-app、Flutter、Ionic/Cordova、Electron、微信小程序（含 iOS & Android 原生上架）。
IoT：MQTT 设备通信、BLE 蓝牙状态机、Wi-Fi 基站链路、OTA 固件升级、设备幂等与状态对账。
后端：Node.js、Koa、Egg.js、Express、NestJS、Shopify、Directus、微服务、消息队列（RabbitMQ）、REST。
数据：MySQL、PostgreSQL、MongoDB、Redis、Prisma、Drizzle、Sequelize。
工程：Monorepo（Melos / Turborepo / Yarn）、Zod 强类型、CI/CD、Docker、AWS、腾讯云、阿里云、Cloudflare。
AI：LLM API、Agent、多模型路由、流式输出、SDD/Trellis/Vibe Coding、Token 成本优化。`,
      en: `Frontend: Vue/Nuxt, React/Next.js, TypeScript, Tailwind, micro-frontends, component libs, low-code, visual editors.
Cross-platform: Taro, uni-app, Flutter, Ionic/Cordova, Electron, WeChat mini programs (incl. iOS & Android store releases).
IoT: MQTT device messaging, BLE state machines, Wi-Fi base-station links, OTA firmware upgrades, device idempotency and state reconciliation.
Backend: Node.js, Koa, Egg.js, Express, NestJS, Shopify, Directus, microservices, message queues (RabbitMQ), REST.
Data: MySQL, PostgreSQL, MongoDB, Redis, Prisma, Drizzle, Sequelize.
Engineering: Monorepo (Melos / Turborepo / Yarn), Zod, CI/CD, Docker, AWS, Tencent Cloud, Aliyun, Cloudflare.
AI: LLM APIs, agents, multi-model routing, streaming, SDD/Trellis/Vibe Coding, token-cost optimization.`,
    },
    tags: ["技术栈", "skills", "stack", "Node", "Next.js"],
  },
];
