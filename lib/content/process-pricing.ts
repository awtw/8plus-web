import type { Locale } from "@/lib/i18n";

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  duration: string;
};

export type PricingTier = {
  name: string;
  range: string;
  description: string;
  bestFor: string;
  features: string[];
};

export type PipelineStep = {
  step: string;
  title: string;
  description: string;
};

export type ProcessPricingContent = {
  pipeline: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: PipelineStep[];
  };
  faqTitle: string;
  faqEyebrow: string;
  cta: { title: string; book: string; about: string };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: ProcessStep[];
    cta: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
    tiers: PricingTier[];
    cta: string;
  };
  faq: Array<{ question: string; answer: string }>;
};

export const processPricingContent: Record<Locale, ProcessPricingContent> = {
  "zh-TW": {
    pipeline: {
      eyebrow: "END-TO-END · 一條龍",
      title: "從一個想法到正式上線，交給同一個人",
      lead: "需求釐清、AI 與資料、介面體驗、部署上線與數據追蹤 —— 你不用四處找不同廠商對接，整條流程由我一手串起來。",
      steps: [
        { step: "01", title: "需求與體驗設計", description: "先講清楚「給誰用、要達成什麼」，並把介面設計到看過就會用。" },
        { step: "02", title: "AI 與資料", description: "規劃資料處理、檢索與地端模型，並以評測確認正確性。" },
        { step: "03", title: "應用整合", description: "把 AI 接進實際流程與介面，並顧及權限、無障礙與易讀字體。" },
        { step: "04", title: "部署上線", description: "依流量與資料安全要求選擇雲端或地端，完成部署與監控。" },
        { step: "05", title: "數據追蹤", description: "以 GA 觀察使用者行為與轉換率，持續優化（前端框架等技術棧於提案時附註）。" },
      ],
    },
    faqEyebrow: "FAQ",
    faqTitle: "常見問題",
    cta: { title: "準備好把問題做清楚了嗎？", book: "前往預約", about: "看更多背景" },
    process: {
      eyebrow: "合作流程",
      title: "從對談到可驗證交付",
      lead: "每個專案都從釐清問題開始，避免直接跳入實作卻發現方向錯誤。",
      steps: [
        {
          step: "01",
          title: "Discovery Call",
          description: "30 分鐘對談，釐清目標、限制、風險與成功指標。",
          duration: "30 min",
        },
        {
          step: "02",
          title: "Architecture Proposal",
          description: "產出可執行路線圖：AI 方案、里程碑、體驗與衡量指標、協作方式。",
          duration: "1–2 週",
        },
        {
          step: "03",
          title: "Iterative Delivery",
          description: "以 sprint 節奏交付，每輪都有可驗證成果與回饋校準。",
          duration: "依專案",
        },
        {
          step: "04",
          title: "Handoff & Support",
          description: "文件、知識轉移與可選的顧問陪跑，確保團隊能持續維運。",
          duration: "依需求",
        },
      ],
      cta: "預約 Discovery Call",
    },
    pricing: {
      eyebrow: "合作模式",
      title: "透明區間，依情境報價",
      lead: "以下為常見合作模式的參考區間，實際報價依範圍、時程與團隊成熟度調整。",
      note: "所有方案皆含初步需求釐清。精確報價於 Discovery Call 後提供。",
      tiers: [
        {
          name: "Advisory Retainer",
          range: "洽詢 / 月",
          description: "AI 應用顧問、UIX 診斷、技術決策陪跑。",
          bestFor: "已有團隊，需要 AI 與體驗的資深視角",
          features: ["每週固定 sync", "AI 方案與體驗審查", "Slack / 非同步支援"],
        },
        {
          name: "Project Delivery",
          range: "洽詢 / 專案",
          description: "從 AI 方案、介面體驗到上線的完整交付，含部署與數據追蹤。",
          bestFor: "新產品、AI 導入，或需要端到端 ownership",
          features: ["里程碑交付", "可驗證 demo", "GA 追蹤與 handoff"],
        },
        {
          name: "Workshop",
          range: "洽詢 / 場",
          description: "AI 導入、UIX 工作坊、團隊培訓。",
          bestFor: "團隊對齊、技能提升、AI 落地規劃",
          features: ["客製議程", "實作練習", "產出 action items"],
        },
      ],
      cta: "討論你的情境",
    },
    faq: [
      {
        question: "一定要簽長約嗎？",
        answer: "不需要。可以先從單次 Discovery Call 或短期 sprint 開始，確認合作節奏再決定是否 retainer。",
      },
      {
        question: "可以遠端協作嗎？",
        answer: "可以。過去專案多為遠端 + 非同步，重要里程碑會安排 sync meeting。",
      },
      {
        question: "AI 導入包含哪些？",
        answer: "從資料準備、RAG 與地端模型的資料流程、評測、權限控管到人機協作流程，依團隊成熟度分階段導入。",
      },
      {
        question: "如何開始？",
        answer: "預約 30 分鐘諮詢時段，或透過聯絡表單描述你的情境，我會在 1–2 個工作天回覆。",
      },
    ],
  },
  en: {
    pipeline: {
      eyebrow: "END-TO-END",
      title: "From an idea to production, with one person",
      lead: "Requirements, AI and data, interface experience, deployment and analytics — no juggling vendors. The whole line is connected by one owner.",
      steps: [
        { step: "01", title: "Needs & experience design", description: "Pin down who it is for and what it must achieve, and design an interface understood at a glance." },
        { step: "02", title: "AI & data", description: "Plan data processing, retrieval and on-prem models, and confirm accuracy through evaluation." },
        { step: "03", title: "Integration", description: "Wire AI into real workflows and interfaces, with access control, accessibility and readable type." },
        { step: "04", title: "Deploy", description: "Cloud or on-prem depending on traffic and data security, with deployment and monitoring." },
        { step: "05", title: "Analytics", description: "Track behavior and conversion in GA and keep improving (frontend and other stack noted in the proposal)." },
      ],
    },
    faqEyebrow: "FAQ",
    faqTitle: "FAQ",
    cta: { title: "Ready to make the problem clear?", book: "Book a call", about: "Read the background" },
    process: {
      eyebrow: "Process",
      title: "From conversation to verified delivery",
      lead: "Every engagement starts by framing the problem — not jumping into implementation with the wrong direction.",
      steps: [
        {
          step: "01",
          title: "Discovery Call",
          description: "A 30-minute call to align goals, constraints, risks, and success metrics.",
          duration: "30 min",
        },
        {
          step: "02",
          title: "Architecture Proposal",
          description: "An executable roadmap: AI approach, milestones, experience and success metrics, and collaboration model.",
          duration: "1–2 weeks",
        },
        {
          step: "03",
          title: "Iterative Delivery",
          description: "Sprint-based delivery with verifiable outcomes and feedback each cycle.",
          duration: "Project-based",
        },
        {
          step: "04",
          title: "Handoff & Support",
          description: "Documentation, knowledge transfer, and optional advisory support for ongoing operations.",
          duration: "As needed",
        },
      ],
      cta: "Book Discovery Call",
    },
    pricing: {
      eyebrow: "Engagement models",
      title: "Transparent ranges, scoped to context",
      lead: "Reference ranges for common models. Final quotes depend on scope, timeline, and team maturity.",
      note: "All models include initial problem framing. Exact quotes follow the Discovery Call.",
      tiers: [
        {
          name: "Advisory Retainer",
          range: "Inquire / month",
          description: "AI application advisory, UIX review, and technical decision support.",
          bestFor: "Teams that need a senior view on AI and experience",
          features: ["Weekly sync", "AI approach & experience review", "Async support"],
        },
        {
          name: "Project Delivery",
          range: "Inquire / project",
          description: "End-to-end delivery from AI approach and interface experience through launch, including deployment and analytics.",
          bestFor: "New products, AI adoption, or end-to-end ownership needs",
          features: ["Milestone delivery", "Verifiable demos", "GA tracking & handoff"],
        },
        {
          name: "Workshop",
          range: "Inquire / session",
          description: "AI integration, UIX workshops, and team training.",
          bestFor: "Team alignment, skill building, AI rollout planning",
          features: ["Custom agenda", "Hands-on exercises", "Action items"],
        },
      ],
      cta: "Discuss your context",
    },
    faq: [
      {
        question: "Do I need a long-term contract?",
        answer: "No. Start with a single Discovery Call or a short sprint, then decide if a retainer fits.",
      },
      {
        question: "Can we work remotely?",
        answer: "Yes. Most engagements are remote-first with async collaboration and sync at key milestones.",
      },
      {
        question: "What does AI integration cover?",
        answer: "From data readiness and the data flow of RAG and on-prem models to evaluation, access control and human-in-the-loop workflows — phased by team maturity.",
      },
      {
        question: "How do we start?",
        answer: "Book a 30-minute consultation slot or use the contact form. I typically reply within 1–2 business days.",
      },
    ],
  },
};

export function getProcessPricingContent(locale: Locale): ProcessPricingContent {
  return processPricingContent[locale];
}
