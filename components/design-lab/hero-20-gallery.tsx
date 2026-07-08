'use client'

import Link from 'next/link'
import { CI_HERO_VARIANTS } from '@/lib/content/ci-hero-variants'
import { CiHeroVariantPreview } from '@/components/design-lab/ci-hero-variant-preview'
import { LuminaShell } from '@/components/home/lumina-shell'

export function Hero20Gallery() {
  return (
    <LuminaShell>
      <div className="aw-lab aw-lab-hero20">
        <div className="section-shell aw-lab-header">
          <p className="aw-lab-eyebrow">Sally · CI Asset Gallery</p>
          <h1 className="aw-lab-title">Hero 主視覺 20 選 1</h1>
          <p className="aw-lab-lead">
            基於 <code className="aw-lab-code">public/ci/</code> 原圖改製 SVG + 動效。
            每張卡 = 原圖資產，非程式生成幾何。請回覆編號（例：V01、V15）。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/" className="aw-lab-back">
              ← 返回首頁
            </Link>
            <Link href="/design-lab/handshake" className="aw-lab-back aw-lab-back-accent">
              握手 Lab →
            </Link>
          </div>
        </div>

        <div className="section-shell aw-lab-grid-wrap">
          <div className="aw-hero20-grid">
            {CI_HERO_VARIANTS.map((variant) => (
              <article key={variant.id} className="aw-hero20-card aw-hero20-card-live">
                <div className="aw-hero20-preview aw-hero20-preview--ci">
                  <CiHeroVariantPreview variant={variant} />
                  <span className="aw-hero20-id">{variant.id}</span>
                </div>
                <div className="aw-hero20-copy">
                  <h3 className="aw-hero20-name">{variant.zh}</h3>
                  <p className="aw-hero20-sub">{variant.en}</p>
                  <p className="aw-hero20-note">{variant.note}</p>
                  <p className="aw-hero20-asset">
                    <span>{variant.layers[0]?.src ?? variant.poster ?? '—'}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </LuminaShell>
  )
}
