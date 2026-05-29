import { useTheme } from '@/hooks/useTheme'

// Sun/moon icon button — nested glass chip matching the nav CTA.
// Both icons stay in markup; CSS toggles visibility by [data-theme].
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      id="themeToggle"
      type="button"
      className="glass glass-button theme-toggle"
      aria-label={label}
      title={label}
      onClick={toggle}
    >
      <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.5 14.5A8 8 0 0 1 9.5 3.5a.5.5 0 0 0-.7-.6 9 9 0 1 0 12.3 12.3.5.5 0 0 0-.6-.7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}
