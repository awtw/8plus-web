"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { HomeLocale } from "@/lib/content/home-sections";
import { createNeuralField, type NeuralField } from "@/lib/visuals/neural-field";

export function DeliveryScene({ locale }: { locale: HomeLocale }) {
  const en = locale === "en";
  const uid = useId().replace(/:/g, "");
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const field = useRef<NeuralField | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvas.current || !stage.current) return;
    const instance = createNeuralField(canvas.current, stage.current, setReady, setReduced);
    field.current = instance;
    return () => { instance?.destroy(); field.current = null; };
  }, []);
  useEffect(() => { field.current?.pause(paused); }, [paused]);

  return (
    <figure className="delivery-figure" data-ready={ready} data-paused={paused}>
      <div className="delivery-scene-heading">
        <span><i aria-hidden="true" /> 8PLUS / NEURAL FIELD</span>
        <span>{en ? "IDEAS TAKE SHAPE" : "讓想法，形成可能"}</span>
      </div>
      <div ref={stage} className="delivery-scene-stage">
        <svg className="delivery-scene-fallback" viewBox="0 0 640 580" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id={`${uid}-sphere`} cx="35%" cy="30%">
              <stop stopColor="#e4f1ff" stopOpacity=".34" />
              <stop offset=".7" stopColor="#69acff" stopOpacity=".08" />
              <stop offset="1" stopColor="#a6d5ff" stopOpacity=".4" />
            </radialGradient>
          </defs>
          <g stroke="#7baeff" strokeOpacity=".25">
            <ellipse cx="320" cy="290" rx="275" ry="115" transform="rotate(-27 320 290)" />
            <ellipse cx="320" cy="290" rx="250" ry="173" transform="rotate(38 320 290)" />
          </g>
          <g transform="translate(100 70) scale(4.4)">
            <g fill={`url(#${uid}-sphere)`} stroke="#b2d7ff" strokeWidth=".35">
              <circle cx="32" cy="29" r="18" /><circle cx="70" cy="64" r="28" />
            </g>
            <g stroke="#b2d7ff" strokeWidth=".25" strokeDasharray=".25 1.1" opacity=".6">
              <ellipse cx="32" cy="29" rx="18" ry="7" /><ellipse cx="32" cy="29" rx="8" ry="18" />
              <ellipse cx="70" cy="64" rx="28" ry="12" /><ellipse cx="70" cy="64" rx="14" ry="28" />
              <circle cx="32" cy="29" r="13" /><circle cx="70" cy="64" r="21" />
            </g>
            <path d="M53 9H68L36 91H21L53 9Z" fill="#ffa570" fillOpacity=".8" />
          </g>
        </svg>
        <canvas ref={canvas} className="delivery-neural-canvas" aria-hidden="true" />
        <span className="delivery-field-label delivery-field-label-top" aria-hidden="true">CONNECT</span>
        <span className="delivery-field-label delivery-field-label-bottom" aria-hidden="true">CREATE</span>
      </div>
      <div className="delivery-scene-controls">
        <p>{en ? "One idea. A system that works." : "從一個想法，到真正運作。"}</p>
        <div>
          <button type="button" disabled={reduced || !ready} onClick={() => { field.current?.replay(); setPaused(false); }}>
            <span aria-hidden="true">↻</span> {en ? "Replay" : "重新聚合"}
          </button>
          <button type="button" className="delivery-motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reduced || !ready} aria-label={paused ? (en ? "Play animation" : "播放動畫") : (en ? "Pause animation" : "暫停動畫")}>
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          </button>
        </div>
      </div>
      <figcaption>{reduced ? (en ? "STATIC VISUAL / REDUCED MOTION" : "靜態視覺 / 已減少動態") : (en ? "INTERACTIVE BRAND EXPLORATION / CONCEPT VISUAL" : "品牌互動探索 / 概念視覺")}</figcaption>
    </figure>
  );
}
