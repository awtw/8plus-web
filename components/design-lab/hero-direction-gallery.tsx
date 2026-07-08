'use client'

import Link from 'next/link'
import { HERO_DIRECTION_DEMOS } from '@/lib/content/hero-direction-demos'
import { HeroDirectionDemoPreview } from '@/components/design-lab/hero-direction-demo-preview'
import { LuminaShell } from '@/components/home/lumina-shell'

export function HeroDirectionGallery() {
  return (
    <LuminaShell>
      <div className="aw-lab aw-lab-hero-directions">
        <div className="section-shell aw-lab-header">
          <p className="aw-lab-eyebrow">Sally · Hero Direction R3</p>
          <h1 className="aw-lab-title">主視覺方向 15 選 1</h1>
          <p className="aw-lab-lead">
            每卡<strong>即時動畫</strong>預覽。請回覆編號（例：<code className="aw-lab-code">D03</code>、<code className="aw-lab-code">D09</code>）。
            有全螢幕 Lab 者可點「滿版 →」細看。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/" className="aw-lab-back">
              ← 首頁
            </Link>
            <Link href="/design-lab/variants" className="aw-lab-back">
              舊 20 款牆
            </Link>
          </div>
        </div>

        <div className="section-shell aw-lab-direction-pick-hint">
          <p>
            挑選標準建議：<span>敘事感</span> · <span>動效節奏</span> · <span>是否適合首屏 100vh</span> ·{' '}
            <span>手機可讀性</span>
          </p>
        </div>

        <div className="section-shell aw-lab-grid-wrap">
          <div className="aw-hero-direction-grid">
            {HERO_DIRECTION_DEMOS.map((demo) => (
              <article key={demo.id} className="aw-hero-direction-card">
                <div className="aw-hero-direction-preview">
                  <HeroDirectionDemoPreview demo={demo} />
                  <span className="aw-hero-direction-id">{demo.id}</span>
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
                  <div className="aw-hero-direction-footer">
                    <span className="aw-hero-direction-assets">
                      {demo.layers
                        .map((l) => l.src.split('/').pop())
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .slice(0, 3)
                        .join(' · ')}
                    </span>
                    {demo.labPath ? (
                      <Link href={demo.labPath} className="aw-hero-direction-lab-link">
                        滿版 →
                      </Link>
                    ) : null}
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
