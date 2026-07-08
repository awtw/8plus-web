'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HeroCanvasStage } from '@/components/home/hero-canvas-stage'
import { HeroLogoCinema } from '@/components/home/hero-logo-cinema'
import { HERO_VISUAL_MODES, parseHeroVisualMode } from '@/lib/hero/visual-modes'
import { LuminaShell } from '@/components/home/lumina-shell'

const PLANNED_STYLES = [
  { id: 'shader-aurora', name: 'Shader Aurora', nameZh: '極光 Shader' },
  { id: 'wireframe-morph', name: 'Wireframe Morph', nameZh: '線框成形' },
  { id: 'glitch-rgb', name: 'Glitch RGB Split', nameZh: '故障色差' },
  { id: 'holographic-foil', name: 'Holographic Foil', nameZh: '全息箔片' },
  { id: 'ink-bleed', name: 'Ink Bleed', nameZh: '墨水暈染' },
  { id: 'lidar-scan', name: 'LiDAR Scan', nameZh: '雷射掃描' },
  { id: 'elastic-blob', name: 'Elastic Blob', nameZh: '彈性融球' },
  { id: 'orbital-rings', name: 'Orbital Rings', nameZh: '軌道環系' },
  { id: 'ascii-reveal', name: 'ASCII Reveal', nameZh: 'ASCII 顯影' },
  { id: 'cinematic-zoom', name: 'Cinematic Zoom', nameZh: '電影推進' },
  { id: 'bauhaus-build', name: 'Bauhaus Build', nameZh: '包浩斯組裝' },
  { id: 'depth-parallax', name: 'Depth Parallax', nameZh: '深度視差' },
  { id: 'glass-prism', name: 'Glass Prism', nameZh: '玻璃棱鏡' },
  { id: 'neon-trace', name: 'Neon Trace', nameZh: '霓虹描邊' },
  { id: 'kinetic-type', name: 'Kinetic Typography', nameZh: '動態字標' },
  { id: 'liquid-metal', name: 'Liquid Metal', nameZh: '液態金屬' },
] as const

export default function DesignLabClient() {
  const searchParams = useSearchParams()
  const activeMode = useMemo(
    () => parseHeroVisualMode(searchParams.get('style')),
    [searchParams],
  )

  const activeMeta = HERO_VISUAL_MODES.find((m) => m.id === activeMode)

  return (
    <LuminaShell>
      <div className="aw-lab">
        <div className="section-shell aw-lab-header">
          <p className="aw-lab-eyebrow">8plus Design Lab</p>
          <h1 className="aw-lab-title">Hero 主視覺風格測試</h1>
          <p className="aw-lab-lead">
            Canvas 2D 粒子風格（5 種）。Phase 4 線框手三方向請至{' '}
            <Link href="/design-lab" className="aw-lab-code">
              /design-lab
            </Link>
            。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/" className="aw-lab-back">
              ← 返回首頁
            </Link>
            <Link href="/design-lab" className="aw-lab-back aw-lab-back-accent">
              Phase 4 三方向滿版 Lab →
            </Link>
          </div>
        </div>

        <div className="aw-lab-preview aw-lab-preview--bleed">
          {activeMode === 'logo-cinema' ? (
            <HeroLogoCinema key="logo-cinema" />
          ) : (
            <HeroCanvasStage key={activeMode} mode={activeMode} showFallbackLogo={false} />
          )}
          <div className="aw-lab-preview-label">
            {activeMeta?.nameZh} · {activeMeta?.name}
          </div>
        </div>

        <div className="section-shell aw-lab-grid-wrap">
          <h2 className="aw-lab-section-title">可測試（已實作）</h2>
          <div className="aw-lab-grid">
            {HERO_VISUAL_MODES.map((style) => (
              <Link
                key={style.id}
                href={style.labPath}
                className={`aw-lab-card ${activeMode === style.id ? 'aw-lab-card-active' : ''}`}
              >
                <span className="aw-lab-card-id">{style.id}</span>
                <span className="aw-lab-card-name">{style.nameZh}</span>
                <span className="aw-lab-card-sub">{style.name}</span>
                <span className="aw-lab-card-badge">Live</span>
              </Link>
            ))}
          </div>

          <h2 className="aw-lab-section-title aw-lab-section-title-spaced">待實作（規格已寫）</h2>
          <div className="aw-lab-grid">
            {PLANNED_STYLES.map((style) => (
              <div key={style.id} className="aw-lab-card aw-lab-card-planned">
                <span className="aw-lab-card-id">{style.id}</span>
                <span className="aw-lab-card-name">{style.nameZh}</span>
                <span className="aw-lab-card-sub">{style.name}</span>
                <span className="aw-lab-card-badge aw-lab-card-badge-muted">Planned</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LuminaShell>
  )
}
