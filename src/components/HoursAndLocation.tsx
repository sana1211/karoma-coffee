import React, { useState } from 'react';
import { Clock, MapPin, Copy, Check, Navigation, Wifi, Zap, Sun, Bike, Sparkles } from 'lucide-react';
import { OPENING_HOURS, CAFE_AMENITIES } from '../data/cafeData';
import { getCurrentCafeStatus } from '../utils/hoursHelper';
import interiorImg from '../assets/images/cafe_interior_ambiance_1791131726837.jpg';

export const HoursAndLocation: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const status = getCurrentCafeStatus();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Kandy City Centre, Dalada Veediya, Kandy, Sri Lanka');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hours" className="py-16 md:py-24 border-b border-[#24211d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#c89d66] font-semibold mb-2">
            Visit Our Space
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#fbf8f3] tracking-tight">
            Opening Hours & Sanctuary
          </h2>
          <p className="text-sm text-[#9d9486] mt-2">
            Designed for thoughtful conversations, quiet focus, and warm neighborhood rituals.
          </p>
        </div>

        {/* Top Grid: Schedule & Interior Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: Weekly Hours Schedule */}
          <div className="lg:col-span-5 bg-[#141210] border border-[#27231d] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-5 border-b border-[#241f19] mb-5">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#c89d66]" />
                <h3 className="text-lg font-serif-display font-semibold text-[#f4efe8]">
                  Weekly Schedule
                </h3>
              </div>

              {/* Dynamic live badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#1d1a16] border border-[#2e2922]">
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-amber-500'}`} />
                <span className="text-[#e2dbce]">{status.message}</span>
              </div>
            </div>

            <div className="space-y-3">
              {OPENING_HOURS.map(schedule => {
                const isToday = schedule.day === status.currentDay;
                return (
                  <div
                    key={schedule.day}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors ${
                      isToday 
                        ? 'bg-[#221d17] border border-[#c89d66]/40 text-[#f4efe8]' 
                        : 'text-[#9c9385] hover:bg-[#1a1714]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isToday ? 'text-[#c89d66]' : 'text-[#d6cebf]'}`}>
                        {schedule.day}
                      </span>
                      {isToday && (
                        <span className="text-[10px] uppercase font-bold text-[#c89d66] bg-[#c89d66]/10 px-1.5 py-0.5 rounded">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="font-mono tabular-nums text-[#e8e2d8]">
                        {schedule.open} – {schedule.close}
                      </div>
                      {schedule.specialNote && (
                        <div className="text-[10px] text-[#c89d66]/80">{schedule.specialNote}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Brew Bar Notes */}
            <div className="mt-6 pt-5 border-t border-[#241f19] text-xs text-[#8e8579] space-y-1">
              <p>☕ <strong className="text-[#d8d0c2]">Espresso Bar:</strong> Dialled in all day until closing.</p>
              <p>🌱 <strong className="text-[#d8d0c2]">Pour Over Flight:</strong> Hand-brewed until 6:00 PM daily.</p>
              <p>🥐 <strong className="text-[#d8d0c2]">Pastries:</strong> Fresh out of oven 6:45 AM & 11:30 AM.</p>
            </div>
          </div>

          {/* Right Column: Interior Ambiance Photo & Architectural Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#2b261f] bg-[#141210] shadow-md group">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={interiorImg}
                  alt="Modern minimalist specialty coffee interior with warm oak and terrazzo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-4 bg-[#141210] flex items-center justify-between border-t border-[#241f19]">
                <div>
                  <h4 className="text-sm font-semibold text-[#f4efe8]">The Espresso Bar & Community Hall</h4>
                  <p className="text-xs text-[#8e8579]">Natural northern daylight, acoustic oak paneling, and warm conversation.</p>
                </div>
                <span className="text-xs text-[#c89d66] font-medium hidden sm:inline">Walk-ins Welcome</span>
              </div>
            </div>

            {/* Interactive Location Bar */}
            <div className="p-5 rounded-2xl bg-[#141210] border border-[#27231d] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#24201a] border border-[#352f26] flex items-center justify-center text-[#c89d66] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f4efe8]">Kandy City Centre Area</h4>
                  <p className="text-xs text-[#8e8579]">Dalada Veediya, Kandy, Sri Lanka · Demo location</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1f1c18] border border-[#2e2922] text-xs font-medium text-[#c8c1b4] hover:text-white hover:bg-[#28241f] transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Kandy+City+Centre%2C+Kandy%2C+Sri+Lanka"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#c89d66] text-[#0e0d0c] text-xs font-semibold hover:bg-[#d6af7a] transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Google Maps embed — Kandy demo location (no API key needed) */}
        <div className="rounded-2xl border border-[#27231d] bg-[#141210] p-6 mb-12 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#f4efe8] font-heading">Find Us in Kandy</h3>
              <p className="text-xs text-[#8e8579]">Kandy City Centre, Dalada Veediya, Kandy, Sri Lanka — sample location for this website demo.</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kandy+City+Centre%2C+Kandy%2C+Sri+Lanka"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#c89d66] hover:text-[#d6af7a]"
            >Open in Google Maps ↗</a>
          </div>
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-[#221f19]">
            <iframe
              title="Map of Kandy City Centre, Sri Lanka"
              src="https://maps.google.com/maps?q=Kandy%20City%20Centre%2C%20Kandy%2C%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Café Amenities Cards */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-[#c89d66] font-semibold text-center mb-6">
            Thoughtful Amenities For Our Guests
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {CAFE_AMENITIES.map((amenity, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#141210] border border-[#231f19] hover:border-[#383228] transition-colors text-center"
              >
                <div className="text-xs font-semibold text-[#f4efe8] mb-1">{amenity.title}</div>
                <div className="text-[11px] text-[#817769] leading-snug">{amenity.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
