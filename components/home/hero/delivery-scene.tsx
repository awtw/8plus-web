"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { HomeLocale } from "@/lib/content/home-sections";

export function DeliveryScene({ locale }: { locale: HomeLocale }) {
  const en = locale === "en";
  const uid = useId().replace(/:/g, "");
  const root = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    let inView = true;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    }, { threshold: 0.1 });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);
  const id = (name: string) => `${uid}-${name}`;
  return (
    <figure ref={root} className="delivery-figure" data-expanded={expanded} data-entered={entered} data-paused={paused || !visible || reduced}>
      <div className="delivery-scene-heading">
        <span>IDEA → SYSTEM</span>
        <span>{en ? "ENGINEERING IN LAYERS" : "讓想法，層層落地"}</span>
      </div>
      <div className="delivery-scene-stage">
        <svg className="delivery-scene" viewBox="0 0 640 580" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={id("surface")} x1="130" y1="120" x2="460" y2="350" gradientUnits="userSpaceOnUse"><stop stopColor="#90b8ff" stopOpacity=".48"/><stop offset=".55" stopColor="#1b54b7" stopOpacity=".85"/><stop offset="1" stopColor="#112752"/></linearGradient>
            <linearGradient id={id("edge")} x1="120" y1="230" x2="520" y2="330" gradientUnits="userSpaceOnUse"><stop stopColor="#265fb9"/><stop offset=".5" stopColor="#102659"/><stop offset="1" stopColor="#2757a0"/></linearGradient>
            <linearGradient id={id("core")} x1="260" y1="170" x2="380" y2="240" gradientUnits="userSpaceOnUse"><stop stopColor="#ffd5ae"/><stop offset="1" stopColor="#ff783c"/></linearGradient>
            <radialGradient id={id("halo")}><stop stopColor="#5088ff" stopOpacity=".4"/><stop offset="1" stopColor="#5088ff" stopOpacity="0"/></radialGradient>
            <pattern id={id("grid")} width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .55 -1 .55 320 25)"><path d="M32 0H0V32" stroke="#96bfff" strokeOpacity=".12"/></pattern>
            <filter id={id("glow")} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="7"/></filter>
          </defs>
          <ellipse cx="320" cy="352" rx="300" ry="215" fill={`url(#${id("halo")})`}/>
          <path d="M40 325 320 171 600 325 320 479Z" fill={`url(#${id("grid")})`} stroke="#7095d8" strokeOpacity=".16"/>
          <ellipse cx="320" cy="429" rx="169" ry="48" fill="#020f32" opacity=".48"/>
          <g className="delivery-assembly">
            <g className="delivery-layer delivery-layer-base">
              <path d="M120 230 320 120 520 230V247L320 357 120 247Z" fill={`url(#${id("edge")})`} stroke="#6394dc" strokeOpacity=".5"/>
              <path d="m120 230 200-110 200 110-200 110Z" fill={`url(#${id("surface")})`} stroke="#98c3ff" strokeOpacity=".65"/>
              <path d="m160 230 160-88 160 88-160 88Z" stroke="#b2ceff" strokeOpacity=".2"/>
              <path d="m185 244 70-38 64 35 105-58M236 278l56-31 93 51M319 340v17" stroke="#93b5f1" strokeOpacity=".6"/>
              <path className="delivery-signal" d="m185 244 70-38 64 35 105-58" stroke="#ffba88" strokeWidth="2" pathLength="100"/>
              <g fill="#c2dbff"><circle cx="185" cy="244" r="3"/><circle cx="385" cy="298" r="3"/><circle cx="424" cy="183" r="3"/></g>
              <path d="m346 334 38-21m8-4 12-7" stroke="#80acf7" strokeWidth="3"/>
            </g>
            <g className="delivery-layer delivery-layer-middle">
              <path d="m140 230 180-99 180 99v13l-180 99-180-99Z" fill={`url(#${id("edge")})`} stroke="#80aaf3" strokeOpacity=".6"/>
              <path d="m140 230 180-99 180 99-180 99Z" fill={`url(#${id("surface")})`} stroke="#b2d1ff" strokeOpacity=".75"/>
              <path d="m185 230 135-74 135 74-135 74Z" stroke="#9bbfff" strokeOpacity=".45" strokeDasharray="3 6"/>
              <path d="m215 230 105-58 105 58-105 58Z" fill="#091e50" fillOpacity=".65" stroke="#81b6ff"/>
              <path className="delivery-signal delivery-signal-alt" d="m185 230 135-74 135 74-135 74Z" stroke="#ffc28c" strokeWidth="2" pathLength="100"/>
              <path d="m160 232 20 11m5 3 20 11m5 3 20 11" stroke="#a8cdff" strokeWidth="2"/>
            </g>
            <g className="delivery-layer delivery-layer-core">
              <ellipse cx="320" cy="244" rx="78" ry="36" fill="#ff925c" opacity=".28" filter={`url(#${id("glow")})`}/>
              <path d="m261 207 59-33 59 33v57l-59 33-59-33Z" fill="#df5c27" stroke="#ffaf7a"/>
              <path d="m320 240 59-33v57l-59 33Z" fill="#a93a19"/>
              <path d="m261 207 59-33 59 33-59 33Z" fill={`url(#${id("core")})`} stroke="#ffe3ca"/>
              <path d="m294 207 26-15 26 15-26 15Z" stroke="#fff3e5" strokeWidth="2"/>
              <path d="m271 225 37 21m-37-9 37 21m-37-9 37 21" stroke="#ffc594" strokeOpacity=".65"/>
              <path className="delivery-core-light" d="m331 247 35-20" stroke="#ffc79b" strokeWidth="3"/>
            </g>
            <g className="delivery-layer delivery-layer-top" onAnimationEnd={() => setEntered(true)}>
              <path d="m161 230 159-88 159 88v8l-159 88-159-88Z" fill="#6088ce" fillOpacity=".2" stroke="#c1dcff" strokeOpacity=".6"/>
              <path d="m161 230 159-88 159 88-159 88Z" fill="#b5d4ff" fillOpacity=".13" stroke="#d5e6ff"/>
              <path d="m183 230 137-75 137 75-137 75Z" stroke="#d5e6ff" strokeOpacity=".35"/>
              <path d="m228 221 28-16 28 16-28 16Zm73-40 28-16 28 16-28 16Zm0 80 28-16 28 16-28 16Zm73-40 28-16 28 16-28 16Z" fill="#b6d6ff" fillOpacity=".22" stroke="#cce1ff" strokeOpacity=".65"/>
              <path d="m279 221 24 13m53-41 22 13m-21 48 20-12" stroke="#d8e9ff" strokeOpacity=".55"/>
              <path className="delivery-signal" d="m183 230 137-75 137 75-137 75Z" stroke="#eff7ff" strokeWidth="2" pathLength="100"/>
            </g>
          </g>
          <g stroke="#95b5e9" strokeOpacity=".6"><path d="M435 139h85l20-20M466 352h66l16 16M192 307h-76l-20 20"/><circle cx="435" cy="139" r="3" fill="#abcfff"/><circle cx="466" cy="352" r="3" fill="#abcfff"/></g>
          <g fill="#b8cffa" fontFamily="monospace" fontSize="10" letterSpacing="2"><text x="464" y="108">INTERFACE</text><text x="489" y="388">SYSTEM</text><text x="57" y="348">DATA</text></g>
          <g className="delivery-orbit-point" fill="#ffb783"><circle cx="86" cy="250" r="4"/><circle cx="546" cy="282" r="3"/></g>
        </svg>
      </div>
      <div className="delivery-scene-controls">
        <p>{en ? "One idea. A system that works." : "從一個想法，到真正運作。"}</p>
        <div>
          <button type="button" onClick={() => { setEntered(true); setExpanded(!expanded); }} aria-pressed={expanded}>
            <span aria-hidden="true">{expanded ? "↙" : "↗"}</span> {expanded ? (en ? "Assemble" : "組合系統") : (en ? "Explore layers" : "展開結構")}
          </button>
          <button type="button" className="delivery-motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reduced} aria-label={paused ? (en ? "Play animation" : "播放動畫") : (en ? "Pause animation" : "暫停動畫")}>
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span className="sr-only">{paused ? (en ? "Play" : "播放") : (en ? "Pause" : "暫停")}</span>
          </button>
        </div>
      </div>
      <figcaption>{en ? "SYSTEM ASSEMBLY / CONCEPT VISUAL" : "系統組裝示意 / 非即時數據"}</figcaption>
    </figure>
  );
}
