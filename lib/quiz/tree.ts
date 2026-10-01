import type { TrackKey } from '@/lib/content/tracks'

/**
 * Rule-based needs check (NOT generative AI). Pure data: every path is reachable,
 * every track has a fixed set of 3 follow-up questions. Copy is bilingual and
 * free of prices, client names and unverifiable numbers.
 */
export type Bi = { zh: string; en: string }
const bi = (zh: string, en: string): Bi => ({ zh, en })

export type QuizOption = { id: string; label: Bi }
export type QuizQuestion = { id: string; prompt: Bi; options: QuizOption[] }

export const ROOT_QUESTION: QuizQuestion = {
  id: 'track',
  prompt: bi('嗨，我是 8plus 的需求診斷。先告訴我，你想解決哪一類問題？', "Hi, I'm the 8plus needs check. First — which kind of problem are you trying to solve?"),
  options: [
    { id: 'build', label: bi('我想做一個網站或系統', 'I want a website or system built') },
    { id: 'consulting', label: bi('團隊需要技術顧問或審查', 'My team needs technical advice or review') },
    { id: 'ai', label: bi('我想把 AI 用在實際工作上', 'I want to apply AI to real work') },
    { id: 'training', label: bi('想安排教育訓練或工作坊', 'I want training or a workshop') },
    { id: 'career', label: bi('想聊職涯與技術路線', 'I want to talk career and technical path') },
  ],
}

