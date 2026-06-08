"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Wallet, Store, Smartphone, BrainCircuit, Leaf,
  Map, Satellite, Activity, Check, ShieldCheck
} from "lucide-react";

/* ── data definitions ────────────────────────────────────── */
interface Slice {
  id: string;
  name: string;
  column: "left" | "center" | "right";
  icon: React.ComponentType<any>;
  x: number; // Desktop X
  y: number; // Desktop Y
  mx: number; // Mobile/Tablet X
  my: number; // Mobile/Tablet Y
  metric: string;
  workflow: string;
  description: string;
  capabilities: string[];
}

const SLICES: Slice[] = [
  {
    id: "farmer",
    name: "Farmer Portal & Extension",
    column: "left",
    icon: Smartphone,
    x: 170,
    y: 350,
    mx: 240,
    my: 610,
    metric: "42,400 Farmers Registered",
    workflow: "Onboarding ➔ GPS Farms ➔ Co-op Registry",
    description: "Empowers smallholders with offline field diagnostics, agronomist advice, and weather alerts.",
    capabilities: [
      "Farm Registry & Profiles",
      "Offline Mobile Applications",
      "Extension Advisories"
    ]
  },
  {
    id: "traceability",
    name: "Traceability & Logistics",
    column: "center",
    icon: Search,
    x: 450,
    y: 190,
    mx: 180,
    my: 290,
    metric: "98.4% Lot Custody Verified",
    workflow: "Farm Intake ➔ QR Weighing ➔ Warehouse Receipts",
    description: "Monitors first-mile crop reception, batch weight telemetry, and digital custody ledger tracking.",
    capabilities: [
      "First-Mile Reception Gate",
      "QR & RFID Bag Tracking",
      "Blockchain Ledger Integrity"
    ]
  },
  {
    id: "gis",
    name: "Geo Spatial & GIS Monitoring",
    column: "center",
    icon: Map,
    x: 450,
    y: 510,
    mx: 180,
    my: 450,
    metric: "142,204 ha Mapped",
    workflow: "Plot Boundary ➔ Satellite NDVI ➔ EUDR Deforestation Alert",
    description: "Analyzes polygon boundaries and forest buffers via satellite telemetry to enforce deforestation compliance.",
    capabilities: [
      "GPS Polygon Boundary Plots",
      "NDVI Crop Health Analytics",
      "EUDR Deforestation Alerts"
    ]
  },
  {
    id: "ai",
    name: "AI Insights & Predictions",
    column: "center",
    icon: BrainCircuit,
    x: 720,
    y: 130,
    mx: 400,
    my: 155,
    metric: "92% Yield Forecasting Accuracy",
    workflow: "Climatic History ➔ Satellite Health ➔ Yield Projection Model",
    description: "Aggregates climatic and satellite crop imagery to generate yield projection curves and weather risks.",
    capabilities: [
      "Yield Forecasting Models",
      "Climatic Weather Intel",
      "Crop Disease Risk Warnings"
    ]
  },
  {
    id: "marketplace",
    name: "Agri Marketplace & Sourcing",
    column: "right",
    icon: Store,
    x: 990,
    y: 190,
    mx: 620,
    my: 290,
    metric: "84,240 Tons Traded",
    workflow: "Crop Sourcing ➔ Quality Check ➔ Global Export Container",
    description: "Aggregates crop volumes, matches them with international buyers, and tracks logistics trade cargo.",
    capabilities: [
      "Silo Procurement Hubs",
      "B2B Sourcing Docks",
      "Global Export Compliance"
    ]
  },
  {
    id: "finance",
    name: "Finance & Credit Ledger",
    column: "right",
    icon: Wallet,
    x: 990,
    y: 510,
    mx: 620,
    my: 450,
    metric: "$4.2M Paid Directly",
    workflow: "Trade Delivery ➔ Credit Score ➔ Direct Wallet Payout",
    description: "Processes premium payouts, carbon credits, and micro-loans directly to mobile wallets.",
    capabilities: [
      "Digital Wallets",
      "Agronomic Credit Score",
      "Direct Mobile Payouts"
    ]
  },
  {
    id: "carbon",
    name: "Carbon MRV & ESG",
    column: "right",
    icon: Leaf,
    x: 1270,
    y: 350,
    mx: 560,
    my: 610,
    metric: "24,000 mt CO2e Offset",
    workflow: "Forest Canopy ➔ Credit Generation ➔ Verified Registry",
    description: "Tracks carbon absorption rates across forest boundaries to issue certified green credits.",
    capabilities: [
      "Emissions & Sequestration MRV",
      "Carbon Premium Payments",
      "Certified ESG Reports"
    ]
  }
];

const HUB_DESKTOP = { x: 720, y: 350 };
const HUB_MOBILE = { x: 400, y: 450 };

