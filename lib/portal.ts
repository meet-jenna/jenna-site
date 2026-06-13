/**
 * URL of the customer portal (the `meet-jenna` dashboard app).
 *
 * Not deployed yet — defaults to the local dev server (`localhost:3001`).
 * Set NEXT_PUBLIC_PORTAL_URL once the portal is hosted
 * (likely https://portal.meetjenna.ai).
 */
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:3001"
