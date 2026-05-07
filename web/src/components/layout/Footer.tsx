// Footer. Markup mirrors /index.html lines 1272–1311.
// The vanilla site renders a small brand "mark + dot" hover-glyph
// alongside the wordmark; we keep it.

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-inner">
        <a className="brand footer-brand" href="#" aria-label="Jenna home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-dot" />
          </span>
          <span className="brand-name">Jenna</span>
        </a>

        <p className="footer-tag">
          The AI hostess that <em>never misses a call.</em>
        </p>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#how">How it works</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="#pricing">Pricing</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="#book">Book a demo</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="mailto:hello@jenna.ai">Contact</a>
        </nav>

        <p className="footer-contact">
          <a href="mailto:hello@jenna.ai">hello@jenna.ai</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href="tel:+18005553662">(800) 555-JENNA</a>
        </p>
      </div>

      <div className="footer-base">
        <span className="footer-copy">© 2026 Jenna AI</span>
        <span className="footer-ping">
          <span className="status-dot status-dot-live" aria-hidden="true" />
          All systems on call
        </span>
      </div>
    </footer>
  )
}
