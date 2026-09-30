import type { ReactNode } from 'react'

type SectionHeadProps = { eyebrow?: string; title: ReactNode; lead?: ReactNode; id?: string }

export function SectionHead({ eyebrow, title, lead, id }: SectionHeadProps) {
  return (
    <header>
      {eyebrow ? <p className="services-eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="services-h2">{title}</h2>
      {lead ? <p className="services-lead">{lead}</p> : null}
    </header>
  )
}
