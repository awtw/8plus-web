'use client'

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { ChatCircle } from "@phosphor-icons/react";
import { useLanguage } from "@/components/language-provider";
import { getLineAddFriendUrl, getLineBasicIdLabel } from "@/lib/line";

type LineContactCardProps = {
  showQr?: boolean;
  className?: string;
};

export function LineContactCard({ showQr = true, className = "" }: LineContactCardProps) {
  const { locale, t } = useLanguage();
  const addFriendUrl = getLineAddFriendUrl();
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    if (!showQr) return;
    QRCode.toDataURL(addFriendUrl, {
      width: 160,
      margin: 2,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [addFriendUrl, showQr]);

  return (
    <div className={`rounded-[var(--radius-md)] border border-border-soft bg-[color:var(--surface)] p-4 ${className}`}>
      <div className="flex items-start gap-3">
        {showQr && (
          <div className="shrink-0 rounded-[var(--radius-md)] bg-background p-2">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt=""
                className="h-24 w-24 rounded-[12px]"
                width={96}
                height={96}
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center text-xs text-[color:var(--muted)]">
                {t("common.loading")}
              </div>
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="eyebrow">{t("contact.lineEyebrow")}</p>
          <h3 className="mt-2 text-base font-semibold tracking-[-0.02em]">{t("contact.lineTitle")}</h3>
          <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{t("contact.lineLead")}</p>
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            {getLineBasicIdLabel(locale)}
          </p>
          <a
            href={addFriendUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-button-secondary mt-4 inline-flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <ChatCircle className="h-4 w-4" weight="bold" />
            {t("contact.lineOpen")}
          </a>
        </div>
      </div>
    </div>
  );
}
