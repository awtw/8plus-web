'use client'

import { ViewTransition } from 'react'
import type { ReactNode } from 'react'

/** Cross-fades route changes with the View Transitions API (Next experimental.viewTransition). */
export function PageTransition({ children }: { children: ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>
}
