import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { Savings } from '@/components/sections/Savings'
import { Pricing } from '@/components/sections/Pricing'
import { Finale } from '@/components/sections/Finale'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <BentoGrid />
      <Savings />
      <Pricing />
      <Finale />
      <Footer />
    </>
  )
}
