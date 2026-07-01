export type ShareHubVariant = "sb" | "sc"

export type ShareHubTheme = {
  id: ShareHubVariant
  pageBg: string
  glowA: string
  glowB: string
  glowC?: string
  gridLine: string
  fg: string
  fgMuted: string
  logoMark: string
  accent: string
  accentSoft: string
  cardBg: string
  cardBorder: string
  cardHoverBorder: string
  pillBg: string
  pillText: string
  ctaBg: string
  ctaText: string
  meshOpacity: number
}

/** Business — Pantone Orange 021 C family, solid field */
export const shareBusinessTheme: ShareHubTheme = {
  id: "sb",
  pageBg: "#FE5000",
  glowA: "rgba(255, 220, 130, 0.34)",
  glowB: "rgba(255, 160, 70, 0.28)",
  glowC: "rgba(255, 240, 170, 0.18)",
  gridLine: "rgba(255, 255, 255, 0.11)",
  fg: "#FFFFFF",
  fgMuted: "rgba(255, 255, 255, 0.84)",
  logoMark: "#FFFFFF",
  accent: "#FFFFFF",
  accentSoft: "rgba(255, 255, 255, 0.2)",
  cardBg: "rgba(255, 255, 255, 0.17)",
  cardBorder: "rgba(255, 255, 255, 0.38)",
  cardHoverBorder: "rgba(255, 255, 255, 0.75)",
  pillBg: "rgba(255, 230, 160, 0.3)",
  pillText: "#FFFFFF",
  ctaBg: "#FFFFFF",
  ctaText: "#E04600",
  meshOpacity: 0.28,
}

/** Social — International Klein Blue, solid field */
export const shareSocialTheme: ShareHubTheme = {
  id: "sc",
  pageBg: "#002FA7",
  glowA: "rgba(77, 124, 255, 0.32)",
  glowB: "rgba(0, 35, 120, 0.45)",
  glowC: "rgba(140, 175, 255, 0.22)",
  gridLine: "rgba(255, 255, 255, 0.09)",
  fg: "#FFFFFF",
  fgMuted: "rgba(255, 255, 255, 0.8)",
  logoMark: "#FFFFFF",
  accent: "#FFFFFF",
  accentSoft: "rgba(255, 255, 255, 0.16)",
  cardBg: "rgba(255, 255, 255, 0.14)",
  cardBorder: "rgba(255, 255, 255, 0.34)",
  cardHoverBorder: "rgba(255, 255, 255, 0.68)",
  pillBg: "rgba(255, 255, 255, 0.2)",
  pillText: "#FFFFFF",
  ctaBg: "#FFFFFF",
  ctaText: "#002FA7",
  meshOpacity: 0.3,
}

export function getShareHubTheme(variant: ShareHubVariant): ShareHubTheme {
  return variant === "sb" ? shareBusinessTheme : shareSocialTheme
}
