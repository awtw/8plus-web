'use client'

import { useLanguage } from '@/components/language-provider'

const nodes = [
  { id: 'req', x: 24, y: 28 },
  { id: 'arch', x: 120, y: 16 },
  { id: 'ai', x: 216, y: 28 },
  { id: 'ux', x: 168, y: 88 },
  { id: 'ship', x: 264, y: 88 },
] as const

type ArchitectureDiagramProps = {
  variant?: 'card' | 'overlay'
}

export function ArchitectureDiagram({ variant = 'card' }: ArchitectureDiagramProps) {
  const { t } = useLanguage()
  const labels = t('home.architectureNodes').split('|')
  const isOverlay = variant === 'overlay'

  const svg = (
    <svg
      viewBox="0 0 300 120"
      className={isOverlay ? 'h-full w-full opacity-70' : 'h-auto w-full'}
      role="img"
      aria-label={t('home.architectureLabel')}
    >
      <defs>
        <linearGradient id="editorial-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(91,141,255,0.15)" />
          <stop offset="50%" stopColor="rgba(91,141,255,0.65)" />
          <stop offset="100%" stopColor="rgba(14,165,233,0.35)" />
        </linearGradient>
      </defs>

      <path
        d="M 48 40 L 96 32 L 144 40 L 192 32 L 240 40 M 144 40 L 168 72 L 216 72 L 264 72"
        fill="none"
        stroke="url(#editorial-line)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      {nodes.map((node, index) => (
        <g key={node.id}>
          <rect
            x={node.x - 22}
            y={node.y - 14}
            width="44"
            height="28"
            rx="6"
            fill={isOverlay ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'}
            stroke="rgba(91,141,255,0.35)"
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill={isOverlay ? '#b8c9ef' : '#e8efff'}
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            {labels[index]}
          </text>
        </g>
      ))}
    </svg>
  )

  if (isOverlay) {
    return svg
  }

  return (
    <div className="lumina-glass p-4 sm:p-5">
      <p className="lumina-display-condensed mb-3">{t('home.architectureLabel')}</p>
      {svg}
    </div>
  )
}
