'use client'

import { useEffect, useRef } from 'react'
import { shouldAnimate, startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero — "Orb": an AI assistant panel.
 *
 * A glowing, breathing ring (8plus orange → white → blue) sits over a glass chat panel. On a 10s loop a
 * suggestion card is picked, its question is typed into the input, a cursor presses send, the ring "thinks"
 * (faster, wider wobble) and the answer streams in as three engineering steps — boundary, stack, production —
 * each ticking off. Then the greeting returns and the next card slides in.
 * Canvas 2D, time-based, paused off-screen by startFrameLoop, one settled frame for reduced motion / Data Saver.
 */

const TAU = Math.PI * 2
const ICE = '225,244,255'
const SKY = '130,180,255'
const ORG = '254,80,0'
const FONT_SANS = '"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif'
const FONT_MONO = 'ui-monospace,"JetBrains Mono",SFMono-Regular,monospace'

const PROMPTS = [
  { chip: '規劃一個 RAG 知識庫客服', ask: '幫我規劃 RAG 知識庫客服', steps: ['釐清資料來源與權限邊界', '選定模型、向量庫與檢索', '評測、監控並灰度上線'] },
  { chip: '電商網站串接金流與庫存', ask: '電商網站要串接金流與庫存', steps: ['定義訂單、庫存與金流流程', '選型 Shopify 或自建 API', '壓測、監控並分階段上線'] },
  { chip: '把 LLM 接進現有 CRM', ask: '想把 LLM 接進現有 CRM', steps: ['盤點 CRM 資料與存取權限', '設計 Agent 工具與提示', '加上評測、成本控管與備援'] },
  { chip: '評估雲端架構與成本', ask: '幫我評估雲端架構與成本', steps: ['整理流量、SLA 與預算邊界', '比較託管方案與自建', 'CI/CD、監控與降級備援'] },
]
const CYCLE = 10

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3)
const easeInOut = (v: number) => { const x = clamp01(v); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 }

