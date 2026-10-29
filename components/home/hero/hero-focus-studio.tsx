"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getHomeSectionContent, type HomeLocale } from "@/lib/content/home-sections";
import "@/styles/pages/home-focus-studio.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
const phoneQuery = "(max-width: 700px)";
const subscribeTo = (query: string) => (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const subscribeMotion = subscribeTo(motionQuery);
const subscribePhone = subscribeTo(phoneQuery);
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getPhone = () => window.matchMedia(phoneQuery).matches;
const getServerFalse = () => false;

// 20 s brand film made with huashu-motion (source: motion/hero-brand), played live in an iframe:
// public/hero/film is the composition itself, built by motion/hero-brand/tools/make-web.sh.
// Phones get the 4:5 cut; the poster shows until the film says it is ready.
const filmFor = (lang: "zh" | "en", tall: boolean) => {
  const base = `/hero/brand-${lang}${tall ? "-tall" : ""}`;
  return { src: `/hero/film/index.html?live=1&lang=${lang}&format=${tall ? "tall" : "wide"}`, poster: `${base}-poster.jpg`, still: `${base}-still.jpg` };
};

export function HeroFocusStudio({ locale }: { locale: HomeLocale }) {
  const en = locale === "en";
  const copy = getHomeSectionContent(locale).hero;
  const phone = useSyncExternalStore(subscribePhone, getPhone, getServerFalse);
  const film = filmFor(en ? "en" : "zh", phone);
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerFalse);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const ready = readySrc === film.src;

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    let visible = false;
    const syncVisibility = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncVisibility();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.film === "8plus" && event.data.ready) setReadySrc(film.src);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [film.src]);

  useEffect(() => {
    if (!ready) return;
    frame.current?.contentWindow?.postMessage({ film: "8plus", playing: active && !paused, sound }, window.location.origin);
  }, [ready, active, paused, sound]);

  return (
    <section
      ref={section}
      id="home-section-hero"
      className="focus-studio"
      data-header-color="#070909"
      data-active={active}
      data-paused={paused}
      data-film-ready={ready}
      aria-labelledby="focus-studio-title"
    >
      <div className="focus-studio-film">
        <Image src={reduced ? film.still : film.poster} alt="" fill sizes="100vw" priority />
        {reduced ? null : (
          // keyed so a language or screen-size switch after hydration loads the other cut
          <iframe key={film.src} ref={frame} src={film.src} title={en ? "8plus brand film" : "8plus 品牌影片"} aria-hidden="true" tabIndex={-1} />
        )}
      </div>
      <div className="section-shell focus-studio-layout">
        <div className="focus-studio-controls">
          <button type="button" aria-pressed={sound} disabled={reduced} onClick={() => { setSound(!sound); if (paused) setPaused(false); }}>
            {sound ? (en ? "Sound off" : "關閉聲音") : (en ? "Sound on" : "開啟聲音")}
          </button>
          <button type="button" aria-pressed={paused} disabled={reduced} onClick={() => setPaused(!paused)}>
            {reduced ? (en ? "Motion reduced" : "已減少動態") : paused ? (en ? "Resume" : "繼續播放") : (en ? "Pause" : "暫停")}
          </button>
        </div>
        <div className="focus-studio-copy">
          <div>
            <p className="focus-studio-eyebrow">8PLUS / ENGINEERING & AI</p>
            <h1 id="focus-studio-title">
              {copy.headline.map((line) => <span key={line}>{line}</span>)}
            </h1>
          </div>
          <div>
            <p className="focus-studio-lead">{copy.subtitle}</p>
            <div className="focus-studio-actions">
              <Link href="/booking" className="focus-studio-primary">
                {en ? "Discuss your project" : "聊聊你的專案"} ↗
              </Link>
              <Link href="#home-section-lab" className="focus-studio-secondary">
                {en ? "Explore the work" : "看看實際作品"} ↓
              </Link>
            </div>
            <p className="focus-studio-footnote">
              {en ? "AI applications / System integration / Technical advisory" : "AI 應用 / 系統整合 / 技術顧問"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
