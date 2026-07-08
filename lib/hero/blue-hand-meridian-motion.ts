/** blue_line_hand — interactive meridian field motion */

import type { InteractiveTiltState } from '@/components/motion/use-interactive-tilt'

export type BlueHandMeridianMotion = {
  handRotateX: number
  handRotateY: number
  handTranslateX: number
  handTranslateY: number
  handTranslateZ: number
  handScale: number
  handGlow: number
  bgDeepX: number
  bgDeepY: number
  bgMidX: number
  bgMidY: number
  bgNearX: number
  bgNearY: number
  fieldRotate: number
  ringRotate: number
  ringScale: number
  streamPhase: number
  cursorGlowX: number
  cursorGlowY: number
  chroma: number
  hudOpacity: number
}

export function getBlueHandMeridianMotion(
  tilt: Pick<InteractiveTiltState, 'nx' | 'ny' | 'px' | 'py' | 'active'>,
  timeSec: number,
  reducedMotion: boolean,
): BlueHandMeridianMotion {
  const idleX = reducedMotion ? 0 : Math.sin(timeSec * 0.55) * 0.018
  const idleY = reducedMotion ? 0 : Math.cos(timeSec * 0.42) * 0.014

  const nx = reducedMotion ? idleX : tilt.nx + idleX
  const ny = reducedMotion ? idleY : tilt.ny + idleY
  const depth = tilt.active ? 1 : 0.35

  const breathe = reducedMotion ? 0 : Math.sin(timeSec * 1.1) * 0.012

  return {
    handRotateX: -ny * 22,
    handRotateY: nx * 26,
    handTranslateX: nx * 28,
    handTranslateY: ny * 22,
    handTranslateZ: depth * 36 + breathe * 40,
    handScale: 1 + depth * 0.045 + breathe,
    handGlow: 0.42 + depth * 0.38,
    bgDeepX: nx * -48,
    bgDeepY: ny * -36,
    bgMidX: nx * 32,
    bgMidY: ny * 24,
    bgNearX: nx * -18,
    bgNearY: ny * -14,
    fieldRotate: nx * 10 + (reducedMotion ? 0 : timeSec * 4.5),
    ringRotate: (reducedMotion ? 0 : timeSec * 18) + nx * 14,
    ringScale: 1 + depth * 0.08,
    streamPhase: reducedMotion ? 0 : timeSec * 0.35,
    cursorGlowX: tilt.px * 100,
    cursorGlowY: tilt.py * 100,
    chroma: Math.min(1, (Math.abs(nx) + Math.abs(ny)) * 1.6),
    hudOpacity: 0.55 + depth * 0.35,
  }
}

/** Meridian SVG paths — radial + arcs from focal center */
export function buildMeridianPaths(cx = 500, cy = 520) {
  const radials: string[] = []
  const arcs: string[] = []
  const count = 18

  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2
    const x2 = cx + Math.cos(a) * 520
    const y2 = cy + Math.sin(a) * 520
    radials.push(`M ${cx} ${cy} L ${x2} ${y2}`)
  }

  for (let r = 1; r <= 6; r += 1) {
    const rx = 80 + r * 68
    const ry = 56 + r * 48
    arcs.push(
      `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`,
    )
  }

  return { radials, arcs }
}
