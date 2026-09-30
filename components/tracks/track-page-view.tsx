'use client'

import Link from 'next/link'
import '@/styles/pages/services.css'
import '@/styles/pages/tracks.css'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { SectionHead } from '@/components/services/section-head'
import { FaqList } from '@/components/services/faq-list'
import type { TrackPage } from '@/lib/content/tracks'

type CardItem = { title: string; desc: string }

function CardGrid({ items, wide }: { items: CardItem[]; wide?: boolean }) {
  return (
    <ul className={`services-grid ${wide ? 'services-grid-2' : 'services-grid-3'}`}>
      {items.map((item) => (
        <li key={item.title}>
          <article className="services-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        </li>
      ))}
    </ul>
  )
}

/** Shared layout for the /training and /career track pages (v2 CI color fields). */
export function TrackPageView({ page, secondaryHref }: { page: TrackPage; secondaryHref: string }) {
  return (
    <>
      <PageSection field="blue">
        <PageHeader className="services-rise" eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
        <div className="services-actions">
          <Link href="/booking" className="brand-button-primary">{page.cta.primary} →</Link>
        </div>
      </PageSection>

      <PageSection field="dark" aria-labelledby="track-audience-title">
        <SectionHead id="track-audience-title" title={page.audienceTitle} />
        <CardGrid items={page.audience} />
      </PageSection>

      <PageSection field="blue" aria-labelledby="track-topics-title">
        <SectionHead id="track-topics-title" title={page.topicsTitle} />
        <CardGrid items={page.topics} wide />
      </PageSection>

      <PageSection field="orange" aria-labelledby="track-format-title">
        <SectionHead id="track-format-title" title={page.formatTitle} />
        <CardGrid items={page.formats} wide />
        <SectionHead id="track-flow-title" title={page.flowTitle} />
        <CardGrid items={page.flow} wide />
      </PageSection>

      <PageSection field="blue" aria-labelledby="track-faq-title">
        <SectionHead id="track-faq-title" title={page.faqTitle} />
        <FaqList items={page.faq.map((f) => ({ question: f.q, answer: f.a }))} />
      </PageSection>

      <PageSection field="dark" aria-labelledby="track-cta-title">
        <SectionHead id="track-cta-title" title={page.cta.title} />
        <div className="services-actions">
          <Link href="/booking" className="brand-button-primary">{page.cta.primary} →</Link>
          <Link href={secondaryHref} className="brand-button-secondary">{page.cta.secondary}</Link>
        </div>
      </PageSection>
    </>
  )
}
