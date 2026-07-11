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

export type HomeSpectrumStage = {
  title: string
  caption: string
}

export type HomeHighlight = {
  label: string
  value: string
}

export type HomePathItem = {
  year: string
  period: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  active?: boolean
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
    kicker: string
    lead: string
    summary: string
    spectrumEyebrow: string
    spectrum: HomeSpectrumStage[]
    highlights: HomeHighlight[]
    chips: string[]
    moreCta: string
  }
  lab: {
    eyebrow: string
    title: string
    arc: string
    moreCta: string
  }
  path: {
    eyebrow: string
    title: string
    lead: string
    moreCta: string
    items: HomePathItem[]
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
      headline: ['AI 沒有魔法，只有工程', '對的架構，接住你的需求'],
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
      kicker: 'AUGUST WANG · awtw · 架構驅動的技術夥伴',
      lead: '設計、前端、後端到雲端架構，一手把想法交付成可信系統。',
      summary:
        '大學讀生醫與化學，卻在自學裡找到對程式的熱情，一路轉進全端與雲端；在 SaaS 產品的實戰中累積架構觀，如今以自由接案協助團隊，把想法交付成真正可信、可維護的系統。',
      spectrumEyebrow: '能力光譜 · 設計到架構一手包',
      spectrum: [
        { title: '設計', caption: 'UI/UX · 品牌識別 · 視覺語言' },
        { title: '前端', caption: '動效 · RWD · 互動體驗' },
        { title: '後端', caption: 'API · 資料模型 · 系統整合' },
        { title: '雲端架構', caption: 'Kubernetes · RAG · 可擴展設計' },
      ],
      highlights: [
        { label: '代表成就', value: '千萬級推播 · 30 分鐘送達' },
        { label: '跨域轉職', value: '生醫 → 工程' },
        { label: 'SaaS 實戰', value: '產品級架構經驗' },
        { label: '自由接案', value: '顧問 · 開發 · 設計' },
      ],
      chips: ['C# / .NET', 'Vue / React', 'Node / NestJS', 'Kubernetes', 'AWS · GCP'],
      moreCta: '閱讀完整故事',
    },
    lab: {
      eyebrow: '02 · LAB',
      title: '作品集',
      arc: '從青澀無框架 → 設計感動畫 → 商業電商／品牌形象',
      moreCta: '查看全部作品',
    },
    path: {
      eyebrow: '03 · PATH',
      title: '學職涯歷程',
      lead: '從生醫到 AI 架構 — 每一步都在累積可信交付的能力。',
      moreCta: '查看完整歷程',
      items: [
        {
          year: '2026',
          period: '2026-02 → 至今',
          title: '中國信託（法金 AI）',
          subtitle: '高級架構師',
          description:
            'AI Platform 與 RAG 架構設計、AI Agent 與知識工程落地，並參與大型架構開發與技術政策制定',
          tags: ['AI Platform', 'RAG', 'K8s'],
          active: true,
        },
        {
          year: '2025',
          period: '2025-03 → 09',
          title: '優配科技 Universal Processing',
          subtitle: '資深軟體工程師',
          description: 'CRM／POS／分潤系統開發，跨國團隊交付',
          tags: ['.NET', 'React', 'AWS'],
        },
        {
          year: '2024',
          period: '2024-06 → 2025-03',
          title: '台達電子',
          subtitle: '資深軟體工程師',
          description: 'Java 專案重構為 .NET Core 8、容器化部署至 Kubernetes、串接 SAP',
          tags: ['.NET Core 8', 'K8s', 'SAP'],
        },
        {
          year: '2021',
          period: '2021-03 → 2023-02',
          title: '91APP 九易宇軒',
          subtitle: '資深軟體工程師',
          description:
            '電商 SaaS — 獨立打造千萬級推播架構、30 分鐘全量送達；SLA、藍綠部署、多租戶實戰',
          tags: ['SaaS', '千萬級推播', '藍綠部署'],
        },
        {
          year: '2018',
          period: '2018-07',
          title: '交大 分子醫學與生物工程所',
          subtitle: '碩士畢業 · GPA 3.98',
          description: '從生醫跨入工程的起點',
          tags: ['R', 'Python'],
        },
      ],
    },
    services: {
      eyebrow: '04 · SERVICES',
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
      eyebrow: '05 · CONTACT / BOOKING',
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
      headline: ['No magic in AI — just engineering', 'The right architecture catches every need'],
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
      kicker: 'AUGUST WANG · awtw · Architecture-led partner',
      lead: 'Design, frontend, backend to cloud architecture — turning ideas into trusted systems, end to end.',
      summary:
        'From biomedical science to full-stack and cloud — self-taught, forged on real SaaS products. Now freelancing to help teams turn ideas into trusted, maintainable systems.',
      spectrumEyebrow: 'CAPABILITY · DESIGN TO ARCHITECTURE',
      spectrum: [
        { title: 'Design', caption: 'UI/UX · Brand identity · Visual language' },
        { title: 'Frontend', caption: 'Motion · RWD · Interaction' },
        { title: 'Backend', caption: 'API · Data models · Integration' },
        { title: 'Architecture', caption: 'Kubernetes · RAG · Scalable design' },
      ],
      highlights: [
        { label: 'Track record', value: '10M-scale push · 30-min delivery' },
        { label: 'Cross-field', value: 'Biomed → Engineering' },
        { label: 'SaaS', value: 'Production architecture' },
        { label: 'Freelance', value: 'Consult · Build · Design' },
      ],
      chips: ['C# / .NET', 'Vue / React', 'Node / NestJS', 'Kubernetes', 'AWS · GCP'],
      moreCta: 'Read the full story',
    },
    lab: {
      eyebrow: '02 · LAB',
      title: 'Selected work',
      arc: 'From raw HTML → motion craft → brand commerce',
      moreCta: 'View all projects',
    },
    path: {
      eyebrow: '03 · PATH',
      title: 'Career path',
      lead: 'From biomed to AI architecture — every step compounds toward trusted delivery.',
      moreCta: 'View full path',
      items: [
        {
          year: '2026',
          period: '2026-02 → Present',
          title: 'CTBC Bank (Corporate AI)',
          subtitle: 'Senior Architect',
          description:
            'AI platform & RAG architecture, AI agents and knowledge engineering — plus large-scale architecture programs and technical policy',
          tags: ['AI Platform', 'RAG', 'K8s'],
          active: true,
        },
        {
          year: '2025',
          period: '2025-03 → 09',
          title: 'Universal Processing LLC',
          subtitle: 'Senior Software Engineer',
          description: 'CRM / POS / revenue-share systems with a cross-border team',
          tags: ['.NET', 'React', 'AWS'],
        },
        {
          year: '2024',
          period: '2024-06 → 2025-03',
          title: 'Delta Electronics',
          subtitle: 'Senior Software Engineer',
          description: 'Refactored Java to .NET Core 8, K8s deployment, SAP integration',
          tags: ['.NET Core 8', 'K8s', 'SAP'],
        },
        {
          year: '2021',
          period: '2021-03 → 2023-02',
          title: '91APP',
          subtitle: 'Senior Software Engineer',
          description:
            'E-commerce SaaS — built a 10M-scale push architecture delivering in 30 minutes; SLA, blue-green deploys, multi-tenant',
          tags: ['SaaS', 'Push at scale', 'Blue-green'],
        },
        {
          year: '2018',
          period: '2018-07',
          title: 'NCTU — Molecular Medicine & Bioengineering',
          subtitle: 'M.S. · GPA 3.98',
          description: 'Where biomed crossed into engineering',
          tags: ['R', 'Python'],
        },
      ],
    },
    services: {
      eyebrow: '04 · SERVICES',
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
      eyebrow: '05 · CONTACT / BOOKING',
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
  'path',
  'services',
  'booking',
] as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number]
