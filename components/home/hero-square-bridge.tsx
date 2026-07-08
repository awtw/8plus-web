'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { getSquareBridgeMotion } from '@/lib/hero/square-bridge-motion'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type HeroSquareBridgeProps = {
  className?: string
  /** auto loop; set false for static hero */
  autoPlay?: boolean
}

const LOOP_MS = 3200

type PointerOffset = { x: number; y: number }

export function HeroSquareBridge({ className, autoPlay = true }: HeroSquareBridgeProps) {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0)
  const [pointer, setPointer] = useState<PointerOffset>({ x: 0, y: 0 })

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
    const root = rootRef.current
    if (!root || reducedMotion) return

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      setPointer({ x: nx, y: ny })
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    return () => root.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  const m = useMemo(() => getSquareBridgeMotion(progress), [progress])

  const gridX = reducedMotion ? 0 : pointer.x * 36
  const gridY = reducedMotion ? 0 : pointer.y * 28
  const handParallaxX = reducedMotion ? 0 : pointer.x * -6
  const handParallaxY = reducedMotion ? 0 : pointer.y * -4

  return (
    <div
      ref={rootRef}
      className={className ?? 'hero-square-bridge-root'}
      aria-hidden="true"
    >
      <div className="hero-square-bridge-base" />

      <div
        className="hero-square-bridge-field"
        style={{
          transform: `translate3d(${gridX}px, ${gridY}px, 0) scale(1.12)`,
        }}
      />

      <div className="hero-square-bridge-vignette" />

      <div
        className="hero-square-bridge-hands"
        style={{
          transform: `translate3d(${handParallaxX}px, ${handParallaxY}px, 0) scale(${m.handScale})`,
        }}
      >
        <img
          src="/ci/red_black_hand_red.svg"
          alt=""
          className="hero-square-bridge-hand hero-square-bridge-hand-red"
          style={{
            transform: `translateY(${m.redY}%)`,
            opacity: m.redOpacity,
          }}
          draggable={false}
        />
        <img
          src="/ci/red_black_hand_black.svg"
          alt=""
          className="hero-square-bridge-hand hero-square-bridge-hand-black"
          style={{
            transform: `translateY(${m.blackY}%)`,
            opacity: m.blackOpacity,
          }}
          draggable={false}
        />

        <div className="hero-square-bridge-glow" style={{ opacity: m.glow }} />
      </div>
    </div>
  )
}

export function HeroSquareBridgeStatic({ className }: { className?: string }) {
  return <HeroSquareBridge className={className} autoPlay={false} />
}
