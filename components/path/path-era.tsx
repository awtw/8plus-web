import type { ReactNode } from 'react'
import { PageSection, type PageField } from '@/components/page/page-section'

export type PathEntry = {
  year: string
  period?: string
  title: string
  subtitle?: string
  icon?: ReactNode
  descriptions: string[]
  tags: string[]
  isActive?: boolean
}

type PathEraProps = {
  field: PageField
  label: string
  range: string
  entries: PathEntry[]
  currentLabel: string
  index: number
}

export function PathEra({ field, label, range, entries, currentLabel, index }: PathEraProps) {
  const headingId = `path-era-${index}`
  return (
    <PageSection field={field} aria-labelledby={headingId}>
      <header className="path-era-head">
        <p className="scroll-eyebrow">{label}</p>
        <h2 id={headingId} className="path-era-range">
          {range}
        </h2>
      </header>
      <ol className="path-list">
        {entries.map((m, i) => (
          <li
            key={`${m.year}-${m.title}-${i}`}
            className={`path-item${m.isActive ? ' path-item-active' : ''}`}
          >
            <div className="path-rail" aria-hidden="true">
              <span className="path-node" />
            </div>
            <article className="path-card surface-card">
              <div className="path-meta">
                <span className="path-year">{m.year}</span>
                {m.period ? <span className="path-period">{m.period}</span> : null}
                {m.isActive ? <span className="metric-chip path-current">{currentLabel}</span> : null}
              </div>
              <h3 className="path-title">{m.title}</h3>
              {m.subtitle ? <p className="path-subtitle">{m.subtitle}</p> : null}
              {m.descriptions.length > 0 ? (
                <ul className="path-points">
                  {m.descriptions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              ) : null}
              {m.tags.length > 0 ? (
                <ul className="path-tags">
                  {m.tags.map((tag) => (
                    <li key={tag} className="path-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </PageSection>
  )
}
