/**
 * Structured blog content. Posts are authored as typed content blocks rather
 * than MDX so everything stays type-safe, lint-clean, and renderable as a
 * server component with no extra build tooling.
 *
 * Inline links are supported inside `paragraph` / `list` / `quote` text using
 * markdown link syntax, e.g. "see our [AI hostess](/ai-hostess) page".
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "cta"; text: string; label: string; href: string }

export interface BlogPost {
  slug: string
  title: string
  /** Meta description + index excerpt. */
  description: string
  keywords: string[]
  author: string
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string
  /** ISO date (YYYY-MM-DD), if updated after publish. */
  updatedAt?: string
  readingTimeMinutes: number
  category: string
  body: ContentBlock[]
  related: { label: string; href: string }[]
}
