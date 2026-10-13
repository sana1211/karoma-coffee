import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Coffee, Sparkles, X, ChevronRight, QrCode } from 'lucide-react';
import { OrderDetails } from '../types/cafe';

interface OrderTrackingModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  // Stages: 0: Received, 1: Brewing, 2: Ready
  const [currentStep, setCurrentStep] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(12 * 60);

  useEffect(() => {
    // Advance steps to simulate real cafe production
    const step1Timer = setTimeout(() => setCurrentStep(1), 4000);
    const step2Timer = setTimeout(() => setCurrentStep(2), 12000);

    const countdown = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearInterval(countdown);
    };
  }, []);

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const steps = [
    { title: 'Order Received', desc: 'Ticket printed at barista espresso station' },
    { title: 'Grinding & Crafting', desc: 'Dosing 18g single-origin & steaming milk to 145°F' },
    { title: 'Ready on Counter', desc: 'Placed under your name on express pickup ledge' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#141210] border border-[#2e2923] rounded-2xl shadow-2xl overflow-hidden my-6 text-[#f4efe8]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#25211c] bg-[#181613] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h2 className="text-base font-semibold font-serif-display text-[#f4efe8]">
              Live Order Tracker
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8e8579] hover:text-[#f4efe8] hover:bg-[#201d19]"
            aria-label="Close tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Order Banner */}
          <div className="text-center p-5 rounded-2xl bg-[#191613] border border-[#2b251e]">
            <div className="text-xs uppercase tracking-widest text-[#c89d66] font-semibold mb-1">
              Pickup Order ID
            </div>
            <div className="text-3xl font-bold font-heading text-[#f4efe8] tracking-tight">
              {order.orderId}
            </div>
            <p className="text-xs text-[#9d9486] mt-1">
              Ordered by <span className="font-semibold text-[#f4efe8]">{order.customerName}</span> · {order.createdAt}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24201a] border border-[#352f26] text-xs">
              <Clock className="w-3.5 h-3.5 text-[#c89d66]" />
              <span className="text-[#a49b8d]">Estimated Ready Time:</span>
              <span className="font-bold text-[#f4efe8] tabular-nums font-mono">
                {currentStep === 2 ? 'Ready for you now!' : `${formatCountdown(secondsRemaining)} min`}
              </span>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-4">
            {steps.map((st, idx) => {
              const isDone = idx <= currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div key={st.title} className="flex items-start gap-3.5">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone 
                          ? 'bg-[#c89d66] text-[#0e0d0c]' 
                          : 'bg-[#1f1c19] text-[#71685b] border border-[#2f2921]'
                      } ${isCurrent ? 'ring-4 ring-[#c89d66]/20' : ''}`}
                    >
                      {idx < currentStep ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`w-0.5 h-8 my-1 ${idx < currentStep ? 'bg-[#c89d66]' : 'bg-[#26211a]'}`} />
                    )}
                  </div>

                  <div className="pt-0.5">
                    <h4 className={`text-xs font-semibold ${isDone ? 'text-[#f4efe8]' : 'text-[#7e7568]'}`}>
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-[#8e8579]">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pickup Instructions */}
          <div className="p-4 rounded-xl bg-[#181512] border border-[#29241d] flex items-start gap-3 text-xs text-[#a09789]">
            <MapPin className="w-4 h-4 text-[#c89d66] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#f4efe8]">Pickup Location:</div>
              <div>428 Artisan Way, Coffee & Roastery Arts Quarter</div>
              <div className="text-[11px] text-[#7d7467] mt-0.5">
                Look for the brass Express Counter by the roaster. Present your order number or name to the bar team.
              </div>
            </div>
          </div>

          {/* Itemized Receipt Recap */}
          <div className="border-t border-[#25211b] pt-4 space-y-2">
            <div className="text-xs font-semibold text-[#b8b0a2] uppercase tracking-wider">
              Order Summary ({order.items.length} items)
            </div>
            <div className="space-y-1.5 text-xs text-[#9d9486]">
              {order.items.map(it => (
                <div key={it.cartId} className="flex justify-between items-center">
                  <span className="truncate max-w-[280px]">
                    {it.quantity}x {it.item.name} ({it.customization.size}, {it.customization.temperature})
                  </span>
                  <span className="tabular-nums font-mono">${(it.unitPrice * it.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 border-t border-[#241f19] font-bold text-[#f4efe8]">
                <span>Total Paid</span>
                <span className="text-[#c89d66] tabular-nums font-mono">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#25211c] bg-[#181613] flex gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-[#24201a] border border-[#352f26] hover:bg-[#2c2720] text-xs font-semibold text-[#f4efe8] transition-colors"
          >
            Keep Order Open in Background
          </button>
        </div>

      </div>
    </div>
  );
};
