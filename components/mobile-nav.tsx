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
import { Separator } from "@/components/ui/separator"
import { Menu } from "lucide-react"
import LanguageSwitcher from "./language-switcher"

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <span className="font-bold text-xl">8plus</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full pt-4 pb-6">
          
          {/* Navigation */}
          <div className="flex-1 py-6">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Footer */}
          <div className="border-t pt-6 space-y-4 pb-2">
            <div className="w-full">
              <LanguageSwitcher fullWidth />
            </div>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="inline-flex w-full h-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90"
            >
              Booking
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
