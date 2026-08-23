import Image from "next/image"
import {
  FOUNDER_BLURB,
  FOUNDER_IMAGE,
  FOUNDER_NAME,
  FOUNDER_URL,
} from "../../lib/founder"

/** About / press founder block. Links the product to the person Google should attach. */
export default function FounderBlock() {
  return (
    <section className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-start">
      <Image
        src={FOUNDER_IMAGE}
        alt={FOUNDER_NAME}
        width={96}
        height={96}
        className="size-24 rounded-[6px] object-cover shrink-0"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-[#242424] text-2xl font-semibold leading-tight font-sans tracking-tight">
          Founder
        </h2>
        <p>
          <a
            href={FOUNDER_URL}
            className="text-[#101010] font-medium underline underline-offset-2 hover:text-[#6B7280]"
            rel="noopener noreferrer"
          >
            {FOUNDER_NAME}
          </a>{" "}
          {FOUNDER_BLURB}
        </p>
      </div>
    </section>
  )
}
