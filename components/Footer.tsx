import { Mail, MapPin, ExternalLink, Phone } from 'lucide-react'; 
import Link from 'next/link';

export default function Footer() {
  return (
    /* Background set to your Dark Navy #003366 for a grounded professional feel */
    <footer className="bg-brand-text text-brand-surface pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 mb-16">
        
        {/* FlexiPay Branding */}
        <div>
          <h3 className="text-brand-primary font-black text-xl mb-6 tracking-tighter uppercase">
            FlexiPay<span className="text-white/50">Systems</span>
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
           FlexiPay, a modern accountancy firm headquartered in Romford, United Kingdom, emerged with a vision to streamline the financial operations of businesses. With a niche in bookkeeping and payroll services, we have honed our expertise to cater to the needs of small and medium-sized enterprises.
          </p>
        </div>

        {/* Contact Info - Using Teal #19757e for Icons */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-6">Connect</h4>
          
          <div className="flex items-start gap-3 text-sm text-white/80">
            <MapPin size={18} className="text-brand-primary shrink-0" />
            <p>4 Wangey Road<br />Chadwell Heath, Romford<br />London, RM6 4DD</p>
          </div>

          {/* ADDED PHONE NUMBER SECTION */}
          <div className="flex items-center gap-3 text-sm text-white/80">
            <Phone size={18} className="text-brand-primary" />
            <a href="tel:+447828693818" className="hover:text-brand-primary transition">
              +44 7828693818
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/80">
            <Mail size={18} className="text-brand-primary" />
            <a href="mailto:info@flexipaysystems.com" className="hover:text-brand-primary transition">
              info@flexipaysystems.com
            </a>
          </div>
        </div>

        {/* System Availability / Hours */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-6">Operational Hours</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>Mon—Fri</span> <span>10:00 AM - 06:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>System Access</span> <span className="text-brand-primary font-bold">24/7/365</span>
            </li>
            <li className="flex justify-between opacity-40 italic">
              <span>Technical Maintenance</span> <span>Sun 02:00 AM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
        <p>© 2026 FlexiPay Systems Ltd • <Link href="/privacy" className="hover:text-white transition">Privacy & Compliance</Link></p>
        
        <a 
          href="https://caramelwebstudios.com" 
          target="_blank" 
          className="flex items-center gap-1 hover:text-brand-primary transition font-bold"
        >
          Build by Caramel Web Studios <ExternalLink size={10} />
        </a>
      </div>
    </footer>
  );
}