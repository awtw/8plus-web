'use client'

import { useEffect, useRef } from 'react'
import { startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero — "Architected Intelligence" (inference core), v2.
 *
 * Three circular architecture plates form a funnel: requirements enter at the wide top plate
 * (system boundary), pass through stack selection, and converge on a processing core in the
 * production plate. Data pulses travel the polar graph (rings + spokes) and drop through the links.
 *
 * The nodes are real steps of an AI build pipeline (RAG, embeddings, evals, guardrails, ...).
 * Hover a term (tap on touch) and a card explains what it does for an AI system; its edges light up.
 * On touch devices, with no pointer activity, the cards tour the terms on their own.
 *
 * Interaction
 *  - cursor: nearby nodes light and the graph bends toward the pointer; hovered term shows its card
 *  - CTA hover: beams stream from the core to the primary button ("接住你的需求")
 *  - click: scan ring + a burst of pulses
 *  - scroll: the plates come apart and sink toward the next section
 * Palette: deep navy, electric cyan, ice white; orange only for pulses reaching production.
 * Canvas 2D, no dependencies, no particle cloud. Paused off-screen / hidden tab, 30fps cap on phones,
 * one static frame for reduced motion / Data Saver (lib/motion/frame-loop).
 */

type Term = { layer: 0 | 1 | 2; ring: number; f: number; code: string; zh: string; desc: string }

// f = angular position in twelfths of a turn. Copy is about what each step DOES for an AI system.
const TERMS: Term[] = [
  { layer: 0, ring: 3, f: 1, code: 'REQUIREMENTS', zh: '需求拆解', desc: '把模糊的想法轉成可驗證的使用情境與驗收標準，後面每一步才有依據。' },
  { layer: 0, ring: 3, f: 4, code: 'DATA CONTRACT', zh: '資料契約', desc: '先定義輸入、輸出與資料來源的格式，模型才有穩定的介面可以串接。' },
  { layer: 0, ring: 3, f: 7, code: 'GUARDRAILS', zh: '護欄', desc: '限制模型能做與不能做的事，擋下越界、洩漏與不安全的輸出。' },
  { layer: 0, ring: 3, f: 10, code: 'ACCESS CONTROL', zh: '權限控管', desc: '確保每位使用者只能檢索到自己有權看的資料，AI 也不例外。' },
  { layer: 0, ring: 2, f: 2, code: 'EVAL CRITERIA', zh: '評測準則', desc: '先定義「好的答案」長什麼樣子，之後才量得出是進步還是退步。' },

  { layer: 1, ring: 3, f: 0, code: 'LLM SELECTION', zh: '模型選型', desc: '依品質、延遲、成本與資料敏感度挑模型，而不是只挑最大最貴的。' },
  { layer: 1, ring: 3, f: 2, code: 'EMBEDDINGS', zh: '向量化', desc: '把文字轉成向量，讓系統能用「語意」而不是關鍵字找到相關內容。' },
  { layer: 1, ring: 3, f: 5, code: 'VECTOR DB', zh: '向量資料庫', desc: '儲存並快速檢索語意相近的內容，是 RAG 的長期記憶。' },
  { layer: 1, ring: 2, f: 7, code: 'RAG', zh: '檢索增強生成', desc: '回答前先查你的資料，降低幻覺，並讓答案能追溯到來源。' },
  { layer: 1, ring: 3, f: 9, code: 'PROMPT', zh: '提示設計', desc: '用結構化指令與範例穩定輸出，並像程式碼一樣版本化管理。' },
  { layer: 1, ring: 2, f: 11, code: 'TOOLS / AGENTS', zh: '工具呼叫', desc: '讓模型呼叫 API 與內部系統，把答案變成真正完成的動作。' },

  { layer: 2, ring: 3, f: 1, code: 'EVALS', zh: '自動評測', desc: '每次改動都跑一次測試集，避免「改好 A、壞了 B」。' },
  { layer: 2, ring: 3, f: 4, code: 'OBSERVABILITY', zh: '可觀測性', desc: '記錄每次呼叫的輸入、輸出、延遲與錯誤，出問題時能重現與追查。' },
  { layer: 2, ring: 3, f: 7, code: 'CACHING', zh: '快取', desc: '重複的問題直接回答，降低延遲，也省下 token 成本。' },
  { layer: 2, ring: 3, f: 10, code: 'COST CONTROL', zh: '成本控管', desc: '監控 token 用量、設定預算與降級策略，避免帳單失控。' },
  { layer: 2, ring: 2, f: 2, code: 'CI / CD', zh: '持續交付', desc: '模型、提示與程式一起版控、測試，並以灰度方式安全上線。' },
  { layer: 2, ring: 2, f: 8, code: 'FALLBACK', zh: '降級備援', desc: '模型失敗或逾時就切換備援，讓服務不中斷。' },
]

const LAYER_NAME = ['01 · SYSTEM BOUNDARY', '02 · STACK SELECTION', '03 · PRODUCTION']
const LAYER_ZH = ['需求與邊界', '技術選型', '生產落地']

export default function HeroCore({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const phone = window.innerWidth < 768
    const touch = window.matchMedia('(pointer: coarse)').matches
    const SP = phone ? 10 : 12 // spokes
    const RINGS = 3
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
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, ex: 0, ey: 0, lastMove: 0 }
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.nx = e.clientX / window.innerWidth - 0.5
      mouse.ny = e.clientY / window.innerHeight - 0.5
      mouse.lastMove = performance.now()
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let glowTarget = 0
    let glow = 0
    const onOver = (e: PointerEvent) => {
      glowTarget = (e.target as Element | null)?.closest?.('.hv-cta') ? 1 : 0
    }
    window.addEventListener('pointerover', onOver, { passive: true })

    // ---- polar graph: node 0 = centre, then RINGS x SP nodes --------------------------------
    const nid = (j: number, i: number) => (j === 0 ? 0 : 1 + (j - 1) * SP + (((i % SP) + SP) % SP))
    const N = 1 + RINGS * SP
    const polar = (id: number): [number, number] => (id === 0 ? [0, 0] : [Math.floor((id - 1) / SP) + 1, (id - 1) % SP])
    const edges: Array<[number, number]> = []
    for (let i = 0; i < SP; i++) {
      edges.push([0, nid(1, i)])
      for (let j = 1; j <= RINGS; j++) {
        edges.push([nid(j, i), nid(j, i + 1)])
        if (j < RINGS) edges.push([nid(j, i), nid(j + 1, i)])
      }
    }
    const LINKS = [nid(2, 1), nid(2, 4), nid(2, 7), nid(2, 10)]

    const walk = (from: number, to: number): number[] => {
      const out: number[] = []
      let [j, i] = polar(from)
      const [tj, ti] = polar(to)
      let guard = 0
      while ((j !== tj || (j !== 0 && ((i % SP) + SP) % SP !== ti)) && guard++ < 40) {
        const di = ((ti - i + SP + SP / 2) % SP) - SP / 2 // shortest angular direction
        const radial = j !== tj && (j === 0 || di === 0 || Math.random() < 0.45)
        if (radial) {
          j += Math.sign(tj - j)
          if (j === 0) i = 0
        } else if (di !== 0) i += Math.sign(di)
        else j += Math.sign(tj - j)
        out.push(nid(j, i))
      }
      return out
    }
    type Pulse = { ids: number[]; layers: number[]; s: number; speed: number }
    const makePulse = (): Pulse => {
      const start = nid(RINGS, Math.floor(Math.random() * SP))
      const l0 = LINKS[Math.floor(Math.random() * LINKS.length)]
      const l1 = LINKS[Math.floor(Math.random() * LINKS.length)]
      const ids = [start]
      const layers = [0]
      const push = (nodes: number[], k: number) => nodes.forEach((n) => { ids.push(n); layers.push(k) })
      push(walk(start, l0), 0)
      ids.push(l0); layers.push(1)
      push(walk(l0, l1), 1)
      ids.push(l1); layers.push(2)
      push(walk(l1, 0), 2)
      return { ids, layers, s: 0, speed: 2.2 + Math.random() * 1.4 }
    }
    const POP = phone ? 6 : 10
    const pulses: Pulse[] = Array.from({ length: POP }, () => {
      const p = makePulse()
      p.s = Math.random() * (p.ids.length - 1)
      return p
    })

    let ringAt = -1e9
    let tapPin = { idx: -1, until: 0 }
    // resolved later (needs screen positions): a tap pins the nearest term for 4.5s
    let tapAt: { x: number; y: number } | null = null
    const onTap = (e: Event) => {
      ringAt = performance.now()
      for (let i = 0; i < 6; i++) pulses.push(makePulse())
      const d = (e as CustomEvent<{ x: number; y: number }>).detail
      if (d) tapAt = { x: d.x, y: d.y }
    }
    window.addEventListener('heroTap', onTap)

    // term -> node id on its layer
    const termNode = TERMS.map((t) => nid(t.ring, Math.round((t.f * SP) / 12)))
    const termAt = new Map<string, number>() // "layer:node" -> term index
    TERMS.forEach((t, i) => termAt.set(`${t.layer}:${termNode[i]}`, i))

    const phase = Array.from({ length: 3 * N }, () => Math.random() * Math.PI * 2)

    // ---- projection --------------------------------------------------------------------------
    const GAP = 0.62
    const RADIUS = [1.0, 0.84, 0.68]
    const TWIST = [0.05, -0.04, 0.03]
    let yaw = -0.35
    let pitch = 0.66
    let U = 500
    let CX = 0
    let CY = 0
    let scrollS = 0
    const layerY = (k: number) => (1 - k) * GAP
    const project = (x: number, y: number, z: number, k: number): [number, number] => {
      const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
      const x1 = x * cyw + z * syw
      const z1 = -x * syw + z * cyw
      const y1 = y * cp + z1 * sp
      const d = -y * sp + z1 * cp + 3.2
      const sc = 3.2 / d
      const drop = scrollS * H * (0.30 + 0.22 * k)
      return [CX + x1 * sc * U, CY - y1 * sc * U + drop]
    }
    const nodeXZ = (id: number, k: number, t: number): [number, number] => {
      if (id === 0) return [0, 0]
      const [j, i] = polar(id)
      const a = (i / SP) * Math.PI * 2 + TWIST[k] * t
      const rad = (RADIUS[k] * j) / RINGS
      return [Math.cos(a) * rad, Math.sin(a) * rad]
    }

    const CYAN = '90,220,255'
    const ICE = '225,244,255'
    const ORANGE = '255,110,40'
    const FONT_SANS = '"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif'
    const FONT_MONO = 'ui-monospace,"JetBrains Mono",SFMono-Regular,monospace'

    let hovered = -1
    let hoverSince = 0
    let tourIdx = 0
    let tourAt = 0

    const wrap = (text: string, maxW: number): string[] => {
      const lines: string[] = []
      let line = ''
      for (const ch of Array.from(text)) {
        if (ctx.measureText(line + ch).width > maxW) { lines.push(line); line = ch } else line += ch
      }
      if (line) lines.push(line)
      return lines
    }

    const frame = () => {
      const now = performance.now()
      const t = now / 1000
      glow += (glowTarget - glow) * 0.08
      mouse.ex += (mouse.nx - mouse.ex) * 0.05
      mouse.ey += (mouse.ny - mouse.ey) * 0.05

      const rc = section?.getBoundingClientRect()
      scrollS = rc ? Math.min(Math.max(-rc.top / (rc.height * 0.8), 0), 1) : 0
      const fade = 1 - scrollS * 0.85

      if (phone) { U = Math.min(W * 0.25, H * 0.115); CX = W * 0.5; CY = H * 0.645 }
      else { U = Math.min(W * 0.185, H * 0.33); CX = W * 0.75; CY = H * 0.55 }
      yaw = -0.35 + mouse.ex * 0.28 + Math.sin(t * 0.21) * 0.06
      pitch = 0.66 + mouse.ey * 0.07

      // background: deep navy with a cyan pool behind the funnel
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#010a33'
      ctx.fillRect(0, 0, W, H)
      const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, U * 1.9)
      bg.addColorStop(0, 'rgba(0,70,190,.50)')
      bg.addColorStop(1, 'rgba(0,30,110,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ---- outer energy shell: slow-breathing contours on the ground beneath the funnel ----
      ctx.lineWidth = 1
      for (let j = 0; j < 3; j++) {
        ctx.beginPath()
        for (let i = 0; i <= 96; i++) {
          const th = (i / 96) * Math.PI * 2
          const rad = (1.12 + j * 0.12) * (1 + 0.03 * Math.sin(3 * th + t * 0.6 + j) + 0.02 * Math.sin(5 * th - t * 0.4))
          const [sx, sy] = project(Math.cos(th) * rad, layerY(2) - 0.20, Math.sin(th) * rad, 2)
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = `rgba(${CYAN},${(0.15 - j * 0.04) * fade})`
        ctx.setLineDash(j % 2 ? [2, 7] : [])
        ctx.stroke()
      }
      ctx.setLineDash([])

      // ---- funnel struts joining the plate rims ----
      ctx.strokeStyle = `rgba(${CYAN},${0.18 * fade})`
      for (let q = 0; q < 6; q++) {
        const a = (q / 6) * Math.PI * 2 + 0.3
        const p0 = project(Math.cos(a) * RADIUS[0], layerY(0), Math.sin(a) * RADIUS[0], 0)
        const p1 = project(Math.cos(a) * RADIUS[1], layerY(1), Math.sin(a) * RADIUS[1], 1)
        const p2 = project(Math.cos(a) * RADIUS[2], layerY(2), Math.sin(a) * RADIUS[2], 2)
        ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke()
      }

      // label declutter: later labels that would overlap an earlier one are skipped (hover still shows the card)
      const used: Array<[number, number, number, number]> = []
      const clash = (x: number, y: number, w: number, h: number) => used.some((r) => x < r[0] + r[2] + 3 && x + w + 3 > r[0] && y < r[1] + r[3] + 2 && y + h + 2 > r[1])

      // ---- plates (bottom first so the top plate overlays) ----
      const R = phone ? 0 : 150
      const pos: Array<Array<[number, number, number]>> = [[], [], []] // per layer: [sx, sy, near]
      const active_ = hovered >= 0 ? TERMS[hovered] : null
      const hoveredNode = hovered >= 0 ? termNode[hovered] : -1
      for (let k = 2; k >= 0; k--) {
        const lay = fade
        // glass disc
        ctx.beginPath()
        for (let i = 0; i <= 72; i++) {
          const th = (i / 72) * Math.PI * 2
          const [sx, sy] = project(Math.cos(th) * RADIUS[k], layerY(k), Math.sin(th) * RADIUS[k], k)
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.closePath()
        const top = project(0, layerY(k), -RADIUS[k], k)[1]
        const bot = project(0, layerY(k), RADIUS[k], k)[1]
        const gg = ctx.createLinearGradient(0, Math.min(top, bot), 0, Math.max(top, bot))
        gg.addColorStop(0, `rgba(60,150,255,${0.06 * lay})`)
        gg.addColorStop(1, `rgba(20,90,230,${0.17 * lay})`)
        ctx.fillStyle = gg
        ctx.fill()
        ctx.strokeStyle = `rgba(${ICE},${0.36 * lay})`
        ctx.lineWidth = 1.1
        ctx.stroke()

        // node screen positions (cursor bend)
        const pts: Array<[number, number, number]> = []
        for (let id = 0; id < N; id++) {
          const [x, z] = nodeXZ(id, k, t)
          let [sx, sy] = project(x, layerY(k), z, k)
          let near = 0
          if (R) {
            const dx = mouse.x - sx, dy = mouse.y - sy
            const d = Math.hypot(dx, dy)
            if (d < R) { near = 1 - d / R; sx += dx * 0.18 * near; sy += dy * 0.18 * near }
          }
          pts.push([sx, sy, near])
        }
        pos[k] = pts

        // polar grid edges (rings + spokes); edges of the hovered term glow
        ctx.lineWidth = 1
        for (const [a, b] of edges) {
          const pa = pts[a], pb = pts[b]
          const hot = active_ && active_.layer === k && (a === hoveredNode || b === hoveredNode)
          const boost = hot ? 0.75 : Math.max(pa[2], pb[2]) * 0.55
          ctx.strokeStyle = `rgba(${hot ? ICE : CYAN},${(0.13 + boost) * lay})`
          ctx.lineWidth = hot ? 1.6 : 1
          ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke()
        }
        ctx.lineWidth = 1

        // plain nodes
        for (let id = 0; id < N; id++) {
          if (termAt.has(`${k}:${id}`)) continue
          const [sx, sy, near] = pts[id]
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.3 + phase[k * N + id])
          ctx.fillStyle = `rgba(${ICE},${(0.30 + pulse * 0.22 + near * 0.6) * lay})`
          ctx.beginPath(); ctx.arc(sx, sy, 1.3 + pulse * 0.5 + near * 2.2, 0, Math.PI * 2); ctx.fill()
        }

        // plate caption on the left rim
        if (!phone) {
          const lp = project(-RADIUS[k], layerY(k), 0, k)
          ctx.font = `10.5px ${FONT_MONO}`
          ctx.textAlign = 'right'
          ctx.fillStyle = `rgba(${ICE},${0.58 * lay})`
          ctx.fillText(LAYER_NAME[k], lp[0] - 12, lp[1] - 4)
          const cw = ctx.measureText(LAYER_NAME[k]).width
          used.push([lp[0] - 12 - cw, lp[1] - 16, cw, 30])
          ctx.font = `11px ${FONT_SANS}`
          ctx.fillStyle = `rgba(${CYAN},${0.62 * lay})`
          ctx.fillText(LAYER_ZH[k], lp[0] - 12, lp[1] + 11)
          ctx.textAlign = 'left'
        }
      }

      // ---- links between plates ----
      ctx.setLineDash([3, 5])
      ctx.lineDashOffset = -t * 14
      ctx.strokeStyle = `rgba(${CYAN},${0.26 * fade})`
      for (const id of LINKS) {
        for (let k = 0; k < 2; k++) {
          const a = pos[k][id], b = pos[k + 1][id]
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
        if (p.s >= p.ids.length - 1) {
          if (pulses.length > POP) { pulses.splice(i, 1); continue }
          Object.assign(p, makePulse())
        }
        const seg = Math.floor(p.s)
        const f = p.s - seg
        const at = (idx: number): [number, number] => {
          const q = pos[p.layers[idx]][p.ids[idx]]
          return [q[0], q[1]]
        }
        const a = at(seg), b = at(Math.min(seg + 1, p.ids.length - 1))
        const hx = a[0] + (b[0] - a[0]) * f, hy = a[1] + (b[1] - a[1]) * f
        const col = p.layers[Math.min(seg + 1, p.ids.length - 1)] === 2 ? ORANGE : ICE
        ctx.lineCap = 'round'
        let px = hx, py = hy
        for (let j = 0; j < 3; j++) {
          const idx = seg - j
          if (idx < 0) break
          const [tx, ty] = at(idx)
          const w = 1 - j / 3
          ctx.strokeStyle = `rgba(${col},${0.55 * w * fade})`
          ctx.lineWidth = 2.2 * w
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty); ctx.stroke()
          px = tx; py = ty
        }
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 11)
        hg.addColorStop(0, `rgba(${col},${0.95 * fade})`)
        hg.addColorStop(1, `rgba(${col},0)`)
        ctx.fillStyle = hg
        ctx.beginPath(); ctx.arc(hx, hy, 11, 0, Math.PI * 2); ctx.fill()
      }

      // ---- processing core (centre of the production plate) ----
      const cp = pos[2][0]
      const beat = 0.5 + 0.5 * Math.sin((t * 2 * Math.PI) / 3.2)
      const cr = (phone ? 14 : 22) * (1 + beat * 0.18 + glow * 0.4)
      const cg = ctx.createRadialGradient(cp[0], cp[1], 0, cp[0], cp[1], cr * 2.6)
      cg.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`)
      cg.addColorStop(0.25, `rgba(${CYAN},${0.65 * fade})`)
      cg.addColorStop(1, `rgba(${CYAN},0)`)
      ctx.fillStyle = cg
      ctx.beginPath(); ctx.arc(cp[0], cp[1], cr * 2.6, 0, Math.PI * 2); ctx.fill()

      // scan rings on the production plate: fixed cadence + one per click
      const ringAge = Math.min((now - ringAt) / 1000, 99)
      const rings: number[] = [(t % 3.2) / 3.2]
      if (ringAge < 1.6) rings.push(ringAge / 1.6)
      for (const q of rings) {
        ctx.beginPath()
        for (let i = 0; i <= 64; i++) {
          const th = (i / 64) * Math.PI * 2
          const [sx, sy] = project(Math.cos(th) * q * RADIUS[2], layerY(2), Math.sin(th) * q * RADIUS[2], 2)
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = `rgba(${CYAN},${(1 - q) * 0.5 * fade})`
        ctx.lineWidth = 1.4
        ctx.stroke()
      }

      // ---- CTA hover: beams from the core to the primary button ----
      if (glow > 0.02 && !phone) {
        const btn = document.querySelector('.hv-cta.primary')
        const cb = cv.getBoundingClientRect()
        if (btn) {
          const b = btn.getBoundingClientRect()
          const tx = b.right - cb.left + 6
          const ty = b.top + b.height / 2 - cb.top
          for (let i = 0; i < 5; i++) {
            const off = (i - 2) * 26
            ctx.setLineDash([10, 14])
            ctx.lineDashOffset = -(t * 120 + i * 9)
            ctx.strokeStyle = `rgba(${i === 2 ? ICE : CYAN},${0.55 * glow})`
            ctx.lineWidth = i === 2 ? 1.8 : 1.1
            ctx.beginPath()
            ctx.moveTo(cp[0], cp[1])
            ctx.quadraticCurveTo((cp[0] + tx) / 2, Math.min(cp[1], ty) - 70 + off * 0.6 + off, tx, ty + (i - 2) * 4)
            ctx.stroke()
          }
          ctx.setLineDash([])
        }
      }

      // ---- term markers + hover / tap / tour ----
      ctx.globalCompositeOperation = 'source-over'
      const HIT = phone ? 26 : 20
      let best = -1
      let bestD = HIT
      const cursorLive = now - mouse.lastMove < 6000 && mouse.x > -9000
      for (let i = 0; i < TERMS.length; i++) {
        const tm = TERMS[i]
        const [sx, sy] = pos[tm.layer][termNode[i]]
        if (cursorLive && !touch) {
          const d = Math.hypot(mouse.x - sx, mouse.y - sy)
          if (d < bestD) { bestD = d; best = i }
        }
        if (tapAt) {
          const d = Math.hypot(tapAt.x - sx, tapAt.y - sy)
          if (d < bestD + 10) { bestD = d; best = i; tapPin = { idx: i, until: now + 4500 } }
        }
      }
      tapAt = null
      let focus = best
      if (focus < 0 && tapPin.idx >= 0 && now < tapPin.until) focus = tapPin.idx
      // touch / idle tour so phones (no hover) still get the explanation
      if (focus < 0 && (touch || phone) && !cursorLive) {
        if (now - tourAt > 3800) { tourAt = now; tourIdx = (tourIdx + 1) % TERMS.length }
        focus = tourIdx
      }
      if (focus !== hovered) { hovered = focus; hoverSince = now }

      for (let i = 0; i < TERMS.length; i++) {
        const tm = TERMS[i]
        const [sx, sy] = pos[tm.layer][termNode[i]]
        const on = i === hovered
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + i)
        const lay = fade
        // marker
        ctx.beginPath(); ctx.arc(sx, sy, on ? 6.5 : 3.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${on ? ICE : CYAN},${(on ? 0.95 : 0.55 + pulse * 0.2) * lay})`
        ctx.fill()
        ctx.beginPath(); ctx.arc(sx, sy, on ? 12 + pulse * 3 : 7, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${on ? ICE : CYAN},${(on ? 0.75 : 0.28) * lay})`
        ctx.lineWidth = 1
        ctx.stroke()
        // code label (desktop: always; phone: only the focused one)
        if (!phone || on) {
          ctx.font = `${on ? 600 : 400} 10px ${FONT_MONO}`
          const tw = ctx.measureText(tm.code).width
          const right = sx > CX && sx + 11 + tw < W - 8 // flip to the inner side near the viewport edge
          const lx = right ? sx + 11 : sx - 11 - tw
          if (on || !clash(lx, sy - 8, tw, 12)) {
            used.push([lx, sy - 8, tw, 12])
            ctx.textAlign = right ? 'left' : 'right'
            ctx.fillStyle = `rgba(${ICE},${(on ? 1 : 0.62) * lay})`
            ctx.fillText(tm.code, sx + (right ? 11 : -11), sy + 3.5)
            ctx.textAlign = 'left'
          }
        }
      }

      // ---- explanation card ----
      if (hovered >= 0 && fade > 0.5) {
        const tm = TERMS[hovered]
        const [sx, sy] = pos[tm.layer][termNode[hovered]]
        const a = Math.min((now - hoverSince) / 180, 1)
        const w = phone ? W - 24 : 270
        ctx.font = `13px ${FONT_SANS}`
        const lines = wrap(tm.desc, w - 28)
        const h = 18 + 18 + 8 + lines.length * 19 + 22
        let bx = sx + 22
        if (bx + w > W - 12) bx = sx - 22 - w
        // phones: the card is a fixed caption strip under the funnel (never over the copy / CTA)
        let by = phone ? H - 78 - h : sy - h / 2
        if (phone) bx = 12
        by = phone ? by : Math.max(84, Math.min(H - h - 16, by))
        ctx.globalAlpha = a
        ctx.fillStyle = 'rgba(2,10,48,.94)'
        ctx.strokeStyle = `rgba(${CYAN},.55)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(bx, by, w, h, 14)
        ctx.fill(); ctx.stroke()
        // leader line to the node (desktop)
        if (!phone) {
          ctx.beginPath()
          ctx.moveTo(sx, sy)
          ctx.lineTo(bx < sx ? bx + w : bx, Math.max(by + 14, Math.min(by + h - 14, sy)))
          ctx.strokeStyle = `rgba(${CYAN},.45)`
          ctx.stroke()
        }
        ctx.textAlign = 'left'
        ctx.font = `10px ${FONT_MONO}`
        ctx.fillStyle = `rgba(${CYAN},.85)`
        ctx.fillText(`${LAYER_NAME[tm.layer]}`, bx + 14, by + 18)
        ctx.font = `600 15px ${FONT_SANS}`
        ctx.fillStyle = '#fff'
        ctx.fillText(`${tm.zh}  `, bx + 14, by + 40)
        const zw = ctx.measureText(`${tm.zh}  `).width
        ctx.font = `10.5px ${FONT_MONO}`
        ctx.fillStyle = `rgba(${ICE},.7)`
        ctx.fillText(tm.code, bx + 14 + zw, by + 40)
        ctx.font = `13px ${FONT_SANS}`
        ctx.fillStyle = `rgba(${ICE},.88)`
        lines.forEach((ln, i) => ctx.fillText(ln, bx + 14, by + 64 + i * 19))
        ctx.globalAlpha = 1
      }
      ctx.textAlign = 'start'
    }

    const stop = startFrameLoop({ host: cv.parentElement, frame })

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
