
import React from 'react';
import {
  ArrowRight,
  Coffee,
  Heart,
  MapPin,
  CalendarDays,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

import heroLatteArtImg from '../assets/images/Cinematic Latte and Coffee Beans.png';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReserve: () => void;
}

const heroBenefits = [
  {
    icon: Coffee,
    title: 'Handcrafted Coffee',
    description: 'Made with care',
  },
  {
    icon: CalendarDays,
    title: 'Cozy Café Moments',
    description: 'Book your place',
  },
  {
    icon: MapPin,
    title: 'Kandy, Sri Lanka',
    description: 'Find your escape',
  },
  {
    icon: Heart,
    title: 'Brewed With Love',
    description: 'Made for you',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenReserve,
}) => {
  return (
    <section
      className="
        relative isolate
        min-h-0
        lg:min-h-[620px]
        xl:min-h-[680px]
        overflow-hidden
        border-b border-[#322318]
        bg-[#160e0b]
      "
    >
      {/* ============================= */}
      {/* RESPONSIVE BACKGROUND IMAGE   */}
      {/* ============================= */}

      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {/* Soft full-bleed fallback keeps wide screens free of empty bands. */}
        <img
          src={heroLatteArtImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-[66%_center] blur-xl"
        />
        {/* Wide hero image: prevent oversized crops on large and zoomed-out viewports. */}
        <img
          src={heroLatteArtImg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[67%_center] sm:object-[64%_center] md:object-[center_center] min-[1500px]:object-contain min-[1500px]:object-center"
        />
      </div>

      {/* ============================= */}
      {/* RESPONSIVE DARK OVERLAY       */}
      {/* ============================= */}

      <div
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-[#120a07]/80
          via-[#160c09]/55
          to-[#0e0d0c]/90

          md:bg-gradient-to-r
          md:from-[#120a07]/95
          md:via-[#160c09]/70
          md:to-transparent
        "
      />

      {/* Bottom gradient */}
      <div
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-gradient-to-t
          from-[#0e0d0c]/85
          via-transparent
          to-transparent
        "
      />

      {/* Warm background glow */}
      <div
        className="
          pointer-events-none
          absolute right-[10%] top-[12%] -z-10
          h-56 w-56
          rounded-full
          bg-[#b56c37]/15
          blur-3xl
        "
      />

      {/* ============================= */}
      {/* HERO CONTENT                  */}
      {/* ============================= */}

      <div
        className="
          relative mx-auto flex
          min-h-[570px]
          max-w-7xl
          flex-col justify-center
          px-6
          pb-12 pt-16
          sm:min-h-[580px]
          sm:px-9
          sm:pb-16 sm:pt-20
          md:min-h-[590px]
          md:pb-20
          lg:min-h-[620px]
          lg:pb-28 lg:pt-24
          xl:min-h-[680px]
          lg:px-12
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-10 w-full max-w-[680px]"
        >
          {/* Brand subtitle */}

          

          {/* Main heading */}

          <h1
            className="
              font-serif-display
              text-[clamp(2.65rem,8vw,5.75rem)]
              sm:text-[clamp(3.2rem,6.8vw,6.5rem)]
              [overflow-wrap:break-word]
              font-medium
              leading-[1.02]
              tracking-[-0.06em]
              text-[#fff3e3]
              drop-shadow-lg
            "
          >
            Good Coffee

            <span
              className="
                mt-2 block
                text-[#e6b475]
              "
            >
              Brighter Days
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-[445px]
              text-[15px]
              leading-[1.8]
              text-[#e4d3c3]
              sm:text-[17px]
              sm:leading-[1.9]
            "
          >
            Discover beautifully crafted coffee,
            fresh bakes and a cozy atmosphere.
            Every cup is a little moment worth savoring.
          </p>

          {/* ============================= */}
          {/* INTERACTIVE BUTTONS           */}
          {/* ============================= */}

          <div
            className="
              mt-9 flex
              flex-wrap items-center
              gap-3 sm:gap-4
            "
          >
            {/* Explore Menu */}

            <motion.button
              type="button"
              onClick={onExploreMenu}
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{
                scale: 0.94,
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 20,
              }}
              className="
                group inline-flex
                items-center justify-center
                gap-2
                rounded-full
                bg-[#e7b777]
                px-6 py-3
                text-sm font-bold
                text-[#26160e]
                shadow-lg shadow-black/30
                transition-colors duration-300
                hover:bg-[#f4ca91]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#f4ca91]
              "
            >
              Explore Menu

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </motion.button>

            {/* Book a Table */}

            <motion.button
              type="button"
              onClick={onOpenReserve}
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{
                scale: 0.94,
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 20,
              }}
              className="
                group inline-flex
                items-center justify-center
                gap-2
                rounded-full
                border border-[#ddae76]/70
                bg-[#170e0a]/65
                px-6 py-3
                text-sm font-semibold
                text-[#fff1e0]
                backdrop-blur-sm
                transition-colors duration-300
                hover:border-[#f4ca91]
                hover:bg-[#6b4429]/70
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#f4ca91]
              "
            >
              Book a Table

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </motion.button>
          </div>

          {/* Small tagline */}

          <div
            className="
              mt-9 flex items-center gap-2
              text-xs text-[#d1b49a]
            "
          >
            <Sparkles className="h-4 w-4 text-[#e6b475]" />

            A little warmth in every cup.
          </div>
        </motion.div>

        {/* ============================= */}
        {/* SPECIALTY COFFEE BADGE       */}
        {/* ============================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -14,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: -9,
          }}
          transition={{
            delay: 0.45,
            duration: 0.85,
          }}
          className="
            absolute right-[6%] top-[17%]
            hidden
            h-36 w-36
            items-center justify-center
            rounded-full
            border border-[#dda965]
            bg-[#1b100a]/35
            text-center
            shadow-[0_0_45px_#e6aa4e25]
            backdrop-blur-[3px]
            lg:flex
          "
          aria-hidden="true"
        >
          <span
            className="
              font-serif-display
              text-2xl italic
              leading-6
              text-[#efbe77]
            "
          >
            Specialty
            <br />
            Coffee
          </span>
        </motion.div>
      </div>

      {/* ============================= */}
      {/* BOTTOM FEATURE BAR            */}
      {/* ============================= */}

      <div
        className="
          relative z-10
          lg:absolute lg:bottom-0 lg:left-0 lg:right-0
          border-t border-[#c89d66]/20
          bg-[#110c09]/80
          backdrop-blur-lg
        "
      >
        <div
          className="
            mx-auto grid
            max-w-7xl
            grid-cols-2
            gap-x-3 gap-y-5
            px-5 py-5
            sm:px-9
            md:grid-cols-4
            md:gap-4
            md:py-6
            lg:px-12
          "
        >
          {heroBenefits.map(
            ({
              icon: Icon,
              title,
              description,
            }) => (
              <div
                key={title}
                className="flex items-center gap-3"
              >
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full
                    border border-[#d0a26d]/45
                    bg-[#d0a26d]/10
                    text-[#ebbd83]
                  "
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[11px] font-semibold
                      leading-snug text-[#f3e5d3]
                      sm:text-xs
                    "
                  >
                    {title}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-[#a9917b]
                    "
                  >
                    {description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
