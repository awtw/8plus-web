/* @ds-bundle: {"format":4,"namespace":"Ds8plusDesignSystem_1b9e83","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Section","sourcePath":"components/core/Section.jsx"},{"name":"Separator","sourcePath":"components/core/Separator.jsx"},{"name":"DropdownMenu","sourcePath":"components/overlay/DropdownMenu.jsx"},{"name":"DropdownMenuTrigger","sourcePath":"components/overlay/DropdownMenu.jsx"},{"name":"DropdownMenuContent","sourcePath":"components/overlay/DropdownMenu.jsx"},{"name":"DropdownMenuItem","sourcePath":"components/overlay/DropdownMenu.jsx"},{"name":"DropdownMenuLabel","sourcePath":"components/overlay/DropdownMenu.jsx"},{"name":"DropdownMenuSeparator","sourcePath":"components/overlay/DropdownMenu.jsx"},{"name":"Sheet","sourcePath":"components/overlay/Sheet.jsx"},{"name":"SheetTrigger","sourcePath":"components/overlay/Sheet.jsx"},{"name":"SheetClose","sourcePath":"components/overlay/Sheet.jsx"},{"name":"SheetContent","sourcePath":"components/overlay/Sheet.jsx"},{"name":"SheetHeader","sourcePath":"components/overlay/Sheet.jsx"},{"name":"SheetTitle","sourcePath":"components/overlay/Sheet.jsx"},{"name":"SheetDescription","sourcePath":"components/overlay/Sheet.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"8c849cc1987b","components/core/Badge.jsx":"9a5170cb3271","components/core/Button.jsx":"c52f4dcd2fd3","components/core/Card.jsx":"dfc86eda2e0f","components/core/Section.jsx":"0444d0599342","components/core/Separator.jsx":"02eb8253347a","components/overlay/DropdownMenu.jsx":"529a1604274c","components/overlay/Sheet.jsx":"fb194d8557e8","explorations/homepage-gallery/image-slot.js":"75a3469a73c0","explorations/homepage-gallery/scenes-1-fluid.js":"35370cfbe5b1","explorations/homepage-gallery/scenes-2-signal.js":"f411a605a528","explorations/homepage-gallery/scenes-3-field.js":"977c583f62c8","explorations/homepage-gallery/scenes-4-library.js":"445a90a56a39","explorations/homepage-gallery/scenes-5-handshake.js":"802c6fd2a0b9","explorations/homepage-gallery/scenes-6-mark.js":"801161603be4","explorations/homepage-gallery/scenes-7-lines.js":"ab0378fd3a82","explorations/homepage-gallery/scenes-8-tunnel.js":"e19e1297cc52","explorations/image-slot.js":"75a3469a73c0","ui_kits/8plus-app-v2/ChromeV2.jsx":"421b12f907ca","ui_kits/8plus-app-v2/HeroBackdrops2V2.jsx":"60870075b92f","ui_kits/8plus-app-v2/HeroBackdropsV2.jsx":"c151c560bcf9","ui_kits/8plus-app-v2/ScreensV2.jsx":"f5e574bb2120","ui_kits/8plus-app/Chrome.jsx":"b599d2ca5e22","ui_kits/8plus-app/HeroBackdrops.jsx":"c151c560bcf9","ui_kits/8plus-app/HeroBackdrops2.jsx":"60870075b92f","ui_kits/8plus-app/Screens.jsx":"84df4b388e23"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Ds8plusDesignSystem_1b9e83 = window.Ds8plusDesignSystem_1b9e83 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Logo({
  size = 32,
  variant = "default",
  wordmark = false,
  animated = false,
  className = "",
  style = {},
  ...props
}) {
  const config = {
    default: {
      bg: "transparent",
      mark: "var(--logo-mark)"
    },
    mono: {
      bg: "transparent",
      mark: "var(--logo-mark)"
    },
    light: {
      bg: "transparent",
      mark: "#ffffff"
    },
    brand: {
      bg: "var(--color-blue)",
      mark: "#ffffff"
    },
    favicon: {
      bg: "var(--bg)",
      mark: "var(--logo-mark)"
    }
  }[variant];
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anim = animated && !reduce;
  const breathe = delay => anim ? {
    transformBox: "fill-box",
    transformOrigin: "center",
    animation: `logoBreathe 3.2s ease-in-out ${delay} infinite`
  } : undefined;
  const mark = /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    fill: "none",
    width: size,
    height: size,
    role: "img",
    "aria-label": "8plus",
    style: {
      flexShrink: 0,
      display: "block",
      overflow: "visible"
    }
  }, config.bg !== "transparent" ? /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "18",
    fill: config.bg
  }) : null, /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "29",
    r: "18",
    fill: config.mark,
    style: breathe("0s")
  }), /*#__PURE__*/React.createElement("path", {
    d: "M53 9H68L36 91H21L53 9Z",
    fill: config.mark,
    style: anim ? {
      animation: "logoSlashSheen 3.2s ease-in-out infinite"
    } : undefined
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "64",
    r: "28",
    fill: anim ? "var(--color-orange)" : config.mark,
    stroke: anim ? "rgba(255,255,255,.55)" : "none",
    strokeWidth: anim ? 2 : 0,
    style: anim ? {
      ...breathe(".5s"),
      filter: "drop-shadow(0 0 7px rgba(254,80,0,.65))"
    } : undefined
  }));
  if (!wordmark) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: className,
      style: {
        display: "inline-flex",
        ...style
      }
    }, props), mark);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      ...style
    }
  }, props), mark, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-semibold)",
      fontSize: `${size * 0.6}px`,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      lineHeight: 1
    }
  }, "8plus"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 8plus Badge — v2 CI. Three roles pulled from globals.css:
 *   eyebrow  → uppercase mono capsule (section labels like "03 · SERVICES")
 *   chip     → metric / meta pill (--metric-chip)
 *   accent   → filled accent pill for a single emphasis
 * All are pill-shaped and read the current field's tokens.
 */
function Badge({
  variant = "eyebrow",
  className = "",
  style = {},
  children,
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    borderRadius: "var(--radius-pill)",
    lineHeight: 1,
    whiteSpace: "nowrap"
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
      padding: "0.375rem 0.75rem"
    },
    chip: {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      color: "var(--fg-2)",
      border: "1px solid var(--border-soft)",
      background: "color-mix(in oklab, var(--surface), var(--bg) 18%)",
      padding: "0.35rem 0.75rem"
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
      fontWeight: "var(--fw-medium)"
    },
    status: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--fg-2)",
      border: "1px solid var(--border-soft)",
      background: "color-mix(in oklab, var(--surface), var(--bg) 22%)",
      padding: "0.375rem 0.75rem"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, props), variant === "status" && /*#__PURE__*/React.createElement("span", {
    className: "glow-dot",
    style: {
      width: 6,
      height: 6,
      borderRadius: "9999px",
      background: "var(--success)",
      display: "inline-block"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  userSelect: "none"
};
const sizes = {
  sm: {
    height: "var(--control-sm)",
    padding: "0 1.1rem",
    fontSize: "var(--text-sm)"
  },
  default: {
    height: "var(--control-md)",
    padding: "0 1.5rem",
    fontSize: "var(--text-base)"
  },
  lg: {
    height: "var(--control-lg)",
    padding: "0 2rem",
    fontSize: "var(--text-lg)"
  },
  icon: {
    height: "var(--control-md)",
    width: "var(--control-md)",
    padding: 0
  }
};
function Button({
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
      borderColor: "transparent"
    },
    secondary: {
      background: hover ? "var(--hover-bg)" : "transparent",
      color: "var(--fg)",
      borderColor: hover ? "var(--hover-border)" : "var(--border)"
    },
    ghost: {
      background: hover ? "var(--hover-bg)" : "transparent",
      color: "var(--fg)",
      borderColor: hover ? "var(--hover-border)" : "var(--border-soft)"
    },
    link: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "transparent",
      height: "auto",
      padding: 0,
      textDecoration: hover ? "underline" : "none",
      textUnderlineOffset: "4px"
    }
  };
  const composed = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(active && !disabled ? {
      transform: "translateY(1px)"
    } : variant !== "link" && hover && !disabled ? {
      transform: "translateY(-2px)"
    } : null),
    ...(disabled ? {
      opacity: 0.45,
      cursor: "not-allowed",
      transform: "none"
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    className: className,
    style: composed,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 8plus Card — v2 CI glass container. Sits over a colored section
 * field: translucent white surface, hairline border, 22px signature
 * radius. `variant="highlight"` adds a hover lift + gradient hairline
 * (use gradient-border via className too). Compose with the parts.
 */

function Card({
  variant = "default",
  className = "",
  style = {},
  children,
  ...props
}) {
  const base = {
    borderRadius: "var(--radius-md)",
    color: "var(--fg)",
    overflow: "hidden",
    background: "color-mix(in oklab, var(--bg), white 1%)",
    border: "1px solid var(--border-soft)",
    boxShadow: "var(--elev-ring)"
  };
  const strong = {
    background: "color-mix(in oklab, var(--surface), white 3%)",
    border: "1px solid var(--border)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: (variant === "highlight" ? "gradient-border-card " : "") + className,
    style: {
      ...base,
      ...(variant === "strong" ? strong : null),
      ...style
    }
  }, props), children);
}
function CardHeader({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "var(--space-6)",
      ...style
    }
  }, props), children);
}
function CardTitle({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--text-xl)",
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      color: "var(--fg)",
      ...style
    }
  }, props), children);
}
function CardDescription({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontSize: "var(--text-base)",
      color: "var(--muted)",
      lineHeight: 1.6,
      ...style
    }
  }, props), children);
}
function CardContent({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      padding: "0 var(--space-6) var(--space-6)",
      ...style
    }
  }, props), children);
}
function CardFooter({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "0 var(--space-6) var(--space-6)",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Section.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 8plus Section — the alternating color-field wrapper that is the
 * heart of the v2 CI. Renders a full-bleed <section> in the given
 * field (blue / orange / dark), flips the accent to the complement,
 * carries the soft-light noise texture, and centers a max-width
 * shell with the standard vertical rhythm. Compose screens by
 * stacking Sections that alternate blue ↔ orange.
 */
function Section({
  field = "blue",
  noise = true,
  className = "",
  style = {},
  innerStyle = {},
  children,
  ...props
}) {
  const map = {
    blue: "bg-blue",
    orange: "bg-orange",
    dark: "bg-dark"
  };
  return /*#__PURE__*/React.createElement("section", _extends({
    className: `${map[field] || "bg-blue"} ${noise ? "noise-field" : ""} ${className}`,
    style: {
      position: "relative",
      width: "100%",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--container-max)",
      marginInline: "auto",
      paddingInline: "clamp(24px, 4vw, 28px)",
      paddingBlock: "clamp(48px, 7vw, 80px)",
      ...innerStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Section });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Section.jsx", error: String((e && e.message) || e) }); }

// components/core/Separator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 8plus Separator — a 1px hairline in the soft border color.
 */
function Separator({
  orientation = "horizontal",
  className = "",
  style = {},
  ...props
}) {
  const isH = orientation === "horizontal";
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    "aria-orientation": orientation,
    className: className,
    style: {
      flexShrink: 0,
      background: "var(--border-soft)",
      width: isH ? "100%" : "1px",
      height: isH ? "1px" : "100%",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Separator.jsx", error: String((e && e.message) || e) }); }

// components/overlay/DropdownMenu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 8plus DropdownMenu — cosmetic recreation of the Radix dropdown.
 * Used for the language switcher and theme menus. Compositional:
 * DropdownMenu / DropdownMenuTrigger / DropdownMenuContent /
 * DropdownMenuItem / DropdownMenuLabel / DropdownMenuSeparator.
 */

const MenuCtx = React.createContext(null);
function DropdownMenu({
  children
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return /*#__PURE__*/React.createElement(MenuCtx.Provider, {
    value: {
      open,
      setOpen
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block"
    }
  }, children));
}
function DropdownMenuTrigger({
  children,
  asChild,
  ...props
}) {
  const ctx = React.useContext(MenuCtx);
  const child = asChild && React.isValidElement(children) ? children : /*#__PURE__*/React.createElement("button", props, children);
  return React.cloneElement(child, {
    onClick: e => {
      e.stopPropagation();
      ctx.setOpen(o => !o);
    }
  });
}
function DropdownMenuContent({
  align = "start",
  className = "",
  style = {},
  children,
  ...props
}) {
  const ctx = React.useContext(MenuCtx);
  if (!ctx.open) return null;
  const alignStyle = align === "end" ? {
    right: 0
  } : align === "center" ? {
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    left: 0
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
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
      ...style
    }
  }, props), children);
}
function DropdownMenuItem({
  className = "",
  style = {},
  children,
  onClick,
  ...props
}) {
  const ctx = React.useContext(MenuCtx);
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "menuitem",
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: e => {
      onClick && onClick(e);
      ctx.setOpen(false);
    },
    style: {
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
      ...style
    }
  }, props), children);
}
function DropdownMenuLabel({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      padding: "0.35rem 0.6rem",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      color: "var(--meta)",
      ...style
    }
  }, props), children);
}
function DropdownMenuSeparator({
  className = "",
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      height: 1,
      margin: "0.3rem -0.35rem",
      background: "var(--border-soft)",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/DropdownMenu.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Sheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 8plus Sheet — a side drawer (cosmetic recreation of the Radix
 * dialog-based sheet). Compositional API mirrors the source:
 * Sheet / SheetTrigger / SheetContent / SheetHeader / SheetTitle /
 * SheetDescription / SheetClose.
 */

const SheetCtx = React.createContext(null);
function Sheet({
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement(SheetCtx.Provider, {
    value: {
      open,
      setOpen
    }
  }, children);
}
function SheetTrigger({
  children,
  asChild,
  ...props
}) {
  const ctx = React.useContext(SheetCtx);
  const child = asChild && React.isValidElement(children) ? children : /*#__PURE__*/React.createElement("button", props, children);
  return React.cloneElement(child, {
    onClick: () => ctx.setOpen(true)
  });
}
function SheetClose({
  children,
  asChild,
  ...props
}) {
  const ctx = React.useContext(SheetCtx);
  const child = asChild && React.isValidElement(children) ? children : /*#__PURE__*/React.createElement("button", props, children);
  return React.cloneElement(child, {
    onClick: () => ctx.setOpen(false)
  });
}
function SheetContent({
  side = "right",
  className = "",
  style = {},
  children,
  ...props
}) {
  const ctx = React.useContext(SheetCtx);
  const isRight = side === "right";
  const isLeft = side === "left";
  const hidden = isRight ? "translateX(100%)" : isLeft ? "translateX(-100%)" : side === "top" ? "translateY(-100%)" : "translateY(100%)";
  const edge = isRight ? {
    top: 0,
    right: 0,
    height: "100%",
    width: "min(85%, 22rem)",
    borderLeft: "1px solid var(--border)"
  } : isLeft ? {
    top: 0,
    left: 0,
    height: "100%",
    width: "min(85%, 22rem)",
    borderRight: "1px solid var(--border)"
  } : side === "top" ? {
    top: 0,
    left: 0,
    width: "100%",
    borderBottom: "1px solid var(--border)"
  } : {
    bottom: 0,
    left: 0,
    width: "100%",
    borderTop: "1px solid var(--border)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: ctx.open ? "auto" : "none",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setOpen(false),
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(10,14,26,0.6)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      opacity: ctx.open ? 1 : 0,
      transition: "opacity var(--motion-base) var(--ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
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
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setOpen(false),
    "aria-label": "Close",
    style: {
      position: "absolute",
      top: "0.9rem",
      right: "0.9rem",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--muted)",
      fontSize: 18,
      lineHeight: 1,
      padding: 4
    }
  }, "\u2715"), children));
}
function SheetHeader({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      ...style
    }
  }, props), children);
}
function SheetTitle({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontSize: "var(--text-lg)",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--fg)",
      ...style
    }
  }, props), children);
}
function SheetDescription({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontSize: "var(--text-base)",
      color: "var(--muted)",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Sheet.jsx", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/image-slot.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-1-fluid.js
try { (() => {
/* Group 1 — 流體與形態 (1a / 1b / 1c) */
(function () {
  if (!document.getElementById('gallery-svg-defs')) {
    var div = document.createElement('div');
    div.id = 'gallery-svg-defs';
    div.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    div.innerHTML = '<svg width="0" height="0"><defs>' + '<filter id="goofilter-1a"><feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur"/>' + '<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" result="goo"/>' + '<feBlend in="SourceGraphic" in2="goo"/></filter>' + '</defs></svg>';
    document.body.appendChild(div);
  }
  if (!document.getElementById('gallery-style-g1')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g1';
    st.textContent = ['.scn-1a{background:radial-gradient(120% 120% at 50% 40%,#0d1226,#05070f)}', '.scn-1a .goo{position:absolute;inset:0;filter:url(#goofilter-1a);z-index:1}', '.scn-1a .blob{position:absolute;border-radius:50%;will-change:transform}', '.scn-1b{background:linear-gradient(120deg,#04061a 0%,#0a1030 55%,#1a0a04 100%)}', '.scn-1b .grid{position:absolute;inset:0;z-index:0;opacity:.5;', 'background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);', 'background-size:72px 72px;mask-image:radial-gradient(circle at 68% 50%,#000,transparent 72%)}', '.scn-1b .scene3d{position:absolute;right:10%;top:50%;transform:translateY(-50%);', 'width:clamp(190px,36vmin,420px);height:clamp(190px,36vmin,420px);perspective:1200px;z-index:1}', '.scn-1b .token{position:absolute;inset:0;transform-style:preserve-3d;animation:spin1b 16s linear infinite;will-change:transform}', '.scn-1b .face{position:absolute;top:50%;left:50%;width:62%;height:62%;margin:-31% 0 0 -31%;display:flex;align-items:center;justify-content:center;', 'border-radius:18%;backface-visibility:hidden;font-family:var(--sans);font-weight:900;color:#fff;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}', '.scn-1b .f-front{background:linear-gradient(145deg,var(--blue),#0038c9);transform:translateZ(31%)}', '.scn-1b .f-back{background:linear-gradient(145deg,var(--orange),#ff7a3c);transform:rotateY(180deg) translateZ(31%)}', '.scn-1b .f-right{background:linear-gradient(145deg,var(--orange),#c93d00);transform:rotateY(90deg) translateZ(31%)}', '.scn-1b .f-left{background:linear-gradient(145deg,var(--blue),#001e6e);transform:rotateY(-90deg) translateZ(31%)}', '.scn-1b .f-top{background:#0f1738;transform:rotateX(90deg) translateZ(31%)}', '.scn-1b .f-bottom{background:#0f1738;transform:rotateX(-90deg) translateZ(31%)}', '.scn-1b .glyph{font-size:2.6em;line-height:1;letter-spacing:-.04em}', '.scn-1b .glyph sup{font-size:.42em;vertical-align:super}', '@keyframes spin1b{from{transform:rotateX(-14deg) rotateY(0)}to{transform:rotateX(-14deg) rotateY(360deg)}}', '@media(max-width:700px){.scn-1b .scene3d{right:50%;top:32%;transform:translate(50%,-50%);width:clamp(150px,50vmin,260px);height:clamp(150px,50vmin,260px)}}', '.scn-1c{background:#05070f}', '.scn-1c .aurora{position:absolute;inset:-20%;z-index:0;filter:blur(60px);opacity:.75}', '.scn-1c .a1{position:absolute;width:56vw;height:56vw;border-radius:50%;background:radial-gradient(circle,var(--blue),transparent 62%);', 'left:-8vw;top:-6vw;animation:float1c 18s ease-in-out infinite}', '.scn-1c .a2{position:absolute;width:50vw;height:50vw;border-radius:50%;background:radial-gradient(circle,var(--orange),transparent 62%);', 'right:-6vw;bottom:-10vw;animation:float2c 22s ease-in-out infinite}', '@keyframes float1c{0%,100%{transform:translate(0,0)}50%{transform:translate(8vw,6vh)}}', '@keyframes float2c{0%,100%{transform:translate(0,0)}50%{transform:translate(-7vw,-5vh)}}'].join('\n');
    document.head.appendChild(st);
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '1a',
    group: 'g1',
    label: '流體對撞',
    align: 'left',
    thumb: 'radial-gradient(circle at 35% 35%,#2f66ff,#0d1226 60%)',
    mount: function (root, ctx) {
      root.innerHTML = '<div class="goo"></div>';
      var goo = root.querySelector('.goo');
      var palette = ['#002FA7', '#002FA7', '#FE5000', '#FE5000', '#0038c9', '#ff7a3c'];
      var n = ctx.isMobile ? 4 : 6;
      var blobs = [];
      for (var i = 0; i < n; i++) {
        var d = document.createElement('div');
        d.className = 'blob';
        var size = (ctx.isMobile ? 150 : 220) + Math.random() * (ctx.isMobile ? 150 : 260);
        d.style.width = d.style.height = size + 'px';
        var col = palette[i % palette.length];
        d.style.background = 'radial-gradient(circle at 40% 40%, ' + col + ', ' + col + ' 55%, transparent 72%)';
        goo.appendChild(d);
        blobs.push({
          el: d,
          size: size,
          x: Math.random(),
          y: Math.random(),
          ax: 0.00006 + Math.random() * 0.00012,
          ay: 0.00006 + Math.random() * 0.00012,
          px: Math.random() * Math.PI * 2,
          py: Math.random() * Math.PI * 2,
          rx: 0.18 + Math.random() * 0.24,
          ry: 0.18 + Math.random() * 0.24
        });
      }
      var tmx = 0.5,
        tmy = 0.5,
        mx = 0.5,
        my = 0.5;
      function onMove(e) {
        tmx = e.clientX / innerWidth;
        tmy = e.clientY / innerHeight;
      }
      addEventListener('mousemove', onMove);
      var raf;
      function frame(t) {
        mx += (tmx - mx) * 0.05;
        my += (tmy - my) * 0.05;
        var r = root.getBoundingClientRect(),
          W = r.width,
          H = r.height;
        blobs.forEach(function (b, i) {
          var cx = (0.5 + Math.cos(t * b.ax + b.px) * b.rx + (mx - 0.5) * 0.06 * (i % 2 ? 1 : -1)) * W - b.size / 2;
          var cy = (0.5 + Math.sin(t * b.ay + b.py) * b.ry + (my - 0.5) * 0.06 * (i % 2 ? -1 : 1)) * H - b.size / 2;
          b.el.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
        });
        raf = requestAnimationFrame(frame);
      }
      if (!ctx.reduce) raf = requestAnimationFrame(frame);else blobs.forEach(function (b, i) {
        b.el.style.transform = 'translate(' + (0.3 + i * 0.12) * root.clientWidth + 'px,' + (0.3 + i % 3 * 0.2) * root.clientHeight + 'px)';
      });
      return function () {
        cancelAnimationFrame(raf);
        removeEventListener('mousemove', onMove);
      };
    }
  }, {
    id: '1b',
    group: 'g1',
    label: '3D 字標',
    align: 'left',
    thumb: 'linear-gradient(135deg,#0038c9,#FE5000)',
    mount: function (root) {
      root.innerHTML = '<div class="grid"></div>' + '<div class="scene3d"><div class="token">' + '<div class="face f-front"><span class="glyph">8<sup>+</sup></span></div>' + '<div class="face f-back"><span class="glyph">8<sup>+</sup></span></div>' + '<div class="face f-right"></div><div class="face f-left"></div>' + '<div class="face f-top"></div><div class="face f-bottom"></div>' + '</div></div>';
      return null;
    }
  }, {
    id: '1c',
    group: 'g1',
    label: '液態折射',
    align: 'left',
    thumb: 'radial-gradient(circle at 30% 30%,#002FA7,#05070f 55%)',
    mount: function (root) {
      root.innerHTML = '<div class="aurora"><div class="a1"></div><div class="a2"></div></div>';
      return null;
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-1-fluid.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-2-signal.js
try { (() => {
/* Group 2 — 資料與訊號 (2a / 2b / 2c / 2d) */
(function () {
  if (!document.getElementById('gallery-style-g2')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g2';
    st.textContent = ['.scn-2a{background:radial-gradient(120% 120% at 30% 20%,#0038c9,#001a63 70%)}', '.scn-2a canvas{position:absolute;inset:0;display:block}', '.scn-2b{background:radial-gradient(130% 120% at 20% 20%,#0038c9,#001a63 70%)}', '.scn-2b .fgrid{position:absolute;inset:0;z-index:0;opacity:.4;', 'background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);', 'background-size:60px 60px;mask-image:linear-gradient(160deg,#000,transparent 85%)}', '.scn-2c{background:radial-gradient(120% 120% at 70% 30%,#0038c9,#001542 72%)}', '.scn-2c .meshwrap{position:absolute;right:6%;top:50%;transform:translateY(-50%);width:min(52vw,560px);height:min(72vh,560px)}', '.scn-2c .meshwrap svg{width:100%;height:100%;overflow:visible}', '.scn-2c .edge{stroke:rgba(255,255,255,.5);stroke-width:1.5;fill:none;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw2c 1.5s ease forwards}', '.scn-2c .edge.o{stroke:var(--orange)}', '.scn-2c .node{opacity:0;transform-box:fill-box;transform-origin:center;animation:pop2c .5s ease forwards}', '.scn-2c .node.pulse{animation:pop2c .5s ease forwards,pulse2c 3s ease-in-out infinite 1.6s}', '.scn-2c .nlabel{font-family:var(--mono);font-size:11px;fill:rgba(255,255,255,.7);opacity:0;animation:fadein2c .6s ease forwards}', '@keyframes draw2c{to{stroke-dashoffset:0}}', '@keyframes pop2c{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}', '@keyframes fadein2c{to{opacity:1}}', '@keyframes pulse2c{0%,100%{filter:drop-shadow(0 0 0 rgba(254,80,0,0))}50%{filter:drop-shadow(0 0 10px rgba(254,80,0,.9))}}', '@media(max-width:700px){.scn-2c .meshwrap{right:50%;left:50%;top:36%;transform:translate(50%,-50%);width:min(84vw,420px);height:min(46vh,420px);opacity:.8}}', '.scn-2d{background:radial-gradient(120% 120% at 80% 10%,#0b3a30 0%,#031a3f 45%,#04061a 100%)}', '.scn-2d .scan{position:absolute;left:0;right:0;height:26vh;z-index:1;pointer-events:none;', 'background:linear-gradient(180deg,transparent,rgba(254,80,0,.14),transparent);animation:scan2d 5s linear infinite}', '@keyframes scan2d{0%{top:-26vh}100%{top:100vh}}'].join('\n');
    document.head.appendChild(st);
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '2a',
    group: 'g2',
    label: '神經粒子',
    align: 'left',
    thumb: 'radial-gradient(circle at 40% 40%,#2f66ff,#001a63 70%)',
    mount: function (root, ctx) {
      root.innerHTML = '<canvas></canvas>';
      var cv = root.querySelector('canvas');
      var dpr = Math.min(devicePixelRatio || 1, 2);
      var rect = root.getBoundingClientRect();
      var w = rect.width,
        h = rect.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = '100%';
      cv.style.height = '100%';
      var g = cv.getContext('2d');
      g.scale(dpr, dpr);
      var n = Math.min(ctx.isMobile ? 42 : 90, Math.floor(w * h / 16000));
      var pts = Array.from({
        length: n
      }, function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - .5) * .35,
          vy: (Math.random() - .5) * .35,
          o: Math.random() < .22
        };
      });
      var mouse = {
        x: -999,
        y: -999
      };
      function onMove(e) {
        var r = root.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      }
      addEventListener('mousemove', onMove);
      var raf;
      function draw() {
        g.clearRect(0, 0, w, h);
        for (var k = 0; k < pts.length; k++) {
          var p = pts[k];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          var dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dm < 130) {
            var f = (130 - dm) / 130 * 1.6;
            p.x += (p.x - mouse.x) / dm * f;
            p.y += (p.y - mouse.y) / dm * f;
          }
        }
        for (var i = 0; i < pts.length; i++) for (var j = i + 1; j < pts.length; j++) {
          var a = pts[i],
            b = pts[j],
            d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 128) {
            g.strokeStyle = 'rgba(255,255,255,' + (1 - d / 128) * .28 + ')';
            g.lineWidth = 1;
            g.beginPath();
            g.moveTo(a.x, a.y);
            g.lineTo(b.x, b.y);
            g.stroke();
          }
        }
        for (var k2 = 0; k2 < pts.length; k2++) {
          var p2 = pts[k2];
          g.beginPath();
          g.arc(p2.x, p2.y, p2.o ? 3 : 1.7, 0, 7);
          g.fillStyle = p2.o ? '#FE5000' : 'rgba(255,255,255,.85)';
          g.fill();
        }
        raf = requestAnimationFrame(draw);
      }
      if (!ctx.reduce) draw();else {
        draw();
        cancelAnimationFrame(raf);
      }
      return function () {
        cancelAnimationFrame(raf);
        removeEventListener('mousemove', onMove);
      };
    }
  }, {
    id: '2b',
    group: 'g2',
    label: '流光漸層字',
    align: 'left',
    thumb: 'linear-gradient(100deg,#0038c9,#FE5000,#ffd9c4)',
    mount: function (root, ctx, captionEl) {
      root.innerHTML = '<div class="fgrid"></div>';
      captionEl.classList.add('fx-2b');
      return function () {
        captionEl.classList.remove('fx-2b');
      };
    }
  }, {
    id: '2c',
    group: 'g2',
    label: '架構自繪',
    align: 'left',
    thumb: 'linear-gradient(135deg,#002FA7,#0038c9)',
    mount: function (root) {
      root.innerHTML = '<div class="meshwrap"></div>';
      var host = root.querySelector('.meshwrap');
      var nodes = [[80, 60, 'API'], [300, 40, 'AUTH'], [210, 170, 'CORE'], [60, 250, 'DB'], [330, 250, 'QUEUE'], [210, 330, 'DELIVER']];
      var edges = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [2, 5]];
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 400 380');
      edges.forEach(function (e, i) {
        var a = e[0],
          b = e[1],
          x1 = nodes[a][0],
          y1 = nodes[a][1],
          x2 = nodes[b][0],
          y2 = nodes[b][1];
        var len = Math.hypot(x2 - x1, y2 - y1);
        var l = document.createElementNS(ns, 'line');
        l.setAttribute('x1', x1);
        l.setAttribute('y1', y1);
        l.setAttribute('x2', x2);
        l.setAttribute('y2', y2);
        l.setAttribute('class', 'edge' + (i % 3 === 0 ? ' o' : ''));
        l.style.setProperty('--len', len);
        l.style.animationDelay = i * 0.12 + 's';
        svg.appendChild(l);
      });
      nodes.forEach(function (nd, i) {
        var c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', nd[0]);
        c.setAttribute('cy', nd[1]);
        c.setAttribute('r', i === 5 ? 10 : 7);
        c.setAttribute('fill', i === 5 ? '#FE5000' : '#fff');
        c.setAttribute('class', 'node' + (i === 5 ? ' pulse' : ''));
        c.style.animationDelay = 0.6 + i * 0.1 + 's';
        svg.appendChild(c);
        var t = document.createElementNS(ns, 'text');
        t.setAttribute('x', nd[0] + 14);
        t.setAttribute('y', nd[1] + 4);
        t.setAttribute('class', 'nlabel');
        t.style.animationDelay = 1 + i * 0.1 + 's';
        t.textContent = nd[2];
        svg.appendChild(t);
      });
      host.appendChild(svg);
      return null;
    }
  }, {
    id: '2d',
    group: 'g2',
    label: '解碼',
    align: 'left',
    thumb: 'radial-gradient(circle at 70% 20%,#0b3a30,#04061a 70%)',
    mount: function (root, ctx, captionEl) {
      root.innerHTML = '<div class="scan"></div>';
      captionEl.classList.add('fx-2d');
      var eyeSpan = captionEl.querySelector('.eye span:last-child');
      var h1 = captionEl.querySelector('h1');
      var original = eyeSpan.textContent;
      var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%*<>/\\';
      var target = 'ARCHITECTURE // DELIVERED';
      var frame = 0,
        timer;
      h1.style.opacity = '0';
      h1.style.clipPath = 'inset(0 100% 0 0)';
      requestAnimationFrame(function () {
        h1.style.transition = 'clip-path 1.1s cubic-bezier(.7,0,.2,1), opacity .3s ease';
        h1.style.opacity = '1';
        h1.style.clipPath = 'inset(0 0 0 0)';
      });
      if (ctx.reduce) {
        eyeSpan.textContent = target;
      } else {
        timer = setInterval(function () {
          var out = '';
          for (var i = 0; i < target.length; i++) {
            out += i < frame / 2 ? target[i] : target[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
          }
          eyeSpan.textContent = out;
          frame++;
          if (frame / 2 > target.length) {
            clearInterval(timer);
            eyeSpan.textContent = target;
          }
        }, 45);
      }
      return function () {
        clearInterval(timer);
        captionEl.classList.remove('fx-2d');
        eyeSpan.textContent = original;
        h1.style.opacity = '';
        h1.style.clipPath = '';
        h1.style.transition = '';
      };
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-2-signal.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-3-field.js
try { (() => {
/* Group 3 — 色場與空間 (3a / 3b / 3c / 3d) */
(function () {
  if (!document.getElementById('gallery-style-g3')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g3';
    st.textContent = ['.scn-3a{background:radial-gradient(120% 120% at 75% 45%,#0034b6,#00136b 72%)}', '.scn-3a .orbwrap{position:absolute;right:8%;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center}', '.scn-3a .orb{width:min(48vh,44vw,460px);aspect-ratio:1;border-radius:47% 53% 55% 45%/50% 48% 52% 50%;', 'background:conic-gradient(from 0deg,#002FA7,#2f66ff,#FE5000,#ff9a5c,#7bd0ff,#002FA7);', 'filter:blur(4px) saturate(1.25);animation:orbSpin 18s linear infinite, orbMorph 9s ease-in-out infinite;', 'box-shadow:0 40px 140px -20px rgba(254,80,0,.5), inset -30px -30px 90px rgba(0,20,90,.7), inset 30px 30px 80px rgba(255,255,255,.25)}', '.scn-3a .orb::after{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at 34% 30%,rgba(255,255,255,.75),transparent 34%)}', '.scn-3a .ring{position:absolute;width:min(58vh,52vw,580px);aspect-ratio:1;border-radius:50%;border:1px solid rgba(255,255,255,.18);animation:ringPulse 6s ease-in-out infinite}', '@keyframes orbSpin{to{transform:rotate(360deg)}}', '@keyframes orbMorph{0%,100%{border-radius:47% 53% 55% 45%/50% 48% 52% 50%}50%{border-radius:56% 44% 43% 57%/46% 55% 45% 54%}}', '@keyframes ringPulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.06);opacity:.15}}', '@media(max-width:700px){.scn-3a .orbwrap{right:50%;top:34%;transform:translate(50%,-50%)}}', '.scn-3b{background:var(--blue)}', '.scn-3b .bands{position:absolute;inset:0;z-index:0;display:flex;flex-direction:column;justify-content:center;gap:0;opacity:.9}', '.scn-3b .track{white-space:nowrap;font-family:var(--sans);font-weight:900;font-size:15vh;line-height:1.05;letter-spacing:-.02em;display:flex;will-change:transform}', '.scn-3b .track span{padding-right:.4em}', '.scn-3b .t1{color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.5);animation:mLeft3b 26s linear infinite}', '.scn-3b .t2{color:var(--orange);animation:mRight3b 30s linear infinite}', '.scn-3b .t3{color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.28);animation:mLeft3b 34s linear infinite}', '@keyframes mLeft3b{to{transform:translateX(-33.33%)}}', '@keyframes mRight3b{from{transform:translateX(-33.33%)}to{transform:translateX(0)}}', '@media(max-width:700px){.scn-3b .track{font-size:11vh}}', '.scn-3c{background:var(--blue);overflow:hidden}', '.scn-3c .half{position:absolute;inset:0;z-index:0}', '.scn-3c .h-orange{background:var(--orange);clip-path:polygon(100% 0,100% 100%,32% 100%,58% 0);animation:diag3c 12s ease-in-out infinite}', '.scn-3c .h-blue{background:linear-gradient(140deg,#0038c9,#001542);clip-path:polygon(0 0,55% 0,29% 100%,0 100%);animation:diag2_3c 12s ease-in-out infinite}', '.scn-3c .seam{position:absolute;top:-10%;left:0;width:140%;height:120%;z-index:1;pointer-events:none;', 'background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.9) 50%,transparent 58%);mix-blend-mode:overlay;transform:translateX(-6%);animation:seam3c 6s ease-in-out infinite}', '@keyframes diag3c{0%,100%{clip-path:polygon(100% 0,100% 100%,32% 100%,58% 0)}50%{clip-path:polygon(100% 0,100% 100%,28% 100%,54% 0)}}', '@keyframes diag2_3c{0%,100%{clip-path:polygon(0 0,55% 0,29% 100%,0 100%)}50%{clip-path:polygon(0 0,51% 0,25% 100%,0 100%)}}', '@keyframes seam3c{0%,100%{transform:translateX(-8%)}50%{transform:translateX(4%)}}', '.scn-3c .tags{position:absolute;right:44px;bottom:60px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:rgba(255,255,255,.85);text-align:right;line-height:2;z-index:2}', '@media(max-width:700px){.scn-3c .tags{display:none}}', '.scn-3d{background:radial-gradient(120% 120% at 50% 30%,#00135f,#04061a 80%)}', '.scn-3d .tunnel{position:absolute;inset:0;z-index:0;perspective:520px;perspective-origin:50% 42%;overflow:hidden}', '.scn-3d .floor{position:absolute;left:-50%;right:-50%;bottom:-20%;height:150%;transform:rotateX(76deg);transform-origin:bottom center;', 'background-image:linear-gradient(rgba(123,168,255,.55) 1px,transparent 1px),linear-gradient(90deg,rgba(123,168,255,.35) 1px,transparent 1px);', 'background-size:64px 64px;animation:flow3d 2.6s linear infinite;mask-image:linear-gradient(transparent,#000 40%)}', '.scn-3d .glow{position:absolute;left:0;right:0;top:36%;height:40%;z-index:0;', 'background:radial-gradient(60% 100% at 50% 100%,rgba(254,80,0,.5),transparent 70%);filter:blur(20px)}', '@keyframes flow3d{to{background-position:0 64px}}'].join('\n');
    document.head.appendChild(st);
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '3a',
    group: 'g3',
    label: '磁流體光球',
    align: 'left',
    thumb: 'conic-gradient(#002FA7,#2f66ff,#FE5000,#7bd0ff,#002FA7)',
    mount: function (root) {
      root.innerHTML = '<div class="orbwrap"><div class="ring"></div><div class="orb"></div></div>';
      return null;
    }
  }, {
    id: '3b',
    group: 'g3',
    label: '動態字幕帶',
    align: 'left',
    thumb: 'var(--blue)',
    mount: function (root) {
      root.innerHTML = '<div class="bands" aria-hidden="true">' + '<div class="track t1"><span>ARCHITECTURE — DELIVERY —&nbsp;</span><span>ARCHITECTURE — DELIVERY —&nbsp;</span><span>ARCHITECTURE — DELIVERY —&nbsp;</span></div>' + '<div class="track t2"><span>CONSULT · BUILD · SHIP&nbsp;</span><span>CONSULT · BUILD · SHIP&nbsp;</span><span>CONSULT · BUILD · SHIP&nbsp;</span></div>' + '<div class="track t3"><span>8PLUS — 8PLUS — 8PLUS —&nbsp;</span><span>8PLUS — 8PLUS — 8PLUS —&nbsp;</span><span>8PLUS — 8PLUS — 8PLUS —&nbsp;</span></div>' + '</div>';
      return null;
    }
  }, {
    id: '3c',
    group: 'g3',
    label: '對角對撞',
    align: 'left',
    thumb: 'linear-gradient(135deg,#0038c9,#FE5000)',
    mount: function (root) {
      root.innerHTML = '<div class="half h-blue"></div><div class="half h-orange"></div><div class="seam"></div>' + '<div class="tags">CONSULTING<br>ARCHITECTURE<br>FULL-STACK<br>FREELANCE</div>';
      return null;
    }
  }, {
    id: '3d',
    group: 'g3',
    label: '格線隧道',
    align: 'center',
    thumb: 'radial-gradient(circle at 50% 30%,#7bd0ff,#00135f 70%)',
    mount: function (root) {
      root.innerHTML = '<div class="tunnel"><div class="floor"></div></div><div class="glow"></div>';
      return null;
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-3-field.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-4-library.js
try { (() => {
/* Group 4 — 背景素材庫 (4a–4j, 10 種) */
(function () {
  if (!document.getElementById('gallery-style-g4')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g4';
    st.textContent = ['.scn-4a,.scn-4b,.scn-4c,.scn-4d,.scn-4e,.scn-4f,.scn-4g,.scn-4h,.scn-4i,.scn-4j{', 'background:radial-gradient(120% 120% at 50% 40%,#0a1240,#060a24 55%,#04061a 85%)}', '.scn-4a .plane{position:absolute;left:50%;top:52%;width:150vmin;height:150vmin;', 'transform:translate(-50%,-50%) rotateX(62deg) rotateZ(-42deg);', 'background-image:linear-gradient(rgba(123,168,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(123,168,255,.4) 1px,transparent 1px);', 'background-size:7% 7%;animation:isoflow4a 8s linear infinite;', '-webkit-mask-image:radial-gradient(circle,#000 30%,transparent 68%);mask-image:radial-gradient(circle,#000 30%,transparent 68%)}', '.scn-4a .node{position:absolute;width:14px;height:14px;border-radius:50%;background:var(--orange);', 'box-shadow:0 0 22px 4px rgba(254,80,0,.7);animation:isopulse4a 3s ease-in-out infinite}', '@keyframes isoflow4a{to{background-position:7% 7%}}', '@keyframes isopulse4a{0%,100%{transform:scale(.7);opacity:.6}50%{transform:scale(1.3);opacity:1}}', '.scn-4b .band{position:absolute;left:-30%;width:160%;height:44vh;filter:blur(46px);opacity:.65;border-radius:50%}', '.scn-4b .s1{top:6%;background:radial-gradient(60% 100% at 40% 50%,#2f66ff,transparent 70%);animation:silk1_4b 15s ease-in-out infinite}', '.scn-4b .s2{top:32%;background:radial-gradient(60% 100% at 60% 50%,#FE5000,transparent 70%);animation:silk2_4b 19s ease-in-out infinite}', '.scn-4b .s3{top:56%;background:radial-gradient(60% 100% at 45% 50%,#7bd0ff,transparent 70%);animation:silk1_4b 23s ease-in-out infinite}', '@keyframes silk1_4b{0%,100%{transform:translateX(-8%) skewY(-4deg)}50%{transform:translateX(10%) skewY(5deg)}}', '@keyframes silk2_4b{0%,100%{transform:translateX(8%) skewY(4deg)}50%{transform:translateX(-10%) skewY(-5deg)}}', '.scn-4c canvas,.scn-4d canvas,.scn-4e canvas,.scn-4h canvas{position:absolute;inset:0;display:block}', '.scn-4f{perspective:1200px}', '.scn-4f .space{position:absolute;inset:0;transform-style:preserve-3d;animation:cardrot4f 26s linear infinite}', '.scn-4f .card{position:absolute;left:50%;top:50%;width:clamp(140px,20vmin,190px);height:clamp(96px,14vmin,130px);', 'margin:calc(clamp(96px,14vmin,130px) / -2) 0 0 calc(clamp(140px,20vmin,190px) / -2);border-radius:16px;', 'background:linear-gradient(150deg,rgba(255,255,255,.12),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.2);', 'backdrop-filter:blur(4px);box-shadow:0 30px 70px -30px rgba(0,0,0,.7)}', '.scn-4f .card b{position:absolute;left:14px;top:12px;font-family:var(--mono);font-size:11px;color:var(--orange)}', '.scn-4f .card i{position:absolute;left:14px;bottom:14px;right:14px;height:1px;background:rgba(255,255,255,.25)}', '@keyframes cardrot4f{to{transform:rotateY(360deg)}}', '.scn-4g .ring{position:absolute;left:50%;top:50%;width:40px;height:40px;margin:-20px;border-radius:50%;border:1px solid var(--orange);opacity:0;animation:sonar4g 4s ease-out infinite}', '.scn-4g .dot{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px;border-radius:50%;background:var(--orange);box-shadow:0 0 30px 6px rgba(254,80,0,.7)}', '@keyframes sonar4g{0%{transform:scale(1);opacity:.9;border-color:#7bd0ff}100%{transform:scale(26);opacity:0;border-color:#FE5000}}', '.scn-4i .word{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-family:var(--sans);font-weight:900;', 'font-size:min(26vh,40vmin);letter-spacing:-.04em;color:rgba(255,255,255,.06)}', '.scn-4i .g{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-family:var(--sans);font-weight:900;', 'font-size:min(26vh,40vmin);letter-spacing:-.04em}', '.scn-4i .gb{color:#2f66ff;animation:gl1_4i 2.6s steps(2) infinite;clip-path:inset(0 0 62% 0)}', '.scn-4i .go{color:#FE5000;animation:gl2_4i 3.1s steps(2) infinite;clip-path:inset(60% 0 0 0)}', '@keyframes gl1_4i{0%,100%{transform:translate(-50%,-50%)}20%{transform:translate(-52%,-50%)}22%{transform:translate(-48%,-50%)}}', '@keyframes gl2_4i{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-47%,-50%)}52%{transform:translate(-53%,-50%)}}', '.scn-4j .big{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-family:var(--sans);font-weight:900;', 'font-size:min(34vh,48vmin);letter-spacing:-.05em;', 'background:conic-gradient(from 0deg,#002FA7,#2f66ff,#FE5000,#ff9a5c,#7bd0ff,#002FA7);background-size:200% 200%;', '-webkit-background-clip:text;background-clip:text;color:transparent;animation:ftflow4j 10s linear infinite;opacity:.9}', '.scn-4j .big sup{font-size:.42em;vertical-align:super}', '@keyframes ftflow4j{to{background-position:200% 200%}}'].join('\n');
    document.head.appendChild(st);
  }
  function sizeCanvas(cv, root) {
    var dpr = Math.min(devicePixelRatio || 1, 2);
    var r = root.getBoundingClientRect();
    cv.width = r.width * dpr;
    cv.height = r.height * dpr;
    cv.style.width = '100%';
    cv.style.height = '100%';
    var g = cv.getContext('2d');
    g.scale(dpr, dpr);
    return {
      ctx: g,
      w: r.width,
      h: r.height
    };
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '4a',
    group: 'g4',
    label: '等距網格',
    align: 'center',
    thumb: '#04061a',
    mount: function (root) {
      root.innerHTML = '<div class="plane"></div>';
      var n = 7;
      for (var i = 0; i < n; i++) {
        var sp = document.createElement('span');
        sp.className = 'node';
        sp.style.left = 18 + Math.random() * 64 + '%';
        sp.style.top = 24 + Math.random() * 52 + '%';
        sp.style.animationDelay = Math.random() * 3 + 's';
        root.appendChild(sp);
      }
      return null;
    }
  }, {
    id: '4b',
    group: 'g4',
    label: '極光絲綢',
    align: 'center',
    thumb: 'linear-gradient(120deg,#2f66ff,#FE5000)',
    mount: function (root) {
      root.innerHTML = '<div class="band s1"></div><div class="band s2"></div><div class="band s3"></div>';
      return null;
    }
  }, {
    id: '4c',
    group: 'g4',
    label: '程式碼雨',
    align: 'center',
    thumb: '#0a1a0a',
    mount: function (root, ctx) {
      root.innerHTML = '<canvas></canvas>';
      var cv = root.querySelector('canvas');
      var s = sizeCanvas(cv, root),
        g = s.ctx,
        w = s.w,
        h = s.h;
      var chars = 'アイウエオカ0123456789<>/\\[]{}=+*ABCDEF8plus'.split('');
      var fs = ctx.isMobile ? 13 : 16;
      var cols = Math.floor(w / fs);
      var ys = Array(cols).fill(0).map(function () {
        return Math.random() * h / fs;
      });
      var raf;
      function draw() {
        g.fillStyle = 'rgba(4,6,26,.08)';
        g.fillRect(0, 0, w, h);
        g.font = fs + 'px monospace';
        for (var i = 0; i < cols; i++) {
          var ch = chars[Math.floor(Math.random() * chars.length)];
          var x = i * fs,
            y = ys[i] * fs;
          g.fillStyle = Math.random() < .04 ? '#FE5000' : 'rgba(123,168,255,.85)';
          g.fillText(ch, x, y);
          if (y > h && Math.random() > .975) ys[i] = 0;
          ys[i] += 0.6;
        }
        raf = requestAnimationFrame(draw);
      }
      if (ctx.reduce) {
        g.fillStyle = '#04061a';
        g.fillRect(0, 0, w, h);
      } else draw();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  }, {
    id: '4d',
    group: 'g4',
    label: '流場線',
    align: 'center',
    thumb: '#0a1240',
    mount: function (root, ctx) {
      root.innerHTML = '<canvas></canvas>';
      var cv = root.querySelector('canvas');
      var s = sizeCanvas(cv, root),
        g = s.ctx,
        w = s.w,
        h = s.h;
      var count = Math.min(ctx.isMobile ? 220 : 500, w / 3 | 0);
      var ps = Array.from({
        length: count
      }, function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          c: Math.random() < .25 ? '254,80,0' : '123,168,255'
        };
      });
      var t = 0,
        raf;
      function draw() {
        t += 0.003;
        g.fillStyle = 'rgba(4,6,26,.06)';
        g.fillRect(0, 0, w, h);
        for (var k = 0; k < ps.length; k++) {
          var p = ps[k];
          var a = Math.sin(p.x * 0.004 + t) + Math.cos(p.y * 0.004 - t);
          var nx = p.x + Math.cos(a * 3) * 1.4,
            ny = p.y + Math.sin(a * 3) * 1.4;
          g.strokeStyle = 'rgba(' + p.c + ',.5)';
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(p.x, p.y);
          g.lineTo(nx, ny);
          g.stroke();
          p.x = nx;
          p.y = ny;
          if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
          }
        }
        raf = requestAnimationFrame(draw);
      }
      if (ctx.reduce) {
        g.fillStyle = '#04061a';
        g.fillRect(0, 0, w, h);
      } else draw();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  }, {
    id: '4e',
    group: 'g4',
    label: '粒子成形',
    align: 'center',
    thumb: '#04061a',
    mount: function (root, ctx) {
      root.innerHTML = '<canvas></canvas>';
      var cv = root.querySelector('canvas');
      var s = sizeCanvas(cv, root),
        g = s.ctx,
        w = s.w,
        h = s.h;
      var off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      var o = off.getContext('2d');
      o.fillStyle = '#fff';
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.font = '900 ' + Math.min(h * 0.6, w * 0.4) + 'px "Noto Sans TC",sans-serif';
      o.fillText('8+', w / 2, h * 0.46);
      var img = o.getImageData(0, 0, w, h).data;
      var step = ctx.isMobile ? 10 : 7;
      var targets = [];
      for (var y = 0; y < h; y += step) for (var x = 0; x < w; x += step) {
        if (img[(y * w + x) * 4 + 3] > 128) targets.push([x, y]);
      }
      var ps = targets.map(function (t2) {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          tx: t2[0],
          ty: t2[1],
          c: Math.random() < .22 ? '254,80,0' : '255,255,255'
        };
      });
      var raf;
      function draw() {
        g.fillStyle = 'rgba(4,6,26,.2)';
        g.fillRect(0, 0, w, h);
        for (var k = 0; k < ps.length; k++) {
          var p = ps[k];
          p.x += (p.tx - p.x) * 0.04;
          p.y += (p.ty - p.y) * 0.04;
          g.fillStyle = 'rgba(' + p.c + ',.9)';
          g.fillRect(p.x, p.y, 2, 2);
        }
        raf = requestAnimationFrame(draw);
      }
      if (ctx.reduce) {
        g.fillStyle = '#04061a';
        g.fillRect(0, 0, w, h);
        for (var k2 = 0; k2 < ps.length; k2++) {
          var p2 = ps[k2];
          g.fillStyle = 'rgba(' + p2.c + ',.9)';
          g.fillRect(p2.tx, p2.ty, 2, 2);
        }
      } else draw();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  }, {
    id: '4f',
    group: 'g4',
    label: '浮動作品卡',
    align: 'center',
    thumb: 'linear-gradient(150deg,#1a1f3a,#0a0e1a)',
    mount: function (root) {
      root.innerHTML = '<div class="space"></div>';
      var space = root.querySelector('.space');
      var projs = ['LAB//01', 'LAB//02', 'LAB//03', 'LAB//04', 'LAB//05', 'LAB//06'];
      projs.forEach(function (p, i) {
        var c = document.createElement('div');
        c.className = 'card';
        var ang = i / projs.length * 360;
        c.style.transform = 'rotateY(' + ang + 'deg) translateZ(300px)';
        c.innerHTML = '<b>' + p + '</b><i></i>';
        space.appendChild(c);
      });
      return null;
    }
  }, {
    id: '4g',
    group: 'g4',
    label: '聲納脈波',
    align: 'center',
    thumb: '#04061a',
    mount: function (root) {
      root.innerHTML = '<div class="dot"></div>';
      for (var i = 0; i < 4; i++) {
        var r = document.createElement('span');
        r.className = 'ring';
        r.style.animationDelay = i * 1 + 's';
        root.appendChild(r);
      }
      return null;
    }
  }, {
    id: '4h',
    group: 'g4',
    label: '霓虹點波',
    align: 'center',
    thumb: '#04061a',
    mount: function (root, ctx) {
      root.innerHTML = '<canvas></canvas>';
      var cv = root.querySelector('canvas');
      var s = sizeCanvas(cv, root),
        g = s.ctx,
        w = s.w,
        h = s.h;
      var gap = ctx.isMobile ? 26 : 34;
      var cols = Math.ceil(w / gap) + 1,
        rows = Math.ceil(h / gap) + 1;
      var cx = w / 2,
        cy = h * 0.46,
        t = 0,
        raf;
      function draw() {
        t += 0.05;
        g.clearRect(0, 0, w, h);
        for (var i = 0; i < cols; i++) for (var j = 0; j < rows; j++) {
          var x = i * gap,
            y = j * gap;
          var d = Math.hypot(x - cx, y - cy);
          var rad = 1.2 + Math.max(0, Math.sin(d * 0.02 - t)) * 3.4;
          var o = 0.15 + Math.max(0, Math.sin(d * 0.02 - t)) * 0.7;
          g.fillStyle = Math.sin(d * 0.02 - t) > 0.6 ? 'rgba(254,80,0,' + o + ')' : 'rgba(123,168,255,' + o + ')';
          g.beginPath();
          g.arc(x, y, rad, 0, 7);
          g.fill();
        }
        raf = requestAnimationFrame(draw);
      }
      if (ctx.reduce) {
        draw();
        cancelAnimationFrame(raf);
      } else draw();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  }, {
    id: '4i',
    group: 'g4',
    label: '切片故障字',
    align: 'center',
    thumb: '#04061a',
    mount: function (root) {
      root.innerHTML = '<div class="word">8+</div><div class="g gb">8+</div><div class="g go">8+</div>';
      return null;
    }
  }, {
    id: '4j',
    group: 'g4',
    label: '液態漸層字',
    align: 'center',
    thumb: 'conic-gradient(#002FA7,#2f66ff,#FE5000,#7bd0ff,#002FA7)',
    mount: function (root) {
      root.innerHTML = '<div class="big">8<sup>+</sup></div>';
      return null;
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-4-library.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-5-handshake.js
try { (() => {
/* Group 5 — 握手與焦點 (5a / 5b / 5c / 5d) */
(function () {
  if (!document.getElementById('gallery-style-g5')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g5';
    st.textContent = ['.scn-5a{background:var(--dark)}', '.scn-5a svg{position:absolute;inset:0;width:100%;height:100%}', '.scn-5a .flowline{fill:none;stroke-linecap:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw5a 2.4s ease forwards}', '@keyframes draw5a{to{stroke-dashoffset:0}}', '.scn-5a .spark{position:absolute;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle,#fff,#FE5000 55%,transparent 72%);', 'box-shadow:0 0 40px 12px rgba(254,80,0,.6);animation:sparkPulse5a 2.6s ease-in-out infinite;opacity:0;animation-delay:2.2s;animation-fill-mode:forwards}', '@keyframes sparkPulse5a{0%{opacity:0;transform:scale(.4)}30%{opacity:1}50%{transform:scale(1.15)}70%{transform:scale(1)}100%{opacity:1;transform:scale(1.08)}}', '.scn-5b{background:var(--dark)}', '.scn-5b .frame{position:absolute;inset:0;overflow:hidden}', '.scn-5b image-slot{filter:saturate(1.15) contrast(1.05);display:block;width:100%;height:100%}', '.scn-5b .duo{position:absolute;inset:0;pointer-events:none;mix-blend-mode:color;', 'background:linear-gradient(100deg,rgba(0,47,167,.55) 0%,rgba(0,47,167,.15) 42%,rgba(254,80,0,.15) 58%,rgba(254,80,0,.6) 100%)}', '.scn-5b .vign{position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 100% at 40% 45%,transparent 40%,rgba(4,6,26,.6) 100%)}', '.scn-5c{background:var(--dark);display:flex;align-items:center;justify-content:center}', '.scn-5c .rays{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(72vh,72vw,680px);aspect-ratio:1}', '.scn-5c .rays span{position:absolute;left:50%;top:50%;width:50%;height:1px;transform-origin:left center;background:linear-gradient(90deg,rgba(123,168,255,.55),transparent)}', '.scn-5c .glyph{position:relative;font-family:var(--sans);font-weight:900;font-size:min(46vh,40vw,420px);line-height:.8;letter-spacing:-.05em;color:#fff;', 'text-shadow:0 0 80px rgba(47,102,255,.5);animation:floaty5c 6s ease-in-out infinite}', '.scn-5c .glyph sup{font-size:.34em;vertical-align:super;color:var(--orange);text-shadow:0 0 50px rgba(254,80,0,.7)}', '.scn-5c .ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(254,80,0,.4);', 'width:min(54vh,50vw,560px);aspect-ratio:1;animation:spin5c 30s linear infinite}', '.scn-5c .ring::before{content:"";position:absolute;top:-5px;left:50%;width:9px;height:9px;border-radius:50%;background:var(--orange);box-shadow:0 0 20px 4px rgba(254,80,0,.8)}', '@keyframes floaty5c{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}', '@keyframes spin5c{to{transform:translate(-50%,-50%) rotate(360deg)}}', '.scn-5d canvas{position:absolute;inset:0;display:block}'].join('\n');
    document.head.appendChild(st);
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '5a',
    group: 'g5',
    label: '線流交會',
    align: 'right',
    thumb: 'linear-gradient(135deg,#04061a,#9fc0ff 40%,#FE5000)',
    mount: function (root) {
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 1000 800');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      root.appendChild(svg);
      var spark = document.createElement('div');
      spark.className = 'spark';
      root.appendChild(spark);
      var P = {
        x: 560,
        y: 360
      };
      function add(x1, y1, cx, cy, col, w, op, i) {
        var p = document.createElementNS(ns, 'path');
        p.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' Q ' + cx + ' ' + cy + ' ' + P.x + ' ' + P.y);
        p.setAttribute('class', 'flowline');
        p.setAttribute('stroke', col);
        p.setAttribute('stroke-width', w);
        p.setAttribute('opacity', op);
        var len = Math.hypot(cx - x1, cy - y1) + Math.hypot(P.x - cx, P.y - cy);
        p.style.setProperty('--len', len);
        p.style.animationDelay = i * 0.05 + 's';
        svg.appendChild(p);
      }
      for (var i = 0; i < 16; i++) {
        var y = 120 + i * 30;
        add(-40, y, 300, (y + P.y) / 2, i % 4 === 0 ? '#9fc0ff' : 'rgba(255,255,255,.85)', i % 4 === 0 ? 1.2 : 0.85, .55, i);
      }
      for (var j = 0; j < 14; j++) {
        var x = 520 + j * 36;
        add(x, 860, (x + P.x) / 2, 620, j % 3 === 0 ? '#ffb27a' : '#FE5000', j % 3 === 0 ? 1.4 : 1, .6, j);
      }
      function place() {
        var v = root.getBoundingClientRect();
        var s = Math.max(v.width / 1000, v.height / 800);
        var ox = (v.width - 1000 * s) / 2,
          oy = (v.height - 800 * s) / 2;
        spark.style.left = ox + P.x * s - 13 + 'px';
        spark.style.top = oy + P.y * s - 13 + 'px';
      }
      place();
      return null;
    }
  }, {
    id: '5b',
    group: 'g5',
    label: '握手實照（可換圖）',
    align: 'right',
    thumb: 'linear-gradient(100deg,#002FA7,#FE5000)',
    mount: function (root) {
      root.innerHTML = '<div class="frame">' + '<image-slot id="galleryHandshake" shape="rect" fit="cover" ' + 'src="../../uploads/CleanShot%202026-07-09%20at%2005.46.47%402x.png" ' + 'placeholder="拖入你的網格手×熱感手照片"></image-slot>' + '<div class="duo"></div><div class="vign"></div>' + '</div>';
      return null;
    }
  }, {
    id: '5c',
    group: 'g5',
    label: '8+ 巨型字標',
    align: 'right',
    thumb: 'radial-gradient(circle,#2f66ff,#04061a 70%)',
    mount: function (root) {
      root.innerHTML = '<div class="rays"></div><div class="ring"></div><div class="glyph">8<sup>+</sup></div>';
      var rays = root.querySelector('.rays');
      for (var i = 0; i < 40; i++) {
        var s = document.createElement('span');
        s.style.transform = 'rotate(' + i * 9 + 'deg)';
        s.style.opacity = 0.15 + Math.random() * 0.4;
        rays.appendChild(s);
      }
      return null;
    }
  }, {
    id: '5d',
    group: 'g5',
    label: '粒子指尖',
    align: 'right',
    thumb: '#04061a',
    mount: function (root, ctx) {
      root.innerHTML = '<canvas></canvas>';
      var cv = root.querySelector('canvas');
      var dpr = Math.min(devicePixelRatio || 1, 2);
      var r = root.getBoundingClientRect();
      var W = r.width,
        H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = '100%';
      cv.style.height = '100%';
      var g = cv.getContext('2d');
      g.scale(dpr, dpr);
      var P0 = {
        x: W * 0.5,
        y: H * 0.44
      };
      var count = Math.min(ctx.isMobile ? 170 : 360, W * H / 3000 | 0);
      var ps = Array.from({
        length: count
      }, function () {
        var side = Math.random() < .55;
        var ang = side ? Math.PI * (0.75 + Math.random() * 0.5) : Math.random() * 0.5 - 0.25;
        var rr = 120 + Math.random() * Math.max(W, H) * 0.5;
        return {
          tx: P0.x + Math.cos(ang) * rr,
          ty: P0.y + Math.sin(ang) * rr,
          x: Math.random() * W,
          y: Math.random() * H,
          c: side ? Math.random() < .25 ? '159,192,255' : '255,255,255' : '254,80,0'
        };
      });
      var t = 0,
        raf;
      function draw() {
        t += 0.01;
        g.fillStyle = 'rgba(4,6,26,.16)';
        g.fillRect(0, 0, W, H);
        for (var k = 0; k < ps.length; k++) {
          var p = ps[k];
          var dx = p.tx - p.x,
            dy = p.ty - p.y;
          p.x += dx * 0.04;
          p.y += dy * 0.04;
          p.x += Math.sin(t + p.ty) * 0.3;
          g.fillStyle = 'rgba(' + p.c + ',.85)';
          g.beginPath();
          g.arc(p.x, p.y, 1.5, 0, 7);
          g.fill();
          var dP = Math.hypot(p.x - P0.x, p.y - P0.y);
          if (dP < 90) {
            g.strokeStyle = 'rgba(' + p.c + ',' + (1 - dP / 90) * .4 + ')';
            g.lineWidth = .6;
            g.beginPath();
            g.moveTo(p.x, p.y);
            g.lineTo(P0.x, P0.y);
            g.stroke();
          }
        }
        var gr = g.createRadialGradient(P0.x, P0.y, 0, P0.x, P0.y, 60);
        gr.addColorStop(0, 'rgba(254,80,0,.5)');
        gr.addColorStop(1, 'rgba(254,80,0,0)');
        g.fillStyle = gr;
        g.fillRect(P0.x - 60, P0.y - 60, 120, 120);
        raf = requestAnimationFrame(draw);
      }
      if (!ctx.reduce) draw();else {
        g.fillStyle = '#04061a';
        g.fillRect(0, 0, W, H);
        for (var k2 = 0; k2 < ps.length; k2++) {
          var p2 = ps[k2];
          g.fillStyle = 'rgba(' + p2.c + ',.85)';
          g.beginPath();
          g.arc(p2.tx, p2.ty, 1.5, 0, 7);
          g.fill();
        }
      }
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-5-handshake.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-6-mark.js
try { (() => {
/* Group 6 — 標誌動態 (6a / 6b) */
(function () {
  if (!document.getElementById('gallery-style-g6')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g6';
    st.textContent = ['.scn-6a{background:radial-gradient(120% 120% at 62% 46%,#0a44d8,#002FA7 52%,#001a5c 92%)}', '.scn-6b{background:radial-gradient(120% 120% at 58% 46%,#0a44d8,#002FA7 52%,#001a5c 92%)}', '.scn-6a svg.field,.scn-6b svg.field{position:absolute;inset:0;width:100%;height:100%}', '.fl6{fill:none;stroke-linecap:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw6 2.2s ease forwards}', '@keyframes draw6{to{stroke-dashoffset:0}}', '.markwrap6{position:absolute;z-index:3;filter:drop-shadow(0 0 60px rgba(47,102,255,.5))}', '.markwrap6 svg{width:100%;height:100%;overflow:visible}', '.scn-6a .markwrap6{left:60%;top:48%;width:min(40vh,38vw,360px);aspect-ratio:1;transform:translate(-50%,-50%);animation:floatyA6 6s ease-in-out infinite}', '@keyframes floatyA6{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% - 12px))}}', '.scn-6b .markwrap6{left:56%;top:48%;width:min(50vh,48vw,460px);aspect-ratio:1;transform:translate(-50%,-50%);animation:floatyB6 7s ease-in-out infinite}', '@keyframes floatyB6{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% - 10px))}}', '.beat6{transform-box:fill-box;transform-origin:center;animation:beat6 3.2s ease-in-out infinite}', '.beat6.d{animation-delay:.5s}', '@keyframes beat6{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}', '.spark6{position:absolute;z-index:2;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle,#fff,#FE5000 55%,transparent 72%);', 'box-shadow:0 0 36px 10px rgba(254,80,0,.55);transform:translate(-50%,-50%);animation:sparkP6 2.6s ease-in-out infinite}', '@keyframes sparkP6{0%,100%{opacity:.85;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.15)}}', '.bridge6{stroke-dasharray:6 10;animation:bridge6 1.2s linear infinite}', '@keyframes bridge6{to{stroke-dashoffset:-32}}', '@media(max-width:700px){.scn-6a .markwrap6,.scn-6b .markwrap6{left:50%;top:32%;width:min(58vw,280px)}}'].join('\n');
    document.head.appendChild(st);
  }
  var ns = 'http://www.w3.org/2000/svg';
  function addPath(svg, x1, y1, cx, cy, P, col, w, op, i, extraClass) {
    var p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' Q ' + cx + ' ' + cy + ' ' + P.x + ' ' + P.y);
    p.setAttribute('class', 'fl6' + (extraClass ? ' ' + extraClass : ''));
    p.setAttribute('stroke', col);
    p.setAttribute('stroke-width', w);
    p.setAttribute('opacity', op);
    var len = Math.hypot(cx - x1, cy - y1) + Math.hypot(P.x - cx, P.y - cy);
    p.style.setProperty('--len', len);
    p.style.animationDelay = i * 0.045 + 's';
    svg.appendChild(p);
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '6a',
    group: 'g6',
    label: '線構標記',
    align: 'left',
    thumb: 'radial-gradient(circle at 60% 46%,#0a44d8,#001a5c 80%)',
    mount: function (root) {
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('class', 'field');
      svg.setAttribute('viewBox', '0 0 1000 750');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      root.appendChild(svg);
      var P = {
        x: 600,
        y: 360
      };
      for (var i = 0; i < 26; i++) {
        var y = 40 + i * 18;
        addPath(svg, -40, y, 300, (y + P.y) / 2, P, i % 4 === 0 ? '#9fc0ff' : 'rgba(255,255,255,.7)', i % 4 === 0 ? 1.2 : 0.85, .5, i);
      }
      for (var j = 0; j < 22; j++) {
        var x = 380 + j * 26;
        addPath(svg, x, 820, (x + P.x) / 2, 600, P, j % 3 === 0 ? '#ffb27a' : '#FE5000', j % 3 === 0 ? 1.4 : 1, .6, j);
      }
      var spark = document.createElement('div');
      spark.className = 'spark6';
      root.appendChild(spark);
      var mw = document.createElement('div');
      mw.className = 'markwrap6';
      mw.innerHTML = '<svg viewBox="0 0 100 100" aria-label="8plus">' + '<circle class="beat6" cx="32" cy="29" r="18" fill="#fff"></circle>' + '<path class="slash" d="M53 9H68L36 91H21L53 9Z" fill="#fff"></path>' + '<circle class="beat6 d" cx="70" cy="64" r="28" fill="#FE5000"></circle>' + '</svg>';
      root.appendChild(mw);
      function place() {
        var v = root.getBoundingClientRect();
        var s = Math.max(v.width / 1000, v.height / 750);
        var ox = (v.width - 1000 * s) / 2,
          oy = (v.height - 750 * s) / 2;
        spark.style.left = ox + P.x * s + 'px';
        spark.style.top = oy + P.y * s + 'px';
      }
      place();
      return null;
    }
  }, {
    id: '6b',
    group: 'g6',
    label: '雙核連線',
    align: 'left',
    thumb: 'radial-gradient(circle at 56% 46%,#0a44d8,#001a5c 80%)',
    mount: function (root) {
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('class', 'field');
      svg.setAttribute('viewBox', '0 0 1000 750');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      root.appendChild(svg);
      var P = {
        x: 588,
        y: 430
      };
      for (var i = 0; i < 20; i++) {
        var y = 60 + i * 22;
        addPath(svg, -40, y, 280, (y + P.y) / 2, P, 'rgba(159,192,255,.6)', 1, .45, i);
      }
      for (var j = 0; j < 18; j++) {
        var x = 360 + j * 30;
        addPath(svg, x, 820, (x + P.x) / 2, 660, P, '#FE5000', 1.1, .5, j);
      }
      var mw = document.createElement('div');
      mw.className = 'markwrap6';
      mw.innerHTML = '<svg viewBox="0 0 100 100" aria-label="8plus">' + '<circle class="beat6" cx="32" cy="29" r="18" fill="none" stroke="#9fc0ff" stroke-width="2.5"></circle>' + '<path class="slash bridge6" d="M53 9H68L36 91H21L53 9Z" fill="none" stroke="#fff" stroke-width="2"></path>' + '<circle class="beat6 d" cx="70" cy="64" r="28" fill="#FE5000"></circle>' + '<circle cx="32" cy="29" r="5" fill="#9fc0ff"></circle>' + '</svg>';
      root.appendChild(mw);
      return null;
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-6-mark.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-7-lines.js
try { (() => {
/* Group 7 — 線流交會 (7a / 7b / 7c / 7d / 7e) */
(function () {
  if (!document.getElementById('gallery-style-g7')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g7';
    st.textContent = ['.scn-7a,.scn-7b,.scn-7d,.scn-7e{background:#002FA7}', '.scn-7a canvas,.scn-7b canvas,.scn-7d canvas,.scn-7e canvas{position:absolute;inset:0;display:block}', '.scn-7c{background:#002FA7}', '.scn-7c svg{position:absolute;inset:0;width:100%;height:100%}', '.fl7{fill:none;stroke-linecap:round}', '.rb7{fill:none;stroke-linecap:round;stroke-dasharray:8 14;animation:rbflow7 linear infinite}', '@keyframes rbflow7{to{stroke-dashoffset:-44}}', '.core7{position:absolute;left:66%;top:48%;width:26px;height:26px;border-radius:50%;transform:translate(-50%,-50%);z-index:2;', 'background:radial-gradient(circle,#fff,#FE5000 55%,transparent 72%);box-shadow:0 0 44px 14px rgba(254,80,0,.55);animation:corePulse7 2.6s ease-in-out infinite}', '@keyframes corePulse7{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.9}50%{transform:translate(-50%,-50%) scale(1.18);opacity:1}}'].join('\n');
    document.head.appendChild(st);
  }
  function dprCanvas(root) {
    var cv = document.createElement('canvas');
    var dpr = Math.min(devicePixelRatio || 1, 2);
    var r = root.getBoundingClientRect();
    var w = r.width,
      h = r.height;
    cv.width = w * dpr;
    cv.height = h * dpr;
    cv.style.width = '100%';
    cv.style.height = '100%';
    var g = cv.getContext('2d');
    g.scale(dpr, dpr);
    return {
      cv: cv,
      ctx: g,
      w: w,
      h: h
    };
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '7a',
    group: 'g7',
    label: '粒子河流',
    align: 'left',
    thumb: 'linear-gradient(135deg,#002FA7,#FE5000)',
    mount: function (root, ctx) {
      var c = dprCanvas(root);
      root.appendChild(c.cv);
      var g = c.ctx,
        W = c.w,
        H = c.h;
      var P = {
        x: W * 0.66,
        y: H * 0.48
      };
      function mk() {
        var side = Math.random(),
          x,
          y;
        if (side < .6) {
          x = -20;
          y = Math.random() * H;
        } else {
          x = Math.random() * W;
          y = H + 20;
        }
        return {
          x: x,
          y: y,
          c: Math.random() < .26 ? '254,80,0' : '175,205,255',
          s: 0.6 + Math.random() * 0.8
        };
      }
      var count = Math.min(ctx.isMobile ? 200 : 420, W * H / 3400 | 0);
      var ps = Array.from({
        length: count
      }, mk);
      var raf;
      function step() {
        g.fillStyle = 'rgba(0,47,167,.10)';
        g.fillRect(0, 0, W, H);
        for (var i = 0; i < ps.length; i++) {
          var o = ps[i];
          var dx = P.x - o.x,
            dy = P.y - o.y,
            d = Math.hypot(dx, dy);
          o.x += dx / d * o.s * 2.4;
          o.y += dy / d * o.s * 2.4;
          g.fillStyle = 'rgba(' + o.c + ',.85)';
          g.beginPath();
          g.arc(o.x, o.y, 1.5, 0, 7);
          g.fill();
          if (d < 26) Object.assign(o, mk());
        }
        var gr = g.createRadialGradient(P.x, P.y, 0, P.x, P.y, 70);
        gr.addColorStop(0, 'rgba(254,80,0,.5)');
        gr.addColorStop(1, 'rgba(254,80,0,0)');
        g.fillStyle = gr;
        g.fillRect(P.x - 70, P.y - 70, 140, 140);
        raf = requestAnimationFrame(step);
      }
      if (ctx.reduce) {
        g.fillStyle = '#002FA7';
        g.fillRect(0, 0, W, H);
      } else step();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  }, {
    id: '7b',
    group: 'g7',
    label: '絲帶交織',
    align: 'left',
    thumb: 'linear-gradient(160deg,#002FA7,#7bb0ff)',
    mount: function (root, ctx) {
      var c = dprCanvas(root);
      root.appendChild(c.cv);
      var g = c.ctx,
        W = c.w,
        H = c.h;
      var P = {
        x: W * 0.66,
        y: H * 0.48
      };
      var bands = Array.from({
        length: 9
      }, function (_, i) {
        return {
          off: i / 9,
          c: i % 3 === 0 ? '254,80,0' : '175,205,255',
          amp: 20 + i * 6
        };
      });
      var t = 0,
        raf;
      function step() {
        t += 0.012;
        g.clearRect(0, 0, W, H);
        bands.forEach(function (b, i) {
          g.beginPath();
          for (var x = -20; x <= P.x; x += 8) {
            var prog = x / P.x;
            var y = H * (0.15 + b.off * 0.7) * (1 - prog) + P.y * prog + Math.sin(x * 0.01 + t + i) * b.amp * (1 - prog);
            if (x === -20) g.moveTo(x, y);else g.lineTo(x, y);
          }
          g.strokeStyle = 'rgba(' + b.c + ',' + (0.5 - i * 0.02) + ')';
          g.lineWidth = 2.2;
          g.stroke();
        });
        raf = requestAnimationFrame(step);
      }
      if (ctx.reduce) {
        g.fillStyle = '#002FA7';
        g.fillRect(0, 0, W, H);
      } else step();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  }, {
    id: '7c',
    group: 'g7',
    label: '資料匯流',
    align: 'left',
    thumb: 'linear-gradient(135deg,#002FA7,#ffb27a)',
    mount: function (root) {
      var ns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 1000 750');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      root.appendChild(svg);
      var core = document.createElement('div');
      core.className = 'core7';
      root.appendChild(core);
      var P = {
        x: 660,
        y: 360
      };
      var conf = [];
      for (var i = 0; i < 11; i++) {
        var y = 90 + i * 54;
        conf.push({
          x1: -40,
          y1: y,
          cx: 300,
          cy: (y + P.y) / 2,
          c: i % 3 === 0 ? '#ffb27a' : 'rgba(180,205,255,.9)'
        });
      }
      for (var j = 0; j < 7; j++) {
        var x = 380 + j * 46;
        conf.push({
          x1: x,
          y1: 820,
          cx: (x + P.x) / 2,
          cy: 640,
          c: '#FE5000'
        });
      }
      conf.forEach(function (o, i) {
        var d = 'M ' + o.x1 + ' ' + o.y1 + ' Q ' + o.cx + ' ' + o.cy + ' ' + P.x + ' ' + P.y;
        var base = document.createElementNS(ns, 'path');
        base.setAttribute('d', d);
        base.setAttribute('class', 'fl7');
        base.setAttribute('stroke', o.c);
        base.setAttribute('stroke-width', 1);
        base.setAttribute('opacity', .16);
        svg.appendChild(base);
        var p = document.createElementNS(ns, 'path');
        p.setAttribute('d', d);
        p.setAttribute('class', 'rb7');
        p.setAttribute('stroke', o.c);
        p.setAttribute('stroke-width', i % 4 === 0 ? 2.4 : 1.6);
        p.setAttribute('opacity', .7);
        p.style.animationDuration = 1.4 + Math.random() * 1.6 + 's';
        p.style.animationDelay = -Math.random() * 2 + 's';
        svg.appendChild(p);
      });
      return null;
    }
  }, {
    id: '7d',
    group: 'g7',
    label: '磁力場線',
    align: 'left',
    thumb: 'linear-gradient(135deg,#002FA7,#ffa080)',
    mount: function (root, ctx) {
      var c = dprCanvas(root);
      root.appendChild(c.cv);
      var g = c.ctx,
        W = c.w,
        H = c.h;
      var P = {
        x: W * 0.66,
        y: H * 0.48
      };
      var count = Math.min(ctx.isMobile ? 260 : 560, W / 1.7 | 0);
      var ps = Array.from({
        length: count
      }, function () {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          c: Math.random() < .28 ? '255,140,80' : '160,195,255'
        };
      });
      var t = 0,
        raf;
      function field(x, y) {
        var a = Math.atan2(P.y - y, P.x - x);
        var sw = Math.sin((x + y) * 0.004 + t) * 0.8;
        return a + sw;
      }
      function step() {
        t += 0.005;
        g.fillStyle = 'rgba(0,47,167,.055)';
        g.fillRect(0, 0, W, H);
        for (var i = 0; i < ps.length; i++) {
          var o = ps[i];
          var a = field(o.x, o.y);
          var nx = o.x + Math.cos(a) * 1.9,
            ny = o.y + Math.sin(a) * 1.9;
          g.strokeStyle = 'rgba(' + o.c + ',.5)';
          g.lineWidth = 1.2;
          g.beginPath();
          g.moveTo(o.x, o.y);
          g.lineTo(nx, ny);
          g.stroke();
          o.x = nx;
          o.y = ny;
          if (o.x < 0 || o.x > W || o.y < 0 || o.y > H || Math.hypot(o.x - P.x, o.y - P.y) < 16) {
            o.x = Math.random() * W;
            o.y = Math.random() * H;
          }
        }
        raf = requestAnimationFrame(step);
      }
      if (ctx.reduce) {
        g.fillStyle = '#002FA7';
        g.fillRect(0, 0, W, H);
      } else step();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  }, {
    id: '7e',
    group: 'g7',
    label: '光纖脈衝',
    align: 'left',
    thumb: 'linear-gradient(135deg,#002FA7,#ff6e32)',
    mount: function (root, ctx) {
      var c = dprCanvas(root);
      root.appendChild(c.cv);
      var g = c.ctx,
        W = c.w,
        H = c.h;
      var P = {
        x: W * 0.66,
        y: H * 0.48
      };
      var fibers = [];
      var nf = ctx.isMobile ? 14 : 22,
        nf2 = ctx.isMobile ? 9 : 14;
      for (var i = 0; i < nf; i++) {
        var y = H * 0.1 + i * (H * 0.8 / nf);
        fibers.push({
          x1: -20,
          y1: y,
          cx: W * 0.34,
          cy: (y + P.y) / 2,
          c: i % 4 === 0 ? '255,150,90' : '170,200,255'
        });
      }
      for (var j = 0; j < nf2; j++) {
        var x = W * 0.42 + j * (W * 0.5 / nf2);
        fibers.push({
          x1: x,
          y1: H + 20,
          cx: (x + P.x) / 2,
          cy: H * 0.82,
          c: '255,110,50'
        });
      }
      var pulses = fibers.map(function () {
        return Math.random();
      });
      function qpt(f, tt) {
        var mt = 1 - tt;
        return {
          x: mt * mt * f.x1 + 2 * mt * tt * f.cx + tt * tt * P.x,
          y: mt * mt * f.y1 + 2 * mt * tt * f.cy + tt * tt * P.y
        };
      }
      var raf;
      function step() {
        g.fillStyle = 'rgba(0,47,167,.14)';
        g.fillRect(0, 0, W, H);
        fibers.forEach(function (f, i) {
          g.strokeStyle = 'rgba(' + f.c + ',.16)';
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(f.x1, f.y1);
          g.quadraticCurveTo(f.cx, f.cy, P.x, P.y);
          g.stroke();
          pulses[i] += 0.006 + Math.random() * 0.004;
          if (pulses[i] > 1) pulses[i] = 0;
          var pt = qpt(f, pulses[i]);
          var gl = g.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 7);
          gl.addColorStop(0, 'rgba(' + f.c + ',.95)');
          gl.addColorStop(1, 'rgba(' + f.c + ',0)');
          g.fillStyle = gl;
          g.beginPath();
          g.arc(pt.x, pt.y, 7, 0, 7);
          g.fill();
        });
        var gr = g.createRadialGradient(P.x, P.y, 0, P.x, P.y, 60);
        gr.addColorStop(0, 'rgba(254,80,0,.55)');
        gr.addColorStop(1, 'rgba(254,80,0,0)');
        g.fillStyle = gr;
        g.fillRect(P.x - 60, P.y - 60, 120, 120);
        raf = requestAnimationFrame(step);
      }
      if (ctx.reduce) {
        g.fillStyle = '#002FA7';
        g.fillRect(0, 0, W, H);
      } else step();
      return function () {
        cancelAnimationFrame(raf);
      };
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-7-lines.js", error: String((e && e.message) || e) }); }

// explorations/homepage-gallery/scenes-8-tunnel.js
try { (() => {
/* Group 8 — 透視隧道 (8a / 8b / 8c) */
(function () {
  if (!document.getElementById('gallery-style-g8')) {
    var st = document.createElement('style');
    st.id = 'gallery-style-g8';
    st.textContent = ['.scn-8a,.scn-8b,.scn-8c{background:radial-gradient(120% 120% at 50% 42%,#0a1a63 0%,#050a2e 46%,#04061a 82%)}', '.scn-8a .scene8,.scn-8b .scene8,.scn-8c .scene8{position:absolute;inset:0;z-index:0;perspective:560px;perspective-origin:50% 42%;overflow:hidden}', '.plane8{position:absolute;left:-60%;right:-60%;height:170%;', 'background-image:linear-gradient(rgba(150,185,255,.62) 1.3px,transparent 1.3px),linear-gradient(90deg,rgba(150,185,255,.4) 1.3px,transparent 1.3px);', 'background-size:60px 60px;animation:flow8 2.3s linear infinite}', '.floor8{bottom:-30%;transform:rotateX(74deg);transform-origin:bottom center;', '-webkit-mask-image:linear-gradient(transparent,#000 32%);mask-image:linear-gradient(transparent,#000 32%)}', '.ceil8{top:-30%;transform:rotateX(-74deg);transform-origin:top center;', '-webkit-mask-image:linear-gradient(#000 68%,transparent);mask-image:linear-gradient(#000 68%,transparent);opacity:.7}', '@keyframes flow8{to{background-position:0 60px}}', '.warp8{position:absolute;inset:0;z-index:1;display:block}', '.halo8{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);z-index:1;width:60vw;height:60vw;', 'background:radial-gradient(circle,rgba(254,80,0,.32),transparent 62%);filter:blur(30px);pointer-events:none}', '.focal8{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);z-index:2;pointer-events:none}', '.sun8{width:min(26vh,26vw,270px);aspect-ratio:1;border-radius:50%;', 'background:linear-gradient(#7bd0ff,#2f66ff 34%,#FE5000 78%,#ff9a5c);box-shadow:0 0 90px rgba(254,80,0,.6),0 0 40px rgba(47,102,255,.5)}', '.sun8::after{content:"";position:absolute;left:0;right:0;bottom:0;top:38%;border-radius:0 0 50% 50%/0 0 100% 100%;', 'background:repeating-linear-gradient(#04061a 0 3px,transparent 3px 12px);opacity:.9}', '.core8{position:relative;width:min(30vh,30vw,300px);aspect-ratio:1;display:flex;align-items:center;justify-content:center}', '.core8 .r{position:absolute;border-radius:50%;border:1px solid rgba(123,208,255,.6)}', '.core8 .r1{inset:0;animation:spin8 22s linear infinite}', '.core8 .r2{inset:16%;border-color:rgba(255,255,255,.4);animation:spin8 16s linear infinite reverse}', '.core8 .r3{inset:33%;border-color:rgba(254,80,0,.7);animation:spin8 11s linear infinite}', '.core8 .dot{width:26%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff,#FE5000 60%,#c93d00);', 'box-shadow:0 0 60px rgba(254,80,0,.8);animation:pulse8 3s ease-in-out infinite}', '@keyframes spin8{to{transform:rotate(360deg)}}', '@keyframes pulse8{0%,100%{transform:scale(1);opacity:.95}50%{transform:scale(1.12);opacity:1}}', '.tokwrap8{perspective:900px;width:min(26vh,26vw,260px);aspect-ratio:1}', '.tok8{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:tokspin8 14s linear infinite}', '.tok8 .f{position:absolute;inset:18%;display:flex;align-items:center;justify-content:center;border-radius:26px;', 'font-family:var(--sans);font-weight:900;font-size:18vh;color:#fff;backface-visibility:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}', '.tok8 .ff{background:linear-gradient(145deg,#002FA7,#0038c9);transform:translateZ(34%)}', '.tok8 .fb{background:linear-gradient(145deg,#FE5000,#ff7a3c);transform:rotateY(180deg) translateZ(34%)}', '.tok8 .fr{background:linear-gradient(145deg,#FE5000,#c93d00);transform:rotateY(90deg) translateZ(34%)}', '.tok8 .fl{background:linear-gradient(145deg,#002FA7,#001e6e);transform:rotateY(-90deg) translateZ(34%)}', '.tok8 .f sup{font-size:.4em;vertical-align:super}', '@keyframes tokspin8{from{transform:rotateX(-12deg) rotateY(0)}to{transform:rotateX(-12deg) rotateY(360deg)}}'].join('\n');
    document.head.appendChild(st);
  }
  function baseTunnel(root, ctx) {
    root.innerHTML = '<div class="scene8"><div class="plane8 floor8"></div><div class="plane8 ceil8"></div></div>' + '<div class="halo8"></div><canvas class="warp8"></canvas>';
    var scene = root.querySelector('.scene8');
    function onMove(e) {
      var dx = e.clientX / innerWidth - .5,
        dy = e.clientY / innerHeight - .5;
      scene.style.transform = 'translate(' + dx * -22 + 'px,' + dy * -14 + 'px)';
    }
    if (!ctx.reduce) addEventListener('mousemove', onMove);
    var cv = root.querySelector('.warp8');
    var dpr = Math.min(devicePixelRatio || 1, 2);
    var r = root.getBoundingClientRect();
    var W = r.width,
      H = r.height;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cv.style.width = '100%';
    cv.style.height = '100%';
    var g = cv.getContext('2d');
    g.scale(dpr, dpr);
    var cx = W / 2,
      cy = H * 0.42,
      scale = Math.min(W, H) * 0.9;
    var cols = ['rgba(255,255,255,', 'rgba(123,208,255,', 'rgba(254,80,0,'];
    function mk(z) {
      var ang = Math.random() * Math.PI * 2,
        rr = 0.15 + Math.random() * 0.9;
      return {
        x: Math.cos(ang) * rr,
        y: Math.sin(ang) * rr * 0.7,
        z: z || 1,
        c: cols[Math.random() < .22 ? Math.random() < .5 ? 1 : 2 : 0],
        px: null,
        py: null
      };
    }
    var n = Math.min(ctx.isMobile ? 90 : 160, Math.floor(W * H / 9000));
    var stars = Array.from({
      length: n
    }, function () {
      return mk(Math.random());
    });
    var raf;
    function frame() {
      g.fillStyle = 'rgba(4,6,26,.32)';
      g.fillRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.z -= 0.006;
        if (s.z <= 0.05) {
          Object.assign(s, mk(1));
          continue;
        }
        var sx = cx + s.x / s.z * scale,
          sy = cy + s.y / s.z * scale;
        var size = (1 - s.z) * 2.6;
        if (s.px !== null) {
          g.strokeStyle = s.c + (1 - s.z) * 0.9 + ')';
          g.lineWidth = size;
          g.beginPath();
          g.moveTo(s.px, s.py);
          g.lineTo(sx, sy);
          g.stroke();
        }
        s.px = sx;
        s.py = sy;
      }
      raf = requestAnimationFrame(frame);
    }
    if (!ctx.reduce) frame();else {
      g.fillStyle = '#04061a';
      g.fillRect(0, 0, W, H);
      for (var k = 0; k < stars.length; k++) {
        var s2 = stars[k];
        var sx = cx + s2.x / s2.z * scale,
          sy = cy + s2.y / s2.z * scale;
        g.fillStyle = s2.c + '0.6)';
        g.fillRect(sx, sy, 2, 2);
      }
    }
    return function () {
      cancelAnimationFrame(raf);
      if (!ctx.reduce) removeEventListener('mousemove', onMove);
    };
  }
  window.GALLERY_SCENES = window.GALLERY_SCENES || [];
  window.GALLERY_SCENES.push({
    id: '8a',
    group: 'g8',
    label: '隧道·合成波太陽',
    align: 'center',
    thumb: 'radial-gradient(circle at 50% 44%,#7bd0ff,#FE5000 70%)',
    mount: function (root, ctx) {
      var cleanup = baseTunnel(root, ctx);
      var focal = document.createElement('div');
      focal.className = 'focal8';
      focal.innerHTML = '<div class="sun8"></div>';
      root.appendChild(focal);
      return cleanup;
    }
  }, {
    id: '8b',
    group: 'g8',
    label: '隧道·旋轉字標',
    align: 'center',
    thumb: 'linear-gradient(135deg,#002FA7,#FE5000)',
    mount: function (root, ctx) {
      var cleanup = baseTunnel(root, ctx);
      var focal = document.createElement('div');
      focal.className = 'focal8';
      focal.innerHTML = '<div class="tokwrap8"><div class="tok8">' + '<div class="f ff">8<sup>+</sup></div><div class="f fb">8<sup>+</sup></div>' + '<div class="f fr"></div><div class="f fl"></div>' + '</div></div>';
      root.appendChild(focal);
      return cleanup;
    }
  }, {
    id: '8c',
    group: 'g8',
    label: '隧道·能量核心',
    align: 'center',
    thumb: 'radial-gradient(circle,#fff,#FE5000 55%,#001a5c 90%)',
    mount: function (root, ctx) {
      var cleanup = baseTunnel(root, ctx);
      var focal = document.createElement('div');
      focal.className = 'focal8';
      focal.innerHTML = '<div class="core8"><div class="r r1"></div><div class="r r2"></div><div class="r r3"></div><div class="dot"></div></div>';
      root.appendChild(focal);
      return cleanup;
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/homepage-gallery/scenes-8-tunnel.js", error: String((e && e.message) || e) }); }

// explorations/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app-v2/ChromeV2.jsx
try { (() => {
/* global React */
// 8plus.app v2 CI — site chrome. Header is transparent over the hero
// and frosts on scroll; footer sits on a deep-night field. Composes
// the DS Logo / Button / Sheet / DropdownMenu.

const NS = window.Ds8plusDesignSystem_1b9e83;
const {
  Logo,
  Button,
  Separator,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} = NS;
const NAV = [{
  key: "about",
  zh: "關於",
  en: "About"
}, {
  key: "lab",
  zh: "Lab",
  en: "Lab"
}, {
  key: "path",
  zh: "歷程",
  en: "Path"
}, {
  key: "services",
  zh: "服務",
  en: "Services"
}, {
  key: "booking",
  zh: "預約",
  en: "Booking"
}];
function AnimatedLogo({
  size = 28
}) {
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const br = d => reduce ? undefined : {
    transformBox: "fill-box",
    transformOrigin: "center",
    animation: `logoBreathe 3.2s ease-in-out ${d} infinite`
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    fill: "none",
    width: size,
    height: size,
    role: "img",
    "aria-label": "8plus",
    style: {
      flexShrink: 0,
      display: "block",
      overflow: "visible"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "29",
    r: "18",
    fill: "#ffffff",
    style: br("0s")
  }), /*#__PURE__*/React.createElement("path", {
    d: "M53 9H68L36 91H21L53 9Z",
    fill: "#ffffff",
    style: reduce ? undefined : {
      animation: "logoSlashSheen 3.2s ease-in-out infinite"
    }
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "64",
    r: "28",
    fill: "var(--color-orange)",
    stroke: "rgba(255,255,255,.55)",
    strokeWidth: "2",
    style: reduce ? undefined : {
      ...br(".5s"),
      filter: "drop-shadow(0 0 7px rgba(254,80,0,.65))"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-semibold)",
      fontSize: `${size * 0.6}px`,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      lineHeight: 1
    }
  }, "8plus"));
}
function Header({
  lang,
  setLang,
  scrolled,
  onNav
}) {
  const t = (zh, en) => lang === "zh" ? zh : en;
  const frost = scrolled;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%",
      borderBottom: frost ? "1px solid var(--border-soft)" : "1px solid transparent",
      background: frost ? "color-mix(in oklab, var(--color-dark), transparent 12%)" : "transparent",
      backdropFilter: frost ? "blur(12px)" : "none",
      WebkitBackdropFilter: frost ? "blur(12px)" : "none",
      transition: "var(--transition-base)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      minHeight: "4.5rem",
      padding: "0 clamp(24px,4vw,28px)",
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("hero"),
    style: {
      cursor: "pointer",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(AnimatedLogo, {
    size: 28
  })), /*#__PURE__*/React.createElement("nav", {
    className: "desk-nav",
    style: {
      display: "flex",
      gap: 24,
      marginLeft: 4
    }
  }, NAV.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.key,
    onClick: () => onNav(item.key),
    style: {
      fontSize: 14,
      cursor: "pointer",
      color: "var(--fg-2)",
      opacity: 0.75,
      transition: "opacity .15s"
    },
    onMouseEnter: e => e.currentTarget.style.opacity = 1,
    onMouseLeave: e => e.currentTarget.style.opacity = 0.75
  }, t(item.zh, item.en)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "desk-nav"
  }, /*#__PURE__*/React.createElement(DropdownMenu, null, /*#__PURE__*/React.createElement(DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, lang === "zh" ? "繁中 ▾" : "EN ▾")), /*#__PURE__*/React.createElement(DropdownMenuContent, {
    align: "end"
  }, /*#__PURE__*/React.createElement(DropdownMenuLabel, null, "Language"), /*#__PURE__*/React.createElement(DropdownMenuSeparator, null), /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => setLang("zh")
  }, "\u7E41\u9AD4\u4E2D\u6587"), /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => setLang("en")
  }, "English")))), /*#__PURE__*/React.createElement("div", {
    className: "mob-nav"
  }, /*#__PURE__*/React.createElement(Sheet, null, /*#__PURE__*/React.createElement(SheetTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon"
  }, "\u2261")), /*#__PURE__*/React.createElement(SheetContent, {
    side: "right"
  }, /*#__PURE__*/React.createElement(SheetHeader, null, /*#__PURE__*/React.createElement(SheetTitle, null, "8plus"), /*#__PURE__*/React.createElement(SheetDescription, null, t("架構先行 · AI 落地", "Architecture-led · AI shipped"))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, NAV.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.key,
    onClick: () => onNav(item.key),
    style: {
      fontSize: 17,
      padding: "10px 0",
      color: "var(--fg-2)",
      cursor: "pointer"
    }
  }, t(item.zh, item.en)))), /*#__PURE__*/React.createElement(Button, {
    onClick: () => onNav("booking"),
    style: {
      marginTop: "auto"
    }
  }, t("預約諮詢", "Book a call"))))))));
}
function Footer({
  lang
}) {
  const t = (zh, en) => lang === "zh" ? zh : en;
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-dark noise-field",
    style: {
      position: "relative",
      borderTop: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "48px clamp(24px,4vw,28px)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    size: 26,
    wordmark: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--meta)",
      margin: "14px 0 0"
    }
  }, t("架構驅動的技術夥伴", "Architecture-led engineering partner")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--meta)",
      margin: "8px 0 0"
    }
  }, "\xA9 ", new Date().getFullYear(), " 8plus \xB7 Made in Taiwan")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      fontSize: 14,
      color: "var(--fg-2)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fg-2)"
    }
  }, "LINE"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fg-2)"
    }
  }, "Email"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fg-2)"
    }
  }, "RSS")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--meta)",
      margin: 0
    }
  }, "Next.js 15 \xB7 Velite \xB7 Vercel"))));
}
window.Site = {
  Header,
  Footer,
  NAV
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app-v2/ChromeV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app-v2/HeroBackdrops2V2.jsx
try { (() => {
/* global React */
// Hero backdrop concepts for 8plus.app (file 2 of 2) — 18 additional Klein-blue visuals.
const {
  useCv,
  Shell
} = window.HbUtil;
const KB = "#002FA7";
(function injectHb2Css() {
  let st = document.getElementById("hb2-css");
  if (!st) {
    st = document.createElement("style");
    st.id = "hb2-css";
    document.head.appendChild(st);
  }
  st.textContent = `
  /* typo — 動態字牆 */
  .hb-typo .row { position: absolute; left: 0; right: 0; overflow: hidden; font-family: var(--font-display); font-weight: 700; font-size: 12.5vh; line-height: 1; white-space: nowrap; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.2); }
  .hb-typo .row.o { -webkit-text-stroke: 1.5px rgba(254,110,40,.55); }
  .hb-typo .run { display: flex; width: max-content; animation: hbMarq linear infinite; }
  .hb-typo .run span { padding-right: .5em; }
  /* eclipse — 日蝕循環：太陽 → 日蝕 → 分離 */
  .hb-ecl .sun { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%); width: min(50vh, 440px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 42% 40%, #FFE0B8, #FE7A26 52%, #E64A00 80%); animation: hbBreath2 6s ease-in-out infinite; }
  .hb-ecl .moon { position: absolute; left: 64%; top: 45%; width: calc(min(50vh, 440px) * 0.985); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 62% 42%, #04164c, #000d33 75%); transform: translate(calc(-50% + 18%), -50%); animation: hbEclipse 16s ease-in-out infinite; }
  .hb-ecl .oring { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%) rotate(18deg); width: min(62vh, 545px); aspect-ratio: 1; border-radius: 50%; border: 1px dashed rgba(190,215,255,.28); }
  @keyframes hbBreath2 {
    0%, 100% { box-shadow: 0 0 130px 26px rgba(254,110,40,.5), 0 0 40px 8px rgba(255,170,100,.6); }
    50% { box-shadow: 0 0 180px 38px rgba(254,110,40,.66), 0 0 54px 12px rgba(255,170,100,.75); }
  }
  @keyframes hbEclipse {
    0% { transform: translate(-50%, -50%); }
    12% { transform: translate(calc(-50% - 18%), -50%); }
    38% { transform: translate(calc(-50% - 18%), -50%); }
    50% { transform: translate(-50%, -50%); }
    62% { transform: translate(calc(-50% + 18%), -50%); }
    88% { transform: translate(calc(-50% + 18%), -50%); }
    100% { transform: translate(-50%, -50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hb-typo .run, .hb-ecl .sun, .hb-ecl .moon { animation: none; }
  }`;
})();
const Cv = ({
  active,
  hint,
  refFn
}) => /*#__PURE__*/React.createElement(Shell, {
  active: active
}, /*#__PURE__*/React.createElement("canvas", {
  ref: refFn,
  className: "hb-cv"
}), hint ? /*#__PURE__*/React.createElement("span", {
  className: "hb-hint"
}, hint) : null);

// 星際穿越 — warp starfield accelerating outward
function Warp({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let ps = null;
    const reset = (p, maxR) => {
      p.a = Math.random() * Math.PI * 2;
      p.d = 8 + Math.random() * 50;
      p.sp = 1.012 + Math.random() * 0.02;
      p.o = Math.random() < 0.06;
      if (maxR) p.d = Math.random() * maxR;
    };
    return {
      frame() {
        const w = cv.width,
          h = cv.height,
          cx = w * 0.5,
          cy = h * 0.46,
          maxR = Math.hypot(w, h) * 0.58;
        if (!ps) {
          ps = Array.from({
            length: 170
          }, () => {
            const p = {};
            reset(p, maxR);
            return p;
          });
        }
        ctx.fillStyle = "rgba(0,47,167,.34)";
        ctx.fillRect(0, 0, w, h);
        for (const p of ps) {
          const d2 = p.d * p.sp + 0.4;
          const al = Math.min(1, p.d / (maxR * 0.4));
          ctx.strokeStyle = p.o ? "rgba(254,110,40," + (0.3 + al * 0.6) + ")" : "rgba(210,228,255," + (0.12 + al * 0.6) + ")";
          ctx.lineWidth = 0.8 + al * 1.6;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(p.a) * p.d, cy + Math.sin(p.a) * p.d);
          ctx.lineTo(cx + Math.cos(p.a) * d2, cy + Math.sin(p.a) * d2);
          ctx.stroke();
          p.d = d2;
          if (p.d > maxR) reset(p);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 漣漪擴散 — expanding rings; click to drop a ripple
function Ripple({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let id = 0,
      cd = 0;
    const rings = [];
    const add = (x, y, r0) => rings.push({
      x,
      y,
      r: r0 || 2,
      o: id++ % 5 === 0
    });
    const onTap = e => {
      add(e.detail.x, e.detail.y);
      add(e.detail.x, e.detail.y, -30);
    };
    window.addEventListener("heroTap", onTap);
    return {
      dispose() {
        window.removeEventListener("heroTap", onTap);
      },
      frame() {
        const w = cv.width,
          h = cv.height;
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        if (--cd <= 0) {
          add(Math.random() * w, Math.random() * h);
          cd = 46 + Math.random() * 40;
        }
        for (let i = rings.length - 1; i >= 0; i--) {
          const g = rings[i];
          g.r += 2.1;
          if (g.r <= 0) continue;
          const a = Math.max(0, 1 - g.r / 380);
          ctx.strokeStyle = g.o ? "rgba(254,80,0," + a * 0.8 + ")" : "rgba(185,212,255," + a * 0.5 + ")";
          ctx.lineWidth = g.o ? 1.6 : 1.1;
          ctx.beginPath();
          ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
          ctx.stroke();
          if (a <= 0) rings.splice(i, 1);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref,
    hint: "\u9EDE\u64CA\u756B\u9762 \u2014 \u843D\u4E0B\u6F23\u6F2A"
  });
}

// 雷達掃描 — sweep with orange blips
function Radar({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0,
      blips = null;
    const RTERMS = ["LLM", "RAG", "embedding", "FastAPI", "MongoDB", "Redis", "Azure", "AWS", "K8s"];
    const MF = "11px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cx = w * 0.64,
          cy = h * 0.47,
          R = Math.min(w, h) * 0.38;
        if (!blips) blips = Array.from({
          length: 9
        }, (_, i) => ({
          a: Math.random() * Math.PI * 2,
          d: 0.2 + Math.random() * 0.75,
          glow: 0,
          tm: RTERMS[i]
        }));
        ctx.fillStyle = "rgba(0,47,167,.12)";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(170,200,255,.3)";
        ctx.lineWidth = 1;
        for (let k = 1; k <= 4; k++) {
          ctx.beginPath();
          ctx.arc(cx, cy, R * k / 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cx - R, cy);
        ctx.lineTo(cx + R, cy);
        ctx.moveTo(cx, cy - R);
        ctx.lineTo(cx, cy + R);
        ctx.stroke();
        const ang = t * 1.1;
        const gr = ctx.createLinearGradient(cx, cy, cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
        gr.addColorStop(0, "rgba(255,255,255,.08)");
        gr.addColorStop(1, "rgba(255,255,255,.85)");
        ctx.strokeStyle = gr;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
        ctx.stroke();
        for (const b of blips) {
          const da = ((ang - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          if (da < 0.06) b.glow = 1;
          b.glow *= 0.986;
          if (b.glow > 0.02) {
            const bx = cx + Math.cos(b.a) * R * b.d,
              by = cy + Math.sin(b.a) * R * b.d;
            ctx.fillStyle = "rgba(254,80,0," + b.glow + ")";
            ctx.beginPath();
            ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(254,110,40," + b.glow * 0.6 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(bx, by, 9, 0, Math.PI * 2);
            ctx.stroke();
            ctx.font = MF;
            ctx.fillStyle = "rgba(230,240,255," + Math.min(1, b.glow * 1.4) + ")";
            ctx.fillText(b.tm, bx + 14, by + 4);
          }
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 雙螺旋 — DNA strands across the field
function Dna({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const DTERMS = ["LLM", "RAG", "embedding", "FastAPI", "MongoDB", "Redis", "Azure", "AWS", "K8s"];
    const MF = "12px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cy = h * 0.47,
          amp = Math.min(120, h * 0.16);
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        for (let x = -10; x <= w + 10; x += 20) {
          const ph = x * 0.016 - t * 1.8;
          const y1 = cy + Math.sin(ph) * amp,
            y2 = cy + Math.sin(ph + Math.PI) * amp;
          const d1 = (Math.cos(ph) + 1) / 2,
            d2 = 1 - d1;
          const i = x / 20 | 0;
          if (i % 3 === 0) {
            ctx.strokeStyle = "rgba(160,195,255,.22)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
          }
          if (i % 9 === 4) {
            const term = DTERMS[((i - 4) / 9 | 0) % DTERMS.length];
            ctx.font = MF;
            ctx.fillStyle = i % 18 === 4 ? "rgba(254,110,40,.85)" : "rgba(215,230,255,.7)";
            ctx.fillText(term, x - ctx.measureText(term).width / 2, cy + 4);
          }
          const dot = (y, d, orange) => {
            ctx.fillStyle = orange ? "rgba(254,80,0," + (0.3 + 0.65 * d) + ")" : "rgba(205,225,255," + (0.15 + 0.6 * d) + ")";
            ctx.beginPath();
            ctx.arc(x, y, 1.4 + 2.6 * d, 0, Math.PI * 2);
            ctx.fill();
          };
          dot(y1, d1, i % 8 === 0);
          dot(y2, d2, false);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 線框山脈 — perspective wireframe terrain scrolling toward viewer
function Terra({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const F = (xw, zw) => Math.sin(xw * 1.7 + zw * 0.8) * Math.cos(xw * 0.6 - zw * 0.5) + Math.sin(xw * 3.1 + zw * 1.7) * 0.35;
    return {
      frame() {
        t += 0.014;
        const w = cv.width,
          h = cv.height,
          cx = w / 2,
          y0 = h * 0.4;
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        const sp = t * 1.4,
          zoff = Math.floor(sp),
          frac = sp - zoff;
        for (let zi = 26; zi >= 1; zi--) {
          const z = zi - frac;
          if (z <= 0.2) continue;
          const zw = zoff + zi;
          const sc = 1 / (0.3 * z + 0.7);
          const orange = zw % 13 === 0;
          ctx.strokeStyle = orange ? "rgba(254,80,0," + (0.25 + 0.6 * sc) + ")" : "rgba(180,208,255," + (0.08 + 0.42 * sc) + ")";
          ctx.lineWidth = orange ? 1.5 : 1;
          ctx.beginPath();
          for (let c = 0; c <= 56; c++) {
            const xw = c / 56 * 2 - 1;
            const e = Math.max(0, F(xw * 3, zw)) * 150 * sc * (0.35 + Math.abs(xw));
            const xs = cx + xw * w * 1.35 * sc;
            const ys = y0 + 320 * sc - e;
            if (c === 0) ctx.moveTo(xs, ys);else ctx.lineTo(xs, ys);
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 諧波軌跡 — harmonograph curve drawing itself, then starting anew
function Harmo({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let tau = 0,
      P = null,
      lx = null,
      ly = null;
    const R2 = () => Math.random() * Math.PI * 2;
    const newP = () => ({
      f1: 2 + (Math.random() * 3 | 0),
      f2: 2 + (Math.random() * 3 | 0),
      f3: 1 + (Math.random() * 4 | 0),
      f4: 1 + (Math.random() * 4 | 0),
      p1: R2(),
      p2: R2()
    });
    return {
      frame() {
        const w = cv.width,
          h = cv.height,
          cx = w * 0.62,
          cy = h * 0.47,
          A = Math.min(w, h) * 0.3;
        if (!P || tau > 300) {
          ctx.fillStyle = KB;
          ctx.fillRect(0, 0, w, h);
          P = newP();
          tau = 0;
          lx = null;
        }
        ctx.fillStyle = "rgba(0,47,167,.01)";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(200,222,255,.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        let px = lx,
          py = ly;
        for (let k = 0; k < 46; k++) {
          tau += 0.006;
          const dec = Math.exp(-tau * 0.004);
          const x = cx + (Math.sin(P.f1 * tau + P.p1) + Math.sin(P.f3 * tau * 0.5)) * 0.5 * A * dec;
          const y = cy + (Math.sin(P.f2 * tau + P.p2) + Math.sin(P.f4 * tau * 0.5)) * 0.42 * A * dec;
          if (px === null) ctx.moveTo(x, y);else if (k === 0) {
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
          } else ctx.lineTo(x, y);
          px = x;
          py = y;
        }
        ctx.stroke();
        lx = px;
        ly = py;
        ctx.fillStyle = "rgba(254,80,0,.95)";
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 幾何旋層 — nested rotating polygons with trails
function Spiro({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cx = w * 0.62,
          cy = h * 0.47;
        ctx.fillStyle = "rgba(0,47,167,.055)";
        ctx.fillRect(0, 0, w, h);
        for (let k = 0; k < 5; k++) {
          const n = k + 3,
            rad = 54 + k * 54;
          const rot = t * (0.25 + k * 0.09) * (k % 2 ? -1 : 1);
          const orange = k === 2;
          ctx.strokeStyle = orange ? "rgba(254,80,0,.6)" : "rgba(195,218,255,.35)";
          ctx.lineWidth = orange ? 1.6 : 1.1;
          ctx.beginPath();
          for (let i = 0; i <= n; i++) {
            const an = rot + i / n * Math.PI * 2;
            const x = cx + Math.cos(an) * rad,
              y = cy + Math.sin(an) * rad;
            if (i === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 頻譜柱列 — visualizer-style bars along the base
function Bars({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.02;
        const w = cv.width,
          h = cv.height,
          n = Math.ceil(w / 16);
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < n; i++) {
          const v = Math.abs(Math.sin(i * 0.33 + t * 1.4) * 0.62 + Math.sin(i * 0.11 - t * 0.8) * 0.38);
          const bh = 24 + v * h * 0.34;
          ctx.fillStyle = v > 0.9 ? "rgba(254,80,0,.85)" : "rgba(185,212,255," + (0.22 + 0.32 * v) + ")";
          ctx.fillRect(i * 16 + 3, h - bh, 9, bh);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 電子軌道 — atom-style elliptical orbits with electrons
function Atom({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const rots = [-0.5, 0.55, 1.6];
    const ATERMS = ["LLM", "RAG", "embedding", "FastAPI", "AWS", "K8s"];
    const MF = "11px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cx = w * 0.66,
          cy = h * 0.47,
          R1 = Math.min(w, h) * 0.3;
        ctx.clearRect(0, 0, w, h);
        for (let j = 0; j < 3; j++) {
          ctx.strokeStyle = "rgba(170,200,255,.3)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(cx, cy, R1, R1 * 0.38, rots[j], 0, Math.PI * 2);
          ctx.stroke();
          for (let e2 = 0; e2 < 2; e2++) {
            const ang = t * (0.45 + j * 0.18) + j * 2.1 + e2 * Math.PI;
            const ex = Math.cos(ang) * R1,
              ey = Math.sin(ang) * R1 * 0.38;
            const px = cx + ex * Math.cos(rots[j]) - ey * Math.sin(rots[j]);
            const py = cy + ex * Math.sin(rots[j]) + ey * Math.cos(rots[j]);
            const idx = j * 2 + e2,
              orange = idx === 2;
            ctx.fillStyle = orange ? "rgba(254,80,0,.25)" : "rgba(220,235,255,.22)";
            ctx.beginPath();
            ctx.arc(px, py, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = orange ? "#FE5000" : "#fff";
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = MF;
            ctx.fillStyle = orange ? "rgba(254,140,80,.95)" : "rgba(215,230,255,.8)";
            ctx.fillText(ATERMS[idx], px + 12, py + 4);
          }
        }
        const nr = 9 + Math.sin(t * 3) * 1.5;
        ctx.fillStyle = "rgba(254,80,0,.25)";
        ctx.beginPath();
        ctx.arc(cx, cy, nr * 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FE5000";
        ctx.beginPath();
        ctx.arc(cx, cy, nr, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 群鳥飛行 — boids flock, one orange leader
function Flock({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let bs = null,
      t = 0;
    return {
      frame() {
        t += 0.016;
        const cyc = t % 11;
        const scatter = cyc > 7.2 && cyc < 9.4;
        const w = cv.width,
          h = cv.height;
        if (!bs) bs = Array.from({
          length: 54
        }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6
        }));
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < bs.length; i++) {
          const b = bs[i];
          let ax = 0,
            ay = 0,
            mx = 0,
            my = 0,
            sx = 0,
            sy = 0,
            n = 0;
          for (let j = 0; j < bs.length; j++) {
            if (j === i) continue;
            const o = bs[j],
              dx = o.x - b.x,
              dy = o.y - b.y,
              d = Math.hypot(dx, dy);
            if (d < 70) {
              ax += o.vx;
              ay += o.vy;
              mx += o.x;
              my += o.y;
              n++;
              if (d < 22 && d > 0) {
                sx -= dx / d;
                sy -= dy / d;
              }
            }
          }
          if (n) {
            const alW = scatter ? 0.012 : 0.045,
              cohW = scatter ? -0.006 : 0.0045;
            b.vx += (ax / n - b.vx) * alW + (mx / n - b.x) * cohW + sx * 0.09;
            b.vy += (ay / n - b.vy) * alW + (my / n - b.y) * cohW + sy * 0.09;
          }
          const cp = scatter ? 0.00006 : 0.0003;
          b.vx += (w / 2 - b.x) * cp;
          b.vy += (h / 2 - b.y) * cp;
          if (scatter) {
            b.vx += (Math.random() - 0.5) * 0.3;
            b.vy += (Math.random() - 0.5) * 0.3;
          }
          const sp = Math.hypot(b.vx, b.vy) || 1;
          const lim = Math.min(scatter ? 2.2 : 1.6, Math.max(0.8, sp));
          b.vx = b.vx / sp * lim;
          b.vy = b.vy / sp * lim;
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < -20) b.x = w + 20;
          if (b.x > w + 20) b.x = -20;
          if (b.y < -20) b.y = h + 20;
          if (b.y > h + 20) b.y = -20;
          const k = i === 0 ? 1.5 : 1;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(Math.atan2(b.vy, b.vx));
          ctx.fillStyle = i === 0 ? "#FE5000" : "rgba(220,235,255,.75)";
          ctx.beginPath();
          ctx.moveTo(7 * k, 0);
          ctx.lineTo(-5 * k, 3.4 * k);
          ctx.lineTo(-5 * k, -3.4 * k);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 方格脈衝 — digital cell grid with a diagonal pulse wave
function Cells({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          s = 44;
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        const tk = t * 2 | 0;
        for (let gy = 0; gy * s < h + s; gy++) for (let gx = 0; gx * s < w + s; gx++) {
          const cxp = gx * s + s / 2,
            cyp = gy * s + s / 2;
          const v = Math.sin((gx * s + gy * s * 1.3) * 0.005 - t * 2.1) * Math.cos(gy * s * 0.004 + t * 0.7);
          const m = Math.max(0, v);
          const orange = (gx * 7 + gy * 13 + tk) % 149 === 0;
          const sz = orange ? 20 : 6 + m * 22;
          ctx.fillStyle = orange ? "rgba(254,80,0,.9)" : "rgba(185,212,255," + (0.06 + 0.3 * m) + ")";
          ctx.fillRect(cxp - sz / 2, cyp - sz / 2, sz, sz);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 動態字牆 — kinetic outline typography rows
const TY = "8PLUS · 架構先行 · AI SHIPPED · TRUSTED SYSTEMS · ";
function Typo({
  active
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-typo"
  }, [0, 1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row" + (i === 2 ? " o" : ""),
    style: {
      top: 1 + i * 16.5 + "%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "run",
    style: {
      animationDuration: 34 + i * 7 + "s",
      animationDirection: i % 2 ? "reverse" : "normal"
    }
  }, /*#__PURE__*/React.createElement("span", null, TY + TY + TY), /*#__PURE__*/React.createElement("span", null, TY + TY + TY)))));
}

// 日蝕光環 — sun → eclipse → separation, on loop
function Eclipse({
  active
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-ecl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "oring"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sun"
  }), /*#__PURE__*/React.createElement("div", {
    className: "moon"
  }));
}
Object.assign(window.HeroBackdrops, {
  warp: Warp,
  ripple: Ripple,
  radar: Radar,
  dna: Dna,
  terra: Terra,
  harmo: Harmo,
  spiro: Spiro,
  bars: Bars,
  atom: Atom,
  flock: Flock,
  cells: Cells,
  typo: Typo,
  eclipse: Eclipse
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app-v2/HeroBackdrops2V2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app-v2/HeroBackdropsV2.jsx
try { (() => {
/* global React */
// Hero backdrop concepts for 8plus.app (file 1 of 2).
// Each component takes { active } and renders a .hv-bg layer.
// Canvas loops only run while their tab is active.

(function injectHbCss() {
  let st = document.getElementById("hb-css");
  if (!st) {
    st = document.createElement("style");
    st.id = "hb-css";
    document.head.appendChild(st);
  }
  st.textContent = `
  .hv-bg canvas.hb-cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .hv-bg .hb-hint { position: absolute; right: clamp(24px, 5vw, 80px); top: 116px; z-index: 6; font-family: var(--font-mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: rgba(210,225,255,.6); background: rgba(3,6,26,.55); border-radius: 9999px; padding: 7px 13px; backdrop-filter: blur(10px); }
  @media (max-height: 620px) { .hv-bg .hb-hint { display: none; } }
  .hv-bg button.hb-mic { pointer-events: auto; cursor: pointer; border: 1px solid rgba(160,195,255,.35); color: rgba(225,238,255,.9); transition: .25s; }
  .hv-bg button.hb-mic:hover { border-color: #FE5000; color: #fff; }

  /* orbit — 軌道系統 */
  .hb-orbit .hub { position: absolute; left: 66%; top: 47%; width: 0; height: 0; }
  .hb-orbit .ringw { position: absolute; left: 0; top: 0; }
  .hb-orbit .ringb { position: absolute; inset: 0; border: 1px dashed rgba(160,195,255,.34); border-radius: 50%; }
  .hb-orbit .satw { position: absolute; inset: 0; animation: hbSpin linear infinite; }
  .hb-orbit .sat { position: absolute; left: 50%; top: 0; display: flex; align-items: center; gap: 7px; animation: hbSpinR linear infinite; }
  .hb-orbit .sat i { width: 8px; height: 8px; border-radius: 50%; background: #fff; box-shadow: 0 0 12px rgba(255,255,255,.8); flex: none; }
  .hb-orbit .sat i.o { background: #FE5000; box-shadow: 0 0 14px rgba(254,80,0,.9); }
  .hb-orbit .sat em { font-style: normal; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; color: rgba(210,225,255,.78); white-space: nowrap; }
  .hb-orbit .core { position: absolute; left: -11px; top: -11px; width: 22px; height: 22px; border-radius: 50%; background: #FE5000; box-shadow: 0 0 30px 8px rgba(254,80,0,.5); animation: hbPulse 2.6s ease-in-out infinite; }
  .hb-orbit .cecho { position: absolute; left: 50%; top: 50%; width: 90px; height: 90px; border-radius: 50%; border: 1px solid rgba(254,80,0,.5); animation: hbEcho 3.4s ease-out infinite; }
  @keyframes hbSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes hbSpinR { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
  @keyframes hbPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.18); } }
  @keyframes hbEcho { 0% { transform: translate(-50%,-50%) scale(.3); opacity: .8; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } }

  /* iso — 架構堆疊 */
  .hb-iso svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hb-iso .iso-legend { display: none; }
  @media (max-width: 820px) { .hb-iso .iso-legend { display: block; position: absolute; inset: 0; pointer-events: none; } }
  .hb-iso .drop { opacity: 0; animation: hbDrop .75s cubic-bezier(.2,.75,.3,1.15) forwards; }
  .hb-iso .lbl { opacity: 0; animation: hbFadeIn2 .6s ease forwards; }
  .hb-iso .gd { stroke-dasharray: 4 8; animation: hbDashFlow 1.2s linear infinite; }
  @keyframes hbDrop { from { opacity: 0; transform: translateY(-110px); } 70% { opacity: 1; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes hbFadeIn2 { to { opacity: 1; } }
  @keyframes hbDashFlow { to { stroke-dashoffset: -24; } }

  /* tape — 雜誌拼貼 */
  .hb-tape .bigmark { position: absolute; left: 68%; top: 42%; transform: translate(-50%,-50%) rotate(-6deg); width: min(52vh, 460px); aspect-ratio: 1; }
  .hb-tape .bigmark svg { width: 100%; height: 100%; display: block; overflow: visible; }
  .hb-tape .tape { position: absolute; left: -6%; right: -6%; overflow: hidden; padding: 9px 0; box-shadow: 0 12px 40px -18px rgba(0,0,0,.55); }
  .hb-tape .t1 { top: 13%; transform: rotate(-4deg); background: #FE5000; }
  .hb-tape .t2 { bottom: 9%; transform: rotate(3deg); background: rgba(255,255,255,.94); }
  .hb-tape .run { display: flex; width: max-content; animation: hbMarq 26s linear infinite; }
  .hb-tape .t2 .run { animation-duration: 34s; animation-direction: reverse; }
  .hb-tape .run span { font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .2em; white-space: nowrap; padding-right: 2em; }
  .hb-tape .t1 span { color: #001a5c; } .hb-tape .t2 span { color: #002FA7; }
  .hb-tape .pl { position: absolute; font-family: var(--font-mono); font-style: normal; font-size: 20px; color: rgba(255,255,255,.4); }
  .hb-tape .stamp { position: absolute; right: 26px; top: 50%; transform: translateY(-50%) rotate(90deg); font-family: var(--font-mono); font-size: 11px; letter-spacing: .3em; color: rgba(210,225,255,.5); white-space: nowrap; }
  @keyframes hbMarq { to { transform: translateX(-50%); } }

  /* bp — 電路藍圖 */
  .hb-bp { background-image: radial-gradient(rgba(160,195,255,.15) 1px, transparent 1.4px); background-size: 30px 30px; }
  .hb-bp svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hb-bp .hb-draw { fill: none; stroke: rgba(160,195,255,.5); stroke-width: 1.1; stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: hbDraw 1.5s ease forwards; }
  .hb-bp .hb-draw.org { stroke: #FE5000; stroke-width: 1.5; }
  .hb-bp .hb-flowline { fill: none; stroke: rgba(255,255,255,.9); stroke-width: 1.5; stroke-dasharray: 4 30; opacity: 0; animation: hbFlow2 2.6s linear infinite; }
  .hb-bp .hb-node { fill: #002FA7; stroke: rgba(160,195,255,.75); stroke-width: 1; opacity: 0; animation: hbFadeIn .6s ease 1.3s forwards; }
  @keyframes hbDraw { to { stroke-dashoffset: 0; } }
  @keyframes hbFlow2 { 0% { opacity: 0; stroke-dashoffset: 0; } 15% { opacity: .9; } 100% { opacity: .9; stroke-dashoffset: -136; } }
  @keyframes hbFadeIn { to { opacity: .9; } }

  @media (prefers-reduced-motion: reduce) {
    .hb-orbit .satw, .hb-orbit .sat, .hb-orbit .core, .hb-orbit .cecho,
    .hb-iso .gd, .hb-tape .run, .hb-bp .hb-flowline { animation: none; }
    .hb-iso .drop, .hb-iso .lbl { animation: none; opacity: 1; }
    .hb-bp .hb-draw { animation: none; stroke-dashoffset: 0; }
    .hb-bp .hb-node { animation: none; opacity: .9; }
    .hb-orbit .cecho { opacity: 0; }
  }

  /* 手機版：角落主視覺縮小並右移，避免壓到左側 A/B/C 文字 */
  /* 手機版：主視覺退為淡背景，不顯示標註避免與文字重疊 */
  @media (max-width: 820px) {
    .hb-orbit .hub { left: 58%; top: 54%; transform: scale(.72); }
    .hb-orbit .sat em { opacity: 0 !important; }
    .hb-iso svg { transform: scale(.82); transform-origin: 56% 52%; }
    .hb-iso .callout { display: none !important; }
    .hb-iso .iso-legend { display: none !important; }
    .hb-tape .bigmark { left: 62%; top: 56%; width: min(34vh, 260px); }
    /* 電路藍圖：手機上線條纖細＋襯底暗化會讓顏色顯得太淡，加粗加亮 */
    .hb-bp .hb-draw { stroke: rgba(200,222,255,.8); stroke-width: 1.7; }
    .hb-bp .hb-draw.org { stroke: #FF6B1A; stroke-width: 2.2; }
    .hb-bp .hb-node { opacity: .95 !important; r: 3.6; }
    .hb-bp .hb-flowline { stroke: rgba(255,255,255,.95); stroke-width: 2; }
    .hb-bp { background-image: radial-gradient(rgba(200,222,255,.3) 1.5px, transparent 2px); background-size: 26px 26px; }
  }
  @media (max-width: 520px) {
    .hb-orbit .hub { left: 56%; top: 56%; transform: scale(.62); }
    .hb-iso svg { transform: scale(.74); transform-origin: 54% 54%; }
    .hb-tape .bigmark { left: 58%; }
  }`;
})();

// shared canvas loop: runs only while active; one static frame under reduced motion.
// setup returns { frame, dispose? } — dispose is called on deactivate.
function useCv(active, setup) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    const cv = ref.current;
    if (!cv) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d");
    let raf,
      stop = false;
    const inst = setup(cv, ctx);
    const resize = () => {
      const p = cv.parentElement;
      cv.width = p.clientWidth || 1280;
      cv.height = p.clientHeight || 720;
    };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      inst.frame();
      if (!stop) raf = requestAnimationFrame(loop);
    };
    if (!reduce) loop();else inst.frame();
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (inst.dispose) inst.dispose();
    };
  }, [active]);
  return ref;
}
function Shell({
  active,
  cls,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hv-bg" + (cls ? " " + cls : "") + (active ? " on" : "")
  }, children);
}
window.HbUtil = {
  useCv,
  Shell
};

// 等高線地形 — animated topographic contours (marching squares)
function Topo({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = Math.random() * 10;
    const F = (x, y, tt) => Math.sin(x * 0.0032 + tt) + Math.cos(y * 0.004 - tt * 0.7) + Math.sin((x + y) * 0.0018 + tt * 0.5) + 1.2 * Math.cos(Math.hypot(x - cv.width * 0.64, y - cv.height * 0.44) * 0.0036 - tt * 0.6);
    return {
      frame() {
        t += 0.004;
        const w = cv.width,
          h = cv.height,
          s = 24;
        ctx.fillStyle = "#002FA7";
        ctx.fillRect(0, 0, w, h);
        const cols = Math.ceil(w / s) + 1,
          rows = Math.ceil(h / s) + 1,
          g = [];
        for (let j = 0; j < rows; j++) {
          g[j] = [];
          for (let i = 0; i < cols; i++) g[j][i] = F(i * s, j * s, t);
        }
        const levels = [-2.8, -2.4, -2, -1.6, -1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8];
        for (let li = 0; li < levels.length; li++) {
          const lv = levels[li],
            orange = li === 7;
          ctx.strokeStyle = orange ? "rgba(254,80,0,.85)" : "rgba(170,200,255,.36)";
          ctx.lineWidth = orange ? 1.5 : 1;
          ctx.beginPath();
          for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
            const a = g[j][i],
              b = g[j][i + 1],
              c = g[j + 1][i + 1],
              d = g[j + 1][i];
            const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * s,
              y0 = j * s;
            const L = (v1, v2) => {
              const dv = v2 - v1;
              return dv ? (lv - v1) / dv : 0.5;
            };
            const top = [x0 + s * L(a, b), y0],
              right = [x0 + s, y0 + s * L(b, c)];
            const bot = [x0 + s * L(d, c), y0 + s],
              left = [x0, y0 + s * L(a, d)];
            const seg = (p, q) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1:
              case 14:
                seg(left, bot);
                break;
              case 2:
              case 13:
                seg(bot, right);
                break;
              case 3:
              case 12:
                seg(left, right);
                break;
              case 4:
              case 11:
                seg(top, right);
                break;
              case 5:
                seg(top, left);
                seg(bot, right);
                break;
              case 6:
              case 9:
                seg(top, bot);
                break;
              case 7:
              case 8:
                seg(top, left);
                break;
              case 10:
                seg(top, right);
                seg(bot, left);
                break;
            }
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }));
}

// 半調點陣 — halftone dot field with a drifting orange band
function Dots({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.012;
        const w = cv.width,
          h = cv.height,
          s = 34;
        ctx.fillStyle = "#002FA7";
        ctx.fillRect(0, 0, w, h);
        const bandC = h * 0.85 + Math.sin(t * 0.55) * 170;
        for (let y = s / 2; y < h + s; y += s) for (let x = s / 2; x < w + s; x += s) {
          const v = Math.sin(x * 0.005 + t) * Math.cos(y * 0.0045 - t * 0.7) + Math.sin((x - y) * 0.0025 + t * 0.45);
          const r = Math.max(0.4, (v + 2) / 4 * 8.5);
          const band = Math.abs(x * 0.55 + y * 0.85 - bandC) < 95;
          const dxn = (x - w * 0.5) / (w * 0.36),
            dyn = (y - h * 0.74) / (h * 0.32);
          const dd = dxn * dxn + dyn * dyn;
          const dim = dd < 1 ? 0.22 + 0.78 * dd : 1;
          ctx.fillStyle = band ? "rgba(254,80,0," + 0.92 * dim + ")" : "rgba(190,215,255," + 0.42 * dim + ")";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }));
}

// 軌道系統 — tech-stack satellites orbiting an orange core
const RINGS = [{
  d: 210,
  dur: 20,
  sats: [{
    l: "LLM / RAG",
    o: 0,
    orange: true
  }]
}, {
  d: 340,
  dur: 32,
  sats: [{
    l: "NEXT.JS",
    o: 0.15
  }, {
    l: "POSTGRES",
    o: 0.6
  }]
}, {
  d: 480,
  dur: 46,
  sats: [{
    l: "AWS",
    o: 0.35
  }, {
    l: "K8S",
    o: 0.8
  }]
}, {
  d: 630,
  dur: 62,
  sats: [{
    l: "CI / CD",
    o: 0.55
  }]
}];
function Orbit({
  active
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-orbit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hub"
  }, RINGS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.d,
    className: "ringw",
    style: {
      width: r.d,
      height: r.d,
      marginLeft: -r.d / 2,
      marginTop: -r.d / 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ringb"
  }), r.sats.map(s2 => /*#__PURE__*/React.createElement("div", {
    key: s2.l,
    className: "satw",
    style: {
      animationDuration: r.dur + "s",
      animationDelay: -r.dur * s2.o + "s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sat",
    style: {
      animationDuration: r.dur + "s",
      animationDelay: -r.dur * s2.o + "s"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: s2.orange ? "o" : ""
  }), /*#__PURE__*/React.createElement("em", null, s2.l)))))), [0, 1].map(k => /*#__PURE__*/React.createElement("span", {
    key: k,
    className: "cecho",
    style: {
      animationDelay: k * 1.7 + "s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "core"
  })));
}

// 架構堆疊 — the real stack assembling layer by layer: DATA → SERVICES → WEB/APP
const ISO_W = 60,
  ISO_H = 30,
  ISO_S = 60,
  ISO_CX = 820,
  ISO_CY = 540;
const ARCH_CUBES = [{
  u: 0,
  v: 0,
  l: 0,
  d: 0
}, {
  u: 1,
  v: 0,
  l: 0,
  d: 0.12
}, {
  u: 0,
  v: 1,
  l: 0,
  d: 0.24
}, {
  u: 1,
  v: 1,
  l: 0,
  d: 0.36
}, {
  u: 0,
  v: 0,
  l: 1,
  d: 0.7
}, {
  u: 1,
  v: 0,
  l: 1,
  d: 0.82
}, {
  u: 0,
  v: 1,
  l: 1,
  d: 0.94
}, {
  u: 1,
  v: 1,
  l: 1,
  d: 1.06
}, {
  u: 0.5,
  v: 0.5,
  l: 2,
  d: 1.5
}, {
  u: 0.5,
  v: 0.5,
  l: 4,
  d: 1.9,
  orange: true
}];
const ARCH_DATA = ["MongoDB", "PostgreSQL", "Redis · MQ", "S3 / Blob"];
const ARCH_SVCS = ["auth-server", "ocr-llm-server", "context-eng-server", "asr-server"];
function ArchCube({
  c
}) {
  const w = ISO_W,
    hh = ISO_H,
    s = ISO_S;
  const x = ISO_CX + (c.u - c.v) * w,
    y = ISO_CY + (c.u + c.v) * hh - c.l * s;
  const pt = arr => arr.map(p => p.join(",")).join(" ");
  const top = [[0, -s], [w, -hh - s], [0, -2 * hh - s], [-w, -hh - s]];
  const left = [[-w, -hh], [0, 0], [0, -s], [-w, -hh - s]];
  const right = [[0, 0], [w, -hh], [w, -hh - s], [0, -s]];
  const st = c.orange ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.55)";
  const f = c.orange ? ["rgba(254,80,0,.96)", "rgba(205,62,0,.95)", "rgba(160,48,0,.95)"] : ["rgba(255,255,255,.18)", "rgba(255,255,255,.08)", "rgba(255,255,255,.035)"];
  return /*#__PURE__*/React.createElement("g", {
    transform: "translate(" + x + " " + y + ")"
  }, /*#__PURE__*/React.createElement("g", {
    className: "drop",
    style: {
      animationDelay: c.d + "s"
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: pt(top),
    fill: f[0],
    stroke: st,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pt(left),
    fill: f[1],
    stroke: st,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pt(right),
    fill: f[2],
    stroke: st,
    strokeWidth: "1"
  })));
}
function Iso({
  active
}) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (active) setTick(n => n + 1);
  }, [active]);
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-iso"
  }, /*#__PURE__*/React.createElement("svg", {
    key: tick,
    viewBox: "0 0 1320 760",
    preserveAspectRatio: "xMidYMid slice"
  }, ARCH_CUBES.map((c, i) => /*#__PURE__*/React.createElement(ArchCube, {
    key: i,
    c: c
  })), /*#__PURE__*/React.createElement("g", {
    className: "lbl",
    style: {
      animationDelay: "2.1s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    className: "gd",
    x1: "820",
    y1: "336",
    x2: "820",
    y2: "384",
    stroke: "rgba(254,80,0,.7)",
    strokeWidth: "1.4"
  })), /*#__PURE__*/React.createElement("g", {
    className: "lbl callout",
    style: {
      animationDelay: "0.6s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "700",
    y1: "510",
    x2: "612",
    y2: "510",
    stroke: "rgba(160,195,255,.5)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "700",
    cy: "510",
    r: "2",
    fill: "rgba(220,235,255,.9)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "602",
    y: "488",
    textAnchor: "end",
    fill: "rgba(160,195,255,.75)",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    letterSpacing: "2"
  }, "DATA \u2014 \u8CC7\u6599\u5C64"), ARCH_DATA.map((s2, i) => /*#__PURE__*/React.createElement("text", {
    key: s2,
    x: "602",
    y: 508 + i * 18,
    textAnchor: "end",
    fill: "rgba(255,255,255,.92)",
    fontFamily: "var(--font-mono)",
    fontSize: "12"
  }, s2))), /*#__PURE__*/React.createElement("g", {
    className: "lbl callout",
    style: {
      animationDelay: "1.35s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "940",
    y1: "450",
    x2: "988",
    y2: "450",
    stroke: "rgba(160,195,255,.5)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "940",
    cy: "450",
    r: "2",
    fill: "rgba(220,235,255,.9)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "1124",
    y: "428",
    textAnchor: "end",
    fill: "rgba(160,195,255,.75)",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    letterSpacing: "2"
  }, "SERVICES \xB7 API"), ARCH_SVCS.map((s2, i) => /*#__PURE__*/React.createElement("text", {
    key: s2,
    x: "1124",
    y: 448 + i * 18,
    textAnchor: "end",
    fill: "rgba(255,255,255,.92)",
    fontFamily: "var(--font-mono)",
    fontSize: "12"
  }, s2))), /*#__PURE__*/React.createElement("g", {
    className: "lbl callout",
    style: {
      animationDelay: "1.7s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "880",
    y1: "390",
    x2: "1030",
    y2: "352",
    stroke: "rgba(160,195,255,.5)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "880",
    cy: "390",
    r: "2",
    fill: "rgba(220,235,255,.9)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "1124",
    y: "348",
    textAnchor: "end",
    fill: "#fff",
    fontFamily: "var(--font-mono)",
    fontSize: "12",
    fontWeight: "600"
  }, "API GATEWAY"), /*#__PURE__*/React.createElement("text", {
    x: "1124",
    y: "362",
    textAnchor: "end",
    fill: "rgba(160,195,255,.7)",
    fontFamily: "var(--font-mono)",
    fontSize: "8.5",
    letterSpacing: "1.5"
  }, "REST / gRPC ROUTING")), /*#__PURE__*/React.createElement("g", {
    className: "lbl",
    style: {
      animationDelay: "2.15s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "820",
    y1: "206",
    x2: "820",
    y2: "188",
    stroke: "rgba(254,110,40,.7)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "820",
    cy: "208",
    r: "2",
    fill: "#FE5000"
  }), /*#__PURE__*/React.createElement("text", {
    x: "820",
    y: "164",
    textAnchor: "middle",
    fill: "#fff",
    fontFamily: "var(--font-mono)",
    fontSize: "12.5",
    fontWeight: "600"
  }, "WEB / APP"), /*#__PURE__*/React.createElement("text", {
    x: "820",
    y: "178",
    textAnchor: "middle",
    fill: "rgba(255,255,255,.75)",
    fontFamily: "var(--font-mono)",
    fontSize: "8.5",
    letterSpacing: "1.5"
  }, "NEXT.JS CLIENT"))), /*#__PURE__*/React.createElement("div", {
    className: "iso-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg svc"
  }, /*#__PURE__*/React.createElement("em", null, "SERVICES \xB7 API"), ARCH_SVCS.map(s2 => /*#__PURE__*/React.createElement("span", {
    key: s2
  }, s2))), /*#__PURE__*/React.createElement("div", {
    className: "seg data"
  }, /*#__PURE__*/React.createElement("em", null, "DATA \u2014 \u8CC7\u6599\u5C64"), ARCH_DATA.map(s2 => /*#__PURE__*/React.createElement("span", {
    key: s2
  }, s2)))));
}

// 聲波緞帶 — mic-driven line-sheet wave (simulated fallback when mic denied)
function Wave({
  active
}) {
  const [mic, setMic] = React.useState("idle");
  const aud = React.useRef({
    an: null,
    data: null
  });
  const resRef = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    try {
      if (document.permissionsPolicy && !document.permissionsPolicy.allowsFeature("microphone")) setMic("blocked");
    } catch (e) {}
    return () => {
      const r = resRef.current;
      if (r) {
        if (r.stream) r.stream.getTracks().forEach(tr => tr.stop());
        if (r.actx) r.actx.close();
        resRef.current = null;
      }
      aud.current = {
        an: null,
        data: null
      };
      setMic("idle");
    };
  }, [active]);
  const enableMic = async () => {
    setMic("asking");
    try {
      if (!navigator.mediaDevices) throw new Error("no media");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      await actx.resume();
      const src = actx.createMediaStreamSource(stream);
      const an = actx.createAnalyser();
      an.fftSize = 256;
      an.smoothingTimeConstant = 0.82;
      src.connect(an);
      aud.current = {
        an,
        data: new Uint8Array(an.frequencyBinCount)
      };
      resRef.current = {
        stream,
        actx
      };
      setMic("live");
    } catch (e) {
      setMic("off");
    }
  };
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.014;
        const w = cv.width,
          h = cv.height,
          rows = 26;
        const A = aud.current;
        let bins = null;
        if (A.an) {
          A.an.getByteFrequencyData(A.data);
          bins = A.data;
        }
        ctx.fillStyle = "#002FA7";
        ctx.fillRect(0, 0, w, h);
        for (let r = 0; r < rows; r++) {
          const prog = r / (rows - 1);
          const orange = r === 18;
          const alpha = orange ? 0.9 : 0.1 + 0.45 * Math.sin(prog * Math.PI);
          ctx.strokeStyle = orange ? "rgba(254,80,0," + alpha + ")" : "rgba(180,208,255," + alpha + ")";
          ctx.lineWidth = orange ? 1.6 : 1.1;
          ctx.beginPath();
          const yBase = h * (0.56 + (prog - 0.5) * 0.3);
          for (let x = 0; x <= w; x += 14) {
            const env = Math.sin(x / w * Math.PI);
            let y = yBase + Math.sin(x * 0.0038 + t * 1.15 + r * 0.24) * 58 * env + Math.cos(x * 0.002 - t * 0.6 + r * 0.12) * 28 * env;
            if (bins) {
              const bi = Math.min(bins.length - 1, x / w * 64 | 0);
              const boost = bins[bi] / 255;
              y -= boost * boost * 230 * env * (0.35 + 0.65 * Math.sin(prog * Math.PI));
            }
            if (x === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }), mic === "live" ? /*#__PURE__*/React.createElement("span", {
    className: "hb-hint"
  }, "MIC LIVE \u2014 \u8072\u97F3\u6B63\u5728\u9A45\u52D5\u6CE2\u5F62") : /*#__PURE__*/React.createElement("button", {
    className: "hb-hint hb-mic",
    onClick: enableMic
  }, mic === "asking" ? "要求麥克風權限中…" : mic === "off" ? "無法取得麥克風 — 點擊重試" : mic === "blocked" ? "此預覽環境可能未開放麥克風 — 點擊嘗試" : "點擊啟用麥克風 — 讓聲音驅動波形"));
}

// 點陣球體 — rotating dot globe; click to summon AI vocabulary
const SPHERE_TERMS = ["embedding", "LLM", "RAG", "vector db", "token", "agent", "fine-tune", "inference", "prompt", "context window", "rerank", "quantize"];
function Sphere({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0,
      ti = 0;
    const N = 560,
      pts = [],
      tags = [],
      pulses = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - i / (N - 1) * 2,
        rad = Math.sqrt(1 - y * y),
        th = i * 2.399963;
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
    }
    const tl = 0.42;
    const monoFont = px => px + "px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    const onTap = e => {
      const d = e.detail;
      tags.push({
        x: d.x,
        y: d.y,
        s: SPHERE_TERMS[ti % SPHERE_TERMS.length],
        o: ti % 3 === 0,
        age: 0
      });
      pulses.push({
        x: d.x,
        y: d.y,
        r: 3
      });
      ti++;
    };
    window.addEventListener("heroTap", onTap);
    return {
      dispose() {
        window.removeEventListener("heroTap", onTap);
      },
      frame() {
        t += 0.0045;
        const w = cv.width,
          h = cv.height;
        ctx.clearRect(0, 0, w, h);
        const cx = w * 0.66,
          cy = h * 0.47,
          R = Math.min(w, h) * 0.34;
        ctx.strokeStyle = "rgba(160,195,255,.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, R, R * 0.3, -0.28, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < N; i++) {
          const p = pts[i];
          const xr = p[0] * Math.cos(t) + p[2] * Math.sin(t);
          const zr = -p[0] * Math.sin(t) + p[2] * Math.cos(t);
          const y2 = p[1] * Math.cos(tl) - zr * Math.sin(tl);
          const z2 = p[1] * Math.sin(tl) + zr * Math.cos(tl);
          const depth = (z2 + 1) / 2,
            orange = i % 19 === 0;
          ctx.fillStyle = orange ? "rgba(254,80,0," + (0.2 + 0.75 * depth) + ")" : "rgba(200,220,255," + (0.06 + 0.5 * depth) + ")";
          ctx.beginPath();
          ctx.arc(cx + xr * R, cy + y2 * R, (orange ? 1.2 : 0.8) + 1.8 * depth, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.r += 2.4;
          const a = Math.max(0, 1 - p.r / 90);
          ctx.strokeStyle = "rgba(254,80,0," + a * 0.8 + ")";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
          if (a <= 0) pulses.splice(i, 1);
        }
        ctx.font = monoFont(13);
        for (let i = tags.length - 1; i >= 0; i--) {
          const g = tags[i];
          g.age++;
          const a = g.age < 15 ? g.age / 15 : Math.max(0, 1 - (g.age - 15) / 110);
          ctx.fillStyle = g.o ? "rgba(254,110,40," + a + ")" : "rgba(225,238,255," + a * 0.9 + ")";
          ctx.fillText(g.s, g.x + 10, g.y - g.age * 0.45);
          if (a <= 0) tags.splice(i, 1);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hb-hint"
  }, "\u9EDE\u64CA\u756B\u9762 \u2014 \u53EC\u559A AI \u8A5E\u5F59"));
}

// 雜誌拼貼 — real 8plus mark + running tape marquees
const TAPE1 = "ARCHITECTURE FIRST ✳ AI SHIPPED ✳ TRUSTED SYSTEMS ✳ 8PLUS.APP ✳ ";
const TAPE2 = "架構先行 · AI 落地 · 可信系統 · TAIPEI · EST. 2026 · ";
function Tape({
  active
}) {
  const plus = [["12%", "30%"], ["30%", "72%"], ["48%", "38%"], ["86%", "70%"], ["78%", "22%"]];
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-tape"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bigmark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "29",
    r: "18",
    fill: "none",
    stroke: "rgba(255,255,255,.42)",
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M53 9H68L36 91H21L53 9Z",
    fill: "none",
    stroke: "rgba(255,255,255,.42)",
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "64",
    r: "28",
    fill: "#FE5000",
    opacity: ".92"
  }))), plus.map((p, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "pl",
    style: {
      left: p[0],
      top: p[1]
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "tape t1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "run"
  }, /*#__PURE__*/React.createElement("span", null, TAPE1 + TAPE1 + TAPE1), /*#__PURE__*/React.createElement("span", null, TAPE1 + TAPE1 + TAPE1))), /*#__PURE__*/React.createElement("div", {
    className: "tape t2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "run"
  }, /*#__PURE__*/React.createElement("span", null, TAPE2 + TAPE2 + TAPE2), /*#__PURE__*/React.createElement("span", null, TAPE2 + TAPE2 + TAPE2))), /*#__PURE__*/React.createElement("span", {
    className: "stamp"
  }, "NO.01 \u2014 TRUST ISSUE \u2014 2026"));
}

// 電路藍圖 — orthogonal traces drawing themselves into a core chip
function Bp({
  active
}) {
  const gRef = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    const g = gRef.current;
    if (!g) return;
    while (g.firstChild) g.removeChild(g.firstChild);
    const ns = "http://www.w3.org/2000/svg";
    const cx = 870,
      cy = 357,
      hs = 74;
    const mk = (tag, attrs) => {
      const el = document.createElementNS(ns, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      g.appendChild(el);
      return el;
    };
    const R = (a, b) => a + Math.random() * (b - a);
    const trace = (pts, orange, i) => {
      let len = 0;
      for (let k = 1; k < pts.length; k++) len += Math.abs(pts[k][0] - pts[k - 1][0]) + Math.abs(pts[k][1] - pts[k - 1][1]);
      const d = "M " + pts.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ");
      const p = mk("path", {
        d,
        "class": "hb-draw" + (orange ? " org" : "")
      });
      p.style.setProperty("--len", String(Math.ceil(len)));
      p.style.animationDelay = (i * 0.09).toFixed(2) + "s";
      if (orange) {
        const f = mk("path", {
          d,
          "class": "hb-flowline"
        });
        f.style.animationDelay = (1.7 + i * 0.09).toFixed(2) + "s";
      }
      for (let k = 1; k < pts.length - 1; k++) mk("circle", {
        cx: pts[k][0],
        cy: pts[k][1],
        r: 3,
        "class": "hb-node"
      });
    };
    for (let i = 0; i < 14; i++) {
      const side = i % 4,
        orange = i % 5 === 0;
      const off = -46 + i % 4 * 30 + R(-8, 8);
      let pts;
      if (side === 0) {
        const sy = R(60, 690),
          mx = R(130, 560),
          py = cy + off;
        pts = [[-30, sy], [mx, sy], [mx, py], [cx - hs, py]];
      } else if (side === 1) {
        const sy = R(60, 690),
          mx = R(1060, 1300),
          py = cy + off;
        pts = [[1360, sy], [mx, sy], [mx, py], [cx + hs, py]];
      } else if (side === 2) {
        const sx = R(80, 1240),
          my = R(50, 170),
          px = cx + off;
        pts = [[sx, -30], [sx, my], [px, my], [px, cy - hs]];
      } else {
        const sx = R(80, 1240),
          my = R(560, 700),
          px = cx + off;
        pts = [[sx, 790], [sx, my], [px, my], [px, cy + hs]];
      }
      trace(pts, orange, i);
    }
  }, [active]);
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-bp"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1320 760",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("g", {
    ref: gRef
  }), /*#__PURE__*/React.createElement("rect", {
    x: "796",
    y: "283",
    width: "148",
    height: "148",
    rx: "10",
    fill: "rgba(255,255,255,.04)",
    stroke: "rgba(255,255,255,.6)",
    strokeDasharray: "6 5",
    strokeWidth: "1.3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "824",
    y: "311",
    width: "92",
    height: "92",
    rx: "6",
    fill: "none",
    stroke: "rgba(254,80,0,.85)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "870",
    y: "352",
    textAnchor: "middle",
    fill: "rgba(255,255,255,.85)",
    fontFamily: "var(--font-mono)",
    fontSize: "22"
  }, "8+"), /*#__PURE__*/React.createElement("text", {
    x: "870",
    y: "376",
    textAnchor: "middle",
    fill: "rgba(160,195,255,.6)",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    letterSpacing: "3"
  }, "CORE")));
}
window.HeroBackdrops = {
  topo: Topo,
  dots: Dots,
  orbit: Orbit,
  iso: Iso,
  wave: Wave,
  sphere: Sphere,
  tape: Tape,
  bp: Bp
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app-v2/HeroBackdropsV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app-v2/ScreensV2.jsx
try { (() => {
/* global React */
// 8plus.app v2 CI — the editorial scroll home. All copy is lifted
// from lib/content/home-sections.ts. Sections alternate blue↔orange;
// the hero is a magazine-style masthead; booking has a live slot picker.

const NS2 = window.Ds8plusDesignSystem_1b9e83;
const {
  Section,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Separator
} = NS2;
const COPY = {
  zh: {
    hero: {
      tag: "8PLUS.APP · TRUST001",
      issue: "NO.01 — 2026",
      headline: ["AI 沒有魔法，只有工程", "對的架構，接住你的需求"],
      caption: "FIG.01 — TRUST HANDSHAKE",
      cue: "往下滾動，認識 8plus",
      pillars: [{
        mark: "A",
        title: "架構先行",
        desc: "系統邊界、技術選型、可擴展設計"
      }, {
        mark: "B",
        title: "AI 導入",
        desc: "把 AI 嵌進真實流程，而非展示用"
      }, {
        mark: "C",
        title: "落地體驗",
        desc: "雲地混合 × LLM／RAG 實際上線"
      }],
      cta1: "預約諮詢",
      cta2: "看作品"
    },
    about: {
      eyebrow: "01 · STORY",
      title: "關於我",
      cta: "閱讀完整故事",
      kicker: "AUGUST WANG · awtw · 架構驅動的技術夥伴",
      lead: "設計、前端、後端到雲端架構，一手把想法交付成可信系統。",
      summary: "大學讀生醫與化學，卻在自學裡找到對程式的熱情，一路轉進全端與雲端；在 SaaS 產品的實戰中累積架構觀，如今以自由接案協助團隊，把想法交付成真正可信、可維護的系統。",
      spectrum: [{
        t: "設計",
        en: "Design",
        s: "UI/UX · 品牌識別 · 視覺語言",
        sEn: "UI/UX · Brand identity · Visual language"
      }, {
        t: "前端",
        en: "Frontend",
        s: "動效 · RWD · 互動體驗",
        sEn: "Motion · RWD · Interaction"
      }, {
        t: "後端",
        en: "Backend",
        s: "API · 資料模型 · 系統整合",
        sEn: "API · Data models · Integration"
      }, {
        t: "雲端架構",
        en: "Architecture",
        s: "Kubernetes · RAG · 可擴展設計",
        sEn: "Kubernetes · RAG · Scalable design"
      }],
      highlights: [{
        k: "代表成就",
        v: "千萬級推播 · 30 分鐘送達"
      }, {
        k: "跨域轉職",
        v: "生醫 → 工程"
      }, {
        k: "SaaS 實戰",
        v: "產品級架構經驗"
      }, {
        k: "自由接案",
        v: "顧問 · 開發 · 設計"
      }]
    },
    lab: {
      eyebrow: "02 · LAB",
      title: "作品集",
      cta: "查看全部作品"
    },
    path: {
      eyebrow: "03 · PATH",
      title: "學職涯歷程",
      lead: "從生醫到 AI 架構 — 每一步都在累積可信交付的能力。",
      cta: "查看完整歷程",
      items: [{
        year: "2026",
        period: "2026-02 → 至今",
        title: "中國信託（法金 AI）",
        sub: "高級架構師",
        desc: "AI Platform 與 RAG 架構設計、AI Agent 與知識工程落地，並參與大型架構開發與技術政策制定",
        tags: ["AI Platform", "RAG", "K8s"],
        active: true
      }, {
        year: "2025",
        period: "2025-03 → 09",
        title: "優配科技 Universal Processing",
        sub: "資深軟體工程師",
        desc: "CRM／POS／分潤系統開發，跨國團隊交付",
        tags: [".NET", "React", "AWS"]
      }, {
        year: "2024",
        period: "2024-06 → 2025-03",
        title: "台達電子",
        sub: "資深軟體工程師",
        desc: "",
        tags: []
      }, {
        year: "2021",
        period: "2021-03 → 2023-02",
        title: "91APP 九易宇軒",
        sub: "資深軟體工程師",
        desc: "電商 SaaS — 獨立打造千萬級推播架構、30 分鐘全量送達；SLA、藍綠部署、多租戶實戰",
        tags: ["SaaS", "千萬級推播", "藍綠部署"]
      }, {
        year: "2018",
        period: "2018-07",
        title: "交大 分子醫學與生物工程所",
        sub: "碩士畢業 · GPA 3.98",
        desc: "從生醫跨入工程的起點",
        tags: ["R", "Python"]
      }]
    },
    services: {
      eyebrow: "04 · SERVICES",
      title: "我能提供什麼",
      cta: "了解服務詳情",
      items: [{
        title: "程式架構諮詢",
        desc: "系統邊界、技術選型、可擴展與可維護的架構設計"
      }, {
        title: "網站開發",
        desc: "Next.js 全端開發、生產級交付與迭代上線"
      }, {
        title: "設計包案",
        desc: "從資訊架構到視覺語言的完整設計落地"
      }, {
        title: "整體資訊規劃",
        desc: "內容模型、導覽 IA、轉換動線的系統性規劃"
      }]
    },
    booking: {
      eyebrow: "05 · CONTACT / BOOKING",
      title: "預約 30 分鐘諮詢",
      lead: "聊聊你的需求 — 從架構、開發到設計，一起找到可落地的路線。",
      cta: "前往完整預約頁",
      confirm: "確認預約",
      booked: "已預約",
      again: "再約一次",
      pick: "選一個時段"
    }
  },
  en: {
    hero: {
      tag: "8PLUS.APP · TRUST001",
      issue: "NO.01 — 2026",
      headline: ["No magic in AI — just engineering", "The right architecture catches every need"],
      caption: "FIG.01 — TRUST HANDSHAKE",
      cue: "Scroll to meet 8plus",
      pillars: [{
        mark: "A",
        title: "Architecture first",
        desc: "Boundaries, stack choices, scalable design"
      }, {
        mark: "B",
        title: "AI integration",
        desc: "Embed AI in real workflows, not demos"
      }, {
        mark: "C",
        title: "Real deployment",
        desc: "Hybrid cloud × LLM/RAG, actually live"
      }],
      cta1: "Book a call",
      cta2: "See the work"
    },
    about: {
      eyebrow: "01 · STORY",
      title: "About me",
      cta: "Read the full story",
      kicker: "AUGUST WANG · awtw · Architecture-led partner",
      lead: "Design, frontend, backend to cloud architecture — turning ideas into trusted systems, end to end.",
      summary: "From biomedical science to full-stack and cloud — self-taught, forged on real SaaS products. Now freelancing to help teams turn ideas into trusted, maintainable systems.",
      spectrum: [{
        t: "設計",
        en: "Design",
        s: "UI/UX · 品牌識別 · 視覺語言",
        sEn: "UI/UX · Brand identity · Visual language"
      }, {
        t: "前端",
        en: "Frontend",
        s: "動效 · RWD · 互動體驗",
        sEn: "Motion · RWD · Interaction"
      }, {
        t: "後端",
        en: "Backend",
        s: "API · 資料模型 · 系統整合",
        sEn: "API · Data models · Integration"
      }, {
        t: "雲端架構",
        en: "Architecture",
        s: "Kubernetes · RAG · 可擴展設計",
        sEn: "Kubernetes · RAG · Scalable design"
      }],
      highlights: [{
        k: "Track record",
        v: "10M-scale push · 30-min delivery"
      }, {
        k: "Cross-field",
        v: "Biomed → Engineering"
      }, {
        k: "SaaS",
        v: "Production architecture"
      }, {
        k: "Freelance",
        v: "Consult · Build · Design"
      }]
    },
    lab: {
      eyebrow: "02 · LAB",
      title: "Selected work",
      cta: "View all projects"
    },
    path: {
      eyebrow: "03 · PATH",
      title: "Career path",
      lead: "From biomed to AI architecture — every step compounds toward trusted delivery.",
      cta: "View full path",
      items: [{
        year: "2026",
        period: "2026-02 → Present",
        title: "CTBC Bank (Corporate AI)",
        sub: "Senior Architect",
        desc: "AI platform & RAG architecture, AI agents and knowledge engineering — plus large-scale architecture programs and technical policy",
        tags: ["AI Platform", "RAG", "K8s"],
        active: true
      }, {
        year: "2025",
        period: "2025-03 → 09",
        title: "Universal Processing LLC",
        sub: "Senior Software Engineer",
        desc: "CRM / POS / revenue-share systems with a cross-border team",
        tags: [".NET", "React", "AWS"]
      }, {
        year: "2024",
        period: "2024-06 → 2025-03",
        title: "Delta Electronics",
        sub: "Senior Software Engineer",
        desc: "",
        tags: []
      }, {
        year: "2021",
        period: "2021-03 → 2023-02",
        title: "91APP",
        sub: "Senior Software Engineer",
        desc: "E-commerce SaaS — built a 10M-scale push architecture delivering in 30 minutes; SLA, blue-green deploys, multi-tenant",
        tags: ["SaaS", "Push at scale", "Blue-green"]
      }, {
        year: "2018",
        period: "2018-07",
        title: "NCTU — Molecular Medicine & Bioengineering",
        sub: "M.S. · GPA 3.98",
        desc: "Where biomed crossed into engineering",
        tags: ["R", "Python"]
      }]
    },
    services: {
      eyebrow: "04 · SERVICES",
      title: "What I offer",
      cta: "Explore services",
      items: [{
        title: "Architecture consulting",
        desc: "System boundaries, stack choices, scalable architecture"
      }, {
        title: "Web development",
        desc: "Next.js full-stack delivery and iterative shipping"
      }, {
        title: "Design packages",
        desc: "End-to-end design from IA to visual language"
      }, {
        title: "Information planning",
        desc: "Content models, navigation IA, conversion flows"
      }]
    },
    booking: {
      eyebrow: "05 · CONTACT / BOOKING",
      title: "Book a 30-minute call",
      lead: "Talk through your needs — from architecture and development to design.",
      cta: "Open full booking page",
      confirm: "Confirm booking",
      booked: "Booked",
      again: "Book another",
      pick: "Pick a slot"
    }
  }
};
const eyebrowRow = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 32
};
const h2 = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.75rem, 4vw, 3rem)",
  lineHeight: 1.08,
  letterSpacing: "-0.03em",
  fontWeight: 400,
  color: "var(--fg)",
  margin: "10px 0 0"
};
const eye = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--muted)"
};

// --- Editorial hero (blue field) — switchable animated main visuals ---
const HERO_LABELS = {
  combo: "隧道 · 作品卡",
  flow: "流場線",
  logo: "8+ 字標",
  lines: "線流交會",
  topo: "等高線地形",
  dots: "半調點陣",
  orbit: "軌道系統",
  iso: "架構堆疊",
  wave: "聲波緞帶",
  sphere: "點陣球體",
  tape: "雜誌拼貼",
  bp: "電路藍圖",
  warp: "星際穿越",
  ripple: "漣漪擴散",
  radar: "雷達掃描",
  dna: "雙螺旋",
  terra: "線框山脈",
  harmo: "諧波軌跡",
  spiro: "幾何旋層",
  bars: "頻譜柱列",
  atom: "電子軌道",
  flock: "群鳥飛行",
  cells: "方格脈衝",
  typo: "動態字牆",
  eclipse: "日蝕光環"
};
function Hero({
  c,
  navigate
}) {
  const [variant, setVariant] = React.useState(() => {
    const v = typeof localStorage !== "undefined" && localStorage.getItem("heroBg2");
    return HERO_LABELS[v] ? v : "combo";
  });
  const [swOpen, setSwOpen] = React.useState(false);
  const [logoTick, setLogoTick] = React.useState(0);
  const secRef = React.useRef(null),
    cvRef = React.useRef(null),
    sceneRef = React.useRef(null),
    lineRef = React.useRef(null),
    logoLinesRef = React.useRef(null),
    fieldRef = React.useRef(null);
  const setV = v => {
    setVariant(v);
    if (v === "logo") setLogoTick(n => n + 1);
    try {
      localStorage.setItem("heroBg2", v);
    } catch (e) {}
  };
  const nodes = React.useMemo(() => Array.from({
    length: 7
  }, () => ({
    left: 18 + Math.random() * 64 + "%",
    top: 24 + Math.random() * 52 + "%",
    d: Math.random() * 3 + "s"
  })), []);
  const cards = [{
    t: "前後端串接",
    en: "Full-stack Integration",
    s: ["Next.js", "API", "tRPC"]
  }, {
    t: "電商平台開發",
    en: "E-commerce Platform",
    s: ["Shopify", "金流", "訂單"]
  }, {
    t: "形象網站設計",
    en: "Brand Website",
    s: ["RWD", "CMS", "SEO"]
  }, {
    t: "CI · LOGO 設計",
    en: "Brand Identity",
    s: ["Logo", "視覺", "規範"]
  }, {
    t: "AI 導入與自動化",
    en: "AI Integration",
    s: ["LLM", "RAG", "Agent"]
  }, {
    t: "雲端架構顧問",
    en: "Cloud Architecture",
    s: ["AWS", "CI/CD", "效能"]
  }];
  React.useEffect(() => {
    if (variant !== "flow") return;
    const cv = cvRef.current,
      sec = secRef.current;
    if (!cv || !sec) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d");
    let raf,
      ps = [],
      t = 0;
    const resize = () => {
      cv.width = sec.clientWidth;
      cv.height = sec.clientHeight;
      ps = Array.from({
        length: Math.min(640, cv.width / 1.5 | 0)
      }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        c: Math.random() < .3 ? "255,125,60" : "175,205,255"
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003;
      ctx.fillStyle = "rgba(0,47,167,.085)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      for (const p of ps) {
        const a = Math.sin(p.x * 0.004 + t) + Math.cos(p.y * 0.004 - t);
        const nx = p.x + Math.cos(a * 3) * 1.4,
          ny = p.y + Math.sin(a * 3) * 1.4;
        ctx.strokeStyle = "rgba(" + p.c + ",.66)";
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        if (p.x < 0 || p.x > cv.width || p.y < 0 || p.y > cv.height) {
          p.x = Math.random() * cv.width;
          p.y = Math.random() * cv.height;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    if (!reduce) draw();else {
      ctx.fillStyle = "#002FA7";
      ctx.fillRect(0, 0, cv.width, cv.height);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);
  React.useEffect(() => {
    if (variant !== "logo") return;
    const svg = logoLinesRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const ns = "http://www.w3.org/2000/svg";
    const P = {
        x: 640,
        y: 375
      },
      N = 46;
    for (let i = 0; i < N; i++) {
      const ang = i / N * Math.PI * 2 + (Math.random() - .5) * 0.12;
      const R = 360 + Math.random() * 520;
      const ex = P.x + Math.cos(ang) * R,
        ey = P.y + Math.sin(ang) * R;
      const gap = 90 + Math.random() * 70; // don't draw over the mark itself
      const sx = P.x + Math.cos(ang) * gap,
        sy = P.y + Math.sin(ang) * gap;
      const p = document.createElementNS(ns, "path");
      p.setAttribute("d", "M " + ex.toFixed(1) + " " + ey.toFixed(1) + " L " + sx.toFixed(1) + " " + sy.toFixed(1));
      p.setAttribute("class", "fl2");
      const orange = Math.random() < 0.24;
      p.setAttribute("stroke", orange ? "#FE5000" : "rgba(159,192,255,.85)");
      p.setAttribute("stroke-width", orange ? 1.3 : 0.9);
      p.style.setProperty("--dur", (2.2 + Math.random() * 2.4).toFixed(2) + "s");
      p.style.animationDelay = (-Math.random() * 3).toFixed(2) + "s";
      svg.appendChild(p);
    }
  }, [variant, logoTick]);
  React.useEffect(() => {
    if (variant !== "lines") return;
    const cv = fieldRef.current,
      sec = secRef.current;
    if (!cv || !sec) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d");
    let raf,
      ps = [],
      t = 0;
    const P = () => ({
      x: cv.width * 0.66,
      y: cv.height * 0.48
    });
    const resize = () => {
      cv.width = sec.clientWidth;
      cv.height = sec.clientHeight;
      ps = Array.from({
        length: Math.min(620, cv.width / 1.6 | 0)
      }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        c: Math.random() < .28 ? "255,140,80" : "160,195,255"
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.005;
      const p = P();
      ctx.fillStyle = "rgba(0,47,167,.055)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      for (const o of ps) {
        const a = Math.atan2(p.y - o.y, p.x - o.x) + Math.sin((o.x + o.y) * 0.004 + t) * 0.8;
        const nx = o.x + Math.cos(a) * 1.9,
          ny = o.y + Math.sin(a) * 1.9;
        ctx.strokeStyle = "rgba(" + o.c + ",.5)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(o.x, o.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        o.x = nx;
        o.y = ny;
        if (o.x < 0 || o.x > cv.width || o.y < 0 || o.y > cv.height || Math.hypot(o.x - p.x, o.y - p.y) < 16) {
          o.x = Math.random() * cv.width;
          o.y = Math.random() * cv.height;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    if (!reduce) draw();else {
      ctx.fillStyle = "#002FA7";
      ctx.fillRect(0, 0, cv.width, cv.height);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);
  React.useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const set = () => {
      const h = document.querySelector("#scroller > header");
      const hh = h ? h.getBoundingClientRect().height : 0;
      sec.style.height = window.innerHeight - hh + "px";
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  React.useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (sceneRef.current && variant !== "combo") sceneRef.current.style.transform = "";
    if (reduce || variant !== "combo") return;
    const onM = e => {
      const dx = e.clientX / window.innerWidth - .5,
        dy = e.clientY / window.innerHeight - .5;
      if (sceneRef.current) sceneRef.current.style.transform = "translate(" + dx * -16 + "px," + dy * -10 + "px)";
    };
    window.addEventListener("mousemove", onM);
    return () => window.removeEventListener("mousemove", onM);
  }, [variant]);
  const labels = HERO_LABELS;
  const ORDER = Object.keys(labels);
  const HB = window.HeroBackdrops || {};
  const corner = ["logo", "lines", "orbit", "iso", "sphere", "tape", "bp", "radar", "atom", "eclipse", "spiro", "harmo"].indexOf(variant) !== -1;
  const flat = ["flow", "lines", "topo", "dots", "wave", "bp", "warp", "ripple", "radar", "dna", "terra", "harmo", "spiro", "bars", "flock", "cells"].indexOf(variant) !== -1;
  return /*#__PURE__*/React.createElement("section", {
    ref: secRef,
    className: "bg-blue noise-field" + (corner ? " hero-corner" : ""),
    onClick: e => {
      if (e.target.closest("button, a")) return;
      const r = secRef.current ? secRef.current.getBoundingClientRect() : null;
      if (r) window.dispatchEvent(new CustomEvent("heroTap", {
        detail: {
          x: e.clientX - r.left,
          y: e.clientY - r.top
        }
      }));
    },
    style: {
      position: "relative",
      height: "calc(100vh - 73px)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: flat ? "#002FA7" : "radial-gradient(120% 120% at 50% 44%, #0a44d8, #002FA7 50%, #001a5c 92%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: sceneRef,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      transition: "transform .3s ease"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hv-bg" + (variant === "combo" ? " on" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ht-scene"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ht-plane ht-floor"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ht-plane ht-ceil"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ht-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hv-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space"
  }, cards.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "card",
    style: {
      transform: "rotateY(" + i / cards.length * 360 + "deg) translateZ(330px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, "SERVICE // " + String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "ttl"
  }, p.t), /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, p.en), /*#__PURE__*/React.createElement("span", {
    className: "stack"
  }, p.s.map(x2 => /*#__PURE__*/React.createElement("span", {
    key: x2
  }, x2)))))))), /*#__PURE__*/React.createElement("div", {
    className: "hv-bg hv-flow" + (variant === "flow" ? " on" : "")
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: cvRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "hv-bg hv-logo" + (variant === "logo" ? " on" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "lfield"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lp lfloor"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lp lceil"
  })), variant === "logo" && /*#__PURE__*/React.createElement("svg", {
    className: "llines",
    ref: logoLinesRef,
    viewBox: "0 0 1000 750",
    preserveAspectRatio: "xMidYMid slice"
  }), variant === "logo" && [0, 1, 2].map(k => /*#__PURE__*/React.createElement("span", {
    key: "e" + k,
    className: "echo",
    style: {
      animationDelay: k * 1.33 + "s"
    }
  })), variant === "logo" && /*#__PURE__*/React.createElement("div", {
    className: "markwrap",
    key: "mark-" + logoTick
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    fill: "none",
    role: "img",
    "aria-label": "8plus"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "c-sm",
    cx: "32",
    cy: "29",
    r: "18",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    className: "slash",
    d: "M53 9H68L36 91H21L53 9Z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "c-lg",
    cx: "70",
    cy: "64",
    r: "28",
    fill: "#FE5000"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "hv-bg hv-lines" + (variant === "lines" ? " on" : "")
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: fieldRef
  })), ORDER.map(v => {
    const C = HB[v];
    return C ? /*#__PURE__*/React.createElement(C, {
      key: v,
      active: variant === v
    }) : null;
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "hero-scrim" + (corner ? " corner" : " flat")
  }), /*#__PURE__*/React.createElement("div", {
    className: "hv-switch" + (swOpen ? " open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    role: "menu"
  }, /*#__PURE__*/React.createElement("button", {
    className: "x",
    onClick: () => setSwOpen(false),
    "aria-label": "\u95DC\u9589"
  }, "\u2715"), /*#__PURE__*/React.createElement("h4", null, "\u4E3B\u8996\u89BA \xB7 VISUAL"), /*#__PURE__*/React.createElement("div", {
    className: "grid"
  }, ORDER.map((v, i) => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: "opt" + (variant === v ? " on" : ""),
    onClick: () => setV(v),
    title: labels[v]
  }, labels[v])))), /*#__PURE__*/React.createElement("button", {
    className: "trig",
    onClick: () => setSwOpen(o => !o),
    "aria-label": "\u8ABF\u6574\u4E3B\u8996\u89BA\u8207\u6587\u6848",
    "aria-expanded": swOpen
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6h6M14 6h6M4 12h10M18 12h2M4 18h3M11 18h9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "6",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "12",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "18",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      position: "relative",
      zIndex: 10,
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      width: "100%",
      padding: "64px clamp(24px,4vw,28px)",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--meta)",
      borderBottom: "1px solid var(--border-soft)",
      paddingBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, c.hero.tag), /*#__PURE__*/React.createElement("span", null, c.hero.issue)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: corner ? "flex-start" : "flex-end",
      alignItems: corner ? "flex-start" : "center",
      textAlign: corner ? "left" : "center",
      paddingBottom: corner ? 0 : "6vh",
      paddingTop: corner ? "clamp(40px, 10vh, 76px)" : variant === "lines" ? "4vh" : 0,
      paddingLeft: corner ? 10 : 0
    }
  }, corner && /*#__PURE__*/React.createElement("p", {
    className: "hp-rise",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--accent)",
      margin: "0 0 18px",
      animationDelay: ".1s"
    }
  }, c.__ === "en" ? "Architecture-led · AI shipped" : "架構驅動 · AI 落地"), /*#__PURE__*/React.createElement("h1", {
    className: "hp-rise",
    style: corner ? {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.7rem, 3vw, 2.7rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      fontWeight: 600,
      color: "var(--fg)",
      margin: 0,
      maxWidth: "18ch",
      textShadow: "0 4px 30px rgba(0,10,50,.7)",
      animationDelay: ".2s"
    } : {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2rem, 8.5vw, 4.75rem)",
      lineHeight: 1.06,
      letterSpacing: "-0.04em",
      fontWeight: 600,
      color: "var(--fg)",
      margin: 0,
      maxWidth: "22ch",
      textShadow: "0 6px 50px rgba(0,10,50,.85)",
      animationDelay: ".15s"
    }
  }, c.hero.headline.map((line, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "block"
    }
  }, line))), /*#__PURE__*/React.createElement("div", {
    className: "hp-rise hero-ctas",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      margin: corner ? "28px 0 0" : "34px 0 0",
      justifyContent: corner ? "flex-start" : "center",
      animationDelay: ".35s"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => navigate && navigate("/booking")
  }, c.hero.cta1), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => navigate && navigate("/lab")
  }, c.hero.cta2)), corner && /*#__PURE__*/React.createElement("div", {
    className: "hp-rise",
    style: {
      margin: "40px 0 0",
      maxWidth: "40ch",
      borderTop: "1px solid var(--border-soft)",
      animationDelay: ".5s"
    }
  }, c.hero.pillars.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.mark,
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      padding: "15px 0",
      borderBottom: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      color: "var(--accent)",
      border: "1px solid var(--accent)",
      borderRadius: "9999px",
      width: 26,
      height: 26,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: 1
    }
  }, p.mark), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      fontWeight: 600,
      color: "var(--fg)",
      letterSpacing: "-.01em"
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      lineHeight: 1.55,
      marginTop: 3
    }
  }, p.desc)))))), !corner && /*#__PURE__*/React.createElement("ul", {
    className: "pillars hp-rise",
    style: {
      listStyle: "none",
      padding: "26px 0 0",
      margin: "52px 0 0",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      borderTop: "1px solid var(--border-soft)",
      animationDelay: ".55s"
    }
  }, c.hero.pillars.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.mark,
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--accent)",
      border: "1px solid var(--border)",
      borderRadius: "9999px",
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, p.mark), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      fontWeight: 500,
      margin: "3px 0 4px",
      color: "var(--fg)"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--muted)",
      margin: 0,
      lineHeight: 1.5
    }
  }, p.desc))))), /*#__PURE__*/React.createElement("p", {
    className: "scrollcue",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--meta)",
      marginTop: "clamp(32px, 5vh, 60px)",
      alignSelf: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mouse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "arw"
  }, "\u2193"), " ", c.hero.cue)));
}
function SectionHead({
  c,
  cta,
  onCta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: eyebrowRow
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: eye
  }, c.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, c.title)), cta && /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: onCta
  }, cta, " \u2192"));
}

// --- 01 About (orange) — who I am, end to end ---
function About({
  c,
  navigate
}) {
  const a = c.about;
  return /*#__PURE__*/React.createElement(Section, {
    field: "orange",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: a,
    cta: a.cta,
    onCta: () => navigate && navigate("/about")
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 12px",
      color: "var(--accent)"
    }
  }, a.kicker), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
      lineHeight: 1.24,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      maxWidth: "22ch",
      margin: 0,
      fontWeight: 400
    }
  }, a.lead), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: "clamp(1rem, 1.4vw, 1.12rem)",
      lineHeight: 1.85,
      color: "var(--fg-2)",
      maxWidth: "50ch",
      margin: "22px 0 0"
    }
  }, a.summary), /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "42px 0 16px"
    }
  }, c.__ === "en" ? "CAPABILITY · DESIGN TO ARCHITECTURE" : "能力光譜 · 設計到架構一手包"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: 12
    }
  }, a.spectrum.map((st, i) => {
    const op = 0.4 + 0.6 * (i / (a.spectrum.length - 1));
    return /*#__PURE__*/React.createElement("div", {
      key: st.t,
      style: {
        border: "1px solid var(--border-soft)",
        borderRadius: 16,
        padding: "16px 16px 18px",
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "var(--accent)",
        opacity: op
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "var(--accent)",
        opacity: op
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: ".1em",
        color: "var(--meta)"
      }
    }, String(i + 1).padStart(2, "0")), i < a.spectrum.length - 1 ? /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        marginLeft: "auto",
        color: "var(--meta)",
        fontSize: 13
      }
    }, "\u2192") : null), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 16,
        fontWeight: 600,
        color: "var(--fg)"
      }
    }, c.__ === "en" ? st.en : st.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "var(--muted)",
        lineHeight: 1.6,
        marginTop: 5
      }
    }, c.__ === "en" ? st.sEn : st.s));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 30
    }
  }, a.highlights.map((hl, i) => /*#__PURE__*/React.createElement("div", {
    key: hl.k,
    style: {
      border: i === 0 ? "1px solid var(--accent)" : "1px solid var(--border-soft)",
      borderRadius: 16,
      padding: "14px 18px",
      background: "var(--surface)",
      minWidth: 150
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: ".08em",
      color: "var(--accent)"
    }
  }, hl.k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14.5,
      color: "var(--fg)",
      marginTop: 5
    }
  }, hl.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 24
    }
  }, ["C# / .NET", "Vue / React", "Node / NestJS", "Kubernetes", "AWS · GCP"].map(x => /*#__PURE__*/React.createElement(Badge, {
    key: x,
    variant: "chip"
  }, x))));
}

// --- 02 Lab (blue) — project archive, growth arc ---
function PROJECTS(c) {
  const en = c.__ === "en";
  return [{
    id: "r-analysis",
    era: en ? "Rookie" : "青澀期",
    title: "R 分析",
    en: "R Analysis",
    tag: en ? "Modeling cart-button impact, visualized with VanillaJS." : "以 R 建立購物車按鍵影響因素模型，VanillaJS 呈現互動洞察。",
    stack: ["R", "VanillaJS"],
    link: "https://awtw.github.io/R_page/",
    summary: en ? "An analysis model built in R exploring how cart-button design affects conversion, paired with VanillaJS interactive visualization." : "以 R 建立分析模型，探討購物車按鍵設計對購買轉換的影響，並以 VanillaJS 做互動式視覺化，輔助決策與迭代。",
    points: en ? ["Model assumptions & variable selection", "Experiment design & A/B comparison", "Visualization & insight synthesis"] : ["模型假設與變數選擇", "實驗設計與 A/B 比較", "視覺化呈現與洞察整理"]
  }, {
    id: "power-bi",
    era: en ? "Rookie" : "青澀期",
    title: "Power BI 關聯探索",
    en: "Power BI Explorer",
    tag: en ? "Python + Power BI exploring market, employment & disease data." : "以 Python 與 Power BI 探索市場、就業與疾病資料的潛在關聯。",
    stack: ["Python", "Power BI"],
    link: null,
    summary: en ? "Using open data to explore potential links between stock/employment markets and diseases — Python for feature engineering, Power BI for interactive dashboards." : "以公開資料探索股市、就業市場變化與特定疾病之間的潛在關聯；Python 做資料處理與特徵工程，Power BI 建互動式儀表板。",
    points: en ? ["Data cleaning & feature engineering", "Metric & time-series visualization", "Filter & interactive analysis"] : ["資料清理與特徵工程", "指標與時間序列視覺化", "篩選與交互分析"]
  }, {
    id: "experimentlab",
    era: en ? "Explore" : "探索期",
    title: "醫學分析原型平台",
    en: "ExperimentLab",
    tag: en ? "A prototype platform helping doctors build basic prediction models." : "協助醫師建立研究原型與基礎預測模型的醫學分析平台。",
    stack: ["Vue 3", "UI/UX", "Analysis"],
    link: "https://experimentlab.online/#/",
    summary: en ? "A prototype platform for doctors applying for research grants — building initial prediction models from indicators like dialysis level or gene expression to assess risk trends." : "協助醫師在申請研究計畫時使用的原型平台，透過覆膜透析程度、基因表現等指標建立初步預測模型，評估疾病惡化或好轉的風險趨勢。",
    points: en ? ["Indicator visualization & trend tracking", "Base model estimation with tunable params", "Research report logging & export"] : ["指標資料視覺化與趨勢追蹤", "基礎模型推估與可調參數", "記錄與匯出研究用報表"]
  }, {
    id: "1914",
    era: en ? "Brand" : "品牌期",
    title: "1914 精油品牌官網",
    en: "1914 Aroma Brand",
    tag: en ? "Self-founded aroma brand — identity, formulas & chatbot support." : "自創精油品牌官網與客服自動化，整合品牌設計、配方與 Chatbot。",
    stack: ["VanillaJS", "LINE / Messenger", "Dialogflow", "Heroku"],
    link: "https://1914.augustwang.com/",
    summary: en ? "An aroma brand I founded during civil service — naming, logo, packaging, formula R&D and support automation, all done solo, fusing my biochem background with design and engineering." : "替代役期間自創的精油品牌，從命名、Logo、包裝、配方研發到客服自動化全程獨立完成，把生化背景與設計、工程能力整合為一致的品牌體驗。",
    points: en ? ["Science-led fragrance formulas", "Consistent visual system (logo, packaging)", "24/7 chatbot support (LINE, Messenger)"] : ["以科學方法開發香氛配方", "一致的視覺系統（Logo、包裝）", "聊天機器人 24/7 客服（LINE、Messenger）"]
  }, {
    id: "shuyan-art",
    era: en ? "Brand" : "品牌期",
    title: "shuyan_art 設計接案平台",
    en: "shuyan_art",
    tag: en ? "A portfolio & inquiry site for a design studio." : "為設計接案品牌打造的作品展示與接案入口，聚焦視覺質感與轉換動線。",
    stack: ["Next.js", "UI/UX"],
    link: "https://www.shuyan.art/",
    summary: en ? "A work-showcase and inquiry entry for a design freelancer brand, focused on visual quality, service presentation and conversion flow." : "為設計接案品牌打造的作品展示與接案入口，聚焦視覺質感、服務呈現與轉換動線。",
    points: en ? ["Portfolio-led layout", "Service presentation", "Conversion-focused flow"] : ["以作品為主的版面", "服務呈現", "聚焦轉換的動線"]
  }, {
    id: "crm-series",
    era: en ? "Product" : "產品期",
    title: "CRM 設計系列",
    en: "CRM Series",
    tag: en ? "Login/permission/list/form CRM prototypes — IA & task flow." : "登入、權限、清單、表單與流程引導的 CRM 原型系列，聚焦資訊架構與動線。",
    stack: ["VanillaJS", "Next.js", "Vercel", "UI/UX"],
    link: "https://crmdev.8plus.app/en",
    summary: en ? "Multi-version CRM prototypes covering login/permission, list search, form editing and flow guidance — with a componentized IA and reusable list/form skeletons." : "針對不同情境設計多版 CRM 原型，涵蓋登入/權限、清單檢索、表單編輯、流程引導，強調資訊架構與操作動線的清晰性。",
    points: en ? ["Consistent design language & components", "Task-oriented pages & flows", "Extensible list/form for permissions & states"] : ["一致的設計語言與元件系統", "以任務為導向的頁面與操作流", "可擴充的列表/表單架構，支援權限與狀態"]
  }, {
    id: "ecommerce-dashboard",
    era: en ? "Product" : "產品期",
    title: "電商管理後台",
    en: "Commerce Dashboard",
    tag: en ? "Modern admin for SMB e-commerce — orders, inventory, analytics." : "為中小型電商打造的現代化管理後台，整合訂單、庫存與數據分析。",
    stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL"],
    link: null,
    summary: en ? "A full management suite for SMB e-commerce — unifying scattered order, inventory and customer data into one real-time, multi-tenant platform." : "為中小型電商打造的完整管理解決方案，把分散的訂單、庫存與客戶資料整合成即時、多租戶的統一平台。",
    points: en ? ["Order processing efficiency +45%", "Inventory error rate −60%", "Multi-tenant, scalable to 1000+ merchants"] : ["訂單處理效率提升 45%", "庫存錯誤率降低 60%", "多租戶架構，可擴展至 1000+ 商家"]
  }, {
    id: "flash-sale-api",
    era: en ? "Scale" : "規模期",
    title: "Flash Sale API",
    en: "Flash Sale API",
    tag: en ? "High-concurrency flash-sale backend — no oversell under load." : "面向高併發限量搶購的後端 API，透過鎖、佇列與快取避免超賣。",
    stack: ["NestJS", "PostgreSQL", "Redis", "RabbitMQ"],
    link: "https://github.com/awtw/flash-sale-api",
    summary: en ? "A backend designed for high-concurrency limited-stock sales — guaranteeing no oversell and stock consistency under extreme traffic." : "針對「高併發限量搶購」設計，確保極端流量下不超賣，維持庫存一致性與系統穩定。",
    points: en ? ["Row locks for race conditions", "RabbitMQ queue load shedding", "Redis cache + rate limiting"] : ["行鎖處理競態條件", "RabbitMQ 佇列削峰", "Redis 快取加速 + 限流"]
  }, {
    id: "smart-community-backend",
    era: en ? "Scale" : "規模期",
    title: "智慧社區後端",
    en: "Smart Community Backend",
    tag: en ? ".NET backend for smart communities — residents, devices, events." : "面向智慧社區的 .NET 後端服務，涵蓋住戶、設備、事件通報與通知中心。",
    stack: [".NET", "PostgreSQL", "Redis", "Docker"],
    link: "https://github.com/awtw/SmartCommunityBackEnd",
    summary: en ? "A layered .NET backend for smart-community apps across residents, devices, events and notifications — built for reliability and observability." : "以 .NET 分層架構建置的智慧社區後端，涵蓋住戶、設備、事件通報與通知等核心模組，強調可靠性與可觀測性。",
    points: en ? ["User / resident / permission modules", "Device & sensor data collection", "Reporting workflow & notification center"] : ["使用者／住戶／權限管理", "設備與感測資料收集", "通報工作流程與通知中心"]
  }, {
    id: "b18",
    era: en ? "Brand" : "品牌形象",
    title: "b18 品牌官網",
    en: "b18 Brand Site",
    tag: en ? "Brand site for a fashion designer — identity, story, IG flow." : "為新創服裝設計師打造的品牌官網，整合視覺語彙、品牌故事與社群導流。",
    stack: ["Next.js", "Vercel", "Instagram", "UI/UX"],
    link: "https://b18.8plus.app/",
    summary: en ? "A lightweight brand site for a new fashion designer — building identity, product narrative and Instagram flow on a tight budget and timeline." : "為新創服裝設計師打造的輕量品牌官網，在有限預算與時程內同時建立視覺識別、產品敘事與 Instagram 導流。",
    points: en ? ["Layout & whitespace to elevate the brand", "Social CTAs driving to purchase", "Launched within 2 weeks"] : ["以版型與留白凸顯品牌質感", "導購節點導流至社群與購買", "2 週內上線"]
  }, {
    id: "e-cooperative",
    era: en ? "Now" : "現在",
    title: "光復協作平台",
    en: "e-cooperative",
    tag: en ? "Disaster-relief coordination platform for Guangfu, Hualien." : "為花蓮光復災害協作打造的資訊整合與資源媒合平台，聚焦快速上線。",
    stack: ["Next.js", "Vercel", "Flask API", "UI/UX"],
    link: "https://www.hopenet-gf.com",
    summary: en ? "A coordination platform launched via community and volunteers after the 2025 Guangfu barrier-lake disaster — integrating information and matching resources." : "2025/09 花蓮光復馬太鞍溪堰塞湖災害後，透過社群與志工串聯啟動的協作平台，整合資訊、提升溝通效率並協助資源媒合。",
    points: en ? ["Standardized model for multi-source info", "Volunteer & resident matching", "Lightweight, fast to launch & iterate"] : ["多來源災情資訊標準化資料模型", "志工與居民互助媒合機制", "輕量可維護、快速上線迭代"]
  }, {
    id: "8plus",
    era: en ? "Now" : "現在",
    title: "8plus 諮詢平台",
    en: "8plus Platform",
    tag: en ? "Booking-first consulting platform, Google Calendar." : "以預約為核心的技術諮詢平台，整合 Google Calendar。",
    stack: ["Next.js", "Vercel", "GCal API", "UI/UX"],
    link: "https://8plus.app/",
    summary: en ? "My own consulting platform — an editorial site with a booking flow, focused on career and engineering conversations with high conversion." : "結合多年產品與開發經驗打造的諮詢預約平台，聚焦職涯與程式開發的深度討論，並以高轉換的預約流程為核心。",
    points: en ? ["Systematic booking, GCal integrated", "Goal-centered consulting framework", "Minimal UI, low friction, high completion"] : ["系統化預約流程，Google Calendar 無縫整合", "以使用者目標為中心的諮詢框架", "極簡介面、降低門檻、提升完成率"]
  }];
}
var LAB_IMG = {
  "r-analysis": 1,
  "experimentlab": 1,
  "1914": 1,
  "shuyan-art": 1,
  "crm-series": 1,
  "flash-sale-api": 1,
  "smart-community-backend": 1,
  "b18": 1,
  "e-cooperative": 1,
  "8plus": 1
};
function labImg(id) {
  if (id === "power-bi") return "labs/power-bi/powerbi.jpeg";
  return LAB_IMG[id] ? "labs/" + id + "/web.png" : null;
}
function Lab({
  c,
  navigate,
  page
}) {
  const projects = PROJECTS(c);
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.lab,
    cta: page ? null : c.lab.cta,
    onCta: () => navigate && navigate("/lab")
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 22px"
    }
  }, c.__ === "en" ? "FROM RAW HTML → MOTION CRAFT → BRAND COMMERCE" : "從青澀無框架 → 設計感動畫 → 商業電商／品牌形象"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridAutoRows: "1fr",
      gap: 16
    },
    className: "grid-2"
  }, projects.map(p => {
    const img = labImg(p.id);
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      onClick: () => navigate && navigate("/lab/" + p.id),
      style: {
        cursor: "pointer",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      variant: "highlight",
      style: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 150,
        borderRadius: 12,
        marginBottom: 14,
        border: "1px solid var(--border-soft)",
        backgroundColor: "var(--surface)",
        backgroundImage: img ? "url(" + img + ")" : "repeating-linear-gradient(135deg, var(--surface) 0 14px, transparent 14px 28px)",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }
    }), /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "chip"
    }, p.era), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: "var(--accent)",
        fontFamily: "var(--font-mono)",
        fontSize: 13
      }
    }, "\u2197")), /*#__PURE__*/React.createElement(CardTitle, {
      style: {
        marginTop: 10
      }
    }, c.__ === "en" ? p.en : p.title), /*#__PURE__*/React.createElement(CardDescription, null, p.tag)), /*#__PURE__*/React.createElement(CardContent, {
      style: {
        marginTop: "auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap"
      }
    }, p.stack.map(s => /*#__PURE__*/React.createElement(Badge, {
      key: s,
      variant: "chip"
    }, s))))));
  })));
}

// --- 04 Services (blue) ---
function SERVICES_DATA(c) {
  const en = c.__ === "en";
  return [{
    id: "architecture",
    mark: "A",
    title: en ? "Architecture consulting" : "程式架構諮詢",
    desc: en ? "System boundaries, stack choices, scalable architecture" : "系統邊界、技術選型、可擴展與可維護的架構設計",
    includes: en ? ["System boundary & domain modeling", "Stack selection & trade-offs", "Scalability & reliability review"] : ["系統邊界與領域建模", "技術選型與取捨分析", "可擴展性與可靠度健檢"],
    process: en ? ["Discovery", "Architecture design", "Review & handoff"] : ["需求探索 Discovery", "架構設計", "檢視與知識轉移"],
    deliverables: en ? ["Architecture diagram", "Decision records (ADR)", "Delivery roadmap"] : ["架構圖", "決策紀錄 ADR", "落地路線圖"]
  }, {
    id: "webdev",
    mark: "B",
    title: en ? "Web development" : "網站開發",
    desc: en ? "Next.js full-stack delivery and iterative shipping" : "Next.js 全端開發、生產級交付與迭代上線",
    includes: en ? ["Full-stack Next.js build", "Production-grade delivery", "Iterative release"] : ["Next.js 全端開發", "生產級交付", "迭代上線"],
    process: en ? ["Scope & design", "Build & review", "Ship & iterate"] : ["範疇與設計", "開發與 Code Review", "上線與迭代"],
    deliverables: en ? ["Production site", "CI/CD pipeline", "Handover docs"] : ["上線網站", "CI/CD 流程", "交接文件"]
  }, {
    id: "design",
    mark: "C",
    title: en ? "Design packages" : "設計包案",
    desc: en ? "End-to-end design from IA to visual language" : "從資訊架構到視覺語言的完整設計落地",
    includes: en ? ["Brand & visual language", "Bespoke UI & motion", "Design system"] : ["品牌與視覺語言", "客製 UI 與動效", "設計系統"],
    process: en ? ["Direction", "Design", "System & handoff"] : ["方向定調", "視覺設計", "系統化與交付"],
    deliverables: en ? ["Design system", "High-fidelity screens", "Motion specs"] : ["設計系統", "高保真畫面", "動效規格"]
  }, {
    id: "planning",
    mark: "D",
    title: en ? "Information planning" : "整體資訊規劃",
    desc: en ? "Content models, navigation IA, conversion flows" : "內容模型、導覽 IA、轉換動線的系統性規劃",
    includes: en ? ["Content modeling", "Navigation IA", "Conversion flow"] : ["內容模型", "導覽 IA", "轉換動線"],
    process: en ? ["Audit", "Structure", "Validate"] : ["現況盤點", "結構規劃", "驗證"],
    deliverables: en ? ["Sitemap & IA", "Content model", "Flow maps"] : ["網站地圖與 IA", "內容模型", "動線圖"]
  }];
}
function Services({
  c,
  navigate,
  page
}) {
  const items = SERVICES_DATA(c);
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.services,
    cta: page ? null : c.services.cta,
    onCta: () => navigate && navigate("/services")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16
    },
    className: "grid-2"
  }, items.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    onClick: () => navigate && navigate("/services/" + item.id),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "highlight"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    style: {
      alignSelf: "flex-start"
    }
  }, item.mark, " \xB7 SERVICE"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--accent)",
      fontFamily: "var(--font-mono)",
      fontSize: 13
    }
  }, "\u2197")), /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      marginTop: 10
    }
  }, item.title), /*#__PURE__*/React.createElement(CardDescription, null, item.desc)))))));
}

// --- Journal removed in v2 (no articles yet) ---

// --- 03 Path (orange) — career timeline summary ---
function PathSec({
  c,
  navigate,
  page
}) {
  return /*#__PURE__*/React.createElement(Section, {
    field: "orange",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.path,
    cta: page ? null : c.path.cta,
    onCta: () => navigate && navigate("/path")
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
      lineHeight: 1.4,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      maxWidth: "30ch",
      margin: "0 0 34px"
    }
  }, c.path.lead), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      position: "relative",
      borderLeft: "1px solid var(--border-soft)",
      display: "flex",
      flexDirection: "column",
      gap: 26
    }
  }, c.path.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.year + it.title,
    className: "path-row",
    style: {
      position: "relative",
      paddingLeft: 28,
      display: "grid",
      gridTemplateColumns: "120px 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: -5,
      top: 7,
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: it.active ? "var(--accent)" : "var(--bg)",
      border: it.active ? "none" : "1.5px solid var(--meta)",
      boxShadow: it.active ? "0 0 12px 2px rgba(254,80,0,.55)" : "none"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 20,
      color: it.active ? "var(--accent)" : "var(--fg)",
      lineHeight: 1
    }
  }, it.year), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: ".06em",
      color: "var(--meta)",
      marginTop: 5
    }
  }, it.period)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: 500,
      fontSize: 17,
      color: "var(--fg)"
    }
  }, it.title, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 400,
      color: "var(--muted)",
      marginLeft: 10
    }
  }, it.sub)), it.desc ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 13.5,
      lineHeight: 1.55,
      color: "var(--muted)",
      maxWidth: "52ch"
    }
  }, it.desc) : null, it.tags && it.tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginTop: 8
    }
  }, it.tags.map(tg => /*#__PURE__*/React.createElement(Badge, {
    key: tg,
    variant: "chip"
  }, tg))) : null)))));
}

// --- cal.com month_view embed replica (calLink august-wang-113/30min) ---
const CAL = {
  link: "cal.com/august-wang-113/30min",
  brand: "#FE5000",
  ink: "#1A1A1A",
  sub: "#6B7280",
  line: "#E5E7EB",
  soft: "#F3F4F6",
  bg: "#FFFFFF"
};
function IconClock() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2",
    strokeLinecap: "round"
  }));
}
function IconCam() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "6",
    width: "13",
    height: "12",
    rx: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 8l-5 4 5 4V8z",
    strokeLinejoin: "round"
  }));
}
function IconGlobe() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"
  }));
}
function CalEmbed({
  lang
}) {
  const [loading, setLoading] = React.useState(true);
  const [sel, setSel] = React.useState(9);
  const [time, setTime] = React.useState(null);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  // July 2026 — 1st is a Wednesday (index 3, Sunday-start grid)
  const days = Array.from({
    length: 31
  }, (_, i) => i + 1);
  const lead = 3,
    today = 8;
  const avail = d => d >= today && [0, 6].indexOf((lead + d - 1) % 7) === -1; // weekdays from today
  const wd = lang === "en" ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["日", "一", "二", "三", "四", "五", "六"];
  const times = ["09:30", "10:00", "10:30", "11:30", "14:00", "15:30", "17:00"];
  const T = lang === "en" ? {
    name: "August Wang",
    ev: "30 Min Meeting",
    dur: "30m",
    vid: "Cal Video",
    tz: "Asia/Taipei",
    pick: "Thu 9",
    fmt: "Thursday, July 9",
    next: "Next",
    h12: "12h",
    h24: "24h",
    confirm: "Confirm",
    booked: "You're booked",
    again: "Pick another time"
  } : {
    name: "August Wang",
    ev: "30 分鐘諮詢",
    dur: "30 分鐘",
    vid: "Cal Video 視訊",
    tz: "台北 GMT+8",
    pick: "選 7/9",
    fmt: "7 月 9 日 週四",
    next: "下一步",
    h12: "12h",
    h24: "24h",
    confirm: "確認預約",
    booked: "預約完成",
    again: "換個時段"
  };
  const cell = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    borderRadius: 8,
    fontSize: 13.5,
    fontVariantNumeric: "tabular-nums"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      overflow: "hidden",
      border: "1px solid var(--border-soft)",
      background: CAL.bg,
      color: CAL.ink,
      position: "relative",
      boxShadow: "0 30px 80px -40px rgba(0,0,0,.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      borderBottom: `1px solid ${CAL.line}`,
      background: CAL.soft
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 9,
      background: "#E5E7EB"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 9,
      background: "#E5E7EB"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      color: CAL.sub,
      letterSpacing: ".02em"
    }
  }, CAL.link), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      color: CAL.sub
    }
  }, "Cal.com")), loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 420,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-spin",
    style: {
      width: 38,
      height: 38,
      margin: "0 auto 14px",
      borderRadius: "50%",
      border: `2px solid ${CAL.line}`,
      borderTopColor: CAL.brand
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: CAL.sub,
      margin: 0
    }
  }, lang === "en" ? "Loading calendar…" : "載入行事曆…"))) : done ? /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 420,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 54,
      height: 54,
      borderRadius: "50%",
      background: CAL.brand,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 12l5 5L20 6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 6px",
      fontSize: 20,
      letterSpacing: "-.02em"
    }
  }, T.booked), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: CAL.sub,
      fontSize: 14
    }
  }, T.ev, " \xB7 ", T.fmt, " \xB7 ", time), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 20px",
      color: CAL.sub,
      fontSize: 13
    }
  }, T.tz), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDone(false);
      setTime(null);
    },
    style: {
      padding: "10px 20px",
      borderRadius: 999,
      border: `1px solid ${CAL.line}`,
      background: "#fff",
      color: CAL.ink,
      fontSize: 13.5,
      cursor: "pointer"
    }
  }, T.again)) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: sel ? "216px 1fr 220px" : "220px 1fr",
      alignItems: "start"
    },
    className: "cal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px",
      borderRight: `1px solid ${CAL.line}`,
      width: 216
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: CAL.sub
    }
  }, T.name)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 14px",
      fontSize: 18,
      letterSpacing: "-.02em",
      color: CAL.ink
    }
  }, T.ev), [[/*#__PURE__*/React.createElement(IconClock, null), T.dur], [/*#__PURE__*/React.createElement(IconCam, null), T.vid], [/*#__PURE__*/React.createElement(IconGlobe, null), T.tz]].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      color: CAL.sub,
      fontSize: 13,
      margin: "9px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex"
    }
  }, r[0]), r[1]))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 22px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 15,
      letterSpacing: "-.01em"
    }
  }, lang === "en" ? "July 2026" : "2026 年 7 月"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, ["‹", "›"].map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: "none",
      background: CAL.soft,
      color: CAL.sub,
      cursor: "pointer",
      fontSize: 16
    }
  }, a)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      marginBottom: 4
    }
  }, wd.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      textAlign: "center",
      fontSize: 11,
      color: CAL.sub,
      fontWeight: 600,
      padding: "4px 0"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 2
    }
  }, Array.from({
    length: lead
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: "b" + i
  })), days.map(d => {
    const ok = avail(d),
      on = sel === d;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      onClick: () => ok && (setSel(d), setTime(null)),
      style: {
        ...cell,
        cursor: ok ? "pointer" : "default",
        background: on ? CAL.brand : ok ? CAL.soft : "transparent",
        color: on ? "#fff" : ok ? CAL.ink : "#C7CBD1",
        fontWeight: on ? 700 : d === today ? 700 : 500,
        boxShadow: d === today && !on ? `inset 0 0 0 1px ${CAL.brand}` : "none"
      }
    }, d);
  }))), time !== null || sel ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 16px",
      borderLeft: `1px solid ${CAL.line}`,
      display: sel ? "block" : "none",
      width: 219
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 13
    }
  }, T.fmt)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: `1px solid ${CAL.line}`,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 14,
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "4px 10px",
      background: CAL.ink,
      color: "#fff"
    }
  }, T.h12), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "4px 10px",
      color: CAL.sub
    }
  }, T.h24)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      maxHeight: 245,
      overflowY: "auto"
    }
  }, times.map(tm => time === tm ? /*#__PURE__*/React.createElement("div", {
    key: tm,
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      padding: "11px 0",
      textAlign: "center",
      borderRadius: 8,
      border: `1px solid ${CAL.line}`,
      color: CAL.sub,
      fontSize: 13.5
    }
  }, tm), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDone(true),
    style: {
      flex: 1,
      padding: "11px 0",
      borderRadius: 8,
      border: "none",
      background: CAL.brand,
      color: "#fff",
      fontSize: 13.5,
      cursor: "pointer",
      fontWeight: 600
    }
  }, T.next)) : /*#__PURE__*/React.createElement("button", {
    key: tm,
    onClick: () => setTime(tm),
    style: {
      padding: "11px 0",
      borderRadius: 8,
      border: `1px solid ${CAL.brand}`,
      background: "#fff",
      color: CAL.brand,
      fontSize: 13.5,
      cursor: "pointer",
      fontWeight: 600,
      transition: "var(--transition-base)"
    }
  }, tm)))) : null));
}

// --- 05 Booking (blue) — teaser on home, full vertical page on /booking ---
function Booking({
  c,
  navigate,
  full
}) {
  const services = c.__ === "en" ? ["Architecture review & stack selection", "AI integration feasibility", "Dev assistance & code review"] : ["架構健檢與技術選型", "AI 導入可行性評估", "開發協助與 Code Review"];
  const contacts = [{
    k: "LINE",
    v: "@482ykgdg",
    href: "#"
  }, {
    k: "INSTAGRAM",
    v: "@august.yan.terra",
    href: "#"
  }, {
    k: "GITHUB",
    v: "github.com/awtw",
    href: "https://github.com/awtw"
  }, {
    k: "LINKEDIN",
    v: "shuyan-wang",
    href: "https://www.linkedin.com/in/shuyan-wang-0b9370141"
  }];
  const status = /*#__PURE__*/React.createElement(Badge, {
    variant: "status"
  }, "Available for consulting");
  const covered = /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      border: "1px solid var(--border-soft)",
      background: "var(--surface)",
      padding: 22,
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 14px"
    }
  }, c.__ === "en" ? "The call covers" : "諮詢包含"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, services.map(s => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      fontSize: 14.5,
      color: "var(--fg-2)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 7,
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--accent)",
      flexShrink: 0
    }
  }), s))));
  const contactGrid = /*#__PURE__*/React.createElement("div", {
    className: "contact-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, contacts.map(ch => /*#__PURE__*/React.createElement("a", {
    key: ch.k,
    href: ch.href,
    target: ch.href.charAt(0) === "#" ? undefined : "_blank",
    rel: "noreferrer",
    style: {
      border: "1px solid var(--border-soft)",
      borderRadius: 14,
      padding: "10px 14px",
      background: "var(--surface)",
      display: "block",
      transition: "var(--transition-base)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: ".14em",
      color: "var(--accent)"
    }
  }, ch.k), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      color: "var(--fg-2)",
      marginTop: 4,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, ch.v))));
  const lead = mw => /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
      lineHeight: 1.35,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      maxWidth: mw,
      margin: "0 0 24px"
    }
  }, c.booking.lead);
  const specRow = {
    display: "flex",
    alignItems: "center",
    gap: 9,
    color: "var(--fg-2)",
    fontSize: 14,
    margin: "10px 0"
  };
  if (full) {
    return /*#__PURE__*/React.createElement(Section, {
      field: "blue",
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center"
      },
      innerStyle: {
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 820,
        margin: "0 auto",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, status), /*#__PURE__*/React.createElement(SectionHead, {
      c: c.booking
    }), lead("40ch"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement(CalEmbed, {
      lang: c.__
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, covered), contactGrid));
  }
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1060,
      margin: "0 auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, status), /*#__PURE__*/React.createElement(SectionHead, {
    c: c.booking
  }), lead("52ch"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      alignItems: "stretch",
      marginTop: 4
    },
    className: "grid-2"
  }, covered, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      border: "1px solid var(--border-soft)",
      background: "var(--surface)",
      padding: "28px 26px",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 6px",
      color: "var(--accent)"
    }
  }, c.__ === "en" ? "Online booking" : "線上預約"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "clamp(1.5rem,2.4vw,2rem)",
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      margin: "0 0 18px"
    }
  }, c.__ === "en" ? "30-min consultation" : "30 分鐘諮詢"), /*#__PURE__*/React.createElement("div", {
    style: specRow
  }, /*#__PURE__*/React.createElement(IconClock, null), c.__ === "en" ? "30 minutes" : "30 分鐘"), /*#__PURE__*/React.createElement("div", {
    style: specRow
  }, /*#__PURE__*/React.createElement(IconCam, null), c.__ === "en" ? "Cal Video" : "Cal Video 視訊"), /*#__PURE__*/React.createElement("div", {
    style: specRow
  }, /*#__PURE__*/React.createElement(IconGlobe, null), c.__ === "en" ? "Asia/Taipei" : "台北 GMT+8"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate && navigate("/booking")
  }, c.booking.cta)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, contactGrid)));
}
function Home({
  lang,
  navigate
}) {
  const c = {
    ...COPY[lang],
    __: lang
  };
  c.lab.__ = lang;
  c.services.__ = lang;
  const cc = {
    ...c,
    lab: {
      ...c.lab,
      __: lang
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    c: c,
    navigate: navigate
  }), /*#__PURE__*/React.createElement(About, {
    c: c,
    navigate: navigate
  }), /*#__PURE__*/React.createElement(Lab, {
    c: cc,
    navigate: navigate
  }), /*#__PURE__*/React.createElement(PathSec, {
    c: c,
    navigate: navigate
  }), /*#__PURE__*/React.createElement(Services, {
    c: c,
    navigate: navigate
  }), /*#__PURE__*/React.createElement(Booking, {
    c: c,
    navigate: navigate
  }));
}

// ---------- sub-page helpers ----------
const shotStyle = {
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: 18,
  border: "1px solid var(--border-soft)",
  background: "repeating-linear-gradient(135deg, var(--surface) 0 16px, transparent 16px 32px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: ".14em",
  color: "var(--meta)"
};
function DetailCol({
  title,
  items,
  ordered
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 12px"
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: it,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      fontSize: 14.5,
      color: "var(--fg-2)",
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--accent)",
      flexShrink: 0,
      marginTop: 2,
      minWidth: 16
    }
  }, ordered ? String(i + 1).padStart(2, "0") : "·"), it))));
}

// --- LAB detail: single project ---
function LabDetail({
  c,
  id,
  navigate
}) {
  const en = c.__ === "en";
  const list = PROJECTS(c);
  const p = list.find(x => x.id === id) || list[0];
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      alignItems: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "chip"
  }, p.era), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/lab"),
    style: {
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: ".06em",
      color: "var(--muted)"
    }
  }, "\u2190 ", en ? "All work" : "所有作品")), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...h2,
      margin: 0
    }
  }, en ? p.en : p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
      lineHeight: 1.8,
      color: "var(--fg-2)",
      maxWidth: "54ch",
      margin: "16px 0 0"
    }
  }, p.summary), labImg(p.id) ? /*#__PURE__*/React.createElement("img", {
    src: labImg(p.id),
    alt: (en ? p.en : p.title) + " screenshot",
    style: {
      width: "100%",
      borderRadius: 18,
      border: "1px solid var(--border-soft)",
      margin: "28px 0 0",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      ...shotStyle,
      margin: "28px 0 0"
    }
  }, en ? "PROJECT SHOT" : "作品截圖 / SCREENSHOT"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 28,
      marginTop: 30,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(DetailCol, {
    title: en ? "WHAT I DID" : "我做了什麼",
    items: p.points
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 12px"
    }
  }, en ? "STACK" : "技術棧"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, p.stack.map(s => /*#__PURE__*/React.createElement(Badge, {
    key: s,
    variant: "chip"
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/booking")
  }, en ? "Talk about a similar project" : "聊聊類似專案"), p.link ? /*#__PURE__*/React.createElement("a", {
    href: p.link,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, en ? "View live ↗" : "查看線上作品 ↗")) : null))));
}

// --- SERVICES detail: single service ---
function ServiceDetail({
  c,
  id,
  navigate
}) {
  const en = c.__ === "en";
  const list = SERVICES_DATA(c);
  const s = list.find(x => x.id === id) || list[0];
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      alignItems: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Badge, null, s.mark, " \xB7 SERVICE"), /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/services"),
    style: {
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: ".06em",
      color: "var(--muted)"
    }
  }, "\u2190 ", en ? "All services" : "所有服務")), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...h2,
      margin: 0
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
      lineHeight: 1.8,
      color: "var(--fg-2)",
      maxWidth: "54ch",
      margin: "16px 0 0"
    }
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 28,
      marginTop: 34,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(DetailCol, {
    title: en ? "INCLUDES" : "服務包含",
    items: s.includes
  }), /*#__PURE__*/React.createElement(DetailCol, {
    title: en ? "PROCESS" : "合作流程",
    items: s.process,
    ordered: true
  }), /*#__PURE__*/React.createElement(DetailCol, {
    title: en ? "DELIVERABLES" : "交付產出",
    items: s.deliverables
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/booking")
  }, en ? "Book a 30-min call" : "預約 30 分鐘諮詢")));
}

// --- JOURNAL: reserved route ---
function JournalSoon({
  lang,
  navigate
}) {
  const en = lang === "en";
  return /*#__PURE__*/React.createElement(Section, {
    field: "orange",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    innerStyle: {
      width: "100%",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      justifyContent: "center",
      display: "flex"
    }
  }, "05 \xB7 JOURNAL"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...h2,
      margin: "10px 0 0"
    }
  }, en ? "Journal" : "心法與思考"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted)",
      margin: "16px auto 0",
      fontSize: 16,
      maxWidth: "40ch",
      lineHeight: 1.7
    }
  }, en ? "Articles are on the way — this route is reserved for the journal." : "文章即將上線，此路由已為部落格預留。"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => navigate("/")
  }, en ? "Back home" : "回首頁")));
}

// --- ABOUT full page: polished life story (from docs/StoryAboutMe.md) ---
function ABOUT_STORY(c) {
  const en = c.__ === "en";
  return en ? {
    kicker: "AUGUST WANG · awtw · SELF-TAUGHT ENGINEER",
    headline: "A self-driven path — from biomed to full-stack and cloud",
    lead: "I am August (awtw). A lifelong self-learner who followed curiosity — and an eye for craft — from biomedical science and chemistry all the way into full-stack and cloud engineering.",
    chapters: [{
      no: "01",
      eye: "ORIGINS",
      title: "Self-learning & an eye for craft",
      body: "Family expectations led me through many fields, but I kept searching for what I actually cared about. Art competitions as a kid built an instinct and stubbornness for aesthetics; a biology-and-chemistry major came easily, yet I realized early it was not the direction I wanted to commit to."
    }, {
      no: "02",
      eye: "THE TURN",
      title: "NCTU and my first lines of code",
      body: "At NCTU's Molecular Medicine & Bioengineering institute I worked in a CS lab on gene sequencing and bio-analysis with R and Python, while taking as many CS courses as I could. In one class project I shipped a full front-to-back feature solo — that got a professor's endorsement and my first real commissions. From there I taught myself the stack: HTML, CSS, JavaScript, PHP, then Angular, React, Vue, and Express.js on the backend."
    }, {
      no: "03",
      eye: "BUILDING",
      title: "Civil service & my own brand",
      body: "During alternative service I spent every evening sharpening CS fundamentals and building a portfolio — even launching my own brand, ‘1914’, integrating LINE, Facebook Chatbot and Google Dialogflow into an intent-recognition support bot deployed on Heroku."
    }, {
      no: "04",
      eye: "CHALLENGE",
      title: "Backend-only, and leading adoption",
      body: "After service I chose to challenge a backend-only engineer role, passed the assessment with top marks, and earned room to explore. It sharpened my direction: keep learning, lead the adoption of new tech, and build a problem-solving mindset."
    }, {
      no: "05",
      eye: "IN THE FIELD",
      title: "E-commerce & SaaS at scale",
      body: "In e-commerce I went deep on B2C product challenges and shipped the fundamentals: SLA and 7×24 assurance, failover and resilience, blue-green and progressive delivery, SaaS architecture with tenant isolation, cloud cost optimization, cross-border deployment and compliance, plus Git Flow, feature toggles and Grafana monitoring. I also led a frontend overhaul, driving componentization and a shared npm library across teams."
    }, {
      no: "06",
      eye: "NOW",
      title: "Freelance & an architecture-first belief",
      body: "Today I freelance across design, frontend and backend, with end-to-end UI/UX and full-stack range. I firmly believe good architecture creates long-term value for a business — far more than the short-term win of rushing to launch. That has been my biggest lesson."
    }],
    belief: "Good architecture creates lasting value — far beyond the short-term win of rushing to launch.",
    interestsTitle: "OFF THE CLOCK",
    interestsLead: "Outside work I am still curious and many-sided, and still learning how to balance life with the craft.",
    interests: ["Choir & singing", "Gymnastics", "Certified spin coach", "Binge-watching"],
    cta: "Book a call"
  } : {
    kicker: "AUGUST WANG · awtw · 自學驅動的工程師",
    headline: "自學驅動的工程之路——從生醫到全端與雲端",
    lead: "我是 August（awtw）。一個從小熱愛自學的人，靠好奇心與對美感的執著，一路從生醫、化學走到全端與雲端工程。",
    chapters: [{
      no: "01",
      eye: "起點",
      title: "自學與美感",
      body: "因為家庭期待，我曾在許多領域嘗試，卻始終在自學裡尋找真正的熱情。小時候常參加藝術比賽，養成對美感與設計的直覺與執著；大學主修生物與化學，成績不錯，卻很早意識到那不是我想長期投入的方向。"
    }, {
      no: "02",
      eye: "轉向",
      title: "交大與第一行程式",
      body: "進入交大分子醫學與生物工程所後，我在資工實驗室專注基因定序與生物分析，用 R 與 Python 處理數據，同時選修大量資工課程。一次課堂專案裡，我獨力完成了前後端整合的需求，得到教授肯定、開始承接真實案子——從此正式踏上自學程式的路：HTML、CSS、JavaScript、PHP，到 Angular、React、Vue，再到 Express.js 後端。"
    }, {
      no: "03",
      eye: "累積",
      title: "替代役與自建品牌",
      body: "替代役期間，我每天下班後補強資工知識、累積作品集，甚至建立了自己的品牌「1914」，整合 LINE、Facebook Chatbot 與 Google Dialogflow，開發語意辨識客服機器人並部署上 Heroku。"
    }, {
      no: "04",
      eye: "挑戰",
      title: "純後端與主導技術",
      body: "退伍後，我選擇挑戰純後端工程師職位，高分通過考核，也獲得探索與發揮的空間。這段經歷讓我更清楚自己的方向：持續學習、主導新技術導入、建立解決問題的思維。"
    }, {
      no: "05",
      eye: "實戰",
      title: "電商與 SaaS 的架構體悟",
      body: "進入電商產業後，我深入 B2C 的商業需求與產品挑戰，並在實務中落地關鍵能力：SLA 與 7×24 服務保障、故障切換與韌性設計、藍綠部署與漸進式發布、SaaS 架構與租戶隔離、雲端成本優化、跨國部署與法規合規，以及 Git Flow、Feature Toggle、Grafana 監控等工程實踐。我也主導過前端大改版，推動元件化與共用 npm library，建立跨部門的開發模式。"
    }, {
      no: "06",
      eye: "現在",
      title: "自由接案與架構觀",
      body: "如今我以自由接案協助團隊，從設計、前端到後端，發展出完整的 UI/UX 與全端能力。我始終相信：良好的架構設計能為企業創造長期價值，遠勝於匆匆上線的短期收益——這是我這幾年最大的體悟。"
    }],
    belief: "好的架構，創造長期價值；遠勝匆匆上線的短期收益。",
    interestsTitle: "工作之外的我",
    interestsLead: "生活中我依然是個興趣多元、熱愛學習的人，也在練習拿握工作與生活的平衡。",
    interests: ["合唱·歌唱課", "體操課", "飛輪教練（持照）", "追劇·沙發馬鈴薎"],
    cta: "預約諮詢"
  };
}
function AboutPage({
  c,
  navigate
}) {
  const s = ABOUT_STORY(c);
  return /*#__PURE__*/React.createElement(Section, {
    field: "orange",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 12px",
      color: "var(--accent)"
    }
  }, s.kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...h2,
      margin: 0,
      maxWidth: "20ch"
    }
  }, s.headline), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
      lineHeight: 1.85,
      color: "var(--fg-2)",
      maxWidth: "52ch",
      margin: "20px 0 0"
    }
  }, s.lead), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 46,
      borderTop: "1px solid var(--border-soft)"
    }
  }, s.chapters.map(ch => /*#__PURE__*/React.createElement("div", {
    key: ch.no,
    className: "path-row",
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(110px,170px) 1fr",
      gap: 24,
      padding: "26px 0",
      borderBottom: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 22,
      color: "var(--accent)",
      lineHeight: 1
    }
  }, ch.no), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: ".12em",
      color: "var(--meta)",
      marginTop: 8
    }
  }, ch.eye)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: 18,
      color: "var(--fg)"
    }
  }, ch.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: 15.5,
      lineHeight: 1.85,
      color: "var(--fg-2)",
      maxWidth: "58ch"
    }
  }, ch.body))))), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: "44px 0 0",
      paddingLeft: 22,
      borderLeft: "3px solid var(--accent)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
      lineHeight: 1.35,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      maxWidth: "24ch",
      margin: 0
    }
  }, s.belief)), /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "46px 0 10px"
    }
  }, s.interestsTitle), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: 15,
      lineHeight: 1.7,
      color: "var(--muted)",
      maxWidth: "46ch",
      margin: 0
    }
  }, s.interestsLead), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 16
    }
  }, s.interests.map(x => /*#__PURE__*/React.createElement(Badge, {
    key: x,
    variant: "chip"
  }, x))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => navigate("/booking")
  }, s.cta)));
}

// --- back bar shown above sub-pages ---
function BackBar({
  lang,
  navigate,
  crumb
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "18px clamp(24px,4vw,28px) 0",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate("/"),
    style: {
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: ".08em",
      color: "var(--muted)"
    }
  }, "\u2190 ", lang === "en" ? "HOME" : "首頁"), crumb ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: ".08em",
      color: "var(--meta)"
    }
  }, "/ ", crumb) : null);
}

// --- hash router: home scroll OR a focused sub-page ---
function Router({
  lang,
  route,
  navigate
}) {
  const c = {
    ...COPY[lang],
    __: lang
  };
  c.lab.__ = lang;
  c.services.__ = lang;
  const cc = {
    ...c,
    lab: {
      ...c.lab,
      __: lang
    }
  };
  const page = route.page;
  if (!page || page === "home") return /*#__PURE__*/React.createElement(Home, {
    lang: lang,
    navigate: navigate
  });
  let body = null,
    crumb = "";
  if (page === "about") {
    body = /*#__PURE__*/React.createElement(AboutPage, {
      c: c,
      navigate: navigate
    });
    crumb = c.about.title;
  } else if (page === "lab") {
    body = route.id ? /*#__PURE__*/React.createElement(LabDetail, {
      c: cc,
      id: route.id,
      navigate: navigate
    }) : /*#__PURE__*/React.createElement(Lab, {
      c: cc,
      navigate: navigate,
      page: true
    });
    crumb = c.lab.title;
  } else if (page === "services") {
    body = route.id ? /*#__PURE__*/React.createElement(ServiceDetail, {
      c: c,
      id: route.id,
      navigate: navigate
    }) : /*#__PURE__*/React.createElement(Services, {
      c: c,
      navigate: navigate,
      page: true
    });
    crumb = c.services.title;
  } else if (page === "path") {
    body = /*#__PURE__*/React.createElement(PathSec, {
      c: c,
      navigate: navigate,
      page: true
    });
    crumb = c.path.title;
  } else if (page === "booking") {
    body = /*#__PURE__*/React.createElement(Booking, {
      c: c,
      full: true,
      navigate: navigate
    });
    crumb = c.booking.title;
  } else if (page === "journal") {
    body = /*#__PURE__*/React.createElement(JournalSoon, {
      lang: lang,
      navigate: navigate
    });
    crumb = lang === "en" ? "Journal" : "心法與思考";
  } else {
    return /*#__PURE__*/React.createElement(Home, {
      lang: lang,
      navigate: navigate
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BackBar, {
    lang: lang,
    navigate: navigate,
    crumb: crumb
  }), body);
}
window.Screens = {
  Home,
  Router
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app-v2/ScreensV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app/Chrome.jsx
try { (() => {
/* global React */
// 8plus.app v2 CI — site chrome. Header is transparent over the hero
// and frosts on scroll; footer sits on a deep-night field. Composes
// the DS Logo / Button / Sheet / DropdownMenu.

const NS = window.Ds8plusDesignSystem_1b9e83;
const {
  Logo,
  Button,
  Separator,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} = NS;
const NAV = [{
  key: "services",
  zh: "服務",
  en: "Services"
}, {
  key: "about",
  zh: "關於",
  en: "About"
}, {
  key: "lab",
  zh: "Lab",
  en: "Lab"
}, {
  key: "path",
  zh: "歷程",
  en: "Path"
}, {
  key: "blog",
  zh: "文章",
  en: "Blog"
}, {
  key: "booking",
  zh: "預約",
  en: "Booking"
}];
function Header({
  lang,
  setLang,
  scrolled,
  onNav
}) {
  const t = (zh, en) => lang === "zh" ? zh : en;
  const frost = scrolled;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%",
      borderBottom: frost ? "1px solid var(--border-soft)" : "1px solid transparent",
      background: frost ? "color-mix(in oklab, var(--color-dark), transparent 12%)" : "transparent",
      backdropFilter: frost ? "blur(12px)" : "none",
      WebkitBackdropFilter: frost ? "blur(12px)" : "none",
      transition: "var(--transition-base)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      minHeight: "4.5rem",
      padding: "0 clamp(24px,4vw,28px)",
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("hero"),
    style: {
      cursor: "pointer",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 28,
    wordmark: true
  })), /*#__PURE__*/React.createElement("nav", {
    className: "desk-nav",
    style: {
      display: "flex",
      gap: 24,
      marginLeft: 4
    }
  }, NAV.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.key,
    onClick: () => onNav(item.key),
    style: {
      fontSize: 14,
      cursor: "pointer",
      color: "var(--fg-2)",
      opacity: 0.75,
      transition: "opacity .15s"
    },
    onMouseEnter: e => e.currentTarget.style.opacity = 1,
    onMouseLeave: e => e.currentTarget.style.opacity = 0.75
  }, t(item.zh, item.en)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "desk-nav"
  }, /*#__PURE__*/React.createElement(DropdownMenu, null, /*#__PURE__*/React.createElement(DropdownMenuTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, lang === "zh" ? "繁中 ▾" : "EN ▾")), /*#__PURE__*/React.createElement(DropdownMenuContent, {
    align: "end"
  }, /*#__PURE__*/React.createElement(DropdownMenuLabel, null, "Language"), /*#__PURE__*/React.createElement(DropdownMenuSeparator, null), /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => setLang("zh")
  }, "\u7E41\u9AD4\u4E2D\u6587"), /*#__PURE__*/React.createElement(DropdownMenuItem, {
    onClick: () => setLang("en")
  }, "English")))), /*#__PURE__*/React.createElement("div", {
    className: "mob-nav"
  }, /*#__PURE__*/React.createElement(Sheet, null, /*#__PURE__*/React.createElement(SheetTrigger, {
    asChild: true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon"
  }, "\u2261")), /*#__PURE__*/React.createElement(SheetContent, {
    side: "right"
  }, /*#__PURE__*/React.createElement(SheetHeader, null, /*#__PURE__*/React.createElement(SheetTitle, null, "8plus"), /*#__PURE__*/React.createElement(SheetDescription, null, t("架構先行 · AI 落地", "Architecture-led · AI shipped"))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, NAV.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.key,
    onClick: () => onNav(item.key),
    style: {
      fontSize: 17,
      padding: "10px 0",
      color: "var(--fg-2)",
      cursor: "pointer"
    }
  }, t(item.zh, item.en)))), /*#__PURE__*/React.createElement(Button, {
    onClick: () => onNav("booking"),
    style: {
      marginTop: "auto"
    }
  }, t("預約諮詢", "Book a call"))))))));
}
function Footer({
  lang
}) {
  const t = (zh, en) => lang === "zh" ? zh : en;
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-dark noise-field",
    style: {
      position: "relative",
      borderTop: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "48px clamp(24px,4vw,28px)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    size: 26,
    wordmark: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--meta)",
      margin: "14px 0 0"
    }
  }, t("架構驅動的技術夥伴", "Architecture-led engineering partner")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--meta)",
      margin: "8px 0 0"
    }
  }, "\xA9 ", new Date().getFullYear(), " 8plus \xB7 Made in Taiwan")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      fontSize: 14,
      color: "var(--fg-2)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fg-2)"
    }
  }, "LINE"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fg-2)"
    }
  }, "Email"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--fg-2)"
    }
  }, "RSS")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--meta)",
      margin: 0
    }
  }, "Next.js 15 \xB7 Velite \xB7 Vercel"))));
}
window.Site = {
  Header,
  Footer,
  NAV
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app/HeroBackdrops.jsx
try { (() => {
/* global React */
// Hero backdrop concepts for 8plus.app (file 1 of 2).
// Each component takes { active } and renders a .hv-bg layer.
// Canvas loops only run while their tab is active.

(function injectHbCss() {
  let st = document.getElementById("hb-css");
  if (!st) {
    st = document.createElement("style");
    st.id = "hb-css";
    document.head.appendChild(st);
  }
  st.textContent = `
  .hv-bg canvas.hb-cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .hv-bg .hb-hint { position: absolute; right: clamp(24px, 5vw, 80px); top: 116px; z-index: 6; font-family: var(--font-mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: rgba(210,225,255,.6); background: rgba(3,6,26,.55); border-radius: 9999px; padding: 7px 13px; backdrop-filter: blur(10px); }
  @media (max-height: 620px) { .hv-bg .hb-hint { display: none; } }
  .hv-bg button.hb-mic { pointer-events: auto; cursor: pointer; border: 1px solid rgba(160,195,255,.35); color: rgba(225,238,255,.9); transition: .25s; }
  .hv-bg button.hb-mic:hover { border-color: #FE5000; color: #fff; }

  /* orbit — 軌道系統 */
  .hb-orbit .hub { position: absolute; left: 66%; top: 47%; width: 0; height: 0; }
  .hb-orbit .ringw { position: absolute; left: 0; top: 0; }
  .hb-orbit .ringb { position: absolute; inset: 0; border: 1px dashed rgba(160,195,255,.34); border-radius: 50%; }
  .hb-orbit .satw { position: absolute; inset: 0; animation: hbSpin linear infinite; }
  .hb-orbit .sat { position: absolute; left: 50%; top: 0; display: flex; align-items: center; gap: 7px; animation: hbSpinR linear infinite; }
  .hb-orbit .sat i { width: 8px; height: 8px; border-radius: 50%; background: #fff; box-shadow: 0 0 12px rgba(255,255,255,.8); flex: none; }
  .hb-orbit .sat i.o { background: #FE5000; box-shadow: 0 0 14px rgba(254,80,0,.9); }
  .hb-orbit .sat em { font-style: normal; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; color: rgba(210,225,255,.78); white-space: nowrap; }
  .hb-orbit .core { position: absolute; left: -11px; top: -11px; width: 22px; height: 22px; border-radius: 50%; background: #FE5000; box-shadow: 0 0 30px 8px rgba(254,80,0,.5); animation: hbPulse 2.6s ease-in-out infinite; }
  .hb-orbit .cecho { position: absolute; left: 50%; top: 50%; width: 90px; height: 90px; border-radius: 50%; border: 1px solid rgba(254,80,0,.5); animation: hbEcho 3.4s ease-out infinite; }
  @keyframes hbSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes hbSpinR { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
  @keyframes hbPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.18); } }
  @keyframes hbEcho { 0% { transform: translate(-50%,-50%) scale(.3); opacity: .8; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } }

  /* iso — 架構堆疊 */
  .hb-iso svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hb-iso .iso-legend { display: none; }
  @media (max-width: 820px) { .hb-iso .iso-legend { display: block; position: absolute; inset: 0; pointer-events: none; } }
  .hb-iso .drop { opacity: 0; animation: hbDrop .75s cubic-bezier(.2,.75,.3,1.15) forwards; }
  .hb-iso .lbl { opacity: 0; animation: hbFadeIn2 .6s ease forwards; }
  .hb-iso .gd { stroke-dasharray: 4 8; animation: hbDashFlow 1.2s linear infinite; }
  @keyframes hbDrop { from { opacity: 0; transform: translateY(-110px); } 70% { opacity: 1; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes hbFadeIn2 { to { opacity: 1; } }
  @keyframes hbDashFlow { to { stroke-dashoffset: -24; } }

  /* tape — 雜誌拼貼 */
  .hb-tape .bigmark { position: absolute; left: 68%; top: 42%; transform: translate(-50%,-50%) rotate(-6deg); width: min(52vh, 460px); aspect-ratio: 1; }
  .hb-tape .bigmark svg { width: 100%; height: 100%; display: block; overflow: visible; }
  .hb-tape .tape { position: absolute; left: -6%; right: -6%; overflow: hidden; padding: 9px 0; box-shadow: 0 12px 40px -18px rgba(0,0,0,.55); }
  .hb-tape .t1 { top: 13%; transform: rotate(-4deg); background: #FE5000; }
  .hb-tape .t2 { bottom: 9%; transform: rotate(3deg); background: rgba(255,255,255,.94); }
  .hb-tape .run { display: flex; width: max-content; animation: hbMarq 26s linear infinite; }
  .hb-tape .t2 .run { animation-duration: 34s; animation-direction: reverse; }
  .hb-tape .run span { font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .2em; white-space: nowrap; padding-right: 2em; }
  .hb-tape .t1 span { color: #001a5c; } .hb-tape .t2 span { color: #002FA7; }
  .hb-tape .pl { position: absolute; font-family: var(--font-mono); font-style: normal; font-size: 20px; color: rgba(255,255,255,.4); }
  .hb-tape .stamp { position: absolute; right: 26px; top: 50%; transform: translateY(-50%) rotate(90deg); font-family: var(--font-mono); font-size: 11px; letter-spacing: .3em; color: rgba(210,225,255,.5); white-space: nowrap; }
  @keyframes hbMarq { to { transform: translateX(-50%); } }

  /* bp — 電路藍圖 */
  .hb-bp { background-image: radial-gradient(rgba(160,195,255,.15) 1px, transparent 1.4px); background-size: 30px 30px; }
  .hb-bp svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .hb-bp .hb-draw { fill: none; stroke: rgba(160,195,255,.5); stroke-width: 1.1; stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: hbDraw 1.5s ease forwards; }
  .hb-bp .hb-draw.org { stroke: #FE5000; stroke-width: 1.5; }
  .hb-bp .hb-flowline { fill: none; stroke: rgba(255,255,255,.9); stroke-width: 1.5; stroke-dasharray: 4 30; opacity: 0; animation: hbFlow2 2.6s linear infinite; }
  .hb-bp .hb-node { fill: #002FA7; stroke: rgba(160,195,255,.75); stroke-width: 1; opacity: 0; animation: hbFadeIn .6s ease 1.3s forwards; }
  @keyframes hbDraw { to { stroke-dashoffset: 0; } }
  @keyframes hbFlow2 { 0% { opacity: 0; stroke-dashoffset: 0; } 15% { opacity: .9; } 100% { opacity: .9; stroke-dashoffset: -136; } }
  @keyframes hbFadeIn { to { opacity: .9; } }

  @media (prefers-reduced-motion: reduce) {
    .hb-orbit .satw, .hb-orbit .sat, .hb-orbit .core, .hb-orbit .cecho,
    .hb-iso .gd, .hb-tape .run, .hb-bp .hb-flowline { animation: none; }
    .hb-iso .drop, .hb-iso .lbl { animation: none; opacity: 1; }
    .hb-bp .hb-draw { animation: none; stroke-dashoffset: 0; }
    .hb-bp .hb-node { animation: none; opacity: .9; }
    .hb-orbit .cecho { opacity: 0; }
  }

  /* 手機版：角落主視覺縮小並右移，避免壓到左側 A/B/C 文字 */
  /* 手機版：主視覺退為淡背景，不顯示標註避免與文字重疊 */
  @media (max-width: 820px) {
    .hb-orbit .hub { left: 58%; top: 54%; transform: scale(.72); }
    .hb-orbit .sat em { opacity: 0 !important; }
    .hb-iso svg { transform: scale(.82); transform-origin: 56% 52%; }
    .hb-iso .callout { display: none !important; }
    .hb-iso .iso-legend { display: none !important; }
    .hb-tape .bigmark { left: 62%; top: 56%; width: min(34vh, 260px); }
    /* 電路藍圖：手機上線條纖細＋襯底暗化會讓顏色顯得太淡，加粗加亮 */
    .hb-bp .hb-draw { stroke: rgba(200,222,255,.8); stroke-width: 1.7; }
    .hb-bp .hb-draw.org { stroke: #FF6B1A; stroke-width: 2.2; }
    .hb-bp .hb-node { opacity: .95 !important; r: 3.6; }
    .hb-bp .hb-flowline { stroke: rgba(255,255,255,.95); stroke-width: 2; }
    .hb-bp { background-image: radial-gradient(rgba(200,222,255,.3) 1.5px, transparent 2px); background-size: 26px 26px; }
  }
  @media (max-width: 520px) {
    .hb-orbit .hub { left: 56%; top: 56%; transform: scale(.62); }
    .hb-iso svg { transform: scale(.74); transform-origin: 54% 54%; }
    .hb-tape .bigmark { left: 58%; }
  }`;
})();

// shared canvas loop: runs only while active; one static frame under reduced motion.
// setup returns { frame, dispose? } — dispose is called on deactivate.
function useCv(active, setup) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    const cv = ref.current;
    if (!cv) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d");
    let raf,
      stop = false;
    const inst = setup(cv, ctx);
    const resize = () => {
      const p = cv.parentElement;
      cv.width = p.clientWidth || 1280;
      cv.height = p.clientHeight || 720;
    };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      inst.frame();
      if (!stop) raf = requestAnimationFrame(loop);
    };
    if (!reduce) loop();else inst.frame();
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (inst.dispose) inst.dispose();
    };
  }, [active]);
  return ref;
}
function Shell({
  active,
  cls,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hv-bg" + (cls ? " " + cls : "") + (active ? " on" : "")
  }, children);
}
window.HbUtil = {
  useCv,
  Shell
};

// 等高線地形 — animated topographic contours (marching squares)
function Topo({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = Math.random() * 10;
    const F = (x, y, tt) => Math.sin(x * 0.0032 + tt) + Math.cos(y * 0.004 - tt * 0.7) + Math.sin((x + y) * 0.0018 + tt * 0.5) + 1.2 * Math.cos(Math.hypot(x - cv.width * 0.64, y - cv.height * 0.44) * 0.0036 - tt * 0.6);
    return {
      frame() {
        t += 0.004;
        const w = cv.width,
          h = cv.height,
          s = 24;
        ctx.fillStyle = "#002FA7";
        ctx.fillRect(0, 0, w, h);
        const cols = Math.ceil(w / s) + 1,
          rows = Math.ceil(h / s) + 1,
          g = [];
        for (let j = 0; j < rows; j++) {
          g[j] = [];
          for (let i = 0; i < cols; i++) g[j][i] = F(i * s, j * s, t);
        }
        const levels = [-2.8, -2.4, -2, -1.6, -1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.8];
        for (let li = 0; li < levels.length; li++) {
          const lv = levels[li],
            orange = li === 7;
          ctx.strokeStyle = orange ? "rgba(254,80,0,.85)" : "rgba(170,200,255,.36)";
          ctx.lineWidth = orange ? 1.5 : 1;
          ctx.beginPath();
          for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
            const a = g[j][i],
              b = g[j][i + 1],
              c = g[j + 1][i + 1],
              d = g[j + 1][i];
            const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * s,
              y0 = j * s;
            const L = (v1, v2) => {
              const dv = v2 - v1;
              return dv ? (lv - v1) / dv : 0.5;
            };
            const top = [x0 + s * L(a, b), y0],
              right = [x0 + s, y0 + s * L(b, c)];
            const bot = [x0 + s * L(d, c), y0 + s],
              left = [x0, y0 + s * L(a, d)];
            const seg = (p, q) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1:
              case 14:
                seg(left, bot);
                break;
              case 2:
              case 13:
                seg(bot, right);
                break;
              case 3:
              case 12:
                seg(left, right);
                break;
              case 4:
              case 11:
                seg(top, right);
                break;
              case 5:
                seg(top, left);
                seg(bot, right);
                break;
              case 6:
              case 9:
                seg(top, bot);
                break;
              case 7:
              case 8:
                seg(top, left);
                break;
              case 10:
                seg(top, right);
                seg(bot, left);
                break;
            }
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }));
}

// 半調點陣 — halftone dot field with a drifting orange band
function Dots({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.012;
        const w = cv.width,
          h = cv.height,
          s = 34;
        ctx.fillStyle = "#002FA7";
        ctx.fillRect(0, 0, w, h);
        const bandC = h * 0.85 + Math.sin(t * 0.55) * 170;
        for (let y = s / 2; y < h + s; y += s) for (let x = s / 2; x < w + s; x += s) {
          const v = Math.sin(x * 0.005 + t) * Math.cos(y * 0.0045 - t * 0.7) + Math.sin((x - y) * 0.0025 + t * 0.45);
          const r = Math.max(0.4, (v + 2) / 4 * 8.5);
          const band = Math.abs(x * 0.55 + y * 0.85 - bandC) < 95;
          const dxn = (x - w * 0.5) / (w * 0.36),
            dyn = (y - h * 0.74) / (h * 0.32);
          const dd = dxn * dxn + dyn * dyn;
          const dim = dd < 1 ? 0.22 + 0.78 * dd : 1;
          ctx.fillStyle = band ? "rgba(254,80,0," + 0.92 * dim + ")" : "rgba(190,215,255," + 0.42 * dim + ")";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }));
}

// 軌道系統 — tech-stack satellites orbiting an orange core
const RINGS = [{
  d: 210,
  dur: 20,
  sats: [{
    l: "LLM / RAG",
    o: 0,
    orange: true
  }]
}, {
  d: 340,
  dur: 32,
  sats: [{
    l: "NEXT.JS",
    o: 0.15
  }, {
    l: "POSTGRES",
    o: 0.6
  }]
}, {
  d: 480,
  dur: 46,
  sats: [{
    l: "AWS",
    o: 0.35
  }, {
    l: "K8S",
    o: 0.8
  }]
}, {
  d: 630,
  dur: 62,
  sats: [{
    l: "CI / CD",
    o: 0.55
  }]
}];
function Orbit({
  active
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-orbit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hub"
  }, RINGS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.d,
    className: "ringw",
    style: {
      width: r.d,
      height: r.d,
      marginLeft: -r.d / 2,
      marginTop: -r.d / 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ringb"
  }), r.sats.map(s2 => /*#__PURE__*/React.createElement("div", {
    key: s2.l,
    className: "satw",
    style: {
      animationDuration: r.dur + "s",
      animationDelay: -r.dur * s2.o + "s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sat",
    style: {
      animationDuration: r.dur + "s",
      animationDelay: -r.dur * s2.o + "s"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: s2.orange ? "o" : ""
  }), /*#__PURE__*/React.createElement("em", null, s2.l)))))), [0, 1].map(k => /*#__PURE__*/React.createElement("span", {
    key: k,
    className: "cecho",
    style: {
      animationDelay: k * 1.7 + "s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "core"
  })));
}

// 架構堆疊 — the real stack assembling layer by layer: DATA → SERVICES → WEB/APP
const ISO_W = 60,
  ISO_H = 30,
  ISO_S = 60,
  ISO_CX = 820,
  ISO_CY = 540;
const ARCH_CUBES = [{
  u: 0,
  v: 0,
  l: 0,
  d: 0
}, {
  u: 1,
  v: 0,
  l: 0,
  d: 0.12
}, {
  u: 0,
  v: 1,
  l: 0,
  d: 0.24
}, {
  u: 1,
  v: 1,
  l: 0,
  d: 0.36
}, {
  u: 0,
  v: 0,
  l: 1,
  d: 0.7
}, {
  u: 1,
  v: 0,
  l: 1,
  d: 0.82
}, {
  u: 0,
  v: 1,
  l: 1,
  d: 0.94
}, {
  u: 1,
  v: 1,
  l: 1,
  d: 1.06
}, {
  u: 0.5,
  v: 0.5,
  l: 2,
  d: 1.5
}, {
  u: 0.5,
  v: 0.5,
  l: 4,
  d: 1.9,
  orange: true
}];
const ARCH_DATA = ["MongoDB", "PostgreSQL", "Redis · MQ", "S3 / Blob"];
const ARCH_SVCS = ["auth-server", "ocr-llm-server", "context-eng-server", "asr-server"];
function ArchCube({
  c
}) {
  const w = ISO_W,
    hh = ISO_H,
    s = ISO_S;
  const x = ISO_CX + (c.u - c.v) * w,
    y = ISO_CY + (c.u + c.v) * hh - c.l * s;
  const pt = arr => arr.map(p => p.join(",")).join(" ");
  const top = [[0, -s], [w, -hh - s], [0, -2 * hh - s], [-w, -hh - s]];
  const left = [[-w, -hh], [0, 0], [0, -s], [-w, -hh - s]];
  const right = [[0, 0], [w, -hh], [w, -hh - s], [0, -s]];
  const st = c.orange ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.55)";
  const f = c.orange ? ["rgba(254,80,0,.96)", "rgba(205,62,0,.95)", "rgba(160,48,0,.95)"] : ["rgba(255,255,255,.18)", "rgba(255,255,255,.08)", "rgba(255,255,255,.035)"];
  return /*#__PURE__*/React.createElement("g", {
    transform: "translate(" + x + " " + y + ")"
  }, /*#__PURE__*/React.createElement("g", {
    className: "drop",
    style: {
      animationDelay: c.d + "s"
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: pt(top),
    fill: f[0],
    stroke: st,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pt(left),
    fill: f[1],
    stroke: st,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pt(right),
    fill: f[2],
    stroke: st,
    strokeWidth: "1"
  })));
}
function Iso({
  active
}) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (active) setTick(n => n + 1);
  }, [active]);
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-iso"
  }, /*#__PURE__*/React.createElement("svg", {
    key: tick,
    viewBox: "0 0 1320 760",
    preserveAspectRatio: "xMidYMid slice"
  }, ARCH_CUBES.map((c, i) => /*#__PURE__*/React.createElement(ArchCube, {
    key: i,
    c: c
  })), /*#__PURE__*/React.createElement("g", {
    className: "lbl",
    style: {
      animationDelay: "2.1s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    className: "gd",
    x1: "820",
    y1: "336",
    x2: "820",
    y2: "384",
    stroke: "rgba(254,80,0,.7)",
    strokeWidth: "1.4"
  })), /*#__PURE__*/React.createElement("g", {
    className: "lbl callout",
    style: {
      animationDelay: "0.6s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "700",
    y1: "510",
    x2: "612",
    y2: "510",
    stroke: "rgba(160,195,255,.5)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "700",
    cy: "510",
    r: "2",
    fill: "rgba(220,235,255,.9)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "602",
    y: "488",
    textAnchor: "end",
    fill: "rgba(160,195,255,.75)",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    letterSpacing: "2"
  }, "DATA \u2014 \u8CC7\u6599\u5C64"), ARCH_DATA.map((s2, i) => /*#__PURE__*/React.createElement("text", {
    key: s2,
    x: "602",
    y: 508 + i * 18,
    textAnchor: "end",
    fill: "rgba(255,255,255,.92)",
    fontFamily: "var(--font-mono)",
    fontSize: "12"
  }, s2))), /*#__PURE__*/React.createElement("g", {
    className: "lbl callout",
    style: {
      animationDelay: "1.35s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "940",
    y1: "450",
    x2: "988",
    y2: "450",
    stroke: "rgba(160,195,255,.5)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "940",
    cy: "450",
    r: "2",
    fill: "rgba(220,235,255,.9)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "1124",
    y: "428",
    textAnchor: "end",
    fill: "rgba(160,195,255,.75)",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    letterSpacing: "2"
  }, "SERVICES \xB7 API"), ARCH_SVCS.map((s2, i) => /*#__PURE__*/React.createElement("text", {
    key: s2,
    x: "1124",
    y: 448 + i * 18,
    textAnchor: "end",
    fill: "rgba(255,255,255,.92)",
    fontFamily: "var(--font-mono)",
    fontSize: "12"
  }, s2))), /*#__PURE__*/React.createElement("g", {
    className: "lbl callout",
    style: {
      animationDelay: "1.7s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "880",
    y1: "390",
    x2: "1030",
    y2: "352",
    stroke: "rgba(160,195,255,.5)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "880",
    cy: "390",
    r: "2",
    fill: "rgba(220,235,255,.9)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "1124",
    y: "348",
    textAnchor: "end",
    fill: "#fff",
    fontFamily: "var(--font-mono)",
    fontSize: "12",
    fontWeight: "600"
  }, "API GATEWAY"), /*#__PURE__*/React.createElement("text", {
    x: "1124",
    y: "362",
    textAnchor: "end",
    fill: "rgba(160,195,255,.7)",
    fontFamily: "var(--font-mono)",
    fontSize: "8.5",
    letterSpacing: "1.5"
  }, "REST / gRPC ROUTING")), /*#__PURE__*/React.createElement("g", {
    className: "lbl",
    style: {
      animationDelay: "2.15s"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "820",
    y1: "206",
    x2: "820",
    y2: "188",
    stroke: "rgba(254,110,40,.7)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "820",
    cy: "208",
    r: "2",
    fill: "#FE5000"
  }), /*#__PURE__*/React.createElement("text", {
    x: "820",
    y: "164",
    textAnchor: "middle",
    fill: "#fff",
    fontFamily: "var(--font-mono)",
    fontSize: "12.5",
    fontWeight: "600"
  }, "WEB / APP"), /*#__PURE__*/React.createElement("text", {
    x: "820",
    y: "178",
    textAnchor: "middle",
    fill: "rgba(255,255,255,.75)",
    fontFamily: "var(--font-mono)",
    fontSize: "8.5",
    letterSpacing: "1.5"
  }, "NEXT.JS CLIENT"))), /*#__PURE__*/React.createElement("div", {
    className: "iso-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg svc"
  }, /*#__PURE__*/React.createElement("em", null, "SERVICES \xB7 API"), ARCH_SVCS.map(s2 => /*#__PURE__*/React.createElement("span", {
    key: s2
  }, s2))), /*#__PURE__*/React.createElement("div", {
    className: "seg data"
  }, /*#__PURE__*/React.createElement("em", null, "DATA \u2014 \u8CC7\u6599\u5C64"), ARCH_DATA.map(s2 => /*#__PURE__*/React.createElement("span", {
    key: s2
  }, s2)))));
}

// 聲波緞帶 — mic-driven line-sheet wave (simulated fallback when mic denied)
function Wave({
  active
}) {
  const [mic, setMic] = React.useState("idle");
  const aud = React.useRef({
    an: null,
    data: null
  });
  const resRef = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    try {
      if (document.permissionsPolicy && !document.permissionsPolicy.allowsFeature("microphone")) setMic("blocked");
    } catch (e) {}
    return () => {
      const r = resRef.current;
      if (r) {
        if (r.stream) r.stream.getTracks().forEach(tr => tr.stop());
        if (r.actx) r.actx.close();
        resRef.current = null;
      }
      aud.current = {
        an: null,
        data: null
      };
      setMic("idle");
    };
  }, [active]);
  const enableMic = async () => {
    setMic("asking");
    try {
      if (!navigator.mediaDevices) throw new Error("no media");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      await actx.resume();
      const src = actx.createMediaStreamSource(stream);
      const an = actx.createAnalyser();
      an.fftSize = 256;
      an.smoothingTimeConstant = 0.82;
      src.connect(an);
      aud.current = {
        an,
        data: new Uint8Array(an.frequencyBinCount)
      };
      resRef.current = {
        stream,
        actx
      };
      setMic("live");
    } catch (e) {
      setMic("off");
    }
  };
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.014;
        const w = cv.width,
          h = cv.height,
          rows = 26;
        const A = aud.current;
        let bins = null;
        if (A.an) {
          A.an.getByteFrequencyData(A.data);
          bins = A.data;
        }
        ctx.fillStyle = "#002FA7";
        ctx.fillRect(0, 0, w, h);
        for (let r = 0; r < rows; r++) {
          const prog = r / (rows - 1);
          const orange = r === 18;
          const alpha = orange ? 0.9 : 0.1 + 0.45 * Math.sin(prog * Math.PI);
          ctx.strokeStyle = orange ? "rgba(254,80,0," + alpha + ")" : "rgba(180,208,255," + alpha + ")";
          ctx.lineWidth = orange ? 1.6 : 1.1;
          ctx.beginPath();
          const yBase = h * (0.56 + (prog - 0.5) * 0.3);
          for (let x = 0; x <= w; x += 14) {
            const env = Math.sin(x / w * Math.PI);
            let y = yBase + Math.sin(x * 0.0038 + t * 1.15 + r * 0.24) * 58 * env + Math.cos(x * 0.002 - t * 0.6 + r * 0.12) * 28 * env;
            if (bins) {
              const bi = Math.min(bins.length - 1, x / w * 64 | 0);
              const boost = bins[bi] / 255;
              y -= boost * boost * 230 * env * (0.35 + 0.65 * Math.sin(prog * Math.PI));
            }
            if (x === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }), mic === "live" ? /*#__PURE__*/React.createElement("span", {
    className: "hb-hint"
  }, "MIC LIVE \u2014 \u8072\u97F3\u6B63\u5728\u9A45\u52D5\u6CE2\u5F62") : /*#__PURE__*/React.createElement("button", {
    className: "hb-hint hb-mic",
    onClick: enableMic
  }, mic === "asking" ? "要求麥克風權限中…" : mic === "off" ? "無法取得麥克風 — 點擊重試" : mic === "blocked" ? "此預覽環境可能未開放麥克風 — 點擊嘗試" : "點擊啟用麥克風 — 讓聲音驅動波形"));
}

// 點陣球體 — rotating dot globe; click to summon AI vocabulary
const SPHERE_TERMS = ["embedding", "LLM", "RAG", "vector db", "token", "agent", "fine-tune", "inference", "prompt", "context window", "rerank", "quantize"];
function Sphere({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0,
      ti = 0;
    const N = 560,
      pts = [],
      tags = [],
      pulses = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - i / (N - 1) * 2,
        rad = Math.sqrt(1 - y * y),
        th = i * 2.399963;
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
    }
    const tl = 0.42;
    const monoFont = px => px + "px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    const onTap = e => {
      const d = e.detail;
      tags.push({
        x: d.x,
        y: d.y,
        s: SPHERE_TERMS[ti % SPHERE_TERMS.length],
        o: ti % 3 === 0,
        age: 0
      });
      pulses.push({
        x: d.x,
        y: d.y,
        r: 3
      });
      ti++;
    };
    window.addEventListener("heroTap", onTap);
    return {
      dispose() {
        window.removeEventListener("heroTap", onTap);
      },
      frame() {
        t += 0.0045;
        const w = cv.width,
          h = cv.height;
        ctx.clearRect(0, 0, w, h);
        const cx = w * 0.66,
          cy = h * 0.47,
          R = Math.min(w, h) * 0.34;
        ctx.strokeStyle = "rgba(160,195,255,.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, R, R * 0.3, -0.28, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < N; i++) {
          const p = pts[i];
          const xr = p[0] * Math.cos(t) + p[2] * Math.sin(t);
          const zr = -p[0] * Math.sin(t) + p[2] * Math.cos(t);
          const y2 = p[1] * Math.cos(tl) - zr * Math.sin(tl);
          const z2 = p[1] * Math.sin(tl) + zr * Math.cos(tl);
          const depth = (z2 + 1) / 2,
            orange = i % 19 === 0;
          ctx.fillStyle = orange ? "rgba(254,80,0," + (0.2 + 0.75 * depth) + ")" : "rgba(200,220,255," + (0.06 + 0.5 * depth) + ")";
          ctx.beginPath();
          ctx.arc(cx + xr * R, cy + y2 * R, (orange ? 1.2 : 0.8) + 1.8 * depth, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.r += 2.4;
          const a = Math.max(0, 1 - p.r / 90);
          ctx.strokeStyle = "rgba(254,80,0," + a * 0.8 + ")";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
          if (a <= 0) pulses.splice(i, 1);
        }
        ctx.font = monoFont(13);
        for (let i = tags.length - 1; i >= 0; i--) {
          const g = tags[i];
          g.age++;
          const a = g.age < 15 ? g.age / 15 : Math.max(0, 1 - (g.age - 15) / 110);
          ctx.fillStyle = g.o ? "rgba(254,110,40," + a + ")" : "rgba(225,238,255," + a * 0.9 + ")";
          ctx.fillText(g.s, g.x + 10, g.y - g.age * 0.45);
          if (a <= 0) tags.splice(i, 1);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Shell, {
    active: active
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "hb-cv"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hb-hint"
  }, "\u9EDE\u64CA\u756B\u9762 \u2014 \u53EC\u559A AI \u8A5E\u5F59"));
}

// 雜誌拼貼 — real 8plus mark + running tape marquees
const TAPE1 = "ARCHITECTURE FIRST ✳ AI SHIPPED ✳ TRUSTED SYSTEMS ✳ 8PLUS.APP ✳ ";
const TAPE2 = "架構先行 · AI 落地 · 可信系統 · TAIPEI · EST. 2026 · ";
function Tape({
  active
}) {
  const plus = [["12%", "30%"], ["30%", "72%"], ["48%", "38%"], ["86%", "70%"], ["78%", "22%"]];
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-tape"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bigmark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "29",
    r: "18",
    fill: "none",
    stroke: "rgba(255,255,255,.42)",
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M53 9H68L36 91H21L53 9Z",
    fill: "none",
    stroke: "rgba(255,255,255,.42)",
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "64",
    r: "28",
    fill: "#FE5000",
    opacity: ".92"
  }))), plus.map((p, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "pl",
    style: {
      left: p[0],
      top: p[1]
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "tape t1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "run"
  }, /*#__PURE__*/React.createElement("span", null, TAPE1 + TAPE1 + TAPE1), /*#__PURE__*/React.createElement("span", null, TAPE1 + TAPE1 + TAPE1))), /*#__PURE__*/React.createElement("div", {
    className: "tape t2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "run"
  }, /*#__PURE__*/React.createElement("span", null, TAPE2 + TAPE2 + TAPE2), /*#__PURE__*/React.createElement("span", null, TAPE2 + TAPE2 + TAPE2))), /*#__PURE__*/React.createElement("span", {
    className: "stamp"
  }, "NO.01 \u2014 TRUST ISSUE \u2014 2026"));
}

// 電路藍圖 — orthogonal traces drawing themselves into a core chip
function Bp({
  active
}) {
  const gRef = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    const g = gRef.current;
    if (!g) return;
    while (g.firstChild) g.removeChild(g.firstChild);
    const ns = "http://www.w3.org/2000/svg";
    const cx = 870,
      cy = 357,
      hs = 74;
    const mk = (tag, attrs) => {
      const el = document.createElementNS(ns, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      g.appendChild(el);
      return el;
    };
    const R = (a, b) => a + Math.random() * (b - a);
    const trace = (pts, orange, i) => {
      let len = 0;
      for (let k = 1; k < pts.length; k++) len += Math.abs(pts[k][0] - pts[k - 1][0]) + Math.abs(pts[k][1] - pts[k - 1][1]);
      const d = "M " + pts.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ");
      const p = mk("path", {
        d,
        "class": "hb-draw" + (orange ? " org" : "")
      });
      p.style.setProperty("--len", String(Math.ceil(len)));
      p.style.animationDelay = (i * 0.09).toFixed(2) + "s";
      if (orange) {
        const f = mk("path", {
          d,
          "class": "hb-flowline"
        });
        f.style.animationDelay = (1.7 + i * 0.09).toFixed(2) + "s";
      }
      for (let k = 1; k < pts.length - 1; k++) mk("circle", {
        cx: pts[k][0],
        cy: pts[k][1],
        r: 3,
        "class": "hb-node"
      });
    };
    for (let i = 0; i < 14; i++) {
      const side = i % 4,
        orange = i % 5 === 0;
      const off = -46 + i % 4 * 30 + R(-8, 8);
      let pts;
      if (side === 0) {
        const sy = R(60, 690),
          mx = R(130, 560),
          py = cy + off;
        pts = [[-30, sy], [mx, sy], [mx, py], [cx - hs, py]];
      } else if (side === 1) {
        const sy = R(60, 690),
          mx = R(1060, 1300),
          py = cy + off;
        pts = [[1360, sy], [mx, sy], [mx, py], [cx + hs, py]];
      } else if (side === 2) {
        const sx = R(80, 1240),
          my = R(50, 170),
          px = cx + off;
        pts = [[sx, -30], [sx, my], [px, my], [px, cy - hs]];
      } else {
        const sx = R(80, 1240),
          my = R(560, 700),
          px = cx + off;
        pts = [[sx, 790], [sx, my], [px, my], [px, cy + hs]];
      }
      trace(pts, orange, i);
    }
  }, [active]);
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-bp"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1320 760",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("g", {
    ref: gRef
  }), /*#__PURE__*/React.createElement("rect", {
    x: "796",
    y: "283",
    width: "148",
    height: "148",
    rx: "10",
    fill: "rgba(255,255,255,.04)",
    stroke: "rgba(255,255,255,.6)",
    strokeDasharray: "6 5",
    strokeWidth: "1.3"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "824",
    y: "311",
    width: "92",
    height: "92",
    rx: "6",
    fill: "none",
    stroke: "rgba(254,80,0,.85)",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "870",
    y: "352",
    textAnchor: "middle",
    fill: "rgba(255,255,255,.85)",
    fontFamily: "var(--font-mono)",
    fontSize: "22"
  }, "8+"), /*#__PURE__*/React.createElement("text", {
    x: "870",
    y: "376",
    textAnchor: "middle",
    fill: "rgba(160,195,255,.6)",
    fontFamily: "var(--font-mono)",
    fontSize: "10",
    letterSpacing: "3"
  }, "CORE")));
}
window.HeroBackdrops = {
  topo: Topo,
  dots: Dots,
  orbit: Orbit,
  iso: Iso,
  wave: Wave,
  sphere: Sphere,
  tape: Tape,
  bp: Bp
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app/HeroBackdrops.jsx", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app/HeroBackdrops2.jsx
try { (() => {
/* global React */
// Hero backdrop concepts for 8plus.app (file 2 of 2) — 18 additional Klein-blue visuals.
const {
  useCv,
  Shell
} = window.HbUtil;
const KB = "#002FA7";
(function injectHb2Css() {
  let st = document.getElementById("hb2-css");
  if (!st) {
    st = document.createElement("style");
    st.id = "hb2-css";
    document.head.appendChild(st);
  }
  st.textContent = `
  /* typo — 動態字牆 */
  .hb-typo .row { position: absolute; left: 0; right: 0; overflow: hidden; font-family: var(--font-display); font-weight: 700; font-size: 12.5vh; line-height: 1; white-space: nowrap; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.2); }
  .hb-typo .row.o { -webkit-text-stroke: 1.5px rgba(254,110,40,.55); }
  .hb-typo .run { display: flex; width: max-content; animation: hbMarq linear infinite; }
  .hb-typo .run span { padding-right: .5em; }
  /* eclipse — 日蝕循環：太陽 → 日蝕 → 分離 */
  .hb-ecl .sun { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%); width: min(50vh, 440px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 42% 40%, #FFE0B8, #FE7A26 52%, #E64A00 80%); animation: hbBreath2 6s ease-in-out infinite; }
  .hb-ecl .moon { position: absolute; left: 64%; top: 45%; width: calc(min(50vh, 440px) * 0.985); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 62% 42%, #04164c, #000d33 75%); transform: translate(calc(-50% + 18%), -50%); animation: hbEclipse 16s ease-in-out infinite; }
  .hb-ecl .oring { position: absolute; left: 64%; top: 45%; transform: translate(-50%,-50%) rotate(18deg); width: min(62vh, 545px); aspect-ratio: 1; border-radius: 50%; border: 1px dashed rgba(190,215,255,.28); }
  @keyframes hbBreath2 {
    0%, 100% { box-shadow: 0 0 130px 26px rgba(254,110,40,.5), 0 0 40px 8px rgba(255,170,100,.6); }
    50% { box-shadow: 0 0 180px 38px rgba(254,110,40,.66), 0 0 54px 12px rgba(255,170,100,.75); }
  }
  @keyframes hbEclipse {
    0% { transform: translate(-50%, -50%); }
    12% { transform: translate(calc(-50% - 18%), -50%); }
    38% { transform: translate(calc(-50% - 18%), -50%); }
    50% { transform: translate(-50%, -50%); }
    62% { transform: translate(calc(-50% + 18%), -50%); }
    88% { transform: translate(calc(-50% + 18%), -50%); }
    100% { transform: translate(-50%, -50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hb-typo .run, .hb-ecl .sun, .hb-ecl .moon { animation: none; }
  }`;
})();
const Cv = ({
  active,
  hint,
  refFn
}) => /*#__PURE__*/React.createElement(Shell, {
  active: active
}, /*#__PURE__*/React.createElement("canvas", {
  ref: refFn,
  className: "hb-cv"
}), hint ? /*#__PURE__*/React.createElement("span", {
  className: "hb-hint"
}, hint) : null);

// 星際穿越 — warp starfield accelerating outward
function Warp({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let ps = null;
    const reset = (p, maxR) => {
      p.a = Math.random() * Math.PI * 2;
      p.d = 8 + Math.random() * 50;
      p.sp = 1.012 + Math.random() * 0.02;
      p.o = Math.random() < 0.06;
      if (maxR) p.d = Math.random() * maxR;
    };
    return {
      frame() {
        const w = cv.width,
          h = cv.height,
          cx = w * 0.5,
          cy = h * 0.46,
          maxR = Math.hypot(w, h) * 0.58;
        if (!ps) {
          ps = Array.from({
            length: 170
          }, () => {
            const p = {};
            reset(p, maxR);
            return p;
          });
        }
        ctx.fillStyle = "rgba(0,47,167,.34)";
        ctx.fillRect(0, 0, w, h);
        for (const p of ps) {
          const d2 = p.d * p.sp + 0.4;
          const al = Math.min(1, p.d / (maxR * 0.4));
          ctx.strokeStyle = p.o ? "rgba(254,110,40," + (0.3 + al * 0.6) + ")" : "rgba(210,228,255," + (0.12 + al * 0.6) + ")";
          ctx.lineWidth = 0.8 + al * 1.6;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(p.a) * p.d, cy + Math.sin(p.a) * p.d);
          ctx.lineTo(cx + Math.cos(p.a) * d2, cy + Math.sin(p.a) * d2);
          ctx.stroke();
          p.d = d2;
          if (p.d > maxR) reset(p);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 漣漪擴散 — expanding rings; click to drop a ripple
function Ripple({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let id = 0,
      cd = 0;
    const rings = [];
    const add = (x, y, r0) => rings.push({
      x,
      y,
      r: r0 || 2,
      o: id++ % 5 === 0
    });
    const onTap = e => {
      add(e.detail.x, e.detail.y);
      add(e.detail.x, e.detail.y, -30);
    };
    window.addEventListener("heroTap", onTap);
    return {
      dispose() {
        window.removeEventListener("heroTap", onTap);
      },
      frame() {
        const w = cv.width,
          h = cv.height;
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        if (--cd <= 0) {
          add(Math.random() * w, Math.random() * h);
          cd = 46 + Math.random() * 40;
        }
        for (let i = rings.length - 1; i >= 0; i--) {
          const g = rings[i];
          g.r += 2.1;
          if (g.r <= 0) continue;
          const a = Math.max(0, 1 - g.r / 380);
          ctx.strokeStyle = g.o ? "rgba(254,80,0," + a * 0.8 + ")" : "rgba(185,212,255," + a * 0.5 + ")";
          ctx.lineWidth = g.o ? 1.6 : 1.1;
          ctx.beginPath();
          ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
          ctx.stroke();
          if (a <= 0) rings.splice(i, 1);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref,
    hint: "\u9EDE\u64CA\u756B\u9762 \u2014 \u843D\u4E0B\u6F23\u6F2A"
  });
}

// 雷達掃描 — sweep with orange blips
function Radar({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0,
      blips = null;
    const RTERMS = ["LLM", "RAG", "embedding", "FastAPI", "MongoDB", "Redis", "Azure", "AWS", "K8s"];
    const MF = "11px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cx = w * 0.64,
          cy = h * 0.47,
          R = Math.min(w, h) * 0.38;
        if (!blips) blips = Array.from({
          length: 9
        }, (_, i) => ({
          a: Math.random() * Math.PI * 2,
          d: 0.2 + Math.random() * 0.75,
          glow: 0,
          tm: RTERMS[i]
        }));
        ctx.fillStyle = "rgba(0,47,167,.12)";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(170,200,255,.3)";
        ctx.lineWidth = 1;
        for (let k = 1; k <= 4; k++) {
          ctx.beginPath();
          ctx.arc(cx, cy, R * k / 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(cx - R, cy);
        ctx.lineTo(cx + R, cy);
        ctx.moveTo(cx, cy - R);
        ctx.lineTo(cx, cy + R);
        ctx.stroke();
        const ang = t * 1.1;
        const gr = ctx.createLinearGradient(cx, cy, cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
        gr.addColorStop(0, "rgba(255,255,255,.08)");
        gr.addColorStop(1, "rgba(255,255,255,.85)");
        ctx.strokeStyle = gr;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
        ctx.stroke();
        for (const b of blips) {
          const da = ((ang - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          if (da < 0.06) b.glow = 1;
          b.glow *= 0.986;
          if (b.glow > 0.02) {
            const bx = cx + Math.cos(b.a) * R * b.d,
              by = cy + Math.sin(b.a) * R * b.d;
            ctx.fillStyle = "rgba(254,80,0," + b.glow + ")";
            ctx.beginPath();
            ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(254,110,40," + b.glow * 0.6 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(bx, by, 9, 0, Math.PI * 2);
            ctx.stroke();
            ctx.font = MF;
            ctx.fillStyle = "rgba(230,240,255," + Math.min(1, b.glow * 1.4) + ")";
            ctx.fillText(b.tm, bx + 14, by + 4);
          }
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 雙螺旋 — DNA strands across the field
function Dna({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const DTERMS = ["LLM", "RAG", "embedding", "FastAPI", "MongoDB", "Redis", "Azure", "AWS", "K8s"];
    const MF = "12px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cy = h * 0.47,
          amp = Math.min(120, h * 0.16);
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        for (let x = -10; x <= w + 10; x += 20) {
          const ph = x * 0.016 - t * 1.8;
          const y1 = cy + Math.sin(ph) * amp,
            y2 = cy + Math.sin(ph + Math.PI) * amp;
          const d1 = (Math.cos(ph) + 1) / 2,
            d2 = 1 - d1;
          const i = x / 20 | 0;
          if (i % 3 === 0) {
            ctx.strokeStyle = "rgba(160,195,255,.22)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
          }
          if (i % 9 === 4) {
            const term = DTERMS[((i - 4) / 9 | 0) % DTERMS.length];
            ctx.font = MF;
            ctx.fillStyle = i % 18 === 4 ? "rgba(254,110,40,.85)" : "rgba(215,230,255,.7)";
            ctx.fillText(term, x - ctx.measureText(term).width / 2, cy + 4);
          }
          const dot = (y, d, orange) => {
            ctx.fillStyle = orange ? "rgba(254,80,0," + (0.3 + 0.65 * d) + ")" : "rgba(205,225,255," + (0.15 + 0.6 * d) + ")";
            ctx.beginPath();
            ctx.arc(x, y, 1.4 + 2.6 * d, 0, Math.PI * 2);
            ctx.fill();
          };
          dot(y1, d1, i % 8 === 0);
          dot(y2, d2, false);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 線框山脈 — perspective wireframe terrain scrolling toward viewer
function Terra({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const F = (xw, zw) => Math.sin(xw * 1.7 + zw * 0.8) * Math.cos(xw * 0.6 - zw * 0.5) + Math.sin(xw * 3.1 + zw * 1.7) * 0.35;
    return {
      frame() {
        t += 0.014;
        const w = cv.width,
          h = cv.height,
          cx = w / 2,
          y0 = h * 0.4;
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        const sp = t * 1.4,
          zoff = Math.floor(sp),
          frac = sp - zoff;
        for (let zi = 26; zi >= 1; zi--) {
          const z = zi - frac;
          if (z <= 0.2) continue;
          const zw = zoff + zi;
          const sc = 1 / (0.3 * z + 0.7);
          const orange = zw % 13 === 0;
          ctx.strokeStyle = orange ? "rgba(254,80,0," + (0.25 + 0.6 * sc) + ")" : "rgba(180,208,255," + (0.08 + 0.42 * sc) + ")";
          ctx.lineWidth = orange ? 1.5 : 1;
          ctx.beginPath();
          for (let c = 0; c <= 56; c++) {
            const xw = c / 56 * 2 - 1;
            const e = Math.max(0, F(xw * 3, zw)) * 150 * sc * (0.35 + Math.abs(xw));
            const xs = cx + xw * w * 1.35 * sc;
            const ys = y0 + 320 * sc - e;
            if (c === 0) ctx.moveTo(xs, ys);else ctx.lineTo(xs, ys);
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 諧波軌跡 — harmonograph curve drawing itself, then starting anew
function Harmo({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let tau = 0,
      P = null,
      lx = null,
      ly = null;
    const R2 = () => Math.random() * Math.PI * 2;
    const newP = () => ({
      f1: 2 + (Math.random() * 3 | 0),
      f2: 2 + (Math.random() * 3 | 0),
      f3: 1 + (Math.random() * 4 | 0),
      f4: 1 + (Math.random() * 4 | 0),
      p1: R2(),
      p2: R2()
    });
    return {
      frame() {
        const w = cv.width,
          h = cv.height,
          cx = w * 0.62,
          cy = h * 0.47,
          A = Math.min(w, h) * 0.3;
        if (!P || tau > 300) {
          ctx.fillStyle = KB;
          ctx.fillRect(0, 0, w, h);
          P = newP();
          tau = 0;
          lx = null;
        }
        ctx.fillStyle = "rgba(0,47,167,.01)";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(200,222,255,.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        let px = lx,
          py = ly;
        for (let k = 0; k < 46; k++) {
          tau += 0.006;
          const dec = Math.exp(-tau * 0.004);
          const x = cx + (Math.sin(P.f1 * tau + P.p1) + Math.sin(P.f3 * tau * 0.5)) * 0.5 * A * dec;
          const y = cy + (Math.sin(P.f2 * tau + P.p2) + Math.sin(P.f4 * tau * 0.5)) * 0.42 * A * dec;
          if (px === null) ctx.moveTo(x, y);else if (k === 0) {
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
          } else ctx.lineTo(x, y);
          px = x;
          py = y;
        }
        ctx.stroke();
        lx = px;
        ly = py;
        ctx.fillStyle = "rgba(254,80,0,.95)";
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 幾何旋層 — nested rotating polygons with trails
function Spiro({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cx = w * 0.62,
          cy = h * 0.47;
        ctx.fillStyle = "rgba(0,47,167,.055)";
        ctx.fillRect(0, 0, w, h);
        for (let k = 0; k < 5; k++) {
          const n = k + 3,
            rad = 54 + k * 54;
          const rot = t * (0.25 + k * 0.09) * (k % 2 ? -1 : 1);
          const orange = k === 2;
          ctx.strokeStyle = orange ? "rgba(254,80,0,.6)" : "rgba(195,218,255,.35)";
          ctx.lineWidth = orange ? 1.6 : 1.1;
          ctx.beginPath();
          for (let i = 0; i <= n; i++) {
            const an = rot + i / n * Math.PI * 2;
            const x = cx + Math.cos(an) * rad,
              y = cy + Math.sin(an) * rad;
            if (i === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 頻譜柱列 — visualizer-style bars along the base
function Bars({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.02;
        const w = cv.width,
          h = cv.height,
          n = Math.ceil(w / 16);
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < n; i++) {
          const v = Math.abs(Math.sin(i * 0.33 + t * 1.4) * 0.62 + Math.sin(i * 0.11 - t * 0.8) * 0.38);
          const bh = 24 + v * h * 0.34;
          ctx.fillStyle = v > 0.9 ? "rgba(254,80,0,.85)" : "rgba(185,212,255," + (0.22 + 0.32 * v) + ")";
          ctx.fillRect(i * 16 + 3, h - bh, 9, bh);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 電子軌道 — atom-style elliptical orbits with electrons
function Atom({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    const rots = [-0.5, 0.55, 1.6];
    const ATERMS = ["LLM", "RAG", "embedding", "FastAPI", "AWS", "K8s"];
    const MF = "11px " + ((getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace").trim() || "monospace");
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          cx = w * 0.66,
          cy = h * 0.47,
          R1 = Math.min(w, h) * 0.3;
        ctx.clearRect(0, 0, w, h);
        for (let j = 0; j < 3; j++) {
          ctx.strokeStyle = "rgba(170,200,255,.3)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(cx, cy, R1, R1 * 0.38, rots[j], 0, Math.PI * 2);
          ctx.stroke();
          for (let e2 = 0; e2 < 2; e2++) {
            const ang = t * (0.45 + j * 0.18) + j * 2.1 + e2 * Math.PI;
            const ex = Math.cos(ang) * R1,
              ey = Math.sin(ang) * R1 * 0.38;
            const px = cx + ex * Math.cos(rots[j]) - ey * Math.sin(rots[j]);
            const py = cy + ex * Math.sin(rots[j]) + ey * Math.cos(rots[j]);
            const idx = j * 2 + e2,
              orange = idx === 2;
            ctx.fillStyle = orange ? "rgba(254,80,0,.25)" : "rgba(220,235,255,.22)";
            ctx.beginPath();
            ctx.arc(px, py, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = orange ? "#FE5000" : "#fff";
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = MF;
            ctx.fillStyle = orange ? "rgba(254,140,80,.95)" : "rgba(215,230,255,.8)";
            ctx.fillText(ATERMS[idx], px + 12, py + 4);
          }
        }
        const nr = 9 + Math.sin(t * 3) * 1.5;
        ctx.fillStyle = "rgba(254,80,0,.25)";
        ctx.beginPath();
        ctx.arc(cx, cy, nr * 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FE5000";
        ctx.beginPath();
        ctx.arc(cx, cy, nr, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 群鳥飛行 — boids flock, one orange leader
function Flock({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let bs = null,
      t = 0;
    return {
      frame() {
        t += 0.016;
        const cyc = t % 11;
        const scatter = cyc > 7.2 && cyc < 9.4;
        const w = cv.width,
          h = cv.height;
        if (!bs) bs = Array.from({
          length: 54
        }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6
        }));
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < bs.length; i++) {
          const b = bs[i];
          let ax = 0,
            ay = 0,
            mx = 0,
            my = 0,
            sx = 0,
            sy = 0,
            n = 0;
          for (let j = 0; j < bs.length; j++) {
            if (j === i) continue;
            const o = bs[j],
              dx = o.x - b.x,
              dy = o.y - b.y,
              d = Math.hypot(dx, dy);
            if (d < 70) {
              ax += o.vx;
              ay += o.vy;
              mx += o.x;
              my += o.y;
              n++;
              if (d < 22 && d > 0) {
                sx -= dx / d;
                sy -= dy / d;
              }
            }
          }
          if (n) {
            const alW = scatter ? 0.012 : 0.045,
              cohW = scatter ? -0.006 : 0.0045;
            b.vx += (ax / n - b.vx) * alW + (mx / n - b.x) * cohW + sx * 0.09;
            b.vy += (ay / n - b.vy) * alW + (my / n - b.y) * cohW + sy * 0.09;
          }
          const cp = scatter ? 0.00006 : 0.0003;
          b.vx += (w / 2 - b.x) * cp;
          b.vy += (h / 2 - b.y) * cp;
          if (scatter) {
            b.vx += (Math.random() - 0.5) * 0.3;
            b.vy += (Math.random() - 0.5) * 0.3;
          }
          const sp = Math.hypot(b.vx, b.vy) || 1;
          const lim = Math.min(scatter ? 2.2 : 1.6, Math.max(0.8, sp));
          b.vx = b.vx / sp * lim;
          b.vy = b.vy / sp * lim;
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < -20) b.x = w + 20;
          if (b.x > w + 20) b.x = -20;
          if (b.y < -20) b.y = h + 20;
          if (b.y > h + 20) b.y = -20;
          const k = i === 0 ? 1.5 : 1;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(Math.atan2(b.vy, b.vx));
          ctx.fillStyle = i === 0 ? "#FE5000" : "rgba(220,235,255,.75)";
          ctx.beginPath();
          ctx.moveTo(7 * k, 0);
          ctx.lineTo(-5 * k, 3.4 * k);
          ctx.lineTo(-5 * k, -3.4 * k);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 方格脈衝 — digital cell grid with a diagonal pulse wave
function Cells({
  active
}) {
  const ref = useCv(active, (cv, ctx) => {
    let t = 0;
    return {
      frame() {
        t += 0.016;
        const w = cv.width,
          h = cv.height,
          s = 44;
        ctx.fillStyle = KB;
        ctx.fillRect(0, 0, w, h);
        const tk = t * 2 | 0;
        for (let gy = 0; gy * s < h + s; gy++) for (let gx = 0; gx * s < w + s; gx++) {
          const cxp = gx * s + s / 2,
            cyp = gy * s + s / 2;
          const v = Math.sin((gx * s + gy * s * 1.3) * 0.005 - t * 2.1) * Math.cos(gy * s * 0.004 + t * 0.7);
          const m = Math.max(0, v);
          const orange = (gx * 7 + gy * 13 + tk) % 149 === 0;
          const sz = orange ? 20 : 6 + m * 22;
          ctx.fillStyle = orange ? "rgba(254,80,0,.9)" : "rgba(185,212,255," + (0.06 + 0.3 * m) + ")";
          ctx.fillRect(cxp - sz / 2, cyp - sz / 2, sz, sz);
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement(Cv, {
    active: active,
    refFn: ref
  });
}

// 動態字牆 — kinetic outline typography rows
const TY = "8PLUS · 架構先行 · AI SHIPPED · TRUSTED SYSTEMS · ";
function Typo({
  active
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-typo"
  }, [0, 1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row" + (i === 2 ? " o" : ""),
    style: {
      top: 1 + i * 16.5 + "%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "run",
    style: {
      animationDuration: 34 + i * 7 + "s",
      animationDirection: i % 2 ? "reverse" : "normal"
    }
  }, /*#__PURE__*/React.createElement("span", null, TY + TY + TY), /*#__PURE__*/React.createElement("span", null, TY + TY + TY)))));
}

// 日蝕光環 — sun → eclipse → separation, on loop
function Eclipse({
  active
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    active: active,
    cls: "hb-ecl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "oring"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sun"
  }), /*#__PURE__*/React.createElement("div", {
    className: "moon"
  }));
}
Object.assign(window.HeroBackdrops, {
  warp: Warp,
  ripple: Ripple,
  radar: Radar,
  dna: Dna,
  terra: Terra,
  harmo: Harmo,
  spiro: Spiro,
  bars: Bars,
  atom: Atom,
  flock: Flock,
  cells: Cells,
  typo: Typo,
  eclipse: Eclipse
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app/HeroBackdrops2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/8plus-app/Screens.jsx
try { (() => {
/* global React */
// 8plus.app v2 CI — the editorial scroll home. All copy is lifted
// from lib/content/home-sections.ts. Sections alternate blue↔orange;
// the hero is a magazine-style masthead; booking has a live slot picker.

const NS2 = window.Ds8plusDesignSystem_1b9e83;
const {
  Section,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Separator
} = NS2;
const COPY = {
  zh: {
    hero: {
      tag: "8PLUS.APP · TRUST001",
      issue: "NO.01 — 2026",
      headline: ["AI 沒有魔法，只有工程", "對的架構，接住你的需求"],
      caption: "FIG.01 — TRUST HANDSHAKE",
      cue: "往下滾動，認識 8plus",
      pillars: [{
        mark: "A",
        title: "架構先行",
        desc: "系統邊界、技術選型、可擴展設計"
      }, {
        mark: "B",
        title: "AI 導入",
        desc: "把 AI 嵌進真實流程，而非展示用"
      }, {
        mark: "C",
        title: "落地體驗",
        desc: "雲地混合 × LLM／RAG 實際上線"
      }],
      cta1: "預約諮詢",
      cta2: "看作品"
    },
    about: {
      eyebrow: "02 · STORY",
      title: "關於我",
      lead: "從生醫到全端與雲端 — 自學驅動的工程之路。",
      cta: "閱讀完整故事",
      summary: "大學讀生醫與化學，卻在自學裡找到對程式的熱情，一路轉進全端與雲端；在 SaaS 產品的實戰中累積架構觀，如今以自由接案協助團隊，把想法交付成真正可信、可維護的系統。",
      highlights: [{
        k: "代表成就",
        v: "千萬級推播 · 30 分鐘送達"
      }, {
        k: "跨域轉職",
        v: "生醫 → 工程"
      }, {
        k: "SaaS 實戰",
        v: "產品級架構經驗"
      }, {
        k: "自由接案",
        v: "顧問 · 開發 · 設計"
      }]
    },
    lab: {
      eyebrow: "03 · LAB",
      title: "作品集",
      cta: "查看全部作品"
    },
    path: {
      eyebrow: "04 · PATH",
      title: "學職涯歷程",
      lead: "從生醫到 AI 架構 — 每一步都在累積可信交付的能力。",
      cta: "查看完整歷程",
      items: [{
        year: "2026",
        period: "2026-02 → 至今",
        title: "中國信託（法金 AI）",
        sub: "高級架構師",
        desc: "AI Platform 與 RAG 架構設計、AI Agent 與知識工程落地，並參與大型架構開發與技術政策制定",
        tags: ["AI Platform", "RAG", "K8s"],
        active: true
      }, {
        year: "2025",
        period: "2025-03 → 09",
        title: "優配科技 Universal Processing",
        sub: "資深軟體工程師",
        desc: "CRM／POS／分潤系統開發，跨國團隊交付",
        tags: [".NET", "React", "AWS"]
      }, {
        year: "2024",
        period: "2024-06 → 2025-03",
        title: "台達電子",
        sub: "資深軟體工程師",
        desc: "",
        tags: []
      }, {
        year: "2021",
        period: "2021-03 → 2023-02",
        title: "91APP 九易宇軒",
        sub: "資深軟體工程師",
        desc: "電商 SaaS — 獨立打造千萬級推播架構、30 分鐘全量送達；SLA、藍綠部署、多租戶實戰",
        tags: ["SaaS", "千萬級推播", "藍綠部署"]
      }, {
        year: "2018",
        period: "2018-07",
        title: "交大 分子醫學與生物工程所",
        sub: "碩士畢業 · GPA 3.98",
        desc: "從生醫跨入工程的起點",
        tags: ["R", "Python"]
      }]
    },
    services: {
      eyebrow: "01 · SERVICES",
      title: "我能提供什麼",
      cta: "了解服務詳情",
      items: [{
        title: "程式架構諮詢",
        desc: "系統邊界、技術選型、可擴展與可維護的架構設計"
      }, {
        title: "網站開發",
        desc: "Next.js 全端開發、生產級交付與迭代上線"
      }, {
        title: "設計包案",
        desc: "從資訊架構到視覺語言的完整設計落地"
      }, {
        title: "整體資訊規劃",
        desc: "內容模型、導覽 IA、轉換動線的系統性規劃"
      }]
    },
    blog: {
      eyebrow: "05 · JOURNAL",
      title: "心法與思考",
      cta: "閱讀全部文章",
      read: "閱讀"
    },
    booking: {
      eyebrow: "06 · CONTACT / BOOKING",
      title: "預約 30 分鐘諮詢",
      lead: "聊聊你的需求 — 從架構、開發到設計，一起找到可落地的路線。",
      cta: "前往完整預約頁",
      confirm: "確認預約",
      booked: "已預約",
      again: "再約一次",
      pick: "選一個時段"
    }
  },
  en: {
    hero: {
      tag: "8PLUS.APP · TRUST001",
      issue: "NO.01 — 2026",
      headline: ["No magic in AI — just engineering", "The right architecture catches every need"],
      caption: "FIG.01 — TRUST HANDSHAKE",
      cue: "Scroll to meet 8plus",
      pillars: [{
        mark: "A",
        title: "Architecture first",
        desc: "Boundaries, stack choices, scalable design"
      }, {
        mark: "B",
        title: "AI integration",
        desc: "Embed AI in real workflows, not demos"
      }, {
        mark: "C",
        title: "Real deployment",
        desc: "Hybrid cloud × LLM/RAG, actually live"
      }],
      cta1: "Book a call",
      cta2: "See the work"
    },
    about: {
      eyebrow: "02 · STORY",
      title: "About me",
      lead: "From biomed to full-stack and cloud — a self-driven engineering path.",
      cta: "Read the full story",
      summary: "From biomedical science to full-stack and cloud — self-taught, forged on real SaaS products. Now freelancing to help teams turn ideas into trusted, maintainable systems.",
      highlights: [{
        k: "Track record",
        v: "10M-scale push · 30-min delivery"
      }, {
        k: "Cross-field",
        v: "Biomed → Engineering"
      }, {
        k: "SaaS",
        v: "Production architecture"
      }, {
        k: "Freelance",
        v: "Consult · Build · Design"
      }]
    },
    lab: {
      eyebrow: "03 · LAB",
      title: "Selected work",
      cta: "View all projects"
    },
    path: {
      eyebrow: "04 · PATH",
      title: "Career path",
      lead: "From biomed to AI architecture — every step compounds toward trusted delivery.",
      cta: "View full path",
      items: [{
        year: "2026",
        period: "2026-02 → Present",
        title: "CTBC Bank (Corporate AI)",
        sub: "Senior Architect",
        desc: "AI platform & RAG architecture, AI agents and knowledge engineering — plus large-scale architecture programs and technical policy",
        tags: ["AI Platform", "RAG", "K8s"],
        active: true
      }, {
        year: "2025",
        period: "2025-03 → 09",
        title: "Universal Processing LLC",
        sub: "Senior Software Engineer",
        desc: "CRM / POS / revenue-share systems with a cross-border team",
        tags: [".NET", "React", "AWS"]
      }, {
        year: "2024",
        period: "2024-06 → 2025-03",
        title: "Delta Electronics",
        sub: "Senior Software Engineer",
        desc: "",
        tags: []
      }, {
        year: "2021",
        period: "2021-03 → 2023-02",
        title: "91APP",
        sub: "Senior Software Engineer",
        desc: "E-commerce SaaS — built a 10M-scale push architecture delivering in 30 minutes; SLA, blue-green deploys, multi-tenant",
        tags: ["SaaS", "Push at scale", "Blue-green"]
      }, {
        year: "2018",
        period: "2018-07",
        title: "NCTU — Molecular Medicine & Bioengineering",
        sub: "M.S. · GPA 3.98",
        desc: "Where biomed crossed into engineering",
        tags: ["R", "Python"]
      }]
    },
    services: {
      eyebrow: "01 · SERVICES",
      title: "What I offer",
      cta: "Explore services",
      items: [{
        title: "Architecture consulting",
        desc: "System boundaries, stack choices, scalable architecture"
      }, {
        title: "Web development",
        desc: "Next.js full-stack delivery and iterative shipping"
      }, {
        title: "Design packages",
        desc: "End-to-end design from IA to visual language"
      }, {
        title: "Information planning",
        desc: "Content models, navigation IA, conversion flows"
      }]
    },
    blog: {
      eyebrow: "05 · JOURNAL",
      title: "Thinking & craft",
      cta: "Read all posts",
      read: "Read"
    },
    booking: {
      eyebrow: "06 · CONTACT / BOOKING",
      title: "Book a 30-minute call",
      lead: "Talk through your needs — from architecture and development to design.",
      cta: "Open full booking page",
      confirm: "Confirm booking",
      booked: "Booked",
      again: "Book another",
      pick: "Pick a slot"
    }
  }
};
const eyebrowRow = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 32
};
const h2 = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.75rem, 4vw, 3rem)",
  lineHeight: 1.08,
  letterSpacing: "-0.03em",
  fontWeight: 400,
  color: "var(--fg)",
  margin: "10px 0 0"
};
const eye = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--muted)"
};

// --- Editorial hero (blue field) — switchable animated main visuals ---
const HERO_LABELS = {
  combo: "隧道 · 作品卡",
  flow: "流場線",
  logo: "8+ 字標",
  lines: "線流交會",
  topo: "等高線地形",
  dots: "半調點陣",
  orbit: "軌道系統",
  iso: "架構堆疊",
  wave: "聲波緞帶",
  sphere: "點陣球體",
  tape: "雜誌拼貼",
  bp: "電路藍圖",
  warp: "星際穿越",
  ripple: "漣漪擴散",
  radar: "雷達掃描",
  dna: "雙螺旋",
  terra: "線框山脈",
  harmo: "諧波軌跡",
  spiro: "幾何旋層",
  bars: "頻譜柱列",
  atom: "電子軌道",
  flock: "群鳥飛行",
  cells: "方格脈衝",
  typo: "動態字牆",
  eclipse: "日蝕光環"
};
function Hero({
  c
}) {
  const [variant, setVariant] = React.useState(() => {
    const v = typeof localStorage !== "undefined" && localStorage.getItem("heroBg2");
    return HERO_LABELS[v] ? v : "combo";
  });
  const [swOpen, setSwOpen] = React.useState(false);
  const [logoTick, setLogoTick] = React.useState(0);
  const secRef = React.useRef(null),
    cvRef = React.useRef(null),
    sceneRef = React.useRef(null),
    lineRef = React.useRef(null),
    logoLinesRef = React.useRef(null),
    fieldRef = React.useRef(null);
  const setV = v => {
    setVariant(v);
    if (v === "logo") setLogoTick(n => n + 1);
    try {
      localStorage.setItem("heroBg2", v);
    } catch (e) {}
  };
  const nodes = React.useMemo(() => Array.from({
    length: 7
  }, () => ({
    left: 18 + Math.random() * 64 + "%",
    top: 24 + Math.random() * 52 + "%",
    d: Math.random() * 3 + "s"
  })), []);
  const cards = [{
    t: "前後端串接",
    en: "Full-stack Integration",
    s: ["Next.js", "API", "tRPC"]
  }, {
    t: "電商平台開發",
    en: "E-commerce Platform",
    s: ["Shopify", "金流", "訂單"]
  }, {
    t: "形象網站設計",
    en: "Brand Website",
    s: ["RWD", "CMS", "SEO"]
  }, {
    t: "CI · LOGO 設計",
    en: "Brand Identity",
    s: ["Logo", "視覺", "規範"]
  }, {
    t: "AI 導入與自動化",
    en: "AI Integration",
    s: ["LLM", "RAG", "Agent"]
  }, {
    t: "雲端架構顧問",
    en: "Cloud Architecture",
    s: ["AWS", "CI/CD", "效能"]
  }];
  React.useEffect(() => {
    if (variant !== "flow") return;
    const cv = cvRef.current,
      sec = secRef.current;
    if (!cv || !sec) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d");
    let raf,
      ps = [],
      t = 0;
    const resize = () => {
      cv.width = sec.clientWidth;
      cv.height = sec.clientHeight;
      ps = Array.from({
        length: Math.min(640, cv.width / 1.5 | 0)
      }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        c: Math.random() < .3 ? "255,125,60" : "175,205,255"
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003;
      ctx.fillStyle = "rgba(0,47,167,.085)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      for (const p of ps) {
        const a = Math.sin(p.x * 0.004 + t) + Math.cos(p.y * 0.004 - t);
        const nx = p.x + Math.cos(a * 3) * 1.4,
          ny = p.y + Math.sin(a * 3) * 1.4;
        ctx.strokeStyle = "rgba(" + p.c + ",.66)";
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        if (p.x < 0 || p.x > cv.width || p.y < 0 || p.y > cv.height) {
          p.x = Math.random() * cv.width;
          p.y = Math.random() * cv.height;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    if (!reduce) draw();else {
      ctx.fillStyle = "#002FA7";
      ctx.fillRect(0, 0, cv.width, cv.height);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);
  React.useEffect(() => {
    if (variant !== "logo") return;
    const svg = logoLinesRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const ns = "http://www.w3.org/2000/svg";
    const P = {
        x: 640,
        y: 375
      },
      N = 46;
    for (let i = 0; i < N; i++) {
      const ang = i / N * Math.PI * 2 + (Math.random() - .5) * 0.12;
      const R = 360 + Math.random() * 520;
      const ex = P.x + Math.cos(ang) * R,
        ey = P.y + Math.sin(ang) * R;
      const gap = 90 + Math.random() * 70; // don't draw over the mark itself
      const sx = P.x + Math.cos(ang) * gap,
        sy = P.y + Math.sin(ang) * gap;
      const p = document.createElementNS(ns, "path");
      p.setAttribute("d", "M " + ex.toFixed(1) + " " + ey.toFixed(1) + " L " + sx.toFixed(1) + " " + sy.toFixed(1));
      p.setAttribute("class", "fl2");
      const orange = Math.random() < 0.24;
      p.setAttribute("stroke", orange ? "#FE5000" : "rgba(159,192,255,.85)");
      p.setAttribute("stroke-width", orange ? 1.3 : 0.9);
      p.style.setProperty("--dur", (2.2 + Math.random() * 2.4).toFixed(2) + "s");
      p.style.animationDelay = (-Math.random() * 3).toFixed(2) + "s";
      svg.appendChild(p);
    }
  }, [variant, logoTick]);
  React.useEffect(() => {
    if (variant !== "lines") return;
    const cv = fieldRef.current,
      sec = secRef.current;
    if (!cv || !sec) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = cv.getContext("2d");
    let raf,
      ps = [],
      t = 0;
    const P = () => ({
      x: cv.width * 0.66,
      y: cv.height * 0.48
    });
    const resize = () => {
      cv.width = sec.clientWidth;
      cv.height = sec.clientHeight;
      ps = Array.from({
        length: Math.min(620, cv.width / 1.6 | 0)
      }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        c: Math.random() < .28 ? "255,140,80" : "160,195,255"
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.005;
      const p = P();
      ctx.fillStyle = "rgba(0,47,167,.055)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      for (const o of ps) {
        const a = Math.atan2(p.y - o.y, p.x - o.x) + Math.sin((o.x + o.y) * 0.004 + t) * 0.8;
        const nx = o.x + Math.cos(a) * 1.9,
          ny = o.y + Math.sin(a) * 1.9;
        ctx.strokeStyle = "rgba(" + o.c + ",.5)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(o.x, o.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        o.x = nx;
        o.y = ny;
        if (o.x < 0 || o.x > cv.width || o.y < 0 || o.y > cv.height || Math.hypot(o.x - p.x, o.y - p.y) < 16) {
          o.x = Math.random() * cv.width;
          o.y = Math.random() * cv.height;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    if (!reduce) draw();else {
      ctx.fillStyle = "#002FA7";
      ctx.fillRect(0, 0, cv.width, cv.height);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);
  React.useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const set = () => {
      const h = document.querySelector("#scroller > header");
      const hh = h ? h.getBoundingClientRect().height : 0;
      sec.style.height = window.innerHeight - hh + "px";
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  React.useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (sceneRef.current && variant !== "combo") sceneRef.current.style.transform = "";
    if (reduce || variant !== "combo") return;
    const onM = e => {
      const dx = e.clientX / window.innerWidth - .5,
        dy = e.clientY / window.innerHeight - .5;
      if (sceneRef.current) sceneRef.current.style.transform = "translate(" + dx * -16 + "px," + dy * -10 + "px)";
    };
    window.addEventListener("mousemove", onM);
    return () => window.removeEventListener("mousemove", onM);
  }, [variant]);
  const labels = HERO_LABELS;
  const ORDER = Object.keys(labels);
  const HB = window.HeroBackdrops || {};
  const corner = ["logo", "lines", "orbit", "iso", "sphere", "tape", "bp", "radar", "atom", "eclipse", "spiro", "harmo"].indexOf(variant) !== -1;
  const flat = ["flow", "lines", "topo", "dots", "wave", "bp", "warp", "ripple", "radar", "dna", "terra", "harmo", "spiro", "bars", "flock", "cells"].indexOf(variant) !== -1;
  return /*#__PURE__*/React.createElement("section", {
    ref: secRef,
    className: "bg-blue noise-field" + (corner ? " hero-corner" : ""),
    onClick: e => {
      if (e.target.closest("button, a")) return;
      const r = secRef.current ? secRef.current.getBoundingClientRect() : null;
      if (r) window.dispatchEvent(new CustomEvent("heroTap", {
        detail: {
          x: e.clientX - r.left,
          y: e.clientY - r.top
        }
      }));
    },
    style: {
      position: "relative",
      height: "calc(100vh - 73px)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: flat ? "#002FA7" : "radial-gradient(120% 120% at 50% 44%, #0a44d8, #002FA7 50%, #001a5c 92%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: sceneRef,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      transition: "transform .3s ease"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hv-bg" + (variant === "combo" ? " on" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ht-scene"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ht-plane ht-floor"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ht-plane ht-ceil"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ht-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hv-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space"
  }, cards.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "card",
    style: {
      transform: "rotateY(" + i / cards.length * 360 + "deg) translateZ(330px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, "SERVICE // " + String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "ttl"
  }, p.t), /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, p.en), /*#__PURE__*/React.createElement("span", {
    className: "stack"
  }, p.s.map(x2 => /*#__PURE__*/React.createElement("span", {
    key: x2
  }, x2)))))))), /*#__PURE__*/React.createElement("div", {
    className: "hv-bg hv-flow" + (variant === "flow" ? " on" : "")
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: cvRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "hv-bg hv-logo" + (variant === "logo" ? " on" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "lfield"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lp lfloor"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lp lceil"
  })), variant === "logo" && /*#__PURE__*/React.createElement("svg", {
    className: "llines",
    ref: logoLinesRef,
    viewBox: "0 0 1000 750",
    preserveAspectRatio: "xMidYMid slice"
  }), variant === "logo" && [0, 1, 2].map(k => /*#__PURE__*/React.createElement("span", {
    key: "e" + k,
    className: "echo",
    style: {
      animationDelay: k * 1.33 + "s"
    }
  })), variant === "logo" && /*#__PURE__*/React.createElement("div", {
    className: "markwrap",
    key: "mark-" + logoTick
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    fill: "none",
    role: "img",
    "aria-label": "8plus"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "c-sm",
    cx: "32",
    cy: "29",
    r: "18",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    className: "slash",
    d: "M53 9H68L36 91H21L53 9Z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "c-lg",
    cx: "70",
    cy: "64",
    r: "28",
    fill: "#FE5000"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "hv-bg hv-lines" + (variant === "lines" ? " on" : "")
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: fieldRef
  })), ORDER.map(v => {
    const C = HB[v];
    return C ? /*#__PURE__*/React.createElement(C, {
      key: v,
      active: variant === v
    }) : null;
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "hero-scrim" + (corner ? " corner" : " flat")
  }), /*#__PURE__*/React.createElement("div", {
    className: "hv-switch" + (swOpen ? " open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    role: "menu"
  }, /*#__PURE__*/React.createElement("button", {
    className: "x",
    onClick: () => setSwOpen(false),
    "aria-label": "\u95DC\u9589"
  }, "\u2715"), /*#__PURE__*/React.createElement("h4", null, "\u4E3B\u8996\u89BA \xB7 VISUAL"), /*#__PURE__*/React.createElement("div", {
    className: "grid"
  }, ORDER.map((v, i) => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: "opt" + (variant === v ? " on" : ""),
    onClick: () => setV(v),
    title: labels[v]
  }, labels[v])))), /*#__PURE__*/React.createElement("button", {
    className: "trig",
    onClick: () => setSwOpen(o => !o),
    "aria-label": "\u8ABF\u6574\u4E3B\u8996\u89BA\u8207\u6587\u6848",
    "aria-expanded": swOpen
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6h6M14 6h6M4 12h10M18 12h2M4 18h3M11 18h9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "6",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "12",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "18",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      position: "relative",
      zIndex: 10,
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      width: "100%",
      padding: "64px clamp(24px,4vw,28px)",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--meta)",
      borderBottom: "1px solid var(--border-soft)",
      paddingBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, c.hero.tag), /*#__PURE__*/React.createElement("span", null, c.hero.issue)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: corner ? "flex-start" : "flex-end",
      alignItems: corner ? "flex-start" : "center",
      textAlign: corner ? "left" : "center",
      paddingBottom: corner ? 0 : "6vh",
      paddingTop: corner ? "clamp(44px, 12vh, 88px)" : variant === "lines" ? "4vh" : 0,
      paddingLeft: corner ? 10 : 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hp-rise",
    style: corner ? {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.7rem, 3vw, 2.7rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      fontWeight: 600,
      color: "var(--fg)",
      margin: 0,
      maxWidth: "18ch",
      textShadow: "0 4px 30px rgba(0,10,50,.7)",
      animationDelay: ".2s"
    } : {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2rem, 8.5vw, 4.75rem)",
      lineHeight: 1.06,
      letterSpacing: "-0.04em",
      fontWeight: 600,
      color: "var(--fg)",
      margin: 0,
      maxWidth: "22ch",
      textShadow: "0 6px 50px rgba(0,10,50,.85)",
      animationDelay: ".15s"
    }
  }, c.hero.headline.map((line, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "block"
    }
  }, line))), /*#__PURE__*/React.createElement("div", {
    className: "hp-rise hero-ctas",
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      margin: corner ? "28px 0 0" : "34px 0 0",
      justifyContent: corner ? "flex-start" : "center",
      animationDelay: ".35s"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, c.hero.cta1), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, c.hero.cta2)), corner && /*#__PURE__*/React.createElement("ul", {
    className: "hp-rise",
    style: {
      listStyle: "none",
      padding: 0,
      margin: "38px 0 0",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      maxWidth: "34ch",
      animationDelay: ".5s"
    }
  }, c.hero.pillars.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.mark,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--accent)",
      border: "1px solid var(--border)",
      borderRadius: "9999px",
      width: 24,
      height: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: 2
    }
  }, p.mark), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14.5,
      fontWeight: 500,
      color: "var(--fg)"
    }
  }, p.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      lineHeight: 1.5,
      marginLeft: 8
    }
  }, p.desc)))))), !corner && /*#__PURE__*/React.createElement("ul", {
    className: "pillars hp-rise",
    style: {
      listStyle: "none",
      padding: "26px 0 0",
      margin: "52px 0 0",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      borderTop: "1px solid var(--border-soft)",
      animationDelay: ".55s"
    }
  }, c.hero.pillars.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.mark,
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--accent)",
      border: "1px solid var(--border)",
      borderRadius: "9999px",
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, p.mark), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 18,
      fontWeight: 500,
      margin: "3px 0 4px",
      color: "var(--fg)"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--muted)",
      margin: 0,
      lineHeight: 1.5
    }
  }, p.desc))))), /*#__PURE__*/React.createElement("p", {
    className: "scrollcue",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--meta)",
      marginTop: "clamp(32px, 5vh, 60px)",
      alignSelf: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mouse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "arw"
  }, "\u2193"), " ", c.hero.cue)));
}
function SectionHead({
  c,
  cta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: eyebrowRow
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: eye
  }, c.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, c.title)), cta && /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, cta, " \u2192"));
}

// --- 02 About (blue) ---
function About({
  c
}) {
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.about,
    cta: c.about.cta
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      lineHeight: 1.3,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      maxWidth: "24ch",
      margin: 0
    }
  }, c.about.lead), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 300,
      fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
      lineHeight: 1.85,
      color: "var(--fg-2)",
      maxWidth: "48ch",
      margin: "22px 0 0"
    }
  }, c.about.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap",
      marginTop: 30
    }
  }, c.about.highlights.map(hl => /*#__PURE__*/React.createElement("div", {
    key: hl.k,
    style: {
      border: "1px solid var(--border-soft)",
      borderRadius: 16,
      padding: "14px 18px",
      background: "var(--surface)",
      minWidth: 150
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: ".08em",
      color: "var(--accent)"
    }
  }, hl.k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14.5,
      color: "var(--fg)",
      marginTop: 5
    }
  }, hl.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 28
    }
  }, ["C# / .NET", "Vue / React", "Node / NestJS", "Kubernetes", "AWS · GCP"].map(x => /*#__PURE__*/React.createElement(Badge, {
    key: x,
    variant: "chip"
  }, x))));
}

// --- 02 Lab (blue) ---
function Lab({
  c
}) {
  const projects = [{
    title: "8plus 諮詢平台",
    en: "8plus Platform",
    desc: c.__ === "en" ? "Booking-first consulting platform, Google Calendar." : "以預約為核心的技術諮詢平台，整合 Google Calendar。",
    stack: ["Next.js", "Vercel", "GCal API"]
  }, {
    title: "電商儀表板",
    en: "Commerce Dashboard",
    desc: c.__ === "en" ? "Real-time analytics & order management." : "即時營運分析與訂單管理後台。",
    stack: ["Vue 3", "NestJS", "PostgreSQL"]
  }, {
    title: "Flash Sale API",
    en: "Flash Sale API",
    desc: c.__ === "en" ? "High-concurrency system, Redis + RabbitMQ." : "高併發秒殺系統，Redis + RabbitMQ 削峰。",
    stack: ["Node.js", "Redis", "RabbitMQ"]
  }, {
    title: "智慧社區平台",
    en: "Smart Community",
    desc: c.__ === "en" ? "Full-stack property management." : "社區物業管理全棧解決方案。",
    stack: [".NET 8", "C#", "Docker"]
  }];
  return /*#__PURE__*/React.createElement(Section, {
    field: "orange",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.lab,
    cta: c.lab.cta
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16
    },
    className: "grid-2"
  }, projects.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.title,
    variant: "highlight"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, c.__ === "en" ? p.en : p.title), /*#__PURE__*/React.createElement(CardDescription, null, p.desc)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, p.stack.map(s => /*#__PURE__*/React.createElement(Badge, {
    key: s,
    variant: "chip"
  }, s))))))));
}

// --- 03 Services (orange) ---
function Services({
  c
}) {
  const marks = ["A", "B", "C", "D"];
  return /*#__PURE__*/React.createElement(Section, {
    field: "orange",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.services,
    cta: c.services.cta
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16
    },
    className: "grid-2"
  }, c.services.items.map((item, i) => /*#__PURE__*/React.createElement(Card, {
    key: item.title,
    variant: "highlight"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(Badge, {
    style: {
      alignSelf: "flex-start"
    }
  }, marks[i], " \xB7 SERVICE"), /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      marginTop: 8
    }
  }, item.title), /*#__PURE__*/React.createElement(CardDescription, null, item.desc))))));
}

// --- 04 Journal (blue) ---
function Journal({
  c
}) {
  const posts = [{
    t: c.__ === "en" ? "Hello, 8plus!" : "Hello, 8plus！",
    d: c.__ === "en" ? "Frontend engineering, UX design, and technical consulting." : "前端工程、UX 設計與技術諮詢的起點。",
    date: "Jan 22, 2026",
    tags: ["announcement"]
  }, {
    t: c.__ === "en" ? "Boundaries before code" : "先劃邊界，再寫程式",
    d: c.__ === "en" ? "Why architecture reviews start with system boundaries." : "為什麼架構健檢從系統邊界開始。",
    date: "Feb 18, 2026",
    tags: ["architecture"]
  }, {
    t: c.__ === "en" ? "AI in real workflows" : "把 AI 放進真實流程",
    d: c.__ === "en" ? "Shipping AI features that survive production." : "讓 AI 功能真正進到生產環境。",
    date: "Mar 30, 2026",
    tags: ["ai"]
  }];
  return /*#__PURE__*/React.createElement(Section, {
    field: "orange",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.blog,
    cta: c.blog.cta
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    },
    className: "grid-3"
  }, posts.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.t,
    variant: "highlight"
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--meta)",
      margin: 0
    }
  }, p.date), /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      fontSize: 20,
      marginTop: 6
    }
  }, p.t), /*#__PURE__*/React.createElement(CardDescription, null, p.d)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, c.blog.read, " \u2192"))))));
}

// --- 04 Path (blue) — career timeline summary ---
function PathSec({
  c
}) {
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.path,
    cta: c.path.cta
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
      lineHeight: 1.4,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      maxWidth: "30ch",
      margin: "0 0 34px"
    }
  }, c.path.lead), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      position: "relative",
      borderLeft: "1px solid var(--border-soft)",
      display: "flex",
      flexDirection: "column",
      gap: 26
    }
  }, c.path.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.year + it.title,
    className: "path-row",
    style: {
      position: "relative",
      paddingLeft: 28,
      display: "grid",
      gridTemplateColumns: "120px 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: -5,
      top: 7,
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: it.active ? "var(--accent)" : "var(--bg)",
      border: it.active ? "none" : "1.5px solid var(--meta)",
      boxShadow: it.active ? "0 0 12px 2px rgba(254,80,0,.55)" : "none"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 20,
      color: it.active ? "var(--accent)" : "var(--fg)",
      lineHeight: 1
    }
  }, it.year), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: ".06em",
      color: "var(--meta)",
      marginTop: 5
    }
  }, it.period)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: 500,
      fontSize: 17,
      color: "var(--fg)"
    }
  }, it.title, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 400,
      color: "var(--muted)",
      marginLeft: 10
    }
  }, it.sub)), it.desc ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 13.5,
      lineHeight: 1.55,
      color: "var(--muted)",
      maxWidth: "52ch"
    }
  }, it.desc) : null, it.tags && it.tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginTop: 8
    }
  }, it.tags.map(tg => /*#__PURE__*/React.createElement(Badge, {
    key: tg,
    variant: "chip"
  }, tg))) : null)))));
}

// --- cal.com month_view embed replica (calLink august-wang-113/30min) ---
const CAL = {
  link: "cal.com/august-wang-113/30min",
  brand: "#FE5000",
  ink: "#1A1A1A",
  sub: "#6B7280",
  line: "#E5E7EB",
  soft: "#F3F4F6",
  bg: "#FFFFFF"
};
function IconClock() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2",
    strokeLinecap: "round"
  }));
}
function IconCam() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "6",
    width: "13",
    height: "12",
    rx: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 8l-5 4 5 4V8z",
    strokeLinejoin: "round"
  }));
}
function IconGlobe() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"
  }));
}
function CalEmbed({
  lang
}) {
  const [loading, setLoading] = React.useState(true);
  const [sel, setSel] = React.useState(9);
  const [time, setTime] = React.useState(null);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  // July 2026 — 1st is a Wednesday (index 3, Sunday-start grid)
  const days = Array.from({
    length: 31
  }, (_, i) => i + 1);
  const lead = 3,
    today = 8;
  const avail = d => d >= today && [0, 6].indexOf((lead + d - 1) % 7) === -1; // weekdays from today
  const wd = lang === "en" ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["日", "一", "二", "三", "四", "五", "六"];
  const times = ["09:30", "10:00", "10:30", "11:30", "14:00", "15:30", "17:00"];
  const T = lang === "en" ? {
    name: "August Wang",
    ev: "30 Min Meeting",
    dur: "30m",
    vid: "Cal Video",
    tz: "Asia/Taipei",
    pick: "Thu 9",
    fmt: "Thursday, July 9",
    next: "Next",
    h12: "12h",
    h24: "24h",
    confirm: "Confirm",
    booked: "You're booked",
    again: "Pick another time"
  } : {
    name: "August Wang",
    ev: "30 分鐘諮詢",
    dur: "30 分鐘",
    vid: "Cal Video 視訊",
    tz: "台北 GMT+8",
    pick: "選 7/9",
    fmt: "7 月 9 日 週四",
    next: "下一步",
    h12: "12h",
    h24: "24h",
    confirm: "確認預約",
    booked: "預約完成",
    again: "換個時段"
  };
  const cell = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    borderRadius: 8,
    fontSize: 13.5,
    fontVariantNumeric: "tabular-nums"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      overflow: "hidden",
      border: "1px solid var(--border-soft)",
      background: CAL.bg,
      color: CAL.ink,
      position: "relative",
      boxShadow: "0 30px 80px -40px rgba(0,0,0,.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      borderBottom: `1px solid ${CAL.line}`,
      background: CAL.soft
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 9,
      background: "#E5E7EB"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 9,
      background: "#E5E7EB"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 11.5,
      color: CAL.sub,
      letterSpacing: ".02em"
    }
  }, CAL.link), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      color: CAL.sub
    }
  }, "Cal.com")), loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 420,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-spin",
    style: {
      width: 38,
      height: 38,
      margin: "0 auto 14px",
      borderRadius: "50%",
      border: `2px solid ${CAL.line}`,
      borderTopColor: CAL.brand
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: CAL.sub,
      margin: 0
    }
  }, lang === "en" ? "Loading calendar…" : "載入行事曆…"))) : done ? /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 420,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 54,
      height: 54,
      borderRadius: "50%",
      background: CAL.brand,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 12l5 5L20 6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 6px",
      fontSize: 20,
      letterSpacing: "-.02em"
    }
  }, T.booked), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: CAL.sub,
      fontSize: 14
    }
  }, T.ev, " \xB7 ", T.fmt, " \xB7 ", time), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 20px",
      color: CAL.sub,
      fontSize: 13
    }
  }, T.tz), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDone(false);
      setTime(null);
    },
    style: {
      padding: "10px 20px",
      borderRadius: 999,
      border: `1px solid ${CAL.line}`,
      background: "#fff",
      color: CAL.ink,
      fontSize: 13.5,
      cursor: "pointer"
    }
  }, T.again)) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: time ? "200px 1fr 168px" : "220px 1fr",
      minHeight: 420
    },
    className: "cal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px",
      borderRight: `1px solid ${CAL.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#002FA7,#FE5000)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 13,
      fontWeight: 700
    }
  }, "AW"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: CAL.sub
    }
  }, T.name)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 14px",
      fontSize: 18,
      letterSpacing: "-.02em",
      color: CAL.ink
    }
  }, T.ev), [[/*#__PURE__*/React.createElement(IconClock, null), T.dur], [/*#__PURE__*/React.createElement(IconCam, null), T.vid], [/*#__PURE__*/React.createElement(IconGlobe, null), T.tz]].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      color: CAL.sub,
      fontSize: 13,
      margin: "9px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex"
    }
  }, r[0]), r[1]))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 22px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 15,
      letterSpacing: "-.01em"
    }
  }, lang === "en" ? "July 2026" : "2026 年 7 月"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, ["‹", "›"].map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: "none",
      background: CAL.soft,
      color: CAL.sub,
      cursor: "pointer",
      fontSize: 16
    }
  }, a)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      marginBottom: 4
    }
  }, wd.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      textAlign: "center",
      fontSize: 11,
      color: CAL.sub,
      fontWeight: 600,
      padding: "4px 0"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 2
    }
  }, Array.from({
    length: lead
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: "b" + i
  })), days.map(d => {
    const ok = avail(d),
      on = sel === d;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      onClick: () => ok && (setSel(d), setTime(null)),
      style: {
        ...cell,
        cursor: ok ? "pointer" : "default",
        background: on ? CAL.brand : ok ? CAL.soft : "transparent",
        color: on ? "#fff" : ok ? CAL.ink : "#C7CBD1",
        fontWeight: on ? 700 : d === today ? 700 : 500,
        boxShadow: d === today && !on ? `inset 0 0 0 1px ${CAL.brand}` : "none"
      }
    }, d);
  }))), time !== null || sel ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 16px",
      borderLeft: `1px solid ${CAL.line}`,
      display: sel ? "block" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 13
    }
  }, T.fmt)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      border: `1px solid ${CAL.line}`,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 14,
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "4px 10px",
      background: CAL.ink,
      color: "#fff"
    }
  }, T.h12), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "4px 10px",
      color: CAL.sub
    }
  }, T.h24)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      maxHeight: 300,
      overflowY: "auto"
    }
  }, times.map(tm => time === tm ? /*#__PURE__*/React.createElement("div", {
    key: tm,
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      padding: "11px 0",
      textAlign: "center",
      borderRadius: 8,
      border: `1px solid ${CAL.line}`,
      color: CAL.sub,
      fontSize: 13.5
    }
  }, tm), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDone(true),
    style: {
      flex: 1,
      padding: "11px 0",
      borderRadius: 8,
      border: "none",
      background: CAL.brand,
      color: "#fff",
      fontSize: 13.5,
      cursor: "pointer",
      fontWeight: 600
    }
  }, T.next)) : /*#__PURE__*/React.createElement("button", {
    key: tm,
    onClick: () => setTime(tm),
    style: {
      padding: "11px 0",
      borderRadius: 8,
      border: `1px solid ${CAL.brand}`,
      background: "#fff",
      color: CAL.brand,
      fontSize: 13.5,
      cursor: "pointer",
      fontWeight: 600,
      transition: "var(--transition-base)"
    }
  }, tm)))) : null));
}

// --- 05 Booking (dark) — real cal.com embed replica ---
function Booking({
  c
}) {
  const services = c.__ === "en" ? ["Architecture review & stack selection", "AI integration feasibility", "Dev assistance & code review"] : ["架構健檢與技術選型", "AI 導入可行性評估", "開發協助與 Code Review"];
  return /*#__PURE__*/React.createElement(Section, {
    field: "blue",
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    innerStyle: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    c: c.booking
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "0.9fr 1.1fr",
      gap: 28,
      alignItems: "start"
    },
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
      lineHeight: 1.35,
      letterSpacing: "-0.02em",
      color: "var(--fg)",
      maxWidth: "26ch",
      margin: 0
    }
  }, c.booking.lead), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      borderRadius: 22,
      border: "1px solid var(--border-soft)",
      background: "var(--surface)",
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...eye,
      margin: "0 0 14px"
    }
  }, c.__ === "en" ? "The call covers" : "諮詢包含"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, services.map(s => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      fontSize: 14.5,
      color: "var(--fg-2)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 7,
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--accent)",
      flexShrink: 0
    }
  }), s)))), /*#__PURE__*/React.createElement("div", {
    className: "contact-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 14
    }
  }, [{
    k: "EMAIL",
    v: "alec.wang.tpe@gmail.com",
    href: "mailto:alec.wang.tpe@gmail.com"
  }, {
    k: "LINE",
    v: "@482ykgdg",
    href: "#"
  }, {
    k: "INSTAGRAM",
    v: "@august.yan.terra",
    href: "#"
  }, {
    k: "GITHUB",
    v: "github.com/awtw",
    href: "https://github.com/awtw"
  }].map(ch => /*#__PURE__*/React.createElement("a", {
    key: ch.k,
    href: ch.href,
    style: {
      border: "1px solid var(--border-soft)",
      borderRadius: 14,
      padding: "10px 14px",
      background: "var(--surface)",
      display: "block",
      transition: "var(--transition-base)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: ".14em",
      color: "var(--accent)"
    }
  }, ch.k), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      color: "var(--fg-2)",
      marginTop: 4,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, ch.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 20,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, null, c.booking.cta), /*#__PURE__*/React.createElement(Badge, {
    variant: "status"
  }, "Available for consulting"))), /*#__PURE__*/React.createElement(CalEmbed, {
    lang: c.__
  })));
}
function Home({
  lang
}) {
  const c = {
    ...COPY[lang],
    __: lang
  };
  // attach lang marker to nested copy for helpers
  c.lab.__ = lang;
  c.blog.__ = lang;
  c.services.__ = lang;
  const cc = {
    ...c,
    lab: {
      ...c.lab,
      __: lang
    },
    blog: {
      ...c.blog,
      __: lang
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    c: c
  }), /*#__PURE__*/React.createElement(Services, {
    c: c
  }), /*#__PURE__*/React.createElement(About, {
    c: c
  }), /*#__PURE__*/React.createElement(Lab, {
    c: cc
  }), /*#__PURE__*/React.createElement(PathSec, {
    c: c
  }), /*#__PURE__*/React.createElement(Journal, {
    c: cc
  }), /*#__PURE__*/React.createElement(Booking, {
    c: c
  }));
}
window.Screens = {
  Home
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/8plus-app/Screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Section = __ds_scope.Section;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.DropdownMenu = __ds_scope.DropdownMenu;

__ds_ns.DropdownMenuTrigger = __ds_scope.DropdownMenuTrigger;

__ds_ns.DropdownMenuContent = __ds_scope.DropdownMenuContent;

__ds_ns.DropdownMenuItem = __ds_scope.DropdownMenuItem;

__ds_ns.DropdownMenuLabel = __ds_scope.DropdownMenuLabel;

__ds_ns.DropdownMenuSeparator = __ds_scope.DropdownMenuSeparator;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.SheetTrigger = __ds_scope.SheetTrigger;

__ds_ns.SheetClose = __ds_scope.SheetClose;

__ds_ns.SheetContent = __ds_scope.SheetContent;

__ds_ns.SheetHeader = __ds_scope.SheetHeader;

__ds_ns.SheetTitle = __ds_scope.SheetTitle;

__ds_ns.SheetDescription = __ds_scope.SheetDescription;

})();
