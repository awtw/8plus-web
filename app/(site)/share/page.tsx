'use client'

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowSquareOut,
  CalendarCheck,
  ChatCircle,
  Check,
  Compass,
  Copy,
  GithubLogo,
  InstagramLogo,
  QrCode,
  Translate,
} from "@phosphor-icons/react";
import { useDesignMode } from "@/components/design-mode-provider";
import { useLanguage } from "@/components/language-provider";
import { getShareContent } from "@/lib/content/share";
import { getLineAddFriendUrl } from "@/lib/line";
import { Button } from "@/components/ui/button";
import { QrDialog } from "@/components/qr-dialog";

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const } },
};

type ModeTheme = {
  shell: string;
  frame: string;
  panel: string;
  panelSoft: string;
  label: string;
  title: string;
  body: string;
  muted: string;
  chip: string;
  primaryButton: string;
  secondaryButton: string;
  socialCard: string;
  avatar: string;
  avatarHalo: string;
  qrOverlay: string;
  qrPanel: string;
  divider: string;
  homeButton: string;
  languageButton: string;
};

const modeThemes: Record<"cohere" | "apple" | "elevenlabs", ModeTheme> = {
  cohere: {
    shell: "bg-[color:var(--page-bg)] text-[color:var(--fg)]",
    frame: "border border-border/80 bg-background/90 shadow-[0_30px_80px_rgba(0,0,0,0.08)]",
    panel: "border border-border-soft bg-background",
    panelSoft: "border border-border-soft bg-[color:var(--surface)]",
    label: "eyebrow",
    title: "display-title text-[clamp(2.4rem,5.5vw,4rem)] tracking-[-0.045em]",
    body: "body-lead",
    muted: "text-[color:var(--muted)]",
    chip: "metric-chip",
    primaryButton: "brand-button-primary",
    secondaryButton: "brand-button-secondary",
    socialCard: "border border-border-soft bg-background hover:border-[color:var(--hover-border)] hover:shadow-[var(--shadow-hover)]",
    avatar: "bg-[color:var(--fg)] text-[color:var(--bg)]",
    avatarHalo: "bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent),transparent_82%),transparent_70%)]",
    qrOverlay: "bg-background/90 backdrop-blur-xl",
    qrPanel: "border border-border/80 bg-background shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
    divider: "border-border/70",
    homeButton: "border border-border/80 bg-background/80 text-[color:var(--fg-2)] hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)]",
    languageButton: "border border-border/80 bg-background/80 text-[color:var(--fg-2)] hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)]",
  },
  apple: {
    shell: "bg-[color:var(--page-bg)] text-[color:var(--fg)]",
    frame: "border border-border/80 bg-background/90 shadow-[0_18px_50px_rgba(0,0,0,0.06)]",
    panel: "border border-border-soft bg-background",
    panelSoft: "border border-border-soft bg-[color:var(--surface)]",
    label: "eyebrow",
    title: "display-title text-[clamp(2.5rem,5.6vw,4rem)] tracking-[-0.04em]",
    body: "text-[1.02rem] leading-8 text-[color:var(--fg-2)]",
    muted: "text-[color:var(--muted)]",
    chip: "metric-chip",
    primaryButton: "brand-button-primary",
    secondaryButton: "brand-button-secondary",
    socialCard: "border border-border-soft bg-background hover:border-[color:var(--hover-border)] hover:shadow-[var(--shadow-hover)]",
    avatar: "bg-[color:var(--fg)] text-[color:var(--bg)]",
    avatarHalo: "bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent),transparent_84%),transparent_70%)]",
    qrOverlay: "bg-background/90 backdrop-blur-xl",
    qrPanel: "border border-border/80 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
    divider: "border-border",
    homeButton: "border border-border bg-background text-[color:var(--fg-2)] hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)]",
    languageButton: "border border-border bg-background text-[color:var(--fg-2)] hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)]",
  },
  elevenlabs: {
    shell: "bg-[color:var(--page-bg)] text-[color:var(--fg)]",
    frame: "border border-border/80 bg-background/90 shadow-[rgba(0,0,0,0.08)_0px_0px_0px_1px,rgba(0,0,0,0.04)_0px_4px_4px,rgba(78,50,23,0.03)_0px_6px_16px]",
    panel: "border border-border-soft bg-background",
    panelSoft: "border border-border-soft bg-[color:var(--surface)]",
    label: "eyebrow",
    title: "display-title text-[clamp(2.45rem,5.6vw,4rem)] tracking-[-0.03em]",
    body: "text-[1.05rem] leading-8 text-[color:var(--fg-2)]",
    muted: "text-[color:var(--muted)]",
    chip: "metric-chip",
    primaryButton: "brand-button-primary",
    secondaryButton: "brand-button-secondary",
    socialCard: "border border-border-soft bg-background hover:border-[color:var(--hover-border)] hover:shadow-[var(--shadow-hover)]",
    avatar: "bg-[color:var(--fg)] text-[color:var(--bg)]",
    avatarHalo: "bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent),transparent_84%),transparent_70%)]",
    qrOverlay: "bg-background/90 backdrop-blur-xl",
    qrPanel: "border border-border/80 bg-background shadow-[rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.04)_0px_4px_4px,rgba(78,50,23,0.05)_0px_6px_16px]",
    divider: "border-border",
    homeButton: "border border-border bg-background text-[color:var(--fg-2)] hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)]",
    languageButton: "border border-border bg-background text-[color:var(--fg-2)] hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] hover:text-[color:var(--hover-fg)]",
  },
};

