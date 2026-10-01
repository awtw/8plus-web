'use client'

import { useEffect, useRef } from 'react'
import { shouldAnimate, startFrameLoop } from '@/lib/motion/frame-loop'
import { FRAG, VERT } from './hero-aurora'

/**
 * Hero — "Pocket": the phone-first take on the aurora hero.
 *
 * Built for thumbs, not cursors:
 *  - the same shader aurora fills the screen; the glass lens FOLLOWS YOUR FINGER anywhere on the hero (even while
 *    you scroll), and every touch sends a ripple through the light
 *  - three glass stage cards in a native scroll-snap carousel sit in the thumb zone and are sized to fill the gap
 *    between the CTAs and the tab bar (measured, so there is no dead space)
 *  - swiping morphs the aurora itself: blue-dominant at 01 BOUNDARY, orange takes over by 03 PRODUCTION
 *  - auto-advances until you touch it, light haptic tick on each snap where supported, tilt parallax where the
 *    browser allows it without a permission prompt
 * Pauses off-screen / hidden tab, 30fps cap and 0.55x render scale, CSS-gradient fallback without WebGL,
 * one settled frame for reduced motion / Data Saver.
 */

const STAGES = [
  { n: '01', en: 'BOUNDARY', zh: '系統邊界', d: '先把需求、資料與權限講清楚，後面每一步才有依據。', chips: ['需求', '資料', '權限'] },
  { n: '02', en: 'STACK', zh: '技術選型', d: '依品質、延遲與成本挑模型與架構，不只挑最貴的。', chips: ['LLM', 'RAG', 'Agent'] },
  { n: '03', en: 'PRODUCTION', zh: '生產落地', d: '評測、監控與灰度上線一起設計，穩定交付。', chips: ['評測', '監控', '上線'] },
]

