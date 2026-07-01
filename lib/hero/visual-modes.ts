export type HeroVisualMode =
  | 'logo-cinema'
  | 'particle-morph'
  | 'constellation'
  | 'liquid-field'
  | 'magnetic-grid'

export type HeroVisualModeMeta = {
  id: HeroVisualMode
  name: string
  nameZh: string
  implemented: boolean
  labPath: string
}

export const HERO_VISUAL_MODES: HeroVisualModeMeta[] = [
  {
    id: 'logo-cinema',
    name: 'Logo Cinema',
    nameZh: '光影 Logo',
    implemented: true,
    labPath: '/design-lab?style=logo-cinema',
  },
  {
    id: 'particle-morph',
    name: 'Particle Morph',
    nameZh: '粒子聚合',
    implemented: true,
    labPath: '/design-lab?style=particle-morph',
  },
  {
    id: 'constellation',
    name: 'Constellation Graph',
    nameZh: '星座連線',
    implemented: true,
    labPath: '/design-lab?style=constellation',
  },
  {
    id: 'liquid-field',
    name: 'Liquid Flow Field',
    nameZh: '流場液態',
    implemented: true,
    labPath: '/design-lab?style=liquid-field',
  },
  {
    id: 'magnetic-grid',
    name: 'Magnetic Grid',
    nameZh: '磁力網格',
    implemented: true,
    labPath: '/design-lab?style=magnetic-grid',
  },
]

export const DEFAULT_HERO_MODE: HeroVisualMode = 'logo-cinema'

export function parseHeroVisualMode(value: string | null | undefined): HeroVisualMode {
  const valid = HERO_VISUAL_MODES.map((m) => m.id)
  if (value && valid.includes(value as HeroVisualMode)) return value as HeroVisualMode
  return DEFAULT_HERO_MODE
}

export function getPerformanceTier(): 'high' | 'mid' | 'low' {
  if (typeof window === 'undefined') return 'high'
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return 'low'
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const small = window.innerWidth < 768
  if (coarse && small) return 'mid'
  return 'high'
}

export function getParticleBudget(tier: 'high' | 'mid' | 'low'): number {
  if (tier === 'high') return 2400
  if (tier === 'mid') return 1100
  return 0
}
