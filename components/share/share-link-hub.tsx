'use client'

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import QRCode from "qrcode"
import {
  ArrowSquareOut,
  CaretLeft,
  ChatCircle,
  Copy,
  Check,
  InstagramLogo,
} from "@phosphor-icons/react"
import { useLanguage } from "@/components/language-provider"
import { ShareHubLogo } from "@/components/share/share-hub-logo"
import type { ShareHubLink } from "@/lib/content/share-links"
import {
  getLineAddFriendUrl,
  getLinePersonalAddFriendUrl,
  getLinePersonalQrImage,
} from "@/lib/line"
import { QrDialog } from "@/components/qr-dialog"
import LanguageSwitcher from "@/components/language-switcher"
import { SharePathExpandable } from "@/components/share/share-path-expandable"
import { ShareBookingExpandable } from "@/components/share/share-booking-expandable"
import { ShareSocialAvatar } from "@/components/share/share-social-avatar"
import { ShareHavenbirdStage } from "@/components/share/share-havenbird-stage"
import { cn } from "@/lib/utils"
import type { ShareHubTheme, ShareHubVariant } from "@/lib/share-hub/themes"

type ShareLinkHubProps = {
  variant: ShareHubVariant
  theme: ShareHubTheme
  links: ShareHubLink[]
  showPath?: boolean
}

