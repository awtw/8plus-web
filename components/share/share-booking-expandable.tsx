'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { CalendarCheck, CaretDown } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'
import type { ShareHubTheme } from '@/lib/share-hub/themes'

const CAL_NAMESPACE = '30min'
const CAL_LINK = 'august-wang-113/30min'

const PANEL_HEIGHT =
  'min(70dvh,calc(100dvh-7.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom)))'

type ShareBookingExpandableProps = {
  theme: ShareHubTheme
  cardStyle: CSSProperties
  name: string
  description?: string
  onOpenChange?: (open: boolean) => void
  fillViewport?: boolean
  calBrandColor?: string
}

export function ShareBookingExpandable({
  theme,
  cardStyle,
  name,
  description,
  onOpenChange,
  fillViewport = false,
  calBrandColor = '#FE5000',
}: ShareBookingExpandableProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [calReady, setCalReady] = useState(false)

  const toggle = () => {
    const next = !open
    setOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!open) return

    let cancelled = false
    ;(async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE })
        if (cancelled) return
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
          styles: {
            branding: {
              brandColor: calBrandColor,
            },
          },
        })
        setCalReady(true)
      } catch (error) {
        console.error('Failed to load booking calendar:', error)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [open, calBrandColor])

  const calHeight = fillViewport && open ? PANEL_HEIGHT : 'min(480px,58dvh)'

  return (
    <div
      className={cn(
        fillViewport && open && 'flex min-h-0 flex-1 flex-col items-stretch',
      )}
    >
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
          <CalendarCheck className="h-5 w-5" weight="bold" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{name}</span>
          <span className="block text-xs" style={{ color: theme.fgMuted }}>
            {open ? t('shareHub.pathButtonCollapse') : description}
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
        className="grid min-h-0 transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'pt-1 transition-opacity duration-500',
              open ? 'opacity-100' : 'opacity-0',
              fillViewport && open && 'flex h-full min-h-0 flex-col',
            )}
          >
            <div
              className={cn(
                'share-booking-cal min-h-0 overflow-y-auto overscroll-contain rounded-[1.1rem] border bg-white [-webkit-overflow-scrolling:touch]',
                !(fillViewport && open) && 'max-h-[min(62dvh,520px)]',
              )}
              style={{
                borderColor: theme.cardBorder,
                ...(fillViewport && open
                  ? { height: PANEL_HEIGHT, maxHeight: PANEL_HEIGHT }
                  : undefined),
              }}
            >
              {open && !calReady ? (
                <div
                  className="flex items-center justify-center"
                  style={{ height: calHeight, minHeight: '12rem' }}
                >
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-700" />
                    <p className="text-sm text-neutral-500">{t('booking.loading')}</p>
                  </div>
                </div>
              ) : null}
              {open ? (
                <Cal
                  namespace={CAL_NAMESPACE}
                  calLink={CAL_LINK}
                  style={{
                    width: '100%',
                    height: fillViewport && open ? 'min(100%, 720px)' : calHeight,
                    minHeight: fillViewport && open ? '720px' : '12rem',
                    overflow: 'visible',
                  }}
                  config={{
                    layout: 'month_view',
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
