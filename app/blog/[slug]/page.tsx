import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import SiteNav from "../../../components/marketing/site-nav"
import CTASection from "../../../components/cta-section"
import FooterSection from "../../../components/footer-section"
import StructuredData from "../../../components/structured-data"
import PostContent from "../../../components/blog/post-content"
import { getPost, getAllPostSlugs, formatPostDate } from "../../../lib/blog"
import { absoluteUrl, buildBreadcrumbJsonLd } from "../../../lib/seo"

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ])

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords.join(", "),
    author: { "@type": "Organization", name: post.author, url: absoluteUrl("/") },
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  }

  return (
    <div className="w-full min-h-screen relative bg-[#FFFFFF] overflow-x-hidden flex flex-col items-center font-sans">
      <StructuredData data={[breadcrumb, articleJsonLd]} />
      <SiteNav />

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-6 flex flex-col gap-12 sm:gap-16">
        <article className="w-full max-w-[760px] mx-auto flex flex-col gap-8">
          {/* Header */}
          <header className="flex flex-col gap-4">
            <Link href="/blog" className="text-[#6B7280] text-sm font-medium font-sans hover:text-[#242424] transition-colors">
              ← All posts
            </Link>
            <div className="flex items-center gap-3 text-xs font-medium font-sans">
              <span className="px-2.5 py-1 rounded-full bg-[#FAF9FB] border border-[rgba(36,36,36,0.10)] text-[#242424]">
                {post.category}
              </span>
              <span className="text-[#9CA3AF]">
                {formatPostDate(post.publishedAt)} · {post.readingTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-[#242424] text-3xl sm:text-4xl md:text-[44px] font-semibold leading-[1.12] font-sans tracking-[-0.02em]">
              {post.title}
            </h1>
            <div className="text-[#6B7280] text-sm font-medium font-sans">By {post.author}</div>
          </header>

          {/* Body */}
          <PostContent body={post.body} />

          {/* Related */}
          {post.related.length > 0 && (
            <section className="mt-4 pt-8 border-t border-[rgba(36,36,36,0.12)] flex flex-col gap-4">
              <h2 className="text-[#242424] text-lg font-semibold font-sans">Keep reading</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {post.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#FAF9FB] border border-[rgba(36,36,36,0.10)] text-[#242424] text-sm font-medium font-sans hover:bg-[#F4F2F6] transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <CTASection />
      </main>

      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}
