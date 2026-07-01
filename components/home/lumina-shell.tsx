'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function LuminaShell({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme()
  const previousTheme = useRef<string | undefined>(undefined)

  useEffect(() => {
    const html = document.documentElement
    previousTheme.current = html.classList.contains('dark') ? 'dark' : 'light'

    html.dataset.heroTheme = 'lumina'
    html.classList.add('dark')
    html.style.colorScheme = 'dark'
    setTheme('dark')

    return () => {
      delete html.dataset.heroTheme
      const restore = previousTheme.current
      if (restore === 'light') {
        html.classList.remove('dark')
        html.style.colorScheme = 'light'
        setTheme('light')
      }
    }
  }, [setTheme])

  return <>{children}</>
}
