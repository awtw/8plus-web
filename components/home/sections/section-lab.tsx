'use client'

import Link from 'next/link'
import { ArrowRight, ArrowSquareOut, Lightning } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'
import { getLocalizedProjects, isCaseStudy } from '@/lib/projects'

type SectionLabProps = {
  locale: HomeLocale
}

export function SectionLab({ locale }: SectionLabProps) {
  const content = getHomeSectionContent(locale)
  const projects = getLocalizedProjects(locale).slice(0, 3)

  return (
    <section
      id="home-section-lab"
      className="home-section home-section-lab"
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

        <ul className="home-lab-grid">
          {projects.map((project) => (
            <li key={project.slug}>
              <article className="home-lab-card">
                <div className="home-lab-card-meta">
                  <Lightning className="h-3.5 w-3.5" weight="fill" />
                  <span>{isCaseStudy(project) ? 'Case Study' : 'Lab'}</span>
                </div>
                <h3 className="home-lab-card-title">{project.title}</h3>
                <p className="home-lab-card-summary">{project.summary}</p>
                <Link href={project.url} className="home-section-link">
                  Open
                  <ArrowSquareOut className="h-4 w-4" weight="bold" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
