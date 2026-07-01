'use client'

import { useEffect, useRef } from 'react'
import { getHomeScrollChapter, type HomeScrollLocale } from '@/lib/content/home-scroll'
import { ensureGsapPlugins, gsap } from '@/lib/motion/gsap-client'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { LogoAssembly } from '@/components/home/scroll-story/logo-assembly'

type ChapterLogoProps = {
  locale: HomeScrollLocale
}

export function ChapterLogo({ locale }: ChapterLogoProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const chapter = getHomeScrollChapter(locale, 'logo')

  useEffect(() => {
    const section = sectionRef.current
    const copy = copyRef.current
    if (!section || !copy || reduced) return

    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.set(copy.children, { opacity: 0, y: 28 })

      gsap.timeline({ delay: 0.85 })
        .to(copy.children, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
        })
    }, section)

    return () => ctx.revert()
  }, [locale, reduced])

  return (
    <section
      ref={sectionRef}
      id="chapter-logo"
      data-chapter="0"
      className="scroll-chapter scroll-chapter-logo"
      aria-label="Chapter 00 — Logo"
    >
      <div className="section-shell scroll-chapter-logo-grid">
        <div ref={copyRef} className="scroll-chapter-logo-copy">
          <p className="scroll-eyebrow">{chapter.eyebrow}</p>
          <h1 className="scroll-display-brand">{chapter.brand}</h1>
          <p className="scroll-display-line">{chapter.titleLines[0]}</p>
          <p className="scroll-display-line scroll-display-line-muted">{chapter.titleLines[1]}</p>
          <p className="scroll-lead">{chapter.lead}</p>
        </div>

        <div className="scroll-chapter-logo-visual">
          <LogoAssembly size={280} className="scroll-logo-stage" />
        </div>
      </div>
    </section>
  )
}
