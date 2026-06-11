# Archived hero gradient (mask-group SVG)

Hero background used before the current top-edge glow (`public/gradients/hero-top-glow.svg`).

## Restore

1. In `app/page.tsx`, remove the top-edge glow `<img>` block inside the hero mockup wrapper.
2. Render `ArchivedHeroPatternGlowDesktop` / `ArchivedHeroPatternGlowMobile` from
   `components/hero-gradient-archived.tsx` in the hero section (they include the original
   placement classes).

## Assets

- `mask-group-pattern.svg` — original SVG glow with line pattern
