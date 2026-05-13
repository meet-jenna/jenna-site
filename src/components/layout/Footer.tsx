// Footer. The footer surface is always dark (var(--fg) — Ink Black),
// so the brand uses the white Jenna logo regardless of active theme.

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-inner">
        <a className="footer-brand" href="#" aria-label="Jenna home">
          <img
            className="footer-logo"
            src="/assets/logos/jenna-logo-white.png"
            alt="Jenna"
            width={1024}
            height={300}
          />
        </a>

        <p className="footer-tag">
          The AI hostess that <em>never misses a call.</em>
        </p>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#how">How it works</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="#book">Book a demo</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="mailto:hello@jenna.ai">Contact</a>
        </nav>

        <p className="footer-contact">
          <a href="mailto:mail@meetjenna.ai">mail@meetjenna.ai</a>
        </p>
      </div>

      <div className="footer-base">
        <span className="footer-copy">© 2026 Jenna AI</span>
      </div>
    </footer>
  )
}
