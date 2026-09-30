'use client'

import { useEffect, useRef } from 'react'
import { startFrameLoop } from '@/lib/motion/frame-loop'

/**
 * Hero 3D backdrop — dependency-free WebGL ray-marched scene that echoes the 8plus
 * "%" mark: a large orange orb, a tilted ring and a small orbiting sphere on the CI blue.
 * Desktop-first: rendered at reduced resolution, paused off-screen / hidden tab
 * (see lib/motion/frame-loop), static frame under reduced motion / Data Saver.
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`

const FRAG = `
precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;

float sdSphere(vec3 p, float r){ return length(p) - r; }
float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// returns distance in x, material id in y (1 orb, 2 ring, 3 satellite)
vec2 map(vec3 p){
  vec3 q = p - vec3(0.55, -0.05, 0.);
  float orb = sdSphere(q, 0.62);
  vec3 r = q; r.yz *= rot(1.05); r.xz *= rot(uTime * 0.25);
  float ring = sdTorus(r, vec2(1.05, 0.035));
  vec3 s = q - vec3(cos(uTime * 0.7) * 1.05, sin(uTime * 0.7) * 0.5, sin(uTime * 0.7) * 0.9);
  float sat = sdSphere(s, 0.14);
  vec2 d = vec2(orb, 1.);
  if (ring < d.x) d = vec2(ring, 2.);
  if (sat < d.x) d = vec2(sat, 3.);
  return d;
}

vec3 normal(vec3 p){
  vec2 e = vec2(0.002, 0.);
  return normalize(vec3(map(p + e.xyy).x - map(p - e.xyy).x, map(p + e.yxy).x - map(p - e.yxy).x, map(p + e.yyx).x - map(p - e.yyx).x));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 bgA = vec3(0.0, 0.10, 0.45), bgB = vec3(0.0, 0.03, 0.22);
  vec3 col = mix(bgB, bgA, smoothstep(-0.6, 0.7, uv.y + uv.x * 0.25));

  vec3 ro = vec3(uMouse.x * 0.35, uMouse.y * 0.2, -3.0);
  vec3 rd = normalize(vec3(uv, 1.6));
  float t = 0.; vec2 h; bool hit = false;
  for (int i = 0; i < 56; i++){
    h = map(ro + rd * t);
    if (h.x < 0.002){ hit = true; break; }
    t += h.x;
    if (t > 7.) break;
  }
  if (hit){
    vec3 p = ro + rd * t; vec3 n = normal(p);
    vec3 l = normalize(vec3(-0.5, 0.7, -0.6));
    float diff = max(dot(n, l), 0.);
    float fres = pow(1. - max(dot(n, -rd), 0.), 3.);
    vec3 base = h.y < 1.5 ? vec3(1.0, 0.31, 0.0) : h.y < 2.5 ? vec3(0.75, 0.85, 1.0) : vec3(1.0);
    col = base * (0.25 + 0.85 * diff) + fres * vec3(0.55, 0.7, 1.0) * 0.6;
  }
  // soft glow around the orb
  float g = exp(-3.2 * length(uv - vec2(0.42, -0.04)));
  col += vec3(1.0, 0.35, 0.05) * g * 0.22;
  gl_FragColor = vec4(col, 1.);
}`

export default function HeroGl({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const cv = ref.current
    if (!cv) return
    const gl = cv.getContext('webgl', { antialias: false, powerPreference: 'low-power' })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
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

    const scale = Math.min(window.devicePixelRatio || 1, 1.25) * 0.75 // deliberately sub-native: soft, cheap
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

    const start = performance.now()
    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      gl.uniform2f(uRes, cv.width, cv.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const stop = startFrameLoop({ host: cv.parentElement, frame: draw })

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [active])

  return (
    <div className={'hv-bg' + (active ? ' on' : '')}>
      <canvas ref={ref} className="hb-cv" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
