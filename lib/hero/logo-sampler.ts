export type LogoPoint = {
  u: number
  v: number
  brightness: number
}

const LOGO_SRC = '/logo-light-512.png'

export function sampleLogoPoints(budget: number): Promise<LogoPoint[]> {
  return new Promise((resolve) => {
    if (budget <= 0) {
      resolve(fallbackRingPoints(48))
      return
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = LOGO_SRC

    img.onload = () => {
      const size = 128
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(fallbackRingPoints(Math.min(budget, 120)))
        return
      }

      ctx.drawImage(img, 0, 0, size, size)
      const { data } = ctx.getImageData(0, 0, size, size)
      const candidates: LogoPoint[] = []

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = (y * size + x) * 4
          const alpha = data[i + 3]
          if (alpha < 64) continue
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / (3 * 255)
          candidates.push({ u: x / size, v: y / size, brightness })
        }
      }

      if (candidates.length === 0) {
        resolve(fallbackRingPoints(Math.min(budget, 120)))
        return
      }

      const picked: LogoPoint[] = []
      const stride = Math.max(1, Math.floor(candidates.length / budget))
      for (let i = 0; i < candidates.length && picked.length < budget; i += stride) {
        picked.push(candidates[i])
      }

      while (picked.length < Math.min(budget, candidates.length)) {
        picked.push(candidates[Math.floor(Math.random() * candidates.length)])
      }

      resolve(picked)
    }

    img.onerror = () => resolve(fallbackRingPoints(Math.min(budget, 120)))
  })
}

function fallbackRingPoints(count: number): LogoPoint[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2
    const ring = 0.18 + (i % 4) * 0.05
    return {
      u: 0.5 + Math.cos(angle) * ring,
      v: 0.5 + Math.sin(angle) * ring,
      brightness: 0.7,
    }
  })
}
