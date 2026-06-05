"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

// Dummy partner logos (using placeholder SVGs or text for now, can be replaced with actual logos later)
const PARTNERS = [
  "Fairtrade International",
  "Rainforest Alliance",
  "World Bank Group",
  "USAID",
  "Bill & Melinda Gates Foundation",
  "Oxfam",
  "Solidaridad",
  "TechnoServe",
  "Conservation International",
  "WWF"
];

export function PartnersEcosystem() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 blur-[150px] rounded-full opacity-5 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-gray-100 pb-12">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              <Globe2 className="w-5 h-5" /> Global Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B3D2E] leading-tight tracking-tighter">
              Trusted by the world's leading organizations.
            </h2>
          </div>
          <p className="text-lg text-gray-500 max-w-md">
            We partner with NGOs, governments, and certification bodies to drive systemic change in global agriculture.
          </p>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks for smooth fade at edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee whitespace-nowrap flex items-center py-4 group-hover:[animation-play-state:paused]">
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div 
              key={index} 
              className="mx-8 px-8 py-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center hover:shadow-md hover:border-gray-200 transition-all cursor-pointer min-w-[250px]"
            >
              <span className="text-xl font-extrabold text-gray-400 uppercase tracking-wider">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
