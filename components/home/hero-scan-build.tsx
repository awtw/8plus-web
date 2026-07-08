'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { getScanBuildMotion } from '@/lib/hero/scan-build-motion'
import { useInteractiveTilt } from '@/components/motion/use-interactive-tilt'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type HeroScanBuildProps = {
  className?: string
  autoPlay?: boolean
  showHud?: boolean
}

const LOOP_MS = 4200
const HANDSHAKE = '/ci/handshake.png'

const FRAME_PATHS = [
  'M 120 180 L 120 120 L 180 120',
  'M 820 180 L 820 120 L 760 120',
  'M 120 820 L 120 880 L 180 880',
  'M 820 820 L 820 880 L 760 880',
  'M 200 120 L 800 120',
  'M 200 880 L 800 880',
  'M 120 200 L 120 800',
  'M 880 200 L 880 800',
]

export function HeroScanBuild({
  className,
  autoPlay = true,
  showHud = true,
}: HeroScanBuildProps) {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const tilt = useInteractiveTilt(rootRef, { enabled: !reducedMotion, smoothing: 0.07 })
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0)
  const [timeSec, setTimeSec] = useState(0)
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
    if (reducedMotion) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      setTimeSec((now - start) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as Window & { MSStream?: unknown }).MSStream
    setNeedsTiltPrompt(coarse && ios && !tilt.tiltEnabled)
  }, [tilt.tiltEnabled])

  const m = useMemo(
    () => getScanBuildMotion(progress, tilt, timeSec, reducedMotion),
    [progress, tilt, timeSec, reducedMotion],
  )

  const revealClip = `${(1 - m.reveal) * 100}%`

  return (
    <div
      ref={rootRef}
      className={className ?? 'hero-scan-build-root'}
      aria-hidden={!showHud}
    >
      <div className="hero-scan-build-base" />

      <div
        className="hero-scan-build-grid"
        style={{
          transform: `translate3d(${m.parallaxX * 0.5}px, ${m.parallaxY * 0.5}px, 0)`,
          opacity: 0.08 + m.frame * 0.1,
        }}
      />

      <svg
        className="hero-scan-build-frame"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-scan`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g stroke="#94a3b8" fill="none" opacity={m.frame * 0.85}>
          {FRAME_PATHS.map((d, i) => (
            <path
              key={d}
              d={d}
              strokeWidth={0.9}
              strokeDasharray="200 400"
              className="hero-scan-build-frame-path"
              style={{
                strokeDashoffset: 200 - m.frame * 200 + i * 18,
                opacity: 0.3 + m.frame * 0.6,
              }}
            />
          ))}
        </g>

        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1={140}
            y1={200 + i * 120}
            x2={860}
            y2={200 + i * 120}
            stroke={`url(#${uid}-scan)`}
            strokeWidth="0.6"
            opacity={m.frame * 0.35}
            strokeDasharray="8 16"
            style={{ strokeDashoffset: m.linePhase * 40 + i * 6 }}
          />
        ))}
      </svg>

      <div className="hero-scan-build-stage">
        <div
          className="hero-scan-build-hand-wrap"
          style={{
            clipPath: `inset(${revealClip} 0 0 0)`,
            transform: `
              translate3d(${m.parallaxX}px, ${m.parallaxY}px, 0)
              scale(${m.handScale})
            `,
            opacity: m.handOpacity,
          }}
        >
          <img src={HANDSHAKE} alt="" className="hero-scan-build-hand" draggable={false} />
        </div>
      </div>

      <div
        className="hero-scan-build-band"
        style={{
          top: `${m.scanY}%`,
          opacity: m.scanGlow,
        }}
      />

      <div className="hero-scan-build-vignette" />

      {showHud ? (
        <div className="hero-scan-build-hud">
          <span className="hero-scan-build-hud-tag">L06 · SCAN BUILD</span>
          <span className="hero-scan-build-hud-coord">
            {Math.round(m.reveal * 100)}% · {tilt.source === 'tilt' ? 'GYRO' : 'POINTER'}
          </span>
        </div>
      ) : null}

      {needsTiltPrompt ? (
        <button
          type="button"
          className="hero-scan-build-tilt-cta"
          onClick={() => void tilt.requestTiltPermission()}
        >
          啟用陀螺儀視差
        </button>
      ) : null}
    </div>
  )
}

export function HeroScanBuildStatic({ className }: { className?: string }) {
  return <HeroScanBuild className={className} autoPlay={false} />
}
