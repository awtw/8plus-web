import type { Locale } from "@/lib/i18n";

export const BLOG_CATEGORIES = ["ai", "web", "ops", "delivery", "career", "studio"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogContent = {
  eyebrow: string;
  count: (n: number) => string;
  topics: (n: number) => string;
  lastUpdated: (date: string) => string;
  monthLabel: (yearMonth: string) => string;
  monthCount: (n: number) => string;
  latest: string;
  back: string;
  protectedLabel: string;
  protectedBody: string;
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  read: string;
  filterAll: string;
  noteBadge: string;
  related: string;
  minutes: (n: number) => string;
  categories: Record<BlogCategory, { label: string; description: string }>;
  subscribe: {
    jump: string;
    eyebrow: string;
    title: string;
    lead: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    privacy: string;
    rssTitle: string;
    rssLead: string;
    rssOpen: string;
    rssCopy: string;
    rssCopied: string;
  };
};

const formatUtcDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export const blogContent: Record<Locale, BlogContent> = {
  "zh-TW": {
    eyebrow: "04 · JOURNAL",
    count: (n) => `${n} 篇文章`,
    topics: (n) => `${n} 個主題`,
    lastUpdated: (date) => `最近更新 ${formatUtcDate(date, "zh-TW")}`,
    monthLabel: (ym) => `${ym.slice(0, 4)} 年 ${Number(ym.slice(5, 7))} 月`,
    monthCount: (n) => `${n} 篇`,
    latest: "最新文章",
    back: "返回技術博客",
    protectedLabel: "受保護內容",
    protectedBody: "本文包含受保護內容，完整內容將於第二階段開放。",
    ctaTitle: "想把文章裡的想法落地？",
    ctaLead: "預約一場諮詢，讓我們針對你的系統與流程一起討論可行的做法。",
    ctaPrimary: "預約諮詢",
    ctaSecondary: "看服務內容",
    read: "閱讀全文",
    filterAll: "全部",
    noteBadge: "FIELD NOTE",
    related: "同主題文章",
    minutes: (n) => `約 ${n} 分鐘閱讀`,
    categories: {
      ai: { label: "AI 與 Agent", description: "AI 導入、coding agent 與自動化流程：哪些能交給機器，哪些要留給人。" },
      web: { label: "Web 與框架", description: "Next.js、前端架構、部署平台的實作紀錄與選型判斷。" },
      ops: { label: "資安與維運", description: "安全更新、升級節奏與上線後的維運清單。" },
      delivery: { label: "工程與交付", description: "架構、Code Review 與接案合作：讓專案能驗收、能維護。" },
      career: { label: "職涯歷程", description: "從生醫研究所到 AI 架構師：跨領域轉職、自學與每一段工作學到的事。" },
      studio: { label: "站務近況", description: "8plus 這個網站與工作室本身的更新與幕後。" },
    },
    subscribe: {
      jump: "訂閱更新",
      eyebrow: "SUBSCRIBE",
      title: "新文章寄到你的信箱",
      lead: "每月約 2–4 篇，主題是 AI 導入、Web 工程與維運。只在有新文章時寄出，隨時可以退訂。",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      submit: "訂閱",
      privacy: "送出後會收到一封確認信，點擊確認才會開始寄送。確認信可能被歸到垃圾郵件，請留意一下。",
      rssTitle: "用 RSS 訂閱",
      rssLead: "習慣用 Feedly、Inoreader 或其他閱讀器？加入這個網址即可。",
      rssOpen: "開啟 RSS",
      rssCopy: "複製網址",
      rssCopied: "已複製",
    },
  },
  en: {
    eyebrow: "04 · JOURNAL",
    count: (n) => `${n} ${n === 1 ? "article" : "articles"}`,
    topics: (n) => `${n} topics`,
    lastUpdated: (date) => `Last updated ${formatUtcDate(date, "en-US")}`,
    monthLabel: (ym) =>
      new Date(`${ym}-01T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" }),
    monthCount: (n) => `${n} ${n === 1 ? "post" : "posts"}`,
    latest: "Latest",
    back: "Back to Tech Blog",
    protectedLabel: "Protected content",
    protectedBody: "This article contains protected content. Full content is available in Phase 2.",
    ctaTitle: "Want to put these ideas to work?",
    ctaLead: "Book a consultation and we will work through a practical approach for your systems and workflows.",
    ctaPrimary: "Book a consultation",
    ctaSecondary: "See services",
    read: "Read article",
    filterAll: "All",
    noteBadge: "FIELD NOTE",
    related: "More on this topic",
    minutes: (n) => `${n} min read`,
    categories: {
      ai: { label: "AI & agents", description: "Adopting AI, coding agents and automation: what to hand to machines and what to keep for people." },
      web: { label: "Web & frameworks", description: "Notes and judgment calls on Next.js, front-end architecture and deployment platforms." },
      ops: { label: "Security & ops", description: "Security releases, upgrade routines and checklists for life after launch." },
      delivery: { label: "Engineering & delivery", description: "Architecture, code review and client work: projects you can accept and maintain." },
      career: { label: "Career journey", description: "From a biomedical lab to AI architecture: switching fields, teaching myself, and what each job taught me." },
      studio: { label: "Studio notes", description: "Updates and behind-the-scenes on 8plus, the site and the studio." },
    },
    subscribe: {
      jump: "Subscribe",
      eyebrow: "SUBSCRIBE",
      title: "Get new posts by email",
      lead: "About 2–4 posts a month on adopting AI, web engineering and operations. Sent only when there's a new post. Unsubscribe anytime.",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      submit: "Subscribe",
      privacy: "You'll get a confirmation email first. Nothing is sent until you confirm. If you don't see it, check your spam folder.",
      rssTitle: "Subscribe by RSS",
      rssLead: "Prefer Feedly, Inoreader or another reader? Add this URL.",
      rssOpen: "Open RSS",
      rssCopy: "Copy URL",
      rssCopied: "Copied",
    },
  },
};

/** RSS feed path per locale (see app/feed.xml and app/feed-en.xml). */
export const feedPath = (locale: Locale) => (locale === "en" ? "/feed-en.xml" : "/feed.xml");
