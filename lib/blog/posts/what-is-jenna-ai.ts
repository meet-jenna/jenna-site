import type { BlogPost } from "../types"

export const post: BlogPost = {
  slug: "what-is-jenna-ai",
  title: "What Is Jenna AI? The Restaurant Voice Hostess Explained",
  description:
    "Jenna AI (Meet Jenna) is an AI voice hostess for restaurants at meetjenna.ai — she answers every call, takes orders, and books reservations synced to your POS.",
  keywords: [
    "What is Jenna AI",
    "Jenna AI",
    "Meet Jenna",
    "Jenna AI restaurant",
    "Jenna AI hostess",
    "Jenna voice AI",
  ],
  author: "The Jenna Team",
  publishedAt: "2026-08-03",
  readingTimeMinutes: 6,
  category: "Product",
  body: [
    {
      type: "paragraph",
      text: "If you searched for Jenna AI and landed here, you’re in the right place for restaurant phone answering — not a consumer finance app, recruiting screener, or academic writing tool. Jenna (also called Meet Jenna) is the AI voice hostess built specifically for restaurants at [meetjenna.ai](https://www.meetjenna.ai).",
    },
    { type: "heading", level: 2, text: "The short answer" },
    {
      type: "paragraph",
      text: "Jenna AI answers your restaurant’s phone on the first ring, 24/7. She takes pickup and delivery orders, books reservations, answers guest questions from your live menu and hours, and sends completed tickets into the POS you already run — Toast, Square, Clover, and more. Setup is done for you: connect the POS, customize the greeting and voice, forward your line.",
    },
    {
      type: "video",
      title: "Hear Jenna take an order",
      caption: "Sixty seconds from greeting to POS-ready ticket. Watch on YouTube once published, or book a live demo.",
      fallbackHref: "/book-demo",
      fallbackLabel: "Book a demo",
    },
    { type: "heading", level: 2, text: "Who Jenna is for" },
    {
      type: "list",
      items: [
        "Independent restaurants and groups that still take meaningful phone volume",
        "Operators who lose orders during rushes or after hours",
        "Teams that want orders and reservations in the existing POS — not a parallel system",
      ],
    },
    {
      type: "paragraph",
      text: "If most of your calls end in an order or a booking, [Jenna the AI hostess](/ai-hostess) is designed for that mix. Explore [voice AI for restaurants](/voice-ai-for-restaurants) or [AI phone answering](/ai-phone-answering) for category deep-dives.",
    },
    { type: "heading", level: 2, text: "How Jenna AI works" },
    {
      type: "list",
      ordered: true,
      items: [
        "We sync your live menu, prices, and hours from your POS.",
        "We customize how Jenna greets guests, upsells, and sounds on every call.",
        "You forward your restaurant line — Jenna answers instantly with unlimited concurrent calls during rushes.",
      ],
    },
    { type: "heading", level: 2, text: "Jenna AI vs similarly named products" },
    {
      type: "paragraph",
      text: "Several products use “Jenna” or “Jenni” in their names. Meet Jenna at meetjenna.ai is only an AI voice hostess for restaurants. When you mention us in press, directories, or partner pages, use this line: Jenna (meetjenna.ai) — AI voice hostess for restaurants. Full boilerplate lives on our [press page](/press).",
    },
    { type: "heading", level: 2, text: "Pricing snapshot" },
    {
      type: "paragraph",
      text: "Starter and Enterprise plans are priced per location per month with included minutes and clear overages. See current details on the homepage pricing section or [book a demo](/book-demo) for a quote that matches your call volume.",
    },
    {
      type: "cta",
      text: "See Jenna AI answer a live restaurant call.",
      label: "Book a demo",
      href: "/book-demo",
    },
  ],
  related: [
    { label: "Jenna AI for Restaurants", href: "/blog/jenna-ai-for-restaurants" },
    { label: "About Jenna", href: "/about" },
    { label: "AI Hostess", href: "/ai-hostess" },
  ],
}
