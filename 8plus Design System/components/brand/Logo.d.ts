import React from "react";

/**
 * The 8plus abstract mark (two circles + diagonal slash). Fixed
 * brand art — do not redraw. White on the color fields by default.
 *
 * @startingPoint section="Brand" subtitle="Logo mark & wordmark, all variants" viewport="700x200"
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Rendered mark size in px. @default 32 */
  size?: number;
  /** @default "default" */
  variant?: "default" | "mono" | "light" | "brand" | "favicon";
  /** Show the "8plus" wordmark beside the mark. @default false */
  wordmark?: boolean;
}
export function Logo(props: LogoProps): JSX.Element;
