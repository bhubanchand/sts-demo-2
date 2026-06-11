"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tractor, Factory, Truck, Store, ArrowRight, ShieldCheck, MapPin, Database, Sprout } from "lucide-react";

const STAGES = [
  {
    id: "farm",
    title: "The Farm",
    icon: Tractor,
    color: "bg-[#bbf7d0]",
    textColor: "text-[#0B3D2E]",
    metrics: ["Polygon Mapped", "Farmer KYC Verified", "EUDR Compliant"],
    data: [
      { label: "Geo-coordinate", value: "-8.024, -34.872", icon: MapPin },
      { label: "Yield Est.", value: "4.2 Tons", icon: Sprout }
    ]
  },
  {
    id: "processor",
    title: "Cooperative / Processor",
    icon: Factory,
    color: "bg-[#1F7A53]",
    textColor: "text-white",
    metrics: ["Quality Assayed", "Digital Receipt Issued", "Trace ID Generated"],
    data: [
      { label: "Batch ID", value: "B-84920X", icon: Database },
      { label: "Grade", value: "Premium A", icon: ShieldCheck }
    ]
  },
  {
    id: "logistics",
    title: "Global Logistics",
    icon: Truck,
    color: "bg-[#0B3D2E]",
    textColor: "text-white",
    metrics: ["Cold Chain Monitored", "Export Cleared", "Carbon Calculated"],
    data: [
      { label: "Transport", value: "Vessel Alpha", icon: Truck },
      { label: "Emissions", value: "0.4t CO2e", icon: Sprout }
    ]
  },
  {
    id: "retail",
    title: "Brand / Retailer",
    icon: Store,
    color: "bg-[#53D769]",
    textColor: "text-[#0B3D2E]",
    metrics: ["Consumer QR Scanned", "ESG Report Updated", "Premium Paid to Farmer"],
    data: [
      { label: "Origin", value: "Verified 100%", icon: ShieldCheck },
      { label: "Impact", value: "Living Wage", icon: Users }
    ]
  }
];

// Fallback icon for Users to avoid missing imports
function Users(props: any) { 
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ); 
}

