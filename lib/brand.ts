/** Jenna brand assets — source file lives in /public/brand */
export const JENNA_LOGO = "/brand/jenna-logo.png"

/** Logo brand blue — use only on the logo image itself, not UI accents */
export const BRAND_BLUE = "#1c00ff"

export type JennaLogoShape = "circle" | "app"

/** Tailwind classes for logo crop shapes */
export const JENNA_LOGO_SHAPE_CLASS: Record<JennaLogoShape, string> = {
  /** Former “J in a circle” avatars and chat bubbles */
  circle: "rounded-full object-cover",
  /** Header / nav — app-icon style with soft corners */
  app: "rounded-[22%] object-cover",
}
