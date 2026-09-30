'use client'

import Link from 'next/link'
import { useMemo, useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { track } from '@/lib/analytics'
import { ROOT_QUESTION, TRACK_QUESTIONS, type QuizQuestion } from '@/lib/quiz/tree'
import { buildOutcome } from '@/lib/quiz/outcome'
import type { TrackKey } from '@/lib/content/tracks'
import { Typewriter } from './typewriter'
import '@/styles/pages/quiz.css'

const UI = {
  'zh-TW': { badge: '引導式診斷 · 規則式，非生成式 AI', back: '上一題', restart: '重新開始', progress: (i: number, n: number) => `第 ${i} / ${n} 題`, done: '整理好了，這是我的建議：', scope: '規模判斷', first: '建議第一步', agenda: '初談會聊', related: '延伸閱讀', book: '帶著這份摘要預約', copy: '複製摘要', copied: '已複製', privacy: '答案只存在你的瀏覽器；按下預約時，摘要會以備註帶入行事曆。', skip: '點一下可跳過打字動畫' },
  en: { badge: 'Guided check · rule-based, not generative AI', back: 'Back', restart: 'Start over', progress: (i: number, n: number) => `Question ${i} of ${n}`, done: 'All set — here is my suggestion:', scope: 'Scope', first: 'Suggested first step', agenda: 'The intro call covers', related: 'Related', book: 'Book with this summary', copy: 'Copy summary', copied: 'Copied', privacy: 'Answers stay in your browser; booking adds the summary as a note in the calendar.', skip: 'Tap to skip the typing effect' },
} as const

const THINK_MS = 650 // brief "thinking" pause so replies feel conversational

type Turn = { q: QuizQuestion; optionId: string }

export function QuizChat() {
  const { locale } = useLanguage()
  const en = locale === 'en'
  const L = UI[en ? 'en' : 'zh-TW']
  const pick = (b: { zh: string; en: string }) => (en ? b.en : b.zh)

  const [track_, setTrack] = useState<TrackKey | null>(null)
  const [turns, setTurns] = useState<Turn[]>([]) // follow-up answers only
  const [rootAnswered, setRootAnswered] = useState<string | null>(null)
  const [thinking, setThinking] = useState(false)
  const [typed, setTyped] = useState(false) // current bot prompt finished typing
  const [copied, setCopied] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  const followUps = track_ ? TRACK_QUESTIONS[track_] : []
  const finished = track_ !== null && turns.length === followUps.length
  const current: QuizQuestion | null = !rootAnswered ? ROOT_QUESTION : finished ? null : followUps[turns.length]
  const total = 1 + 3

  const outcome = useMemo(
    () => (finished && track_ ? buildOutcome({ track: track_, picks: turns.map((t) => t.optionId) }, locale) : null),
    [finished, track_, turns, locale],
  )

  useEffect(() => {
    if (!started.current) {
      started.current = true
      track('quiz_start')
    }
  }, [])

  useEffect(() => {
    if (outcome && track_) track('quiz_complete', { track: track_ })
  }, [outcome, track_])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }, [turns.length, rootAnswered, typed, outcome, thinking])

  const answer = (optionId: string) => {
    if (thinking || !current) return
    track('quiz_answer', { step: rootAnswered ? turns.length + 2 : 1 })
    setTyped(false)
    setThinking(true)
    window.setTimeout(() => {
      if (!rootAnswered) {
        setRootAnswered(optionId)
        setTrack(optionId as TrackKey)
      } else {
        setTurns((t) => [...t, { q: current, optionId }])
      }
      setThinking(false)
    }, THINK_MS)
  }

  const back = () => {
    if (thinking) return
    setTyped(true)
    if (turns.length > 0) setTurns((t) => t.slice(0, -1))
    else if (rootAnswered) {
      setRootAnswered(null)
      setTrack(null)
    }
  }

  const restart = () => {
    setTurns([])
    setRootAnswered(null)
    setTrack(null)
    setTyped(false)
    setThinking(false)
  }

  const copy = async () => {
    if (!outcome) return
    const text = [outcome.headline, ...outcome.situation, `${L.scope}: ${outcome.scope}`, `${L.first}: ${outcome.firstStep}`].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  const optLabel = (q: QuizQuestion, id: string) => pick(q.options.find((o) => o.id === id)!.label)
  const stepNo = rootAnswered ? turns.length + 2 : 1

  return (
    <div className="quiz">
      <p className="quiz-badge">{L.badge}</p>

      <div className="quiz-thread" role="log" aria-live="polite">
        {/* answered root */}
        {rootAnswered && (
          <>
            <div className="quiz-msg quiz-bot">{pick(ROOT_QUESTION.prompt)}</div>
            <div className="quiz-msg quiz-user">{optLabel(ROOT_QUESTION, rootAnswered)}</div>
          </>
        )}
        {/* answered follow-ups */}
        {turns.map((t) => (
          <div key={t.q.id} className="quiz-pair">
            <div className="quiz-msg quiz-bot">{pick(t.q.prompt)}</div>
            <div className="quiz-msg quiz-user">{optLabel(t.q, t.optionId)}</div>
          </div>
        ))}

        {thinking && (
          <div className="quiz-msg quiz-bot quiz-dots" aria-label="…">
            <span /><span /><span />
          </div>
        )}

        {!thinking && current && (
          <div className="quiz-msg quiz-bot" key={`${rootAnswered ?? 'root'}-${turns.length}`}>
            <Typewriter text={pick(current.prompt)} onDone={() => setTyped(true)} />
          </div>
        )}

        {!thinking && outcome && (
          <>
            <div className="quiz-msg quiz-bot">{L.done}</div>
            <section className="quiz-result" aria-label={outcome.headline}>
              <h2 className="quiz-result-title quiz-stream" style={{ animationDelay: '0ms' }}>{outcome.headline}</h2>
              <ul className="quiz-result-list quiz-stream" style={{ animationDelay: '200ms' }}>
                {outcome.situation.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <div className="quiz-result-block quiz-stream" style={{ animationDelay: '420ms' }}>
                <h3>{L.scope}</h3>
                <p>{outcome.scope}</p>
              </div>
              <div className="quiz-result-block quiz-stream" style={{ animationDelay: '640ms' }}>
                <h3>{L.first}</h3>
                <p>{outcome.firstStep}</p>
              </div>
              <div className="quiz-result-block quiz-stream" style={{ animationDelay: '860ms' }}>
                <h3>{L.agenda}</h3>
                <ul>{outcome.agenda.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
              <div className="quiz-result-block quiz-stream" style={{ animationDelay: '1080ms' }}>
                <h3>{L.related}</h3>
                <ul className="quiz-links">
                  {outcome.links.map((l) => (
                    <li key={l.href + l.label}><Link href={l.href}>{l.label} →</Link></li>
                  ))}
                </ul>
              </div>
              <div className="quiz-actions quiz-stream" style={{ animationDelay: '1280ms' }}>
                <Link
                  href={`/booking?notes=${encodeURIComponent(outcome.note)}`}
                  className="brand-button-primary"
                  onClick={() => track('quiz_book_click', { track: track_ ?? '' })}
                >
                  {L.book} →
                </Link>
                <button type="button" className="brand-button-secondary" onClick={copy}>{copied ? L.copied : L.copy}</button>
              </div>
              <p className="quiz-privacy">{L.privacy}</p>
            </section>
          </>
        )}
        <div ref={endRef} />
      </div>

      {current && (
        <div className="quiz-options" role="group" aria-label={pick(current.prompt)}>
          {!thinking &&
            typed &&
            current.options.map((o) => (
              <button key={o.id} type="button" className="quiz-chip" onClick={() => answer(o.id)}>
                {pick(o.label)}
              </button>
            ))}
        </div>
      )}

      <div className="quiz-foot">
        {current && <span className="quiz-progress">{L.progress(stepNo, total)}</span>}
        {(rootAnswered || finished) && (
          <>
            <button type="button" className="quiz-link" onClick={back}>← {L.back}</button>
            <button type="button" className="quiz-link" onClick={restart}>{L.restart}</button>
          </>
        )}
        {!typed && current && !thinking && <span className="quiz-hint">{L.skip}</span>}
      </div>
    </div>
  )
}
