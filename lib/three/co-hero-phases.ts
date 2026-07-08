/** Co-Hero option A — cradle + co-scan phase weights (progress 0–1). */

export type CoHeroPhases = {
  scatter: number
  lidar: number
  snap: number
  grip: number
}

export function getCoHeroPhases(progress: number): CoHeroPhases {
  const p = Math.min(1, Math.max(0, progress))

  if (p < 0.12) {
    return { scatter: p / 0.12, lidar: 0, snap: 0, grip: 0 }
  }
  if (p < 0.55) {
    return { scatter: 1, lidar: (p - 0.12) / 0.43, snap: 0, grip: 0 }
  }
  if (p < 0.75) {
    return { scatter: 1, lidar: 1, snap: (p - 0.55) / 0.2, grip: 0 }
  }
  return { scatter: 1, lidar: 1, snap: 1, grip: (p - 0.75) / 0.25 }
}

export const CO_HERO_MILESTONES = [
  { at: 0, label: '頂點雲' },
  { at: 0.12, label: '開始同掃' },
  { at: 0.55, label: '掃描完成' },
  { at: 0.75, label: 'Logo snap' },
  { at: 1, label: '微握' },
] as const
