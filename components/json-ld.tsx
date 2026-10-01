import { SITE } from "@/lib/seo";

const SERVICES = [
  ["Commissioned AI application development", "AI applications, systems and internal tools from planning to launch and iteration."],
  ["Technical consulting", "AI feasibility, architecture and technology selection, UIX and analytics advice."],
  ["Applied AI", "AI architecture for RAG and on-prem model applications: data flow, evaluation, service integration, accurate data and stable service."],
  ["Training and workshops", "In-house programs on AI-assisted development, RAG, UIX and analytics."],
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
        jobTitle: "AI application and UIX consultant",
        worksFor: { "@id": `${SITE.url}/#studio` },
        knowsAbout: ["Applied AI", "RAG", "On-prem LLM", "AI architecture", "User experience (UIX)", "Accessibility", "Google Analytics", "Technical training"],
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
