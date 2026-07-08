import type { CiHeroAnimation, CiHeroLayer } from '@/lib/content/ci-hero-variants'

export type HeroDirectionDemo = {
  id: string
  zh: string
  en: string
  note: string
  /** 動效一句話 */
  motion: string
  animation: CiHeroAnimation
  heroFit: 'cover' | 'contain'
  layers: CiHeroLayer[]
  tags: string[]
  /** 已有全螢幕 Lab 時填入 */
  labPath?: string
}

/** Sally R3 — 15 動畫方向 demo（供使用者挑主視覺） */
export const HERO_DIRECTION_DEMOS: HeroDirectionDemo[] = [
  {
    id: 'D01',
    zh: '方塊橋接',
    en: 'Square Bridge',
    note: 'square_line 場域 + 紅黑雙手上下匯合',
    motion: '方塊透視靜態 · 紅黑手自上下 reach · 中心光縫',
    animation: 'reach-close',
    heroFit: 'contain',
    tags: ['方塊', '紅黑手', '匯合'],
    labPath: '/design-lab/square-bridge',
    layers: [
      { src: '/ci/square_line.png', role: 'background', fit: 'cover' },
      { src: '/ci/red_black_hand_red.svg', role: 'hand-a', fit: 'contain', enter: 'top' },
      { src: '/ci/red_black_hand_black.svg', role: 'hand-b', fit: 'contain', enter: 'bottom' },
    ],
  },
  {
    id: 'D02',
    zh: '半調裂合',
    en: 'Halftone Split',
    note: 'handshake 左右拆解 + 線框浮現',
    motion: '半調左右裂開 → 匯合 · whiteline screen 疊加',
    animation: 'split-reveal',
    heroFit: 'contain',
    tags: ['半調', '線框', '拆解'],
    labPath: '/design-lab/blue-hand',
    layers: [
      { src: '/ci/handshake.png', role: 'hand-a', fit: 'contain', enter: 'left', clip: 'left' },
      { src: '/ci/handshake.png', role: 'hand-b', fit: 'contain', enter: 'right', clip: 'right' },
      { src: '/ci/whitelinehand_1.png', role: 'overlay', fit: 'contain', enter: 'left', clip: 'left', delay: 1.2, opacity: 0.75 },
      { src: '/ci/whitelinehand_2.png', role: 'poster', fit: 'contain', enter: 'right', clip: 'right', delay: 1.2, opacity: 0.75 },
    ],
  },
  {
    id: 'D03',
    zh: '線框 Snap',
    en: 'Wireframe Snap',
    note: '純線框雙手左右彈性靠近',
    motion: 'whiteline 左右入場 · 中心 snap 定格',
    animation: 'connect-snap',
    heroFit: 'contain',
    tags: ['線框', '極簡', 'snap'],
    layers: [
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left' },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right' },
    ],
  },
  {
    id: 'D04',
    zh: '藍紅匯流',
    en: 'Blue Red Merge',
    note: '藍線手 × 彩手左右對接',
    motion: 'blue_line + right_color 匯合 · 觸點 spark',
    animation: 'connect-snap',
    heroFit: 'contain',
    tags: ['藍手', '彩手', '匯合'],
    labPath: '/design-lab/mesh-snap',
    layers: [
      { src: '/ci/blue_line_hand.svg', role: 'hand-a', fit: 'contain', enter: 'left' },
      { src: '/ci/right_color_hand.svg', role: 'hand-b', fit: 'contain', enter: 'right' },
      { src: '/ci/two_color_hand.png', role: 'poster', fit: 'contain', delay: 2.2, opacity: 0.9 },
    ],
  },
  {
    id: 'D05',
    zh: '主 CI 掃描',
    en: 'Handshake Scan',
    note: '半調握手縱向 LiDAR 顯影',
    motion: '掃描線由上而下 · handshake 漸顯',
    animation: 'scan-vertical',
    heroFit: 'contain',
    tags: ['主CI', '掃描', '半調'],
    layers: [{ src: '/ci/handshake.png', role: 'main', fit: 'contain' }],
  },
  {
    id: 'D06',
    zh: '紅黑單色橋',
    en: 'Red Mono Bridge',
    note: '紅手線框 × 黑白寫實上下橋接',
    motion: '紅自上 · 黑自下 · 中心微彈匯合',
    animation: 'reach-close',
    heroFit: 'contain',
    tags: ['紅黑手', '橋接', '對比'],
    layers: [
      { src: '/ci/red_black_hand_red.svg', role: 'hand-a', fit: 'contain', enter: 'top' },
      { src: '/ci/red_black_hand_black.svg', role: 'hand-b', fit: 'contain', enter: 'bottom' },
    ],
  },
  {
    id: 'D07',
    zh: '藍波浮手',
    en: 'Blue Wave Float',
    note: 'blueline 波場 + 藍線手浮動',
    motion: '波場 drift · 藍手 float-y 呼吸',
    animation: 'float-y',
    heroFit: 'cover',
    tags: ['藍波', '單手', '浮動'],
    layers: [
      { src: '/ci/blueline.png', role: 'background', fit: 'cover' },
      { src: '/ci/blue_line_hand.svg', role: 'hand-a', fit: 'contain', enter: 'bottom', delay: 0.4 },
    ],
  },
  {
    id: 'D08',
    zh: '等高線握',
    en: 'Contour Grip',
    note: 'lines 雙層地形 + 線框握手',
    motion: '等高線 parallax · 雙手延遲入場',
    animation: 'parallax-drift',
    heroFit: 'cover',
    tags: ['地形', '線框', '視差'],
    layers: [
      { src: '/ci/lines.png', role: 'background', fit: 'cover' },
      { src: '/ci/lines_2.png', role: 'overlay', fit: 'cover', opacity: 0.4 },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 0.8 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0.8 },
    ],
  },
  {
    id: 'D09',
    zh: '方塊開門',
    en: 'Cube Portal',
    note: '方塊左右拉开露出握手',
    motion: 'square_line split → handshake poster 顯影',
    animation: 'split-reveal',
    heroFit: 'cover',
    tags: ['方塊', '開門', '主CI'],
    layers: [
      { src: '/ci/handshake.png', role: 'poster', fit: 'contain', delay: 1.1 },
      { src: '/ci/square_line.png', role: 'hand-a', fit: 'cover', enter: 'left', clip: 'left' },
      { src: '/ci/squrare_2.png', role: 'hand-b', fit: 'cover', enter: 'right', clip: 'right' },
    ],
  },
  {
    id: 'D10',
    zh: '漩渦線框',
    en: 'Vortex Wire',
    note: 'grow 點陣漩渦 + 線框雙手',
    motion: '漩渦 mesh-breathe · 線框 snap 入場',
    animation: 'mesh-breathe',
    heroFit: 'contain',
    tags: ['漩渦', '線框', '呼吸'],
    layers: [
      { src: '/ci/grow_1.png', role: 'background', fit: 'cover' },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 0.5 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0.5 },
    ],
  },
  {
    id: 'D11',
    zh: '隧道凝視',
    en: 'Tunnel Gaze',
    note: '人臉隧道 crossfade + 握手浮現',
    motion: 'humanface 隧道 ↔ 線框 bust · handshake 延遲',
    animation: 'staged-reveal',
    heroFit: 'contain',
    tags: ['人臉', '隧道', '敘事'],
    layers: [
      { src: '/ci/humanface_2.png', role: 'stage-1', fit: 'contain', delay: 0 },
      { src: '/ci/humanface.png', role: 'stage-2', fit: 'contain', delay: 1 },
      { src: '/ci/handshake.png', role: 'overlay', fit: 'contain', delay: 2.4, opacity: 0.92 },
    ],
  },
  {
    id: 'D12',
    zh: '液態面孔',
    en: 'Liquid Face',
    note: '玻璃臉 crossfade + 伸手',
    motion: 'glassface 紅↔銀 · whitehand 自底浮現',
    animation: 'crossfade',
    heroFit: 'contain',
    tags: ['玻璃', '面孔', '液態'],
    layers: [
      { src: '/ci/glassface_1.png', role: 'face-a', fit: 'contain' },
      { src: '/ci/glassface_2.png', role: 'face-b', fit: 'contain' },
      { src: '/ci/whitehand_3.png', role: 'hand-a', fit: 'contain', enter: 'bottom', delay: 1.2, opacity: 0.88 },
    ],
  },
  {
    id: 'D13',
    zh: 'Tron 紅黑',
    en: 'Tron Emerge',
    note: '透視格柵 + 紅黑雙手 emerge',
    motion: 'grid tunnel march · 紅黑手自上下浮出',
    animation: 'tunnel-march',
    heroFit: 'cover',
    tags: ['Tron', '格柵', '紅黑'],
    layers: [
      { src: '/ci/do it too.jpeg', role: 'background', fit: 'cover' },
      { src: '/ci/red_black_hand_red.svg', role: 'hand-a', fit: 'contain', enter: 'top', delay: 0.9 },
      { src: '/ci/red_black_hand_black.svg', role: 'hand-b', fit: 'contain', enter: 'bottom', delay: 0.9 },
    ],
  },
  {
    id: 'D14',
    zh: '信任光橋',
    en: 'Trust Glow Bridge',
    note: '主 CI 握手 + 中心脈衝光橋',
    motion: 'handshake 常駐 · 中心 glow-bridge 脈衝',
    animation: 'glow-bridge',
    heroFit: 'contain',
    tags: ['主CI', '光橋', '信任'],
    layers: [{ src: '/ci/handshake.png', role: 'main', fit: 'contain' }],
  },
  {
    id: 'D15',
    zh: '極簡黑底線框',
    en: 'Minimal Wire Black',
    note: '純黑 + 線框雙手，零背景干擾',
    motion: '黑底 · whiteline 左右 snap · 最乾淨',
    animation: 'connect-snap',
    heroFit: 'contain',
    tags: ['極簡', '線框', '黑底'],
    layers: [
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left' },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right' },
    ],
  },
]

export function getHeroDirectionDemo(id: string): HeroDirectionDemo | undefined {
  return HERO_DIRECTION_DEMOS.find((d) => d.id === id)
}
