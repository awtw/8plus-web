'use client'

import { useId, useMemo } from 'react'
import type { HeroLineComposeDemo, LineComposePattern } from '@/lib/content/hero-line-compose-demos'
import type { CiHeroLayer } from '@/lib/content/ci-hero-variants'
import type { CSSProperties } from 'react'

type HeroLineComposePreviewProps = {
  demo: HeroLineComposeDemo
}

function clipStyle(clip?: CiHeroLayer['clip']): CSSProperties | undefined {
  if (!clip) return undefined
  if (clip === 'left') return { clipPath: 'inset(0 50% 0 0)' }
  if (clip === 'right') return { clipPath: 'inset(0 0 0 50%)' }
  if (clip === 'top') return { clipPath: 'inset(0 0 50% 0)' }
  return { clipPath: 'inset(50% 0 0 0)' }
}

function layerClass(layer: CiHeroLayer): string {
  const parts = ['ci-hero-layer', `ci-layer-${layer.role}`]
  if (layer.enter && layer.enter !== 'none') parts.push(`ci-enter-${layer.enter}`)
  if (layer.clip) parts.push(`ci-clip-${layer.clip}`)
  if (layer.role === 'face-a' || layer.role === 'face-b') parts.push('ci-face-layer')
  if (layer.role.startsWith('stage-')) parts.push('ci-stage-layer')
  if (layer.role === 'poster' || layer.role === 'overlay') {
    parts.push(layer.role === 'overlay' ? 'ci-layer-overlay' : 'ci-poster-layer')
  }
  if (layer.role === 'overlay' || layer.role === 'poster') parts.push('ci-line-wire-overlay')
  return parts.join(' ')
}

function buildConvergeLines(cx: number, cy: number) {
  const pts = [
    [0, 0], [cx, 0], [cx * 2, 0],
    [0, cy], [cx * 2, cy],
    [0, cy * 2], [cx, cy * 2], [cx * 2, cy * 2],
    [cx, 0], [cx * 2, cy], [cx, cy * 2], [0, cy],
  ]
  return pts.map(([x, y]) => `M ${x} ${y} L ${cx} ${cy}`)
}

function buildContourLines(cy: number, w: number) {
  return Array.from({ length: 7 }, (_, i) => {
    const y = 40 + i * (cy / 6)
    return `M -20 ${y} Q ${w * 0.3} ${y - 12} ${w * 0.5} ${y} T ${w + 20} ${y}`
  })
}

function buildGridLines(w: number, h: number) {
  const cx = w / 2
  const cy = h / 2
  return [
    `M 0 0 L ${cx} ${cy}`,
    `M ${w} 0 L ${cx} ${cy}`,
    `M 0 ${h} L ${cx} ${cy}`,
    `M ${w} ${h} L ${cx} ${cy}`,
    `M ${cx} 0 L ${cx} ${cy}`,
    `M ${w} ${cx} L ${cx} ${cy}`,
    `M ${cx} ${h} L ${cx} ${cy}`,
    `M 0 ${cy} L ${cx} ${cy}`,
  ]
}

function LineOverlay({ pattern, uid }: { pattern: LineComposePattern; uid: string }) {
  const w = 400
  const h = 300
  const cx = w / 2
  const cy = h / 2

  const paths = useMemo(() => {
    switch (pattern) {
      case 'converge':
        return buildConvergeLines(cx, cy)
      case 'contour-flow':
      case 'wave-draw':
        return buildContourLines(h, w)
      case 'grid-assemble':
      case 'split-seam':
        return buildGridLines(w, h)
      case 'thread-growth':
        return Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2
          return `M ${cx} ${cy} L ${cx + Math.cos(a) * 220} ${cy + Math.sin(a) * 160}`
        })
      case 'wire-weave':
        return Array.from({ length: 5 }, (_, i) => `M ${cx - 8 + i * 4} 0 L ${cx - 8 + i * 4} ${h}`)
      case 'scan-build':
        return [`M 0 ${cy} L ${w} ${cy}`, `M 0 ${cy - 40} L ${w} ${cy - 40}`, `M 0 ${cy + 40} L ${w} ${cy + 40}`]
      case 'line-story':
        return buildGridLines(w, h).concat(buildContourLines(h, w).slice(0, 3))
      default:
        return []
    }
  }, [pattern, cx, cy, h, w])

  if (pattern === 'electric-bust') return null

  const stroke =
    pattern === 'wave-draw' ? '#38bdf8' : pattern === 'split-seam' ? '#94a3b8' : '#e2e8f0'
  const animClass = `ci-line-overlay-${pattern}`

  return (
    <svg
      className={`ci-line-overlay ${animClass}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-lg`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stroke} stopOpacity="0" />
          <stop offset="50%" stopColor={stroke} stopOpacity="0.85" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={`${pattern}-${i}`}
          d={d}
          fill="none"
          stroke={pattern === 'contour-flow' || pattern === 'wave-draw' ? `url(#${uid}-lg)` : stroke}
          strokeWidth={pattern === 'wire-weave' ? 0.6 : 0.9}
          strokeLinecap="round"
          className="ci-line-overlay-path"
          style={{
            animationDelay: `${i * 0.12}s`,
            opacity: 0.35 + (i % 3) * 0.15,
          }}
        />
      ))}
      {pattern === 'split-seam' || pattern === 'wire-weave' ? (
        <line
          x1={cx}
          y1={24}
          x2={cx}
          y2={h - 24}
          stroke="#f8fafc"
          strokeWidth="1"
          className="ci-line-overlay-seam"
        />
      ) : null}
    </svg>
  )
}

export function HeroLineComposePreview({ demo }: HeroLineComposePreviewProps) {
  const uid = useId().replace(/:/g, '')

  return (
    <div
      className={`ci-hero-preview ci-anim-${demo.animation} ci-line-compose-demo`}
      data-line={demo.id}
      aria-hidden="true"
    >
      {demo.layers.map((layer, i) => (
        <img
          key={`${demo.id}-${layer.role}-${i}`}
          src={layer.src}
          alt=""
          className={layerClass(layer)}
          style={{
            objectFit: layer.fit ?? demo.heroFit,
            animationDelay: layer.delay != null ? `${layer.delay}s` : undefined,
            opacity: layer.opacity,
            ...clipStyle(layer.clip),
          }}
          loading="lazy"
          draggable={false}
        />
      ))}

      <LineOverlay pattern={demo.pattern} uid={uid} />

      <div className="ci-fx ci-fx-scan-v" />
      <div className="ci-fx ci-fx-scan-h" />
      <div className="ci-fx ci-fx-shimmer" />
      <div className="ci-fx ci-fx-bridge" />
      <div className="ci-fx ci-fx-spark" />
    </div>
  )
}
