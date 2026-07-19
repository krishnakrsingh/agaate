import { Mail, MapPin, Phone, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-white text-[#17211B] pt-20 pb-10 border-t border-[#E7ECE8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16 text-left">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img src="/logo.svg" alt="Agaate Logo" className="h-8 w-auto mb-6 opacity-90" />
            <p className="text-[#667069] text-[14px] font-normal leading-[1.8] mb-6 max-w-sm">
              Agaate combines trusted inputs, expert advisory, farm technology, and market access to
              empower Indian farmers throughout their entire crop cycle.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Company</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li>
                <Link to="/about" className="hover:text-forest transition-colors leading-[1.8]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/agri-park" className="hover:text-forest transition-colors leading-[1.8]">
                  Agri Park
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-forest transition-colors leading-[1.8]">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-forest transition-colors leading-[1.8]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Services</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li>
                <Link
                  to="/services/nursery"
                  className="hover:text-forest transition-colors leading-[1.8]"
                >
                  Bio-Boosted Nursery
                </Link>
              </li>
              <li>
                <Link
                  to="/services/kisaan-mall"
                  className="hover:text-forest transition-colors leading-[1.8]"
                >
                  Kisaan Mall
                </Link>
              </li>
              <li>
                <Link
                  to="/services/farm-tech"
                  className="hover:text-forest transition-colors leading-[1.8]"
                >
                  Farm Tech
                </Link>
              </li>
              <li>
                <Link
                  to="/services/carbon-credits"
                  className="hover:text-forest transition-colors leading-[1.8]"
                >
                  Carbon Credits
                </Link>
              </li>
              <li>
                <Link
                  to="/services/big-farm-setup"
                  className="hover:text-forest transition-colors leading-[1.8]"
                >
                  Big Farm Setup
                </Link>
              </li>
              <li>
                <Link
                  to="/services/market-linkage"
                  className="hover:text-forest transition-colors leading-[1.8]"
                >
                  Market Linkage
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Resources</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li>
                <Link to="/community" className="hover:text-forest transition-colors leading-[1.8]">
                  Parivaar Community
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="hover:text-forest transition-colors leading-[1.8]">
                  Knowledge Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Contact</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li className="flex gap-2 items-center leading-[1.8]">
                <Phone className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>8350085005</span>
              </li>
              <li className="flex gap-2 items-center leading-[1.8]">
                <Mail className="w-3.5 h-3.5 text-forest shrink-0" />
                <a href="mailto:info@agaate.in" className="hover:text-forest transition-colors">
                  info@agaate.in
                </a>
              </li>
              <li className="flex gap-2 items-start leading-[1.8]">
                <MapPin className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                <span>
                  NH8, Kukrola,
                  <br />
                  Gurugram, Haryana
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E7ECE8] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#667069]/60 font-mono">
          <div>© {new Date().getFullYear()} Anzix Farm Technologies Pvt. Ltd.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-forest transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-forest transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
