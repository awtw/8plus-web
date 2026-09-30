'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { LabCard } from '@/components/lab/lab-card'
import { getLocalizedProjects, isProjectLocaleFallback, type Project } from '@/lib/projects'
import {
  LAB_GROUP_OF,
  LAB_GROUP_ORDER,
  getLabContent,
  labRoleTag,
  type LabGroupKey,
} from '@/lib/content/lab'
import '@/styles/pages/lab.css'

const keyOf = (p: Project) => p.baseSlug ?? p.slug

export default function ProjectsPage() {
  const { t, locale } = useLanguage()
  const c = getLabContent(locale)
  const projects = getLocalizedProjects(locale)
  const featured = projects.filter((p) => p.featured)

  // filter chip state, mirrored to ?g= so a filtered view can be shared
  const [active, setActive] = useState<LabGroupKey | 'all'>('all')
  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get('g')
    if (g && (LAB_GROUP_ORDER as string[]).includes(g)) setActive(g as LabGroupKey)
  }, [])
  const choose = (next: LabGroupKey | 'all') => {
    setActive(next)
    const url = new URL(window.location.href)
    if (next === 'all') url.searchParams.delete('g')
    else url.searchParams.set('g', next)
    window.history.replaceState(null, '', url)
  }

  const allGroups = LAB_GROUP_ORDER.map((key: LabGroupKey) => ({
    key,
    items: projects.filter((p) => (LAB_GROUP_OF[keyOf(p)] ?? 'other') === key),
  })).filter((g) => g.items.length > 0)
  const groups = active === 'all' ? allGroups : allGroups.filter((g) => g.key === active)

  const card = (p: Project, isFeatured = false) => (
    <li key={`${p.slug}-${p.locale}`}>
      <LabCard
        project={p}
        featured={isFeatured}
        roleTag={labRoleTag(keyOf(p), locale) ?? p.role}
        chip={isProjectLocaleFallback(p, locale) ? c.fallbackChip : undefined}
        cta={isFeatured ? t('projects.viewDetails') : undefined}
      />
    </li>
  )

  return (
    <>
      <PageSection field="blue" className="lab-hero">
        <PageHeader
          eyebrow={`${c.eyebrow} · ${String(projects.length).padStart(2, '0')}`}
          title={<span className="lab-hero-title">{t('projects.title')}</span>}
          lead={c.lead}
        />
        {projects.length > 0 && (
          <div className="lab-filters" role="group" aria-label={c.eyebrow}>
            <button type="button" className={`lab-filter${active === 'all' ? ' is-active' : ''}`} aria-pressed={active === 'all'} onClick={() => choose('all')}>
              {locale === 'en' ? 'All' : '全部'} · {projects.length}
            </button>
            {allGroups.map((g) => (
              <button key={g.key} type="button" className={`lab-filter${active === g.key ? ' is-active' : ''}`} aria-pressed={active === g.key} onClick={() => choose(g.key)}>
                {c.groups[g.key]} · {g.items.length}
              </button>
            ))}
          </div>
        )}
      </PageSection>

      {projects.length === 0 ? (
        <PageSection field="orange">
          <p className="lab-empty">{t('projects.noProjects')}</p>
        </PageSection>
      ) : (
        <>
          {active === 'all' && featured.length > 0 && (
            <PageSection field="orange">
              <header className="lab-section-head">
                <p className="lab-section-meta">
                  {c.featuredMeta} · {String(featured.length).padStart(2, '0')}
                </p>
                <h2 className="lab-section-title">{c.featured}</h2>
              </header>
              <ul className="lab-grid">{featured.map((p) => card(p, true))}</ul>
            </PageSection>
          )}

          {groups.map((g, i) => (
            <PageSection key={g.key} field={i % 2 === 0 ? 'blue' : 'orange'}>
              <header className="lab-section-head">
                <p className="lab-section-meta">
                  {String(g.items.length).padStart(2, '0')} {c.countLabel}
                </p>
                <h2 className="lab-section-title">{c.groups[g.key]}</h2>
              </header>
              <ul className="lab-grid">{g.items.map((p) => card(p))}</ul>
            </PageSection>
          ))}
        </>
      )}

      <PageSection field="dark" className="border-t border-border-soft">
        <h2 className="lab-cta-title">{c.ctaTitle}</h2>
        <div className="lab-cta-actions">
          <Link href="/booking" className="brand-button-primary">
            {c.ctaPrimary} →
          </Link>
          <Link href="/services" className="brand-button-secondary">
            {c.ctaSecondary}
          </Link>
        </div>
      </PageSection>
    </>
  )
}
