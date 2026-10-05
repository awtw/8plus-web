"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useLanguage } from "@/components/language-provider";
import { getHomeSectionContent } from "@/lib/content/home-sections";
import { motionStudies, type MotionMode } from "@/lib/content/hero-motion-studies";
import { MotionScene, useSceneClock } from "./hero-motion-scenes";
import "@/styles/pages/hero-motion-lab.css";

function modeIndex(mode?: string) { return Math.max(0, motionStudies.findIndex(study => study.id === mode)); }
const settings: Record<MotionMode, { initial: number; label: string; action: string }> = {
  pixels: { initial: 67, label: "解碼程度", action: "完整解碼" },
  type: { initial: 50, label: "", action: "切換字形構圖" },
  magnetic: { initial: 65, label: "牽引強度", action: "移動牽引中心" },
  split: { initial: 48, label: "需求／成果分割", action: "下一個作品" },
  focus: { initial: 50, label: "", action: "切換聚焦" },
  grain: { initial: 65, label: "筆觸大小", action: "畫一道筆觸" },
  loupe: { initial: 60, label: "透鏡倍率", action: "下一個作品" },
  editorial: { initial: 65, label: "編排展開", action: "下一個重點作品" },
  product: { initial: 52, label: "系統拆解", action: "組合／拆解" },
  world: { initial: 50, label: "", action: "前往下一站" },
};

function LabStage({ index }: { index: number }) {
  const { locale } = useLanguage();
  const en = locale === "en";
  const copy = getHomeSectionContent(locale).hero;
  const study = motionStudies[index];
  const config = settings[study.id];
  const stage = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  const [value, setValue] = useState(config.initial);
  const [selected, setSelected] = useState(0);
  const [pointer, setPointer] = useState({ x: .55, y: .45 });
  const [trails, setTrails] = useState<{ x: number; y: number; time: number }[]>([]);
  const { time, reduced } = useSceneClock(stage, paused, replay);
  const sceneTime = time;
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (paused || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    let point = { x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)) };
    if (study.id === "grain") {
      const svg = event.currentTarget.querySelector("svg");
      const matrix = svg?.getScreenCTM();
      if (matrix) {
        const local = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
        point = { x: local.x / 1000, y: local.y / 550 };
      }
    }
    setPointer(point);
    if (study.id === "grain") setTrails(previous => [...previous.filter(p => sceneTime - p.time < 4).slice(-55), { ...point, time: sceneTime }]);
  };
  const action = () => {
    setSelected(previous => previous + 1);
    if (study.id === "pixels") setValue(value === 100 ? 30 : 100);
    if (study.id === "product") setValue(value > 50 ? 0 : 100);
    if (study.id === "magnetic") setPointer({ x: pointer.x > .5 ? .2 : .8, y: pointer.y > .5 ? .25 : .75 });
    if (study.id === "grain") setTrails(Array.from({ length: 20 }, (_, i) => ({ x: .15 + i / 28, y: .5 + Math.sin(i * .4) * .16, time: sceneTime })));
  };
  const reset = () => { setReplay(previous => previous + 1); setPaused(false); setValue(config.initial); setSelected(0); setTrails([]); setPointer({ x: .55, y: .45 }); };
  return <>
    <section ref={stage} className={`hml-stage hml-mode-${study.id}`} data-paused={paused || reduced} aria-labelledby="hml-headline">
      <div className="hml-stage-top"><span>8PLUS <i>INDEPENDENT ENGINEERING</i></span><span>STUDY {String(index + 1).padStart(2, "0")} / 10</span></div>
      <div className="hml-stage-copy"><p className="hml-eyebrow">{en ? "FROM AN IDEA TO A WORKING SYSTEM" : "從想法，到團隊真的能用的系統。"}</p><h1 id="hml-headline">{copy.headline.map(line => <span key={line}>{line}</span>)}</h1><p className="hml-description">{copy.subtitle}</p><div className="hml-cta"><Link href="/booking">{en ? "Discuss your project" : "聊聊你的專案"} <span>↗</span></Link><Link href="/lab">{en ? "Explore the work" : "看看實際作品"} <span>↗</span></Link></div></div>
      <div className="hml-art" onPointerMove={move} onPointerDown={move}>
        <MotionScene mode={study.id} time={Math.max(0, sceneTime)} value={value} selected={selected} pointer={pointer} trails={trails} onSelect={setSelected} />
      </div>
      <div className="hml-stage-footer"><span>AI APPLICATIONS / SYSTEMS / ADVISORY</span><span>{study.name} · 原創互動示意</span></div>
    </section>
    <div className="hml-controls"><div className="hml-playback"><span className="hml-live" data-active={!paused && !reduced}>{reduced ? "減少動態 · 靜態模式" : paused ? "已暫停" : "動態播放"}</span><button type="button" onClick={() => setPaused(previous => !previous)} aria-pressed={paused} disabled={reduced}>{paused ? "播放" : "暫停"}</button><button type="button" onClick={reset}>↻ 重播</button></div><div className="hml-specific-controls">{config.label && <label>{config.label}<input aria-label={config.label} type="range" min={study.id === "loupe" ? 25 : 0} max="100" value={value} onChange={event => setValue(Number(event.target.value))} /><output>{study.id === "loupe" ? `×${(value / 25).toFixed(1)}` : `${value}%`}</output></label>}<button type="button" onClick={action}>{config.action} ↗</button>{study.id === "world" && <div className="hml-stations">{["需求", "原型", "整合", "交付"].map((label, i) => <button key={label} type="button" aria-pressed={selected % 4 === i} onClick={() => setSelected(i)}>{label}</button>)}</div>}{study.id === "loupe" && <label>透鏡位置<input aria-label="透鏡位置" type="range" min="0" max="100" value={Math.round(pointer.x * 100)} onChange={event => setPointer({ x: Number(event.target.value) / 100, y: .45 })} /></label>}</div></div>
    <p className="hml-operation">操作：{study.hint}。所有滑桿支援鍵盤方向鍵；減少動態時仍可手動比較。</p>
  </>;
}

