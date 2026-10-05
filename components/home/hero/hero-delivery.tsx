"use client";
import { useState } from "react";
import Link from "next/link";
import type { HomeLocale } from "@/lib/content/home-sections";
import { getHomeSectionContent } from "@/lib/content/home-sections";
import "@/styles/pages/home-delivery.css";

export function HeroDelivery({ locale }: { locale: HomeLocale }) {
  const [replay, setReplay] = useState(0);
  const en = locale === "en";
  const copy = getHomeSectionContent(locale).hero;
  const steps = en
    ? [
        ["01", "Clarify the need", "Goal · Scope · Users"],
        ["02", "Design the system", "Data · Access · Interfaces"],
        ["03", "Test what matters", "Evaluation · Failure paths"],
        ["04", "Deliver & hand over", "A usable system · Clear docs"],
      ]
    : [
        ["01", "釐清需求", "目標 · 範圍 · 使用者"],
        ["02", "設計系統", "資料 · 權限 · 介面"],
        ["03", "驗證結果", "評測 · 失敗情境 · 驗收"],
        ["04", "交付與移轉", "可用系統 · 清楚文件"],
      ];
  return (
    <section
      id="home-section-hero"
      className="delivery-hero bg-blue"
      data-header-color="#002FA7"
      aria-labelledby="delivery-title"
    >
      <div className="section-shell delivery-layout">
        <div className="delivery-copy">
          <p className="scroll-eyebrow">8PLUS / ENGINEERING & AI</p>
          <h1 id="delivery-title">
            {copy.headline.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? "delivery-title-accent" : undefined}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="delivery-lead">{copy.subtitle}</p>
          <div className="delivery-actions">
            <Link href="/booking" className="delivery-primary">
              {en ? "Discuss your project" : "聊聊你的專案"} ↗
            </Link>
            <Link href="#home-section-lab" className="delivery-secondary">
              {en ? "Explore the work" : "看看實際作品"} ↓
            </Link>
          </div>
          <p className="delivery-footnote">
            {en
              ? "AI applications / System integration / Technical advisory"
              : "AI 應用 / 系統整合 / 技術顧問"}
          </p>
        </div>
        <figure className="delivery-figure">
          <div className="delivery-diagram" key={replay}>
            <svg
              className="delivery-spine"
              viewBox="0 0 20 420"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M10 0V420" pathLength="1" />
            </svg>
            <ol>
              {steps.map(([number, title, detail], index) => (
                <li
                  key={number}
                  style={
                    {
                      "--step-delay": `${index * 1.05}s`,
                    } as React.CSSProperties
                  }
                >
                  <span className="delivery-number">{number}</span>
                  <div>
                    <h2>{title}</h2>
                    <p>{detail}</p>
                  </div>
                  <span className="delivery-check" aria-hidden="true">
                    ↗
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <figcaption>
            <span>
              {en
                ? "DELIVERY PROCESS · ILLUSTRATION"
                : "交付流程示意 · 非即時系統數據"}
            </span>
            <button
              type="button"
              onClick={() => setReplay((value) => value + 1)}
              aria-label={en ? "Replay the process animation" : "重播流程動畫"}
            >
              ↻ {en ? "Replay" : "重播"}
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
