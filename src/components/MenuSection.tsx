import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Coffee, SlidersHorizontal, Flame, Snowflake } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'pourover', label: 'Pour Over & Cold Brew' },
    { id: 'specialty', label: 'Signature Specials' },
    { id: 'tea', label: 'Artisanal Teas' },
    { id: 'bakery', label: 'Morning Bakery' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (selectedDiet !== 'all' && !item.dietary.includes(selectedDiet as any)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesNotes = item.flavorNotes.some(note => note.toLowerCase().includes(query));
        const matchesOrigin = item.origin ? item.origin.toLowerCase().includes(query) : false;
        return matchesName || matchesDesc || matchesNotes || matchesOrigin;
      }
      return true;
    });
  }, [selectedCategory, selectedDiet, searchQuery]);

  return (
    <section id="menu" className="py-16 md:py-24 border-b border-[#24211d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c89d66] font-semibold mb-2">
              <span>Micro-Roastery & Bakery Bar</span>
              <span aria-hidden="true" className="text-[#544d43]">·</span>
              <span>Daily Visual Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#fbf8f3] tracking-tight">
              Curated Daily Menu
            </h2>
            <p className="text-sm text-[#9d9486] mt-1.5 max-w-xl">
              Freshly dialled single origins, seasonal botanical infusions, and laminated viennoiserie baked on-site each sunrise. Tap any item to customize or order ahead.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#756c60] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search drinks, notes, beans..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#171513] border border-[#2d2822] rounded-xl text-xs text-[#f4efe8] placeholder-[#756c60] focus:outline-none focus:border-[#c89d66] transition-colors"
            />
          </div>
        </div>

        {/* Category Controls (Functional Segmented Tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#c89d66] text-[#0e0d0c] font-semibold shadow-sm shadow-[#c89d66]/20'
                  : 'bg-[#181614] border border-[#27231d] text-[#a49b8d] hover:text-[#f4efe8] hover:border-[#383229]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Filter Row */}
        <div className="flex items-center justify-between gap-4 mb-8 text-xs text-[#8e8579] flex-wrap">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#c89d66]" />
            <span className="font-medium text-[#b0a79a]">Dietary filter:</span>
            {['all', 'Vegan', 'Dairy-Free', 'Gluten-Free'].map(diet => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedDiet === diet 
                    ? 'text-[#f4efe8] bg-[#29241e] font-medium' 
                    : 'text-[#7e7568] hover:text-[#b0a79a]'
                }`}
              >
                {diet === 'all' ? 'All' : diet}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#71685c]">
            Showing <span className="text-[#f4efe8] font-semibold tabular-nums">{filteredItems.length}</span> handcrafted items
          </div>
        </div>

        {/* Menu Grid with High-Fidelity Photos */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#141210] border border-[#26221d] rounded-2xl">
            <Coffee className="w-8 h-8 text-[#5c5347] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#f4efe8]">No menu items found</p>
            <p className="text-xs text-[#7c7365] mt-1">Try searching for &quot;latte&quot;, &quot;matcha&quot;, &quot;croissant&quot;, or reset your filters.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedDiet('all'); }}
              className="mt-4 px-4 py-2 bg-[#221f1c] hover:bg-[#2d2822] text-xs font-medium text-[#c89d66] rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#141210] border border-[#27231d] hover:border-[#42392d] hover:-translate-y-1 transition-all duration-300 shadow-md overflow-hidden"
              >
                <div>
                  {/* Photo Container with Zero-Broken-Image Fallback */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181614]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={`${item.name} - ${item.description}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.imageFallbackGradient} flex items-center justify-center`}>
                        <Coffee className="w-10 h-10 text-white/20" />
                      </div>
                    )}

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-black/20" />

                    {/* Overlaid Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {item.isPopular && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#141210]/85 text-[#f4efe8] backdrop-blur-md border border-[#c89d66]/40 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#c89d66]" />
                          Signature
                        </span>
                      )}
                      {item.isSeasonal && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#141210]/85 text-amber-300 backdrop-blur-md border border-amber-500/30">
                          Seasonal Lot
                        </span>
                      )}
                    </div>

                    {/* Price Tag in Corner */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#141210]/90 backdrop-blur-md border border-[#2f2921] text-xs font-bold text-[#c89d66] font-mono tabular-nums shadow-sm">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Metadata Header (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8e8579] mb-1.5">
                      <span className="uppercase tracking-wider font-semibold text-[#c89d66]">
                        {item.category}
                      </span>
                      {item.origin && (
                        <>
                          <span aria-hidden="true" className="text-[#4e473e]">·</span>
                          <span className="truncate max-w-[140px] text-[#9e9587]">{item.origin}</span>
                        </>
                      )}
                      {item.calories && (
                        <>
                          <span aria-hidden="true" className="text-[#4e473e]">·</span>
                          <span className="text-[#756d61]">{item.calories} cal</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-[#f4efe8] group-hover:text-[#c89d66] transition-colors font-heading mb-1.5">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#9d9486] leading-relaxed line-clamp-2 mb-3.5">
                      {item.description}
                    </p>

                    {/* Tasting notes */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      {item.flavorNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#1c1916] text-[#a49b8d] border border-[#2b2620]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#221f1a] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectItem(item)}
                      className="flex-1 py-2 px-3 text-xs font-medium rounded-lg bg-[#1f1c19] text-[#e0d9cd] border border-[#2f2a23] hover:border-[#c89d66]/50 hover:bg-[#28241f] transition-all text-center"
                    >
                      Customize Order
                    </button>

                    <button
                      type="button"
                      onClick={() => onQuickAdd(item)}
                      aria-label={`Quick add ${item.name} to order`}
                      title="Quick add standard recipe"
                      className="p-2 rounded-lg bg-[#c89d66] text-[#0e0d0c] hover:bg-[#d6af7a] active:scale-95 transition-all shadow-sm shadow-[#c89d66]/20"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
