import { ThemeToggle } from '@/components/widgets/ThemeToggle'
import { useScrollPastThreshold } from '@/hooks/useScrollPastThreshold'

// Sticky header. Two visual states:
//   - At top of page (default): full-width gradient bar with backdrop blur.
//   - After scroll > 8px: contracts into a centered floating pill island
//     with translucent surface, hairline border, and soft shadow.
// The transition is driven entirely by CSS — JS only flips a data attribute.
export function Nav() {
  const floating = useScrollPastThreshold(8)

  return (
    <header className="nav-bar" data-floating={floating || undefined}>
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
          <a href="#pricing">Pricing</a>
          <a href="#demo">Hear Jenna</a>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <a className="btn btn-primary nav-cta" href="#book">
            Book a demo
          </a>
        </div>
      </div>
    </header>
  )
}
