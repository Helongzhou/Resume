import type { SseEvent } from "@/lib/agent/types";

type Loc = "zh" | "en";

function buildEvents(locale: Loc, scenario: string): SseEvent[] {
  if (locale === "zh") {
    if (scenario === "jd_match") {
      return [
        { type: "status", phase: "planning", detail: "拆解 JD 需求与必备技能" },
        {
          type: "tool",
          name: "match_jd_keywords",
          state: "start",
          args: { jd: "全栈 / Next.js / 电商" },
        },
        {
          type: "tool",
          name: "match_jd_keywords",
          state: "done",
          result:
            "matchedKeywords: next, typescript, 全栈, 电商\nevidence: FBE 独立站, 开时支付, 百果园新零售",
        },
        {
          type: "tool",
          name: "search_experience",
          state: "start",
          args: { query: "跨境电商 支付 Next.js" },
        },
        {
          type: "tool",
          name: "search_experience",
          state: "done",
          result:
            "开时：跨境收付款 / KYC；叁陆伍：FBE 多商户商城；百果园：新零售中后台",
        },
        {
          type: "tool",
          name: "search_projects",
          state: "start",
          args: { query: "独立站 Shopify" },
        },
        {
          type: "tool",
          name: "search_projects",
          state: "done",
          result: "FBE 跨境电商商城：Shopify + Markets，多语言多币种，Stripe/PayPal，可访问线上",
        },
        {
          type: "tool",
          name: "draft_fit_report",
          state: "start",
          args: { role_title: "全栈开发工程师" },
        },
        {
          type: "tool",
          name: "draft_fit_report",
          state: "done",
          result: "生成结构化匹配报告",
        },
        { type: "status", phase: "answering", detail: "汇总引用证据" },
        {
          type: "token",
          text: "## 匹配结论\n与「全栈 / 电商 / Next.js」方向匹配度高。\n\n### 证据\n- 正在交付 FBE 跨境商城（Shopify + Hydrogen / Liquid），链路含支付与商家后台\n- 开时具备跨境支付 0→1 与小程序实战\n- 长期 B 端中后台与前端架构经验，可端到端推进\n\n### 建议\n可优先按全栈 / 前端架构方向推进技术面试；如需管理职责，可补充带队场景追问。\n\n_（当前为演示模式：未配置 LLM_API_KEY 时播放录制轨迹）_",
        },
        { type: "done" },
      ];
    }
    if (scenario === "capability") {
      return [
        { type: "status", phase: "planning", detail: "识别问题：小程序 / 跨端能力" },
        {
          type: "tool",
          name: "search_skills",
          state: "start",
          args: { query: "小程序 Taro 跨端" },
        },
        {
          type: "tool",
          name: "search_skills",
          state: "done",
          result: "Taro / uni-app / 微信小程序 / Electron",
        },
        {
          type: "tool",
          name: "search_experience",
          state: "start",
          args: { query: "Taro 小程序" },
        },
        {
          type: "tool",
          name: "search_experience",
          state: "done",
          result: "开时：Taro 跨境小程序对接 FX / KYC / 多银行",
        },
        { type: "status", phase: "answering" },
        {
          type: "token",
          text: "## 结论：能做，且有上线经验\n\n不只是 demo：覆盖登录支付、性能与发布。开时交付过 Taro 跨境小程序；另有 uni-app / Flutter / Electron 经验。\n\n_（演示模式录制轨迹）_",
        },
        { type: "done" },
      ];
    }
    return [
      { type: "status", phase: "planning", detail: "深挖跨境支付项目" },
      {
        type: "tool",
        name: "search_experience",
        state: "start",
        args: { query: "开时 跨境支付" },
      },
      {
        type: "tool",
        name: "search_experience",
        state: "done",
        result: "收付款、换汇微服务、KYC、多银行、Taro 小程序",
      },
      {
        type: "tool",
        name: "search_projects",
        state: "start",
        args: { query: "支付" },
      },
      {
        type: "tool",
        name: "search_projects",
        state: "done",
        result: "独立站侧对接 Stripe / PayPal；支付域经验主要在开时",
      },
      { type: "status", phase: "answering" },
      {
        type: "token",
        text: "## 跨境支付项目摘要（开时）\n- 0→1：收付款、换汇微服务、KYC、多银行对接\n- 工程关注点：状态机、幂等对账、失败兜底\n- 前端：Taro 小程序承载相关流程\n\n_（演示模式录制轨迹）_",
      },
      { type: "done" },
    ];
  }

  if (scenario === "jd_match") {
    return [
      { type: "status", phase: "planning", detail: "Parse JD requirements" },
      {
        type: "tool",
        name: "match_jd_keywords",
        state: "start",
        args: { jd: "full-stack / Next.js / commerce" },
      },
      {
        type: "tool",
        name: "match_jd_keywords",
        state: "done",
        result: "matched: next, typescript, full-stack, commerce",
      },
      {
        type: "tool",
        name: "search_experience",
        state: "start",
        args: { query: "cross-border payments Next.js" },
      },
      {
        type: "tool",
        name: "search_experience",
        state: "done",
        result: "Ksher payments; 365 Wisdom FBE storefront; Pagoda retail admin",
      },
      {
        type: "tool",
        name: "draft_fit_report",
        state: "start",
        args: { role_title: "Full-stack Engineer" },
      },
      {
        type: "tool",
        name: "draft_fit_report",
        state: "done",
        result: "Structured fit report ready",
      },
      { type: "status", phase: "answering" },
      {
        type: "token",
        text: "## Fit summary\nStrong match for full-stack / commerce / Next.js.\n\n### Evidence\n- Shipping FBE cross-border commerce (Shopify + Hydrogen / Liquid)\n- Cross-border payments 0→1 at Ksher\n- Long-running admin / architecture delivery\n\n_(Demo mode: recorded trajectory without LLM_API_KEY)_",
      },
      { type: "done" },
    ];
  }
  if (scenario === "capability") {
    return [
      { type: "status", phase: "planning", detail: "Check mini-program capability" },
      {
        type: "tool",
        name: "search_skills",
        state: "start",
        args: { query: "mini program Taro" },
      },
      {
        type: "tool",
        name: "search_skills",
        state: "done",
        result: "Taro / uni-app / WeChat mini programs / Electron",
      },
      { type: "status", phase: "answering" },
      {
        type: "token",
        text: "## Verdict: yes, with production experience\nTaro cross-border mini program at Ksher (FX/KYC/banks), plus uni-app / Flutter / Electron.\n\n_(Demo mode)_",
      },
      { type: "done" },
    ];
  }
  return [
    { type: "status", phase: "planning", detail: "Deep dive: cross-border payments" },
    {
      type: "tool",
      name: "search_experience",
      state: "start",
      args: { query: "Ksher payments" },
    },
    {
      type: "tool",
      name: "search_experience",
      state: "done",
      result: "Collect/payout, FX microservices, KYC, multi-bank, Taro mini program",
    },
    { type: "status", phase: "answering" },
    {
      type: "token",
      text: "## Ksher payments summary\n0→1 collect/payout, FX, KYC, bank adapters; state machines, reconciliation, fallbacks.\n\n_(Demo mode)_",
    },
    { type: "done" },
  ];
}

export async function* streamDemoEvents(
  locale: Loc,
  scenario: string,
): AsyncGenerator<SseEvent> {
  const events = buildEvents(locale, scenario);
  for (const event of events) {
    if (event.type === "token") {
      const text = event.text;
      const chunkSize = Math.max(8, Math.floor(text.length / 24));
      for (let i = 0; i < text.length; i += chunkSize) {
        yield { type: "token", text: text.slice(i, i + chunkSize) };
        await new Promise((r) => setTimeout(r, 28));
      }
      continue;
    }
    yield event;
    await new Promise((r) => setTimeout(r, event.type === "tool" ? 350 : 220));
  }
}
