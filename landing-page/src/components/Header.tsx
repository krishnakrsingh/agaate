import { useEffect, useState } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

const navLinks: { label: string; href: string }[] = [];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 left-1/2 -translate-x-1/2 ${
        scrolled
          ? 'top-3 md:top-4 w-[92%] max-w-4xl rounded-full px-6 md:px-8'
          : 'top-2 md:top-4 w-[96%] max-w-7xl rounded-2xl px-6 md:px-10'
      }`}
      style={{
        height: scrolled ? '60px' : '76px',
        backgroundColor: scrolled ? '#1a3c34' : 'transparent',
      }}
    >
      <div className="mx-auto h-full flex items-center justify-between w-full">
        
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
            <img src="/logo.svg" alt="Agaate" className={`w-auto transition-all duration-500 ${scrolled ? 'h-6 md:h-7' : 'h-9 md:h-10 drop-shadow-md'}`} />
          </a>
        </div>

        {/* Center: Nav links */}
        <nav className={`hidden lg:flex items-center justify-center transition-all duration-500 ${scrolled ? 'gap-6' : 'gap-8'}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className={`font-body text-sm font-medium transition-colors hover:text-[#c8e3d4] ${scrolled ? 'text-white/90' : 'text-white drop-shadow-md'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Actions */}
        <div className={`flex items-center justify-end flex-1 transition-all duration-500 ${scrolled ? 'gap-4' : 'gap-6'}`}>
          <button className={`transition-colors hidden sm:block hover:text-[#c8e3d4] ${scrolled ? 'text-white/80' : 'text-white drop-shadow-md'}`}>
            <Globe className="w-5 h-5" />
          </button>
          
          <button className={`group flex items-center gap-2 rounded-full font-body font-semibold transition-all duration-300 ${
            scrolled 
              ? 'bg-[#c8e3d4] hover:bg-[#b5d6c4] text-[#1a3c34] shadow-sm hover:shadow-md hover:-translate-y-0.5 px-4 py-2 text-xs' 
              : 'bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/15 px-5 py-2.5 text-sm'
          }`}>
            Chat with us <ArrowRight className={`transition-all duration-300 group-hover:translate-x-1 ${scrolled ? 'w-3.5 h-3.5 ml-0.5' : 'w-4 h-4 ml-1'}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
