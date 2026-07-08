'use client'

import { useRef } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'
import {
  getEditorialPillarReveal,
  getHomeEditorialMotion,
} from '@/lib/hero/home-editorial-motion'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { useScrollPinProgress } from '@/components/motion/use-scroll-pin-progress'

const HANDSHAKE = '/ci/handshake.png'

type SectionHeroProps = {
  locale: HomeLocale
}

export function SectionHero({ locale }: SectionHeroProps) {
  const content = getHomeSectionContent(locale)
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progress = useScrollPinProgress(sectionRef, pinRef, { end: '+=150%' })

  const m = getHomeEditorialMotion(progress)
  const pillarReveal = (index: number) =>
    reducedMotion ? 1 : getEditorialPillarReveal(progress, index)

  return (
    <section
      ref={sectionRef}
      id="home-section-hero"
      className="home-section home-section-hero"
      aria-labelledby="home-hero-headline"
    >
      <div ref={pinRef} className="home-hero-ed-pin">
        <div
          className="home-hero-ed-figure"
          style={{
            clipPath: `inset(${m.clipTop}% ${m.clipRight}% ${m.clipBottom}% ${m.clipLeft}%)`,
          }}
          aria-hidden="true"
        >
          <img
            src={HANDSHAKE}
            alt=""
            style={{ transform: `scale(${m.imageScale})` }}
            draggable={false}
          />
          <span className="home-hero-ed-caption" style={{ opacity: m.captionOpacity }}>
            {content.hero.figureCaption}
          </span>
        </div>

        <div className="home-hero-ed-rules" aria-hidden="true" />
        <div className="home-hero-ed-scrim" style={{ opacity: m.scrimOpacity }} aria-hidden="true" />

        <div className="home-hero-ed-overlay section-shell">
          <header className="home-hero-ed-masthead">
            <span>{content.hero.tag}</span>
            <span>{content.hero.issueMark}</span>
          </header>

          <h1
            id="home-hero-headline"
            className="home-hero-ed-headline"
            style={{
              transform: `translate3d(0, ${m.headlineY}%, 0) scale(${m.headlineScale})`,
            }}
          >
            {content.hero.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <div className="home-hero-ed-foot">
            <ul className="home-hero-ed-pillars" aria-label={content.hero.tag}>
              {content.hero.pillars.map((pillar, index) => {
                const reveal = pillarReveal(index)
                return (
                  <li
                    key={pillar.mark}
                    className="home-hero-ed-pillar"
                    style={{
                      opacity: reveal,
                      transform: `translate3d(0, ${(1 - reveal) * 24}px, 0)`,
                    }}
                  >
                    <span className="home-hero-ed-pillar-mark" aria-hidden="true">
                      {pillar.mark}
                    </span>
                    <div>
                      <h2 className="home-hero-ed-pillar-title">{pillar.title}</h2>
                      <p className="home-hero-ed-pillar-desc">{pillar.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <p
              className="home-hero-ed-cue"
              style={{ opacity: reducedMotion ? 0 : m.cueReveal }}
            >
              <span>{content.hero.scrollCue}</span>
              <CaretDown className="home-hero-ed-cue-icon" weight="bold" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
