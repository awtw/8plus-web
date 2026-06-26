'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isNavActive } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = isNavActive(pathname, href)

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        className,
        isActive && activeClassName,
      )}
    >
      {children}
    </Link>
  )
}
