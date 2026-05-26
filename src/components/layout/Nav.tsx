import { ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/widgets/ThemeToggle'

// Always-floating header. A single translucent rounded rectangle hovers
// at the top of the page with three slots:
//   - Left:  brand chip wrapping the Jenna logo (small inner radius)
//   - Mid:   plain-text nav links
//   - Right: theme toggle + ghost CTA (matching small inner radius)
// The "chip-inside-pill" pattern (small radius nested in larger radius)
// is the signature of the General Intelligence Co. nav this is based on.
//
// Both brand-logo variants stay in markup; CSS toggles which is visible
// based on the active [data-theme] on <html>.

// Where the Sign-in button takes operators. The portal lives in a
// separate Vite app (`packages/portal-web` in meet-jenna-portal). For
// local development the dev server runs on :5174; in production set
// `VITE_PORTAL_URL` at build time to the deployed portal origin.
const PORTAL_URL =
  (import.meta.env.VITE_PORTAL_URL as string | undefined) ?? 'http://localhost:5174'

export function Nav() {
  return (
    <header className="nav-bar">
      <div className="nav-inner">
        <a className="brand" href="#" aria-label="Jenna home">
          <img
            className="brand-logo brand-logo-light"
            src="/assets/logos/jenna-logo-blue.png"
            alt="Jenna"
            width={1024}
            height={300}
          />
          <img
            className="brand-logo brand-logo-dark"
            src="/assets/logos/jenna-logo-white.png"
            alt=""
            aria-hidden="true"
            width={1024}
            height={300}
          />
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#demo">Hear Jenna</a>
        </nav>

        <div className="nav-actions">
          <a
            className="nav-signin"
            href={PORTAL_URL}
            rel="noopener"
          >
            Sign in
          </a>
          <ThemeToggle />
          <a className="btn nav-cta" href="#book">
            Book a demo
            <ArrowUpRight className="nav-cta-icon" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
