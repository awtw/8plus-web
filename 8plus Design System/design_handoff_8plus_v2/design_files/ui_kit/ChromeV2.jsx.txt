/* global React */
// 8plus.app v2 CI — site chrome. Header is transparent over the hero
// and frosts on scroll; footer sits on a deep-night field. Composes
// the DS Logo / Button / Sheet / DropdownMenu.

const NS = window.Ds8plusDesignSystem_1b9e83;
const { Logo, Button, Separator, Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,
        DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } = NS;

const NAV = [
  { key: "about", zh: "關於", en: "About" },
  { key: "lab", zh: "Lab", en: "Lab" },
  { key: "path", zh: "歷程", en: "Path" },
  { key: "services", zh: "服務", en: "Services" },
  { key: "booking", zh: "預約", en: "Booking" },
];

function AnimatedLogo({ size = 28 }) {
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const br = (d) => reduce ? undefined : { transformBox: "fill-box", transformOrigin: "center", animation: `logoBreathe 3.2s ease-in-out ${d} infinite` };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" width={size} height={size} role="img" aria-label="8plus" style={{ flexShrink: 0, display: "block", overflow: "visible" }}>
        <circle cx="32" cy="29" r="18" fill="#ffffff" style={br("0s")} />
        <path d="M53 9H68L36 91H21L53 9Z" fill="#ffffff" style={reduce ? undefined : { animation: "logoSlashSheen 3.2s ease-in-out infinite" }} />
        <circle cx="70" cy="64" r="28" fill="var(--color-orange)" stroke="rgba(255,255,255,.55)" strokeWidth="2" style={reduce ? undefined : { ...br(".5s"), filter: "drop-shadow(0 0 7px rgba(254,80,0,.65))" }} />
      </svg>
      <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--fw-semibold)", fontSize: `${size * 0.6}px`, letterSpacing: "-0.02em", color: "var(--fg)", lineHeight: 1 }}>8plus</span>
    </span>
  );
}

function Header({ lang, setLang, scrolled, onNav }) {
  const t = (zh, en) => (lang === "zh" ? zh : en);
  const frost = scrolled;
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        borderBottom: frost ? "1px solid var(--border-soft)" : "1px solid transparent",
        background: frost ? "color-mix(in oklab, var(--color-dark), transparent 12%)" : "transparent",
        backdropFilter: frost ? "blur(12px)" : "none",
        WebkitBackdropFilter: frost ? "blur(12px)" : "none",
        transition: "var(--transition-base)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", minHeight: "4.5rem", padding: "0 clamp(24px,4vw,28px)", display: "flex", alignItems: "center", gap: 32 }}>
        <a onClick={() => onNav("hero")} style={{ cursor: "pointer", display: "flex" }}><AnimatedLogo size={28} /></a>
        <nav className="desk-nav" style={{ display: "flex", gap: 24, marginLeft: 4 }}>
          {NAV.map((item) => (
            <a key={item.key} onClick={() => onNav(item.key)}
               style={{ fontSize: 14, cursor: "pointer", color: "var(--fg-2)", opacity: 0.75, transition: "opacity .15s" }}
               onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
               onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.75)}>
              {t(item.zh, item.en)}
            </a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="desk-nav">
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="secondary" size="sm">{lang === "zh" ? "繁中 ▾" : "EN ▾"}</Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLang("zh")}>繁體中文</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mob-nav">
            <Sheet>
              <SheetTrigger asChild><Button variant="ghost" size="icon">≡</Button></SheetTrigger>
              <SheetContent side="right">
                <SheetHeader><SheetTitle>8plus</SheetTitle><SheetDescription>{t("架構先行 · AI 落地", "Architecture-led · AI shipped")}</SheetDescription></SheetHeader>
                <Separator />
                <nav style={{ display: "flex", flexDirection: "column" }}>
                  {NAV.map((item) => (
                    <a key={item.key} onClick={() => onNav(item.key)} style={{ fontSize: 17, padding: "10px 0", color: "var(--fg-2)", cursor: "pointer" }}>{t(item.zh, item.en)}</a>
                  ))}
                </nav>
                <Button onClick={() => onNav("booking")} style={{ marginTop: "auto" }}>{t("預約諮詢", "Book a call")}</Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer({ lang }) {
  const t = (zh, en) => (lang === "zh" ? zh : en);
  return (
    <footer className="bg-dark noise-field" style={{ position: "relative", borderTop: "1px solid var(--border-soft)" }}>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--container-max)", margin: "0 auto", padding: "48px clamp(24px,4vw,28px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24 }}>
        <div>
          <Logo size={26} wordmark />
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--meta)", margin: "14px 0 0" }}>
            {t("架構驅動的技術夥伴", "Architecture-led engineering partner")}
          </p>
          <p style={{ fontSize: 13, color: "var(--meta)", margin: "8px 0 0" }}>© {new Date().getFullYear()} 8plus · Made in Taiwan</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <div style={{ display: "flex", gap: 18, fontSize: 14, color: "var(--fg-2)" }}>
            <a href="#" style={{ color: "var(--fg-2)" }}>LINE</a>
            <a href="#" style={{ color: "var(--fg-2)" }}>Email</a>
            <a href="#" style={{ color: "var(--fg-2)" }}>RSS</a>
          </div>
          <p style={{ fontSize: 12, color: "var(--meta)", margin: 0 }}>Next.js 15 · Velite · Vercel</p>
        </div>
      </div>
    </footer>
  );
}

window.Site = { Header, Footer, NAV };
