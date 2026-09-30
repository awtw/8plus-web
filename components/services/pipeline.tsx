import type { PipelineStep } from '@/lib/content/process-pricing'

export function Pipeline({ steps, className = '' }: { steps: PipelineStep[]; className?: string }) {
  return (
    <ol className={`services-grid ${className}`}>
      {steps.map((s) => (
        <li key={s.step}>
          <article className="services-card">
            <span className="services-card-meta">STEP {s.step}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </article>
        </li>
      ))}
    </ol>
  )
}
