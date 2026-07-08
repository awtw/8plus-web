'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

export type InteractiveTiltSource = 'idle' | 'pointer' | 'tilt'

export type InteractiveTiltState = {
  /** normalized -0.5 … 0.5 */
  nx: number
  ny: number
  /** absolute 0 … 1 within root */
  px: number
  py: number
  active: boolean
  source: InteractiveTiltSource
  tiltEnabled: boolean
}

const IDLE: InteractiveTiltState = {
  nx: 0,
  ny: 0,
  px: 0.5,
  py: 0.5,
  active: false,
  source: 'idle',
  tiltEnabled: false,
}

type Target = Pick<InteractiveTiltState, 'nx' | 'ny' | 'px' | 'py' | 'active' | 'source'>

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export function useInteractiveTilt(
  rootRef: RefObject<HTMLElement | null>,
  options?: { enabled?: boolean; smoothing?: number },
) {
  const enabled = options?.enabled ?? true
  const smoothing = options?.smoothing ?? 0.09

  const [state, setState] = useState<InteractiveTiltState>(IDLE)
  const target = useRef<Target>({ nx: 0, ny: 0, px: 0.5, py: 0.5, active: false, source: 'idle' })
  const current = useRef({ nx: 0, ny: 0, px: 0.5, py: 0.5 })
  const tiltEnabled = useRef(false)
  const pointerActive = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const root = rootRef.current
    if (!root) return

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      pointerActive.current = true
      const px = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      const py = clamp((event.clientY - rect.top) / rect.height, 0, 1)
      target.current = {
        nx: px - 0.5,
        ny: py - 0.5,
        px,
        py,
        active: true,
        source: 'pointer',
      }
    }

    const onPointerLeave = () => {
      pointerActive.current = false
      if (!tiltEnabled.current) {
        target.current = { nx: 0, ny: 0, px: 0.5, py: 0.5, active: false, source: 'idle' }
      }
    }

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (pointerActive.current) return
      const gamma = event.gamma
      const beta = event.beta
      if (gamma == null || beta == null) return
      const nx = clamp(gamma / 42, -0.5, 0.5)
      const ny = clamp((beta - 48) / 52, -0.5, 0.5)
      target.current = {
        nx,
        ny,
        px: nx + 0.5,
        py: ny + 0.5,
        active: true,
        source: 'tilt',
      }
    }

    root.addEventListener('pointermove', onPointerMove, { passive: true })
    root.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('deviceorientation', onOrientation, { passive: true })

    let raf = 0
    const tick = () => {
      const t = smoothing
      current.current.nx += (target.current.nx - current.current.nx) * t
      current.current.ny += (target.current.ny - current.current.ny) * t
      current.current.px += (target.current.px - current.current.px) * t
      current.current.py += (target.current.py - current.current.py) * t

      setState({
        nx: current.current.nx,
        ny: current.current.ny,
        px: current.current.px,
        py: current.current.py,
        active: target.current.active,
        source: target.current.source,
        tiltEnabled: tiltEnabled.current,
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('deviceorientation', onOrientation)
      cancelAnimationFrame(raf)
    }
  }, [enabled, rootRef, smoothing])

  const requestTiltPermission = async () => {
    const req = (
      DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>
      }
    ).requestPermission
    if (!req) {
      tiltEnabled.current = true
      setState((s) => ({ ...s, tiltEnabled: true }))
      return true
    }
    try {
      const result = await req()
      const ok = result === 'granted'
      tiltEnabled.current = ok
      setState((s) => ({ ...s, tiltEnabled: ok }))
      return ok
    } catch {
      return false
    }
  }

  return { ...state, requestTiltPermission }
}
