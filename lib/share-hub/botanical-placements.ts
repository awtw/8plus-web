export type BotanicalPlacement = {
  id: string
  src: string
  width: number
  height: number
  top?: string
  right?: string
  bottom?: string
  left?: string
  rotate: number
  opacity: number
  blendMode: 'normal' | 'screen' | 'darken' | 'soft-light' | 'plus-lighter'
  floatY: number
  floatRotate: number
  duration: number
  delay: number
  saturate?: number
}

/** Decorative plants for /sc — edges only, content column stays clear */
export const scBotanicalPlacements: BotanicalPlacement[] = [
  {
    id: 'bird-blue',
    src: '/plants/Instagram.jpeg',
    width: 200,
    height: 280,
    top: '4%',
    right: '-6%',
    rotate: -8,
    opacity: 0.92,
    blendMode: 'normal',
    floatY: 10,
    floatRotate: 2.5,
    duration: 16,
    delay: 0,
    saturate: 1.15,
  },
  {
    id: 'hybrids',
    src: '/plants/botanical-hybrids-by-wifenyc.jpeg',
    width: 240,
    height: 320,
    top: '8%',
    left: '-14%',
    rotate: 6,
    opacity: 0.88,
    blendMode: 'darken',
    floatY: 12,
    floatRotate: -2,
    duration: 19,
    delay: 1.2,
    saturate: 1.2,
  },
  {
    id: 'eucalyptus',
    src: '/plants/_%20(6).jpeg',
    width: 160,
    height: 260,
    bottom: '10%',
    left: '-4%',
    rotate: 14,
    opacity: 0.72,
    blendMode: 'screen',
    floatY: 14,
    floatRotate: 3,
    duration: 21,
    delay: 0.6,
    saturate: 1.25,
  },
  {
    id: 'sprig-7',
    src: '/plants/_%20(7).jpeg',
    width: 150,
    height: 210,
    bottom: '6%',
    right: '-8%',
    rotate: -12,
    opacity: 0.68,
    blendMode: 'screen',
    floatY: 9,
    floatRotate: -2.5,
    duration: 18,
    delay: 2,
    saturate: 1.18,
  },
  {
    id: 'sprig-8',
    src: '/plants/_%20(8).jpeg',
    width: 130,
    height: 190,
    top: '42%',
    right: '-10%',
    rotate: 8,
    opacity: 0.55,
    blendMode: 'soft-light',
    floatY: 8,
    floatRotate: 2,
    duration: 23,
    delay: 1.8,
    saturate: 1.1,
  },
]
