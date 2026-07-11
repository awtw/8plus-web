'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'
import { getLocalizedProjects, isCaseStudy } from '@/lib/projects'

type SectionLabProps = {
  locale: HomeLocale
}

// map a project key to its bundled thumbnail; falls back to the surface
// texture when the image is missing (404 just shows the background color).
function labThumb(key: string): string | null {
  const remap: Record<string, string> = { 'crm-series': 'crm', 'power-bi': 'powerbi' }
  const id = remap[key] ?? key
  return `/og/labs/${id}/web.png`
}

export function SectionLab({ locale }: SectionLabProps) {
  const content = getHomeSectionContent(locale)
  const projects = getLocalizedProjects(locale).slice(0, 6)

  return (
    <section
      id="home-section-lab"
      className="home-section home-section-lab bg-blue noise-field"
      aria-labelledby="home-lab-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head home-section-head-row">
          <div>
            <p className="scroll-eyebrow">{content.lab.eyebrow}</p>
            <h2 id="home-lab-title" className="home-section-title">
              {content.lab.title}
            </h2>
          </div>
          <Link href="/lab" className="home-section-link">
            {content.lab.moreCta}
            <ArrowRight className="h-3.5 w-3.5" weight="bold" />
          </Link>
        </header>

        <p className="scroll-eyebrow home-lab-arc">{content.lab.arc}</p>

        <ul className="home-lab-grid-v2">
          {projects.map((project) => {
            const key = project.baseSlug ?? project.slug
            const thumb = labThumb(key)
            return (
              <li key={project.slug}>
                <Link href={project.url} className="home-lab-card-v2 gradient-border-card">
                  <span
                    className="home-lab-card-v2-thumb"
                    style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}
                    aria-hidden="true"
                  />
                  <span className="home-lab-card-v2-body">
                    <span className="home-lab-card-v2-meta">
                      <span className="home-lab-card-v2-tag">
                        {isCaseStudy(project) ? 'Case Study' : 'Lab'}
                      </span>
                      <span className="home-lab-card-v2-arrow" aria-hidden="true">↗</span>
                    </span>
                    <span className="home-lab-card-v2-title">{project.title}</span>
                    <span className="home-lab-card-v2-summary">{project.summary}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
