'use client'

import { useEffect, useRef, type RefObject } from 'react'

type Particle = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  hue: number
  targetU?: number
  targetV?: number
  anchored: boolean
}

type HeroPhysicsBackdropProps = {
  logoRef: RefObject<HTMLDivElement | null>
}

const PARTICLE_COUNT = 88
const LOGO_SAMPLE_TARGET = 42

function project(p: Particle, width: number, height: number) {
  const depth = 1 + p.z / 420
  return {
    x: p.x + p.z * 0.22,
    y: p.y + p.z * 0.12,
    r: p.radius * depth,
  }
}

function drawSphere(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  hue: number,
  alpha: number,
) {
  const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, 0, x, y, r)
  grad.addColorStop(0, `hsla(${hue}, 90%, 88%, ${alpha})`)
  grad.addColorStop(0.45, `hsla(${hue}, 82%, 58%, ${alpha * 0.95})`)
  grad.addColorStop(1, `hsla(${hue}, 70%, 22%, ${alpha * 0.35})`)
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, phase: number) {
  const horizon = height * 0.78
  const vanishX = width * 0.52
  const vanishY = height * 0.38

  ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)'
  ctx.lineWidth = 1

  for (let i = -14; i <= 14; i++) {
    const spread = i * 38 + Math.sin(phase * 0.4 + i) * 4
    ctx.beginPath()
    ctx.moveTo(vanishX + spread * 0.15, vanishY)
    ctx.lineTo(vanishX + spread * 2.8, horizon + 40)
    ctx.stroke()
  }

  for (let row = 0; row < 12; row++) {
    const t = row / 12
    const y = vanishY + (horizon - vanishY) * t * t
    const spread = 40 + t * width * 0.95
    ctx.beginPath()
    ctx.moveTo(vanishX - spread, y)
    ctx.lineTo(vanishX + spread, y)
    ctx.stroke()
  }
}

function sampleLogoTargets(): Array<{ u: number; v: number }> {
  const targets: Array<{ u: number; v: number }> = []
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2
    const ring = 0.22 + (i % 3) * 0.06
    targets.push({
      u: 0.5 + Math.cos(angle) * ring,
      v: 0.5 + Math.sin(angle) * ring,
    })
  }
  return targets
}

