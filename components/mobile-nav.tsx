'use client'

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
import { LogoHomeLink } from "./logo-home-link"
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
          className="mr-1 rounded-full border border-border/70 bg-white/[0.06] px-3 text-base hover:border-[color:var(--hover-border)] hover:bg-[color:var(--hover-bg)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="h-dvh w-[300px] overflow-y-auto border-l border-border/70 bg-background sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <LogoHomeLink compact onNavigateHome={() => setOpen(false)} />
          </SheetTitle>
        </SheetHeader>
        <div className="flex min-h-[calc(100%-3rem)] flex-col pt-4 pb-[calc(env(safe-area-inset-bottom)+6rem)] md:pb-6">
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

          <div className="border-t border-border/70 pt-6">
            <LanguageSwitcher fullWidth />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
