'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import QRCode from "qrcode"
import { ArrowUpRight, ChatCircle, GithubLogo, InstagramLogo } from "@phosphor-icons/react"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcher from "@/components/language-switcher"
import { QrDialog } from "@/components/qr-dialog"
import { MokyuuLogo } from "@/components/share/mokyuu-logo"
import { getLinePersonalAddFriendUrl, getLinePersonalQrImage } from "@/lib/line"
import { getMokyuuHubContent, mokyuuHref, type MokyuuGame, type MokyuuSocialLink } from "@/lib/content/mokyuu"
import "@/styles/pages/mokyuu-hub.css"

const IG_URL = "https://www.instagram.com/august.yan.terra/"

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

function GameArt({ art }: { art: MokyuuGame["art"] }) {
  if (art === "watch") {
    // Desk grid; one desk "slacking" pulses in seal red — the one you are supposed to catch.
    return (
      <div className="mky-art mky-art-watch" aria-hidden>
        {Array.from({ length: 15 }, (_, i) => (
          <span key={i} className={i === 8 ? "is-target" : undefined} />
        ))}
        <i className="mky-art-scope" />
      </div>
    )
  }
  // Branching paths — choices fanning out to many endings.
  return (
    <div className="mky-art mky-art-survival" aria-hidden>
      <svg viewBox="0 0 240 120" preserveAspectRatio="xMidYMid meet">
        <path d="M20 60 C70 60 70 22 120 22 S170 12 220 12" />
        <path d="M20 60 C70 60 70 22 120 22 S170 40 220 40" />
        <path d="M20 60 C70 60 70 98 120 98 S170 80 220 80" />
        <path d="M20 60 C70 60 70 98 120 98 S170 108 220 108" />
        <path d="M20 60 L220 60" className="is-chosen" />
        <circle cx="20" cy="60" r="6" className="is-start" />
        {[12, 40, 60, 80, 108].map((y) => (
          <circle key={y} cx="220" cy={y} r={y === 60 ? 6 : 4} className={y === 60 ? "is-end" : undefined} />
        ))}
      </svg>
    </div>
  )
}

function SocialIcon({ link }: { link: MokyuuSocialLink }) {
  if (link.kind === "ig-qr") return <InstagramLogo className="h-5 w-5" weight="regular" />
  if (link.kind === "line-qr") return <ChatCircle className="h-5 w-5" weight="regular" />
  if (link.id === "github") return <GithubLogo className="h-5 w-5" weight="regular" />
  return <span className="mky-8plus-mark">8+</span>
}

