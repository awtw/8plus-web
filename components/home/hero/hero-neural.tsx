'use client'

import { useEffect, useRef } from 'react'
import { startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero 3D backdrop — "neural core": a living point-cloud sphere wired as a nearest-neighbour
 * network. Dependency-free WebGL (points + lines, additive blend), GPU does all motion.
 *
 * - data pulses ripple across the surface (orange) on a timer and wherever the user taps / clicks
 * - drag (mouse or touch) spins it with inertia; desktop pointer also tilts it; scroll pitches it
 * - phones: fewer nodes, DPR cap 1.5, 30fps via frame-loop; paused off-screen / hidden tab
 * - reduced motion / Data Saver: frame-loop draws a single static frame
 */
const VERT = `
attribute vec3 aPos; attribute float aSeed;
uniform float uTime, uAspect, uScale, uDpr;
uniform vec2 uCenter, uRot;
uniform vec4 uP1, uP2;
varying float vI, vDepth, vSeed;

float pulse(vec3 d, vec4 p){
  if (p.w < 0.) return 0.;
  float a = acos(clamp(dot(d, p.xyz), -1., 1.));
  float w = a - p.w * 1.7;
  return exp(-w * w / 0.05) * exp(-p.w * 0.75);
}

void main(){
  vec3 p = aPos * (1. + 0.05 * sin(uTime * 0.8 + aSeed * 6.283));
  p += 0.03 * vec3(sin(uTime * 0.6 + aSeed * 40.), cos(uTime * 0.5 + aSeed * 23.), sin(uTime * 0.7 + aSeed * 31.));
  float cy = cos(uRot.x), sy = sin(uRot.x);
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  float cp = cos(uRot.y), sp = sin(uRot.y);
  p = vec3(p.x, cp * p.y - sp * p.z, sp * p.y + cp * p.z);

  vec3 d = normalize(p);
  float pu = max(pulse(d, uP1), pulse(d, uP2));
  p *= 1. + 0.10 * pu;

  float k = 2.6 / (p.z + 3.4);
  gl_Position = vec4(uCenter + vec2(p.x * k * uScale / uAspect, p.y * k * uScale), 0., 1.);
  vI = pu; vSeed = aSeed; vDepth = clamp(0.5 - p.z * 0.5, 0., 1.);
  gl_PointSize = (2.6 + 4.2 * aSeed * aSeed + 10. * pu) * uDpr * k * 1.25;
}`

const FRAG = `
precision mediump float;
uniform float uMode;
varying float vI, vDepth, vSeed;
void main(){
  vec3 base = mix(vec3(0.42, 0.62, 1.0), vec3(1.0), vSeed * 0.35);
  vec3 col = mix(base, vec3(1.0, 0.36, 0.04), clamp(vI * 1.5, 0., 1.));
  float a;
  if (uMode > 0.5) { float r = length(gl_PointCoord - 0.5); a = pow(smoothstep(0.5, 0.0, r), 1.6); }
  else { a = 0.30 + 0.9 * vI; }
  a *= 0.3 + 0.7 * vDepth;
  gl_FragColor = vec4(col * a, a);
}`

function buildNetwork(n: number) {
  const pts: number[] = []
  const seeds: number[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  const shell = Math.floor(n * 0.82)
  for (let i = 0; i < n; i++) {
    let x: number, y: number, z: number
    if (i < shell) {
      const yy = 1 - (i / (shell - 1)) * 2
      const r = Math.sqrt(1 - yy * yy)
      const th = golden * i
      const rad = 1 + (Math.random() - 0.5) * 0.07
      x = Math.cos(th) * r * rad; y = yy * rad; z = Math.sin(th) * r * rad
    } else {
      // inner nodes: a sparse core so the network reads as volume, not a hollow ball
      const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2
      const r = Math.cbrt(Math.random()) * 0.72 + 0.1, s = Math.sqrt(1 - u * u)
      x = Math.cos(th) * s * r; y = u * r; z = Math.sin(th) * s * r
    }
    pts.push(x, y, z)
    seeds.push(Math.random())
  }
  // k-nearest edges (O(n²) once, n ≤ 900)
  const K = 3, maxD2 = 0.42 * 0.42
  const seen = new Set<number>()
  const lp: number[] = [], ls: number[] = []
  for (let i = 0; i < n; i++) {
    const c: [number, number][] = []
    for (let j = 0; j < n; j++) {
      if (i === j) continue
      const dx = pts[i * 3] - pts[j * 3], dy = pts[i * 3 + 1] - pts[j * 3 + 1], dz = pts[i * 3 + 2] - pts[j * 3 + 2]
      const d2 = dx * dx + dy * dy + dz * dz
      if (d2 < maxD2) c.push([d2, j])
    }
    c.sort((a, b) => a[0] - b[0])
    for (const [, j] of c.slice(0, K)) {
      const key = i < j ? i * n + j : j * n + i
      if (seen.has(key)) continue
      seen.add(key)
      lp.push(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2], pts[j * 3], pts[j * 3 + 1], pts[j * 3 + 2])
      ls.push(seeds[i], seeds[j])
    }
  }
  return { pts: new Float32Array(pts), seeds: new Float32Array(seeds), lp: new Float32Array(lp), ls: new Float32Array(ls) }
}

export default function HeroNeural({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const cv = ref.current
    const host = cv?.parentElement
    const sec = cv?.closest('section') as HTMLElement | null
    if (!cv || !host || !sec) return
    const gl = cv.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power' })
    if (!gl) return

    const phone = window.innerWidth < 768
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src); gl.compileShader(sh)
      if (process.env.NODE_ENV !== 'production' && !gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn('[hero-neural] shader compile failed:', gl.getShaderInfoLog(sh))
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      if (process.env.NODE_ENV !== 'production') console.warn('[hero-neural] shader link failed:', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const net = buildNetwork(phone ? 420 : 900)
    const mk = (data: Float32Array) => { const b = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); return b }
    const bPts = mk(net.pts), bSeed = mk(net.seeds), bLp = mk(net.lp), bLs = mk(net.ls)
    const aPos = gl.getAttribLocation(prog, 'aPos'), aSeed = gl.getAttribLocation(prog, 'aSeed')
    const bind = (pos: WebGLBuffer, seed: WebGLBuffer) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, pos); gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, seed); gl.enableVertexAttribArray(aSeed); gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 0, 0)
    }
    const U = (n: string) => gl.getUniformLocation(prog, n)
    const uTime = U('uTime'), uAspect = U('uAspect'), uScale = U('uScale'), uDpr = U('uDpr'), uMode = U('uMode')
    const uCenter = U('uCenter'), uRot = U('uRot'), uP1 = U('uP1'), uP2 = U('uP2')

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE)
    gl.clearColor(0, 0, 0, 0)

    const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 2)
    const layout = { aspect: 1.7, scale: 0.78, cx: 0.42, cy: 0 }
    const resize = () => {
      const w = Math.max(2, host.clientWidth), h = Math.max(2, host.clientHeight)
      cv.width = Math.floor(w * dpr); cv.height = Math.floor(h * dpr)
      gl.viewport(0, 0, cv.width, cv.height)
      layout.aspect = w / h
      if (w >= 820) { layout.scale = 0.8; layout.cx = 0.46; layout.cy = -0.02 }       // editorial: sphere on the right
      else { layout.scale = Math.min(0.82, layout.aspect * 0.78); layout.cx = 0; layout.cy = 0.1 } // phone: centred behind copy
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // --- interaction ---
    const st = { yaw: 0.6, pitch: 0.28, vy: 0, dragging: false, lx: 0, ly: 0, tx: 0, ty: 0, mx: 0, my: 0 }
    const pulse1 = { d: [0, 0, -1], t0: -1e9 }
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const prevTouch = sec.style.touchAction
    sec.style.touchAction = 'pan-y'
    const down = (e: PointerEvent) => { if ((e.target as HTMLElement).closest('button, a')) return; st.dragging = true; st.lx = e.clientX; st.ly = e.clientY; st.vy = 0 }
    const move = (e: PointerEvent) => {
      if (st.dragging) { const dx = e.clientX - st.lx, dy = e.clientY - st.ly; st.yaw += dx * 0.008; st.pitch = Math.max(-0.9, Math.min(0.9, st.pitch + dy * 0.004)); st.vy = dx * 0.008; st.lx = e.clientX; st.ly = e.clientY }
      else if (!coarse) { st.tx = e.clientX / window.innerWidth - 0.5; st.ty = e.clientY / window.innerHeight - 0.5 }
    }
    const up = () => { st.dragging = false }
    sec.addEventListener('pointerdown', down); window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up)

    const onTap = (e: Event) => {
      const { x, y } = (e as CustomEvent).detail as { x: number; y: number }
      const w = host.clientWidth, h = host.clientHeight
      const ndcX = (x / w) * 2 - 1, ndcY = 1 - (y / h) * 2
      const k = 2.6 / 3.4
      let sx = (ndcX - layout.cx) / ((k * layout.scale) / layout.aspect), sy = (ndcY - layout.cy) / (k * layout.scale)
      const len = Math.hypot(sx, sy)
      if (len > 0.98) { sx = (sx / len) * 0.98; sy = (sy / len) * 0.98 }
      const sz = -Math.sqrt(Math.max(0, 1 - sx * sx - sy * sy))
      pulse1.d = [sx, sy, sz]; pulse1.t0 = (performance.now() - start) / 1000
    }
    window.addEventListener('heroTap', onTap)

    const start = performance.now()
    let last = start
    const draw = () => {
      const now = performance.now(), t = (now - start) / 1000, dt = Math.min(0.05, (now - last) / 1000); last = now
      if (!st.dragging) { st.yaw += dt * 0.14 + st.vy; st.vy *= 0.94 }
      st.mx += (st.tx - st.mx) * 0.05; st.my += (st.ty - st.my) * 0.05
      const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
      const cyc = t % 4.2, n = Math.floor(t / 4.2)
      const ang = n * 2.399
      const ad = [Math.cos(ang) * 0.6, Math.sin(ang * 1.3) * 0.6, -0.55]
      const al = Math.hypot(ad[0], ad[1], ad[2])

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, t); gl.uniform1f(uAspect, layout.aspect); gl.uniform1f(uScale, layout.scale * (1 - scroll * 0.25)); gl.uniform1f(uDpr, dpr)
      gl.uniform2f(uCenter, layout.cx, layout.cy + scroll * 0.18)
      gl.uniform2f(uRot, st.yaw + st.mx * 0.5, st.pitch + st.my * 0.3 + scroll * 0.5)
      gl.uniform4f(uP1, pulse1.d[0], pulse1.d[1], pulse1.d[2], t - pulse1.t0 > 6 ? -1 : t - pulse1.t0)
      gl.uniform4f(uP2, ad[0] / al, ad[1] / al, ad[2] / al, cyc)

      gl.uniform1f(uMode, 0); bind(bLp, bLs); gl.drawArrays(gl.LINES, 0, net.lp.length / 3)
      gl.uniform1f(uMode, 1); bind(bPts, bSeed); gl.drawArrays(gl.POINTS, 0, net.pts.length / 3)
    }
    const stop = startFrameLoop({ host, frame: draw })

    return () => {
      stop(); ro.disconnect()
      sec.style.touchAction = prevTouch
      sec.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up)
      window.removeEventListener('heroTap', onTap)
      // no loseContext(): React StrictMode re-runs this effect on the same canvas and a lost context never recovers
      gl.deleteBuffer(bPts); gl.deleteBuffer(bSeed); gl.deleteBuffer(bLp); gl.deleteBuffer(bLs); gl.deleteProgram(prog)
    }
  }, [active])

  return (
    <div className={'hv-bg' + (active ? ' on' : '')}>
      <canvas ref={ref} className="hb-cv" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
