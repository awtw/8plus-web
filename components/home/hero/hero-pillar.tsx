'use client'

import { useEffect, useRef } from 'react'
import { shouldAnimate, startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero — "Pillar": a minimal isometric monolith.
 *
 * An orange sphere (the request) rests on a low pad; a tall three-tier pillar (system boundary → stack
 * selection → production) carries a pearl sphere (the delivered system) on top. On a 7.5s loop the request
 * leaves the pad, runs the ground line to the pillar, climbs its edge lighting each tier in turn, and the
 * top sphere answers with a flash and ground ripples.
 * Thin-line ground plate with outward extension lines, gradient glass faces fading into the floor.
 * Canvas 2D, time-based, paused off-screen by startFrameLoop, one settled frame for reduced motion / Data Saver.
 */

const TAU = Math.PI * 2
const ICE = '225,244,255'
const SKY = '130,180,255'
const ORG = '254,80,0'
const FONT_SANS = '"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif'
const FONT_MONO = 'ui-monospace,"JetBrains Mono",SFMono-Regular,monospace'

const TIERS = [
  { n: '01', zh: '系統邊界', en: 'BOUNDARY' },
  { n: '02', zh: '技術選型', en: 'STACK' },
  { n: '03', zh: '生產落地', en: 'PRODUCTION' },
]

// world layout (x, y on the ground; z up)
const PIL = { x0: 0.55, x1: 1.85, y0: -1.65, y1: -0.35, h: 3.5 }
const PAD = { x0: -1.65, x1: -0.35, y0: 1.35, y1: 2.65, h: 0.1 }
const PLATE = { x0: -2.3, x1: 2.7, y0: -2.3, y1: 3.1 }
const PERIOD = 7.5

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3)
const easeInOut = (v: number) => { const x = clamp01(v); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }

