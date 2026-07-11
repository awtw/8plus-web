'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/components/language-provider'
import type { HomeLocale } from '@/lib/content/home-sections'
import { HomeSectionProgressNav } from '@/components/home/home-section-progress-nav'
import { HeroV2 } from '@/components/home/hero/hero-v2'
import { SectionAbout } from '@/components/home/sections/section-about'
import { SectionLab } from '@/components/home/sections/section-lab'
import { SectionPath } from '@/components/home/sections/section-path'
import { SectionServices } from '@/components/home/sections/section-services'
import { SectionBooking } from '@/components/home/sections/section-booking'
import { ensureGsapPlugins, ScrollTrigger } from '@/lib/motion/gsap-client'

function toHomeLocale(locale: string): HomeLocale {
  return locale === 'en' ? 'en' : 'zh-TW'
}

export function HomeScrollRoot() {
  const { locale } = useLanguage()
  const homeLocale = toHomeLocale(locale)

  useEffect(() => {
    ensureGsapPlugins()
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [homeLocale])

  return (
    <div className="home-scroll-root">
      <HomeSectionProgressNav />
      <HeroV2 locale={homeLocale} />
      <SectionAbout locale={homeLocale} />
      <SectionLab locale={homeLocale} />
      <SectionPath locale={homeLocale} />
      <SectionServices locale={homeLocale} />
      <SectionBooking locale={homeLocale} />
    </div>
  )
}
