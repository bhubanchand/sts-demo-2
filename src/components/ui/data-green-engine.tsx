"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Wallet, Globe2, Store, Smartphone, BrainCircuit, Leaf,
  MapPin, FileText, ShieldCheck, Tractor, Link2, ScanLine, BarChart3, TrendingUp, Calendar,
  Shield, Landmark, Users, Map, Satellite, AlertTriangle, CloudRain, Sprout,
  ShoppingCart, Factory, FileCheck, Thermometer, Truck,
  Mic, LayoutDashboard, MessageSquare, Languages, WifiOff,
  BarChart2, Bot, LineChart, CloudLightning, Award, Settings, Activity
} from "lucide-react";

/* ── helpers ─────────────────────────────────────────────── */
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const arcPath = (cx: number, cy: number, ri: number, ro: number, a1: number, a2: number) => {
  const so = polar(cx, cy, ro, a2), eo = polar(cx, cy, ro, a1);
  const si = polar(cx, cy, ri, a2), ei = polar(cx, cy, ri, a1);
  const lg = a2 - a1 <= 180 ? "0" : "1";
  return `M${so.x} ${so.y} A${ro} ${ro} 0 ${lg} 0 ${eo.x} ${eo.y} L${ei.x} ${ei.y} A${ri} ${ri} 0 ${lg} 1 ${si.x} ${si.y}Z`;
};

/* ── data ────────────────────────────────────────────────── */
interface Item { text: string; icon: React.ComponentType<any> }
interface Slice { name: string; color: string; icon: React.ComponentType<any>; items: Item[] }

const SLICES: Slice[] = [
  { name: "Traceability", color: "#004D26", icon: Search, items: [
    { text: "FARM TRACEABILITY", icon: Tractor },
    { text: "FARMER & FARM REGISTRY", icon: FileText },
    { text: "CERTIFICATIONS", icon: Award },
    { text: "FIELDOPS", icon: Sprout },
    { text: "BLOCKCHAIN", icon: Link2 },
    { text: "QR & RFID", icon: ScanLine },
    { text: "LICENSING", icon: FileCheck },
    { text: "M&E", icon: BarChart3 },
    { text: "FORECASTS", icon: TrendingUp },
    { text: "YIELD ESTIMATE", icon: BarChart2 },
    { text: "CROP CALENDAR", icon: Calendar },
  ]},
  { name: "Finance & Credit", color: "#0A5C36", icon: Wallet, items: [
    { text: "FARMER WALLET", icon: Wallet },
    { text: "FARM CREDIT SCORE", icon: TrendingUp },
    { text: "CROP INSURANCE", icon: Shield },
    { text: "EXPORT TRADE FINANCE", icon: Landmark },
    { text: "FPO & SHG GROUP FINANCE", icon: Users },
    { text: "CARBON FINANCE", icon: Leaf },
  ]},
  { name: "Geo spatial & GIS", color: "#117043", icon: Map, items: [
    { text: "FIELD BOUNDARY MAPPING", icon: Map },
    { text: "NDVI CROP MONITORING", icon: Satellite },
    { text: "SATELLITE INSURANCE TRIGGERS", icon: AlertTriangle },
    { text: "AGRO-CLIMATIC ANALYTICS", icon: CloudRain },
    { text: "SOIL HEALTH", icon: Sprout },
  ]},
  { name: "Agri Marketplace", color: "#1B8550", icon: Store, items: [
    { text: "LIVE PRODUCE MARKETPLACE", icon: ShoppingCart },
    { text: "PROCUREMENT HUB", icon: Factory },
    { text: "EXPORT COMPLIANCE SUITE", icon: FileCheck },
    { text: "COLD CHAIN LOGISTICS", icon: Thermometer },
    { text: "LOGISTICS BOOKING", icon: Truck },
  ]},
  { name: "Farmer App", color: "#2E9A61", icon: Smartphone, items: [
    { text: "VOICE-FIRST FARM ASSISTANT", icon: Mic },
    { text: "MY FARM DASHBOARD", icon: LayoutDashboard },
    { text: "AGRI ADVISORY ENGINE", icon: MessageSquare },
    { text: "REGIONAL LANGUAGES", icon: Languages },
    { text: "OFFLINE-FIRST ARCHITECTURE", icon: WifiOff },
  ]},
  { name: "AI & Predictions", color: "#1B8550", icon: BrainCircuit, items: [
    { text: "YIELD PREDICTION ENGINE", icon: BarChart2 },
    { text: "AI CROP ADVISORY BOT", icon: Bot },
    { text: "RISK SCORING & ALERTS", icon: AlertTriangle },
    { text: "DEMAND FORECASTING", icon: LineChart },
    { text: "WEATHER AI", icon: CloudLightning },
  ]},
  { name: "Carbon & ESG", color: "#117043", icon: Leaf, items: [
    { text: "CARBON FOOTPRINT TRACKING", icon: Activity },
    { text: "CARBON CREDIT GENERATION", icon: Award },
    { text: "CREDIT MARKETPLACE", icon: Store },
    { text: "SCOPE 3 ESG REPORTING", icon: FileText },
    { text: "MRV ENGINE", icon: Settings },
  ]},
];

