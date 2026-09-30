'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'
import { getPathMilestones } from '@/lib/content/path-milestones'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { PathTimeline } from '@/components/path/path-timeline'
import '@/styles/pages/path.css'

export default function PathPage() {
  const { locale, t } = useLanguage()
  const data = getPathMilestones(locale)
  const zh = locale === 'zh-TW'
  const works = data.filter((e) => e.kind === 'work')
  const edus = data.filter((e) => e.kind === 'edu')
  const years = data.flatMap((e) => e.year.match(/\d{4}/g) ?? []).map(Number)
  const span = `${Math.min(...years)} — ${Math.max(...years)}`

  return (
    <>
      <PageSection field="blue" className="path-hero">
        <PageHeader eyebrow={span} title={t('path.title')} lead={t('path.lead')}>
          <ul className="path-stats">
            <li className="metric-chip">{zh ? `${works.length} 段工作經歷` : `${works.length} roles`}</li>
            <li className="metric-chip">{zh ? `${edus.length} 個學位` : `${edus.length} degrees`}</li>
          </ul>
        </PageHeader>
      </PageSection>

      <PathTimeline
        entries={data}
        labels={{ work: zh ? '工作經歷' : 'Experience', edu: zh ? '學歷' : 'Education', current: t('path.current') }}
      />

      <PageSection field="blue" className="path-cta">
        <h2 className="page-title page-title-sub">{t('path.ctaTitle')}</h2>
        <p className="page-lead">{t('path.ctaLead')}</p>
        <Link href="/booking" className="brand-button-primary path-cta-btn">
          {t('path.ctaButton')}
          <ArrowRight className="h-4 w-4" weight="bold" />
        </Link>
      </PageSection>
    </>
  )
}