export function MokyuuHub() {
  const { locale, t } = useLanguage()
  const c = getMokyuuHubContent(locale)
  const [qrKind, setQrKind] = useState<"ig" | "line" | null>(null)
  const [igQr, setIgQr] = useState("")
  const personalLineUrl = getLinePersonalAddFriendUrl()
  const personalQrImage = getLinePersonalQrImage()

  useEffect(() => {
    QRCode.toDataURL(IG_URL, { width: 220, margin: 2, color: { dark: "#08080A", light: "#ffffff" } }).then(setIgQr)
  }, [])

  const closeQr = () => setQrKind(null)

  return (
    <div className="mky" data-share-variant="sc" data-track-location="sc_hub">
      <div className="mky-grain" aria-hidden />

      <div className="mky-topbar">
        <span className="mky-mono mky-wordmark">MOKYUU 墨語</span>
        <TaipeiClock />
        <div className="mky-lang">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="mky-wrap">
        <header className="mky-hero" data-track-section="sc_hero">
          <div className="mky-hero-head">
            <MokyuuLogo className="mky-logo" />
            <p className="mky-mono mky-eyebrow">{c.eyebrow}</p>
          </div>
          <h1 className="mky-title">
            <span className="mky-title-zh">墨語</span>
            <span className="mky-title-en">MOKYUU</span>
          </h1>
          <p className="mky-tagline">
            {c.tagline[0]}
            <br />
            {c.tagline[1]}
          </p>
          <p className="mky-tagline-alt">{c.taglineEn}</p>
          <p className="mky-lead">{c.lead}</p>

          <a
            href={mokyuuHref("/", "hero_cta")}
            target="_blank"
            rel="noopener"
            className="mky-cta"
            data-track-item="mokyuu_home"
          >
            <span>
              <span className="mky-cta-label">{c.cta}</span>
              <span className="mky-mono mky-cta-note">{c.ctaNote}</span>
            </span>
            <ArrowUpRight className="h-5 w-5" weight="bold" aria-hidden />
          </a>
          <span className="mky-seal" aria-hidden>墨</span>
        </header>

        <div className="mky-marquee" aria-hidden>
          <div className="mky-marquee-track">
            {[0, 1].map((dup) => (
              <span key={dup}>
                {c.marquee.map((item) => (
                  <span key={item}>
                    {item}
                    <i>✶</i>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section className="mky-section" aria-labelledby="mky-play-title" data-track-section="sc_play">
          <p className="mky-mono mky-index">{c.playIndex}</p>
          <h2 id="mky-play-title" className="mky-h2">{c.playTitle}</h2>
          <p className="mky-section-lead">{c.playLead}</p>

          <ul className="mky-games">
            {c.games.map((game) => (
              <li key={game.id}>
                <a
                  href={game.href}
                  target="_blank"
                  rel="noopener"
                  className={`mky-game mky-game-${game.art}`}
                  data-track-item={game.id}
                  data-track-label={game.titleEn}
                >
                  <GameArt art={game.art} />
                  <div className="mky-game-body">
                    <p className="mky-mono mky-game-meta">
                      <span>N° {game.no}</span>
                      <span>{game.kind}</span>
                    </p>
                    <h3 className="mky-game-title">
                      {game.title}
                      <span>{game.titleEn}</span>
                    </h3>
                    <p className="mky-game-hook">{game.hook}</p>
                    <p className="mky-game-desc">{game.description}</p>
                    <ul className="mky-facts">
                      {game.facts.map((fact) => (
                        <li key={fact}>{fact}</li>
                      ))}
                    </ul>
                    <span className="mky-game-play">
                      {c.playAction}
                      <ArrowUpRight className="h-4 w-4" weight="bold" aria-hidden />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={c.inkDrop.href}
            target="_blank"
            rel="noopener"
            className="mky-row mky-row-ink"
            data-track-item="ink-drop"
          >
            <span className="mky-row-icon mky-ink-dot" aria-hidden />
            <span className="mky-row-text">
              <span className="mky-row-name">{c.inkDrop.title}</span>
              <span className="mky-row-desc">{c.inkDrop.description}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
          </a>
        </section>

        <section className="mky-section" aria-labelledby="mky-social-title" data-track-section="sc_social">
          <p className="mky-mono mky-index">{c.socialIndex}</p>
          <h2 id="mky-social-title" className="mky-h2 mky-h2-sm">{c.socialTitle}</h2>
          <ul className="mky-rows">
            {c.social.map((link) => {
              const inner = (
                <>
                  <span className="mky-row-icon">
                    <SocialIcon link={link} />
                  </span>
                  <span className="mky-row-text">
                    <span className="mky-row-name">{link.name}</span>
                    <span className="mky-row-desc">{link.description}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
                </>
              )
              if (link.kind === "ig-qr" || link.kind === "line-qr") {
                const kind = link.kind === "ig-qr" ? "ig" : "line"
                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      className="mky-row"
                      onClick={() => setQrKind(kind)}
                      data-track="qr_open"
                      data-track-kind={kind === "ig" ? "ig" : "line-personal"}
                    >
                      {inner}
                    </button>
                  </li>
                )
              }
              const external = link.href.startsWith("http")
              return (
                <li key={link.id}>
                  {external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="mky-row">
                      {inner}
                    </a>
                  ) : (
                    <Link href={link.href} className="mky-row">
                      {inner}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <footer className="mky-footer">
          <p className="mky-mono">{c.footerLine}</p>
          <p className="mky-swatches mky-mono">
            <span><i style={{ background: "#08080A" }} />Ink #08080A</span>
            <span><i style={{ background: "#002FA7" }} />IKB #002FA7</span>
            <span><i style={{ background: "#FF401F" }} />Seal #FF401F</span>
          </p>
          <p className="mky-footer-note">
            {c.footerProfessional}{" "}
            <Link href="/">8plus.app</Link>
          </p>
          <p className="mky-mono mky-footer-copy">{c.footerNote}</p>
        </footer>
      </div>

      <QrDialog open={qrKind === "ig"} onClose={closeQr} labelledBy="mky-ig-title" overlayClassName="mky-qr-overlay">
        <div className="mky-qr">
          <h3 id="mky-ig-title">Instagram</h3>
          <p className="mky-mono">@august.yan.terra</p>
          {igQr ? <img src={igQr} alt="Instagram QR code" /> : null}
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="mky-qr-primary">Instagram</a>
          <button type="button" onClick={closeQr} className="mky-qr-secondary">{t("common.close")}</button>
        </div>
      </QrDialog>

      <QrDialog open={qrKind === "line"} onClose={closeQr} labelledBy="mky-line-title" overlayClassName="mky-qr-overlay">
        <div className="mky-qr">
          <h3 id="mky-line-title">{t("shareHub.personalLine")}</h3>
          <p className="mky-mono">{t("shareHub.personalLineLead")}</p>
          <img src={personalQrImage} alt="LINE QR code" />
          {personalLineUrl ? (
            <a href={personalLineUrl} target="_blank" rel="noopener noreferrer" className="mky-qr-primary">
              {t("shareHub.openLine")}
            </a>
          ) : null}
          <button type="button" onClick={closeQr} className="mky-qr-secondary">{t("common.close")}</button>
        </div>
      </QrDialog>
    </div>
  )
}
