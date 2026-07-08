export type CiHeroAnimation =
  | 'scan-vertical'
  | 'pulse-glow'
  | 'mesh-breathe'
  | 'stroke-draw'
  | 'orbit-slow'
  | 'scan-horizontal'
  | 'contour-flow'
  | 'reveal-radial'
  | 'drift'
  | 'opacity-breathe'
  | 'parallax-drift'
  | 'zoom-in'
  | 'tunnel-march'
  | 'grid-flicker'
  | 'connect-snap'
  | 'float-y'
  | 'reach-close'
  | 'line-shimmer'
  | 'glow-bridge'
  | 'touch-spark'
  | 'crossfade'
  | 'staged-reveal'
  | 'split-reveal'
  | 'summon'

export type CiHeroLayerEnter = 'left' | 'right' | 'top' | 'bottom' | 'none'

export type CiHeroLayer = {
  src: string
  /** background | hand-a | hand-b | face-a | face-b | overlay | poster */
  role: string
  fit?: 'cover' | 'contain'
  enter?: CiHeroLayerEnter
  delay?: number
  clip?: 'left' | 'right' | 'top' | 'bottom'
  opacity?: number
}

export type CiHeroVariant = {
  id: string
  zh: string
  en: string
  note: string
  animation: CiHeroAnimation
  heroFit: 'cover' | 'contain'
  layers: CiHeroLayer[]
  /** optional end-state composite */
  poster?: string
}

