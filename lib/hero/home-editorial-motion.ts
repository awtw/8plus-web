/**
 * Home hero editorial motion — magazine cover → figure frame expands to
 * full bleed → pillars settle. Pure function of scroll progress (reversible).
 */

export type HomeEditorialMotion = {
  /** clip-path inset percentages for the figure frame */
  clipTop: number
  clipRight: number
  clipBottom: number
  clipLeft: number
  imageScale: number
  headlineScale: number
  headlineY: number
  captionOpacity: number
  scrimOpacity: number
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

function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

const COVER_CLIP = { top: 40, right: 8, bottom: 12, left: 8 }

export function getHomeEditorialMotion(progress: number): HomeEditorialMotion {
  const p = clamp01(progress)

  const expand = easeInOut(segment(p, 0.05, 0.55))
  const settle = segment(p, 0.55, 1)

  return {
    clipTop: COVER_CLIP.top * (1 - expand),
    clipRight: COVER_CLIP.right * (1 - expand),
    clipBottom: COVER_CLIP.bottom * (1 - expand),
    clipLeft: COVER_CLIP.left * (1 - expand),
    imageScale: 1.08 - easeOut(segment(p, 0, 0.7)) * 0.08,
    headlineScale: 1 - expand * 0.38,
    headlineY: -expand * 10,
    captionOpacity: 1 - segment(p, 0.4, 0.6) * 0.55,
    scrimOpacity: easeOut(segment(p, 0.5, 0.75)),
    cueReveal: segment(p, 0.85, 1),
  }
}

/** Per-pillar stagger reveal (settle act). */
export function getEditorialPillarReveal(progress: number, index: number) {
  return easeOut(segment(clamp01(progress), 0.55 + index * 0.07, 0.78 + index * 0.07))
}
