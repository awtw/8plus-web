import type { CiHeroLayer } from '@/lib/content/ci-hero-variants'

export type LineComposePattern =
  | 'converge'
  | 'contour-flow'
  | 'grid-assemble'
  | 'wave-draw'
  | 'wire-weave'
  | 'scan-build'
  | 'thread-growth'
  | 'split-seam'
  | 'electric-bust'
  | 'line-story'

export type HeroLineComposeDemo = {
  id: string
  zh: string
  en: string
  note: string
  motion: string
  pattern: LineComposePattern
  animation: string
  heroFit: 'cover' | 'contain'
  layers: CiHeroLayer[]
  tags: string[]
}

/** Sally R4 — 線條組構 10 demo */
export const HERO_LINE_COMPOSE_DEMOS: HeroLineComposeDemo[] = [
  {
    id: 'L01',
    zh: '線條匯聚',
    en: 'Line Converge',
    note: '邊緣線匯入中心 → 線框 snap',
    motion: '12 股 procedural 線匯聚 · whiteline 左右入場',
    pattern: 'converge',
    animation: 'connect-snap',
    heroFit: 'contain',
    tags: ['匯聚', '線框', 'snap'],
    layers: [
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 1.4 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 1.4 },
    ],
  },
  {
    id: 'L02',
    zh: '等高線流',
    en: 'Contour Flow',
    note: '地形線雙層流動 + 流線 SVG',
    motion: 'lines 視差 · 水平流線掃過 · 線框握手',
    pattern: 'contour-flow',
    animation: 'parallax-drift',
    heroFit: 'cover',
    tags: ['等高線', '流場', '握手'],
    layers: [
      { src: '/ci/lines.png', role: 'background', fit: 'cover' },
      { src: '/ci/lines_2.png', role: 'overlay', fit: 'cover', opacity: 0.42 },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 1.2 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 1.2 },
    ],
  },
  {
    id: 'L03',
    zh: '方塊組裝',
    en: 'Grid Assemble',
    note: '透視格四向入場後露出握手',
    motion: '方格線 slide-in 組裝 · handshake 顯影',
    pattern: 'grid-assemble',
    animation: 'split-reveal',
    heroFit: 'cover',
    tags: ['方塊', '組裝', '開門'],
    layers: [
      { src: '/ci/handshake.png', role: 'poster', fit: 'contain', delay: 1.3 },
      { src: '/ci/square_line.png', role: 'hand-a', fit: 'cover', enter: 'left', clip: 'left' },
      { src: '/ci/squrare_2.png', role: 'hand-b', fit: 'cover', enter: 'right', clip: 'right' },
    ],
  },
  {
    id: 'L04',
    zh: '藍波描繪',
    en: 'Blue Wave Draw',
    note: '波束橫掃後藍線手浮現',
    motion: 'blueline 波場 · 波束 SVG 描繪 · 藍手 fade-in',
    pattern: 'wave-draw',
    animation: 'float-y',
    heroFit: 'cover',
    tags: ['藍波', '描繪', '藍手'],
    layers: [
      { src: '/ci/blueline.png', role: 'background', fit: 'cover' },
      { src: '/ci/blue_line_hand.svg', role: 'hand-a', fit: 'contain', enter: 'bottom', delay: 1.6, opacity: 0.95 },
    ],
  },
  {
    id: 'L05',
    zh: '線框織合',
    en: 'Wire Weave',
    note: '中央豎向 shimmer 織合雙手',
    motion: '中縫 shimmer · whiteline 匯合織合',
    pattern: 'wire-weave',
    animation: 'line-shimmer',
    heroFit: 'contain',
    tags: ['織合', 'shimmer', '線框'],
    layers: [
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 0.8 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0.8 },
    ],
  },
  {
    id: 'L06',
    zh: '掃描成形',
    en: 'Scan Build',
    note: 'LiDAR 掃描線建構握手',
    motion: '橫掃描線 + 線條框建 · handshake 顯影',
    pattern: 'scan-build',
    animation: 'scan-vertical',
    heroFit: 'contain',
    tags: ['掃描', 'LiDAR', '主CI'],
    layers: [{ src: '/ci/handshake.png', role: 'main', fit: 'contain' }],
  },
  {
    id: 'L07',
    zh: '電流線人像',
    en: 'Electric Bust',
    note: 'humanface_svg 電流漸層線圈',
    motion: '向量線框圈層 · 電流 gradient 流動',
    pattern: 'electric-bust',
    animation: 'opacity-breathe',
    heroFit: 'contain',
    tags: ['人像', '電流', '向量'],
    layers: [{ src: '/ci/humanface_svg.svg', role: 'main', fit: 'contain' }],
  },
  {
    id: 'L08',
    zh: '透視裂合',
    en: 'Grid Split Seam',
    note: '方格裂縫 + 半調線框合攏',
    motion: 'square 左右裂 · 中縫光帶 · handshake+線框',
    pattern: 'split-seam',
    animation: 'split-reveal',
    heroFit: 'contain',
    tags: ['裂合', '方格', '半調'],
    layers: [
      { src: '/ci/handshake.png', role: 'hand-a', fit: 'contain', enter: 'left', clip: 'left' },
      { src: '/ci/handshake.png', role: 'hand-b', fit: 'contain', enter: 'right', clip: 'right' },
      { src: '/ci/square_line.png', role: 'background', fit: 'cover', opacity: 0.45 },
      { src: '/ci/whitelinehand_1.png', role: 'overlay', fit: 'contain', enter: 'left', clip: 'left', delay: 1.4, opacity: 0.7 },
      { src: '/ci/whitelinehand_2.png', role: 'poster', fit: 'contain', enter: 'right', clip: 'right', delay: 1.4, opacity: 0.7 },
    ],
  },
  {
    id: 'L09',
    zh: '絲線生長',
    en: 'Thread Growth',
    note: '放射絲線自中心生長 + 線框入場',
    motion: 'grow 漩渦 · 放射線生長 · whiteline snap',
    pattern: 'thread-growth',
    animation: 'mesh-breathe',
    heroFit: 'contain',
    tags: ['絲線', '生長', '漩渦'],
    layers: [
      { src: '/ci/grow_1.png', role: 'background', fit: 'cover' },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 1.5 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 1.5 },
    ],
  },
  {
    id: 'L10',
    zh: '藍圖全譜',
    en: 'Blueprint Story',
    note: '方格→等高線→線框→握手 四幕',
    motion: '線條場分鏡接力 · 終局 handshake',
    pattern: 'line-story',
    animation: 'staged-reveal',
    heroFit: 'contain',
    tags: ['敘事', '分鏡', '全譜'],
    layers: [
      { src: '/ci/square_line.png', role: 'stage-1', fit: 'cover', delay: 0 },
      { src: '/ci/lines.png', role: 'stage-2', fit: 'cover', delay: 1 },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 2 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 2 },
      { src: '/ci/handshake.png', role: 'overlay', fit: 'contain', delay: 3, opacity: 0.92 },
    ],
  },
]

export function getHeroLineComposeDemo(id: string): HeroLineComposeDemo | undefined {
  return HERO_LINE_COMPOSE_DEMOS.find((d) => d.id === id)
}
