// @ts-nocheck
'use client'
// Hero backdrop concepts for 8plus.app — ported verbatim from the
// 8plus Design System v2 UI kit (HeroBackdropsV2 + HeroBackdrops2V2).
// Each component takes { active } and renders a .hv-bg layer; canvas
// loops run only while their variant is active.
import React from 'react'

const HB_CSS = `
  .hv-bg canvas.hb-cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .hv-bg .hb-hint { position: absolute; right: clamp(24px, 5vw, 80px); top: 116px; z-index: 6; font-family: var(--font-mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: rgba(210,225,255,.6); background: rgba(3,6,26,.55); border-radius: 9999px; padding: 7px 13px; backdrop-filter: blur(10px); }
  @media (max-height: 620px) { .hv-bg .hb-hint { display: none; } }
  .hv-bg button.hb-mic { pointer-events: auto; cursor: pointer; border: 1px solid rgba(160,195,255,.35); color: rgba(225,238,255,.9); transition: .25s; }
  .hv-bg button.hb-mic:hover { border-color: #FE5000; color: #fff; }

  .hb-orbit .hub { position: absolute; left: 66%; top: 47%; width: 0; height: 0; }
  .hb-orbit .ringw { position: absolute; left: 0; top: 0; }
  .hb-orbit .ringb { position: absolute; inset: 0; border: 1px dashed rgba(160,195,255,.34); border-radius: 50%; }
  .hb-orbit .satw { position: absolute; inset: 0; animation: hbSpin linear infinite; }
  .hb-orbit .sat { position: absolute; left: 50%; top: 0; display: flex; align-items: center; gap: 7px; animation: hbSpinR linear infinite; }
  .hb-orbit .sat i { width: 8px; height: 8px; border-radius: 50%; background: #fff; box-shadow: 0 0 12px rgba(255,255,255,.8); flex: none; }
  .hb-orbit .sat i.o { background: #FE5000; box-shadow: 0 0 14px rgba(254,80,0,.9); }
  .hb-orbit .sat em { font-style: normal; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; color: rgba(210,225,255,.78); white-space: nowrap; }
  .hb-orbit .core { position: absolute; left: -11px; top: -11px; width: 22px; height: 22px; border-radius: 50%; background: #FE5000; box-shadow: 0 0 30px 8px rgba(254,80,0,.5); animation: hbPulse 2.6s ease-in-out infinite; }
  .hb-orbit .cecho { position: absolute; left: 50%; top: 50%; width: 90px; height: 90px; border-radius: 50%; border: 1px solid rgba(254,80,0,.5); animation: hbEcho 3.4s ease-out infinite; }
  @keyframes hbSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes hbSpinR { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
  @keyframes hbPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.18); } }
  @keyframes hbEcho { 0% { transform: translate(-50%,-50%) scale(.3); opacity: .8; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } }

  .hb-iso svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hb-iso .iso-legend { display: none; }
  @media (max-width: 820px) { .hb-iso .iso-legend { display: block; position: absolute; inset: 0; pointer-events: none; } }
  .hb-iso .drop { opacity: 0; animation: hbDrop .75s cubic-bezier(.2,.75,.3,1.15) forwards; }
  .hb-iso .lbl { opacity: 0; animation: hbFadeIn2 .6s ease forwards; }
  .hb-iso .gd { stroke-dasharray: 4 8; animation: hbDashFlow 1.2s linear infinite; }
  @keyframes hbDrop { from { opacity: 0; transform: translateY(-110px); } 70% { opacity: 1; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes hbFadeIn2 { to { opacity: 1; } }
  @keyframes hbDashFlow { to { stroke-dashoffset: -24; } }

  .hb-tape .bigmark { position: absolute; left: 68%; top: 42%; transform: translate(-50%,-50%) rotate(-6deg); width: min(52vh, 460px); aspect-ratio: 1; }
  .hb-tape .bigmark svg { width: 100%; height: 100%; display: block; overflow: visible; }
  .hb-tape .tape { position: absolute; left: -6%; right: -6%; overflow: hidden; padding: 9px 0; box-shadow: 0 12px 40px -18px rgba(0,0,0,.55); }
  .hb-tape .t1 { top: 13%; transform: rotate(-4deg); background: #FE5000; }
  .hb-tape .t2 { bottom: 9%; transform: rotate(3deg); background: rgba(255,255,255,.94); }
  .hb-tape .run { display: flex; width: max-content; animation: hbMarq 26s linear infinite; }
  .hb-tape .t2 .run { animation-duration: 34s; animation-direction: reverse; }
  .hb-tape .run span { font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .2em; white-space: nowrap; padding-right: 2em; }
  .hb-tape .t1 span { color: #001a5c; } .hb-tape .t2 span { color: #002FA7; }
  .hb-tape .pl { position: absolute; font-family: var(--font-mono); font-style: normal; font-size: 20px; color: rgba(255,255,255,.4); }
  .hb-tape .stamp { position: absolute; right: 26px; top: 50%; transform: translateY(-50%) rotate(90deg); font-family: var(--font-mono); font-size: 11px; letter-spacing: .3em; color: rgba(210,225,255,.5); white-space: nowrap; }
  @keyframes hbMarq { to { transform: translateX(-50%); } }

  .hb-bp { background-image: radial-gradient(rgba(160,195,255,.15) 1px, transparent 1.4px); background-size: 30px 30px; }
  .hb-bp svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hb-bp .hb-draw { fill: none; stroke: rgba(160,195,255,.5); stroke-width: 1.1; stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: hbDraw 1.5s ease forwards; }
  .hb-bp .hb-draw.org { stroke: #FE5000; stroke-width: 1.5; }
  .hb-bp .hb-flowline { fill: none; stroke: rgba(255,255,255,.9); stroke-width: 1.5; stroke-dasharray: 4 30; opacity: 0; animation: hbFlow2 2.6s linear infinite; }
  .hb-bp .hb-node { fill: #002FA7; stroke: rgba(160,195,255,.75); stroke-width: 1; opacity: 0; animation: hbFadeIn .6s ease 1.3s forwards; }
  @keyframes hbDraw { to { stroke-dashoffset: 0; } }
  @keyframes hbFlow2 { 0% { opacity: 0; stroke-dashoffset: 0; } 15% { opacity: .9; } 100% { opacity: .9; stroke-dashoffset: -136; } }
  @keyframes hbFadeIn { to { opacity: .9; } }

  @media (prefers-reduced-motion: reduce) {
    .hb-orbit .satw, .hb-orbit .sat, .hb-orbit .core, .hb-orbit .cecho,
    .hb-iso .gd, .hb-tape .run, .hb-bp .hb-flowline { animation: none; }
    .hb-iso .drop, .hb-iso .lbl { animation: none; opacity: 1; }
    .hb-bp .hb-draw { animation: none; stroke-dashoffset: 0; }
    .hb-bp .hb-node { animation: none; opacity: .9; }
    .hb-orbit .cecho { opacity: 0; }
  }

  @media (max-width: 820px) {
    .hb-orbit .hub { left: 58%; top: 54%; transform: scale(.72); }
    .hb-orbit .sat em { opacity: 0 !important; }
    .hb-iso svg { transform: scale(.82); transform-origin: 56% 52%; }
    .hb-iso .callout { display: none !important; }
    .hb-iso .iso-legend { display: none !important; }
    .hb-tape .bigmark { left: 62%; top: 56%; width: min(34vh, 260px); }
    .hb-bp .hb-draw { stroke: rgba(200,222,255,.8); stroke-width: 1.7; }
    .hb-bp .hb-draw.org { stroke: #FF6B1A; stroke-width: 2.2; }
    .hb-bp .hb-node { opacity: .95 !important; r: 3.6; }
    .hb-bp .hb-flowline { stroke: rgba(255,255,255,.95); stroke-width: 2; }
    .hb-bp { background-image: radial-gradient(rgba(200,222,255,.3) 1.5px, transparent 2px); background-size: 26px 26px; }
  }
  @media (max-width: 520px) {
    .hb-orbit .hub { left: 56%; top: 56%; transform: scale(.62); }
    .hb-iso svg { transform: scale(.74); transform-origin: 54% 54%; }
    .hb-tape .bigmark { left: 58%; }
  }`

