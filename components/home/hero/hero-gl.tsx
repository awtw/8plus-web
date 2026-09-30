'use client'

import { useEffect, useRef } from 'react'
import { startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero 3D — "Dimensional Hyper-Core".
 *
 * Not an object parked beside the copy: one scene that owns the whole hero.
 *  - A ray-marched tesseract projection (obsidian-glass outer frame, titanium inner frame, eight
 *    struts, emissive core) anchored bottom-right and bleeding off the viewport.
 *  - The dark space behind it is a measurement grid that is lensed by two gravity wells — the core
 *    and the cursor — so the warp reaches the headline on the left. The core emits a scan ring on
 *    a fixed cadence (and on click) that lights the grid as it passes.
 *  - Cursor tilts the assembly; hovering a CTA charges the core; scrolling out pulls the frames apart.
 *  - Palette: black + titanium + ice-blue / UV rim. Orange is left to the CTA button.
 * A DOM HUD (crosshairs, corner brackets, live cursor read-out) frames the canvas. The numbers are
 * real (cursor position, runtime) — no invented telemetry.
 * Cost control: bounding-sphere early-out, adaptive resolution, 30fps cap on phones, paused
 * off-screen / hidden tab, one static frame for reduced motion / Data Saver (lib/motion/frame-loop).
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
uniform float uPulse;  // seconds since last click (large = none)
uniform float uGlow;   // 0..1 while a CTA is hovered
uniform float uScroll; // 0..1 as the hero scrolls out
uniform float uSpin;   // extra rotation from clicks (radians, eased in JS)

vec3 C;   // core centre in world space
float S;  // assembly scale

mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdBoxFrame(vec3 p, vec3 b, float e){
  p = abs(p) - b;
  vec3 q = abs(p + e) - e;
  return min(min(
    length(max(vec3(p.x, q.y, q.z), 0.)) + min(max(p.x, max(q.y, q.z)), 0.),
    length(max(vec3(q.x, p.y, q.z), 0.)) + min(max(q.x, max(p.y, q.z)), 0.)),
    length(max(vec3(q.x, q.y, p.z), 0.)) + min(max(q.x, max(q.y, p.z)), 0.));
}
float sdCapsule(vec3 p, vec3 a, vec3 b, float r){
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
  return length(pa - ba * h) - r;
}

// (distance, material): 1 obsidian outer frame, 2 titanium inner frame, 3 struts, 4 core
vec2 mapId(vec3 wp){
  float t = uTime;
  vec3 p = (wp - C) / S;
  // pointer leans the whole assembly (eased in JS); clicks add a decaying spin
  p.xz *= rot(t * 0.22 + uSpin + uMouse.x * 0.9);
  p.yz *= rot(0.55 + t * 0.15 - uMouse.y * 0.7);

  float open = uScroll * 0.9;                   // scroll: the nested frames drift apart
  float a = t * 0.31 + 0.6, b = -t * 0.23;      // inner frame rotates against the outer one

  float d1 = sdBoxFrame(p, vec3(1.0), 0.030);

  vec3 q = p;
  q.xz *= rot(a); q.yz *= rot(b);
  float d2 = sdBoxFrame(q, vec3(0.50 - open * 0.2), 0.024);

  // eight struts joining matching vertices of the two cubes (the tesseract edges)
  float d3 = 1e3;
  for (int i = 0; i < 8; i++){
    float fi = float(i);
    vec3 c = vec3(mod(fi, 2.), mod(floor(fi * 0.5), 2.), floor(fi * 0.25)) * 2. - 1.;
    vec3 inner = c * (0.50 - open * 0.2);
    inner.yz *= rot(-b); inner.xz *= rot(-a);   // inverse of the inner-frame rotation, back into outer space
    d3 = min(d3, sdCapsule(p, inner, c, 0.010));
  }

  float d4 = length(p) - (0.17 + 0.02 * sin(t * 2.0) + uGlow * 0.04);

  vec2 r = vec2(d1, 1.);
  if (d2 < r.x) r = vec2(d2, 2.);
  if (d3 < r.x) r = vec2(d3, 3.);
  if (d4 < r.x) r = vec2(d4, 4.);
  r.x *= S;
  return r;
}
float map(vec3 p){ return mapId(p).x; }

vec3 normalAt(vec3 p){
  const float e = 0.0026;
  vec2 k = vec2(1., -1.);
  return normalize(k.xyy * map(p + k.xyy * e) + k.yyx * map(p + k.yyx * e) + k.yxy * map(p + k.yxy * e) + k.xxx * map(p + k.xxx * e));
}

float box(vec3 r, vec3 N, vec3 T, vec2 size, float soft){
  float f = dot(r, N);
  if (f < 0.05) return 0.;
  vec3 B = cross(N, T);
  vec2 uv = vec2(dot(r, T), dot(r, B)) / f;
  vec2 q = abs(uv) - size;
  return smoothstep(soft, -soft, max(q.x, q.y));
}

// cold studio (linear HDR): black dome, ice horizon, cool key box, UV-violet rim box
vec3 env(vec3 r){
  float y = r.y;
  vec3 col = mix(vec3(0.001, 0.002, 0.008), vec3(0.008, 0.022, 0.085), smoothstep(-0.3, 1., y));
  col += vec3(0.10, 0.28, 0.75) * exp(-abs(y + 0.03) * 12.) * 0.6;
  col += vec3(0.85, 0.95, 1.00) * box(r, normalize(vec3(-0.5, 0.7, -0.5)), normalize(vec3(0.8, 0., -0.6)), vec2(0.40, 0.18), 0.10) * 11.;
  col += vec3(0.42, 0.30, 1.00) * box(r, normalize(vec3(0.85, 0.1, -0.5)), vec3(0., 1., 0.), vec2(0.70, 0.10), 0.12) * 8.;
  col += vec3(0.30, 0.65, 1.00) * box(r, normalize(vec3(-0.9, -0.2, -0.3)), vec3(0., 1., 0.), vec2(0.30, 0.08), 0.12) * 3.;
  col *= mix(0.30, 1., smoothstep(-0.4, 0.1, y));
  return col;
}

vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0., 1.); }

