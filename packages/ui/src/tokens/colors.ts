export interface ColorTokens {
  black: string
  "black-light": string
  gray: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>
  white: string
  "white-soft": string
  accent: string
  "accent-light": string
}

export const colors: ColorTokens = {
  black: "#0A0A0A",
  "black-light": "#1A1A1A",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  white: "#FFFFFF",
  "white-soft": "#FEFEFE",
  accent: "#2563EB",
  "accent-light": "#3B82F6",
}
