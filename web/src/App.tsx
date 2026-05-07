import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { BentoGrid } from '@/components/sections/BentoGrid'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <BentoGrid />

      {/* Spacer until remaining sections land. */}
      <div className="h-[100vh]" aria-hidden="true" />
    </>
  )
}
