"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, CloudLightning, Satellite, Database, Smartphone, ShieldCheck, Activity, Leaf } from "lucide-react";

interface TechNode {
  id: string;
  title1: string;
  title2: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
}

const TECHS: TechNode[] = [
  { id: "blockchain", title1: "Blockchain", title2: "Ledger", desc: "Secures farm-to-retail transactions.", icon: Link, color: "text-blue-500", glow: "rgba(59,130,246,0.2)" },
  { id: "ai", title1: "Remote Sensing", title2: "AI", desc: "Satellite checks & crop health scoring.", icon: Satellite, color: "text-emerald-500", glow: "rgba(16,185,129,0.2)" },
  { id: "sync", title1: "Offline-First", title2: "Sync", desc: "Maps boundaries with zero connectivity.", icon: CloudLightning, color: "text-orange-500", glow: "rgba(245,158,11,0.2)" },
  { id: "lake", title1: "Unified", title2: "Data Lake", desc: "Aggregates millions of telemetry data points.", icon: Database, color: "text-purple-500", glow: "rgba(139,92,246,0.2)" },
  { id: "mobile", title1: "Mobile", title2: "Apps", desc: "Field worker onboarding & diagnostics.", icon: Smartphone, color: "text-pink-500", glow: "rgba(236,72,153,0.2)" },
  { id: "compliance", title1: "Compliance", title2: "Automation", desc: "Audit-ready EUDR & CSRD reports.", icon: ShieldCheck, color: "text-teal-500", glow: "rgba(20,184,166,0.2)" },
  { id: "iot", title1: "IoT Climate", title2: "Telemetry", desc: "Real-time crop scale and storage monitoring.", icon: Activity, color: "text-rose-500", glow: "rgba(244,63,94,0.2)" },
  { id: "esg", title1: "Carbon & ESG", title2: "Intelligence", desc: "Biomass MRV tracking for certified offsets.", icon: Leaf, color: "text-emerald-600", glow: "rgba(5,150,105,0.2)" }
];

