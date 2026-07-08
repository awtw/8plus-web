'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { HeroGridScroll } from '@/components/home/hero-grid-scroll'
import { LuminaShell } from '@/components/home/lumina-shell'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '@/lib/motion/gsap-client'

export function GridScrollLab() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0)
      return
    }

    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=180%',
        pin,
        pinSpacing: true,
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      })
    }, section)

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(refreshId)
      ctx.revert()
    }
  }, [reducedMotion])

  return (
    <LuminaShell>
      <div className="aw-lab-grid-scroll-lab">
        <header className="aw-lab-grid-scroll-chrome section-shell">
          <p className="aw-lab-eyebrow">Hero · Grid Scroll W0</p>
          <h1 className="aw-lab-title">靜態方格底 · Scroll 驅動</h1>
          <p className="aw-lab-lead">
            未捲動 = 完全靜止。向下捲動才觸發視差、景深、中縫光帶。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/design-lab/line-compose" className="aw-lab-back">
              ← Line Compose
            </Link>
            <Link href="/" className="aw-lab-back aw-lab-back-accent">
              首頁
            </Link>
          </div>
        </header>

        <section ref={sectionRef} className="aw-lab-grid-scroll-pin-section">
          <div ref={pinRef} className="aw-lab-grid-scroll-pin">
            <HeroGridScroll
              className="hero-grid-scroll-root--stage"
              progress={progress}
            />
            <p className="aw-lab-grid-scroll-cue">↓ 捲動以驅動方格場</p>
          </div>
        </section>

        <section className="aw-lab-grid-scroll-tail section-shell">
          <h2 className="aw-lab-section-title">Scroll 尾段</h2>
          <p className="aw-lab-lead">
            方格 pin 結束後進入此區。progress 100% 時中縫與 vignette 最強。
          </p>
          <p className="aw-lab-grid-scroll-tail-note">
            下一步（GS-2）：在 progress 0.6–1.0 疊加終局形體（握手 / 線框）。
          </p>
        </section>
      </div>
    </LuminaShell>
  )
}
