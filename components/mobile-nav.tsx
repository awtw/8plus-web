'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "./language-provider"
import { LogoThemeLauncher } from "./logo-theme-launcher"
import { NavLink } from "./nav-link"
import { siteNavigation } from "@/lib/navigation"

export function MobileNav() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-1 rounded-full border border-border/70 bg-background/80 px-3 text-base hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] border-l border-border/70 bg-background sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <LogoThemeLauncher compact onNavigateHome={() => setOpen(false)} />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full pt-4 pb-6">
          <div className="flex-1 py-6">
            <nav className="flex flex-col space-y-4" aria-label="Main">
              {siteNavigation.map((item) => {
                const labelKey = "labelKey" in item ? item.labelKey : `nav.${item.key}`
                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-[color:var(--fg-2)] hover:text-[color:var(--hover-fg)] transition-colors py-2"
                    activeClassName="text-[color:var(--fg)]"
                  >
                    {t(labelKey)}
                  </NavLink>
                )
              })}
            </nav>
          </div>

          <div className="border-t border-border/70 pt-6 space-y-4 pb-2">
            <div className="w-full">
              <LanguageSwitcher fullWidth />
            </div>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="inline-flex w-full h-12 items-center justify-center rounded-full bg-[color:var(--fg)] text-[color:var(--bg)] font-medium transition-colors hover:bg-[color:var(--primary-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              {t("nav.booking")}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
