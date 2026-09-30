import React from "react";

/**
 * 8plus DropdownMenu — cosmetic recreation of the Radix dropdown.
 * Used for the language switcher and theme menus. Compositional:
 * DropdownMenu / DropdownMenuTrigger / DropdownMenuContent /
 * DropdownMenuItem / DropdownMenuLabel / DropdownMenuSeparator.
 */

const MenuCtx = React.createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return (
    <MenuCtx.Provider value={{ open, setOpen }}>
      <div ref={ref} style={{ position: "relative", display: "inline-block" }}>{children}</div>
    </MenuCtx.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild, ...props }) {
  const ctx = React.useContext(MenuCtx);
  const child = asChild && React.isValidElement(children) ? children : <button {...props}>{children}</button>;
  return React.cloneElement(child, { onClick: (e) => { e.stopPropagation(); ctx.setOpen((o) => !o); } });
}

export function DropdownMenuContent({ align = "start", className = "", style = {}, children, ...props }) {
  const ctx = React.useContext(MenuCtx);
  if (!ctx.open) return null;
  const alignStyle = align === "end" ? { right: 0 } : align === "center" ? { left: "50%", transform: "translateX(-50%)" } : { left: 0 };
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: "calc(100% + 6px)",
        minWidth: "10rem",
        background: "var(--color-dark)",
        backgroundImage: "linear-gradient(color-mix(in oklab, var(--surface), transparent 30%), color-mix(in oklab, var(--surface), transparent 30%))",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-hover)",
        padding: "0.35rem",
        zIndex: 50,
        ...alignStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className = "", style = {}, children, onClick, ...props }) {
  const ctx = React.useContext(MenuCtx);
  const [hover, setHover] = React.useState(false);
  return (
    <div
      role="menuitem"
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => { onClick && onClick(e); ctx.setOpen(false); }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.45rem 0.6rem",
        fontSize: "var(--text-sm)",
        color: "var(--fg-2)",
        cursor: "pointer",
        background: hover ? "var(--hover-bg)" : "transparent",
        transition: "background var(--motion-fast) var(--ease-standard)",
        borderRadius: "var(--radius-sm)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ className = "", style = {}, children, ...props }) {
  return (
    <div className={className} style={{ padding: "0.35rem 0.6rem", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-mono)", textTransform: "uppercase", color: "var(--meta)", ...style }} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className = "", style = {}, ...props }) {
  return <div className={className} style={{ height: 1, margin: "0.3rem -0.35rem", background: "var(--border-soft)", ...style }} {...props} />;
}
