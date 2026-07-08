/** R5-06 Halftone Trust — minimal scroll: exposure + vignette only */

export type HalftoneTrustMotion = {
  exposure: number
  vignette: number
  grainOpacity: number
  ruleOpacity: number
  parallaxY: number
}

export function getHalftoneTrustMotion(progress: number): HalftoneTrustMotion {
  const p = Math.min(1, Math.max(0, progress))
  const ease = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2

  return {
    exposure: 1 + ease * 0.06,
    vignette: 0.48 + ease * 0.32,
    grainOpacity: 0.04 + ease * 0.03,
    ruleOpacity: Math.max(0, (p - 0.25) / 0.6) * 0.12,
    parallaxY: -ease * 2.5,
  }
}
