'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/components/language-provider'
import { ensureGsapPlugins, ScrollTrigger } from '@/lib/motion/gsap-client'
import { HERO_NARRATIVE_CHAPTER_IDS } from '@/lib/content/hero-narrative'
import type { HeroNarrativeLocale } from '@/lib/content/hero-narrative'
import { ChapterProgressNav } from '@/components/home/scroll-story/chapter-progress-nav'
import { ChapterVoid } from '@/components/home/scroll-story/chapter-void'
import { ChapterHandNarrative } from '@/components/home/scroll-story/chapter-hand-narrative'
import { ChapterManifesto } from '@/components/home/scroll-story/chapter-manifesto'
import { ChapterPortal } from '@/components/home/scroll-story/chapter-portal'

function toHeroNarrativeLocale(locale: string): HeroNarrativeLocale {
  return locale === 'en' ? 'en' : 'zh-TW'
}

export function ScrollStoryRoot() {
  const { locale } = useLanguage()
  const narrativeLocale = toHeroNarrativeLocale(locale)

  useEffect(() => {
    ensureGsapPlugins()
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => window.cancelAnimationFrame(id)
  }, [narrativeLocale])

  return (
    <div className="scroll-story-root scroll-story-root--phase4">
      <ChapterProgressNav chapterIds={HERO_NARRATIVE_CHAPTER_IDS} />
      <ChapterVoid locale={narrativeLocale} />
      <ChapterHandNarrative locale={narrativeLocale} />
      <ChapterManifesto locale={narrativeLocale} />
      <ChapterPortal locale={narrativeLocale} />
    </div>
  )
}
