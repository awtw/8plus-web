'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'
import { PageSection } from '@/components/page/page-section'
import { findLocalizedProject, isCaseStudy, isProjectLocaleFallback } from '@/lib/projects'
import { getLabContent } from '@/lib/content/lab'
import '@/styles/pages/lab.css'

const LINK_LABELS: Record<string, string> = { github: 'GitHub', demo: 'Live Demo', website: 'Website' }

export default function ProjectDetail() {
  const { t, locale } = useLanguage()
  const c = getLabContent(locale).detail
  const params = useParams()
  const slug = params.slug as string

  const project = findLocalizedProject(slug, locale)

  if (!project) {
    notFound()
  }

  const isFallback = isProjectLocaleFallback(project, locale)
  const caseStudy = isCaseStudy(project)
  const metrics = caseStudy ? (project.resultMetrics ?? []) : []
  const links = project.links ? Object.entries(project.links) : []
  const hasHighlights = !!project.highlights && project.highlights.length > 0

  return (
    <article>
      <PageSection field="blue">
        <header className="lab-detail-head">
          <Link href="/lab" className="lab-back">
            ← {c.back}
          </Link>
          <div className="lab-eyebrow-row">
            <p className="scroll-eyebrow">{caseStudy ? c.caseStudy : c.lab}</p>
            {isFallback && <span className="lab-chip">{c.fallbackChip}</span>}
          </div>
          <h1 className="lab-detail-title">{project.title}</h1>

          <div className="lab-meta-row">
            {caseStudy && project.client && (
              <div>
                <strong>{t('projects.client')}：</strong>
                {project.client}
              </div>
            )}
            {project.role && (
              <div>
                <strong>{t('projects.role')}：</strong>
                {project.role}
              </div>
            )}
            {project.period && (
              <div>
                <strong>{t('projects.period')}：</strong>
                {project.period}
              </div>
            )}
          </div>

          <p className="lab-detail-summary">{project.summary}</p>

          {metrics.length > 0 && (
            <div className="lab-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="surface-card lab-metric">
                  <div className="lab-metric-label">{m.label}</div>
                  <div className="lab-metric-value">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {project.stack && project.stack.length > 0 && (
            <div className="lab-stack">
              <div className="lab-mono-label">{t('projects.techStack')}</div>
              <div className="lab-card-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="lab-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>
      </PageSection>

      {caseStudy && (project.challenge || project.solution) && (
        <PageSection field="orange">
          <div className="lab-two-col">
            {project.challenge && (
              <div className="surface-card lab-block">
                <h2 className="lab-block-title">{t('projects.challenge')}</h2>
                <p className="lab-block-text">{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div className="surface-card lab-block">
                <h2 className="lab-block-title">{t('projects.solution')}</h2>
                <p className="lab-block-text">{project.solution}</p>
              </div>
            )}
          </div>
        </PageSection>
      )}

      <PageSection field="blue">
        <div className="lab-body">
          {hasHighlights && (
            <>
              <h2 className="lab-block-title">{t('projects.highlights')}</h2>
              <ul className="lab-highlights">
                {project.highlights!.map((h, i) => (
                  <li key={i}>
                    <span className="lab-dot" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.html }} />
          </div>
        </div>
      </PageSection>

      {links.length > 0 && (
        <PageSection field="blue" className="border-t border-border-soft">
          <div className="surface-card lab-links">
            <span className="lab-mono-label">{t('projects.links')}</span>
            <div className="lab-links-list">
              {links.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-secondary"
                >
                  {LINK_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1)}
                  <ArrowSquareOut className="h-4 w-4" weight="bold" />
                </a>
              ))}
            </div>
          </div>
        </PageSection>
      )}

      <PageSection field="dark" className="border-t border-border-soft">
        <h2 className="lab-cta-title">{c.ctaTitle}</h2>
        <div className="lab-cta-actions">
          <Link href="/booking" className="brand-button-primary">
            {getLabContent(locale).ctaPrimary} →
          </Link>
          <Link href="/lab" className="brand-button-secondary">
            {c.ctaSecondary}
          </Link>
        </div>
      </PageSection>
    </article>
  )
}
