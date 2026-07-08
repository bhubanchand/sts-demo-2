"use client";

import React, { useEffect, useState } from "react";
import { Globe2, Users2, Map, Database } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import { useRef } from "react";

function Counter({ from, to, suffix, decimals = 0 }: { from: number, to: number, suffix: string, decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(decimals) + suffix;
          }
        }
      });
      return () => controls.stop();
    } else {
      if (ref.current) {
        ref.current.textContent = from.toFixed(decimals) + suffix;
      }
    }
  }, [from, to, inView, suffix, decimals]);

  return <span ref={ref}>{from}{suffix}</span>;
}

export function StatsBanner() {
  return (
    <div className="bg-[#164E33] text-white py-6 border-y border-[#1b5e3e] relative overflow-hidden snap-center">
      {/* Subtle glowing ambient spots for visual interest */}
      <div className="absolute w-[300px] h-[100px] -left-10 top-0 bg-[#53D769]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute w-[300px] h-[100px] -right-10 bottom-0 bg-[#53D769]/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Country Card */}
          <div className="flex items-center gap-4 py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] rounded-2xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <Globe2 className="w-5 h-5 text-[#86EFAC] opacity-90" />
            </div>
            <div>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-200 tracking-tight leading-none">
                 <Counter from={0} to={38} suffix="+" />
              </h4>
              <p className="text-emerald-100/80 font-bold tracking-widest uppercase text-[10px] md:text-xs mt-1.5">Countries</p>
            </div>
          </div>
          
          {/* Farmers Card */}
          <div className="flex items-center gap-4 py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] rounded-2xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <Users2 className="w-5 h-5 text-[#86EFAC] opacity-90" />
            </div>
            <div>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-200 tracking-tight leading-none">
                 <Counter from={0} to={2.5} decimals={1} suffix="M" />
              </h4>
              <p className="text-emerald-100/80 font-bold tracking-widest uppercase text-[10px] md:text-xs mt-1.5">Farmers Empowered</p>
            </div>
          </div>
          
          {/* Hectares Card */}
          <div className="flex items-center gap-4 py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] rounded-2xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <Map className="w-5 h-5 text-[#86EFAC] opacity-90" />
            </div>
            <div>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-200 tracking-tight leading-none">
                 <Counter from={0} to={3} suffix="M+" />
              </h4>
              <p className="text-emerald-100/80 font-bold tracking-widest uppercase text-[10px] md:text-xs mt-1.5">Hectares Mapped</p>
            </div>
          </div>
          
          {/* Data Points Card */}
          <div className="flex items-center gap-4 py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] rounded-2xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/15 shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <Database className="w-5 h-5 text-[#86EFAC] opacity-90" />
            </div>
            <div>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-200 tracking-tight leading-none">
                 <Counter from={0} to={1} suffix="B+" />
              </h4>
              <p className="text-emerald-100/80 font-bold tracking-widest uppercase text-[10px] md:text-xs mt-1.5">Data Points Logged</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
