import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/cafeData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 border-b border-[#24211d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#c89d66] font-semibold mb-2">
            Community Echoes
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#fbf8f3] tracking-tight">
            Loved by Daily Commuters & Coffee Purists
          </h2>
          <p className="text-sm text-[#9d9486] mt-2">
            From dawn pour overs to afternoon team debriefs in our sunlit courtyard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#141210] border border-[#27231d] flex flex-col justify-between hover:border-[#383127] transition-colors"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#c89d66]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#c0b8ac] leading-relaxed mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#221f1a]">
                <div className="text-xs font-semibold text-[#f4efe8]">{rev.author}</div>
                <div className="text-[11px] text-[#7d7467]">{rev.role}</div>
                <div className="text-[10px] text-[#c89d66] mt-2 truncate">
                  Favorite: {rev.favoriteDrink}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
