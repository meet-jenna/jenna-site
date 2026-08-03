import type { BlogPost } from "../types"

export const post: BlogPost = {
  slug: "jenna-vs-heytara",
  title: "Jenna vs HeyTARA: Which Restaurant Voice AI Fits You?",
  description:
    "Compare Jenna AI and HeyTARA for restaurant phone answering — order taking, POS sync, reservations, and who each product fits best in 2026.",
  keywords: [
    "Jenna vs HeyTARA",
    "HeyTARA alternative",
    "Jenna AI vs HeyTARA",
    "restaurant voice AI comparison",
  ],
  author: "The Jenna Team",
  publishedAt: "2026-08-03",
  readingTimeMinutes: 6,
  category: "Comparisons",
  body: [
    {
      type: "paragraph",
      text: "Shopping restaurant voice AI often means shortlisting [Jenna AI](/blog/what-is-jenna-ai) against peers like HeyTARA. Both aim to answer guest calls; the fit depends on how you take orders, which POS you run, and whether you want a fully managed hostess experience.",
    },
    { type: "heading", level: 2, text: "The short version" },
    {
      type: "list",
      items: [
        "Jenna — AI hostess focused on end-to-end phone orders and reservations synced to your POS, fully managed.",
        "HeyTARA — positions as an AI voice bot for restaurants covering takeout, reservations, and related guest tasks.",
      ],
    },
    { type: "heading", level: 2, text: "Criteria to compare" },
    {
      type: "table",
      caption: "Confirm current capabilities and pricing in each vendor’s demo.",
      headers: ["Criterion", "What to verify on a demo"],
      rows: [
        ["Order taking", "Full modifiers, totals confirmation, delivery vs pickup"],
        ["POS sync", "Orders land in your live system without double entry"],
        ["Reservations", "Party size, timing, special requests"],
        ["Concurrency", "Multiple simultaneous calls during rush"],
        ["Setup model", "Fully managed vs self-serve configuration"],
        ["Pricing", "Per location, per minute, and overage predictability"],
      ],
    },
    { type: "heading", level: 2, text: "Where Jenna fits" },
    {
      type: "paragraph",
      text: "Choose [Meet Jenna](/about) when phone-driven orders are core revenue and you want tickets written into the POS you already trust. Jenna is built as an [AI hostess](/ai-hostess) — not a voicemail replacement. See also our comparison with [Slang AI and Loman AI](/blog/jenna-vs-slang-vs-loman).",
    },
    { type: "heading", level: 2, text: "Where HeyTARA may fit" },
    {
      type: "paragraph",
      text: "HeyTARA markets restaurant-built voice automation across takeout and reservations. It’s worth a demo if their integration list and packaging match your stack — then run the same live order test with Jenna so you compare apples to apples.",
    },
    { type: "heading", level: 2, text: "How to decide" },
    {
      type: "list",
      ordered: true,
      items: [
        "Estimate order vs reservation vs FAQ call mix for a typical week.",
        "Book demos with two vendors and place a real-style order on each.",
        "Confirm the ticket in your POS before you talk pricing.",
        "Pick the predictable monthly cost that matches your volume.",
      ],
    },
    {
      type: "cta",
      text: "Hear Jenna take an order side by side with your current process.",
      label: "Book a Jenna demo",
      href: "/book-demo",
    },
    {
      type: "paragraph",
      text: "Disclaimer: HeyTARA positioning reflects publicly available marketing and may change. Verify features, integrations, and pricing directly with HeyTARA.",
    },
  ],
  related: [
    { label: "Jenna vs Slang vs Loman", href: "/blog/jenna-vs-slang-vs-loman" },
    { label: "Best Voice AI for Restaurants", href: "/blog/best-voice-ai-for-restaurants-2026" },
    { label: "What Is Jenna AI?", href: "/blog/what-is-jenna-ai" },
  ],
}
