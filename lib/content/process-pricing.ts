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

export type ProcessPricingContent = {
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
          description: "產出可執行路線圖：架構選型、里程碑、交付節奏與協作方式。",
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
          description: "架構顧問、Code Review、技術決策陪跑。",
          bestFor: "已有工程團隊，需要資深架構視角",
          features: ["每週固定 sync", "架構與 PR review", "Slack / 非同步支援"],
        },
        {
          name: "Project Delivery",
          range: "洽詢 / 專案",
          description: "從架構到上線的完整交付，含前後端與部署。",
          bestFor: "新產品、重構、或需要端到端 ownership",
          features: ["里程碑交付", "可驗證 demo", "文件與 handoff"],
        },
        {
          name: "Workshop",
          range: "洽詢 / 場",
          description: "AI 導入、架構工作坊、團隊培訓。",
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
        answer: "從資料準備、RAG/Agent 架構、權限控管到人機協作流程，依團隊成熟度分階段導入。",
      },
      {
        question: "如何開始？",
        answer: "預約 30 分鐘 Cal.com 時段，或透過聯絡表單描述你的情境，我會在 1–2 個工作天回覆。",
      },
    ],
  },
  en: {
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
          description: "An executable roadmap: stack choices, milestones, delivery rhythm, and collaboration model.",
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
          description: "Architecture advisory, code review, and technical decision support.",
          bestFor: "Teams with engineers who need senior architecture perspective",
          features: ["Weekly sync", "Architecture & PR review", "Async support"],
        },
        {
          name: "Project Delivery",
          range: "Inquire / project",
          description: "End-to-end delivery from architecture through launch, including full-stack and deployment.",
          bestFor: "New products, rewrites, or end-to-end ownership needs",
          features: ["Milestone delivery", "Verifiable demos", "Docs & handoff"],
        },
        {
          name: "Workshop",
          range: "Inquire / session",
          description: "AI integration, architecture workshops, and team training.",
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
        answer: "From data readiness and RAG/Agent architecture to access control and human-in-the-loop workflows — phased by team maturity.",
      },
      {
        question: "How do we start?",
        answer: "Book a 30-minute Cal.com slot or use the contact form. I typically reply within 1–2 business days.",
      },
    ],
  },
};

export function getProcessPricingContent(locale: Locale): ProcessPricingContent {
  return processPricingContent[locale];
}
