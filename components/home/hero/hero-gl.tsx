'use client'

import { useEffect, useRef } from 'react'
import { startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero 3D backdrop — "AI Liquid Core", physically based.
 *
 * A ray-marched liquid-glass body whose look comes from the maths rather than from tricks:
 *  - smooth-union implicit surface + low-frequency organic displacement (no bubbly metaball look)
 *  - refraction INTO the body, an interior march to measure thickness, Beer-Lambert absorption
 *    (thick = deep cobalt, thin = clear), then refraction OUT with per-channel IOR (real dispersion)
 *  - Schlick Fresnel blending the mirror reflection with the transmitted light
 *  - HDR studio environment built from rectangular soft-boxes (warm key-rim + cool key) so the
 *    highlights are the right shape and exceed 1.0, then ACES filmic tone mapping + sRGB encode
 *  - ambient occlusion from the distance field, thin-film tint only at grazing angles
 * Interaction: cursor pulls the gel toward it (gravity, eased), click sends one damped ripple,
 * CTA hover lights the core from inside, scrolling out of the hero pulls the blobs apart.
 * Cost control: bounding-sphere early-out, adaptive resolution (drops scale if frames run long),
 * 30fps cap on phones, paused off-screen / hidden tab, one static frame for reduced motion /
 * Data Saver (lib/motion/frame-loop).
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

vec3 C;   // body centre (set per aspect)
float S;  // body scale

float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }

float map(vec3 wp){
  vec3 p = (wp - C) / S;
  float t = uTime * 0.32; // deliberately slow: the body "breathes"

  // cursor gravity: the gel is drawn toward the pointer (displacement falls off with distance)
  vec3 M = vec3(uMouse.x * 2.6, uMouse.y * 1.7, -0.5);
  p += (M - p) * 0.26 * exp(-length(p - M) * 1.25);

  float sp = 1.0 + uScroll * 1.7;           // scroll: lobes drift apart...
  float k  = mix(0.46, 0.14, uScroll);      // ...and stop merging
  float d = length(p - sp * vec3( sin(t*0.9)*0.66,  cos(t*0.7)*0.48,  sin(t*0.6+1.)*0.36)) - 0.60;
  d = smin(d, length(p - sp * vec3( cos(t*0.8+2.)*0.74, sin(t*1.1)*0.52, cos(t*0.5)*0.40)) - 0.50, k);
  d = smin(d, length(p - sp * vec3( sin(t*0.6+4.)*0.62, cos(t*0.9+1.)*0.66, sin(t*0.8+2.)*0.46)) - 0.46, k);
  d = smin(d, length(p - sp * vec3( cos(t*1.2)*0.44,  sin(t*0.5+3.)*0.40, cos(t*0.7+1.)*0.52)) - 0.40, k);
  d = smin(d, length(p - sp * vec3(-sin(t*0.7)*0.54, -cos(t*0.6+2.)*0.46, sin(t*0.9+5.)*0.34)) - 0.36, k);

  // low-frequency organic surface relief (keeps normals smooth)
  d += 0.085 * sin(p.x * 2.3 + t * 1.3) * sin(p.y * 2.1 - t) * sin(p.z * 2.6 + t * 0.7);
  // click: one damped ripple travelling over the surface
  d += 0.035 * sin(length(p) * 8. - uPulse * 7.) * exp(-uPulse * 2.4);
  return d * S;
}

vec3 normalAt(vec3 p){
  const float e = 0.0018;
  vec2 k = vec2(1., -1.);
  return normalize(k.xyy * map(p + k.xyy * e) + k.yyx * map(p + k.yyx * e) + k.yxy * map(p + k.yxy * e) + k.xxx * map(p + k.xxx * e));
}

// rectangular soft-box: N = facing direction, size = half extents in tangent units, soft = edge falloff
float box(vec3 r, vec3 N, vec3 T, vec2 size, float soft){
  float f = dot(r, N);
  if (f < 0.05) return 0.;
  vec3 B = cross(N, T);
  vec2 uv = vec2(dot(r, T), dot(r, B)) / f;
  vec2 q = abs(uv) - size;
  float sd = max(q.x, q.y);
  return smoothstep(soft, -soft, sd);
}

