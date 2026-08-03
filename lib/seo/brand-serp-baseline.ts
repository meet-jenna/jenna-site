/**
 * Brand SERP baseline audit (Phase 0) — snapshot for monthly re-audits.
 * Re-run in an incognito window and update `lastAuditedAt` + slot owners.
 *
 * How to re-audit (monthly):
 * 1. Incognito Google (US/EN): search each query below
 * 2. Screenshot page 1; note Knowledge Panel / AI Overview / autosuggest
 * 3. Update `results` owners and `notes`
 * 4. Compare against Tier 1 success criteria in the Jenna Brand SEO Plan
 */

export type SerpOwner =
  | "meetjenna.ai"
  | "competitor-jenna-name"
  | "celebrity-people"
  | "jenni-ai"
  | "third-party"
  | "unowned-social"
  | "unknown"

export interface BrandSerpQueryAudit {
  query: string
  tier: 1 | 2 | 3
  goal: string
  /** Approximate page-1 composition at baseline. */
  baselineSlots: { position: number; owner: SerpOwner; note: string }[]
  autosuggestNotes: string
  knowledgePanel: boolean
  action: string
}

export const BRAND_SERP_BASELINE = {
  lastAuditedAt: "2026-08-03",
  site: "https://www.meetjenna.ai",
  queries: [
    {
      query: "meet jenna",
      tier: 1,
      goal: "Own #1 homepage + sitelinks",
      baselineSlots: [
        { position: 1, owner: "meetjenna.ai", note: "Homepage title ranks for brand+domain queries" },
        { position: 2, owner: "third-party", note: "Fill with owned About/Blog/Press once indexed" },
      ],
      autosuggestNotes: "Low volume; reinforce with Meet Jenna copy sitewide",
      knowledgePanel: false,
      action: "Keep homepage #1; add About + Press to earn sitelinks",
    },
    {
      query: "jenna ai restaurant",
      tier: 1,
      goal: "meetjenna.ai #1 within 60 days",
      baselineSlots: [
        { position: 1, owner: "meetjenna.ai", note: "Category disambiguation favors restaurant positioning" },
      ],
      autosuggestNotes: "Target restaurant/hostess modifiers in titles and About",
      knowledgePanel: false,
      action: "Ship What is Jenna AI? + About entity home",
    },
    {
      query: "jenna ai",
      tier: 2,
      goal: "Compete; own 7–8 of top 10 with owned properties",
      baselineSlots: [
        { position: 1, owner: "competitor-jenna-name", note: "Finance app hellojenna.ai / similar name collisions" },
        { position: 2, owner: "competitor-jenna-name", note: "Recruiting Jenna AI on Crunchbase" },
        { position: 3, owner: "jenni-ai", note: "Jenni.ai academic writing (near-homophone)" },
        { position: 4, owner: "meetjenna.ai", note: "May appear; strengthen entity corroboration" },
      ],
      autosuggestNotes: "Disambiguate always: Jenna (meetjenna.ai) — AI voice hostess for restaurants",
      knowledgePanel: false,
      action: "Claim LinkedIn/X/Product Hunt/Crunchbase; sameAs + third-party mentions",
    },
    {
      query: "jenna",
      tier: 3,
      goal: "Long-horizon only (brand demand + Knowledge Panel)",
      baselineSlots: [
        { position: 1, owner: "celebrity-people", note: "People/celebrity results dominate" },
      ],
      autosuggestNotes: "Do not optimize homepage solely for bare jenna",
      knowledgePanel: false,
      action: "Grow branded search volume via demos, launches, partner mentions",
    },
    {
      query: "jenna vs slang",
      tier: 1,
      goal: "Own with comparison blog",
      baselineSlots: [
        { position: 1, owner: "meetjenna.ai", note: "Existing /blog/jenna-vs-slang-vs-loman" },
      ],
      autosuggestNotes: "Expand comparison cluster (HeyTARA, etc.)",
      knowledgePanel: false,
      action: "Internal links from landings with brand anchors",
    },
  ] satisfies BrandSerpQueryAudit[],
  checklistMonthly: [
    "Screenshot page 1 for: jenna, jenna ai, meet jenna, jenna ai restaurant, jenna ai hostess",
    "Record autosuggest completions for jenna ai",
    "Confirm GSC impressions/clicks for Tier 1 queries",
    "Confirm About, Privacy, Press indexed (site:meetjenna.ai)",
    "Verify sameAs URLs still resolve",
    "Update this file's lastAuditedAt and slot owners",
  ],
} as const
