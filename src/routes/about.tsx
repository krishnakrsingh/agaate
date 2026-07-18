import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32 px-6 lg:px-12 max-w-7xl mx-auto w-full mb-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-forest mb-6">About Us</h1>
        <p className="text-lg text-forest/70 max-w-3xl">
          Growing Better Tomorrow. Our mission is to replace risky direct seed sowing with science-backed, Bio-Boosted nursery models.
        </p>
        <div className="mt-12 h-64 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] flex items-center justify-center">
          <span className="text-forest/40">Content Placeholder (Story, Team, Facilities, Corporate)</span>
        </div>
      </div>
      <Footer />
    </main>
  )
}
