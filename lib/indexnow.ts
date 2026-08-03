import { absoluteUrl, SITE_URL } from "./seo"
import { getAllPosts } from "./blog"
import { LANDING_PAGES } from "./landing-pages"
import { TOP_POS_INTEGRATIONS } from "./integrations/pos"

/** Public IndexNow key — also hosted at /{key}.txt */
export const INDEXNOW_KEY = "jenna8f3a91c2e6b047d5a1"

/** All indexable marketing URLs to notify Bing/Yandex/etc via IndexNow. */
export function getIndexableUrls(): string[] {
  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/press",
    "/partners",
    "/privacy",
    "/terms",
    "/book-demo",
    "/blog",
    "/integrations",
    "/voice-ai-for-restaurants",
    "/ai-phone-answering",
    "/restaurant-answering-service",
    "/ai-hostess",
  ]

  return [
    ...staticPaths.map((p) => absoluteUrl(p)),
    ...LANDING_PAGES.map((p) => absoluteUrl(`/${p.slug}`)),
    ...TOP_POS_INTEGRATIONS.map((p) => absoluteUrl(`/integrations/${p.id}`)),
    ...getAllPosts().map((p) => absoluteUrl(`/blog/${p.slug}`)),
  ]
}

export async function submitIndexNow(urls: string[] = getIndexableUrls()): Promise<{
  ok: boolean
  status: number
  body: string
}> {
  const host = new URL(SITE_URL).host
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: absoluteUrl(`/${INDEXNOW_KEY}.txt`),
      urlList: urls,
    }),
  })
  const body = await res.text()
  return { ok: res.ok || res.status === 202, status: res.status, body }
}
