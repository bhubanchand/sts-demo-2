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
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-16 snap-center">
      {/* 💻 DESKTOP VIEW (Expanding Accordion) */}
      <div className="hidden md:flex gap-4 w-full h-[500px]">
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
              className="relative rounded-[2rem] overflow-hidden cursor-pointer group bg-gray-900 min-w-[80px]"
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
              <div className={`absolute inset-0 p-6 flex flex-col justify-end`}>
                {/* Icon & Title Wrapper */}
                <div className={`flex items-center gap-4 ${isActive ? 'flex-row mb-4' : 'flex-col mb-8'}`}>
                  <div className={`w-12 h-12 rounded-full ${slide.color} flex items-center justify-center text-white shrink-0 shadow-lg z-10`}>
                    <slide.icon className="w-6 h-6" />
                  </div>
                  
                  {isActive ? (
                     <motion.h3 
                       layout="position"
                       className="text-2xl lg:text-3xl font-bold text-white z-10"
                     >
                       {slide.title}
                     </motion.h3>
                  ) : (
                     <h3 className="text-xl font-bold text-white whitespace-nowrap z-10 opacity-70 tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                       {slide.title}
                     </h3>
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
                      <p className="text-gray-200 text-base mb-6 max-w-md leading-relaxed">
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

      {/* 📱 MOBILE VIEW (Interactive Tabbed Slider) */}
      <div className="block md:hidden w-full">
         {/* Tabs Selector Bar */}
         <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-gray-100 mb-6">
            {SLIDES.map((slide) => {
               const Icon = slide.icon;
               const isActive = activeSlide === slide.id;
               return (
                  <button
                     key={slide.id}
                     onClick={() => setActiveSlide(slide.id)}
                     className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                        isActive 
                           ? "bg-[#0B3D2E] text-white border-[#0B3D2E] shadow-md" 
                           : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                     }`}
                  >
                     <Icon className={`w-4 h-4 ${isActive ? 'text-[#53D769]' : 'text-gray-400'}`} />
                     {slide.title}
                  </button>
               );
            })}
         </div>

         {/* Active Slide Card Container with Animations */}
         <div className="relative h-[440px] w-full rounded-[2rem] overflow-hidden shadow-xl bg-gray-900">
            <AnimatePresence mode="wait">
               {(() => {
                  const currentSlide = SLIDES.find(s => s.id === activeSlide) || SLIDES[0];
                  const Icon = currentSlide.icon;
                  return (
                     <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full flex flex-col justify-between p-6"
                     >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                           <img 
                              src={currentSlide.image} 
                              alt={currentSlide.title} 
                              className="w-full h-full object-cover opacity-50"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>

                        {/* Top Accent Icon */}
                        <div className="relative z-10 self-start">
                           <div className={`w-12 h-12 rounded-2xl ${currentSlide.color} flex items-center justify-center text-white shadow-lg`}>
                              <Icon className="w-6 h-6" />
                           </div>
                        </div>

                        {/* Bottom Text & Button */}
                        <div className="relative z-10 mt-auto">
                           <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-1 block">
                              SourceTrace Solution
                           </span>
                           <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                              {currentSlide.title}
                           </h3>
                           <p className="text-gray-200 text-sm leading-relaxed mb-6">
                              {currentSlide.description}
                           </p>
                           <button className="flex items-center gap-2 text-white font-bold hover:text-[#53D769] transition-colors uppercase tracking-wider text-xs">
                              Explore Solution <ArrowRight className="w-4 h-4 text-[#53D769]" />
                           </button>
                        </div>
                     </motion.div>
                  );
               })()}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
