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
  return {
    src: `/hero/film/index.html?live=1&lang=${lang}&format=${tall ? "tall" : "wide"}`,
    poster: `${base}-poster.jpg`,
    still: `${base}-still.jpg`,
    size: tall ? [1080, 1350] : [1920, 1080],
    // the end card's booking pill in film px (x, y, w, h), as it sits in the still; the live film reports its own
    cta: { "zh-wide": [599, 690, 489, 109], "en-wide": [548, 690, 592, 98], "zh-tall": [313, 700, 454, 103], "en-tall": [266, 700, 547, 93] }[`${lang}-${tall ? "tall" : "wide"}`]!,
  };
};

type FilmWindow = Window & { __timelines?: { film?: { time(): number } } };
type Score = { ctx: AudioContext; buffer: Promise<AudioBuffer>; source: AudioBufferSourceNode | null; origin: number };
const scoreUrl = "/hero/film/assets/sound.m4a";

const filmTime = (frame: HTMLIFrameElement | null) => (frame?.contentWindow as FilmWindow | null | undefined)?.__timelines?.film?.time();
// (re)start the looping score at the film's current time
const startScore = async (s: Score, frame: HTMLIFrameElement | null, alive: () => boolean) => {
  const buffer = await s.buffer;
  if (!alive()) return;
  s.source?.stop();
  const source = s.ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(s.ctx.destination);
  const offset = (filmTime(frame) ?? 0) % buffer.duration;
  source.start(0, offset);
  s.source = source;
  s.origin = s.ctx.currentTime - offset;
};
const stopScore = (s: Score) => {
  s.source?.stop();
  s.source = null;
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
  const [sound, setSound] = useState(false);
  const score = useRef<Score | null>(null);
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const ready = readySrc === film.src;
  const box = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState<[number, number] | null>(null);
  const [liveCta, setLiveCta] = useState<{ src: string; rect: number[] } | null>(null);
  const ctaRect = reduced ? film.cta : liveCta?.src === film.src ? liveCta.rect : null;

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
      if (event.data?.film !== "8plus") return;
      if (event.data.ready) setReadySrc(film.src);
      if ("cta" in event.data) setLiveCta(event.data.cta ? { src: film.src, rect: event.data.cta } : null);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [film.src]);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const measure = () => setBoxSize([element.clientWidth, element.clientHeight]);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    frame.current?.contentWindow?.postMessage({ film: "8plus", playing: active }, window.location.origin);
  }, [ready, active]);

  // the score plays on this page through Web Audio: the click that asks for sound unlocks it in every
  // browser, and a decoded buffer can start at any offset (the Worker serves the file without Range support)
  const toggleSound = () => {
    if (sound) {
      if (score.current) {
        stopScore(score.current);
        score.current.ctx.suspend();
      }
      setSound(false);
      return;
    }
    if (!score.current) {
      const ctx = new AudioContext();
      const buffer = fetch(scoreUrl).then((response) => response.arrayBuffer()).then((data) => ctx.decodeAudioData(data));
      score.current = { ctx, buffer, source: null, origin: 0 };
    }
    score.current.ctx.resume();
    setSound(true);
  };

  useEffect(() => {
    const s = score.current;
    if (!s || !sound) return;
    if (!active) {
      stopScore(s);
      s.ctx.suspend();
      return;
    }
    let alive = true;
    s.ctx.resume().then(() => startScore(s, frame.current, () => alive)).catch(() => setSound(false));
    // pull the score back to the picture when they drift apart (a busy device, a throttled tab)
    const timer = window.setInterval(async () => {
      const t = filmTime(frame.current);
      const buffer = await s.buffer;
      if (!alive || t === undefined || !s.source) return;
      const drift = Math.abs((s.ctx.currentTime - s.origin) % buffer.duration - t);
      if (Math.min(drift, buffer.duration - drift) > 0.3) startScore(s, frame.current, () => alive);
    }, 500);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [sound, active, film.src]);

  useEffect(() => () => void score.current?.ctx.close(), []);

  return (
    <section
      ref={section}
      id="home-section-hero"
      className="focus-studio"
      data-header-color="#070909"
      data-active={active}
      data-film-ready={ready}
      aria-labelledby="focus-studio-title"
    >
      <div ref={box} className="focus-studio-film">
        <Image src={reduced ? film.still : film.poster} alt="" fill sizes="100vw" priority />
        {reduced ? null : (
          // keyed so a language or screen-size switch after hydration loads the other cut
          <iframe key={film.src} ref={frame} src={film.src} title={en ? "8plus brand film" : "8plus 品牌影片"} aria-hidden="true" tabIndex={-1} />
        )}
        {ctaRect && boxSize ? (
          // the film is drawn with object-fit: cover, so map film px into the box the same way;
          // keyboard and screen-reader users have the booking link below
          (() => {
            const [w, h] = boxSize;
            const [W, H] = film.size;
            const k = Math.max(w / W, h / H);
            const [x, y, cw, ch] = ctaRect;
            return (
              <Link
                href="/booking"
                className="focus-studio-film-cta"
                tabIndex={-1}
                aria-hidden="true"
                style={{ left: (w - W * k) / 2 + x * k, top: (h - H * k) / 2 + y * k, width: cw * k, height: ch * k }}
              />
            );
          })()
        ) : null}
        {reduced ? null : (
          <>
            <button
              type="button"
              className="focus-studio-sound"
              aria-pressed={sound}
              aria-label={sound ? (en ? "Mute the film" : "關閉影片聲音") : (en ? "Play the film's sound" : "開啟影片聲音")}
              onClick={toggleSound}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
                {sound ? (
                  <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M16.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="section-shell focus-studio-layout">
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
