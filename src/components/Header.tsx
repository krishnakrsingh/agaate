import { useEffect, useState } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Overview', href: '#overview-section' },
  { label: 'Journey', href: '#journey-section' },
  { label: 'Kisaan Mall', href: '#mall-section' },
  { label: 'AgriTech', href: '#tech-section' },
  { label: 'Agri Park', href: '#park-section' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let threshold = window.innerHeight * 0.5;

    const handleResize = () => {
      threshold = window.innerHeight * 0.5;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 pt-2 md:pt-4 pointer-events-none flex justify-center">
      <header
        className={`pointer-events-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
          scrolled
            ? 'w-[92%] max-w-4xl rounded-full px-6 md:px-8 shadow-lg bg-[#1a3c34] translate-y-1 md:translate-y-0'
            : 'w-[96%] max-w-7xl rounded-2xl px-6 md:px-10 bg-transparent translate-y-0'
        }`}
        style={{ height: scrolled ? '60px' : '76px' }}
      >
        {/* Left side: Logo */}
        <div className="flex items-center justify-start flex-1">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            className="flex items-center text-white transition-opacity hover:opacity-80"
          >
            <img src="/logo.svg" alt="Agaate" className={`w-auto transition-all duration-500 ease-in-out ${scrolled ? 'h-6 md:h-7' : 'h-9 md:h-10 drop-shadow-md'}`} />
          </a>
        </div>

        {/* Center: Nav links */}
        <nav className={`hidden lg:flex items-center justify-center transition-all duration-500 ease-in-out ${scrolled ? 'gap-6' : 'gap-8'}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className={`font-body text-[15px] font-medium transition-colors hover:text-[#c8e3d4] ${scrolled ? 'text-white/90' : 'text-white drop-shadow-md'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Actions */}
        <div className={`flex items-center justify-end flex-1 transition-all duration-500 ease-in-out ${scrolled ? 'gap-4' : 'gap-6'}`}>
          <button className={`transition-colors hidden sm:block hover:text-[#c8e3d4] ${scrolled ? 'text-white/80' : 'text-white drop-shadow-md'}`}>
            <Globe className="w-5 h-5" />
          </button>
          
          <button className={`group flex items-center gap-2 rounded-full font-body font-semibold transition-all duration-500 ease-in-out ${
            scrolled 
              ? 'bg-[#c8e3d4] hover:bg-[#b5d6c4] text-[#1a3c34] shadow-sm hover:shadow-md px-4 py-2 text-xs' 
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/15 px-5 py-2.5 text-[15px]'
          }`}>
            Chat with us <ArrowRight className={`transition-all duration-500 ease-in-out group-hover:translate-x-1 ${scrolled ? 'w-3.5 h-3.5 ml-0.5' : 'w-4 h-4 ml-1'}`} />
          </button>
        </div>
      </header>
    </div>
  );
}
