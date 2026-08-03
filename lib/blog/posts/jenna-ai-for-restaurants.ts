import type { BlogPost } from "../types"

export const post: BlogPost = {
  slug: "jenna-ai-for-restaurants",
  title: "Jenna AI for Restaurants: Phone Orders, Reservations, POS Sync",
  description:
    "How Jenna AI helps restaurants capture every phone order and reservation — first-ring answering, live menu accuracy, and POS sync without new hardware.",
  keywords: [
    "Jenna AI for restaurants",
    "Jenna AI restaurant",
    "restaurant voice AI",
    "Jenna phone answering",
    "Meet Jenna restaurants",
  ],
  author: "The Jenna Team",
  publishedAt: "2026-08-03",
  readingTimeMinutes: 7,
  category: "Guides",
  body: [
    {
      type: "paragraph",
      text: "Phone lines still drive pickup, delivery, and reservations for thousands of restaurants — and they still get missed when the floor is slammed. [Jenna AI](/blog/what-is-jenna-ai) is built for that gap: an AI voice hostess that answers every call and writes clean tickets into your POS.",
    },
    { type: "heading", level: 2, text: "What Jenna handles on every call" },
    {
      type: "list",
      items: [
        "Pickup and delivery orders with modifiers and accurate totals",
        "Table reservations and party-size requests",
        "Hours, location, and FAQ answers from your live data",
        "Call transcripts, recordings, and dashboard analytics",
      ],
    },
    {
      type: "paragraph",
      text: "Because Jenna reads your live menu and prices from the POS, guests hear the same information your kitchen uses — which cuts comps from wrong sizes and missing modifiers. Learn more about [AI phone answering for restaurants](/ai-phone-answering).",
    },
    { type: "heading", level: 2, text: "POS integrations that matter" },
    {
      type: "paragraph",
      text: "Meet Jenna connects to major restaurant systems so orders land where staff already look. Browse [Toast, Square, Clover, and more](/integrations), or jump to a specific guide when you’re evaluating fit.",
    },
    {
      type: "list",
      items: [
        "[Jenna + Toast](/integrations/toast)",
        "[Jenna + Square](/integrations/square)",
        "[Jenna + Clover](/integrations/clover)",
        "Full [integrations directory](/integrations)",
      ],
    },
    { type: "heading", level: 2, text: "Why operators choose Jenna over generic answering" },
    {
      type: "paragraph",
      text: "Generic answering services can take a message. Jenna completes the revenue action — the order or the reservation — and syncs it automatically. Compared with building an in-house bot, Jenna is fully managed: we handle the POS connection, voice tuning, and ongoing reliability.",
    },
    {
      type: "quote",
      text: "We used to lose orders every Friday night because no one could get to the phone. Jenna answers every single call now — pickup revenue is up and the kitchen isn't slammed by the phone.",
      cite: "Tony Russo, Owner, Vitos Northport",
    },
    { type: "heading", level: 2, text: "Getting started" },
    {
      type: "list",
      ordered: true,
      items: [
        "Book a demo and hear Jenna take a real-style order.",
        "We connect your POS and customize greeting, voice, and upsells.",
        "Forward your line and start capturing calls the same week in many cases.",
      ],
    },
    {
      type: "cta",
      text: "Put Jenna AI on your restaurant line.",
      label: "Book a demo",
      href: "/book-demo",
    },
  ],
  related: [
    { label: "What Is Jenna AI?", href: "/blog/what-is-jenna-ai" },
    { label: "Vitos Northport case study", href: "/blog/jenna-case-study-vitos-northport" },
    { label: "Voice AI for Restaurants", href: "/voice-ai-for-restaurants" },
  ],
}
