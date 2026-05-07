import { Nav } from '@/components/layout/Nav'

export default function App() {
  return (
    <>
      <Nav />

      {/* Placeholder body for scroll-island stress-testing.
          Real sections land here in subsequent Phase-2 steps. */}
      <main className="min-h-screen pt-32 px-6 bg-bg text-fg">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-6 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-fg-soft">
            Phase 2.1 · nav (rebuilt)
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-medium leading-[1.1] tracking-[-0.02em]">
            Filled primary CTA · floating-island scroll · hover-chip links.
          </h1>
          <p className="text-fg-muted max-w-xl">
            Scroll past 8px → the bar contracts into a centered pill with shadow
            and translucent backdrop. Scroll back → it expands. Resize the window —
            below 720px the floating state is disabled and the bar stays full-width.
          </p>
          <button
            type="button"
            className="btn btn-soft"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Scroll to top
          </button>

          {/* 3 viewports of scroll runway so we can really test float ↔ top. */}
          <div className="h-[300vh] w-full" aria-hidden="true" />

          <p className="text-fg-soft text-sm">End of placeholder content.</p>
        </div>
      </main>
    </>
  )
}
