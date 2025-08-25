
import "./../styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
