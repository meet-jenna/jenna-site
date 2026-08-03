/**
 * Official brand profiles and contact for entity SEO (sameAs / footer / press).
 * Set NEXT_PUBLIC_* URLs in Vercel once each profile is claimed — empty values
 * are omitted from schema and footer so we never publish dead links.
 */

export const SITE_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mail@meetjenna.ai"

export interface SocialProfile {
  id: "x" | "linkedin" | "github" | "youtube" | "producthunt" | "crunchbase"
  label: string
  /** Absolute profile URL, or null if not yet claimed. */
  url: string | null
}

function envUrl(value: string | undefined): string | null {
  const trimmed = value?.trim()
  if (!trimmed) return null
  try {
    const url = new URL(trimmed)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    return url.toString().replace(/\/$/, "")
  } catch {
    return null
  }
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  { id: "x", label: "X", url: envUrl(process.env.NEXT_PUBLIC_SOCIAL_X_URL) },
  { id: "linkedin", label: "LinkedIn", url: envUrl(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL) },
  { id: "github", label: "GitHub", url: envUrl(process.env.NEXT_PUBLIC_SOCIAL_GITHUB_URL) },
  { id: "youtube", label: "YouTube", url: envUrl(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL) },
  {
    id: "producthunt",
    label: "Product Hunt",
    url: envUrl(process.env.NEXT_PUBLIC_SOCIAL_PRODUCTHUNT_URL),
  },
  {
    id: "crunchbase",
    label: "Crunchbase",
    url: envUrl(process.env.NEXT_PUBLIC_SOCIAL_CRUNCHBASE_URL),
  },
]

/** Profiles with live URLs — used for Organization sameAs and footer icons. */
export function getActiveSocialProfiles(): SocialProfile[] {
  return SOCIAL_PROFILES.filter((p): p is SocialProfile & { url: string } => Boolean(p.url))
}

export function getSameAsUrls(): string[] {
  return getActiveSocialProfiles().map((p) => p.url as string)
}

/** Canonical one-line bio for directories and social bios (keep identical everywhere). */
export const BRAND_DIRECTORY_BIO =
  "Jenna (meetjenna.ai) — AI voice hostess for restaurants. Answers every call 24/7, takes pickup and delivery orders, and books reservations synced to your POS."

export const BRAND_SHORT_BIO =
  "AI voice hostess for restaurants · meetjenna.ai"

export const BRAND_PRESS_BOILERPLATE =
  "Jenna is an AI voice hostess for restaurants. Available at meetjenna.ai, Jenna answers phone calls 24/7, takes pickup and delivery orders, and books reservations — syncing everything to the restaurant’s existing POS with no new hardware."
