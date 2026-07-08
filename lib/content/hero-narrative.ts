export type HeroNarrativeLocale = 'zh-TW' | 'en'

export type HeroNarrativePhaseCopy = {
  eyebrow: string
  title: string
  lead: string
}

export type HeroNarrativeContent = {
  void: {
    tag: string
    eyebrow: string
    brand: string
  }
  mesh: HeroNarrativePhaseCopy
  reach: HeroNarrativePhaseCopy
  handshake: HeroNarrativePhaseCopy
  manifesto: {
    eyebrow: string
    modules: Array<{ mark: string; title: string; description: string }>
  }
  portal: {
    eyebrow: string
    title: string
    links: Array<{ href: string; label: string }>
    bookingCta: string
  }
}

const copy: Record<HeroNarrativeLocale, HeroNarrativeContent> = {
  'zh-TW': {
    void: {
      tag: '8PLUS.APP',
      eyebrow: 'PRECISION · ENGINEERING',
      brand: '8plus',
    },
    mesh: {
      eyebrow: '01 · MESH',
      title: '數位構築',
      lead: '線框右手自掃描顯影 — 架構由此成形。',
    },
    reach: {
      eyebrow: '02 · REACH',
      title: 'ARCHITECTURE / LED / PARTNER',
      lead: '伸出手，邀請你一起定義系統邊界。',
    },
    handshake: {
      eyebrow: '03 · HANDSHAKE',
      title: '一起把系統做成',
      lead: '8plus 與你並肩交付 — 從決策到上線。',
    },
    manifesto: {
      eyebrow: '04 · MANIFESTO',
      modules: [
        { mark: 'A', title: '架構先行', description: '系統邊界、技術選型、可擴展設計' },
        { mark: 'B', title: 'AI 工作流', description: '把 AI 嵌進真實流程，而非展示用' },
        { mark: 'C', title: '體驗落地', description: 'Next.js 生產級模式、Code Review、迭代上線' },
      ],
    },
    portal: {
      eyebrow: '05 · PORTAL',
      title: '探索更多',
      links: [
        { href: '/lab', label: 'Lab' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/path', label: 'Path' },
        { href: '/blog', label: 'Blog' },
        { href: '/booking', label: 'Booking' },
      ],
      bookingCta: '預約 30 分鐘諮詢',
    },
  },
  en: {
    void: {
      tag: '8PLUS.APP',
      eyebrow: 'PRECISION · ENGINEERING',
      brand: '8plus',
    },
    mesh: {
      eyebrow: '01 · MESH',
      title: 'Digital assembly',
      lead: 'Wireframe hand revealed by scan — architecture takes form.',
    },
    reach: {
      eyebrow: '02 · REACH',
      title: 'ARCHITECTURE / LED / PARTNER',
      lead: 'An open hand — inviting you to define system boundaries together.',
    },
    handshake: {
      eyebrow: '03 · HANDSHAKE',
      title: 'Build the system together',
      lead: '8plus ships alongside you — from decisions to production.',
    },
    manifesto: {
      eyebrow: '04 · MANIFESTO',
      modules: [
        { mark: 'A', title: 'Architecture first', description: 'Boundaries, stack choices, scalable design' },
        { mark: 'B', title: 'AI workflows', description: 'Embed AI in real processes, not demos' },
        { mark: 'C', title: 'Experience delivery', description: 'Production Next.js, code review, iterative shipping' },
      ],
    },
    portal: {
      eyebrow: '05 · PORTAL',
      title: 'Explore further',
      links: [
        { href: '/lab', label: 'Lab' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/path', label: 'Path' },
        { href: '/blog', label: 'Blog' },
        { href: '/booking', label: 'Booking' },
      ],
      bookingCta: 'Book a 30-min call',
    },
  },
}

export function getHeroNarrativeContent(locale: HeroNarrativeLocale): HeroNarrativeContent {
  return copy[locale] ?? copy['zh-TW']
}

export const HERO_NARRATIVE_CHAPTER_IDS = ['void', 'hand', 'manifesto', 'portal'] as const
