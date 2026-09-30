import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

/** Second screen: the three working principles that used to crowd the hero. */
export function SectionPrinciples({ locale }: { locale: HomeLocale }) {
  const content = getHomeSectionContent(locale)
  const { pillars, principlesTitle } = content.hero

  return (
    <section
      id="home-section-principles"
      className="home-section home-section-principles bg-dark noise-field"
      aria-labelledby="home-principles-title"
    >
      <div className="home-section-inner section-shell">
        <p className="scroll-eyebrow">00 // PRINCIPLES</p>
        <h2 id="home-principles-title" className="home-section-title">
          {principlesTitle}
        </h2>
        <ul className="home-principles-grid">
          {pillars.map((p) => (
            <li key={p.mark} className="home-principles-card">
              <span className="home-principles-mark" aria-hidden="true">{p.mark}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