const HB2_CSS = `
  .hb-typo .row { position: absolute; left: 0; right: 0; overflow: hidden; font-family: var(--font-display); font-weight: 700; font-size: 12.5vh; line-height: 1; white-space: nowrap; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.2); }
  .hb-typo .row.o { -webkit-text-stroke: 1.5px rgba(254,110,40,.55); }
  .hb-typo .run { display: flex; width: max-content; animation: hbMarq linear infinite; }
  .hb-typo .run span { padding-right: .5em; }
  .hb-ecl .sun { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%); width: min(50vh, 440px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 42% 40%, #FFE0B8, #FE7A26 52%, #E64A00 80%); animation: hbBreath2 6s ease-in-out infinite; }
  .hb-ecl .moon { position: absolute; left: 64%; top: 45%; width: calc(min(50vh, 440px) * 0.985); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 62% 42%, #04164c, #000d33 75%); transform: translate(calc(-50% + 18%), -50%); animation: hbEclipse 16s ease-in-out infinite; }
  .hb-ecl .oring { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%) rotate(18deg); width: min(62vh, 545px); aspect-ratio: 1; border-radius: 50%; border: 1px dashed rgba(190,215,255,.28); }
  @keyframes hbBreath2 {
    0%, 100% { box-shadow: 0 0 130px 26px rgba(254,110,40,.5), 0 0 40px 8px rgba(255,170,100,.6); }
    50% { box-shadow: 0 0 180px 38px rgba(254,110,40,.66), 0 0 54px 12px rgba(255,170,100,.75); }
  }
  @keyframes hbEclipse {
    0% { transform: translate(-50%, -50%); }
    12% { transform: translate(calc(-50% - 18%), -50%); }
    38% { transform: translate(calc(-50% - 18%), -50%); }
    50% { transform: translate(-50%, -50%); }
    62% { transform: translate(calc(-50% + 18%), -50%); }
    88% { transform: translate(calc(-50% + 18%), -50%); }
    100% { transform: translate(-50%, -50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hb-typo .run, .hb-ecl .sun, .hb-ecl .moon { animation: none; }
  }`

function injectCss(id, text) {
  if (typeof document === 'undefined') return
  let st = document.getElementById(id)
  if (!st) { st = document.createElement('style'); st.id = id; document.head.appendChild(st) }
  st.textContent = text
}

const KB = '#002FA7'

// shared canvas loop: runs only while active; one static frame under reduced motion.
function useCv(active, setup) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (!active) return
    const cv = ref.current; if (!cv) return
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const ctx = cv.getContext('2d')
    let raf, stop = false
    const inst = setup(cv, ctx)
    const resize = () => { const p = cv.parentElement; cv.width = p.clientWidth || 1280; cv.height = p.clientHeight || 720 }
    resize(); window.addEventListener('resize', resize)
    const loop = () => { inst.frame(); if (!stop) raf = requestAnimationFrame(loop) }
    if (!reduce) loop(); else inst.frame()
    return () => { stop = true; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); if (inst.dispose) inst.dispose() }
  }, [active])
  return ref
}

function Shell({ active, cls, children }) {
  React.useEffect(() => { injectCss('hb-css', HB_CSS); injectCss('hb2-css', HB2_CSS) }, [])
  return <div className={'hv-bg' + (cls ? ' ' + cls : '') + (active ? ' on' : '')}>{children}</div>
}

const Cv = ({ active, hint, refFn }) => (
  <Shell active={active}><canvas ref={refFn} className="hb-cv"></canvas>{hint ? <span className="hb-hint">{hint}</span> : null}</Shell>
)

// 等高線地形
function Topo({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = Math.random() * 10
    const F = (x, y, tt) =>
      Math.sin(x * 0.0032 + tt) + Math.cos(y * 0.004 - tt * 0.7) +
      Math.sin((x + y) * 0.0018 + tt * 0.5) +
      1.2 * Math.cos(Math.hypot(x - cv.width * 0.64, y - cv.height * 0.44) * 0.0036 - tt * 0.6)
    return { frame() {
      t += 0.004
      const w = cv.width, h = cv.height, s = 24
      ctx.fillStyle = '#002FA7'; ctx.fillRect(0, 0, w, h)
      const cols = Math.ceil(w / s) + 1, rows = Math.ceil(h / s) + 1, g = []
      for (let j = 0; j < rows; j++) { g[j] = []; for (let i = 0; i < cols; i++) g[j][i] = F(i * s, j * s, t) }
      const levels = [-2.8, -2.4, -2, -1.6, -1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8]
      for (let li = 0; li < levels.length; li++) {
        const lv = levels[li], orange = li === 7
        ctx.strokeStyle = orange ? 'rgba(254,80,0,.85)' : 'rgba(170,200,255,.36)'
        ctx.lineWidth = orange ? 1.5 : 1
        ctx.beginPath()
        for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
          const a = g[j][i], b = g[j][i + 1], c = g[j + 1][i + 1], d = g[j + 1][i]
          const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0)
          if (idx === 0 || idx === 15) continue
          const x0 = i * s, y0 = j * s
          const L = (v1, v2) => { const dv = v2 - v1; return dv ? (lv - v1) / dv : 0.5 }
          const top = [x0 + s * L(a, b), y0], right = [x0 + s, y0 + s * L(b, c)]
          const bot = [x0 + s * L(d, c), y0 + s], left = [x0, y0 + s * L(a, d)]
          const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]) }
          switch (idx) {
            case 1: case 14: seg(left, bot); break
            case 2: case 13: seg(bot, right); break
            case 3: case 12: seg(left, right); break
            case 4: case 11: seg(top, right); break
            case 5: seg(top, left); seg(bot, right); break
            case 6: case 9: seg(top, bot); break
            case 7: case 8: seg(top, left); break
            case 10: seg(top, right); seg(bot, left); break
          }
        }
        ctx.stroke()
      }
    } }
  })
  return <Shell active={active}><canvas ref={ref} className="hb-cv"></canvas></Shell>
}

