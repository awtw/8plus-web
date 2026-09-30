import React from "react";

/**
 * 8plus Logo — v2 CI. The abstract mark (small top-left circle,
 * thick diagonal slash, large bottom-right circle) — geometry copied
 * verbatim from the source (components/logo.tsx), NOT redrawn.
 * On the color fields the mark is WHITE by default.
 *
 * variant: "default"/"mono"/"light" (white mark, transparent) ·
 * "brand" (white mark on IKB-blue tile) · "favicon" (white mark on
 * the current field). Set `wordmark` to add the "8plus" wordmark.
 */
export function Logo({ size = 32, variant = "default", wordmark = false, animated = false, className = "", style = {}, ...props }) {
  const config = {
    default: { bg: "transparent", mark: "var(--logo-mark)" },
    mono: { bg: "transparent", mark: "var(--logo-mark)" },
    light: { bg: "transparent", mark: "#ffffff" },
    brand: { bg: "var(--color-blue)", mark: "#ffffff" },
    favicon: { bg: "var(--bg)", mark: "var(--logo-mark)" },
  }[variant];

  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anim = animated && !reduce;
  const breathe = (delay) => (anim ? { transformBox: "fill-box", transformOrigin: "center", animation: `logoBreathe 3.2s ease-in-out ${delay} infinite` } : undefined);

  const mark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      width={size}
      height={size}
      role="img"
      aria-label="8plus"
      style={{ flexShrink: 0, display: "block", overflow: "visible" }}
    >
      {config.bg !== "transparent" ? <rect width="100" height="100" rx="18" fill={config.bg} /> : null}
      <circle cx="32" cy="29" r="18" fill={config.mark} style={breathe("0s")} />
      <path d="M53 9H68L36 91H21L53 9Z" fill={config.mark} style={anim ? { animation: "logoSlashSheen 3.2s ease-in-out infinite" } : undefined} />
      <circle cx="70" cy="64" r="28" fill={anim ? "var(--color-orange)" : config.mark} stroke={anim ? "rgba(255,255,255,.55)" : "none"} strokeWidth={anim ? 2 : 0} style={anim ? { ...breathe(".5s"), filter: "drop-shadow(0 0 7px rgba(254,80,0,.65))" } : undefined} />
    </svg>
  );

  if (!wordmark) {
    return <span className={className} style={{ display: "inline-flex", ...style }} {...props}>{mark}</span>;
  }

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", ...style }} {...props}>
      {mark}
      <span style={{ fontFamily: "var(--font-body)", fontWeight: "var(--fw-semibold)", fontSize: `${size * 0.6}px`, letterSpacing: "-0.02em", color: "var(--fg)", lineHeight: 1 }}>
        8plus
      </span>
    </span>
  );
}
