import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

/**
 * The 8plus pill button (v2 CI). `primary` is white → accent on
 * hover; `secondary` is a hairline-bordered ghost. Recolors to the
 * current section field automatically. Max two primaries per view.
 *
 * @startingPoint section="Core" subtitle="Pill buttons — primary, secondary, ghost, link" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "primary" */
  variant?: ButtonVariant;
  /** @default "default" */
  size?: ButtonSize;
}

export function Button(props: ButtonProps): JSX.Element;
