import Link from "next/link"
import { JENNA_LOGO, JENNA_LOGO_SHAPE_CLASS, type JennaLogoShape } from "@/lib/brand"
import { cn } from "@/lib/utils"

type JennaLogoProps = {
  shape?: JennaLogoShape
  size?: number
  className?: string
  alt?: string
}

export function JennaLogo({ shape = "app", size = 28, className, alt = "Jenna" }: JennaLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={JENNA_LOGO}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0", JENNA_LOGO_SHAPE_CLASS[shape], className)}
      style={{ width: size, height: size }}
    />
  )
}

type JennaWordmarkProps = {
  logoSize?: number
  logoShape?: JennaLogoShape
  className?: string
  textClassName?: string
}

export function JennaWordmark({
  logoSize = 28,
  logoShape = "app",
  className,
  textClassName,
}: JennaWordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <JennaLogo shape={logoShape} size={logoSize} />
      <span className={cn("text-[#242424] font-semibold font-sans", textClassName)}>Jenna</span>
    </span>
  )
}

export function JennaWordmarkLink({
  href = "/",
  logoSize = 28,
  logoShape = "app",
  className,
  textClassName,
}: JennaWordmarkProps & { href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2", className)}>
      <JennaLogo shape={logoShape} size={logoSize} />
      <span
        className={cn(
          "text-[#242424] text-lg sm:text-xl font-semibold leading-5 font-sans",
          textClassName,
        )}
      >
        Jenna
      </span>
    </Link>
  )
}
