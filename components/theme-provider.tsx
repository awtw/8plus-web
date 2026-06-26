'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

const THEME_STORAGE_KEY = 'theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.localStorage.getItem(THEME_STORAGE_KEY)) {
      return
    }

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)')

    if (!darkQuery.matches && !lightQuery.matches) {
      window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    }
  }, [])

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  )
}
