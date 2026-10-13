import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0b0a09] text-[#a49b8d] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Callout Banner */}
        <div className="p-8 rounded-2xl bg-[#141210] border border-[#27231d] mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-lg">
            <h3 className="text-xl font-serif-display font-medium text-[#f4efe8]">
              Join the Rare Bean Release Dispatch
            </h3>
            <p className="text-xs text-[#8e8579] mt-1.5 leading-relaxed">
              Every fortnight we drop limited 50-bag micro-lots from award-winning farms. Subscribers receive first access 24 hours prior to public roast day.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-xs">
                <Check className="w-4 h-4" />
                <span>Subscribed! Use code <strong className="text-white font-mono">FIRSTROAST15</strong> for 15% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-3.5 py-2.5 bg-[#1a1714] border border-[#302a22] rounded-xl text-xs text-[#f4efe8] placeholder-[#665e52] focus:outline-none focus:border-[#c89d66] w-64"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#c89d66] text-[#0e0d0c] font-semibold text-xs rounded-xl hover:bg-[#d6af7a] transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1f1c18] text-xs">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-xl font-bold tracking-tight text-[#f4efe8] font-heading">
              KROMA
            </span>
            <p className="text-[#7d7467] leading-relaxed">
              Specialty Coffee Roastery & Slow Espresso Sanctuary. Handcrafted in small batches on 428 Artisan Way.
            </p>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-[#d8d0c2]">Hours & Service</div>
            <div className="text-[#817769] space-y-1">
              <div>Mon–Thu: 6:30 AM – 7:00 PM</div>
              <div>Fri: 6:30 AM – 8:00 PM</div>
              <div>Sat: 7:30 AM – 8:00 PM</div>
              <div>Sun: 7:30 AM – 6:00 PM</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-[#d8d0c2]">Navigation</div>
            <ul className="space-y-1.5 text-[#817769]">
              <li><a href="#menu" className="hover:text-[#f4efe8]">Espresso & Filter Menu</a></li>
              <li><a href="#story" className="hover:text-[#f4efe8]">Roasting & Terroir</a></li>
              <li><a href="#hours" className="hover:text-[#f4efe8]">Location & Parking</a></li>
              <li><a href="#reviews" className="hover:text-[#f4efe8]">Guest Testimonials</a></li>
            </ul>
          </div>

          {/* Sourcing & Care */}
          <div className="space-y-2">
            <div className="font-semibold uppercase tracking-wider text-[#d8d0c2]">Allergen & Sustainability</div>
            <p className="text-[#7d7467] leading-relaxed">
              We offer certified organic oat, almond, and whole milk with dedicated steaming pitchers to prevent cross-contact. 100% of our spent coffee grounds are donated to city community gardens.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#635b50]">
          <div>
            © {new Date().getFullYear()} Kroma Specialty Coffee & Roasters. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-[#9e9384] cursor-pointer">Sourcing Manifesto</span>
            <span>·</span>
            <span className="hover:text-[#9e9384] cursor-pointer">Privacy & Cookie Policy</span>
            <span>·</span>
            <span className="hover:text-[#9e9384] cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
