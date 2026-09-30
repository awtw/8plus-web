import React from "react";

/**
 * 8plus Sheet — a side drawer (cosmetic recreation of the Radix
 * dialog-based sheet). Compositional API mirrors the source:
 * Sheet / SheetTrigger / SheetContent / SheetHeader / SheetTitle /
 * SheetDescription / SheetClose.
 */

const SheetCtx = React.createContext(null);

export function Sheet({ children, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return <SheetCtx.Provider value={{ open, setOpen }}>{children}</SheetCtx.Provider>;
}

export function SheetTrigger({ children, asChild, ...props }) {
  const ctx = React.useContext(SheetCtx);
  const child = asChild && React.isValidElement(children) ? children : <button {...props}>{children}</button>;
  return React.cloneElement(child, { onClick: () => ctx.setOpen(true) });
}

export function SheetClose({ children, asChild, ...props }) {
  const ctx = React.useContext(SheetCtx);
  const child = asChild && React.isValidElement(children) ? children : <button {...props}>{children}</button>;
  return React.cloneElement(child, { onClick: () => ctx.setOpen(false) });
}

export function SheetContent({ side = "right", className = "", style = {}, children, ...props }) {
  const ctx = React.useContext(SheetCtx);
  const isRight = side === "right";
  const isLeft = side === "left";
  const hidden = isRight ? "translateX(100%)" : isLeft ? "translateX(-100%)" : side === "top" ? "translateY(-100%)" : "translateY(100%)";
  const edge =
    isRight ? { top: 0, right: 0, height: "100%", width: "min(85%, 22rem)", borderLeft: "1px solid var(--border)" }
    : isLeft ? { top: 0, left: 0, height: "100%", width: "min(85%, 22rem)", borderRight: "1px solid var(--border)" }
    : side === "top" ? { top: 0, left: 0, width: "100%", borderBottom: "1px solid var(--border)" }
    : { bottom: 0, left: 0, width: "100%", borderTop: "1px solid var(--border)" };

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: ctx.open ? "auto" : "none", zIndex: 50 }}>
      <div
        onClick={() => ctx.setOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,14,26,0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: ctx.open ? 1 : 0,
          transition: "opacity var(--motion-base) var(--ease-standard)",
        }}
      />
      <div
        className={className}
        style={{
          position: "absolute",
          background: "var(--bg)",
          backgroundImage: "linear-gradient(color-mix(in oklab, var(--surface), transparent 40%), color-mix(in oklab, var(--surface), transparent 40%))",
          boxShadow: "var(--shadow-hover)",
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          color: "var(--fg)",
          transform: ctx.open ? "translate(0,0)" : hidden,
          transition: "transform var(--motion-base) var(--ease-standard)",
          ...edge,
          ...style,
        }}
        {...props}
      >
        <button
          onClick={() => ctx.setOpen(false)}
          aria-label="Close"
          style={{
            position: "absolute", top: "0.9rem", right: "0.9rem", background: "none", border: "none",
            cursor: "pointer", color: "var(--muted)", fontSize: 18, lineHeight: 1, padding: 4,
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", ...style }} {...props}>
      {children}
    </div>
  );
}

export function SheetTitle({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ fontSize: "var(--text-lg)", fontFamily: "var(--font-body)", fontWeight: "var(--fw-semibold)", color: "var(--fg)", ...style }} {...props}>
      {children}
    </div>
  );
}

export function SheetDescription({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ fontSize: "var(--text-base)", color: "var(--muted)", ...style }} {...props}>
      {children}
    </div>
  );
}
