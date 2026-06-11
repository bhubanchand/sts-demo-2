"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

// TopoJSON data for the world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Regional data directly matching the screenshot
const REGIONS_DATA = [
  {
    title: "APAC Countries",
    list: ["India", "Thailand", "Vietnam", "Indonesia", "Sri Lanka", "Bangladesh", "Philippines", "China", "Australia"]
  },
  {
    title: "NA & LATAM Countries",
    list: ["United States", "Mexico", "Guatemala", "Brasil", "Chile", "Ecuador", "Paraguay", "Argentina"]
  },
  {
    title: "Europe",
    list: ["Netherlands", "Denmark", "United Kingdoms", "Switzerland", "Germany", "France", "Poland", "Belgium"]
  },
  {
    title: "Africa",
    list: ["Kenya", "Nigeria", "Ghana", "Rwanda", "Ethiopia", "Togo"]
  }
];

// Mapping display names to their TopoJSON keys
const getMapCountryName = (name: string) => {
  if (name === "United States") return "United States of America";
  if (name === "Brasil") return "Brazil";
  if (name === "United Kingdoms") return "United Kingdom";
  return name;
};

// Additional highlighted countries that are in our ecosystem but not explicitly in the screenshot text
const ADDITIONAL_HIGHLIGHTS = ["Colombia", "Peru", "Côte d'Ivoire", "Uganda"];

const ALL_OPERATING_NAMES = [
  ...REGIONS_DATA.flatMap(r => r.list).map(getMapCountryName),
  ...ADDITIONAL_HIGHLIGHTS
];

const COUNTRY_METRICS: Record<string, string> = {
  "India": "4.5M Farmers Mapped",
  "Thailand": "1.2M Farmers Mapped",
  "Vietnam": "1.1M Farmers Mapped",
  "Indonesia": "900K Farmers Mapped",
  "Sri Lanka": "400K Farmers Mapped",
  "Bangladesh": "650K Farmers Mapped",
  "Philippines": "500K Farmers Mapped",
  "China": "3.8M Farmers Mapped",
  "Australia": "150 Sourcing Cooperatives",
  "United States": "300+ Brands Integrated",
  "United States of America": "300+ Brands Integrated",
  "Mexico": "400K Farmers Mapped",
  "Guatemala": "250K Farmers Mapped",
  "Brasil": "2.4M Farmers Mapped",
  "Brazil": "2.4M Farmers Mapped",
  "Chile": "180K Farmers Mapped",
  "Ecuador": "320K Farmers Mapped",
  "Paraguay": "120K Farmers Mapped",
  "Argentina": "450K Farmers Mapped",
  "Colombia": "800K Farmers Mapped",
  "Peru": "350K Farmers Mapped",
  "Netherlands": "Sourcing HQs & Trade Hubs",
  "Denmark": "Organic Import Channels",
  "United Kingdoms": "250+ Supply Chains Tracked",
  "United Kingdom": "250+ Supply Chains Tracked",
  "Switzerland": "ESG Compliance Centers",
  "Germany": "EUDR Compliance Gateways",
  "France": "Sustainable Sourcing Portals",
  "Poland": "Logistics Hubs",
  "Belgium": "Verification Labs",
  "Kenya": "600K Farmers Mapped",
  "Nigeria": "850K Farmers Mapped",
  "Ghana": "1.1M Farmers Mapped",
  "Rwanda": "180K Farmers Mapped",
  "Ethiopia": "700K Farmers Mapped",
  "Togo": "90K Farmers Mapped",
  "Côte d'Ivoire": "1.2M Farmers Mapped",
  "Uganda": "200K Farmers Mapped"
};

export function InteractiveMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center mt-2 md:mt-10">
      
      {/* Map box */}
      <div className="relative w-full h-auto aspect-[800/350] md:h-[550px] bg-white rounded-none md:rounded-[40px] md:border md:border-gray-100 md:shadow-sm overflow-hidden flex items-center justify-center">
        
        {/* Tooltip Overlay */}
        <AnimatePresence>
          {hoveredCountry && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in fade-in"
              style={
                !isMobile
                  ? { 
                      position: 'fixed',
                      pointerEvents: 'none',
                      left: tooltipPos.x, 
                      top: tooltipPos.y,
                      transform: 'translate(-50%, -120%)'
                    }
                  : {
                      position: 'absolute',
                      pointerEvents: 'none',
                      left: "50%",
                      top: "16px",
                      transform: 'translateX(-50%)'
                    }
              }
            >
              <div className="flex flex-col gap-0.5 min-w-[140px] text-left">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1F7A53]" />
                  <span className="font-bold text-[#0B3D2E] text-xs">{hoveredCountry}</span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold pl-6">
                  {COUNTRY_METRICS[hoveredCountry] || "Verified Supply Chain"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ComposableMap 
          projection="geoMercator" 
          projectionConfig={{ 
            scale: isMobile ? 100 : 120,
            center: isMobile ? [0, 15] : [0, 0]
          }}
          width={800}
          height={isMobile ? 350 : 450}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isOperating = ALL_OPERATING_NAMES.includes(countryName);
                const isSelected = hoveredCountry === countryName;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                       if (isOperating) {
                          setHoveredCountry(countryName);
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                       }
                    }}
                    onMouseMove={(e) => {
                       if (isOperating) {
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                       }
                    }}
                    onMouseLeave={() => {
                       setHoveredCountry(null);
                    }}
                    style={{
                      default: {
                        fill: isSelected 
                          ? "#53D769" 
                          : isOperating ? "#53D769" : "#f1f5f9", // Map highlights standard operating countries in green matching the screenshot
                        fillOpacity: isSelected ? 1 : isOperating ? 0.8 : 1,
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 0.3s ease"
                      },
                      hover: {
                        fill: isOperating ? "#1F7A53" : "#e2e8f0",
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isOperating ? "pointer" : "default"
                      },
                      pressed: {
                        fill: isOperating ? "#0B3D2E" : "#e2e8f0",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}
