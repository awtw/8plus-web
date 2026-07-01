import type { Locale } from "@/lib/i18n";

export type ShareHubLink =
  | { kind: "external"; id: string; name: string; description?: string; href: string; badge?: string }
  | { kind: "email"; id: string; name: string; description?: string; email: string }
  | { kind: "line-qr"; id: string; name: string; description?: string; lineTarget: "official" | "personal" }
  | { kind: "ig-qr"; id: string; name: string; description?: string };

const EMAIL = "alec.wang.tpe@gmail.com";

export function getShareBusinessLinks(locale: Locale): ShareHubLink[] {
  const isZh = locale === "zh-TW";
  return [
    {
      kind: "email",
      id: "email",
      name: "Email",
      description: isZh ? "複製信箱，直接聯絡" : "Copy email",
      email: EMAIL,
    },
    {
      kind: "external",
      id: "booking",
      name: isZh ? "預約諮詢" : "Book a call",
      description: isZh ? "選時段，30 分鐘線上對談" : "Pick a 30-min slot",
      href: "/booking",
    },
    {
      kind: "external",
      id: "github",
      name: "GitHub",
      description: isZh ? "公開專案與實驗" : "Open source & experiments",
      href: "https://github.com/awtw",
      badge: "100+ repos",
    },
    {
      kind: "line-qr",
      id: "line",
      name: "LINE",
      description: isZh ? "官方帳號 @482ykgdg" : "Official @482ykgdg",
      lineTarget: "official",
    },
    {
      kind: "external",
      id: "main",
      name: isZh ? "官方網站" : "Official site",
      description: isZh ? "8plus.app 完整介紹" : "Full story on 8plus.app",
      href: "/",
    },
  ];
}

export function getShareSocialLinks(locale: Locale): ShareHubLink[] {
  const isZh = locale === "zh-TW";
  return [
    {
      kind: "ig-qr",
      id: "instagram",
      name: "Instagram",
      description: "@august.yan.terra",
    },
    {
      kind: "line-qr",
      id: "line",
      name: "LINE",
      description: isZh ? "私人帳號 · 輕鬆聊聊" : "Personal · say hi",
      lineTarget: "personal",
    },
    {
      kind: "external",
      id: "github",
      name: "GitHub",
      description: isZh ? "程式與 side projects" : "Code & side projects",
      href: "https://github.com/awtw",
    },
    {
      kind: "external",
      id: "main",
      name: isZh ? "官方網站" : "Official site",
      description: isZh ? "8plus.app 完整介紹" : "Full story on 8plus.app",
      href: "/",
    },
  ];
}
