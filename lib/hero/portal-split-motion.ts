/** R5-05 Portal Split — scroll opens square doors to reveal handshake */

export type PortalSplitMotion = {
  leftX: number
  rightX: number
  posterOpacity: number
  posterScale: number
  gridOpacity: number
  seamGlow: number
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

export function getPortalSplitMotion(progress: number): PortalSplitMotion {
  const p = clamp01(progress)

  const closed = 1 - easeOut(segment(p, 0.08, 0.28))
  const open = easeInOut(segment(p, 0.32, 0.78))
  const hold = segment(p, 0.75, 1)

  const doorShut = closed * (1 - open)

  return {
    leftX: doorShut * -4 + open * -112,
    rightX: doorShut * 4 + open * 112,
    posterOpacity: easeOut(segment(p, 0.38, 0.82)),
    posterScale: 0.95 + easeOut(segment(p, 0.4, 0.85)) * 0.05,
    gridOpacity: 0.72 + doorShut * 0.2 - open * 0.35 + hold * 0.1,
    seamGlow: open * 0.65 + hold * 0.2,
  }
}
