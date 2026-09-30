'use client'

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

  const groups = LAB_GROUP_ORDER.map((key: LabGroupKey) => ({
    key,
    items: projects.filter((p) => (LAB_GROUP_OF[keyOf(p)] ?? 'other') === key),
  })).filter((g) => g.items.length > 0)

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
      </PageSection>

      {projects.length === 0 ? (
        <PageSection field="orange">
          <p className="lab-empty">{t('projects.noProjects')}</p>
        </PageSection>
      ) : (
        <>
          {featured.length > 0 && (
            <PageSection field="orange">
              <div className="lab-section-head">
                <h2 className="lab-section-title">{c.featured}</h2>
                <span className="lab-section-meta">
                  {c.featuredMeta} · {featured.length}
                </span>
              </div>
              <ul className="lab-grid">{featured.map((p) => card(p, true))}</ul>
            </PageSection>
          )}

          {groups.map((g, i) => (
            <PageSection key={g.key} field={i % 2 === 0 ? 'blue' : 'orange'}>
              <div className="lab-section-head">
                <h2 className="lab-section-title">{c.groups[g.key]}</h2>
                <span className="lab-section-meta">
                  {String(g.items.length).padStart(2, '0')} {c.countLabel}
                </span>
              </div>
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
