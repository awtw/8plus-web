import type { Locale } from "@/lib/i18n";

export type BlogContent = {
  eyebrow: string;
  count: (n: number) => string;
  back: string;
  protectedLabel: string;
  protectedBody: string;
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  read: string;
};

export const blogContent: Record<Locale, BlogContent> = {
  "zh-TW": {
    eyebrow: "04 · JOURNAL",
    count: (n) => `${n} 篇文章`,
    back: "返回技術博客",
    protectedLabel: "受保護內容",
    protectedBody: "本文包含受保護內容，完整內容將於第二階段開放。",
    ctaTitle: "想把文章裡的想法落地？",
    ctaLead: "預約一場諮詢，讓我們針對你的系統與流程一起討論可行的做法。",
    ctaPrimary: "預約諮詢",
    ctaSecondary: "看服務內容",
    read: "閱讀全文",
  },
  en: {
    eyebrow: "04 · JOURNAL",
    count: (n) => `${n} ${n === 1 ? "article" : "articles"}`,
    back: "Back to Tech Blog",
    protectedLabel: "Protected content",
    protectedBody: "This article contains protected content. Full content is available in Phase 2.",
    ctaTitle: "Want to put these ideas to work?",
    ctaLead: "Book a consultation and we will work through a practical approach for your systems and workflows.",
    ctaPrimary: "Book a consultation",
    ctaSecondary: "See services",
    read: "Read article",
  },
};
