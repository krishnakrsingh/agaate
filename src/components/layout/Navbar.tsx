"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Farms", href: "/agri-park" },
    { name: "Products", href: "/services" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-[#082f1b]/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298657/logo_xqpj40.svg" alt="Agaate Logo" className="h-8 md:h-10 w-auto" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname !== '/' && link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'bg-accent text-accent-foreground' : 'text-white hover:text-accent'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center">
          <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 py-3 font-semibold text-sm gap-2">
            Contact Us <span className="bg-black/10 rounded-full p-1 w-6 h-6 flex items-center justify-center">↗</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#082f1b] border-t border-white/10 shadow-2xl">
          <nav className="flex flex-col p-6 space-y-4 text-center">
             {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-white hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full bg-accent text-accent-foreground rounded-full py-4 text-lg font-semibold hover:bg-accent/90">
                Contact Us ↗
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
