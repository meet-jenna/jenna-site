import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />

      {/* Spacer so the nav floating-island state can still be exercised
          past the hero's 100vh while the rest of Phase 2 is unbuilt. */}
      <div className="h-[200vh]" aria-hidden="true" />
    </>
  )
}
