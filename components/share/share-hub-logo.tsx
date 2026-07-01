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
  const orbitOuterRef = useRef<SVGGElement>(null)
  const orbitInnerRef = useRef<SVGGElement>(null)
  const circleTopRef = useRef<SVGCircleElement>(null)
  const circleBottomRef = useRef<SVGCircleElement>(null)
  const slashRef = useRef<SVGPathElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    const orbitOuter = orbitOuterRef.current
    const orbitInner = orbitInnerRef.current
    const circleTop = circleTopRef.current
    const circleBottom = circleBottomRef.current
    const slash = slashRef.current

    if (!root || !orbitOuter || !orbitInner || !circleTop || !circleBottom || !slash) return

    ensureGsapPlugins()

    if (reduced) {
      gsap.set([orbitOuter, orbitInner, circleTop, circleBottom, slash], {
        opacity: 1,
        clearProps: 'transform',
      })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(orbitOuter, { opacity: 0, rotation: -24, transformOrigin: '50px 50px' })
      gsap.set(orbitInner, { opacity: 0, rotation: 18, transformOrigin: '50px 50px' })
      gsap.set(circleTop, { opacity: 0, x: -16, y: -14, scale: 0.78, transformOrigin: '32px 29px' })
      gsap.set(circleBottom, { opacity: 0, x: 18, y: 16, scale: 0.76, transformOrigin: '70px 64px' })
      gsap.set(slash, { opacity: 0, scale: 0.12, rotation: -14, transformOrigin: '50px 50px' })

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .to(orbitOuter, { opacity: 1, rotation: 0, duration: 0.85 }, 0.1)
        .to(orbitInner, { opacity: 1, rotation: 0, duration: 0.85 }, 0.18)
        .to(circleTop, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8 }, 0.12)
        .to(circleBottom, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8 }, 0.28)
        .to(slash, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'power2.inOut' }, 0.5)

      gsap.to(orbitOuter, {
        rotation: 360,
        duration: 22,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50px 50px',
        delay: 0.9,
      })

      gsap.to(orbitInner, {
        rotation: -360,
        duration: 15,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50px 50px',
        delay: 0.9,
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
      <svg
        viewBox="0 0 100 100"
        className="share-hub-logo-stage relative h-[88%] w-[88%]"
        style={markStyle ? { width: '88%', height: '88%' } : undefined}
        role="img"
        aria-label="8plus"
      >
        <g ref={orbitOuterRef} className="share-hub-logo-orbit share-hub-logo-orbit--outer">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.55"
            strokeDasharray="3.5 7.5"
            strokeLinecap="round"
          />
        </g>

        <g ref={orbitInnerRef} className="share-hub-logo-orbit share-hub-logo-orbit--inner">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="1.5 10"
            strokeLinecap="round"
          />
          <line x1="50" y1="12" x2="50" y2="17" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
          <line x1="88" y1="50" x2="83" y2="50" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
          <line x1="50" y1="88" x2="50" y2="83" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
          <line x1="12" y1="50" x2="17" y2="50" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" />
        </g>

        <g className="share-hub-logo-mark" fill="var(--logo-mark)">
          <circle ref={circleTopRef} cx="32" cy="29" r="18" />
          <path ref={slashRef} d="M53 9H68L36 91H21L53 9Z" />
          <circle ref={circleBottomRef} cx="70" cy="64" r="28" />
        </g>
      </svg>
    </div>
  )
}
