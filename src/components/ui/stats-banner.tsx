"use client";

import React, { useEffect, useState } from "react";
import { Globe2, Users2, Map, Database } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import { useRef } from "react";

function Counter({ from, to, suffix, decimals = 0 }: { from: number, to: number, suffix: string, decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(decimals) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, suffix, decimals]);

  return <span ref={ref}>{from}{suffix}</span>;
}

export function StatsBanner() {
  return (
    <div className="bg-[#0B3D2E] text-white py-16 relative overflow-hidden snap-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/10">
          <div className="flex flex-col items-center">
            <Globe2 className="w-10 h-10 text-[#53D769] mb-6 opacity-80" />
            <h4 className="text-5xl md:text-7xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
               <Counter from={0} to={38} suffix="+" />
            </h4>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Countries</p>
          </div>
          <div className="flex flex-col items-center">
            <Users2 className="w-10 h-10 text-[#53D769] mb-6 opacity-80" />
            <h4 className="text-5xl md:text-7xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
               <Counter from={0} to={2.5} decimals={1} suffix="M" />
            </h4>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Farmers Empowered</p>
          </div>
          <div className="flex flex-col items-center">
            <Map className="w-10 h-10 text-[#53D769] mb-6 opacity-80" />
            <h4 className="text-5xl md:text-7xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
               <Counter from={0} to={3} suffix="M+" />
            </h4>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Hectares Mapped</p>
          </div>
          <div className="flex flex-col items-center">
            <Database className="w-10 h-10 text-[#53D769] mb-6 opacity-80" />
            <h4 className="text-5xl md:text-7xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
               <Counter from={0} to={1} suffix="B+" />
            </h4>
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Data Points Logged</p>
          </div>
        </div>
      </div>
    </div>
  );
}
