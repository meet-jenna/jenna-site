/** Jenna brand assets — source file lives in /public/brand */
export const JENNA_LOGO = "/brand/jenna-logo.png"

export type JennaLogoShape = "circle" | "app"

/** The logo has a transparent background — never crop or round it. */
export const JENNA_LOGO_SHAPE_CLASS: Record<JennaLogoShape, string> = {
  circle: "object-contain",
  app: "object-contain",
}
