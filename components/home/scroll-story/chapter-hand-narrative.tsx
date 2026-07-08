'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  getHeroNarrativeContent,
  type HeroNarrativeLocale,
} from '@/lib/content/hero-narrative'
import { getHeroNarrativePhases } from '@/lib/three/procedural-hand'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '@/lib/motion/gsap-client'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { Logo } from '@/components/logo'

const HeroHandNarrativeScene = dynamic(() => import('@/components/home/three/hero-hand-narrative-scene'), {
  ssr: false,
})

type ChapterHandNarrativeProps = {
  locale: HeroNarrativeLocale
}

export function ChapterHandNarrative({ locale }: ChapterHandNarrativeProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stampRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const content = getHeroNarrativeContent(locale)
  const phases = getHeroNarrativePhases(progress)

  const phaseCopy =
    phases.label === 'mesh' ? content.mesh : phases.label === 'reach' ? content.reach : content.handshake

  useEffect(() => {
    const wrap = wrapRef.current
    const pin = pinRef.current
    if (!wrap || !pin) return

    ensureGsapPlugins()

    if (reduced) {
      setProgress(1)
      return
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: '+=420%',
        pin,
        scrub: 0.85,
        anticipatePin: 1,
        onUpdate: (self) => setProgress(self.progress),
      })
    }, wrap)

    return () => ctx.revert()
  }, [locale, reduced])

  useEffect(() => {
    const stamp = stampRef.current
    if (!stamp || reduced) return
    const stampOpacity = getHeroNarrativePhases(progress).logoStamp
    gsap.set(stamp, { opacity: stampOpacity, scale: 0.85 + stampOpacity * 0.15 })
  }, [progress, reduced])

  return (
    <div ref={wrapRef} className="scroll-hand-pin-wrap">
      <section
        id="chapter-hand"
        data-chapter="1"
        className="scroll-chapter scroll-chapter-hand"
        aria-label="Chapter 01–03 — Hand narrative"
      >
        <div ref={pinRef} className="scroll-hand-pin-panel">
          <div className="scroll-hand-canvas-layer" aria-hidden>
            {reduced ? (
              <div className="scroll-hand-fallback">
                <p>{content.handshake.title}</p>
              </div>
            ) : (
              <Suspense fallback={<div className="scroll-hand-fallback">載入…</div>}>
                <HeroHandNarrativeScene progress={progress} />
              </Suspense>
            )}
          </div>

          <div className="scroll-hand-logo-corner" aria-hidden>
            <Logo size={28} className="scroll-hand-corner-logo" />
          </div>

          <div ref={stampRef} className="scroll-hand-logo-stamp" aria-hidden>
            <Logo size={56} className="scroll-hand-stamp-logo" />
          </div>

          <div className="scroll-hand-copy section-shell">
            <p className="scroll-eyebrow">{phaseCopy.eyebrow}</p>
            <h2 className="scroll-hand-title">{phaseCopy.title}</h2>
            <p className="scroll-hand-lead">{phaseCopy.lead}</p>
            {phases.label === 'handshake' && progress > 0.75 ? (
              <Link href="/booking" className="scroll-hand-cta">
                {locale === 'zh-TW' ? '預約諮詢' : 'Book a call'}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
