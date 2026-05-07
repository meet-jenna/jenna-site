import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  // Theme switch is driven by [data-theme="dark"] on <html>, matching the
  // vanilla site. Tailwind's `dark:` variant maps to that selector.
  darkMode: ['selector', '[data-theme="dark"]'],

  content: ['./index.html', './src/**/*.{ts,tsx}'],

  theme: {
    // Breakpoints: per migration plan §7 we keep the raw @media queries in
    // index.css. Tailwind's defaults stay so utilities still work for any
    // new responsive markup we add.
    extend: {
      colors: {
        // Surface
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'bg-elev-2': 'var(--bg-elev-2)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-translucent': 'var(--surface-translucent)',

        // Hairlines
        hairline: 'var(--hairline)',
        'hairline-strong': 'var(--hairline-strong)',

        // Text
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-soft': 'var(--fg-soft)',
        'fg-faint': 'var(--fg-faint)',

        // Brand
        accent: 'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        'accent-deep': 'var(--accent-deep)',
        'accent-glow': 'var(--accent-glow)',

        // Status
        live: 'var(--live)',
        'live-glow': 'var(--live-glow)',

        // Theme-aware atoms
        ink: 'var(--ink)',
        'ink-on-accent': 'var(--ink-on-accent)',

        // Overlays
        'overlay-1': 'var(--overlay-1)',
        'overlay-2': 'var(--overlay-2)',
        'overlay-3': 'var(--overlay-3)',
        'overlay-4': 'var(--overlay-4)',
        'overlay-5': 'var(--overlay-5)',
        'overlay-border': 'var(--overlay-border)',

        'inset-card': 'var(--inset-card)',
        'inset-card-2': 'var(--inset-card-2)',
        'grid-stroke': 'var(--grid-stroke)',

        'shadow-soft': 'var(--shadow-soft)',
        'shadow-strong': 'var(--shadow-strong)',

        'nav-bg-1': 'var(--nav-bg-1)',
        'nav-bg-2': 'var(--nav-bg-2)',

        'btn-primary-glow': 'var(--btn-primary-glow)',
        'btn-primary-glow-strong': 'var(--btn-primary-glow-strong)',

        'card-tint': 'var(--card-tint)',

        // Rainbow-button tokens (Magic UI port)
        'rainbow-1': 'var(--rainbow-color-1)',
        'rainbow-2': 'var(--rainbow-color-2)',
        'rainbow-3': 'var(--rainbow-color-3)',
        'rainbow-4': 'var(--rainbow-color-4)',
        'rainbow-5': 'var(--rainbow-color-5)',
        'rainbow-fill': 'var(--rainbow-fill)',
        'rainbow-fill-fade': 'var(--rainbow-fill-fade)',
        'rainbow-fg': 'var(--rainbow-fg)',

        // shadcn aliases — these point at brand tokens (see index.css)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
        input: 'var(--input)',
      },

      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
        pill: 'var(--r-pill)',
      },

      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },

      transitionTimingFunction: {
        brand: 'var(--ease)',
      },

      backgroundImage: {
        'card-edge': 'var(--card-edge)',
      },

      opacity: {
        glow: 'var(--glow-opacity)',
      },

      // 10 keyframes ported verbatim from styles.css. Sources of truth still
      // live in index.css (so dev-time edits are local) — these are the
      // Tailwind aliases.
      keyframes: {
        wave: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
        'wave-mini': {
          '0%, 100%': { height: '12%' },
          '50%': { height: '85%' },
        },
        rainbow: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'memory-fallback-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'memory-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.15)', opacity: '0.4' },
        },
        'playhead-glow': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.6)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-current': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },

      animation: {
        wave: 'wave 1.1s ease-in-out infinite',
        'wave-mini': 'wave-mini 1.4s ease-in-out infinite',
        rainbow: 'rainbow var(--rainbow-speed, 2s) infinite linear',
        blink: 'blink 1s steps(2, start) infinite',
        'memory-fallback-spin': 'memory-fallback-spin 18s linear infinite',
        'memory-pulse': 'memory-pulse 2s ease-in-out infinite',
        'playhead-glow': 'playhead-glow 0.9s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s var(--ease) both',
        'pulse-current': 'pulse-current 2s ease-in-out infinite',
      },
    },
  },

  plugins: [animate],
}

