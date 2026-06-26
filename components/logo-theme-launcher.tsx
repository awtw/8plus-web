'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Palette } from '@phosphor-icons/react'
import { useDesignMode, type DesignMode } from './design-mode-provider'
import { useLanguage } from './language-provider'
import { Logo } from './logo'

const themeItems: Array<{
  id: DesignMode
  label: string
  hint: string
}> = [
  { id: 'cohere', label: 'Classic', hint: 'Clean' },
  { id: 'apple', label: 'Paper', hint: 'Soft' },
  { id: 'elevenlabs', label: 'Studio', hint: 'Dark' },
]

interface LogoThemeLauncherProps {
  compact?: boolean
  onNavigateHome?: () => void
}

export function LogoThemeLauncher({ compact = false, onNavigateHome }: LogoThemeLauncherProps) {
  const router = useRouter()
  const { mode, setMode } = useDesignMode()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isLongPressing, setIsLongPressing] = useState(false)
  const pressTimer = useRef<number | null>(null)
  const launcherRef = useRef<HTMLDivElement>(null)

  const activeItem = themeItems.find((item) => item.id === mode)

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (launcherRef.current && !launcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const clearTimer = () => {
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }

  const startPress = () => {
    clearTimer()
    setIsLongPressing(false)
    pressTimer.current = window.setTimeout(() => {
      setIsLongPressing(true)
      setIsOpen(true)
    }, 550)
  }

  const endPress = () => {
    clearTimer()
  }

  const navigateHome = () => {
    onNavigateHome?.()
    router.push('/')
  }

  return (
    <div ref={launcherRef} className="relative inline-flex items-center gap-1">
      <button
        type="button"
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerLeave={endPress}
        onPointerCancel={endPress}
        onClick={(event) => {
          if (isLongPressing) {
            event.preventDefault()
            setIsLongPressing(false)
            return
          }
          navigateHome()
        }}
        className="inline-flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        aria-label="8plus home"
      >
        <Logo size={compact ? 28 : 32} className={compact ? 'h-7 w-7' : 'h-8 w-8'} />
        <span className={`${compact ? 'text-xl' : 'text-lg'} font-semibold tracking-[-0.02em]`}>8plus</span>
      </button>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/80 text-[color:var(--fg-2)] hover:bg-[color:var(--hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        aria-label={t('theme.designMenu')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`${activeItem?.label ?? 'Classic'} · ${t('theme.longPressHint')}`}
      >
        <Palette className="h-4 w-4" weight="bold" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[100] mt-3 w-[17rem] rounded-[24px] border border-border/80 bg-background p-3 shadow-[0_28px_60px_rgba(0,0,0,0.12)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">{t('common.theme')}</p>
              <p className="mt-1 text-sm font-medium text-[color:var(--fg)]">
                {activeItem?.label} · {t('theme.current')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-border/70 bg-background px-2.5 py-2 text-xs text-[color:var(--fg-2)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              {t('common.close')}
            </button>
          </div>

          <p className="mb-2 text-[10px] text-[color:var(--muted)]">{t('theme.longPressHint')}</p>

          <div className="grid gap-2">
            {themeItems.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setMode(item.id)
                  setIsOpen(false)
                }}
                className={`flex items-center justify-between rounded-[18px] border px-3 py-3 text-left transition-colors hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ${
                  mode === item.id ? 'border-[color:var(--hover-border)] bg-[color:var(--hover-bg-strong)]' : 'border-border/70 bg-background'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[color:var(--accent)]" />
                  <div>
                    <div className="text-sm font-medium text-[color:var(--fg)]">{item.label}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">{item.hint}</div>
                  </div>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full ${mode === item.id ? 'bg-[color:var(--fg)]' : 'bg-transparent'}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
