"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

// TopoJSON data for the world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// SourceTrace Operating Countries & their coordinates for markers
const OPERATING_COUNTRIES = {
  "Brazil": { metrics: "2.4M Farmers" },
  "Colombia": { metrics: "800K Farmers" },
  "Côte d'Ivoire": { metrics: "1.2M Farmers" },
  "India": { metrics: "4.5M Farmers" },
  "Vietnam": { metrics: "1.1M Farmers" },
  "Indonesia": { metrics: "900K Farmers" },
  "Kenya": { metrics: "600K Farmers" },
  "Mexico": { metrics: "400K Farmers" },
  "Peru": { metrics: "350K Farmers" },
  "Uganda": { metrics: "200K Farmers" },
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
    <div className="relative w-full max-w-6xl mx-auto h-[380px] md:h-[600px] mt-10 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
      
      {/* Map Canvas viewport */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden bg-gray-50/20">
        
        {/* Tooltip Overlay */}
        <AnimatePresence>
          {hoveredCountry && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
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
                  {OPERATING_COUNTRIES[hoveredCountry as keyof typeof OPERATING_COUNTRIES]?.metrics}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ComposableMap 
          projection="geoMercator" 
          projectionConfig={{ scale: isMobile ? 85 : 120 }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isOperating = Object.keys(OPERATING_COUNTRIES).includes(countryName);
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
                          : isOperating ? "#bbf7d0" : "#f1f5f9",
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 0.3s ease"
                      },
                      hover: {
                        fill: isOperating ? "#53D769" : "#e2e8f0",
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isOperating ? "pointer" : "default"
                      },
                      pressed: {
                        fill: isOperating ? "#1F7A53" : "#e2e8f0",
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

      {/* Swipeable List of countries for mobile screens */}
      <div className="md:hidden w-full border-t border-gray-100 bg-gray-50/50 py-3.5 px-4 flex gap-2.5 overflow-x-auto scrollbar-none shrink-0 z-10">
        {Object.entries(OPERATING_COUNTRIES).map(([country, data]) => (
          <button
            key={country}
            onClick={() => {
              setHoveredCountry(hoveredCountry === country ? null : country);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap transition-all shrink-0 ${hoveredCountry === country ? 'bg-[#1F7A53] border-[#1F7A53] text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
          >
            <MapPin className={`w-3.5 h-3.5 ${hoveredCountry === country ? 'text-white' : 'text-[#1F7A53]'}`} />
            <span>{country}</span>
            <span className={`text-[10px] font-normal ${hoveredCountry === country ? 'text-emerald-100' : 'text-gray-400'}`}>
              ({data.metrics})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
