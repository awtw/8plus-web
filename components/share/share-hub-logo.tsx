'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ensureGsapPlugins, gsap } from '@/lib/motion/gsap-client'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type ShareHubLogoProps = {
  className?: string
  /** Optional fixed px size; omit to fill parent */
  size?: number
}

export function ShareHubLogo({ className, size }: ShareHubLogoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<SVGGElement>(null)
  const markGroupRef = useRef<SVGGElement>(null)
  const circleTopRef = useRef<SVGCircleElement>(null)
  const circleBottomRef = useRef<SVGCircleElement>(null)
  const slashRef = useRef<SVGPathElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const glow = glowRef.current
    const orbit = orbitRef.current
    const markGroup = markGroupRef.current
    const circleTop = circleTopRef.current
    const circleBottom = circleBottomRef.current
    const slash = slashRef.current

    if (!root || !glow || !orbit || !markGroup || !circleTop || !circleBottom || !slash) return

    ensureGsapPlugins()

    if (reduced) {
      gsap.set([glow, orbit, markGroup, circleTop, circleBottom, slash], {
        opacity: 1,
        clearProps: 'transform',
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(glow, { opacity: 0, scale: 0.88 })
      gsap.set(orbit, { opacity: 0, rotation: -16, transformOrigin: '50px 50px' })
      gsap.set(markGroup, { scale: 1, transformOrigin: '50px 50px' })
      gsap.set(circleTop, { opacity: 0, x: -11, y: -10, scale: 0.84, transformOrigin: '32px 29px' })
      gsap.set(circleBottom, { opacity: 0, x: 12, y: 11, scale: 0.84, transformOrigin: '70px 64px' })
      gsap.set(slash, { opacity: 0, scale: 0.2, rotation: -10, transformOrigin: '50px 50px' })

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .to(glow, { opacity: 0.5, scale: 1, duration: 1.05 }, 0.08)
        .to(orbit, { opacity: 0.55, rotation: 22, duration: 1.05 }, 0.1)
        .to(circleTop, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95 }, 0.18)
        .to(circleBottom, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95 }, 0.34)
        .to(slash, { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'power2.inOut' }, 0.58)
        .to(
          markGroup,
          { scale: 1.035, duration: 0.11, ease: 'power2.out', yoyo: true, repeat: 1 },
          1.02,
        )
        .to(orbit, { rotation: 0, opacity: 0.16, duration: 0.55, ease: 'power2.out' }, 1.05)

      gsap.to(glow, {
        opacity: 0.62,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.2,
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  const markStyle = size ? { width: Math.round(size * 0.72), height: Math.round(size * 0.72) } : undefined

  return (
    <div
      ref={rootRef}
      className={cn('share-hub-logo relative inline-flex h-full w-full items-center justify-center', className)}
      style={size ? { width: size, height: size } : undefined}
    >
      <div ref={glowRef} className="share-hub-logo-glow" aria-hidden />

      <svg
        viewBox="0 0 100 100"
        className="share-hub-logo-stage relative z-[1] h-[88%] w-[88%]"
        style={markStyle ? { width: '88%', height: '88%' } : undefined}
        role="img"
        aria-label="8plus"
      >
        <g ref={orbitRef} className="share-hub-logo-orbit">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="5 14"
            strokeLinecap="round"
          />
        </g>

        <g ref={markGroupRef} className="share-hub-logo-mark" fill="var(--logo-mark)">
          <circle ref={circleTopRef} cx="32" cy="29" r="18" />
          <path ref={slashRef} d="M53 9H68L36 91H21L53 9Z" />
          <circle ref={circleBottomRef} cx="70" cy="64" r="28" />
        </g>
      </svg>
    </div>
  )
}
