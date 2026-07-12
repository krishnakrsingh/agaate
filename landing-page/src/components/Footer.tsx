import { Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-[#252525] overflow-hidden pt-28 border-t border-white/20">
      {/* Background Image with Gradient fade */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/footer.jpg"
          alt="Agriculture Mountain Landscape"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-4">
          {/* Col 1 */}
          <div className="col-span-2 md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Agaate Logo" className="h-10 w-auto" />
            </div>

            <h3 className="text-2xl font-bold mb-4 tracking-tight">Science-backed agritech</h3>
            <p className="text-[#252525]/90 text-[15px] leading-relaxed mb-8 max-w-sm">
              From the soil to the harvest, we stand beside India's farmers. Agaate brings research, expert agronomy, and genuine products to your pocket.
            </p>

            <button className="bg-white/90 text-[#252525] px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-white transition-colors mb-4 shadow-lg hover:shadow-xl">
              <Smartphone className="w-5 h-5" fill="currentColor" />
              <span className="font-semibold text-[13px] tracking-wide">Download the App</span>
            </button>
            
            <div className="flex items-center gap-2 text-white text-[13px] font-medium mb-2">
              Built with <span className="text-red-500">♥</span> in India
            </div>
          </div>

          {/* Col 2 */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold mb-6 text-[15px] tracking-tight">Explore</h4>
            <ul className="space-y-4 text-[#252525]/90 text-[14px] font-medium">
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
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold mb-6 text-[15px] tracking-tight">Company</h4>
            <ul className="space-y-4 text-[#252525]/90 text-[14px] font-medium">
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
          <div className="col-span-2 md:col-span-3">
            <h4 className="font-bold mb-6 text-[15px] tracking-tight">Contact</h4>
            <ul className="space-y-4 text-[#252525]/90 text-[14px] font-medium">
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

        {/* Copyright Row */}
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-3 md:gap-8 border-t border-white/40 pt-4 pb-0 text-[#252525]/80 text-[13px] font-medium z-10 relative">
          <div className="text-white">© 2026 Agaate Farm Tech Pvt. Ltd.</div>
        </div>

        {/* Big "Cooldock" Text */}
        <div className="w-full flex justify-center mt-auto pb-0 overflow-visible relative px-6 md:px-12 z-10">
          <img 
            src="/logo.png" 
            alt="Agaate" 
            className="w-full max-w-5xl opacity-100 drop-shadow-lg translate-y-4 md:translate-y-6" 
          />
        </div>
      </div>

      {/* Full width bottom tint */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-ink via-ink/40 to-transparent pointer-events-none z-0"></div>
    </footer>
  );
}
