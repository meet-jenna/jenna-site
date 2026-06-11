export type PosIntegrationId =
  | "toast"
  | "square"
  | "clover"
  | "oracle-micros"
  | "ncr-aloha"
  | "lightspeed"
  | "shift4"
  | "flipdish"
  | "dripos"
  | "gotab"

export interface PosIntegration {
  id: PosIntegrationId
  name: string
  logo: string
  /** App-icon style circle logo for constellation UI */
  circleIcon?: string
}

export const TOP_POS_INTEGRATIONS: readonly PosIntegration[] = [
  {
    id: "toast",
    name: "Toast",
    logo: "/integrations/pos/toast.svg",
    circleIcon: "/integrations/pos/icons/toast-circle.svg",
  },
  {
    id: "square",
    name: "Square",
    logo: "/integrations/pos/square.svg",
    circleIcon: "/integrations/pos/icons/square-circle.svg",
  },
  {
    id: "clover",
    name: "Clover",
    logo: "/integrations/pos/clover.svg",
    circleIcon: "/integrations/pos/icons/clover-circle.svg",
  },
  {
    id: "oracle-micros",
    name: "Oracle MICROS",
    logo: "/integrations/pos/oracle-micros.png",
    circleIcon: "/integrations/pos/icons/oracle-micros-circle.svg",
  },
  {
    id: "ncr-aloha",
    name: "NCR Aloha",
    logo: "/integrations/pos/ncr-aloha.png",
    circleIcon: "/integrations/pos/icons/ncr-aloha-circle.svg",
  },
  {
    id: "lightspeed",
    name: "Lightspeed",
    logo: "/integrations/pos/lightspeed.png",
  },
  {
    id: "shift4",
    name: "Shift4",
    logo: "/integrations/pos/shift4.png",
    circleIcon: "/integrations/pos/icons/shift4-circle.svg",
  },
  {
    id: "flipdish",
    name: "FlipDish",
    logo: "/integrations/pos/flipdish.svg",
    circleIcon: "/integrations/pos/icons/flipdish-circle.svg",
  },
  {
    id: "dripos",
    name: "Dripos",
    logo: "/integrations/pos/dripos.png",
  },
  {
    id: "gotab",
    name: "GoTab",
    logo: "/integrations/pos/gotab.png",
  },
] as const

/** Best 8 POS logos for the "Connects to Your POS" grid */
export const POS_GRID_IDS: readonly PosIntegrationId[] = [
  "toast",
  "square",
  "clover",
  "lightspeed",
  "ncr-aloha",
  "oracle-micros",
  "shift4",
  "flipdish",
] as const

export function getPosIntegration(id: PosIntegrationId): PosIntegration {
  const integration = TOP_POS_INTEGRATIONS.find((item) => item.id === id)
  if (!integration) {
    throw new Error(`Unknown POS integration: ${id}`)
  }
  return integration
}
