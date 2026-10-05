"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { getHomeSectionContent } from "@/lib/content/home-sections";
import { createDirectionRenderer, type DirectionRenderer, type HeroDirection } from "@/lib/visuals/hero-direction-renderer";
import "@/styles/pages/hero-direction-preview.css";

const directions = {
  organic: {
    letter: "A", name: "LIVING MATTER", zh: "有機數位材質", en: "Living digital matter",
    description: "光穿過流動的結構，讓抽象想法有了形體。移動游標，改變它的張力。",
    descriptionEn: "Light moves through a living structure. Move your pointer to change its tension.",
    attributes: ["流動材質", "空間深度", "感知回應"], attributesEn: ["Fluid material", "Spatial depth", "Responsive form"],
    phases: ["喚醒", "成形", "流動"], phasesEn: ["Awaken", "Take shape", "Flow"],
  },
  ascii: {
    letter: "B", name: "THOUGHT TO FORM", zh: "字元生成結構", en: "Thought into structure",
    description: "字元逐步形成結構，掃描光揭露它的表面。移動游標，探索生成中的秩序。",
    descriptionEn: "Characters become structure. A scan reveals the surface. Move your pointer to explore.",
    attributes: ["字元材質", "掃描揭露", "生成秩序"], attributesEn: ["Typographic material", "Scan reveal", "Emergent order"],
    phases: ["解碼", "建構", "揭露"], phasesEn: ["Decode", "Construct", "Reveal"],
  },
};

function StaticSculpture({ direction }: { direction: HeroDirection }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="direction-fallback" viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-material`} x1="100" y1="130" x2="490" y2="530" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d0e9ff" /><stop offset=".22" stopColor="#3778ce" /><stop offset=".5" stopColor="#07172f" /><stop offset=".8" stopColor="#2962af" /><stop offset="1" stopColor="#a2cfff" />
        </linearGradient>
        <linearGradient id={`${id}-heat`} x1="170" y1="190" x2="470" y2="480" gradientUnits="userSpaceOnUse"><stop stopColor="#ffddab" /><stop offset="1" stopColor="#fe5000" /></linearGradient>
        <mask id={`${id}-type`}>
          {Array.from({ length: 40 }, (_, i) => <text key={i} x="60" y={85 + i * 13} fill="white" fontFamily="monospace" fontSize="11">{i % 2 ? "{} +/ 08 := [] 8+ {} /+ 08 := [] 8+ {} +/ 08 := []" : "/+ 8+ := 08 {} /+ [] 8+ := 08 {} /+ [] 8+ := 08 {}"}</text>)}
        </mask>
      </defs>
      {direction === "organic" ? <g>
        <path d="M326 126C454 76 552 245 463 363C391 459 228 550 156 424C87 304 197 177 326 126Z" stroke={`url(#${id}-material)`} strokeWidth="100" />
        <path d="M309 161C419 119 496 255 423 350C364 427 252 496 197 404" stroke={`url(#${id}-heat)`} strokeWidth="8" />
        <path d="M330 80C470 61 570 223 502 349" stroke="#c2e3ff" strokeWidth="1.5" opacity=".65" />
      </g> : <g>
        <g stroke="#96cfff" strokeWidth="1" opacity=".28"><path d="m320 82 214 184-54 226-160 74L112 405l-17-194Z" /><path d="m320 82 160 410M95 211l439 55M112 405l368 87M320 566l214-300" /></g>
        <g mask={`url(#${id}-type)`}>
          <path d="m320 92 194 181-59 216-135 67-187-158-19-178Z" fill={`url(#${id}-material)`} />
          <path d="m114 220 206 163 194-110-194-181Z" fill="#b1deff" />
          <path d="m114 220 206 163v173L133 398Z" fill="#4c98d7" />
          <path d="m129 346 191 152 157-92-5 22-152 91-189-153Z" fill={`url(#${id}-heat)`} />
        </g>
      </g>}
    </svg>
  );
}

