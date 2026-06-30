'use client'

import { getTrustContent } from "@/lib/content/trust";
import { useLanguage } from "@/components/language-provider";

type TrustBarProps = {
  compact?: boolean;
  className?: string;
};

export function TrustBar({ compact = false, className = "" }: TrustBarProps) {
  const { locale } = useLanguage();
  const { clientLogos, eyebrow, title } = getTrustContent(locale);

  return (
    <div className={className}>
      {!compact && (
        <div className="mb-3">
          <p className="eyebrow">{eyebrow}</p>
          <p className="mt-1 text-sm text-[color:var(--fg-2)]">{title}</p>
        </div>
      )}
      <div
        className="flex flex-wrap items-center gap-2"
        aria-label={title}
      >
        {clientLogos.map((client) => (
          <span
            key={client.name}
            className="metric-chip transition-colors hover:border-[color:var(--hover-border)] hover:text-[color:var(--fg)]"
          >
            {client.name}
          </span>
        ))}
      </div>
    </div>
  );
}
