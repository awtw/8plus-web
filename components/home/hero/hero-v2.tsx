// @ts-nocheck
'use client'
// Editorial hero (blue field) with switchable animated main visuals —
// ported from the 8plus Design System v2 UI kit (ScreensV2 Hero).
import React from 'react'
import { useRouter } from 'next/navigation'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'
import { HERO_BACKDROPS } from './hero-backdrops'

const HERO_CSS = `
  .hv-bg { position: absolute; inset: 0; z-index: 0; opacity: 0; pointer-events: none; transition: opacity .5s ease; }
  .hv-bg.on { opacity: 1; }
  .ht-scene { position: absolute; inset: 0; perspective: 560px; perspective-origin: 50% 42%; overflow: hidden; }
  .ht-plane { position: absolute; left: -60%; right: -60%; height: 170%;
    background-image: linear-gradient(rgba(255,255,255,.34) 1.3px,transparent 1.3px), linear-gradient(90deg,rgba(255,255,255,.24) 1.3px,transparent 1.3px);
    background-size: 60px 60px; animation: htFlow 2.3s linear infinite; }
  .ht-floor { bottom: -30%; transform: rotateX(74deg); transform-origin: bottom center;
    -webkit-mask-image: linear-gradient(transparent,#000 32%); mask-image: linear-gradient(transparent,#000 32%); }
  .ht-ceil { top: -30%; transform: rotateX(-74deg); transform-origin: top center; opacity: .55;
    -webkit-mask-image: linear-gradient(#000 68%,transparent); mask-image: linear-gradient(#000 68%,transparent); }
  @keyframes htFlow { to { background-position: 0 60px; } }
  .ht-glow { position: absolute; left: 0; right: 0; top: 24%; height: 52%;
    background: radial-gradient(58% 100% at 50% 100%, rgba(254,80,0,.6), transparent 72%); filter: blur(26px); }
  .hv-flow canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hv-cards { position: absolute; inset: 0; perspective: 1200px; }
  .hv-cards .space { position: absolute; inset: 0; transform-style: preserve-3d; animation: hvRot 34s linear infinite; }
  .hv-cards .card { position: absolute; left: 50%; top: 50%; width: 220px; height: 156px; margin: -78px 0 0 -110px; border-radius: 16px; padding: 17px 17px 15px;
    background: linear-gradient(150deg, rgba(255,255,255,.13), rgba(255,255,255,.045)); border: 1px solid rgba(255,255,255,.22); backdrop-filter: blur(6px);
    box-shadow: 0 30px 70px -30px rgba(0,0,0,.7); display: flex; flex-direction: column; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
  .hv-cards .card .idx { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .12em; color: #FE5000; }
  .hv-cards .card .ttl { font-family: var(--font-body); font-weight: 500; font-size: 18px; color: #fff; margin-top: 8px; letter-spacing: -.01em; }
  .hv-cards .card .en { font-family: var(--font-mono); font-size: 10px; letter-spacing: .08em; color: rgba(255,255,255,.5); margin-top: 3px; text-transform: uppercase; }
  .hv-cards .card .stack { margin-top: auto; display: flex; flex-wrap: wrap; gap: 5px; }
  .hv-cards .card .stack span { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .04em; color: rgba(255,255,255,.72); border: 1px solid rgba(255,255,255,.22); border-radius: 9999px; padding: 2px 8px; }
  @keyframes hvRot { from { transform: translateY(2%) rotateY(0deg); } to { transform: translateY(2%) rotateY(360deg); } }
  .hv-cards .space { z-index: 2; }
  .hv-logo { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
  .hv-logo .echo { position: absolute; left: 64%; top: 50%; transform: translate(-50%,-50%); border-radius: 50%; border: 1px solid rgba(159,192,255,.45); width: min(42vh,360px); aspect-ratio: 1; animation: hlEcho 4s ease-out infinite; }
  @keyframes hlEcho { 0% { transform: translate(-50%,-50%) scale(.42); opacity: .7; border-color: rgba(159,192,255,.55); } 70% { opacity: .12; } 100% { transform: translate(-50%,-50%) scale(1.45); opacity: 0; border-color: rgba(254,80,0,.5); } }
  .hv-logo .lfield { position: absolute; inset: 0; overflow: hidden; opacity: .42; perspective: 620px; perspective-origin: 64% 50%; }
  .hv-logo .lfield .lp { position: absolute; left: -40%; right: -40%; height: 150%;
    background-image: linear-gradient(rgba(150,185,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(150,185,255,.22) 1px, transparent 1px);
    background-size: 74px 74px; animation: lfFlow 6.5s linear infinite; }
  .hv-logo .lfield .lfloor { bottom: -30%; transform: rotateX(74deg); transform-origin: bottom center; -webkit-mask-image: linear-gradient(transparent, #000 40%); mask-image: linear-gradient(transparent, #000 40%); }
  .hv-logo .lfield .lceil { top: -30%; transform: rotateX(-74deg); transform-origin: top center; opacity: .55; -webkit-mask-image: linear-gradient(#000 60%, transparent); mask-image: linear-gradient(#000 60%, transparent); }
  @keyframes lfFlow { to { background-position: 0 74px; } }
  .hv-logo .markwrap { position: absolute; left: 64%; top: 50%; transform: translate(-50%,-50%); width: min(46vh,400px); aspect-ratio: 1; filter: drop-shadow(0 0 70px rgba(47,102,255,.5)); }
  .hv-logo .markwrap svg { width: 100%; height: 100%; display: block; overflow: visible; }
  .hv-logo .c-sm { transform-box: fill-box; transform-origin: center; animation: asmSmall 1.6s cubic-bezier(.5,.05,.2,1) both; }
  .hv-logo .slash { transform-box: fill-box; transform-origin: center; animation: asmSlash 1.6s cubic-bezier(.5,.05,.2,1) .12s both; }
  .hv-logo .c-lg { transform-box: fill-box; transform-origin: center; animation: asmLarge 1.6s cubic-bezier(.5,.05,.2,1) both; }
  .hv-logo .llines { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .62; }
  .hv-logo .llines .fl2 { fill: none; stroke-linecap: round; stroke-dasharray: 3 15; animation: hlIntake var(--dur,3s) linear infinite; }
  @keyframes hlIntake { to { stroke-dashoffset: -36; } }
  @keyframes asmSmall {
    0%   { transform: translate(-170%,-130%) rotate(-150deg) scale(.4); opacity: 0; }
    60%  { opacity: 1; }
    78%  { transform: translate(0,0) rotate(0) scale(1.08); }
    100% { transform: translate(0,0) rotate(0) scale(1); opacity: 1; }
  }
  @keyframes asmSlash {
    0%   { transform: translateY(190%) rotate(34deg) scale(.55); opacity: 0; }
    60%  { opacity: 1; }
    100% { transform: translateY(0) rotate(0) scale(1); opacity: 1; }
  }
  @keyframes asmLarge {
    0%   { transform: translate(160%,130%) rotate(130deg) scale(.35); opacity: 0; }
    60%  { opacity: 1; }
    80%  { transform: translate(0,0) rotate(0) scale(1.07); }
    100% { transform: translate(0,0) rotate(0) scale(1); opacity: 1; }
  }
  .hv-lines svg { position: absolute; inset: 0; width: 100%; height: 100%; transform-origin: 68% 47%; animation: beamSwirl 16s ease-in-out infinite; }
  .hv-lines canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  @keyframes beamSwirl { 0% { transform: rotate(-14deg); } 50% { transform: rotate(-4deg); } 100% { transform: rotate(-14deg); } }
  .scrollcue { display: inline-flex; align-items: center; gap: 10px; }
  .scrollcue .mouse { width: 20px; height: 32px; border: 1.5px solid var(--meta); border-radius: 12px; position: relative; flex: none; }
  .scrollcue .mouse::after { content: ""; position: absolute; left: 50%; top: 6px; width: 3px; height: 6px; border-radius: 2px; background: #FE5000; transform: translateX(-50%); animation: cueWheel 1.8s ease-in-out infinite; }
  @keyframes cueWheel { 0% { opacity: 0; transform: translate(-50%, 0); } 30% { opacity: 1; } 70% { opacity: 1; transform: translate(-50%, 10px); } 100% { opacity: 0; transform: translate(-50%, 10px); } }
  .scrollcue .arw { display: inline-block; animation: cueBob 1.8s ease-in-out infinite; }
  @keyframes cueBob { 0%,100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(5px); opacity: 1; } }
  .hero-scrim { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
  .hero-scrim.corner { background: linear-gradient(100deg, rgba(0,18,60,.8) 0%, rgba(0,18,60,.6) 34%, rgba(0,18,60,.28) 54%, rgba(0,18,60,0) 70%); }
  .hero-scrim.flat { background: radial-gradient(66% 82% at 50% 100%, rgba(0,18,60,.68) 0%, rgba(0,18,60,.38) 48%, rgba(0,18,60,0) 76%); }
  @media (max-width: 820px) {
    .hero-scrim.corner { background: linear-gradient(165deg, rgba(0,18,60,.62) 0%, rgba(0,18,60,.42) 55%, rgba(0,18,60,.2) 100%); }
    .hero-scrim.flat { background: radial-gradient(88% 94% at 50% 100%, rgba(0,18,60,.58) 0%, rgba(0,18,60,.32) 55%, rgba(0,18,60,0) 78%); }
  }
  .hv-switch { position: absolute; right: 18px; bottom: 18px; z-index: 25; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .hv-switch .trig { width: 34px; height: 34px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: rgba(3,6,26,.4); border: 1px solid var(--border-soft); color: var(--meta); cursor: pointer; opacity: .32; transition: opacity .3s, color .2s, border-color .2s, background .2s; -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }
  .hv-switch .trig:hover, .hv-switch .trig:focus-visible { opacity: 1; color: #fff; border-color: rgba(255,255,255,.35); outline: none; }
  .hv-switch.open .trig { opacity: 1; background: #FE5000; border-color: #FE5000; color: #fff; }
  .hv-switch .panel { display: none; width: min(84vw, 320px); background: rgba(3,6,26,.9); -webkit-backdrop-filter: blur(18px); backdrop-filter: blur(18px); border: 1px solid var(--border-soft); border-radius: 16px; padding: 14px; box-shadow: 0 30px 70px -30px rgba(0,0,0,.85); }
  .hv-switch.open .panel { display: block; }
  .hv-switch h4 { font-family: var(--font-mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--meta); margin: 0 0 9px; }
  .hv-switch .x { background: transparent; border: 0; color: var(--meta); cursor: pointer; font-size: 16px; line-height: 1; padding: 2px 6px; margin: -2px -4px 8px 0; border-radius: 6px; float: right; transition: .2s; }
  .hv-switch .x:hover { color: #fff; }
  .hv-switch .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3px; max-height: 32vh; overflow-x: hidden; overflow-y: auto; }
  .hv-switch button.opt { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .02em; line-height: 1.25; color: var(--meta); background: transparent; border: 0; cursor: pointer; padding: 6px 7px; border-radius: 8px; transition: .2s; white-space: normal; text-align: left; min-width: 0; }
  .hv-switch button.opt > span { min-width: 0; overflow-wrap: anywhere; }
  .hv-switch button.opt::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none; opacity: .5; transition: .2s; }
  .hv-switch button.opt:hover { color: #fff; background: rgba(255,255,255,.06); }
  .hv-switch button.opt.on { color: #fff; }
  .hv-switch button.opt.on::before { background: #FE5000; opacity: 1; box-shadow: 0 0 8px 2px rgba(254,80,0,.55); }
  .hp-rise { opacity: 0; animation: hpRise .9s ease forwards; }
  @keyframes hpRise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .hv-cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 48px; padding: 0 24px; border-radius: 9999px; font-family: var(--font-body); font-size: 15px; font-weight: 500; cursor: pointer; transition: var(--transition-base); border: 1px solid transparent; }
  .hv-cta.primary { background: var(--accent); color: var(--accent-on); }
  .hv-cta.primary:hover { background: var(--accent-hover); }
  .hv-cta.secondary { background: rgba(255,255,255,.08); color: var(--fg); border-color: var(--border); }
  .hv-cta.secondary:hover { background: rgba(255,255,255,.15); border-color: var(--hover-border); }
  @media (prefers-reduced-motion: reduce) { .ht-plane, .hv-cards .space, .hv-logo .echo, .hv-logo .lfield .lp, .hv-logo .llines .fl2, .hv-logo .c-sm, .hv-logo .slash, .hv-logo .c-lg, .hv-lines svg, .scrollcue .mouse::after, .scrollcue .arw { animation: none; } .hv-logo .llines .fl2 { stroke-dasharray: none; } .hv-lines svg { transform: rotate(-10deg); } .hv-cards .space { transform: translateY(2%); } .hv-logo .c-sm, .hv-logo .slash, .hv-logo .c-lg { opacity: 1; transform: none; } .hp-rise { opacity: 1; animation: none; } }
  @media (max-width: 820px) {
    .hero-inner { padding: 36px 24px 24px !important; }
    .hero-inner .scrollcue { margin-top: 20px !important; }
    .pillars { grid-template-columns: 1fr 1fr !important; gap: 12px !important; margin-top: 20px !important; padding-top: 16px !important; }
    .hv-switch { right: 12px; bottom: 12px; }
    .hv-switch .panel { width: min(80vw, 300px); }
    .hv-switch .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); max-height: 38vh; }
  }
  @media (max-width: 520px) {
    .pillars { grid-template-columns: 1fr !important; gap: 10px !important; }
    .hero-ctas a, .hero-ctas button { flex: 1 1 auto; }
  }`

