import React from "react";

/**
 * Pill label. `eyebrow` = uppercase mono section label; `chip` =
 * metric/meta pill; `accent` = filled accent emphasis; `status` =
 * capsule with a pulsing dot.
 *
 * @startingPoint section="Core" subtitle="Eyebrow, chip, accent & status pills" viewport="700x160"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "eyebrow" */
  variant?: "eyebrow" | "chip" | "accent" | "status";
}
export function Badge(props: BadgeProps): JSX.Element;
