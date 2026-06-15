import type { BlogPost } from "../types"

export const post: BlogPost = {
  slug: "stop-missing-restaurant-calls",
  title: "How to Stop Missing Calls at Your Restaurant (and Why It's Costing You)",
  description:
    "Missed restaurant calls are lost orders. Here's why phones go unanswered during rushes, how much it costs, and seven ways to make sure every call gets answered.",
  keywords: [
    "stop missing restaurant calls",
    "restaurant missed calls",
    "restaurant phone management",
    "answer every restaurant call",
    "restaurant missed orders",
  ],
  author: "The Jenna Team",
  publishedAt: "2026-06-12",
  readingTimeMinutes: 6,
  category: "Operations",
  body: [
    {
      type: "paragraph",
      text: "Here's an uncomfortable truth: during your busiest hours, your phone is probably ringing through to nobody. Every one of those calls is a customer ready to spend money — and most won't call back. This post covers why it happens and what you can actually do about it.",
    },
    { type: "heading", level: 2, text: "Why restaurants miss calls" },
    {
      type: "list",
      items: [
        "The rush. When the dining room is full, no one can step away to answer a ringing phone.",
        "Single-line bottlenecks. A second caller hits a busy signal while staff handle the first.",
        "After hours. Calls outside open hours go to voicemail — and rarely convert.",
        "Repetitive questions. Staff burn time on \"what are your hours?\" instead of serving guests.",
      ],
    },
    { type: "heading", level: 2, text: "What missed calls actually cost" },
    {
      type: "paragraph",
      text: "Put a number on it. If you miss even five calls a night with an average order of $35, that's $175 a night — over $60,000 a year — walking to a competitor. And that ignores the lifetime value of customers who never came back after hitting voicemail. We break down the economics in [how much an AI phone answering service costs](/blog/ai-phone-answering-service-cost).",
    },
    { type: "heading", level: 2, text: "Seven ways to stop missing calls" },
    {
      type: "list",
      ordered: true,
      items: [
        "Track the problem first — ask your phone provider for missed-call and busy-signal reports.",
        "Add a second line or rollover so a busy number doesn't dead-end.",
        "Create a quick-reference sheet so any staffer can answer common questions fast.",
        "Put your hours, menu, and online ordering link everywhere so simple questions self-serve.",
        "Designate phone coverage during known rush windows.",
        "Offer online ordering to deflect some volume — but remember many guests still prefer to call.",
        "Use voice AI to answer every call automatically, 24/7, even during the rush.",
      ],
    },
    { type: "heading", level: 2, text: "Why voice AI is the durable fix" },
    {
      type: "paragraph",
      text: "Staffing, signage, and online ordering all help at the margins, but they still depend on a human being free to pick up. Voice AI removes that dependency entirely: it answers every call on the first ring, takes the full order into your POS, books reservations, and handles questions — with unlimited concurrent calls so nothing rings busy. That's exactly what [Jenna](/ai-hostess) was built to do.",
    },
    {
      type: "quote",
      text: "We used to lose orders every Friday night because no one could get to the phone. Jenna answers every single call now — pickup revenue is up and the kitchen isn't slammed by the phone.",
      cite: "Tony Russo, Owner, Vitos Northport",
    },
    {
      type: "cta",
      text: "Stop sending callers to voicemail.",
      label: "Book a demo",
      href: "/book-demo",
    },
  ],
  related: [
    { label: "AI Phone Answering", href: "/ai-phone-answering" },
    { label: "AI phone answering cost", href: "/blog/ai-phone-answering-service-cost" },
    { label: "Best Voice AI for Restaurants (2026)", href: "/blog/best-voice-ai-for-restaurants-2026" },
  ],
}