export function TechStackGrid() {
  const [hov, setHov] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax motion tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const px = (mouse.x - 0.5) * 10;
  const py = (mouse.y - 0.5) * 10;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-white select-none overflow-hidden py-16"
    >
      <style>{`
        @keyframes flow-line { to { stroke-dashoffset: -40; } }
        .tech-flow-active { stroke-dasharray: 8 8; animation: flow-line 2s linear infinite; }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-12px) scale(1.1); opacity: 0.4; }
        }
        .tech-particle-anim { animation: float-particle 10s ease-in-out infinite; }
      `}</style>

      {/* ═══════════════════════════════════════
          BACKGROUND (2-5% opacity blueprint grid/satellite lines)
          ═══════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ transform: `translate(${px * -0.5}px, ${py * -0.5}px)`, transition: "transform 400ms ease-out" }}
      >
        {/* Soft radial gradients */}
        <div className="absolute w-[45%] h-[45%] top-[10%] left-[15%] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }} />
        <div className="absolute w-[35%] h-[35%] bottom-[10%] right-[15%] rounded-full opacity-[0.02]" style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />

        {/* Faint blueprint vector art (opacity 2.5%) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] text-emerald-950" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Geospatial grid */}
          <circle cx="720" cy="300" r="280" strokeDasharray="4 6" />
          <circle cx="720" cy="300" r="420" />
          <path d="M 720,20 L 720,580 M 300,300 L 1140,300" strokeDasharray="6 12" />
          <path d="M 450,150 Q 720,80 990,150" strokeDasharray="3 3" />
          <path d="M 450,450 Q 720,520 990,450" strokeDasharray="3 3" />
          {/* Satellite orbit ellipse */}
          <ellipse cx="720" cy="300" rx="600" ry="120" strokeDasharray="8 8" transform="rotate(-5 720 300)" />
        </svg>

        {/* Floating background particles */}
        {[
          { s: 5, t: "15%", l: "12%", d: "8s" },
          { s: 8, t: "70%", l: "8%", d: "12s" },
          { s: 6, t: "25%", l: "85%", d: "10s" },
          { s: 7, t: "80%", l: "78%", d: "14s" },
          { s: 4, t: "48%", l: "92%", d: "9s" }
        ].map((pt, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-500/20 tech-particle-anim"
            style={{ width: pt.s, height: pt.s, top: pt.t, left: pt.l, animationDuration: pt.d, animationDelay: `${i * 1.5}s` }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          HEADER SECTION
          ═══════════════════════════════════════ */}
      <div className="text-center pb-0 px-6 z-10 relative">
        <span className="font-extrabold tracking-[0.25em] uppercase mb-4 block text-[#10b981] text-xs">Our Technology</span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight text-[#0b3d2e] tracking-tight mb-4">
          Engineered for the First Mile.
        </h2>
        <p className="text-sm md:text-base text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          One intelligent operating system powering every stage of modern agriculture—from farmers to finance.
        </p>
      </div>

      {/* ═══════════════════════════════════════
          TECHNOLOGY TIMELINE PIPELINE
          ═══════════════════════════════════════ */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 pt-[50px]">

        {/* ── DESKTOP PIPELINE (>= 1024px) ── */}
        <div className="hidden lg:block relative w-full h-[210px]">
          {/* SVG Connection line behind the nodes */}
          <svg className="absolute top-[52px] left-[5%] w-[90%] h-[20px] pointer-events-none overflow-visible">
            <line x1="0%" y1="10" x2="100%" y2="10" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="4" />
            <line x1="0%" y1="10" x2="100%" y2="10" stroke="url(#line-grad)" strokeWidth="3" />
            <line x1="0%" y1="10" x2="100%" y2="10" stroke="url(#line-grad)" strokeWidth="3" className="tech-flow-active" />

            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
              </filter>
            </defs>

            {/* Glowing connection particles traveling along pipeline */}
            <circle r="4" fill="#10b981" filter="url(#node-glow)">
              <animateMotion dur={hov !== null ? "4s" : "7s"} repeatCount="indefinite" path="M0,10 L1000,10" />
            </circle>
            <circle r="3" fill="#3b82f6" opacity="0.8">
              <animateMotion dur={hov !== null ? "4s" : "7s"} begin="2.5s" repeatCount="indefinite" path="M0,10 L1000,10" />
            </circle>
          </svg>

          {/* Technology Nodes horizontal grid */}
          <div className="absolute inset-0 flex justify-between">
            {TECHS.map((tech, idx) => {
              const isH = hov === idx;
              const dim = hov !== null && !isH;
              const Icon = tech.icon;

              return (
                <div
                  key={tech.id}
                  onMouseEnter={() => setHov(idx)}
                  onMouseLeave={() => setHov(null)}
                  className="flex flex-col items-center text-center group cursor-pointer transition-all duration-500 ease-out"
                  style={{
                    width: "11%",
                    transform: isH ? "scale(1.05) translateY(-12px)" : "scale(1)",
                    opacity: dim ? 0.35 : 1,
                  }}
                >
                  {/* Floating Circular Glass Icon */}
                  <div
                    className="w-[104px] h-[104px] rounded-full flex items-center justify-center border transition-all duration-500 relative"
                    style={{
                      background: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(12px)",
                      borderColor: isH ? "rgba(16, 185, 129, 0.28)" : "rgba(0, 77, 38, 0.05)",
                      boxShadow: isH
                        ? `0 16px 36px rgba(0,0,0,0.06), 0 0 20px ${tech.glow}`
                        : "0 6px 20px rgba(0,0,0,0.02)",
                    }}
                  >
                    <Icon className={`w-9 h-9 transition-all duration-700 ${tech.color} ${isH ? "scale-110 rotate-[6deg]" : ""}`} />
                    
                    {/* Glowing Connection Nodes */}
                    <div className={`absolute bottom-[-16px] w-[9px] h-[9px] rounded-full border border-white transition-all duration-500 ${isH ? "bg-[#10b981] scale-125" : "bg-gray-300"}`}
                      style={{ boxShadow: isH ? "0 0 10px #10b981" : "none" }} />
                  </div>

                  {/* Title (Forced into aligned 2 lines) & One-line description */}
                  <div className="mt-5 px-1.5 w-full">
                    <h4 className={`text-[12px] font-black uppercase tracking-wider transition-colors duration-500 min-h-[34px] flex flex-col justify-center ${isH ? "text-[#004D26]" : "text-gray-700"}`}>
                      <span className="block leading-tight">{tech.title1}</span>
                      <span className="block leading-tight">{tech.title2}</span>
                    </h4>
                    <p className={`text-[10px] leading-relaxed text-gray-400 font-medium mt-2 transition-all duration-500 ${isH ? "opacity-100 translate-y-0" : "opacity-80"}`}>
                      {tech.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── TABLET PIPELINE (768px - 1023px: 2 rows of 4 nodes) ── */}
        <div className="hidden sm:block lg:hidden relative w-full max-w-[760px] mx-auto">
          <div className="grid grid-cols-4 gap-x-8 gap-y-12">
            {TECHS.map((tech, idx) => {
              const isH = hov === idx;
              const dim = hov !== null && !isH;
              const Icon = tech.icon;

              return (
                <div
                  key={tech.id}
                  onMouseEnter={() => setHov(idx)}
                  onMouseLeave={() => setHov(null)}
                  className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300"
                  style={{
                    transform: isH ? "scale(1.04) translateY(-8px)" : "scale(1)",
                    opacity: dim ? 0.4 : 1,
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(10px)",
                      borderColor: isH ? "rgba(16, 185, 129, 0.25)" : "rgba(0, 77, 38, 0.05)",
                      boxShadow: isH
                        ? `0 12px 28px rgba(0,0,0,0.05), 0 0 16px ${tech.glow}`
                        : "0 4px 16px rgba(0,0,0,0.02)",
                    }}
                  >
                    <Icon className={`w-8 h-8 ${tech.color} ${isH ? "scale-105 rotate-3" : ""}`} />
                  </div>
                  <div className="mt-3 px-1 w-full">
                    <h4 className="text-[12px] font-black uppercase tracking-wider text-gray-800 min-h-[34px] flex flex-col justify-center">
                      <span className="block leading-tight">{tech.title1}</span>
                      <span className="block leading-tight">{tech.title2}</span>
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium mt-2 leading-normal">{tech.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE 2x4 GRID (<768px: 2 columns, 4 rows, all 8 visible immediately) ── */}
        <div className="block sm:hidden w-full">
          <div className="grid grid-cols-2 gap-4 px-2">
            {TECHS.map((tech) => {
              const Icon = tech.icon;

              return (
                <div
                  key={tech.id}
                  className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100/80 bg-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.015)] min-h-[145px] justify-center transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-100 bg-white shadow-sm mb-3 shrink-0"
                  >
                    <Icon className={`w-6 h-6 ${tech.color}`} />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-800 leading-tight">
                    <span className="block">{tech.title1}</span>
                    <span className="block">{tech.title2}</span>
                  </h4>
                  <p className="text-[9px] text-gray-400 mt-1.5 leading-snug font-medium px-0.5">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
