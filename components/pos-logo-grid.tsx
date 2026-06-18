import Link from "next/link"
import { PosGridWordmark } from "./integration-logo"
import type { PosIntegrationId } from "@/lib/integrations/pos"

const cellClassName =
  "hover-lift flex h-14 sm:h-16 md:h-[4.5rem] lg:h-[5rem] xl:h-[6.25rem] w-full items-center justify-center px-2.5 sm:px-3 bg-[#EFEFEF] rounded-[6px]"

type PosLogoGridProps = {
  ids: readonly PosIntegrationId[]
  className?: string
  linkToIntegrations?: boolean
}

export function PosLogoGrid({ ids, className, linkToIntegrations = false }: PosLogoGridProps) {
  return (
    <div className={`grid grid-cols-4 lg:grid-cols-8 gap-2 ${className ?? ""}`}>
      {ids.map((id) => {
        const cell = (
          <div className={cellClassName}>
            <PosGridWordmark id={id} />
          </div>
        )

        if (linkToIntegrations) {
          return (
            <Link
              key={id}
              href={`/integrations/${id}`}
              className="group transition-colors hover:[&>div]:bg-[#E6E6E6]"
            >
              {cell}
            </Link>
          )
        }

        return <div key={id}>{cell}</div>
      })}
    </div>
  )
}