// 半調點陣
function Dots({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    return { frame() {
      t += 0.012
      const w = cv.width, h = cv.height, s = 34
      ctx.fillStyle = '#002FA7'; ctx.fillRect(0, 0, w, h)
      const bandC = h * 0.85 + Math.sin(t * 0.55) * 170
      for (let y = s / 2; y < h + s; y += s) for (let x = s / 2; x < w + s; x += s) {
        const v = Math.sin(x * 0.005 + t) * Math.cos(y * 0.0045 - t * 0.7) + Math.sin((x - y) * 0.0025 + t * 0.45)
        const r = Math.max(0.4, ((v + 2) / 4) * 8.5)
        const band = Math.abs(x * 0.55 + y * 0.85 - bandC) < 95
        const dxn = (x - w * 0.5) / (w * 0.36), dyn = (y - h * 0.74) / (h * 0.32)
        const dd = dxn * dxn + dyn * dyn
        const dim = dd < 1 ? 0.22 + 0.78 * dd : 1
        ctx.fillStyle = band ? 'rgba(254,80,0,' + 0.92 * dim + ')' : 'rgba(190,215,255,' + 0.42 * dim + ')'
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      }
    } }
  })
  return <Shell active={active}><canvas ref={ref} className="hb-cv"></canvas></Shell>
}

// 軌道系統
const RINGS = [
  { d: 210, dur: 20, sats: [{ l: 'LLM / RAG', o: 0, orange: true }] },
  { d: 340, dur: 32, sats: [{ l: 'NEXT.JS', o: 0.15 }, { l: 'POSTGRES', o: 0.6 }] },
  { d: 480, dur: 46, sats: [{ l: 'AWS', o: 0.35 }, { l: 'K8S', o: 0.8 }] },
  { d: 630, dur: 62, sats: [{ l: 'CI / CD', o: 0.55 }] },
]
function Orbit({ active }) {
  return (
    <Shell active={active} cls="hb-orbit">
      <div className="hub">
        {RINGS.map((r) => (
          <div key={r.d} className="ringw" style={{ width: r.d, height: r.d, marginLeft: -r.d / 2, marginTop: -r.d / 2 }}>
            <div className="ringb"></div>
            {r.sats.map((s2) => (
              <div key={s2.l} className="satw" style={{ animationDuration: r.dur + 's', animationDelay: -r.dur * s2.o + 's' }}>
                <div className="sat" style={{ animationDuration: r.dur + 's', animationDelay: -r.dur * s2.o + 's' }}>
                  <i className={s2.orange ? 'o' : ''}></i><em>{s2.l}</em>
                </div>
              </div>
            ))}
          </div>
        ))}
        {[0, 1].map((k) => <span key={k} className="cecho" style={{ animationDelay: k * 1.7 + 's' }}></span>)}
        <div className="core"></div>
      </div>
    </Shell>
  )
}

