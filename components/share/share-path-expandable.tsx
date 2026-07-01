'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { CaretDown, Briefcase } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'
import { getPathMilestones } from '@/lib/content/path-milestones'
import { cn } from '@/lib/utils'
import type { ShareHubTheme } from '@/lib/share-hub/themes'

type SharePathExpandableProps = {
  theme: ShareHubTheme
  cardStyle: CSSProperties
  onOpenChange?: (open: boolean) => void
  fillViewport?: boolean
}

export function SharePathExpandable({
  theme,
  cardStyle,
  onOpenChange,
  fillViewport = false,
}: SharePathExpandableProps) {
  const { locale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const milestones = getPathMilestones(locale)

  const toggle = () => {
    const next = !open
    setOpen(next)
    onOpenChange?.(next)
  }

  return (
    <div className={cn(fillViewport && open && 'flex min-h-0 flex-col items-stretch')}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center gap-3 rounded-[1.2rem] border px-4 text-left transition-colors hover:border-[color:var(--share-card-hover)]',
          fillViewport && open ? 'shrink-0 py-2' : 'py-2.5 sm:py-3',
        )}
        style={cardStyle}
      >
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-xl border',
            fillViewport && open ? 'h-9 w-9' : 'h-11 w-11',
          )}
          style={{ borderColor: theme.cardBorder, color: theme.accent }}
        >
          <Briefcase className="h-5 w-5" weight="bold" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{t('shareHub.pathButton')}</span>
          <span className="block text-xs" style={{ color: theme.fgMuted }}>
            {open ? t('shareHub.pathButtonCollapse') : t('shareHub.pathButtonDesc')}
          </span>
        </span>
        <CaretDown
          className="h-5 w-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            color: theme.accent,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          weight="bold"
        />
      </button>

      <div
        className={cn(
          'grid min-h-0 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        )}
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'relative pl-4 pt-1 transition-opacity duration-500',
              open ? 'opacity-100' : 'opacity-0',
              fillViewport && open && 'flex h-full min-h-0 flex-col',
            )}
          >
            <div
              className="absolute bottom-2 left-[7px] top-2 w-px"
              style={{ background: `linear-gradient(180deg, ${theme.accent}, transparent)` }}
              aria-hidden
            />
            <ul
              className={cn(
                'share-path-scroll space-y-3 overflow-y-auto overscroll-contain pr-1.5',
                fillViewport && open
                  ? 'h-[min(70dvh,calc(100dvh-7.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] max-h-[min(70dvh,calc(100dvh-7.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] min-h-0'
                  : 'max-h-[min(32vh,280px)] sm:max-h-[min(40vh,360px)]',
              )}
            >
              {milestones.map((node) => (
                <li key={`${node.year}-${node.title}`} className="relative pl-5">
                  <span
                    className="absolute left-0 top-3 h-3.5 w-3.5 rounded-full border-2"
                    style={{
                      borderColor: theme.accent,
                      background: 'isActive' in node && node.isActive ? theme.accent : theme.cardBg,
                      boxShadow: 'isActive' in node && node.isActive ? `0 0 12px ${theme.glowA}` : undefined,
                    }}
                    aria-hidden
                  />
                  <article
                    className="rounded-[1.1rem] border p-3.5 sm:p-4"
                    style={{ background: theme.cardBg, borderColor: theme.cardBorder }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ background: theme.accentSoft, color: theme.accent }}
                      >
                        {node.year}
                      </span>
                      <span className="text-[11px]" style={{ color: theme.fgMuted }}>
                        {node.period}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-snug" style={{ color: theme.fg }}>
                      {node.title}
                    </h3>
                    <p className="text-xs" style={{ color: theme.fgMuted }}>
                      {node.subtitle}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {node.descriptions.map((line) => (
                        <li key={line} className="flex gap-2 text-xs leading-relaxed" style={{ color: theme.fgMuted }}>
                          <span style={{ color: theme.accent }} aria-hidden>
                            ·
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    {node.tags && node.tags.length > 0 ? (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {node.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{ background: theme.pillBg, color: theme.pillText }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
