'use client'

import {
  getHeroNarrativeContent,
  type HeroNarrativeLocale,
} from '@/lib/content/hero-narrative'
import { MotionReveal } from '@/components/motion/motion-reveal'

type ChapterManifestoProps = {
  locale: HeroNarrativeLocale
}

export function ChapterManifesto({ locale }: ChapterManifestoProps) {
  const content = getHeroNarrativeContent(locale)

  return (
    <section
      id="chapter-manifesto"
      data-chapter="2"
      className="scroll-chapter scroll-chapter-manifesto"
      aria-label="Chapter 04 — Manifesto"
    >
      <div className="section-shell scroll-manifesto-inner">
        <p className="scroll-eyebrow">{content.manifesto.eyebrow}</p>
        <div className="scroll-manifesto-grid">
          {content.manifesto.modules.map((module, index) => (
            <MotionReveal key={module.mark} delay={index * 0.08}>
              <article className="scroll-manifesto-card">
                <span className="scroll-manifesto-mark">{module.mark}</span>
                <h3 className="scroll-manifesto-title">{module.title}</h3>
                <p className="scroll-manifesto-body">{module.description}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
