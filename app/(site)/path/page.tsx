'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'
import { getPathMilestones } from '@/lib/content/path-milestones'
import { PageSection, type PageField } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { PathEra } from '@/components/path/path-era'
import '@/styles/pages/path.css'

const ERA_COUNT = 3

export default function PathPage() {
  const { locale, t } = useLanguage()
  const data = getPathMilestones(locale)
  const zh = locale === 'zh-TW'
  const size = Math.ceil(data.length / ERA_COUNT)
  const eras = Array.from({ length: ERA_COUNT }, (_, i) => data.slice(i * size, (i + 1) * size)).filter(
    (e) => e.length > 0,
  )
  const labels = zh ? ['近期', '中期', '早期'] : ['Recent', 'Middle', 'Early']
  const fields: PageField[] = ['orange', 'blue', 'orange']

  return (
    <>
      <PageSection field="blue" className="path-hero">
        <PageHeader eyebrow={t('path.period')} title={t('path.title')} lead={t('path.lead')} />
      </PageSection>

      {eras.map((entries, i) => {
        const first = entries[0].year
        const last = entries[entries.length - 1].year
        return (
          <PathEra
            key={i}
            index={i}
            field={fields[i]}
            label={labels[i]}
            range={first === last ? first : `${last} — ${first}`}
            entries={entries}
            currentLabel={t('path.current')}
          />
        )
      })}

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
