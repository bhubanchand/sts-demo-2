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

const PARTNERS = [
  { name: "Fairtrade International", className: "", color: "#1B5E20" },
  { name: "Rainforest Alliance", className: "font-serif", color: "#004D40" },
  { name: "World Bank Group", className: "", color: "#0D47A1" },
  { name: "USAID", className: "font-serif italic", color: "#E65100" },
  { name: "Gates Foundation", className: "tracking-tighter", color: "#006064" },
  { name: "Oxfam", className: "", color: "#0D47A1" },
  { name: "Solidaridad", className: "", color: "#004D40" },
  { name: "TechnoServe", className: "font-serif", color: "#1B5E20" },
  { name: "Conservation Intl.", className: "tracking-tight italic", color: "#006064" },
  { name: "WWF", className: "font-bold", color: "#000000" }
];

export function TrustBadges({ className = "" }: TrustBadgesProps) {
  const repeatedBadges = [
    ...BADGES, ...BADGES, ...BADGES,
    ...BADGES, ...BADGES, ...BADGES
  ];

  const repeatedPartners = [
    ...PARTNERS, ...PARTNERS, ...PARTNERS,
    ...PARTNERS, ...PARTNERS, ...PARTNERS
  ];

  return (
    <div className={`w-full text-center py-3 bg-[#EBF7F0] border-t border-[#0B3D2E]/10 relative ${className}`}>
      {/* Group 1: Global Leaders */}
      <div className="mb-2">
        <p className="text-[9px] font-extrabold tracking-widest text-[#0B3D2E]/60 uppercase mb-1 select-none">
          Trusted by global leaders in agriculture and sourcing
        </p>
        
        {/* Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Gradient Masks for smooth fade at edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#EBF7F0] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#EBF7F0] to-transparent z-10 pointer-events-none"></div>
    
          <div className="flex w-max animate-marquee py-0.5" style={{ animationDuration: "120s" }}>
            {/* Track 1 */}
            <div className="flex gap-8 sm:gap-14 whitespace-nowrap shrink-0 pr-8 sm:pr-14">
              {repeatedBadges.map((badge, idx) => (
                <span
                  key={`t1-${idx}`}
                  style={{ "--hover-color": badge.color } as React.CSSProperties}
                  className={`text-xs sm:text-sm font-black text-[#0B3D2E]/25 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-105 cursor-pointer select-none ${badge.className}`}
                >
                  {badge.name}
                </span>
              ))}
            </div>
            {/* Track 2 */}
            <div className="flex gap-8 sm:gap-14 whitespace-nowrap shrink-0 pr-8 sm:pr-14">
              {repeatedBadges.map((badge, idx) => (
                <span
                  key={`t2-${idx}`}
                  style={{ "--hover-color": badge.color } as React.CSSProperties}
                  className={`text-xs sm:text-sm font-black text-[#0B3D2E]/25 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-105 cursor-pointer select-none ${badge.className}`}
                >
                  {badge.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Group 2: Global Ecosystem */}
      <div>
        <p className="text-[9px] font-extrabold tracking-widest text-[#0B3D2E]/60 uppercase mb-1 select-none">
          Trusted Across the Globe by Leading Organizations
        </p>
        
        {/* Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Gradient Masks for smooth fade at edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#EBF7F0] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#EBF7F0] to-transparent z-10 pointer-events-none"></div>
    
          <div className="flex w-max animate-marquee py-0.5" style={{ animationDuration: "480s", animationDirection: "reverse" }}>
            {/* Track 1 */}
            <div className="flex gap-8 sm:gap-14 whitespace-nowrap shrink-0 pr-8 sm:pr-14">
              {repeatedPartners.map((partner, idx) => (
                <span
                  key={`p1-${idx}`}
                  style={{ "--hover-color": partner.color } as React.CSSProperties}
                  className={`text-xs sm:text-sm font-black text-[#0B3D2E]/25 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-105 cursor-pointer select-none ${partner.className}`}
                >
                  {partner.name}
                </span>
              ))}
            </div>
            {/* Track 2 */}
            <div className="flex gap-8 sm:gap-14 whitespace-nowrap shrink-0 pr-8 sm:pr-14">
              {repeatedPartners.map((partner, idx) => (
                <span
                  key={`p2-${idx}`}
                  style={{ "--hover-color": partner.color } as React.CSSProperties}
                  className={`text-xs sm:text-sm font-black text-[#0B3D2E]/25 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:opacity-100 hover:scale-105 cursor-pointer select-none ${partner.className}`}
                >
                  {partner.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