function DirectionStage({ direction, en }: { direction: HeroDirection; en: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const renderer = useRef<DirectionRenderer | null>(null);
  const [state, setState] = useState({ ready: false, reduced: false, progress: 0 });
  const [paused, setPaused] = useState(false);
  const info = directions[direction];
  const phase = Math.min(2, Math.floor(state.progress * 3));

  useEffect(() => {
    if (!canvas.current || !stage.current) return;
    const instance = createDirectionRenderer(canvas.current, stage.current, direction, setState);
    renderer.current = instance;
    return () => { instance?.destroy(); renderer.current = null; };
  }, [direction]);
  useEffect(() => { renderer.current?.pause(paused); }, [paused]);

  return (
    <figure className="direction-figure" data-ready={state.ready} data-paused={paused} data-reduced={state.reduced}>
      <div className="direction-scene-title"><span>{info.letter} / {info.name}</span><span>{en ? "INTERACTIVE STUDY" : "互動概念稿"}</span></div>
      <div ref={stage} className="direction-stage">
        <StaticSculpture direction={direction} />
        <canvas ref={canvas} className="direction-canvas" aria-hidden="true" />
        <span className="direction-axis direction-axis-x" aria-hidden="true">X — FORM</span>
        <span className="direction-axis direction-axis-y" aria-hidden="true">Y — INTELLIGENCE</span>
      </div>
      <div className="direction-timeline" aria-hidden="true"><span style={{ transform: `scaleX(${state.ready ? state.progress : 1})` }} /></div>
      <div className="direction-controls">
        <span className="direction-phase">{state.reduced || !state.ready ? (en ? "Still composition" : "靜態構圖") : `${String(phase + 1).padStart(2, "0")} / ${(en ? info.phasesEn : info.phases)[phase]}`}</span>
        <div>
          <button type="button" disabled={!state.ready || state.reduced} onClick={() => { renderer.current?.replay(); renderer.current?.pause(false); setPaused(false); }}><span aria-hidden="true">↻</span> {en ? "Replay" : "重播"}</button>
          <button type="button" disabled={!state.ready || state.reduced} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? (en ? "Play" : "播放") : (en ? "Pause" : "暫停")}</button>
        </div>
      </div>
      <figcaption>{en ? info.descriptionEn : info.description}</figcaption>
    </figure>
  );
}

export function HeroDirectionPreview() {
  const { locale } = useLanguage();
  const en = locale === "en";
  const copy = getHomeSectionContent(locale).hero;
  const [direction, setDirection] = useState<HeroDirection>("ascii");
  const info = directions[direction];
  return (
    <div className="hero-direction-preview" data-direction={direction}>
      <div className="direction-toolbar section-shell">
        <div className="direction-study-label"><span className="direction-dot" />{en ? "MOTION STUDIES / CONCEPT PREVIEW" : "MOTION STUDIES / 動態方向比較"}</div>
        <div className="direction-selector" role="group" aria-label={en ? "Animation direction" : "動畫方向"}>
          {(["organic", "ascii"] as const).map(key => <button key={key} type="button" aria-pressed={direction === key} onClick={() => setDirection(key)}><span>{directions[key].letter}</span>{en ? directions[key].en : directions[key].zh}</button>)}
        </div>
      </div>
      <section className="direction-layout section-shell" aria-labelledby="direction-headline">
        <div className="direction-copy">
          <p className="direction-eyebrow">8PLUS / ENGINEERING & AI</p>
          <h1 id="direction-headline">{copy.headline.map((line, index) => <span key={line} className={index === 1 ? "direction-title-accent" : undefined}>{line}</span>)}</h1>
          <p className="direction-lead">{copy.subtitle}</p>
          <div className="direction-actions"><Link href="/booking">{en ? "Discuss your project" : "聊聊你的專案"}<span aria-hidden="true">↗</span></Link><Link href="/lab">{en ? "Explore the work" : "看看實際作品"}<span aria-hidden="true">↗</span></Link></div>
          <p className="direction-footnote">{en ? "AI applications / System integration / Technical advisory" : "AI 應用 / 系統整合 / 技術顧問"}</p>
        </div>
        <DirectionStage key={direction} direction={direction} en={en} />
      </section>
      <div className="direction-bottom section-shell">
        <div><span className="direction-bottom-label">{en ? "ART DIRECTION" : "視覺方向"}</span><p>{info.letter} — {en ? info.en : info.zh}</p></div>
        <ul>{(en ? info.attributesEn : info.attributes).map(item => <li key={item}>{item}</li>)}</ul>
        <p className="direction-preview-note">{en ? "Two directions. Same message.\nConcepts for comparison; the homepage is unchanged." : "相同文案，兩種感受。\n此頁為比較用原型，首頁尚未替換。"}</p>
      </div>
    </div>
  );
}
