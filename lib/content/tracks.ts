import type { Locale } from '@/lib/i18n'

/**
 * Five service tracks of the 8plus studio (D1, 2026-09-30).
 * Copy is intentionally free of prices, client names and unverifiable numbers (D4).
 */
export type TrackKey = 'build' | 'consulting' | 'ai' | 'training' | 'career'

export type Track = {
  key: TrackKey
  mark: string
  title: string
  tagline: string
  audience: string
  href: string
  cta: string
}

export type TrackPage = {
  eyebrow: string
  title: string
  lead: string
  audienceTitle: string
  audience: { title: string; desc: string }[]
  topicsTitle: string
  topics: { title: string; desc: string }[]
  formatTitle: string
  formats: { title: string; desc: string }[]
  flowTitle: string
  flow: { title: string; desc: string }[]
  faqTitle: string
  faq: { q: string; a: string }[]
  cta: { title: string; primary: string; secondary: string }
}

type TracksContent = {
  eyebrow: string
  title: string
  lead: string
  quizCta: string
  items: Track[]
  training: TrackPage
  career: TrackPage
}

const zh: TracksContent = {
  eyebrow: '04 · WHAT YOU NEED',
  title: '你是哪一種需求？',
  lead: '五種合作方式，從做出產品到帶人成長。',
  quizCta: '不確定？做 3 分鐘需求診斷',
  items: [
    {
      key: 'build',
      mark: 'A',
      title: '委託開發',
      tagline: '網站、系統、內部工具，從規劃做到上線與迭代。',
      audience: '企業、新創、個人品牌',
      href: '/services',
      cta: '看開發服務',
    },
    {
      key: 'consulting',
      mark: 'B',
      title: '技術顧問',
      tagline: '架構設計、技術選型、程式碼審查與交付流程建議。',
      audience: '工程團隊、技術主管',
      href: '/services#process',
      cta: '看顧問流程',
    },
    {
      key: 'ai',
      mark: 'C',
      title: 'AI 實務導入',
      tagline: '把 AI 嵌進真實工作流程：評估、原型、上線與成本控管。',
      audience: '想導入 AI 的團隊與個人',
      href: '/lab',
      cta: '看實作案例',
    },
    {
      key: 'training',
      mark: 'D',
      title: '教育訓練',
      tagline: '工作坊與內訓：AI 工具、前端工程、架構與協作方法。',
      audience: '企業內訓、社群、學校',
      href: '/training',
      cta: '看課程規劃',
    },
    {
      key: 'career',
      mark: 'E',
      title: '職涯探討',
      tagline: '一對一談技術路線、轉職方向、作品集與成長規劃。',
      audience: '工程師、轉職者、學生',
      href: '/career',
      cta: '預約一對一',
    },
  ],
  training: {
    eyebrow: '05 · TRAINING',
    title: '把能力留在團隊裡',
    lead: '不只是講一場課，而是依你的團隊現況設計內容、練習與帶得走的資料。',
    audienceTitle: '適合誰',
    audience: [
      { title: '企業內訓', desc: '團隊想一起補齊 AI 工具、前端工程或架構觀念。' },
      { title: '社群與學校', desc: '講座、工作坊，面向學生、社群或跨職能夥伴。' },
      { title: '技術主管', desc: '想建立團隊共通語言、程式碼審查與交付習慣。' },
    ],
    topicsTitle: '常見主題',
    topics: [
      { title: 'AI 工具與工作流', desc: '把 AI 用在需求整理、開發、測試與文件，並談風險與邊界。' },
      { title: '前端工程與 Next.js', desc: '元件設計、效能、無障礙與可維護的專案結構。' },
      { title: '架構與程式碼審查', desc: '從需求拆解到系統邊界，並建立可執行的審查清單。' },
      { title: '產品與協作方法', desc: '需求、設計、工程之間怎麼溝通與交付。' },
    ],
    formatTitle: '進行方式',
    formats: [
      { title: '講座', desc: '單場分享，重觀念與案例。' },
      { title: '工作坊', desc: '半日或整日，包含動手練習。' },
      { title: '系列內訓', desc: '多次課程，搭配作業與回饋，依團隊進度調整。' },
      { title: '線上或現場', desc: '依需求選擇，內容與講義可客製。' },
    ],
    flowTitle: '合作流程',
    flow: [
      { title: '1. 初談', desc: '30 分鐘了解對象、目標與限制。' },
      { title: '2. 課程設計', desc: '提出大綱、練習與交付物，確認後開始。' },
      { title: '3. 授課', desc: '依約定形式進行，保留互動與問答。' },
      { title: '4. 延伸', desc: '提供講義與後續資源，必要時安排追蹤。' },
    ],
    faqTitle: '常見問題',
    faq: [
      { q: '可以完全客製內容嗎？', a: '可以。主題與深度會依團隊背景調整，初談後提出大綱再確認。' },
      { q: '一場多久、多少人？', a: '依形式而定。初談時會一起評估時數、人數與練習方式。' },
      { q: '課後有資料嗎？', a: '會提供講義與延伸資源，範圍於課程設計時說明。' },
      { q: '費用怎麼計算？', a: '依主題、時數與客製程度報價，初談後提供明確方案。' },
    ],
    cta: { title: '想聊聊你的團隊需要什麼？', primary: '預約初談', secondary: '看看服務總覽' },
  },
  career: {
    eyebrow: '06 · CAREER',
    title: '一起把下一步想清楚',
    lead: '一對一聊技術路線與職涯選擇。我分享實際經驗與觀點，決定權在你。',
    audienceTitle: '適合誰',
    audience: [
      { title: '工程師', desc: '想釐清專精、跨領域或往管理與架構發展。' },
      { title: '轉職者', desc: '從其他領域進入軟體產業，需要方向與學習路線。' },
      { title: '學生與新鮮人', desc: '找方向、準備作品集與第一份工作。' },
    ],
    topicsTitle: '可以聊什麼',
    topics: [
      { title: '技術路線', desc: '前端、後端、全端、架構或 AI 應用，如何取捨。' },
      { title: '轉職與方向', desc: '盤點現有經驗，找出可遷移的優勢與缺口。' },
      { title: '作品集與履歷', desc: '怎麼呈現專案，讓別人看懂你的價值。' },
      { title: '成長計畫', desc: '設定階段目標，決定接下來三到六個月做什麼。' },
    ],
    formatTitle: '進行方式',
    formats: [
      { title: '線上一對一', desc: '視訊討論，可事先提供履歷或作品連結。' },
      { title: '單次或追蹤', desc: '可只聊一次，也可依需要安排後續追蹤。' },
    ],
    flowTitle: '流程',
    flow: [
      { title: '1. 預約', desc: '選擇時段並簡述想討論的問題。' },
      { title: '2. 討論', desc: '聚焦你最在意的一到兩個決定。' },
      { title: '3. 行動清單', desc: '整理成具體可做的下一步。' },
    ],
    faqTitle: '常見問題',
    faq: [
      { q: '需要先準備什麼？', a: '簡述你的現況與問題即可，有履歷或作品連結更好。' },
      { q: '會幫我改履歷或介紹工作嗎？', a: '會針對內容給回饋；不承諾介紹工作或保證結果。' },
      { q: '內容會保密嗎？', a: '會。討論內容不會對外公開。' },
    ],
    cta: { title: '準備好聊聊了嗎？', primary: '預約一對一', secondary: '先看看我的歷程' },
  },
}

