import { Mail, MapPin, Phone, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-[#17211B] pt-20 pb-10 border-t border-[#E7ECE8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16 text-left">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img src="/logo.png" alt="Agaate Logo" className="h-8 w-auto mb-6 opacity-90" />
            <p className="text-[#667069] text-[14px] font-normal leading-[1.8] mb-6 max-w-sm">
              Agaate combines trusted inputs, expert advisory, farm technology, and market access to empower Indian farmers throughout their entire crop cycle.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#E7ECE8] flex items-center justify-center text-[#667069] hover:text-forest hover:border-forest transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Company</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">About Agaate</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Our Approach</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Agri Park</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Partners</a></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Solutions</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Crop Advisory</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Farm Management</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Agaate Kisaan Mall</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Big-Farm Setup</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Market Linkage</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Resources</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Farmer Programs</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Blog</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">FAQs</a></li>
              <li><a href="#" className="hover:text-forest transition-colors leading-[1.8]">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[14px] font-bold text-[#17211B] mb-6">Contact</h4>
            <ul className="space-y-4 text-[#667069] text-[14px] font-normal">
              <li className="flex gap-2 items-center leading-[1.8]">
                <Phone className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>1800-123-AGAATE</span>
              </li>
              <li className="flex gap-2 items-center leading-[1.8]">
                <Mail className="w-3.5 h-3.5 text-forest shrink-0" />
                <a href="mailto:hello@agaate.in" className="hover:text-forest transition-colors">hello@agaate.in</a>
              </li>
              <li className="flex gap-2 items-start leading-[1.8]">
                <MapPin className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                <span>Agaate Agri Park,<br/>Bengaluru, Karnataka</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E7ECE8] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#667069]/60 font-mono">
          <div>© {new Date().getFullYear()} Agaate Farm Tech Pvt. Ltd.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-forest transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-forest transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
