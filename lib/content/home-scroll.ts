export type HomeScrollLocale = 'zh-TW' | 'en'

export type StoryBeat = {
  title: string
  body: string
}

export type ServiceModule = {
  mark: string
  title: string
  description: string
}

export type HomeScrollChapter =
  | {
      id: 'logo'
      index: 0
      eyebrow: string
      brand: string
      titleLines: [string, string]
      lead: string
    }
  | {
      id: 'story'
      index: 1
      displayLines: [string, string, string]
      beats: StoryBeat[]
      pathCta: string
    }
  | {
      id: 'lab'
      index: 2
      eyebrow: string
      title: string
      lead: string
    }
  | {
      id: 'projects'
      index: 3
      eyebrow: string
      title: string
      lead: string
    }
  | {
      id: 'services'
      index: 4
      displayLines: [string, string, string]
      modules: ServiceModule[]
    }
  | {
      id: 'connect'
      index: 5
      title: string
      lead: string
      bookingCta: string
      lineCta: string
    }

export type HomeScrollContent = {
  chapters: HomeScrollChapter[]
}

const content: Record<HomeScrollLocale, HomeScrollContent> = {
  'zh-TW': {
    chapters: [
      {
        id: 'logo',
        index: 0,
        eyebrow: 'PRECISION · ENGINEERING',
        brand: '8plus',
        titleLines: ['架構驅動的技術夥伴', '把複雜需求做成可交付的系統'],
        lead: '從架構決策到 AI 工作流落地 — 用可驗證的交付建立信任。',
      },
      {
        id: 'story',
        index: 1,
        displayLines: ['SELF', 'DRIVEN', 'ENGINEERING'],
        beats: [
          {
            title: '起點',
            body: '我從小習慣自學。大學讀生物與化學，成績不差，卻清楚那不是我要走一輩子的路。藝術比賽培養了對形式與秩序的敏感 — 後來這份敏感，都用在程式與系統設計上。',
          },
          {
            title: '轉折',
            body: '在交大分子醫學所，我用 R 與 Python 做基因定序分析，也修了資工課程。一次課堂專案的前後端整合，讓教授看見我的能力，也開啟了接案與自學的路 — 從 HTML 到 React、從腳本到架構。',
          },
          {
            title: '實戰',
            body: '替代役夜間進修、退伍後挑戰純後端、進入電商與 SaaS — 我親手處理過 SLA、藍綠部署、租戶隔離、跨國合規與成本控管。前端大改版時推動共用元件庫，讓工程與產品在同一套語言裡協作。',
          },
          {
            title: '信念',
            body: '自由接案與正職並行，讓我從設計、前端到後端都走過一輪。我愈發確信：好的架構是長期價值，倉促上線只是延後付帳。這也是 8plus 存在的原因。',
          },
        ],
        pathCta: '完整職涯路徑 →',
      },
      {
        id: 'lab',
        index: 2,
        eyebrow: 'R&D · LAB',
        title: '持續實驗的技術筆記',
        lead: '架構決策、工具鏈、AI 工作流 — 寫下來的才算數。',
      },
      {
        id: 'projects',
        index: 3,
        eyebrow: 'CASE STUDIES',
        title: '可驗證的交付',
        lead: '從架構設計到上線維運 — 每個專案都有可衡量的結果。',
      },
      {
        id: 'services',
        index: 4,
        displayLines: ['CONSULT', 'BUILD', 'DELIVER'],
        modules: [
          {
            mark: 'A',
            title: '架構顧問',
            description: '系統邊界、技術選型、可擴展設計',
          },
          {
            mark: 'B',
            title: 'AI 工作流',
            description: '把 AI 嵌進真實流程，而非展示用',
          },
          {
            mark: 'C',
            title: '體驗交付',
            description: 'Next.js 生產級模式、Code Review、迭代上線',
          },
        ],
      },
      {
        id: 'connect',
        index: 5,
        title: '聊聊你的系統挑戰',
        lead: '無論是架構卡關、AI 導入或團隊需要第二意見 — 先用 30 分鐘對齊方向。',
        bookingCta: '預約諮詢',
        lineCta: 'LINE 官方問答',
      },
    ],
  },
  en: {
    chapters: [
      {
        id: 'logo',
        index: 0,
        eyebrow: 'PRECISION · ENGINEERING',
        brand: '8plus',
        titleLines: [
          'Architecture-led engineering partner',
          'Turning complex requirements into deliverable systems',
        ],
        lead: 'From architecture decisions to AI workflow integration — trust built through verifiable delivery.',
      },
      {
        id: 'story',
        index: 1,
        displayLines: ['SELF', 'DRIVEN', 'ENGINEERING'],
        beats: [
          {
            title: 'Origin',
            body: 'I have always been self-driven. I studied biology and chemistry in college — I did well, but knew it was not the path I wanted long term. Art competitions trained my eye for form and order — sensitivity I later applied to code and system design.',
          },
          {
            title: 'Turning point',
            body: 'At NCTU’s Institute of Molecular Medicine, I used R and Python for sequencing analysis and took CS courses. One full-stack class project earned my professor’s trust and opened the door to freelance work — from HTML to React, from scripts to architecture.',
          },
          {
            title: 'In the field',
            body: 'Night study during alternative service, pure backend after military discharge, then e-commerce and SaaS — I have owned SLA, blue-green deploys, tenant isolation, cross-border compliance, and cost control. I also led a frontend overhaul with a shared component library.',
          },
          {
            title: 'Conviction',
            body: 'Freelance alongside full-time roles gave me design, frontend, and backend end to end. I am convinced: good architecture is long-term value; rushed launches are deferred debt. That is why 8plus exists.',
          },
        ],
        pathCta: 'Full career path →',
      },
      {
        id: 'lab',
        index: 2,
        eyebrow: 'R&D · LAB',
        title: 'Ongoing technical notes',
        lead: 'Architecture calls, toolchain choices, AI workflows — only what is written down counts.',
      },
      {
        id: 'projects',
        index: 3,
        eyebrow: 'CASE STUDIES',
        title: 'Verifiable delivery',
        lead: 'From architecture to production operations — every project has measurable outcomes.',
      },
      {
        id: 'services',
        index: 4,
        displayLines: ['CONSULT', 'BUILD', 'DELIVER'],
        modules: [
          {
            mark: 'A',
            title: 'Architecture advisory',
            description: 'System boundaries, stack decisions, scalable design',
          },
          {
            mark: 'B',
            title: 'AI workflows',
            description: 'Embed AI in real processes, not demos',
          },
          {
            mark: 'C',
            title: 'Experience delivery',
            description: 'Production-grade Next.js, code review, iterative shipping',
          },
        ],
      },
      {
        id: 'connect',
        index: 5,
        title: 'Talk through your system challenges',
        lead: 'Architecture blockers, AI adoption, or a second opinion for your team — start with a 30-minute alignment call.',
        bookingCta: 'Book a call',
        lineCta: 'LINE official Q&A',
      },
    ],
  },
}

export function getHomeScrollContent(locale: HomeScrollLocale): HomeScrollContent {
  return content[locale] ?? content['zh-TW']
}

export function getHomeScrollChapter<T extends HomeScrollChapter['id']>(
  locale: HomeScrollLocale,
  chapterId: T,
): Extract<HomeScrollChapter, { id: T }> {
  const chapter = getHomeScrollContent(locale).chapters.find((c) => c.id === chapterId)
  if (!chapter) {
    throw new Error(`Home scroll chapter not found: ${chapterId}`)
  }
  return chapter as Extract<HomeScrollChapter, { id: T }>
}

export const HOME_SCROLL_CHAPTER_IDS = ['logo', 'story', 'lab', 'projects', 'services', 'connect'] as const
