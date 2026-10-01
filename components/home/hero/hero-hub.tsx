'use client'

import { useEffect, useRef } from 'react'
import { shouldAnimate, startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero — "AI Hub": an isometric control tower.
 *
 * A holographic 8+ mark floats above a ringed platform. Six floating service plates (full-stack, e-commerce,
 * brand site, identity, AI, cloud) sit around it, each wired to the hub by a dotted ground trace. Requests flow
 * out to a plate (it lights up, its mini-scene reacts) and results flow back into the hub (the platform flashes).
 *
 * - isometric projection with a slow yaw that follows the pointer; every plate lies on the ground grid
 * - hover/tap a plate: it lifts, its trace brightens, a flat caption explains the service (phones auto-tour)
 * - intro: platform rings expand, traces draw in, plates drop from above one by one
 * Canvas 2D, time-based, stateless packet timeline, paused off-screen / hidden tab by startFrameLoop,
 * one settled frame for reduced motion / Data Saver.
 */

type Svc = { zh: string; en: string; desc: string; chips: string[] }

const SVCS: Svc[] = [
  { zh: '前後端串接', en: 'FULL-STACK', desc: '前端介面、API 與資料庫一次接通，資料流與錯誤處理都設計好，而不是各做各的。', chips: ['Next.js', 'API', 'tRPC'] },
  { zh: '電商平台', en: 'E-COMMERCE', desc: '商品、金流、訂單與庫存串成一條完整的交易動線，上線後也看得到每一筆轉換。', chips: ['Shopify', '金流', '訂單'] },
  { zh: '形象網站', en: 'BRAND SITE', desc: '重視速度、SEO 與內容維護的品牌網站，讓團隊自己改內容，不必每次找工程師。', chips: ['RWD', 'CMS', 'SEO'] },
  { zh: 'CI · LOGO', en: 'IDENTITY', desc: '從標誌、色彩到使用規範，讓品牌在網站、文件與社群上維持一致的樣子。', chips: ['Logo', '視覺', '規範'] },
  { zh: 'AI 導入', en: 'AI INTEGRATION', desc: '把 LLM、RAG 與 Agent 嵌進真實流程，有評測、有護欄，而不是展示用的聊天框。', chips: ['LLM', 'RAG', 'Agent'] },
  { zh: '雲端架構', en: 'CLOUD', desc: '部署、監控、成本與備援一起規劃，服務穩定上線，帳單也不會失控。', chips: ['AWS', 'CI/CD', '效能'] },
]

// world angle (rad) of each plate around the hub; the 6 spots read clockwise on screen starting at the far right
const ANGLES = [315, 15, 75, 135, 195, 255].map((d) => (d * Math.PI) / 180)
const TAU = Math.PI * 2
const ICE = '225,244,255'
const SKY = '130,180,255'
const ORG = '254,80,0'
const FONT_SANS = '"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif'
const FONT_MONO = 'ui-monospace,"JetBrains Mono",SFMono-Regular,monospace'

const PLATE_W = 200 // plate size in local px; 100 local px = 1 world unit
const PLATE_H = 130
const WU = 0.01 // world units per local px

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3)
const easeBack = (v: number) => { const x = clamp01(v) - 1; return 1 + x * x * (2.7 * x + 1.7) }

