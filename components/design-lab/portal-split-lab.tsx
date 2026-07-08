'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { HeroPortalSplit } from '@/components/home/hero-portal-split'
import { LuminaShell } from '@/components/home/lumina-shell'
import { useScrollPinProgress } from '@/components/design-lab/use-scroll-pin-progress'

export function PortalSplitLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progress = useScrollPinProgress(sectionRef, pinRef)

  return (
    <LuminaShell>
      <div className="aw-lab-grid-scroll-lab">
        <header className="aw-lab-grid-scroll-chrome section-shell">
          <p className="aw-lab-eyebrow">Hero · R5-05 Portal Split</p>
          <h1 className="aw-lab-title">方格門扇 · Scroll 裂開</h1>
          <p className="aw-lab-lead">
            進場合攏。捲動驅動左右門扇外滑，handshake 顯影。無 autoplay、無滑鼠視差。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/design-lab/r5" className="aw-lab-back">
              ← R5 選型
            </Link>
            <Link href="/" className="aw-lab-back aw-lab-back-accent">
              首頁
            </Link>
          </div>
        </header>

        <section ref={sectionRef} className="aw-lab-grid-scroll-pin-section">
          <div ref={pinRef} className="aw-lab-grid-scroll-pin">
            <HeroPortalSplit
              className="hero-portal-split-root--stage"
              progress={progress}
            />
            <p className="aw-lab-grid-scroll-cue">↓ 捲動以裂開門扇</p>
          </div>
        </section>

        <section className="aw-lab-grid-scroll-tail section-shell">
          <h2 className="aw-lab-section-title">Scroll 尾段</h2>
          <p className="aw-lab-lead">
            progress 100% 時門扇全開、握手主體定住。
          </p>
        </section>
      </div>
    </LuminaShell>
  )
}
