/** L05 Wire Weave — whiteline hands + center shimmer seam */

import type { InteractiveTiltState } from '@/components/motion/use-interactive-tilt'

export type WireWeaveMotion = {
  leftX: number
  leftY: number
  rightX: number
  rightY: number
  groupRotateX: number
  groupRotateY: number
  groupScale: number
  weave: number
  seamGlow: number
  handOpacity: number
  shimmerY: number
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

export function getWireWeaveMotion(
  progress: number,
  tilt: Pick<InteractiveTiltState, 'nx' | 'ny' | 'active'>,
  timeSec: number,
  reducedMotion: boolean,
): WireWeaveMotion {
  const p = clamp01(progress)

  const leftEnter = easeOut(segment(p, 0.06, 0.5))
  const rightEnter = easeOut(segment(p, 0.08, 0.52))
  const weave = easeInOut(segment(p, 0.2, 0.85))
  const meet = easeInOut(segment(p, 0.48, 0.78))

  const idleX = reducedMotion ? 0 : Math.sin(timeSec * 0.5) * 0.008
  const idleY = reducedMotion ? 0 : Math.cos(timeSec * 0.42) * 0.006
  const nx = tilt.nx + idleX
  const ny = tilt.ny + idleY
  const depth = tilt.active ? 1 : 0.35

  const bump = meet > 0.4 && meet < 0.95 ? Math.sin(meet * Math.PI) * 0.015 : 0

  return {
    leftX: -36 * (1 - leftEnter) + nx * 4 * depth,
    leftY: ny * 3 * depth + bump * -6,
    rightX: 36 * (1 - rightEnter) - nx * 4 * depth,
    rightY: ny * 3 * depth + bump * 6,
    groupRotateX: -ny * 3 * depth,
    groupRotateY: nx * 4 * depth,
    groupScale: 0.97 + meet * 0.04 + bump,
    weave,
    seamGlow: 0.25 + weave * 0.65 + meet * 0.2,
    handOpacity: 0.2 + Math.max(leftEnter, rightEnter) * 0.8,
    shimmerY: reducedMotion ? 50 : 50 + Math.sin(timeSec * 2.2) * 8,
  }
}
