'use client'

import Image from 'next/image'

export function ShareHavenbirdStage() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute bottom-0 left-1/2 z-0 h-[clamp(14rem,56vh,30rem)] w-[min(150vw,44rem)] -translate-x-1/2 translate-y-[10%] max-[380px]:h-[clamp(12rem,50vh,18rem)] [@media(max-height:700px)]:h-[clamp(11rem,46vh,17rem)] [@media(max-height:700px)]:translate-y-[14%]">
        <Image
          src="/plants/havenbird_blue.png"
          alt=""
          fill
          className="object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.34)]"
          sizes="(max-width: 640px) 150vw, 704px"
          priority
        />
      </div>
    </div>
  )
}
