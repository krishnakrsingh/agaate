import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section7 from '@/components/sections/Section7' // Current Carbon Credits section

export const Route = createFileRoute('/services/carbon-credits')({
  component: CarbonCredits,
})

function CarbonCredits() {
  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32 w-full mb-20">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-forest mb-6">Carbon Credit Program</h1>
          <p className="text-lg text-forest/70 max-w-3xl mb-12">
            Earn Extra Income by Farming Sustainably. Good farming already saves carbon. We help you monetise it.
          </p>
        </div>
        <Section7 />
      </div>
      <Footer />
    </main>
  )
}