function QrPanel({
  cardStyle,
  theme,
  onClose,
  titleId,
  title,
  subtitle,
  qrSrc,
  qrAlt,
  actionHref,
  actionLabel,
  closeLabel,
}: {
  cardStyle: CSSProperties
  theme: ShareHubTheme
  onClose: () => void
  titleId: string
  title: string
  subtitle?: string
  qrSrc?: string
  qrAlt: string
  actionHref?: string
  actionLabel?: string
  closeLabel: string
}) {
  return (
    <div className="w-full max-w-sm rounded-[1.5rem] border p-6 text-center" style={{ ...cardStyle, borderColor: theme.cardHoverBorder }}>
      <h3 id={titleId} className="text-xl font-semibold">
        {title}
      </h3>
      {subtitle ? (
        <p className="mt-1 text-sm" style={{ color: theme.fgMuted }}>
          {subtitle}
        </p>
      ) : null}
      {qrSrc ? <img src={qrSrc} alt={qrAlt} className="mx-auto my-5 h-44 w-44 rounded-xl object-contain bg-white p-2" /> : null}
      <div className="flex flex-col gap-2">
        {actionHref && actionLabel ? (
          <a
            href={actionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{ background: theme.ctaBg, color: theme.ctaText }}
          >
            {actionLabel}
          </a>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex justify-center rounded-full border px-5 py-2.5 text-sm font-medium"
          style={{ borderColor: theme.cardBorder, color: theme.fg }}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  )
}

export function ShareLinkHub({ variant, theme, links, showPath = false }: ShareLinkHubProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [qrKind, setQrKind] = useState<"line-official" | "line-personal" | "ig" | null>(null)
  const [lineQr, setLineQr] = useState("")
  const [igQr, setIgQr] = useState("")

  const officialLineUrl = getLineAddFriendUrl()
  const personalLineUrl = getLinePersonalAddFriendUrl()
  const personalQrImage = getLinePersonalQrImage()
  const igUrl = "https://www.instagram.com/august.yan.terra/"

  const displayName = variant === "sb" ? t("shareHub.businessName") : t("shareHub.socialName")
  const displayLead = variant === "sb" ? t("shareHub.businessLead") : t("shareHub.socialLead")
  const bookingLink = links.find((link) => link.kind === "booking")
  const emailLink = links.find((link) => link.kind === "email")
  const tailLinks = links.filter((link) => link.kind !== "booking" && link.kind !== "email")

  useEffect(() => {
    QRCode.toDataURL(officialLineUrl, {
      width: 220,
      margin: 2,
      color: { dark: "#0a1020", light: "#ffffff" },
    }).then(setLineQr)
    QRCode.toDataURL(igUrl, {
      width: 220,
      margin: 2,
      color: { dark: "#2a0618", light: "#ffffff" },
    }).then(setIgQr)
  }, [officialLineUrl, igUrl])

  const copyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const shellStyle = {
    "--share-fg": theme.fg,
    "--share-fg-muted": theme.fgMuted,
    "--share-accent": theme.accent,
    "--logo-mark": theme.logoMark,
    "--share-card-bg": theme.cardBg,
    "--share-card-border": theme.cardBorder,
    "--share-card-hover": theme.cardHoverBorder,
    "--share-cal-scroll-thumb":
      variant === "sb" ? "rgba(224, 70, 0, 0.42)" : "rgba(0, 82, 200, 0.42)",
    "--share-cal-scroll-thumb-hover":
      variant === "sb" ? "rgba(224, 70, 0, 0.58)" : "rgba(0, 82, 200, 0.58)",
    "--share-cal-scroll-track":
      variant === "sb" ? "rgba(254, 80, 0, 0.12)" : "rgba(0, 47, 167, 0.12)",
  } as CSSProperties

  const cardStyle: CSSProperties = {
    background: theme.cardBg,
    borderColor: theme.cardBorder,
    color: theme.fg,
  }

  const [pathOpen, setPathOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const panelHistoryRef = useRef(false)

  const syncPanelHistoryOnClose = () => {
    if (panelHistoryRef.current) {
      panelHistoryRef.current = false
      window.history.back()
    }
  }

  const handlePathOpenChange = (open: boolean) => {
    if (open) {
      setPathOpen(true)
      setBookingOpen(false)
      if (!panelHistoryRef.current) {
        panelHistoryRef.current = true
        window.history.pushState({ shareHubPanel: 'path' }, '')
      }
      return
    }
    setPathOpen(false)
    syncPanelHistoryOnClose()
  }

  const handleBookingOpenChange = (open: boolean) => {
    if (open) {
      setBookingOpen(true)
      setPathOpen(false)
      if (!panelHistoryRef.current) {
        panelHistoryRef.current = true
        window.history.pushState({ shareHubPanel: 'booking' }, '')
      }
      return
    }
    setBookingOpen(false)
    syncPanelHistoryOnClose()
  }

  const closeAllPanels = () => {
    if (pathOpen || bookingOpen) {
      setPathOpen(false)
      setBookingOpen(false)
      syncPanelHistoryOnClose()
    }
  }

  const compressForPanel = variant === "sb" && (pathOpen || bookingOpen)

  const linkStackClass = cn(
    "shrink-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
    compressForPanel
      ? "max-h-0 space-y-0 opacity-0 pointer-events-none"
      : "max-h-[28rem] space-y-2 opacity-100 [@media(max-height:700px)]:space-y-1.5",
  )

  const closeQr = () => setQrKind(null)

  const meshScale = variant === "sc" || variant === "sb" ? 0.22 : 1
  const gridOpacity = variant === "sc" || variant === "sb" ? 0.22 : 0.5

  useEffect(() => {
    if (!compressForPanel) return

    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    html.style.overflow = "hidden"
    body.style.overflow = "hidden"

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [compressForPanel])

  useEffect(() => {
    const onPopState = () => {
      panelHistoryRef.current = false
      setPathOpen(false)
      setBookingOpen(false)
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    if (!compressForPanel) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAllPanels()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [compressForPanel, pathOpen, bookingOpen])

  return (
    <div
      className="share-hub-shell fixed inset-0 z-0 overflow-hidden"
      data-share-variant={variant}
      style={{ ...shellStyle, background: theme.pageBg, color: theme.fg }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-20 top-[-8%] h-80 w-80 rounded-full blur-[80px]"
          style={{ background: theme.glowA, opacity: theme.meshOpacity * meshScale }}
        />
        <div
          className="absolute bottom-[-10%] right-[-12%] h-96 w-96 rounded-full blur-[90px]"
          style={{ background: theme.glowB, opacity: theme.meshOpacity * meshScale }}
        />
        {theme.glowC ? (
          <div
            className="absolute left-[30%] top-[40%] h-64 w-64 rounded-full blur-[100px]"
            style={{ background: theme.glowC, opacity: theme.meshOpacity * meshScale * 0.85 }}
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage: `linear-gradient(${theme.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridLine} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 25%, black, transparent)",
          }}
        />
        {variant === "sc" ? <ShareHavenbirdStage /> : null}
      </div>

      <div className="relative z-10 flex h-dvh max-h-dvh flex-col overflow-hidden px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <div
          className={cn(
            "mb-2 flex shrink-0 items-center gap-2 sm:mb-3",
            compressForPanel && "mb-1 sm:mb-2",
          )}
        >
          {compressForPanel ? (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-colors hover:border-[color:var(--share-card-hover)]"
              style={{ ...cardStyle, borderColor: theme.cardBorder }}
            >
              <CaretLeft className="h-4 w-4" weight="bold" />
              {t("shareHub.backToHome")}
            </Link>
          ) : null}
          <div className="ml-auto flex items-center gap-2">
            {compressForPanel ? (
              <button
                type="button"
                onClick={closeAllPanels}
                className="inline-flex items-center rounded-full border px-3 py-2 text-sm font-semibold transition-colors hover:border-[color:var(--share-card-hover)]"
                style={{ background: theme.ctaBg, color: theme.ctaText, borderColor: theme.cardBorder }}
              >
                {t("shareHub.closePanel")}
              </button>
            ) : null}
            <div className="share-hub-lang">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mx-auto flex w-full min-h-0 max-w-lg flex-1 flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            compressForPanel ? "justify-start" : "justify-center",
          )}
        >
          <header
            className={cn(
              "mb-3 shrink-0 text-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:mb-4 [@media(max-height:700px)]:mb-2",
              compressForPanel && "mb-1",
            )}
          >
          {variant === "sb" ? (
            <div
              className={cn(
                "relative mx-auto mb-3 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:mb-4",
                compressForPanel
                  ? "mb-0 max-h-0 w-0 overflow-hidden opacity-0"
                  : "h-[clamp(4rem,12vh,5.25rem)] w-[clamp(4rem,12vh,5.25rem)] sm:h-[5.25rem] sm:w-[5.25rem]",
              )}
            >
              <div
                className="absolute -inset-4 rounded-full blur-2xl"
                style={{ background: theme.glowA, opacity: 0.55 }}
                aria-hidden
              />
              <ShareHubLogo className="h-full w-full" />
            </div>
          ) : (
            <ShareSocialAvatar />
          )}
          <h1
            className={cn(
              "font-semibold tracking-[-0.04em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              compressForPanel
                ? "text-base"
                : "text-[clamp(1.65rem,5.5vw,2.15rem)]",
            )}
          >
            {displayName}
          </h1>
          <p
            className={cn(
              "mx-auto mt-1.5 max-w-sm text-sm leading-relaxed transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:mt-2 [@media(max-height:700px)]:text-xs [@media(max-height:700px)]:leading-snug",
              compressForPanel && "mt-0 max-h-0 overflow-hidden opacity-0",
            )}
            style={{ color: theme.fgMuted }}
          >
            {displayLead}
          </p>
          </header>

          <div
            className={cn(
              "flex min-h-0 flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              compressForPanel ? "min-h-0 flex-1 gap-1" : "gap-2",
            )}
          >
          <div className={linkStackClass}>
          {emailLink && emailLink.kind === "email" ? (
            <button
              key={emailLink.id}
              type="button"
              onClick={() => copyEmail(emailLink.email)}
              className="flex w-full items-center gap-3 rounded-[1.2rem] border px-4 py-2.5 text-left transition-colors hover:border-[color:var(--share-card-hover)] sm:py-3"
              style={cardStyle}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                style={{ borderColor: theme.cardBorder, color: theme.accent }}
              >
                {copied ? <Check className="h-5 w-5" weight="bold" /> : <Copy className="h-5 w-5" weight="bold" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{emailLink.name}</span>
                <span className="block truncate text-xs" style={{ color: theme.fgMuted }}>
                  {emailLink.description ?? emailLink.email}
                </span>
              </span>
              <span className="text-xs" style={{ color: theme.fgMuted }}>
                {copied ? t("shareHub.copied") : t("shareHub.copyEmail")}
              </span>
            </button>
          ) : null}
          </div>

          {bookingLink && bookingLink.kind === "booking" ? (
            <div
              className={cn(
                compressForPanel && bookingOpen && "flex min-h-0 flex-1 flex-col",
              )}
            >
            <ShareBookingExpandable
              theme={theme}
              cardStyle={cardStyle}
              name={bookingLink.name}
              description={bookingLink.description}
              fillViewport={compressForPanel}
              calBrandColor={variant === "sb" ? "#FE5000" : "#002FA7"}
              onOpenChange={handleBookingOpenChange}
            />
            </div>
          ) : null}

          <div className={linkStackClass}>
          {tailLinks.map((link) => {
            if (link.kind === "email") return null

            if (link.kind === "line-qr") {
              const target = link.lineTarget === "personal" ? "line-personal" : "line-official"
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setQrKind(target)}
                  className="flex w-full items-center gap-3 rounded-[1.2rem] border px-4 py-2.5 text-left transition-colors hover:border-[color:var(--share-card-hover)] sm:py-3"
                  style={cardStyle}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{ borderColor: theme.cardBorder, color: theme.accent }}
                  >
                    <ChatCircle className="h-5 w-5" weight="bold" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{link.name}</span>
                    {link.description ? (
                      <span className="block truncate text-xs" style={{ color: theme.fgMuted }}>
                        {link.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              )
            }

            if (link.kind === "ig-qr") {
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setQrKind("ig")}
                  className="flex w-full items-center gap-3 rounded-[1.2rem] border px-4 py-2.5 text-left transition-colors hover:border-[color:var(--share-card-hover)] sm:py-3"
                  style={cardStyle}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{ borderColor: theme.cardBorder, color: theme.accent }}
                  >
                    <InstagramLogo className="h-5 w-5" weight="bold" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{link.name}</span>
                    {link.description ? (
                      <span className="block truncate text-xs" style={{ color: theme.fgMuted }}>
                        {link.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              )
            }

            if (link.kind !== "external") return null

            const external = link.href.startsWith("http")
            const inner = (
              <>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{ borderColor: theme.cardBorder, color: theme.accent }}
                >
                  <ArrowSquareOut className="h-5 w-5" weight="bold" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{link.name}</span>
                  {link.description ? (
                    <span className="block truncate text-xs" style={{ color: theme.fgMuted }}>
                      {link.description}
                    </span>
                  ) : null}
                </span>
                {link.badge ? (
                  <span
                    className="max-w-[5.5rem] truncate rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: theme.pillBg, color: theme.pillText }}
                  >
                    {link.badge}
                  </span>
                ) : null}
              </>
            )

            const className =
              "flex w-full items-center gap-3 rounded-[1.2rem] border px-4 py-2.5 text-left transition-colors hover:border-[color:var(--share-card-hover)] sm:py-3"

            if (external) {
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={cardStyle}
                >
                  {inner}
                </a>
              )
            }

            return (
              <Link key={link.id} href={link.href} className={className} style={cardStyle}>
                {inner}
              </Link>
            )
          })}

          </div>

          {showPath && !bookingOpen ? (
            <SharePathExpandable
              theme={theme}
              cardStyle={cardStyle}
              fillViewport={compressForPanel}
              onOpenChange={handlePathOpenChange}
            />
          ) : null}
          </div>
        </div>
      </div>

      <QrDialog
        open={qrKind === "line-official"}
        onClose={closeQr}
        labelledBy="hub-line-official-title"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
      >
        <QrPanel
          cardStyle={cardStyle}
          theme={theme}
          onClose={closeQr}
          titleId="hub-line-official-title"
          title="LINE"
          subtitle="@482ykgdg"
          qrSrc={lineQr}
          qrAlt="LINE QR"
          actionHref={officialLineUrl}
          actionLabel={t("shareHub.openLine")}
          closeLabel={t("common.close")}
        />
      </QrDialog>

      <QrDialog
        open={qrKind === "line-personal"}
        onClose={closeQr}
        labelledBy="hub-line-personal-title"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
      >
        <QrPanel
          cardStyle={cardStyle}
          theme={theme}
          onClose={closeQr}
          titleId="hub-line-personal-title"
          title={t("shareHub.personalLine")}
          subtitle={t("shareHub.personalLineLead")}
          qrSrc={personalQrImage}
          qrAlt="LINE personal QR"
          actionHref={personalLineUrl ?? undefined}
          actionLabel={personalLineUrl ? t("shareHub.openLine") : undefined}
          closeLabel={t("common.close")}
        />
      </QrDialog>

      <QrDialog
        open={qrKind === "ig"}
        onClose={closeQr}
        labelledBy="hub-ig-title"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
      >
        <QrPanel
          cardStyle={cardStyle}
          theme={theme}
          onClose={closeQr}
          titleId="hub-ig-title"
          title="Instagram"
          qrSrc={igQr}
          qrAlt="Instagram QR"
          actionHref={igUrl}
          actionLabel="Instagram"
          closeLabel={t("common.close")}
        />
      </QrDialog>

      <style jsx global>{`
        .share-hub-lang button {
          border-color: ${theme.cardBorder} !important;
          background: ${theme.cardBg} !important;
          color: ${theme.fg} !important;
        }
        .share-hub-lang [role='menu'] {
          background: ${theme.cardBg} !important;
          border-color: ${theme.cardBorder} !important;
          backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  )
}
