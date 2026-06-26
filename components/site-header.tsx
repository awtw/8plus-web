'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { LogoThemeLauncher } from "./logo-theme-launcher";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NavLink } from "./nav-link";
import { siteNavigation } from "@/lib/navigation";

const navLinkClass =
  "text-[color:var(--fg-2)] opacity-70 transition-opacity hover:opacity-100 hover:underline underline-offset-8 decoration-[color:var(--border)]";

const navLinkActiveClass = "opacity-100 font-medium text-[color:var(--fg)]";

export default function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isSharePage = pathname === "/share";

  if (isSharePage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/88 backdrop-blur supports-[backdrop-filter]:bg-background/72">
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
                  className={navLinkClass}
                  activeClassName={navLinkActiveClass}
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
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button asChild className="hidden md:inline-flex rounded-full bg-[var(--fg)] text-[var(--bg)] hover:bg-[color:var(--primary-action-hover)]">
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
