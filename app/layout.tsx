
import "./../styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { SkipToMain } from "@/components/skip-to-main";
import { DesignModeProvider } from "@/components/design-mode-provider";
import { DesignModeScript } from "@/components/design-mode-script";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/seo";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
    <html lang="zh-Hant" className="h-full" data-design-mode="cohere" suppressHydrationWarning>
      <head>
        <DesignModeScript />
        <JsonLd />
      </head>
      <body className="h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <DesignModeProvider>
            <LanguageProvider>
              <SkipToMain />
              <SiteHeader />
              <main id="main-content" className="flex-1 w-full min-w-0 overflow-x-clip">{children}</main>
              <SiteFooter />
            </LanguageProvider>
          </DesignModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
