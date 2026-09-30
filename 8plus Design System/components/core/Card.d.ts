import React from "react";

/**
 * Glass card over a colored section field — 22px signature radius,
 * translucent surface, hairline border. `highlight` adds hover lift
 * + gradient hairline; `strong` uses the denser glass surface.
 *
 * @startingPoint section="Core" subtitle="Glass cards over the color field" viewport="700x280"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  variant?: "default" | "strong" | "highlight";
}
export function Card(props: CardProps): JSX.Element;
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
