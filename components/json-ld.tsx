import { SITE } from "@/lib/seo";

const SERVICES = [
  ["Commissioned web and system development", "Websites, systems and internal tools from planning to launch and iteration."],
  ["Technical consulting", "Architecture design, technology selection, code review and delivery workflow advice."],
  ["Applied AI", "Assessment, prototyping and production rollout of AI in real workflows, with cost control."],
  ["Training and workshops", "In-house programs on AI tooling, frontend engineering, architecture and collaboration."],
  ["Career conversations", "One-on-one sessions on technical paths, career moves, portfolios and growth plans."],
] as const;

/** Site-wide structured data: Person, WebSite, ProfessionalService with an offer catalog. */
export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        inLanguage: ["zh-TW", "en"],
        publisher: { "@id": `${SITE.url}/#studio` },
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: "August Wang",
        url: SITE.url,
        jobTitle: "Independent engineer and consultant",
        worksFor: { "@id": `${SITE.url}/#studio` },
        knowsAbout: ["Software architecture", "Applied AI", "Next.js", "Frontend engineering", "Technical training"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#studio`,
        name: "8plus",
        url: SITE.url,
        description: SITE.description,
        areaServed: ["TW", "Worldwide"],
        founder: { "@id": `${SITE.url}/#person` },
        availableLanguage: ["zh-TW", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "8plus services",
          itemListElement: SERVICES.map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, description },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
