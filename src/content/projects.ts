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
    liveUrl: "https://dtc.icedew.online",
    coverGradient:
      "linear-gradient(145deg, #1a2332 0%, #0d3d3a 45%, #1c2a1f 100%)",
    tags: ["MedusaJS", "Next.js", "DTC", "Multi-vendor"],
    title: {
      zh: "FBE 跨境多商户独立站",
      en: "FBE Cross-Border Multi-Vendor Storefront",
    },
    summary: {
      zh: "跨境 DTC 商城：多国家、多语言、多币种，打通买家下单、卖家履约、退货协同与渠道运营的完整闭环。",
      en: "Cross-border DTC commerce: multi-country, multi-language, multi-currency — buyer checkout, vendor fulfillment, returns collaboration, and channel ops in one loop.",
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
        "Storefront / Vendor / Channel Manager 三端共用同一套 Medusa 后端",
        "多卖家拆单、履约发货、退货审核的协同主链路可完整演示",
        "多区域路由与渠道配置，支撑多国家站点运营",
        "对接支付、物流与搜索，Docker 上线可公开访问",
      ],
      en: [
        "Storefront / Vendor / Channel Manager share one Medusa backend",
        "Demoable loop: split orders → fulfill → return review",
        "Regional routing and channel config for multi-country ops",
        "Payments, logistics, search — publicly reachable via Docker",
      ],
    },
    tech: [
      "MedusaJS",
      "Mercur",
      "Next.js",
      "React",
      "TypeScript",
      "Stripe",
      "PayPal",
      "Meilisearch",
      "Docker",
      "AWS",
    ],
    features: {
      zh: [
        "买家：浏览搜索、购物车、结账支付、订单与退货",
        "卖家：接单履约、运单发货、退货审核与库存扣减",
        "渠道：区域国家绑定、运营位与上架策略",
        "多卖家购物车自动按卖家拆单",
        "支付成功后进入卖家履约队列",
      ],
      en: [
        "Buyer: browse, cart, checkout, orders & returns",
        "Vendor: fulfill, ship, review returns, stock deduct",
        "Channel: region binding, merchandising, listing policy",
        "Multi-vendor carts auto-split by seller",
        "Paid orders enter vendor fulfillment queues",
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
          url: "https://dtc.icedew.online",
        },
        {
          role: { zh: "卖家后台", en: "Vendor admin" },
          url: "https://dtc-vendor.icedew.online",
        },
        {
          role: { zh: "渠道管理", en: "Channel manager" },
          url: "https://dtc-channel.icedew.online",
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
        zh: "买家在 Storefront 下单支付 → 订单按卖家拆分进入 Vendor → 卖家履约发货 → 买家可发起退货由卖家审核；Channel Manager 负责区域与销售渠道配置，三者共用同一套 Medusa/Mercur 后端 API。",
        en: "Buyer checks out on Storefront → orders split into Vendor → seller fulfills → buyer may request returns for seller review; Channel Manager owns regions & sales channels — all three share one Medusa/Mercur API.",
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
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject() {
  return projects[0];
}
