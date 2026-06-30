'use client'

import type { ProcessStep } from "@/lib/content/process-pricing";

type ProcessStepsProps = {
  steps: ProcessStep[];
  compact?: boolean;
};

export function ProcessSteps({ steps, compact = false }: ProcessStepsProps) {
  return (
    <ol className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"}`}>
      {steps.map((step) => (
        <li key={step.step} className="surface-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
              {step.step}
            </span>
            <span className="metric-chip shrink-0">{step.duration}</span>
          </div>
          <h3 className="mt-3 text-base font-semibold tracking-[-0.02em] break-words text-[color:var(--fg)]">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
