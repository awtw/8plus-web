import Link from 'next/link'
import { LinkBreak } from '@phosphor-icons/react'
import type { Project } from '@/lib/projects'

type LabCardProps = {
  project: Project
  roleTag?: string
  chip?: string
  featured?: boolean
  cta?: string
  offline?: string
}

export function LabCard({ project, roleTag, chip, featured, cta, offline }: LabCardProps) {
  const tags = (project.stack ?? []).slice(0, 4)
  return (
    <Link href={`/lab/${project.slug}`} className="lab-card gradient-border-card">
      <span className="lab-card-top">
        <span className={featured ? 'lab-tag lab-tag-solid' : 'lab-tag'}>{roleTag ?? project.role}</span>
        <span className="lab-card-arrow" aria-hidden="true">↗</span>
      </span>
      <h3 className="lab-card-title">
        {project.title}
        {chip ? <span className="lab-chip">{chip}</span> : null}
        {offline ? (
          <span className="lab-chip lab-chip-offline">
            <LinkBreak className="h-3 w-3" weight="bold" aria-hidden="true" />
            {offline}
          </span>
        ) : null}
      </h3>
      <p className="lab-card-summary">{project.summary}</p>
      {tags.length > 0 ? (
        <span className="lab-card-tags">
          {tags.map((tag) => (
            <span key={tag} className="lab-pill">{tag}</span>
          ))}
        </span>
      ) : null}
      {cta ? <span className="lab-card-cta">{cta}</span> : null}
    </Link>
  )
}
