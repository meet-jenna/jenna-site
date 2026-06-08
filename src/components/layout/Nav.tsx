import { ArrowUpRight } from 'lucide-react'
import { Glass } from '@/components/ui/glass'
import { ThemeToggle } from '@/components/widgets/ThemeToggle'

// Floating glass header (classic glassmorphism bar). A single wide,
// translucent rounded rectangle hovers near the top with a soft drop
// shadow. Three balanced slots via a 1fr/auto/1fr grid:
//   - Left:   brand logo
//   - Center: section nav links
//   - Right:  Sign in + theme toggle + filled primary CTA
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
      <Glass variant="nav" className="nav-inner">
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
          <a href="#how">Features</a>
          <a href="#savings">Savings</a>
          <a href="#customize">Customize</a>
          <a href="#faq">FAQ</a>
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
          <a className="btn btn-primary nav-cta" href="#book">
            Book a demo
            <ArrowUpRight className="nav-cta-icon" aria-hidden="true" />
          </a>
        </div>
      </Glass>
    </header>
  )
}
