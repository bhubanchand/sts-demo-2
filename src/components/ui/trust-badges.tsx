import React from "react";

const BADGES = [
  { name: "Cargill", className: "font-serif", color: "#58D68D" }, // Cargill Green
  { name: "Olam", className: "", color: "#F5B041" },            // Olam Orange
  { name: "Unilever", className: "font-serif italic", color: "#85C1E9" }, // Unilever Blue
  { name: "Nestlé", className: "tracking-tighter", color: "#5DADE2" },   // Nestlé Blue
  { name: "Bunge", className: "", color: "#48C9B0" }             // Bunge Teal
];

export function TrustBadges() {
  const repeatedBadges = [
    ...BADGES, ...BADGES, ...BADGES,
    ...BADGES, ...BADGES, ...BADGES
  ];

  return (
    <div className="w-full text-center">
      <p className="text-[10px] sm:text-xs font-bold tracking-widest text-white/50 uppercase mb-3">
        Trusted by global leaders in agriculture and sourcing
      </p>
      
      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient Masks for smooth fade at edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0B3D2E] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0B3D2E] to-transparent z-10 pointer-events-none"></div>
  
        <div className="flex w-max animate-marquee py-1" style={{ animationDuration: "120s" }}>
          {/* Track 1 */}
          <div className="flex gap-16 sm:gap-28 whitespace-nowrap shrink-0 pr-16 sm:pr-28">
            {repeatedBadges.map((badge, idx) => (
              <span
                key={`t1-${idx}`}
                style={{ "--hover-color": badge.color } as React.CSSProperties}
                className={`text-lg sm:text-2xl font-black text-white/20 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-110 cursor-pointer select-none ${badge.className}`}
              >
                {badge.name}
              </span>
            ))}
          </div>
          {/* Track 2 */}
          <div className="flex gap-16 sm:gap-28 whitespace-nowrap shrink-0 pr-16 sm:pr-28">
            {repeatedBadges.map((badge, idx) => (
              <span
                key={`t2-${idx}`}
                style={{ "--hover-color": badge.color } as React.CSSProperties}
                className={`text-lg sm:text-2xl font-black text-white/20 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-110 cursor-pointer select-none ${badge.className}`}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
