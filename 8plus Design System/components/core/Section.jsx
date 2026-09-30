import React from "react";

/**
 * 8plus Section — the alternating color-field wrapper that is the
 * heart of the v2 CI. Renders a full-bleed <section> in the given
 * field (blue / orange / dark), flips the accent to the complement,
 * carries the soft-light noise texture, and centers a max-width
 * shell with the standard vertical rhythm. Compose screens by
 * stacking Sections that alternate blue ↔ orange.
 */
export function Section({ field = "blue", noise = true, className = "", style = {}, innerStyle = {}, children, ...props }) {
  const map = { blue: "bg-blue", orange: "bg-orange", dark: "bg-dark" };
  return (
    <section
      className={`${map[field] || "bg-blue"} ${noise ? "noise-field" : ""} ${className}`}
      style={{ position: "relative", width: "100%", ...style }}
      {...props}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "var(--container-max)",
          marginInline: "auto",
          paddingInline: "clamp(24px, 4vw, 28px)",
          paddingBlock: "clamp(48px, 7vw, 80px)",
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </section>
  );
}