export function DataGreenEngine() {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const activeWorkflow = hoveredSlice !== null ? SLICES[hoveredSlice].id : null;
  const isDark = false;

  // Connection path status helper - represents the single chronological conveyor chain
  const isPathActive = (pathId: string) => {
    if (!activeWorkflow) return false;
    switch (activeWorkflow) {
      case "farmer":
        return pathId === "farmer-traceability" || pathId === "hub-farmer" || pathId === "carbon-payout";
      case "traceability":
        return pathId === "farmer-traceability" || pathId === "traceability-gis" || pathId === "hub-traceability";
      case "gis":
        return pathId === "traceability-gis" || pathId === "gis-ai" || pathId === "hub-gis";
      case "ai":
        return pathId === "gis-ai" || pathId === "ai-marketplace" || pathId === "hub-ai";
      case "marketplace":
        return pathId === "ai-marketplace" || pathId === "marketplace-finance" || pathId === "hub-marketplace";
      case "finance":
        return pathId === "marketplace-finance" || pathId === "finance-carbon" || pathId === "carbon-payout" || pathId === "hub-finance";
      case "carbon":
        return pathId === "finance-carbon" || pathId === "carbon-payout" || pathId === "hub-carbon";
      default:
        return false;
    }
  };

  // Helper to resolve stroke color based on hover state for tech outlines
  const getOutlineColor = (id: string) => {
    return activeWorkflow === id ? "#10b981" : "rgba(0, 77, 38, 0.15)";
  };

  return (
    <div className="relative w-full pt-16 pb-20 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#f9faf9] to-[#eef5ef] text-gray-900 select-none">
      
      {/* Header */}
      <div className="text-center mb-8 max-w-3xl z-10">
        <span className="font-extrabold tracking-widest uppercase mb-2 block text-[#004D26] text-xs md:text-sm">Data Green Operating System</span>
        <h2 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-[#004D26]">
          Connected Agriculture Ecosystem Map
        </h2>
        <p className="text-xs md:text-base leading-relaxed text-gray-600">
          A visual schematic of how SourceTrace coordinates the agricultural value chain. Hover over a module to trace the data flow through the central registry.
        </p>
      </div>

      {/* ── DESKTOP WIDESCREEN VIEW (1200px+ / xl breakpoint) ── */}
      <div className="hidden xl:flex flex-col w-full max-w-[1440px] items-center relative z-10">
        
        {/* Horizontal Column Headers */}
        <div className="grid grid-cols-3 w-full text-center mb-6 border-b border-emerald-800/10 pb-4">
          <div>
            <span className="text-xs font-black tracking-widest text-[#10b981] uppercase block">Stage 1</span>
            <h3 className="text-xl font-extrabold text-[#004D26] uppercase leading-none mt-1">Origins</h3>
            <p className="text-[11px] text-gray-500 mt-1">Farmer Onboarding & Profiles</p>
          </div>
          <div>
            <span className="text-xs font-black tracking-widest text-[#10b981] uppercase block">Stage 2</span>
            <h3 className="text-xl font-extrabold text-[#004D26] uppercase leading-none mt-1">Operational Intelligence</h3>
            <p className="text-[11px] text-gray-500 mt-1">First-Mile Logistics, GIS & AI Models</p>
          </div>
          <div>
            <span className="text-xs font-black tracking-widest text-[#10b981] uppercase block">Stage 3</span>
            <h3 className="text-xl font-extrabold text-[#004D26] uppercase leading-none mt-1">Outcomes</h3>
            <p className="text-[11px] text-gray-500 mt-1">Marketplace, Finance & ESG Offsets</p>
          </div>
        </div>

        {/* Dynamic agricultural Twin Map Canvas */}
        <div className="w-full aspect-[2.05/1] relative overflow-visible">
          <svg viewBox="0 0 1440 700" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <filter id="glow-light-desktop" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <style>{`
                @keyframes flow-active-desk {
                  to { stroke-dashoffset: -30; }
                }
                .flow-path-active-desk {
                  animation: flow-active-desk 1.2s linear infinite;
                }
                @keyframes pulse-dot-desk {
                  0% { opacity: 0.3; }
                  50% { opacity: 1; }
                  100% { opacity: 0.3; }
                }
                .pulse-node-desk {
                  animation: pulse-dot-desk 2s infinite ease-in-out;
                }
              `}</style>
            </defs>

            {/* ── BACKGROUND SCHEMATIC TWIN DRAWINGS (DESKTOP) ── */}
            
            {/* Origins Context (Left) */}
            <g className="transition-all duration-300">
              <g transform="translate(45, 275) scale(0.7)">
                <path d="M0,15 L0,35 L25,35 L25,15 L12.5,3 Z" fill="none" stroke={getOutlineColor("farmer")} strokeWidth="1.2" />
                <line x1="8" y1="35" x2="8" y2="27" stroke={getOutlineColor("farmer")} strokeWidth="1.2" />
              </g>
              <g transform="translate(80, 310) scale(0.6)">
                <path d="M0,15 L0,35 L25,35 L25,15 L12.5,3 Z" fill="none" stroke={getOutlineColor("farmer")} strokeWidth="1.2" />
              </g>
              <g transform="translate(130, 260) scale(0.8)">
                <line x1="0" y1="0" x2="-12" y2="40" stroke={getOutlineColor("farmer")} strokeWidth="1.5" />
                <line x1="0" y1="0" x2="12" y2="40" stroke={getOutlineColor("farmer")} strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.5" fill={getOutlineColor("farmer")} />
              </g>
              <g transform="translate(10, 420) scale(0.9)">
                <rect x="0" y="0" width="16" height="28" rx="2" fill="none" stroke={getOutlineColor("farmer")} strokeWidth="1.5" />
                <line x1="4" y1="6" x2="12" y2="6" stroke={getOutlineColor("farmer")} strokeWidth="1" />
                <line x1="4" y1="12" x2="12" y2="12" stroke={getOutlineColor("farmer")} strokeWidth="1" />
              </g>
            </g>

            {/* Traceability Context */}
            <g transform="translate(370, 145) scale(0.85)" className="transition-all duration-300">
              <path d="M0,20 L0,45 L50,45 L50,20 L25,4 Z" fill="none" stroke={getOutlineColor("traceability")} strokeWidth="1.5" />
              <rect x="18" y="26" width="14" height="19" fill="none" stroke={getOutlineColor("traceability")} strokeWidth="1" />
              <rect x="-10" y="42" width="15" height="3" fill={getOutlineColor("traceability")} />
            </g>

            {/* GIS Context */}
            <g className="transition-all duration-300">
              <polygon points="320,480 440,460 470,520 350,540" fill="none" stroke={getOutlineColor("gis")} strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="460,450 540,440 560,490 480,510" fill="none" stroke={getOutlineColor("gis")} strokeWidth="1" strokeDasharray="3 3" />
              <polyline points="290,490 310,535 340,580" fill="none" stroke={activeWorkflow === "gis" ? "#ef4444" : "rgba(239, 68, 68, 0.15)"} strokeWidth="1.5" strokeDasharray="4 2" />
            </g>

            {/* Orbiting Satellite */}
            <g transform="translate(450, 40) scale(0.8)" className="transition-all duration-300">
              <circle cx="0" cy="0" r="10" fill="none" stroke={getOutlineColor("gis")} strokeWidth="1.5" />
              <rect x="-18" y="-3" width="36" height="6" fill="none" stroke={getOutlineColor("gis")} strokeWidth="1" rx="1" />
              <rect x="-26" y="-8" width="8" height="16" fill="none" stroke={getOutlineColor("gis")} strokeWidth="1" rx="1" />
            </g>

            {/* AI Predictions Context */}
            <g className="transition-all duration-300">
              <path d="M 680,240 Q 710,210 740,230 T 780,180" fill="none" stroke={getOutlineColor("ai")} strokeWidth="2" />
              <circle cx="780" cy="180" r="3" fill={getOutlineColor("ai")} />
              <g transform="translate(700, 20) scale(0.9)">
                <path d="M10,12 A5,5 0 0,1 18,8 A7,7 0 0,1 30,10 A5,5 0 0,1 36,16 L10,16 Z" fill="none" stroke={getOutlineColor("ai")} strokeWidth="1.2" />
              </g>
            </g>

            {/* Marketplace Context */}
            <g className="transition-all duration-300">
              <g transform="translate(1015, 145) scale(0.85)">
                <rect x="0" y="8" width="13" height="34" rx="1" fill="none" stroke={getOutlineColor("marketplace")} strokeWidth="1.3" />
                <path d="M0,8 C0,2 13,2 13,8" fill="none" stroke={getOutlineColor("marketplace")} strokeWidth="1.3" />
                <rect x="17" y="3" width="13" height="39" rx="1" fill="none" stroke={getOutlineColor("marketplace")} strokeWidth="1.3" />
                <path d="M36,18 L50,8 L64,18 L64,42 L36,42 Z" fill="none" stroke={getOutlineColor("marketplace")} strokeWidth="1.3" />
              </g>
              <g transform="translate(1270, 515) scale(0.9)">
                <path d="M0,20 L60,20 L72,6 L12,6 Z" fill="none" stroke={getOutlineColor("marketplace")} strokeWidth="1.5" />
              </g>
            </g>

            {/* Finance Vault Context */}
            <g transform="translate(1005, 465) scale(0.85)" className="transition-all duration-300">
              <polygon points="20,0 0,10 40,10" fill="none" stroke={getOutlineColor("finance")} strokeWidth="1.5" />
              <rect x="4" y="10" width="32" height="24" fill="none" stroke={getOutlineColor("finance")} strokeWidth="1.5" />
              <line x1="10" y1="10" x2="10" y2="34" stroke={getOutlineColor("finance")} strokeWidth="1.2" />
              <line x1="20" y1="10" x2="20" y2="34" stroke={getOutlineColor("finance")} strokeWidth="1.2" />
              <rect x="0" y="34" width="40" height="4" fill={getOutlineColor("finance")} />
            </g>

            {/* Carbon Canopy Context */}
            <g className="transition-all duration-300">
              <g transform="translate(1220, 260) scale(0.8)">
                <polygon points="0,-18 -8,4 8,4" fill="none" stroke={getOutlineColor("carbon")} strokeWidth="1.2" />
                <rect x="-1" y="4" width="2" height="4" fill={getOutlineColor("carbon")} />
              </g>
              <g transform="translate(1250, 245) scale(0.95)">
                <polygon points="0,-18 -8,4 8,4" fill="none" stroke={getOutlineColor("carbon")} strokeWidth="1.2" />
                <rect x="-1" y="4" width="2" height="4" fill={getOutlineColor("carbon")} />
              </g>
            </g>


            {/* ── 2. CORE WORKFLOW CONVEYOR PATHWAYS (DESKTOP) ── */}

            {/* Path 1: Farmer -> Traceability */}
            <path id="path-farmer-traceability" d="M 170,350 L 450,190" fill="none"
              stroke={isPathActive("farmer-traceability") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("farmer-traceability") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("farmer-traceability") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 2: Traceability -> GIS */}
            <path id="path-traceability-gis" d="M 450,190 L 450,510" fill="none"
              stroke={isPathActive("traceability-gis") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("traceability-gis") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("traceability-gis") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 3: GIS -> AI */}
            <path id="path-gis-ai" d="M 450,510 L 720,130" fill="none"
              stroke={isPathActive("gis-ai") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("gis-ai") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("gis-ai") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 4: AI -> Marketplace */}
            <path id="path-ai-marketplace" d="M 720,130 L 990,190" fill="none"
              stroke={isPathActive("ai-marketplace") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("ai-marketplace") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("ai-marketplace") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 5: Marketplace -> Finance */}
            <path id="path-marketplace-finance" d="M 990,190 L 990,510" fill="none"
              stroke={isPathActive("marketplace-finance") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("marketplace-finance") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("marketplace-finance") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 6: Finance -> Carbon */}
            <path id="path-finance-carbon" d="M 990,510 L 1270,350" fill="none"
              stroke={isPathActive("finance-carbon") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("finance-carbon") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("finance-carbon") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 7: Payout loop */}
            <path id="path-carbon-payout" d="M 1270,350 C 720,680 170,680 170,350" fill="none"
              stroke={isPathActive("carbon-payout") ? "#10b981" : "rgba(0, 77, 38, 0.08)"}
              strokeWidth={isPathActive("carbon-payout") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("carbon-payout") ? "none" : "5 5"}
              className="transition-all duration-300" />


            {/* ── 3. RADIAL CONNECTIONS (DESKTOP) ── */}

            <path id="path-hub-farmer" d="M 720,350 L 170,350" fill="none"
              stroke={isPathActive("hub-farmer") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-farmer") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-traceability" d="M 720,350 L 450,190" fill="none"
              stroke={isPathActive("hub-traceability") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-traceability") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-gis" d="M 720,350 L 450,510" fill="none"
              stroke={isPathActive("hub-gis") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-gis") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-ai" d="M 720,350 L 720,130" fill="none"
              stroke={isPathActive("hub-ai") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-ai") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-marketplace" d="M 720,350 L 990,190" fill="none"
              stroke={isPathActive("hub-marketplace") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-marketplace") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-finance" d="M 720,350 L 990,510" fill="none"
              stroke={isPathActive("hub-finance") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-finance") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-carbon" d="M 720,350 L 1270,350" fill="none"
              stroke={isPathActive("hub-carbon") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-carbon") ? 2.5 : 1}
              strokeDasharray="4 4" />


            {/* ── 4. FLOWING ANIMATED DATA PACKETS (DESKTOP) ── */}
            
            {!activeWorkflow && (
              <g>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="6s" repeatCount="indefinite" path="M 170,350 L 450,190" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="7s" repeatCount="indefinite" path="M 450,510 L 720,130" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="8s" repeatCount="indefinite" path="M 720,130 L 990,190" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="9s" repeatCount="indefinite" path="M 990,510 L 1270,350" />
                </circle>
              </g>
            )}

            {isPathActive("farmer-traceability") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 170,350 L 450,190" />
              </circle>
            )}
            {isPathActive("traceability-gis") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450,190 L 450,510" />
              </circle>
            )}
            {isPathActive("gis-ai") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450,510 L 720,130" />
              </circle>
            )}
            {isPathActive("ai-marketplace") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 720,130 L 990,190" />
              </circle>
            )}
            {isPathActive("marketplace-finance") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 990,190 L 990,510" />
              </circle>
            )}
            {isPathActive("finance-carbon") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 990,510 L 1270,350" />
              </circle>
            )}
            {isPathActive("carbon-payout") && (
              <g>
                <circle r="5.5" fill="#10b981" className="filter drop-shadow-md">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 1270,350 C 720,680 170,680 170,350" />
                </circle>
                <text fill="#fff" fontSize="5.5" fontWeight="bold" textAnchor="middle" dy="2.0" className="select-none pointer-events-none">
                  $
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 1270,350 C 720,680 170,680 170,350" />
                </text>
              </g>
            )}

            {SLICES.map((s, i) => {
              if (!isPathActive(`hub-${s.id}`)) return null;
              return (
                <circle key={`hub-pulse-${i}`} r="3.5" fill="#10b981">
                  <animateMotion dur="1.4s" repeatCount="indefinite" path={`M 720,350 L ${s.x},${s.y}`} />
                </circle>
              );
            })}


            {/* ── 5. DATA GREEN HERO CENTRAL HUB NODE (DESKTOP) ── */}
            <g>
              <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="115" fill="none" stroke="rgba(16, 185, 129, 0.06)" strokeWidth="1" />
              <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="95" fill="none" stroke="#004D26" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />
              
              <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y - 95} r="3" fill="#10b981" className="pulse-node-desk" />
              <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y + 95} r="3" fill="#10b981" className="pulse-node-desk" style={{ animationDelay: "1s" }} />
              <circle cx={HUB_DESKTOP.x - 95} cy={HUB_DESKTOP.y} r="3" fill="#10b981" className="pulse-node-desk" style={{ animationDelay: "0.5s" }} />
              <circle cx={HUB_DESKTOP.x + 95} cy={HUB_DESKTOP.y} r="3" fill="#10b981" className="pulse-node-desk" style={{ animationDelay: "1.5s" }} />

              <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="70" fill="#ffffff" stroke="#10b981" strokeWidth="4.5" className="filter drop-shadow-md" />
              <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="60" fill="rgba(16, 185, 129, 0.04)" />
              
              <text x={HUB_DESKTOP.x} y={HUB_DESKTOP.y - 12} textAnchor="middle" fill="#004D26" fontSize="11" fontWeight="900" letterSpacing="0.16em">DATA GREEN</text>
              <text x={HUB_DESKTOP.x} y={HUB_DESKTOP.y + 12} textAnchor="middle" fill="#10b981" fontSize="9.5" fontWeight="900" letterSpacing="0.1em">CORE OS</text>
              <text x={HUB_DESKTOP.x} y={HUB_DESKTOP.y + 26} textAnchor="middle" fill="gray" fontSize="6.2" fontWeight="bold" letterSpacing="0.08em">CENTRAL ROUTER</text>
            </g>


            {/* ── 6. COMPACT MODULE CARDS (DESKTOP) ── */}
            {SLICES.map((s, i) => {
              const isH = hoveredSlice === i;
              const dim = hoveredSlice !== null && !isH;
              const SliceIcon = s.icon;

              const W = 230, H = 210;
              const fx = s.x - W / 2;
              const fy = s.y - H / 2;

              return (
                <foreignObject key={s.id} x={fx} y={fy} width={W} height={H} style={{ overflow: "visible" }}>
                  <div
                    onMouseEnter={() => setHoveredSlice(i)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    className={`w-full h-full rounded-2xl p-4 flex flex-col items-start justify-between text-left transition-all duration-300 border bg-white cursor-pointer ${isH ? "border-[#10b981] shadow-[0_12px_36px_rgba(16,185,129,0.12)] scale-[1.03]" : "border-emerald-800/8 shadow-[0_4px_20px_rgba(0,77,38,0.02)]"} ${dim ? "opacity-35" : "opacity-100"}`}
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between w-full mb-2 border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "#004D26" }}>
                            <SliceIcon className="w-4.5 h-4.5" />
                          </div>
                          <h4 className="text-[10px] font-black tracking-widest text-[#004D26] uppercase leading-none">{s.name}</h4>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 w-full mt-2">
                        {s.capabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[9px] font-bold text-gray-700 uppercase">
                            <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider">{s.metric}</span>
                      {isH && (
                        <span className="text-[7.5px] font-black text-[#10b981] uppercase tracking-widest animate-pulse flex items-center gap-0.5">
                          <Activity className="w-2.5 h-2.5" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </foreignObject>
              );
            })}

          </svg>
        </div>

      </div>


      {/* ── TABLET & MOBILE VIEW (Below 1200px / xl:hidden) ── */}
      {/* Visual map remains identical in logic and centerpiece representation */}
      <div className="xl:hidden flex flex-col w-full max-w-[800px] items-center relative z-10">
        
        {/* Dynamic agricultural Twin Map Canvas (Tablet / Mobile Radial configuration) */}
        <div className="w-full aspect-[0.89/1] relative overflow-visible">
          <svg viewBox="0 0 800 900" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <filter id="glow-light-mobile" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <style>{`
                @keyframes flow-active-mob {
                  to { stroke-dashoffset: -30; }
                }
                .flow-path-active-mob {
                  animation: flow-active-mob 1.2s linear infinite;
                }
                @keyframes pulse-dot-mob {
                  0% { opacity: 0.3; }
                  50% { opacity: 1; }
                  100% { opacity: 0.3; }
                }
                .pulse-node-mob {
                  animation: pulse-dot-mob 2s infinite ease-in-out;
                }
              `}</style>
            </defs>

            {/* ── BACKGROUND SCHEMATIC TWIN DRAWINGS (MOBILE/TABLET) ── */}
            
            {/* Origins Context (near Farmer Card: 240, 610) */}
            <g className="transition-all duration-300">
              <g transform="translate(130, 560) scale(0.65)">
                <path d="M0,15 L0,35 L25,35 L25,15 L12.5,3 Z" fill="none" stroke={getOutlineColor("farmer")} strokeWidth="1.2" />
                <line x1="8" y1="35" x2="8" y2="27" stroke={getOutlineColor("farmer")} strokeWidth="1.2" />
              </g>
              <g transform="translate(110, 600) scale(0.7)">
                <rect x="0" y="0" width="16" height="28" rx="2" fill="none" stroke={getOutlineColor("farmer")} strokeWidth="1.3" />
              </g>
            </g>

            {/* Traceability Context (near Traceability Card: 180, 290) */}
            <g transform="translate(100, 240) scale(0.75)" className="transition-all duration-300">
              <path d="M0,20 L0,45 L50,45 L50,20 L25,4 Z" fill="none" stroke={getOutlineColor("traceability")} strokeWidth="1.5" />
            </g>

            {/* GIS Context (near GIS Card: 180, 450) */}
            <g className="transition-all duration-300">
              <polygon points="80,420 150,410 165,450 95,465" fill="none" stroke={getOutlineColor("gis")} strokeWidth="1" strokeDasharray="3 3" />
            </g>

            {/* AI Context (near AI Card: 400, 155) */}
            <g className="transition-all duration-300">
              <g transform="translate(385, 50) scale(0.85)">
                <path d="M10,12 A5,5 0 0,1 18,8 A7,7 0 0,1 30,10 A5,5 0 0,1 36,16 L10,16 Z" fill="none" stroke={getOutlineColor("ai")} strokeWidth="1.2" />
              </g>
            </g>

            {/* Marketplace Context (near Marketplace Card: 620, 290) */}
            <g className="transition-all duration-300">
              <g transform="translate(640, 230) scale(0.8)">
                <rect x="0" y="8" width="13" height="34" rx="1" fill="none" stroke={getOutlineColor("marketplace")} strokeWidth="1.3" />
                <path d="M0,8 C0,2 13,2 13,8" fill="none" stroke={getOutlineColor("marketplace")} strokeWidth="1.3" />
              </g>
            </g>

            {/* Finance Vault Context (near Finance Card: 620, 450) */}
            <g transform="translate(635, 400) scale(0.75)" className="transition-all duration-300">
              <polygon points="20,0 0,10 40,10" fill="none" stroke={getOutlineColor("finance")} strokeWidth="1.5" />
              <rect x="4" y="10" width="32" height="24" fill="none" stroke={getOutlineColor("finance")} strokeWidth="1.5" />
            </g>

            {/* Carbon Context (near Carbon Card: 560, 610) */}
            <g className="transition-all duration-300">
              <g transform="translate(580, 560) scale(0.7)">
                <polygon points="0,-18 -8,4 8,4" fill="none" stroke={getOutlineColor("carbon")} strokeWidth="1.2" />
                <rect x="-1" y="4" width="2" height="4" fill={getOutlineColor("carbon")} />
              </g>
            </g>


            {/* ── 2. CORE WORKFLOW CONVEYOR PATHWAYS (MOBILE/TABLET) ── */}

            {/* Path 1: Farmer -> Traceability */}
            <path id="path-farmer-traceability-mob" d="M 240,610 L 180,290" fill="none"
              stroke={isPathActive("farmer-traceability") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("farmer-traceability") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("farmer-traceability") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 2: Traceability -> GIS */}
            <path id="path-traceability-gis-mob" d="M 180,290 L 180,450" fill="none"
              stroke={isPathActive("traceability-gis") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("traceability-gis") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("traceability-gis") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 3: GIS -> AI */}
            <path id="path-gis-ai-mob" d="M 180,450 L 400,155" fill="none"
              stroke={isPathActive("gis-ai") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("gis-ai") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("gis-ai") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 4: AI -> Marketplace */}
            <path id="path-ai-marketplace-mob" d="M 400,155 L 630,290" fill="none"
              stroke={isPathActive("ai-marketplace") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("ai-marketplace") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("ai-marketplace") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 5: Marketplace -> Finance */}
            <path id="path-marketplace-finance-mob" d="M 630,290 L 630,450" fill="none"
              stroke={isPathActive("marketplace-finance") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("marketplace-finance") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("marketplace-finance") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 6: Finance -> Carbon */}
            <path id="path-finance-carbon-mob" d="M 630,450 L 560,620" fill="none"
              stroke={isPathActive("finance-carbon") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActive("finance-carbon") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("finance-carbon") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 7: Payout Loop */}
            <path id="path-carbon-payout-mob" d="M 560,620 C 400,750 240,750 240,620" fill="none"
              stroke={isPathActive("carbon-payout") ? "#10b981" : "rgba(0, 77, 38, 0.08)"}
              strokeWidth={isPathActive("carbon-payout") ? 3.5 : 1.2}
              strokeDasharray={isPathActive("carbon-payout") ? "none" : "5 5"}
              className="transition-all duration-300" />


            {/* ── 3. RADIAL CONNECTIONS BACK TO HUB (MOBILE/TABLET) ── */}

            <path id="path-hub-farmer-mob" d="M 400,450 L 240,610" fill="none"
              stroke={isPathActive("hub-farmer") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-farmer") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-traceability-mob" d="M 400,450 L 180,290" fill="none"
              stroke={isPathActive("hub-traceability") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-traceability") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-gis-mob" d="M 400,450 L 180,450" fill="none"
              stroke={isPathActive("hub-gis") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-gis") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-ai-mob" d="M 400,450 L 400,155" fill="none"
              stroke={isPathActive("hub-ai") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-ai") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-marketplace-mob" d="M 400,450 L 630,290" fill="none"
              stroke={isPathActive("hub-marketplace") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-marketplace") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-finance-mob" d="M 400,450 L 630,450" fill="none"
              stroke={isPathActive("hub-finance") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-finance") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-carbon-mob" d="M 400,450 L 560,610" fill="none"
              stroke={isPathActive("hub-carbon") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActive("hub-carbon") ? 2.5 : 1}
              strokeDasharray="4 4" />


            {/* ── 4. FLOWING ANIMATED DATA PACKETS (MOBILE/TABLET) ── */}
            
            {!activeWorkflow && (
              <g>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="6s" repeatCount="indefinite" path="M 240,610 L 180,290" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="7s" repeatCount="indefinite" path="M 180,450 L 400,155" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="8s" repeatCount="indefinite" path="M 400,155 L 630,290" />
                </circle>
                <circle r="3" fill="#10b981" opacity="0.6">
                  <animateMotion dur="9s" repeatCount="indefinite" path="M 630,450 L 560,620" />
                </circle>
              </g>
            )}

            {isPathActive("farmer-traceability") && (
              <circle r="4.5" fill="#10b981">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 240,610 L 180,290" />
              </circle>
            )}
            {isPathActive("traceability-gis") && (
              <circle r="4.5" fill="#10b981">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 180,290 L 180,450" />
              </circle>
            )}
            {isPathActive("gis-ai") && (
              <circle r="4.5" fill="#10b981">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 180,450 L 400,155" />
              </circle>
            )}
            {isPathActive("ai-marketplace") && (
              <circle r="4.5" fill="#10b981">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 400,155 L 630,290" />
              </circle>
            )}
            {isPathActive("marketplace-finance") && (
              <circle r="4.5" fill="#10b981">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 630,290 L 630,450" />
              </circle>
            )}
            {isPathActive("finance-carbon") && (
              <circle r="4.5" fill="#10b981">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 630,450 L 560,620" />
              </circle>
            )}
            {isPathActive("carbon-payout") && (
              <g>
                <circle r="5.5" fill="#10b981">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 560,620 C 400,750 240,750 240,620" />
                </circle>
                <text fill="#fff" fontSize="5.5" fontWeight="bold" textAnchor="middle" dy="2.0">
                  $
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 560,620 C 400,750 240,750 240,620" />
                </text>
              </g>
            )}

            {SLICES.map((s, i) => {
              if (!isPathActive(`hub-${s.id}`)) return null;
              return (
                <circle key={`hub-pulse-mob-${i}`} r="3.5" fill="#10b981">
                  <animateMotion dur="1.4s" repeatCount="indefinite" path={`M 400,450 L ${s.mx},${s.my}`} />
                </circle>
              );
            })}


            {/* ── 5. DOMINANT DATA GREEN CENTRAL HUB ENGINE (MOBILE/TABLET) ── */}
            <g filter="url(#glow-light-mobile)">
              <circle cx={HUB_MOBILE.x} cy={HUB_MOBILE.y} r="105" fill="none" stroke="rgba(16, 185, 129, 0.06)" strokeWidth="1" />
              <circle cx={HUB_MOBILE.x} cy={HUB_MOBILE.y} r="85" fill="none" stroke="#004D26" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />
              
              <circle cx={HUB_MOBILE.x} cy={HUB_MOBILE.y - 85} r="3" fill="#10b981" className="pulse-node-mob" />
              <circle cx={HUB_MOBILE.x} cy={HUB_MOBILE.y + 85} r="3" fill="#10b981" className="pulse-node-mob" style={{ animationDelay: "1s" }} />
              <circle cx={HUB_MOBILE.x - 85} cy={HUB_MOBILE.y} r="3" fill="#10b981" className="pulse-node-mob" style={{ animationDelay: "0.5s" }} />
              <circle cx={HUB_MOBILE.x + 85} cy={HUB_MOBILE.y} r="3" fill="#10b981" className="pulse-node-mob" style={{ animationDelay: "1.5s" }} />

              <circle cx={HUB_MOBILE.x} cy={HUB_MOBILE.y} r="65" fill="#ffffff" stroke="#10b981" strokeWidth="4.2" className="filter drop-shadow-sm" />
              <circle cx={HUB_MOBILE.x} cy={HUB_MOBILE.y} r="55" fill="rgba(16, 185, 129, 0.04)" />
              
              <text x={HUB_MOBILE.x} y={HUB_MOBILE.y - 10} textAnchor="middle" fill="#004D26" fontSize="10.5" fontWeight="900" letterSpacing="0.16em">DATA GREEN</text>
              <text x={HUB_MOBILE.x} y={HUB_MOBILE.y + 12} textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="900" letterSpacing="0.1em">CORE OS</text>
              <text x={HUB_MOBILE.x} y={HUB_MOBILE.y + 24} textAnchor="middle" fill="gray" fontSize="6" fontWeight="bold" letterSpacing="0.08em">CENTRAL ROUTER</text>
            </g>


            {/* ── 6. COMPACT MODULE CARDS (MOBILE/TABLET) ── */}
            {SLICES.map((s, i) => {
              const isH = hoveredSlice === i;
              const dim = hoveredSlice !== null && !isH;
              const SliceIcon = s.icon;

              const W = 210, H = 150;
              const fx = s.mx - W / 2;
              const fy = s.my - H / 2;

              return (
                <foreignObject key={`mob-${s.id}`} x={fx} y={fy} width={W} height={H} style={{ overflow: "visible" }}>
                  <div
                    onMouseEnter={() => setHoveredSlice(i)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    onClick={() => setHoveredSlice(hoveredSlice === i ? null : i)}
                    className={`w-full h-full rounded-xl p-3 flex flex-col items-start justify-between text-left transition-all duration-300 border bg-white cursor-pointer ${isH ? "border-[#10b981] shadow-[0_8px_24px_rgba(16,185,129,0.12)] scale-[1.03]" : "border-emerald-800/8 shadow-[0_3px_15px_rgba(0,77,38,0.02)]"} ${dim ? "opacity-35" : "opacity-100"}`}
                  >
                    <div className="w-full">
                      {/* Mobile Header (Shorter) */}
                      <div className="flex items-center gap-1.5 w-full mb-1.5 border-b border-gray-100 pb-1.5">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: "#004D26" }}>
                          <SliceIcon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-[8px] font-black tracking-widest text-[#004D26] uppercase leading-none truncate">{s.name}</h4>
                      </div>

                      {/* Capabilities Checklist (3 Items) */}
                      <div className="flex flex-col gap-0.5 w-full mt-1">
                        {s.capabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[7.5px] font-bold text-gray-700 uppercase">
                            <Check className="w-2.5 h-2.5 text-[#10b981] shrink-0 stroke-[3.5]" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full mt-1 pt-1 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[7px] font-black uppercase text-gray-400 tracking-wider truncate max-w-[120px]">{s.metric}</span>
                      {isH && (
                        <span className="text-[6.5px] font-black text-[#10b981] uppercase tracking-widest animate-pulse flex items-center gap-0.5">
                          <Activity className="w-2.5 h-2.5" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </foreignObject>
              );
            })}

          </svg>
        </div>

      </div>


      {/* Dynamic Workflow Story Teller Console (Visible on all viewports) */}
      <div className="w-full max-w-[1000px] items-center justify-center min-h-[64px] z-10 px-4 mt-8 flex">
        <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl px-6 py-3.5 text-center shadow-sm w-full transition-all duration-300">
          {hoveredSlice !== null ? (
            <div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#10b981] mb-1 block">Active Operating System Workflow: {SLICES[hoveredSlice].name}</span>
              <div className="flex items-center justify-center gap-2 text-[#004D26] font-extrabold text-xs md:text-base leading-none uppercase">
                <span>{SLICES[hoveredSlice].workflow}</span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-600 mt-1.5 font-medium max-w-3xl mx-auto">{SLICES[hoveredSlice].description}</p>
            </div>
          ) : (
            <div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 mb-1 block">Data Green OS Status: Monitoring Ambient Flows</span>
              <p className="text-[10px] md:text-xs text-gray-500 font-semibold">Hover or tap any module card above to trace the chronological data journey from farm onboarding to carbon finance outcomes.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Tagline / Summary box */}
      <div className="w-full py-4 px-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-center mt-12 border border-emerald-800/10 shadow-sm max-w-5xl z-10 bg-white">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#10b981]" />
          <span className="font-extrabold text-sm md:text-base tracking-wider text-[#004D26]">SourceTrace Data Green OS</span>
        </div>
        <p className="text-[10px] md:text-xs font-semibold text-gray-600 max-w-xl md:text-right">
          Ensuring compliance, direct payout verification, and end-to-end supply chain transparency through a unified agricultural operating system.
        </p>
      </div>

    </div>
  );
}
