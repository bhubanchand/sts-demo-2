/**
 * Helper utilities for generating JSON-LD Structured Data (Schema.org)
 */

export function generateWebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `https://www.sourcetrace.com${url}`,
    "publisher": {
      "@type": "Organization",
      "name": "SourceTrace",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.sourcetrace.com/sourcetrace-logo.png"
      }
    }
  };
}

export function generateProductSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "url": `https://www.sourcetrace.com${url}`,
    "brand": {
      "@type": "Brand",
      "name": "SourceTrace"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://www.sourcetrace.com${url}`
    }
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; item: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http")
        ? item.item
        : `https://www.sourcetrace.com${item.item}`
    }))
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
