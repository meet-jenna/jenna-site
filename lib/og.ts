import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { JENNA_LOGO } from "./brand"

let cached: string | null = null

// OG images render at build time, before the deploy they belong to exists,
// so the logo must come from disk rather than a network fetch of SITE_URL.
export async function getLogoDataUri(): Promise<string> {
  if (!cached) {
    const data = await readFile(join(process.cwd(), "public", ...JENNA_LOGO.split("/").filter(Boolean)))
    cached = `data:image/png;base64,${data.toString("base64")}`
  }
  return cached
}