// HDR studio (linear): dark blue dome, horizon glow, cool key box, warm rim box, cyan fill strip, dark floor
vec3 env(vec3 r){
  float y = r.y;
  vec3 col = mix(vec3(0.001, 0.002, 0.010), vec3(0.006, 0.020, 0.090), smoothstep(-0.3, 1.0, y));
  col += vec3(0.04, 0.12, 0.50) * exp(-abs(y + 0.04) * 13.) * 0.55;
  col += vec3(1.00, 0.96, 0.90) * box(r, normalize(vec3(-0.45, 0.65, -0.60)), normalize(vec3(0.8, 0.0, -0.6)), vec2(0.42, 0.20), 0.10) * 12.;
  col += vec3(1.00, 0.34, 0.05) * box(r, normalize(vec3( 0.85, 0.05, -0.50)), vec3(0., 1., 0.), vec2(0.70, 0.11), 0.12) * 10.;
  col += vec3(0.20, 0.55, 1.00) * box(r, normalize(vec3(-0.90, -0.15, -0.30)), vec3(0., 1., 0.), vec2(0.34, 0.08), 0.12) * 4.0;
  col *= mix(0.30, 1.0, smoothstep(-0.45, 0.10, y));
  return col;
}

vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0., 1.); }

void main(){
  float asp = uRes.x / uRes.y;
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  // framing: large, to the right of the copy on desktop; smaller and lifted above the copy on portrait
  S = asp < 1.0 ? 0.42 : mix(0.46, 0.58, clamp((asp - 1.0) / 0.8, 0., 1.));
  C = asp < 1.0 ? vec3(0.22, -0.42, 0.0) : vec3(0.40 * asp, 0.02, 0.0);
  float dim = asp < 1.0 ? 0.72 : 1.0; // on phones the body sits behind/below the copy: keep it quieter

  // background (linear): CI blue pooled behind the body, falling to deep navy for contrast
  vec2 cuv = uv - C.xy * 0.53;
  vec3 col = mix(vec3(0.0, 0.002, 0.030), vec3(0.0, 0.028, 0.20), smoothstep(1.25, 0.0, length(cuv)));
  col += vec3(1.0, 0.28, 0.04) * exp(-6. * length(cuv - vec2(0.14, -0.24))) * 0.05;

  vec3 bg0 = col;
  vec3 ro = vec3(0., 0., -3.0);
  vec3 rd = normalize(vec3(uv, 1.6));

  vec3 oc = ro - C;
  float b = dot(oc, rd);
  float rb = 1.75 * S + 0.25;
  float disc = b * b - (dot(oc, oc) - rb * rb);
  if (disc > 0.) {
    float sq = sqrt(disc);
    float t = max(-b - sq, 0.);
    float tmax = -b + sq;
    bool hit = false;
    float mc = 1e3; // smallest distance-to-surface / ray-distance seen: how close a miss came (silhouette AA)
    for (int i = 0; i < 72; i++){
      float dm = map(ro + rd * t);
      mc = min(mc, dm / max(t, 0.5));
      float d = dm * 0.85;
      if (d < 0.0012){ hit = true; break; }
      t += d;
      if (t > tmax) break;
    }
    if (!hit) {
      // rays that graze the body cover part of the pixel: blend a rim colour by angular coverage
      float px = 1.0 / (uRes.y * 1.6);
      float cov = 1. - smoothstep(0., px * 1.5, mc);
      col = mix(col, vec3(0.16, 0.26, 0.62), cov * 0.85);
    }
    if (hit){
      vec3 p = ro + rd * t;
      vec3 n = normalAt(p);
      float ndv = clamp(dot(n, -rd), 0., 1.);

      // Fresnel (Schlick). F0 a little above plain glass so the liquid keeps a glossy, metallic sheen.
      float F = 0.07 + 0.93 * pow(1. - ndv, 4.);
      vec3 refl = env(reflect(rd, n));

      // --- transmission: refract in, march the interior for thickness, refract out (per-channel IOR) ---
      vec3 tin = refract(rd, n, 1.0 / 1.48);
      float th = 0.02;
      for (int i = 0; i < 24; i++){
        float d = -map(p + tin * th);
        if (d < 0.004) break;
        th += max(d, 0.02);
      }
      vec3 pe = p + tin * th;
      vec3 ne = normalAt(pe);                       // outward at the exit point
      vec3 oR = refract(tin, -ne, 1.44);
      vec3 oG = refract(tin, -ne, 1.48);
      vec3 oB = refract(tin, -ne, 1.53);
      vec3 inner = -ne;                             // total internal reflection fallback
      if (dot(oG, oG) < 0.0001) { oR = oG = oB = reflect(tin, inner); }
      vec3 through = vec3(env(oR).r, env(oG).g, env(oB).b);

      // Beer-Lambert: thick regions absorb red/green first -> deep cobalt; thin regions stay clear
      vec3 absorb = exp(-vec3(2.6, 1.7, 0.55) * th * 1.7);
      // single-scatter glow so thick regions are luminous jelly rather than black
      vec3 scatter = vec3(0.03, 0.14, 0.80) * (1. - exp(-th * 1.6)) * 0.30;
      // luminous core: a warm emissive heart seen through the body. Distance from the core centre to the
      // refracted ray picks how much of it is visible; absorption dims it with the depth it is seen through.
      float cd = length(cross(tin, C - p));
      vec3 core = (vec3(1.0, 0.40, 0.06) * 1.2 + vec3(1.0, 0.85, 0.6) * 0.7 * exp(-cd * cd * 110.)) * exp(-cd * cd * 30.) * (0.60 + uGlow * 1.6);
      vec3 trans = through * absorb + scatter + core * exp(-vec3(1.4, 1.0, 0.5) * 0.6);

      // ambient occlusion from the distance field (darkens creases where lobes merge)
      float ao = clamp(0.35 + 0.65 * (map(p + n * 0.12) + map(p + n * 0.30) * 0.5) / 0.22, 0.30, 1.0);

      // thin-film tint, only at grazing angles (oil-slick rim)
      vec3 film = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + ndv * 1.2 + uTime * 0.02));

      vec3 body = mix(trans * ao, refl, F) + film * pow(1. - ndv, 3.) * 0.30;
      // CTA hover: light the core from inside
      body += vec3(0.20, 0.45, 1.0) * uGlow * 0.55 * (1. - exp(-th * 2.)) + vec3(1.0, 0.4, 0.1) * uGlow * 0.10 * (1. - ndv);
      col = body;
    }
  }

  col = mix(bg0, col, dim);

  // filmic tone map (HDR highlights roll off naturally), vignette, sRGB encode, grain
  col = aces(col * 1.05);
  col *= 1.0 - 0.38 * smoothstep(0.55, 1.2, length(uv));
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

