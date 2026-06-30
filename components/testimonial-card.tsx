'use client'

import type { Testimonial } from "@/lib/content/trust";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  return (
    <figure className={`surface-card flex h-full flex-col p-5 sm:p-6 ${className}`}>
      {testimonial.metric && (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--accent)]">
          {testimonial.metric}
        </p>
      )}
      <blockquote className="mt-3 flex-1 text-sm leading-7 text-[color:var(--fg-2)]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 border-t border-border-soft pt-4">
        <p className="text-sm font-medium text-[color:var(--fg)]">{testimonial.author}</p>
        <p className="text-xs text-[color:var(--muted)]">
          {testimonial.role} · {testimonial.company}
        </p>
      </figcaption>
    </figure>
  );
}
