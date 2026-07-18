import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/services/')({
  component: Services,
})

function Services() {
  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32 px-6 lg:px-12 max-w-7xl mx-auto w-full mb-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-forest mb-6">Our Services</h1>
        <p className="text-lg text-forest/70 max-w-3xl mb-12">
          End-to-end support for your farming journey, from bio-boosted saplings to market access.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/services/nursery" className="p-8 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] hover:border-emerald-400 transition-colors">
            <h2 className="text-2xl font-bold text-forest mb-3">Bio-Boosted Nursery</h2>
            <p className="text-forest/70">17-Acre Smart Nursery — Where Strong Crops Begin.</p>
          </Link>
          <Link to="/services/kisaan-mall" className="p-8 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] hover:border-emerald-400 transition-colors">
            <h2 className="text-2xl font-bold text-forest mb-3">Kisaan Mall</h2>
            <p className="text-forest/70">Your Complete Agri Input Store — 500+ Products.</p>
          </Link>
          <Link to="/services/farm-tech" className="p-8 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] hover:border-emerald-400 transition-colors">
            <h2 className="text-2xl font-bold text-forest mb-3">Farm Management & Tech</h2>
            <p className="text-forest/70">Sensors, Drones, and AI — Working on Your Farm.</p>
          </Link>
          <Link to="/services/carbon-credits" className="p-8 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] hover:border-emerald-400 transition-colors">
            <h2 className="text-2xl font-bold text-forest mb-3">Carbon Credits</h2>
            <p className="text-forest/70">Earn Extra Income by Farming Sustainably.</p>
          </Link>
          <Link to="/services/big-farm-setup" className="p-8 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] hover:border-emerald-400 transition-colors">
            <h2 className="text-2xl font-bold text-forest mb-3">Big Farm Setup</h2>
            <p className="text-forest/70">From Bare Land to First Harvest — Turnkey Solutions.</p>
          </Link>
          <Link to="/services/market-linkage" className="p-8 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] hover:border-emerald-400 transition-colors">
            <h2 className="text-2xl font-bold text-forest mb-3">Market Linkage</h2>
            <p className="text-forest/70">From Farm to Market — Directly, for Better Pricing.</p>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
