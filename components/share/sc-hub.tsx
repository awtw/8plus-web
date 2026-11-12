'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import Image from "next/image"
import QRCode from "qrcode"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcher from "@/components/language-switcher"
import { QrDialog } from "@/components/qr-dialog"
import { MokyuuLogo } from "@/components/share/mokyuu-logo"
import { HubLinkRow, MokyuuPanel } from "@/components/share/mokyuu-hub"
import { getLinePersonalAddFriendUrl, getLinePersonalQrImage } from "@/lib/line"
import {
  AUGUST_IG_URL,
  MOKYUU_IG_URL,
  getAugustHubContent,
  type ScQrKind,
  type ScTab,
} from "@/lib/content/mokyuu"
import "@/styles/pages/mokyuu-hub.css"

const TABS: ScTab[] = ["august", "mokyuu"]

/** Taipei wall clock, like the mokyuu.com header. Renders a placeholder on the server. */
function TaipeiClock() {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Taipei",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className="mky-mono mky-clock" aria-label="Taipei time">
      TPE {now ?? "--:--:--"}
    </span>
  )
}

/** /sc — August's personal links (default tab) and the 墨語 MOKYUU creative tab. Deep link: /sc?tab=mokyuu */
export function ScHub() {
  const { locale, t } = useLanguage()
  const zh = locale === "zh-TW"
  const august = getAugustHubContent(locale)
  const [tab, setTabState] = useState<ScTab>("august")
  // Animate the background only for user-initiated switches, not when ?tab= is applied on load.
  const [animate, setAnimate] = useState(false)
  const [qr, setQr] = useState<ScQrKind | null>(null)
  const [qrImages, setQrImages] = useState<Partial<Record<ScQrKind, string>>>({})
  const tabRefs = useRef<Record<ScTab, HTMLButtonElement | null>>({ august: null, mokyuu: null })
  const personalLineUrl = getLinePersonalAddFriendUrl()

  // Read ?tab= after mount so the server render stays static (default: august).
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tab")
    if (fromUrl === "mokyuu") setTabState("mokyuu")
  }, [])

  useEffect(() => {
    const make = (url: string) =>
      QRCode.toDataURL(url, { width: 220, margin: 2, color: { dark: "#08080A", light: "#ffffff" } })
    Promise.all([make(AUGUST_IG_URL), make(MOKYUU_IG_URL)]).then(([a, m]) =>
      setQrImages({ "ig-august": a, "ig-mokyuu": m, "line-personal": getLinePersonalQrImage() }),
    )
  }, [])

  const setTab = useCallback((next: ScTab, focus = false) => {
    setAnimate(true)
    setTabState(next)
    const url = new URL(window.location.href)
    if (next === "mokyuu") url.searchParams.set("tab", "mokyuu")
    else url.searchParams.delete("tab")
    window.history.replaceState(window.history.state, "", url)
    if (focus) tabRefs.current[next]?.focus()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
    event.preventDefault()
    const i = TABS.indexOf(tab)
    setTab(TABS[(i + (event.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length], true)
  }

  const qrInfo: Record<ScQrKind, { title: string; sub: string; href?: string | null; action: string }> = {
    "ig-august": { title: "Instagram", sub: "@august.yan.terra", href: AUGUST_IG_URL, action: "Instagram" },
    "ig-mokyuu": { title: zh ? "墨語 Instagram" : "MOKYUU Instagram", sub: "@mokyuu.ig", href: MOKYUU_IG_URL, action: "Instagram" },
    "line-personal": {
      title: t("shareHub.personalLine"),
      sub: t("shareHub.personalLineLead"),
      href: personalLineUrl,
      action: t("shareHub.openLine"),
    },
  }
  const active = qr ? qrInfo[qr] : null

  return (
    <div className="mky" data-share-variant="sc" data-tab={tab} data-animate={animate ? "" : undefined} data-track-location={`sc_${tab}`}>
      <div className="mky-grain" aria-hidden />

      <div className="mky-topbar">
        <span className="mky-mono mky-wordmark">{tab === "mokyuu" ? "MOKYUU 墨語" : "AUGUST · 8PLUS"}</span>
        <TaipeiClock />
        <div className="mky-lang">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="mky-wrap">
        <div className="sc-tabs" role="tablist" aria-label={zh ? "切換身份" : "Switch identity"}>
          {TABS.map((id) => (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[id] = el
              }}
              type="button"
              role="tab"
              id={`sc-tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`sc-panel-${id}`}
              tabIndex={tab === id ? 0 : -1}
              className="sc-tab"
              onClick={() => setTab(id)}
              onKeyDown={onTabKey}
              data-track="sc_tab"
              data-track-tab={id}
              data-track-via="tabs"
            >
              {id === "august" ? (
                <span className="sc-tab-avatar" aria-hidden />
              ) : (
                <MokyuuLogo className="sc-tab-logo" title="" />
              )}
              <span>{id === "august" ? "August" : zh ? "墨語 MOKYUU" : "MOKYUU 墨語"}</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="sc-panel-august"
          aria-labelledby="sc-tab-august"
          hidden={tab !== "august"}
          className="sc-august"
          data-track-section="sc_august"
        >
          <header className="sc-august-head">
            <div className="sc-august-avatar">
              <Image src="/me/me_3.jpeg" alt="" fill sizes="112px" className="object-cover" priority />
            </div>
            <h1 className="sc-august-name">{august.name}</h1>
            <p className="sc-august-lead">{august.lead}</p>
          </header>
          <ul className="sc-august-links">
            {august.links.map((link) => (
              <li key={link.id}>
                <HubLinkRow link={link} onQr={setQr} onTab={setTab} />
              </li>
            ))}
          </ul>
        </div>

        <div
          role="tabpanel"
          id="sc-panel-mokyuu"
          aria-labelledby="sc-tab-mokyuu"
          hidden={tab !== "mokyuu"}
          className="sc-mokyuu"
        >
          <MokyuuPanel locale={locale} onQr={setQr} onTab={setTab} />
        </div>
      </div>

      <QrDialog open={active !== null} onClose={() => setQr(null)} labelledBy="sc-qr-title" overlayClassName="mky-qr-overlay">
        {active && qr ? (
          <div className="mky-qr">
            <h3 id="sc-qr-title">{active.title}</h3>
            <p className="mky-mono">{active.sub}</p>
            {qrImages[qr] ? <img src={qrImages[qr]} alt={`${active.title} QR code`} /> : null}
            {active.href ? (
              <a href={active.href} target="_blank" rel="noopener noreferrer" className="mky-qr-primary">
                {active.action}
              </a>
            ) : null}
            <button type="button" onClick={() => setQr(null)} className="mky-qr-secondary">
              {t("common.close")}
            </button>
          </div>
        ) : null}
      </QrDialog>
    </div>
  )
}
