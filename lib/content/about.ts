import type { Locale } from "@/lib/i18n";

export type AboutInterestIcon = "book" | "cloud" | "film" | "cat";

export type AboutContent = {
  eyebrow: string;
  headline: string;
  profile: string;
  chips: string[];
  highlights: string[];
  collaborationTitle: string;
  collaborationLead: string;
  collaboration: Array<{ title: string; desc: string }>;
  interestsTitle: string;
  interests: Array<{ icon: AboutInterestIcon; title: string; desc: string }>;
  experienceTitle: string;
  experience: Array<{ title: string; note: string }>;
  educationTitle: string;
  education: Array<{ school: string; degree: string; year: string }>;
  nextTitle: string;
  nextLead: string;
  bookCta: string;
};

export const aboutContent: Record<Locale, AboutContent> = {
  "zh-TW": {
    eyebrow: "關於我",
    headline: "把混亂的需求整理成可執行的系統",
    profile:
      "我是 August Wang，長期在前後端、雲端、資料與產品協作之間切換。我的強項不是只寫程式，而是把不清楚的問題整理成可以執行的系統方案，讓團隊知道下一步該怎麼做。",
    chips: ["8+ 年實戰", "台北", "工程顧問", "系統設計"],
    highlights: [
      "前端 / 後端 / 雲端 / 資料協作",
      "產品需求拆解與架構收斂",
      "效能優化、交付流程與團隊協作",
    ],
    collaborationTitle: "我可以幫你的，不只是一兩個固定項目",
    collaborationLead:
      "如果你的需求還沒完全定型，也沒關係。可以先從問題定義、架構風險、技術選型、效能瓶頸或交付流程開始，再一起收斂到真正需要做的事。",
    collaboration: [
      {
        title: "架構設計",
        desc: "適合需要重新整理技術結構、解耦舊系統、或定義新平台邊界的情境。",
      },
      {
        title: "技術選型",
        desc: "當你卡在框架、部署、資料層或整合方案時，我可以一起把選擇縮小。",
      },
      {
        title: "Code Review",
        desc: "檢查品質、可維護性、效能與交付風險，讓系統不只可以跑，還可以持續演進。",
      },
      {
        title: "顧問陪跑",
        desc: "如果你的需求還在模糊階段，我也能先幫你把問題定義、路線圖和優先順序釐清。",
      },
    ],
    interestsTitle: "合作場景",
    interests: [
      {
        icon: "book",
        title: "持續學習",
        desc: "我習慣把新東西整理成可複用的方法，而不是只停在看過。",
      },
      {
        icon: "cloud",
        title: "系統視角",
        desc: "我關心的不只是單一功能，而是它怎麼跟整個產品與團隊流程互動。",
      },
      {
        icon: "film",
        title: "生活靈感",
        desc: "電影、音樂、旅行與日常觀察，會一直回流到我的設計與判斷。",
      },
      {
        icon: "cat",
        title: "穩定節奏",
        desc: "保持輸出、休息與專注的節奏，對長期交付很重要。",
      },
    ],
    experienceTitle: "代表經驗",
    experience: [
      {
        title: "企業系統",
        note: "金融、零售與內部平台經驗，偏向穩定性與交付。",
      },
      {
        title: "AI 與平台",
        note: "從架構到整合，專注於讓新能力能真的進入流程。",
      },
      {
        title: "個人品牌",
        note: "把履歷、內容與諮詢入口整理成清楚的品牌站。",
      },
    ],
    educationTitle: "學歷",
    education: [
      {
        school: "NCTU 交通大學",
        degree: "分子醫學與生物工程研究所",
        year: "2018",
      },
      {
        school: "NTOU 海洋大學",
        degree: "食品科學系",
        year: "2012",
      },
    ],
    nextTitle: "下一步",
    nextLead:
      "如果你希望先把問題講清楚，再決定要不要做，我會比較適合。先約一個時段，我們把需求、限制與風險攤開來看。",
    bookCta: "預約諮詢",
  },
  en: {
    eyebrow: "About",
    headline: "Turn messy requirements into executable systems",
    profile:
      "I am August Wang. I work across frontend, backend, cloud, data, and product collaboration. My strength is not only writing code, but turning ambiguous problems into executable system plans so teams know what to do next.",
    chips: ["8+ years", "Taipei", "Consulting", "System design"],
    highlights: [
      "Frontend / backend / cloud / data collaboration",
      "Requirement breakdown and architecture alignment",
      "Performance tuning, delivery flow, and team collaboration",
    ],
    collaborationTitle: "What I can help with goes beyond a fixed menu",
    collaborationLead:
      "If your needs are not fully defined yet, that is fine. We can start with problem framing, architecture risk, technical selection, performance bottlenecks, or delivery flow, then converge on what actually needs to be done.",
    collaboration: [
      {
        title: "Architecture",
        desc: "For teams that need to rethink technical structure, decouple legacy systems, or define new platform boundaries.",
      },
      {
        title: "Selection",
        desc: "When you are stuck on frameworks, deployment, data layers, or integration options, I can help narrow the decision space.",
      },
      {
        title: "Review",
        desc: "Review quality, maintainability, performance, and delivery risk so the system can keep evolving, not just run.",
      },
      {
        title: "Consulting",
        desc: "If the requirement is still fuzzy, I can help clarify problem definition, roadmap, and priorities first.",
      },
    ],
    interestsTitle: "Ways to work together",
    interests: [
      {
        icon: "book",
        title: "Continuous learning",
        desc: "I try to turn new knowledge into reusable methods, not just something I have seen.",
      },
      {
        icon: "cloud",
        title: "Systems view",
        desc: "I care not only about one feature, but how it interacts with the product and team flow.",
      },
      {
        icon: "film",
        title: "Life inspiration",
        desc: "Film, music, travel, and everyday observation continuously feed back into my design and judgment.",
      },
      {
        icon: "cat",
        title: "Steady rhythm",
        desc: "Keeping a rhythm of output, rest, and focus matters for long-term delivery.",
      },
    ],
    experienceTitle: "Selected experience",
    experience: [
      {
        title: "Enterprise systems",
        note: "Finance, retail, and internal platform experience with a bias toward stability and delivery.",
      },
      {
        title: "AI and platforms",
        note: "From architecture to integration, focused on making new capabilities actually work in process.",
      },
      {
        title: "Personal brand",
        note: "Organized resume, content, and consulting entry points into a clear brand site.",
      },
    ],
    educationTitle: "Education",
    education: [
      {
        school: "NCTU",
        degree: "M.S. Molecular Medicine & Bioengineering",
        year: "2018",
      },
      {
        school: "NTOU",
        degree: "B.S. Food Science",
        year: "2012",
      },
    ],
    nextTitle: "Next step",
    nextLead:
      "If you want to clarify the problem before deciding what to build, I am a good fit. Book a slot and we will unpack requirements, constraints, and risk together.",
    bookCta: "Book a slot",
  },
};

export function getAboutContent(locale: Locale): AboutContent {
  return aboutContent[locale] ?? aboutContent.en;
}
