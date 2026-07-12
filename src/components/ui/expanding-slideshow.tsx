"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Shield, LineChart, Users, Satellite, Smartphone } from "lucide-react";

interface SlideNode {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  color: string;
}

const SLIDES: SlideNode[] = [
  {
    id: "traceability",
    title: "Traceability Graph",
    description: "Map your entire supply network from origin to factory.",
    icon: LineChart,
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "bg-emerald-500",
  },
  {
    id: "eudr",
    title: "EUDR Compliance",
    description: "Automated deforestation checks and polygon mapping.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "bg-blue-500",
  },
  {
    id: "esg",
    title: "ESG Reporting",
    description: "Real-time Scope 3 emissions and living wage data.",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "bg-teal-500",
  },
  {
    id: "farmers",
    title: "Farmer Engagement",
    description: "Direct-to-farmer communication and digital payments.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5b16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "bg-orange-500",
  },
  {
    id: "geospatial",
    title: "Geospatial AI",
    description: "Satellite-driven insights for yield prediction and weather alerts.",
    icon: Satellite,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "bg-purple-500",
  },
  {
    id: "mobile",
    title: "Mobile Field App",
    description: "Offline-first application for agronomists and extension workers.",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    color: "bg-pink-500",
  },
];

export function ExpandingSlideshow() {
  const [activeSlide, setActiveSlide] = useState(SLIDES[0].id);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-[1050px] md:h-[600px] max-w-[1400px] mx-auto px-4 sm:px-8 py-16 snap-center">
      {SLIDES.map((slide) => {
        const isActive = activeSlide === slide.id;
        const Icon = slide.icon;

        return (
          <motion.div
            key={slide.id}
            onHoverStart={() => {
              if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                setActiveSlide(slide.id);
              }
            }}
            onClick={() => setActiveSlide(slide.id)}
            layout
            initial={false}
            animate={{
              flex: isActive ? 5 : 1,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="relative rounded-[2rem] overflow-hidden cursor-pointer group bg-[#EAF5EE] border border-[#0B3D2E]/8 w-full md:w-auto min-h-[76px] md:min-h-0 min-w-0 md:min-w-[80px]"
          >
            {/* Background Image - Rich, clear presentation */}
            <motion.div 
               className="absolute inset-0 w-full h-full"
               animate={{ scale: isActive ? 1.05 : 1 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
            >
               <img 
                 src={slide.image} 
                 alt={slide.title} 
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
               />
               {/* Soft overlay gradient to ensure high clarity at top and text readability at bottom */}
               <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-gradient-to-t from-black/25 to-transparent' : 'bg-[#EAF5EE]/20'}`}></div>
            </motion.div>

            {/* Separated Content Blocks to prevent Layout Text Jiggling */}
            <AnimatePresence mode="wait">
              {isActive ? (
                /* ── EXPANDED PANEL LAYOUT (Fades in cleanly without jiggling layout width) ── */
                <motion.div 
                  key="expanded"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-[#0B3D2E]/10 p-5 lg:p-6 z-20 flex flex-col justify-between h-[180px] select-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${slide.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-black text-[#0B3D2E] tracking-tight">
                      {slide.title}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
                    <p className="text-[#1F5946] text-xs lg:text-sm leading-relaxed max-w-xl font-semibold">
                      {slide.description}
                    </p>
                    <button className="flex items-center gap-2 text-[#0B3D2E] font-bold hover:gap-3 hover:text-[#1F7A53] transition-all uppercase tracking-wider text-xs lg:text-sm whitespace-nowrap shrink-0">
                      Explore Solution <ArrowRight className="w-4 h-4 text-[#1F7A53]" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── COLLAPSED VERTICAL TAB LAYOUT (Fades in when inactive) ── */
                <motion.div 
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 bg-black/[0.04] select-none"
                >
                  <div className={`w-11 h-11 rounded-full ${slide.color} flex items-center justify-center text-white mb-6 shadow-md shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Desktop Vertical Title */}
                  <h3 className="hidden md:block text-[11px] font-extrabold text-[#0B3D2E] whitespace-nowrap z-10 tracking-widest uppercase bg-white/90 border border-[#0B3D2E]/10 py-4 px-2.5 rounded-full backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    {slide.title}
                  </h3>
                  
                  {/* Mobile Horizontal Title */}
                  <h3 className="block md:hidden text-xs font-extrabold text-[#0B3D2E] whitespace-nowrap z-10 tracking-widest uppercase bg-white/90 border border-[#0B3D2E]/10 py-1.5 px-3.5 rounded-full backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    {slide.title}
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}
