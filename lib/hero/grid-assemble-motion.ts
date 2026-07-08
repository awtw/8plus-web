/** L03 Grid Assemble — square portals slide open, handshake revealed */

import type { InteractiveTiltState } from '@/components/motion/use-interactive-tilt'

export type GridAssembleMotion = {
  leftX: number
  rightX: number
  posterOpacity: number
  posterScale: number
  gridOpacity: number
  seamGlow: number
  frame: number
  parallaxX: number
  parallaxY: number
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 2.5
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

export function getGridAssembleMotion(
  progress: number,
  tilt: Pick<InteractiveTiltState, 'nx' | 'ny' | 'active'>,
  timeSec: number,
  reducedMotion: boolean,
): GridAssembleMotion {
  const p = clamp01(progress)

  const close = easeOut(segment(p, 0.04, 0.38))
  const open = easeInOut(segment(p, 0.4, 0.72))
  const hold = segment(p, 0.7, 1)

  const depth = tilt.active ? 1 : 0.35
  const idleX = reducedMotion ? 0 : Math.sin(timeSec * 0.45) * 0.006
  const nx = tilt.nx + idleX
  const ny = tilt.ny

  const leftClosed = -42 * (1 - close) + open * -108
  const rightClosed = 42 * (1 - close) + open * 108

  return {
    leftX: leftClosed + nx * 6 * depth,
    rightX: rightClosed - nx * 6 * depth,
    posterOpacity: easeOut(segment(p, 0.35, 0.68)),
    posterScale: 0.94 + easeOut(segment(p, 0.38, 0.75)) * 0.06,
    gridOpacity: close * 0.85 + (1 - open) * 0.55 + hold * 0.15,
    seamGlow: open * 0.7 + hold * 0.25,
    frame: easeOut(segment(p, 0.12, 0.55)),
    parallaxX: nx * 18 * depth,
    parallaxY: ny * 14 * depth,
  }
}