export const TRACK_QUESTIONS: Record<TrackKey, QuizQuestion[]> = {
  build: [
    {
      id: 'what',
      prompt: bi('你要做的是哪一種？', 'What kind of thing do you need?'),
      options: [
        { id: 'site', label: bi('官網或品牌網站', 'A company or brand website') },
        { id: 'product', label: bi('產品或線上服務', 'A product or online service') },
        { id: 'internal', label: bi('內部工具或後台', 'An internal tool or back office') },
        { id: 'unsure', label: bi('還不確定', 'Not sure yet') },
      ],
    },
    {
      id: 'stage',
      prompt: bi('目前進度到哪裡？', 'Where are you now?'),
      options: [
        { id: 'idea', label: bi('只有想法', 'Just an idea') },
        { id: 'spec', label: bi('有需求或設計稿', 'I have requirements or designs') },
        { id: 'existing', label: bi('已有系統，需要改版或接手', 'An existing system to rebuild or take over') },
      ],
    },
    {
      id: 'when',
      prompt: bi('希望什麼時候開始？', 'When would you like to start?'),
      options: [
        { id: 'asap', label: bi('越快越好', 'As soon as possible') },
        { id: 'soon', label: bi('一到三個月內', 'Within one to three months') },
        { id: 'explore', label: bi('先了解看看', 'Just exploring') },
      ],
    },
  ],
  consulting: [
    {
      id: 'pain',
      prompt: bi('目前最卡的是什麼？', "What's the main pain point?"),
      options: [
        { id: 'arch', label: bi('架構混亂、難以擴充', 'Messy architecture that is hard to scale') },
        { id: 'quality', label: bi('交付品質與程式碼審查', 'Delivery quality and code review') },
        { id: 'stack', label: bi('技術選型', 'Choosing the tech stack') },
        { id: 'perf', label: bi('效能或穩定性', 'Performance or stability') },
      ],
    },
    {
      id: 'team',
      prompt: bi('團隊規模大約多少？', 'How big is the team?'),
      options: [
        { id: 's', label: bi('1–5 人', '1–5 people') },
        { id: 'm', label: bi('6–20 人', '6–20 people') },
        { id: 'l', label: bi('20 人以上', 'More than 20') },
      ],
    },
    {
      id: 'when',
      prompt: bi('這件事的急迫程度？', 'How urgent is it?'),
      options: [
        { id: 'asap', label: bi('現在就要處理', 'Needs attention now') },
        { id: 'soon', label: bi('一到三個月內', 'Within one to three months') },
        { id: 'explore', label: bi('先評估看看', 'Evaluating for now') },
      ],
    },
  ],
  ai: [
    {
      id: 'stage',
      prompt: bi('現階段是？', 'Where are you with AI?'),
      options: [
        { id: 'explore', label: bi('想了解可行性', 'Exploring feasibility') },
        { id: 'proto', label: bi('有想法，想做原型', 'Have an idea, want a prototype') },
        { id: 'live', label: bi('已在使用，想優化成本或品質', 'Already live, improving cost or quality') },
      ],
    },
    {
      id: 'scene',
      prompt: bi('主要想用在哪裡？', 'Where would you use it?'),
      options: [
        { id: 'kb', label: bi('客服或知識庫問答', 'Support or knowledge-base Q&A') },
        { id: 'flow', label: bi('內部流程自動化', 'Internal workflow automation') },
        { id: 'dev', label: bi('開發與文件輔助', 'Development and documentation') },
        { id: 'other', label: bi('其他', 'Something else') },
      ],
    },
    {
      id: 'data',
      prompt: bi('資料的敏感程度？', 'How sensitive is the data?'),
      options: [
        { id: 'private', label: bi('含敏感或內部資料', 'Sensitive or internal data') },
        { id: 'public', label: bi('以公開資料為主', 'Mostly public data') },
        { id: 'unsure', label: bi('還不確定', 'Not sure') },
      ],
    },
  ],
  training: [
    {
      id: 'who',
      prompt: bi('對象是誰？', 'Who is it for?'),
      options: [
        { id: 'company', label: bi('企業內訓', 'An in-house team') },
        { id: 'community', label: bi('社群或學校', 'A community or school') },
        { id: 'mixed', label: bi('跨職能團隊', 'A cross-functional group') },
      ],
    },
    {
      id: 'topic',
      prompt: bi('想學什麼主題？', 'Which topic?'),
      options: [
        { id: 'ai', label: bi('AI 工具與工作流', 'AI tools and workflow') },
        { id: 'frontend', label: bi('UIX 與無障礙設計', 'UIX and accessible design') },
        { id: 'arch', label: bi('RAG 與地端模型', 'RAG and on-prem models') },
        { id: 'collab', label: bi('數據分析與轉換', 'Analytics and conversion') },
      ],
    },
    {
      id: 'format',
      prompt: bi('偏好的形式？', 'Preferred format?'),
      options: [
        { id: 'talk', label: bi('單場講座', 'A single talk') },
        { id: 'workshop', label: bi('工作坊', 'A workshop') },
        { id: 'series', label: bi('系列內訓', 'A series') },
      ],
    },
  ],
  career: [
    {
      id: 'who',
      prompt: bi('你目前的身分是？', 'Which describes you?'),
      options: [
        { id: 'engineer', label: bi('工程師', 'Engineer') },
        { id: 'changer', label: bi('轉職者', 'Career changer') },
        { id: 'student', label: bi('學生或新鮮人', 'Student or graduate') },
      ],
    },
    {
      id: 'topic',
      prompt: bi('最想聊什麼？', 'What do you most want to discuss?'),
      options: [
        { id: 'path', label: bi('技術路線', 'Technical path') },
        { id: 'move', label: bi('轉職方向', 'Career move') },
        { id: 'portfolio', label: bi('作品集與履歷', 'Portfolio and CV') },
        { id: 'plan', label: bi('成長計畫', 'Growth plan') },
      ],
    },
    {
      id: 'when',
      prompt: bi('什麼時候想聊？', 'When would you like to talk?'),
      options: [
        { id: 'asap', label: bi('最近一兩週', 'In the next week or two') },
        { id: 'soon', label: bi('一個月內', 'Within a month') },
        { id: 'explore', label: bi('先看看', 'Just looking') },
      ],
    },
  ],
}
