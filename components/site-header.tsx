
'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export default function SiteHeader() {
  const { t, locale } = useLanguage();

  const navigation = [
    { key: "projects", href: "/projects" },
    { key: "blog", href: "/blog" },
    { key: "about", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo size={32} className="h-8 w-8" />
            <span className="font-bold text-xl">8plus</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {t(`nav.${item.key}` as any)}
              </Link>
            ))}
            <Link
              href="/path"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {locale === "zh-TW" ? "歷程" : "Path"}
            </Link>
          </nav>
        </div>

        {/* Mobile Logo */}
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Logo size={28} className="h-7 w-7" />
            <span className="font-bold text-lg">8plus</span>
          </Link>

          {/* Desktop Right Side */}
          <nav className="flex items-center space-x-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button asChild className="hidden md:inline-flex">
              <Link href="/booking">
                {t("booking.title" as any)}
              </Link>
            </Button>
            {/* Mobile Menu - Right Side */}
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
