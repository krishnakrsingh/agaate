import Link from "next/link";
import { Mail, MessageSquare, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-black pt-20 overflow-hidden border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20">
          
          <div className="space-y-4">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/media" className="hover:text-primary transition-colors">Our Media</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Information</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/technology" className="hover:text-primary transition-colors">Technology</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/agri-park" className="hover:text-primary transition-colors">Agri Park</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Community</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/forum" className="hover:text-primary transition-colors">Farmer Forum</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/newsletter" className="hover:text-primary transition-colors">Newsletter</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/advisory" className="hover:text-primary transition-colors">Crop Advisory</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/carbon" className="hover:text-primary transition-colors">Carbon Credits</Link></li>
            </ul>
          </div>

          <div className="space-y-4 col-span-2 md:col-span-1">
             <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black hover:text-white cursor-pointer transition-colors"><Mail size={18} /></div>
                <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black hover:text-white cursor-pointer transition-colors"><MessageSquare size={18} /></div>
                <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black hover:text-white cursor-pointer transition-colors"><Globe size={18} /></div>
             </div>
             <p className="text-xs text-gray-400">
               Privacy Policy<br/>Terms of Use
             </p>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-400 mb-8 px-2">
          <span>Privacy Policy</span>
          <span>Copyright © {new Date().getFullYear()} AGAATE</span>
          <span>Terms of Use</span>
        </div>

        {/* Massive Text at the Bottom */}
        <div className="w-full flex justify-center translate-y-8 md:translate-y-16">
           <h1 className="text-[15vw] font-black tracking-tighter text-[#4a5843] leading-none select-none">AGAATE</h1>
        </div>
      </div>
    </footer>
  );
}
