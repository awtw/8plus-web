import React from "react";

/**
 * 8plus Separator — a 1px hairline in the soft border color.
 */
export function Separator({ orientation = "horizontal", className = "", style = {}, ...props }) {
  const isH = orientation === "horizontal";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={className}
      style={{
        flexShrink: 0,
        background: "var(--border-soft)",
        width: isH ? "100%" : "1px",
        height: isH ? "1px" : "100%",
        ...style,
      }}
      {...props}
    />
  );
}
