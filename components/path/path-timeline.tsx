'use client'

import { useEffect, useRef, useState } from 'react'
import { PageSection } from '@/components/page/page-section'

export type PathEntry = {
  year: string
  period?: string
  title: string
  subtitle?: string
  icon?: React.ReactNode
  descriptions: string[]
  tags: string[]
  isActive?: boolean
  kind: 'work' | 'edu'
}

type Labels = { work: string; edu: string; current: string }

/** "NCTU 交通大學 — 分子…" -> "NCTU 交通大學"; "CTBC Bank (Corporate…)" -> "CTBC Bank" */
const shortTitle = (t: string) => t.split(/\s+[—–-]\s+|\s*[（(]/)[0].trim()

/**
 * Career timeline. Phones/tablets: a single vertical rail with cards (unchanged idea).
 * Desktop (>=1024px): a sticky index on the left that follows the scroll — a big year that swaps as you
 * read, the organisation and period, a clickable mini-timeline with a progress line — and the cards on the
 * right come into focus one at a time while the others recede.
 */
export function PathTimeline({ entries, labels }: { entries: PathEntry[]; labels: Labels }) {
  const [active, setActive] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)

  // scroll-spy: the card crossing the vertical centre band is "active"
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('.path-item')
    if (!items || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (list) => {
        for (const e of list) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-42% 0px -42% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [entries.length])

  // progress line: 0 at the first card's centre, 1 at the last card's centre
  useEffect(() => {
    const stage = stageRef.current
    const list = listRef.current
    if (!stage || !list) return
    let raf = 0
    const update = () => {
      raf = 0
      const items = list.querySelectorAll<HTMLElement>('.path-item')
      const nodes = list.querySelectorAll<HTMLElement>('.path-node')
      if (items.length < 2 || nodes.length !== items.length) return
      const center = window.innerHeight * 0.5

      // desktop index: 0 at the first card's centre, 1 at the last card's centre
      const first = items[0].getBoundingClientRect()
      const last = items[items.length - 1].getBoundingClientRect()
      const a = first.top + first.height / 2
      const b = last.top + last.height / 2
      stage.style.setProperty('--p', Math.min(Math.max((center - a) / Math.max(b - a, 1), 0), 1).toFixed(4))

      // phones/tablets: the rail fills (in px) from the first node down to the viewport centre,
      // and every node above the centre line is marked passed
      const listTop = list.getBoundingClientRect().top
      const n0 = nodes[0].getBoundingClientRect()
      const n1 = nodes[nodes.length - 1].getBoundingClientRect()
      const y0 = n0.top + n0.height / 2
      const y1 = n1.top + n1.height / 2
      list.style.setProperty('--start', `${(y0 - listTop).toFixed(1)}px`)
      list.style.setProperty('--fill', `${Math.min(Math.max(center - y0, 0), y1 - y0).toFixed(1)}px`)
      items.forEach((li, i) => {
        const r = nodes[i].getBoundingClientRect()
        li.classList.toggle('is-passed', r.top + r.height / 2 <= center)
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [entries.length])

  const goTo = (i: number) => {
    listRef.current?.querySelectorAll<HTMLElement>('.path-item')[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const cur = entries[Math.min(active, entries.length - 1)]
  const firstEduIndex = entries.findIndex((e) => e.kind === 'edu')

  return (
    <PageSection field="dark" className="path-timeline-section">
      <div className="path-stage" ref={stageRef}>
        {/* sticky index — desktop only; the cards carry all content for assistive tech and small screens */}
        <aside className="path-index" aria-label={labels.work}>
          <div className="path-index-top" aria-hidden="true">
            <div className="path-index-kind">{cur.kind === 'edu' ? labels.edu : labels.work}</div>
            <div className="path-index-year" key={`${cur.year}-${active}`}>{cur.year}</div>
            <div className="path-index-org">{shortTitle(cur.title)}</div>
            {cur.period ? <div className="path-index-period">{cur.period}</div> : null}
          </div>
          <ol className="path-index-list">
            {entries.map((e, i) => (
              <li key={`${e.year}-${e.title}`}>
                <button
                  type="button"
                  className={`path-index-item${i === active ? ' is-active' : ''}${i < active ? ' is-past' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`${e.year} ${shortTitle(e.title)}`}
                  aria-current={i === active ? 'step' : undefined}
                >
                  <span className="path-index-dot" aria-hidden="true" />
                  <span className="path-index-item-year">{e.year}</span>
                  <span className="path-index-item-name">{shortTitle(e.title)}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <ol className="path-list" ref={listRef}>
          {entries.map((m, i) => (
            <li
              key={`${m.year}-${m.title}`}
              data-index={i}
              className={`path-item${m.isActive ? ' path-item-current' : ''}${i === active ? ' is-active' : ''}${i === firstEduIndex ? ' path-item-edu-start' : ''}`}
            >
              {i === firstEduIndex ? (
                <div className="path-divider" role="presentation">{labels.edu}</div>
              ) : null}
              <div className="path-rail" aria-hidden="true">
                <span className="path-node" />
              </div>
              <article className="path-card surface-card">
                <div className="path-meta">
                  <span className="path-year">{m.year}</span>
                  {m.period ? <span className="path-period">{m.period}</span> : null}
                  <span className="path-kind">{m.icon}{m.kind === 'edu' ? labels.edu : labels.work}</span>
                  {m.isActive ? <span className="metric-chip path-current">{labels.current}</span> : null}
                </div>
                <h3 className="path-title">{m.title}</h3>
                {m.subtitle ? <p className="path-subtitle">{m.subtitle}</p> : null}
                {m.descriptions.length > 0 ? (
                  <ul className="path-points">
                    {m.descriptions.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                ) : null}
                {m.tags.length > 0 ? (
                  <ul className="path-tags">
                    {m.tags.map((tag) => (
                      <li key={tag} className="path-tag">{tag}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </PageSection>
  )
}
