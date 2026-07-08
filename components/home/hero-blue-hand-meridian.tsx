'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  buildMeridianPaths,
  getBlueHandMeridianMotion,
} from '@/lib/hero/blue-hand-meridian-motion'
import { useInteractiveTilt } from '@/components/motion/use-interactive-tilt'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type HeroBlueHandMeridianProps = {
  className?: string
  showHud?: boolean
}

export function HeroBlueHandMeridian({
  className,
  showHud = true,
}: HeroBlueHandMeridianProps) {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const tilt = useInteractiveTilt(rootRef, { enabled: !reducedMotion })
  const [timeSec, setTimeSec] = useState(0)
  const [needsTiltPrompt, setNeedsTiltPrompt] = useState(false)

  const paths = useMemo(() => buildMeridianPaths(), [])

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
    const needsPermission = typeof DeviceOrientationEvent !== 'undefined' && ios
    setNeedsTiltPrompt(coarse && needsPermission && !tilt.tiltEnabled)
  }, [tilt.tiltEnabled])

  const m = useMemo(
    () => getBlueHandMeridianMotion(tilt, timeSec, reducedMotion),
    [tilt, timeSec, reducedMotion],
  )

  return (
    <div
      ref={rootRef}
      className={className ?? 'hero-blue-meridian-root'}
      aria-hidden={!showHud}
    >
      <div className="hero-blue-meridian-base" />

      <div
        className="hero-blue-meridian-bg hero-blue-meridian-bg-deep"
        style={{ transform: `translate3d(${m.bgDeepX}px, ${m.bgDeepY}px, 0) scale(1.18)` }}
      >
        <img src="/ci/blueline.png" alt="" draggable={false} />
      </div>
      <div
        className="hero-blue-meridian-bg hero-blue-meridian-bg-mid"
        style={{ transform: `translate3d(${m.bgMidX}px, ${m.bgMidY}px, 0) scale(1.1)` }}
      >
        <img src="/ci/lines.png" alt="" draggable={false} />
      </div>
      <div
        className="hero-blue-meridian-bg hero-blue-meridian-bg-near"
        style={{ transform: `translate3d(${m.bgNearX}px, ${m.bgNearY}px, 0)` }}
      >
        <img src="/ci/blueline.png" alt="" draggable={false} />
      </div>

      <svg
        className="hero-blue-meridian-field"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: `rotate(${m.fieldRotate}deg)` }}
      >
        <defs>
          <linearGradient id={`${uid}-meridian`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${uid}-core`} cx="50%" cy="52%" r="42%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="500" cy="520" rx="420" ry="300" fill={`url(#${uid}-core)`} />

        <g className="hero-blue-meridian-radials" stroke={`url(#${uid}-meridian)`}>
          {paths.radials.map((d, i) => (
            <path
              key={`r-${i}`}
              d={d}
              fill="none"
              strokeWidth={0.65}
              strokeDasharray="6 22"
              style={{
                strokeDashoffset: m.streamPhase * 40 + i * 3,
                opacity: 0.25 + (i % 3) * 0.08,
              }}
            />
          ))}
        </g>

        <g className="hero-blue-meridian-arcs" stroke="#38bdf8" fill="none">
          {paths.arcs.map((d, i) => (
            <path
              key={`a-${i}`}
              d={d}
              strokeWidth={0.5 + (i % 2) * 0.2}
              strokeDasharray="120 180"
              style={{
                strokeDashoffset: -m.streamPhase * 60 - i * 18,
                opacity: 0.18 + i * 0.04,
              }}
            />
          ))}
        </g>

        <ellipse
          cx="500"
          cy="520"
          rx={200}
          ry={140}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="0.8"
          strokeDasharray="8 14"
          className="hero-blue-meridian-scan-ring"
          style={{
            transform: `rotate(${m.ringRotate}deg) scale(${m.ringScale})`,
            transformOrigin: '500px 520px',
            opacity: 0.35 + m.handGlow * 0.25,
          }}
        />
      </svg>

      <div className="hero-blue-meridian-stage">
        <div
          className="hero-blue-meridian-hand-wrap"
          style={{
            transform: `
              rotateX(${m.handRotateX}deg)
              rotateY(${m.handRotateY}deg)
              translate3d(${m.handTranslateX}px, ${m.handTranslateY}px, ${m.handTranslateZ}px)
              scale(${m.handScale})
            `,
            filter:
              m.chroma > 0.12
                ? `drop-shadow(0 0 28px rgba(56,189,248,${m.handGlow * 0.5})) hue-rotate(${m.chroma * 4}deg)`
                : `drop-shadow(0 0 28px rgba(56,189,248,${m.handGlow * 0.5}))`,
          }}
        >
          <div
            className="hero-blue-meridian-hand-glow"
            style={{ opacity: m.handGlow }}
          />
          <img
            src="/ci/blue_line_hand.svg"
            alt=""
            className="hero-blue-meridian-hand"
            draggable={false}
          />
        </div>
      </div>

      <div
        className="hero-blue-meridian-cursor-glow"
        style={{
          left: `${m.cursorGlowX}%`,
          top: `${m.cursorGlowY}%`,
          opacity: tilt.active ? 0.55 : 0.2,
        }}
      />

      <div className="hero-blue-meridian-vignette" />

      {showHud ? (
        <div className="hero-blue-meridian-hud" style={{ opacity: m.hudOpacity }}>
          <span className="hero-blue-meridian-hud-tag">BLUEPRINT · REACH</span>
          <span className="hero-blue-meridian-hud-coord">
            {tilt.source === 'tilt' ? 'GYRO' : tilt.source === 'pointer' ? 'POINTER' : 'IDLE'}
            {' · '}
            {(tilt.nx * 100).toFixed(0)} / {(tilt.ny * 100).toFixed(0)}
          </span>
          <span className="hero-blue-meridian-hud-mark">8+</span>
        </div>
      ) : null}

      {needsTiltPrompt ? (
        <button
          type="button"
          className="hero-blue-meridian-tilt-cta"
          onClick={() => void tilt.requestTiltPermission()}
        >
          啟用陀螺儀視差
        </button>
      ) : null}
    </div>
  )
}
