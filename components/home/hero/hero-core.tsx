'use client'

import { useEffect, useRef } from 'react'
import { startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero — "Architected Intelligence" (inference core).
 *
 * The visual says what the headline says: AI is engineering, not magic. Three translucent
 * architecture layers are stacked in a wireframe volume (system boundary → stack selection →
 * production). A request enters at the top layer and travels the grid as data pulses, drops through
 * vertical links and ends in a processing core on the bottom layer.
 *
 * Interaction
 *  - idle: pulses keep flowing; the core breathes on a fixed cadence and emits a scan ring
 *  - cursor: nearby nodes light up and the grid bends toward the pointer (a requirement "pulls" the graph)
 *  - CTA hover: beams stream from the core to the primary button ("接住你的需求")
 *  - click: one scan ring + a burst of pulses
 *  - scroll: the layers come apart and sink toward the next section's content
 * Palette: deep navy, electric cyan, ice white; orange only for pulses that reach production.
 * Canvas 2D (no dependencies, no particle cloud). Paused off-screen / hidden tab, 30fps cap on phones,
 * one static frame for reduced motion / Data Saver (lib/motion/frame-loop).
 */

type V3 = [number, number, number]
type Node = { c: number; r: number }
type Pulse = { path: Node[]; layers: number[]; s: number; speed: number }

const LAYER_LABEL = ['01 · SYSTEM BOUNDARY', '02 · STACK SELECTION', '03 · PRODUCTION']

export default function HeroCore({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const phone = window.innerWidth < 768
    const COLS = phone ? 7 : 9
    const ROWS = phone ? 5 : 6
    const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.25 : 1.5)
    let W = 0
    let H = 0
    const resize = () => {
      const p = cv.parentElement
      W = p?.clientWidth || 1280
      H = p?.clientHeight || 720
      cv.width = Math.floor(W * dpr)
      cv.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const section = cv.closest('section')
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, ex: 0, ey: 0, near: 0 }
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.nx = e.clientX / window.innerWidth - 0.5
      mouse.ny = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let glowTarget = 0
    let glow = 0
    const onOver = (e: PointerEvent) => {
      glowTarget = (e.target as Element | null)?.closest?.('.hv-cta') ? 1 : 0
    }
    window.addEventListener('pointerover', onOver, { passive: true })

    // fixed link columns: node (c, r) on layer k connects straight down to the same node on layer k+1
    const LINKS: Node[] = [
      { c: 1, r: 1 }, { c: Math.floor(COLS / 2), r: ROWS - 2 }, { c: COLS - 2, r: 1 }, { c: COLS - 3, r: ROWS - 2 }, { c: 2, r: ROWS - 2 },
    ]
    const CORE: Node = { c: Math.floor(COLS / 2), r: Math.floor(ROWS / 2) }

    // ---- data pulses -------------------------------------------------------------------------
    const walk = (from: Node, to: Node): Node[] => {
      const out: Node[] = []
      let { c, r } = from
      let horizFirst = Math.random() < 0.5
      while (c !== to.c || r !== to.r) {
        if ((horizFirst && c !== to.c) || r === to.r) c += Math.sign(to.c - c)
        else r += Math.sign(to.r - r)
        if (Math.random() < 0.35) horizFirst = !horizFirst
        out.push({ c, r })
      }
      return out
    }
    const makePulse = (): Pulse => {
      const l0 = LINKS[Math.floor(Math.random() * LINKS.length)]
      const l1 = LINKS[Math.floor(Math.random() * LINKS.length)]
      const start: Node = { c: 0, r: Math.floor(Math.random() * ROWS) }
      const path: Node[] = [start]
      const layers: number[] = [0]
      const push = (nodes: Node[], k: number) => nodes.forEach((n) => { path.push(n); layers.push(k) })
      push(walk(start, l0), 0)
      path.push(l0); layers.push(1)            // drop to layer 1
      push(walk(l0, l1), 1)
      path.push(l1); layers.push(2)            // drop to layer 2
      push(walk(l1, CORE), 2)
      return { path, layers, s: 0, speed: 2.4 + Math.random() * 1.6 }
    }
    const pulses: Pulse[] = Array.from({ length: phone ? 6 : 10 }, () => {
      const p = makePulse()
      p.s = Math.random() * (p.path.length - 1) // desynchronised start
      return p
    })
    const burst = () => { for (let i = 0; i < 6; i++) pulses.push(makePulse()) }

    // click -> scan ring + burst; the hero dispatches 'heroTap'
    let ringAt = -1e9
    const onTap = () => { ringAt = performance.now(); burst() }
    window.addEventListener('heroTap', onTap)

    const nodePhase = Array.from({ length: 3 * COLS * ROWS }, () => Math.random() * Math.PI * 2)

    // ---- projection --------------------------------------------------------------------------
    const GAP = 0.31
    const HX = 0.5
    const HZ = phone ? 0.34 : 0.30
    let yaw = -0.45
    let pitch = 0.95
    let U = 500
    let CX = 0
    let CY = 0
    let scrollS = 0
    const layerY = (k: number) => (1 - k) * GAP
    const project = (x: number, y: number, z: number, k: number): [number, number, number] => {
      const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
      const x1 = x * cyw + z * syw
      const z1 = -x * syw + z * cyw
      const y1 = y * cp + z1 * sp
      const d = -y * sp + z1 * cp + 3.2
      const sc = 3.2 / d
      // scroll: layers sink and separate
      const drop = scrollS * H * (0.30 + 0.22 * k)
      return [CX + x1 * sc * U, CY - y1 * sc * U + drop, sc]
    }
    const nodePos = (n: Node, k: number): V3 => {
      const x = -HX + (n.c / (COLS - 1)) * 2 * HX
      const z = -HZ + (n.r / (ROWS - 1)) * 2 * HZ
      return [x, layerY(k), z]
    }

    const CYAN = '90,220,255'
    const ICE = '225,244,255'
    const ORANGE = '255,110,40'

    const frame = () => {
      const now = performance.now()
      const t = now / 1000
      glow += (glowTarget - glow) * 0.08
      mouse.ex += (mouse.nx - mouse.ex) * 0.05
      mouse.ey += (mouse.ny - mouse.ey) * 0.05

      const r = section?.getBoundingClientRect()
      scrollS = r ? Math.min(Math.max(-r.top / (r.height * 0.8), 0), 1) : 0
      const fade = 1 - scrollS * 0.85

      // framing
      if (phone) { U = Math.min(W * 0.9, H * 0.5); CX = W * 0.56; CY = H * 0.74 }
      else { U = Math.min(W * 0.35, H * 0.86); CX = W * 0.72; CY = H * 0.55 }
      yaw = -0.45 + mouse.ex * 0.32 + Math.sin(t * 0.21) * 0.07
      pitch = 0.95 + mouse.ey * 0.12

      // background: deep navy with a cyan pool behind the volume
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#010a33'
      ctx.fillRect(0, 0, W, H)
      const bgGrad = ctx.createRadialGradient(CX, CY, 0, CX, CY, U * 0.95)
      bgGrad.addColorStop(0, 'rgba(0,70,190,.55)')
      bgGrad.addColorStop(1, 'rgba(0,30,110,0)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      // ---- outer energy shell: topology contours around the volume (slow breathing) ----
      ctx.lineWidth = 1
      for (let j = 0; j < 4; j++) {
        ctx.beginPath()
        for (let i = 0; i <= 96; i++) {
          const th = (i / 96) * Math.PI * 2
          const rad = (1.0 + j * 0.09) * (1 + 0.03 * Math.sin(3 * th + t * 0.6 + j) + 0.02 * Math.sin(5 * th - t * 0.4))
          const [sx, sy] = project(Math.cos(th) * rad * 0.68, layerY(2) - 0.16, Math.sin(th) * rad * 0.44, 2)
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = `rgba(${CYAN},${(0.16 - j * 0.035) * fade})`
        ctx.setLineDash(j % 2 ? [2, 7] : [])
        ctx.stroke()
      }
      ctx.setLineDash([])

      // ---- volume frame: vertical edges joining the layer corners ----
      ctx.strokeStyle = `rgba(${CYAN},${0.20 * fade})`
      for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const a = project(sx * HX, layerY(0), sz * HZ, 0)
        const b = project(sx * HX, layerY(2), sz * HZ, 2)
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
      }

      // ---- layers (bottom first so the top layer overlays) ----
      const R = phone ? 0 : 150 // cursor influence radius
      const shown: Array<Array<[number, number, number]>> = [[], [], []]
      for (let k = 2; k >= 0; k--) {
        const lay = fade * (1 - k * 0.06)
        // glass quad
        const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sz]) => project(sx * HX, layerY(k), sz * HZ, k))
        ctx.beginPath()
        corners.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])))
        ctx.closePath()
        const gy0 = Math.min(...corners.map((p) => p[1]))
        const gy1 = Math.max(...corners.map((p) => p[1]))
        const gg = ctx.createLinearGradient(0, gy0, 0, gy1)
        gg.addColorStop(0, `rgba(60,150,255,${0.07 * lay})`)
        gg.addColorStop(1, `rgba(20,90,230,${0.16 * lay})`)
        ctx.fillStyle = gg
        ctx.fill()
        ctx.strokeStyle = `rgba(${ICE},${0.34 * lay})`
        ctx.lineWidth = 1
        ctx.stroke()

        // node screen positions (with cursor bend) for this layer
        const pts: Array<[number, number, number]> = []
        for (let rr = 0; rr < ROWS; rr++) {
          for (let cc = 0; cc < COLS; cc++) {
            const [x, y, z] = nodePos({ c: cc, r: rr }, k)
            let [sx, sy] = project(x, y, z, k)
            let near = 0
            if (R) {
              const dx = mouse.x - sx, dy = mouse.y - sy
              const d = Math.hypot(dx, dy)
              if (d < R) { near = 1 - d / R; sx += dx * 0.20 * near; sy += dy * 0.20 * near }
            }
            pts.push([sx, sy, near])
          }
        }
        shown[k] = pts
        const at = (c: number, rr: number) => pts[rr * COLS + c]

        // grid edges
        ctx.lineWidth = 1
        for (let rr = 0; rr < ROWS; rr++) for (let cc = 0; cc < COLS; cc++) {
          const a = at(cc, rr)
          if (cc < COLS - 1) { const b = at(cc + 1, rr); ctx.strokeStyle = `rgba(${CYAN},${(0.13 + Math.max(a[2], b[2]) * 0.55) * lay})`; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke() }
          if (rr < ROWS - 1) { const b = at(cc, rr + 1); ctx.strokeStyle = `rgba(${CYAN},${(0.13 + Math.max(a[2], b[2]) * 0.55) * lay})`; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke() }
        }
        // nodes
        for (let i = 0; i < pts.length; i++) {
          const [sx, sy, near] = pts[i]
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.3 + nodePhase[k * COLS * ROWS + i])
          const rad = 1.4 + pulse * 0.6 + near * 2.4
          ctx.fillStyle = `rgba(${ICE},${(0.35 + pulse * 0.25 + near * 0.6) * lay})`
          ctx.beginPath(); ctx.arc(sx, sy, rad, 0, Math.PI * 2); ctx.fill()
        }
        // layer label (front-left corner)
        if (!phone) {
          const lp = project(-HX, layerY(k), HZ, k)
          ctx.font = '11px ui-monospace, "JetBrains Mono", SFMono-Regular, monospace'
          ctx.fillStyle = `rgba(${ICE},${0.62 * lay})`
          ctx.textAlign = 'left'
          ctx.fillText(LAYER_LABEL[k], lp[0] - 6, lp[1] + 22)
        }
      }

      // ---- vertical links between layers ----
      ctx.setLineDash([3, 5])
      ctx.lineDashOffset = -t * 14
      ctx.strokeStyle = `rgba(${CYAN},${0.28 * fade})`
      for (const n of LINKS) {
        for (let k = 0; k < 2; k++) {
          const a = shown[k][n.r * COLS + n.c]
          const b = shown[k + 1][n.r * COLS + n.c]
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
        }
      }
      ctx.setLineDash([])

      // ---- data pulses (additive) ----
      ctx.globalCompositeOperation = 'lighter'
      const dt = 1 / 60
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.s += p.speed * dt * (1 + glow * 0.8)
        if (p.s >= p.path.length - 1) {
          if (pulses.length > (phone ? 6 : 10)) { pulses.splice(i, 1); continue }
          Object.assign(p, makePulse())
        }
        const seg = Math.floor(p.s)
        const f = p.s - seg
        const pos = (idx: number): [number, number] => {
          const n = p.path[idx]; const k = p.layers[idx]
          const q = shown[k][n.r * COLS + n.c]
          return [q[0], q[1]]
        }
        const a = pos(seg), b = pos(Math.min(seg + 1, p.path.length - 1))
        const hx = a[0] + (b[0] - a[0]) * f, hy = a[1] + (b[1] - a[1]) * f
        const inProd = p.layers[Math.min(seg + 1, p.path.length - 1)] === 2
        const col = inProd ? ORANGE : ICE
        // trail: previous ~2.5 segments
        ctx.lineCap = 'round'
        let px = hx, py = hy
        for (let j = 0; j < 3; j++) {
          const idx = seg - j
          if (idx < 0) break
          const [tx, ty] = pos(idx)
          const w = (1 - j / 3)
          ctx.strokeStyle = `rgba(${col},${0.55 * w * fade})`
          ctx.lineWidth = 2.2 * w
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty); ctx.stroke()
          px = tx; py = ty
        }
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 12)
        hg.addColorStop(0, `rgba(${col},${0.95 * fade})`)
        hg.addColorStop(1, `rgba(${col},0)`)
        ctx.fillStyle = hg
        ctx.beginPath(); ctx.arc(hx, hy, 12, 0, Math.PI * 2); ctx.fill()
      }

      // ---- processing core on the production layer ----
      const cp = shown[2][CORE.r * COLS + CORE.c]
      const beat = 0.5 + 0.5 * Math.sin(t * 2 * Math.PI / 3.2) // fixed 3.2s cadence
      const cr = (phone ? 16 : 24) * (1 + beat * 0.18 + glow * 0.4)
      const cg = ctx.createRadialGradient(cp[0], cp[1], 0, cp[0], cp[1], cr * 2.6)
      cg.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`)
      cg.addColorStop(0.25, `rgba(${CYAN},${0.65 * fade})`)
      cg.addColorStop(1, `rgba(${CYAN},0)`)
      ctx.fillStyle = cg
      ctx.beginPath(); ctx.arc(cp[0], cp[1], cr * 2.6, 0, Math.PI * 2); ctx.fill()

      // scan ring on the production plane: fixed cadence, plus one per click
      const ringAge = Math.min((now - ringAt) / 1000, 99)
      const cadence = (t % 3.2) / 3.2
      const rings: number[] = [cadence]
      if (ringAge < 1.6) rings.push(ringAge / 1.6)
      for (const q of rings) {
        ctx.beginPath()
        for (let i = 0; i <= 64; i++) {
          const th = (i / 64) * Math.PI * 2
          const [sx, sy] = project(Math.cos(th) * q * 0.62, layerY(2), Math.sin(th) * q * 0.40, 2)
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = `rgba(${CYAN},${(1 - q) * 0.5 * fade})`
        ctx.lineWidth = 1.4
        ctx.stroke()
      }

      // ---- CTA hover: beams from the core to the primary button ----
      if (glow > 0.02 && !phone) {
        const btn = document.querySelector('.hv-cta.primary')
        const cr2 = cv.getBoundingClientRect()
        if (btn) {
          const b = btn.getBoundingClientRect()
          const tx = b.right - cr2.left + 6
          const ty = b.top + b.height / 2 - cr2.top
          for (let i = 0; i < 5; i++) {
            const off = (i - 2) * 26
            const mx = (cp[0] + tx) / 2
            const my = Math.min(cp[1], ty) - 70 + off * 0.6
            ctx.setLineDash([10, 14])
            ctx.lineDashOffset = -(t * 120 + i * 9)
            ctx.strokeStyle = `rgba(${i === 2 ? ICE : CYAN},${0.55 * glow})`
            ctx.lineWidth = i === 2 ? 1.8 : 1.1
            ctx.beginPath(); ctx.moveTo(cp[0], cp[1]); ctx.quadraticCurveTo(mx, my + off, tx, ty + (i - 2) * 4); ctx.stroke()
          }
          ctx.setLineDash([])
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.textAlign = 'start'
    }

    const stop = startFrameLoop({ host: cv.parentElement, frame: frame })

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('heroTap', onTap)
    }
  }, [active])

  return (
    <div className={'hv-bg' + (active ? ' on' : '')}>
      <canvas ref={ref} className="hb-cv" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