export function HeroMotionLab({ initialMode }: { initialMode?: string }) {
  const [index, setIndex] = useState(() => modeIndex(initialMode));
  const study = motionStudies[index];
  useEffect(() => {
    const onPop = () => setIndex(modeIndex(new URLSearchParams(window.location.search).get("mode") ?? undefined));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const choose = (next: number) => {
    const normalized = (next + motionStudies.length) % motionStudies.length;
    setIndex(normalized);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", motionStudies[normalized].id);
    window.history.pushState({}, "", url);
  };
  return <div className="hml">
    <header className="hml-header"><div><p>8PLUS / MOTION RESEARCH — OCT 2026</p><h2>十種方向。親手試試。</h2></div><p>近期作者案例 → 原創互動轉譯<br /><span>獎項與作者曝光為選例依據，非熱度排行榜。</span></p></header>
    <nav className="hml-selector" aria-label="十種 Hero 原型">{motionStudies.map((item, i) => <button key={item.id} type="button" onClick={() => choose(i)} aria-pressed={index === i}><span>{String(i + 1).padStart(2, "0")}</span>{item.name}<i aria-hidden="true">{["▦", "Aa", "≈", "◧", "⌗", "▨", "⊕", "▤", "◇", "⌘"][i]}</i></button>)}</nav>
    <div className="hml-current"><p><strong>{String(index + 1).padStart(2, "0")} — {study.name}</strong><span>靈感 / {study.reference}</span></p><div><button type="button" onClick={() => choose(index - 1)} aria-label="上一版">←</button><button type="button" onClick={() => choose(index + 1)} aria-label="下一版">→</button></div></div>
    <LabStage key={study.id} index={index} />
    <aside className="hml-research" aria-label="參考來源與轉化"><div><span>REFERENCE / 參考依據</span><h3>{study.reference}</h3><p>{study.evidence}<br />{study.date} · {index === 8 ? "作品年度" : "文章日期，非網站上線日"}</p><div className="hml-source-links"><a href={study.url} target="_blank" rel="noreferrer">查看原站 ↗</a><a href={study.source} target="_blank" rel="noreferrer">作者／報導來源 ↗</a></div></div><div><span>ORIGINAL / 原作機制</span><p>{study.mechanism}</p></div><div><span>8PLUS / 本次轉化</span><p>{study.adaptation}</p><small>本地 DOM / SVG 輕量轉譯；非原站複製、非同等 3D 製作品質。研究核對：2026-10-05。</small></div></aside>
  </div>;
}
