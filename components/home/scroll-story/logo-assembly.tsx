'use client'

import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/motion/gsap-client'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type LogoAssemblyProps = {
  className?: string
  size?: number
}

export function LogoAssembly({ className, size = 320 }: LogoAssemblyProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const circleTopRef = useRef<SVGCircleElement>(null)
  const circleBottomRef = useRef<SVGCircleElement>(null)
  const slashRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const circleTop = circleTopRef.current
    const circleBottom = circleBottomRef.current
    const slash = slashRef.current
    const glow = glowRef.current
    if (!wrap || !circleTop || !circleBottom || !slash || !glow) return

    ensureGsapPlugins()

    if (reduced) {
      gsap.set([circleTop, circleBottom, slash, glow], { opacity: 1, clearProps: 'transform' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(circleTop, { opacity: 0, x: -36, y: -28, scale: 0.72, transformOrigin: '32px 29px' })
      gsap.set(circleBottom, { opacity: 0, x: 42, y: 34, scale: 0.68, transformOrigin: '70px 64px' })
      gsap.set(slash, { opacity: 0, scale: 0.15, rotation: -18, transformOrigin: '50px 50px' })
      gsap.set(glow, { opacity: 0, scale: 0.85 })

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .to(glow, { opacity: 1, scale: 1, duration: 1.1 }, 0)
        .to(circleTop, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95 }, 0.15)
        .to(circleBottom, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95 }, 0.35)
        .to(slash, { opacity: 1, scale: 1, rotation: 0, duration: 0.65, ease: 'power2.inOut' }, 0.72)

      gsap.to(wrap, {
        y: -24,
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }, wrap)

    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={wrapRef} className={className}>
      <div ref={glowRef} className="scroll-logo-glow" aria-hidden />
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="scroll-logo-svg"
        role="img"
        aria-label="8plus"
      >
        <g fill="var(--logo-mark)">
          <circle ref={circleTopRef} cx="32" cy="29" r="18" />
          <path ref={slashRef} d="M53 9H68L36 91H21L53 9Z" />
          <circle ref={circleBottomRef} cx="70" cy="64" r="28" />
        </g>
      </svg>
    </div>
  )
}
