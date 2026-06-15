import type { PosIntegrationId } from "./pos"

export interface PosContent {
  /** One-line value prop shown under the hero. */
  tagline: string
  /** Crawlable intro paragraph specific to this POS. */
  intro: string
}

/**
 * Per-POS marketing copy. Kept distinct per system so each integration page
 * has genuinely unique content (avoids thin/duplicate-content penalties).
 */
export const POS_CONTENT: Record<PosIntegrationId, PosContent> = {
  toast: {
    tagline: "Jenna answers your phone and drops every order straight into Toast.",
    intro:
      "Jenna connects to Toast POS so phone orders, modifiers, and pickup times appear on your kitchen tickets automatically — exactly as if a server rang them in. Your live Toast menu and pricing keep Jenna accurate on every call, with no new hardware to install.",
  },
  square: {
    tagline: "AI phone answering that syncs every order to Square.",
    intro:
      "Jenna reads your live Square menu and prices, takes the full order on the call, and sends it to Square so it flows through to your kitchen and receipts. Reservations and pickup orders are handled end to end, 24/7.",
  },
  clover: {
    tagline: "Let Jenna take orders by phone and push them into Clover.",
    intro:
      "Jenna integrates with Clover to capture pickup and delivery orders over the phone and route them into your existing Clover workflow. She confirms each order with the caller before it reaches the kitchen, so tickets are always right.",
  },
  "oracle-micros": {
    tagline: "Enterprise-grade AI phone answering for Oracle MICROS.",
    intro:
      "Jenna works with Oracle MICROS to bring AI phone answering to full-service and multi-location operations. Orders and reservations sync into MICROS while Jenna handles every call with your menu, hours, and greeting.",
  },
  "ncr-aloha": {
    tagline: "AI that answers calls and sends orders into NCR Aloha.",
    intro:
      "Jenna connects to NCR Aloha so phone orders land in the system your staff already run. She answers every call instantly, reads your live menu, and confirms each order before it hits the kitchen — no extra terminals required.",
  },
  lightspeed: {
    tagline: "Phone orders and reservations, synced to Lightspeed.",
    intro:
      "Jenna integrates with Lightspeed to take orders and bookings over the phone and sync them automatically. Your live menu and pricing keep every call accurate, and each interaction is logged in your dashboard.",
  },
  shift4: {
    tagline: "AI phone answering that connects to Shift4.",
    intro:
      "Jenna works with Shift4 to capture phone orders and reservations and route them into your point of sale. She answers 24/7 with unlimited concurrent calls, so you never miss an order during a rush.",
  },
  flipdish: {
    tagline: "Turn phone calls into FlipDish orders, automatically.",
    intro:
      "Jenna pairs with FlipDish to take phone orders and feed them into your ordering stack. She handles pickup, delivery, and questions about your menu and hours, then logs every call for full visibility.",
  },
  dripos: {
    tagline: "AI phone answering built to sync with Dripos.",
    intro:
      "Jenna connects to Dripos so phone orders and reservations flow into the system you already use. She answers every call on the first ring and confirms each order with the caller before sending it through.",
  },
  gotab: {
    tagline: "Let Jenna answer the phone and push orders to GoTab.",
    intro:
      "Jenna integrates with GoTab to capture phone orders and reservations and sync them automatically. Your live menu keeps Jenna accurate, and your team stays focused on guests instead of the phone.",
  },
}
