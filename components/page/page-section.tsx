import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type PageField = 'blue' | 'orange' | 'dark'

type PageSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'children'> & {
  field?: PageField
  noise?: boolean
  innerClassName?: string
  children: ReactNode
}

/** v2 CI alternating color-field wrapper (blue / orange / dark) for inner pages. */
export function PageSection({
  field = 'blue',
  noise = true,
  className,
  innerClassName,
  children,
  ...props
}: PageSectionProps) {
  return (
    <section
      className={cn('page-section', `bg-${field}`, noise && 'noise-field', className)}
      {...props}
    >
      <div className={cn('page-section-inner section-shell', innerClassName)}>{children}</div>
    </section>
  )
}
