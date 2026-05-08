import { useCallback, useEffect, useState } from 'react'

// Theme switcher. Persisted via localStorage under STORAGE_KEY; the
// pre-paint script in index.html applies the saved theme before React
// mounts so there's no FOUC.
const STORAGE_KEY = 'jenna-theme'

type Theme = 'light' | 'dark'

const readCurrent = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readCurrent)

  const apply = useCallback((next: Theme) => {
    if (next === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore: private mode, quota, etc. Theme still applies for the session.
    }
  }, [])

  const toggle = useCallback(() => {
    apply(readCurrent() === 'dark' ? 'light' : 'dark')
  }, [apply])

  // Re-sync if the attribute is changed by something outside React (e.g. the
  // pre-paint script on a hot reload, or a system-pref listener later).
  useEffect(() => {
    setTheme(readCurrent())
  }, [])

  return { theme, toggle, setTheme: apply }
}
