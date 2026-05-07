import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { Pricing } from '@/components/sections/Pricing'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <BentoGrid />
      <Pricing />

      {/* Spacer until remaining sections land. */}
      <div className="h-[60vh]" aria-hidden="true" />
    </>
  )
}
