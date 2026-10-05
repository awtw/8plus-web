"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject, type CSSProperties } from "react";
import type { MotionMode } from "@/lib/content/hero-motion-studies";

export const labProjects = [
  { name: "Transcript Plus", image: "/og/labs/transcript-plus/web.webp", label: "語音 × 工作流程" },
  { name: "CRM", image: "/og/labs/crm/web.webp", label: "資料 × 系統整合" },
  { name: "B18", image: "/og/labs/b18/web.webp", label: "品牌 × 網站體驗" },
];

export function useSceneClock(stage: RefObject<HTMLElement | null>, paused: boolean, replay: number) {
  const [time, setTime] = useState(0);
  const [reduced, setReduced] = useState(false);
  const elapsed = useRef(0);
  const lastReplay = useRef(replay);
  useEffect(() => {
    if (lastReplay.current !== replay) { elapsed.current = 0; lastReplay.current = replay; setTime(0); }
    let frame = 0;
    let previous = 0;
    let visible = false;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tick = (now: number) => {
      if (previous) elapsed.current += Math.min(now - previous, 50) / 1000;
      previous = now;
      setTime(elapsed.current);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      setReduced(media.matches);
      if (media.matches) setTime(0);
      if (!paused && !media.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0 });
    if (stage.current) observer.observe(stage.current);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    sync();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener("visibilitychange", sync); media.removeEventListener("change", sync); };
  }, [stage, paused, replay]);
  return { time, reduced };
}

type SceneProps = { onSelect: (index: number) => void; mode: MotionMode; time: number; value: number; selected: number; pointer: { x: number; y: number }; trails: { x: number; y: number; time: number }[] };

function ProjectImage({ index, className = "" }: { index: number; className?: string }) {
  const project = labProjects[index % 3];
  return <Image className={className} src={project.image} alt={`${project.name} 現有作品畫面`} width={1200} height={630} unoptimized />;
}