const CSS = `
  .pk-fallback { position: absolute; inset: 0; background: radial-gradient(60% 40% at 70% 55%, rgba(254,80,0,.45), transparent 70%), radial-gradient(70% 50% at 30% 75%, rgba(47,102,255,.6), transparent 70%), #001a66; }
  .pk-gl { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .pk-nogl .pk-gl { display: none; }
  .pk-wrap { position: absolute; left: 0; right: 0; bottom: 88px; z-index: 2; pointer-events: none; }
  .pk-track { display: flex; gap: 12px; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scroll-padding-left: 16px; padding: 4px 16px 6px; pointer-events: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; }
  .pk-track::-webkit-scrollbar { display: none; }
  .pk-track::after { content: ""; flex: 0 0 8px; }
  .pk-card { position: relative; flex: 0 0 82%; height: var(--pkh, 190px); scroll-snap-align: start; scroll-snap-stop: always; display: flex; flex-direction: column; padding: 16px 18px 15px; border-radius: 24px; color: #fff; overflow: hidden;
    background: linear-gradient(140deg, rgba(10,30,120,.55), rgba(4,14,70,.4));
    border: 1px solid rgba(255,255,255,.24);
    -webkit-backdrop-filter: blur(16px) saturate(1.5); backdrop-filter: blur(16px) saturate(1.5);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.38), 0 20px 44px -22px rgba(0,10,60,.8);
    transform: scale(.96); opacity: .72; transition: transform .45s cubic-bezier(.16,1,.3,1), opacity .35s, border-color .35s, box-shadow .35s; }
  .pk-card.on { transform: scale(1); opacity: 1; border-color: rgba(254,80,0,.8); box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 0 0 1px rgba(254,80,0,.3), 0 0 40px -8px rgba(254,80,0,.5), 0 20px 44px -22px rgba(0,10,60,.8); }
  .pk-ghost { position: absolute; right: 12px; top: -6px; font-family: var(--font-display); font-weight: 700; font-size: 92px; line-height: 1; letter-spacing: -.04em; color: rgba(255,255,255,.07); pointer-events: none; }
  .pk-card.on .pk-ghost { color: rgba(254,80,0,.16); }
  .pk-top { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .14em; }
  .pk-n { color: #FE5000; font-weight: 600; }
  .pk-en { color: rgba(255,255,255,.65); }
  .pk-zh { margin-top: 8px; font-family: var(--font-display); font-size: 25px; font-weight: 600; letter-spacing: -.01em; }
  .pk-d { margin: 6px 0 0; font-size: 13px; line-height: 1.55; color: rgba(255,255,255,.8); }
  .pk-chips { margin-top: auto; display: flex; gap: 8px; }
  .pk-chip { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .04em; padding: 5px 11px; border-radius: 9999px; border: 1px solid rgba(255,255,255,.26); color: rgba(255,255,255,.8); }
  .pk-card.on .pk-chip { animation: pkLit 3.6s ease-in-out infinite; }
  .pk-card.on .pk-chip:nth-child(2) { animation-delay: 1.2s; }
  .pk-card.on .pk-chip:nth-child(3) { animation-delay: 2.4s; }
  @keyframes pkLit { 0%, 28%, 100% { background: transparent; border-color: rgba(255,255,255,.26); color: rgba(255,255,255,.8); } 8%, 20% { background: rgba(254,80,0,.9); border-color: rgba(254,80,0,1); color: #fff; box-shadow: 0 0 16px rgba(254,80,0,.6); } }
  .pk-meter { margin-top: 12px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.14); overflow: hidden; }
  .pk-meter b { display: block; height: 100%; width: 0; background: linear-gradient(90deg, #FE5000, #ffb48a); }
  .pk-card.on .pk-meter b { animation: pkFill 4.2s linear forwards; }
  .pk-touched .pk-card.on .pk-meter b { animation: none; width: 100%; }
  @keyframes pkFill { to { width: 100%; } }
  .pk-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 22px 0; pointer-events: none; }
  .pk-dots { display: flex; gap: 7px; }
  .pk-dots i { width: 7px; height: 7px; border-radius: 7px; background: rgba(255,255,255,.35); transition: width .35s cubic-bezier(.16,1,.3,1), background .3s; }
  .pk-dots i.on { width: 24px; background: #FE5000; }
  .pk-hint { font-family: var(--font-mono); font-size: 11px; letter-spacing: .12em; color: rgba(255,255,255,.75); display: inline-flex; gap: 8px; align-items: center; transition: opacity .5s; }
  .pk-hint span { display: inline-block; animation: pkNudge 1.4s ease-in-out infinite; }
  @keyframes pkNudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(7px); } }
  .pk-touched .pk-hint { opacity: 0; }
  @media (prefers-reduced-motion: reduce) { .pk-card.on .pk-chip, .pk-card.on .pk-meter b, .pk-hint span { animation: none; } .pk-card.on .pk-meter b { width: 100%; } }
`

