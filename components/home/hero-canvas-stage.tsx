'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  getParticleBudget,
  getPerformanceTier,
  type HeroVisualMode,
} from '@/lib/hero/visual-modes'
import { sampleLogoPoints } from '@/lib/hero/logo-sampler'

type HeroCanvasStageProps = {
  mode?: HeroVisualMode
  showFallbackLogo?: boolean
}

type Particle = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  tx: number
  ty: number
  px: number
  py: number
  size: number
  alpha: number
  seed: number
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

export function HeroCanvasStage({ mode = 'particle-morph', showFallbackLogo = true }: HeroCanvasStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId = 0
    let width = 0
    let height = 0
    let phase = 0
    let morph = 0
    let startTime = performance.now()
    let particles: Particle[] = []
    let gridPoints: Array<{ x: number; y: number; ox: number; oy: number }> = []
    let disposed = false

    const dpr = Math.min(window.devicePixelRatio, 2)
    const tier = getPerformanceTier()
    const budget = getParticleBudget(tier)
    const reducedMotion = tier === 'low'
    const mouse = { x: -9999, y: -9999, active: false }

    const resize = () => {
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const spacing = mode === 'magnetic-grid' ? 22 : 28
      const cols = Math.floor(width / spacing)
      const rows = Math.floor(height / spacing)
      gridPoints = []
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          const px = (x / cols) * width
          const py = (y / rows) * height
          gridPoints.push({ x: px, y: py, ox: px, oy: py })
        }
      }
    }

    const logoLayout = () => {
      const size = Math.min(width, height) * 0.42
      return {
        cx: width * 0.5,
        cy: height * 0.5,
        size,
      }
    }

    const spawnParticles = (points: Awaited<ReturnType<typeof sampleLogoPoints>>) => {
      const { cx, cy, size } = logoLayout()
      particles = points.map((point, index) => {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * Math.max(width, height) * 0.55
        const tx = cx + (point.u - 0.5) * size
        const ty = cy + (point.v - 0.5) * size
        return {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          z: (Math.random() - 0.5) * 80,
          vx: 0,
          vy: 0,
          tx,
          ty,
          px: tx,
          py: ty,
          size: 0.8 + point.brightness * 1.8,
          alpha: 0.35 + point.brightness * 0.55,
          seed: index * 0.17,
        }
      })
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
      mouse.active = true
    }

    const onLeave = () => {
      mouse.active = false
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    sampleLogoPoints(budget).then((points) => {
      if (disposed) return
      spawnParticles(points)
    })

    const drawBackground = () => {
      const { cx, cy } = logoLayout()

      if (mode === 'liquid-field') {
        const drift = Math.sin(phase * 0.4) * 0.08
        const bg = ctx.createRadialGradient(
          cx + width * drift,
          cy,
          0,
          cx,
          cy,
          Math.max(width, height) * 0.8,
        )
        bg.addColorStop(0, '#0a2828')
        bg.addColorStop(0.45, '#041018')
        bg.addColorStop(1, '#010409')
        ctx.fillStyle = bg
      } else if (mode === 'constellation') {
        const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.78)
        bg.addColorStop(0, '#0a1028')
        bg.addColorStop(0.55, '#030712')
        bg.addColorStop(1, '#000205')
        ctx.fillStyle = bg
      } else if (mode === 'magnetic-grid') {
        ctx.fillStyle = '#020408'
      } else {
        const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.75)
        bg.addColorStop(0, '#0b1628')
        bg.addColorStop(0.5, '#050a14')
        bg.addColorStop(1, '#010409')
        ctx.fillStyle = bg
      }

      ctx.fillRect(0, 0, width, height)

      if (mode === 'constellation') {
        for (let i = 0; i < 48; i++) {
          const sx = ((i * 97) % 1000) / 1000 * width
          const sy = ((i * 53) % 1000) / 1000 * height
          const tw = 0.25 + Math.sin(phase * 1.4 + i) * 0.15
          ctx.fillStyle = `rgba(148, 163, 184, ${tw * 0.35})`
          ctx.beginPath()
          ctx.arc(sx, sy, 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const applyMouseForce = (x: number, y: number) => {
      if (!mouse.active) return { fx: 0, fy: 0 }
      const dx = x - mouse.x
      const dy = y - mouse.y
      const dist = Math.hypot(dx, dy)
      const radius = mode === 'magnetic-grid' ? 220 : mode === 'liquid-field' ? 160 : 130
      if (dist > radius || dist < 1) return { fx: 0, fy: 0 }
      const force =
        (1 - dist / radius) *
        (mode === 'liquid-field' ? 3.2 : mode === 'magnetic-grid' ? 4.5 : 1.6)
      return { fx: (dx / dist) * force, fy: (dy / dist) * force }
    }

    const updateParticleMorph = () => {
      const elapsed = (performance.now() - startTime) / 1000
      morph = reducedMotion ? 1 : easeOutCubic(Math.min(elapsed / 2.4, 1))

      for (const p of particles) {
        const breathe = Math.sin(phase + p.seed) * 1.2
        const targetX = p.tx + breathe
        const targetY = p.ty + Math.cos(phase * 0.9 + p.seed) * 1.2
        const dx = targetX - p.x
        const dy = targetY - p.y
        p.vx += dx * 0.035 * morph
        p.vy += dy * 0.035 * morph

        const mouseForce = applyMouseForce(p.x, p.y)
        p.vx += mouseForce.fx
        p.vy += mouseForce.fy

        p.vx *= 0.86
        p.vy *= 0.86
        if (!reducedMotion) {
          p.px = p.x
          p.py = p.y
          p.x += p.vx
          p.y += p.vy
        } else {
          p.x = targetX
          p.y = targetY
        }
      }
    }

    const updateConstellation = () => {
      const elapsed = (performance.now() - startTime) / 1000
      morph = reducedMotion ? 1 : easeOutCubic(Math.min(elapsed / 3.2, 1))

      for (const p of particles) {
        const twinkle = 0.85 + Math.sin(phase * 2.2 + p.seed * 3) * 0.15
        const targetX = p.tx + Math.sin(phase * 0.6 + p.seed) * 2.5 * twinkle
        const targetY = p.ty + Math.cos(phase * 0.55 + p.seed) * 2.5 * twinkle
        const dx = targetX - p.x
        const dy = targetY - p.y
        p.vx += dx * 0.028 * morph
        p.vy += dy * 0.028 * morph

        const mouseForce = applyMouseForce(p.x, p.y)
        p.vx += mouseForce.fx * 0.5
        p.vy += mouseForce.fy * 0.5
        p.vx *= 0.88
        p.vy *= 0.88

        p.px = p.x
        p.py = p.y
        p.x += p.vx
        p.y += p.vy
      }
    }

    const updateLiquidField = () => {
      morph = 1
      const { cx, cy } = logoLayout()

      for (const p of particles) {
        const flowAngle =
          Math.sin(p.x * 0.012 + phase * 1.1) * Math.cos(p.y * 0.01 - phase * 0.85) * Math.PI * 2 +
          Math.sin(phase * 0.5 + p.seed) * 0.8

        p.vx += Math.cos(flowAngle) * 0.22
        p.vy += Math.sin(flowAngle) * 0.22

        const toLogoX = p.tx - p.x
        const toLogoY = p.ty - p.y
        p.vx += toLogoX * 0.012
        p.vy += toLogoY * 0.012

        const mouseForce = applyMouseForce(p.x, p.y)
        p.vx += mouseForce.fx * 0.75
        p.vy += mouseForce.fy * 0.75

        p.vx *= 0.9
        p.vy *= 0.9

        p.px = p.x
        p.py = p.y
        p.x += p.vx
        p.y += p.vy

        const pullX = cx - p.x
        const pullY = cy - p.y
        const pull = Math.hypot(pullX, pullY)
        if (pull > Math.max(width, height) * 0.52) {
          p.x += pullX * 0.003
          p.y += pullY * 0.003
        }
      }
    }

    const updateMagneticGrid = () => {
      morph = 1
      for (const point of gridPoints) {
        const mouseForce = applyMouseForce(point.x, point.y)
        point.x += mouseForce.fx * 3.5
        point.y += mouseForce.fy * 3.5
        point.x += (point.ox - point.x) * 0.06
        point.y += (point.oy - point.y) * 0.06
      }

      for (const p of particles) {
        const targetX = p.tx
        const targetY = p.ty
        p.vx += (targetX - p.x) * 0.04
        p.vy += (targetY - p.y) * 0.04
        p.vx *= 0.82
        p.vy *= 0.82
        p.px = p.x
        p.py = p.y
        p.x += p.vx
        p.y += p.vy
      }
    }

    const drawConstellationLines = () => {
      if (morph < 0.35) return
      const lineStrength = Math.min(1, (morph - 0.35) / 0.45)
      const sorted = [...particles].sort((a, b) => a.y - b.y)

      for (let i = 0; i < sorted.length; i += 2) {
        const a = sorted[i]
        for (let j = i + 1; j < Math.min(i + 10, sorted.length); j++) {
          const b = sorted[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 54) {
            const alpha = (1 - dist / 54) * 0.55 * lineStrength
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`
            ctx.lineWidth = 0.9
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    const drawParticles = (palette: 'blue' | 'white' | 'teal', withTrails: boolean) => {
      const sorted = [...particles].sort((a, b) => a.z - b.z)

      for (const p of sorted) {
        if (withTrails) {
          const speed = Math.hypot(p.x - p.px, p.y - p.py)
          if (speed > 0.4) {
            ctx.strokeStyle =
              palette === 'teal'
                ? `rgba(45, 212, 191, ${Math.min(0.35, speed * 0.08)})`
                : `rgba(96, 165, 250, ${Math.min(0.2, speed * 0.05)})`
            ctx.lineWidth = p.size * 0.7
            ctx.beginPath()
            ctx.moveTo(p.px, p.py)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }

        const depth = 1 + p.z / 120
        const r = p.size * depth * (palette === 'white' ? 0.75 : 1)
        const grad = ctx.createRadialGradient(p.x - r * 0.3, p.y - r * 0.3, 0, p.x, p.y, r)

        if (palette === 'teal') {
          grad.addColorStop(0, `rgba(153, 246, 228, ${p.alpha})`)
          grad.addColorStop(0.5, `rgba(45, 212, 191, ${p.alpha * 0.9})`)
          grad.addColorStop(1, `rgba(13, 148, 136, ${p.alpha * 0.15})`)
        } else if (palette === 'white') {
          const tw = 0.7 + Math.sin(phase * 2 + p.seed) * 0.3
          grad.addColorStop(0, `rgba(248, 250, 252, ${p.alpha * tw})`)
          grad.addColorStop(0.5, `rgba(186, 230, 253, ${p.alpha * 0.85})`)
          grad.addColorStop(1, `rgba(56, 189, 248, ${p.alpha * 0.2})`)
        } else {
          grad.addColorStop(0, `rgba(224, 242, 254, ${p.alpha})`)
          grad.addColorStop(0.5, `rgba(96, 165, 250, ${p.alpha * 0.9})`)
          grad.addColorStop(1, `rgba(37, 99, 235, ${p.alpha * 0.2})`)
        }

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawMagneticGrid = () => {
      const cols = Math.floor(width / 22) + 1

      for (let i = 0; i < gridPoints.length; i++) {
        const p = gridPoints[i]
        const right = gridPoints[i + 1]
        const down = gridPoints[i + cols]
        const distMouse = mouse.active ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : 9999
        const glow = mouse.active ? Math.max(0, 1 - distMouse / 200) : 0

        if (right && (i + 1) % cols !== 0) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.14 + glow * 0.35})`
          ctx.lineWidth = 0.7 + glow * 0.6
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(right.x, right.y)
          ctx.stroke()
        }
        if (down) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.14 + glow * 0.35})`
          ctx.lineWidth = 0.7 + glow * 0.6
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(down.x, down.y)
          ctx.stroke()
        }

        if (glow > 0.08) {
          ctx.fillStyle = `rgba(125, 211, 252, ${glow * 0.5})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.2 + glow * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const drawVignette = () => {
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.2,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72,
      )
      g.addColorStop(0, 'rgba(1, 4, 9, 0)')
      g.addColorStop(1, 'rgba(1, 4, 9, 0.72)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)
    }

    const render = () => {
      drawBackground()

      if (!reducedMotion) phase += 0.016

      if (mode === 'particle-morph') {
        updateParticleMorph()
        drawParticles('blue', false)
      } else if (mode === 'constellation') {
        updateConstellation()
        drawConstellationLines()
        drawParticles('white', false)
      } else if (mode === 'liquid-field') {
        updateLiquidField()
        drawParticles('teal', true)
      } else {
        drawMagneticGrid()
        updateMagneticGrid()
        drawParticles('blue', false)
      }

      drawVignette()
      frameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [mode])

  return (
    <div ref={wrapRef} className="aw-stage" data-hero-mode={mode}>
      <canvas ref={canvasRef} className="aw-stage-canvas" />
      {showFallbackLogo && (
        <div className="aw-stage-fallback" aria-hidden>
          <Image src="/logo-light-512.png" alt="" width={120} height={120} priority />
        </div>
      )}
      <div className="aw-stage-grain" aria-hidden />
    </div>
  )
}
