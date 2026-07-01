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

      const cols = Math.floor(width / 28)
      const rows = Math.floor(height / 28)
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
        return {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          z: (Math.random() - 0.5) * 80,
          vx: 0,
          vy: 0,
          tx: cx + (point.u - 0.5) * size,
          ty: cy + (point.v - 0.5) * size,
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
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.75)
      bg.addColorStop(0, '#0b1628')
      bg.addColorStop(0.5, '#050a14')
      bg.addColorStop(1, '#010409')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)
    }

    const applyMouseForce = (x: number, y: number) => {
      if (!mouse.active) return { fx: 0, fy: 0 }
      const dx = x - mouse.x
      const dy = y - mouse.y
      const dist = Math.hypot(dx, dy)
      const radius = mode === 'magnetic-grid' ? 180 : 130
      if (dist > radius || dist < 1) return { fx: 0, fy: 0 }
      const force = (1 - dist / radius) * (mode === 'liquid-field' ? 2.4 : 1.6)
      return { fx: (dx / dist) * force, fy: (dy / dist) * force }
    }

    const updateParticleMorph = () => {
      const elapsed = (performance.now() - startTime) / 1000
      morph = reducedMotion ? 1 : easeOutCubic(Math.min(elapsed / 2.4, 1))

      for (const p of particles) {
        const targetX = p.tx + Math.sin(phase + p.seed) * 1.2
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
          p.x += p.vx
          p.y += p.vy
        } else {
          p.x = targetX
          p.y = targetY
        }
      }
    }

    const updateConstellation = () => {
      updateParticleMorph()
    }

    const updateLiquidField = () => {
      morph = 1
      const { cx, cy } = logoLayout()
      for (const p of particles) {
        const angle =
          Math.sin(p.x * 0.008 + phase) * Math.cos(p.y * 0.007 - phase * 0.8) * Math.PI * 2
        p.vx += Math.cos(angle) * 0.08
        p.vy += Math.sin(angle) * 0.08

        const toLogoX = p.tx - p.x
        const toLogoY = p.ty - p.y
        p.vx += toLogoX * 0.018
        p.vy += toLogoY * 0.018

        const mouseForce = applyMouseForce(p.x, p.y)
        p.vx += mouseForce.fx * 0.6
        p.vy += mouseForce.fy * 0.6

        p.vx *= 0.9
        p.vy *= 0.9
        p.x += p.vx
        p.y += p.vy

        const pullX = cx - p.x
        const pullY = cy - p.y
        const pull = Math.hypot(pullX, pullY)
        if (pull > Math.max(width, height) * 0.55) {
          p.x += pullX * 0.002
          p.y += pullY * 0.002
        }
      }
    }

    const updateMagneticGrid = () => {
      morph = 1
      for (const point of gridPoints) {
        const mouseForce = applyMouseForce(point.x, point.y)
        point.x += mouseForce.fx * 2.2
        point.y += mouseForce.fy * 2.2
        point.x += (point.ox - point.x) * 0.08
        point.y += (point.oy - point.y) * 0.08
      }
      updateParticleMorph()
    }

    const drawParticles = (withLines: boolean) => {
      const sorted = [...particles].sort((a, b) => a.z - b.z)

      if (withLines) {
        for (let i = 0; i < sorted.length; i += 3) {
          const a = sorted[i]
          for (let j = i + 1; j < Math.min(i + 8, sorted.length); j++) {
            const b = sorted[j]
            const dist = Math.hypot(a.x - b.x, a.y - b.y)
            if (dist < 36) {
              ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - dist / 36) * 0.18})`
              ctx.lineWidth = 0.6
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }

      for (const p of sorted) {
        const depth = 1 + p.z / 120
        const r = p.size * depth
        const grad = ctx.createRadialGradient(p.x - r * 0.3, p.y - r * 0.3, 0, p.x, p.y, r)
        grad.addColorStop(0, `rgba(224, 242, 254, ${p.alpha})`)
        grad.addColorStop(0.5, `rgba(96, 165, 250, ${p.alpha * 0.9})`)
        grad.addColorStop(1, `rgba(37, 99, 235, ${p.alpha * 0.2})`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawMagneticGrid = () => {
      const cols = Math.floor(width / 28) + 1
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'
      ctx.lineWidth = 0.6

      for (let i = 0; i < gridPoints.length; i++) {
        const p = gridPoints[i]
        const right = gridPoints[i + 1]
        const down = gridPoints[i + cols]
        if (right && (i + 1) % cols !== 0) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(right.x, right.y)
          ctx.stroke()
        }
        if (down) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(down.x, down.y)
          ctx.stroke()
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
        drawParticles(false)
      } else if (mode === 'constellation') {
        updateConstellation()
        drawParticles(true)
      } else if (mode === 'liquid-field') {
        updateLiquidField()
        drawParticles(false)
      } else {
        drawMagneticGrid()
        updateMagneticGrid()
        drawParticles(false)
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
    <div ref={wrapRef} className="aw-stage">
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
