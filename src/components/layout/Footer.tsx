// Footer. The footer surface is bound to var(--fg), so it auto-inverts
// with the theme: dark footer in light theme → light footer in dark theme.
// Both logo variants stay in markup; CSS toggles which is visible based on
// the active [data-theme] on <html>. Note the variants are inverted vs the
// Nav because the footer background inverts.

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-inner">
        <a className="footer-brand" href="#" aria-label="Jenna home">
          <img
            className="footer-logo footer-logo-light"
            src="/assets/logos/jenna-logo-white.png"
            alt="Jenna"
            width={1024}
            height={300}
          />
          <img
            className="footer-logo footer-logo-dark"
            src="/assets/logos/jenna-logo-blue.png"
            alt=""
            aria-hidden="true"
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
