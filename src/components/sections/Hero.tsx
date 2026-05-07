import { CallCard } from '@/components/widgets/CallCard'

// Hero section. Markup mirrors /index.html lines 70–200 of the vanilla
// site, with the Phase 2.2 design upgrades baked in:
//   - CTA uses .border-beam-btn (clean white pill with dark text and
//     arrow), ported verbatim from feat/v4 — the original hero treatment.
//   - Tighter type rhythm (handled in index.css).
//   - Subtle staggered fade-in entrance (animate-fade-in + per-element
//     animation-delay; suppressed under prefers-reduced-motion via
//     Tailwind's motion-reduce: modifier).
//   - Phase 2.9 mounted the live <CallCard /> into the slot below the CTA.
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="grid" />
      </div>

      <div className="hero-inner">
        <h1
          id="hero-title"
          className="hero-title animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '0ms' }}
        >
          The AI Hostess<br />
          That <em>Never Misses a Call.</em>
        </h1>

        <p
          className="hero-sub animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '80ms' }}
        >
          Connects to your phone. Handles every call start to finish — orders, reservations, payments, and more.
        </p>

        <div
          className="hero-cta animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '160ms' }}
        >
          <a className="border-beam-btn" href="#book">
            Book a demo
            <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10m0 0L9 4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <CallCard />

        <ul
          className="trust-row animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '320ms' }}
          aria-label="Highlights"
        >
          <li>
            <span className="trust-num">95%</span>
            <span className="trust-label">order accuracy</span>
          </li>
          <li>
            <span className="trust-num">∞</span>
            <span className="trust-label">simultaneous calls</span>
          </li>
          <li>
            <span className="trust-num">24/7</span>
            <span className="trust-label">never on break</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
