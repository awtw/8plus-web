
import "./../styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { MobileTabBar } from "@/components/mobile-tab-bar";
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
    default: SITE.name,
    template: `%s · ${SITE.name}`
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
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
        {/* Design trial: ?orange=ink switches orange fields to dark-ink text (WCAG AA). Remove once decided. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(new URLSearchParams(location.search).get('orange')==='ink')document.documentElement.setAttribute('data-orange','ink')}catch(e){}",
          }}
        />
      </head>
      <body className="h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <SkipToMain />
            <SiteHeader />
            <main id="main-content" className="flex-1 w-full min-w-0 overflow-x-clip">{children}</main>
            <SiteFooter />
            <MobileTabBar />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
