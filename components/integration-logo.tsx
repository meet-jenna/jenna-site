import { getPosIntegration, type PosIntegrationId } from "@/lib/integrations/pos"

/** Default grid sizing — tuned to Cursor-style logo-to-cell ratio */
const DEFAULT_GRID_LOGO_CLASS =
  "h-[28%] w-auto max-w-[46%] object-contain object-center brightness-0 opacity-[0.68]"

/** Per-logo tweaks; stacked/script wordmarks read lighter at default scale */
const GRID_LOGO_CLASS: Partial<Record<PosIntegrationId, string>> = {
  "oracle-micros":
    "h-[50%] w-auto max-w-[85%] object-contain object-center brightness-0 opacity-[0.68]",
  "ncr-aloha":
    "h-[48%] w-auto max-w-[82%] object-contain object-center brightness-0 opacity-[0.68]",
}

/** Single wordmark sized for the POS logo grid (Cursor-style dark, compact) */
export function PosGridWordmark({ id }: { id: PosIntegrationId }) {
  const integration = getPosIntegration(id)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={integration.logo}
      alt={integration.name}
      className={GRID_LOGO_CLASS[id] ?? DEFAULT_GRID_LOGO_CLASS}
    />
  )
}
