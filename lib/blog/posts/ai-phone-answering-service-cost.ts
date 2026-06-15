import type { BlogPost } from "../types"

export const post: BlogPost = {
  slug: "ai-phone-answering-service-cost",
  title: "How Much Does an AI Phone Answering Service for Restaurants Cost?",
  description:
    "A clear breakdown of AI phone answering costs for restaurants in 2026 — pricing models, what drives the price, how it compares to a hire, and what Jenna costs.",
  keywords: [
    "AI phone answering service cost",
    "restaurant answering service pricing",
    "AI phone answering price",
    "how much does AI phone answering cost",
    "restaurant voice AI cost",
  ],
  author: "The Jenna Team",
  publishedAt: "2026-06-09",
  readingTimeMinutes: 6,
  category: "Pricing",
  body: [
    {
      type: "paragraph",
      text: "\"How much does it cost?\" is the first question most operators ask about AI phone answering — and the honest answer is that it depends on the pricing model. This post explains the common models, what drives the price, and how it stacks up against the alternative of hiring someone to cover the phone.",
    },
    { type: "heading", level: 2, text: "The three pricing models" },
    {
      type: "list",
      items: [
        "Flat per-location, per-month — a predictable monthly fee, usually with a block of included minutes. Easiest to budget.",
        "Per-minute — you pay for talk time. Flexible, but unpredictable when call volume spikes.",
        "Per-message or per-call — common with traditional answering services. Costs balloon with volume and rarely includes full order-taking.",
      ],
    },
    { type: "heading", level: 2, text: "What drives the price" },
    {
      type: "list",
      items: [
        "Call volume and average call length (more orders = more minutes).",
        "Number of locations.",
        "Whether the service is fully managed or self-configured.",
        "Add-ons like custom voice, multi-location dashboards, SSO, and dedicated support.",
      ],
    },
    { type: "heading", level: 2, text: "What Jenna costs" },
    {
      type: "paragraph",
      text: "Jenna uses flat, predictable per-location pricing with included minutes — no per-message surprises:",
    },
    {
      type: "table",
      headers: ["Plan", "Price", "Included", "Best for"],
      rows: [
        ["Starter", "$500 / location / mo", "750 minutes; $0.65/min overage", "Single-location restaurants"],
        ["Enterprise", "$999 / location / mo", "Multi-location, dedicated support", "Groups and operators at scale"],
      ],
    },
    {
      type: "paragraph",
      text: "Both plans include 24/7 answering, menu and FAQ handling, reservations, staff call transfers, call recordings, a dashboard, and unlimited concurrent calls. See the full breakdown on the [pricing section](/#pricing) of our homepage.",
    },
    { type: "heading", level: 2, text: "How that compares to hiring" },
    {
      type: "paragraph",
      text: "A part-time staffer dedicated to the phone costs far more than a per-location AI plan once you add wages, payroll taxes, and the reality that one person can't answer two calls at once — or work 24/7. AI phone answering covers every call simultaneously, including after hours, for a flat rate. The math usually favors AI the moment you're missing calls during rushes.",
    },
    { type: "heading", level: 2, text: "The hidden cost: missed calls" },
    {
      type: "paragraph",
      text: "The biggest line item is the one that doesn't show up on an invoice — the orders you never captured because no one picked up. We cover that in [how to stop missing calls at your restaurant](/blog/stop-missing-restaurant-calls).",
    },
    {
      type: "cta",
      text: "See exactly what Jenna would cost for your restaurant.",
      label: "Book a demo",
      href: "/book-demo",
    },
  ],
  related: [
    { label: "Restaurant Answering Service", href: "/restaurant-answering-service" },
    { label: "Stop missing restaurant calls", href: "/blog/stop-missing-restaurant-calls" },
    { label: "AI Phone Answering", href: "/ai-phone-answering" },
  ],
}
