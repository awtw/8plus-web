'use client'

import Link from 'next/link'
import { HERO_LINE_COMPOSE_DEMOS } from '@/lib/content/hero-line-compose-demos'
import { HeroLineComposePreview } from '@/components/design-lab/hero-line-compose-preview'
import { LuminaShell } from '@/components/home/lumina-shell'

export function HeroLineComposeGallery() {
  return (
    <LuminaShell>
      <div className="aw-lab aw-lab-line-compose">
        <div className="section-shell aw-lab-header">
          <p className="aw-lab-eyebrow">Sally · Line Compose R4</p>
          <h1 className="aw-lab-title">線條組構 — 10 選 1</h1>
          <p className="aw-lab-lead">
            用<strong>線的動態</strong>湊成完整主視覺。每卡含 procedural 線條動畫 + CI 原圖顯影。
            回覆 <code className="aw-lab-code">L01</code>–<code className="aw-lab-code">L10</code>。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/design-lab/directions" className="aw-lab-back">
              ← R3 方向牆
            </Link>
            <Link href="/" className="aw-lab-back aw-lab-back-accent">
              首頁
            </Link>
          </div>
        </div>

        <div className="section-shell aw-lab-line-compose-thesis">
          <p>
            設計命題：<span>線條先行</span> → <span>形體顯影</span> → <span>一鏡到底</span>
          </p>
        </div>

        <div className="section-shell aw-lab-grid-wrap">
          <div className="aw-hero-direction-grid">
            {HERO_LINE_COMPOSE_DEMOS.map((demo) => (
              <article key={demo.id} className="aw-hero-direction-card aw-hero-line-compose-card">
                <div className="aw-hero-direction-preview">
                  <HeroLineComposePreview demo={demo} />
                  <span className="aw-hero-direction-id">{demo.id}</span>
                  <span className="aw-hero-line-pattern">{demo.pattern}</span>
                </div>
                <div className="aw-hero-direction-copy">
                  <h3 className="aw-hero-direction-name">{demo.zh}</h3>
                  <p className="aw-hero-direction-sub">{demo.en}</p>
                  <p className="aw-hero-direction-motion">{demo.motion}</p>
                  <p className="aw-hero-direction-note">{demo.note}</p>
                  <div className="aw-hero-direction-tags">
                    {demo.tags.map((tag) => (
                      <span key={tag} className="aw-hero-direction-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </LuminaShell>
  )
}