// 架構堆疊
const ISO_W = 60, ISO_H = 30, ISO_S = 60, ISO_CX = 820, ISO_CY = 540
const ARCH_CUBES = [
  { u: 0, v: 0, l: 0, d: 0 }, { u: 1, v: 0, l: 0, d: 0.12 }, { u: 0, v: 1, l: 0, d: 0.24 }, { u: 1, v: 1, l: 0, d: 0.36 },
  { u: 0, v: 0, l: 1, d: 0.7 }, { u: 1, v: 0, l: 1, d: 0.82 }, { u: 0, v: 1, l: 1, d: 0.94 }, { u: 1, v: 1, l: 1, d: 1.06 },
  { u: 0.5, v: 0.5, l: 2, d: 1.5 },
  { u: 0.5, v: 0.5, l: 4, d: 1.9, orange: true },
]
const ARCH_DATA = ['MongoDB', 'PostgreSQL', 'Redis · MQ', 'S3 / Blob']
const ARCH_SVCS = ['auth-server', 'ocr-llm-server', 'context-eng-server', 'asr-server']
function ArchCube({ c }) {
  const w = ISO_W, hh = ISO_H, s = ISO_S
  const x = ISO_CX + (c.u - c.v) * w, y = ISO_CY + (c.u + c.v) * hh - c.l * s
  const pt = (arr) => arr.map((p) => p.join(',')).join(' ')
  const top = [[0, -s], [w, -hh - s], [0, -2 * hh - s], [-w, -hh - s]]
  const left = [[-w, -hh], [0, 0], [0, -s], [-w, -hh - s]]
  const right = [[0, 0], [w, -hh], [w, -hh - s], [0, -s]]
  const st = c.orange ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.55)'
  const f = c.orange
    ? ['rgba(254,80,0,.96)', 'rgba(205,62,0,.95)', 'rgba(160,48,0,.95)']
    : ['rgba(255,255,255,.18)', 'rgba(255,255,255,.08)', 'rgba(255,255,255,.035)']
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      <g className="drop" style={{ animationDelay: c.d + 's' }}>
        <polygon points={pt(top)} fill={f[0]} stroke={st} strokeWidth="1"></polygon>
        <polygon points={pt(left)} fill={f[1]} stroke={st} strokeWidth="1"></polygon>
        <polygon points={pt(right)} fill={f[2]} stroke={st} strokeWidth="1"></polygon>
      </g>
    </g>
  )
}
function Iso({ active }) {
  const [tick, setTick] = React.useState(0)
  React.useEffect(() => { if (active) setTick((n) => n + 1) }, [active])
  return (
    <Shell active={active} cls="hb-iso">
      <svg key={tick} viewBox="0 0 1320 760" preserveAspectRatio="xMidYMid slice">
        {ARCH_CUBES.map((c, i) => <ArchCube key={i} c={c} />)}
        <g className="lbl" style={{ animationDelay: '2.1s' }}>
          <line className="gd" x1="820" y1="336" x2="820" y2="384" stroke="rgba(254,80,0,.7)" strokeWidth="1.4"></line>
        </g>
        <g className="lbl callout" style={{ animationDelay: '0.6s' }}>
          <line x1="700" y1="510" x2="612" y2="510" stroke="rgba(160,195,255,.5)" strokeWidth="1"></line>
          <circle cx="700" cy="510" r="2" fill="rgba(220,235,255,.9)"></circle>
          <text x="602" y="488" textAnchor="end" fill="rgba(160,195,255,.75)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">DATA — 資料層</text>
          {ARCH_DATA.map((s2, i) => <text key={s2} x="602" y={508 + i * 18} textAnchor="end" fill="rgba(255,255,255,.92)" fontFamily="var(--font-mono)" fontSize="12">{s2}</text>)}
        </g>
        <g className="lbl callout" style={{ animationDelay: '1.35s' }}>
          <line x1="940" y1="450" x2="988" y2="450" stroke="rgba(160,195,255,.5)" strokeWidth="1"></line>
          <circle cx="940" cy="450" r="2" fill="rgba(220,235,255,.9)"></circle>
          <text x="1124" y="428" textAnchor="end" fill="rgba(160,195,255,.75)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">SERVICES · API</text>
          {ARCH_SVCS.map((s2, i) => <text key={s2} x="1124" y={448 + i * 18} textAnchor="end" fill="rgba(255,255,255,.92)" fontFamily="var(--font-mono)" fontSize="12">{s2}</text>)}
        </g>
        <g className="lbl callout" style={{ animationDelay: '1.7s' }}>
          <line x1="880" y1="390" x2="1030" y2="352" stroke="rgba(160,195,255,.5)" strokeWidth="1"></line>
          <circle cx="880" cy="390" r="2" fill="rgba(220,235,255,.9)"></circle>
          <text x="1124" y="348" textAnchor="end" fill="#fff" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">API GATEWAY</text>
          <text x="1124" y="362" textAnchor="end" fill="rgba(160,195,255,.7)" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.5">REST / gRPC ROUTING</text>
        </g>
        <g className="lbl" style={{ animationDelay: '2.15s' }}>
          <line x1="820" y1="206" x2="820" y2="188" stroke="rgba(254,110,40,.7)" strokeWidth="1"></line>
          <circle cx="820" cy="208" r="2" fill="#FE5000"></circle>
          <text x="820" y="164" textAnchor="middle" fill="#fff" fontFamily="var(--font-mono)" fontSize="12.5" fontWeight="600">WEB / APP</text>
          <text x="820" y="178" textAnchor="middle" fill="rgba(255,255,255,.75)" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.5">NEXT.JS CLIENT</text>
        </g>
      </svg>
      <div className="iso-legend">
        <div className="seg svc"><em>SERVICES · API</em>{ARCH_SVCS.map((s2) => <span key={s2}>{s2}</span>)}</div>
        <div className="seg data"><em>DATA — 資料層</em>{ARCH_DATA.map((s2) => <span key={s2}>{s2}</span>)}</div>
      </div>
    </Shell>
  )
}

// 聲波緞帶
function Wave({ active }) {
  const [mic, setMic] = React.useState('idle')
  const aud = React.useRef({ an: null, data: null })
  const resRef = React.useRef(null)
  React.useEffect(() => {
    if (!active) return
    try { if (document.permissionsPolicy && !document.permissionsPolicy.allowsFeature('microphone')) setMic('blocked') } catch (e) {}
    return () => {
      const r = resRef.current
      if (r) { if (r.stream) r.stream.getTracks().forEach((tr) => tr.stop()); if (r.actx) r.actx.close(); resRef.current = null }
      aud.current = { an: null, data: null }
      setMic('idle')
    }
  }, [active])
  const enableMic = async () => {
    setMic('asking')
    try {
      if (!navigator.mediaDevices) throw new Error('no media')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const actx = new (window.AudioContext || window.webkitAudioContext)()
      await actx.resume()
      const src = actx.createMediaStreamSource(stream)
      const an = actx.createAnalyser(); an.fftSize = 256; an.smoothingTimeConstant = 0.82
      src.connect(an)
      aud.current = { an, data: new Uint8Array(an.frequencyBinCount) }
      resRef.current = { stream, actx }
      setMic('live')
    } catch (e) { setMic('off') }
  }
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    return { frame() {
      t += 0.014
      const w = cv.width, h = cv.height, rows = 26
      const A = aud.current
      let bins = null
      if (A.an) { A.an.getByteFrequencyData(A.data); bins = A.data }
      ctx.fillStyle = '#002FA7'; ctx.fillRect(0, 0, w, h)
      for (let r = 0; r < rows; r++) {
        const prog = r / (rows - 1)
        const orange = r === 18
        const alpha = orange ? 0.9 : 0.1 + 0.45 * Math.sin(prog * Math.PI)
        ctx.strokeStyle = orange ? 'rgba(254,80,0,' + alpha + ')' : 'rgba(180,208,255,' + alpha + ')'
        ctx.lineWidth = orange ? 1.6 : 1.1
        ctx.beginPath()
        const yBase = h * (0.56 + (prog - 0.5) * 0.3)
        for (let x = 0; x <= w; x += 14) {
          const env = Math.sin((x / w) * Math.PI)
          let y = yBase + Math.sin(x * 0.0038 + t * 1.15 + r * 0.24) * 58 * env + Math.cos(x * 0.002 - t * 0.6 + r * 0.12) * 28 * env
          if (bins) {
            const bi = Math.min(bins.length - 1, ((x / w) * 64) | 0)
            const boost = bins[bi] / 255
            y -= boost * boost * 230 * env * (0.35 + 0.65 * Math.sin(prog * Math.PI))
          }
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    } }
  })
  return (
    <Shell active={active}>
      <canvas ref={ref} className="hb-cv"></canvas>
      {mic === 'live'
        ? <span className="hb-hint">MIC LIVE — 聲音正在驅動波形</span>
        : <button className="hb-hint hb-mic" onClick={enableMic}>{mic === 'asking' ? '要求麥克風權限中…' : mic === 'off' ? '無法取得麥克風 — 點擊重試' : mic === 'blocked' ? '此預覽環境可能未開放麥克風 — 點擊嘗試' : '點擊啟用麥克風 — 讓聲音驅動波形'}</button>}
    </Shell>
  )
}