export default function HeroPillar({ active }: { active: boolean }) {
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

    const mouse = { nx: 0, ny: 0 }
    const onMove = (e: MouseEvent) => {
      mouse.nx = e.clientX / window.innerWidth - 0.5
      mouse.ny = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let S = 90, CX = 0, CY = 0, cosY = 1, sinY = 0, yaw = 0
    let lastNow = performance.now()
    const start = lastNow
    let shock = -99
    const onTap = () => { shock = performance.now() / 1000 }
    window.addEventListener('heroTap', onTap)

    const P = (x: number, y: number, z: number): [number, number] => {
      const X = x * cosY - y * sinY
      const Y = x * sinY + y * cosY
      return [CX + (X - Y) * 0.866 * S, CY + (X + Y) * 0.5 * S - z * S]
    }
    const poly = (pts: Array<[number, number]>) => {
      ctx.beginPath()
      pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])))
      ctx.closePath()
    }
    // faces seen from the camera: 'L' = +y face (lower left), 'R' = +x face (lower right)
    const face = (b: { x0: number; x1: number; y0: number; y1: number }, which: 'L' | 'R', za: number, zb: number) =>
      which === 'L'
        ? [P(b.x0, b.y1, za), P(b.x1, b.y1, za), P(b.x1, b.y1, zb), P(b.x0, b.y1, zb)]
        : [P(b.x1, b.y0, za), P(b.x1, b.y1, za), P(b.x1, b.y1, zb), P(b.x1, b.y0, zb)]
    const top = (b: { x0: number; x1: number; y0: number; y1: number }, z: number) =>
      [P(b.x0, b.y0, z), P(b.x1, b.y0, z), P(b.x1, b.y1, z), P(b.x0, b.y1, z)]
    const ell = (x: number, y: number, z: number, r: number) =>
      ctx.ellipse(...(P(x, y, z) as [number, number]), 1.2247 * r * S, 0.7071 * r * S, 0, 0, TAU)

    const sphere = (cx: number, cy: number, r: number, c0: string, c1: string, c2: string, glow: number) => {
      if (glow > 0.01) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const g = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * (2.2 + glow))
        g.addColorStop(0, `rgba(${ORG},${0.5 * glow})`)
        g.addColorStop(1, `rgba(${ORG},0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(cx, cy, r * (2.2 + glow), 0, TAU); ctx.fill()
        ctx.restore()
      }
      const g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r)
      g.addColorStop(0, c0); g.addColorStop(0.55, c1); g.addColorStop(1, c2)
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill()
      // rim light
      ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(cx, cy, r - 0.5, Math.PI * 0.9, Math.PI * 1.6); ctx.stroke()
    }

    const frame = () => {
      const now = performance.now()
      const dt = Math.min((now - lastNow) / 1000, 0.05) || 1 / 60
      lastNow = now
      const t = animate ? now / 1000 : 4.9
      const it = animate ? (now - start) / 1000 : 9
      const f0 = animate ? ((t % PERIOD) + PERIOD) % PERIOD : 4.9

      if (phone) {
        S = Math.min((W / 2 + 10) / 4.5, 56)
        CX = W * 0.4 // leaves room on the right for the tier tags
        CY = H - 84 - S * 2.9 - 6
      } else {
        const cxT = W * 0.72
        S = Math.max(44, Math.min((cxT - W * 0.45) / 4.5, (H * 0.86) / 6.9, 120))
        CX = cxT
        CY = H * 0.5 + S * 0.8
      }
      const yawT = animate && !phone ? mouse.nx * 0.28 + Math.sin(t * 0.2) * 0.04 : 0
      yaw += (yawT - yaw) * (1 - Math.exp(-dt * 4))
      cosY = Math.cos(yaw); sinY = Math.sin(yaw)
      const f = S / 100

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'

      // ---- loop timeline
      const run = clamp01(f0 / 2.2) // request along the ground line
      const climb = easeInOut((f0 - 2.2) / 2.4) // up the pillar edge
      const arrive = f0 >= 4.6 ? f0 - 4.6 : -1 // top sphere answers
      const fade = 1 - clamp01((f0 - 6.0) / 1.2)
      const grow = easeOut((it - 0.2) / 1.5)
      const H_P = PIL.h * grow
      const topFlash = arrive >= 0 ? Math.exp(-arrive * 2.2) : 0
      const padFlash = f0 < 1 ? 1 - f0 : 0

      // ---- ground glow + plate
      const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, S * 4.8)
      g.addColorStop(0, 'rgba(60,120,255,.4)'); g.addColorStop(1, 'rgba(0,47,167,0)')
      ctx.save(); ctx.translate(CX, CY); ctx.scale(1, 0.58); ctx.translate(-CX, -CY)
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, S * 4.8, 0, TAU); ctx.fill(); ctx.restore()

      const pe = easeOut(it / 1.1)
      const plateQuad = [P(PLATE.x0, PLATE.y0, 0), P(PLATE.x1, PLATE.y0, 0), P(PLATE.x1, PLATE.y1, 0), P(PLATE.x0, PLATE.y1, 0)]
      ctx.globalAlpha = pe
      poly(plateQuad)
      ctx.fillStyle = 'rgba(8,40,150,.34)'; ctx.fill()
      ctx.strokeStyle = `rgba(${ICE},.55)`; ctx.lineWidth = 1.3; ctx.stroke()
      // sparse inner grid
      ctx.strokeStyle = `rgba(${SKY},.14)`; ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = Math.ceil(PLATE.x0); x < PLATE.x1; x++) { const a = P(x, PLATE.y0, 0), b = P(x, PLATE.y1, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]) }
      for (let y = Math.ceil(PLATE.y0); y < PLATE.y1; y++) { const a = P(PLATE.x0, y, 0), b = P(PLATE.x1, y, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]) }
      ctx.stroke()
      // extension lines out of the corners, fading
      const ext = (x: number, y: number, dx: number, dy: number) => {
        const a = P(x, y, 0), b = P(x + dx * 2.6, y + dy * 2.6, 0)
        const lg = ctx.createLinearGradient(a[0], a[1], b[0], b[1])
        lg.addColorStop(0, `rgba(${ICE},.5)`); lg.addColorStop(1, `rgba(${ICE},0)`)
        ctx.strokeStyle = lg; ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
      }
      ext(PLATE.x1, PLATE.y0, 1, 0); ext(PLATE.x0, PLATE.y0, -1, 0); ext(PLATE.x0, PLATE.y0, 0, -1)
      ext(PLATE.x1, PLATE.y1, 1, 0); ext(PLATE.x1, PLATE.y1, 0, 1); ext(PLATE.x0, PLATE.y1, 0, 1)
      ctx.globalAlpha = 1

      // ground path pad -> pillar (L-shaped), dotted stream
      const pcx = (PAD.x0 + PAD.x1) / 2, pcy = (PAD.y0 + PAD.y1) / 2
      const qx = (PIL.x0 + PIL.x1) / 2
      const path: Array<[number, number]> = [[pcx, pcy], [qx, pcy], [qx, PIL.y1]]
      const seg = [Math.abs(qx - pcx), Math.abs(PIL.y1 - pcy)]
      const total = seg[0] + seg[1]
      const at = (s: number): [number, number] => {
        const d = s * total
        return d <= seg[0] ? [pcx + (qx - pcx) * (d / seg[0]), pcy] : [qx, pcy + (PIL.y1 - pcy) * ((d - seg[0]) / seg[1])]
      }
      const pp = path.map(([x, y]) => P(x, y, 0.02))
      ctx.save()
      ctx.globalAlpha = easeOut((it - 0.9) / 0.8)
      ctx.strokeStyle = `rgba(${SKY},.4)`; ctx.lineWidth = 1.2
      ctx.beginPath(); pp.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke()
      ctx.globalCompositeOperation = 'lighter'
      ctx.setLineDash([0.1, 10 * f + 4]); ctx.lineDashOffset = -t * 24 * f
      ctx.strokeStyle = `rgba(${ICE},.85)`; ctx.lineWidth = 3.2 * f + 0.8
      ctx.beginPath(); pp.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke()
      ctx.restore()

      // ---- pad
      const padTop = top(PAD, PAD.h)
      ;[face(PAD, 'L', 0, PAD.h), face(PAD, 'R', 0, PAD.h)].forEach((q, i) => {
        poly(q); ctx.fillStyle = i ? 'rgba(150,185,255,.5)' : 'rgba(210,228,255,.7)'; ctx.fill()
      })
      poly(padTop); ctx.fillStyle = 'rgba(235,244,255,.92)'; ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1; ctx.stroke()
      // pad ring that answers the emit
      ctx.strokeStyle = `rgba(${ORG},${0.25 + padFlash * 0.7})`; ctx.lineWidth = 1.6
      ctx.beginPath(); ell(pcx, pcy, PAD.h + 0.01, 0.62 + padFlash * 0.25); ctx.stroke()

      // ---- orange request sphere on the pad (hidden while it travels)
      const leaving = f0 < 0.5 ? 0 : f0 < 2.2 ? 1 : 0
      const rP = 0.5 * S
      const bobP = Math.sin(t * 1.4) * 0.04
      const sp = P(pcx, pcy, PAD.h + 0.5 + bobP)
      // soft contact shadow
      ctx.fillStyle = 'rgba(0,20,90,.35)'
      ctx.beginPath(); ctx.ellipse(...(P(pcx, pcy, PAD.h) as [number, number]), 0.62 * S * 1.2247 * 0.8, 0.62 * S * 0.7071 * 0.8, 0, 0, TAU); ctx.fill()
      ctx.globalAlpha = easeOut((it - 0.5) / 0.8) * (leaving ? 0.35 : 1)
      sphere(sp[0], sp[1], rP, '#FFC9A8', '#FE5000', '#8A2300', padFlash * 0.8)
      ctx.globalAlpha = 1

      // ---- pillar
      const hp = Math.max(H_P, 0.001)
      const faceGrad = (q: Array<[number, number]>, a0: number, a1: number, tint: string) => {
        const gg = ctx.createLinearGradient(0, q[2][1], 0, q[0][1])
        gg.addColorStop(0, `rgba(${tint},${a0})`)
        gg.addColorStop(1, `rgba(${tint},${a1})`)
        poly(q); ctx.fillStyle = gg; ctx.fill()
      }
      const Lq = face(PIL, 'L', 0, hp), Rq = face(PIL, 'R', 0, hp), Tq = top(PIL, hp)
      faceGrad(Lq, 0.92, 0.04, '236,244,255')
      faceGrad(Rq, 0.5, 0.02, '120,170,255')
      poly(Tq); ctx.fillStyle = 'rgba(255,255,255,.96)'; ctx.fill()

      // tier lines + lit tiers
      for (let k = 0; k < 3; k++) {
        const za = (hp * k) / 3, zb = (hp * (k + 1)) / 3
        const reach = clamp01((climb * PIL.h - (PIL.h * k) / 3) / (PIL.h / 3))
        const lit = (f0 >= 2.2 ? reach : 0) * fade * (grow > 0.98 ? 1 : 0)
        if (lit > 0.01) {
          ctx.save(); ctx.globalCompositeOperation = 'lighter'
          for (const w of ['L', 'R'] as const) {
            poly(face(PIL, w, za, zb)); ctx.fillStyle = `rgba(${ORG},${lit * (w === 'L' ? 0.5 : 0.36)})`; ctx.fill()
          }
          ctx.restore()
        }
        if (k > 0) {
          ctx.strokeStyle = 'rgba(0,47,167,.35)'; ctx.lineWidth = 1
          for (const w of ['L', 'R'] as const) {
            const q = face(PIL, w, za, za)
            ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]); ctx.lineTo(q[1][0], q[1][1]); ctx.stroke()
          }
        }
      }
      // slow scan line up both faces
      if (grow > 0.98) {
        const z = ((t * 0.32) % 1) * hp
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        ctx.strokeStyle = `rgba(${ICE},.55)`; ctx.lineWidth = 1.4
        for (const w of ['L', 'R'] as const) { const q = face(PIL, w, z, z); ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]); ctx.lineTo(q[1][0], q[1][1]); ctx.stroke() }
        ctx.restore()
      }
      // vertical edges
      ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1
      const e0 = P(PIL.x1, PIL.y1, 0), e1 = P(PIL.x1, PIL.y1, hp)
      ctx.beginPath(); ctx.moveTo(e0[0], e0[1]); ctx.lineTo(e1[0], e1[1]); ctx.stroke()
      poly(Tq); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.stroke()

      // ground ripples after the answer (and on tap)
      const ripple = (age: number, max: number) => {
        if (age < 0 || age > max) return
        const ph = age / max
        ctx.strokeStyle = `rgba(${ORG},${0.7 * (1 - ph)})`; ctx.lineWidth = 1.6
        ctx.beginPath(); ell((PIL.x0 + PIL.x1) / 2, (PIL.y0 + PIL.y1) / 2, 0.01, 1.1 + ph * 3.2); ctx.stroke()
      }
      ripple(arrive, 2.2)
      ripple(t - shock, 2)

      // ---- pearl delivered-system sphere on top
      const rT = 0.56 * S
      const bobT = Math.sin(t * 1.1 + 1) * 0.05
      const tx = (PIL.x0 + PIL.x1) / 2, ty = (PIL.y0 + PIL.y1) / 2
      const tp = P(tx, ty, hp + 0.56 + bobT)
      if (grow > 0.2) {
        ctx.fillStyle = 'rgba(0,20,90,.28)'
        ctx.beginPath(); ctx.ellipse(...(P(tx, ty, hp) as [number, number]), 0.68 * S * 1.2247 * 0.8, 0.68 * S * 0.7071 * 0.8, 0, 0, TAU); ctx.fill()
        // thin orbit ring
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        ctx.strokeStyle = `rgba(${ICE},${0.35 + topFlash * 0.5})`; ctx.lineWidth = 1.2
        const a0 = t * 0.9
        ctx.beginPath(); ctx.ellipse(tp[0], tp[1], rT * 1.5, rT * 0.5, 0, a0, a0 + Math.PI * 1.35); ctx.stroke()
        ctx.restore()
        sphere(tp[0], tp[1], rT, '#FFFFFF', '#BCD3FF', '#3A63D8', topFlash)
      }

      // ---- travelling request packet (ground, then up the edge)
      const packet = (x: number, y: number, rgb: string, k: number) => {
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        const rr = (11 * f + 4) * k
        const gl = ctx.createRadialGradient(x, y, 0, x, y, rr)
        gl.addColorStop(0, 'rgba(255,255,255,.95)'); gl.addColorStop(0.35, `rgba(${rgb},.6)`); gl.addColorStop(1, `rgba(${rgb},0)`)
        ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill()
        ctx.restore()
      }
      if (animate && grow > 0.98) {
        if (f0 < 2.2) {
          const [wx, wy] = at(easeInOut(run))
          const s = P(wx, wy, 0.06)
          // tail
          const [tx0, ty0] = at(Math.max(0, easeInOut(run) - 0.06))
          const s0 = P(tx0, ty0, 0.06)
          const tg = ctx.createLinearGradient(s0[0], s0[1], s[0], s[1])
          tg.addColorStop(0, `rgba(${ORG},0)`); tg.addColorStop(1, `rgba(${ORG},.9)`)
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = tg; ctx.lineWidth = 3 * f + 1
          ctx.beginPath(); ctx.moveTo(s0[0], s0[1]); ctx.lineTo(s[0], s[1]); ctx.stroke(); ctx.restore()
          packet(s[0], s[1], ORG, 1.1)
        } else if (f0 < 4.6) {
          const s = P(PIL.x1, PIL.y1, 0.05 + climb * (PIL.h - 0.05))
          packet(s[0], s[1], ORG, 1)
        }
      }

      // ---- tier tags
      if (grow > 0.98) {
        ctx.font = `600 ${Math.max(10, Math.round(f * 14))}px ${FONT_MONO}`
        TIERS.forEach((tr, k) => {
          const zmid = (PIL.h * (k + 0.5)) / 3
          const reach = clamp01((climb * PIL.h - (PIL.h * k) / 3) / (PIL.h / 3))
          const lit = (f0 >= 2.2 ? reach : 0) * fade
          const a = P(PIL.x1, PIL.y0, zmid)
          const len = (phone ? 22 : 40) * Math.max(f, 0.6)
          const b: [number, number] = [a[0] + len, a[1]]
          ctx.strokeStyle = `rgba(${lit > 0.2 ? ORG : ICE},${0.35 + lit * 0.6})`; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
          ctx.fillStyle = `rgba(${lit > 0.2 ? ORG : ICE},${0.6 + lit * 0.4})`
          ctx.beginPath(); ctx.arc(a[0], a[1], 2.6 + lit * 1.4, 0, TAU); ctx.fill()
          ctx.fillStyle = `rgba(${ICE},${0.62 + lit * 0.38})`
          ctx.fillText(tr.n, b[0] + 6, b[1] - 5)
          if (!phone || W > 340) {
            ctx.font = `700 ${Math.max(13, Math.round(f * 18))}px ${FONT_SANS}`
            ctx.fillStyle = '#fff'
            ctx.fillText(tr.zh, b[0] + 6, b[1] + Math.max(12, f * 18) - 2)
            ctx.font = `600 ${Math.max(10, Math.round(f * 14))}px ${FONT_MONO}`
          }
        })
      }
      ctx.globalAlpha = 1
    }

    const stop = startFrameLoop({ host: cv.parentElement, frame })
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('heroTap', onTap)
    }
  }, [active])

  return (
    <div className={'hv-bg' + (active ? ' on' : '')}>
      <canvas ref={ref} className="hb-cv" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
