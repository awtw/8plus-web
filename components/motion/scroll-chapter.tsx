'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '@/lib/motion/gsap-client'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type ScrollChapterProps = {
  id: string
  index: number
  pin?: boolean
  pinSpacing?: boolean
  className?: string
  children: ReactNode
  onEnter?: () => void
}

/**
 * GSAP ScrollTrigger chapter wrapper — W0 skeleton for pin/scrub narratives.
 * W1+ will extend with scrub timelines.
 */
export function ScrollChapter({
  id,
  index,
  pin = false,
  pinSpacing = true,
  className,
  children,
  onEnter,
}: ScrollChapterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = sectionRef.current
    if (!el) return

    ensureGsapPlugins()

    const trigger = ScrollTrigger.create({
      id: `chapter-${id}`,
      trigger: el,
      start: 'top 80%',
      end: pin ? '+=100%' : undefined,
      pin: pin || undefined,
      pinSpacing: pin ? pinSpacing : undefined,
      onEnter: () => onEnter?.(),
      markers: process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SCROLL_DEBUG === '1',
    })

    return () => {
      trigger.kill()
    }
  }, [id, index, pin, pinSpacing, reduced, onEnter])

  useEffect(() => {
    if (reduced) return
    const el = sectionRef.current
    if (!el) return

    ensureGsapPlugins()
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id={id}
      data-chapter={index}
      className={className}
      aria-label={`Chapter ${String(index).padStart(2, '0')}`}
    >
      {children}
    </section>
  )
}
