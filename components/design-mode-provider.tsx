'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type DesignMode = 'cohere' | 'apple' | 'elevenlabs'

const DESIGN_MODES: DesignMode[] = ['cohere', 'apple', 'elevenlabs']
const STORAGE_KEY = '8plus-design-mode'
const THEME_QUERY_KEY = 'theme'
const DEFAULT_MODE: DesignMode = 'cohere'

const ROUTE_THEME_MAP: Record<string, DesignMode> = {
  classic: 'cohere',
  paper: 'apple',
  studio: 'elevenlabs',
  cohere: 'cohere',
  apple: 'apple',
  elevenlabs: 'elevenlabs',
}

const MODE_TO_ROUTE_THEME: Record<DesignMode, string> = {
  cohere: 'classic',
  apple: 'paper',
  elevenlabs: 'studio',
}

type DesignModeContextValue = {
  mode: DesignMode
  setMode: (mode: DesignMode) => void
}

const DesignModeContext = createContext<DesignModeContextValue | null>(null)

function isDesignMode(value: string | null): value is DesignMode {
  return value !== null && DESIGN_MODES.includes(value as DesignMode)
}

function resolveModeFromTheme(value: string | null): DesignMode | null {
  if (!value) {
    return null
  }

  if (isDesignMode(value)) {
    return value
  }

  return ROUTE_THEME_MAP[value] ?? null
}

function readModeFromLocation(): DesignMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  const params = new URLSearchParams(window.location.search)
  const candidate = params.get(THEME_QUERY_KEY) ?? params.get('design') ?? params.get('view')
  return resolveModeFromTheme(candidate)
}

function readStoredMode(): DesignMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  const candidate = window.localStorage.getItem(STORAGE_KEY)
  return isDesignMode(candidate) ? candidate : null
}

function applyMode(mode: DesignMode) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.designMode = mode
}

function syncUrl(mode: DesignMode) {
  if (typeof window === 'undefined') {
    return
  }

  const url = new URL(window.location.href)
  url.searchParams.set(THEME_QUERY_KEY, MODE_TO_ROUTE_THEME[mode])
  url.searchParams.delete('design')
  url.searchParams.delete('view')
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
}

export function DesignModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DesignMode>(DEFAULT_MODE)

  useEffect(() => {
    const initial = readModeFromLocation() ?? readStoredMode() ?? DEFAULT_MODE
    setModeState(initial)
    applyMode(initial)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const next = readModeFromLocation() ?? readStoredMode() ?? DEFAULT_MODE
      setModeState(next)
      applyMode(next)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const setMode = (next: DesignMode) => {
    setModeState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    applyMode(next)
    syncUrl(next)
  }

  const value = useMemo(() => ({ mode, setMode }), [mode])

  return <DesignModeContext.Provider value={value}>{children}</DesignModeContext.Provider>
}

export function useDesignMode() {
  const context = useContext(DesignModeContext)
  if (!context) {
    throw new Error('useDesignMode must be used within DesignModeProvider')
  }
  return context
}
