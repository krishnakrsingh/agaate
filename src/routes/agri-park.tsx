import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Section11 from '@/components/sections/Section11' // Current Agri Park section

export const Route = createFileRoute('/agri-park')({
  component: AgriPark,
})

function AgriPark() {
  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32 w-full mb-20">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-forest mb-6">India's First Agri Park</h1>
          <p className="text-lg text-forest/70 max-w-3xl mb-12">
            All the Best Agro Companies. One Agaate Farm.
          </p>
        </div>
        <Section11 />
      </div>
      <Footer />
    </main>
  )
}
