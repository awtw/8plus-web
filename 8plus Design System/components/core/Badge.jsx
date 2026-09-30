import React from "react";

/**
 * 8plus Badge — v2 CI. Three roles pulled from globals.css:
 *   eyebrow  → uppercase mono capsule (section labels like "03 · SERVICES")
 *   chip     → metric / meta pill (--metric-chip)
 *   accent   → filled accent pill for a single emphasis
 * All are pill-shaped and read the current field's tokens.
 */
export function Badge({ variant = "eyebrow", className = "", style = {}, children, ...props }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    borderRadius: "var(--radius-pill)",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };
  const variants = {
    eyebrow: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      color: "var(--fg-2)",
      border: "1px solid var(--border-soft)",
      background: "color-mix(in oklab, var(--surface), var(--bg) 22%)",
      padding: "0.375rem 0.75rem",
    },
    chip: {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      color: "var(--fg-2)",
      border: "1px solid var(--border-soft)",
      background: "color-mix(in oklab, var(--surface), var(--bg) 18%)",
      padding: "0.35rem 0.75rem",
    },
    accent: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--accent-on)",
      background: "var(--accent)",
      border: "1px solid transparent",
      padding: "0.375rem 0.75rem",
      fontWeight: "var(--fw-medium)",
    },
    status: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--fg-2)",
      border: "1px solid var(--border-soft)",
      background: "color-mix(in oklab, var(--surface), var(--bg) 22%)",
      padding: "0.375rem 0.75rem",
    },
  };
  return (
    <span className={className} style={{ ...base, ...variants[variant], ...style }} {...props}>
      {variant === "status" && (
        <span className="glow-dot" style={{ width: 6, height: 6, borderRadius: "9999px", background: "var(--success)", display: "inline-block" }} />
      )}
      {children}
    </span>
  );
}
