import type { BlogPost } from "../types"

export const post: BlogPost = {
  slug: "hear-jenna-take-an-order",
  title: "Hear Jenna Take an Order: Demo Walkthrough",
  description:
    "Watch or book a live demo of Jenna AI taking a restaurant pickup order — greeting, modifiers, total confirmation, and POS sync in under a minute.",
  keywords: [
    "Jenna AI demo",
    "Hear Jenna",
    "Jenna order taking",
    "Meet Jenna demo",
    "restaurant AI hostess demo",
  ],
  author: "The Jenna Team",
  publishedAt: "2026-08-03",
  readingTimeMinutes: 4,
  category: "Product",
  body: [
    {
      type: "paragraph",
      text: "The fastest way to evaluate [Jenna AI](/blog/what-is-jenna-ai) is to hear her work. This page is the home for our short “Hear Jenna take an order” video and the live demo path for operators who want to test against their own menu.",
    },
    {
      type: "video",
      title: "Hear Jenna take an order (60 seconds)",
      caption:
        "Embeds automatically when NEXT_PUBLIC_DEMO_YOUTUBE_ID is set after you publish the YouTube clip. Until then, book a live demo.",
      fallbackHref: "/book-demo",
      fallbackLabel: "Book a live demo",
    },
    { type: "heading", level: 2, text: "What you’ll hear in the demo" },
    {
      type: "list",
      ordered: true,
      items: [
        "Natural greeting branded to the restaurant",
        "Item and modifier capture from a live-style menu",
        "Pickup vs delivery and timing confirmation",
        "Total readback before the ticket is finalized",
        "Order synced toward the POS / kitchen path",
      ],
    },
    { type: "heading", level: 2, text: "Why video + live demos both matter" },
    {
      type: "paragraph",
      text: "A short YouTube clip helps Google and buyers discover Meet Jenna in brand SERPs (and can earn a video result). A live [booked demo](/book-demo) lets you stress-test your real modifiers, rush concurrency, and POS. Publish the clip on your official YouTube channel, then set NEXT_PUBLIC_DEMO_YOUTUBE_ID and NEXT_PUBLIC_SOCIAL_YOUTUBE_URL — checklist on the [press page](/press).",
    },
    {
      type: "cta",
      text: "Ready for the live version with your POS in mind?",
      label: "Book a demo",
      href: "/book-demo",
    },
  ],
  related: [
    { label: "What Is Jenna AI?", href: "/blog/what-is-jenna-ai" },
    { label: "Jenna AI for Restaurants", href: "/blog/jenna-ai-for-restaurants" },
    { label: "Vitos case study", href: "/blog/jenna-case-study-vitos-northport" },
  ],
}
