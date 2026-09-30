import React from "react";

/**
 * 8plus Card — v2 CI glass container. Sits over a colored section
 * field: translucent white surface, hairline border, 22px signature
 * radius. `variant="highlight"` adds a hover lift + gradient hairline
 * (use gradient-border via className too). Compose with the parts.
 */

export function Card({ variant = "default", className = "", style = {}, children, ...props }) {
  const base = {
    borderRadius: "var(--radius-md)",
    color: "var(--fg)",
    overflow: "hidden",
    background: "color-mix(in oklab, var(--bg), white 1%)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--elev-ring)",
  };
  const strong = {
    background: "color-mix(in oklab, var(--surface), white 3%)",
    border: "1px solid var(--border)",
  };
  return (
    <div
      className={(variant === "highlight" ? "gradient-border-card " : "") + className}
      style={{ ...base, ...(variant === "strong" ? strong : null), ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "var(--space-6)", ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ fontFamily: "var(--font-body)", fontWeight: "var(--fw-medium)", fontSize: "var(--text-xl)", letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--fg)", ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardDescription({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ fontSize: "var(--text-base)", color: "var(--muted)", lineHeight: 1.6, ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ padding: "0 var(--space-6) var(--space-6)", ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "0 var(--space-6) var(--space-6)", ...style }} {...props}>
      {children}
    </div>
  );
}
