'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from './language-provider'
import { locales, type Locale } from '@/lib/i18n'

const languageNames: Record<Locale, string> = {
  'zh-TW': '繁體中文',
  'en': 'English'
}

const languageFlags: Record<Locale, string> = {
  'zh-TW': '🇹🇼',
  'en': '🇺🇸'
}

interface LanguageSwitcherProps {
  fullWidth?: boolean
}

export default function LanguageSwitcher({ fullWidth = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-full border border-border/70 bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ${
          fullWidth 
            ? 'w-full h-12 justify-center text-[color:var(--fg)] hover:bg-[color:var(--hover-bg)]' 
            : 'text-[color:var(--fg-2)] hover:text-[color:var(--hover-fg)] hover:bg-[color:var(--hover-bg)]'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={t('common.selectLanguage')}
      >
        <span>{languageFlags[locale]}</span>
        <span className={fullWidth ? 'inline' : 'hidden sm:inline'}>{languageNames[locale]}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div role="menu" className={`absolute right-0 bottom-full mb-1 bg-background border border-border/70 rounded-[22px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-[9999] sm:top-full sm:bottom-auto sm:mt-1 sm:mb-0 ${
          fullWidth ? 'w-full left-0' : 'w-40'
        }`}>
          <div className="py-1">
            {locales.map((lng) => (
              <button
                key={lng}
                role="menuitem"
                onClick={() => handleLocaleChange(lng)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-[color:var(--hover-bg)] transition-colors ${
                  locale === lng ? 'bg-[color:var(--hover-bg-strong)] text-[color:var(--fg)]' : 'text-[color:var(--fg-2)]'
                }`}
              >
                <span>{languageFlags[lng]}</span>
                <span>{languageNames[lng]}</span>
                {locale === lng && (
                  <svg className="w-4 h-4 ml-auto text-[color:var(--fg)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
