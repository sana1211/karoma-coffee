import React, { useState, useMemo } from 'react';
import { X, Plus, Minus, Check, Flame, Snowflake, Coffee } from 'lucide-react';
import { MenuItem, CoffeeCustomization, CartItem } from '../types/cafe';

interface CustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBakery = item.category === 'bakery';

  // State
  const [size, setSize] = useState<'8oz' | '12oz' | '16oz'>('12oz');
  const [roast, setRoast] = useState<'House Velvet Blend' | 'Single-Origin Ethiopian Light' | 'Dark Sumatra Reserve' | 'Swiss Water Decaf'>('House Velvet Blend');
  const [milk, setMilk] = useState<'Whole Milk' | 'Oatly Barista' | 'Almond Milk' | 'Pistachio Milk' | 'No Milk / Black'>(
    item.category === 'espresso' || item.category === 'specialty' || item.category === 'tea' ? 'Oatly Barista' : 'No Milk / Black'
  );
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [sweetness, setSweetness] = useState<'Unsweetened (0%)' | 'Light (25%)' | 'Balanced (50%)' | 'Sweet (100%)'>('Unsweetened (0%)');
  const [extraShots, setExtraShots] = useState(0);
  const [syrups, setSyrups] = useState<string[]>([]);
  const [pastryWarmed, setPastryWarmed] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Price calculation
  const unitPrice = useMemo(() => {
    let price = item.price;
    if (!isBakery) {
      if (size === '12oz') price += 0.60;
      if (size === '16oz') price += 1.20;
      if (roast === 'Single-Origin Ethiopian Light') price += 0.50;
      if (milk === 'Oatly Barista' || milk === 'Almond Milk') price += 0.75;
      if (milk === 'Pistachio Milk') price += 0.95;
      price += extraShots * 1.00;
      price += syrups.length * 0.75;
    }
    return Number(price.toFixed(2));
  }, [item.price, isBakery, size, roast, milk, extraShots, syrups]);

  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const toggleSyrup = (name: string) => {
    setSyrups(prev => 
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const handleAdd = () => {
    const customization: CoffeeCustomization = {
      size,
      roast,
      milk,
      temperature,
      sweetness,
      extraShots,
      syrups,
      pastryWarmed: isBakery ? pastryWarmed : undefined,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
    };

    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      item,
      customization,
      quantity,
      unitPrice,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#141210] border border-[#2d2822] rounded-2xl shadow-2xl overflow-hidden my-6 text-[#f4efe8]"
        onClick={e => e.stopPropagation()}
      >
        {/* Photo Banner */}
        {item.imageUrl && (
          <div className="relative h-40 w-full overflow-hidden bg-[#181614]">
            <img
              src={item.imageUrl}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/40 to-black/30" />
            
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#f4efe8] hover:bg-black/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c89d66] bg-[#141210]/80 px-2 py-0.5 rounded border border-[#c89d66]/30">
                  {item.category}
                </span>
                <h2 className="text-xl font-bold font-serif-display text-[#f4efe8] mt-1">{item.name}</h2>
              </div>
              <span className="text-sm font-bold text-[#c89d66] font-mono bg-[#141210]/90 px-2.5 py-1 rounded-lg border border-[#302a22]">
                Base ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Fallback Header if no imageUrl */}
        {!item.imageUrl && (
          <div className="p-5 border-b border-[#25211c] flex items-start justify-between bg-[#181613]">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#c89d66] font-medium mb-1">
                {item.category.toUpperCase()} · CUSTOMIZE
              </div>
              <h2 className="text-xl font-bold font-serif-display text-[#f4efe8]">{item.name}</h2>
              <p className="text-xs text-[#9d9486] mt-1 max-w-sm">{item.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#8e8579] hover:text-[#f4efe8] hover:bg-[#221f1b] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-5 space-y-6 max-h-[68vh] overflow-y-auto">
          
          {!isBakery ? (
            <>
              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2.5">
                  Serving Temperature
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTemperature('Hot')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                      temperature === 'Hot'
                        ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                        : 'border-[#2d2822] bg-[#1a1715] text-[#9d9486] hover:border-[#3e3830]'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Steamed Hot (145°F)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemperature('Iced')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                      temperature === 'Iced'
                        ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                        : 'border-[#2d2822] bg-[#1a1715] text-[#9d9486] hover:border-[#3e3830]'
                    }`}
                  >
                    <Snowflake className="w-4 h-4 text-sky-400" />
                    <span>Over Artisanal Ice</span>
                  </button>
                </div>
              </div>

              {/* Cup Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2.5">
                  Cup Size
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: '8oz', label: '8 oz', sub: 'Traditional' },
                    { id: '12oz', label: '12 oz', sub: '+$0.60' },
                    { id: '16oz', label: '16 oz', sub: '+$1.20' },
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id as any)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        size === s.id
                          ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                          : 'border-[#2d2822] bg-[#1a1715] text-[#9d9486] hover:border-[#3e3830]'
                      }`}
                    >
                      <div className="text-xs font-semibold">{s.label}</div>
                      <div className="text-[10px] text-[#8e8579]">{s.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bean Roast Profile */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2.5">
                  Bean Profile & Origin
                </label>
                <div className="space-y-2">
                  {[
                    { name: 'House Velvet Blend', note: 'Balanced chocolate & praline', extra: 'Included' },
                    { name: 'Single-Origin Ethiopian Light', note: 'Floral jasmine & crisp citrus', extra: '+$0.50' },
                    { name: 'Dark Sumatra Reserve', note: 'Smoky cedar & bakers cocoa', extra: 'Included' },
                    { name: 'Swiss Water Decaf', note: 'Caffeine-free Colombian Huila', extra: 'Included' },
                  ].map(r => (
                    <button
                      key={r.name}
                      type="button"
                      onClick={() => setRoast(r.name as any)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                        roast === r.name
                          ? 'border-[#c89d66] bg-[#c89d66]/10 text-[#f4efe8]'
                          : 'border-[#26221d] bg-[#181614] text-[#a49b8d] hover:border-[#38322a]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium flex items-center gap-2">
                          <span>{r.name}</span>
                          {roast === r.name && <Check className="w-3.5 h-3.5 text-[#c89d66]" />}
                        </div>
                        <div className="text-[11px] text-[#7d7467]">{r.note}</div>
                      </div>
                      <span className="text-xs font-semibold text-[#c89d66] tabular-nums">{r.extra}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2.5">
                  Milk & Plant-Based Choice
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Oatly Barista', label: 'Oatly Barista', extra: '+$0.75' },
                    { id: 'Whole Milk', label: 'Organic Whole Milk', extra: 'Included' },
                    { id: 'Almond Milk', label: 'House Almond Milk', extra: '+$0.75' },
                    { id: 'Pistachio Milk', label: 'Sicilian Pistachio', extra: '+$0.95' },
                    { id: 'No Milk / Black', label: 'No Milk (Pure Black)', extra: 'Included' },
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilk(m.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        milk === m.id
                          ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                          : 'border-[#26221d] bg-[#181614] text-[#a49b8d] hover:border-[#38322a]'
                      }`}
                    >
                      <div className="text-xs font-medium">{m.label}</div>
                      <div className="text-[10px] text-[#c89d66] tabular-nums">{m.extra}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Espresso Shots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a2]">
                    Extra Espresso Shots
                  </label>
                  <span className="text-xs text-[#c89d66]">+$1.00 / shot</span>
                </div>
                <div className="flex items-center gap-3 bg-[#181614] border border-[#28241e] p-2 rounded-xl">
                  <Coffee className="w-4 h-4 text-[#c89d66] ml-2" />
                  <span className="text-xs text-[#c0b8ac] flex-1">
                    {extraShots === 0 ? 'Standard Recipe' : `+${extraShots} Extra Shot${extraShots > 1 ? 's' : ''}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExtraShots(Math.max(0, extraShots - 1))}
                      disabled={extraShots === 0}
                      className="p-1 rounded bg-[#24201a] text-[#c0b8ac] hover:text-white disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center tabular-nums">{extraShots}</span>
                    <button
                      type="button"
                      onClick={() => setExtraShots(Math.min(3, extraShots + 1))}
                      disabled={extraShots === 3}
                      className="p-1 rounded bg-[#24201a] text-[#c0b8ac] hover:text-white disabled:opacity-30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Botanical Syrups & Flavors */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2.5">
                  Handcrafted House Syrups (+$0.75 each)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Madagascar Vanilla Bean',
                    'Sea Salt Caramel',
                    'Wild French Lavender',
                    'Spiced Cinnamon Bark',
                  ].map(s => {
                    const active = syrups.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSyrup(s)}
                        className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                          active
                            ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                            : 'border-[#26221d] bg-[#181614] text-[#8e8579] hover:border-[#38322a]'
                        }`}
                      >
                        <div className="font-medium">{s}</div>
                        <div className="text-[10px] text-[#c89d66]">{active ? 'Added' : '+$0.75'}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2.5">
                  Sweetness Intensity
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Unsweetened (0%)', 'Light (25%)', 'Balanced (50%)', 'Sweet (100%)'] as const).map(sw => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSweetness(sw)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        sweetness === sw
                          ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                          : 'border-[#26221d] bg-[#181614] text-[#8e8579] hover:border-[#38322a]'
                      }`}
                    >
                      <div className="text-[11px] font-medium">{sw.split(' ')[0]}</div>
                      <div className="text-[10px] text-[#71685c]">{sw.match(/\(.*\)/)?.[0]}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Bakery Options */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2">
                  Preparation & Warming
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPastryWarmed(true)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      pastryWarmed
                        ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                        : 'border-[#26221d] bg-[#181614] text-[#8e8579]'
                    }`}
                  >
                    <div className="text-xs font-semibold">Warm & Crisp</div>
                    <div className="text-[11px] text-[#8e8579]">Gently toasted to melt layers</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPastryWarmed(false)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      !pastryWarmed
                        ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                        : 'border-[#26221d] bg-[#181614] text-[#8e8579]'
                    }`}
                  >
                    <div className="text-xs font-semibold">Ambient / Fresh</div>
                    <div className="text-[11px] text-[#8e8579]">As-is from morning bakery display</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2">
              Note for the Barista
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder="e.g., In personal thermos, light ice, extra napkin..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#181614] border border-[#2d2822] text-xs text-[#f4efe8] placeholder-[#6e6559] focus:outline-none focus:border-[#c89d66]"
            />
          </div>

        </div>

        {/* Modal Footer with quantity & Add to cart */}
        <div className="p-4 border-t border-[#25211c] bg-[#181613] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 border border-[#2f2a24] bg-[#13110f] px-3 py-1.5 rounded-xl">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
              className="text-[#9d9486] hover:text-[#f4efe8] disabled:opacity-30"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold w-6 text-center tabular-nums">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#9d9486] hover:text-[#f4efe8]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 flex items-center justify-between px-5 py-3 rounded-xl bg-[#c89d66] text-[#0e0d0c] font-semibold text-xs hover:bg-[#d6af7a] active:scale-[0.98] transition-all shadow-md shadow-[#c89d66]/20"
          >
            <span>Add to Order</span>
            <span className="tabular-nums font-bold text-sm">${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
