export const locales = ['zh-TW', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-TW'

// 翻譯字典
export const translations = {
  'zh-TW': {
    // 導航
    nav: {
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
      title: 'Engineering · UX · Consulting',
      subtitle: '專注於前端工程、用戶體驗設計和技術諮詢。\n使用現代技術棧構建高品質的 Web 應用程序，\n並提供專業的技術指導和架構建議。',
      heroTitle1: '以架構驅動',
      heroTitle2: 'AI 與體驗落地',
      heroBadge: '開放預約諮詢',
      heroGreeting: '',
      heroEditorialTag: '8PLUS × ENGINEERING',
      heroVerticalRail: '8PLUS · ARCHITECTURE FIRST',
      heroMastheadEn: 'ENGINEERING INTRODUCTION',
      heroMastheadZh: '工程顧問介紹',
      heroSectionDelivery: '交付證明',
      heroSectionAbout: '關於我們',
      heroLead: '8plus 協助團隊把需求拆成可驗證的技術架構，導入 AI 到真實流程，並以優秀的使用者體驗把產品做成能交付、能維護、能被信任的系統。',
      architectureLabel: '架構交付流',
      architectureNodes: '需求|架構|AI|體驗|交付',
      deliveryPreview: '交付成果預覽',
      floatingLabels: '架構先行|AI 工作流|Next.js|可驗證交付|Production',
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
      closingTitle: '如果你要的是能落地的技術夥伴，這裡可以直接開始。',
      closingLead: '先從一次 30 分鐘的討論開始，我會幫你把需求、限制、風險、AI 可行性與使用者流程整理成可以執行的下一步。',
      bookNow: '預約',
      aboutMe: '認識我',
      available: '可洽詢',
      role: '工程顧問 / 架構設計',
      checklist1: '把需求拆成可以執行的路線圖',
      checklist2: '從架構、AI 到 UX 一起校準',
      checklist3: '用可驗證交付取代空談',
      statYears: '實戰年資',
      statDomains: '專長場景',
      statBooking: '初步對談',
      viewPricing: '看合作模式',
      viewProcess: '完整流程',
      contactCta: '聯絡我',
      pillars: [
        {
          title: '架構先行',
          description: '先釐清資料流、權限、API、部署與維運邊界，讓需求從第一天就有可以演進的骨架。',
          icon: 'cloud',
        },
        {
          title: 'AI 導入',
          description: '把 AI 放進真實工作流，而不是停在 demo：資料準備、提示設計、權限控管與人機協作一起規劃。',
          icon: 'code',
        },
        {
          title: '體驗落地',
          description: '從介面、內容、狀態回饋到交付節奏一起校準，讓使用者真的願意用，也讓團隊能持續交付。',
          icon: 'sparkle',
        },
      ],
      services: {
        frontend: {
          title: '前端開發',
          description: 'Next.js、React、TypeScript 等現代前端技術棧的專業開發服務'
        },
        architecture: {
          title: '架構設計',
          description: '系統架構設計、技術選型建議、代碼審查和性能優化'
        },
        consulting: {
          title: '技術諮詢',
          description: '一對一技術指導、團隊培訓、項目評估和改進建議'
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
      description: '精選的技術 Lab 和客戶案例',
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
      description: '分享前端技術、開發經驗和行業見解',
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
        '前端 / 後端 / API 架構設計與技術選型',
        'Code Review、效能優化與交付流程',
        '產品技術策略、團隊協作與顧問陪跑'
      ],
      cards: {
        ready: { title: '可直接預約', desc: '行事曆載入完成後，即可選擇時段。' },
        topics: { title: '合作主題', desc: '從架構、Code Review 到產品交付流程皆可討論。' },
        clarify: { title: '先釐清再開始', desc: '我們可以先定義問題，再一起找解法。' },
      },
      contactSection: '或填寫表單',
      contactLead: '不方便選時段？留下訊息，我會在 1–2 個工作天內回覆。',
    },
    // 關於頁面
    about: {
      title: '關於我們',
      content: '我們是專注於前端工程和技術諮詢的團隊...'
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
      errorGeneric: '送出失敗，請稍後再試或直接 Email 聯絡。',
      quickBook: '急件？',
      quickBookTitle: '直接預約 30 分鐘',
      quickBookLead: '若已有明確議題，直接預約通常是最快的開始方式。',
      bookCta: '前往預約',
      lineEyebrow: 'LINE 官方帳號',
      lineTitle: '加入 8plus Chatbot',
      lineLead: '掃描 QR 或點擊按鈕加好友，直接在 LINE 與我討論需求。',
      lineOpen: '加入 LINE 好友',
    },
    // 服務頁面
    services: {
      title: '專業服務',
      description: '提供全方位的前端開發和技術諮詢服務',
      eyebrow: 'Services',
      headline: '服務不是菜單，而是一起把問題做清楚',
      lead: '我的協作範圍比頁面上列出的項目更廣。與其把服務寫成固定清單，不如把它理解成不同的合作模式，最後都回到同一件事：幫你把技術問題變得可以執行。',
      items: [
        { title: 'Architecture & Delivery', desc: '適合要重新梳理架構、拆解舊系統、定義新平台邊界的合作情境。' },
        { title: 'Frontend / Full-stack', desc: '從 UI、資料流到 API 與部署，把產品與實作拉成同一條線。' },
        { title: 'Review & Optimization', desc: 'Code Review、效能優化、可靠性與交付流程上的實務建議。' },
        { title: 'Consulting Support', desc: '如果需求還在模糊期，也可以先幫你把問題定義與優先順序整理出來。' },
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
      tagline: 'Engineering & Consulting',
      builtWith: '使用 Next.js 15 + Velite 構建',
      metaphysics: 'Metaphysics & UIX longform at',
      madeIn: '台灣製造',
      poweredBy: '由 Vercel 提供支持',
      navLabel: '站內連結',
      rss: 'RSS',
    },
    shareHub: {
      businessName: 'August Wang',
      businessLead: '架構驅動的技術夥伴。預約對談，或看看我如何把系統從想法做到上線。',
      socialName: 'August',
      socialLead: '生活裡的片段、正在做的事。',
      copyEmail: '複製',
      copied: '已複製',
      openLine: '開啟 LINE',
      personalLine: '私人 LINE',
      personalLineLead: '掃描加入私人帳號',
      pathButton: '專業經歷',
      pathButtonDesc: '點開查看完整職涯',
      avatarSwap: '切換照片',
      avatarHint: '點我換一張',
    },
  },
  'en': {
    // Navigation
    nav: {
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
      title: 'Engineering · UX · Consulting',
      subtitle: 'Focused on frontend engineering, user experience design, and technical consulting.\nBuilding high-quality web applications with modern technology stacks,\nand providing professional technical guidance and architectural advice.',
      heroTitle1: 'Architecture-led',
      heroTitle2: 'AI and product experience',
      heroBadge: 'Available for consulting',
      heroGreeting: 'Meet!',
      heroEditorialTag: '8PLUS × ENGINEERING',
      heroVerticalRail: '8PLUS · ARCHITECTURE FIRST',
      heroMastheadEn: 'ENGINEERING INTRODUCTION',
      heroMastheadZh: 'Engineering Introduction',
      heroSectionDelivery: 'Delivery Proof',
      heroSectionAbout: 'About Us',
      heroLead: '8plus helps teams turn requirements into verifiable architecture, introduce AI into real workflows, and shape the product experience into systems that can be shipped, maintained, and trusted.',
      architectureLabel: 'Architecture flow',
      architectureNodes: 'Req|Arch|AI|UX|Ship',
      deliveryPreview: 'Delivery preview',
      floatingLabels: 'Architecture|AI Workflow|Next.js|Verified Delivery|Production',
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
      closingTitle: 'If you need a partner who can actually ship, this is a good place to start.',
      closingLead: 'Start with a 30-minute conversation and we will turn needs, constraints, risks, AI feasibility, and user flows into executable next steps.',
      bookNow: 'Book now',
      aboutMe: 'About',
      available: 'Available',
      role: 'Engineering consultant / architect',
      checklist1: 'Break requirements into a plan people can execute',
      checklist2: 'Align architecture, AI, and UX in one pass',
      checklist3: 'Replace vague strategy with verified delivery',
      statYears: 'Years in production',
      statDomains: 'Core domains',
      statBooking: 'Discovery Call',
      viewPricing: 'View models',
      viewProcess: 'Full process',
      contactCta: 'Contact',
      pillars: [
        {
          title: 'Architecture First',
          description: 'Clarify data flow, permissions, APIs, deployment, and operations so every requirement starts with a structure that can evolve.',
          icon: 'cloud',
        },
        {
          title: 'AI Integration',
          description: 'Bring AI into real workflows, not just demos: data readiness, prompt design, access control, and human-in-the-loop operations planned together.',
          icon: 'code',
        },
        {
          title: 'Experience Delivery',
          description: 'Align interface, content, feedback states, and delivery rhythm so people want to use the product and teams can keep shipping.',
          icon: 'sparkle',
        },
      ],
      services: {
        frontend: {
          title: 'Frontend Development',
          description: 'Professional development services with modern frontend tech stack including Next.js, React, TypeScript'
        },
        architecture: {
          title: 'Architecture Design',
          description: 'System architecture design, technology selection advice, code review and performance optimization'
        },
        consulting: {
          title: 'Technical Consulting',
          description: 'One-on-one technical guidance, team training, project assessment and improvement recommendations'
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
      description: 'Selected technical Lab and client cases',
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
      description: 'Sharing frontend technologies, development experience and industry insights',
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
        'Frontend / backend / API architecture and technology selection',
        'Code review, performance optimization, and delivery flow',
        'Product strategy, team collaboration, and consulting support'
      ],
      cards: {
        ready: { title: 'Ready to book', desc: 'Pick a time slot once the calendar is loaded.' },
        topics: { title: 'Topics', desc: 'From architecture and code review to product delivery flow.' },
        clarify: { title: 'Clarify first', desc: 'We can define the problem before we define the solution.' },
      },
      contactSection: 'Or send a message',
      contactLead: 'Prefer async? Leave a note and I will reply within 1–2 business days.',
    },
    // About
    about: {
      title: 'About Us',
      content: 'We are a team focused on frontend engineering and technical consulting...'
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
      errorGeneric: 'Something went wrong. Please try again or email directly.',
      quickBook: 'In a hurry?',
      quickBookTitle: 'Book 30 minutes directly',
      quickBookLead: 'If the topic is already clear, booking directly is usually the fastest path.',
      bookCta: 'Book now',
      lineEyebrow: 'LINE Official Account',
      lineTitle: 'Add 8plus on LINE',
      lineLead: 'Scan the QR code or tap below to add the bot and message me directly.',
      lineOpen: 'Add LINE friend',
    },
    // Services
    services: {
      title: 'Professional Services',
      description: 'Providing comprehensive frontend development and technical consulting services',
      eyebrow: 'Services',
      headline: 'Services are not a menu — they are a way to get the problem right',
      lead: 'My collaboration scope is broader than any list on this page. Rather than fixed packages, think of these as modes of working that all lead to the same outcome: making your technical problems executable.',
      items: [
        { title: 'Architecture & Delivery', desc: 'For teams rethinking architecture, legacy migration, or new platform boundaries.' },
        { title: 'Frontend / Full-stack', desc: 'From UI and data flow to APIs and deployment — one coherent line from product to implementation.' },
        { title: 'Review & Optimization', desc: 'Code review, performance, reliability, and delivery process improvements.' },
        { title: 'Consulting Support', desc: 'When requirements are still fuzzy, we can define the problem and priorities first.' },
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
      tagline: 'Engineering & Consulting',
      builtWith: 'Built with Next.js 15 + Velite',
      metaphysics: 'Metaphysics & UIX longform at',
      madeIn: 'Made in Taiwan',
      poweredBy: 'Powered by Vercel',
      navLabel: 'Site links',
      rss: 'RSS',
    },
    shareHub: {
      businessName: 'August Wang',
      businessLead: 'Architecture-led partner. Book a call, or see how ideas become shipped systems.',
      socialName: 'August',
      socialLead: 'Life snippets and work in progress.',
      copyEmail: 'Copy',
      copied: 'Copied',
      openLine: 'Open LINE',
      personalLine: 'Personal LINE',
      personalLineLead: 'Scan to add personal account',
      pathButton: 'Career',
      pathButtonDesc: 'Tap to expand full timeline',
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
