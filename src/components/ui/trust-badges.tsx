import React from "react";

interface TrustBadgesProps {
  className?: string;
}

const BADGES = [
  { name: "Cargill", className: "font-serif", color: "#1B5E20" },  // Dark Cargill Green
  { name: "Olam", className: "", color: "#E65100" },             // Dark Olam Orange
  { name: "Unilever", className: "font-serif italic", color: "#0D47A1" }, // Dark Unilever Blue
  { name: "Nestlé", className: "tracking-tighter", color: "#006064" },   // Dark Nestlé Teal/Blue
  { name: "Bunge", className: "", color: "#004D40" }              // Dark Bunge Teal
];

export function TrustBadges({ className = "" }: TrustBadgesProps) {
  const repeatedBadges = [
    ...BADGES, ...BADGES, ...BADGES,
    ...BADGES, ...BADGES, ...BADGES
  ];

  return (
    <div className={`w-full text-center py-6 bg-[#EBF7F0] border-t border-[#0B3D2E]/10 relative ${className}`}>
      <p className="text-[10px] sm:text-xs font-bold tracking-widest text-[#0B3D2E]/60 uppercase mb-3 select-none">
        Trusted by global leaders in agriculture and sourcing
      </p>
      
      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient Masks for smooth fade at edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#EBF7F0] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#EBF7F0] to-transparent z-10 pointer-events-none"></div>
  
        <div className="flex w-max animate-marquee py-1" style={{ animationDuration: "120s" }}>
          {/* Track 1 */}
          <div className="flex gap-16 sm:gap-28 whitespace-nowrap shrink-0 pr-16 sm:pr-28">
            {repeatedBadges.map((badge, idx) => (
              <span
                key={`t1-${idx}`}
                style={{ "--hover-color": badge.color } as React.CSSProperties}
                className={`text-lg sm:text-2xl font-black text-[#0B3D2E]/20 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-110 cursor-pointer select-none ${badge.className}`}
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
                className={`text-lg sm:text-2xl font-black text-[#0B3D2E]/20 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-110 cursor-pointer select-none ${badge.className}`}
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
