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
  servicesCta: string;
  labels: { collaboration: string; principles: string; experience: string; next: string; principlesTitle: string; education: string };
};

export const aboutContent: Record<Locale, AboutContent> = {
  "zh-TW": {
    eyebrow: "關於我",
    headline: "完善 AI 應用，確保資料正確與服務穩定",
    profile:
      "我是 August Wang，以 AI 架構師的角度完善 AI 應用：從資料處理、檢索、評測到服務整合，確保資料正確性與服務穩定性。同時善用 AI 協助開發，打造貼近職場與使用者需求的應用。在體驗上，我認為好的介面是看過就會用、不必多說，並兼顧無障礙與易讀字體。",
    chips: ["8+ 年實戰", "台北", "AI 應用", "UIX 設計"],
    highlights: [
      "AI 架構：RAG、地端模型、資料正確性與服務穩定",
      "AI 輔助開發，快速驗證並貼近使用者需求",
      "以 GA 分析行為與轉換率，持續優化體驗",
    ],
    collaborationTitle: "我可以幫你的，不只是一兩個固定項目",
    collaborationLead:
      "需求還沒定型也沒關係。可以從 AI 可行性、使用者流程、資料限制或轉換瓶頸開始，再一起收斂到真正需要做的事。",
    collaboration: [
      {
        title: "AI 架構與 RAG",
        desc: "規劃 RAG 與地端模型的資料流程、檢索與評測，確保結果可信、服務穩定。",
      },
      {
        title: "UIX 與無障礙",
        desc: "讓使用者看過就會用，並兼顧無障礙與適合的字體。",
      },
      {
        title: "數據分析",
        desc: "用 GA 看懂使用者行為與轉換率，找出體驗真正的卡點。",
      },
      {
        title: "AI 輔助開發與顧問",
        desc: "用 AI 加速開發與驗證；需求仍模糊時，先釐清問題、路線圖與優先順序。",
      },
    ],
    interestsTitle: "我怎麼看體驗與做事",
    interests: [
      {
        icon: "book",
        title: "看過就會用",
        desc: "介面應能自己說明自己，讓人一看就懂，不必多說。",
      },
      {
        icon: "cloud",
        title: "無障礙與易讀",
        desc: "知識型系統以易讀為先，選用無襯線字體，並顧及對比、字級與鍵盤操作。",
      },
      {
        icon: "film",
        title: "用數據說話",
        desc: "以 GA 觀察使用者怎麼走、在哪裡離開，再決定要改哪裡，而不是憑感覺。",
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
        title: "AI 與 RAG 平台",
        note: "金融場域的 AI Platform、RAG 與 AI Agent，重視正確率、權限與可落地。",
      },
      {
        title: "企業系統",
        note: "金融、零售與內部平台經驗，偏向穩定與交付。",
      },
      {
        title: "體驗設計",
        note: "從 POS 到品牌網站，把流程整理成一看就懂的介面。",
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
    nextTitle: "先把問題講清楚，再決定要不要做",
    nextLead:
      "先約一個時段，我們把需求、使用者流程、資料限制與 AI 可行性攤開來看，再決定下一步。",
    bookCta: "預約諮詢",
    servicesCta: "看服務內容",
    labels: { collaboration: "合作場景", principles: "體驗觀點", experience: "代表經驗", next: "下一步", principlesTitle: "我怎麼看體驗與做事", education: "學歷" },
  },
  en: {
    eyebrow: "About",
    headline: "Complete AI applications. Accurate data, stable service.",
    profile:
      "I am August Wang. As an AI architect, I help complete AI applications: from data processing, retrieval and evaluation to service integration, ensuring data accuracy and service stability. I use AI-assisted development to fit applications to real workplace and user needs. On experience, I believe a good interface is understood at a glance, with little need for explanation, and I pay attention to accessibility and readable type.",
    chips: ["8+ years", "Taipei", "AI applications", "UIX design"],
    highlights: [
      "AI architecture: RAG, on-prem models, data accuracy and service stability",
      "AI-assisted development for fast validation close to user needs",
      "GA behavior and conversion analysis to keep improving the experience",
    ],
    collaborationTitle: "What I can help with goes beyond a fixed menu",
    collaborationLead:
      "If your needs are not defined yet, that is fine. We can start from AI feasibility, user flows, data constraints, or a conversion bottleneck, then converge on what actually needs to be done.",
    collaboration: [
      {
        title: "AI architecture & RAG",
        desc: "Design the data flow, retrieval and evaluation of RAG and on-prem models so results are trustworthy and service is stable.",
      },
      {
        title: "UIX & accessibility",
        desc: "Let users understand an interface at a glance, with accessibility and suitable typography built in.",
      },
      {
        title: "Analytics",
        desc: "Use GA to understand behavior and conversion, and find where the experience actually gets stuck.",
      },
      {
        title: "AI-assisted dev & advisory",
        desc: "Speed up building and validation with AI; when requirements are fuzzy, clarify the problem, roadmap and priorities first.",
      },
    ],
    interestsTitle: "How I think about experience and work",
    interests: [
      {
        icon: "book",
        title: "Understood at a glance",
        desc: "An interface should explain itself, so people get it on sight with little need for explanation.",
      },
      {
        icon: "cloud",
        title: "Accessible and readable",
        desc: "Knowledge systems put readability first: sans-serif type, plus attention to contrast, size and keyboard use.",
      },
      {
        icon: "film",
        title: "Let data speak",
        desc: "Use GA to see how people move and where they leave, then decide what to change instead of guessing.",
      },
      {
        icon: "cat",
        title: "Steady rhythm",
        desc: "Keeping a rhythm of output, rest and focus matters for long-term delivery.",
      },
    ],
    experienceTitle: "Selected experience",
    experience: [
      {
        title: "AI and RAG platforms",
        note: "AI platform, RAG and AI agents in a financial setting, with focus on accuracy, access control and real adoption.",
      },
      {
        title: "Enterprise systems",
        note: "Finance, retail and internal platforms, with a bias toward stability and delivery.",
      },
      {
        title: "Experience design",
        note: "From POS to brand sites, turning flows into interfaces that are clear at a glance.",
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
    nextTitle: "Clarify the problem before deciding what to build",
    nextLead:
      "Book a slot and we will lay out requirements, user flows, data constraints and AI feasibility, then decide the next step.",
    bookCta: "Book a slot",
    servicesCta: "View services",
    labels: { collaboration: "Collaboration", principles: "Perspective", experience: "Experience", next: "Next step", principlesTitle: "How I think about experience and work", education: "Education" },
  },
};

export function getAboutContent(locale: Locale): AboutContent {
  return aboutContent[locale] ?? aboutContent.en;
}
