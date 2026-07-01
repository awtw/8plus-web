'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/components/language-provider'
import { ensureGsapPlugins, ScrollTrigger } from '@/lib/motion/gsap-client'
import type { HomeScrollLocale } from '@/lib/content/home-scroll'
import { ChapterLogo } from '@/components/home/scroll-story/chapter-logo'
import { ChapterStory } from '@/components/home/scroll-story/chapter-story'
import { ChapterProgressNav } from '@/components/home/scroll-story/chapter-progress-nav'

function toHomeScrollLocale(locale: string): HomeScrollLocale {
  return locale === 'en' ? 'en' : 'zh-TW'
}

export function ScrollStoryRoot() {
  const { locale } = useLanguage()
  const scrollLocale = toHomeScrollLocale(locale)

  useEffect(() => {
    ensureGsapPlugins()
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => window.cancelAnimationFrame(id)
  }, [scrollLocale])

  return (
    <div className="scroll-story-root">
      <ChapterProgressNav />
      <ChapterLogo locale={scrollLocale} />
      <ChapterStory locale={scrollLocale} />
    </div>
  )
}
