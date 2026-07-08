'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { getHalftoneSplitMotion } from '@/lib/hero/halftone-split-motion'
import { useInteractiveTilt } from '@/components/motion/use-interactive-tilt'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type HeroHalftoneSplitProps = {
  className?: string
  autoPlay?: boolean
  showHud?: boolean
}

const LOOP_MS = 4000
const HANDSHAKE = '/ci/handshake.png'
const WIRE_LEFT = '/ci/whitelinehand_1.png'
const WIRE_RIGHT = '/ci/whitelinehand_2.png'

export function HeroHalftoneSplit({
  className,
  autoPlay = true,
  showHud = true,
}: HeroHalftoneSplitProps) {
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
    () => getHalftoneSplitMotion(progress, tilt, timeSec, reducedMotion),
    [progress, tilt, timeSec, reducedMotion],
  )

  const groupTransform = `
    rotateX(${m.groupRotateX}deg)
    rotateY(${m.groupRotateY}deg)
    scale(${m.groupScale})
  `

  const halfStyle = (side: 'left' | 'right') => {
    const isLeft = side === 'left'
    return {
      transform: `
        translate3d(${isLeft ? m.leftX : m.rightX}%, ${isLeft ? m.leftY : m.rightY}px, 0)
        rotateY(${isLeft ? m.leftRotateY : m.rightRotateY}deg)
      `,
    }
  }

  return (
    <div
      ref={rootRef}
      className={className ?? 'hero-halftone-split-root'}
      aria-hidden={!showHud}
    >
      <div className="hero-halftone-split-base" />

      <div
        className="hero-halftone-split-bg"
        style={{
          transform: `translate3d(${tilt.nx * -12}px, ${tilt.ny * -10}px, 0)`,
        }}
      />

      <div className="hero-halftone-split-stage">
        <div className="hero-halftone-split-group" style={{ transform: groupTransform }}>
          <div className="hero-halftone-split-half hero-halftone-split-half-left" style={halfStyle('left')}>
            <img src={HANDSHAKE} alt="" className="hero-halftone-split-img" draggable={false} />
            <img
              src={WIRE_LEFT}
              alt=""
              className="hero-halftone-split-wire"
              style={{ opacity: m.wireOpacity }}
              draggable={false}
            />
          </div>

          <div className="hero-halftone-split-half hero-halftone-split-half-right" style={halfStyle('right')}>
            <img src={HANDSHAKE} alt="" className="hero-halftone-split-img" draggable={false} />
            <img
              src={WIRE_RIGHT}
              alt=""
              className="hero-halftone-split-wire"
              style={{ opacity: m.wireOpacity }}
              draggable={false}
            />
          </div>
        </div>

        <div className="hero-halftone-split-seam" style={{ opacity: m.seamGlow }} />
      </div>

      <div className="hero-halftone-split-vignette" />

      {showHud ? (
        <div className="hero-halftone-split-hud">
          <span className="hero-halftone-split-hud-tag">V05 · HALFTONE × WIRE</span>
          <span className="hero-halftone-split-hud-coord">
            {tilt.source === 'tilt' ? 'GYRO' : tilt.source === 'pointer' ? 'POINTER' : 'IDLE'}
          </span>
        </div>
      ) : null}

      {needsTiltPrompt ? (
        <button
          type="button"
          className="hero-halftone-split-tilt-cta"
          onClick={() => void tilt.requestTiltPermission()}
        >
          啟用陀螺儀視差
        </button>
      ) : null}
    </div>
  )
}

export function HeroHalftoneSplitStatic({ className }: { className?: string }) {
  return <HeroHalftoneSplit className={className} autoPlay={false} />
}
