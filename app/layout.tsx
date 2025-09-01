
import "./../styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/components/language-provider";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: "/og/favicon.ico",
    shortcut: "/og/favicon.ico",
    apple: "/og/8plus.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className="h-full">
      <body className="h-full flex flex-col">
        <LanguageProvider>
          <SiteHeader />
          <main className="flex-1 container">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
