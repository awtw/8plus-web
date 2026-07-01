'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { LogoThemeLauncher } from "./logo-theme-launcher";
import LanguageSwitcher from "./language-switcher";
import { NavLink } from "./nav-link";
import { siteNavigation } from "@/lib/navigation";

const navLinkClass =
  "text-[color:var(--fg-2)] opacity-70 transition-opacity hover:opacity-100 hover:underline underline-offset-8 decoration-[color:var(--border)]";

const navLinkHeroClass =
  "text-slate-300 opacity-80 transition-opacity hover:opacity-100 hover:text-white hover:underline underline-offset-8 decoration-slate-500";

const navLinkActiveClass = "opacity-100 font-medium text-[color:var(--fg)]";

const navLinkHeroActiveClass = "opacity-100 font-medium text-white";

export default function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isSharePage = pathname === "/share";
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

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

  if (isSharePage) {
    return null;
  }

  const isHeroOverlay = isHomePage && !scrolled;

  const headerClass = isHeroOverlay
    ? "site-header site-header--hero sticky top-0 z-50 w-full border-b border-transparent bg-transparent"
    : "sticky top-0 z-50 w-full border-b border-border/80 bg-background/88 backdrop-blur supports-[backdrop-filter]:bg-background/72";

  const bookingButtonClass = isHeroOverlay
    ? "site-header__booking-ghost hidden md:inline-flex"
    : "hidden md:inline-flex rounded-full bg-[var(--fg)] text-[var(--bg)] hover:bg-[color:var(--primary-action-hover)]";

  return (
    <header className={headerClass}>
      <div className="section-shell flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
        <div className="hidden md:flex items-center gap-8">
          <LogoThemeLauncher />
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
            <LogoThemeLauncher compact />
          </div>

          <nav className="flex items-center gap-2" aria-label="Utilities">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Button asChild className={bookingButtonClass}>
              <Link href="/booking">
                {t("nav.booking")}
              </Link>
            </Button>
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
