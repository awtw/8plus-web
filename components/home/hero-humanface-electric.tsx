'use client'

import { useId } from 'react'

type HeroHumanfaceElectricProps = {
  className?: string
}

export function HeroHumanfaceElectric({ className }: HeroHumanfaceElectricProps) {
  const uid = useId().replace(/:/g, '')

  return (
    <div className={className ?? 'hero-humanface-electric-root'}>
      <svg
        className="hero-humanface-electric-svg"
        viewBox="0 0 800 1000"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={`${uid}-electric`}
            x1="0"
            y1="0"
            x2="800"
            y2="1000"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="18%" stopColor="#06b6d4" />
            <stop offset="42%" stopColor="#818cf8" />
            <stop offset="58%" stopColor="#e879f9" />
            <stop offset="78%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0c4a6e" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="0 0; 220 120; -120 80; 0 0"
              dur="7s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="800" height="1000" fill="#000" />

        <g
          stroke={`url(#${uid}-electric)`}
          strokeWidth="1.1"
          strokeLinecap="round"
          filter={`url(#${uid}-glow)`}
        >
          <circle cx="400" cy="310" r="108" />
          <circle cx="400" cy="310" r="168" />
          <circle cx="400" cy="310" r="228" />
          <path d="M400 95 Q520 150 545 290 Q560 410 500 500 Q430 560 400 565 Q370 560 300 500 Q240 410 255 290 Q280 150 400 95" />
          <path d="M400 95 Q340 180 330 310 Q325 430 380 520" />
          <path d="M400 95 Q460 180 470 310 Q475 430 420 520" />
          <path d="M400 95 Q300 220 285 350 Q275 450 340 540" />
          <path d="M400 95 Q500 220 515 350 Q525 450 460 540" />
          <path d="M280 360 Q360 340 400 345 Q440 340 520 360" />
          <path d="M260 430 Q340 410 400 415 Q460 410 540 430" />
          <path d="M250 500 Q330 485 400 490 Q470 485 550 500" />
          <path d="M240 570 Q320 560 400 565 Q480 560 560 570" />
          <path d="M220 640 Q310 630 400 635 Q490 630 580 640" />
          <path d="M200 710 Q300 700 400 705 Q500 700 600 710" />
          <path d="M180 780 Q290 770 400 775 Q510 770 620 780" />
          <path d="M400 565 L400 705" />
          <path d="M340 540 Q360 620 370 700" />
          <path d="M460 540 Q440 620 430 700" />
          <path d="M300 500 Q320 590 335 680" />
          <path d="M500 500 Q480 590 465 680" />
          <path d="M255 290 Q320 270 400 275 Q480 270 545 290" />
          <path d="M270 220 Q340 200 400 205 Q460 200 530 220" />
          <path d="M290 160 Q350 145 400 148 Q450 145 510 160" />
        </g>
      </svg>
    </div>
  )
}

export function HeroHumanfaceElectricStatic({ className }: { className?: string }) {
  return <HeroHumanfaceElectric className={className} />
}
