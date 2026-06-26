'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Laptop, MoonStars, Sun } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const icon = !mounted ? (
    <Laptop className="w-4 h-4" weight="bold" />
  ) : theme === 'dark' ? (
    <Sun className="w-4 h-4" weight="bold" />
  ) : theme === 'light' ? (
    <MoonStars className="w-4 h-4" weight="bold" />
  ) : (
    <Laptop className="w-4 h-4" weight="bold" />
  )

  const themeTitle = mounted
    ? theme === 'system'
      ? 'System'
      : theme ?? 'system'
    : undefined

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="rounded-full border border-border/70 bg-background/80 text-[color:var(--fg-2)] hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
      aria-label={t('theme.toggle')}
      title={themeTitle}
      suppressHydrationWarning
    >
      {icon}
    </Button>
  )
}
