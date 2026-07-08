import type { HomeLocale } from '@/lib/content/home-sections'

export type HomeStoryChapter = {
  id: string
  title: string
  lead: string
  body: string
}

const chapters: Record<HomeLocale, HomeStoryChapter[]> = {
  'zh-TW': [
    {
      id: 'self-driven',
      title: '自學驅動',
      lead: '從藝術比賽到生醫，尋找真正的熱情',
      body: '從小熱愛自學。藝術比賽培養美感直覺；大學生物與化學成績不錯，卻意識到這不是長期方向。',
    },
    {
      id: 'nthu-pivot',
      title: '交大轉折',
      lead: '基因定序實驗室裡，寫下第一行程式',
      body: '交大分子醫學與生物工程所，在資工實驗室做基因定序分析。一次課堂全端專案獲教授肯定，從此踏上自學程式之路。',
    },
    {
      id: 'alt-service',
      title: '替代役淬鍊',
      lead: '1914 品牌與第一個 Chatbot 產品',
      body: '替代役期間下班後補強資工，建立品牌「1914」，整合 LINE、Dialogflow 開發語意辨識客服機器人並部署 Heroku。',
    },
    {
      id: 'commerce-saas',
      title: '電商與 SaaS',
      lead: 'SLA、藍綠部署、租戶隔離 — 實戰落地',
      body: '進入電商後深入 B2C 需求：7×24 服務保障、藍綠部署、SaaS 架構、雲端成本優化、跨國合規與 Grafana 監控。',
    },
    {
      id: 'architecture-view',
      title: '架構觀',
      lead: '良好架構創造長期價值',
      body: '自由接案從設計到後端，發展完整 UI/UX 與全端能力。相信架構設計的長期價值，遠勝匆忙上線的短期收益。',
    },
    {
      id: 'beyond-work',
      title: '工作之外',
      lead: '合唱、飛輪、追劇 — 能量的來源',
      body: '合唱團、美術班、體操課，取得飛輪教練執照。在工作與生活之間找平衡，讓專業持續成長、生活保持熱情。',
    },
  ],
  en: [
    {
      id: 'self-driven',
      title: 'Self-driven',
      lead: 'From art competitions to biomed — finding real passion',
      body: 'Always loved self-learning. Art competitions shaped design intuition; biomed grades were fine, but not the long-term path.',
    },
    {
      id: 'nthu-pivot',
      title: 'The NTHU pivot',
      lead: 'First lines of code in a sequencing lab',
      body: 'At NTHU’s molecular medicine program, in a CS lab doing gene sequencing. One full-stack class project led to real client work and self-taught engineering.',
    },
    {
      id: 'alt-service',
      title: 'Alt-service forge',
      lead: 'Brand 1914 and the first chatbot product',
      body: 'Evenings during alternative service: brand “1914”, LINE + Dialogflow semantic bot, deployed on Heroku.',
    },
    {
      id: 'commerce-saas',
      title: 'Commerce & SaaS',
      lead: 'SLA, blue-green deploys, tenant isolation — in production',
      body: 'E-commerce deepened B2C product thinking: 24/7 SLA, blue-green releases, SaaS tenancy, cloud cost control, compliance, Grafana.',
    },
    {
      id: 'architecture-view',
      title: 'Architecture view',
      lead: 'Good architecture compounds over time',
      body: 'Freelance work from design to backend. Architecture creates long-term value — more than rushed short-term launches.',
    },
    {
      id: 'beyond-work',
      title: 'Beyond work',
      lead: 'Choir, spin, dramas — where energy comes from',
      body: 'Choir, art classes, gymnastics, spin instructor license. Balance between work and life keeps craft and curiosity alive.',
    },
  ],
}

export function getHomeStoryChapters(locale: HomeLocale): HomeStoryChapter[] {
  return chapters[locale] ?? chapters['zh-TW']
}
