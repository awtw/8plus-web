
import "./../styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { PageTransition } from "@/components/page-transition";
import { SkipToMain } from "@/components/skip-to-main";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@/components/analytics/analytics";
import { SITE } from "@/lib/seo";
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  // No canonical here: it would be inherited by every page. Routes set it via pageMetadata().
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "zh_TW",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon.svg",
    apple: "/logo-new.svg"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh-Hant"
      className={`h-full dark ${outfit.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        {/* RSS autodiscovery as plain links: vinext's metadata resolver crashes on alternates.types descriptor arrays */}
        <link rel="alternate" type="application/rss+xml" title={`${SITE.name} 技術博客`} href={`${SITE.url}/feed.xml`} />
        <link rel="alternate" type="application/rss+xml" title={`${SITE.name} Blog (English)`} href={`${SITE.url}/feed-en.xml`} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <SkipToMain />
            <SiteHeader />
            <main id="main-content" className="flex-1 w-full min-w-0 overflow-x-clip"><PageTransition>{children}</PageTransition></main>
            <SiteFooter />
            <MobileTabBar />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
