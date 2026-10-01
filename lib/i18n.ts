export const locales = ['zh-TW', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-TW'

// 翻譯字典
export const translations = {
  'zh-TW': {
    // 導航
    nav: {
      home: '首頁',
      lab: 'LAB',
      services: '服務',
      projects: 'LAB',
      blog: '博客',
      booking: '預約',
      about: '關於',
      path: '歷程',
      process: '流程',
      pricing: '合作模式',
      contact: '聯絡',
    },
    // 主頁
    home: {
      title: 'AI 應用 · UIX · 顧問',
      subtitle: '專注於 AI 應用架構、使用者體驗（UIX）與技術諮詢。\n從資料處理、檢索、評測到服務整合，確保資料正確與服務穩定，\n並讓介面看過就會用。',
      heroTitle1: '完善 AI 應用',
      heroTitle2: '資料正確，服務穩定',
      heroBadge: '開放預約諮詢',
      heroGreeting: '',
      heroEditorialTag: '8PLUS × AI · UIX',
      heroVerticalRail: '8PLUS · AI × UIX',
      heroMastheadEn: 'AI & UIX INTRODUCTION',
      heroMastheadZh: 'AI 與 UIX 顧問介紹',
      heroSectionDelivery: '交付證明',
      heroSectionAbout: '關於我們',
      heroLead: '8plus 以 AI 架構師的角度完善 AI 應用：從資料處理、檢索、評測到服務整合，確保資料正確性與服務穩定性；善用 AI 輔助開發，貼近職場與使用者需求；體驗設計追求「看過就會用」，並以 GA 行為與轉換數據持續調整。',
      architectureLabel: 'AI 應用流程',
      architectureNodes: '需求|資料|RAG|體驗|驗證',
      deliveryPreview: '交付成果預覽',
      floatingLabels: 'RAG|地端模型|資料品質|服務穩定|GA 分析',
      bookCall: '預約諮詢',
      viewProjects: '看專案',
      bookConsultation: '預約諮詢',
      coreServices: '核心服務',
      featuredProjects: '代表專案',
      recentPosts: '最新文章',
      latestNote: 'Archive / 最新文章',
      featuredProject: 'Lab / 代表專案',
      viewAll: '查看全部',
      read: '閱讀',
      open: '查看',
      portfolioNote: '持續更新中的作品庫',
      closingTitle: '想讓 AI 與介面真正被用起來，從這裡開始。',
      closingLead: '先從一次 30 分鐘的討論開始，我會幫你把需求、使用者流程、AI 可行性與資料限制整理成可以執行的下一步。',
      bookNow: '預約',
      aboutMe: '認識我',
      available: '可洽詢',
      role: 'AI 應用 / UIX 顧問',
      checklist1: '把需求拆成可以執行的路線圖',
      checklist2: '從資料、AI 架構到 UIX 一起校準',
      checklist3: '用使用者行為與轉換數據驗證成效',
      statYears: '實戰年資',
      statDomains: '專長場景',
      statBooking: '初步對談',
      viewPricing: '看合作模式',
      viewProcess: '完整流程',
      contactCta: '聯絡我',
      pillars: [
        {
          title: 'AI 架構與 RAG',
          description: '規劃 RAG 與地端模型的資料流程、檢索與評測，確保資料正確、服務穩定，資料可留在自己的環境。',
          icon: 'cloud',
        },
        {
          title: 'AI 輔助開發',
          description: '善用 AI 加速開發與驗證，做出貼近職場流程與使用者需求的 AI 應用，而不是停在 demo。',
          icon: 'code',
        },
        {
          title: 'UIX 與數據',
          description: '好的體驗是看過就會用、不必多說；兼顧無障礙與易讀字體，並以 GA 行為與轉換率持續調整。',
          icon: 'sparkle',
        },
      ],
      services: {
        frontend: {
          title: 'AI 應用架構',
          description: 'RAG、地端模型與服務整合，重視資料正確與服務穩定（服務層常用 Python / FastAPI、前端如 Next.js，僅作附註）'
        },
        architecture: {
          title: 'UIX 設計與分析',
          description: '無障礙設計、易讀字體，並以 GA 分析使用者行為與轉換率'
        },
        consulting: {
          title: '技術諮詢',
          description: '一對一技術指導、團隊培訓、專案評估與 AI 導入建議'
        }
      },
      learnMore: '了解更多',
    },
    detail: {
      bookConsultation: '預約諮詢',
      bookConsultationLead: '想進一步討論這個主題或類似專案？預約一次 30 分鐘對談。',
    },
    // 項目頁面
    projects: {
      title: 'Lab',
      description: '精選的 AI 應用、系統與體驗實作紀錄',
      caseStudy: '案例研究',
      challenge: '挑戰',
      solution: '解法',
      results: '成果指標',
      client: '客戶',
      role: '角色',
      period: '時期',
      highlights: '重點成果',
      techStack: '技術棧',
      links: '相關鏈接',
      viewDetails: '查看詳情',
      noProjects: '暫無 Lab',
    },
    // 博客頁面
    blog: {
      title: '技術博客',
      description: '分享 AI 應用、RAG、UIX 與開發實務的經驗',
      noPosts: '暫無文章',
      readMore: '閱讀更多',
    },
    // 預約頁面
    booking: {
      title: '預約諮詢',
      subtitle: '選擇適合你的時間，我們來深入討論你的技術需求與合作方式。',
      servicesInclude: '可討論的主題包含：',
      loading: '載入行事曆中…',
      services: [
        '需求釐清、問題定義與解法拆解',
        'AI 應用、RAG 與地端模型的可行性與架構',
        'UIX 診斷、無障礙與 GA 數據分析',
        'AI 輔助開發、團隊導入與顧問陪跑'
      ],
      cards: {
        ready: { title: '可直接預約', desc: '行事曆載入完成後，即可選擇時段。' },
        topics: { title: '合作主題', desc: '從 AI 應用、UIX 到數據分析皆可討論。' },
        clarify: { title: '先釐清再開始', desc: '我們可以先定義問題，再一起找解法。' },
      },
    },
    // 關於頁面
    about: {
      title: '關於我們',
      content: '我們專注於 AI 應用、UIX 與技術諮詢。'
    },
    // 聯繫頁面
    contact: {
      title: '聯絡我們',
      lead: '描述你的情境，我會在 1–2 個工作天內回覆。急件可直接預約諮詢時段。',
      name: '姓名',
      emailLabel: 'Email',
      company: '公司（選填）',
      budget: '預算 / 合作模式',
      budgetUnset: '尚未確定',
      budgetAdvisory: '顧問陪跑',
      budgetProject: '專案交付',
      budgetWorkshop: '工作坊',
      message: '訊息',
      submit: '送出訊息',
      sending: '送出中…',
      success: '已收到你的訊息，我會盡快回覆。',
      errorMissing: '請填寫姓名、Email 與訊息。',
      errorEmail: 'Email 格式不正確。',
      errorGeneric: '送出失敗，請稍後再試。',
      quickBook: '急件？',
      quickBookTitle: '直接預約 30 分鐘',
      quickBookLead: '若已有明確議題，直接預約通常是最快的開始方式。',
      lineEyebrow: 'LINE 官方帳號',
      lineTitle: '加入 8plus Chatbot',
      lineLead: '掃描 QR 或點擊按鈕加好友，直接在 LINE 與我討論需求。',
      lineOpen: '加入 LINE 好友',
    },
    // 服務頁面
    services: {
      title: '專業服務',
      description: '提供 AI 應用、UIX 設計與技術諮詢服務',
      eyebrow: 'Services',
      headline: '服務不是菜單，而是一起把問題做清楚',
      lead: '我的協作範圍比頁面上列出的項目更廣。與其把服務寫成固定清單，不如把它理解成不同的合作模式，最後都回到同一件事：幫你把技術問題變得可以執行。',
      items: [
        { title: 'AI 架構與 RAG', desc: '規劃 RAG 與地端模型的資料流程、檢索與評測，確保資料正確性與服務穩定性。' },
        { title: 'UIX 與無障礙設計', desc: '讓介面看過就會用，並兼顧無障礙與易讀字體。' },
        { title: '數據分析與轉換優化', desc: '用 GA 分析使用者行為與轉換率，找出介面真正的卡點。' },
        { title: 'AI 輔助開發與顧問', desc: '用 AI 加速開發、導入團隊流程，需求還模糊時也能先釐清問題與優先順序。' },
      ],
      bookCta: '前往預約',
      aboutCta: '看更多背景',
    },
    // 通用
    common: {
      loading: '載入中...',
      error: '發生錯誤',
      notFound: '頁面未找到',
      backToHome: '返回首頁',
      skipToMain: '跳至主要內容',
      theme: '主題',
      close: '關閉',
      selectLanguage: '選擇語言',
    },
    path: {
      ctaTitle: '準備好討論下一步了嗎？',
      ctaLead: '預約一次對談，一起規劃你的技術路線與合作方式。',
      ctaButton: '預約諮詢',
      current: '目前',
      period: '2012 — 2026',
      title: '職涯歷程',
      lead: '從跨領域學術背景到企業 AI 架構 — 每個階段都在累積可交付的系統能力與協作經驗。',
    },
    theme: {
      toggle: '切換亮暗模式',
      designMenu: '設計模式選單',
      longPressHint: '長按 Logo 也可開啟',
      current: '目前',
    },
    // 頁腳
    footer: {
      tagline: 'AI · UIX · 顧問',
      builtWith: '使用 Next.js 15 + Velite 構建',
      metaphysics: 'Metaphysics & UIX longform at',
      madeIn: '台灣製造',
      poweredBy: '由 Vercel 提供支持',
      navLabel: '站內連結',
      rss: 'RSS',
    },
    shareHub: {
      businessName: '8plus',
      businessLead: 'AI 架構師：完善 AI 應用，確保資料正確與服務穩定，體驗做到看過就會用。',
      socialName: 'August',
      socialLead: '生活裡的片段、正在做的事。',
      copyEmail: '複製',
      copied: '已複製',
      openLine: '開啟 LINE',
      personalLine: '私人 LINE',
      personalLineLead: '掃描加入私人帳號',
      pathButton: '專業經歷',
      pathButtonDesc: '點開查看完整職涯',
      pathButtonCollapse: '點擊收合',
      backToHome: '返回首頁',
      closePanel: '收合',
      avatarSwap: '切換照片',
      avatarHint: '點我換一張',
    },
  },
  'en': {
    // Navigation
    nav: {
      home: 'Home',
      lab: 'LAB',
      services: 'Services',
      projects: 'Lab',
      blog: 'Blog',
      booking: 'Booking',
      about: 'About',
      path: 'Path',
      process: 'Process',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    // Home
    home: {
      title: 'AI Applications · UIX · Consulting',
      subtitle: 'Focused on AI application architecture, user experience (UIX), and technical consulting.\nFrom data processing, retrieval and evaluation to service integration,\nkeeping data accurate and services stable, with interfaces that make sense at a glance.',
      heroTitle1: 'Complete AI applications',
      heroTitle2: 'Accurate data, stable service',
      heroBadge: 'Available for consulting',
      heroGreeting: 'Meet!',
      heroEditorialTag: '8PLUS × AI · UIX',
      heroVerticalRail: '8PLUS · AI × UIX',
      heroMastheadEn: 'AI & UIX INTRODUCTION',
      heroMastheadZh: 'AI & UIX Introduction',
      heroSectionDelivery: 'Delivery Proof',
      heroSectionAbout: 'About Us',
      heroLead: '8plus approaches AI applications as an AI architect: from data processing, retrieval and evaluation to service integration, ensuring data accuracy and service stability. AI-assisted development keeps solutions close to workplace and user needs, and experience design aims for interfaces that are understood at a glance, refined with GA behavior and conversion data.',
      architectureLabel: 'AI application flow',
      architectureNodes: 'Need|Data|RAG|UX|Verify',
      deliveryPreview: 'Delivery preview',
      floatingLabels: 'RAG|On-prem LLM|Data quality|Service stability|GA insights',
      bookCall: 'Book a call',
      viewProjects: 'View projects',
      bookConsultation: 'Book Consultation',
      coreServices: 'Core Services',
      featuredProjects: 'Featured projects',
      recentPosts: 'Recent Posts',
      latestNote: 'Archive / Latest note',
      featuredProject: 'Lab / Featured project',
      viewAll: 'View All',
      read: 'Read',
      open: 'Open',
      portfolioNote: 'Continuously updated portfolio',
      closingTitle: 'If you want AI and interfaces people actually use, start here.',
      closingLead: 'Start with a 30-minute conversation and we will turn needs, user flows, AI feasibility, and data constraints into executable next steps.',
      bookNow: 'Book now',
      aboutMe: 'About',
      available: 'Available',
      role: 'AI application / UIX consultant',
      checklist1: 'Break requirements into a plan people can execute',
      checklist2: 'Align data, AI architecture, and UIX in one pass',
      checklist3: 'Verify results with user behavior and conversion data',
      statYears: 'Years in production',
      statDomains: 'Core domains',
      statBooking: 'Discovery Call',
      viewPricing: 'View models',
      viewProcess: 'Full process',
      contactCta: 'Contact',
      pillars: [
        {
          title: 'AI Architecture & RAG',
          description: 'Design the data flow, retrieval and evaluation of RAG and on-prem models, keeping data accurate and services stable, with data staying in your own environment.',
          icon: 'cloud',
        },
        {
          title: 'AI-assisted Development',
          description: 'Use AI to speed up building and verification, and ship AI applications that fit real workplace flows and user needs, not just demos.',
          icon: 'code',
        },
        {
          title: 'UIX & Data',
          description: 'Good experience is understood at a glance, with little need for explanation; accessible, readable, and refined by GA behavior and conversion rates.',
          icon: 'sparkle',
        },
      ],
      services: {
        frontend: {
          title: 'AI Application Architecture',
          description: 'RAG, on-prem models and service integration, focused on data accuracy and service stability (Python / FastAPI at the service layer and frontend such as Next.js are noted as stack only)'
        },
        architecture: {
          title: 'UIX Design & Analytics',
          description: 'Accessible design, readable typography, and GA-based analysis of user behavior and conversion'
        },
        consulting: {
          title: 'Technical Consulting',
          description: 'One-on-one technical guidance, team training, project assessment and AI adoption advice'
        }
      },
      learnMore: 'Learn More',
    },
    detail: {
      bookConsultation: 'Book Consultation',
      bookConsultationLead: 'Want to discuss this topic or a similar project? Book a 30-minute call.',
    },
    // Projects
    projects: {
      title: 'Lab',
      description: 'Selected AI applications, systems and UX work',
      caseStudy: 'Case Study',
      challenge: 'Challenge',
      solution: 'Solution',
      results: 'Results',
      client: 'Client',
      role: 'Role',
      period: 'Period',
      highlights: 'Key Achievements',
      techStack: 'Tech Stack',
      links: 'Related Links',
      viewDetails: 'View Details',
      noProjects: 'No Lab available',
    },
    // Blog
    blog: {
      title: 'Tech Blog',
      description: 'Sharing experience on AI applications, RAG, UIX and development practice',
      noPosts: 'No posts available',
      readMore: 'Read More',
    },
    // Booking
    booking: {
      title: 'Book Consultation',
      subtitle: 'Choose a suitable time, and let\'s discuss your technical needs and collaboration model in depth.',
      servicesInclude: 'Topics we can cover:',
      loading: 'Loading calendar…',
      services: [
        'Problem framing, requirement clarification, and solution breakdown',
        'Feasibility and architecture for AI applications, RAG and on-prem models',
        'UIX review, accessibility and GA data analysis',
        'AI-assisted development, team adoption, and consulting support'
      ],
      cards: {
        ready: { title: 'Ready to book', desc: 'Pick a time slot once the calendar is loaded.' },
        topics: { title: 'Topics', desc: 'From AI applications and UIX to data analysis.' },
        clarify: { title: 'Clarify first', desc: 'We can define the problem before we define the solution.' },
      },
    },
    // About
    about: {
      title: 'About Us',
      content: 'We focus on AI applications, UIX, and technical consulting.'
    },
    // Contact
    contact: {
      title: 'Contact',
      lead: 'Describe your context and I will reply within 1–2 business days. For urgent topics, book a consultation slot directly.',
      name: 'Name',
      emailLabel: 'Email',
      company: 'Company (optional)',
      budget: 'Budget / engagement model',
      budgetUnset: 'Not sure yet',
      budgetAdvisory: 'Advisory retainer',
      budgetProject: 'Project delivery',
      budgetWorkshop: 'Workshop',
      message: 'Message',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Message received — I will get back to you soon.',
      errorMissing: 'Please fill in name, email, and message.',
      errorEmail: 'Invalid email address.',
      errorGeneric: 'Something went wrong. Please try again.',
      quickBook: 'In a hurry?',
      quickBookTitle: 'Book 30 minutes directly',
      quickBookLead: 'If the topic is already clear, booking directly is usually the fastest path.',
      lineEyebrow: 'LINE Official Account',
      lineTitle: 'Add 8plus on LINE',
      lineLead: 'Scan the QR code or tap below to add the bot and message me directly.',
      lineOpen: 'Add LINE friend',
    },
    // Services
    services: {
      title: 'Professional Services',
      description: 'AI applications, UIX design and technical consulting',
      eyebrow: 'Services',
      headline: 'Services are not a menu — they are a way to get the problem right',
      lead: 'My collaboration scope is broader than any list on this page. Rather than fixed packages, think of these as modes of working that all lead to the same outcome: making your technical problems executable.',
      items: [
        { title: 'AI Architecture & RAG', desc: 'Design the data flow, retrieval and evaluation of RAG and on-prem models for accurate data and stable service.' },
        { title: 'UIX & Accessible Design', desc: 'Interfaces understood at a glance, with accessibility and readable type built in.' },
        { title: 'Analytics & Conversion', desc: 'Use GA to analyze behavior and conversion and find where the interface really gets stuck.' },
        { title: 'AI-assisted Development & Advisory', desc: 'Speed up delivery with AI, adopt it in team workflows, and clarify the problem first when requirements are still fuzzy.' },
      ],
      bookCta: 'Book a call',
      aboutCta: 'More background',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      notFound: 'Page not found',
      backToHome: 'Back to Home',
      skipToMain: 'Skip to main content',
      theme: 'Theme',
      close: 'Close',
      selectLanguage: 'Select language',
    },
    path: {
      ctaTitle: 'Ready to discuss your next step?',
      ctaLead: 'Book a call and we can plan your technical roadmap and collaboration model.',
      ctaButton: 'Book Consultation',
      current: 'Current',
      period: '2012 — 2026',
      title: 'Career Archive',
      lead: 'From cross-disciplinary study to enterprise AI architecture — each stage built more deliverable system capability and collaboration experience.',
    },
    theme: {
      toggle: 'Toggle light/dark mode',
      designMenu: 'Design mode menu',
      longPressHint: 'Long press logo also works',
      current: 'Current',
    },
    footer: {
      tagline: 'AI · UIX · Consulting',
      builtWith: 'Built with Next.js 15 + Velite',
      metaphysics: 'Metaphysics & UIX longform at',
      madeIn: 'Made in Taiwan',
      poweredBy: 'Powered by Vercel',
      navLabel: 'Site links',
      rss: 'RSS',
    },
    shareHub: {
      businessName: '8plus',
      businessLead: 'AI architect: complete AI applications, accurate data, stable service, and an experience understood at a glance.',
      socialName: 'August',
      socialLead: 'Life snippets and work in progress.',
      copyEmail: 'Copy',
      copied: 'Copied',
      openLine: 'Open LINE',
      personalLine: 'Personal LINE',
      personalLineLead: 'Scan to add personal account',
      pathButton: 'Career',
      pathButtonDesc: 'Tap to expand full timeline',
      pathButtonCollapse: 'Tap to collapse',
      backToHome: 'Back home',
      closePanel: 'Close',
      avatarSwap: 'Switch photo',
      avatarHint: 'Tap to switch',
    },
  }
} as const

// 獲取翻譯文本的工具函數
export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

// 獲取嵌套對象的翻譯
export function getNestedTranslation(locale: Locale, path: string): any {
  const keys = path.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value
}
