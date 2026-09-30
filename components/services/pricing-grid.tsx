import type { PricingTier } from '@/lib/content/process-pricing'

export function PricingGrid({ tiers }: { tiers: PricingTier[] }) {
  return (
    <ul className="services-grid services-grid-3">
      {tiers.map((t) => (
        <li key={t.name}>
          <article className="services-card">
            <span className="services-range">{t.range}</span>
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <p className="services-best">{t.bestFor}</p>
            <ul className="services-features">
              {t.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ul>
  )
}
