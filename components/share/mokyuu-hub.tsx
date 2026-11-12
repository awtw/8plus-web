'use client'

import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChatCircle, GithubLogo, InstagramLogo, Notebook } from "@phosphor-icons/react"
import { MokyuuLogo } from "@/components/share/mokyuu-logo"
import {
  getMokyuuHubContent,
  mokyuuHref,
  type MokyuuGame,
  type ScHubLink,
  type ScQrKind,
  type ScTab,
} from "@/lib/content/mokyuu"
import type { Locale } from "@/lib/i18n"

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

function LinkIcon({ link }: { link: ScHubLink }) {
  if (link.kind === "qr") {
    return link.qr === "line-personal" ? (
      <ChatCircle className="h-5 w-5" weight="regular" />
    ) : (
      <InstagramLogo className="h-5 w-5" weight="regular" />
    )
  }
  if (link.kind === "tab") {
    return link.tab === "mokyuu" ? (
      <MokyuuLogo className="h-6 w-6 rounded-[0.4rem]" title="" />
    ) : (
      <span className="mky-row-avatar" aria-hidden />
    )
  }
  if (link.id === "github") return <GithubLogo className="h-5 w-5" weight="regular" />
  if (link.id === "journal") return <Notebook className="h-5 w-5" weight="regular" />
  return <span className="mky-8plus-mark">8+</span>
}

/** One row in a link list — external link, QR dialog trigger, or switch to the other tab. */
export function HubLinkRow({
  link,
  onQr,
  onTab,
}: {
  link: ScHubLink
  onQr: (kind: ScQrKind) => void
  onTab: (tab: ScTab) => void
}) {
  const inner = (
    <>
      <span className="mky-row-icon">
        <LinkIcon link={link} />
      </span>
      <span className="mky-row-text">
        <span className="mky-row-name">{link.name}</span>
        <span className="mky-row-desc">{link.description}</span>
      </span>
      {link.kind === "tab" ? (
        <ArrowRight className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
      ) : (
        <ArrowUpRight className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
      )}
    </>
  )

  if (link.kind === "qr") {
    return (
      <button type="button" className="mky-row" onClick={() => onQr(link.qr)} data-track="qr_open" data-track-kind={link.qr}>
        {inner}
      </button>
    )
  }
  if (link.kind === "tab") {
    return (
      <button type="button" className="mky-row" onClick={() => onTab(link.tab)} data-track="sc_tab" data-track-tab={link.tab} data-track-via="link">
        {inner}
      </button>
    )
  }
  return link.href.startsWith("http") ? (
    <a href={link.href} target="_blank" rel="noopener" className="mky-row" data-track-item={link.id}>
      {inner}
    </a>
  ) : (
    <Link href={link.href} className="mky-row">
      {inner}
    </Link>
  )
}

/** 墨語 MOKYUU tab of /sc. */
export function MokyuuPanel({
  locale,
  onQr,
  onTab,
}: {
  locale: Locale
  onQr: (kind: ScQrKind) => void
  onTab: (tab: ScTab) => void
}) {
  const c = getMokyuuHubContent(locale)

  return (
    <>
      <header className="mky-hero" data-track-section="sc_mokyuu_hero">
        <div className="mky-hero-head">
          <MokyuuLogo className="mky-logo" />
          <p className="mky-mono mky-eyebrow">{c.eyebrow}</p>
        </div>
        <h2 className="mky-title">
          <span className="mky-title-zh">墨語</span>
          <span className="mky-title-en">MOKYUU</span>
        </h2>
        <p className="mky-tagline">
          {c.tagline[0]}
          <br />
          {c.tagline[1]}
        </p>
        <p className="mky-tagline-alt">{c.taglineEn}</p>
        <p className="mky-lead">{c.lead}</p>

        <a href={mokyuuHref("/", "hero_cta")} target="_blank" rel="noopener" className="mky-cta" data-track-item="mokyuu_home">
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
        <h3 id="mky-play-title" className="mky-h2">{c.playTitle}</h3>
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
                  <h4 className="mky-game-title">
                    {game.title}
                    <span>{game.titleEn}</span>
                  </h4>
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

        <a href={c.inkDrop.href} target="_blank" rel="noopener" className="mky-row mky-row-ink" data-track-item="ink-drop">
          <span className="mky-row-icon mky-ink-dot" aria-hidden />
          <span className="mky-row-text">
            <span className="mky-row-name">{c.inkDrop.title}</span>
            <span className="mky-row-desc">{c.inkDrop.description}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
        </a>
      </section>

      <section className="mky-section" aria-labelledby="mky-social-title" data-track-section="sc_mokyuu_social">
        <p className="mky-mono mky-index">{c.socialIndex}</p>
        <h3 id="mky-social-title" className="mky-h2 mky-h2-sm">{c.socialTitle}</h3>
        <ul className="mky-rows">
          {c.social.map((link) => (
            <li key={link.id}>
              <HubLinkRow link={link} onQr={onQr} onTab={onTab} />
            </li>
          ))}
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
    </>
  )
}
