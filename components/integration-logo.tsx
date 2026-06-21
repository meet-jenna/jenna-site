import { getPosIntegration, type PosIntegrationId } from "@/lib/integrations/pos"

/** Fixed heights — matches Cursor logo-garden sizing (h-8 → md:h-10) */
const DEFAULT_GRID_LOGO_CLASS =
  "h-8 sm:h-9 md:h-10 w-auto max-w-[88%] object-contain object-center"

/** Stacked two-line wordmarks need a touch more room without overflowing the cell */
const GRID_LOGO_CLASS: Partial<Record<PosIntegrationId, string>> = {
  "oracle-micros":
    "h-9 sm:h-10 md:h-11 w-auto max-w-[92%] object-contain object-center",
  "ncr-aloha":
    "h-9 sm:h-10 md:h-11 w-auto max-w-[90%] object-contain object-center",
  lightspeed:
    "h-7 sm:h-8 md:h-9 w-auto max-w-[88%] object-contain object-center",
  shift4:
    "h-7 sm:h-8 md:h-9 w-auto max-w-[80%] object-contain object-center",
}

/** Renders brand logos as solid black monochrome so the grid reads as one consistent set */
const MONOCHROME_CLASS = "brightness-0"

/** Single wordmark sized for the POS logo grid (Cursor-style dark, compact) */
export function PosGridWordmark({ id }: { id: PosIntegrationId }) {
  const integration = getPosIntegration(id)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={integration.logo}
      alt={integration.name}
      className={`${GRID_LOGO_CLASS[id] ?? DEFAULT_GRID_LOGO_CLASS} ${MONOCHROME_CLASS}`}
    />
  )
}
