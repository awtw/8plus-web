import { getTracksContent, type TrackKey } from '@/lib/content/tracks'
import { ROOT_QUESTION, TRACK_QUESTIONS, type Bi } from './tree'
import type { Locale } from '@/lib/i18n'

export type QuizAnswers = { track: TrackKey; picks: string[] } // picks = option ids for the 3 follow-ups

export type QuizOutcome = {
  headline: string
  situation: string[] // "question → your answer" lines
  scope: string // qualitative size, no dates or prices
  firstStep: string
  agenda: string[]
  links: { label: string; href: string }[]
  note: string // pre-filled into the booking form
}

const pick = (b: Bi, en: boolean) => (en ? b.en : b.zh)

function label(trackQ: (typeof TRACK_QUESTIONS)[TrackKey], idx: number, optId: string, en: boolean) {
  return pick(trackQ[idx].options.find((o) => o.id === optId)!.label, en)
}

export function buildOutcome(answers: QuizAnswers, locale: Locale): QuizOutcome {
  const en = locale === 'en'
  const tracks = getTracksContent(locale).items
  const track = tracks.find((t) => t.key === answers.track)!
  const qs = TRACK_QUESTIONS[answers.track]
  const [a0, a1, a2] = answers.picks

  const situation = qs.map((q, i) => `${pick(q.prompt, en)} → ${label(qs, i, answers.picks[i], en)}`)
  const urgent = answers.picks.includes('asap')
  const exploring = answers.picks.includes('explore') || answers.picks.includes('unsure')

  // qualitative sizing only — exact timeline and cost are agreed in the intro call
  let scope: string
  if (answers.track === 'build') {
    scope =
      a1 === 'existing'
        ? en ? 'Mid-size: audit the existing system first, then plan the rebuild in stages.' : '中型：先盤點既有系統，再分階段規劃改版。'
        : a0 === 'site'
          ? en ? 'Light to mid-size: a focused site can ship in a single phase.' : '輕量到中型：聚焦的網站可一個階段完成。'
          : en ? 'Mid to long: define the core scope first, then iterate in releases.' : '中型到長期：先定義核心範圍，再以版本迭代。'
  } else if (answers.track === 'consulting') {
    scope = a1 === 'l'
      ? en ? 'Ongoing: a short assessment, then regular reviews with the team.' : '長期陪跑：先做短期評估，再與團隊定期審查。'
      : en ? 'Light: a focused assessment with a written action list.' : '輕量：聚焦評估，並產出書面行動清單。'
  } else if (answers.track === 'ai') {
    scope = a0 === 'live'
      ? en ? 'Light to mid-size: measure current cost and quality, then tune.' : '輕量到中型：先量測現況成本與品質，再調校。'
      : en ? 'Staged: feasibility check, prototype, then a production decision.' : '分階段：可行性評估 → 原型 → 是否上線的決策。'
  } else if (answers.track === 'training') {
    scope = a2 === 'series'
      ? en ? 'Series: a program designed around your team, with exercises between sessions.' : '系列：依團隊設計課程，並在課程之間安排練習。'
      : en ? 'Single session: a tailored outline and hands-on parts where relevant.' : '單次：客製大綱，必要時加入動手練習。'
  } else {
    scope = en ? 'Light: a one-on-one conversation, with follow-ups only if useful.' : '輕量：一次一對一談話，必要時再安排追蹤。'
  }

  const firstStep = exploring
    ? en ? 'Start with a 30-minute intro to clarify goals — no commitment.' : '先預約 30 分鐘初談釐清目標，不需事先承諾。'
    : urgent
      ? en ? 'Book the earliest intro slot so we can scope this quickly.' : '請優先預約最近的初談時段，我們盡快界定範圍。'
      : en ? 'Book a 30-minute intro; we will agree the scope and next steps.' : '預約 30 分鐘初談，一起確認範圍與下一步。'

  const agenda = en
    ? ['Your goal and constraints', 'What has been tried so far', 'Recommended approach and first milestone']
    : ['你的目標與限制', '目前嘗試過什麼', '建議做法與第一個里程碑']

  const links = [
    { label: track.cta, href: track.href },
    ...(answers.track === 'ai' || answers.track === 'build' ? [{ label: en ? 'Browse Lab work' : '瀏覽 Lab 作品', href: '/lab' }] : []),
    { label: en ? 'Read a Field Note' : '讀一則近況筆記', href: '/blog' },
  ]

  const note = `[${track.title}] ${situation.map((s) => s.split(' → ')[1]).join(' / ')}`.slice(0, 300)

  return {
    headline: en ? `Suggested path: ${track.title}` : `建議合作方式：${track.title}`,
    situation,
    scope,
    firstStep,
    agenda,
    links,
    note,
  }
}

export { ROOT_QUESTION }
