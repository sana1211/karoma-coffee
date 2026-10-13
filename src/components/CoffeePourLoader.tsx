import { useEffect, useState } from 'react';
import './CoffeePourLoader.css';

/** Initial page transition: a single cup fills itself with fresh coffee. */
export function CoffeePourLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = window.setTimeout(() => setLeaving(true), reducedMotion ? 500 : 3350);
    const remove = window.setTimeout(() => setVisible(false), reducedMotion ? 750 : 3950);

    return () => {
      window.clearTimeout(wait);
      window.clearTimeout(remove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`coffee-loader ${leaving ? 'coffee-loader--leaving' : ''}`}
      role="status"
      aria-label="Preparing your coffee"
      aria-live="polite"
    >
      <div className="coffee-loader__halo" aria-hidden="true" />
      <div className="coffee-loader__content">
        <span className="coffee-loader__eyebrow">FRESHLY BREWED · JUST FOR YOU</span>

        <div className="coffee-loader__art" aria-hidden="true">
          <svg className="coffee-loader__svg" viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="loaderCupBody" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#fff2df" />
                <stop offset="0.52" stopColor="#e8ceb0" />
                <stop offset="1" stopColor="#b88f6c" />
              </linearGradient>
              <linearGradient id="loaderCupInner" x1="210" y1="121" x2="210" y2="243" gradientUnits="userSpaceOnUse">
                <stop stopColor="#db9e5b" />
                <stop offset="1" stopColor="#5f321e" />
              </linearGradient>
              <linearGradient id="loaderCupRim" x1="141" y1="116" x2="280" y2="130" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff6ea" />
                <stop offset="0.5" stopColor="#ecc9a5" />
                <stop offset="1" stopColor="#a97756" />
              </linearGradient>
              <linearGradient id="loaderCoffeeTop" x1="165" y1="137" x2="257" y2="137" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8f5332" />
                <stop offset="0.5" stopColor="#5c301d" />
                <stop offset="1" stopColor="#8f5332" />
              </linearGradient>
              <radialGradient id="loaderCupGloss" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(185 186) rotate(32) scale(71 116)">
                <stop stopColor="#fff9f1" stopOpacity="0.82" />
                <stop offset="1" stopColor="#fff9f1" stopOpacity="0" />
              </radialGradient>
              <clipPath id="loaderLiquidClip">
                <path d="M147 122 Q210 114 273 122 L260 240 Q210 256 160 240 Z" />
              </clipPath>
            </defs>

            <ellipse cx="210" cy="255" rx="92" ry="12" fill="#050403" opacity="0.36" />
            <path d="M123 252 H298" stroke="#c69b70" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />

            <g className="coffee-loader__cup">
              <path d="M276 146 C331 118 337 221 280 217" stroke="#e5c198" strokeWidth="15" strokeLinecap="round" />
              <path d="M276 147 C313 129 316 206 281 204" stroke="#432920" strokeWidth="7" strokeLinecap="round" />

              <path d="M147 122 Q210 114 273 122 L260 240 Q210 256 160 240 Z" fill="url(#loaderCupBody)" />
              <g clipPath="url(#loaderLiquidClip)">
                <rect className="coffee-loader__liquid" x="139" y="122" width="142" height="135" fill="url(#loaderCupInner)" />
                <ellipse className="coffee-loader__surface" cx="210" cy="145" rx="47" ry="8.5" fill="url(#loaderCoffeeTop)" />
                <ellipse className="coffee-loader__foam" cx="210" cy="141" rx="42" ry="6" fill="#f2c78c" opacity="0.6" />
              </g>

              <path d="M147 122 Q210 114 273 122 L260 240 Q210 256 160 240 Z" stroke="#fff1dd" strokeWidth="4" />
              <ellipse cx="210" cy="121.5" rx="63" ry="10" fill="url(#loaderCupRim)" />
              <ellipse cx="210" cy="122.5" rx="55" ry="7" stroke="#fff0db" strokeWidth="3.6" />
              <path d="M175 133 L184 228" stroke="#fffdf7" strokeOpacity="0.48" strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="185" cy="183" rx="63" ry="96" fill="url(#loaderCupGloss)" />
              <ellipse cx="210" cy="249" rx="72" ry="8" fill="#cc9c69" opacity="0.45" />
            </g>

            <g className="coffee-loader__steam" stroke="#f1d9ba" strokeOpacity="0.74" strokeWidth="3.2" strokeLinecap="round">
              <path d="M184 111 C168 89 198 82 183 62" />
              <path d="M211 107 C198 86 226 78 212 57" />
              <path d="M238 111 C225 91 253 82 240 63" />
            </g>

            <g className="coffee-loader__aroma-dots">
              <circle cx="182" cy="86" r="2.1" fill="#f2d7b6" opacity="0.6" />
              <circle cx="236" cy="79" r="1.8" fill="#f2d7b6" opacity="0.45" />
              <circle cx="219" cy="66" r="1.6" fill="#f2d7b6" opacity="0.55" />
            </g>
          </svg>
        </div>

        <h1 className="coffee-loader__title">
          Brewing something <em>special.</em>
        </h1>
        <p className="coffee-loader__subtitle">Your cup is getting ready</p>
        <div className="coffee-loader__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
