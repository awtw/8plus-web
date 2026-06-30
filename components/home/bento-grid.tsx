'use client'

import type { ReactNode } from "react";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

type BentoCellProps = {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
};

const colSpanClass: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

const rowSpanClass: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
};

export function BentoCell({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: BentoCellProps) {
  return (
    <div
      className={`${colSpanClass[colSpan]} ${rowSpanClass[rowSpan]} ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className = "",
  strong = false,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`${strong ? "surface-card-strong" : "surface-card"} h-full rounded-[var(--radius-md)] p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
