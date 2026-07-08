'use client'

import Link from 'next/link'
import {
  getHeroNarrativeContent,
  type HeroNarrativeLocale,
} from '@/lib/content/hero-narrative'
import { MotionReveal } from '@/components/motion/motion-reveal'

type ChapterPortalProps = {
  locale: HeroNarrativeLocale
}

export function ChapterPortal({ locale }: ChapterPortalProps) {
  const content = getHeroNarrativeContent(locale)

  return (
    <section
      id="chapter-portal"
      data-chapter="3"
      className="scroll-chapter scroll-chapter-portal"
      aria-label="Chapter 05 — Portal"
    >
      <div className="section-shell scroll-portal-inner">
        <p className="scroll-eyebrow">{content.portal.eyebrow}</p>
        <h2 className="scroll-portal-title">{content.portal.title}</h2>
        <div className="scroll-portal-grid">
          {content.portal.links.map((link, index) => (
            <MotionReveal key={link.href} delay={index * 0.05}>
              <Link href={link.href} className="scroll-portal-link">
                {link.label}
              </Link>
            </MotionReveal>
          ))}
        </div>
        <MotionReveal delay={0.35}>
          <Link href="/booking" className="scroll-portal-cta">
            {content.portal.bookingCta}
          </Link>
        </MotionReveal>
      </div>
    </section>
  )
}
