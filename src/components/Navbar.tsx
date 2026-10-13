import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Volume2, VolumeX } from 'lucide-react';
import { getCurrentCafeStatus } from '../utils/hoursHelper';
import { cafeAmbiance } from '../utils/audioAmbience';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReserve,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [status, setStatus] = useState(getCurrentCafeStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getCurrentCafeStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const playing = cafeAmbiance.toggle();
    setIsAudioPlaying(playing);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0e0d0c]/90 backdrop-blur-md border-b border-[#2a2723]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl font-bold tracking-tight text-[#f4efe8] hover:text-[#c89d66] transition-colors font-heading"
        >
          KAROMA
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#c0b8ac]">
          <a href="#menu" className="hover:text-[#f4efe8] transition-colors">
            Menu
          </a>
          <a href="#story" className="hover:text-[#f4efe8] transition-colors">
            Our Craft
          </a>
          <a href="#hours" className="hover:text-[#f4efe8] transition-colors">
            Hours & Location
          </a>
          <button 
            onClick={onOpenReserve}
            className="hover:text-[#f4efe8] transition-colors text-left"
          >
            Tasting & Booths
          </button>
          <a href="#reviews" className="hover:text-[#f4efe8] transition-colors">
            Stories
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Subtle Ambient Audio Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isAudioPlaying ? 'Mute café ambiance' : 'Play café ambiance'}
            title={isAudioPlaying ? 'Café soundscape active' : 'Turn on gentle café ambiance'}
            className={`p-2 rounded-lg transition-colors border ${
              isAudioPlaying 
                ? 'border-[#c89d66]/50 bg-[#c89d66]/15 text-[#c89d66]' 
                : 'border-[#2a2723] hover:border-[#3d3832] text-[#8e8579] hover:text-[#c0b8ac]'
            }`}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Live Open / Closed indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-[#1a1816] border border-[#2a2723] text-[#c0b8ac]">
            <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
            <span>{status.message}</span>
            <span className="text-[#686054]">·</span>
            <span className="text-[#8e8579]">{status.nextEvent}</span>
          </div>

          {/* Order Ahead Cart button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#c89d66] text-[#0e0d0c] hover:bg-[#d6af7a] active:scale-[0.98] transition-all whitespace-nowrap shadow-sm shadow-[#c89d66]/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Pickup</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#0e0d0c] text-[#f4efe8] rounded-full text-[10px] font-bold tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#c0b8ac] hover:text-[#f4efe8] rounded-lg border border-[#2a2723]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141210] border-b border-[#2a2723] px-6 py-5 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#8e8579] pb-3 border-b border-[#2a2723]">
            <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-amber-500'}`} />
            <span>{status.message} ({status.nextEvent})</span>
          </div>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#c0b8ac] hover:text-[#f4efe8]"
          >
            Menu
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#c0b8ac] hover:text-[#f4efe8]"
          >
            Our Craft & Roastery
          </a>
          <a
            href="#hours"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#c0b8ac] hover:text-[#f4efe8]"
          >
            Opening Hours & Location
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReserve();
            }}
            className="block text-base font-medium text-[#c0b8ac] hover:text-[#f4efe8] text-left w-full"
          >
            Tasting & Table Booking
          </button>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#c0b8ac] hover:text-[#f4efe8]"
          >
            Customer Stories
          </a>
        </div>
      )}
    </header>
  );
};