// measurement grid: thin lines, brighter every 4th
float gridLines(vec2 g, float w){
  vec2 d = min(abs(fract(g + 0.5) - 0.5), vec2(1.));
  float minor = 1. - smoothstep(0., w, min(d.x, d.y));
  vec2 g4 = g / 4.;
  vec2 d4 = abs(fract(g4 + 0.5) - 0.5) * 4.;
  float major = 1. - smoothstep(0., w * 1.6, min(d4.x, d4.y));
  return minor * 0.45 + major * 0.9;
}

void main(){
  float asp = uRes.x / uRes.y;
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // framing: big, anchored bottom-right and bleeding off the edge; smaller/lower on portrait
  S = asp < 1.0 ? 0.46 : mix(0.46, 0.56, clamp((asp - 1.0) / 0.8, 0., 1.));
  C = asp < 1.0 ? vec3(0.28, -0.58, 0.0) : vec3(0.47 * asp, -0.20, 0.0);
  vec2 cs = C.xy * 0.533;                                   // core in screen space (camera z=-3, focal 1.6)
  vec2 ms = vec2(uMouse.x * asp, uMouse.y);                 // cursor in screen space

  // ---- space: two gravity wells (core + cursor) lens the grid, so the warp reaches the copy ----
  vec2 d1 = uv - cs;
  vec2 d2 = uv - ms;
  vec2 uvw = uv - d1 * (0.030 / (dot(d1, d1) + 0.045)) - d2 * (0.010 / (dot(d2, d2) + 0.030));

  float dist = length(d1);
  // scan rings: one every 4.5s from the core, plus one per click
  float rr = mod(uTime, 4.5) * 0.55;
  float ring = exp(-pow((dist - rr) * 9., 2.)) * (1. - smoothstep(0.0, 2.6, rr));
  float rc = uPulse * 1.25;
  ring += exp(-pow((dist - rc) * 9., 2.)) * (1. - smoothstep(0.0, 2.6, rc)) * step(uPulse, 2.2);

  vec3 bg = mix(vec3(0.0005, 0.0015, 0.008), vec3(0.002, 0.012, 0.06), smoothstep(1.7, 0., dist));
  bg += vec3(0.05, 0.18, 0.60) * exp(-dist * 2.6) * 0.30;   // halo
  float fade = exp(-dist * 0.85);
  float gl = gridLines(uvw * 14., 14. * 1.3 / uRes.y);
  bg += vec3(0.16, 0.42, 0.95) * gl * (0.018 + 0.075 * fade);
  bg += vec3(0.30, 0.65, 1.00) * gl * ring * 1.1;           // the scan ring lights the grid it crosses
  bg += vec3(0.30, 0.55, 1.00) * ring * 0.03;
  vec3 col = bg;

  vec3 ro = vec3(0., 0., -3.0);
  vec3 rd = normalize(vec3(uv, 1.6));

  // bloom from the core, independent of occlusion: closest approach of the ray to the core centre
  float cd = length(cross(rd, C - ro));
  float corona = exp(-cd * cd / (0.030 * S * S)) * (0.55 + uGlow * 1.2 + ring * 0.4);
  col += vec3(0.35, 0.65, 1.0) * corona * 0.55;

  vec3 bg0 = col;
  vec3 oc = ro - C;
  float b = dot(oc, rd);
  float rb = 1.78 * S;
  float disc = b * b - (dot(oc, oc) - rb * rb);
  if (disc > 0.) {
    float sq = sqrt(disc);
    float t = max(-b - sq, 0.);
    float tmax = -b + sq;
    bool hit = false;
    float mc = 1e3;
    for (int i = 0; i < 88; i++){
      float dm = map(ro + rd * t);
      mc = min(mc, dm / max(t, 0.5));
      float dd = dm * 0.9;
      if (dd < 0.0013){ hit = true; break; }
      t += dd;
      if (t > tmax) break;
    }
    if (!hit) {
      float px = 1.0 / (uRes.y * 1.6);
      float cov = 1. - smoothstep(0., px * 1.4, mc);
      col = mix(col, vec3(0.30, 0.50, 0.95) * 0.5, cov * 0.8);
    } else {
      vec3 p = ro + rd * t;
      vec3 n = normalAt(p);
      float id = mapId(p).y;
      float ndv = clamp(dot(n, -rd), 0., 1.);
      float fres = pow(1. - ndv, 3.);
      vec3 rf = reflect(rd, n);
      vec3 disp = vec3(env(reflect(rd, normalize(n + vec3(0.04, 0., 0.)))).r, env(rf).g, env(reflect(rd, normalize(n - vec3(0.04, 0., 0.)))).b);
      float ao = clamp(0.4 + 0.6 * map(p + n * 0.12) / 0.12, 0.3, 1.);
      float spec = pow(max(dot(rf, normalize(vec3(-0.5, 0.7, -0.6))), 0.), 80.);
      vec3 pl = (p - C) / S;
      float flow = 0.5 + 0.5 * sin(uTime * 3.0 - length(pl) * 7.);   // energy travelling out along the frame

      if (id < 1.5) {            // obsidian glass: almost black, cold fresnel rim, sharp reflections
        col = vec3(0.003, 0.004, 0.012) + disp * (0.03 + 0.55 * fres) * ao + vec3(0.40, 0.68, 1.0) * fres * 0.55 + spec * 1.5;
        col += vec3(0.35, 0.6, 1.0) * flow * 0.06 * (1. - fres);
      } else if (id < 2.5) {     // titanium: cool silver metal
        col = disp * vec3(0.78, 0.84, 0.95) * (0.42 + 0.5 * fres) * ao + spec * 1.2;
      } else if (id < 3.5) {     // struts: dark metal with a travelling pulse
        col = disp * vec3(0.6, 0.7, 0.9) * 0.45 * ao + vec3(0.30, 0.62, 1.0) * flow * (0.55 + uGlow);
      } else {                   // emissive core
        float lum = 1.1 + uGlow * 2.2 + ring * 1.6;
        col = mix(vec3(0.10, 0.32, 0.95), vec3(0.70, 0.90, 1.0), pow(ndv, 1.6)) * lum * (0.85 + 0.15 * flow);
      }
    }
  }
  col = mix(bg0, col, asp < 1.0 ? 0.85 : 1.0);

  col = aces(col * 1.05);
  col *= 1.0 - 0.42 * smoothstep(0.55, 1.25, length(uv));
  col = pow(col, vec3(1. / 2.2));
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453) - 0.5) * 0.010;
  gl_FragColor = vec4(col, 1.);
}`

/** True when a real WebGL context can be created (window.WebGLRenderingContext alone is not enough). */
export function canUseWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl'))
  } catch {
    return false
  }
}

const pad = (n: number, w = 2) => String(Math.floor(n)).padStart(w, '0')

export default function HeroGl({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const clockRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!active) return
    const cv = ref.current
    if (!cv) return
    const gl = cv.getContext('webgl', { antialias: false, powerPreference: 'high-performance' })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (process.env.NODE_ENV !== 'production' && !gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('[hero-gl] shader compile failed:', gl.getShaderInfoLog(sh))
      }
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const U = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = U('uRes'), uTime = U('uTime'), uMouse = U('uMouse'), uPulse = U('uPulse')
    const uGlow = U('uGlow'), uScroll = U('uScroll'), uSpin = U('uSpin')
    const section = cv.closest('section')

    // adaptive resolution: start sub-native, step down if frames run long on weaker GPUs
    const phone = window.innerWidth < 768
    const maxScale = Math.min(window.devicePixelRatio || 1, 1.5) * (phone ? 0.65 : 0.85)
    let scale = maxScale
    const minScale = maxScale * 0.45
    const resize = () => {
      const parent = cv.parentElement
      cv.width = Math.max(2, Math.floor((parent?.clientWidth || 1280) * scale))
      cv.height = Math.max(2, Math.floor((parent?.clientHeight || 720) * scale))
      gl.viewport(0, 0, cv.width, cv.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = -(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // click (hero dispatches 'heroTap') -> scan ring + spin-up; CTA hover -> charge the core
    let clickAt = -1e9
    let spin = 0
    let spinVel = 0
    const onTap = () => { clickAt = performance.now(); spinVel += 4 }
    let glowTarget = 0
    let glow = 0
    const onOver = (e: PointerEvent) => {
      glowTarget = (e.target as Element | null)?.closest?.('.hv-cta') ? 1 : 0
    }
    window.addEventListener('heroTap', onTap)
    window.addEventListener('pointerover', onOver, { passive: true })

    const start = performance.now()
    let prev = start
    let slow = 0
    const draw = () => {
      const now = performance.now()
      const dt = now - prev
      prev = now
      if (dt > 26 && dt < 400) slow++
      else slow = Math.max(0, slow - 1)
      if (slow > 24 && scale > minScale) {
        scale = Math.max(minScale, scale * 0.85)
        slow = 0
        resize()
      }
      const dts = Math.min(dt / 1000, 0.05)
      spin += spinVel * dts
      spinVel *= 0.94
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      glow += (glowTarget - glow) * 0.08
      const r = section?.getBoundingClientRect()
      const secs = (now - start) / 1000
      gl.uniform2f(uRes, cv.width, cv.height)
      gl.uniform1f(uTime, secs)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uGlow, glow)
      gl.uniform1f(uPulse, Math.min((now - clickAt) / 1000, 99))
      gl.uniform1f(uSpin, spin)
      gl.uniform1f(uScroll, r ? Math.min(Math.max(-r.top / (r.height * 0.8), 0), 1) : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      // live HUD read-out: real cursor position and runtime, written straight to the DOM (no React re-render)
      if (cursorRef.current) {
        const sx = mouse.x >= 0 ? '+' : '-'
        const sy = mouse.y >= 0 ? '+' : '-'
        cursorRef.current.textContent = `X ${sx}${Math.abs(mouse.x).toFixed(2)}  Y ${sy}${Math.abs(mouse.y).toFixed(2)}`
      }
      if (clockRef.current) clockRef.current.textContent = `T+${pad(secs / 60)}:${pad(secs % 60)}.${pad((secs % 1) * 10, 1)}`
    }
    const stop = startFrameLoop({ host: cv.parentElement, frame: draw })

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('heroTap', onTap)
      window.removeEventListener('pointerover', onOver)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [active])

  return (
    <div className={'hv-bg' + (active ? ' on' : '')}>
      <canvas ref={ref} className="hb-cv" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      {/* HUD: framing marks + live read-out (decorative, no pointer events) */}
      <div className="gl-hud" aria-hidden="true">
        <i className="gl-cross" style={{ left: '56%', top: '24%' }} />
        <i className="gl-cross" style={{ left: '91%', top: '46%' }} />
        <i className="gl-cross" style={{ left: '63%', top: '86%' }} />
        <i className="gl-br gl-br-tl" />
        <i className="gl-br gl-br-br" />
        <div className="gl-readout">
          <span>SYS.STATUS: ONLINE // 2026.10</span>
          <span ref={cursorRef}>X +0.00  Y +0.00</span>
          <span ref={clockRef}>T+00:00.0</span>
        </div>
      </div>
    </div>
  )
}