const en: TracksContent = {
  eyebrow: '04 · WHAT YOU NEED',
  title: 'What do you need?',
  lead: 'Five ways to work together — from shipping a product to growing people.',
  quizCta: 'Not sure? Take the 3-minute needs check',
  items: [
    {
      key: 'build',
      mark: 'A',
      title: 'Commissioned builds',
      tagline: 'Websites, systems and internal tools — from planning to launch and iteration.',
      audience: 'Companies, startups, personal brands',
      href: '/services',
      cta: 'See build services',
    },
    {
      key: 'consulting',
      mark: 'B',
      title: 'Technical consulting',
      tagline: 'Architecture, stack decisions, code review and delivery workflow advice.',
      audience: 'Engineering teams, tech leads',
      href: '/services#process',
      cta: 'See the process',
    },
    {
      key: 'ai',
      mark: 'C',
      title: 'Applied AI',
      tagline: 'Put AI into real workflows: assessment, prototype, launch and cost control.',
      audience: 'Teams and individuals adopting AI',
      href: '/lab',
      cta: 'See the work',
    },
    {
      key: 'training',
      mark: 'D',
      title: 'Training',
      tagline: 'Workshops and in-house programs: AI tooling, frontend engineering, architecture, collaboration.',
      audience: 'In-house teams, communities, schools',
      href: '/training',
      cta: 'See the program',
    },
    {
      key: 'career',
      mark: 'E',
      title: 'Career talks',
      tagline: 'One-on-one on technical paths, career moves, portfolios and growth plans.',
      audience: 'Engineers, career changers, students',
      href: '/career',
      cta: 'Book a session',
    },
  ],
  training: {
    eyebrow: '05 · TRAINING',
    title: 'Keep the skills in your team',
    lead: 'Not just a talk — content, exercises and take-away material designed around where your team is today.',
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'In-house teams', desc: 'Teams closing gaps in AI tooling, frontend engineering or architecture.' },
      { title: 'Communities & schools', desc: 'Talks and workshops for students, communities or cross-functional groups.' },
      { title: 'Tech leads', desc: 'Building shared language, review habits and delivery practices.' },
    ],
    topicsTitle: 'Typical topics',
    topics: [
      { title: 'AI tools & workflow', desc: 'Using AI across requirements, development, testing and docs — with risks and limits.' },
      { title: 'Frontend & Next.js', desc: 'Component design, performance, accessibility and maintainable structure.' },
      { title: 'Architecture & code review', desc: 'From requirement breakdown to system boundaries, plus a usable review checklist.' },
      { title: 'Product & collaboration', desc: 'How requirements, design and engineering communicate and deliver.' },
    ],
    formatTitle: 'Formats',
    formats: [
      { title: 'Talk', desc: 'A single session focused on ideas and cases.' },
      { title: 'Workshop', desc: 'Half or full day with hands-on exercises.' },
      { title: 'Series', desc: 'Multiple sessions with assignments and feedback, paced to your team.' },
      { title: 'Online or on-site', desc: 'Your choice; content and handouts can be tailored.' },
    ],
    flowTitle: 'How we work',
    flow: [
      { title: '1. Intro call', desc: '30 minutes on audience, goals and constraints.' },
      { title: '2. Program design', desc: 'An outline, exercises and deliverables for your approval.' },
      { title: '3. Delivery', desc: 'Run in the agreed format, with room for interaction and Q&A.' },
      { title: '4. Follow-up', desc: 'Handouts and further resources, with optional check-ins.' },
    ],
    faqTitle: 'FAQ',
    faq: [
      { q: 'Can the content be fully customised?', a: 'Yes. Topics and depth are adjusted to your team; an outline follows the intro call.' },
      { q: 'How long, how many people?', a: 'It depends on the format. We estimate hours, group size and exercises together.' },
      { q: 'Do we get materials afterwards?', a: 'Yes — handouts and further resources; scope is agreed during program design.' },
      { q: 'How is it priced?', a: 'Quoted by topic, hours and level of customisation, after the intro call.' },
    ],
    cta: { title: 'Want to talk about what your team needs?', primary: 'Book an intro', secondary: 'See all services' },
  },
  career: {
    eyebrow: '06 · CAREER',
    title: 'Think through the next step together',
    lead: 'One-on-one conversations about technical paths and career choices. I share experience and perspective; the decision stays yours.',
    audienceTitle: 'Who it is for',
    audience: [
      { title: 'Engineers', desc: 'Clarifying specialisation, breadth, or a move toward management and architecture.' },
      { title: 'Career changers', desc: 'Entering software from another field and needing direction and a learning path.' },
      { title: 'Students & graduates', desc: 'Finding direction, preparing a portfolio and a first role.' },
    ],
    topicsTitle: 'What we can cover',
    topics: [
      { title: 'Technical path', desc: 'Frontend, backend, full-stack, architecture or applied AI — how to choose.' },
      { title: 'Career moves', desc: 'Take stock of experience and find transferable strengths and gaps.' },
      { title: 'Portfolio & CV', desc: 'How to present projects so others see your value.' },
      { title: 'Growth plan', desc: 'Set stage goals and decide what to do in the next three to six months.' },
    ],
    formatTitle: 'Format',
    formats: [
      { title: 'Online one-on-one', desc: 'Video call; share a CV or portfolio link beforehand if you like.' },
      { title: 'Single or ongoing', desc: 'One conversation, or follow-ups as needed.' },
    ],
    flowTitle: 'Flow',
    flow: [
      { title: '1. Book', desc: 'Pick a slot and describe what you want to discuss.' },
      { title: '2. Talk', desc: 'Focus on the one or two decisions that matter most.' },
      { title: '3. Action list', desc: 'Turn it into concrete next steps.' },
    ],
    faqTitle: 'FAQ',
    faq: [
      { q: 'What should I prepare?', a: 'A short description of where you are and your question. A CV or portfolio link helps.' },
      { q: 'Will you review my CV or refer me to jobs?', a: 'I give feedback on content; I do not promise referrals or outcomes.' },
      { q: 'Is it confidential?', a: 'Yes. What we discuss is not shared.' },
    ],
    cta: { title: 'Ready to talk?', primary: 'Book a session', secondary: 'See my path first' },
  },
}

export function getTracksContent(locale: Locale): TracksContent {
  return locale === 'en' ? en : zh
}
