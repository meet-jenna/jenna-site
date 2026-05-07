import { useEffect, useState } from 'react'

// Returns true when window.scrollY > threshold. Plain passive listener;
// no rAF throttling needed because we only flip state when the boolean
// crosses the threshold, not on every scroll event. (Framer Motion's
// useScroll was the original choice but currently breaks under
// framer-motion@12 + React 19 + Vite — see invalid-hook-call regression
// in the Vite-optimized bundle. Vanilla works fine here.)
export function useScrollPastThreshold(threshold = 8): boolean {
  const [past, setPast] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  )

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > threshold
      setPast((prev) => (prev === next ? prev : next))
    }
    onScroll() // sync state to current scroll position on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}
