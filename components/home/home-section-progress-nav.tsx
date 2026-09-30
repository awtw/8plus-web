'use client'

import { useEffect, useState } from 'react'
import { HOME_SECTION_IDS } from '@/lib/content/home-sections'

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero',
  principles: 'Principles',
  about: 'Story',
  lab: 'Lab',
  path: 'Path',
  services: 'Service',
  booking: 'Book',
}

type HomeSectionProgressNavProps = {
  sectionIds?: readonly string[]
}

export function HomeSectionProgressNav({
  sectionIds = HOME_SECTION_IDS,
}: HomeSectionProgressNavProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // A section is "active" while it crosses the viewport's vertical centre line.
    const observers = sectionIds.map((id, index) => {
      const el = document.getElementById(`home-section-${id}`)
      if (!el) return null
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index)
        },
        { rootMargin: '-50% 0px -50% 0px' },
      )
      io.observe(el)
      return io
    })

    return () => {
      observers.forEach((io) => io?.disconnect())
    }
  }, [sectionIds])

  const scrollToSection = (id: string) => {
    document.getElementById(`home-section-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className="home-section-nav" aria-label="Homepage sections">
      {sectionIds.map((id, index) => (
        <button
          key={id}
          type="button"
          className={`home-section-nav-dot${active === index ? ' home-section-nav-dot-active' : ''}`}
          aria-label={SECTION_LABELS[id] ?? id}
          aria-current={active === index ? 'step' : undefined}
          onClick={() => scrollToSection(id)}
        >
          <span>{String(index).padStart(2, '0')}</span>
        </button>
      ))}
    </nav>
  )
}
