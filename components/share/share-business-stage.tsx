'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type ShareBusinessStageProps = {
  subdued?: boolean
}

export function ShareBusinessStage({ subdued = false }: ShareBusinessStageProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        subdued && 'opacity-0',
      )}
      aria-hidden
    >
      <div className="share-business-flora absolute bottom-0 left-1/2 h-[clamp(13rem,52vh,28rem)] w-[min(148vw,44rem)] -translate-x-1/2 translate-y-[16%] max-[380px]:h-[clamp(11.5rem,46vh,20rem)] max-[380px]:translate-y-[18%] [@media(max-height:700px)]:h-[clamp(10rem,40vh,16rem)] [@media(max-height:700px)]:translate-y-[20%]">
        <Image
          src="/plants/white_havenbird.png"
          alt=""
          fill
          className="object-contain object-bottom opacity-[0.94] drop-shadow-[0_16px_40px_rgba(80,20,0,0.24)]"
          sizes="(max-width: 640px) 148vw, 704px"
          priority
        />
      </div>
    </div>
  )
}
