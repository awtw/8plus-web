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
  const { locale, setLocale } = useLanguage()
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
        className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-lg ${
          fullWidth 
            ? 'w-full h-12 justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
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
        <div className={`absolute right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] sm:top-full sm:bottom-auto sm:mt-1 sm:mb-0 ${
          fullWidth ? 'w-full left-0' : 'w-40'
        }`}>
          <div className="py-1">
            {locales.map((lng) => (
              <button
                key={lng}
                onClick={() => handleLocaleChange(lng)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                  locale === lng ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                }`}
              >
                <span>{languageFlags[lng]}</span>
                <span>{languageNames[lng]}</span>
                {locale === lng && (
                  <svg className="w-4 h-4 ml-auto text-gray-900" fill="currentColor" viewBox="0 0 20 20">
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
