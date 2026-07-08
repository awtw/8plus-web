'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'

const COLUMNS = [1.15, 0.75, 1.35, 0.9, 1.2, 0.85, 1.1, 0.95, 1.25, 0.8, 1.05]

export function HeroWaveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useLanguage()
  const labels = t('home.floatingLabels').split('|')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId = 0
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio, 2)

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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const waves = [
      { y: 0.52, amp: 26, freq: 0.0085, speed: 0.018, width: 3.2, alpha: 0.95 },
      { y: 0.5, amp: 18, freq: 0.011, speed: -0.012, width: 2.2, alpha: 0.55 },
      { y: 0.54, amp: 34, freq: 0.0065, speed: 0.01, width: 5.5, alpha: 0.35 },
      { y: 0.48, amp: 12, freq: 0.014, speed: 0.022, width: 1.4, alpha: 0.7 },
    ]

    let phase = 0

    const drawWave = (
      baseY: number,
      amplitude: number,
      frequency: number,
      lineWidth: number,
      alpha: number,
      offset: number,
    ) => {
      ctx.beginPath()
      for (let x = -20; x <= width + 20; x += 4) {
        const y =
          baseY +
          Math.sin(x * frequency + offset) * amplitude +
          Math.sin(x * frequency * 0.45 + offset * 1.4) * (amplitude * 0.35)
        if (x === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`
      ctx.lineWidth = lineWidth
      ctx.shadowColor = 'rgba(59, 130, 246, 0.95)'
      ctx.shadowBlur = lineWidth * 8
      ctx.stroke()

      ctx.shadowBlur = lineWidth * 14
      ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.45})`
      ctx.lineWidth = lineWidth * 2.4
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      if (!reducedMotion) phase += 0.016

      waves.forEach((wave, index) => {
        drawWave(
          height * wave.y,
          wave.amp,
          wave.freq,
          wave.width,
          wave.alpha,
          phase * wave.speed * 60 + index * 1.7,
        )
      })

      frameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="wave-backdrop" aria-hidden>
      <div className="wave-backdrop-columns">
        {COLUMNS.map((flex, index) => (
          <div
            key={index}
            className="wave-backdrop-column"
            style={{ flexGrow: flex, flexBasis: 0 }}
          />
        ))}
      </div>

      <canvas ref={canvasRef} className="wave-backdrop-canvas" />

      <div className="wave-backdrop-stars">
        {Array.from({ length: 48 }).map((_, index) => (
          <span
            key={index}
            className="wave-backdrop-star"
            style={{
              left: `${(index * 17) % 100}%`,
              top: `${(index * 23 + 11) % 100}%`,
              animationDelay: `${(index % 7) * 0.35}s`,
            }}
          />
        ))}
      </div>

      {labels.map((label, index) => (
        <span
          key={label}
          className="wave-backdrop-chip"
          style={{
            left: `${[8, 72, 18, 82, 44][index % 5]}%`,
            top: `${[22, 34, 58, 48, 68][index % 5]}%`,
            animationDelay: `${index * 0.6}s`,
          }}
        >
          {label}
        </span>
      ))}

      <div className="wave-backdrop-logo">
        <div className="wave-backdrop-logo-glow" />
        <Image src="/logo-light-512.png" alt="" width={72} height={72} className="wave-backdrop-logo-mark" priority />
      </div>

      <div className="wave-backdrop-vignette" />
    </div>
  )
}
