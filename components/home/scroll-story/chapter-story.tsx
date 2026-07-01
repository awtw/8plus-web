'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { getHomeScrollChapter, type HomeScrollLocale } from '@/lib/content/home-scroll'
import { ensureGsapPlugins, gsap } from '@/lib/motion/gsap-client'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type ChapterStoryProps = {
  locale: HomeScrollLocale
}

export function ChapterStory({ locale }: ChapterStoryProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const beatRefs = useRef<(HTMLElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const chapter = getHomeScrollChapter(locale, 'story')

  useEffect(() => {
    const wrap = wrapRef.current
    const pin = pinRef.current
    const beats = beatRefs.current.filter(Boolean) as HTMLElement[]
    const progress = progressRef.current
    if (!wrap || !pin || beats.length === 0) return

    ensureGsapPlugins()

    if (reduced) {
      gsap.set(beats, { opacity: 1, y: 0, clearProps: 'transform' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(beats, { opacity: 0, y: 32 })
      gsap.set(beats[0], { opacity: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${beats.length * 85}%`,
          pin,
          scrub: 0.85,
          anticipatePin: 1,
        },
      })

      beats.forEach((beat, index) => {
        if (index === 0) return

        const prev = beats[index - 1]
        tl.to(prev, { opacity: 0, y: -28, duration: 0.35, ease: 'power2.inOut' })
        tl.to(beat, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '<0.12')
      })

      if (progress) {
        gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })
        gsap.to(progress, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: `+=${beats.length * 85}%`,
            scrub: 0.85,
          },
        })
      }
    }, wrap)

    return () => ctx.revert()
  }, [locale, reduced, chapter.beats.length])

  return (
    <div ref={wrapRef} className="scroll-story-pin-wrap">
      <section
        id="chapter-story"
        data-chapter="1"
        className="scroll-chapter scroll-chapter-story"
        aria-label="Chapter 01 — Story"
      >
        <div ref={pinRef} className="scroll-story-pin-panel">
          <div className="section-shell scroll-chapter-story-grid">
            <div className="scroll-chapter-story-aside">
              <p className="scroll-eyebrow">01 / STORY</p>
              <div className="scroll-display-stack" aria-hidden>
                {chapter.displayLines.map((line) => (
                  <span key={line} className="scroll-display-word">
                    {line}
                  </span>
                ))}
              </div>
              <div ref={progressRef} className="scroll-story-progress" aria-hidden />
            </div>

            <div className="scroll-chapter-story-main">
              <div className="scroll-story-beats-stage">
                {chapter.beats.map((beat, index) => (
                  <article
                    key={beat.title}
                    ref={(el) => {
                      beatRefs.current[index] = el
                    }}
                    className="scroll-story-beat"
                  >
                    <h2 className="scroll-beat-title">{beat.title}</h2>
                    <p className="scroll-beat-body">{beat.body}</p>
                  </article>
                ))}
              </div>

              <Link href="/path" className="scroll-path-link">
                {chapter.pathCta}
                <ArrowRight className="h-4 w-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
