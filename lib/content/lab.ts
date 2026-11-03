import type { Locale } from '@/lib/i18n'

export type LabGroupKey = 'fullstack' | 'backend' | 'frontend' | 'data' | 'other'

type Bi = { 'zh-TW': string; en: string }

const bi = (zh: string, en: string): Bi => ({ 'zh-TW': zh, en })

// role grouping by project key (baseSlug ?? slug), mirrors design template
export const LAB_GROUP_ORDER: LabGroupKey[] = ['fullstack', 'backend', 'frontend', 'data', 'other']

export const LAB_GROUP_OF: Record<string, LabGroupKey> = {
  '8plus': 'fullstack',
  'ecommerce-dashboard': 'fullstack',
  'e-cooperative': 'fullstack',
  'resume-2025': 'fullstack',
  'transcript-plus': 'fullstack',
  'smart-community-backend': 'backend',
  'flash-sale-api': 'backend',
  'crm-series': 'frontend',
  ckd2026: 'fullstack',
  b18: 'frontend',
  experimentlab: 'frontend',
  '1914': 'frontend',
  'shuyan-art': 'frontend',
  'resume-2024': 'frontend',
  'resume-2021': 'frontend',
  'resume-2019': 'frontend',
  'power-bi': 'data',
  'r-analysis': 'data',
  'anti-coworker': 'other',
  'yes-fms': 'fullstack',
}

export const LAB_ROLE_TAG: Record<string, Bi> = {
  'crm-series': bi('IA / UX', 'IA / UX'),
  'smart-community-backend': bi('後端', 'Backend'),
  b18: bi('品牌 / 前端', 'Brand / Frontend'),
  '8plus': bi('全端', 'Full-stack'),
  'ecommerce-dashboard': bi('全端', 'Full-stack'),
  'e-cooperative': bi('全端', 'Full-stack'),
  'resume-2025': bi('全端', 'Full-stack'),
  'flash-sale-api': bi('後端', 'Backend'),
  'transcript-plus': bi('全端 / 桌面', 'Full-stack / Desktop'),
  ckd2026: bi('全端 / 醫學教育', 'Full-stack / Med-ed'),
  experimentlab: bi('前端 / 設計', 'Frontend / Design'),
  '1914': bi('品牌 / 前端', 'Brand / Frontend'),
  'shuyan-art': bi('品牌 / 前端', 'Brand / Frontend'),
  'resume-2024': bi('前端 / 設計', 'Frontend / Design'),
  'resume-2021': bi('前端 / 設計', 'Frontend / Design'),
  'resume-2019': bi('前端 / 設計', 'Frontend / Design'),
  'power-bi': bi('資料', 'Data'),
  'r-analysis': bi('資料', 'Data'),
  'anti-coworker': bi('遊戲 / 前端', 'Game / Frontend'),
  'yes-fms': bi('全端 / 金融', 'Full-stack / Finance'),
}

const labContent = {
  'zh-TW': {
    eyebrow: 'LAB',
    countLabel: '件',
    featured: '精選',
    featuredMeta: 'FEATURED',
    groups: {
      fullstack: '全端開發',
      backend: '後端',
      frontend: '前端設計',
      data: '資料',
      other: '遊戲與實驗',
    } as Record<LabGroupKey, string>,
    lead: '精選的實作紀錄，涵蓋 AI 平台、企業與金融系統、醫學教育、高併發後端、品牌官網、數據分析到網頁遊戲；依角色分為全端、後端、前端設計、資料與遊戲實驗五類（技術棧於各案例附註，已下線的網站會標示）。',
    ctaTitle: '有想一起做的系統嗎？',
    ctaPrimary: '預約諮詢',
    ctaSecondary: '看服務內容',
    fallbackChip: '中文',
    offlineChip: '連結已失效',
    detail: {
      back: '返回 Lab',
      caseStudy: '案例研究',
      lab: 'LAB',
      fallbackChip: '中文',
      body: '內文',
      offline: '已失效',
      offlineNote: (date: string) => `標示「已失效」的連結於 ${date} 檢查時已無法連線，保留作為紀錄。`,
      ctaTitle: '想了解更多技術細節，或討論類似專案？',
      ctaSecondary: '看其他作品',
    },
  },
  en: {
    eyebrow: 'LAB',
    countLabel: 'projects',
    featured: 'Featured',
    featuredMeta: 'FEATURED',
    groups: {
      fullstack: 'Full-stack',
      backend: 'Backend',
      frontend: 'Frontend & Design',
      data: 'Data',
      other: 'Games & Experiments',
    } as Record<LabGroupKey, string>,
    lead: 'Selected work spanning AI platforms, enterprise and finance systems, medical education, high-concurrency backends, brand sites, data analysis and browser games, grouped by role into full-stack, backend, frontend design, data and games & experiments (stack noted on each case; sites that went offline are marked).',
    ctaTitle: 'Have a system you want to build together?',
    ctaPrimary: 'Book a consultation',
    ctaSecondary: 'See services',
    fallbackChip: 'Chinese only',
    offlineChip: 'Link offline',
    detail: {
      back: 'Back to Lab',
      caseStudy: 'Case Study',
      lab: 'LAB',
      fallbackChip: 'Chinese only',
      body: 'Details',
      offline: 'Offline',
      offlineNote: (date: string) => `Links marked offline could not be reached when checked on ${date}; kept for the record.`,
      ctaTitle: 'Want the technical details, or to discuss a similar project?',
      ctaSecondary: 'More work',
    },
  },
}

export function getLabContent(locale: Locale) {
  return locale === 'en' ? labContent.en : labContent['zh-TW']
}

export function labRoleTag(key: string, locale: Locale): string | undefined {
  return LAB_ROLE_TAG[key]?.[locale === 'en' ? 'en' : 'zh-TW']
}
