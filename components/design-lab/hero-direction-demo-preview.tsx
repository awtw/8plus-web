'use client'

import type { CSSProperties } from 'react'
import type { HeroDirectionDemo } from '@/lib/content/hero-direction-demos'
import type { CiHeroLayer } from '@/lib/content/ci-hero-variants'

type HeroDirectionDemoPreviewProps = {
  demo: HeroDirectionDemo
}

function clipStyle(clip?: CiHeroLayer['clip']): CSSProperties | undefined {
  if (!clip) return undefined
  if (clip === 'left') return { clipPath: 'inset(0 50% 0 0)' }
  if (clip === 'right') return { clipPath: 'inset(0 0 0 50%)' }
  if (clip === 'top') return { clipPath: 'inset(0 0 50% 0)' }
  return { clipPath: 'inset(50% 0 0 0)' }
}

function layerClass(layer: CiHeroLayer, demo: HeroDirectionDemo): string {
  const parts = ['ci-hero-layer', `ci-layer-${layer.role}`]
  if (layer.enter && layer.enter !== 'none') parts.push(`ci-enter-${layer.enter}`)
  if (layer.clip) parts.push(`ci-clip-${layer.clip}`)
  if (layer.role === 'face-a' || layer.role === 'face-b') parts.push('ci-face-layer')
  if (layer.role.startsWith('stage-')) parts.push('ci-stage-layer')
  if (layer.role === 'poster' || layer.role === 'overlay') {
    parts.push(layer.role === 'overlay' ? 'ci-layer-overlay' : 'ci-poster-layer')
  }
  if (demo.id === 'D02' && (layer.role === 'overlay' || layer.role === 'poster')) {
    parts.push('ci-direction-wire-overlay')
  }
  return parts.join(' ')
}

export function HeroDirectionDemoPreview({ demo }: HeroDirectionDemoPreviewProps) {
  return (
    <div
      className={`ci-hero-preview ci-anim-${demo.animation} ci-direction-demo`}
      data-direction={demo.id}
      aria-hidden="true"
    >
      {demo.layers.map((layer, i) => (
        <img
          key={`${demo.id}-${layer.role}-${i}`}
          src={layer.src}
          alt=""
          className={layerClass(layer, demo)}
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

      <div className="ci-fx ci-fx-scan-v" />
      <div className="ci-fx ci-fx-scan-h" />
      <div className="ci-fx ci-fx-pulse" />
      <div className="ci-fx ci-fx-orbit" />
      <div className="ci-fx ci-fx-shimmer" />
      <div className="ci-fx ci-fx-bridge" />
      <div className="ci-fx ci-fx-spark" />

      {demo.id === 'D01' ? <div className="ci-direction-seam ci-direction-seam-red" /> : null}
      {demo.id === 'D14' ? <div className="ci-direction-bridge-pulse" /> : null}
    </div>
  )
}
