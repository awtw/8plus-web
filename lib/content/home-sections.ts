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
    subtitle: string
    principlesTitle: string
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
      headline: ['把 AI 想法，做成', '團隊真的能用的系統。'],
      subtitle: '從需求釐清、資料與權限，到評測和系統整合。陪你把想法拆成可驗證、可交付、能持續維護的下一步。',
      principlesTitle: '我怎麼做事',
      figureCaption: 'FIG.01 — TRUST HANDSHAKE',
      scrollCue: '往下滾動，認識 8plus',
      pillars: [
        {
          mark: 'A',
          title: 'AI 架構',
          description: '資料流程、RAG、地端模型與評測',
        },
        {
          mark: 'B',
          title: 'AI 輔助開發',
          description: '用 AI 加速開發，貼近職場與使用者需求',
        },
        {
          mark: 'C',
          title: 'UIX 與數據',
          description: '無障礙、易讀字體，GA 行為與轉換優化',
        },
      ],
    },
    about: {
      eyebrow: '01 · STORY',
      title: '關於我',
      kicker: 'AUGUST WANG · awtw · AI × UIX 技術夥伴',
      lead: '完善 AI 應用，確保資料正確與服務穩定；體驗則追求看過就會用。',
      summary:
        '大學讀生醫與化學，卻在自學裡找到對程式的熱情，一路走進全端、雲端與 AI。現以 AI 架構師的角度，規劃 RAG 與地端模型等 AI 應用的資料流程、評測與服務整合，確保資料正確與服務穩定；同時善用 AI 輔助開發，並透過 GA 分析行為與轉換，持續調整使用者體驗。',
      spectrumEyebrow: '能力光譜 · 從 AI 到 UIX',
      spectrum: [
        { title: 'AI 架構', caption: 'RAG · 地端模型 · 資料品質與評測' },
        { title: '服務穩定', caption: '服務整合 · 監控 · 可靠性' },
        { title: 'UIX 設計', caption: '資訊架構 · 無障礙 · 易讀字體' },
        { title: '數據分析', caption: 'GA4 · 使用者行為 · 轉換率' },
      ],
      highlights: [
        { label: '代表成就', value: '千萬級推播 · 30 分鐘送達' },
        { label: '目前專注', value: 'RAG · 地端模型' },
        { label: '設計原則', value: '看過就會用' },
        { label: '數據驅動', value: 'GA 行為與轉換分析' },
      ],
      chips: ['AI 架構', 'RAG · 地端模型', 'GA4', 'WCAG 無障礙', '附註：Python · FastAPI · Next.js'],
      moreCta: '閱讀完整故事',
    },
    lab: {
      eyebrow: '02 · LAB',
      title: '作品集',
      arc: '從商業系統到產品介面，看問題如何落地成作品。',
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
          tags: ['RAG', '地端模型', 'AI Agent'],
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
          title: 'AI 應用與 RAG',
          description: 'RAG、地端模型與服務整合，重視資料正確與服務穩定',
        },
        {
          title: 'UIX 與無障礙設計',
          description: '看過就會用，兼顧無障礙與易讀字體',
        },
        {
          title: '數據分析與轉換',
          description: '以 GA 分析使用者行為，找出體驗卡點並優化轉換率',
        },
        {
          title: 'AI 輔助開發與顧問',
          description: '用 AI 加速開發，協助團隊釐清問題並導入流程',
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
      lead: '聊聊你的需求 — 從 AI 應用、UIX 到數據分析，一起找到可落地的路線。',
      cta: '前往完整預約頁',
      loading: '載入行事曆中…',
    },
  },
  en: {
    hero: {
      tag: '8PLUS.APP · TRUST001',
      issueMark: 'NO.01 — 2026',
      headline: ['Turn AI ideas into', 'systems your team can use.'],
      subtitle: 'From requirements and data access to evaluation and integration. Turn the idea into something testable, deliverable and maintainable.',
      principlesTitle: 'How I work',
      figureCaption: 'FIG.01 — TRUST HANDSHAKE',
      scrollCue: 'Scroll to meet 8plus',
      pillars: [
        {
          mark: 'A',
          title: 'AI architecture',
          description: 'Data flow, RAG, on-prem models and evaluation',
        },
        {
          mark: 'B',
          title: 'AI-assisted development',
          description: 'Ship faster with AI, shaped to workplace and user needs',
        },
        {
          mark: 'C',
          title: 'UIX & data',
          description: 'Accessible, readable, refined by GA behavior and conversion',
        },
      ],
    },
    about: {
      eyebrow: '01 · STORY',
      title: 'About me',
      kicker: 'AUGUST WANG · awtw · AI × UIX partner',
      lead: 'Complete AI applications with accurate data and stable service; an experience understood at a glance.',
      summary:
        'From biomedical science to full-stack, cloud and AI — self-taught. Today I work as an AI architect, designing the data flow, evaluation and service integration of AI applications such as RAG and on-prem models so data stays accurate and service stays stable, using AI-assisted development and GA behavior and conversion analysis to keep refining the experience.',
      spectrumEyebrow: 'CAPABILITY · AI TO UIX',
      spectrum: [
        { title: 'AI architecture', caption: 'RAG · On-prem models · Data quality & evaluation' },
        { title: 'Service stability', caption: 'Integration · Monitoring · Reliability' },
        { title: 'UIX design', caption: 'IA · Accessibility · Readable type' },
        { title: 'Analytics', caption: 'GA4 · User behavior · Conversion' },
      ],
      highlights: [
        { label: 'Track record', value: '10M-scale push · 30-min delivery' },
        { label: 'Focus now', value: 'RAG · On-prem models' },
        { label: 'Design principle', value: 'Understood at a glance' },
        { label: 'Data-driven', value: 'GA behavior & conversion' },
      ],
      chips: ['AI architecture', 'RAG · On-prem models', 'GA4', 'WCAG accessibility', 'Stack notes: Python · FastAPI · Next.js'],
      moreCta: 'Read the full story',
    },
    lab: {
      eyebrow: '02 · LAB',
      title: 'Selected work',
      arc: 'From business systems to product interfaces — see the work in practice.',
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
          tags: ['RAG', 'On-prem LLM', 'AI Agent'],
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
          title: 'AI applications & RAG',
          description: 'RAG, on-prem models and service integration for accurate data and stable service',
        },
        {
          title: 'UIX & accessible design',
          description: 'Understood at a glance, with accessibility and readable type',
        },
        {
          title: 'Analytics & conversion',
          description: 'Use GA to find experience friction and lift conversion',
        },
        {
          title: 'AI-assisted dev & advisory',
          description: 'Build faster with AI and help teams frame problems and adopt workflows',
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
      lead: 'Talk through your needs — from AI applications and UIX to data analysis.',
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
  'lab',
  'services',
  'principles',
  'about',
  'journal',
  'booking',
] as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number]
