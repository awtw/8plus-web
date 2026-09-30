import React from "react";

/** 1px hairline divider. */
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}
export function Separator(props: SeparatorProps): JSX.Element;
