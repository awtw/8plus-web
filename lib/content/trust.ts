import type { Locale } from "@/lib/i18n";

export type ClientLogo = {
  name: string;
  url?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
};

export type TrustContent = {
  eyebrow: string;
  title: string;
  clientLogos: ClientLogo[];
  testimonials: Testimonial[];
};

export const trustContent: Record<Locale, TrustContent> = {
  "zh-TW": {
    eyebrow: "合作經驗",
    title: "曾協助團隊交付的領域",
    clientLogos: [
      { name: "金融 AI" },
      { name: "SaaS / CRM" },
      { name: "智慧社區" },
      { name: "品牌電商" },
      { name: "新創產品" },
    ],
    testimonials: [
      {
        quote:
          "August 能把模糊需求拆成可執行的架構路線，讓團隊知道先改什麼、後改什麼。",
        author: "Product Lead",
        role: "產品負責人",
        company: "SaaS 新創（匿名）",
        metric: "交付節奏從季度改為雙週迭代",
      },
      {
        quote:
          "不只是寫 code，而是把 API、權限、部署與 UX 一起校準，上線後維護成本明顯下降。",
        author: "Engineering Manager",
        role: "工程主管",
        company: "企業軟體團隊（匿名）",
        metric: "重構後缺陷率下降約 40%",
      },
    ],
  },
  en: {
    eyebrow: "Experience",
    title: "Domains where teams shipped with support",
    clientLogos: [
      { name: "Financial AI" },
      { name: "SaaS / CRM" },
      { name: "Smart Community" },
      { name: "Brand Commerce" },
      { name: "Startup Products" },
    ],
    testimonials: [
      {
        quote:
          "August turns fuzzy requirements into an executable architecture roadmap so the team knows what to change first.",
        author: "Product Lead",
        role: "Product Lead",
        company: "SaaS startup (anonymous)",
        metric: "Delivery cadence moved from quarterly to bi-weekly",
      },
      {
        quote:
          "Not just code — APIs, permissions, deployment, and UX aligned together. Maintenance cost dropped after launch.",
        author: "Engineering Manager",
        role: "Engineering Manager",
        company: "Enterprise software team (anonymous)",
        metric: "~40% fewer post-refactor defects",
      },
    ],
  },
};

export function getTrustContent(locale: Locale): TrustContent {
  return trustContent[locale];
}
