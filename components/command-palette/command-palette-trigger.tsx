'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'
import { track } from '@/lib/analytics'
// Trigger styles must load with the trigger itself, not lazily with the panel (was unstyled until first open).
import '@/styles/command-palette.css'

// The panel pulls in the posts/projects index, so it loads only after first open.
const Panel = dynamic(() => import('./command-palette-panel'), { ssr: false })

/** Header search button + global ⌘K / Ctrl+K shortcut. */
export function CommandPaletteTrigger() {
  const { locale } = useLanguage()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const toggle = (next: boolean) => {
    if (next) {
      setMounted(true)
      track('search_open')
    }
    setOpen(next)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setMounted(true)
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const label = locale === 'en' ? 'Search' : '搜尋'
  return (
    <>
      <button type="button" className="cmdk-trigger" onClick={() => toggle(true)} aria-label={`${label} ⌘K`} aria-haspopup="dialog">
        <MagnifyingGlass size={18} aria-hidden="true" />
        <span className="cmdk-trigger-label">{label}</span>
        <kbd className="cmdk-kbd" aria-hidden="true">⌘K</kbd>
      </button>
      {mounted && <Panel open={open} onOpenChange={toggle} />}
    </>
  )
}