export default function HeroPocket({ active }: { active: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const host = hostRef.current, cv = glRef.current, wrap = wrapRef.current, track = trackRef.current
    if (!host || !cv || !wrap || !track) return
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }) as WebGLRenderingContext | null
    let glOk = !!gl
    const uni: Record<string, WebGLUniformLocation | null> = {}
    if (gl) {
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!
        gl.shaderSource(s, src); gl.compileShader(s)
        return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
      }
      const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG)
      const prog = gl.createProgram()!
      if (!vs || !fs) glOk = false
      else {
        gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) glOk = false
      }
      if (glOk) {
        gl.useProgram(prog)
        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const loc = gl.getAttribLocation(prog, 'p')
        gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
        for (const n of ['uRes', 'uTime', 'uLens', 'uAmt', 'uPar', 'uTone', 'uRip']) uni[n] = gl.getUniformLocation(prog, n)
      }
    }
    if (!glOk) host.classList.add('pk-nogl')

    const animate = shouldAnimate()
    const scale = Math.min(window.devicePixelRatio || 1, 0.7)
    let W = 1, H = 1
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.pk-card'))
    const dots = Array.from(wrap.querySelectorAll<HTMLElement>('.pk-dots i'))
    const stepOf = () => (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth * 0.8)

    const layout = () => {
      W = host.clientWidth || 390; H = host.clientHeight || 740
      if (glOk && gl) {
        cv.width = Math.max(2, Math.floor(W * scale)); cv.height = Math.max(2, Math.floor(H * scale))
        gl.viewport(0, 0, cv.width, cv.height)
      }
      // fill the gap between the CTA row and the tab bar: no dead space on any phone height
      const sec = cv.closest('section')
      const ctas = document.querySelector('.hero-ctas')
      const top = sec && ctas ? ctas.getBoundingClientRect().bottom - sec.getBoundingClientRect().top + 22 : H * 0.5
      const avail = H - 88 - 44 - top
      wrap.style.setProperty('--pkh', Math.max(150, Math.min(avail, 270)) + 'px')
    }
    layout()
    window.addEventListener('resize', layout)

    // ---- state
    let activeIdx = -1
    let touchedAt = -99
    let userTouched = false
    const setActive = (i: number, viaUser: boolean) => {
      if (i === activeIdx) return
      activeIdx = i
      cards.forEach((c, k) => c.classList.toggle('on', k === i))
      dots.forEach((d, k) => d.classList.toggle('on', k === i))
      if (viaUser && 'vibrate' in navigator) { try { navigator.vibrate(8) } catch { /* unsupported */ } }
    }
    setActive(0, false)
    const markTouched = () => {
      touchedAt = performance.now() / 1000
      if (!userTouched) { userTouched = true; host.classList.add('pk-touched') }
    }
    track.addEventListener('touchstart', markTouched, { passive: true })
    track.addEventListener('pointerdown', markTouched, { passive: true })

    // finger → lens, ripple on every touch (read-only listeners: page scrolling is never blocked)
    const finger = { x: 0, y: 0, at: -99 }
    let rip = { x: 0, y: 0, at: -99 }
    const onTouch = (e: TouchEvent, down: boolean) => {
      const r = host.getBoundingClientRect()
      const tch = e.touches[0]
      if (!tch) return
      const y = tch.clientY - r.top
      if (y < 0 || y > r.height) return
      finger.x = tch.clientX - r.left; finger.y = y; finger.at = performance.now() / 1000
      if (down) rip = { x: finger.x, y: finger.y, at: finger.at }
    }
    const onTS = (e: TouchEvent) => onTouch(e, true)
    const onTM = (e: TouchEvent) => onTouch(e, false)
    window.addEventListener('touchstart', onTS, { passive: true })
    window.addEventListener('touchmove', onTM, { passive: true })
    const onTap = (e: Event) => { const d = (e as CustomEvent).detail as { x: number; y: number }; rip = { x: d.x, y: d.y, at: performance.now() / 1000 } }
    window.addEventListener('heroTap', onTap)

    // gentle tilt parallax where no permission prompt is needed (Android / non-iOS)
    const par = { x: 0, y: 0, tx: 0, ty: 0 }
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: unknown } | undefined
    const onOri = (e: DeviceOrientationEvent) => {
      par.tx = Math.max(-0.5, Math.min(0.5, (e.gamma || 0) / 60))
      par.ty = Math.max(-0.5, Math.min(0.5, ((e.beta || 45) - 45) / 80))
    }
    const hasOri = !!DOE && typeof DOE.requestPermission !== 'function'
    if (hasOri) window.addEventListener('deviceorientation', onOri)

    const lens = { x: W * 0.5, y: H * 0.45 }
    let tone = 0
    let lastNow = performance.now()
    const start = lastNow

    const frame = () => {
      const now = performance.now()
      const dt = Math.min((now - lastNow) / 1000, 0.05) || 1 / 60
      lastNow = now
      const t = animate ? now / 1000 : 9
      const it = animate ? (now - start) / 1000 : 9

      const step = stepOf()
      const prog = Math.max(0, Math.min(STAGES.length - 1, track.scrollLeft / (step || 1)))
      const idx = Math.round(prog)
      setActive(idx, t - touchedAt < 1.5)

      // auto-advance until the user takes over
      if (animate && !userTouched && Math.floor(t / 4.2) !== Math.floor((t - dt) / 4.2) && it > 1.5) {
        const nxt = (idx + 1) % STAGES.length
        track.scrollTo({ left: nxt * step, behavior: 'smooth' })
      }

      // lens: finger when touching recently, else glides in the open area above the carousel
      const wr = wrap.getBoundingClientRect(), hr = host.getBoundingClientRect()
      const openY = Math.max(wr.top - hr.top - 74, H * 0.3)
      let tx = W * (0.26 + 0.48 * (prog / (STAGES.length - 1))) + Math.sin(t * 0.8) * 18
      let ty = openY + Math.cos(t * 0.6) * 14
      if (t - finger.at < 2.2) { tx = finger.x; ty = finger.y }
      const k = animate ? 1 - Math.exp(-dt * (t - finger.at < 0.4 ? 12 : 3.2)) : 1
      lens.x += (tx - lens.x) * k; lens.y += (ty - lens.y) * k

      tone += (prog - tone) * (animate ? 1 - Math.exp(-dt * 6) : 1)
      par.x += (par.tx - par.x) * (1 - Math.exp(-dt * 4)); par.y += (par.ty - par.y) * (1 - Math.exp(-dt * 4))

      if (glOk && gl) {
        const rPx = (t - finger.at < 1 ? 72 : 62) * (1 + 0.04 * Math.sin(t * 1.8))
        gl.uniform2f(uni.uRes, cv.width, cv.height)
        gl.uniform1f(uni.uTime, t)
        gl.uniform3f(uni.uLens, lens.x / H, (H - lens.y) / H, rPx / H)
        gl.uniform1f(uni.uAmt, Math.min(1, Math.max(0, (it - 0.6) / 0.8)))
        gl.uniform2f(uni.uPar, par.x, -par.y)
        gl.uniform1f(uni.uTone, tone * 1.1 + 0.2)
        gl.uniform3f(uni.uRip, rip.x / H, (H - rip.y) / H, rip.at)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
    }

    const stop = startFrameLoop({ host, frame })
    return () => {
      stop()
      window.removeEventListener('resize', layout)
      window.removeEventListener('touchstart', onTS)
      window.removeEventListener('touchmove', onTM)
      window.removeEventListener('heroTap', onTap)
      if (hasOri) window.removeEventListener('deviceorientation', onOri)
      track.removeEventListener('touchstart', markTouched)
      track.removeEventListener('pointerdown', markTouched)
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [active])

  return (
    <div ref={hostRef} className={'hv-bg' + (active ? ' on' : '')}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pk-fallback" />
      <canvas ref={glRef} className="pk-gl" />
      <div ref={wrapRef} className="pk-wrap">
        <div ref={trackRef} className="pk-track">
          {STAGES.map((s) => (
            <div key={s.n} className="pk-card">
              <span className="pk-ghost" aria-hidden="true">{s.n}</span>
              <div className="pk-top"><span className="pk-n">{s.n}</span><span className="pk-en">{s.en}</span></div>
              <div className="pk-zh">{s.zh}</div>
              <p className="pk-d">{s.d}</p>
              <div className="pk-chips">{s.chips.map((c) => <span key={c} className="pk-chip">{c}</span>)}</div>
              <div className="pk-meter"><b /></div>
            </div>
          ))}
        </div>
        <div className="pk-bar">
          <div className="pk-dots">{STAGES.map((s) => <i key={s.n} />)}</div>
          <span className="pk-hint">滑動看下一階段 <span>→</span></span>
        </div>
      </div>
    </div>
  )
}