// 點陣球體
const SPHERE_TERMS = ['embedding', 'LLM', 'RAG', 'vector db', 'token', 'agent', 'fine-tune', 'inference', 'prompt', 'context window', 'rerank', 'quantize']
function Sphere({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0, ti = 0
    const N = 560, pts = [], tags = [], pulses = []
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.399963
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad])
    }
    const tl = 0.42
    const monoFont = (px) => px + 'px ' + ((getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace').trim() || 'monospace')
    const onTap = (e) => {
      const d = e.detail
      tags.push({ x: d.x, y: d.y, s: SPHERE_TERMS[ti % SPHERE_TERMS.length], o: ti % 3 === 0, age: 0 })
      pulses.push({ x: d.x, y: d.y, r: 3 })
      ti++
    }
    window.addEventListener('heroTap', onTap)
    return {
      dispose() { window.removeEventListener('heroTap', onTap) },
      frame() {
        t += 0.0045
        const w = cv.width, h = cv.height
        ctx.clearRect(0, 0, w, h)
        const cx = w * 0.66, cy = h * 0.47, R = Math.min(w, h) * 0.34
        ctx.strokeStyle = 'rgba(160,195,255,.22)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.3, -0.28, 0, Math.PI * 2); ctx.stroke()
        for (let i = 0; i < N; i++) {
          const p = pts[i]
          const xr = p[0] * Math.cos(t) + p[2] * Math.sin(t)
          const zr = -p[0] * Math.sin(t) + p[2] * Math.cos(t)
          const y2 = p[1] * Math.cos(tl) - zr * Math.sin(tl)
          const z2 = p[1] * Math.sin(tl) + zr * Math.cos(tl)
          const depth = (z2 + 1) / 2, orange = i % 19 === 0
          ctx.fillStyle = orange ? 'rgba(254,80,0,' + (0.2 + 0.75 * depth) + ')' : 'rgba(200,220,255,' + (0.06 + 0.5 * depth) + ')'
          ctx.beginPath(); ctx.arc(cx + xr * R, cy + y2 * R, (orange ? 1.2 : 0.8) + 1.8 * depth, 0, Math.PI * 2); ctx.fill()
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i]; p.r += 2.4
          const a = Math.max(0, 1 - p.r / 90)
          ctx.strokeStyle = 'rgba(254,80,0,' + a * 0.8 + ')'; ctx.lineWidth = 1.4
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.stroke()
          if (a <= 0) pulses.splice(i, 1)
        }
        ctx.font = monoFont(13)
        for (let i = tags.length - 1; i >= 0; i--) {
          const g = tags[i]; g.age++
          const a = g.age < 15 ? g.age / 15 : Math.max(0, 1 - (g.age - 15) / 110)
          ctx.fillStyle = g.o ? 'rgba(254,110,40,' + a + ')' : 'rgba(225,238,255,' + a * 0.9 + ')'
          ctx.fillText(g.s, g.x + 10, g.y - g.age * 0.45)
          if (a <= 0) tags.splice(i, 1)
        }
      }
    }
  })
  return (
    <Shell active={active}>
      <canvas ref={ref} className="hb-cv"></canvas>
      <span className="hb-hint">點擊畫面 — 召喚 AI 詞彙</span>
    </Shell>
  )
}

// 雜誌拼貼
const TAPE1 = 'ARCHITECTURE FIRST ✳ AI SHIPPED ✳ TRUSTED SYSTEMS ✳ 8PLUS.APP ✳ '
const TAPE2 = '架構先行 · AI 落地 · 可信系統 · TAIPEI · EST. 2026 · '
function Tape({ active }) {
  const plus = [['12%', '30%'], ['30%', '72%'], ['48%', '38%'], ['86%', '70%'], ['78%', '22%']]
  return (
    <Shell active={active} cls="hb-tape">
      <div className="bigmark" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="32" cy="29" r="18" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth="2.2"></circle>
          <path d="M53 9H68L36 91H21L53 9Z" fill="none" stroke="rgba(255,255,255,.42)" strokeWidth="2.2"></path>
          <circle cx="70" cy="64" r="28" fill="#FE5000" opacity=".92"></circle>
        </svg>
      </div>
      {plus.map((p, i) => <i key={i} className="pl" style={{ left: p[0], top: p[1] }}>+</i>)}
      <div className="tape t1"><div className="run"><span>{TAPE1 + TAPE1 + TAPE1}</span><span>{TAPE1 + TAPE1 + TAPE1}</span></div></div>
      <div className="tape t2"><div className="run"><span>{TAPE2 + TAPE2 + TAPE2}</span><span>{TAPE2 + TAPE2 + TAPE2}</span></div></div>
      <span className="stamp">NO.01 — TRUST ISSUE — 2026</span>
    </Shell>
  )
}

// 電路藍圖
function Bp({ active }) {
  const gRef = React.useRef(null)
  React.useEffect(() => {
    if (!active) return
    const g = gRef.current; if (!g) return
    while (g.firstChild) g.removeChild(g.firstChild)
    const ns = 'http://www.w3.org/2000/svg'
    const cx = 870, cy = 357, hs = 74
    const mk = (tag, attrs) => { const el = document.createElementNS(ns, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); g.appendChild(el); return el }
    const R = (a, b) => a + Math.random() * (b - a)
    const trace = (pts, orange, i) => {
      let len = 0
      for (let k = 1; k < pts.length; k++) len += Math.abs(pts[k][0] - pts[k - 1][0]) + Math.abs(pts[k][1] - pts[k - 1][1])
      const d = 'M ' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ')
      const p = mk('path', { d, 'class': 'hb-draw' + (orange ? ' org' : '') })
      p.style.setProperty('--len', String(Math.ceil(len)))
      p.style.animationDelay = (i * 0.09).toFixed(2) + 's'
      if (orange) { const f = mk('path', { d, 'class': 'hb-flowline' }); f.style.animationDelay = (1.7 + i * 0.09).toFixed(2) + 's' }
      for (let k = 1; k < pts.length - 1; k++) mk('circle', { cx: pts[k][0], cy: pts[k][1], r: 3, 'class': 'hb-node' })
    }
    for (let i = 0; i < 14; i++) {
      const side = i % 4, orange = i % 5 === 0
      const off = -46 + (i % 4) * 30 + R(-8, 8)
      let pts
      if (side === 0) { const sy = R(60, 690), mx = R(130, 560), py = cy + off; pts = [[-30, sy], [mx, sy], [mx, py], [cx - hs, py]] }
      else if (side === 1) { const sy = R(60, 690), mx = R(1060, 1300), py = cy + off; pts = [[1360, sy], [mx, sy], [mx, py], [cx + hs, py]] }
      else if (side === 2) { const sx = R(80, 1240), my = R(50, 170), px = cx + off; pts = [[sx, -30], [sx, my], [px, my], [px, cy - hs]] }
      else { const sx = R(80, 1240), my = R(560, 700), px = cx + off; pts = [[sx, 790], [sx, my], [px, my], [px, cy + hs]] }
      trace(pts, orange, i)
    }
  }, [active])
  return (
    <Shell active={active} cls="hb-bp">
      <svg viewBox="0 0 1320 760" preserveAspectRatio="xMidYMid slice">
        <g ref={gRef}></g>
        <rect x="796" y="283" width="148" height="148" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.6)" strokeDasharray="6 5" strokeWidth="1.3"></rect>
        <rect x="824" y="311" width="92" height="92" rx="6" fill="none" stroke="rgba(254,80,0,.85)" strokeWidth="1.4"></rect>
        <text x="870" y="352" textAnchor="middle" fill="rgba(255,255,255,.85)" fontFamily="var(--font-mono)" fontSize="22">8+</text>
        <text x="870" y="376" textAnchor="middle" fill="rgba(160,195,255,.6)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3">CORE</text>
      </svg>
    </Shell>
  )
}

