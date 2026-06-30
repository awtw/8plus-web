import { SITE } from "@/lib/seo";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "August Wang",
        url: SITE.url,
        jobTitle: "Engineering Consultant",
        worksFor: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
      },
      {
        "@type": "ProfessionalService",
        name: "8plus Engineering & Consulting",
        url: SITE.url,
        description: SITE.description,
        areaServed: "TW",
        serviceType: [
          "Software Architecture Consulting",
          "AI Integration",
          "Full-stack Development",
        ],
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
