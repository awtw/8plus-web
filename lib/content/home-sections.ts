export type HomeLocale = 'zh-TW' | 'en'

export type HomePillar = {
  mark: string
  title: string
  description: string
}

export type HomeService = {
  title: string
  description: string
}

export type HomeSectionContent = {
  hero: {
    tag: string
    issueMark: string
    headline: string[]
    figureCaption: string
    scrollCue: string
    pillars: HomePillar[]
  }
  about: {
    eyebrow: string
    title: string
    lead: string
    moreCta: string
  }
  lab: {
    eyebrow: string
    title: string
    moreCta: string
  }
  services: {
    eyebrow: string
    title: string
    items: HomeService[]
    moreCta: string
  }
  blog: {
    eyebrow: string
    title: string
    moreCta: string
    readCta: string
  }
  booking: {
    eyebrow: string
    title: string
    lead: string
    cta: string
    loading: string
  }
}

const copy: Record<HomeLocale, HomeSectionContent> = {
  'zh-TW': {
    hero: {
      tag: '8PLUS.APP · TRUST001',
      issueMark: 'NO.01 — 2026',
      headline: ['架構先行，AI 落地', '把需求交付成可信系統'],
      figureCaption: 'FIG.01 — TRUST HANDSHAKE',
      scrollCue: '往下滾動，認識 8plus',
      pillars: [
        {
          mark: 'A',
          title: '架構先行',
          description: '系統邊界、技術選型、可擴展設計',
        },
        {
          mark: 'B',
          title: 'AI 導入',
          description: '把 AI 嵌進真實流程，而非展示用',
        },
        {
          mark: 'C',
          title: '體驗落地',
          description: 'Next.js 生產級模式、Code Review、迭代上線',
        },
      ],
    },
    about: {
      eyebrow: '01 · STORY',
      title: '關於我',
      lead: '從生醫到全端與雲端 — 自學驅動的工程之路。',
      moreCta: '閱讀完整故事',
    },
    lab: {
      eyebrow: '02 · LAB',
      title: '作品集',
      moreCta: '查看全部作品',
    },
    services: {
      eyebrow: '03 · SERVICES',
      title: '我能提供什麼',
      items: [
        {
          title: '程式架構諮詢',
          description: '系統邊界、技術選型、可擴展與可維護的架構設計',
        },
        {
          title: '網站開發',
          description: 'Next.js 全端開發、生產級交付與迭代上線',
        },
        {
          title: '設計包案',
          description: '從資訊架構到視覺語言的完整設計落地',
        },
        {
          title: '整體資訊規劃',
          description: '內容模型、導覽 IA、轉換動線的系統性規劃',
        },
      ],
      moreCta: '了解服務詳情',
    },
    blog: {
      eyebrow: '04 · JOURNAL',
      title: '心法與思考',
      moreCta: '閱讀全部文章',
      readCta: '閱讀',
    },
    booking: {
      eyebrow: '05 · BOOKING',
      title: '預約 30 分鐘諮詢',
      lead: '聊聊你的需求 — 從架構、開發到設計，一起找到可落地的路線。',
      cta: '前往完整預約頁',
      loading: '載入行事曆中…',
    },
  },
  en: {
    hero: {
      tag: '8PLUS.APP · TRUST001',
      issueMark: 'NO.01 — 2026',
      headline: ['Architecture first, AI shipped', 'Needs delivered as trusted systems'],
      figureCaption: 'FIG.01 — TRUST HANDSHAKE',
      scrollCue: 'Scroll to meet 8plus',
      pillars: [
        {
          mark: 'A',
          title: 'Architecture first',
          description: 'Boundaries, stack choices, scalable design',
        },
        {
          mark: 'B',
          title: 'AI integration',
          description: 'Embed AI in real workflows, not demos',
        },
        {
          mark: 'C',
          title: 'Experience delivery',
          description: 'Production Next.js, code review, iterative shipping',
        },
      ],
    },
    about: {
      eyebrow: '01 · STORY',
      title: 'About me',
      lead: 'From biomed to full-stack and cloud — a self-driven engineering path.',
      moreCta: 'Read the full story',
    },
    lab: {
      eyebrow: '02 · LAB',
      title: 'Selected work',
      moreCta: 'View all projects',
    },
    services: {
      eyebrow: '03 · SERVICES',
      title: 'What I offer',
      items: [
        {
          title: 'Architecture consulting',
          description: 'System boundaries, stack choices, scalable architecture',
        },
        {
          title: 'Web development',
          description: 'Next.js full-stack delivery and iterative shipping',
        },
        {
          title: 'Design packages',
          description: 'End-to-end design from IA to visual language',
        },
        {
          title: 'Information planning',
          description: 'Content models, navigation IA, conversion flows',
        },
      ],
      moreCta: 'Explore services',
    },
    blog: {
      eyebrow: '04 · JOURNAL',
      title: 'Thinking & craft',
      moreCta: 'Read all posts',
      readCta: 'Read',
    },
    booking: {
      eyebrow: '05 · BOOKING',
      title: 'Book a 30-minute call',
      lead: 'Talk through your needs — from architecture and development to design.',
      cta: 'Open full booking page',
      loading: 'Loading calendar…',
    },
  },
}

export function getHomeSectionContent(locale: HomeLocale): HomeSectionContent {
  return copy[locale] ?? copy['zh-TW']
}

export const HOME_SECTION_IDS = [
  'hero',
  'about',
  'lab',
  'services',
  'blog',
  'booking',
] as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number]
