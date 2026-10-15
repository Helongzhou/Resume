import type { Locale } from "@/i18n/routing";

export type ProjectStatus = "live" | "preview";

export type DemoPortal = {
  role: Record<Locale, string>;
  url: string;
};

export type DemoAccount = {
  role: Record<Locale, string>;
  email: string;
  password: string;
  note: Record<Locale, string>;
};

export type DemoFlow = {
  title: Record<Locale, string>;
  steps: Record<Locale, string[]>;
  point: Record<Locale, string>;
};

export type ProjectDemo = {
  note: Record<Locale, string>;
  disclaimer: Record<Locale, string>;
  portals: DemoPortal[];
  accounts: DemoAccount[];
  flows: DemoFlow[];
  architecture: Record<Locale, string>;
};

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
  demo?: ProjectDemo;
};

export const projects: Project[] = [
  {
    slug: "fbe-dtc",
    status: "live",
    liveUrl: "https://dtc.saaslab.cn",
    coverGradient:
      "linear-gradient(145deg, #1a2332 0%, #0d3d3a 45%, #1c2a1f 100%)",
    tags: ["Shopify", "Hydrogen", "DTC", "Multi-vendor"],
    title: {
      zh: "FBE 跨境电商商城平台",
      en: "FBE Cross-Border Commerce Platform",
    },
    summary: {
      zh: "公司自建的跨境在线商城：消费者可直接浏览、下单、支付；商家可管理商品与订单；平台统一管理多商家、多国家、多语言、多币种业务。",
      en: "Self-built cross-border commerce: shoppers browse, checkout, and pay; merchants manage catalog and orders; the platform unifies multi-vendor, multi-country, multi-language, and multi-currency ops.",
    },
    role: {
      zh: "全栈开发 · 技术规划与交付",
      en: "Full-stack · Architecture & Delivery",
    },
    period: {
      zh: "2026.04 — 至今",
      en: "Apr 2026 — Present",
    },
    highlights: {
      zh: [
        "负责整体技术架构规划、核心模块设计与研发交付，协调商城、商家后台、支付与渠道系统协同上线",
        "主导 Shopify 商城与自定义 App 架构设计，建设多国家站点、多语言、多币种与多商家扩展能力",
        "负责商品、购物车、订单、库存、支付、物流、退货与商家结算核心链路，优化高并发场景下的数据一致性与吞吐",
        "购物车并发：乐观 UI 即时反馈 + 失败回滚，防抖节流 / 请求合并 / 操作版本号 + 服务端幂等校验，关键字段服务端二次校验",
        "库存防超卖：数据库事务 + 悲观锁（SELECT ... FOR UPDATE）与原子条件更新，乐观锁 / CAS 降锁竞争；预占、支付确认、取消与超时释放全流程配幂等键与库存流水",
        "订单削峰与资金一致：订单创建拆分为独立步骤并消息队列异步化，事务 + 状态机防重复下单；支付回调用幂等键、Webhook 去重与定时对账保证最终一致性",
        "缓存与数据库治理：主动失效 + 互斥重建 + 随机过期 + 热点预热防击穿；索引、分页与字段投影优化，避免全表扫描与大结果集",
        "多商家结算：按商家维度拆单、履约与佣金结算，结算批次号 + 唯一业务键 + 流水对账防止重复计算与重复打款",
        "负责线上性能治理、第三方系统集成、海外部署、故障排查与 CI/CD 发布流程建设",
      ],
      en: [
        "Owned architecture planning, core module design, and delivery across storefront, vendor admin, payments, and channels",
        "Led Shopify storefront and custom app architecture for multi-country, multi-language, multi-currency, multi-vendor expansion",
        "Owned catalog, cart, orders, inventory, payments, logistics, returns, and vendor settlement — tuning consistency and throughput under concurrency",
        "Cart concurrency: optimistic UI with rollback, debounce/coalescing/operation versioning plus server idempotency and re-validation of critical fields",
        "Oversell prevention: DB transactions with pessimistic locks (SELECT ... FOR UPDATE) and atomic conditional updates, optimistic lock / CAS to cut contention; reservation → payment → cancel → timeout release with idempotency keys and stock ledgers",
        "Load shedding & money consistency: order creation split into independent steps and offloaded to a message queue; transactions + state machines prevent duplicate orders; payment callbacks use idempotency keys, webhook dedupe, and scheduled reconciliation",
        "Cache and database governance: active invalidation, mutex rebuild, randomized expiry, and hot-key warmup against stampedes; index, pagination, and projection tuning to avoid full scans",
        "Multi-vendor settlement: order, fulfillment, and commission split per vendor with batch numbers, unique business keys, and ledger reconciliation against double payouts",
        "Owned production performance, third-party integrations, overseas deployment, incident triage, and CI/CD release pipelines",
      ],
    },
    tech: [
      "Shopify",
      "Online Store 2.0",
      "Shopify Markets",
      "Hydrogen",
      "Liquid",
      "TypeScript",
      "Tailwind CSS",
      "Shopify Functions",
      "Admin GraphQL",
      "Storefront API",
      "Polaris",
      "Stripe",
      "PayPal",
      "Algolia",
      "Docker",
      "AWS",
    ],
    features: {
      zh: [
        "购物网站（C 端）：商品浏览、搜索、购物车、下单、支付、订单查询、地址管理、评价、心愿单",
        "多国家多语言：按国家/地区自动切换站点，支持多语言页面和多币种价格展示",
        "支付能力：对接 Shopify Payments、Stripe、PayPal 等海外支付方式",
        "订单与物流：下单、发货、退货、售后等完整流程",
        "邮件功能：订单通知、账号验证、密码找回、运营触达等邮件发送",
        "在线客服聊天：集成 ConnectyCube，支持用户与客服在线沟通",
        "商家后台：商家入驻、商品管理、订单处理、结算打款等",
        "平台运营能力：佣金结算、联盟推广、渠道管理，支持平台化运营和品牌独立站模式",
        "搜索与性能：Shopify Search / Algolia；页面加载和海外访问体验优化",
        "部署运维：Shopify 云托管与自定义 App 发布流水线，保障线上稳定运行",
      ],
      en: [
        "Storefront: browse, search, cart, checkout, orders, addresses, reviews, wishlist",
        "Markets: auto region switching with multi-language pages and multi-currency pricing",
        "Payments: Shopify Payments, Stripe, PayPal, and more",
        "Orders & logistics: place, ship, return, and after-sales flows",
        "Email: order notices, account verification, password reset, campaigns",
        "Live chat: ConnectyCube for shopper–support conversations",
        "Vendor admin: onboarding, catalog, order handling, payouts",
        "Platform ops: commission, affiliate, channel management; marketplace + brand sites",
        "Search & perf: Shopify Search / Algolia; overseas page experience tuning",
        "Ops: Shopify-hosted storefront + custom app release pipelines",
      ],
    },
    demo: {
      note: {
        zh: "进入商城后若被重定向到国家路径（如 /ru），属区域路由正常行为，可继续浏览下单。",
        en: "If the storefront redirects to a country path (e.g. /ru), that is expected regional routing — keep browsing and checkout.",
      },
      disclaimer: {
        zh: "以上为作品集公开演示账号，请勿用于生产。",
        en: "Public portfolio demo accounts only — do not use in production.",
      },
      portals: [
        {
          role: { zh: "商城（买家）", en: "Storefront (buyer)" },
          url: "https://dtc.saaslab.cn",
        },
        {
          role: { zh: "卖家后台", en: "Vendor admin" },
          url: "https://dtc-vendor.saaslab.cn",
        },
        {
          role: { zh: "渠道管理", en: "Channel manager" },
          url: "https://dtc-channel.saaslab.cn",
        },
      ],
      accounts: [
        {
          role: { zh: "买家", en: "Buyer" },
          email: "ru-test@example.com",
          password: "Demo@2026",
          note: {
            zh: "C 端登录、下单、退货申请",
            en: "Storefront login, checkout, return requests",
          },
        },
        {
          role: { zh: "卖家", en: "Seller" },
          email: "seller@fbe.com",
          password: "secret",
          note: {
            zh: "店铺 FBE Store：接单、发货、处理退货",
            en: "FBE Store: accept, ship, handle returns",
          },
        },
        {
          role: { zh: "平台 / 渠道", en: "Platform / channel" },
          email: "admin@fbe.com",
          password: "Demo@2026",
          note: {
            zh: "渠道管理：区域、渠道、商品审核等",
            en: "Channel manager: regions, channels, listing review",
          },
        },
        {
          role: { zh: "渠道（可选）", en: "Channel (optional)" },
          email: "china@fbe.com",
          password: "Demo@2026",
          note: {
            zh: "中国区相关配置演示",
            en: "China-region configuration demo",
          },
        },
      ],
      flows: [
        {
          title: {
            zh: "1. 买家下单（商城）",
            en: "1. Buyer checkout (storefront)",
          },
          steps: {
            zh: [
              "打开商城 → 用买家账号登录",
              "搜索 / 浏览商品 → 加入购物车",
              "结账：收货地址 → 配送方式 → 支付完成",
              "「我的订单」确认已支付 / 待发货",
            ],
            en: [
              "Open storefront → sign in as buyer",
              "Search / browse → add to cart",
              "Checkout: address → shipping → pay",
              "My Orders: confirm paid / awaiting shipment",
            ],
          },
          point: {
            zh: "多卖家商品会按卖家拆单；支付成功后订单进入卖家履约队列。",
            en: "Multi-vendor carts split by seller; paid orders enter fulfillment queues.",
          },
        },
        {
          title: {
            zh: "2. 卖家发货（卖家后台）",
            en: "2. Vendor ships (vendor admin)",
          },
          steps: {
            zh: [
              "打开卖家后台 → seller@fbe.com 登录",
              "Orders 找到对应待发货订单",
              "创建履约 → 填写运单号 → 标记已发货",
              "回到买家端，订单应显示已发货 / 运输中",
            ],
            en: [
              "Open vendor admin → sign in as seller@fbe.com",
              "Orders → find the awaiting-shipment order",
              "Create fulfillment → tracking → mark shipped",
              "Buyer side should show shipped / in transit",
            ],
          },
          point: {
            zh: "库存从卖家库存地点扣减；履约与拆分支付按卖家维度处理。",
            en: "Stock deducts from vendor locations; fulfillment and split payment are seller-scoped.",
          },
        },
        {
          title: {
            zh: "3. 买家申请退货 / 退款",
            en: "3. Buyer return / refund",
          },
          steps: {
            zh: [
              "买家在「我的订单 / 退货」发起申请，选择商品与原因",
              "卖家在 Requests / Return 审核：同意或拒绝并可备注",
              "同意后走退货收货与退款（原路退回或标记完成）",
              "买家端可看到退货进度与最终结果",
            ],
            en: [
              "Buyer opens Orders / Returns and submits a request",
              "Seller reviews in Requests / Return: approve or reject",
              "On approve: receive return + refund (gateway or marked done)",
              "Buyer sees return progress and final result",
            ],
          },
          point: {
            zh: "退货是「买家申请 → 卖家审核」协同流，不是买家单方面直接退款。",
            en: "Returns are buyer-request → seller-review — not a one-sided instant refund.",
          },
        },
        {
          title: {
            zh: "4. 渠道侧配置（可选）",
            en: "4. Channel config (optional)",
          },
          steps: {
            zh: [
              "admin@fbe.com 登录渠道管理",
              "查看销售渠道 / 区域与国家绑定",
              "配置首页运营位、主题等（影响商城展示）",
              "演示商品 / 卖家相关审核或上架策略",
            ],
            en: [
              "Sign in to channel manager as admin@fbe.com",
              "Inspect sales channels / region-country binding",
              "Configure homepage slots & themes (storefront impact)",
              "Demo listing / vendor review policies as available",
            ],
          },
          point: {
            zh: "平台把「多区域、多卖家」收成可运营商城，而不只是前台皮肤。",
            en: "The platform turns multi-region / multi-vendor into operable commerce — not just a skin.",
          },
        },
      ],
      architecture: {
        zh: "买家在 Shopify Storefront / Hydrogen 下单支付 → 订单按卖家拆分进入 Vendor App → 卖家履约发货 → 买家可发起退货由卖家审核；Channel Manager 负责 Markets 区域与销售渠道配置；店面由 Shopify Online Store 2.0 / Checkout 承载，商家与渠道能力通过 Embedded App + Admin GraphQL / Storefront API / Functions 扩展。",
        en: "Buyer checks out on Shopify Storefront / Hydrogen → orders split into Vendor App → seller fulfills → buyer may request returns for seller review; Channel Manager owns Markets regions & sales channels — storefront on Online Store 2.0 / Checkout, vendor & channel capabilities via Embedded Apps + Admin GraphQL / Storefront API / Functions.",
      },
    },
  },
  {
    slug: "hypit-shorts",
    status: "preview",
    coverGradient:
      "linear-gradient(145deg, #241833 0%, #3a1f4a 50%, #121826 100%)",
    tags: ["AI", "Video", "i18n"],
    title: {
      zh: "多语言出海短视频",
      en: "Multilingual Short-Form Video",
    },
    summary: {
      zh: "导入一条中文口播，一键转化为英语、西语、日语等十几种语言版本，笑点与词级时间轴完全对齐。",
      en: "Import one Chinese talking-head clip and generate EN / ES / JA and more — jokes and word-level timing stay aligned.",
    },
    role: {
      zh: "全栈开发",
      en: "Full-stack",
    },
    period: {
      zh: "进行中",
      en: "In progress",
    },
    highlights: {
      zh: [
        "词级时间轴对齐，保证字幕与口型节奏",
        "多语言版本批量导出，服务出海内容团队",
      ],
      en: [
        "Word-level timeline alignment for subtitle / lip sync rhythm",
        "Batch multilingual exports for outbound content teams",
      ],
    },
    tech: ["Next.js", "AI Pipeline", "FFmpeg"],
  },
  {
    slug: "creator-platform",
    status: "preview",
    coverGradient:
      "linear-gradient(145deg, #1b2433 0%, #243b55 45%, #0f172a 100%)",
    tags: ["SaaS", "Creator", "Agent"],
    title: {
      zh: "达人平台（星策）",
      en: "Creator Platform (Xingce)",
    },
    summary: {
      zh: "TikTok / 抖音种草全链路：任务发布、达人招募履约、资金结算，以及采量 CRM、建联插件与 AI Agent。",
      en: "TikTok / Douyin seeding loop: campaigns, creator fulfillment, settlement, plus acquisition CRM, outreach plugin, and AI agents.",
    },
    role: {
      zh: "技术规划与核心研发",
      en: "Tech planning & core engineering",
    },
    period: {
      zh: "进行中",
      en: "In progress",
    },
    highlights: {
      zh: [
        "商家任务 → 达人履约 → 资金结算闭环",
        "公开达人采量与 CRM 资产沉淀",
        "建联插件：AI 评分、话术与邮件触达",
      ],
      en: [
        "Merchant campaigns → creator fulfillment → settlement",
        "Public creator acquisition and CRM asset building",
        "Outreach plugin with AI scoring, scripts, and email",
      ],
    },
    tech: ["Next.js", "AI Agent", "CRM", "Browser Extension"],
  },
  {
    slug: "pagoda-esl-iot",
    status: "preview",
    coverGradient:
      "linear-gradient(145deg, #10261f 0%, #1d4b3a 50%, #0b1a16 100%)",
    tags: ["IoT", "MQTT", "BLE", "OTA"],
    title: {
      zh: "百果园门店电子价签 IoT 管理系统",
      en: "Electronic Shelf-Label IoT Platform",
    },
    summary: {
      zh: "面向连锁零售门店的电子价签管理平台：Wi-Fi + MQTT 打通后台与门店基站，BLE 连接手机 App 实现近场改价，上万 SKU 价格毫秒级同步，支持设备状态管理与 OTA 固件升级。",
      en: "Shelf-label platform for retail stores: Wi-Fi + MQTT links the backend to in-store base stations, BLE connects a phone app for near-field price changes, with millisecond sync across 10k+ SKUs, device-state management, and OTA upgrades.",
    },
    role: {
      zh: "全栈开发",
      en: "Full-stack",
    },
    period: {
      zh: "2022.04 — 2022.07",
      en: "Apr 2022 — Jul 2022",
    },
    highlights: {
      zh: [
        "MQTT 设备通信架构：按门店 / 基站 / 业务类型规划 Topic，商品数据下发、指令路由与执行状态回传，用消息 ID + 超时 + 业务回执做指令追踪",
        "BLE 蓝牙状态机：扫描、连接、GATT Service/Characteristic 发现、读写、断开与重连抽象为标准状态机，异步队列 + 并发互斥 + 会话标识避免状态冲突",
        "商品数据一致性：消息 ID + 商品版本号 + 幂等校验 + 重复消息过滤 + 失败补偿，结合执行回执与状态对账提升可追踪性",
        "OTA 固件升级：分包序号 / 偏移量 / 校验字段 + ACK 确认 + 超时重传 + 发送窗口控制，支持断点续传与异常恢复",
      ],
      en: [
        "MQTT architecture: topics by store / base station / business type with data push, command routing, and execution receipts tracked via message IDs, timeouts, and ACKs",
        "BLE state machine: scan, connect, GATT service/characteristic discovery, read/write, disconnect, and reconnect as a state machine with async queues, mutual exclusion, and session IDs",
        "Data consistency: message ID, product version, idempotency checks, duplicate filtering, and failure compensation with receipt reconciliation",
        "OTA upgrades: packet sequence / offset / checksum with ACK, timeout retransmit, and send-window control, plus resume-from-break recovery",
      ],
    },
    tech: ["MQTT", "BLE", "Wi-Fi", "OTA", "IoT", "Node.js"],
    features: {
      zh: [
        "商品名称、产地、价格、介绍与促销信息统一管理与远程更新",
        "批量推送：按门店 / 基站批量下发商品与价格变更",
        "设备状态管理：连接生命周期、在线状态、心跳与断线重连",
        "手机 App 近场改价：BLE 连接基站直接修改价签",
        "OTA 固件升级：版本管理、分包传输、完整性校验与失败恢复",
      ],
      en: [
        "Central management and remote update of name, origin, price, description, and promotions",
        "Batch push of product and price changes per store / base station",
        "Device state: connection lifecycle, online status, heartbeats, and reconnect",
        "Near-field price changes from the phone app over BLE",
        "OTA upgrades: versioning, chunked transfer, integrity checks, and failure recovery",
      ],
    },
  },
  {
    slug: "pagoda-app-flutter",
    status: "preview",
    coverGradient:
      "linear-gradient(145deg, #2a1a12 0%, #4a2b1a 50%, #14100c 100%)",
    tags: ["Flutter", "Commerce", "Group-buy", "Fulfillment"],
    title: {
      zh: "百果园 App（Flutter）",
      en: "Pagoda App (Flutter)",
    },
    summary: {
      zh: "自营水果生鲜 C 端 App：商品下单、团购拼团与次日达履约，支撑多仓多店协同与营销活动快速迭代；Melos monorepo 按业务域拆包，双端体验一致。",
      en: "Consumer fresh-grocery app covering shopping, group-buy, and next-day fulfillment, supporting multi-warehouse/multi-store coordination and fast campaign iteration on a Melos monorepo.",
    },
    role: {
      zh: "Flutter 开发",
      en: "Flutter Developer",
    },
    period: {
      zh: "2021.04 — 2022.02",
      en: "Apr 2021 — Feb 2022",
    },
    highlights: {
      zh: [
        "Flutter 跨端工程化：Melos monorepo 按业务域拆包（首页 / 商品 / 交易 / 团购 / 履约 / 我的），沉淀 UI Kit、network、analytics 等共享 packages",
        "交易链路一致性：库存预占倒计时、规格与价格校验；支付结果 Webhook + 主动查单双通道确认，配合本地订单状态机与幂等 Key 规避重复支付",
        "团购业务引擎：开团 / 参团 / 成团 / 失败回滚状态机，活动库存独立池、成团倒计时与分享回流，关键写操作靠乐观锁与接口幂等保障一致性",
        "次日达履约：截单时间、配送波次、可配送时段与地址可达性校验，订单节点长连接 / 轮询双模刷新，异常单本地提醒 + 客服入口",
        "多仓多店适配：定位与 Geofencing 配送围栏自动匹配门店 / 仓，切店后 Repository 层失效缓存并联动刷新可售态、库存、运费与时效",
        "统一算价编排：商品价 → 活动优惠 → 运费 / 包装费 → 实付，活动规则组件化复用，保证前后端价格一致、可对账",
      ],
      en: [
        "Flutter engineering: Melos monorepo split by domain (home / catalog / trade / group-buy / fulfillment / profile) with shared UI Kit, network, and analytics packages",
        "Trade consistency: stock reservation countdown, spec and price validation; payment confirmed by webhook plus active polling with a local order state machine and idempotency keys",
        "Group-buy engine: open / join / success / failure-rollback state machine with dedicated stock pools, countdowns, and share loops; optimistic locks and API idempotency for consistency",
        "Next-day fulfillment: cut-off times, delivery waves, serviceable slots, and address reachability; order nodes refreshed via long connection or polling with exception alerts",
        "Multi-warehouse/multi-store: location and Geofencing fences auto-match a store or warehouse; switching stores invalidates repository caches and refreshes availability, stock, shipping, and lead time",
        "Unified price pipeline: item price → promotions → shipping/packaging → payable with reusable rule components so client and server reconcile",
      ],
    },
    tech: [
      "Flutter",
      "Dart",
      "Melos",
      "Riverpod",
      "Bloc",
      "GoRouter",
      "Dio",
      "Fastlane",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject() {
  return projects[0];
}
