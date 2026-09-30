'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

type SectionPathProps = {
  locale: HomeLocale
}

export function SectionPath({ locale }: SectionPathProps) {
  const content = getHomeSectionContent(locale)
  const path = content.path
  const listRef = useRef<HTMLOListElement>(null)

  // timeline scrub: a node "fills" once it scrolls past the viewport centre (and un-fills when scrolled back)
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('.home-path-item')
    if (!items || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const above = e.boundingClientRect.top < window.innerHeight * 0.55
          e.target.classList.toggle('is-passed', e.isIntersecting || above)
        }
      },
      { rootMargin: '0px 0px -45% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path.items.length])

  return (
    <section
      id="home-section-path"
      className="home-section home-section-path bg-orange noise-field"
      aria-labelledby="home-path-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head home-section-head-row">
          <div>
            <p className="scroll-eyebrow">{path.eyebrow}</p>
            <h2 id="home-path-title" className="home-section-title">
              {path.title}
            </h2>
          </div>
          <Link href="/path" className="home-section-link">
            {path.moreCta}
            <ArrowRight className="h-3.5 w-3.5" weight="bold" />
          </Link>
        </header>

        <p className="scroll-lead home-path-lead">{path.lead}</p>

        <ol className="home-path-timeline" ref={listRef}>
          {path.items.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              className={`home-path-item${item.active ? ' home-path-item-active' : ''}`}
            >
              <div className="home-path-rail" aria-hidden="true">
                <span className="home-path-node" />
              </div>
              <div className="home-path-body">
                <div className="home-path-meta">
                  <span className="home-path-year">{item.year}</span>
                  <span className="home-path-period">{item.period}</span>
                </div>
                <h3 className="home-path-title">{item.title}</h3>
                <p className="home-path-subtitle">{item.subtitle}</p>
                {item.description ? (
                  <p className="home-path-desc">{item.description}</p>
                ) : null}
                {item.tags.length > 0 ? (
                  <ul className="home-path-tags">
                    {item.tags.map((tag) => (
                      <li key={tag} className="home-path-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
