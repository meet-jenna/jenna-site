/**
 * Previous hero gradient placement (mask-group SVG).
 * Not rendered — kept for easy restore. See components/hero-gradient.tsx to swap components.
 */
import { HeroPatternGlowMaskGroup } from "./hero-gradient"

export function ArchivedHeroPatternGlowDesktop() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-0 pointer-events-none hidden sm:block sm:top-[260px] md:top-[300px] lg:top-[340px]">
      <HeroPatternGlowMaskGroup className="w-[1404px] md:w-[2106px] lg:w-[2808px] h-auto opacity-40 md:opacity-50 mix-blend-multiply" />
    </div>
  )
}

export function ArchivedHeroPatternGlowMobile() {
  return (
    <div className="absolute left-1/2 top-2 z-0 -translate-x-1/2 -translate-y-[66%] pointer-events-none sm:hidden">
      <HeroPatternGlowMaskGroup className="w-[min(100vw,840px)] h-auto opacity-35 mix-blend-multiply" />
    </div>
  )
}