export default function HeroOrb({ active }: { active: boolean }) {
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
    let tapAt = -99
    const onTap = () => { tapAt = performance.now() / 1000 }
    window.addEventListener('heroTap', onTap)

    let tilt = 0
    let tiltY = 0
    let level = 0.25
    let spin = 0
    let lastNow = performance.now()
    const start = lastNow

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

    const ringGradient = (cx: number, cy: number, a0: number, R: number): CanvasGradient => {
      const stops: Array<[number, string]> = [
        [0, 'rgb(254,80,0)'], [0.16, 'rgb(255,140,86)'], [0.32, 'rgb(255,236,226)'],
        [0.48, 'rgb(150,196,255)'], [0.68, 'rgb(47,102,255)'], [0.86, 'rgb(110,150,255)'], [1, 'rgb(254,80,0)'],
      ]
      const c = ctx as CanvasRenderingContext2D & { createConicGradient?: (a: number, x: number, y: number) => CanvasGradient }
      const g = c.createConicGradient ? c.createConicGradient(a0, cx, cy) : ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
      stops.forEach(([o, col]) => g.addColorStop(o, col))
      return g
    }

    const drawRing = (cx: number, cy: number, R: number, t: number, amp: number, spinA: number, tx: number, ty: number) => {
      const N = 120
      const outer: Array<[number, number]> = []
      const inner: Array<[number, number]> = []
      for (let i = 0; i < N; i++) {
        const th = (i / N) * TAU
        const ro = R * (1 + amp * (0.6 * Math.sin(2 * th + t * 1.3) + 0.4 * Math.sin(3 * th - t * 0.9) + 0.15 * Math.sin(5 * th + t * 2)))
        const ri = R * 0.76 * (1 + amp * 1.2 * (0.6 * Math.sin(2 * th - t * 1.1 + 2) + 0.4 * Math.sin(4 * th + t * 1.4)))
        outer.push([cx + tx + ro * Math.cos(th), cy + ty + ro * Math.sin(th) * 0.93])
        inner.push([cx + tx * 0.4 + ri * Math.cos(th) * 0.98, cy + ty * 0.4 + R * 0.14 + ri * Math.sin(th) * 0.72])
      }
      const path = (pts: Array<[number, number]>) => { pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath() }
      const grad = ringGradient(cx, cy, spinA, R)

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      // ambient bloom under the ring
      const bg = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 2.4)
      bg.addColorStop(0, `rgba(${ORG},${0.16 + amp * 1.2})`)
      bg.addColorStop(0.5, 'rgba(47,102,255,.14)')
      bg.addColorStop(1, 'rgba(0,47,167,0)')
      ctx.fillStyle = bg
      ctx.beginPath(); ctx.arc(cx, cy, R * 2.4, 0, TAU); ctx.fill()
      // glow strokes
      ctx.strokeStyle = grad
      for (const [w, a] of [[R * 0.34, 0.07], [R * 0.2, 0.12], [R * 0.09, 0.22]] as Array<[number, number]>) {
        ctx.globalAlpha = a
        ctx.lineWidth = w
        ctx.beginPath(); path(outer); ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.restore()

      // body: thick at the top, thin at the bottom (perspective lip)
      ctx.beginPath(); path(outer); path(inner)
      ctx.fillStyle = grad
      ctx.fill('evenodd')
      // inner lip highlight
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = grad
      ctx.lineWidth = Math.max(1.2, R * 0.025)
      ctx.globalAlpha = 0.9
      ctx.beginPath(); path(inner); ctx.stroke()
      ctx.restore()
    }

    const frame = () => {
      const now = performance.now()
      const dt = Math.min((now - lastNow) / 1000, 0.05) || 1 / 60
      lastNow = now
      const t = animate ? now / 1000 : 0
      const it = animate ? (now - start) / 1000 : 9
      const ct = animate ? Math.max(0, it - 0.9) : 6.4 // loop clock
      const cyc = Math.floor(ct / CYCLE)
      const f0 = ct - cyc * CYCLE
      const pr = PROMPTS[cyc % PROMPTS.length]

      // ---- layout
      let pw: number, ph: number, cx: number, cy: number
      if (phone) {
        pw = W - 32
        ph = Math.min(pw * 1.04, H - 84 - 340)
        ph = Math.max(ph, 300)
        cx = W / 2
        cy = H - 84 - ph / 2 - 8
      } else {
        pw = Math.min(W * 0.34, 440)
        ph = Math.min(pw * 1.12, H * 0.86)
        cx = W * 0.72
        cy = H * 0.5 + 12
      }
      const px0 = cx - pw / 2
      const py0 = cy - ph / 2
      const u = pw / 440

      // ---- timeline levels
      const typingP = clamp01((f0 - 1.0) / 2.0)
      const clickT = 3.6
      const think = clamp01((f0 - clickT) / 0.5) * (1 - clamp01((f0 - 8.0) / 1.0))
      const typing = f0 > 1.0 && f0 < 3.0 ? 1 : 0
      const lvT = 0.22 + typing * (0.3 + 0.2 * Math.sin(t * 14)) + think * 0.55 + (t - tapAt < 1.2 ? 0.5 * Math.exp(-(t - tapAt) * 3) : 0)
      level += (lvT - level) * (1 - Math.exp(-dt * 6))
      spin += dt * (0.35 + think * 1.9 + typing * 0.6)
      tilt += ((animate && !phone ? mouse.nx * 10 : 0) - tilt) * (1 - Math.exp(-dt * 4))
      tiltY += ((animate && !phone ? mouse.ny * 6 : 0) - tiltY) * (1 - Math.exp(-dt * 4))
      const appear = easeOut(it / 1.0)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = appear

      // ---- glass panel
      const pg = ctx.createLinearGradient(px0, py0, px0 + pw * 0.4, py0 + ph)
      pg.addColorStop(0, 'rgba(8,24,96,.72)')
      pg.addColorStop(1, 'rgba(2,10,52,.82)')
      rr(px0, py0 + (1 - appear) * 20, pw, ph, 26 * Math.max(u, 0.7))
      ctx.fillStyle = pg; ctx.fill()
      ctx.strokeStyle = 'rgba(190,215,255,.22)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.save()
      rr(px0, py0, pw, ph, 26 * Math.max(u, 0.7)); ctx.clip()
      const tg = ctx.createRadialGradient(cx, py0, 0, cx, py0, pw * 0.7)
      tg.addColorStop(0, `rgba(${ORG},.14)`); tg.addColorStop(1, 'rgba(254,80,0,0)')
      ctx.fillStyle = tg; ctx.fillRect(px0, py0, pw, ph)
      const bgl = ctx.createRadialGradient(cx, py0 + ph, 0, cx, py0 + ph, pw * 0.8)
      bgl.addColorStop(0, 'rgba(47,102,255,.28)'); bgl.addColorStop(1, 'rgba(47,102,255,0)')
      ctx.fillStyle = bgl; ctx.fillRect(px0, py0, pw, ph)

      // ---- ring
      const R = pw * (phone ? 0.15 : 0.155)
      const ringY = py0 + ph * 0.215
      drawRing(cx, ringY, R, t, 0.02 + level * 0.07, spin * 0.9, tilt * 0.4, tiltY * 0.4)

      // ---- greeting / answer
      const gy = py0 + ph * 0.545
      const fs = Math.max(17, Math.round(pw * 0.062))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'alphabetic'
      const greetA = 1 - clamp01((f0 - (clickT + 0.1)) / 0.4) + clamp01((f0 - 9.2) / 0.7)
      if (greetA > 0.01) {
        ctx.globalAlpha = appear * Math.min(1, greetA)
        ctx.font = `500 ${fs}px ${FONT_SANS}`
        ctx.fillStyle = `rgba(${ICE},.8)`
        ctx.fillText('你好，我是 8plus 的 AI 助理', cx, gy)
        ctx.fillStyle = '#fff'
        ctx.fillText('今天想打造什麼系統？', cx, gy + fs * 1.4)
      }
      // answer: three steps ticking off
      if (f0 > clickT + 0.5 && f0 < 9.6) {
        const outA = 1 - clamp01((f0 - 9.0) / 0.5)
        const lh = Math.max(24, ph * 0.072)
        const ax = px0 + pw * 0.11
        ctx.textAlign = 'left'
        ctx.font = `600 ${Math.max(10, Math.round(11 * u))}px ${FONT_MONO}`
        const stepFs = Math.max(13, Math.round(pw * 0.043))
        // header
        ctx.globalAlpha = appear * outA * clamp01((f0 - clickT - 0.5) / 0.4)
        ctx.fillStyle = `rgba(${ORG},1)`
        ctx.fillText('PLAN // 工程拆解', ax, py0 + ph * 0.44)
        pr.steps.forEach((st, k) => {
          const s0 = clickT + 1.0 + k * 1.2
          const a = clamp01((f0 - s0) / 0.45)
          if (a <= 0) return
          const y = py0 + ph * 0.5 + k * lh
          ctx.globalAlpha = appear * outA * a
          ctx.fillStyle = `rgba(${ICE},.55)`
          ctx.font = `600 ${Math.max(10, Math.round(11 * u))}px ${FONT_MONO}`
          ctx.fillText(String(k + 1).padStart(2, '0'), ax, y + (1 - a) * 8)
          ctx.fillStyle = '#fff'
          ctx.font = `500 ${stepFs}px ${FONT_SANS}`
          // typewriter reveal
          const shown = Math.floor(st.length * clamp01((f0 - s0) / 0.9))
          ctx.fillText(st.slice(0, shown), ax + 28 * Math.max(u, 0.8), y + (1 - a) * 8)
          // tick appears after the line completes
          const done = clamp01((f0 - s0 - 0.9) / 0.3)
          if (done > 0) {
            const tx0 = px0 + pw * 0.89, ty0 = y - stepFs * 0.32
            ctx.strokeStyle = `rgba(${ORG},${done})`; ctx.lineWidth = 2
            ctx.beginPath(); ctx.arc(tx0, ty0, stepFs * 0.5, 0, TAU); ctx.stroke()
            ctx.beginPath(); ctx.moveTo(tx0 - stepFs * 0.2, ty0); ctx.lineTo(tx0 - stepFs * 0.04, ty0 + stepFs * 0.17); ctx.lineTo(tx0 + stepFs * 0.22, ty0 - stepFs * 0.15); ctx.stroke()
          }
        })
        ctx.textAlign = 'center'
      }
      ctx.globalAlpha = appear

      // ---- suggestion cards (carousel; the active one is first)
      const cw = pw * 0.36, chh = Math.max(ph * 0.18, 72 * Math.min(u, 1)), gap = pw * 0.04
      const cTop = py0 + ph * 0.66
      const scroll = (cyc) + (f0 < 0.7 ? -1 + easeInOut(f0 / 0.7) : 0)
      const chipHot = clamp01((f0 - 0.7) / 0.25) * (1 - clamp01((f0 - 3.6) / 0.4))
      const chipsA = 1 - think
      ctx.save()
      rr(px0 + 1, cTop - 6, pw - 2, chh + 12, 6); ctx.clip()
      ctx.globalAlpha = appear * chipsA
      for (let k = Math.floor(scroll) - 1; k <= Math.floor(scroll) + 4; k++) {
        const x = px0 + pw * 0.045 + (k - scroll) * (cw + gap)
        if (x > px0 + pw || x + cw < px0) continue
        const isCur = k === cyc
        const hot = isCur ? chipHot : 0
        rr(x, cTop - hot * 3, cw, chh, 14 * Math.max(u, 0.7))
        ctx.fillStyle = `rgba(255,255,255,${0.07 + hot * 0.1})`; ctx.fill()
        ctx.strokeStyle = hot > 0 ? `rgba(${ORG},${0.2 + hot * 0.7})` : 'rgba(255,255,255,.12)'
        ctx.lineWidth = 1.2; ctx.stroke()
        // glyph
        ctx.strokeStyle = `rgba(${ICE},.55)`; ctx.lineWidth = 1.3
        ctx.beginPath(); ctx.arc(x + 20 * u + 4, cTop + 22 * u + 4 - hot * 3, 7 * Math.max(u, 0.8), 0, TAU); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(x + 20 * u - 3, cTop + 22 * u + 4 - hot * 3); ctx.lineTo(x + 20 * u + 11, cTop + 22 * u + 4 - hot * 3); ctx.stroke()
        ctx.textAlign = 'left'
        ctx.font = `400 ${Math.max(12, Math.round(pw * 0.034))}px ${FONT_SANS}`
        ctx.fillStyle = `rgba(${ICE},${0.85})`
        const lines = wrap(PROMPTS[((k % 4) + 4) % 4].chip, cw - 28 * u - 4)
        lines.slice(0, 2).forEach((ln, i) => ctx.fillText(ln, x + 14 * u + 4, cTop + chh * 0.6 + i * Math.max(16, pw * 0.043) - hot * 3))
        ctx.textAlign = 'center'
      }
      ctx.restore()
      ctx.globalAlpha = appear

      // ---- input bar
      const ih = Math.max(40, 46 * Math.min(u, 1.1))
      const ix = px0 + pw * 0.045, iw = pw - pw * 0.09
      const iy = py0 + ph - ih - ph * 0.045
      rr(ix, iy, iw, ih, ih / 2)
      ctx.fillStyle = 'rgba(255,255,255,.09)'; ctx.fill()
      ctx.strokeStyle = typing ? `rgba(${SKY},.6)` : 'rgba(255,255,255,.16)'; ctx.lineWidth = 1.2; ctx.stroke()
      // clip icon
      ctx.strokeStyle = `rgba(${ICE},.5)`; ctx.lineWidth = 1.4
      rr(ix + 16, iy + ih / 2 - 4, 13, 8, 4); ctx.stroke()
      // text
      ctx.textAlign = 'left'
      const sent = f0 >= clickT + 0.25
      const typed = f0 < clickT + 0.25 ? pr.ask.slice(0, Math.floor(pr.ask.length * easeInOut(typingP))) : ''
      const tfs = Math.max(13, Math.round(pw * 0.036))
      ctx.font = `400 ${tfs}px ${FONT_SANS}`
      const tx = ix + 40
      if (typed) {
        ctx.fillStyle = `rgba(${ICE},.95)`
        ctx.fillText(typed, tx, iy + ih / 2 + tfs * 0.35)
      } else {
        ctx.fillStyle = `rgba(${ICE},.4)`
        ctx.fillText(sent ? '正在分析需求…' : '描述你的需求…', tx, iy + ih / 2 + tfs * 0.35)
      }
      if ((f0 > 0.9 && f0 < clickT) || (!animate)) {
        if (Math.floor(t * 2) % 2 === 0 || !animate) {
          const cwid = typed ? ctx.measureText(typed).width : 0
          ctx.fillStyle = `rgba(${ORG},1)`; ctx.fillRect(tx + cwid + 2, iy + ih / 2 - tfs * 0.55, 2, tfs * 1.1)
        }
      }
      // send button
      const bx = ix + iw - ih / 2, by = iy + ih / 2, br = ih * 0.36
      const press = f0 > clickT && f0 < clickT + 0.5 ? Math.exp(-(f0 - clickT) * 7) : 0
      const ready = typingP > 0.98 && f0 < clickT ? 0.5 + 0.5 * Math.sin(t * 8) : 0
      if (press > 0.02 || ready > 0.02) {
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        const rg = ctx.createRadialGradient(bx, by, br * 0.4, bx, by, br * (1.8 + (press > 0 ? (1 - press) * 1.8 : 0)))
        rg.addColorStop(0, `rgba(${ORG},${0.55 * Math.max(press, ready * 0.6)})`); rg.addColorStop(1, `rgba(${ORG},0)`)
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(bx, by, br * 3.6, 0, TAU); ctx.fill(); ctx.restore()
      }
      ctx.fillStyle = f0 > 1.0 && f0 < clickT + 0.3 ? `rgb(${ORG})` : 'rgba(254,80,0,.55)'
      ctx.beginPath(); ctx.arc(bx, by, br * (1 - press * 0.12), 0, TAU); ctx.fill()
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(bx, by + br * 0.42); ctx.lineTo(bx, by - br * 0.42); ctx.moveTo(bx - br * 0.36, by - br * 0.06); ctx.lineTo(bx, by - br * 0.44); ctx.lineTo(bx + br * 0.36, by - br * 0.06); ctx.stroke()

      // pointer that travels to the send button and clicks
      if (animate && f0 > 2.7 && f0 < clickT + 0.9) {
        const m = easeInOut((f0 - 2.7) / 0.9)
        const sx = bx + 70 * u + (1 - m) * 40, sy = by + 60 * u + (1 - m) * 30
        const x = sx + (bx + 4 - sx) * m, y = sy + (by + 6 - sy) * m
        const sc = 1 - press * 0.15
        ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc)
        ctx.globalAlpha = appear * (1 - clamp01((f0 - clickT - 0.5) / 0.4))
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 17); ctx.lineTo(4.5, 13); ctx.lineTo(8, 20); ctx.lineTo(11, 18.5); ctx.lineTo(7.5, 12); ctx.lineTo(13, 12); ctx.closePath()
        ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#0A0E1A'; ctx.lineWidth = 1.3; ctx.stroke()
        ctx.restore()
      }
      ctx.restore() // panel clip
      ctx.globalAlpha = 1
      ctx.textAlign = 'start'
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
