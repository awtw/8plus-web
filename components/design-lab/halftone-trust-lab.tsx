'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { HeroHalftoneTrust } from '@/components/home/hero-halftone-trust'
import { LuminaShell } from '@/components/home/lumina-shell'
import { useScrollPinProgress } from '@/components/design-lab/use-scroll-pin-progress'

export function HalftoneTrustLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progress = useScrollPinProgress(sectionRef, pinRef, { end: '+=140%' })

  return (
    <LuminaShell>
      <div className="aw-lab-grid-scroll-lab">
        <header className="aw-lab-grid-scroll-chrome section-shell">
          <p className="aw-lab-eyebrow">Hero · R5-06 Halftone Trust</p>
          <h1 className="aw-lab-title">半調信任 · 極簡黑底</h1>
          <p className="aw-lab-lead">
            handshake 主體幾乎靜止。Scroll 僅微調曝光與 vignette。禁 glow、粒子、霓虹。
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
            <HeroHalftoneTrust
              className="hero-halftone-trust-root--stage"
              progress={progress}
            />
            <p className="aw-lab-grid-scroll-cue">↓ 捲動以微調曝光</p>
          </div>
        </section>

        <section className="aw-lab-grid-scroll-tail section-shell">
          <h2 className="aw-lab-section-title">Scroll 尾段</h2>
          <p className="aw-lab-lead">
            B2B 克制路線。主體自進場即完整，敘事靠文案層而非動畫炫技。
          </p>
        </section>
      </div>
    </LuminaShell>
  )
}
