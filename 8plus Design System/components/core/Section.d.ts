import React from "react";

/**
 * Alternating color-field section wrapper (v2 CI signature).
 * Sets the field + complementary accent, soft-light noise, and a
 * centered max-width shell with standard vertical rhythm.
 *
 * @startingPoint section="Core" subtitle="Alternating blue/orange color-field section" viewport="900x360"
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Color field. @default "blue" */
  field?: "blue" | "orange" | "dark";
  /** Soft-light noise texture overlay. @default true */
  noise?: boolean;
  /** Style for the inner max-width shell. */
  innerStyle?: React.CSSProperties;
}
export function Section(props: SectionProps): JSX.Element;
