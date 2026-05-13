import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { Customize } from '@/components/sections/Customize'
import { Savings } from '@/components/sections/Savings'
import { Finale } from '@/components/sections/Finale'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <BentoGrid />
      <Customize />
      <Savings />
      <Finale />
      <Footer />
    </>
  )
}
