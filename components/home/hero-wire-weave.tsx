'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { getWireWeaveMotion } from '@/lib/hero/wire-weave-motion'
import { useInteractiveTilt } from '@/components/motion/use-interactive-tilt'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type HeroWireWeaveProps = {
  className?: string
  autoPlay?: boolean
  showHud?: boolean
}

const LOOP_MS = 4000
const WIRE_LEFT = '/ci/whitelinehand_1.png'
const WIRE_RIGHT = '/ci/whitelinehand_2.png'
const WEAVE_COUNT = 7

export function HeroWireWeave({
  className,
  autoPlay = true,
  showHud = true,
}: HeroWireWeaveProps) {
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
    () => getWireWeaveMotion(progress, tilt, timeSec, reducedMotion),
    [progress, tilt, timeSec, reducedMotion],
  )

  const weaveLines = useMemo(
    () =>
      Array.from({ length: WEAVE_COUNT }, (_, i) => {
        const offset = (i - (WEAVE_COUNT - 1) / 2) * 5
        return offset
      }),
    [],
  )

  return (
    <div
      ref={rootRef}
      className={className ?? 'hero-wire-weave-root'}
      aria-hidden={!showHud}
    >
      <div className="hero-wire-weave-base" />

      <div
        className="hero-wire-weave-bg-grid"
        style={{
          transform: `translate3d(${tilt.nx * -10}px, ${tilt.ny * -8}px, 0)`,
          opacity: 0.12 + m.weave * 0.08,
        }}
      />

      <svg
        className="hero-wire-weave-field"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-weave`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0" />
            <stop offset="35%" stopColor="#e2e8f0" stopOpacity="0.7" />
            <stop offset="65%" stopColor="#f8fafc" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
          </linearGradient>
        </defs>

        {weaveLines.map((offset, i) => (
          <line
            key={offset}
            x1={500 + offset}
            y1={80}
            x2={500 + offset}
            y2={920}
            stroke={`url(#${uid}-weave)`}
            strokeWidth={0.7 + (i % 2) * 0.3}
            className="hero-wire-weave-line"
            style={{
              opacity: 0.15 + m.weave * 0.55,
              strokeDashoffset: m.shimmerY + i * 12,
            }}
          />
        ))}

        <line
          x1={500}
          y1={120}
          x2={500}
          y2={880}
          stroke="#f8fafc"
          strokeWidth="1.2"
          className="hero-wire-weave-seam"
          style={{ opacity: m.seamGlow }}
        />
      </svg>

      <div
        className="hero-wire-weave-shimmer"
        style={{
          left: '50%',
          top: `${m.shimmerY}%`,
          opacity: m.seamGlow * 0.85,
          transform: `translateX(-50%) scaleX(${0.6 + m.weave * 0.5})`,
        }}
      />

      <div className="hero-wire-weave-stage">
        <div
          className="hero-wire-weave-group"
          style={{
            transform: `
              rotateX(${m.groupRotateX}deg)
              rotateY(${m.groupRotateY}deg)
              scale(${m.groupScale})
            `,
          }}
        >
          <img
            src={WIRE_LEFT}
            alt=""
            className="hero-wire-weave-hand hero-wire-weave-hand-left"
            style={{
              transform: `translate3d(${m.leftX}%, ${m.leftY}px, 0)`,
              opacity: m.handOpacity,
            }}
            draggable={false}
          />
          <img
            src={WIRE_RIGHT}
            alt=""
            className="hero-wire-weave-hand hero-wire-weave-hand-right"
            style={{
              transform: `translate3d(${m.rightX}%, ${m.rightY}px, 0)`,
              opacity: m.handOpacity,
            }}
            draggable={false}
          />
        </div>
      </div>

      <div className="hero-wire-weave-vignette" />

      {showHud ? (
        <div className="hero-wire-weave-hud">
          <span className="hero-wire-weave-hud-tag">L05 · WIRE WEAVE</span>
          <span className="hero-wire-weave-hud-coord">
            {tilt.source === 'tilt' ? 'GYRO' : tilt.source === 'pointer' ? 'POINTER' : 'IDLE'}
          </span>
        </div>
      ) : null}

      {needsTiltPrompt ? (
        <button
          type="button"
          className="hero-wire-weave-tilt-cta"
          onClick={() => void tilt.requestTiltPermission()}
        >
          啟用陀螺儀視差
        </button>
      ) : null}
    </div>
  )
}

export function HeroWireWeaveStatic({ className }: { className?: string }) {
  return <HeroWireWeave className={className} autoPlay={false} />
}
