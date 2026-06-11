import { getPosIntegration, type PosIntegrationId } from "@/lib/integrations/pos"

/** Single transparent wordmark sized to match the POS grid cells */
export function PosGridWordmark({ id }: { id: PosIntegrationId }) {
  const integration = getPosIntegration(id)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={integration.logo}
      alt={integration.name}
      className="h-6 w-auto max-w-[4.75rem] object-contain xs:max-w-[5.25rem] sm:max-w-[6.25rem] md:max-w-[7.25rem] lg:max-w-[8.75rem] xs:h-7 sm:h-8 md:h-9 lg:h-10"
    />
  )
}
