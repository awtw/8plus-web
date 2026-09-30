import React from "react";

/**
 * Dropdown menu (cosmetic). Closes on outside click or item
 * select. Used for the 8plus language switcher.
 *
 * @startingPoint section="Overlay" subtitle="Dropdown menu" viewport="700x300"
 */
export function DropdownMenu(props: { children: React.ReactNode }): JSX.Element;
export function DropdownMenuTrigger(props: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }): JSX.Element;
export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "start" */
  align?: "start" | "center" | "end";
}
export function DropdownMenuContent(props: DropdownMenuContentProps): JSX.Element;
export function DropdownMenuItem(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DropdownMenuLabel(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function DropdownMenuSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
