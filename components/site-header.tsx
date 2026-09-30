'use client'

import { CommandPaletteTrigger } from "@/components/command-palette/command-palette-trigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { MobileNav } from "./mobile-nav";
import { LogoHomeLink } from "./logo-home-link";
import LanguageSwitcher from "./language-switcher";
import { NavLink } from "./nav-link";
import { siteNavigation } from "@/lib/navigation";
import { isShareHubPath } from "@/lib/site-paths";

const navLinkClass =
  "text-[color:var(--fg-2)] opacity-70 transition-opacity hover:opacity-100 hover:underline underline-offset-8 decoration-[color:var(--border)]";

const navLinkHeroClass =
  "text-slate-300 opacity-80 transition-opacity hover:opacity-100 hover:text-white hover:underline underline-offset-8 decoration-slate-500";

const navLinkActiveClass = "opacity-100 font-medium text-[color:var(--fg)]";

const navLinkHeroActiveClass = "opacity-100 font-medium text-white";

export default function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isSharePage = isShareHubPath(pathname);
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  // publish the real header height so pinned sub-menus (.sticky-subnav) sit exactly below it
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty("--header-h", `${el.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);

    // The header (and pinned sub-menus) take the colour of the field passing behind the header's
    // centre line: blue over blue, orange over orange. Opaque, so content never shows through.
    let lastColor = "";
    let last = 0;
    const tint = () => {
      last = performance.now();
      const y = Math.round(el.offsetHeight / 2);
      const pick = (py: number) =>
        document
          .elementsFromPoint(window.innerWidth / 2, py)
          .find((n) => n.matches?.("[data-header-color], .bg-blue, .bg-orange, .bg-dark"));
      // at scrollY 0 nothing sits behind the header yet, so read the first field just below it
      const field = pick(y) ?? pick(el.offsetHeight + 2);
      if (!field) return;
      // a section may declare its own tone (the home hero paints a gradient/canvas, so its computed
      // background-color is transparent); otherwise use the computed field colour
      const color = (field as HTMLElement).dataset.headerColor || getComputedStyle(field).backgroundColor;
      if (color && color !== lastColor && color !== "rgba(0, 0, 0, 0)") {
        lastColor = color;
        root.style.setProperty("--header-bg", color);
      }
    };
    // throttled (not rAF) so it also updates while the tab is backgrounded / in headless previews
    let trailing = 0;
    const onScroll = () => {
      if (performance.now() - last > 40) {
        tint();
      } else {
        window.clearTimeout(trailing); // trailing call so the final scroll position always wins
        trailing = window.setTimeout(tint, 60);
      }
    };
    tint();
    const retry = window.setTimeout(tint, 400); // first paint: sections may not be laid out yet
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(retry);
      window.clearTimeout(trailing);
    };
  }, [isSharePage, pathname]);

  if (isSharePage) {
    return null;
  }

  const isHeroOverlay = isHomePage && !scrolled;

  const headerClass = isHeroOverlay
    ? "site-header site-header--hero site-header--solid sticky top-0 z-50 w-full border-b"
    : "site-header--solid sticky top-0 z-50 w-full border-b";

  return (
    <header ref={headerRef} className={headerClass}>
      <div className="section-shell flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
        <div className="hidden md:flex items-center gap-8">
          <LogoHomeLink />
          <nav className="flex items-center gap-6 text-sm" aria-label="Main">
            {siteNavigation.map((item) => {
              const labelKey = "labelKey" in item ? item.labelKey : `nav.${item.key}`;
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className={isHeroOverlay ? navLinkHeroClass : navLinkClass}
                  activeClassName={isHeroOverlay ? navLinkHeroActiveClass : navLinkActiveClass}
                >
                  {t(labelKey)}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 md:justify-end">
          <div className="md:hidden">
            <LogoHomeLink compact />
          </div>

          <nav className="flex items-center gap-2" aria-label="Utilities">
            <CommandPaletteTrigger />
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
