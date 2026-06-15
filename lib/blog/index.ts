import type { BlogPost } from "./types"
import { post as bestVoiceAi } from "./posts/best-voice-ai-for-restaurants-2026"
import { post as jennaVsSlangVsLoman } from "./posts/jenna-vs-slang-vs-loman"
import { post as aiPhoneAnsweringCost } from "./posts/ai-phone-answering-service-cost"
import { post as stopMissingCalls } from "./posts/stop-missing-restaurant-calls"

const POSTS: BlogPost[] = [bestVoiceAi, jennaVsSlangVsLoman, aiPhoneAnsweringCost, stopMissingCalls]

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getAllPostSlugs(): string[] {
  return POSTS.map((p) => p.slug)
}

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
})

export function formatPostDate(iso: string): string {
  return DATE_FMT.format(new Date(`${iso}T00:00:00Z`))
}

export type { BlogPost } from "./types"
