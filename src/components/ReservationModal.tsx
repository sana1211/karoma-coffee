import React, { useState } from 'react';
import { X, Calendar, Users, Coffee, Check, Clock } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [bookingType, setBookingType] = useState<'tasting' | 'table'>('tasting');
  const [date, setDate] = useState('2026-10-10');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#141210] border border-[#2d2822] rounded-2xl shadow-2xl overflow-hidden my-6 text-[#f4efe8]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#25211c] bg-[#181613] flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#c89d66] font-semibold mb-1">
              Guest Experiences
            </div>
            <h2 className="text-lg font-serif-display font-bold text-[#f4efe8]">
              Reserve Cupping or Quiet Booth
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8e8579] hover:text-[#f4efe8] hover:bg-[#201d19]"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif-display text-[#f4efe8]">Reservation Confirmed!</h3>
            <p className="text-xs text-[#a09789] max-w-sm mx-auto leading-relaxed">
              We have reserved your {bookingType === 'tasting' ? 'Coffee Tasting Session' : 'Café Table'} for <strong className="text-[#f4efe8]">{partySize} guests</strong> on <strong className="text-[#f4efe8]">{date} at {timeSlot}</strong>. A confirmation SMS and calendar invite have been sent to {email}.
            </p>
            <div className="p-3 bg-[#191613] border border-[#2b251e] rounded-xl text-xs text-[#c89d66] font-mono">
              Confirmation Code: #KROMA-RES-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#c89d66] text-[#0e0d0c] font-semibold text-xs hover:bg-[#d6af7a] transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Experience Type Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-2">
                Experience Type
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setBookingType('tasting')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    bookingType === 'tasting'
                      ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                      : 'border-[#26211a] bg-[#171512] text-[#8e8579]'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-[#c89d66]" />
                    <span>Coffee Cupping Flight</span>
                  </div>
                  <div className="text-[11px] text-[#8e8579] mt-0.5">3-origin guided flight with head roaster ($18/person)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType('table')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    bookingType === 'table'
                      ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8]'
                      : 'border-[#26211a] bg-[#171512] text-[#8e8579]'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c89d66]" />
                    <span>Focus Booth / Table</span>
                  </div>
                  <div className="text-[11px] text-[#8e8579] mt-0.5">Quiet laptop nook or sunlit patio table (Free)</div>
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-1.5">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] focus:outline-none focus:border-[#c89d66]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-1.5">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] focus:outline-none focus:border-[#c89d66]"
                >
                  <option value="09:00 AM">09:00 AM (Early Roast)</option>
                  <option value="11:00 AM">11:00 AM (Mid-Morning)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon Focus)</option>
                  <option value="04:00 PM">04:00 PM (Public Cupping)</option>
                  <option value="06:00 PM">06:00 PM (Evening Lounge)</option>
                </select>
              </div>
            </div>

            {/* Party Size */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-1.5">
                Party Size
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPartySize(num)}
                    className={`py-2 rounded-lg border text-xs font-medium tabular-nums transition-all ${
                      partySize === num
                        ? 'border-[#c89d66] bg-[#c89d66]/15 text-[#f4efe8] font-bold'
                        : 'border-[#26211a] bg-[#171512] text-[#8e8579]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Clara Oswald"
                  className="w-full px-3.5 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] placeholder-[#665e52] focus:outline-none focus:border-[#c89d66]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="clara@example.com"
                    className="w-full px-3 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] placeholder-[#665e52] focus:outline-none focus:border-[#c89d66]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] placeholder-[#665e52] focus:outline-none focus:border-[#c89d66]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#b8b0a2] mb-1">
                  Special Requests / Dietary Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Need outlet for laptop, oat milk preference, high-chair..."
                  className="w-full px-3.5 py-2 bg-[#171512] border border-[#28231d] rounded-xl text-xs text-[#f4efe8] placeholder-[#665e52] focus:outline-none focus:border-[#c89d66]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#c89d66] text-[#0e0d0c] font-semibold text-xs hover:bg-[#d6af7a] active:scale-[0.98] transition-all shadow-md shadow-[#c89d66]/20"
              >
                Confirm Experience Reservation
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
