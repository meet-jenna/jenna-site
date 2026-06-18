import { faqData } from "./faq"
import { JENNA_LOGO } from "./brand"

/**
 * Canonical production origin for the marketing site.
 * Override with NEXT_PUBLIC_SITE_URL (e.g. for preview deployments).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.meetjenna.ai").replace(/\/$/, "")

export const SITE_NAME = "Jenna"

export const SITE_TAGLINE = "AI Voice Hostess & Phone Answering for Restaurants"

export const SITE_DESCRIPTION =
  "Jenna is the AI voice hostess for restaurants — she answers every call 24/7, takes pickup and delivery orders, and books reservations, all synced to your existing POS."

/** Primary keyword targets for the brand. */
export const SITE_KEYWORDS = [
  "restaurant AI",
  "voice AI",
  "AI for restaurants",
  "AI phone answering for restaurants",
  "AI hostess",
  "restaurant phone answering service",
  "AI voice agent",
  "restaurant call answering AI",
  "AI order taking",
  "AI reservations",
  "Jenna AI",
]

/** Absolute URL helper for canonical/OG links. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Jenna AI",
  url: SITE_URL,
  logo: absoluteUrl(JENNA_LOGO),
  description: SITE_DESCRIPTION,
  slogan: "The AI Hostess for Every Restaurant",
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
}

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Restaurant phone answering & voice AI",
  operatingSystem: "Cloud-based (web)",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "500",
      priceCurrency: "USD",
      description: "Per location, per month. 750 minutes included.",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      price: "999",
      priceCurrency: "USD",
      description: "Per location, per month. Multi-location, dedicated support.",
    },
  ],
  provider: { "@id": `${SITE_URL}/#organization` },
}

/** Build FAQPage JSON-LD from any set of Q&A items. */
export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

/** Build BreadcrumbList JSON-LD from an ordered list of crumbs. */
export function buildBreadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export const faqJsonLd = buildFaqJsonLd(faqData)
