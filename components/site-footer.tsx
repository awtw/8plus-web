'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { useLanguage } from "./language-provider";
import { footerNavigation } from "@/lib/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isSharePage = pathname === "/share";

  if (isSharePage) {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-border/80 bg-[color:var(--bg)]">
      <div className="section-shell py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-12 sm:pb-[max(3rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Logo size={28} className="h-7 w-7" />
              <span className="text-lg font-semibold tracking-[-0.02em] text-[color:var(--fg)]">8plus</span>
              <span className="text-[color:var(--muted)]">·</span>
              <span className="text-sm text-[color:var(--fg-2)]">{t("footer.tagline")}</span>
            </div>
            <p className="text-sm text-[color:var(--muted)]">
              © {new Date().getFullYear()} 8plus. {t("footer.builtWith")}
            </p>
          </div>

          <nav aria-label={t("footer.navLabel")} className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNavigation.map((item) => {
              const labelKey = "labelKey" in item ? item.labelKey : `nav.${item.key}`;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[color:var(--fg-2)] hover:text-[color:var(--fg)] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] rounded-sm"
                >
                  {t(labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-2 lg:items-end">
            <p className="text-sm text-[color:var(--fg-2)]">
              {t("footer.metaphysics")}{" "}
              <a
                className="font-medium text-[color:var(--fg)] underline decoration-[color:var(--border)] underline-offset-4 hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] rounded-sm"
                href="https://shuyan.art"
                target="_blank"
                rel="noopener noreferrer"
              >
                shuyan.art
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs text-[color:var(--muted)]">
              <span>{t("footer.madeIn")}</span>
              <span>·</span>
              <span>{t("footer.poweredBy")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
