/**
 * URL of the customer portal (the `meet-jenna` dashboard app).
 *
 * Live at the custom domain https://portal.meetjenna.ai. Override with
 * NEXT_PUBLIC_PORTAL_URL for local development (e.g. http://localhost:3001)
 * via .env.local.
 */
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.meetjenna.ai"
