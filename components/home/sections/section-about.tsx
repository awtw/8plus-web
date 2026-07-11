'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

type SectionAboutProps = {
  locale: HomeLocale
}

export function SectionAbout({ locale }: SectionAboutProps) {
  const content = getHomeSectionContent(locale)
  const about = content.about
  const stageCount = about.spectrum.length

  return (
    <section
      id="home-section-about"
      className="home-section home-section-about bg-orange noise-field"
      aria-labelledby="home-about-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head home-section-head-row">
          <div>
            <p className="scroll-eyebrow">{about.eyebrow}</p>
            <h2 id="home-about-title" className="home-section-title">
              {about.title}
            </h2>
          </div>
          <Link href="/about" className="home-section-link">
            {about.moreCta}
            <ArrowRight className="h-3.5 w-3.5" weight="bold" />
          </Link>
        </header>

        <p className="home-about-kicker">{about.kicker}</p>
        <p className="home-about-lead">{about.lead}</p>
        <p className="home-about-summary">{about.summary}</p>

        <p className="scroll-eyebrow home-about-spectrum-eyebrow">{about.spectrumEyebrow}</p>
        <ol className="home-about-spectrum">
          {about.spectrum.map((stage, index) => {
            const opacity = 0.4 + 0.6 * (index / (stageCount - 1))
            return (
              <li key={stage.title} className="home-about-spectrum-item">
                <span
                  className="home-about-spectrum-bar"
                  style={{ opacity }}
                  aria-hidden="true"
                />
                <div className="home-about-spectrum-meta">
                  <span
                    className="home-about-spectrum-dot"
                    style={{ opacity }}
                    aria-hidden="true"
                  />
                  <span className="home-about-spectrum-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index < stageCount - 1 ? (
                    <span className="home-about-spectrum-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </div>
                <h3 className="home-about-spectrum-title">{stage.title}</h3>
                <p className="home-about-spectrum-caption">{stage.caption}</p>
              </li>
            )
          })}
        </ol>

        <ul className="home-about-highlights">
          {about.highlights.map((hl, index) => (
            <li
              key={hl.label}
              className={`home-about-highlight${index === 0 ? ' home-about-highlight-lead' : ''}`}
            >
              <span className="home-about-highlight-label">{hl.label}</span>
              <span className="home-about-highlight-value">{hl.value}</span>
            </li>
          ))}
        </ul>

        <ul className="home-about-chips">
          {about.chips.map((chip) => (
            <li key={chip} className="home-about-chip">
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
