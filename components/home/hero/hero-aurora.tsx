'use client'

import { useEffect, useRef } from 'react'
import { shouldAnimate, startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero — "Aurora": shader aurora + liquid-glass lens + frosted tier cards.
 *
 * 2026 pattern: WebGL as garnish (one full-screen fragment shader, no 3-D runtime), real CSS glass for the content.
 *  - background: domain-warped aurora ribbons in the 8plus palette (deep blue, electric blue, orange core, sky),
 *    film grain and vignette; renders at reduced resolution on phones
 *  - a refracting glass lens (magnification, chromatic fringe, specular rim) follows the pointer; with no pointer
 *    it tours the three tier cards (boundary → stack → production) and lights each one as it passes
 *  - the cards are DOM with backdrop-filter, so CJK text stays crisp and the glass blurs the live shader
 * Pauses off-screen / hidden tab, 30fps cap on phones, one settled frame for reduced motion / Data Saver,
 * CSS-gradient fallback when WebGL is unavailable.
 */

const TIERS = [
  { n: '01', en: 'BOUNDARY', zh: '系統邊界', d: '先把需求、資料與權限講清楚，後面每一步才有依據。' },
  { n: '02', en: 'STACK', zh: '技術選型', d: '依品質、延遲與成本挑模型與架構，而不是只挑最貴的。' },
  { n: '03', en: 'PRODUCTION', zh: '生產落地', d: '評測、監控與灰度上線一起設計，穩定交付可擴展的 AI 系統。' },
]

const CSS = `
  .au-fallback { position: absolute; inset: 0; background: radial-gradient(60% 50% at 70% 45%, rgba(254,80,0,.45), transparent 70%), radial-gradient(70% 60% at 30% 70%, rgba(47,102,255,.6), transparent 70%), #001a66; }
  .au-gl { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .au-nogl .au-gl { display: none; }
  .au-stack { position: absolute; right: max(4vw, 24px); top: 50%; width: min(380px, 31vw); display: flex; flex-direction: column; gap: 16px; transform: translateY(-50%) perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform .25s ease-out; z-index: 2; }
  .au-card { position: relative; padding: 18px 20px 16px; border-radius: 22px; color: #fff; overflow: hidden;
    background: linear-gradient(135deg, rgba(255,255,255,.17), rgba(255,255,255,.05));
    border: 1px solid rgba(255,255,255,.26);
    -webkit-backdrop-filter: blur(18px) saturate(1.5); backdrop-filter: blur(18px) saturate(1.5);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.42), inset 0 -1px 0 rgba(255,255,255,.06), 0 24px 60px -24px rgba(0,10,60,.75);
    transition: border-color .4s, box-shadow .4s, transform .5s cubic-bezier(.16,1,.3,1), background .4s;
    animation: auIn .9s cubic-bezier(.16,1,.3,1) both, auFloat 7s ease-in-out infinite alternate; }
  .au-card:nth-child(1) { margin-left: 56px; animation-delay: .5s, 0s; }
  .au-card:nth-child(2) { margin-left: 28px; animation-delay: .65s, -2.3s; }
  .au-card:nth-child(3) { margin-left: 0; animation-delay: .8s, -4.6s; }
  .au-card::before { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.18) 48%, transparent 66%); transform: translateX(-120%); }
  .au-card.hot { border-color: rgba(254,80,0,.85); background: linear-gradient(135deg, rgba(255,255,255,.24), rgba(255,255,255,.08));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.55), 0 0 0 1px rgba(254,80,0,.35), 0 0 46px -6px rgba(254,80,0,.55), 0 24px 60px -24px rgba(0,10,60,.75); transform: scale(1.03); }
  .au-card.hot::before { transform: translateX(120%); transition: transform 1.1s ease; }
  .au-top { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .14em; }
  .au-n { color: #FE5000; font-weight: 600; }
  .au-en { color: rgba(255,255,255,.62); }
  .au-dot { margin-left: auto; width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,.4); transition: background .3s, box-shadow .3s; }
  .hot .au-dot { background: #FE5000; box-shadow: 0 0 12px 3px rgba(254,80,0,.7); }
  .au-zh { margin-top: 8px; font-family: var(--font-display); font-size: 22px; font-weight: 600; letter-spacing: -.01em; }
  .au-d { margin: 6px 0 0; font-size: 13px; line-height: 1.6; color: rgba(255,255,255,.76); }
  .au-meter { margin-top: 12px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.14); overflow: hidden; }
  .au-meter b { display: block; height: 100%; width: 10%; border-radius: 3px; background: linear-gradient(90deg, #FE5000, #ffb48a); transition: width .5s ease; }
  .hot .au-meter b { width: 100%; transition: width 3s linear; }
  @keyframes auIn { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: none; } }
  @keyframes auFloat { from { translate: 0 -6px; } to { translate: 0 6px; } }
  @media (max-width: 820px) {
    .au-stack { top: auto; bottom: 92px; left: 16px; right: 16px; width: auto; gap: 10px; transform: none; }
    .au-card { padding: 12px 16px 11px; border-radius: 18px; background: linear-gradient(135deg, rgba(8,24,100,.5), rgba(4,14,70,.34)); }
    .au-card.hot { background: linear-gradient(135deg, rgba(8,24,100,.62), rgba(4,14,70,.42)); }
    .au-card:nth-child(n) { margin-left: 0; }
    .au-zh { margin-top: 4px; font-size: 18px; }
    .au-d { display: none; }
    .au-meter { margin-top: 9px; }
  }
  @media (prefers-reduced-motion: reduce) { .au-card { animation: none; } .au-card::before { display: none; } }
`

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime; uniform vec3 uLens; uniform float uAmt; uniform vec2 uPar;
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + vec2(7.1, 3.7); a *= .5; } return v; }
vec3 aurora(vec2 uv){
  float t = uTime;
  vec2 p = uv * 1.15 + uPar * 0.06;
  vec2 w = vec2(fbm(p * 1.4 + vec2(t * .05, 0.)), fbm(p * 1.4 + vec2(5.2, -t * .045)));
  p += (w - .5) * 0.9;
  vec3 col = mix(vec3(0., .04, .20), vec3(0., .18, .72), smoothstep(0., 1.1, uv.y * .6 + .3 + (w.x - .5) * .4));
  float y1 = .74 + .10 * sin(p.x * 1.7 + t * .28) + (w.y - .5) * .35;
  float y2 = .46 + .12 * sin(p.x * 1.3 - t * .22 + 1.7) + (w.x - .5) * .35;
  float y3 = .2 + .09 * sin(p.x * 2.1 + t * .31 + 3.1) + (w.y - .5) * .30;
  float f1 = .65 + .35 * noise(vec2(p.x * 7. + t * .2, (p.y - y1) * 30.));
  float f2 = .65 + .35 * noise(vec2(p.x * 6. - t * .18, (p.y - y2) * 26.));
  float r1 = exp(-pow((p.y - y1) * 6.5, 2.)) * f1;
  float r2 = exp(-pow((p.y - y2) * 7.5, 2.)) * f2;
  float r3 = exp(-pow((p.y - y3) * 7., 2.));
  col += vec3(.08, .28, 1.) * r1 * .75;
  col = mix(col, vec3(1.5, .5, .05), smoothstep(.12, .6, r2));
  col = mix(col, vec3(1., .72, .48), pow(r2, 4.) * .65);
  col = mix(col, vec3(.55, .78, 1.), r3 * .55);
  col += vec3(.04, .14, .55) * fbm(p * 2. + t * .03) * .2;
  return col;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.y;
  vec3 col = aurora(uv);
  vec2 d = uv - uLens.xy; float l = length(d); float r = uLens.z;
  if (uAmt > .001 && l < r * 1.3) {
    float k = l / r;
    float inside = 1. - smoothstep(.97, 1., k);
    vec2 dir = d / (l + 1e-4);
    vec2 uvL = uLens.xy + d * (.5 + .5 * k * k);
    float ca = .014 * k * k;
    vec3 lc = vec3(aurora(uvL + dir * ca).r, aurora(uvL).g, aurora(uvL - dir * ca).b) * 1.12;
    float rim = smoothstep(.78, 1., k) * inside;
    float spec = pow(max(dot(dir, normalize(vec2(-.55, .8))), 0.), 6.) * smoothstep(.7, 1., k) * inside;
    float edge = smoothstep(.955, .98, k) * (1. - smoothstep(.98, 1., k));
    lc += vec3(.7, .85, 1.) * rim * .35 + vec3(1.) * spec * .55 + vec3(.9, .95, 1.) * edge * .7;
    col = mix(col, lc, inside * uAmt);
    col += vec3(.2, .4, 1.) * smoothstep(1.3, 1., k) * (1. - inside) * .12 * uAmt;
  }
  col = 1. - exp(-col * 1.05);
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.) - .5) * .035;
  vec2 q = gl_FragCoord.xy / uRes; col *= 1. - .35 * pow(length(q - .5) * 1.1, 2.);
  gl_FragColor = vec4(col, 1.);
}
`

export default function HeroAurora({ active }: { active: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<HTMLCanvasElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const host = hostRef.current
    const cv = glRef.current
    const stack = stackRef.current
    if (!host || !cv || !stack) return
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }) as WebGLRenderingContext | null
    if (!gl) { host.classList.add('au-nogl'); return }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s)
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
    }
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG)
    const prog = gl.createProgram()!
    if (!vs || !fs) { host.classList.add('au-nogl'); return }
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { host.classList.add('au-nogl'); return }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = U('uRes'), uTime = U('uTime'), uLens = U('uLens'), uAmt = U('uAmt'), uPar = U('uPar')

    const phone = window.innerWidth < 768
    const animate = shouldAnimate()
    const scale = Math.min(window.devicePixelRatio || 1, phone ? 0.55 : 0.8)
    let W = 1, H = 1
    const resize = () => {
      W = host.clientWidth || 1280; H = host.clientHeight || 720
      cv.width = Math.max(2, Math.floor(W * scale)); cv.height = Math.max(2, Math.floor(H * scale))
      gl.viewport(0, 0, cv.width, cv.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: -1, y: -1, nx: 0, ny: 0, last: -99 }
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
      mouse.nx = e.clientX / window.innerWidth - 0.5; mouse.ny = e.clientY / window.innerHeight - 0.5
      mouse.last = performance.now() / 1000
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    let tap: { x: number; y: number; at: number } | null = null
    const onTap = (e: Event) => { const d = (e as CustomEvent).detail as { x: number; y: number }; tap = { x: d.x, y: d.y, at: performance.now() / 1000 } }
    window.addEventListener('heroTap', onTap)

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.au-card'))
    const centers = () => {
      const hr = host.getBoundingClientRect()
      return cards.map((c) => { const r = c.getBoundingClientRect(); return { cx: r.left - hr.left + r.width / 2, cy: r.top - hr.top + r.height / 2, l: r.left - hr.left, r: r.right - hr.left, t: r.top - hr.top, b: r.bottom - hr.top } })
    }
    const lens = { x: W * 0.7, y: H * 0.5 }
    let tourIdx = 0
    let tourAt = -99
    let hot = -1
    let par = { x: 0, y: 0 }
    let lastNow = performance.now()
    const start = lastNow

    const frame = () => {
      const now = performance.now()
      const dt = Math.min((now - lastNow) / 1000, 0.05) || 1 / 60
      lastNow = now
      const t = animate ? now / 1000 : 11
      const it = animate ? (now - start) / 1000 : 9

      const cs = centers()
      // lens target: pointer if recently moved, a fresh tap, else tour the three cards
      let tx: number, ty: number
      if (!phone && t - mouse.last < 4 && mouse.x >= 0) { tx = mouse.x; ty = mouse.y }
      else if (tap && t - tap.at < 3.5) { tx = tap.x; ty = tap.y }
      else {
        if (t - tourAt > 3.4) { tourIdx = (tourIdx + 1) % cs.length; tourAt = t }
        const c = cs[tourIdx]
        tx = c.cx + Math.sin(t * 0.9) * 14; ty = c.cy + Math.cos(t * 0.7) * 8
      }
      if (!animate) { const c = cs[1]; tx = c.cx; ty = c.cy }
      const k = animate ? 1 - Math.exp(-dt * 3.2) : 1
      lens.x += (tx - lens.x) * k; lens.y += (ty - lens.y) * k

      // light the card under the lens
      let h = -1
      cs.forEach((c, i) => { if (lens.x > c.l && lens.x < c.r && lens.y > c.t && lens.y < c.b) h = i })
      if (h !== hot) { cards.forEach((c, i) => c.classList.toggle('hot', i === h)); hot = h }

      par.x += ((animate ? mouse.nx : 0) - par.x) * (1 - Math.exp(-dt * 3)); par.y += ((animate ? mouse.ny : 0) - par.y) * (1 - Math.exp(-dt * 3))
      if (!phone) { stack.style.setProperty('--rx', (-par.y * 5).toFixed(2) + 'deg'); stack.style.setProperty('--ry', (par.x * 7).toFixed(2) + 'deg') }

      const rPx = (phone ? 58 : 88) * (1 + 0.03 * Math.sin(t * 1.6))
      gl.uniform2f(uRes, cv.width, cv.height)
      gl.uniform1f(uTime, t)
      gl.uniform3f(uLens, lens.x / H, (H - lens.y) / H, rPx / H)
      gl.uniform1f(uAmt, Math.min(1, Math.max(0, (it - 0.8) / 0.9)))
      gl.uniform2f(uPar, par.x, -par.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const stop = startFrameLoop({ host, frame })
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('heroTap', onTap)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [active])

  return (
    <div ref={hostRef} className={'hv-bg' + (active ? ' on' : '')}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="au-fallback" />
      <canvas ref={glRef} className="au-gl" />
      <div ref={stackRef} className="au-stack">
        {TIERS.map((tr) => (
          <div key={tr.n} className="au-card">
            <div className="au-top"><span className="au-n">{tr.n}</span><span className="au-en">{tr.en}</span><i className="au-dot" /></div>
            <div className="au-zh">{tr.zh}</div>
            <p className="au-d">{tr.d}</p>
            <div className="au-meter"><b /></div>
          </div>
        ))}
      </div>
    </div>
  )
}
