'use client'

import type { CiHeroLayer, CiHeroVariant } from '@/lib/content/ci-hero-variants'

type CiHeroVariantPreviewProps = {
  variant: CiHeroVariant
}

function clipStyle(clip?: CiHeroLayer['clip']): React.CSSProperties | undefined {
  if (!clip) return undefined
  if (clip === 'left') return { clipPath: 'inset(0 50% 0 0)' }
  if (clip === 'right') return { clipPath: 'inset(0 0 0 50%)' }
  if (clip === 'top') return { clipPath: 'inset(0 0 50% 0)' }
  return { clipPath: 'inset(50% 0 0 0)' }
}

function layerClass(layer: CiHeroLayer, variant: CiHeroVariant): string {
  const parts = ['ci-hero-layer', `ci-layer-${layer.role}`]
  if (layer.enter && layer.enter !== 'none') {
    parts.push(`ci-enter-${layer.enter}`)
  }
  if (layer.clip) parts.push(`ci-clip-${layer.clip}`)
  if (layer.role === 'face-a' || layer.role === 'face-b') parts.push('ci-face-layer')
  if (layer.role.startsWith('stage-')) parts.push('ci-stage-layer')
  if (layer.role === 'poster') parts.push('ci-poster-layer')
  if (variant.animation === 'summon' && layer.role === 'hand-b') parts.push('ci-summon-target')
  return parts.join(' ')
}

export function CiHeroVariantPreview({ variant }: CiHeroVariantPreviewProps) {
  return (
    <div
      className={`ci-hero-preview ci-anim-${variant.animation}`}
      data-variant={variant.id}
      aria-hidden="true"
    >
      {variant.layers.map((layer, i) => (
        <img
          key={`${variant.id}-${layer.role}-${i}`}
          src={layer.src}
          alt=""
          className={layerClass(layer, variant)}
          style={{
            objectFit: layer.fit ?? variant.heroFit,
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
    </div>
  )
}
