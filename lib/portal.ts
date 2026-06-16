/**
 * URL of the customer portal (the `meet-jenna` dashboard app), deployed at
 * https://portal.meetjenna.ai. Override with NEXT_PUBLIC_PORTAL_URL for local
 * development (e.g. http://localhost:3001) by setting it in .env.local.
 */
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.meetjenna.ai"