export default function HeroHub({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const phone = window.innerWidth < 768
    const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 2)
    const animate = shouldAnimate()
    let W = 0
    let H = 0
    const resize = () => {
      const p = cv.parentElement
      W = p?.clientWidth || 1280
      H = p?.clientHeight || 720
      cv.width = Math.floor(W * dpr)
      cv.height = Math.floor(H * dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0 }
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.nx = e.clientX / window.innerWidth - 0.5
      mouse.ny = e.clientY / window.innerHeight - 0.5
    }
    const onLeave = () => { mouse.x = mouse.y = -9999 }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    let pinned = -1
    let pinnedAt = -99
    let shock = -99 // time of the last tap shockwave
    let tapPoint: [number, number] | null = null
    const onTap = (e: Event) => {
      const d = (e as CustomEvent).detail as { x: number; y: number }
      tapPoint = [d.x, d.y]
    }
    window.addEventListener('heroTap', onTap)

    // emblem is rendered once per frame into small offscreen canvases (scan lines + tinted depth copy)
    const EM = 256
    const em = document.createElement('canvas'); em.width = em.height = EM
    const emc = em.getContext('2d')!
    const emT = document.createElement('canvas'); emT.width = emT.height = EM
    const emTc = emT.getContext('2d')!

    const drawMark = (c: CanvasRenderingContext2D, size: number, white = '#fff', orange = '#FE5000') => {
      c.save()
      c.scale(size / 100, size / 100)
      c.fillStyle = white
      c.beginPath(); c.arc(32, 29, 18, 0, TAU); c.fill()
      c.beginPath(); c.moveTo(53, 9); c.lineTo(68, 9); c.lineTo(36, 91); c.lineTo(21, 91); c.closePath(); c.fill()
      c.fillStyle = orange
      c.beginPath(); c.arc(70, 64, 28, 0, TAU); c.fill()
      c.restore()
    }

    // ---- view state --------------------------------------------------------------------------
    let S = 90 // px per world unit
    let CX = 0
    let CY = 0
    let cosY = 1
    let sinY = 0
    let yaw = 0
    let pitchOff = 0
    const hv = SVCS.map(() => 0)
    let hovered = -1
    let tour = 0
    let tourAt = 0
    const polys: Array<Array<[number, number]>> = SVCS.map(() => [])
    let lastNow = performance.now()
    const start = lastNow
    const R = phone ? 2.45 : 2.8 // plate ring radius

    const P = (x: number, y: number, z: number): [number, number] => {
      const X = x * cosY - y * sinY
      const Y = x * sinY + y * cosY
      return [CX + (X - Y) * 0.866 * S, CY + (X + Y) * 0.5 * S - z * S]
    }
    // circle on the ground plane (any yaw): ellipse rx = 1.2247 r, ry = 0.7071 r, param phi = theta + 45deg
    const pt = (r: number, z: number, phi: number): [number, number] => [CX + 1.2247 * r * S * Math.cos(phi), CY - z * S + 0.7071 * r * S * Math.sin(phi)]
    const ell = (r: number, z: number) => ctx.ellipse(CX, CY - z * S, 1.2247 * r * S, 0.7071 * r * S, 0, 0, TAU)
    const setPx = () => ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const setPlate = (ox: number, oy: number, z: number) => {
      const o = P(ox, oy, z)
      const a = P(ox + WU, oy, z)
      const b = P(ox, oy + WU, z)
      ctx.setTransform(dpr * (a[0] - o[0]), dpr * (a[1] - o[1]), dpr * (b[0] - o[0]), dpr * (b[1] - o[1]), dpr * o[0], dpr * o[1])
    }
    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }
    const wrap = (text: string, maxW: number): string[] => {
      const lines: string[] = []
      let line = ''
      for (const ch of Array.from(text)) {
        if (ctx.measureText(line + ch).width > maxW) { lines.push(line); line = ch } else line += ch
      }
      if (line) lines.push(line)
      return lines
    }
    const inPoly = (x: number, y: number, poly: Array<[number, number]>) => {
      let inside = false
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i]
        const [xj, yj] = poly[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }

    // dotted trace timeline (stateless): request out to the plate, result back to the hub
    const PERIOD = 4.4
    const phaseOf = (t: number, i: number) => (((t + i * 0.73) % PERIOD) + PERIOD) % PERIOD
    const OUT0 = 0.2, OUT1 = 1.3, IN0 = 2.2, IN1 = 3.3
    const cardPulseAt = (t: number, i: number) => {
      const tau = phaseOf(t, i)
      const d = tau >= OUT1 ? tau - OUT1 : tau + PERIOD - OUT1
      return d < 2.2 ? Math.exp(-d * 2.4) : 0
    }
    const corePulseAt = (t: number) => {
      let m = 0
      for (let i = 0; i < SVCS.length; i++) {
        const tau = phaseOf(t, i)
        const d = tau >= IN1 ? tau - IN1 : tau + PERIOD - IN1
        if (d < 1.4) m += 0.55 * Math.exp(-d * 3.2)
      }
      return Math.min(m, 1)
    }

    // ---- scenes -------------------------------------------------------------------------------
    const drawGround = (t: number, it: number, corePulse: number) => {
      // pooled light under the hub
      const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, S * 4.4)
      g.addColorStop(0, `rgba(70,130,255,${0.5 + corePulse * 0.18})`)
      g.addColorStop(0.45, 'rgba(30,80,220,.18)')
      g.addColorStop(1, 'rgba(0,47,167,0)')
      ctx.save()
      ctx.translate(CX, CY); ctx.scale(1, 0.58); ctx.translate(-CX, -CY)
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(CX, CY, S * 4.4, 0, TAU); ctx.fill()
      ctx.restore()

      // ground grid, fading with distance; four alpha buckets keep it to four strokes
      const reach = clamp01(it / 1.4)
      const buckets: Array<Array<[number, number, number, number]>> = [[], [], [], []]
      const N = 7
      for (let k = -N; k <= N; k++) {
        for (let m = -N; m < N; m++) {
          for (const horiz of [true, false]) {
            const x0 = horiz ? m : k, y0 = horiz ? k : m
            const x1 = horiz ? m + 1 : k, y1 = horiz ? k : m + 1
            const dist = Math.hypot((x0 + x1) / 2, (y0 + y1) / 2)
            if (dist > N * reach) continue
            const b = Math.min(3, Math.floor((dist / N) * 4))
            const a = P(x0, y0, 0), c = P(x1, y1, 0)
            buckets[b].push([a[0], a[1], c[0], c[1]])
          }
        }
      }
      const alphas = [0.2, 0.14, 0.085, 0.04]
      ctx.lineWidth = 1
      buckets.forEach((seg, b) => {
        ctx.strokeStyle = `rgba(${SKY},${alphas[b]})`
        ctx.beginPath()
        for (const s of seg) { ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]) }
        ctx.stroke()
      })

      // outward ground ripples on a fixed cadence
      ctx.lineWidth = 1.4
      for (let k = 0; k < 3; k++) {
        const ph = ((t * 0.26 + k / 3) % 1)
        const r = 1.7 + ph * 4.4
        ctx.strokeStyle = `rgba(${SKY},${0.32 * (1 - ph) * (1 - ph) * clamp01(it / 1.2)})`
        ctx.beginPath(); ell(r, 0); ctx.stroke()
      }
      if (t - shock < 1.8 && shock > 0) {
        const ph = (t - shock) / 1.8
        ctx.strokeStyle = `rgba(${ORG},${0.7 * (1 - ph)})`
        ctx.lineWidth = 2.4
        ctx.beginPath(); ell(1.7 + ph * 5.5, 0); ctx.stroke()
      }
    }

    const tracePts = (i: number): { a: [number, number]; b: [number, number] } => {
      const ang = ANGLES[i]
      return {
        a: P(Math.cos(ang) * 1.72, Math.sin(ang) * 1.72, 0),
        b: P(Math.cos(ang) * R, Math.sin(ang) * R, 0),
      }
    }

    const drawTraces = (t: number, it: number) => {
      const f = S / 100
      SVCS.forEach((_, i) => {
        const { a, b } = tracePts(i)
        const grow = easeOut((it - 0.9 - i * 0.1) / 0.9)
        if (grow <= 0) return
        const hot = hv[i]
        const ex = a[0] + (b[0] - a[0]) * grow
        const ey = a[1] + (b[1] - a[1]) * grow
        ctx.save()
        ctx.lineCap = 'round'
        // faint solid rail
        ctx.strokeStyle = `rgba(${SKY},${0.2 + hot * 0.3})`
        ctx.lineWidth = 1.2 * f + 0.4
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(ex, ey); ctx.stroke()
        // glowing dotted stream
        ctx.globalCompositeOperation = 'lighter'
        ctx.setLineDash([0.1, 11 * f + 4])
        ctx.lineDashOffset = -t * 26 * f
        ctx.strokeStyle = `rgba(${ICE},${0.7 + hot * 0.3})`
        ctx.lineWidth = (3.4 + hot * 1.6) * f + 0.8
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(ex, ey); ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()

        // packets: request out (orange), result back (ice)
        if (grow < 1) return
        const tau = phaseOf(t, i)
        const drawPacket = (s: number, rgb: string) => {
          const x = a[0] + (b[0] - a[0]) * s, y = a[1] + (b[1] - a[1]) * s
          const tail = 0.13
          const s0 = Math.max(0, Math.min(1, s - (rgb === ORG ? tail : -tail)))
          const x0 = a[0] + (b[0] - a[0]) * s0, y0 = a[1] + (b[1] - a[1]) * s0
          ctx.save()
          ctx.globalCompositeOperation = 'lighter'
          const tg = ctx.createLinearGradient(x0, y0, x, y)
          tg.addColorStop(0, `rgba(${rgb},0)`)
          tg.addColorStop(1, `rgba(${rgb},.85)`)
          ctx.strokeStyle = tg
          ctx.lineWidth = 3 * f + 1
          ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke()
          const gl = ctx.createRadialGradient(x, y, 0, x, y, 11 * f + 4)
          gl.addColorStop(0, `rgba(${rgb === ORG ? '255,190,150' : '255,255,255'},.95)`)
          gl.addColorStop(0.35, `rgba(${rgb},.55)`)
          gl.addColorStop(1, `rgba(${rgb},0)`)
          ctx.fillStyle = gl
          ctx.beginPath(); ctx.arc(x, y, 11 * f + 4, 0, TAU); ctx.fill()
          ctx.restore()
        }
        if (tau >= OUT0 && tau <= OUT1) drawPacket((tau - OUT0) / (OUT1 - OUT0), ORG)
        if (tau >= IN0 && tau <= IN1) drawPacket(1 - (tau - IN0) / (IN1 - IN0), SKY)

        // landing pad under the plate
        const pulse = cardPulseAt(t, i)
        ctx.save()
        ctx.lineWidth = 1.5
        ctx.strokeStyle = `rgba(${ORG},${0.25 + pulse * 0.6 + hot * 0.3})`
        ctx.beginPath()
        ctx.ellipse(b[0], b[1], 1.2247 * 0.36 * S, 0.7071 * 0.36 * S, 0, 0, TAU)
        ctx.stroke()
        ctx.strokeStyle = `rgba(${ICE},${0.35 + pulse * 0.4})`
        ctx.beginPath()
        ctx.ellipse(b[0], b[1], 1.2247 * 0.2 * S, 0.7071 * 0.2 * S, 0, 0, TAU)
        ctx.stroke()
        ctx.restore()
      })
    }

    const drawPlatform = (t: number, it: number, corePulse: number) => {
      const f = S / 100
      const ip = easeOut(it / 1.1)
      if (ip <= 0) return
      const rs = (r: number) => r * ip
      // slab thickness then top
      ctx.fillStyle = '#020f4a'
      for (let k = 0; k <= 6; k++) { ctx.beginPath(); ell(rs(1.62), -0.14 + (k / 6) * 0.14); ctx.fill() }
      ctx.save()
      ctx.translate(CX, CY); ctx.scale(1.2247, 0.7071)
      const tg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1.62 * S * ip)
      tg.addColorStop(0, 'rgba(46,104,240,1)')
      tg.addColorStop(0.6, 'rgba(14,52,170,1)')
      tg.addColorStop(1, 'rgba(6,28,120,1)')
      ctx.fillStyle = tg
      ctx.beginPath(); ctx.arc(0, 0, 1.62 * S * ip, 0, TAU); ctx.fill()
      ctx.restore()
      ctx.lineWidth = 1.6 * f + 0.4
      ctx.strokeStyle = `rgba(160,200,255,${0.75 * ip})`
      ctx.beginPath(); ell(rs(1.62), 0); ctx.stroke()

      // bright core pad
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.translate(CX, CY); ctx.scale(1.2247, 0.7071)
      const rad = 0.86 * S * ip * (1 + corePulse * 0.1)
      const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, rad)
      cg.addColorStop(0, `rgba(255,255,255,${0.95})`)
      cg.addColorStop(0.55, `rgba(200,225,255,${0.65 + corePulse * 0.3})`)
      cg.addColorStop(1, 'rgba(120,170,255,0)')
      ctx.fillStyle = cg
      ctx.beginPath(); ctx.arc(0, 0, rad, 0, TAU); ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      // inner solid ring
      ctx.lineWidth = 2 * f + 0.5
      ctx.strokeStyle = `rgba(${ICE},${0.8 * ip})`
      ctx.beginPath(); ell(rs(1.0), 0); ctx.stroke()
      // dashed ring, marching
      ctx.setLineDash([12 * f + 3, 9 * f + 3])
      ctx.lineDashOffset = -t * 18 * f
      ctx.lineWidth = 1.6 * f + 0.4
      ctx.strokeStyle = `rgba(${SKY},${0.75 * ip})`
      ctx.beginPath(); ell(rs(1.22), 0); ctx.stroke()
      ctx.setLineDash([])
      // tick ring, counter-rotating with a bright sweep
      const TICKS = 96
      const rot = -t * 0.35
      const sweep = (t * 1.1) % TAU
      for (let k = 0; k < TICKS; k++) {
        const ph = (k / TICKS) * TAU + rot
        const long = k % 6 === 0
        const dd = ((ph - sweep) % TAU + TAU) % TAU
        const lit = Math.exp(-dd * 2.2)
        const a = pt(rs(long ? 1.36 : 1.4), 0, ph)
        const b = pt(rs(1.5), 0, ph)
        ctx.strokeStyle = `rgba(${lit > 0.35 ? ICE : SKY},${(0.28 + lit * 0.7) * ip})`
        ctx.lineWidth = (long ? 1.6 : 1) * f + 0.3
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
      }
      // orbit track + three arc satellites
      ctx.strokeStyle = `rgba(${SKY},${0.28 * ip})`
      ctx.lineWidth = 1
      ctx.setLineDash([2, 7])
      ctx.beginPath(); ell(rs(1.98), 0); ctx.stroke()
      ctx.setLineDash([])
      for (let k = 0; k < 3; k++) {
        const a0 = t * 0.55 + (k / 3) * TAU
        ctx.strokeStyle = k === 0 ? `rgba(${ORG},${0.95 * ip})` : `rgba(${ICE},${0.75 * ip})`
        ctx.lineWidth = (k === 0 ? 3.2 : 2.4) * f + 0.6
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.ellipse(CX, CY, 1.2247 * rs(1.98) * S, 0.7071 * rs(1.98) * S, 0, a0, a0 + (k === 0 ? 0.62 : 0.4))
        ctx.stroke()
      }
      ctx.restore()
    }

    const drawBeam = (t: number, it: number, corePulse: number) => {
      const f = S / 100
      const bp = easeOut((it - 0.35) / 1.0)
      if (bp <= 0) return
      const top = 2.0 * bp
      const rB = 0.64
      const cxs = CX
      const yB = CY
      const yT = CY - top * S
      const rx = 1.2247 * rB * S
      const ry = 0.7071 * rB * S
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const g = ctx.createLinearGradient(0, yB, 0, yT)
      g.addColorStop(0, `rgba(170,210,255,${0.46 + corePulse * 0.2})`)
      g.addColorStop(0.55, 'rgba(110,165,255,.17)')
      g.addColorStop(1, 'rgba(90,150,255,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.moveTo(cxs - rx, yT)
      ctx.lineTo(cxs - rx, yB)
      ctx.ellipse(cxs, yB, rx, ry, 0, Math.PI, 0, true)
      ctx.lineTo(cxs + rx, yT)
      ctx.ellipse(cxs, yT, rx, ry, 0, 0, Math.PI, true)
      ctx.closePath()
      ctx.fill()
      // edge rails
      const eg = ctx.createLinearGradient(0, yB, 0, yT)
      eg.addColorStop(0, `rgba(${ICE},.55)`); eg.addColorStop(1, `rgba(${ICE},0)`)
      ctx.strokeStyle = eg
      ctx.lineWidth = 1.2
      ctx.beginPath(); ctx.moveTo(cxs - rx, yB); ctx.lineTo(cxs - rx, yT); ctx.moveTo(cxs + rx, yB); ctx.lineTo(cxs + rx, yT); ctx.stroke()
      // rising scan rings
      for (let k = 0; k < 4; k++) {
        const ph = (t * 0.32 + k / 4) % 1
        const z = ph * top
        ctx.strokeStyle = `rgba(${ICE},${0.7 * Math.sin(Math.PI * ph)})`
        ctx.lineWidth = 1.6 * f + 0.4
        ctx.beginPath(); ctx.ellipse(cxs, CY - z * S, rx, ry, 0, 0, TAU); ctx.stroke()
      }
      // rising data motes
      for (let k = 0; k < (phone ? 16 : 30); k++) {
        const seed = k * 12.9898
        const sp = 0.14 + ((Math.sin(seed) * 43758.5453) % 1 + 1) % 1 * 0.2
        const ph = ((t * sp + k * 0.137) % 1)
        const a = ((Math.sin(seed * 1.7) * 9301.31) % 1 + 1) % 1 * TAU
        const rr2 = 0.12 + (((Math.sin(seed * 2.3) * 5113.7) % 1 + 1) % 1) * 0.46
        const x = cxs + Math.cos(a + t * 0.5) * 1.2247 * rr2 * S
        const y = CY - ph * top * S + Math.sin(a + t * 0.5) * 0.7071 * rr2 * S
        ctx.fillStyle = `rgba(${ICE},${0.8 * Math.sin(Math.PI * ph)})`
        ctx.beginPath(); ctx.arc(x, y, (1.1 + (k % 3) * 0.5) * f + 0.4, 0, TAU); ctx.fill()
      }
      ctx.restore()
    }

    const drawEmblem = (t: number, it: number, corePulse: number) => {
      const ep = easeBack((it - 0.7) / 0.9)
      if (ep <= 0) return
      const f = S / 100
      const bob = Math.sin(t * 1.2) * 0.06
      const zc = 2.0 + bob
      const ex = CX
      const ey = CY - zc * S
      const size = 1.5 * S * ep
      const swivel = Math.sin(t * 0.7) * 0.5 // radians
      const sx = Math.cos(swivel)
      const depthOff = Math.sin(swivel)

      // halo
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const hr = size * (1.05 + corePulse * 0.18)
      const hg = ctx.createRadialGradient(ex, ey, 0, ex, ey, hr)
      hg.addColorStop(0, `rgba(150,195,255,${0.5 + corePulse * 0.25})`)
      hg.addColorStop(0.5, 'rgba(70,125,255,.2)')
      hg.addColorStop(1, 'rgba(40,90,240,0)')
      ctx.fillStyle = hg
      ctx.beginPath(); ctx.arc(ex, ey, hr, 0, TAU); ctx.fill()
      ctx.restore()

      // satellites behind
      const sats = (front: boolean) => {
        for (let k = 0; k < 3; k++) {
          const a = t * (0.9 + k * 0.17) + k * 2.1
          const isFront = Math.sin(a) > 0
          if (isFront !== front) continue
          const orbR = size * (0.72 + k * 0.05)
          const x = ex + Math.cos(a) * orbR
          const y = ey + Math.sin(a) * orbR * 0.3 + (k - 1) * size * 0.06
          ctx.save()
          ctx.globalCompositeOperation = 'lighter'
          const rg = ctx.createRadialGradient(x, y, 0, x, y, 7 * f + 3)
          rg.addColorStop(0, k === 0 ? `rgba(255,200,170,.95)` : 'rgba(255,255,255,.95)')
          rg.addColorStop(0.4, k === 0 ? `rgba(${ORG},.6)` : `rgba(${SKY},.55)`)
          rg.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = rg
          ctx.beginPath(); ctx.arc(x, y, 7 * f + 3, 0, TAU); ctx.fill()
          ctx.restore()
        }
      }
      sats(false)

      // emblem render: mark + scan lines + glitch band into offscreen
      emc.setTransform(1, 0, 0, 1, 0, 0)
      emc.clearRect(0, 0, EM, EM)
      emc.save(); emc.translate(EM * 0.07, EM * 0.07); drawMark(emc, EM * 0.86); emc.restore()
      emc.globalCompositeOperation = 'destination-out'
      emc.fillStyle = 'rgba(0,0,0,.26)'
      const so = Math.floor(t * 18) % 6
      for (let y = so; y < EM; y += 6) emc.fillRect(0, y, EM, 2)
      const gb = (t * 0.45) % 1
      if (gb < 0.14) { emc.fillStyle = 'rgba(0,0,0,.55)'; emc.fillRect(0, (gb / 0.14) * EM, EM, 5) }
      emc.globalCompositeOperation = 'source-over'
      emTc.setTransform(1, 0, 0, 1, 0, 0)
      emTc.clearRect(0, 0, EM, EM)
      emTc.drawImage(em, 0, 0)
      emTc.globalCompositeOperation = 'source-in'
      emTc.fillStyle = 'rgb(110,165,255)'
      emTc.fillRect(0, 0, EM, EM)
      emTc.globalCompositeOperation = 'source-over'

      ctx.save()
      ctx.translate(ex, ey)
      ctx.scale(sx, 1)
      // volumetric stack: tinted layers trail behind the front face, offset by the swivel
      ctx.globalCompositeOperation = 'lighter'
      for (let L = 4; L >= 1; L--) {
        ctx.globalAlpha = 0.16 * ep
        ctx.drawImage(emT, -size / 2 - depthOff * L * size * 0.035 / Math.max(sx, 0.5), -size / 2 + L * size * 0.012, size, size)
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = Math.min(1, ep)
      ctx.drawImage(em, -size / 2, -size / 2, size, size)
      ctx.globalCompositeOperation = 'lighter'
      ctx.globalAlpha = (0.18 + corePulse * 0.35) * ep
      ctx.drawImage(em, -size / 2, -size / 2, size, size)
      ctx.restore()
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      sats(true)
    }

    // ---- plates -------------------------------------------------------------------------------
    const illus = (kind: number, t: number, pulse: number) => {
      const c = ctx
      c.save()
      c.lineCap = 'round'
      c.lineJoin = 'round'
      const box = (x: number, y: number, w: number, h: number, label: string, hot: number) => {
        rr(x, y, w, h, 6)
        c.fillStyle = `rgba(${ICE},${0.08 + hot * 0.18})`; c.fill()
        c.strokeStyle = `rgba(${ICE},${0.5 + hot * 0.4})`; c.lineWidth = 1.3; c.stroke()
        c.fillStyle = `rgba(${ICE},.92)`; c.font = `600 13px ${FONT_MONO}`; c.textAlign = 'center'
        c.fillText(label, x + w / 2, y + h / 2 + 4.5)
        c.textAlign = 'start'
      }
      if (kind === 0) {
        box(14, 78, 54, 36, 'UI', pulse * 0.6)
        box(132, 78, 54, 36, 'API', pulse)
        c.strokeStyle = `rgba(${SKY},.5)`; c.lineWidth = 1.4; c.setLineDash([3, 5]); c.lineDashOffset = -t * 20
        c.beginPath(); c.moveTo(68, 96); c.lineTo(132, 96); c.stroke(); c.setLineDash([])
        for (let k = 0; k < 3; k++) {
          const s = (t * 0.55 + k / 3) % 1
          c.fillStyle = k % 2 ? `rgba(${ICE},.95)` : `rgba(${ORG},.95)`
          c.beginPath(); c.arc(68 + s * 64, 96 + (k % 2 ? 7 : -7) * Math.sin(s * Math.PI), 3, 0, TAU); c.fill()
        }
        c.fillStyle = `rgba(${ICE},.6)`; c.font = `10px ${FONT_MONO}`; c.textAlign = 'center'; c.fillText('REST · WS', 100, 118); c.textAlign = 'start'
      } else if (kind === 1) {
        for (let k = 0; k < 7; k++) {
          const h = 8 + 26 * (0.5 + 0.5 * Math.sin(t * 1.3 + k * 0.85)) * (0.55 + k * 0.08)
          c.fillStyle = k === 6 ? `rgba(${ORG},.95)` : `rgba(${SKY},${0.5 + k * 0.05})`
          rr(16 + k * 15, 116 - h, 10, h, 2); c.fill()
        }
        c.fillStyle = `rgba(${ICE},.95)`; c.font = `700 20px ${FONT_MONO}`
        c.fillText('+' + Math.floor(120 + 8 * Math.sin(t * 0.9) + pulse * 6) + '%', 124, 100)
        c.fillStyle = `rgba(${ICE},.55)`; c.font = `10px ${FONT_MONO}`; c.fillText('CONVERSION', 126, 116)
        c.strokeStyle = `rgba(${ORG},.9)`; c.lineWidth = 2
        c.beginPath(); c.moveTo(150, 80); c.lineTo(160, 76); c.lineTo(168, 79); c.lineTo(180, 70); c.stroke()
      } else if (kind === 2) {
        c.save()
        rr(14, 76, 172, 44, 6); c.clip()
        c.fillStyle = `rgba(${ICE},.1)`; c.fillRect(14, 76, 172, 44)
        c.fillStyle = `rgba(${ICE},.2)`; c.fillRect(14, 76, 172, 9)
        for (let k = 0; k < 3; k++) { c.fillStyle = k === 0 ? `rgba(${ORG},.95)` : `rgba(${ICE},.55)`; c.beginPath(); c.arc(22 + k * 8, 80.5, 2, 0, TAU); c.fill() }
        const hg = c.createLinearGradient(20, 90, 100, 116)
        hg.addColorStop(0, `rgba(${SKY},.6)`); hg.addColorStop(1, `rgba(${ORG},.45)`)
        c.fillStyle = hg; rr(20, 91, 70, 24, 3); c.fill()
        c.fillStyle = `rgba(${ICE},.75)`; c.fillRect(98, 93, 70, 4); c.fillRect(98, 101, 52, 4)
        c.fillStyle = `rgba(${ORG},.95)`; rr(98, 109, 28, 7, 3.5); c.fill()
        const sw = ((t * 0.45) % 1.5) * 260 - 60
        const sg = c.createLinearGradient(sw, 0, sw + 40, 40)
        sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(0.5, 'rgba(255,255,255,.35)'); sg.addColorStop(1, 'rgba(255,255,255,0)')
        c.fillStyle = sg; c.fillRect(14, 76, 172, 44)
        c.restore()
        rr(14, 76, 172, 44, 6); c.strokeStyle = `rgba(${ICE},.6)`; c.lineWidth = 1.3; c.stroke()
      } else if (kind === 3) {
        c.save(); c.translate(16, 78); drawMark(c, 38); c.restore()
        const cols = ['#FE5000', '#2F66FF', '#FFFFFF', '#9FC0FF']
        cols.forEach((col, k) => {
          const x = 78 + k * 28
          const pop = 1 + 0.12 * Math.sin(t * 2 + k) + (k === 0 ? pulse * 0.2 : 0)
          c.fillStyle = col; c.beginPath(); c.arc(x, 90, 10 * pop, 0, TAU); c.fill()
          c.fillStyle = `rgba(${ICE},.5)`; c.fillRect(x - 10, 106, 20, 3)
          c.fillStyle = `rgba(${ICE},.3)`; c.fillRect(x - 10, 112, 14, 3)
        })
      } else if (kind === 4) {
        const ph = (t * 0.45) % 1
        rr(78, 77, 108, 15, 7); c.fillStyle = `rgba(${ICE},.18)`; c.fill()
        c.fillStyle = `rgba(${ICE},.8)`; c.fillRect(88, 83, 52, 3.5)
        rr(14, 97, 118, 21, 8); c.fillStyle = `rgba(${SKY},.28)`; c.fill(); c.strokeStyle = `rgba(${SKY},.7)`; c.lineWidth = 1.1; c.stroke()
        if (ph < 0.42) {
          for (let k = 0; k < 3; k++) { c.fillStyle = `rgba(${ICE},${0.35 + 0.65 * Math.max(0, Math.sin(t * 7 - k * 1.1))})`; c.beginPath(); c.arc(28 + k * 10, 107.5, 2.6, 0, TAU); c.fill() }
        } else {
          const g = clamp01((ph - 0.42) / 0.3)
          c.fillStyle = `rgba(${ICE},.9)`; c.fillRect(24, 103, 84 * g, 3.5); c.fillRect(24, 110, 58 * g, 3.5)
        }
        c.save(); c.translate(160, 108); c.rotate(t * 0.8)
        c.fillStyle = `rgba(${ORG},.95)`; c.beginPath()
        for (let k = 0; k < 8; k++) { const r = k % 2 ? 3 : 9; const a = (k / 8) * TAU; c.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
        c.closePath(); c.fill(); c.restore()
      } else {
        c.strokeStyle = `rgba(${ICE},.85)`; c.fillStyle = `rgba(${ICE},.12)`; c.lineWidth = 1.5
        c.beginPath()
        c.moveTo(24, 114); c.arc(32, 104, 10, Math.PI / 2, Math.PI * 1.5); c.arc(46, 96, 13, Math.PI, Math.PI * 1.95); c.arc(62, 104, 10, Math.PI * 1.5, Math.PI / 2); c.closePath()
        c.fill(); c.stroke()
        const ay = 108 - ((t * 14) % 14)
        c.strokeStyle = `rgba(${ORG},.95)`; c.lineWidth = 2
        c.beginPath(); c.moveTo(44, ay); c.lineTo(44, ay - 8); c.moveTo(39, ay - 4); c.lineTo(44, ay - 9); c.lineTo(49, ay - 4); c.stroke()
        for (let k = 0; k < 3; k++) {
          rr(104, 78 + k * 14, 82, 11, 3); c.fillStyle = `rgba(${ICE},.12)`; c.fill(); c.strokeStyle = `rgba(${ICE},.5)`; c.lineWidth = 1; c.stroke()
          const on = Math.sin(t * 3 + k * 2.1) > -0.3
          c.fillStyle = on ? `rgba(${ORG},.95)` : `rgba(${ICE},.3)`; c.beginPath(); c.arc(112, 83.5 + k * 14, 2.2, 0, TAU); c.fill()
          c.fillStyle = `rgba(${ICE},.55)`; c.fillRect(122, 81.5 + k * 14, 28 + ((k * 17 + Math.floor(t * 2)) % 5) * 6, 3.5)
        }
      }
      c.restore()
    }

    const drawPlate = (i: number, t: number, it: number, dim: number) => {
      const ang = ANGLES[i]
      const p = easeBack((it - 0.55 - i * 0.12) / 0.8)
      if (p <= 0) return
      const cxw = Math.cos(ang) * R, cyw = Math.sin(ang) * R
      const ox = cxw - (PLATE_W * WU) / 2, oy = cyw - (PLATE_H * WU) / 2
      const pulse = cardPulseAt(t, i)
      const lift = hv[i]
      const z = 0.66 + Math.sin(t * 0.9 + i * 1.1) * 0.06 + lift * 0.2 + (1 - p) * 1.6
      const f = S / 100
      const alpha = clamp01(p * 1.4) * (1 - dim * (phone ? 0.2 : 0.4) * (1 - lift))

      // hit polygon (top face)
      const x1 = ox + PLATE_W * WU, y1 = oy + PLATE_H * WU
      polys[i] = [P(ox, oy, z), P(x1, oy, z), P(x1, y1, z), P(ox, y1, z)]

      ctx.save()
      ctx.globalAlpha = alpha
      // ground shadow
      setPlate(ox - 0.06, oy - 0.06, 0)
      ctx.fillStyle = `rgba(0,10,60,${0.3 * alpha})`
      rr(0, 0, PLATE_W + 12, PLATE_H + 12, 14); ctx.fill()
      setPx()
      // hologram legs
      ctx.strokeStyle = `rgba(${SKY},${0.16 + lift * 0.2})`
      ctx.lineWidth = 1
      ctx.setLineDash([3, 5])
      for (const [px, py] of [[ox, oy], [x1, oy], [x1, y1], [ox, y1]] as Array<[number, number]>) {
        const a = P(px, py, 0), b = P(px, py, z)
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
      }
      ctx.setLineDash([])
      // central light column
      const c0 = P(cxw, cyw, 0), c1 = P(cxw, cyw, z)
      const lg = ctx.createLinearGradient(0, c0[1], 0, c1[1])
      lg.addColorStop(0, `rgba(${ORG},${0.5 + pulse * 0.4})`)
      lg.addColorStop(1, `rgba(${ORG},0.04)`)
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = lg
      ctx.lineWidth = 3 * f + 0.6
      ctx.beginPath(); ctx.moveTo(c0[0], c0[1]); ctx.lineTo(c1[0], c1[1]); ctx.stroke()
      ctx.restore()

      // body thickness
      ctx.fillStyle = 'rgba(2,14,72,1)'
      for (let k = 0; k <= 4; k++) {
        setPlate(ox, oy, z - 0.075 * (1 - k / 4))
        rr(0, 0, PLATE_W, PLATE_H, 12); ctx.fill()
      }
      // top face
      setPlate(ox, oy, z)
      const tg = ctx.createLinearGradient(0, 0, PLATE_W, PLATE_H)
      tg.addColorStop(0, `rgba(${34 + lift * 18},${92 + lift * 20},234,.97)`)
      tg.addColorStop(1, 'rgba(10,44,150,.97)')
      rr(0, 0, PLATE_W, PLATE_H, 12)
      ctx.fillStyle = tg; ctx.fill()
      // gloss
      ctx.save()
      rr(0, 0, PLATE_W, PLATE_H, 12); ctx.clip()
      const gl = ctx.createLinearGradient(0, 0, PLATE_W * 0.9, PLATE_H * 0.5)
      gl.addColorStop(0, 'rgba(255,255,255,.2)'); gl.addColorStop(0.5, 'rgba(255,255,255,.04)'); gl.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gl; ctx.fillRect(0, 0, PLATE_W, PLATE_H)
      // circuit hairlines
      ctx.strokeStyle = 'rgba(180,215,255,.07)'; ctx.lineWidth = 1
      for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(0, k * 26); ctx.lineTo(PLATE_W, k * 26); ctx.stroke() }
      ctx.restore()
      // border + pulse glow
      ctx.lineWidth = 2
      ctx.strokeStyle = `rgba(170,205,255,${0.6 + lift * 0.3})`
      rr(1, 1, PLATE_W - 2, PLATE_H - 2, 12); ctx.stroke()
      if (pulse > 0.02 || lift > 0.02) {
        ctx.lineWidth = 3
        ctx.strokeStyle = `rgba(${ORG},${Math.min(1, pulse * 0.9 + lift * 0.6)})`
        rr(1, 1, PLATE_W - 2, PLATE_H - 2, 12); ctx.stroke()
      }
      // accent tab
      ctx.fillStyle = `rgba(${ORG},1)`
      rr(16, 14, 22, 4, 2); ctx.fill()

      const svc = SVCS[i]
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = `rgba(${ICE},.7)`
      ctx.font = `600 12px ${FONT_MONO}`
      ctx.fillText(String(i + 1).padStart(2, '0'), 44, 20)
      ctx.fillStyle = '#fff'
      ctx.font = `700 ${phone ? 27 : 25}px ${FONT_SANS}`
      ctx.fillText(svc.zh, 16, 49)
      if (S > 62) {
        ctx.fillStyle = `rgba(${ICE},.62)`
        ctx.font = `500 10.5px ${FONT_MONO}`
        ctx.fillText(svc.en, 16, 65)
      }
      // status dot
      ctx.fillStyle = `rgba(${ORG},${0.55 + 0.45 * Math.sin(t * 3 + i)})`
      ctx.beginPath(); ctx.arc(PLATE_W - 18, 17, 3.4, 0, TAU); ctx.fill()
      illus(i, t, pulse)
      setPx()
      ctx.restore()
    }

    const drawTooltip = (idx: number) => {
      if (phone || idx < 0) return
      const svc = SVCS[idx]
      const poly = polys[idx]
      if (!poly.length) return
      const bx0 = Math.min(...poly.map((q) => q[0])), bx1 = Math.max(...poly.map((q) => q[0]))
      const by0 = Math.min(...poly.map((q) => q[1])), by1 = Math.max(...poly.map((q) => q[1]))
      const w = 272
      ctx.save()
      ctx.font = `13px ${FONT_SANS}`
      const lines = wrap(svc.desc, w - 28)
      const h = 70 + lines.length * 19
      // sits just below the plate (above it when there is no room), never on top of it
      let x = (bx0 + bx1) / 2 - w / 2
      let y = by1 + 18
      if (y + h > H - 12) y = by0 - h - 18
      x = Math.max(12, Math.min(W - w - 12, x))
      y = Math.max(84, y)
      const a = clamp01(hv[idx])
      ctx.globalAlpha = a
      rr(x, y, w, h, 14)
      ctx.fillStyle = 'rgba(3,12,56,.92)'; ctx.fill()
      ctx.strokeStyle = `rgba(${SKY},.5)`; ctx.lineWidth = 1; ctx.stroke()
      ctx.fillStyle = `rgba(${ORG},1)`; ctx.font = `600 10.5px ${FONT_MONO}`
      ctx.fillText(`SERVICE // ${String(idx + 1).padStart(2, '0')}`, x + 14, y + 22)
      ctx.fillStyle = '#fff'; ctx.font = `700 17px ${FONT_SANS}`
      ctx.fillText(svc.zh, x + 14, y + 44)
      const zw = ctx.measureText(`${svc.zh}  `).width
      ctx.font = `10.5px ${FONT_MONO}`; ctx.fillStyle = `rgba(${ICE},.6)`
      ctx.fillText(svc.en, x + 14 + zw, y + 44)
      ctx.font = `13px ${FONT_SANS}`; ctx.fillStyle = `rgba(${ICE},.88)`
      lines.forEach((ln, k) => ctx.fillText(ln, x + 14, y + 68 + k * 19))
      ctx.restore()
    }

    // ---- frame --------------------------------------------------------------------------------
    const frame = () => {
      const now = performance.now()
      const dt = Math.min((now - lastNow) / 1000, 0.05) || 1 / 60
      lastNow = now
      const t = animate ? now / 1000 : 2.6
      const it = animate ? (now - start) / 1000 : 9

      // layout: copy sits on the left on wide screens, diagram fills the band below the copy on phones
      if (phone) {
        S = Math.min((W / 2 + 12) / 4.45, 58)
        CX = W / 2
        CY = H - 84 - S * 3.0 - 6 // above the bottom tab bar
      } else {
        const cxT = W * 0.73
        S = Math.max(46, Math.min((cxT - W * 0.43) / 4.9, (H * 0.9) / 6.2, 122))
        CX = cxT
        CY = H * 0.5 + S * 0.35
      }
      const yawT = animate ? (mouse.nx * (phone ? 0 : 0.3) + Math.sin(t * 0.22) * 0.06) : 0
      yaw += (yawT - yaw) * (1 - Math.exp(-dt * 4))
      pitchOff += ((animate ? mouse.ny * 10 : 0) - pitchOff) * (1 - Math.exp(-dt * 4))
      CY += pitchOff
      cosY = Math.cos(yaw); sinY = Math.sin(yaw)

      // hover / tap / tour
      if (tapPoint) {
        const [tx, ty] = tapPoint
        tapPoint = null
        shock = t
        const hit = polys.findIndex((poly) => poly.length && inPoly(tx, ty, poly))
        if (hit >= 0) { pinned = hit; pinnedAt = t }
      }
      let target = -1
      if (!phone && mouse.x > -9000) target = polys.findIndex((poly) => poly.length && inPoly(mouse.x, mouse.y, poly))
      if (target < 0 && pinned >= 0 && t - pinnedAt < 4.5) target = pinned
      if (target < 0 && (phone || window.matchMedia('(pointer: coarse)').matches) && animate && it > 2.2) {
        if (t - tourAt > 3.4) { tour = (tour + 1) % SVCS.length; tourAt = t }
        target = tour
      }
      hovered = target
      const k = 1 - Math.exp(-dt * 9)
      SVCS.forEach((_, i) => { hv[i] += ((i === hovered ? 1 : 0) - hv[i]) * k })

      const corePulse = corePulseAt(t)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'round'

      drawGround(t, it, corePulse)
      drawTraces(t, it)

      // depth-sort plates: those behind the hub first, then hub, then plates in front
      const order = SVCS.map((_, i) => ({ i, d: Math.cos(ANGLES[i]) * (cosY + sinY) + Math.sin(ANGLES[i]) * (cosY - sinY) }))
        .sort((a, b) => a.d - b.d)
      const dim = hovered >= 0 ? 1 : 0
      for (const o of order) if (o.d < 0) drawPlate(o.i, t, it, dim)
      drawPlatform(t, it, corePulse)
      drawBeam(t, it, corePulse)
      drawEmblem(t, it, corePulse)
      for (const o of order) if (o.d >= 0) drawPlate(o.i, t, it, dim)
      drawTooltip(hovered)
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    const stop = startFrameLoop({ host: cv.parentElement, frame })

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('heroTap', onTap)
    }
  }, [active])

  return (
    <div className={'hv-bg' + (active ? ' on' : '')}>
      <canvas ref={ref} className="hb-cv" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
