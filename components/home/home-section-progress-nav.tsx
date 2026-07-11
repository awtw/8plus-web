'use client'

import { useEffect, useState } from 'react'
import { ensureGsapPlugins, ScrollTrigger } from '@/lib/motion/gsap-client'
import { HOME_SECTION_IDS } from '@/lib/content/home-sections'

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero',
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
    ensureGsapPlugins()

    const triggers = sectionIds.map((id, index) => {
      const el = document.getElementById(`home-section-${id}`)
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
