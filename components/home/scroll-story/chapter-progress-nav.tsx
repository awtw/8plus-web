'use client'

import { useEffect, useState } from 'react'
import { ensureGsapPlugins, ScrollTrigger } from '@/lib/motion/gsap-client'
import { HOME_SCROLL_CHAPTER_IDS } from '@/lib/content/home-scroll'

const W1_CHAPTERS = HOME_SCROLL_CHAPTER_IDS.slice(0, 2)

type ChapterProgressNavProps = {
  /** W1: logo + story only */
  chapterIds?: readonly string[]
}

export function ChapterProgressNav({ chapterIds = W1_CHAPTERS }: ChapterProgressNavProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    ensureGsapPlugins()

    const triggers = chapterIds.map((id, index) => {
      const el = document.getElementById(`chapter-${id}`)
      if (!el) return null

      return ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      })
    })

    return () => {
      triggers.forEach((t) => t?.kill())
    }
  }, [chapterIds])

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(`chapter-${id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="scroll-chapter-nav" aria-label="Scroll chapters">
      {chapterIds.map((id, index) => (
        <button
          key={id}
          type="button"
          className={`scroll-chapter-nav-dot${active === index ? ' scroll-chapter-nav-dot-active' : ''}`}
          aria-label={`Chapter ${String(index).padStart(2, '0')}`}
          aria-current={active === index ? 'step' : undefined}
          onClick={() => scrollToChapter(id)}
        >
          <span>{String(index).padStart(2, '0')}</span>
        </button>
      ))}
    </nav>
  )
}
