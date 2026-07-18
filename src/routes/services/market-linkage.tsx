import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section10 from '@/components/sections/Section10' // Current Market Access section

export const Route = createFileRoute('/services/market-linkage')({
  component: MarketLinkage,
})

function MarketLinkage() {
  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32 w-full mb-20">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-forest mb-6">Sales & Market Access</h1>
          <p className="text-lg text-forest/70 max-w-3xl mb-12">
            From Farm to Market — Directly. Eliminate middlemen, premium pricing.
          </p>
        </div>
        <Section10 />
      </div>
      <Footer />
    </main>
  )
}
