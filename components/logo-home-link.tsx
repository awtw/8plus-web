'use client'

import Link from 'next/link'
import { Logo } from './logo'

type LogoHomeLinkProps = {
  compact?: boolean
  onNavigateHome?: () => void
}

export function LogoHomeLink({ compact = false, onNavigateHome }: LogoHomeLinkProps) {
  return (
    <Link
      href="/"
      onClick={() => onNavigateHome?.()}
      className="inline-flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
      aria-label="8plus home"
    >
      <Logo
        size={compact ? 28 : 32}
        variant="brand"
        className={compact ? 'h-7 w-7' : 'h-8 w-8'}
      />
      <span className={`${compact ? 'text-xl' : 'text-lg'} font-semibold tracking-[-0.02em]`}>
        8plus
      </span>
    </Link>
  )
}