export default function HeroGl({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

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

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uPulse = gl.getUniformLocation(prog, 'uPulse')
    const uGlow = gl.getUniformLocation(prog, 'uGlow')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')
    const section = cv.closest('section')

    // adaptive resolution: start sub-native, step down if frames run long on weaker GPUs
    const phone = window.innerWidth < 768
    const maxScale = Math.min(window.devicePixelRatio || 1, 1.5) * (phone ? 0.5 : 0.85)
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

    // click (hero dispatches 'heroTap') -> ripple; CTA hover -> core glow
    let clickAt = -1e9
    const onTap = () => { clickAt = performance.now() }
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
      // adaptive resolution: ~24 consecutive slow frames (>26ms) -> shrink 15%
      if (dt > 26 && dt < 400) slow++
      else slow = Math.max(0, slow - 1)
      if (slow > 24 && scale > minScale) {
        scale = Math.max(minScale, scale * 0.85)
        slow = 0
        resize()
      }

      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      glow += (glowTarget - glow) * 0.08
      const r = section?.getBoundingClientRect()
      gl.uniform2f(uRes, cv.width, cv.height)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uGlow, glow)
      gl.uniform1f(uPulse, Math.min((now - clickAt) / 1000, 99))
      gl.uniform1f(uScroll, r ? Math.min(Math.max(-r.top / (r.height * 0.8), 0), 1) : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
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
    </div>
  )
}
