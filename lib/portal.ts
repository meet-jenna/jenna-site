/**
 * URL of the customer portal (the `meet-jenna` dashboard app).
 *
 * Defaults to the portal's Vercel deployment, which always resolves. Once the
 * custom domain `portal.meetjenna.ai` has a DNS record (CNAME ->
 * cname.vercel-dns.com at the meetjenna.ai DNS provider), switch this to
 * https://portal.meetjenna.ai. Override with NEXT_PUBLIC_PORTAL_URL for local
 * development (e.g. http://localhost:3001) via .env.local.
 */
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://jenna-portal.vercel.app"
