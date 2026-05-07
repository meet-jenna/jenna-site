// Hero section. Markup mirrors /index.html lines 70–200 of the vanilla
// site, with the Phase 2.2 design upgrades baked in:
//   - CTA replaces the old hardcoded-white .border-beam-btn with the
//     theme-correct .btn .btn-primary .btn-lg combo.
//   - Tighter type rhythm (handled in index.css).
//   - Subtle staggered fade-in entrance (animate-fade-in + per-element
//     animation-delay; suppressed under prefers-reduced-motion via
//     Tailwind's motion-reduce: modifier).
//
// The call-card slot intentionally sits empty — it ports in Phase 2.9.
// You'll see the full vertical rhythm (CTA → empty hole → trust row)
// during 2.2 review so we can judge the final dimensional feel.
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="grid" />
      </div>

      <div className="hero-inner">
        <a
          className="live-pill animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '0ms' }}
          href="#demo"
        >
          <span className="live-dot" aria-hidden="true" />
          <span>Live now · Answering calls 24/7</span>
        </a>

        <h1
          id="hero-title"
          className="hero-title animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '80ms' }}
        >
          The AI Hostess<br />
          That <em>Never Misses a Call.</em>
        </h1>

        <p
          className="hero-sub animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '160ms' }}
        >
          Connects to your phone. Handles every call start to finish — orders, reservations, payments, and more.
        </p>

        <div
          className="hero-cta animate-fade-in motion-reduce:animate-none"
          style={{ animationDelay: '240ms' }}
        >
          <a className="btn btn-primary btn-lg" href="#book">
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

        {/* Call-card slot — Phase 2.9. Intentionally empty during 2.2 review. */}

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