type SocialLink = {
  name: string;
  description: string;
  url?: string;
  badge?: string;
  kind: "link" | "line" | "ig";
  icon: React.ReactNode;
};

const contactCardClass = (system: ModeTheme) =>
  `flex min-h-[4.5rem] w-full items-center gap-3 rounded-[1.4rem] border px-4 py-3.5 text-left transition-all ${system.socialCard}`;

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border-soft bg-[color:var(--surface)] text-[color:var(--accent)]">
      {children}
    </div>
  );
}

function ContactMeta({
  name,
  description,
  mutedClass,
}: {
  name: string;
  description?: string;
  mutedClass: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="truncate text-sm font-semibold text-[color:var(--fg)]">{name}</div>
      {description ? (
        <div className={`mt-0.5 truncate text-xs ${mutedClass}`}>{description}</div>
      ) : null}
    </div>
  );
}

function ContactTrailing({
  badge,
  chipClass,
  children,
}: {
  badge?: string;
  chipClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {badge ? <span className={`${chipClass} max-w-[5.5rem] truncate sm:max-w-none`}>{badge}</span> : null}
      {children}
    </div>
  );
}

function ShareContent() {
  const { locale, setLocale, t } = useLanguage();
  const { mode: currentMode } = useDesignMode();
  const content = getShareContent(locale);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);
  const [showIGQR, setShowIGQR] = useState(false);
  const [lineQRDataURL, setLineQRDataURL] = useState("");
  const [igQRDataURL, setIGQRDataURL] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const lineAddFriendUrl = getLineAddFriendUrl();

  useEffect(() => {
    QRCode.toDataURL(lineAddFriendUrl, {
      width: 200,
      margin: 2,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    }).then(setLineQRDataURL);
    QRCode.toDataURL("https://www.instagram.com/august.yan.terra/", {
      width: 200,
      margin: 2,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    }).then(setIGQRDataURL);
  }, [lineAddFriendUrl]);

  const system = modeThemes[currentMode];

  const copyEmail = async () => {
    await navigator.clipboard.writeText("alec.wang.tpe@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      description: content.social.github.description,
      url: "https://github.com/awtw",
      badge: content.social.github.badge,
      kind: "link",
      icon: <GithubLogo className="h-5 w-5" weight="bold" />,
    },
    {
      name: "LINE",
      description: content.social.line.description,
      kind: "line",
      icon: <ChatCircle className="h-5 w-5" weight="bold" />,
    },
    {
      name: "Instagram",
      description: content.social.instagram.description,
      kind: "ig",
      icon: <InstagramLogo className="h-5 w-5" weight="bold" />,
    },
  ];

  return (
    <div className={`min-h-full ${system.shell}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-8%] h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent),transparent_82%),transparent_70%)] blur-[120px]" />
        <div className="absolute bottom-[-12%] right-[-10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--surface),transparent_70%),transparent_72%)] blur-[140px]" />
      </div>

      <div className="section-shell flex min-h-[calc(100dvh-4.5rem)] items-center justify-center py-6 pb-16 sm:min-h-[calc(100dvh-5rem)] sm:pb-20">
        <motion.div
          initial={mounted ? { opacity: 0, scale: 0.97, y: 12 } : false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
          className={`relative z-10 w-full max-w-3xl px-1 sm:px-0`}
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <Link href="/" className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${system.homeButton}`}>
              <Compass className="h-4 w-4" weight="bold" />
              {content.mainSite}
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocale(locale === "zh-TW" ? "en" : "zh-TW")}
                className={`rounded-full px-3 py-2 text-sm ${system.languageButton}`}
                aria-label={t("common.selectLanguage")}
              >
                <Translate className="mr-1 h-4 w-4" weight="bold" />
                {content.switchLang}
              </Button>
              <Link
                href="/booking"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                  currentMode === "cohere"
                    ? "bg-[color:var(--fg)] text-[color:var(--bg)]"
                    : "bg-[color:var(--accent)] text-[color:var(--accent-on)]"
                }`}
              >
                <CalendarCheck className="h-4 w-4" weight="bold" />
                {content.book}
              </Link>
            </div>
          </div>

          <motion.div variants={pageVariants} initial={mounted ? "hidden" : false} animate="show" className="space-y-4">
            <motion.div variants={itemVariants} className={`overflow-hidden rounded-[2rem] border p-5 sm:p-6 ${system.panel}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`relative flex h-16 w-16 items-center justify-center rounded-[1.5rem] ${system.avatar} text-2xl font-semibold ${currentMode === "elevenlabs" ? "tracking-[-0.04em]" : ""}`}>
                    AW
                    <span className={`absolute -inset-2 -z-10 rounded-full blur-xl ${system.avatarHalo}`} />
                  </div>
                  <div>
                    <h1 className={`${currentMode === "elevenlabs" ? "font-light tracking-[-0.02em]" : "font-semibold"} text-2xl tracking-[-0.04em] text-[color:var(--fg)]`}>
                      August Wang
                    </h1>
                    <p className={`mt-1 text-sm ${system.muted}`}>
                      {content.role}
                    </p>
                  </div>
                </div>
                <span className={system.chip}>
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-[color:var(--success)]" />
                  {content.available}
                </span>
              </div>

              <p className={`mt-5 max-w-sm ${system.body}`}>
                {content.lead}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {content.stats.map((item) => (
                  <div key={item.label} className="rounded-[1.2rem] border border-border-soft bg-[color:var(--surface)] px-3 py-3">
                    <div className="text-sm font-semibold text-[color:var(--fg)]">
                      {item.value}
                    </div>
                    <div className={`mt-0.5 text-[11px] uppercase tracking-[0.16em] ${system.muted}`}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/booking" className={`inline-flex items-center gap-2 ${system.primaryButton}`}>
                  <CalendarCheck className="h-4 w-4" weight="bold" />
                  {content.bookChat}
                </Link>
                <a
                  href="https://github.com/awtw"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 ${system.secondaryButton}`}
                >
                  GitHub
                  <ArrowSquareOut className="h-4 w-4" weight="bold" />
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <button onClick={copyEmail} className={contactCardClass(system)}>
                <ContactIcon>
                  {copied ? (
                    <Check className="h-5 w-5" weight="bold" />
                  ) : (
                    <Copy className="h-5 w-5" weight="bold" />
                  )}
                </ContactIcon>
                <ContactMeta
                  name="Email"
                  description="alec.wang.tpe@gmail.com"
                  mutedClass={system.muted}
                />
                <span className={`shrink-0 text-xs font-medium ${copied ? "text-[color:var(--accent)]" : system.muted}`}>
                  {copied ? content.copied : content.copy}
                </span>
              </button>

              {socialLinks.map((link) => {
                const cardBody = (
                  <>
                    <ContactIcon>{link.icon}</ContactIcon>
                    <ContactMeta name={link.name} description={link.description} mutedClass={system.muted} />
                    <ContactTrailing
                      badge={link.badge}
                      chipClass={system.chip}
                    >
                      {link.kind === "link" ? (
                        <ArrowSquareOut className={`h-4 w-4 ${system.muted}`} weight="bold" />
                      ) : (
                        <QrCode className={`h-4 w-4 ${system.muted}`} weight="bold" />
                      )}
                    </ContactTrailing>
                  </>
                );

                if (link.kind === "line") {
                  return (
                    <button key={link.name} onClick={() => setShowLineQR(true)} className={contactCardClass(system)}>
                      {cardBody}
                    </button>
                  );
                }

                if (link.kind === "ig") {
                  return (
                    <button key={link.name} onClick={() => setShowIGQR(true)} className={contactCardClass(system)}>
                      {cardBody}
                    </button>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactCardClass(system)}
                  >
                    {cardBody}
                  </a>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className={`flex items-center justify-center gap-2 border-t pt-5 pb-2 text-xs uppercase tracking-[0.22em] ${system.divider} ${system.muted}`}>
              <span>{content.footer}</span>
            </motion.div>
          </motion.div>

          <QrDialog
            open={showLineQR}
            onClose={() => setShowLineQR(false)}
            labelledBy="line-qr-title"
            overlayClassName={`absolute inset-0 z-50 flex items-center justify-center rounded-[2.5rem] p-5 ${system.qrOverlay}`}
          >
            <div className={`w-full max-w-sm rounded-[2rem] border p-6 text-center ${system.qrPanel}`}>
              <h3 id="line-qr-title" className={`text-2xl tracking-[-0.03em] ${currentMode === "elevenlabs" ? "font-light" : "font-semibold"} text-[color:var(--fg)]`}>
                {content.qr.line.title}
              </h3>
              <p className={`mt-2 text-sm ${system.muted}`}>
                {content.qr.line.lead}
              </p>

              <div className="mx-auto my-5 inline-block rounded-[1.5rem] bg-background p-3">
                {lineQRDataURL ? (
                  <img
                    src={lineQRDataURL}
                    alt="LINE QR Code"
                    className="h-44 w-44 rounded-[1.2rem]"
                  />
                ) : (
                  <div className="flex h-44 w-44 items-center justify-center rounded-[1.2rem] bg-[#f8faf9]">
                    <span className="text-xs text-[color:var(--muted)]">{t("common.loading")}</span>
                  </div>
                )}
              </div>

              <p className="mb-4 text-xs text-[color:var(--muted)]">
                {content.qr.line.idLabel}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={lineAddFriendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-primary inline-flex items-center justify-center"
                >
                  {content.qr.line.open}
                </a>
                <Button variant="ghost" onClick={() => setShowLineQR(false)} className={`rounded-full ${system.secondaryButton}`}>
                  {t("common.close")}
                </Button>
              </div>
            </div>
          </QrDialog>

          <QrDialog
            open={showIGQR}
            onClose={() => setShowIGQR(false)}
            labelledBy="ig-qr-title"
            overlayClassName={`absolute inset-0 z-50 flex items-center justify-center rounded-[2.5rem] p-5 ${system.qrOverlay}`}
          >
            <div className={`w-full max-w-sm rounded-[2rem] border p-6 text-center ${system.qrPanel}`}>
              <h3 id="ig-qr-title" className={`text-2xl tracking-[-0.03em] ${currentMode === "elevenlabs" ? "font-light" : "font-semibold"} text-[color:var(--fg)]`}>
                {content.qr.instagram.title}
              </h3>
              <p className={`mt-2 text-sm ${system.muted}`}>
                {content.qr.instagram.lead}
              </p>

              <div className="mx-auto my-5 inline-block rounded-[1.5rem] bg-background p-3">
                {igQRDataURL ? (
                  <img
                    src={igQRDataURL}
                    alt="Instagram QR Code"
                    className="h-44 w-44 rounded-[1.2rem]"
                  />
                ) : (
                  <div className="flex h-44 w-44 items-center justify-center rounded-[1.2rem] bg-[#f8faf9]">
                    <span className="text-xs text-[color:var(--muted)]">{t("common.loading")}</span>
                  </div>
                )}
              </div>

              <p className="mb-4 text-xs text-[color:var(--muted)]">
                {content.qr.instagram.handleLabel}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/august.yan.terra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-primary inline-flex items-center justify-center"
                >
                  {content.qr.instagram.open}
                </a>
                <Button onClick={() => setShowIGQR(false)} className={`rounded-full ${system.secondaryButton}`}>
                  {t("common.close")}
                </Button>
              </div>
            </div>
          </QrDialog>
        </motion.div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return <ShareContent />;
}
