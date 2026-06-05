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

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[600px] mt-10 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center">
      
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
            style={{ 
              left: tooltipPos.x, 
              top: tooltipPos.y,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#1F7A53]" />
              <span className="font-bold text-[#0B3D2E]">{hoveredCountry}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 130 }}
        className="w-full h-full"
      >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isOperating = Object.keys(OPERATING_COUNTRIES).includes(geo.properties.name);
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                       if (isOperating) {
                          setHoveredCountry(geo.properties.name);
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
                        fill: isOperating ? "#bbf7d0" : "#f1f5f9", // Light green if operating, gray if not
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 0.3s ease"
                      },
                      hover: {
                        fill: isOperating ? "#53D769" : "#e2e8f0", // Bright green on hover
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
  );
}