export function HeroPhysicsBackdrop({ logoRef }: HeroPhysicsBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef<Particle[]>([])
  const logoTargetsRef = useRef<Array<{ u: number; v: number }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId = 0
    let width = 0
    let height = 0
    let phase = 0
    const dpr = Math.min(window.devicePixelRatio, 2)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const img = new Image()
    img.src = '/logo-light-512.png'
    img.onload = () => {
      const size = 96
      const off = document.createElement('canvas')
      off.width = size
      off.height = size
      const octx = off.getContext('2d')
      if (!octx) return
      octx.drawImage(img, 0, 0, size, size)
      const data = octx.getImageData(0, 0, size, size).data
      const sampled: Array<{ u: number; v: number }> = []
      for (let attempt = 0; attempt < 6000 && sampled.length < LOGO_SAMPLE_TARGET; attempt++) {
        const px = Math.floor(Math.random() * size)
        const py = Math.floor(Math.random() * size)
        const alpha = data[(py * size + px) * 4 + 3]
        if (alpha > 72) {
          sampled.push({ u: px / size, v: py / size })
        }
      }
      logoTargetsRef.current = sampled.length > 12 ? sampled : sampleLogoTargets()
      initParticles()
    }
    img.onerror = () => {
      logoTargetsRef.current = sampleLogoTargets()
      initParticles()
    }

    const initParticles = () => {
      const targets = logoTargetsRef.current
      const particles: Particle[] = []

      for (let i = 0; i < LOGO_SAMPLE_TARGET; i++) {
        const target = targets[i % targets.length]
        particles.push({
          x: width * 0.5,
          y: height * 0.5,
          z: (Math.random() - 0.5) * 120,
          vx: 0,
          vy: 0,
          vz: 0,
          radius: 2.2 + Math.random() * 2.4,
          hue: 205 + Math.random() * 25,
          targetU: target.u,
          targetV: target.v,
          anchored: true,
        })
      }

      for (let i = LOGO_SAMPLE_TARGET; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: (Math.random() - 0.5) * 280,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          vz: (Math.random() - 0.5) * 0.3,
          radius: 3 + Math.random() * 5,
          hue: 198 + Math.random() * 40,
          anchored: false,
        })
      }

      particlesRef.current = particles
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particlesRef.current.length === 0) initParticles()
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement!)

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      }
    }

    const onLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    const getLogoRect = () => {
      const logo = logoRef.current
      const rect = canvas.getBoundingClientRect()
      if (!logo) {
        return {
          cx: width * 0.72,
          cy: height * 0.46,
          w: Math.min(width, height) * 0.22,
          h: Math.min(width, height) * 0.22,
        }
      }
      const lr = logo.getBoundingClientRect()
      return {
        cx: lr.left + lr.width / 2 - rect.left,
        cy: lr.top + lr.height / 2 - rect.top,
        w: lr.width,
        h: lr.height,
      }
    }

    const step = () => {
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const logo = getLogoRect()

      if (!reducedMotion) phase += 0.012

      for (const p of particles) {
        if (p.anchored && p.targetU !== undefined && p.targetV !== undefined) {
          const tx = logo.cx + (p.targetU - 0.5) * logo.w * 0.92
          const ty = logo.cy + (p.targetV - 0.5) * logo.h * 0.92
          p.vx += (tx - p.x) * 0.028
          p.vy += (ty - p.y) * 0.028
          p.vz += (0 - p.z) * 0.018
        } else {
          p.vx += Math.sin(phase + p.y * 0.01) * 0.004
          p.vy += Math.cos(phase + p.x * 0.01) * 0.004
          p.vz += Math.sin(phase * 0.7) * 0.002

          if (p.x < 0 || p.x > width) p.vx *= -0.85
          if (p.y < 0 || p.y > height) p.vy *= -0.85
          p.x = Math.max(0, Math.min(width, p.x))
          p.y = Math.max(0, Math.min(height, p.y))
        }

        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140) {
            const force = (1 - dist / 140) * 1.8
            p.vx += (dx / (dist || 1)) * force
            p.vy += (dy / (dist || 1)) * force
          }
        }

        const toLogoX = logo.cx - p.x
        const toLogoY = logo.cy - p.y
        const logoDist = Math.hypot(toLogoX, toLogoY)
        if (!p.anchored && logoDist > 40) {
          p.vx += (toLogoX / logoDist) * 0.006
          p.vy += (toLogoY / logoDist) * 0.006
        }

        p.vx *= 0.92
        p.vy *= 0.92
        p.vz *= 0.9

        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy
          p.z += p.vz
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const bg = ctx.createRadialGradient(width * 0.55, height * 0.35, 0, width * 0.5, height * 0.5, width * 0.85)
      bg.addColorStop(0, '#0a1628')
      bg.addColorStop(0.45, '#050a14')
      bg.addColorStop(1, '#020408')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      drawGrid(ctx, width, height, phase)
      step()

      const particles = particlesRef.current
      const projected = particles
        .map((p) => ({ p, ...project(p, width, height) }))
        .sort((a, b) => a.p.z - b.p.z)

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 95) {
            const alpha = (1 - dist / 95) * 0.22
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const item of projected) {
        const depthAlpha = 0.55 + (1 - (item.p.z + 280) / 560) * 0.45
        drawSphere(ctx, item.x, item.y, item.r, item.p.hue, depthAlpha)
      }

      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.45, width * 0.2, width * 0.5, height * 0.5, width * 0.75)
      vignette.addColorStop(0, 'rgba(2, 4, 8, 0)')
      vignette.addColorStop(1, 'rgba(2, 4, 8, 0.65)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      frameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [logoRef])

  return (
    <div className="physics-backdrop" aria-hidden>
      <canvas ref={canvasRef} className="physics-backdrop-canvas" />
      <div className="physics-backdrop-noise" />
    </div>
  )
}
