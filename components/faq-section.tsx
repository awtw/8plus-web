'use client'

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  items: FaqItem[];
  title?: string;
  className?: string;
};

export function FaqSection({ items, title, className = "" }: FaqSectionProps) {
  return (
    <section className={className}>
      {title && (
        <h2 className="mb-6 text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.question} className="surface-card group p-5 sm:p-6">
            <summary className="cursor-pointer list-none break-words text-base font-semibold tracking-[-0.02em] text-[color:var(--fg)] marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
