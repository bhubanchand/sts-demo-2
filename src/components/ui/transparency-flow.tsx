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
function Users(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }

export function TransparencyFlow() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-24 px-4 sm:px-8 snap-center">
      <div className="text-center mb-20">
         <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">End-to-End Visibility</span>
         <h2 className="text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">From Farm to Retail. Verified.</h2>
         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hover over each node in the supply chain to see the exact data SourceTrace captures immutably.
         </p>
      </div>

      <div className="relative">
         {/* Connecting Line */}
         <div className="absolute top-12 left-0 w-full h-1 bg-gray-200 hidden md:block"></div>
         <motion.div 
            className="absolute top-12 left-0 h-1 bg-[#53D769] hidden md:block"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
         ></motion.div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                                    <data.icon className="w-3 h-3" />
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
    </div>
  );
}
