import { Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream overflow-hidden pt-20 border-t border-cream/10">
      {/* Background Image with Gradient fade */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-transparent z-10 h-64" />
        <img
          src="https://images.pexels.com/photos/16074725/pexels-photo-16074725.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="Agriculture Mountain Landscape"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent z-10 h-96 bottom-0 top-auto" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-24">
          {/* Col 1 */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="Agaate Logo" className="h-10 w-auto opacity-90" />
            </div>

            <h3 className="text-2xl font-bold mb-4 tracking-tight">Science-backed agritech</h3>
            <p className="text-cream/60 text-[15px] leading-relaxed mb-8 max-w-sm">
              From the soil to the harvest, we stand beside India's farmers. Agaate brings research, expert agronomy, and genuine products to your pocket.
            </p>

            <button className="bg-cream text-ink px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-cream/90 transition-colors mb-12 shadow-lg hover:shadow-xl">
              <Smartphone className="w-5 h-5" fill="currentColor" />
              <span className="font-semibold text-[13px] tracking-wide">Download the App</span>
            </button>

            <div className="text-cream/40 text-xs mb-3 font-medium">
              © 2026 Agaate Farm Tech Pvt. Ltd.
            </div>
            <div className="text-cream/60 text-[13px] flex items-center gap-2 font-medium">
              Built with <span className="text-terracotta">♥</span> in India
            </div>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-bold mb-6 text-[15px] tracking-tight">Explore</h4>
            <ul className="space-y-4 text-cream/70 text-[14px] font-medium">
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  The App
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Kisan Mall
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Agro Park
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Research
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-bold mb-6 text-[15px] tracking-tight">Company</h4>
            <ul className="space-y-4 text-cream/70 text-[14px] font-medium">
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-bold mb-6 text-[15px] tracking-tight">Contact</h4>
            <ul className="space-y-4 text-cream/70 text-[14px] font-medium">
              <li>
                Agro Park, Bengaluru
              </li>
              <li>
                <a href="mailto:hello@agaate.in" className="hover:text-terracotta transition-colors">
                  hello@agaate.in
                </a>
              </li>
              <li>
                <a href="tel:+918040000000" className="hover:text-terracotta transition-colors">
                  +91 80 4000 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Big "Cooldock" Text */}
        <div className="w-full flex justify-center mt-auto pb-0 overflow-visible relative px-6 md:px-12">
          <img 
            src="/logo.svg" 
            alt="Agaate" 
            className="w-full max-w-6xl opacity-30 drop-shadow-md translate-y-4 md:translate-y-8" 
          />
          {/* A slight white gradient at the very bottom to blend the text nicely if needed */}
          <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-ink via-ink/30 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </footer>
  );
}
