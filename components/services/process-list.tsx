import type { ProcessStep } from '@/lib/content/process-pricing'

export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="services-grid services-grid-2">
      {steps.map((s) => (
        <li key={s.step}>
          <article className="services-card">
            <span className="services-card-meta">
              <span>{s.step}</span>
              <span>{s.duration}</span>
            </span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </article>
        </li>
      ))}
    </ol>
  )
}
