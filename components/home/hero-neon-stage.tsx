'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const LOGO_MASK = '/logo-mono-512.png'

export function HeroNeonStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement!)

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      size: 0.5 + Math.random() * 1.8,
    }))

    const rings = [
      { rx: 0.34, ry: 0.22, speed: 0.35, width: 1.5, color: 'rgba(56, 189, 248, 0.55)' },
      { rx: 0.42, ry: 0.28, speed: -0.22, width: 1, color: 'rgba(59, 130, 246, 0.4)' },
      { rx: 0.5, ry: 0.34, speed: 0.15, width: 0.8, color: 'rgba(129, 140, 248, 0.28)' },
    ]

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const cx = width * 0.5
      const cy = height * 0.46
      const base = Math.min(width, height)

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.72)
      bg.addColorStop(0, '#0c1a33')
      bg.addColorStop(0.45, '#060d1a')
      bg.addColorStop(1, '#020408')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      if (!reducedMotion) phase += 0.014

      for (const star of stars) {
        const sx = star.x * width
        const sy = star.y * height
        const twinkle = 0.35 + Math.sin(phase * 3 + star.z * 12) * 0.35
        ctx.fillStyle = `rgba(191, 219, 254, ${twinkle * (0.3 + star.z * 0.5)})`
        ctx.beginPath()
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const ring of rings) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(phase * ring.speed)
        ctx.beginPath()
        ctx.ellipse(0, 0, base * ring.rx, base * ring.ry, 0, 0, Math.PI * 2)
        ctx.strokeStyle = ring.color
        ctx.lineWidth = ring.width
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)'
        ctx.shadowBlur = 12
        ctx.stroke()
        ctx.restore()
      }

      const beamY = ((phase * 40) % (height + 80)) - 40
      const beam = ctx.createLinearGradient(0, beamY - 30, 0, beamY + 30)
      beam.addColorStop(0, 'rgba(56, 189, 248, 0)')
      beam.addColorStop(0.5, 'rgba(56, 189, 248, 0.06)')
      beam.addColorStop(1, 'rgba(56, 189, 248, 0)')
      ctx.fillStyle = beam
      ctx.fillRect(0, beamY - 30, width, 60)

      frameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="neon-stage" aria-hidden>
      <canvas ref={canvasRef} className="neon-stage-canvas" />

      <div className="neon-stage-frame">
        <span className="neon-corner neon-corner-tl" />
        <span className="neon-corner neon-corner-tr" />
        <span className="neon-corner neon-corner-bl" />
        <span className="neon-corner neon-corner-br" />
      </div>

      <div className="neon-stage-scanlines" />

      <div className="neon-stage-core">
        <div className="neon-core-halo" />
        <div className="neon-core-ring neon-core-ring-a" />
        <div className="neon-core-ring neon-core-ring-b" />

        <div className="neon-logo-stack">
          <div
            className="neon-logo-chroma neon-logo-chroma-a"
            style={{ WebkitMaskImage: `url(${LOGO_MASK})`, maskImage: `url(${LOGO_MASK})` }}
          />
          <div
            className="neon-logo-chroma neon-logo-chroma-b"
            style={{ WebkitMaskImage: `url(${LOGO_MASK})`, maskImage: `url(${LOGO_MASK})` }}
          />
          <div
            className="neon-logo-shine"
            style={{ WebkitMaskImage: `url(${LOGO_MASK})`, maskImage: `url(${LOGO_MASK})` }}
          />
          <Image
            src="/logo-light-512.png"
            alt=""
            width={200}
            height={200}
            className="neon-logo-mark"
            priority
          />
        </div>
      </div>

      <div className="neon-stage-label neon-stage-label-left">8PLUS.SYS</div>
      <div className="neon-stage-label neon-stage-label-right">v2.0</div>
      <div className="neon-stage-vignette" />
    </div>
  )
}
