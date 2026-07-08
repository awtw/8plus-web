'use client'

import { useEffect, useState, type RefObject } from 'react'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '@/lib/motion/gsap-client'

type UseScrollPinProgressOptions = {
  end?: string
  scrub?: number
}

export function useScrollPinProgress(
  sectionRef: RefObject<HTMLElement | null>,
  pinRef: RefObject<HTMLElement | null>,
  options?: UseScrollPinProgressOptions,
) {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const end = options?.end ?? '+=180%'
  const scrub = options?.scrub ?? 0.65

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
        end,
        pin,
        pinSpacing: true,
        scrub,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      })
    }, section)

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(refreshId)
      ctx.revert()
    }
  }, [sectionRef, pinRef, reducedMotion, end, scrub])

  return progress
}