// 星際穿越
function Warp({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let ps = null
    const reset = (p, maxR) => { p.a = Math.random() * Math.PI * 2; p.d = 8 + Math.random() * 50; p.sp = 1.012 + Math.random() * 0.02; p.o = Math.random() < 0.06; if (maxR) p.d = Math.random() * maxR }
    return { frame() {
      const w = cv.width, h = cv.height, cx = w * 0.5, cy = h * 0.46, maxR = Math.hypot(w, h) * 0.58
      if (!ps) { ps = Array.from({ length: 170 }, () => { const p = {}; reset(p, maxR); return p }) }
      ctx.fillStyle = 'rgba(0,47,167,.34)'; ctx.fillRect(0, 0, w, h)
      for (const p of ps) {
        const d2 = p.d * p.sp + 0.4
        const al = Math.min(1, p.d / (maxR * 0.4))
        ctx.strokeStyle = p.o ? 'rgba(254,110,40,' + (0.3 + al * 0.6) + ')' : 'rgba(210,228,255,' + (0.12 + al * 0.6) + ')'
        ctx.lineWidth = 0.8 + al * 1.6
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(p.a) * p.d, cy + Math.sin(p.a) * p.d)
        ctx.lineTo(cx + Math.cos(p.a) * d2, cy + Math.sin(p.a) * d2)
        ctx.stroke()
        p.d = d2; if (p.d > maxR) reset(p)
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 漣漪擴散
function Ripple({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let id = 0, cd = 0
    const rings = []
    const add = (x, y, r0) => rings.push({ x, y, r: r0 || 2, o: id++ % 5 === 0 })
    const onTap = (e) => { add(e.detail.x, e.detail.y); add(e.detail.x, e.detail.y, -30) }
    window.addEventListener('heroTap', onTap)
    return {
      dispose() { window.removeEventListener('heroTap', onTap) },
      frame() {
        const w = cv.width, h = cv.height
        ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h)
        if (--cd <= 0) { add(Math.random() * w, Math.random() * h); cd = 46 + Math.random() * 40 }
        for (let i = rings.length - 1; i >= 0; i--) {
          const g = rings[i]; g.r += 2.1; if (g.r <= 0) continue
          const a = Math.max(0, 1 - g.r / 380)
          ctx.strokeStyle = g.o ? 'rgba(254,80,0,' + a * 0.8 + ')' : 'rgba(185,212,255,' + a * 0.5 + ')'
          ctx.lineWidth = g.o ? 1.6 : 1.1
          ctx.beginPath(); ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2); ctx.stroke()
          if (a <= 0) rings.splice(i, 1)
        }
      }
    }
  })
  return <Cv active={active} refFn={ref} hint="點擊畫面 — 落下漣漪" />
}

// 雷達掃描
function Radar({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0, blips = null
    const RTERMS = ['LLM', 'RAG', 'embedding', 'FastAPI', 'MongoDB', 'Redis', 'Azure', 'AWS', 'K8s']
    const MF = '11px ' + ((getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace').trim() || 'monospace')
    return { frame() {
      t += 0.016
      const w = cv.width, h = cv.height, cx = w * 0.64, cy = h * 0.47, R = Math.min(w, h) * 0.38
      if (!blips) blips = Array.from({ length: 9 }, (_, i) => ({ a: Math.random() * Math.PI * 2, d: 0.2 + Math.random() * 0.75, glow: 0, tm: RTERMS[i] }))
      ctx.fillStyle = 'rgba(0,47,167,.12)'; ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(170,200,255,.3)'; ctx.lineWidth = 1
      for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.arc(cx, cy, R * k / 4, 0, Math.PI * 2); ctx.stroke() }
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke()
      const ang = t * 1.1
      const gr = ctx.createLinearGradient(cx, cy, cx + Math.cos(ang) * R, cy + Math.sin(ang) * R)
      gr.addColorStop(0, 'rgba(255,255,255,.08)'); gr.addColorStop(1, 'rgba(255,255,255,.85)')
      ctx.strokeStyle = gr; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R); ctx.stroke()
      for (const b of blips) {
        const da = ((ang - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
        if (da < 0.06) b.glow = 1
        b.glow *= 0.986
        if (b.glow > 0.02) {
          const bx = cx + Math.cos(b.a) * R * b.d, by = cy + Math.sin(b.a) * R * b.d
          ctx.fillStyle = 'rgba(254,80,0,' + b.glow + ')'
          ctx.beginPath(); ctx.arc(bx, by, 4.5, 0, Math.PI * 2); ctx.fill()
          ctx.strokeStyle = 'rgba(254,110,40,' + b.glow * 0.6 + ')'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.arc(bx, by, 9, 0, Math.PI * 2); ctx.stroke()
          ctx.font = MF
          ctx.fillStyle = 'rgba(230,240,255,' + Math.min(1, b.glow * 1.4) + ')'
          ctx.fillText(b.tm, bx + 14, by + 4)
        }
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 雙螺旋
function Dna({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    const DTERMS = ['LLM', 'RAG', 'embedding', 'FastAPI', 'MongoDB', 'Redis', 'Azure', 'AWS', 'K8s']
    const MF = '12px ' + ((getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace').trim() || 'monospace')
    return { frame() {
      t += 0.016
      const w = cv.width, h = cv.height, cy = h * 0.47, amp = Math.min(120, h * 0.16)
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h)
      for (let x = -10; x <= w + 10; x += 20) {
        const ph = x * 0.016 - t * 1.8
        const y1 = cy + Math.sin(ph) * amp, y2 = cy + Math.sin(ph + Math.PI) * amp
        const d1 = (Math.cos(ph) + 1) / 2, d2 = 1 - d1
        const i = (x / 20) | 0
        if (i % 3 === 0) {
          ctx.strokeStyle = 'rgba(160,195,255,.22)'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke()
        }
        if (i % 9 === 4) {
          const term = DTERMS[(((i - 4) / 9) | 0) % DTERMS.length]
          ctx.font = MF
          ctx.fillStyle = i % 18 === 4 ? 'rgba(254,110,40,.85)' : 'rgba(215,230,255,.7)'
          ctx.fillText(term, x - ctx.measureText(term).width / 2, cy + 4)
        }
        const dot = (y, d, orange) => {
          ctx.fillStyle = orange ? 'rgba(254,80,0,' + (0.3 + 0.65 * d) + ')' : 'rgba(205,225,255,' + (0.15 + 0.6 * d) + ')'
          ctx.beginPath(); ctx.arc(x, y, 1.4 + 2.6 * d, 0, Math.PI * 2); ctx.fill()
        }
        dot(y1, d1, i % 8 === 0); dot(y2, d2, false)
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 線框山脈
function Terra({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    const F = (xw, zw) => Math.sin(xw * 1.7 + zw * 0.8) * Math.cos(xw * 0.6 - zw * 0.5) + Math.sin(xw * 3.1 + zw * 1.7) * 0.35
    return { frame() {
      t += 0.014
      const w = cv.width, h = cv.height, cx = w / 2, y0 = h * 0.4
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h)
      const sp = t * 1.4, zoff = Math.floor(sp), frac = sp - zoff
      for (let zi = 26; zi >= 1; zi--) {
        const z = zi - frac; if (z <= 0.2) continue
        const zw = zoff + zi
        const sc = 1 / (0.3 * z + 0.7)
        const orange = zw % 13 === 0
        ctx.strokeStyle = orange ? 'rgba(254,80,0,' + (0.25 + 0.6 * sc) + ')' : 'rgba(180,208,255,' + (0.08 + 0.42 * sc) + ')'
        ctx.lineWidth = orange ? 1.5 : 1
        ctx.beginPath()
        for (let c = 0; c <= 56; c++) {
          const xw = (c / 56) * 2 - 1
          const e = Math.max(0, F(xw * 3, zw)) * 150 * sc * (0.35 + Math.abs(xw))
          const xs = cx + xw * w * 1.35 * sc
          const ys = y0 + 320 * sc - e
          if (c === 0) ctx.moveTo(xs, ys); else ctx.lineTo(xs, ys)
        }
        ctx.stroke()
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 諧波軌跡
function Harmo({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let tau = 0, P = null, lx = null, ly = null
    const R2 = () => Math.random() * Math.PI * 2
    const newP = () => ({ f1: 2 + ((Math.random() * 3) | 0), f2: 2 + ((Math.random() * 3) | 0), f3: 1 + ((Math.random() * 4) | 0), f4: 1 + ((Math.random() * 4) | 0), p1: R2(), p2: R2() })
    return { frame() {
      const w = cv.width, h = cv.height, cx = w * 0.62, cy = h * 0.47, A = Math.min(w, h) * 0.3
      if (!P || tau > 300) { ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h); P = newP(); tau = 0; lx = null }
      ctx.fillStyle = 'rgba(0,47,167,.01)'; ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(200,222,255,.5)'; ctx.lineWidth = 1
      ctx.beginPath()
      let px = lx, py = ly
      for (let k = 0; k < 46; k++) {
        tau += 0.006
        const dec = Math.exp(-tau * 0.004)
        const x = cx + (Math.sin(P.f1 * tau + P.p1) + Math.sin(P.f3 * tau * 0.5)) * 0.5 * A * dec
        const y = cy + (Math.sin(P.f2 * tau + P.p2) + Math.sin(P.f4 * tau * 0.5)) * 0.42 * A * dec
        if (px === null) ctx.moveTo(x, y); else if (k === 0) { ctx.moveTo(px, py); ctx.lineTo(x, y) } else ctx.lineTo(x, y)
        px = x; py = y
      }
      ctx.stroke()
      lx = px; ly = py
      ctx.fillStyle = 'rgba(254,80,0,.95)'
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill()
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 幾何旋層
function Spiro({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    return { frame() {
      t += 0.016
      const w = cv.width, h = cv.height, cx = w * 0.62, cy = h * 0.47
      ctx.fillStyle = 'rgba(0,47,167,.055)'; ctx.fillRect(0, 0, w, h)
      for (let k = 0; k < 5; k++) {
        const n = k + 3, rad = 54 + k * 54
        const rot = t * (0.25 + k * 0.09) * (k % 2 ? -1 : 1)
        const orange = k === 2
        ctx.strokeStyle = orange ? 'rgba(254,80,0,.6)' : 'rgba(195,218,255,.35)'
        ctx.lineWidth = orange ? 1.6 : 1.1
        ctx.beginPath()
        for (let i = 0; i <= n; i++) {
          const an = rot + (i / n) * Math.PI * 2
          const x = cx + Math.cos(an) * rad, y = cy + Math.sin(an) * rad
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 頻譜柱列
function Bars({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    return { frame() {
      t += 0.02
      const w = cv.width, h = cv.height, n = Math.ceil(w / 16)
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < n; i++) {
        const v = Math.abs(Math.sin(i * 0.33 + t * 1.4) * 0.62 + Math.sin(i * 0.11 - t * 0.8) * 0.38)
        const bh = 24 + v * h * 0.34
        ctx.fillStyle = v > 0.9 ? 'rgba(254,80,0,.85)' : 'rgba(185,212,255,' + (0.22 + 0.32 * v) + ')'
        ctx.fillRect(i * 16 + 3, h - bh, 9, bh)
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 電子軌道
function Atom({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    const rots = [-0.5, 0.55, 1.6]
    const ATERMS = ['LLM', 'RAG', 'embedding', 'FastAPI', 'AWS', 'K8s']
    const MF = '11px ' + ((getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace').trim() || 'monospace')
    return { frame() {
      t += 0.016
      const w = cv.width, h = cv.height, cx = w * 0.66, cy = h * 0.47, R1 = Math.min(w, h) * 0.3
      ctx.clearRect(0, 0, w, h)
      for (let j = 0; j < 3; j++) {
        ctx.strokeStyle = 'rgba(170,200,255,.3)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.ellipse(cx, cy, R1, R1 * 0.38, rots[j], 0, Math.PI * 2); ctx.stroke()
        for (let e2 = 0; e2 < 2; e2++) {
          const ang = t * (0.45 + j * 0.18) + j * 2.1 + e2 * Math.PI
          const ex = Math.cos(ang) * R1, ey = Math.sin(ang) * R1 * 0.38
          const px = cx + ex * Math.cos(rots[j]) - ey * Math.sin(rots[j])
          const py = cy + ex * Math.sin(rots[j]) + ey * Math.cos(rots[j])
          const idx = j * 2 + e2, orange = idx === 2
          ctx.fillStyle = orange ? 'rgba(254,80,0,.25)' : 'rgba(220,235,255,.22)'
          ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = orange ? '#FE5000' : '#fff'
          ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill()
          ctx.font = MF
          ctx.fillStyle = orange ? 'rgba(254,140,80,.95)' : 'rgba(215,230,255,.8)'
          ctx.fillText(ATERMS[idx], px + 12, py + 4)
        }
      }
      const nr = 9 + Math.sin(t * 3) * 1.5
      ctx.fillStyle = 'rgba(254,80,0,.25)'
      ctx.beginPath(); ctx.arc(cx, cy, nr * 2.2, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#FE5000'
      ctx.beginPath(); ctx.arc(cx, cy, nr, 0, Math.PI * 2); ctx.fill()
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 群鳥飛行
function Flock({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let bs = null, t = 0
    return { frame() {
      t += 0.016
      const cyc = t % 11
      const scatter = cyc > 7.2 && cyc < 9.4
      const w = cv.width, h = cv.height
      if (!bs) bs = Array.from({ length: 54 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 1.6, vy: (Math.random() - 0.5) * 1.6 }))
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < bs.length; i++) {
        const b = bs[i]
        let ax = 0, ay = 0, mx = 0, my = 0, sx = 0, sy = 0, n = 0
        for (let j = 0; j < bs.length; j++) {
          if (j === i) continue
          const o = bs[j], dx = o.x - b.x, dy = o.y - b.y, d = Math.hypot(dx, dy)
          if (d < 70) { ax += o.vx; ay += o.vy; mx += o.x; my += o.y; n++; if (d < 22 && d > 0) { sx -= dx / d; sy -= dy / d } }
        }
        if (n) {
          const alW = scatter ? 0.012 : 0.045, cohW = scatter ? -0.006 : 0.0045
          b.vx += (ax / n - b.vx) * alW + (mx / n - b.x) * cohW + sx * 0.09
          b.vy += (ay / n - b.vy) * alW + (my / n - b.y) * cohW + sy * 0.09
        }
        const cp = scatter ? 0.00006 : 0.0003
        b.vx += (w / 2 - b.x) * cp; b.vy += (h / 2 - b.y) * cp
        if (scatter) { b.vx += (Math.random() - 0.5) * 0.3; b.vy += (Math.random() - 0.5) * 0.3 }
        const sp = Math.hypot(b.vx, b.vy) || 1
        const lim = Math.min(scatter ? 2.2 : 1.6, Math.max(0.8, sp))
        b.vx = b.vx / sp * lim; b.vy = b.vy / sp * lim
        b.x += b.vx; b.y += b.vy
        if (b.x < -20) b.x = w + 20; if (b.x > w + 20) b.x = -20
        if (b.y < -20) b.y = h + 20; if (b.y > h + 20) b.y = -20
        const k = i === 0 ? 1.5 : 1
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx))
        ctx.fillStyle = i === 0 ? '#FE5000' : 'rgba(220,235,255,.75)'
        ctx.beginPath(); ctx.moveTo(7 * k, 0); ctx.lineTo(-5 * k, 3.4 * k); ctx.lineTo(-5 * k, -3.4 * k); ctx.closePath(); ctx.fill()
        ctx.restore()
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 方格脈衝
function Cells({ active }) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0
    return { frame() {
      t += 0.016
      const w = cv.width, h = cv.height, s = 44
      ctx.fillStyle = KB; ctx.fillRect(0, 0, w, h)
      const tk = (t * 2) | 0
      for (let gy = 0; gy * s < h + s; gy++) for (let gx = 0; gx * s < w + s; gx++) {
        const cxp = gx * s + s / 2, cyp = gy * s + s / 2
        const v = Math.sin((gx * s + gy * s * 1.3) * 0.005 - t * 2.1) * Math.cos(gy * s * 0.004 + t * 0.7)
        const m = Math.max(0, v)
        const orange = ((gx * 7 + gy * 13 + tk) % 149) === 0
        const sz = orange ? 20 : 6 + m * 22
        ctx.fillStyle = orange ? 'rgba(254,80,0,.9)' : 'rgba(185,212,255,' + (0.06 + 0.3 * m) + ')'
        ctx.fillRect(cxp - sz / 2, cyp - sz / 2, sz, sz)
      }
    } }
  })
  return <Cv active={active} refFn={ref} />
}

// 動態字牆
const TY = '8PLUS · 架構先行 · AI SHIPPED · TRUSTED SYSTEMS · '
function Typo({ active }) {
  return (
    <Shell active={active} cls="hb-typo">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={'row' + (i === 2 ? ' o' : '')} style={{ top: 1 + i * 16.5 + '%' }}>
          <div className="run" style={{ animationDuration: 34 + i * 7 + 's', animationDirection: i % 2 ? 'reverse' : 'normal' }}>
            <span>{TY + TY + TY}</span><span>{TY + TY + TY}</span>
          </div>
        </div>
      ))}
    </Shell>
  )
}

// 日蝕光環
function Eclipse({ active }) {
  return (
    <Shell active={active} cls="hb-ecl">
      <div className="oring"></div>
      <div className="sun"></div>
      <div className="moon"></div>
    </Shell>
  )
}

export const HERO_BACKDROPS = {
  topo: Topo, dots: Dots, orbit: Orbit, iso: Iso, wave: Wave, sphere: Sphere, tape: Tape, bp: Bp,
  warp: Warp, ripple: Ripple, radar: Radar, dna: Dna, terra: Terra, harmo: Harmo,
  spiro: Spiro, bars: Bars, atom: Atom, flock: Flock, cells: Cells, typo: Typo, eclipse: Eclipse,
}
