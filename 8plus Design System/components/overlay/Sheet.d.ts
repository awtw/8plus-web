import React from "react";

/**
 * Side drawer (cosmetic). Compositional: wrap trigger + content in
 * <Sheet>. Used for the mobile nav on 8plus.app.
 *
 * @startingPoint section="Overlay" subtitle="Side drawer / mobile nav" viewport="700x420"
 */
export function Sheet(props: { children: React.ReactNode; defaultOpen?: boolean }): JSX.Element;
export function SheetTrigger(props: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }): JSX.Element;
export function SheetClose(props: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }): JSX.Element;
export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "right" */
  side?: "top" | "bottom" | "left" | "right";
}
export function SheetContent(props: SheetContentProps): JSX.Element;
export function SheetHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SheetTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function SheetDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
