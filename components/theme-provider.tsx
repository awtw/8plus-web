'use client'

import type { ReactNode } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

/** Phase 3.0 — dark cinematic only; light mode toggle removed */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  )
}
