'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

type SectionServicesProps = {
  locale: HomeLocale
}

export function SectionServices({ locale }: SectionServicesProps) {
  const content = getHomeSectionContent(locale)

  return (
    <section
      id="home-section-services"
      className="home-section home-section-services bg-blue noise-field"
      aria-labelledby="home-services-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head home-section-head-row">
          <div>
            <p className="scroll-eyebrow">{content.services.eyebrow}</p>
            <h2 id="home-services-title" className="home-section-title">
              {content.services.title}
            </h2>
          </div>
          <Link href="/services" className="home-section-link">
            {content.services.moreCta}
            <ArrowRight className="h-3.5 w-3.5" weight="bold" />
          </Link>
        </header>

        <ul className="home-services-grid">
          {content.services.items.map((item) => (
            <li key={item.title}>
              <article className="home-services-card">
                <h3 className="home-services-card-title">{item.title}</h3>
                <p className="home-services-card-desc">{item.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
