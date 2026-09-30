import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
  children?: ReactNode
}

/** Editorial page/section head: mono eyebrow, sans display title, lead paragraph. */
export function PageHeader({ eyebrow, title, lead, as: Tag = 'h1', className, children }: PageHeaderProps) {
  return (
    <header className={cn('page-head', className)}>
      {eyebrow ? <p className="scroll-eyebrow">{eyebrow}</p> : null}
      <Tag className={Tag === 'h1' ? 'page-title' : 'page-title page-title-sub'}>{title}</Tag>
      {lead ? <p className="page-lead">{lead}</p> : null}
      {children}
    </header>
  )
}
