'use client'

import { useEffect, useRef } from 'react'
import { shouldAnimate, startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero — "Architected Intelligence" v3: a layered flow topology.
 *
 * A request (INPUT) enters, is shaped by three tiers of an AI build pipeline — system boundary →
 * stack selection → production — and leaves as a delivered system (OUTPUT). Tiers are rounded rectangular
 * plates joined by four struts; every step is a square module; dependencies are orthogonal connectors
 * (down, across, down) with rounded corners, like a real architecture diagram. The nodes are real AI-engineering steps (RAG, embeddings, evals, ...).
 *
 * "Untangling" is the motion idea:
 *  - intro: nodes start scattered with connectors crossing everywhere, then settle into the layered layout on
 *    springs, production tier first; connectors brighten as their endpoints become ordered
 *  - hover/tap a step: its full lineage (everything upstream it depends on, everything downstream it feeds)
 *    stays lit while the rest of the graph dims, and a card says what the step does for an AI system
 *  - click: the graph is scrambled and re-sorted again; a scan plane sweeps top→bottom on a fixed cadence
 *  - CTA hover: beams stream from OUTPUT to the primary button; scroll: tiers come apart and sink
 * Canvas 2D, no dependencies, no particle cloud. Time-based (dt), spring-damped camera, Bezier paths.
 * Paused off-screen / hidden tab, 30fps cap on phones, one settled frame for reduced motion / Data Saver.
 */

type Term = { tier: 0 | 1 | 2; code: string; zh: string; desc: string }

// Order inside a tier is the left→right layout order. Copy says what each step DOES for an AI system.
const TERMS: Term[] = [
  { tier: 0, code: 'REQUIREMENTS', zh: '需求拆解', desc: '把模糊的想法轉成可驗證的使用情境與驗收標準，後面每一步才有依據。' },
  { tier: 0, code: 'DATA CONTRACT', zh: '資料契約', desc: '先定義輸入、輸出與資料來源的格式，模型才有穩定的介面可以串接。' },
  { tier: 0, code: 'GUARDRAILS', zh: '護欄', desc: '限制模型能做與不能做的事，擋下越界、洩漏與不安全的輸出。' },
  { tier: 0, code: 'ACCESS CONTROL', zh: '權限控管', desc: '確保每位使用者只能檢索到自己有權看的資料，AI 也不例外。' },
  { tier: 0, code: 'EVAL CRITERIA', zh: '評測準則', desc: '先定義「好的答案」長什麼樣子，之後才量得出是進步還是退步。' },

  { tier: 1, code: 'LLM SELECTION', zh: '模型選型', desc: '依品質、延遲、成本與資料敏感度挑模型，而不是只挑最大最貴的。' },
  { tier: 1, code: 'EMBEDDINGS', zh: '向量化', desc: '把文字轉成向量，讓系統能用「語意」而不是關鍵字找到相關內容。' },
  { tier: 1, code: 'VECTOR DB', zh: '向量資料庫', desc: '儲存並快速檢索語意相近的內容，是 RAG 的長期記憶。' },
  { tier: 1, code: 'RAG', zh: '檢索增強生成', desc: '回答前先查你的資料，降低幻覺，並讓答案能追溯到來源。' },
  { tier: 1, code: 'PROMPT', zh: '提示設計', desc: '用結構化指令與範例穩定輸出，並像程式碼一樣版本化管理。' },
  { tier: 1, code: 'TOOLS / AGENTS', zh: '工具呼叫', desc: '讓模型呼叫 API 與內部系統，把答案變成真正完成的動作。' },

  { tier: 2, code: 'EVALS', zh: '自動評測', desc: '每次改動都跑一次測試集，避免「改好 A、壞了 B」。' },
  { tier: 2, code: 'OBSERVABILITY', zh: '可觀測性', desc: '記錄每次呼叫的輸入、輸出、延遲與錯誤，出問題時能重現與追查。' },
  { tier: 2, code: 'CACHING', zh: '快取', desc: '重複的問題直接回答，降低延遲，也省下 token 成本。' },
  { tier: 2, code: 'COST CONTROL', zh: '成本控管', desc: '監控 token 用量、設定預算與降級策略，避免帳單失控。' },
  { tier: 2, code: 'CI / CD', zh: '持續交付', desc: '模型、提示與程式一起版控、測試，並以灰度方式安全上線。' },
  { tier: 2, code: 'FALLBACK', zh: '降級備援', desc: '模型失敗或逾時就切換備援，讓服務不中斷。' },
]

// Term indices by code name, for readable edges below.
const T = Object.fromEntries(TERMS.map((t, i) => [t.code, i])) as Record<string, number>
const IN = -1
const OUT = -2
// Dependency edges (from → to). Flow runs INPUT → tier 0 → tier 1 → tier 2 → OUTPUT.
const EDGE_DEFS: Array<[number, number]> = [
  ...['REQUIREMENTS', 'DATA CONTRACT', 'GUARDRAILS', 'ACCESS CONTROL', 'EVAL CRITERIA'].map((c) => [IN, T[c]] as [number, number]),
  [T['REQUIREMENTS'], T['LLM SELECTION']], [T['REQUIREMENTS'], T['PROMPT']],
  [T['DATA CONTRACT'], T['EMBEDDINGS']], [T['DATA CONTRACT'], T['TOOLS / AGENTS']],
  [T['GUARDRAILS'], T['PROMPT']], [T['GUARDRAILS'], T['TOOLS / AGENTS']],
  [T['ACCESS CONTROL'], T['VECTOR DB']], [T['ACCESS CONTROL'], T['RAG']],
  [T['EVAL CRITERIA'], T['EVALS']],
  [T['EMBEDDINGS'], T['VECTOR DB']], [T['VECTOR DB'], T['RAG']], [T['RAG'], T['PROMPT']], [T['LLM SELECTION'], T['PROMPT']],
  [T['PROMPT'], T['EVALS']], [T['PROMPT'], T['OBSERVABILITY']], [T['RAG'], T['OBSERVABILITY']], [T['RAG'], T['CACHING']],
  [T['TOOLS / AGENTS'], T['FALLBACK']], [T['TOOLS / AGENTS'], T['COST CONTROL']], [T['LLM SELECTION'], T['COST CONTROL']],
  [T['PROMPT'], T['CI / CD']],
  [T['EVALS'], T['CI / CD']], [T['OBSERVABILITY'], T['CI / CD']], [T['CACHING'], T['COST CONTROL']], [T['COST CONTROL'], T['FALLBACK']],
  ...['EVALS', 'OBSERVABILITY', 'CACHING', 'CI / CD', 'FALLBACK'].map((c) => [T[c], OUT] as [number, number]),
]

const TIER_NAME = ['01 · SYSTEM BOUNDARY', '02 · STACK SELECTION', '03 · PRODUCTION']
const TIER_ZH = ['需求與邊界', '技術選型', '生產落地']

type GNode = {
  tier: number // -1 input, 0..2, 3 output
  term: number // TERMS index or -1
  order: [number, number, number]
  chaos: [number, number, number]
  pos: [number, number, number]
  vel: [number, number, number]
  delay: number
}
type Pulse = { path: number[]; s: number; speed: number }

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
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, lastMove: 0 }
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

    // ---- helpers -----------------------------------------------------------------------------
    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
    type Spring = { x: number; v: number }
    const spr = (st: Spring, target: number, k: number, c: number, dt: number) => {
      st.v += (k * (target - st.x) - c * st.v) * dt
      st.x += st.v * dt
    }
    const camX: Spring = { x: 0, v: 0 }
    const camY: Spring = { x: 0, v: 0 }
    const spot = { x: 0, y: 0, a: 0 }
    const hovSpr: Spring[] = TERMS.map(() => ({ x: 0, v: 0 }))
    const cardA: Spring = { x: 0, v: 0 }
    let cardIdx = 0
    const animate = shouldAnimate()

    // ---- graph -------------------------------------------------------------------------------
    const GAP = phone ? 0.52 : 0.92 // tier spacing: wide enough that each tier reads as its own plate
    const IO = phone ? 0.95 : 1.36 // INPUT / OUTPUT terminals sit beyond the outer tiers
    const TIER_Y = [GAP, 0, -GAP]
    const nodes: GNode[] = []
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const addNode = (tier: number, term: number, order: [number, number, number]) => {
      const chaos: [number, number, number] = [rnd(-1.9, 1.9), rnd(-1.7, 1.7), rnd(-1.1, 1.1)]
      nodes.push({
        tier, term, order, chaos,
        pos: animate ? [...chaos] : [...order],
        vel: [0, 0, 0],
        delay: tier === -1 || tier === 3 ? 0.1 + Math.random() * 0.2 : (2 - tier) * 0.38 + 0.2 + Math.random() * 0.35,
      })
    }
    // INPUT (index 0), then terms, then OUTPUT (last)
    const inputId = 0
    addNode(-1, -1, [0, IO, 0])
    const termId: number[] = []
    for (const tier of [0, 1, 2] as const) {
      const members = TERMS.map((t, i) => [t, i] as const).filter(([t]) => t.tier === tier)
      const n = members.length
      members.forEach(([, i], m) => {
        // 3-column grid, two rows (far row first): modules spread over the plate instead of one line
        const cols = 3
        const row = Math.floor(m / cols), col = m % cols
        const inRow = row === 0 ? Math.min(n, cols) : n - cols
        const x = (col - (inRow - 1) / 2) * 0.52
        const z = row === 0 ? -0.34 : 0.34
        termId[i] = nodes.length
        addNode(tier, i, [x, TIER_Y[tier], z])
      })
    }
    const outputId = nodes.length
    addNode(3, -1, [0, -IO, 0])
    const idOf = (d: number) => (d === IN ? inputId : d === OUT ? outputId : termId[d])
    const edges = EDGE_DEFS.map(([a, b]) => [idOf(a), idOf(b)] as [number, number])

    // adjacency for lineage + pulses
    const outE: number[][] = nodes.map(() => [])
    const inE: number[][] = nodes.map(() => [])
    edges.forEach(([a, b], ei) => { outE[a].push(ei); inE[b].push(ei) })
    const reach = (from: number, adj: number[][], pick: (e: [number, number]) => number) => {
      const seen = new Set<number>([from])
      const stack = [from]
      while (stack.length) {
        const n = stack.pop()!
        for (const ei of adj[n]) {
          const m = pick(edges[ei])
          if (!seen.has(m)) { seen.add(m); stack.push(m) }
        }
      }
      return seen
    }
    const edgeOf = new Map<string, number>()
    edges.forEach(([a, b], ei) => edgeOf.set(`${a}>${b}`, ei))
    const upstream = nodes.map((_, i) => reach(i, inE, (e) => e[0]))
    const downstream = nodes.map((_, i) => reach(i, outE, (e) => e[1]))

    const makePulse = (): Pulse => {
      const path = [inputId]
      let cur = inputId
      let guard = 0
      while (cur !== outputId && guard++ < 12) {
        const outs = outE[cur]
        cur = edges[outs[Math.floor(Math.random() * outs.length)]][1]
        path.push(cur)
      }
      return { path, s: 0, speed: 1.05 + Math.random() * 0.6 }
    }
    const POP = phone ? 5 : 9
    const pulses: Pulse[] = Array.from({ length: POP }, () => {
      const p = makePulse()
      p.s = Math.random() * (p.path.length - 1)
      return p
    })

    // click: scramble the graph, then let it untangle again
    let sweepAt = -1e9
    let tapPin = { idx: -1, until: 0 }
    let tapAt: { x: number; y: number } | null = null
    const onTap = (e: Event) => {
      sweepAt = performance.now()
      for (const n of nodes) {
        if (n.tier === -1 || n.tier === 3) continue
        n.vel[0] += rnd(-2.2, 2.2); n.vel[1] += rnd(-1.6, 1.6); n.vel[2] += rnd(-1.6, 1.6)
      }
      const d = (e as CustomEvent<{ x: number; y: number }>).detail
      if (d) tapAt = { x: d.x, y: d.y }
    }
    window.addEventListener('heroTap', onTap)

    // ---- projection --------------------------------------------------------------------------
    let yaw = -0.72
    let pitch = 0.58
    let U = 500
    let CX = 0
    let CY = 0
    let scrollS = 0
    let tNow = 0
    const tierLift = (k: number) => 0.03 * Math.sin(tNow * 0.7 + k * 1.9) // tiers levitate out of phase
    const project = (x: number, y: number, z: number, k: number): [number, number] => {
      const kk = Math.min(Math.max(k, 0), 2)
      const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
      const x1 = x * cyw + z * syw + (kk - 1) * camX.x * 0.05
      const z1 = -x * syw + z * cyw
      const y1 = y * cp + z1 * sp
      const d = -y * sp + z1 * cp + 3.2
      const sc = 3.2 / d
      return [CX + x1 * sc * U, CY - y1 * sc * U + scrollS * H * (0.30 + 0.22 * kk)]
    }
    // rounded rectangle in model space: the tier plates, ground contours and scan plane share it
    const RX = 0.74 // square plates: the three tiers stack into a cube-like volume
    const RZ = 0.74
    const RECT: Array<[number, number]> = [[RX, RZ], [RX, -RZ], [-RX, -RZ], [-RX, RZ]]
    const rectPath = (y: number, k: number, scale = 1) => {
      const rx = RX * scale, rz = RZ * scale, rr = 0.07 * scale
      // corner centres in walking order (+,+) → (−,+) → (−,−) → (+,−), each with its start angle
      const corners: Array<[number, number, number]> = [
        [rx - rr, rz - rr, 0], [-(rx - rr), rz - rr, Math.PI / 2], [-(rx - rr), -(rz - rr), Math.PI], [rx - rr, -(rz - rr), (Math.PI * 3) / 2],
      ]
      let first = true
      for (const [cx, cz, a0] of corners) {
        for (let i = 0; i <= 5; i++) {
          const th = a0 + (i / 5) * (Math.PI / 2)
          const [sx, sy] = project(cx + Math.cos(th) * rr, y, cz + Math.sin(th) * rr, k)
          if (first) { ctx.moveTo(sx, sy); first = false } else ctx.lineTo(sx, sy)
        }
      }
      ctx.closePath()
    }

    const CYAN = '90,220,255'
    const ICE = '225,244,255'
    const ORANGE = '255,110,40'
    const FONT_SANS = '"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif'
    const FONT_MONO = 'ui-monospace,"JetBrains Mono",SFMono-Regular,monospace'

    const badge = (cx: number, cy: number, r: number) => {
      ctx.beginPath()
      ctx.roundRect(cx - r, cy - r, r * 2, r * 2, Math.max(2, r * 0.3))
    }

    let phoneLeft = 0 // x where the phone diagram region starts
    let phoneCardTop = 0 // y under the stacked CTAs, where the caption card sits
    let hovered = -1 // TERMS index
    let tourIdx = 0
    let tourAt = 0
    let lastNow = performance.now()
    const introStart = lastNow
    let scrollEase = 0

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
      tNow = t
      const dt = Math.min((now - lastNow) / 1000, 0.05) || 1 / 60
      lastNow = now
      const live = now - mouse.lastMove < 6000 && mouse.x > -9000
      glow += (glowTarget - glow) * (1 - Math.exp(-dt * 6))
      spr(camX, mouse.nx, 38, 9, dt)
      spr(camY, mouse.ny, 38, 9, dt)
      if (spot.a < 0.02 && live) { spot.x = mouse.x; spot.y = mouse.y }
      const follow = 1 - Math.exp(-dt * 9)
      spot.x += (mouse.x - spot.x) * follow
      spot.y += (mouse.y - spot.y) * follow
      spot.a += ((live && !phone ? 1 : 0) - spot.a) * (1 - Math.exp(-dt * 5))

      const rc = section?.getBoundingClientRect()
      const scrollRaw = rc ? Math.min(Math.max(-rc.top / (rc.height * 0.8), 0), 1) : 0
      scrollEase += (scrollRaw - scrollEase) * (1 - Math.exp(-dt * 7))
      scrollS = scrollEase
      const fade = 1 - scrollS * 0.85

      if (phone) {
        // stacked CTAs sit on the left; the diagram takes everything to their right (from the first button's
        // top down to the tab bar) and the step caption fills the space under the buttons. All measured from
        // the real buttons so subtitle wrapping / viewport height never collide.
        const primary = document.querySelector('.hv-cta.primary')
        const second = document.querySelector('.hero-ctas .hv-link')
        const cb = cv.getBoundingClientRect()
        let topY = H * 0.45
        let left = W * 0.42
        phoneCardTop = H * 0.62
        if (primary) {
          const r = primary.getBoundingClientRect()
          topY = r.top - cb.top - 4
          left = r.right - cb.left + 8
        }
        if (second) phoneCardTop = second.getBoundingClientRect().bottom - cb.top + 30
        phoneLeft = left
        const right = W - 2
        const bottomY = H - 76 // just above the tab bar
        const availH = Math.max(bottomY - topY, 200)
        const availW = Math.max(right - left, 140)
        U = Math.min(Math.max((availH - 46) / 2.2, 52), availW / 2.1) // near-full width, tiny bleed at the right edge is intended
        CX = left + availW / 2
        CY = topY + (2.2 * U + 46) / 2 + 4 // top of the diagram lines up with the first button
      }
      else { U = Math.min(W * 0.15, H * 0.225); CX = W * 0.76; CY = H * 0.56 }
      yaw = -0.72 + camX.x * 0.30 + Math.sin(t * 0.21) * 0.05 // ~41° turn: the volume reads as a 3D block, not a flat sheet
      pitch = 0.58 + camY.x * 0.07

      // ---- untangle: springs pull each node from the scatter into its place, tier by tier ----
      const since = animate ? (now - introStart) / 1000 : 99
      for (const n of nodes) {
        const settling = since > n.delay
        for (let a = 0; a < 3; a++) {
          if (!animate) { n.pos[a] = n.order[a]; continue }
          const target = settling ? n.order[a] : n.chaos[a] + 0.05 * Math.sin(t * 1.1 + a * 2.1 + n.delay * 9)
          const k = settling ? 26 : 4
          const c = settling ? 6.5 : 3.5
          n.vel[a] += (k * (target - n.pos[a]) - c * n.vel[a]) * dt
          n.pos[a] += n.vel[a] * dt
        }
      }
      const orderP = nodes.map((n) => {
        const d = Math.hypot(n.pos[0] - n.order[0], n.pos[1] - n.order[1], n.pos[2] - n.order[2])
        return clamp01(1 - d / 1.5)
      })

      // background
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#010a33'
      ctx.fillRect(0, 0, W, H)
      const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, U * 1.9)
      bg.addColorStop(0, 'rgba(0,70,190,.50)')
      bg.addColorStop(1, 'rgba(0,30,110,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ---- ground contours ----
      ctx.lineWidth = 1
      for (let j = 0; j < 3; j++) {
        ctx.beginPath()
        ctx.setLineDash(j % 2 ? [2, 7] : [])
        rectPath(-IO - 0.3 + tierLift(2), 2, 1.1 + j * 0.12)
        ctx.strokeStyle = `rgba(${CYAN},${(0.15 - j * 0.04) * fade})`
        ctx.stroke()
      }
      ctx.setLineDash([])

      // ---- four struts tying the tier plates into one volume ----
      ctx.strokeStyle = `rgba(${CYAN},${0.16 * fade})`
      ctx.lineWidth = 1
      for (let v = 0; v < 4; v++) {
        ctx.beginPath()
        for (let k = 0; k < 3; k++) {
          const [sx, sy] = project(RECT[v][0], TIER_Y[k] + tierLift(k), RECT[v][1], k)
          if (k === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
        }
        ctx.stroke()
      }

      const used: Array<[number, number, number, number]> = []
      const clash = (x: number, y: number, w: number, h: number) => used.some((r) => x < r[0] + r[2] + 3 && x + w + 3 > r[0] && y < r[1] + r[3] + 2 && y + h + 2 > r[1])

      // scan plane (fixed cadence + one per click): a hexagon sweeping top → bottom
      const sweepQ = (t % 3.6) / 3.6
      const clickQ = clamp01((now - sweepAt) / 1500)
      const sweeps = [IO - 2 * IO * sweepQ]
      if (now - sweepAt < 1500) sweeps.push(IO - 2 * IO * clickQ)

      // ---- tier plates (bottom first so the top plate overlays) ----
      const introFade = animate ? clamp01(since / 1.2) : 1
      for (let k = 2; k >= 0; k--) {
        const y = TIER_Y[k] + tierLift(k)
        const lay = fade * introFade
        ctx.beginPath()
        rectPath(y, k)
        const top = project(0, y, -RZ, k)[1]
        const bot = project(0, y, RZ, k)[1]
        const gg = ctx.createLinearGradient(0, Math.min(top, bot), 0, Math.max(top, bot))
        gg.addColorStop(0, `rgba(60,150,255,${0.05 * lay})`)
        gg.addColorStop(1, `rgba(20,90,230,${0.15 * lay})`)
        ctx.fillStyle = gg
        ctx.fill()
        ctx.strokeStyle = `rgba(${ICE},${0.34 * lay})`
        ctx.lineWidth = 1.1
        ctx.stroke()
        ctx.fillStyle = `rgba(${ICE},${0.55 * lay})`
        RECT.forEach(([x, z]) => {
          const [sx, sy] = project(x, y, z, k)
          ctx.fillRect(sx - 2, sy - 2, 4, 4)
        })
        if (!phone) {
          const lp = RECT.map(([x, z]) => project(x, y, z, k)).reduce((m, p) => (p[0] < m[0] ? p : m)) // left-most corner
          ctx.font = `10.5px ${FONT_MONO}`
          ctx.textAlign = 'right'
          ctx.fillStyle = `rgba(${ICE},${0.58 * lay})`
          ctx.fillText(TIER_NAME[k], lp[0] - 12, lp[1] - 4)
          const cw = ctx.measureText(TIER_NAME[k]).width
          used.push([lp[0] - 12 - cw, lp[1] - 16, cw, 30])
          ctx.font = `11px ${FONT_SANS}`
          ctx.fillStyle = `rgba(${CYAN},${0.62 * lay})`
          ctx.fillText(TIER_ZH[k], lp[0] - 12, lp[1] + 11)
          ctx.textAlign = 'left'
        }
      }
      for (const yS of sweeps) {
        if (yS < -IO - 0.05 || yS > IO + 0.05) continue
        ctx.beginPath()
        rectPath(yS, 1, 1.0)
        ctx.strokeStyle = `rgba(${CYAN},${0.22 * fade})`
        ctx.lineWidth = 1
        ctx.setLineDash([4, 6])
        ctx.stroke()
        ctx.setLineDash([])
      }

      // ---- node screen positions ----
      const sp: Array<[number, number]> = nodes.map((n) => {
        const k = n.tier < 0 ? 0 : n.tier > 2 ? 2 : n.tier
        const lift = n.tier >= 0 && n.tier <= 2 ? tierLift(n.tier) : 0
        let [sx, sy] = project(n.pos[0], n.pos[1] + lift, n.pos[2], k)
        if (!phone && spot.a > 0.01) {
          const dx = spot.x - sx, dy = spot.y - sy
          const d = Math.hypot(dx, dy)
          if (d < 150) { const near = (1 - d / 150) * spot.a; sx += dx * 0.12 * near; sy += dy * 0.12 * near }
        }
        return [sx, sy]
      })

      // ---- lineage: hovered step keeps its upstream + downstream lit, the rest dims ----
      const hoveredNode = hovered >= 0 ? termId[hovered] : -1
      const up = hoveredNode >= 0 ? upstream[hoveredNode] : null
      const down = hoveredNode >= 0 ? downstream[hoveredNode] : null
      const edgeOn = (a: number, b: number) => (up ? up.has(a) && up.has(b) : false) || (down ? down.has(a) && down.has(b) : false)

      // ---- connectors: orthogonal routes (down, across, down) with rounded corners ----
      type Route = { pts: Array<[number, number]>; cum: number[] }
      const routes: Route[] = edges.map(([a, b], ei) => {
        const [ax, ay] = sp[a], [bx, by] = sp[b]
        const lane = (ei * 0.381966) % 1 // spreads the horizontal runs over different heights (bus look)
        const my = Math.abs(by - ay) < 26 ? Math.min(ay, by) - 14 - lane * 10 : ay + (by - ay) * (0.3 + 0.4 * lane)
        const pts: Array<[number, number]> = [[ax, ay], [ax, my], [bx, my], [bx, by]]
        const cum = [0]
        for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
        return { pts, cum }
      })
      const tracePath = (r: Route, rad: number) => {
        const p = r.pts
        ctx.moveTo(p[0][0], p[0][1])
        for (let i = 1; i < p.length - 1; i++) ctx.arcTo(p[i][0], p[i][1], p[i + 1][0], p[i + 1][1], rad)
        ctx.lineTo(p[p.length - 1][0], p[p.length - 1][1])
      }
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      edges.forEach(([a, b], ei) => {
        const settled = Math.min(orderP[a], orderP[b])
        const on = hoveredNode >= 0 && edgeOn(a, b)
        const dim = hoveredNode >= 0 && !on
        const base = 0.10 + 0.24 * settled
        ctx.strokeStyle = `rgba(${on ? ICE : CYAN},${(on ? 0.9 : dim ? base * 0.35 : base) * fade})`
        ctx.lineWidth = on ? 1.6 : 1
        ctx.beginPath()
        tracePath(routes[ei], 9)
        ctx.stroke()
        if (on) {
          ctx.setLineDash([6, 10])
          ctx.lineDashOffset = -t * 40
          ctx.strokeStyle = `rgba(${ICE},${0.9 * fade})`
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.setLineDash([])
        }
      })

      // ---- data pulses: ride the connector curves, speed breathes, tapered bloom trail ----
      ctx.globalCompositeOperation = 'lighter'
      const routePoint = (r: Route, u: number): [number, number] => {
        const d = u * (r.cum[r.cum.length - 1] || 1)
        for (let i = 1; i < r.pts.length; i++) {
          if (d <= r.cum[i] || i === r.pts.length - 1) {
            const seg = r.cum[i] - r.cum[i - 1] || 1
            const f = Math.min(Math.max((d - r.cum[i - 1]) / seg, 0), 1)
            return [r.pts[i - 1][0] + (r.pts[i][0] - r.pts[i - 1][0]) * f, r.pts[i - 1][1] + (r.pts[i][1] - r.pts[i - 1][1]) * f]
          }
        }
        return r.pts[r.pts.length - 1]
      }
      const routeOf = (pl: Pulse, i0: number) => routes[edgeOf.get(`${pl.path[i0]}>${pl.path[i0 + 1]}`)!]
      const pathPoint = (pl: Pulse, sv: number): [number, number] => {
        const s0 = Math.min(Math.max(sv, 0), pl.path.length - 1.0001)
        const i0 = Math.floor(s0)
        return routePoint(routeOf(pl, i0), s0 - i0)
      }
      const pulsesOn = animate ? orderP.reduce((s, v) => s + v, 0) / nodes.length > 0.6 : true
      for (let i = pulses.length - 1; i >= 0 && pulsesOn; i--) {
        const p = pulses[i]
        const pace = 0.82 + 0.36 * Math.sin(t * 1.6 + p.speed * 3.1)
        const curLen = routeOf(p, Math.min(Math.floor(p.s), p.path.length - 2)).cum.slice(-1)[0] || 120
        p.s += p.speed * pace * dt * (1 + glow * 0.8) * (170 / Math.max(curLen, 90)) // ~constant on-screen speed
        if (p.s >= p.path.length - 1) {
          if (pulses.length > POP) { pulses.splice(i, 1); continue }
          Object.assign(p, makePulse())
        }
        const head = pathPoint(p, p.s)
        const nextNode = nodes[p.path[Math.min(Math.floor(p.s) + 1, p.path.length - 1)]]
        const col = nextNode.tier >= 2 ? ORANGE : ICE // pulses turn orange as they reach production
        const ramp = Math.min(p.s / 0.6, 1)
        let prev = head
        const STEPS = 14
        for (let m = 1; m <= STEPS; m++) {
          const sv = p.s - m * 0.05
          if (sv < 0) break
          const pt = pathPoint(p, sv)
          const w = 1 - m / STEPS
          ctx.strokeStyle = `rgba(${col},${0.6 * w * w * fade * ramp})`
          ctx.lineWidth = 0.6 + 2.6 * w
          ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(pt[0], pt[1]); ctx.stroke()
          prev = pt
        }
        const hg = ctx.createRadialGradient(head[0], head[1], 0, head[0], head[1], 15)
        hg.addColorStop(0, `rgba(${col},${0.85 * fade * ramp})`)
        hg.addColorStop(0.35, `rgba(${col},${0.25 * fade * ramp})`)
        hg.addColorStop(1, `rgba(${col},0)`)
        ctx.fillStyle = hg
        ctx.beginPath(); ctx.arc(head[0], head[1], 15, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,${0.95 * fade * ramp})`
        ctx.beginPath(); ctx.arc(head[0], head[1], 1.8, 0, Math.PI * 2); ctx.fill()
      }

      // pointer spotlight
      if (spot.a > 0.01) {
        const sg = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, 170)
        sg.addColorStop(0, `rgba(120,210,255,${0.13 * spot.a * fade})`)
        sg.addColorStop(1, 'rgba(120,210,255,0)')
        ctx.fillStyle = sg
        ctx.beginPath(); ctx.arc(spot.x, spot.y, 170, 0, Math.PI * 2); ctx.fill()
      }

      // ---- OUTPUT glow (the delivered system) ----
      const op = sp[outputId]
      const beat = 0.5 + 0.5 * Math.sin((t * 2 * Math.PI) / 3.2)
      const cr = (phone ? 13 : 20) * (1 + beat * 0.18 + glow * 0.4) * (0.4 + 0.6 * orderP[outputId])
      const cg = ctx.createRadialGradient(op[0], op[1], 0, op[0], op[1], cr * 2.6)
      cg.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`)
      cg.addColorStop(0.25, `rgba(${CYAN},${0.6 * fade})`)
      cg.addColorStop(1, `rgba(${CYAN},0)`)
      ctx.fillStyle = cg
      ctx.beginPath(); ctx.arc(op[0], op[1], cr * 2.6, 0, Math.PI * 2); ctx.fill()

      // CTA hover: beams from OUTPUT to the primary button
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
            ctx.moveTo(op[0], op[1])
            ctx.quadraticCurveTo((op[0] + tx) / 2, Math.min(op[1], ty) - 70 + off * 0.6 + off, tx, ty + (i - 2) * 4)
            ctx.stroke()
          }
          ctx.setLineDash([])
        }
      }

      // ---- hover / tap / tour detection ----
      ctx.globalCompositeOperation = 'source-over'
      const HIT = phone ? 26 : 20
      let best = -1
      let bestD = HIT
      for (let i = 0; i < TERMS.length; i++) {
        const [sx, sy] = sp[termId[i]]
        if (live && !touch) {
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
      if (focus < 0 && (touch || phone) && !live) {
        if (now - tourAt > 3800) { tourAt = now; tourIdx = (tourIdx + 1) % TERMS.length }
        focus = tourIdx
      }
      hovered = focus
      hovSpr.forEach((st, i) => spr(st, i === hovered ? 1 : 0, 170, 15, dt))
      if (hovered >= 0) cardIdx = hovered
      spr(cardA, hovered >= 0 ? 1 : 0, 150, 17, dt)

      // ---- nodes: hexagon badges ----
      ctx.textAlign = 'left'
      const drawNode = (id: number) => {
        const n = nodes[id]
        const [sx, sy] = sp[id]
        const op_ = 0.35 + 0.65 * orderP[id]
        const inLineage = hoveredNode < 0 || (up?.has(id) ?? false) || (down?.has(id) ?? false)
        const dimF = inLineage ? 1 : 0.28
        let bump = 0 // the scan plane lights badges as it passes their height
        for (const yS of sweeps) bump += Math.exp(-Math.pow((n.order[1] - yS) / 0.22, 2))
        if (n.term < 0) {
          const r = (phone ? 9 : 12) * (n.tier === 3 ? 1 + beat * 0.08 : 1)
          badge(sx, sy, r)
          ctx.fillStyle = `rgba(2,14,70,${0.9 * fade})`
          ctx.fill()
          ctx.strokeStyle = `rgba(${n.tier === 3 ? ORANGE : ICE},${0.9 * dimF * fade})`
          ctx.lineWidth = 1.6
          ctx.stroke()
          ctx.font = `600 10px ${FONT_MONO}`
          ctx.fillStyle = `rgba(${ICE},${0.85 * dimF * fade})`
          ctx.textAlign = 'center'
          ctx.fillText(n.tier === -1 ? 'REQUEST' : 'DELIVERY', sx, n.tier === -1 ? sy - r - 8 : sy + r + 15)
          if (!phone) {
            ctx.font = `10.5px ${FONT_SANS}`
            ctx.fillStyle = `rgba(${CYAN},${0.75 * dimF * fade})`
            ctx.fillText(n.tier === -1 ? '需求進入' : '系統交付', sx, n.tier === -1 ? sy - r - 21 : sy + r + 28)
          }
          ctx.textAlign = 'left'
          return
        }
        const tm = TERMS[n.term]
        const on = n.term === hovered
        const h = Math.min(Math.max(hovSpr[n.term].x, -0.2), 1.25)
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + n.term)
        const r = (phone ? 6.2 : 7.6) + 3.2 * h + bump * 1.6
        badge(sx, sy, r)
        ctx.fillStyle = `rgba(4,22,92,${0.85 * op_ * fade})`
        ctx.fill()
        ctx.strokeStyle = `rgba(${on ? ICE : CYAN},${Math.min(0.55 + 0.4 * h + bump * 0.4 + pulse * 0.1, 1) * op_ * dimF * fade})`
        ctx.lineWidth = on ? 1.8 : 1.2
        ctx.stroke()
        ctx.beginPath(); ctx.arc(sx, sy, 1.9 + h * 1.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${on ? ICE : CYAN},${(0.75 + 0.25 * h) * op_ * dimF * fade})`
        ctx.fill()
        if (on) {
          badge(sx, sy, r + 5 + pulse * 2.5)
          ctx.strokeStyle = `rgba(${ICE},${0.5 * fade})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
        // label: far row above, near row below (rows alternate); skipped if it would collide
        if (!phone || on) {
          ctx.font = `${on ? 600 : 400} 10px ${FONT_MONO}`
          const tw = ctx.measureText(tm.code).width
          const above = n.order[2] < 0
          const ly = above ? sy - r - 7 : sy + r + 14
          const lx = sx - tw / 2
          if (on || (orderP[id] > 0.8 && !clash(lx, ly - 9, tw, 12))) {
            used.push([lx, ly - 9, tw, 12])
            ctx.fillStyle = `rgba(${ICE},${(on ? 1 : 0.66) * dimF * fade})`
            ctx.fillText(tm.code, lx, ly)
          }
        }
      }
      // far (higher on screen) first so nearer badges overlay
      nodes.map((_, i) => i).sort((a, b) => sp[a][1] - sp[b][1]).forEach(drawNode)

      // ---- explanation card ----
      if (cardA.x > 0.02 && fade > 0.5) {
        const tm = TERMS[cardIdx]
        const [sx, sy] = sp[termId[cardIdx]]
        const a = clamp01(cardA.x)
        const w = phone ? Math.max(phoneLeft - 24, 132) : 270
        ctx.font = `13px ${FONT_SANS}`
        const lines = wrap(tm.desc, w - 28)
        const h = 18 + 18 + 8 + lines.length * 19 + 22
        let bx = sx + 24
        if (bx + w > W - 12) bx = sx - 24 - w
        if (phone) bx = 12
        let by = phone ? phoneCardTop : sy - h / 2
        by = phone ? by : Math.max(84, Math.min(H - h - 16, by))
        ctx.save()
        ctx.translate(0, (1 - a) * 10)
        ctx.globalAlpha = a
        ctx.fillStyle = 'rgba(2,10,48,.94)'
        ctx.strokeStyle = `rgba(${CYAN},.55)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(bx, by, w, h, 14)
        ctx.fill(); ctx.stroke()
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
        ctx.fillText(TIER_NAME[tm.tier], bx + 14, by + 18)
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
        ctx.restore()
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
