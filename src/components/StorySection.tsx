import React from 'react';
import { COFFEE_ROAST_STORIES } from '../data/cafeData';
import beansImg from '../assets/images/coffee_beans_roasting_1791131743898.jpg';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-24 border-b border-[#24211d] bg-[#110f0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Roasting Photography */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-[#2e2820] shadow-xl group">
              <div className="aspect-[4/3] overflow-hidden bg-[#161412]">
                <img
                  src={beansImg}
                  alt="Freshly roasted specialty coffee beans cascading in cooling tray"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Overlaid Pill-less Editorial Stat Card */}
            <div className="mt-4 p-4 rounded-xl bg-[#161411] border border-[#2b251e] flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-[#f4efe8]">Loring S35 Single-Pass Roaster</div>
                <div className="text-[#8e8579]">80% lower greenhouse emissions vs traditional drum roasters</div>
              </div>
              <div className="text-right">
                <div className="text-[#c89d66] font-bold font-mono text-sm tabular-nums">86+ SCA</div>
                <div className="text-[10px] text-[#71685b]">Grade Threshold</div>
              </div>
            </div>
          </div>

          {/* Right Column: Roasting Philosophy Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#c89d66] font-semibold">
              The Roastery Philosophy
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#fbf8f3] tracking-tight leading-snug">
              Direct Trade, Respect for the Bean, Precision Extraction
            </h2>

            <p className="text-sm text-[#b0a79a] leading-relaxed">
              Great coffee is not invented in the café; it is born on high-elevation volcanic slopes and nurtured by generational farming families. Our duty as roasters is simple: stay out of the way of the origin’s natural brilliance.
            </p>

            <p className="text-sm text-[#b0a79a] leading-relaxed">
              Every bean is roasted on a clean convection profile to highlight bright terroir florals, sparkling citrus brightness, and deep caramel sweetness without smoky bitterness.
            </p>

            {/* 3 Pillars */}
            <div className="space-y-4 pt-3 border-t border-[#26211a]">
              {COFFEE_ROAST_STORIES.map(item => (
                <div key={item.title} className="p-3.5 rounded-xl bg-[#161411] border border-[#24201a]">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-semibold text-[#f4efe8]">{item.title}</h3>
                    <span className="text-xs font-mono font-semibold text-[#c89d66] tabular-nums">
                      {item.stat}
                    </span>
                  </div>
                  <p className="text-xs text-[#8c8273] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
