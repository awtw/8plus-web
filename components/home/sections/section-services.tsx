'use client'

import Link from 'next/link'
import '@/styles/pages/tracks.css'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'
import { getTracksContent } from '@/lib/content/tracks'

type SectionServicesProps = {
  locale: HomeLocale
}

export function SectionServices({ locale }: SectionServicesProps) {
  const content = getHomeSectionContent(locale)
  const tracks = getTracksContent(locale)

  return (
    <section
      id="home-section-services"
      className="home-section home-section-services bg-blue noise-field"
      aria-labelledby="home-services-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head home-section-head-row">
          <div>
            <p className="scroll-eyebrow">{tracks.eyebrow}</p>
            <h2 id="home-services-title" className="home-section-title">
              {tracks.title}
            </h2>
            <p className="scroll-lead">{tracks.lead}</p>
          </div>
          <Link href="/services" className="home-section-link">
            {content.services.moreCta}
            <ArrowRight className="h-3.5 w-3.5" weight="bold" />
          </Link>
        </header>

        <ul className="track-grid">
          {tracks.items.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className="track-card">
                <span className="track-card-meta">
                  <span>
                    <span className="track-mark">{item.mark}</span> · TRACK
                  </span>
                  <ArrowRight className="h-4 w-4" weight="bold" aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.tagline}</p>
                <span className="track-audience">{item.audience}</span>
                <span className="track-cta">{item.cta}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/booking" className="brand-button-secondary track-quiz-link">
          {tracks.quizCta}
        </Link>
      </div>
    </section>
  )
}
