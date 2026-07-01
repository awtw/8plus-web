'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const LOGO_MASK = '/logo-mono-512.png'

type Ribbon = {
  baseY: number
  amplitude: number
  frequency: number
  speed: number
  width: number
  hue: number
  alpha: number
}

export function HeroLogoCinema() {
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
    const dpr = Math.min(window.devicePixelRatio, 2)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: 0.5, y: 0.5 }

    const ribbons: Ribbon[] = [
      { baseY: 0.38, amplitude: 28, frequency: 0.009, speed: 0.018, width: 1.8, hue: 199, alpha: 0.55 },
      { baseY: 0.5, amplitude: 22, frequency: 0.011, speed: -0.014, width: 1.2, hue: 214, alpha: 0.38 },
      { baseY: 0.62, amplitude: 34, frequency: 0.007, speed: 0.01, width: 2.4, hue: 228, alpha: 0.28 },
    ]

    const resize = () => {
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (event.clientX - rect.left) / rect.width
      mouse.y = (event.clientY - rect.top) / rect.height
    }

    canvas.addEventListener('pointermove', onMove)

    const drawRibbon = (ribbon: Ribbon, offset: number) => {
      const baseY = height * ribbon.baseY + (mouse.y - 0.5) * 18
      ctx.beginPath()

      for (let x = -20; x <= width + 20; x += 6) {
        const y =
          baseY +
          Math.sin(x * ribbon.frequency + offset) * ribbon.amplitude +
          Math.sin(x * ribbon.frequency * 0.5 + offset * 1.3) * ribbon.amplitude * 0.35 +
          (mouse.x - 0.5) * 12

        if (x === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      const gradient = ctx.createLinearGradient(0, baseY - 40, width, baseY + 40)
      gradient.addColorStop(0, `hsla(${ribbon.hue}, 90%, 62%, 0)`)
      gradient.addColorStop(0.45, `hsla(${ribbon.hue}, 92%, 68%, ${ribbon.alpha})`)
      gradient.addColorStop(1, `hsla(${ribbon.hue}, 90%, 62%, 0)`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = ribbon.width
      ctx.shadowColor = `hsla(${ribbon.hue}, 100%, 70%, 0.65)`
      ctx.shadowBlur = 14
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    const drawGuides = () => {
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)'
      ctx.lineWidth = 1
      const gap = Math.max(48, width / 14)
      for (let x = gap; x < width; x += gap) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const cx = width * 0.5
      const cy = height * 0.5
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7)
      bg.addColorStop(0, '#0a1424')
      bg.addColorStop(0.55, '#050a12')
      bg.addColorStop(1, '#020408')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      drawGuides()

      if (!reducedMotion) phase += 0.016

      ribbons.forEach((ribbon, index) => {
        drawRibbon(ribbon, phase * ribbon.speed * 60 + index * 1.4)
      })

      frameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
      canvas.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className="cinema-stage">
      <canvas ref={canvasRef} className="cinema-stage-canvas" aria-hidden />

      <div className="cinema-stage-mesh" aria-hidden />
      <div className="cinema-stage-ring cinema-stage-ring-a" aria-hidden />
      <div className="cinema-stage-ring cinema-stage-ring-b" aria-hidden />

      <motion.div
        className="cinema-logo-core"
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: [0.2, 0, 0, 1] }}
      >
        <div className="cinema-logo-glow" aria-hidden />
        <div className="cinema-logo-stack">
          <div
            className="cinema-logo-chroma cinema-logo-chroma-a"
            style={{ WebkitMaskImage: `url(${LOGO_MASK})`, maskImage: `url(${LOGO_MASK})` }}
            aria-hidden
          />
          <div
            className="cinema-logo-chroma cinema-logo-chroma-b"
            style={{ WebkitMaskImage: `url(${LOGO_MASK})`, maskImage: `url(${LOGO_MASK})` }}
            aria-hidden
          />
          <div
            className="cinema-logo-shine"
            style={{ WebkitMaskImage: `url(${LOGO_MASK})`, maskImage: `url(${LOGO_MASK})` }}
            aria-hidden
          />
          <Image
            src="/logo-light-512.png"
            alt="8plus"
            width={280}
            height={280}
            className="cinema-logo-mark"
            priority
          />
        </div>
      </motion.div>

      <div className="cinema-stage-vignette" aria-hidden />
    </div>
  )
}
