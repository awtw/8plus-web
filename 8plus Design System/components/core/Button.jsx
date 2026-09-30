import React from "react";

/**
 * 8plus Button — v2 CI. Pill-shaped; two primary treatments.
 *   primary   → white fill, field-colored text; hover flips to the
 *               accent fill (orange on blue, blue on orange).
 *   secondary → transparent, white hairline border; hover fills faintly.
 *   ghost     → borderless glass; link → underlined accent text.
 * Colors come from the current section field (--bg / --accent),
 * so a Button recolors automatically inside .bg-blue / .bg-orange.
 */

const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  whiteSpace: "nowrap",
  borderRadius: "var(--radius-pill)",
  fontFamily: "var(--font-body)",
  fontWeight: "var(--fw-medium)",
  lineHeight: 1,
  cursor: "pointer",
  border: "1px solid transparent",
  transition: "var(--transition-base)",
  userSelect: "none",
};

const sizes = {
  sm: { height: "var(--control-sm)", padding: "0 1.1rem", fontSize: "var(--text-sm)" },
  default: { height: "var(--control-md)", padding: "0 1.5rem", fontSize: "var(--text-base)" },
  lg: { height: "var(--control-lg)", padding: "0 2rem", fontSize: "var(--text-lg)" },
  icon: { height: "var(--control-md)", width: "var(--control-md)", padding: 0 },
};

export function Button({
  variant = "primary",
  size = "default",
  disabled = false,
  className = "",
  style = {},
  children,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const variants = {
    primary: {
      background: hover ? "var(--accent)" : "var(--fg)",
      color: hover ? "var(--accent-on)" : "var(--bg)",
      borderColor: "transparent",
    },
    secondary: {
      background: hover ? "var(--hover-bg)" : "transparent",
      color: "var(--fg)",
      borderColor: hover ? "var(--hover-border)" : "var(--border)",
    },
    ghost: {
      background: hover ? "var(--hover-bg)" : "transparent",
      color: "var(--fg)",
      borderColor: hover ? "var(--hover-border)" : "var(--border-soft)",
    },
    link: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "transparent",
      height: "auto",
      padding: 0,
      textDecoration: hover ? "underline" : "none",
      textUnderlineOffset: "4px",
    },
  };

  const composed = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(active && !disabled ? { transform: "translateY(1px)" } : variant !== "link" && hover && !disabled ? { transform: "translateY(-2px)" } : null),
    ...(disabled ? { opacity: 0.45, cursor: "not-allowed", transform: "none" } : null),
    ...style,
  };

  return (
    <button
      className={className}
      style={composed}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...props}
    >
      {children}
    </button>
  );
}