/** Sally R2 — 20 variants from split CI assets */
export const CI_HERO_VARIANTS: CiHeroVariant[] = [
  {
    id: 'V01',
    zh: '線框匯合',
    en: 'Wireframe Converge',
    note: 'whitelinehand_1 + whitelinehand_2 左右入場 snap',
    animation: 'connect-snap',
    heroFit: 'contain',
    layers: [
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left' },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right' },
    ],
  },
  {
    id: 'V02',
    zh: '紅黑橋接',
    en: 'Red Mono Bridge',
    note: 'red_black_hand_red + black SVG 上下 reach',
    animation: 'reach-close',
    heroFit: 'contain',
    layers: [
      { src: '/ci/red_black_hand_red.svg', role: 'hand-a', fit: 'contain', enter: 'top' },
      { src: '/ci/red_black_hand_black.svg', role: 'hand-b', fit: 'contain', enter: 'bottom' },
    ],
  },
  {
    id: 'V03',
    zh: '藍紅 Mesh Snap',
    en: 'Blue Red Mesh Snap',
    note: 'blue_line_hand + right_color_hand 匯合',
    animation: 'connect-snap',
    heroFit: 'contain',
    layers: [
      { src: '/ci/blue_line_hand.svg', role: 'hand-a', fit: 'contain', enter: 'left' },
      { src: '/ci/right_color_hand.svg', role: 'hand-b', fit: 'contain', enter: 'right' },
    ],
    poster: '/ci/two_color_hand.png',
  },
  {
    id: 'V04',
    zh: '主 CI 掃描顯影',
    en: 'Halftone Handshake Scan',
    note: 'handshake.png 縱向掃描顯影',
    animation: 'scan-vertical',
    heroFit: 'contain',
    layers: [{ src: '/ci/handshake.png', role: 'main', fit: 'contain' }],
  },
  {
    id: 'V05',
    zh: '半調×線框拆解',
    en: 'Halftone Wire Split',
    note: 'handshake 左右半拆後匯合',
    animation: 'split-reveal',
    heroFit: 'contain',
    layers: [
      { src: '/ci/handshake.png', role: 'hand-a', fit: 'contain', enter: 'left', clip: 'left' },
      { src: '/ci/handshake.png', role: 'hand-b', fit: 'contain', enter: 'right', clip: 'right' },
    ],
  },
  {
    id: 'V06',
    zh: '側臉守望',
    en: 'Profile Witness',
    note: 'facewithline 背景 + 線框雙手前景',
    animation: 'orbit-slow',
    heroFit: 'cover',
    layers: [
      { src: '/ci/facewithline.png', role: 'background', fit: 'cover' },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 0.6 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0.6 },
    ],
  },
  {
    id: 'V07',
    zh: '隧道凝視',
    en: 'Tunnel Gaze',
    note: 'humanface_2 隧道 ↔ humanface 線框 bust',
    animation: 'crossfade',
    heroFit: 'contain',
    layers: [
      { src: '/ci/humanface_2.png', role: 'face-a', fit: 'contain' },
      { src: '/ci/humanface.png', role: 'face-b', fit: 'contain' },
    ],
  },
  {
    id: 'V08',
    zh: '液態人格',
    en: 'Liquid Persona',
    note: 'glassface_1 紅光 ↔ glassface_2 銀鉻',
    animation: 'crossfade',
    heroFit: 'contain',
    layers: [
      { src: '/ci/glassface_1.png', role: 'face-a', fit: 'contain' },
      { src: '/ci/glassface_2.png', role: 'face-b', fit: 'contain' },
      { src: '/ci/whitehand_3.png', role: 'hand-a', fit: 'contain', enter: 'bottom', delay: 1.2, opacity: 0.85 },
    ],
  },
  {
    id: 'V09',
    zh: '全身線框見證',
    en: 'Full Wire Witness',
    note: 'whiteface 描邊 + handshake 延遲入場',
    animation: 'staged-reveal',
    heroFit: 'contain',
    layers: [
      { src: '/ci/whiteface.png', role: 'background', fit: 'contain', delay: 0 },
      { src: '/ci/handshake.png', role: 'overlay', fit: 'contain', delay: 1.5, opacity: 0.9 },
    ],
  },
  {
    id: 'V10',
    zh: '點陣漩渦握手',
    en: 'Dot Vortex Handshake',
    note: 'grow_1 漩渦背景 + 線框雙手',
    animation: 'mesh-breathe',
    heroFit: 'contain',
    layers: [
      { src: '/ci/grow_1.png', role: 'background', fit: 'cover' },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 0.5 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0.5 },
    ],
  },
  {
    id: 'V11',
    zh: '雙漩渦對話',
    en: 'Dual Vortex Merge',
    note: 'grow_1 + grow_2 合併 → two_color_hand',
    animation: 'reveal-radial',
    heroFit: 'contain',
    layers: [
      { src: '/ci/grow_1.png', role: 'face-a', fit: 'cover', clip: 'left' },
      { src: '/ci/grow_2.png', role: 'face-b', fit: 'cover', clip: 'right' },
      { src: '/ci/two_color_hand.png', role: 'poster', fit: 'contain', delay: 2 },
    ],
  },
  {
    id: 'V12',
    zh: '等高線地形',
    en: 'Contour Terrain',
    note: 'lines 雙層 parallax + 藍彩雙手',
    animation: 'parallax-drift',
    heroFit: 'cover',
    layers: [
      { src: '/ci/lines.png', role: 'background', fit: 'cover' },
      { src: '/ci/lines_2.png', role: 'overlay', fit: 'cover', opacity: 0.45 },
      { src: '/ci/blue_line_hand.svg', role: 'hand-a', fit: 'contain', enter: 'left', delay: 0.8 },
      { src: '/ci/right_color_hand.svg', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0.8 },
    ],
  },
  {
    id: 'V13',
    zh: '方塊透視開門',
    en: 'Cube Portal Open',
    note: 'square_line 左右 split 露出 handshake',
    animation: 'split-reveal',
    heroFit: 'cover',
    layers: [
      { src: '/ci/handshake.png', role: 'poster', fit: 'contain', delay: 1.2 },
      { src: '/ci/square_line.png', role: 'hand-a', fit: 'cover', enter: 'left', clip: 'left' },
      { src: '/ci/squrare_2.png', role: 'hand-b', fit: 'cover', enter: 'right', clip: 'right' },
    ],
  },
  {
    id: 'V14',
    zh: '藍線波場',
    en: 'Blue Wave Field',
    note: 'blueline 波場 + 線框雙手',
    animation: 'contour-flow',
    heroFit: 'cover',
    layers: [
      { src: '/ci/blueline.png', role: 'background', fit: 'cover' },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 0.7 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0.7 },
    ],
  },
  {
    id: 'V15',
    zh: 'Tron 隧道',
    en: 'Tron Tunnel',
    note: 'do it too grid + 紅黑雙手 emerge',
    animation: 'tunnel-march',
    heroFit: 'cover',
    layers: [
      { src: '/ci/do it too.jpeg', role: 'background', fit: 'cover' },
      { src: '/ci/red_black_hand_red.svg', role: 'hand-a', fit: 'contain', enter: 'top', delay: 0.9 },
      { src: '/ci/red_black_hand_black.svg', role: 'hand-b', fit: 'contain', enter: 'bottom', delay: 0.9 },
    ],
  },
  {
    id: 'V16',
    zh: '信任光橋',
    en: 'Trust Light Bridge',
    note: 'handshake + 中心光橋脈衝',
    animation: 'glow-bridge',
    heroFit: 'contain',
    layers: [{ src: '/ci/handshake.png', role: 'main', fit: 'contain' }],
  },
  {
    id: 'V17',
    zh: '召喚之手',
    en: 'Summoned Hand',
    note: 'whitehand_3 常駐 → whitelinehand_2 浮現',
    animation: 'summon',
    heroFit: 'contain',
    layers: [
      { src: '/ci/whitehand_3.png', role: 'hand-a', fit: 'contain' },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 1.4 },
    ],
  },
  {
    id: 'V18',
    zh: '掃描配對',
    en: 'Lidar Pairing',
    note: '線框雙手 + 掃描線 materialize',
    animation: 'scan-vertical',
    heroFit: 'contain',
    layers: [
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 1 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 0 },
    ],
  },
  {
    id: 'V19',
    zh: 'CI 全譜章',
    en: 'CI Full Story',
    note: 'humanface → square → 雙手 → handshake 分鏡',
    animation: 'staged-reveal',
    heroFit: 'contain',
    layers: [
      { src: '/ci/humanface.png', role: 'stage-1', fit: 'contain', delay: 0 },
      { src: '/ci/square_line.png', role: 'stage-2', fit: 'cover', delay: 1 },
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left', delay: 2 },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right', delay: 2 },
      { src: '/ci/handshake.png', role: 'poster', fit: 'contain', delay: 3.2 },
    ],
  },
  {
    id: 'V20',
    zh: '極簡握手',
    en: 'Minimal Handshake',
    note: '純黑 + 線框雙手，無背景裝飾',
    animation: 'connect-snap',
    heroFit: 'contain',
    layers: [
      { src: '/ci/whitelinehand_1.png', role: 'hand-a', fit: 'contain', enter: 'left' },
      { src: '/ci/whitelinehand_2.png', role: 'hand-b', fit: 'contain', enter: 'right' },
    ],
  },
]

export function getCiHeroVariant(id: string): CiHeroVariant | undefined {
  return CI_HERO_VARIANTS.find((v) => v.id === id)
}
