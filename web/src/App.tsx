import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-bg text-fg">
      <div className="flex flex-col items-center gap-8 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-fg-soft">
          Phase 1 · setup smoke test
        </span>

        <h1 className="font-sans text-6xl md:text-7xl font-medium leading-[1.05] tracking-[-0.02em]">
          The AI Hostess<br />
          That{' '}
          <em className="font-serif italic font-normal text-accent">
            Never Misses a Call.
          </em>
        </h1>

        <p className="max-w-xl text-lg text-fg-muted">
          Tokens resolve. Dark mode flips on{' '}
          <code className="rounded-sm bg-surface-2 px-1.5 py-0.5 text-sm text-fg">
            [data-theme="dark"]
          </code>
          . Fonts load (Inter + Instrument Serif). Shadcn Button below.
        </p>

        <div className="flex items-center gap-3">
          <Button onClick={toggle}>
            Switch to {theme === 'dark' ? 'light' : 'dark'}
          </Button>
          <span className="text-sm text-fg-soft">
            current: <strong className="text-fg">{theme}</strong>
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4">
          {(['bg', 'surface', 'surface-2', 'accent'] as const).map((t) => (
            <div
              key={t}
              className="flex flex-col items-center gap-2"
              title={`var(--${t === 'surface-2' ? 'surface-2' : t})`}
            >
              <div
                className={
                  'h-12 w-12 rounded-md border border-hairline-strong ' +
                  (t === 'bg'
                    ? 'bg-bg'
                    : t === 'surface'
                    ? 'bg-surface'
                    : t === 'surface-2'
                    ? 'bg-surface-2'
                    : 'bg-accent')
                }
              />
              <span className="text-xs text-fg-soft">--{t}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
