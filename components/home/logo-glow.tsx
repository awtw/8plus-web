'use client'

import Image from 'next/image'

export function LogoGlow() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden>
      <div
        className="absolute h-40 w-40 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(91,141,255,0.55) 0%, rgba(14,165,233,0.2) 45%, transparent 72%)',
        }}
      />
      <div className="lumina-glass relative flex h-28 w-28 items-center justify-center rounded-[var(--radius-md)] sm:h-32 sm:w-32">
        <Image
          src="/logo-light-512.png"
          alt=""
          width={96}
          height={96}
          className="relative z-10 h-16 w-16 object-contain sm:h-20 sm:w-20"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)]"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 42%, rgba(91,141,255,0.08) 100%)',
          }}
        />
      </div>
    </div>
  )
}