const HERO_LABELS = {
  combo: '隧道 · 作品卡', flow: '流場線', logo: '8+ 字標', lines: '線流交會',
  topo: '等高線地形', dots: '半調點陣', orbit: '軌道系統', iso: '架構堆疊',
  wave: '聲波緞帶', sphere: '點陣球體', tape: '雜誌拼貼', bp: '電路藍圖',
  warp: '星際穿越', ripple: '漣漪擴散', radar: '雷達掃描', dna: '雙螺旋',
  terra: '線框山脈', harmo: '諧波軌跡', spiro: '幾何旋層', bars: '頻譜柱列',
  atom: '電子軌道', flock: '群鳥飛行', cells: '方格脈衝', typo: '動態字牆',
  eclipse: '日蝕光環',
}

export function HeroV2({ locale }: { locale: HomeLocale }) {
  const c = getHomeSectionContent(locale)
  const en = locale === 'en'
  const router = useRouter()
  const [variant, setVariant] = React.useState('combo')
  const [swOpen, setSwOpen] = React.useState(false)
  const [logoTick, setLogoTick] = React.useState(0)
  const secRef = React.useRef(null), cvRef = React.useRef(null), sceneRef = React.useRef(null), fieldRef = React.useRef(null), logoLinesRef = React.useRef(null)

  React.useEffect(() => {
    let st = document.getElementById('hero-v2-css')
    if (!st) { st = document.createElement('style'); st.id = 'hero-v2-css'; document.head.appendChild(st) }
    st.textContent = HERO_CSS
    // pick a fresh random main-visual on every page load / home entry
    const keys = Object.keys(HERO_LABELS)
    const pick = keys[Math.floor(Math.random() * keys.length)]
    setVariant(pick)
    if (pick === 'logo') setLogoTick((n) => n + 1)
  }, [])

  const setV = (v) => { setVariant(v); if (v === 'logo') setLogoTick((n) => n + 1) }

  const cards = [
    { t: '前後端串接', en: 'Full-stack Integration', s: ['Next.js', 'API', 'tRPC'] },
    { t: '電商平台開發', en: 'E-commerce Platform', s: ['Shopify', '金流', '訂單'] },
    { t: '形象網站設計', en: 'Brand Website', s: ['RWD', 'CMS', 'SEO'] },
    { t: 'CI · LOGO 設計', en: 'Brand Identity', s: ['Logo', '視覺', '規範'] },
    { t: 'AI 導入與自動化', en: 'AI Integration', s: ['LLM', 'RAG', 'Agent'] },
    { t: '雲端架構顧問', en: 'Cloud Architecture', s: ['AWS', 'CI/CD', '效能'] },
  ]

  // flow field canvas
  React.useEffect(() => {
    if (variant !== 'flow') return
    const cv = cvRef.current, sec = secRef.current; if (!cv || !sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const ctx = cv.getContext('2d'); let raf, ps = [], t = 0
    const resize = () => { cv.width = sec.clientWidth; cv.height = sec.clientHeight
      ps = Array.from({ length: Math.min(640, (cv.width / 1.5) | 0) }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, c: Math.random() < .3 ? '255,125,60' : '175,205,255' })) }
    resize(); window.addEventListener('resize', resize)
    const draw = () => { t += 0.003; ctx.fillStyle = 'rgba(0,47,167,.085)'; ctx.fillRect(0, 0, cv.width, cv.height)
      for (const p of ps) { const a = Math.sin(p.x * 0.004 + t) + Math.cos(p.y * 0.004 - t)
        const nx = p.x + Math.cos(a * 3) * 1.4, ny = p.y + Math.sin(a * 3) * 1.4
        ctx.strokeStyle = 'rgba(' + p.c + ',.66)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke()
        p.x = nx; p.y = ny; if (p.x < 0 || p.x > cv.width || p.y < 0 || p.y > cv.height) { p.x = Math.random() * cv.width; p.y = Math.random() * cv.height } }
      raf = requestAnimationFrame(draw) }
    if (!reduce) draw(); else { ctx.fillStyle = '#002FA7'; ctx.fillRect(0, 0, cv.width, cv.height) }
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [variant])

  // logo intake lines
  React.useEffect(() => {
    if (variant !== 'logo') return
    const svg = logoLinesRef.current; if (!svg) return
    while (svg.firstChild) svg.removeChild(svg.firstChild)
    const ns = 'http://www.w3.org/2000/svg'; const P = { x: 640, y: 375 }, N = 46
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2 + (Math.random() - .5) * 0.12
      const R = 360 + Math.random() * 520
      const ex = P.x + Math.cos(ang) * R, ey = P.y + Math.sin(ang) * R
      const gap = 90 + Math.random() * 70
      const sx = P.x + Math.cos(ang) * gap, sy = P.y + Math.sin(ang) * gap
      const p = document.createElementNS(ns, 'path')
      p.setAttribute('d', 'M ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + ' L ' + sx.toFixed(1) + ' ' + sy.toFixed(1))
      p.setAttribute('class', 'fl2')
      const orange = Math.random() < 0.24
      p.setAttribute('stroke', orange ? '#FE5000' : 'rgba(159,192,255,.85)')
      p.setAttribute('stroke-width', orange ? '1.3' : '0.9')
      p.style.setProperty('--dur', (2.2 + Math.random() * 2.4).toFixed(2) + 's')
      p.style.animationDelay = (-Math.random() * 3).toFixed(2) + 's'
      svg.appendChild(p)
    }
  }, [variant, logoTick])

  // lines field canvas
  React.useEffect(() => {
    if (variant !== 'lines') return
    const cv = fieldRef.current, sec = secRef.current; if (!cv || !sec) return
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const ctx = cv.getContext('2d'); let raf, ps = [], t = 0
    const P = () => ({ x: cv.width * 0.66, y: cv.height * 0.48 })
    const resize = () => { cv.width = sec.clientWidth; cv.height = sec.clientHeight
      ps = Array.from({ length: Math.min(620, (cv.width / 1.6) | 0) }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, c: Math.random() < .28 ? '255,140,80' : '160,195,255' })) }
    resize(); window.addEventListener('resize', resize)
    const draw = () => { t += 0.005; const p = P()
      ctx.fillStyle = 'rgba(0,47,167,.055)'; ctx.fillRect(0, 0, cv.width, cv.height)
      for (const o of ps) { const a = Math.atan2(p.y - o.y, p.x - o.x) + Math.sin((o.x + o.y) * 0.004 + t) * 0.8
        const nx = o.x + Math.cos(a) * 1.9, ny = o.y + Math.sin(a) * 1.9
        ctx.strokeStyle = 'rgba(' + o.c + ',.5)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(nx, ny); ctx.stroke()
        o.x = nx; o.y = ny; if (o.x < 0 || o.x > cv.width || o.y < 0 || o.y > cv.height || Math.hypot(o.x - p.x, o.y - p.y) < 16) { o.x = Math.random() * cv.width; o.y = Math.random() * cv.height } }
      raf = requestAnimationFrame(draw) }
    if (!reduce) draw(); else { ctx.fillStyle = '#002FA7'; ctx.fillRect(0, 0, cv.width, cv.height) }
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [variant])

  // section height = viewport minus site header
  React.useEffect(() => {
    const sec = secRef.current; if (!sec) return
    const set = () => { const h = document.querySelector('header'); const hh = h ? h.getBoundingClientRect().height : 0; sec.style.height = (window.innerHeight - hh) + 'px' }
    set(); window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  // combo parallax
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (sceneRef.current && variant !== 'combo') sceneRef.current.style.transform = ''
    if (reduce || variant !== 'combo') return
    const onM = (e) => { const dx = e.clientX / window.innerWidth - .5, dy = e.clientY / window.innerHeight - .5
      if (sceneRef.current) sceneRef.current.style.transform = 'translate(' + (dx * -16) + 'px,' + (dy * -10) + 'px)' }
    window.addEventListener('mousemove', onM); return () => window.removeEventListener('mousemove', onM)
  }, [variant])

  const ORDER = Object.keys(HERO_LABELS)
  const corner = ['logo', 'lines', 'orbit', 'iso', 'sphere', 'tape', 'bp', 'radar', 'atom', 'eclipse', 'spiro', 'harmo'].indexOf(variant) !== -1
  const flat = ['flow', 'lines', 'topo', 'dots', 'wave', 'bp', 'warp', 'ripple', 'radar', 'dna', 'terra', 'harmo', 'spiro', 'bars', 'flock', 'cells'].indexOf(variant) !== -1

  const onHeroClick = (e) => {
    if (e.target.closest('button, a')) return
    const r = secRef.current ? secRef.current.getBoundingClientRect() : null
    if (r) window.dispatchEvent(new CustomEvent('heroTap', { detail: { x: e.clientX - r.left, y: e.clientY - r.top } }))
  }

  return (
    <section
      ref={secRef}
      id="home-section-hero"
      className={'home-section bg-blue noise-field' + (corner ? ' hero-corner' : '')}
      aria-labelledby="home-hero-headline"
      onClick={onHeroClick}
      style={{ position: 'relative', height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: flat ? '#002FA7' : 'radial-gradient(120% 120% at 50% 44%, #0a44d8, #002FA7 50%, #001a5c 92%)' }}
    >
      <div ref={sceneRef} style={{ position: 'absolute', inset: 0, zIndex: 0, transition: 'transform .3s ease' }} aria-hidden="true">
        <div className={'hv-bg' + (variant === 'combo' ? ' on' : '')}>
          <div className="ht-scene"><div className="ht-plane ht-floor"></div><div className="ht-plane ht-ceil"></div></div>
          <div className="ht-glow"></div>
          <div className="hv-cards"><div className="space">
            {cards.map((p, i) => (
              <div key={i} className="card" style={{ transform: 'rotateY(' + (i / cards.length * 360) + 'deg) translateZ(330px)' }}>
                <span className="idx">{'SERVICE // ' + String(i + 1).padStart(2, '0')}</span>
                <span className="ttl">{p.t}</span>
                <span className="en">{p.en}</span>
                <span className="stack">{p.s.map((x2) => <span key={x2}>{x2}</span>)}</span>
              </div>
            ))}
          </div></div>
        </div>
        <div className={'hv-bg hv-flow' + (variant === 'flow' ? ' on' : '')}><canvas ref={cvRef}></canvas></div>
        <div className={'hv-bg hv-logo' + (variant === 'logo' ? ' on' : '')}>
          <div className="lfield"><div className="lp lfloor"></div><div className="lp lceil"></div></div>
          {variant === 'logo' && <svg className="llines" ref={logoLinesRef} viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid slice"></svg>}
          {variant === 'logo' && [0, 1, 2].map((k) => <span key={'e' + k} className="echo" style={{ animationDelay: (k * 1.33) + 's' }}></span>)}
          {variant === 'logo' && (
            <div className="markwrap" key={'mark-' + logoTick}>
              <svg viewBox="0 0 100 100" fill="none" role="img" aria-label="8plus">
                <circle className="c-sm" cx="32" cy="29" r="18" fill="#fff"></circle>
                <path className="slash" d="M53 9H68L36 91H21L53 9Z" fill="#fff"></path>
                <circle className="c-lg" cx="70" cy="64" r="28" fill="#FE5000"></circle>
              </svg>
            </div>
          )}
        </div>
        <div className={'hv-bg hv-lines' + (variant === 'lines' ? ' on' : '')}>
          <canvas ref={fieldRef}></canvas>
        </div>
        {ORDER.map((v) => { const C = HERO_BACKDROPS[v]; return C ? <C key={v} active={variant === v} /> : null })}
      </div>

      <div aria-hidden="true" className={'hero-scrim' + (corner ? ' corner' : ' flat')}></div>

      <div className={'hv-switch' + (swOpen ? ' open' : '')}>
        <div className="panel" role="menu">
          <button className="x" onClick={() => setSwOpen(false)} aria-label="關閉">✕</button>
          <h4>主視覺 · VISUAL</h4>
          <div className="grid">
            {ORDER.map((v) => <button key={v} className={'opt' + (variant === v ? ' on' : '')} onClick={() => setV(v)} title={HERO_LABELS[v]}><span>{HERO_LABELS[v]}</span></button>)}
          </div>
        </div>
        <button className="trig" onClick={() => setSwOpen((o) => !o)} aria-label="調整主視覺" aria-expanded={swOpen}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h6M14 6h6M4 12h10M18 12h2M4 18h3M11 18h9"></path>
            <circle cx="12" cy="6" r="2" fill="currentColor" stroke="none"></circle>
            <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"></circle>
            <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none"></circle>
          </svg>
        </button>
      </div>

      <div className="hero-inner home-hero-inner" style={{ position: 'relative', zIndex: 10, maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%', padding: '64px clamp(24px,4vw,28px)', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--meta)', borderBottom: '1px solid var(--border-soft)', paddingBottom: 14 }}>
          <span>{c.hero.tag}</span><span>{c.hero.issueMark}</span>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: corner ? 'flex-start' : 'flex-end', alignItems: corner ? 'flex-start' : 'center', textAlign: corner ? 'left' : 'center', paddingBottom: corner ? 0 : '6vh', paddingTop: corner ? 'clamp(40px, 10vh, 76px)' : (variant === 'lines' ? '4vh' : 0), paddingLeft: corner ? 10 : 0 }}>
          {corner && <p className="hp-rise" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 18px', animationDelay: '.1s' }}>{en ? 'Architecture-led · AI shipped' : '架構驅動 · AI 落地'}</p>}
          <h1 id="home-hero-headline" className="hp-rise" style={corner
            ? { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.7rem)', lineHeight: 1.2, letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--fg)', margin: 0, maxWidth: '18ch', textShadow: '0 4px 30px rgba(0,10,50,.7)', animationDelay: '.2s' }
            : { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 8.5vw, 4.75rem)', lineHeight: 1.06, letterSpacing: '-0.04em', fontWeight: 600, color: 'var(--fg)', margin: 0, maxWidth: '22ch', textShadow: '0 6px 50px rgba(0,10,50,.85)', animationDelay: '.15s' }}>
            {c.hero.headline.map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
          </h1>
          <div className="hp-rise hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, margin: corner ? '28px 0 0' : '34px 0 0', justifyContent: corner ? 'flex-start' : 'center', animationDelay: '.35s' }}>
            <button className="hv-cta primary" onClick={() => router.push('/booking')}>{en ? 'Book a call' : '預約諮詢'}</button>
            <button className="hv-cta secondary" onClick={() => router.push('/lab')}>{en ? 'See the work' : '看作品'}</button>
          </div>
          {corner && (
            <div className="hp-rise" style={{ margin: '40px 0 0', maxWidth: '40ch', borderTop: '1px solid var(--border-soft)', animationDelay: '.5s' }}>
              {c.hero.pillars.map((p) => (
                <div key={p.mark} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '15px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: '9999px', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{p.mark}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-.01em' }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginTop: 3 }}>{p.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!corner && (
          <ul className="pillars hp-rise" style={{ listStyle: 'none', padding: '26px 0 0', margin: '52px 0 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, borderTop: '1px solid var(--border-soft)', animationDelay: '.55s' }}>
            {c.hero.pillars.map((p) => (
              <li key={p.mark} style={{ display: 'flex', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', border: '1px solid var(--border)', borderRadius: '9999px', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.mark}</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 18, fontWeight: 500, margin: '3px 0 4px', color: 'var(--fg)' }}>{p.title}</h2>
                  <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="scrollcue" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--meta)', marginTop: 'clamp(32px, 5vh, 60px)', alignSelf: 'center' }}><span className="mouse"></span><span className="arw">↓</span> {c.hero.scrollCue}</p>
      </div>
    </section>
  )
}
