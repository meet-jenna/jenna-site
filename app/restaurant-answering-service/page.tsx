import type { Metadata } from "next"
import LandingPage from "../../components/marketing/landing-page"
import { getLandingPage } from "../../lib/landing-pages"

const content = getLandingPage("restaurant-answering-service")!

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  keywords: content.keywords,
  alternates: { canonical: `/${content.slug}` },
  openGraph: {
    title: `${content.metaTitle} — Jenna`,
    description: content.metaDescription,
    url: `/${content.slug}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.metaTitle} — Jenna`,
    description: content.metaDescription,
  },
}

export default function Page() {
  return <LandingPage content={content} />
}
