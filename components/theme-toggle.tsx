'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Laptop, MoonStars, Sun } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
      aria-label="Toggle theme"
    >
      {!mounted ? <Laptop className="w-4 h-4" weight="bold" /> : currentTheme === 'dark' ? <Sun className="w-4 h-4" weight="bold" /> : <MoonStars className="w-4 h-4" weight="bold" />}
    </Button>
  )
}
