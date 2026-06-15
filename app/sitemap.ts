import type { MetadataRoute } from "next"
import { absoluteUrl } from "../lib/seo"
import { LANDING_PAGES } from "../lib/landing-pages"
import { TOP_POS_INTEGRATIONS } from "../lib/integrations/pos"
import { getAllPosts } from "../lib/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/book-demo"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/integrations"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified, changeFrequency: "weekly", priority: 0.8 },
  ]

  const landingEntries: MetadataRoute.Sitemap = LANDING_PAGES.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const integrationEntries: MetadataRoute.Sitemap = TOP_POS_INTEGRATIONS.map((integration) => ({
    url: absoluteUrl(`/integrations/${integration.id}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticEntries, ...landingEntries, ...integrationEntries, ...blogEntries]
}
