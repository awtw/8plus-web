'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import type { Project } from '@/lib/projects'
import { ArrowSquareOut, Lightning } from '@phosphor-icons/react'

type DeliveryPreviewProps = {
  caseStudy: Project
}

export function DeliveryPreview({ caseStudy }: DeliveryPreviewProps) {
  const { t } = useLanguage()

  return (
    <div className="lumina-glass-strong p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          <Lightning className="h-3.5 w-3.5" weight="fill" />
          {t('home.deliveryPreview')}
        </div>
        <span className="rounded-full border border-[color:var(--lumina-glass-border)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[color:var(--muted)]">
          Case Study
        </span>
      </div>

      <h3 className="text-base font-semibold tracking-[-0.03em] sm:text-lg">{caseStudy.title}</h3>
      {caseStudy.client && (
        <p className="mt-1 text-xs text-[color:var(--muted)]">{caseStudy.client}</p>
      )}
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--fg-2)]">
        {caseStudy.challenge ?? caseStudy.summary}
      </p>

      {caseStudy.resultMetrics && caseStudy.resultMetrics.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {caseStudy.resultMetrics.slice(0, 3).map((metric) => (
            <div
              key={metric.label}
              className="rounded-[var(--radius-sm)] border border-[color:var(--lumina-glass-border)] bg-[color:var(--lumina-glass)] px-2 py-2 text-center"
            >
              <p className="text-[10px] uppercase tracking-wide text-[color:var(--muted)]">
                {metric.label}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[color:var(--fg)]">{metric.value}</p>
            </div>
          ))}
        </div>
      )}

      <Link
        href={caseStudy.url}
        className="lumina-button-secondary mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-2 text-sm"
      >
        {t('home.open')}
        <ArrowSquareOut className="h-4 w-4" weight="bold" />
      </Link>
    </div>
  )
}
