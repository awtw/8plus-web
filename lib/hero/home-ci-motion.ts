/**
 * Home hero CI motion — merges the three user-selected R5 directions
 * into one scroll arc: blueprint doors (R5-01) → portal split reveal
 * (R5-05) → halftone trust terminal (R5-06).
 */

export type HomeCiMotion = {
  leftX: number
  rightX: number
  gridOpacity: number
  seamGlow: number
  posterOpacity: number
  posterScale: number
  exposure: number
  vignette: number
  cueReveal: number
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

export function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

export function getHomeCiMotion(progress: number): HomeCiMotion {
  const p = clamp01(progress)

  const shut = 1 - easeOut(segment(p, 0.06, 0.26))
  const open = easeInOut(segment(p, 0.3, 0.72))
  const settle = easeInOut(segment(p, 0.78, 1))
  const doorShut = shut * (1 - open)

  return {
    leftX: doorShut * -4 + open * -112,
    rightX: doorShut * 4 + open * 112,
    gridOpacity: 0.72 + doorShut * 0.2 - open * 0.35,
    seamGlow: open * 0.65 + settle * 0.2,
    posterOpacity: easeOut(segment(p, 0.36, 0.78)),
    posterScale: 0.95 + easeOut(segment(p, 0.4, 0.85)) * 0.05,
    exposure: 1 + settle * 0.06,
    vignette: 0.45 + easeInOut(p) * 0.35,
    cueReveal: segment(p, 0.88, 1),
  }
}

/** Per-pillar stagger reveal driven by scroll progress (Act 3). */
export function getPillarReveal(progress: number, index: number) {
  return easeOut(segment(clamp01(progress), 0.7 + index * 0.06, 0.86 + index * 0.06))
}
