import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/knowledge/')({
  component: Knowledge,
})

function Knowledge() {
  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32 px-6 lg:px-12 max-w-7xl mx-auto w-full mb-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-forest mb-6">Knowledge Hub</h1>
        <p className="text-lg text-forest/70 max-w-3xl">
          Guides, Techniques, Sustainability, and Market Intelligence.
        </p>
        <div className="mt-12 h-64 bg-forest/[0.03] rounded-2xl border border-[#E7ECE8] flex items-center justify-center">
          <span className="text-forest/40">Content Placeholder (Blog Categories, Articles, Video Tutorials)</span>
        </div>
      </div>
      <Footer />
    </main>
  )
}
