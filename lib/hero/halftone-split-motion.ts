/** V05 halftone split — enter progress + subtle pointer/tilt */

import type { InteractiveTiltState } from '@/components/motion/use-interactive-tilt'

export type HalftoneSplitMotion = {
  leftX: number
  leftY: number
  rightX: number
  rightY: number
  leftRotateY: number
  rightRotateY: number
  groupRotateX: number
  groupRotateY: number
  groupScale: number
  meet: number
  seamGlow: number
  wireOpacity: number
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 2.6
}

function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

export function getHalftoneSplitMotion(
  progress: number,
  tilt: Pick<InteractiveTiltState, 'nx' | 'ny' | 'active'>,
  timeSec: number,
  reducedMotion: boolean,
): HalftoneSplitMotion {
  const p = clamp01(progress)

  const leftEnter = easeOut(segment(p, 0.04, 0.48))
  const rightEnter = easeOut(segment(p, 0.06, 0.5))
  const meet = easeOut(segment(p, 0.44, 0.78))
  const hold = segment(p, 0.72, 1)

  const idleX = reducedMotion ? 0 : Math.sin(timeSec * 0.5) * 0.006
  const idleY = reducedMotion ? 0 : Math.cos(timeSec * 0.45) * 0.005
  const nx = tilt.nx + idleX
  const ny = tilt.ny + idleY
  const depth = tilt.active ? 1 : 0.4

  const bump = meet > 0.45 && meet < 0.92 ? Math.sin(meet * Math.PI) * 0.012 : 0

  return {
    leftX: -38 * (1 - leftEnter) + nx * 5 * depth,
    leftY: ny * 4 * depth + bump * -8,
    rightX: 38 * (1 - rightEnter) - nx * 5 * depth,
    rightY: ny * 4 * depth + bump * 8,
    leftRotateY: nx * 4 * depth,
    rightRotateY: -nx * 4 * depth,
    groupRotateX: -ny * 3.5 * depth,
    groupRotateY: nx * 4.5 * depth,
    groupScale: 0.98 + meet * 0.03 + bump,
    meet,
    seamGlow: Math.min(1, meet * 1.05 + hold * 0.2),
    wireOpacity: Math.min(0.72, meet * 0.85),
  }
}
