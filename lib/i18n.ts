export const locales = ['zh-TW', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-TW'

// 翻譯字典
export const translations = {
  'zh-TW': {
    // 導航
    nav: {
      services: '服務',
      projects: '項目',
      blog: '博客',
      booking: '預約',
      about: '關於',
      contact: '聯繫',
    },
    // 主頁
    home: {
      title: 'Engineering · UX · Consulting',
      subtitle: '專注於前端工程、用戶體驗設計和技術諮詢。\n使用現代技術棧構建高品質的 Web 應用程序，\n並提供專業的技術指導和架構建議。',
      viewProjects: '查看項目',
      bookConsultation: '預約諮詢',
      coreServices: '核心服務',
      featuredProjects: '精選項目',
      recentPosts: '最新文章',
      viewAll: '查看全部',
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
      bookNow: '立即預約',
    },
    // 項目頁面
    projects: {
      title: '項目作品',
      description: '精選的技術項目和客戶案例',
      role: '角色',
      period: '時期',
      highlights: '重點成果',
      techStack: '技術棧',
      links: '相關鏈接',
      viewDetails: '查看詳情',
      noProjects: '暫無項目',
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
      subtitle: '選擇適合你的時間，我們來深入討論你的技術需求。',
      servicesInclude: '諮詢服務包括：',
      services: [
        '前端架構設計與技術選型',
        'Next.js 應用開發最佳實踐',
        '代碼審查與性能優化',
        '工程效率提升方案'
      ]
    },
    // 關於頁面
    about: {
      title: '關於我們',
      content: '我們是專注於前端工程和技術諮詢的團隊...'
    },
    // 聯繫頁面
    contact: {
      title: '聯繫我們',
      content: '有任何問題或合作需求，歡迎聯繫我們。'
    },
    // 服務頁面
    services: {
      title: '專業服務',
      description: '提供全方位的前端開發和技術諮詢服務'
    },
    // 通用
    common: {
      loading: '載入中...',
      error: '發生錯誤',
      notFound: '頁面未找到',
      backToHome: '返回首頁',
    },
    // 頁腳
    footer: {
      tagline: 'Engineering & Consulting',
      builtWith: '使用 Next.js 15 + Velite 構建',
      metaphysics: 'Metaphysics & UIX longform at',
      madeIn: '台灣製造',
      poweredBy: '由 Vercel 提供支持'
    }
  },
  'en': {
    // Navigation
    nav: {
      services: 'Services',
      projects: 'Projects',
      blog: 'Blog',
      booking: 'Booking',
      about: 'About',
      contact: 'Contact',
    },
    // Home
    home: {
      title: 'Engineering · UX · Consulting',
      subtitle: 'Focused on frontend engineering, user experience design, and technical consulting.\nBuilding high-quality web applications with modern technology stacks,\nand providing professional technical guidance and architectural advice.',
      viewProjects: 'View Projects',
      bookConsultation: 'Book Consultation',
      coreServices: 'Core Services',
      featuredProjects: 'Featured Projects',
      recentPosts: 'Recent Posts',
      viewAll: 'View All',
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
      bookNow: 'Book Now',
    },
    // Projects
    projects: {
      title: 'Projects',
      description: 'Selected technical projects and client cases',
      role: 'Role',
      period: 'Period',
      highlights: 'Key Achievements',
      techStack: 'Tech Stack',
      links: 'Related Links',
      viewDetails: 'View Details',
      noProjects: 'No projects available',
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
      subtitle: 'Choose a suitable time for you, and let\'s discuss your technical needs in depth.',
      servicesInclude: 'Consulting services include:',
      services: [
        'Frontend architecture design and technology selection',
        'Next.js application development best practices',
        'Code review and performance optimization',
        'Engineering efficiency improvement solutions'
      ]
    },
    // About
    about: {
      title: 'About Us',
      content: 'We are a team focused on frontend engineering and technical consulting...'
    },
    // Contact
    contact: {
      title: 'Contact Us',
      content: 'For any questions or collaboration needs, feel free to contact us.'
    },
    // Services
    services: {
      title: 'Professional Services',
      description: 'Providing comprehensive frontend development and technical consulting services'
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      notFound: 'Page not found',
      backToHome: 'Back to Home',
    },
    // Footer
    footer: {
      tagline: 'Engineering & Consulting',
      builtWith: 'Built with Next.js 15 + Velite',
      metaphysics: 'Metaphysics & UIX longform at',
      madeIn: 'Made in Taiwan',
      poweredBy: 'Powered by Vercel'
    }
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