import React, { useState, useMemo } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Clock, User, Phone, CreditCard, CheckCircle2 } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  // Checkout inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupOption, setPickupOption] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('In 30 mins');
  const [tipRate, setTipRate] = useState<number>(0.18); // 18% default
  const [customTip, setCustomTip] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card' | 'counter'>('apple_pay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  }, [items]);

  const tax = useMemo(() => Number((subtotal * 0.0825).toFixed(2)), [subtotal]);

  const calculatedTip = useMemo(() => {
    if (customTip !== '') {
      const parsed = parseFloat(customTip);
      return isNaN(parsed) ? 0 : Math.max(0, parsed);
    }
    return Number((subtotal * tipRate).toFixed(2));
  }, [subtotal, tipRate, customTip]);

  const grandTotal = useMemo(() => {
    return Number((subtotal + tax + calculatedTip).toFixed(2));
  }, [subtotal, tax, calculatedTip]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your name for pickup order callout.');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError('Please enter a phone number for ready notifications.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `KROMA-${Math.floor(100 + Math.random() * 900)}`,
        items: [...items],
        subtotal,
        tax,
        tip: calculatedTip,
        total: grandTotal,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        pickupTime: pickupOption === 'asap' ? 'Ready in ~12-15 min' : scheduledTime,
        paymentMethod,
        status: 'received',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedMinutes: 12,
      };

      setIsSubmitting(false);
      onClearCart();
      onClose();
      onOrderPlaced(newOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13110f] border-l border-[#28231d] shadow-2xl flex flex-col text-[#f4efe8]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#25211b] flex items-center justify-between bg-[#171512]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#c89d66]" />
              <h2 className="text-base font-semibold font-serif-display text-[#f4efe8]">
                Your Order Bag
              </h2>
              {items.length > 0 && (
                <span className="text-xs text-[#8e8579] font-normal">
                  ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8e8579] hover:text-[#f4efe8] hover:bg-[#201d19] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#1d1a17] border border-[#2b2620] flex items-center justify-center text-[#7e7568] mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#f4efe8]">Your bag is currently empty</h3>
              <p className="text-xs text-[#8e8579] mt-1.5 max-w-xs leading-relaxed">
                Add your favorite pour overs, flat whites, and warm morning pastries to order ahead for counter pickup.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 rounded-xl bg-[#c89d66] text-[#0e0d0c] font-semibold text-xs hover:bg-[#d6af7a] transition-all"
              >
                Browse Daily Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              
              {/* Items List */}
              <div className="space-y-3">
                {items.map(cartItem => (
                  <div
                    key={cartItem.cartId}
                    className="p-3.5 rounded-xl bg-[#171512] border border-[#26211a] flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-[#f4efe8] font-heading">
                          {cartItem.item.name}
                        </h4>
                        <div className="text-xs text-[#a09789] mt-0.5 space-x-1">
                          <span>{cartItem.customization.size}</span>
                          <span>·</span>
                          <span>{cartItem.customization.temperature}</span>
                          {cartItem.customization.milk !== 'No Milk / Black' && (
                            <>
                              <span>·</span>
                              <span>{cartItem.customization.milk}</span>
                            </>
                          )}
                        </div>

                        {/* Extra customizations */}
                        <div className="text-[11px] text-[#786f62] mt-1 space-y-0.5">
                          {cartItem.customization.roast !== 'House Velvet Blend' && (
                            <div>Roast: {cartItem.customization.roast}</div>
                          )}
                          {cartItem.customization.extraShots > 0 && (
                            <div>+{cartItem.customization.extraShots} Extra Espresso Shot</div>
                          )}
                          {cartItem.customization.syrups.length > 0 && (
                            <div>Syrups: {cartItem.customization.syrups.join(', ')}</div>
                          )}
                          {cartItem.customization.specialInstructions && (
                            <div className="italic text-[#c89d66]/90">&quot;{cartItem.customization.specialInstructions}&quot;</div>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-semibold text-[#c89d66] tabular-nums">
                          ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls & remove */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#221e17] mt-1">
                      <div className="flex items-center gap-2 bg-[#1f1c18] border border-[#2b2620] px-2 py-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                          className="text-[#8e8579] hover:text-[#f4efe8]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                          className="text-[#8e8579] hover:text-[#f4efe8]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-[#71685b] hover:text-rose-400 p-1 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Pickup Time Choice */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2">
                  Pickup Schedule
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPickupOption('asap')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 ${
                      pickupOption === 'asap'
                        ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                        : 'border-[#26211a] bg-[#171512] text-[#8e8579]'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-[#c89d66]" />
                    <div>
                      <div className="font-semibold">ASAP</div>
                      <div className="text-[10px] text-[#8e8579]">~12-15 min</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPickupOption('scheduled')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 ${
                      pickupOption === 'scheduled'
                        ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                        : 'border-[#26211a] bg-[#171512] text-[#8e8579]'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-[#c89d66]" />
                    <div>
                      <div className="font-semibold">Today Later</div>
                      <div className="text-[10px] text-[#8e8579]">Set time</div>
                    </div>
                  </button>
                </div>

                {pickupOption === 'scheduled' && (
                  <div className="mt-2 flex gap-2">
                    {['In 30 mins', 'In 45 mins', 'In 1 Hour', 'At 4:30 PM'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setScheduledTime(t)}
                        className={`px-2.5 py-1.5 rounded-lg border text-[11px] flex-1 ${
                          scheduledTime === t 
                            ? 'border-[#c89d66] bg-[#2b241b] text-[#f4efe8]' 
                            : 'border-[#26211a] bg-[#171512] text-[#8e8579]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Barista Tip Calculator */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#b8b0a2]">
                    Barista Gratitude
                  </label>
                  <span className="text-xs text-[#c89d66] tabular-nums font-semibold">
                    ${calculatedTip.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {[
                    { label: '15%', rate: 0.15 },
                    { label: '18%', rate: 0.18 },
                    { label: '20%', rate: 0.20 },
                    { label: 'None', rate: 0.0 },
                  ].map(t => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => { setTipRate(t.rate); setCustomTip(''); }}
                      className={`py-1.5 rounded-lg border text-center transition-all ${
                        customTip === '' && tipRate === t.rate
                          ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8] font-semibold'
                          : 'border-[#26211a] bg-[#171512] text-[#8e8579] hover:border-[#383228]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="pt-2 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2]">
                  Pickup Details
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="w-4 h-4 text-[#756c5e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="Your Full Name (e.g. Jordan Miller)"
                      className="w-full pl-9 pr-3 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] placeholder-[#665e52] focus:outline-none focus:border-[#c89d66]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#756c5e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="Mobile Phone (for pickup text alert)"
                      className="w-full pl-9 pr-3 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] placeholder-[#665e52] focus:outline-none focus:border-[#c89d66]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'apple_pay', label: 'Apple Pay' },
                    { id: 'card', label: 'Credit Card' },
                    { id: 'counter', label: 'At Counter' },
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        paymentMethod === m.id
                          ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8] font-semibold'
                          : 'border-[#26211a] bg-[#171512] text-[#8e8579]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {formError && (
                <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/50 p-2 rounded-lg">
                  {formError}
                </p>
              )}

            </div>
          )}

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#25211b] bg-[#171512] space-y-3">
              <div className="space-y-1.5 text-xs text-[#9d9486]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[#e8e2d8]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="tabular-nums text-[#e8e2d8]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Barista Tip</span>
                  <span className="tabular-nums text-[#e8e2d8]">${calculatedTip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#f4efe8] pt-1.5 border-t border-[#28231c]">
                  <span>Total Due</span>
                  <span className="tabular-nums text-[#c89d66] text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#c89d66] text-[#0e0d0c] font-semibold text-xs hover:bg-[#d6af7a] active:scale-[0.98] transition-all shadow-md shadow-[#c89d66]/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending to Barista Screen...</span>
                ) : (
                  <>
                    <span>Confirm & Send Pickup Order (${grandTotal.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
