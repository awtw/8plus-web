/** blue_line_hand.svg — finger clip warp rig (ET index touch). */

export type FingerWarp = {
  id: string
  pivot: { x: number; y: number }
  clip: string
  /** 0 = open, 1 = folded */
  fold: number
  rotate: number
  skewX: number
  tx: number
  ty: number
}

export type BlueHandWarp = {
  curl: number
  indexAim: number
  warp: number
  fingers: FingerWarp[]
  indexTip: { x: number; y: number }
}

const FINGER_DEFS = [
  {
    id: 'thumb',
    pivot: { x: 188, y: 518 },
    clip: 'M 60 640 L 188 518 L 268 430 L 140 660 Z',
    curlMax: -62,
    skewMax: -8,
  },
  {
    id: 'pinky',
    pivot: { x: 208, y: 572 },
    clip: 'M 100 660 L 208 572 L 268 510 L 175 700 Z',
    curlMax: 74,
    skewMax: 6,
  },
  {
    id: 'ring',
    pivot: { x: 248, y: 518 },
    clip: 'M 165 610 L 248 518 L 310 450 L 220 640 Z',
    curlMax: 70,
    skewMax: 5,
  },
  {
    id: 'middle',
    pivot: { x: 298, y: 462 },
    clip: 'M 220 560 L 298 462 L 365 380 L 268 580 Z',
    curlMax: 66,
    skewMax: 4,
  },
  {
    id: 'index',
    pivot: { x: 358, y: 398 },
    clip: 'M 268 500 L 358 398 L 520 240 L 580 170 L 420 520 Z',
    curlMax: 6,
    skewMax: -3,
    aimRotate: 16,
    aimTx: 85,
    aimTy: -55,
  },
] as const

export const BLUE_HAND_IMG = { x: 20, y: 160, w: 720, h: 720 }
export const BLUE_HAND_PIVOT = { x: 400, y: 440 }

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t))
}

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

export function getBlueHandWarp(progress: number): BlueHandWarp {
  const p = clamp01(progress)
  const curl =
    p < 0.14 ? 0 : p < 0.58 ? ease((p - 0.14) / 0.44) ** 0.92 : 1
  const indexAim = p < 0.38 ? 0 : ease((p - 0.38) / 0.62)
  const warp = p < 0.52 ? 0 : ease((p - 0.52) / 0.48) * 14

  const fingers: FingerWarp[] = FINGER_DEFS.map((f) => {
    const isIndex = f.id === 'index'
    const fold = isIndex ? curl * 0.12 : curl
    const rotate =
      f.curlMax * fold +
      (isIndex && 'aimRotate' in f ? (f.aimRotate ?? 0) * indexAim : 0)
    const skewX = f.skewMax * fold
    const tx = isIndex && 'aimTx' in f ? (f.aimTx ?? 0) * indexAim : 0
    const ty = isIndex && 'aimTy' in f ? (f.aimTy ?? 0) * indexAim : 0

    return {
      id: f.id,
      pivot: f.pivot,
      clip: f.clip,
      fold,
      rotate,
      skewX,
      tx,
      ty,
    }
  })

  const index = fingers.find((f) => f.id === 'index')!
  const rad = (index.rotate * Math.PI) / 180
  const len = 200 + indexAim * 90
  const indexTip = {
    x: index.pivot.x + index.tx + Math.cos(rad - 0.55) * len,
    y: index.pivot.y + index.ty + Math.sin(rad - 0.55) * len,
  }

  return { curl, indexAim, warp, fingers, indexTip }
}
