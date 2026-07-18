import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section8 from '@/components/sections/Section8' // Current Big Farm section

export const Route = createFileRoute('/services/big-farm-setup')({
  component: BigFarmSetup,
})

function BigFarmSetup() {
  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32 w-full mb-20">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-forest mb-6">Turnkey Big Farm Setup</h1>
          <p className="text-lg text-forest/70 max-w-3xl mb-12">
            From Bare Land to First Harvest. One partner, from empty land to your first harvest.
          </p>
        </div>
        <Section8 />
      </div>
      <Footer />
    </main>
  )
}
