# Jenna AI — site

The marketing site for Jenna, the AI hostess that never misses a call.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v3 (token bridge in `src/index.css`, Tailwind utilities in `tailwind.config.js`)
- shadcn/ui primitives where they fit (Button, Tabs, Slot)
- `@paper-design/shaders` for the bento "memory" card
- Theme toggle drives `[data-theme="dark"]`; light = Cool Porcelain, dark = Cool Carbon

## Scripts

```bash
npm run dev      # dev server (default: http://localhost:5173)
npm run build    # tsc -b && vite build → dist/
npm run preview  # serve the production build
npm run lint     # ESLint
```

## Layout

```
src/
├── components/
│   ├── layout/   ← Nav, Footer
│   ├── sections/ ← Hero, BentoGrid, Proof, Customize, Savings, Pricing, Finale
│   ├── widgets/  ← PhoneScreen, ShaderCard, AudioDemo, ConfigPanel, RoiCalculator, ThemeToggle
│   └── ui/       ← shadcn primitives (button.tsx, …)
├── hooks/        ← useTheme, useScrollPastThreshold
├── lib/          ← cn, format helpers
└── index.css     ← design tokens (light + dark) + @keyframes + Tailwind directives

public/assets/    ← brand logos, screenshots
legacy/           ← pre-migration vanilla site (HTML/CSS/JS) — kept for reference
```

The `migration/react-stack` branch contains the phase-by-phase port from the legacy site.
