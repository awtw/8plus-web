'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { getGridAssembleMotion } from '@/lib/hero/grid-assemble-motion'
import { useInteractiveTilt } from '@/components/motion/use-interactive-tilt'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type HeroGridAssembleProps = {
  className?: string
  autoPlay?: boolean
  showHud?: boolean
}

const LOOP_MS = 4500
const HANDSHAKE = '/ci/handshake.png'
const SQUARE_L = '/ci/square_line.png'
const SQUARE_R = '/ci/squrare_2.png'

const CORNER_PATHS = [
  'M 80 200 L 80 80 L 200 80',
  'M 920 200 L 920 80 L 800 80',
  'M 80 800 L 80 920 L 200 920',
  'M 920 800 L 920 920 L 800 920',
]

export function HeroGridAssemble({
  className,
  autoPlay = true,
  showHud = true,
}: HeroGridAssembleProps) {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const tilt = useInteractiveTilt(rootRef, { enabled: !reducedMotion, smoothing: 0.07 })
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0)
  const [needsTiltPrompt, setNeedsTiltPrompt] = useState(false)

  useEffect(() => {
    if (!autoPlay || reducedMotion) {
      setProgress(1)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      setProgress(((now - start) % LOOP_MS) / LOOP_MS)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [autoPlay, reducedMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as Window & { MSStream?: unknown }).MSStream
    setNeedsTiltPrompt(coarse && ios && !tilt.tiltEnabled)
  }, [tilt.tiltEnabled])

  const m = useMemo(
    () => getGridAssembleMotion(progress, tilt, 0, reducedMotion),
    [progress, tilt, reducedMotion],
  )

  return (
    <div
      ref={rootRef}
      className={className ?? 'hero-grid-assemble-root'}
      aria-hidden={!showHud}
    >
      <div className="hero-grid-assemble-base" />

      <div className="hero-grid-assemble-poster-stage">
        <img
          src={HANDSHAKE}
          alt=""
          className="hero-grid-assemble-poster"
          style={{
            opacity: m.posterOpacity,
            transform: `
              translate3d(${m.parallaxX * 0.4}px, ${m.parallaxY * 0.4}px, 0)
              scale(${m.posterScale})
            `,
          }}
          draggable={false}
        />
      </div>

      <svg
        className="hero-grid-assemble-frame"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-grid`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g stroke={`url(#${uid}-grid)`} fill="none" opacity={m.frame}>
          {CORNER_PATHS.map((d, i) => (
            <path
              key={d}
              d={d}
              strokeWidth="1"
              strokeDasharray="120 200"
              style={{ strokeDashoffset: 120 - m.frame * 120 + i * 20 }}
            />
          ))}
          <line x1={500} y1={120} x2={500} y2={880} stroke="#e2e8f0" strokeWidth="0.8" opacity={m.seamGlow} />
        </g>
      </svg>

      <div className="hero-grid-assemble-doors">
        <div
          className="hero-grid-assemble-door hero-grid-assemble-door-left"
          style={{
            transform: `translate3d(${m.leftX}%, ${m.parallaxY * 0.3}px, 0)`,
            opacity: m.gridOpacity,
          }}
        >
          <img src={SQUARE_L} alt="" draggable={false} />
        </div>
        <div
          className="hero-grid-assemble-door hero-grid-assemble-door-right"
          style={{
            transform: `translate3d(${m.rightX}%, ${m.parallaxY * 0.3}px, 0)`,
            opacity: m.gridOpacity,
          }}
        >
          <img src={SQUARE_R} alt="" draggable={false} />
        </div>
      </div>

      <div className="hero-grid-assemble-seam" style={{ opacity: m.seamGlow }} />

      <div className="hero-grid-assemble-vignette" />

      {showHud ? (
        <div className="hero-grid-assemble-hud">
          <span className="hero-grid-assemble-hud-tag">L03 · GRID ASSEMBLE</span>
          <span className="hero-grid-assemble-hud-coord">
            {tilt.source === 'tilt' ? 'GYRO' : 'POINTER'}
          </span>
        </div>
      ) : null}

      {needsTiltPrompt ? (
        <button
          type="button"
          className="hero-grid-assemble-tilt-cta"
          onClick={() => void tilt.requestTiltPermission()}
        >
          啟用陀螺儀視差
        </button>
      ) : null}
    </div>
  )
}

export function HeroGridAssembleStatic({ className }: { className?: string }) {
  return <HeroGridAssemble className={className} autoPlay={false} />
}
