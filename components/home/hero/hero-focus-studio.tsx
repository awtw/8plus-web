"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getHomeSectionContent, type HomeLocale } from "@/lib/content/home-sections";
import "@/styles/pages/home-focus-studio.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => false;

const projects = [
  { name: "Transcript Plus", image: "/og/labs/transcript-plus/web.webp" },
  { name: "CRM", image: "/og/labs/crm/web.webp" },
  { name: "B18", image: "/og/labs/b18/web.webp" },
];

export function HeroFocusStudio({ locale }: { locale: HomeLocale }) {
  const en = locale === "en";
  const copy = getHomeSectionContent(locale).hero;
  const section = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion);
  const [focusChoice, setFocusChoice] = useState<boolean | null>(null);
  const [paused, setPaused] = useState(false);
  const focused = focusChoice ?? reduced;

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    let visible = false;
    const syncVisibility = () => {
      element.dataset.active = String(visible && !document.hidden);
    };
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

  return (
    <section
      ref={section}
      id="home-section-hero"
      className="focus-studio"
      data-header-color="#070909"
      data-focused={focused}
      data-focus-choice={focusChoice === null ? "auto" : "manual"}
      data-paused={paused}
      aria-labelledby="focus-studio-title"
    >
      <div className="section-shell focus-studio-layout">
        <div className="focus-studio-copy">
          <p className="focus-studio-eyebrow">8PLUS / ENGINEERING & AI</p>
          <h1 id="focus-studio-title">
            {copy.headline.map((line) => <span key={line}>{line}</span>)}
          </h1>
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
        <div className="focus-studio-visual">
          <div className="focus-studio-art" aria-hidden="true">
            <div className="focus-studio-collage">
              <div className="focus-studio-drift">
                {projects.map((project) => (
                  <div className="focus-studio-card" key={project.name}>
                    <div className="focus-studio-card-inner">
                      <Image src={project.image} alt="" width={1200} height={630} sizes="(max-width: 700px) 55vw, 32vw" />
                      <span>{project.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="focus-studio-frame">
              <i /><i /><i /><i />
              <span>{focused ? (en ? "FOCUS / A clear next step" : "FOCUS / 清晰的下一步") : (en ? "EXPLORE / Start with an idea" : "EXPLORE / 從模糊的想法開始")}</span>
            </div>
            <strong>{focused ? "Clarity." : "What if?"}</strong>
          </div>
          <div className="focus-studio-controls">
            <button type="button" aria-pressed={focused} onClick={() => setFocusChoice(!focused)}>
              <span aria-hidden="true">⌖</span> {en ? "Focus the idea" : "讓想法對焦"}
            </button>
            <button type="button" aria-pressed={paused} disabled={reduced} onClick={() => setPaused(!paused)}>
              {reduced ? (en ? "Motion reduced" : "已減少動態") : paused ? (en ? "Resume motion" : "繼續動態") : (en ? "Pause motion" : "暫停動態")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
