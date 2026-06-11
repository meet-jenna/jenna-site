/**
 * Archived mask-group SVG glow (hero background prior to the top-edge glow).
 * The current hero glow is `/gradients/hero-top-glow.svg`, rendered inline in `app/page.tsx`.
 * To restore the old look, render the components from `components/hero-gradient-archived.tsx`
 * in the hero section of `app/page.tsx`.
 */
export const ARCHIVED_HERO_PATTERN_SRC = "/archived/hero-gradient/mask-group-pattern.svg"
const ARCHIVED_HERO_PATTERN_FILTER = "hue-rotate(15deg) saturate(0.7) brightness(1.2)"

export function HeroPatternGlowMaskGroup({ className }: { className?: string }) {
  return (
    <img
      src={ARCHIVED_HERO_PATTERN_SRC}
      alt=""
      aria-hidden
      className={className}
      style={{ filter: ARCHIVED_HERO_PATTERN_FILTER }}
    />
  )
}
