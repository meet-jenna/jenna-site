export interface LandingFeature {
  title: string
  description: string
}

export interface LandingFaq {
  question: string
  answer: string
}

export interface RelatedLink {
  label: string
  href: string
}

export interface LandingPageContent {
  slug: string
  eyebrow: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  h1: string
  subhead: string
  /** Crawlable intro paragraph(s). */
  intro: string[]
  features: LandingFeature[]
  faqs: LandingFaq[]
  related: RelatedLink[]
}

export const LANDING_PAGES: LandingPageContent[] = [
  {
    slug: "voice-ai-for-restaurants",
    eyebrow: "Voice AI for Restaurants",
    metaTitle: "Voice AI for Restaurants",
    metaDescription:
      "Jenna is voice AI built for restaurants — a natural-sounding AI agent that answers every call, takes orders, and books reservations, synced to your POS 24/7.",
    keywords: [
      "voice AI for restaurants",
      "restaurant voice AI",
      "voice AI agent",
      "AI voice assistant for restaurants",
      "conversational AI for restaurants",
    ],
    h1: "Voice AI for Restaurants",
    subhead:
      "Jenna is a natural-sounding voice AI that answers your phone like your best host — taking orders, booking tables, and answering questions 24/7.",
    intro: [
      "Voice AI has finally gotten good enough to run a restaurant phone line. Jenna listens, understands what a caller actually wants, and responds in a warm, natural voice — no rigid phone trees, no \"press 1 for hours.\"",
      "Unlike generic voice bots, Jenna is purpose-built for restaurants. She reads your live menu and prices straight from your POS, confirms each order out loud, and drops it into the same system your staff already use — so the kitchen never sees a wrong ticket.",
    ],
    features: [
      {
        title: "Sounds like a real host",
        description:
          "Conversational voice AI that handles interruptions, modifiers, and follow-up questions — not a scripted menu of options.",
      },
      {
        title: "Understands restaurant intent",
        description:
          "Pickup, delivery, reservations, hours, allergens — Jenna knows the difference and routes each call to the right outcome.",
      },
      {
        title: "Always on, infinitely scalable",
        description:
          "Answers every call on the first ring, 24/7, with unlimited concurrent calls during the dinner rush.",
      },
    ],
    faqs: [
      {
        question: "What is voice AI for restaurants?",
        answer:
          "Voice AI is software that answers phone calls in a natural spoken voice, understands what the caller wants, and completes the task — like taking an order or booking a table. Jenna is voice AI built specifically for restaurant phone lines.",
      },
      {
        question: "Does the voice sound robotic?",
        answer:
          "No. Jenna uses a warm, natural-sounding voice and handles real conversation — interruptions, changes, and follow-up questions — so callers feel like they're talking to a friendly host.",
      },
      {
        question: "Can voice AI take a full order?",
        answer:
          "Yes. Jenna reads your live menu and prices, captures items and modifiers, confirms the total with the caller, and sends the finished order straight to your POS.",
      },
    ],
    related: [
      { label: "AI Phone Answering", href: "/ai-phone-answering" },
      { label: "AI Hostess", href: "/ai-hostess" },
      { label: "POS Integrations", href: "/integrations" },
    ],
  },
  {
    slug: "ai-phone-answering",
    eyebrow: "AI Phone Answering",
    metaTitle: "AI Phone Answering for Restaurants",
    metaDescription:
      "AI phone answering for restaurants. Jenna picks up every call in under a second, takes pickup and delivery orders, and books reservations — 24/7, synced to your POS.",
    keywords: [
      "AI phone answering",
      "AI phone answering for restaurants",
      "AI phone answering service",
      "automated phone answering restaurant",
      "AI call answering",
    ],
    h1: "AI Phone Answering for Restaurants",
    subhead:
      "Stop sending callers to voicemail. Jenna answers every call instantly, takes the whole order, and never puts a guest on hold.",
    intro: [
      "Every missed call is a missed order. During the dinner rush, staff can't always get to the phone — and callers who hit voicemail rarely call back. AI phone answering fixes that by picking up instantly, every time.",
      "Jenna answers on the first ring, 24/7, with no hold times and unlimited concurrent calls. She takes pickup and delivery orders, books reservations, and answers questions about hours and the menu — then logs every call in your dashboard so nothing slips through.",
    ],
    features: [
      {
        title: "Answers in under a second",
        description:
          "First-ring pickup, 24/7 — even after hours, on holidays, and when every table is full.",
      },
      {
        title: "No more voicemail or hold music",
        description:
          "Unlimited concurrent calls mean no busy signals and no callers giving up and dialing a competitor.",
      },
      {
        title: "Every call logged",
        description:
          "Caller, intent, outcome, and a full transcript land in your portal automatically for total visibility.",
      },
    ],
    faqs: [
      {
        question: "How fast does Jenna answer the phone?",
        answer:
          "Jenna answers on the first ring — typically in under a second — 24/7, with no hold times even when multiple calls come in at once.",
      },
      {
        question: "Is this an AI phone answering service or software I install?",
        answer:
          "It's fully managed. You forward your existing restaurant line to Jenna — there's no new hardware to buy and nothing for your staff to install or learn.",
      },
      {
        question: "What happens to calls after hours?",
        answer:
          "Jenna answers around the clock. After hours she can still take orders for later, book reservations, and answer common questions instead of sending callers to voicemail.",
      },
    ],
    related: [
      { label: "Restaurant Answering Service", href: "/restaurant-answering-service" },
      { label: "Voice AI for Restaurants", href: "/voice-ai-for-restaurants" },
      { label: "POS Integrations", href: "/integrations" },
    ],
  },
  {
    slug: "restaurant-answering-service",
    eyebrow: "Answering Service",
    metaTitle: "Restaurant Answering Service",
    metaDescription:
      "Jenna is a restaurant answering service powered by AI — answering calls, taking orders, and booking reservations 24/7 for a flat per-location rate, synced to your POS.",
    keywords: [
      "restaurant answering service",
      "restaurant phone answering service",
      "answering service for restaurants",
      "AI answering service",
      "virtual receptionist for restaurants",
    ],
    h1: "A Restaurant Answering Service That Actually Takes Orders",
    subhead:
      "Traditional answering services just take messages. Jenna takes the whole order and sends it to your POS — like a host who never clocks out.",
    intro: [
      "A typical answering service forwards messages and books the occasional table. That doesn't help a restaurant where most calls are orders that need to reach the kitchen now.",
      "Jenna is a restaurant answering service built for exactly that. She completes pickup and delivery orders, books reservations, answers menu and hours questions, and syncs everything to your POS — for a flat, predictable per-location rate instead of per-minute message-taking fees.",
    ],
    features: [
      {
        title: "Takes orders, not just messages",
        description:
          "Captures the full order with modifiers, confirms the total, and sends it straight to the kitchen via your POS.",
      },
      {
        title: "Flat per-location pricing",
        description:
          "Predictable monthly pricing with included minutes — no surprise per-message or overflow fees.",
      },
      {
        title: "Trained on your restaurant",
        description:
          "Your menu, prices, hours, and greeting — Jenna answers with your details, not a generic script.",
      },
    ],
    faqs: [
      {
        question: "How is Jenna different from a normal answering service?",
        answer:
          "Traditional answering services take messages and relay them later. Jenna completes the task on the call — taking full orders, booking reservations, and syncing them to your POS in real time.",
      },
      {
        question: "How much does the answering service cost?",
        answer:
          "Jenna uses simple, flat per-location pricing with included minutes — starting at $500 per location per month — instead of per-message or per-minute billing that's hard to predict.",
      },
      {
        question: "Do I have to change my phone number?",
        answer:
          "No. You keep your existing number and simply forward your line to Jenna. Setup takes days, not weeks.",
      },
    ],
    related: [
      { label: "AI Phone Answering", href: "/ai-phone-answering" },
      { label: "AI Hostess", href: "/ai-hostess" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
  {
    slug: "ai-hostess",
    eyebrow: "AI Hostess",
    metaTitle: "AI Hostess for Restaurants",
    metaDescription:
      "Meet Jenna, the AI hostess for restaurants. She greets every caller, takes orders, books tables, and answers questions 24/7 — synced to your POS, no new hardware.",
    keywords: [
      "AI hostess",
      "AI host for restaurants",
      "virtual hostess",
      "AI restaurant host",
      "AI maitre d",
    ],
    h1: "The AI Hostess for Every Restaurant",
    subhead:
      "Jenna greets every caller the way your best host would — warm, fast, and accurate — then handles the order or booking from start to finish.",
    intro: [
      "Your host sets the tone for every guest, but they can't be on the phone and on the floor at the same time. An AI hostess gives every caller that same warm welcome without pulling staff away from the room.",
      "Jenna greets callers with your custom greeting and voice, understands what they need, and takes them all the way to a confirmed order or reservation. She works 24/7, knows your live menu, and logs every interaction — so your team can focus on the guests in front of them.",
    ],
    features: [
      {
        title: "A warm, on-brand greeting",
        description:
          "Set Jenna's greeting and voice so every caller hears your restaurant — not a generic bot.",
      },
      {
        title: "Books tables and takes orders",
        description:
          "Reservations, pickup, and delivery handled end to end, with everything synced to your POS.",
      },
      {
        title: "Frees your floor staff",
        description:
          "Your team stays with the guests in the room while Jenna covers the phone, every shift.",
      },
    ],
    faqs: [
      {
        question: "What is an AI hostess?",
        answer:
          "An AI hostess is software that greets and helps callers like a human host would — taking orders, booking tables, and answering questions in a natural voice. Jenna is an AI hostess built for restaurants.",
      },
      {
        question: "Can I customize how the AI hostess sounds?",
        answer:
          "Yes. You choose the greeting, the voice, and how Jenna handles upsells and common questions, so she represents your restaurant accurately.",
      },
      {
        question: "Will an AI hostess replace my staff?",
        answer:
          "No — Jenna handles the phone so your hosts and servers can focus on guests in the dining room. She covers calls during rushes and after hours when staff can't.",
      },
    ],
    related: [
      { label: "Voice AI for Restaurants", href: "/voice-ai-for-restaurants" },
      { label: "Restaurant Answering Service", href: "/restaurant-answering-service" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
]

export function getLandingPage(slug: string): LandingPageContent | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug)
}