/* ── component ───────────────────────────────────────────── */
export function DataGreenEngine() {
  const [hovered, setHovered] = useState<number | null>(null);

  const CX = 500, CY = 500;
  const R_CENTER = 130, R_INNER = 144, R_MID = 270, R_OUTER_IN = 278, R_MAX = 476;
  const SLICE_DEG = 360 / 7;
  const GAP = 1.4;

  /* Radius pair for zig-zag. Dense sector (11 items) gets tighter spacing. */
  const rClose = 320;   // radius closer to the wheel
  const rFar   = 445;   // radius farther from the wheel

  return (
    <div className="relative w-full max-w-6xl mx-auto pt-20 pb-16 px-4 flex flex-col items-center justify-center min-h-screen snap-center">
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl">
        <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">The Core Architecture</span>
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
          SourceTrace <span className="text-[#53D769]">DATA GREEN</span>
        </h2>
      </div>

      {/* Diagram */}
      <div className="relative w-full max-w-[1050px] overflow-visible">
        <div className="w-full aspect-square">
          <svg viewBox="0 0 1000 1000" className="w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <filter id="cs" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.12" />
              </filter>
              {/* curved text arcs */}
              {SLICES.map((_, i) => {
                const ca = i * SLICE_DEG;
                const p1 = polar(CX, CY, 215, ca - 22);
                const p2 = polar(CX, CY, 215, ca + 22);
                return <path key={`tp${i}`} id={`tp${i}`} d={`M${p1.x} ${p1.y} A215 215 0 0 1 ${p2.x} ${p2.y}`} />;
              })}
            </defs>

            {/* Base white disc */}
            <circle cx={CX} cy={CY} r={R_MAX} fill="#fff" />

            {/* ── SLICES ────────────────────────────────── */}
            {SLICES.map((s, i) => {
              const ca  = i * SLICE_DEG;
              const a1  = ca - SLICE_DEG / 2 + GAP / 2;
              const a2  = ca + SLICE_DEG / 2 - GAP / 2;
              const isH = hovered === i;
              const dim = hovered !== null && !isH;

              const iconR  = 174;
              const pIcon  = polar(CX, CY, iconR, ca);
              const outerFill = i % 2 === 0 ? "#ffffff" : "#EDF7EE";

              /* angular margin from sector edges */
              const margin = 4;
              const maxOff = SLICE_DEG / 2 - margin;
              const n = s.items.length;

              return (
                <g key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                  style={{ transformOrigin: `${CX}px ${CY}px` }}>

                  {/* outer wedge bg */}
                  <motion.path d={arcPath(CX, CY, R_OUTER_IN, R_MAX, a1, a2)} fill={outerFill}
                    animate={{ opacity: dim ? 0.45 : 1, scale: isH ? 1.012 : 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }} />

                  {/* inner wedge */}
                  <motion.path d={arcPath(CX, CY, R_INNER, R_MID, a1, a2)} fill={s.color}
                    animate={{ scale: isH ? 1.02 : 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }} />

                  {/* curved title */}
                  <text fill="#fff" fontSize="13" fontWeight="800" className="select-none" style={{ letterSpacing: "0.07em" }}>
                    <textPath href={`#tp${i}`} startOffset="50%" textAnchor="middle">{s.name}</textPath>
                  </text>

                  {/* sector icon */}
                  <foreignObject x={pIcon.x - 17} y={pIcon.y - 17} width={34} height={34} className="pointer-events-none">
                    <s.icon className="w-full h-full text-white/90" />
                  </foreignObject>

                  {/* ── FEATURE ITEMS (auto-distributed polar) ── */}
                  {s.items.map((item, j) => {
                    /* evenly space items across the sector angular range */
                    const angleOffset = n === 1 ? 0 : -maxOff + (j * 2 * maxOff / (n - 1));
                    /* zig-zag: alternate between close and far radius */
                    const r = j % 2 === 0 ? rFar : rClose;
                    const p = polar(CX, CY, r, ca + angleOffset);

                    /* auto-determine text direction: items to the left of center get right-aligned */
                    const isLeft = p.x < CX - 10;

                    const W = 210, H = 28;
                    const fx = isLeft ? p.x - W : p.x;
                    const fy = p.y - H / 2;
                    const Icon = item.icon;

                    return (
                      <foreignObject key={j} x={fx} y={fy} width={W} height={H}
                        className="pointer-events-none select-none" style={{ overflow: "visible" }}>
                        {isLeft ? (
                          <div className="grid grid-cols-[1fr_auto] items-center gap-1.5 w-full h-full pr-0.5">
                            <span className="text-[9px] font-extrabold text-[#004D26] uppercase tracking-wide leading-tight truncate text-right">
                              {item.text}
                            </span>
                            <div className="w-5 h-5 rounded-full bg-[#e8f4e5] flex items-center justify-center shrink-0">
                              <Icon className="w-3 h-3 text-[#2E9A61]" />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-[auto_1fr] items-center gap-1.5 w-full h-full pl-0.5">
                            <div className="w-5 h-5 rounded-full bg-[#e8f4e5] flex items-center justify-center shrink-0">
                              <Icon className="w-3 h-3 text-[#2E9A61]" />
                            </div>
                            <span className="text-[9px] font-extrabold text-[#004D26] uppercase tracking-wide leading-tight truncate text-left">
                              {item.text}
                            </span>
                          </div>
                        )}
                      </foreignObject>
                    );
                  })}
                </g>
              );
            })}

            {/* ── CENTER ─────────────────────────────────── */}
            <g filter="url(#cs)">
              <circle cx={CX} cy={CY} r={R_CENTER} fill="#004D26" stroke="#fff" strokeWidth="7" />
              <foreignObject x={CX - 90} y={CY - 44} width={180} height={88} className="pointer-events-none">
                <div className="flex flex-col items-center justify-center w-full h-full select-none">
                  <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-[26px] object-contain brightness-0 invert mb-1" />
                  <div className="text-[12px] font-black tracking-[0.15em] flex gap-1 leading-none">
                    <span className="text-[#F2C94C]">DATA</span>
                    <span className="text-[#53D769]">GREEN</span>
                  </div>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>

        {/* Bottom banner */}
        <div className="w-full bg-[#004D26] py-3.5 px-6 rounded-2xl flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-white text-center mt-6 border border-white/15 shadow-xl">
          <span className="font-extrabold text-base md:text-xl tracking-wide select-none">Data Green</span>
          <span className="text-gray-300 text-xs md:text-sm font-light select-none">The Operating System for Agriculture and Greening by</span>
          <span className="font-bold text-sm md:text-base tracking-wide select-none">SourceTrace.</span>
        </div>
      </div>
    </div>
  );
}
