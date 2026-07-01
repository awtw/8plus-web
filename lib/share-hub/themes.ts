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

/** Business — high-sat cyan / violet AI future */
export const shareBusinessTheme: ShareHubTheme = {
  id: "sb",
  pageBg:
    "linear-gradient(155deg, #010012 0%, #0c0068 28%, #1a0a5e 52%, #002848 78%, #000814 100%)",
  glowA: "rgba(0, 255, 255, 0.72)",
  glowB: "rgba(168, 85, 247, 0.58)",
  glowC: "rgba(59, 130, 246, 0.45)",
  gridLine: "rgba(0, 255, 255, 0.14)",
  fg: "#f8fbff",
  fgMuted: "rgba(248, 251, 255, 0.72)",
  logoMark: "#ffffff",
  accent: "#00f5ff",
  accentSoft: "rgba(0, 245, 255, 0.2)",
  cardBg: "rgba(255, 255, 255, 0.07)",
  cardBorder: "rgba(0, 245, 255, 0.35)",
  cardHoverBorder: "rgba(192, 132, 252, 0.75)",
  pillBg: "rgba(139, 92, 246, 0.35)",
  pillText: "#e9d5ff",
  ctaBg: "linear-gradient(135deg, #00f5ff 0%, #8b5cf6 50%, #3b82f6 100%)",
  ctaText: "#020617",
  meshOpacity: 0.82,
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
