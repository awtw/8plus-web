
'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import LanguageSwitcher from "./language-switcher";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image 
              src="/og/8plus.svg" 
              alt="8plus Logo" 
              width={32} 
              height={32}
              className="h-8 w-8"
            />
            <span className="font-bold text-xl">8plus</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Logo */}
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Image 
              src="/og/8plus.svg" 
              alt="8plus Logo" 
              width={28} 
              height={28}
              className="h-7 w-7"
            />
            <span className="font-bold text-lg">8plus</span>
          </Link>

          {/* Desktop Right Side */}
          <nav className="flex items-center space-x-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Button asChild className="hidden md:inline-flex">
              <Link href="/booking">
                Booking
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
