/** Scroll progress 0–1 → grid field transforms (static until scroll) */

export type GridScrollMotion = {
  gridY: number
  gridScale: number
  gridBrightness: number
  linesOpacity: number
  seamOpacity: number
  vignetteStrength: number
  depthTilt: number
}

export function getGridScrollMotion(progress: number): GridScrollMotion {
  const p = Math.min(1, Math.max(0, progress))
  const ease = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2

  return {
    gridY: -ease * 6,
    gridScale: 1 + ease * 0.07,
    gridBrightness: 1 + ease * 0.12,
    linesOpacity: Math.max(0, (p - 0.18) / 0.55) * 0.38,
    seamOpacity: Math.max(0, (p - 0.28) / 0.5) * 0.75,
    vignetteStrength: 0.55 + ease * 0.28,
    depthTilt: ease * 3.5,
  }
}
