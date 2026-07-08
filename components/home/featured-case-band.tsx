'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/language-provider'
import type { Project } from '@/lib/projects'
import { ArrowRight, ArrowSquareOut, Lightning } from '@phosphor-icons/react'

type FeaturedCaseBandProps = {
  caseStudy: Project
}

export function FeaturedCaseBand({ caseStudy }: FeaturedCaseBandProps) {
  const { t } = useLanguage()

  return (
    <section className="home-band">
      <div className="section-shell">
        <motion.div
          className="faceid-panel faceid-panel-featured"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          <div className="home-band-head">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <Lightning className="h-3.5 w-3.5" weight="fill" />
              {t('home.heroSectionDelivery')}
            </div>
            <Link href="/projects" className="faceid-link">
              {t('home.viewAll')}
              <ArrowRight className="h-3.5 w-3.5" weight="bold" />
            </Link>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Case Study · {caseStudy.client ?? '8plus'}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{caseStudy.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--fg-2)]">
                {caseStudy.challenge ?? caseStudy.summary}
              </p>
              <Link href={caseStudy.url} className="faceid-cta-secondary mt-5 inline-flex">
                {t('home.open')}
                <ArrowSquareOut className="h-4 w-4" weight="bold" />
              </Link>
            </div>

            {caseStudy.resultMetrics && caseStudy.resultMetrics.length > 0 && (
              <dl className="grid grid-cols-3 gap-3">
                {caseStudy.resultMetrics.slice(0, 3).map((metric) => (
                  <div key={metric.label} className="faceid-metric-tile">
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
