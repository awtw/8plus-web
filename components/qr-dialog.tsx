'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface QrDialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  overlayClassName: string
  children: ReactNode
}

export function QrDialog({
  open,
  onClose,
  labelledBy,
  overlayClassName,
  children,
}: QrDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement | null

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE)
    focusables?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={overlayClassName}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div ref={panelRef} className="outline-none">
        {children}
      </div>
    </div>
  )
}
