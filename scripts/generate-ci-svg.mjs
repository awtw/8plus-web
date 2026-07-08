#!/usr/bin/env node
/**
 * Generate 20 CI hero SVG wrappers from public/ci PNG assets.
 * Run: node scripts/generate-ci-svg.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'public/ci/svg')

const VARIANTS = [
  { id: 'v01', src: '/ci/handshake.png', anim: 'scan-vertical', fit: 'meet' },
  { id: 'v02', src: '/ci/handshake.png', anim: 'pulse-glow', fit: 'meet' },
  { id: 'v03', src: '/ci/two_color_hand.png', anim: 'mesh-breathe', fit: 'meet' },
  { id: 'v04', src: '/ci/two_color_hand.png', anim: 'stroke-draw', fit: 'meet' },
  { id: 'v05', src: '/ci/facewithline.png', anim: 'orbit-slow', fit: 'slice' },
  { id: 'v06', src: '/ci/facewithline.png', anim: 'scan-horizontal', fit: 'slice' },
  { id: 'v07', src: '/ci/lines.png', anim: 'contour-flow', fit: 'slice' },
  { id: 'v08', src: '/ci/lines.png', anim: 'reveal-radial', fit: 'slice' },
  { id: 'v09', src: '/ci/lines_2.png', anim: 'drift', fit: 'slice' },
  { id: 'v10', src: '/ci/lines_2.png', anim: 'opacity-breathe', fit: 'slice' },
  { id: 'v11', src: '/ci/square_line.png', anim: 'parallax-drift', fit: 'slice' },
  { id: 'v12', src: '/ci/square_line.png', anim: 'zoom-in', fit: 'slice' },
  { id: 'v13', src: '/ci/squrare_2.png', anim: 'tunnel-march', fit: 'slice' },
  { id: 'v14', src: '/ci/squrare_2.png', anim: 'grid-flicker', fit: 'slice' },
  { id: 'v15', src: '/ci/two_blue_hand.png', anim: 'connect-snap', fit: 'meet' },
  { id: 'v16', src: '/ci/two_blue_hand.png', anim: 'float-y', fit: 'meet' },
  { id: 'v17', src: '/ci/two_black_hand.png', anim: 'reach-close', fit: 'meet' },
  { id: 'v18', src: '/ci/two_black_hand.png', anim: 'line-shimmer', fit: 'meet' },
  { id: 'v19', src: '/ci/red_black_hand.png', anim: 'glow-bridge', fit: 'meet' },
  { id: 'v20', src: '/ci/red_black_hand.png', anim: 'touch-spark', fit: 'meet' },
]

const ANIM_CSS = {
  'scan-vertical': `
    @keyframes scan-v { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
    .fx { animation: scan-v 2.8s ease-in-out infinite; }
  `,
  'pulse-glow': `
    @keyframes pulse { 0%,100% { opacity: 0.15; transform: scale(0.85); } 50% { opacity: 0.55; transform: scale(1.1); } }
    .fx { animation: pulse 2.4s ease-in-out infinite; transform-origin: 400px 300px; }
  `,
  'mesh-breathe': `
    @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
    .art { animation: breathe 3s ease-in-out infinite; transform-origin: 400px 300px; }
  `,
  'stroke-draw': `
    @keyframes draw { 0% { opacity: 0.25; } 50% { opacity: 1; } 100% { opacity: 0.25; } }
    .art { animation: draw 2.6s ease-in-out infinite; }
  `,
  'orbit-slow': `
    @keyframes orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .fx { animation: orbit 12s linear infinite; transform-origin: 400px 300px; }
  `,
  'scan-horizontal': `
    @keyframes scan-h { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    .fx { animation: scan-h 3s ease-in-out infinite; }
  `,
  'contour-flow': `
    @keyframes flow { 0% { transform: translate(0,0); } 50% { transform: translate(-12px,8px); } 100% { transform: translate(0,0); } }
    .art { animation: flow 4s ease-in-out infinite; }
  `,
  'reveal-radial': `
    @keyframes reveal { 0% { clip-path: circle(0% at 50% 50%); } 100% { clip-path: circle(75% at 50% 50%); } }
    .art { animation: reveal 3.2s ease-in-out infinite alternate; }
  `,
  drift: `
    @keyframes drift { 0% { transform: translateX(0); } 50% { transform: translateX(14px); } 100% { transform: translateX(0); } }
    .art { animation: drift 3.5s ease-in-out infinite; }
  `,
  'opacity-breathe': `
    @keyframes ob { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
    .art { animation: ob 2.8s ease-in-out infinite; }
  `,
  'parallax-drift': `
    @keyframes pd { 0% { transform: translate(0,0) scale(1); } 50% { transform: translate(-10px,-6px) scale(1.03); } 100% { transform: translate(0,0) scale(1); } }
    .art { animation: pd 4s ease-in-out infinite; }
  `,
  'zoom-in': `
    @keyframes zoom { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
    .art { animation: zoom 4s ease-in-out infinite alternate; }
  `,
  'tunnel-march': `
    @keyframes tunnel { 0% { transform: scale(1); } 100% { transform: scale(1.12); } }
    .art { animation: tunnel 3s ease-in-out infinite alternate; transform-origin: 400px 300px; }
  `,
  'grid-flicker': `
    @keyframes flick { 0%,100% { opacity: 0.7; } 40% { opacity: 1; } 70% { opacity: 0.85; } }
    .art { animation: flick 1.6s steps(4) infinite; }
  `,
  'connect-snap': `
    @keyframes snap { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,-6px); } }
    .art { animation: snap 2.2s ease-in-out infinite; }
  `,
  'float-y': `
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .art { animation: float 3s ease-in-out infinite; }
  `,
  'reach-close': `
    @keyframes reach { 0% { transform: scale(0.96); } 50% { transform: scale(1.02); } 100% { transform: scale(0.96); } }
    .art { animation: reach 2.8s ease-in-out infinite; transform-origin: 400px 300px; }
  `,
  'line-shimmer': `
    @keyframes shim { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 0.4; } 100% { transform: translateX(100%); opacity: 0; } }
    .fx { animation: shim 2.4s ease-in-out infinite; }
  `,
  'glow-bridge': `
    @keyframes bridge { 0%,100% { opacity: 0.2; } 50% { opacity: 0.65; } }
    .fx { animation: bridge 2.5s ease-in-out infinite; }
  `,
  'touch-spark': `
    @keyframes spark { 0%,100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 0.9; transform: scale(1.2); } }
    .fx { animation: spark 2s ease-in-out infinite; transform-origin: 400px 300px; }
  `,
}

function overlay(anim) {
  switch (anim) {
    case 'scan-vertical':
      return '<rect class="fx" x="0" y="0" width="800" height="120" fill="rgba(125,211,252,0.22)"/>'
    case 'pulse-glow':
      return '<circle class="fx" cx="400" cy="300" r="140" fill="rgba(125,211,252,0.35)"/>'
    case 'orbit-slow':
      return '<ellipse class="fx" cx="400" cy="300" rx="280" ry="180" fill="none" stroke="rgba(248,250,252,0.15)" stroke-width="1"/>'
    case 'scan-horizontal':
      return '<rect class="fx" x="0" y="280" width="120" height="4" fill="rgba(248,250,252,0.5)"/>'
    case 'line-shimmer':
      return '<rect class="fx" x="0" y="0" width="200" height="600" fill="rgba(255,255,255,0.12)"/>'
    case 'glow-bridge':
      return '<ellipse class="fx" cx="400" cy="300" rx="60" ry="40" fill="rgba(248,113,113,0.35)"/>'
    case 'touch-spark':
      return '<circle class="fx" cx="400" cy="300" r="12" fill="#f8fafc"/>'
    default:
      return ''
  }
}

fs.mkdirSync(OUT, { recursive: true })

for (const v of VARIANTS) {
  const por = v.fit === 'meet' ? 'xMidYMid meet' : 'xMidYMid slice'
  const css = ANIM_CSS[v.anim] ?? ''
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 600">
  <style>
    .art { transform-origin: 400px 300px; }
    ${css}
    @media (prefers-reduced-motion: reduce) {
      .art, .fx { animation: none !important; }
    }
  </style>
  <rect width="800" height="600" fill="#000"/>
  <g class="art">
    <image href="${v.src}" x="0" y="0" width="800" height="600" preserveAspectRatio="${por}"/>
  </g>
  ${overlay(v.anim)}
</svg>
`
  fs.writeFileSync(path.join(OUT, `${v.id}.svg`), svg)
  console.log(`wrote ${v.id}.svg`)
}

console.log('done — 20 SVG files')
