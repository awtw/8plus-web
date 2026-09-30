'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CalendarCheck, Flask, House, Briefcase, User } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'
import { isNavActive } from '@/lib/navigation'
import { isShareHubPath } from '@/lib/site-paths'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/', labelKey: 'nav.home', Icon: House },
  { href: '/lab', labelKey: 'nav.lab', Icon: Flask },
  { href: '/services', labelKey: 'nav.services', Icon: Briefcase },
  { href: '/about', labelKey: 'nav.about', Icon: User },
  { href: '/booking', labelKey: 'nav.booking', Icon: CalendarCheck, primary: true },
] as const

/**
 * Thumb-zone navigation for phones (<768px). Hides while scrolling down to give
 * content room and returns on scroll up; the header + sheet menu remain for
 * secondary pages (path, blog).
 */
export function MobileTabBar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY.current
        if (Math.abs(delta) > 8) {
          setHidden(delta > 0 && y > 120)
          lastY.current = y
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (isShareHubPath(pathname)) return null

  return (
    <nav
      aria-label="Primary"
      className={cn('mobile-tab-bar', hidden && 'mobile-tab-bar--hidden')}
    >
      <ul>
        {TABS.map(({ href, labelKey, Icon, ...rest }) => {
          const active = isNavActive(pathname, href)
          const primary = 'primary' in rest && rest.primary
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn('mobile-tab', active && 'is-active', primary && 'is-primary')}
              >
                <Icon size={22} weight={active || primary ? 'fill' : 'regular'} aria-hidden="true" />
                <span>{t(labelKey)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
