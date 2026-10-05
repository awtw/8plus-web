"use client";
import Link from "next/link";
import type { HomeLocale } from "@/lib/content/home-sections";
import { getHomeSectionContent } from "@/lib/content/home-sections";
import "@/styles/pages/home-delivery.css";
import { DeliveryScene } from "./delivery-scene";

export function HeroDelivery({ locale }: { locale: HomeLocale }) {
  const en = locale === "en";
  const copy = getHomeSectionContent(locale).hero;
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
        <DeliveryScene locale={locale} />
      </div>
    </section>
  );
}
