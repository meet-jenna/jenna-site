import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  // Dark theme is opt-in via [data-theme="dark"], applied by ThemeToggle
  // (and the pre-paint script in index.html). Both `dark:` utilities and
  // the dark token block in index.css are live.
  darkMode: ['selector', '[data-theme="dark"]'],

  content: ['./index.html', './src/**/*.{ts,tsx}'],

  theme: {
    // Breakpoints: per migration plan §7 we keep the raw @media queries in
    // index.css. Tailwind's defaults stay so utilities still work for any
    // new responsive markup we add.
    extend: {
      colors: {
        // ─── Surfaces — Shares two-surface system ───────────────────
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'bg-elev-2': 'var(--bg-elev-2)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'surface-translucent': 'var(--surface-translucent)',

        // Direct Shares-named utilities for new markup
        'canvas-white': '#ffffff',
        'cloud-gray': '#f6f6f6',
        'silver-mist': '#e7e7e7',
        'stone-gray': '#b0b0b0',
        'slate-gray': '#5d5d5d',
        'steel-gray': '#888888',
        'carbon-gray': '#333333',
        'ink-black': '#1f1f1f',
        'shares-violet': '#1c00ff',

        // Hairlines
        hairline: 'var(--hairline)',
        'hairline-strong': 'var(--hairline-strong)',

        // Text
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-soft': 'var(--fg-soft)',
        'fg-faint': 'var(--fg-faint)',

        // Brand — Jenna Violet (#1c00ff)
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

        // Rainbow-button tokens (Magic UI port — preserved exemption,
        // do NOT migrate to brand violet)
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

      // ─── Shares radius scale ───────────────────────────────────────
      // small=4 / inputs=16 / accordion=24 / cards=36 / largeFeatures=60 / pill=99
      // Legacy aliases (sm/md/lg/xl/pill) preserved so existing component
      // CSS keeps resolving; new semantic names exposed for new markup.
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
        '2xl': 'var(--r-2xl)',
        pill: 'var(--r-pill)',
        // Shares-named semantic radii (per Refero spec)
        small: '4px',
        inputs: '16px',
        accordion: '24px',
        cards: '36px',
        'large-features': '60px',
        buttons: '99px',
      },

      // ─── Type — Quicksand ───────────────────────────────────────────
      // Rounded geometric sans, runtime font for the entire site.
      // Two-weight system (500 body / 700 headlines + emphasis).
      // CSS var `--font-serif` still resolves to the same Quicksand
      // stack so any legacy serif reference degrades to bold sans.
      fontFamily: {
        sans: ['var(--font-sans)'],
        quicksand: ['var(--font-sans)'],
      },

      // ─── Type scale — Shares sizes, Quicksand-tuned tracking ────────
      // [size, { lineHeight, letterSpacing }]
      // Body/caption/subheading: +0.02em (Quicksand has natural air).
      // Display tiers: -0.01em (rounded shapes need a hair of pull).
      fontSize: {
        caption: ['14px', { lineHeight: '1.5',  letterSpacing: '0.02em' }],
        body:    ['16px', { lineHeight: '1.5',  letterSpacing: '0.02em' }],
        subheading: ['20px', { lineHeight: '1.43', letterSpacing: '0.02em' }],
        'heading-sm': ['26px', { lineHeight: '1.33', letterSpacing: '0.02em' }],
        heading:    ['36px', { lineHeight: '1.18', letterSpacing: '-0.01em' }],
        'heading-lg': ['56px', { lineHeight: '1.10', letterSpacing: '-0.01em' }],
        display:    ['72px', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },

      fontWeight: {
        // Quicksand: 500 body / 700 headlines + emphasis.
        medium: '500',
        bold:   '700',
      },

      letterSpacing: {
        // Default body tracking for new markup.
        shares: '0.02em',
        // Display-scale tracking (used by .hero-title, .section-title,
        // .finale-title, .manifesto, etc.) — slightly negative.
        display: '-0.01em',
      },

      // ─── Layout ─────────────────────────────────────────────────────
      maxWidth: {
        page: 'var(--page-max-width)', // 1224px
      },

      spacing: {
        // Shares 4-base spacing scale exposed as utilities.
        // These extend Tailwind's defaults without colliding with
        // its numeric scale (Tailwind's `4` = 1rem = 16px, ours = 4px).
        'shares-4':  '4px',
        'shares-8':  '8px',
        'shares-12': '12px',
        'shares-16': '16px',
        'shares-20': '20px',
        'shares-24': '24px',
        'shares-28': '28px',
        'shares-32': '32px',
        'shares-48': '48px',
        'shares-52': '52px',
        'shares-96': '96px',
        // Semantic layout tokens
        section: 'var(--section-gap)',  // 48px
        card:    'var(--card-padding)', // 24px
        element: 'var(--element-gap)',  // 24px
      },

      boxShadow: {
        // Single Shares elevation token.
        xl: 'var(--shadow-xl)',
        shares: 'var(--shadow-xl)',
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
        'memory-pulse': 'memory-pulse 2s ease-in-out infinite',
        'playhead-glow': 'playhead-glow 0.9s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s var(--ease) both',
        'pulse-current': 'pulse-current 2s ease-in-out infinite',
      },
    },
  },

  plugins: [animate],
}