export function MotionScene({ mode, time: t, value, selected, pointer, trails, onSelect }: SceneProps) {
  const phase = Math.sin(t * 0.7);
  if (mode === "pixels") return <div className="hml-pixel-art" aria-hidden="true">
    <span className="hml-pixel-word">8plus<span>IDEAS INTO SYSTEMS.</span></span>
    <div className="hml-pixels">{Array.from({ length: 144 }, (_, i) => {
      const x = i % 16, y = Math.floor(i / 16);
      const distance = Math.hypot(x / 16 - pointer.x, y / 9 - pointer.y);
      const reveal = ((x * 7 + y * 13) % 100) < value;
      return <i key={i} style={{ background: (x + y) % 7 < 2 ? "#ff794c" : "#253bfd", opacity: reveal ? 0 : 0.96, transform: `translate(${distance < 0.22 ? (x / 16 - pointer.x) * 160 : Math.sin(t + i) * 3}px, ${distance < 0.22 ? (y / 9 - pointer.y) * 160 : Math.cos(t + i) * 3}px) scale(${0.9 + Math.sin(t + i * .7) * .1})` }} />;
    })}</div><span className="hml-art-index">01 / DECODE THE POSSIBLE</span>
  </div>;

  if (mode === "type") return <div className="hml-type-art" aria-hidden="true">
    <svg viewBox="0 0 1000 390"><defs><clipPath id="hml-word"><text x="500" y="305" textAnchor="middle" fontSize="360" fontWeight="900" letterSpacing="-32" fontFamily="Arial, sans-serif">8plus</text></clipPath></defs>
      <g clipPath="url(#hml-word)"><rect width="1000" height="390" fill="#163aff" />{Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 155 - 180 + Math.sin(t + i) * 55} y={-220} width={selected % 2 ? 80 : 145} height="800" fill={i % 2 ? "#ff7647" : "#f3eee3"} transform={`rotate(${selected % 2 ? -25 + phase * 9 : 25 + phase * 12} 500 190)`} />)}</g>
    </svg><div className="hml-type-bracket" style={{ transform: `scaleX(${selected % 2 ? .8 : .98}) rotate(${phase * 1.5}deg)` }} /><p>THINK IT. BUILD IT. MAKE IT WORK.</p>
  </div>;

  if (mode === "magnetic") return <div className="hml-magnetic-art" aria-hidden="true"><svg viewBox="0 0 700 620"><defs><linearGradient id="hml-metal"><stop stopColor="#2444ff" /><stop offset=".46" stopColor="#879dff" /><stop offset=".53" stopColor="#f7e9dc" /><stop offset=".69" stopColor="#fa7442" /><stop offset="1" stopColor="#101244" /></linearGradient></defs>{Array.from({ length: 26 }, (_, i) => {
    const y = 65 + i * 19, pull = (pointer.x - .5) * value * 2;
    return <path key={i} d={`M 80 ${y} C ${150 + pull} ${y - 100 - Math.sin(t + i * .12) * 45}, ${470 + pull} ${y + (pointer.y - .5) * 160 + 110}, 635 ${y - 18}`} fill="none" stroke="url(#hml-metal)" strokeWidth="20" />;
  })}</svg><p>FORM FOLLOWS INTENT.</p></div>;

  if (mode === "split") return <div className="hml-split-art"><div className="hml-split-under"><span>01 / 需求</span><strong>把複雜<br />拆成下一步。</strong><div className="hml-notes">需求釐清<br />資料與權限<br />評測和系統整合</div></div><div className="hml-split-over" style={{ clipPath: `inset(0 0 0 ${value}%)` }}><ProjectImage index={selected} /><span>02 / 介面成果</span></div><div className="hml-split-divider" style={{ left: `${value}%` }}><span>↔</span></div><small>真實作品畫面 / {labProjects[selected % 3].name}</small></div>;

  if (mode === "focus") return <div className="hml-focus-art"><div className="hml-focus-collage" style={{ filter: `blur(${selected % 2 ? 0 : 5}px)`, transform: `scale(${selected % 2 ? .9 : 1.08}) rotate(${selected % 2 ? 0 : phase * 3}deg)` }}>{labProjects.map((project, i) => <div key={project.name} style={{ transform: `translateY(${Math.sin(t * .5 + i) * 18}px) rotate(${(i - 1) * 12}deg)` }}><ProjectImage index={i} /><span>{project.name}</span></div>)}</div><div className="hml-focus-frame"><i /><i /><i /><i /><span>{selected % 2 ? "FOCUS / 清晰的下一步" : "EXPLORE / 從模糊的想法開始"}</span></div><strong>{selected % 2 ? "Clarity." : "What if?"}</strong></div>;

  if (mode === "grain") return <div className="hml-grain-art" aria-hidden="true"><svg viewBox="0 0 1000 550"><defs><pattern id="hml-hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0V6" stroke="#f3eee3" strokeWidth="1" /></pattern><mask id="hml-brush"><rect width="1000" height="550" fill="black" />{trails.map((point, i) => <circle key={i} cx={point.x * 1000} cy={point.y * 550} r={value} fill="white" opacity={Math.max(0, 1 - (t - point.time) / 4)} />)}<circle cx={500 + Math.sin(t * .6) * 240} cy={275 + Math.cos(t * .8) * 80} r="120" fill="white" opacity=".45" /></mask></defs><rect width="1000" height="550" fill="#1627d5" /><text x="500" y="385" textAnchor="middle" fill="#eee7db" fontSize="360" fontWeight="900" letterSpacing="-20">8plus</text><rect width="1000" height="550" fill="url(#hml-hatch)" opacity=".55" /><g mask="url(#hml-brush)"><rect width="1000" height="550" fill="#ff7548" /><text x="500" y="385" textAnchor="middle" fill="#172fd6" fontSize="360" fontWeight="900" letterSpacing="-20">8plus</text></g></svg><span>LEAVE A MARK. MAKE IT MATTER.</span></div>;

  if (mode === "loupe") {
    const zoom = value / 25;
    const x = 225 + pointer.x * 450, y = 205 + pointer.y * 180;
    const project = labProjects[selected % 3];
    return <div className="hml-loupe-art"><svg viewBox="0 0 900 650" role="img" aria-label={`${project.name} 作品細節，放大 ${zoom.toFixed(1)} 倍`}>
      <defs><clipPath id="hml-lens-clip"><circle cx={x} cy={y} r="85" /></clipPath></defs>
      <rect x="105" y="80" width="690" height="495" rx="3" fill="#f6f0e3" />
      <image href={project.image} x="130" y="105" width="640" height="400" preserveAspectRatio="xMidYMid slice" />
      <text x="135" y="547" fill="#20291c" fontSize="20">8PLUS / {project.name}</text>
      <path d={`M${x + 65} ${y + 65} l75 75`} stroke="#f7f2e9" strokeWidth="20" strokeLinecap="round" />
      <g clipPath="url(#hml-lens-clip)"><g transform={`translate(${x} ${y}) scale(${zoom}) translate(${-x} ${-y})`}><image href={project.image} x="130" y="105" width="640" height="400" preserveAspectRatio="xMidYMid slice" /></g></g>
      <circle cx={x} cy={y} r="85" fill="none" stroke="#f7f2e9" strokeWidth="12" />
      <rect x={x - 27} y={y + 45} width="54" height="25" rx="3" fill="#f7f2e9" /><text x={x} y={y + 62} textAnchor="middle" fill="#20291c" fontSize="14">×{zoom.toFixed(1)}</text>
    </svg><p>DETAILS MAKE THE DIFFERENCE.</p></div>;
  }

  if (mode === "editorial") return <div className="hml-editorial-art" style={{ "--hml-spread": `${10 + value * .2}px` } as CSSProperties}>{labProjects.map((project, i) => <figure key={project.name} className={selected % 3 === i ? "is-selected" : ""} style={{ transform: `translateY(${(i % 2 ? 1 : -1) * value * .5 + Math.sin(t * .6 + i) * 5}px) rotate(${(i - 1) * (100 - value) * .04}deg)` }}><ProjectImage index={i} /><figcaption><button type="button" aria-pressed={selected % 3 === i} onClick={() => onSelect(i)}>0{i + 1} / {project.label}</button><strong>{project.name}</strong></figcaption></figure>)}</div>;

  if (mode === "product") return <div className="hml-product-art"><div className="hml-product-stack" style={{ transform: `rotateX(52deg) rotateZ(${-32 + (pointer.x - .5) * 12}deg)` }}>{["APPLICATION", "MODEL + EVAL", "DATA + ACCESS"].map((label, i) => <div className={`hml-product-layer layer-${i}`} key={label} style={{ "--hml-z": `${(2 - i) * (15 + value * 1.3)}px`, transform: "translateZ(var(--hml-z))" } as CSSProperties}><span>0{i + 1} / {label}</span><div>{Array.from({ length: 12 }, (_, n) => <i key={n} style={{ opacity: .3 + (Math.sin(t + n + i) + 1) * .35 }} />)}</div><strong>{["8plus", "AI", "{ } "][i]}</strong></div>)}</div><p>CONCEPT SYSTEM / 互動示意，無 AI 推論</p><div className="hml-product-axis">資料 → 模型與評測 → 應用</div></div>;

  const stations = ["需求釐清", "原型驗證", "系統整合", "交付維護"];
  return <div className="hml-world-art"><svg viewBox="0 0 900 600" role="img" aria-label={`工作地圖：目前在${stations[selected % 4]}`}><defs><pattern id="hml-grid" width="60" height="34.6" patternUnits="userSpaceOnUse"><path d="M0 17.3 30 0 60 17.3 30 34.6Z" fill="none" stroke="#58634e" strokeWidth=".6" /></pattern></defs><path d="M40 290 450 50 860 290 450 530Z" fill="#d9dec8" stroke="#a9b297" /><path d="M40 290 450 50 860 290 450 530Z" fill="url(#hml-grid)" /><path d="M250 270 430 165 650 285 470 405Z" fill="none" stroke="#f1efe3" strokeWidth="34" />{stations.map((station, i) => {
    const [x, y] = [[250, 270], [430, 165], [650, 285], [470, 405]][i];
    const active = selected % 4 === i; const height = active ? 92 + Math.sin(t * 1.8) * 5 : 50;
    return <g key={station}><path d={`M${x - 58} ${y} l58 -34 58 34 -58 34Z`} fill="#7a8769" /><path d={`M${x - 48} ${y - height} l48 -28 48 28 -48 28Z`} fill={active ? "#ff8a53" : "#f6f1e7"} /><path d={`M${x - 48} ${y - height} l48 28 v${height} l-48 -28Z`} fill={active ? "#e45527" : "#a4af90"} /><path d={`M${x} ${y - height + 28} l48 -28 v${height} l-48 28Z`} fill={active ? "#fdac73" : "#c6ceb8"} /><text x={x} y={y - height - 48} textAnchor="middle" fill="#26372b" fontSize="16" fontWeight="600">0{i + 1} {station}</text>{active && <circle cx={x + 58} cy={y + 28} r="10" fill="#2041f5" />}</g>;
  })}</svg><span>THE WORK IS A JOURNEY.</span></div>;
}
