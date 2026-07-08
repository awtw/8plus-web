/** Progress 0–1 → ET index touch motion (V03, vector blue hand). */

export type MeshSnapMotion = {
  blueX: number
  blueY: number
  blueRot: number
  redX: number
  redY: number
  touch: number
  glow: number
  indexReach: number
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 2.6
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

export function getMeshSnapMotion(progress: number): MeshSnapMotion {
  const p = clamp01(progress)

  const enter = easeOut(segment(p, 0, 0.16))
  const approach = easeInOut(segment(p, 0.14, 0.58))
  const touch = easeOut(segment(p, 0.56, 0.82))
  const hold = segment(p, 0.8, 1)

  const touchBump = touch > 0 && touch < 1 ? Math.sin(touch * Math.PI) * 0.02 : 0

  return {
    blueX: -280 * (1 - enter) + 168 * approach + touchBump * 12,
    blueY: 30 * (1 - enter) - 18 * approach,
    blueRot: -12 * (1 - enter) + 4 * approach,
    redX: 12 * (1 - enter),
    redY: 0,
    touch,
    glow: Math.min(1, touch * 1.1 + hold * 0.35),
    indexReach: approach,
  }
}
