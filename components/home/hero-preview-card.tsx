'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import type { Project } from '@/lib/projects'
import { ArrowSquareOut, Lightning } from '@phosphor-icons/react'

type HeroPreviewCardProps = {
  caseStudy?: Project
}

export function HeroPreviewCard({ caseStudy }: HeroPreviewCardProps) {
  const { t } = useLanguage()

  if (!caseStudy) {
    return (
      <div className="ci-preview-card ci-preview-card-empty">
        <div className="ci-preview-toolbar">
          <span />
          <span />
          <span />
        </div>
        <p className="ci-preview-placeholder">{t('home.viewProjects')}</p>
      </div>
    )
  }

  return (
    <div className="ci-preview-card">
      <div className="ci-preview-toolbar">
        <span />
        <span />
        <span />
        <p className="ci-preview-toolbar-title">8plus / delivery</p>
      </div>

      <div className="ci-preview-body">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          <Lightning className="h-3.5 w-3.5" weight="fill" />
          Case Study
        </div>
        <h2 className="text-h4 mt-3">{caseStudy.title}</h2>
        {caseStudy.client && (
          <p className="mt-1 text-xs text-[color:var(--muted)]">{caseStudy.client}</p>
        )}
        <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)] line-clamp-3">
          {caseStudy.challenge ?? caseStudy.summary}
        </p>

        {caseStudy.resultMetrics && caseStudy.resultMetrics.length > 0 && (
          <div className="ci-preview-metrics">
            {caseStudy.resultMetrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="ci-preview-metric">
                <p>{metric.label}</p>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        )}

        <Link href={caseStudy.url} className="ci-link mt-5 inline-flex items-center gap-2">
          {t('home.open')}
          <ArrowSquareOut className="h-4 w-4" weight="bold" />
        </Link>
      </div>
    </div>
  )
}
