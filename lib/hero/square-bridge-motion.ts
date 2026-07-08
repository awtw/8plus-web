/** Progress 0–1 → V02-style red/black hands reach-close motion */

export type SquareBridgeMotion = {
  redY: number
  blackY: number
  meet: number
  glow: number
  handScale: number
  redOpacity: number
  blackOpacity: number
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 2.4
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

/** Mirrors ci-enter-top / ci-enter-bottom + ci-reach from V02 gallery */
export function getSquareBridgeMotion(progress: number): SquareBridgeMotion {
  const p = clamp01(progress)

  const redEnter = easeOut(segment(p, 0.05, 0.45))
  const blackEnter = easeOut(segment(p, 0.08, 0.48))
  const meet = easeInOut(segment(p, 0.42, 0.72))
  const hold = segment(p, 0.7, 1)

  const breathe = meet > 0.5 ? Math.sin((meet - 0.5) * Math.PI * 2) * 0.02 : 0

  return {
    redY: -42 * (1 - redEnter),
    blackY: 42 * (1 - blackEnter),
    meet,
    glow: Math.min(1, meet * 1.1 + hold * 0.25),
    handScale: 0.96 + meet * 0.06 + breathe,
    redOpacity: 0.15 + redEnter * 0.85,
    blackOpacity: 0.15 + blackEnter * 0.85,
  }
}
