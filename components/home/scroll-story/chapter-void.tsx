'use client'

import { useEffect, useRef, useState } from 'react'
import {
  getHeroNarrativeContent,
  type HeroNarrativeLocale,
} from '@/lib/content/hero-narrative'
import { ensureGsapPlugins, gsap } from '@/lib/motion/gsap-client'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { LogoAssembly } from '@/components/home/scroll-story/logo-assembly'

type ChapterVoidProps = {
  locale: HeroNarrativeLocale
}

export function ChapterVoid({ locale }: ChapterVoidProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const [complete, setComplete] = useState(reduced)
  const content = getHeroNarrativeContent(locale)

  useEffect(() => {
    const wrap = wrapRef.current
    const pin = pinRef.current
    const logoWrap = logoWrapRef.current
    const tag = tagRef.current
    if (!wrap || !pin || !logoWrap) return

    ensureGsapPlugins()

    if (reduced) {
      gsap.set([logoWrap, tag], { opacity: 1, clearProps: 'transform' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(tag, { opacity: 0, y: 8 })

      gsap.timeline({ delay: 1.1, onComplete: () => setComplete(true) }).to(tag, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: '+=90%',
          pin,
          scrub: 0.9,
          anticipatePin: 1,
        },
      })
        .to(logoWrap, { scale: 0.28, x: '-38vw', y: '-38vh', duration: 1, ease: 'power2.inOut' }, 0)
        .to(tag, { opacity: 0, duration: 0.35 }, 0.15)
    }, wrap)

    return () => ctx.revert()
  }, [locale, reduced])

  return (
    <div ref={wrapRef} className="scroll-void-pin-wrap">
      <section
        id="chapter-void"
        data-chapter="0"
        className="scroll-chapter scroll-chapter-void"
        aria-label="Chapter 00 — Void"
      >
        <div ref={pinRef} className="scroll-void-pin-panel">
          <p ref={tagRef} className="scroll-void-tag">
            {content.void.tag}
          </p>
          <div ref={logoWrapRef} className="scroll-void-logo-wrap">
            <LogoAssembly size={300} className="scroll-logo-stage scroll-logo-stage-void" />
          </div>
          {complete ? (
            <div className="scroll-void-caption">
              <p className="scroll-eyebrow">{content.void.eyebrow}</p>
              <h1 className="scroll-display-brand">{content.void.brand}</h1>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
