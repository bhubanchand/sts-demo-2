"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Shield, LineChart, Users, Satellite, Smartphone } from "lucide-react";

const SLIDES = [
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
    <div className="flex flex-col md:flex-row gap-4 w-full h-[800px] md:h-[600px] max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
      {SLIDES.map((slide) => {
        const isActive = activeSlide === slide.id;

        return (
          <motion.div
            key={slide.id}
            onHoverStart={() => setActiveSlide(slide.id)}
            onClick={() => setActiveSlide(slide.id)}
            layout
            initial={false}
            animate={{
              flex: isActive ? 5 : 1,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="relative rounded-[2rem] overflow-hidden cursor-pointer group bg-gray-900 min-h-[80px] md:min-h-0 min-w-0 md:min-w-[80px]"
          >
            {/* Background Image */}
            <motion.div 
               className="absolute inset-0 w-full h-full"
               animate={{ scale: isActive ? 1.05 : 1 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
            >
               <img 
                 src={slide.image} 
                 alt={slide.title} 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
               />
               {/* Dark Overlay */}
               <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' : 'bg-black/70'}`}></div>
            </motion.div>

            {/* Content Container */}
            <div className={`absolute inset-0 p-5 md:p-6 flex flex-col justify-center md:justify-end ${isActive ? 'justify-end' : ''}`}>
              
              {/* Icon & Title Wrapper */}
              <div className={`flex items-center gap-4 ${isActive ? 'flex-row mb-4' : 'flex-row md:flex-col md:mb-8'}`}>
                <div className={`w-12 h-12 rounded-full ${slide.color} flex items-center justify-center text-white shrink-0 shadow-lg z-10`}>
                  <slide.icon className="w-6 h-6" />
                </div>
                
                {isActive ? (
                   // Expanded Title
                   <motion.h3 
                     layout="position"
                     className="text-2xl md:text-3xl font-bold text-white z-10"
                   >
                     {slide.title}
                   </motion.h3>
                ) : (
                   // Collapsed Title
                   <>
                     {/* Desktop Vertical Title */}
                     <h3 className="hidden md:block text-xl font-bold text-white whitespace-nowrap z-10 opacity-70 tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                       {slide.title}
                     </h3>
                     {/* Mobile Horizontal Title */}
                     <h3 className="block md:hidden text-lg font-bold text-white whitespace-nowrap z-10 opacity-70">
                       {slide.title}
                     </h3>
                   </>
                )}
              </div>

              {/* Expanded Description */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="overflow-hidden z-10"
                  >
                    <p className="text-gray-200 text-base md:text-lg mb-6 max-w-md leading-relaxed">
                      {slide.description}
                    </p>
                    <button className="flex items-center gap-2 text-white font-bold hover:gap-4 hover:text-[#53D769] transition-all uppercase tracking-wider text-sm">
                      Explore Solution <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
