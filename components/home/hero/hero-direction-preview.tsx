"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { getHomeSectionContent } from "@/lib/content/home-sections";
import { createSignalRenderer, type SignalRenderer } from "@/lib/visuals/hero-signal-renderer";
import "@/styles/pages/hero-direction-preview.css";

function SignalFallback() {
  return <svg className="signal-fallback" viewBox="0 0 1440 850" preserveAspectRatio="none" fill="none" aria-hidden="true">
    {Array.from({ length: 18 }, (_, index) => <path key={index} d={`M -100 ${180 + index * 15} C 390 ${-60 + index * 10}, 560 ${220 + index * 10}, 1550 ${470 + index * 10}`} stroke={index === 8 ? "#ff9959" : "#a3c9ff"} strokeWidth={index === 8 ? 2 : 0.8} opacity={index === 8 ? 0.9 : 0.3} />)}
  </svg>;
}

export function HeroDirectionPreview() {
  const { locale } = useLanguage();
  const en = locale === "en";
  const copy = getHomeSectionContent(locale).hero;
  const stage = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<SignalRenderer | null>(null);
  const [state, setState] = useState({ ready: false, reduced: false, progress: 0 });
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!canvas.current || !stage.current) return;
    const instance = createSignalRenderer(canvas.current, stage.current, setState);
    renderer.current = instance;
    return () => { instance?.destroy(); renderer.current = null; };
  }, []);
  useEffect(() => { renderer.current?.pause(paused); }, [paused]);

  return <div className="hero-direction-preview">
    <section ref={stage} className="signal-hero" data-ready={state.ready} data-reduced={state.reduced} data-paused={paused} aria-labelledby="signal-headline">
      <div className="signal-field" aria-hidden="true"><SignalFallback /><canvas ref={canvas} /></div>
      <div className="signal-topline"><p><span />8PLUS / ENGINEERING & AI</p><span>{en ? "IDEAS INTO SYSTEMS" : "從想法，到系統。"}</span></div>
      <div className="signal-intro">
        <p className="signal-chapter">01 — SIGNAL TO STRUCTURE<span>{en ? "Clarity in motion." : "讓想法，逐漸清晰。"}</span></p>
        <div className="signal-copy">
          <h1 id="signal-headline">{copy.headline.map(line => <span key={line}>{line}</span>)}</h1>
          <p className="signal-description">{copy.subtitle}</p>
          <div className="signal-actions"><Link href="/booking">{en ? "Discuss your project" : "聊聊你的專案"}<span aria-hidden="true">↗</span></Link><Link href="/lab">{en ? "Explore the work" : "看看實際作品"}<span aria-hidden="true">↗</span></Link></div>
        </div>
      </div>
      <div className="signal-wordmark" aria-hidden="true">8plus</div>
      <div className="signal-bottomline">
        <p>{en ? "AI applications. System integration. Technical advisory." : "AI 應用・系統整合・技術顧問"}</p>
        <div className="signal-controls">
          <span className="signal-phase">{state.reduced || !state.ready ? (en ? "Still" : "靜態") : state.progress < 1 ? (en ? "Taking shape" : "訊號成形") : (en ? "In flow" : "持續流動")}</span>
          <button type="button" disabled={!state.ready || state.reduced} onClick={() => { renderer.current?.replay(); renderer.current?.pause(false); setPaused(false); }} aria-label={en ? "Replay animation" : "重播動畫"}>↻ <span>{en ? "Replay" : "重播"}</span></button>
          <button type="button" disabled={!state.ready || state.reduced} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? (en ? "Play" : "播放") : (en ? "Pause" : "暫停")}</button>
        </div>
      </div>
    </section>
    <p className="signal-preview-note">{en ? "Signal to structure — Hero concept preview. The homepage is unchanged." : "訊號成形 — Hero 概念預覽，正式首頁尚未替換。"}</p>
  </div>;
}
