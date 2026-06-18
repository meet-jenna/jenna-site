import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import SiteNav from "../../components/marketing/site-nav"
import CTASection from "../../components/cta-section"
import FooterSection from "../../components/footer-section"
import StructuredData from "../../components/structured-data"
import { getAllPosts, formatPostDate } from "../../lib/blog"
import { absoluteUrl, buildBreadcrumbJsonLd } from "../../lib/seo"

const description =
  "Guides, comparisons, and operator playbooks on voice AI, AI phone answering, and running a smarter restaurant phone line — from the team behind Jenna."

export const metadata: Metadata = {
  title: "Blog — Restaurant Voice AI Guides",
  description,
  keywords: ["restaurant AI blog", "voice AI for restaurants", "AI phone answering guide", "restaurant operations"],
  alternates: { canonical: "/blog" },
  openGraph: { title: "Jenna Blog — Restaurant Voice AI Guides", description, url: "/blog", type: "website" },
  twitter: { card: "summary_large_image", title: "Jenna Blog — Restaurant Voice AI Guides", description },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ])

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Jenna Blog",
    url: absoluteUrl("/blog"),
    description,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      author: { "@type": "Organization", name: p.author },
    })),
  }

  return (
    <div className="w-full min-h-screen relative bg-[#F7F7F7] overflow-x-hidden flex flex-col items-center font-sans">
      <StructuredData data={[breadcrumb, blogJsonLd]} />
      <SiteNav />

      <main className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-6 flex flex-col gap-14 sm:gap-16">
        <section className="flex flex-col justify-start items-center text-center pt-6 sm:pt-10">
          <h1 data-reveal className="w-full max-w-[760px] text-[#242424] text-[2rem] sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.1] md:leading-[1.12] font-sans tracking-[-0.025em]">
            The Jenna Blog
          </h1>
          <p data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties} className="mt-4 w-full max-w-[560px] text-[#6B7280] text-base md:text-lg font-normal leading-7 font-sans">
            {description}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-reveal="scale"
              style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
              className="hover-lift group bg-[#EFEFEF] rounded-[6px] p-6 sm:p-8 flex flex-col gap-3 hover:bg-[#E6E6E6] transition-colors"
            >
              <div className="flex items-center gap-3 text-xs font-medium font-sans">
                <span className="px-2.5 py-1 rounded-full bg-white border border-[rgba(36,36,36,0.10)] text-[#242424]">
                  {post.category}
                </span>
                <span className="text-[#9CA3AF]">
                  {formatPostDate(post.publishedAt)} · {post.readingTimeMinutes} min read
                </span>
              </div>
              <h2 className="text-[#242424] text-lg sm:text-xl font-semibold leading-snug font-sans group-hover:text-[#101010] transition-colors">
                {post.title}
              </h2>
              <p className="text-[#6B7280] text-sm md:text-[15px] font-normal leading-relaxed font-sans">
                {post.description}
              </p>
            </Link>
          ))}
        </section>

        <CTASection />
      </main>

      <div className="w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 pb-8">
        <FooterSection />
      </div>
    </div>
  )
}
