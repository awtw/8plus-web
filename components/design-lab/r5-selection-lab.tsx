'use client'

import Link from 'next/link'
import { LuminaShell } from '@/components/home/lumina-shell'

const R5_CARDS = [
  {
    id: 'R5-01',
    title: 'Blueprint Grid Scroll',
    lead: '靜態 square_line 底 · scroll 視差 / lines / 中縫',
    href: '/design-lab/grid-scroll',
    tag: '方格場',
  },
  {
    id: 'R5-05',
    title: 'Portal Split',
    lead: '方格門扇合攏 → scroll 裂開 → handshake 顯影',
    href: '/design-lab/portal-split',
    tag: '門扇',
  },
  {
    id: 'R5-06',
    title: 'Halftone Trust',
    lead: '純黑底 + handshake 半調 · scroll 微 vignette',
    href: '/design-lab/halftone-trust',
    tag: '克制',
  },
] as const

export function R5SelectionLab() {
  return (
    <LuminaShell>
      <div className="aw-lab-r5">
        <header className="section-shell aw-lab-r5-header">
          <p className="aw-lab-eyebrow">Sally · Hero R5 選型</p>
          <h1 className="aw-lab-title">R5-01 + R5-05 + R5-06</h1>
          <p className="aw-lab-lead">
            三條 scroll 敘事 Lab。禁 autoplay 循環、禁紫青漸層粒子。各開 fullscreen 比較。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/design-lab" className="aw-lab-back">
              ← Design Lab
            </Link>
            <Link href="/" className="aw-lab-back aw-lab-back-accent">
              首頁
            </Link>
          </div>
        </header>

        <div className="aw-lab-r5-grid section-shell">
          {R5_CARDS.map((card) => (
            <Link key={card.id} href={card.href} className="aw-lab-r5-card">
              <span className="aw-lab-r5-card-id">{card.id}</span>
              <span className="aw-lab-r5-card-tag">{card.tag}</span>
              <h2 className="aw-lab-r5-card-title">{card.title}</h2>
              <p className="aw-lab-r5-card-lead">{card.lead}</p>
              <span className="aw-lab-r5-card-cta">開啟 fullscreen Lab →</span>
            </Link>
          ))}
        </div>
      </div>
    </LuminaShell>
  )
}
