'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { ArchitectureDiagram } from '@/components/home/architecture-diagram'

export function HeroVisual() {
  const { t } = useLanguage()

  return (
    <div className="editorial-hero-visual" aria-hidden>
      <div className="editorial-hero-backlight" />
      <p className="editorial-vertical-rail hidden lg:block">{t('home.heroVerticalRail')}</p>

      <div className="editorial-silhouette-wrap">
        <Image
          src="/logo-mono-1024.png"
          alt=""
          width={640}
          height={640}
          priority
          className="editorial-silhouette"
        />
        <div className="editorial-silhouette-rim" />
      </div>

      <div className="editorial-visual-overlay">
        <ArchitectureDiagram variant="overlay" />
      </div>

      <div className="editorial-pixel-cluster">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="editorial-visual-fade" />
    </div>
  )
}
