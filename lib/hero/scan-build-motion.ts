/** L06 Scan Build — LiDAR scan constructs handshake */

import type { InteractiveTiltState } from '@/components/motion/use-interactive-tilt'

export type ScanBuildMotion = {
  scanY: number
  reveal: number
  frame: number
  scanGlow: number
  handOpacity: number
  handScale: number
  parallaxX: number
  parallaxY: number
  linePhase: number
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 2.4
}

function segment(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

export function getScanBuildMotion(
  progress: number,
  tilt: Pick<InteractiveTiltState, 'nx' | 'ny' | 'active'>,
  timeSec: number,
  reducedMotion: boolean,
): ScanBuildMotion {
  const p = clamp01(progress)

  const scan = easeOut(segment(p, 0.05, 0.72))
  const reveal = easeOut(segment(p, 0.08, 0.78))
  const frame = easeOut(segment(p, 0.25, 0.85))
  const hold = segment(p, 0.8, 1)

  const depth = tilt.active ? 1 : 0.3
  const nx = reducedMotion ? 0 : tilt.nx
  const ny = reducedMotion ? 0 : tilt.ny

  return {
    scanY: scan * 92 + 4,
    reveal,
    frame,
    scanGlow: 0.35 + scan * 0.5 + hold * 0.15,
    handOpacity: 0.15 + reveal * 0.85,
    handScale: 0.96 + reveal * 0.04,
    parallaxX: nx * 14 * depth,
    parallaxY: ny * 10 * depth,
    linePhase: reducedMotion ? 1 : (timeSec * 0.4) % 1,
  }
}
