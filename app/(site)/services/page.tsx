'use client'

import Link from 'next/link'
import '@/styles/pages/services.css'
import { useLanguage } from '@/components/language-provider'
import { getProcessPricingContent } from '@/lib/content/process-pricing'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { SectionHead } from '@/components/services/section-head'
import { Pipeline } from '@/components/services/pipeline'
import { ProcessList } from '@/components/services/process-list'
import { PricingGrid } from '@/components/services/pricing-grid'
import { FaqList } from '@/components/services/faq-list'

export default function ServicesPage() {
  const { locale, t, tn } = useLanguage()
  const items = tn('services.items') as Array<{ title: string; desc: string }>
  const { pipeline, process, pricing, faq, faqEyebrow, faqTitle, cta } = getProcessPricingContent(locale)
  const letters = ['A', 'B', 'C', 'D', 'E', 'F']

  return (
    <>
      <PageSection field="blue">
        <PageHeader
          className="services-rise"
          eyebrow={`04 · ${t('services.eyebrow').toUpperCase()}`}
          title={t('services.headline')}
          lead={t('services.lead')}
        />
      </PageSection>

      <PageSection field="orange" aria-labelledby="services-pipeline-title">
        <SectionHead id="services-pipeline-title" eyebrow={pipeline.eyebrow} title={pipeline.title} lead={pipeline.lead} />
        <Pipeline steps={pipeline.steps} />
      </PageSection>

      <PageSection field="blue" aria-labelledby="services-offer-title">
        <SectionHead id="services-offer-title" eyebrow="SERVICES" title={t('services.title')} />
        <ul className="services-grid services-grid-2">
          {items.map((item, i) => (
            <li key={item.title}>
              <article className="gradient-border-card services-card">
                <span className="services-card-meta">
                  <span>{letters[i] ?? i + 1} · SERVICE</span>
                  <span className="services-arrow" aria-hidden="true">↗</span>
                </span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection field="orange" id="process" className="services-anchor" aria-labelledby="services-process-title">
        <SectionHead id="services-process-title" eyebrow={process.eyebrow} title={process.title} lead={process.lead} />
        <ProcessList steps={process.steps} />
        <div className="services-actions">
          <Link href="/booking" className="brand-button-primary">{process.cta}</Link>
        </div>
      </PageSection>

      <PageSection field="blue" id="pricing" className="services-anchor" aria-labelledby="services-pricing-title">
        <SectionHead id="services-pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />
        <PricingGrid tiers={pricing.tiers} />
        <p className="services-note">{pricing.note}</p>
        <div className="services-actions">
          <Link href="/booking" className="brand-button-primary">{pricing.cta}</Link>
        </div>
      </PageSection>

      <PageSection field="orange" aria-labelledby="services-faq-title">
        <SectionHead id="services-faq-title" eyebrow={faqEyebrow} title={faqTitle} />
        <FaqList items={faq} />
      </PageSection>

      <PageSection field="dark" aria-labelledby="services-cta-title">
        <SectionHead id="services-cta-title" title={cta.title} />
        <div className="services-actions">
          <Link href="/booking" className="brand-button-primary">{cta.book} →</Link>
          <Link href="/about" className="brand-button-secondary">{cta.about}</Link>
          <Link href="#pricing" className="brand-button-secondary">{t('nav.pricing')}</Link>
        </div>
      </PageSection>
    </>
  )
}