export function TransparencyFlow() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-16 px-4 sm:px-8 snap-center">
      <div className="text-center mb-16">
         <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">End-to-End Visibility</span>
         <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">From Farm to Retail. Verified.</h2>
         <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Hover or tap each node in the supply chain to see the exact data SourceTrace captures immutably.
         </p>
      </div>

      {/* 💻 DESKTOP LAYOUT (Horizontal pipeline grid on hover) */}
      <div className="hidden md:block relative">
         {/* Connecting Line */}
         <div className="absolute top-12 left-0 w-full h-1 bg-gray-200"></div>
         <motion.div 
            className="absolute top-12 left-0 h-1 bg-[#53D769]"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
         ></motion.div>

         <div className="grid grid-cols-4 gap-8 mt-4">
            {STAGES.map((stage, idx) => (
               <div 
                  key={stage.id} 
                  className="relative z-10 cursor-pointer group"
                  onMouseEnter={() => setActiveStage(idx)}
               >
                  {/* Icon Node */}
                  <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center transition-all duration-300 ${stage.color} ${stage.textColor} shadow-lg group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl relative`}>
                     <stage.icon className="w-10 h-10" />
                     {/* Pulse effect if active */}
                     {activeStage === idx && (
                        <div className="absolute inset-0 rounded-3xl border-2 border-[#53D769] animate-ping opacity-50"></div>
                     )}
                  </div>

                  {/* Title */}
                  <h3 className={`text-center mt-6 font-bold text-xl transition-colors ${activeStage === idx ? 'text-[#0B3D2E]' : 'text-gray-500'}`}>
                     {stage.title}
                  </h3>

                  {/* Details Card */}
                  <div className={`mt-6 transition-all duration-300 transform ${activeStage === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                     <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                        <ul className="space-y-3 mb-6">
                           {stage.metrics.map((metric, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                 <ShieldCheck className="w-4 h-4 text-[#53D769]" /> {metric}
                              </li>
                           ))}
                        </ul>
                        
                        <div className="pt-4 border-t border-gray-100 space-y-3">
                           {stage.data.map((data, i) => (
                              <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg text-xs">
                                 <div className="flex items-center gap-2 text-gray-500">
                                    <data.icon className="w-3.5 h-3.5" />
                                    {data.label}
                                 </div>
                                 <span className="font-bold text-[#0B3D2E]">{data.value}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 📱 MOBILE LAYOUT (Premium 3D Card Stack with Timeline Controls) */}
      <div className="block md:hidden mt-8">
         {/* Horizontal Progress Timeline */}
         <div className="flex justify-between items-center px-6 mb-8 relative">
            {/* Connecting background line */}
            <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            {/* Active progress color line */}
            <motion.div 
               className="absolute top-1/2 left-6 h-0.5 bg-[#53D769] -translate-y-1/2 z-0"
               initial={false}
               animate={{ width: `${(activeStage / (STAGES.length - 1)) * 89}%` }}
               transition={{ duration: 0.3 }}
            ></motion.div>

            {STAGES.map((stage, idx) => {
               const Icon = stage.icon;
               const isActive = activeStage === idx;
               const isCompleted = idx < activeStage;
               return (
                  <button
                     key={stage.id}
                     onClick={() => setActiveStage(idx)}
                     className={`w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-300 ${
                        isActive 
                           ? "bg-[#0B3D2E] text-white scale-110 shadow-lg border border-[#53D769]" 
                           : isCompleted 
                              ? "bg-[#53D769] text-[#0B3D2E]" 
                              : "bg-white text-gray-400 border border-gray-200"
                     }`}
                  >
                     <Icon className="w-5 h-5" />
                     {isActive && (
                        <span className="absolute -inset-1 rounded-2xl border border-[#53D769]/50 animate-ping opacity-70"></span>
                     )}
                  </button>
               );
            })}
         </div>

         {/* Current Stage Label */}
         <div className="text-center mb-6 h-20 flex flex-col justify-center shrink-0">
            <div>
               <span className="text-[10px] font-mono font-black text-[#1F7A53] uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
                  Stage {activeStage + 1} of 4
               </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B3D2E] mt-1 leading-tight">{STAGES[activeStage].title}</h3>
         </div>

         {/* Stack Container */}
         <div className="relative h-[340px] w-full max-w-[340px] mx-auto">
            {STAGES.map((stage, idx) => {
               const diff = idx - activeStage;
               const isSwipeActive = idx === activeStage;

               // Calculate visual styling based on position in stack
               let x = 0;
               let y = 0;
               let scale = 1;
               let zIndex = 30;
               let opacity = 1;
               let rotate = 0;

               if (diff < 0) {
                  // Swiped off to the left
                  x = -350;
                  y = 0;
                  scale = 0.95;
                  zIndex = 10;
                  opacity = 0;
                  rotate = -12;
               } else if (diff === 0) {
                  // Active card
                  x = 0;
                  y = 0;
                  scale = 1;
                  zIndex = 30;
                  opacity = 1;
                  rotate = 0;
               } else if (diff === 1) {
                  // Card right behind
                  x = 0;
                  y = -12;
                  scale = 0.95;
                  zIndex = 20;
                  opacity = 0.7;
                  rotate = 0;
               } else if (diff === 2) {
                  // Second card behind
                  x = 0;
                  y = -24;
                  scale = 0.90;
                  zIndex = 10;
                  opacity = 0.4;
                  rotate = 0;
               } else {
                  // Rest of the stack
                  x = 0;
                  y = -36;
                  scale = 0.85;
                  zIndex = 0;
                  opacity = 0;
                  rotate = 0;
               }

               const Icon = stage.icon;

               return (
                  <motion.div
                     key={stage.id}
                     drag={isSwipeActive ? "x" : false}
                     dragConstraints={{ left: 0, right: 0 }}
                     dragElastic={0.6}
                     onDragEnd={(event, info) => {
                        if (info.offset.x < -80 && activeStage < STAGES.length - 1) {
                           setActiveStage(activeStage + 1);
                        } else if (info.offset.x > 80 && activeStage > 0) {
                           setActiveStage(activeStage - 1);
                        }
                     }}
                     animate={{
                        x,
                        y,
                        scale,
                        opacity,
                        rotate,
                     }}
                     transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                     }}
                     style={{
                        zIndex,
                        touchAction: "pan-y",
                     }}
                     className={`absolute inset-x-0 bottom-0 h-[280px] bg-white rounded-3xl border border-gray-200 shadow-xl p-6 flex flex-col justify-between select-none ${
                        isSwipeActive ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                     }`}
                  >
                     <div>
                        <div className="flex justify-between items-start mb-4">
                           <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${stage.color} ${stage.textColor}`}>
                              <Icon className="w-4 h-4" />
                           </span>
                           <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-black tracking-widest uppercase">
                              LEDGER SYNC
                           </span>
                        </div>

                        <ul className="space-y-3 mb-4">
                           {stage.metrics.map((metric, i) => (
                              <li key={i} className="flex items-center gap-2.5 text-sm text-gray-650 font-medium">
                                 <ShieldCheck className="w-4 h-4 text-[#53D769] shrink-0" />
                                 {metric}
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="pt-3 border-t border-gray-100 space-y-2">
                        {stage.data.map((data, i) => {
                           const DataIcon = data.icon;
                           return (
                              <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg text-xs">
                                 <div className="flex items-center gap-2 text-gray-550">
                                    <DataIcon className="w-3.5 h-3.5 text-gray-400" />
                                    {data.label}
                                 </div>
                                 <span className="font-bold text-[#0B3D2E]">{data.value}</span>
                              </div>
                           );
                        })}
                     </div>
                  </motion.div>
               );
            })}
         </div>

         {/* Navigation buttons */}
         <div className="flex justify-center gap-4 mt-6">
            <button
               onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
               disabled={activeStage === 0}
               className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-extrabold text-[#0B3D2E] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
               Prev Stage
            </button>
            <button
               onClick={() => setActiveStage(prev => Math.min(STAGES.length - 1, prev + 1))}
               disabled={activeStage === STAGES.length - 1}
               className="px-5 py-2.5 rounded-full bg-[#0B3D2E] text-white text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1F7A53] transition-all shadow-sm active:scale-95 cursor-pointer"
            >
               Next Stage
            </button>
         </div>
      </div>
    </div>
  );
}
