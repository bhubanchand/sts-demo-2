"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Search, Wallet, Store, Smartphone, BrainCircuit, Leaf,
  Map, Satellite, Activity, Check, ShieldCheck, X, ArrowRight, ChevronRight
} from "lucide-react";

/* ── DATA DEFINITIONS & TYPES ────────────────────────────── */
interface Slice {
  id: string;
  name: string;
  column: "left" | "center" | "right";
  icon: React.ComponentType<any>;
  x: number; // Desktop coordinates
  y: number;
  metric: string;
  workflow: string;
  description: string;
  capabilities: string[];
  receives: string[];
  processes: string[];
  produces: string[];
  feeds: string[];
  shortDescription: string;
  pipeline: string[];
  inputs: string[];
  processing: string[];
  outputs: string[];
  usedBy: string[];
  impact: { value: string; label: string }[];
}

const SLICES: Slice[] = [
  {
    id: "farmer",
    name: "Farmer Portal & Extension",
    column: "left",
    icon: Smartphone,
    x: 170,
    y: 350,
    metric: "42,400 Farmers Registered",
    workflow: "Onboarding ➔ GPS Farms ➔ Co-op Registry",
    description: "Empowers smallholders with offline field diagnostics, agronomist advice, and weather alerts.",
    capabilities: [
      "Farm Registry & Profiles",
      "Offline Mobile Applications",
      "Extension Advisories"
    ],
    receives: [
      "Extension Advisories",
      "Input Package Details",
      "Training Schedules"
    ],
    processes: [
      "Farmer Registration",
      "Field Training Logs",
      "Input Distribution Logs"
    ],
    produces: [
      "Verified Farmer ID",
      "Sowing & Agronomic Records",
      "Input Ledger Entries"
    ],
    feeds: [
      "Traceability & Logistics",
      "Geo Spatial & GIS Monitoring"
    ],
    shortDescription: "Empowers smallholders with offline registration, agronomic advice, and weather alerts directly in the field.",
    pipeline: ["Extension Agent", "Farmer Profiling", "Mobile Advisory", "Input Registry", "Traceability Gate"],
    inputs: ["Extension Advisories", "Input Packages", "Training Calendars"],
    processing: ["Farmer Onboarding", "Field Diagnostics", "Cooperative Registration"],
    outputs: ["Verified Farmer ID", "Sowing Records", "Input Ledger Entries"],
    usedBy: ["Traceability & Logistics", "Geo Spatial & GIS Monitoring"],
    impact: [
      { value: "42,400", label: "Growers Mapped" },
      { value: "18,200", label: "Extension Alerts" },
      { value: "98.2%", label: "Profiling Accuracy" }
    ]
  },
  {
    id: "traceability",
    name: "Traceability & Logistics",
    column: "center",
    icon: Search,
    x: 450,
    y: 190,
    metric: "98.4% Lot Custody Verified",
    workflow: "Farm Intake ➔ QR Weighing ➔ Warehouse Receipts",
    description: "Monitors first-mile crop reception, batch weight telemetry, and digital custody ledger tracking.",
    capabilities: [
      "First-Mile Reception Gate",
      "QR & RFID Bag Tracking",
      "Blockchain Ledger Integrity"
    ],
    receives: [
      "Farmer ID & Sowing Records",
      "Transport Details",
      "Warehouse Siting Data"
    ],
    processes: [
      "Intake Scale Logs",
      "Bag Weight Verification",
      "Digital Ledger Signatures"
    ],
    produces: [
      "Batch Receipts (QR Codes)",
      "Lot Numbers & Weights",
      "Custody Signatures"
    ],
    feeds: [
      "AI Insights & Predictions",
      "Agri Marketplace & Sourcing"
    ],
    shortDescription: "Monitors first-mile crop reception, batch weight telemetry, and digital custody ledger tracking.",
    pipeline: ["Farmer Gate", "QR Bag Scan", "Scale weighing", "Warehouse Reception", "Sourcing Hub"],
    inputs: ["Farmer ID", "Sowing Records", "Transport Details"],
    processing: ["QR Verification", "Scale Weighing", "Batch Matching"],
    outputs: ["Batch Receipts (QR)", "Lot Weight Records", "Custody ledger"],
    usedBy: ["AI Predictions", "Agri Marketplace & Sourcing"],
    impact: [
      { value: "98.4%", label: "Lot Custody Verified" },
      { value: "142k", label: "Batches Tracked" },
      { value: "84k", label: "Tons Verified" }
    ]
  },
  {
    id: "gis",
    name: "Geo Spatial & GIS Monitoring",
    column: "center",
    icon: Map,
    x: 450,
    y: 510,
    metric: "142,204 ha Mapped",
    workflow: "Plot Boundary ➔ Satellite NDVI ➔ EUDR Deforestation Alert",
    description: "Analyzes polygon boundaries and forest buffers via satellite telemetry to enforce deforestation compliance.",
    capabilities: [
      "GPS Polygon Boundary Plots",
      "NDVI Crop Health Analytics",
      "EUDR Deforestation Alerts"
    ],
    receives: [
      "Verified Farmer ID",
      "Sowing & Agronomic Records",
      "Satellite & Canopy Feeds"
    ],
    processes: [
      "GPS Polygon Mappings",
      "Forest Buffer Overlay Checks",
      "NDVI Crop Health Scans"
    ],
    produces: [
      "Deforestation Risk Reports",
      "Mapped Hectares Registry",
      "NDVI Health Index Scores"
    ],
    feeds: [
      "AI Insights & Predictions",
      "Carbon MRV & ESG"
    ],
    shortDescription: "Analyzes polygon boundaries and forest buffers via satellite telemetry to enforce deforestation compliance.",
    pipeline: ["Farm Boundary", "Satellite Mapping", "Forest Buffers Check", "EUDR Audit", "Carbon Registry"],
    inputs: ["Verified Farmer ID", "GPS Coordinate Points", "Canopy Feeds"],
    processing: ["Polygon Mappings", "Buffer Overlay Check", "NDVI Health Scans"],
    outputs: ["Deforestation Audits", "Mapped Hectares Log", "NDVI Scores"],
    usedBy: ["AI Predictions", "Carbon MRV & ESG"],
    impact: [
      { value: "142,204 ha", label: "Farm Areas Mapped" },
      { value: "0", label: "Deforestation Breaches" },
      { value: "99.7%", label: "GIS Data Integrity" }
    ]
  },
  {
    id: "ai",
    name: "AI Insights & Predictions",
    column: "center",
    icon: BrainCircuit,
    x: 720,
    y: 130,
    metric: "92% Yield Forecasting Accuracy",
    workflow: "Climatic History ➔ Satellite Health ➔ Yield Projection Model",
    description: "Aggregates climatic and satellite crop imagery to generate yield projection curves and weather risks.",
    capabilities: [
      "Yield Forecasting Models",
      "Climatic Weather Intel",
      "Crop Disease Risk Warnings"
    ],
    receives: [
      "NDVI Health Index Scores",
      "Intake Scale Logs",
      "Climatic Weather Feeds"
    ],
    processes: [
      "Yield Forecasting Models",
      "Disease Predictor Engines",
      "Extension Advisory Generators"
    ],
    produces: [
      "Yield Projection Curves",
      "Pest & Disease Warnings",
      "Adaptive Farm Advisories"
    ],
    feeds: [
      "Agri Marketplace & Sourcing",
      "Finance & Credit Ledger"
    ],
    shortDescription: "Aggregates climatic feeds and satellite crop imagery to generate yield projection curves and risk alerts.",
    pipeline: ["NDVI Health Scores", "Weather Feeds", "Yield Predictor Run", "Pest Risk Alerts", "Credit Scoring"],
    inputs: ["NDVI Health Index", "Intake Scale weight", "Weather Feeds"],
    processing: ["Yield Forecast Modeling", "Disease Predictor Runs", "Advisory math"],
    outputs: ["Yield Projection Curves", "Pest Warnings", "Adaptive Advisories"],
    usedBy: ["Agri Marketplace", "Finance & Credit"],
    impact: [
      { value: "92%", label: "Forecast Accuracy" },
      { value: "1,240", label: "Risk Alerts Sent" },
      { value: "12%", label: "Avg Yield Lift" }
    ]
  },
  {
    id: "marketplace",
    name: "Agri Marketplace & Sourcing",
    column: "right",
    icon: Store,
    x: 990,
    y: 190,
    metric: "84,240 Tons Traded",
    workflow: "Crop Sourcing ➔ Quality Check ➔ Global Export Container",
    description: "Aggregates crop volumes, matches them with international buyers, and tracks logistics trade cargo.",
    capabilities: [
      "Silo Procurement Hubs",
      "B2B Sourcing Docks",
      "Global Export Compliance"
    ],
    receives: [
      "Batch Receipts (QR Codes)",
      "Yield Projection Curves",
      "International Demand Orders"
    ],
    processes: [
      "B2B Buyer Matching",
      "Silo Stock Verification",
      "Export Clearance Tracking"
    ],
    produces: [
      "Trade Settlement Orders",
      "Global Cargo Manifests",
      "Procurement Audit Records"
    ],
    feeds: [
      "Finance & Credit Ledger"
    ],
    shortDescription: "Aggregates crop volumes, matches them with international buyers, and tracks global trade cargo.",
    pipeline: ["Warehouse Lots", "Quality Verification", "Buyer Matching", "Export Manifests", "Finance Settlement"],
    inputs: ["Batch Receipts", "Yield Projections", "International Orders"],
    processing: ["B2B Sourcing Match", "Silo stock Check", "Export Clearances"],
    outputs: ["Trade Settlement Orders", "Cargo Manifests", "Audit Trails"],
    usedBy: ["Finance & Credit Ledger"],
    impact: [
      { value: "84,240", label: "Metric Tons Traded" },
      { value: "$18.4M", label: "Trade Volume" },
      { value: "2.1 Days", label: "Avg Matching Speed" }
    ]
  },
  {
    id: "finance",
    name: "Finance & Credit Ledger",
    column: "right",
    icon: Wallet,
    x: 990,
    y: 510,
    metric: "$4.2M Paid Directly",
    workflow: "Trade Delivery ➔ Credit Score ➔ Direct Wallet Payout",
    description: "Processes premium payouts, carbon credits, and micro-loans directly to mobile wallets.",
    capabilities: [
      "Digital Wallets",
      "Agronomic Credit Score",
      "Direct Mobile Payouts"
    ],
    receives: [
      "Trade Settlement Orders",
      "Sowing & Agronomic Records",
      "ESG Verified Offsets"
    ],
    processes: [
      "Agronomic Credit Scoring",
      "Direct Payout Verification",
      "Premium Multiplier Math"
    ],
    produces: [
      "Direct Mobile Receipts",
      "Approved Micro-Loans",
      "ESG Premium Disbursements"
    ],
    feeds: [
      "Farmer Portal & Extension",
      "Carbon MRV & ESG"
    ],
    shortDescription: "Processes direct premium payouts, carbon offsets, and micro-loans to mobile wallets.",
    pipeline: ["Trade Settlements", "Credit Score Audit", "Carbon Premium Math", "Wallet Transfer", "Farmer Portal"],
    inputs: ["Trade Orders", "Agronomic Profiles", "ESG Verified Offsets"],
    processing: ["Credit Scoring Engine", "Payout Verification", "Premium Math"],
    outputs: ["Direct Wallet Credits", "Micro-Loan Approvals", "ESG Payouts"],
    usedBy: ["Farmer Portal & Extension", "Carbon MRV & ESG"],
    impact: [
      { value: "$4.2M", label: "Paid Directly" },
      { value: "28,400", label: "Mobile Wallets Setup" },
      { value: "$180", label: "Avg Grower Lift" }
    ]
  },
  {
    id: "carbon",
    name: "Carbon MRV & ESG",
    column: "right",
    icon: Leaf,
    x: 1270,
    y: 350,
    metric: "24,000 mt CO2e Offset",
    workflow: "Forest Canopy ➔ Credit Generation ➔ Verified Registry",
    description: "Tracks carbon absorption rates across forest boundaries to issue certified green credits.",
    capabilities: [
      "Emissions & Sequestration MRV",
      "Carbon Premium Payments",
      "Certified ESG Reports"
    ],
    receives: [
      "Mapped Hectares Registry",
      "Trade Settlement Orders",
      "Direct Mobile Payout Receipts"
    ],
    processes: [
      "Biomass Sequestration MRV",
      "AWD Methane Audits",
      "ESG Performance Scoring"
    ],
    produces: [
      "Certified ESG Reports",
      "Registered Carbon Offsets",
      "ESG Premium Multipliers"
    ],
    feeds: [
      "Finance & Credit Ledger"
    ],
    shortDescription: "Tracks carbon absorption rates across forest boundaries to issue certified green offset credits.",
    pipeline: ["Forest Boundary", "Biomass Scan", "AWD Carbon Credits", "ESG Registry Audit", "Finance Disbursements"],
    inputs: ["Mapped Hectares Registry", "Trade Orders", "Direct Payout Receipts"],
    processing: ["Biomass Calculations", "AWD Methane Audits", "ESG scoring"],
    outputs: ["Certified ESG Reports", "Carbon Offsets", "ESG Premium math"],
    usedBy: ["Finance & Credit Ledger"],
    impact: [
      { value: "24,000 mt", label: "CO2e Certified" },
      { value: "$144k", label: "Carbon Payments" },
      { value: "100%", label: "Audit Trail Verity" }
    ]
  }
];

const BACKGROUND_IMAGES: Record<string, string> = {
  farmer: "/images/ecosystem/farmer_portal_bg.png",
  traceability: "/images/ecosystem/traceability_bg.png",
  gis: "/images/ecosystem/gis_monitoring_bg.png",
  ai: "/images/ecosystem/ai_predictions_bg.png",
  marketplace: "/images/ecosystem/marketplace_bg.png",
  finance: "/images/ecosystem/finance_credit_bg.png",
  carbon: "/images/ecosystem/carbon_mrv_bg.png"
};

const MOBILE_POPUP_IMAGES: Record<string, string> = {
  farmer: "/images/ecosystem/user_farmer_3d.jpg",
  traceability: "/images/ecosystem/user_traceability_3d.jpg",
  gis: "/images/ecosystem/user_gis_3d.jpg",
  ai: "/images/ecosystem/user_gis_3d.jpg",
  marketplace: "/images/ecosystem/user_traceability_3d.jpg",
  finance: "/images/ecosystem/user_farmer_3d.jpg",
  carbon: "/images/ecosystem/user_gis_3d.jpg"
};

const HUB_DESKTOP = { x: 720, y: 350 };
const NODE_CATEGORIES = ["Onboarding", "Logistics", "GIS Maps", "AI Models", "Agri Trade", "Micro Credit", "ESG Offsets"];

export function DataGreenEngine() {
  // Desktop Interaction State
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // Mobile / Tablet Interaction State
  const [selectedSliceIndex, setSelectedSliceIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlice = selectedSliceIndex === 999 
    ? {
        id: "hub",
        name: "Data Green Core OS",
        metric: "Central OS Router",
        shortDescription: "The central data router and coordination layer of SourceTrace, unifying all nodes into a single responsive agricultural operating system.",
        capabilities: [
          "Unified Data Schema Routing",
          "Real-time Telemetry Processing",
          "Cross-Module Flow Tracing"
        ],
        icon: ShieldCheck,
        bgImage: "/images/ecosystem/user_farmer_3d.jpg"
      }
    : selectedSliceIndex !== null && selectedSliceIndex >= 0 && selectedSliceIndex < SLICES.length ? {
        ...SLICES[selectedSliceIndex],
        bgImage: MOBILE_POPUP_IMAGES[SLICES[selectedSliceIndex].id]
      } : null;

  // Auto-center the desktop horizontal scroll on mount (legacy backup behavior)
  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      const scrollOffset = (1440 - el.clientWidth) / 2;
      el.scrollLeft = scrollOffset;
    }
  }, []);

  // Pathway Glow Logic for Desktop
  const isPathActiveDesktop = (pathId: string) => {
    if (hoveredSlice === null) return false;
    const activeWorkflow = SLICES[hoveredSlice].id;
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

  const getOutlineColorDesktop = (id: string) => {
    return (hoveredSlice !== null && SLICES[hoveredSlice].id === id) ? "#10b981" : "rgba(0, 77, 38, 0.15)";
  };

  // Helper for mobile/tablet to check active paths chronologically
  const isPathActiveMobile = (toIndex: number) => {
    if (selectedSliceIndex === null) return false;
    return selectedSliceIndex >= toIndex;
  };

  return (
    <div className="relative w-full pt-10 pb-20 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#f9faf9] to-[#eef5ef] text-gray-900 select-none overflow-hidden">
      
      {/* ── SECTION HEADER ── */}
      <div className="text-center mb-8 max-w-3xl z-10">
        <span className="font-extrabold tracking-widest uppercase mb-2 block text-[#004D26] text-xs md:text-sm">Data Green Operating System</span>
        <h2 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-[#004D26]">
          Connected Agriculture Ecosystem Map
        </h2>
        <p className="text-xs md:text-base leading-relaxed text-gray-600 px-4 md:px-0">
          Trace how SourceTrace coordinates the agricultural value chain. Tap or hover nodes to trace the active data journey.
        </p>
      </div>

      {/* ── 1. MOBILE INTERACTIVE NAVIGATOR (under 768px) ── */}
      <div className="block md:hidden w-full max-w-[390px] mx-auto relative z-20">
        <div className="w-full aspect-[390/400] relative bg-white/40 border border-emerald-800/5 rounded-3xl shadow-sm p-4 overflow-hidden">
          
          {/* Mobile SVG Canvas (draws connecting lines, centerpiece hub, and satellite nodes) */}
          <svg viewBox="0 0 390 400" className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
            <defs>
              <style>{`
                @keyframes flow-active-mob {
                  to { stroke-dashoffset: -20; }
                }
                .flow-path-active-mob {
                  stroke-dasharray: 6 6;
                  animation: flow-active-mob 1.5s linear infinite;
                }
                @keyframes pulse-slow {
                  0%, 100% { transform: scale(1); box-shadow: 0 8px 32px rgba(16,185,129,0.15); }
                  50% { transform: scale(1.04); box-shadow: 0 12px 40px rgba(16,185,129,0.3); }
                }
                .animate-pulse-slow {
                  animation: pulse-slow 4s infinite ease-in-out;
                }
              `}</style>
            </defs>

            {/* Connecting Pathways between nodes (clockwise circular flow) */}
            {/* Farmer (100, 285) -> Traceability (60, 190) */}
            <line x1="100" y1="285" x2="60" y2="190" stroke={isPathActiveMobile(1) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(1) ? "3" : "1.2"} />
            {isPathActiveMobile(1) && <line x1="100" y1="285" x2="60" y2="190" stroke="#10b981" strokeWidth="3" className="flow-path-active-mob" />}

            {/* Traceability (60, 190) -> GIS (100, 95) */}
            <line x1="60" y1="190" x2="100" y2="95" stroke={isPathActiveMobile(2) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(2) ? "3" : "1.2"} />
            {isPathActiveMobile(2) && <line x1="60" y1="190" x2="100" y2="95" stroke="#10b981" strokeWidth="3" className="flow-path-active-mob" />}

            {/* GIS (100, 95) -> AI (195, 55) */}
            <line x1="100" y1="95" x2="195" y2="55" stroke={isPathActiveMobile(3) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(3) ? "3" : "1.2"} />
            {isPathActiveMobile(3) && <line x1="100" y1="95" x2="195" y2="55" stroke="#10b981" strokeWidth="3" className="flow-path-active-mob" />}

            {/* AI (195, 55) -> Marketplace (290, 95) */}
            <line x1="195" y1="55" x2="290" y2="95" stroke={isPathActiveMobile(4) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(4) ? "3" : "1.2"} />
            {isPathActiveMobile(4) && <line x1="195" y1="55" x2="290" y2="95" stroke="#10b981" strokeWidth="3" className="flow-path-active-mob" />}

            {/* Marketplace (290, 95) -> Finance (330, 190) */}
            <line x1="290" y1="95" x2="330" y2="190" stroke={isPathActiveMobile(5) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(5) ? "3" : "1.2"} />
            {isPathActiveMobile(5) && <line x1="290" y1="95" x2="330" y2="190" stroke="#10b981" strokeWidth="3" className="flow-path-active-mob" />}

            {/* Finance (330, 190) -> Carbon (290, 285) */}
            <line x1="330" y1="190" x2="290" y2="285" stroke={isPathActiveMobile(6) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(6) ? "3" : "1.2"} />
            {isPathActiveMobile(6) && <line x1="330" y1="190" x2="290" y2="285" stroke="#10b981" strokeWidth="3" className="flow-path-active-mob" />}

            {/* Return Loop: Carbon (290, 285) -> Farmer (100, 285) */}
            <path d="M 290 285 C 240 325 150 325 100 285" fill="none" stroke={selectedSliceIndex !== null ? "#10b981" : "rgba(0, 77, 38, 0.04)"} strokeWidth={selectedSliceIndex !== null ? "2.5" : "1.2"} strokeDasharray="4 4" className={selectedSliceIndex !== null ? "flow-path-active-mob" : ""} />

            {/* Concentric subtle green orbits behind hub (40% Larger centerpiece rings) */}
            <circle cx="195" cy="190" r="105" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
            <circle cx="195" cy="190" r="90" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="1" strokeDasharray="6 8" className="animate-spin" style={{ animationDuration: "18s", transformOrigin: "195px 190px" }} />
            <circle cx="195" cy="190" r="75" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" />

            {/* Radial Dashboard links from center (195, 190) to active selected node */}
            {SLICES.map((s, i) => {
              const active = selectedSliceIndex === i;
              const coords = [
                { x: 100, y: 285 }, // Farmer
                { x: 60, y: 190 },  // Traceability
                { x: 100, y: 95 },  // GIS
                { x: 195, y: 55 },  // AI
                { x: 290, y: 95 },  // Marketplace
                { x: 330, y: 190 }, // Finance
                { x: 290, y: 285 }  // Carbon
              ][i];

              return (
                <line
                  key={`radial-mob-${s.id}`}
                  x1="195"
                  y1="190"
                  x2={coords.x}
                  y2={coords.y}
                  stroke={active ? "#10b981" : "rgba(16, 185, 129, 0.04)"}
                  strokeWidth={active ? "2" : "1"}
                  strokeDasharray="3 3"
                />
              );
            })}

            {/* ── Dominant Data Green Central Hub (40% Larger Centerpiece) ── */}
            <foreignObject
              x="137" // 195 - 58
              y="132" // 190 - 58
              width="116"
              height="116"
              style={{ overflow: "visible" }}
              className="pointer-events-auto"
            >
              <button
                onClick={() => setSelectedSliceIndex(selectedSliceIndex === 999 ? null : 999)}
                className="w-[116px] h-[116px] rounded-full bg-white border-4 border-[#10b981] flex flex-col items-center justify-center animate-pulse-slow shadow-[0_8px_32px_rgba(16,185,129,0.18)] transition-transform active:scale-95"
              >
                <ShieldCheck className="w-8 h-8 text-[#10b981] mb-0.5 animate-pulse" />
                <span className="text-[10.5px] font-black tracking-widest text-[#004D26] uppercase">DATA GREEN</span>
                <span className="text-[8.5px] font-black text-[#10b981] tracking-widest uppercase mt-0.5">CORE OS</span>
              </button>
            </foreignObject>

            {/* ── Surrounding Mobile Nodes (Symmetrical satellites orbiting center) ── */}
            {[
              { x: 100, y: 285, labelPos: "below" }, // Farmer
              { x: 60, y: 190, labelPos: "below" },  // Traceability
              { x: 100, y: 95, labelPos: "below" },  // GIS
              { x: 195, y: 55, labelPos: "above" },  // AI
              { x: 290, y: 95, labelPos: "below" },  // Marketplace
              { x: 330, y: 190, labelPos: "below" }, // Finance
              { x: 290, y: 285, labelPos: "below" }  // Carbon
            ].map((coords, i) => {
              const s = SLICES[i];
              const isSel = selectedSliceIndex === i;
              const dim = selectedSliceIndex !== null && !isSel;
              const NodeIcon = s.icon;

              return (
                <g key={`mob-node-group-${s.id}`}>
                  {/* Button Wrapper */}
                  <foreignObject
                    x={coords.x - 28}
                    y={coords.y - 28}
                    width="56"
                    height="56"
                    style={{ overflow: "visible" }}
                    className="pointer-events-auto"
                  >
                    <button
                      onClick={() => setSelectedSliceIndex(selectedSliceIndex === i ? null : i)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border shadow-sm ${
                        isSel
                          ? "bg-[#10b981] border-[#10b981] text-white scale-110 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                          : "bg-white border-emerald-800/15 text-[#004D26] hover:bg-emerald-50/50"
                      } ${dim ? "opacity-35" : "opacity-100"}`}
                    >
                      <NodeIcon className="w-[26px] h-[26px] shrink-0" />
                    </button>
                  </foreignObject>

                  {/* SVG Text Label */}
                  <text
                    x={coords.x}
                    y={coords.labelPos === "above" ? coords.y - 36 : coords.y + 44}
                    textAnchor="middle"
                    className={`transition-all duration-300 pointer-events-none ${dim ? "opacity-35" : "opacity-100"}`}
                  >
                    <tspan
                      x={coords.x}
                      dy="0"
                      className={`text-[10px] font-black uppercase tracking-wider ${isSel ? "fill-[#10b981]" : "fill-[#004D26]"}`}
                      style={{ fontFamily: "inherit" }}
                    >
                      {s.id === "farmer" ? "Farmer Portal" : s.id === "traceability" ? "Traceability" : s.id === "gis" ? "GIS Mapping" : s.id === "ai" ? "AI Predictions" : s.id === "marketplace" ? "Marketplace" : s.id === "finance" ? "Finance Ledger" : "Carbon & ESG"}
                    </tspan>
                    <tspan
                      x={coords.x}
                      dy="11"
                      className="text-[8px] font-bold fill-gray-400 uppercase tracking-widest"
                      style={{ fontFamily: "inherit" }}
                    >
                      {NODE_CATEGORIES[i]}
                    </tspan>
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Action helper text */}
        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
          {selectedSliceIndex === null ? "Tap any module to view details and data connections" : "Tap backdrop or close bottom sheet to reset"}
        </p>
      </div>

      {/* ── MOBILE SLIDING BOTTOM SHEET ── */}
      {selectedSliceIndex !== null && currentSlice && (
        <>
          {/* Backdrop overlay */}
          <div
            onClick={() => setSelectedSliceIndex(null)}
            className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 block md:hidden"
          />

          {/* Sheet Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[28px] border-t border-emerald-100 shadow-[0_-12px_36px_rgba(0,0,0,0.12)] z-50 transition-all duration-300 ease-out transform block md:hidden max-h-[65vh] overflow-hidden"
          >
            {/* 1. Visual Banner Image (Top) */}
            <div className="relative w-full h-[130px] overflow-hidden border-b border-emerald-50">
              <img
                src={currentSlice.bgImage}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedSliceIndex(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-emerald-800/10 flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm shrink-0 active:scale-95 transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Content Area */}
            <div className="px-5 pt-4 pb-6">
              {/* Header Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#004D26] text-white flex items-center justify-center shrink-0 shadow-sm">
                  {React.createElement(currentSlice.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-base font-black tracking-wider text-[#004D26] uppercase leading-tight">
                    {currentSlice.name}
                  </h3>
                  <span className="inline-block bg-emerald-50 text-[#10b981] text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mt-1">
                    {currentSlice.metric}
                  </span>
                </div>
              </div>

              {/* Brief Description */}
              <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-4">
                {currentSlice.shortDescription}
              </p>

              {/* Capabilities Points */}
              <div className="mb-5 flex flex-col gap-2 bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                {currentSlice.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-gray-700 uppercase">
                    <Check className="w-4 h-4 text-[#10b981] shrink-0 stroke-[3]" />
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full bg-[#004D26] hover:bg-[#00381b] active:scale-[0.99] text-white font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </>
      )}


      {/* ── 2. TABLET INTERACTIVE NAVIGATOR (768px – 1199px) ── */}
      <div className="hidden md:block xl:hidden w-full max-w-[720px] mx-auto relative z-20">
        <div className="w-full aspect-[720/430] relative bg-white/40 border border-emerald-800/5 rounded-3xl shadow-sm p-4 overflow-hidden">
          
          {/* Tablet SVG Canvas */}
          <svg viewBox="0 0 720 430" className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
            <defs>
              <style>{`
                @keyframes flow-active-tab {
                  to { stroke-dashoffset: -24; }
                }
                .flow-path-active-tab {
                  stroke-dasharray: 8 8;
                  animation: flow-active-tab 1.5s linear infinite;
                }
              `}</style>
            </defs>

            {/* Symmetrical Tablet Connecting Pathways */}
            {/* Farmer (254, 326) -> Traceability (210, 220) */}
            <line x1="254" y1="326" x2="210" y2="220" stroke={isPathActiveMobile(1) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(1) ? "3" : "1.2"} />
            {isPathActiveMobile(1) && <line x1="254" y1="326" x2="210" y2="220" stroke="#10b981" strokeWidth="3" className="flow-path-active-tab" />}

            {/* Traceability (210, 220) -> GIS (254, 114) */}
            <line x1="210" y1="220" x2="254" y2="114" stroke={isPathActiveMobile(2) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(2) ? "3" : "1.2"} />
            {isPathActiveMobile(2) && <line x1="210" y1="220" x2="254" y2="114" stroke="#10b981" strokeWidth="3" className="flow-path-active-tab" />}

            {/* GIS (254, 114) -> AI (360, 70) */}
            <line x1="254" y1="114" x2="360" y2="70" stroke={isPathActiveMobile(3) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(3) ? "3" : "1.2"} />
            {isPathActiveMobile(3) && <line x1="254" y1="114" x2="360" y2="70" stroke="#10b981" strokeWidth="3" className="flow-path-active-tab" />}

            {/* AI (360, 70) -> Marketplace (466, 114) */}
            <line x1="360" y1="70" x2="466" y2="114" stroke={isPathActiveMobile(4) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(4) ? "3" : "1.2"} />
            {isPathActiveMobile(4) && <line x1="360" y1="70" x2="466" y2="114" stroke="#10b981" strokeWidth="3" className="flow-path-active-tab" />}

            {/* Marketplace (466, 114) -> Finance (510, 220) */}
            <line x1="466" y1="114" x2="510" y2="220" stroke={isPathActiveMobile(5) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(5) ? "3" : "1.2"} />
            {isPathActiveMobile(5) && <line x1="466" y1="114" x2="510" y2="220" stroke="#10b981" strokeWidth="3" className="flow-path-active-tab" />}

            {/* Finance (510, 220) -> Carbon (466, 326) */}
            <line x1="510" y1="220" x2="466" y2="326" stroke={isPathActiveMobile(6) ? "#10b981" : "rgba(0, 77, 38, 0.08)"} strokeWidth={isPathActiveMobile(6) ? "3" : "1.2"} />
            {isPathActiveMobile(6) && <line x1="510" y1="220" x2="466" y2="326" stroke="#10b981" strokeWidth="3" className="flow-path-active-tab" />}

            {/* Return loop for tablet */}
            <path d="M 466 326 C 410 365 310 365 254 326" fill="none" stroke={selectedSliceIndex !== null ? "#10b981" : "rgba(0, 77, 38, 0.04)"} strokeWidth={selectedSliceIndex !== null ? "2.5" : "1.2"} strokeDasharray="5 5" className={selectedSliceIndex !== null ? "flow-path-active-tab" : ""} />

            {/* Concentric rings for tablet center */}
            <circle cx="360" cy="220" r="95" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
            <circle cx="360" cy="220" r="82" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="1" strokeDasharray="6 8" className="animate-spin" style={{ animationDuration: "20s", transformOrigin: "360px 220px" }} />
            <circle cx="360" cy="220" r="68" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1" />

            {/* Radial hub indicators */}
            {SLICES.map((s, i) => {
              const active = selectedSliceIndex === i;
              const coords = [
                { x: 254, y: 326 }, // Farmer
                { x: 210, y: 220 }, // Traceability
                { x: 254, y: 114 }, // GIS
                { x: 360, y: 70 },  // AI
                { x: 466, y: 114 }, // Marketplace
                { x: 510, y: 220 }, // Finance
                { x: 466, y: 326 }  // Carbon
              ][i];

              return (
                <line
                  key={`radial-tab-${s.id}`}
                  x1="360"
                  y1="220"
                  x2={coords.x}
                  y2={coords.y}
                  stroke={active ? "#10b981" : "rgba(16, 185, 129, 0.04)"}
                  strokeWidth={active ? "2" : "1"}
                  strokeDasharray="4 4"
                />
              );
            })}
            {/* ── Data Green Centerpiece (Tablet) ── */}
            <foreignObject
              x="304" // 360 - 56
              y="164" // 220 - 56
              width="112"
              height="112"
              style={{ overflow: "visible" }}
              className="pointer-events-auto"
            >
              <button
                onClick={() => setSelectedSliceIndex(selectedSliceIndex === 999 ? null : 999)}
                className="w-[112px] h-[112px] rounded-full bg-white border-4 border-[#10b981] flex flex-col items-center justify-center animate-pulse-slow shadow-[0_8px_32px_rgba(16,185,129,0.18)] transition-transform active:scale-95"
              >
                <ShieldCheck className="w-7 h-7 text-[#10b981] mb-1" />
                <span className="text-xs font-black tracking-widest text-[#004D26] uppercase">DATA GREEN</span>
                <span className="text-[9px] font-black text-[#10b981] tracking-widest uppercase mt-0.5">CORE OS</span>
              </button>
            </foreignObject>

            {/* ── Symmetrical Tablet Nodes ── */}
            {[
              { x: 254, y: 326, labelPos: "below" }, // Farmer
              { x: 210, y: 220, labelPos: "below" }, // Traceability
              { x: 254, y: 114, labelPos: "below" }, // GIS
              { x: 360, y: 70, labelPos: "above" },  // AI
              { x: 466, y: 114, labelPos: "below" }, // Marketplace
              { x: 510, y: 220, labelPos: "below" }, // Finance
              { x: 466, y: 326, labelPos: "below" }  // Carbon
            ].map((coords, i) => {
              const s = SLICES[i];
              const isSel = selectedSliceIndex === i;
              const dim = selectedSliceIndex !== null && !isSel;
              const NodeIcon = s.icon;

              return (
                <g key={`tab-node-group-${s.id}`}>
                  {/* Button Wrapper */}
                  <foreignObject
                    x={coords.x - 30}
                    y={coords.y - 30}
                    width="60"
                    height="60"
                    style={{ overflow: "visible" }}
                    className="pointer-events-auto"
                  >
                    <button
                      onClick={() => setSelectedSliceIndex(selectedSliceIndex === i ? null : i)}
                      className={`w-15 h-15 rounded-full flex items-center justify-center transition-all duration-300 border shadow-sm ${
                        isSel
                          ? "bg-[#10b981] border-[#10b981] text-white scale-110 shadow-[0_0_18px_rgba(16,185,129,0.45)]"
                          : "bg-white border-emerald-800/15 text-[#004D26] hover:bg-emerald-50/50"
                      } ${dim ? "opacity-35" : "opacity-100"}`}
                    >
                      <NodeIcon className="w-6 h-6 shrink-0" />
                    </button>
                  </foreignObject>

                  {/* SVG Text Label */}
                  <text
                    x={coords.x}
                    y={coords.labelPos === "above" ? coords.y - 38 : coords.y + 46}
                    textAnchor="middle"
                    className={`transition-all duration-300 pointer-events-none ${dim ? "opacity-35" : "opacity-100"}`}
                  >
                    <tspan
                      x={coords.x}
                      dy="0"
                      className={`text-[10px] font-black uppercase tracking-wider ${isSel ? "fill-[#10b981]" : "fill-[#004D26]"}`}
                      style={{ fontFamily: "inherit" }}
                    >
                      {s.id === "farmer" ? "Farmer Portal" : s.id === "traceability" ? "Traceability" : s.id === "gis" ? "GIS Mapping" : s.id === "ai" ? "AI Predictions" : s.id === "marketplace" ? "Marketplace" : s.id === "finance" ? "Finance Ledger" : "Carbon & ESG"}
                    </tspan>
                    <tspan
                      x={coords.x}
                      dy="11"
                      className="text-[8px] font-bold fill-gray-400 uppercase tracking-widest"
                      style={{ fontFamily: "inherit" }}
                    >
                      {NODE_CATEGORIES[i]}
                    </tspan>
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Tablet Floating details card (appears at bottom of tablet view) */}
        <div className="mt-6 min-h-[120px] transition-all duration-300">
          {selectedSliceIndex !== null && currentSlice ? (
            <div className="bg-white border border-emerald-800/10 rounded-3xl shadow-sm transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row min-h-[220px]">
              
              {/* Left Column: Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                    <div className="w-9 h-9 rounded-xl bg-[#004D26] text-white flex items-center justify-center shrink-0 shadow-sm">
                      {React.createElement(currentSlice.icon, { className: "w-5 h-5" })}
                    </div>
                    <div>
                      <h3 className="text-base font-black tracking-wider text-[#004D26] uppercase leading-tight">
                        {currentSlice.name}
                      </h3>
                      <span className="inline-block bg-emerald-50 text-[#10b981] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mt-1">
                        {currentSlice.metric}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-4">
                    {currentSlice.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                    {currentSlice.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-700 uppercase">
                        <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <button className="bg-[#004D26] hover:bg-[#00381b] active:scale-[0.99] text-white font-extrabold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Full-Bleed Illustration */}
              <div className="hidden md:block w-[240px] relative overflow-hidden border-l border-emerald-100">
                <img
                  src={currentSlice.bgImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* Floating Close Button */}
                <button
                  onClick={() => setSelectedSliceIndex(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-emerald-800/10 flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm shrink-0 active:scale-95 transition-all z-20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-emerald-50/20 border border-emerald-800/5 rounded-3xl p-6 text-center text-gray-500 font-semibold text-xs py-8">
              Tap any circular node on the map above to view platform capabilities and data flows.
            </div>
          )}
        </div>
      </div>


      {/* ── 3. FLAGSHIP DESKTOP MAP VIEWPORT (1200px+ / xl:flex) ── */}
      <div className="hidden xl:flex w-full max-w-[1440px] flex-col items-center z-10">
        
        {/* Column Stage Headers */}
        <div className="w-full grid grid-cols-3 text-center mb-6 border-b border-emerald-800/10 pb-4">
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

        {/* Widescreen Interactive Canvas */}
        <div className="w-full h-[700px] relative">
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

            {/* ── DESKTOP BACKGROUND DRAWINGS ── */}
            {/* Origins Context (Left) */}
            <g className="transition-all duration-300">
              <g transform="translate(45, 275) scale(0.7)">
                <path d="M0,15 L0,35 L25,35 L25,15 L12.5,3 Z" fill="none" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1.2" />
                <line x1="8" y1="35" x2="8" y2="27" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1.2" />
              </g>
              <g transform="translate(80, 310) scale(0.6)">
                <path d="M0,15 L0,35 L25,35 L25,15 L12.5,3 Z" fill="none" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1.2" />
              </g>
              <g transform="translate(130, 260) scale(0.8)">
                <line x1="0" y1="0" x2="-12" y2="40" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1.5" />
                <line x1="0" y1="0" x2="12" y2="40" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.5" fill={getOutlineColorDesktop("farmer")} />
              </g>
              <g transform="translate(10, 420) scale(0.9)">
                <rect x="0" y="0" width="16" height="28" rx="2" fill="none" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1.5" />
                <line x1="4" y1="6" x2="12" y2="6" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1" />
                <line x1="4" y1="12" x2="12" y2="12" stroke={getOutlineColorDesktop("farmer")} strokeWidth="1" />
              </g>
            </g>

            {/* Traceability Context */}
            <g transform="translate(370, 145) scale(0.85)" className="transition-all duration-300">
              <path d="M0,20 L0,45 L50,45 L50,20 L25,4 Z" fill="none" stroke={getOutlineColorDesktop("traceability")} strokeWidth="1.5" />
              <rect x="18" y="26" width="14" height="19" fill="none" stroke={getOutlineColorDesktop("traceability")} strokeWidth="1" />
              <rect x="-10" y="42" width="15" height="3" fill={getOutlineColorDesktop("traceability")} />
            </g>

            {/* GIS Context */}
            <g className="transition-all duration-300">
              <polygon points="320,480 440,460 470,520 350,540" fill="none" stroke={getOutlineColorDesktop("gis")} strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="460,450 540,440 560,490 480,510" fill="none" stroke={getOutlineColorDesktop("gis")} strokeWidth="1" strokeDasharray="3 3" />
              <polyline points="290,490 310,535 340,580" fill="none" stroke={hoveredSlice === 2 ? "#ef4444" : "rgba(239, 68, 68, 0.15)"} strokeWidth="1.5" strokeDasharray="4 2" />
            </g>

            {/* Orbiting Satellite */}
            <g transform="translate(450, 40) scale(0.8)" className="transition-all duration-300">
              <circle cx="0" cy="0" r="10" fill="none" stroke={getOutlineColorDesktop("gis")} strokeWidth="1.5" />
              <rect x="-18" y="-3" width="36" height="6" fill="none" stroke={getOutlineColorDesktop("gis")} strokeWidth="1" rx="1" />
              <rect x="-26" y="-8" width="8" height="16" fill="none" stroke={getOutlineColorDesktop("gis")} strokeWidth="1" rx="1" />
            </g>

            {/* AI Predictions Context */}
            <g className="transition-all duration-300">
              <path d="M 680,240 Q 710,210 740,230 T 780,180" fill="none" stroke={getOutlineColorDesktop("ai")} strokeWidth="2" />
              <circle cx="780" cy="180" r="3" fill={getOutlineColorDesktop("ai")} />
              <g transform="translate(700, 20) scale(0.9)">
                <path d="M10,12 A5,5 0 0,1 18,8 A7,7 0 0,1 30,10 A5,5 0 0,1 36,16 L10,16 Z" fill="none" stroke={getOutlineColorDesktop("ai")} strokeWidth="1.2" />
              </g>
            </g>

            {/* Marketplace Context */}
            <g className="transition-all duration-300">
              <g transform="translate(1015, 145) scale(0.85)">
                <rect x="0" y="8" width="13" height="34" rx="1" fill="none" stroke={getOutlineColorDesktop("marketplace")} strokeWidth="1.3" />
                <path d="M0,8 C0,2 13,2 13,8" fill="none" stroke={getOutlineColorDesktop("marketplace")} strokeWidth="1.3" />
                <rect x="17" y="3" width="13" height="39" rx="1" fill="none" stroke={getOutlineColorDesktop("marketplace")} strokeWidth="1.3" />
                <path d="M36,18 L50,8 L64,18 L64,42 L36,42 Z" fill="none" stroke={getOutlineColorDesktop("marketplace")} strokeWidth="1.3" />
              </g>
              <g transform="translate(1270, 515) scale(0.9)">
                <path d="M0,20 L60,20 L72,6 L12,6 Z" fill="none" stroke={getOutlineColorDesktop("marketplace")} strokeWidth="1.5" />
              </g>
            </g>

            {/* Finance Vault Context */}
            <g transform="translate(1005, 465) scale(0.85)" className="transition-all duration-300">
              <polygon points="20,0 0,10 40,10" fill="none" stroke={getOutlineColorDesktop("finance")} strokeWidth="1.5" />
              <rect x="4" y="10" width="32" height="24" fill="none" stroke={getOutlineColorDesktop("finance")} strokeWidth="1.5" />
              <line x1="10" y1="10" x2="10" y2="34" stroke={getOutlineColorDesktop("finance")} strokeWidth="1.2" />
              <line x1="20" y1="10" x2="20" y2="34" stroke={getOutlineColorDesktop("finance")} strokeWidth="1.2" />
              <rect x="0" y="34" width="40" height="4" fill={getOutlineColorDesktop("finance")} />
            </g>

            {/* Carbon Canopy Context */}
            <g className="transition-all duration-300">
              <g transform="translate(1220, 260) scale(0.8)">
                <polygon points="0,-18 -8,4 8,4" fill="none" stroke={getOutlineColorDesktop("carbon")} strokeWidth="1.2" />
                <rect x="-1" y="4" width="2" height="4" fill={getOutlineColorDesktop("carbon")} />
              </g>
              <g transform="translate(1250, 245) scale(0.95)">
                <polygon points="0,-18 -8,4 8,4" fill="none" stroke={getOutlineColorDesktop("carbon")} strokeWidth="1.2" />
                <rect x="-1" y="4" width="2" height="4" fill={getOutlineColorDesktop("carbon")} />
              </g>
            </g>

            {/* ── CORE DESKTOP PATHWAYS ── */}
            {/* Path 1: Farmer -> Traceability */}
            <path id="path-farmer-traceability" d="M 170,350 L 450,190" fill="none"
              stroke={isPathActiveDesktop("farmer-traceability") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActiveDesktop("farmer-traceability") ? 3.5 : 1.2}
              strokeDasharray={isPathActiveDesktop("farmer-traceability") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 2: Traceability -> GIS */}
            <path id="path-traceability-gis" d="M 450,190 L 450,510" fill="none"
              stroke={isPathActiveDesktop("traceability-gis") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActiveDesktop("traceability-gis") ? 3.5 : 1.2}
              strokeDasharray={isPathActiveDesktop("traceability-gis") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 3: GIS -> AI */}
            <path id="path-gis-ai" d="M 450,510 L 720,130" fill="none"
              stroke={isPathActiveDesktop("gis-ai") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActiveDesktop("gis-ai") ? 3.5 : 1.2}
              strokeDasharray={isPathActiveDesktop("gis-ai") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 4: AI -> Marketplace */}
            <path id="path-ai-marketplace" d="M 720,130 L 990,190" fill="none"
              stroke={isPathActiveDesktop("ai-marketplace") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActiveDesktop("ai-marketplace") ? 3.5 : 1.2}
              strokeDasharray={isPathActiveDesktop("ai-marketplace") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 5: Marketplace -> Finance */}
            <path id="path-marketplace-finance" d="M 990,190 L 990,510" fill="none"
              stroke={isPathActiveDesktop("marketplace-finance") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActiveDesktop("marketplace-finance") ? 3.5 : 1.2}
              strokeDasharray={isPathActiveDesktop("marketplace-finance") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 6: Finance -> Carbon */}
            <path id="path-finance-carbon" d="M 990,510 L 1270,350" fill="none"
              stroke={isPathActiveDesktop("finance-carbon") ? "#10b981" : "rgba(0, 77, 38, 0.15)"}
              strokeWidth={isPathActiveDesktop("finance-carbon") ? 3.5 : 1.2}
              strokeDasharray={isPathActiveDesktop("finance-carbon") ? "none" : "3 4"}
              className="transition-all duration-300" />

            {/* Path 7: Payout Loop */}
            <path id="path-carbon-payout" d="M 1270,350 C 720,680 170,680 170,350" fill="none"
              stroke={isPathActiveDesktop("carbon-payout") ? "#10b981" : "rgba(0, 77, 38, 0.08)"}
              strokeWidth={isPathActiveDesktop("carbon-payout") ? 3.5 : 1.2}
              strokeDasharray={isPathActiveDesktop("carbon-payout") ? "none" : "5 5"}
              className="transition-all duration-300" />

            {/* Radial Hub Connections */}
            <path id="path-hub-farmer" d="M 720,350 L 170,350" fill="none"
              stroke={isPathActiveDesktop("hub-farmer") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActiveDesktop("hub-farmer") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-traceability" d="M 720,350 L 450,190" fill="none"
              stroke={isPathActiveDesktop("hub-traceability") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActiveDesktop("hub-traceability") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-gis" d="M 720,350 L 450,510" fill="none"
              stroke={isPathActiveDesktop("hub-gis") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActiveDesktop("hub-gis") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-ai" d="M 720,350 L 720,130" fill="none"
              stroke={isPathActiveDesktop("hub-ai") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActiveDesktop("hub-ai") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-marketplace" d="M 720,350 L 990,190" fill="none"
              stroke={isPathActiveDesktop("hub-marketplace") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActiveDesktop("hub-marketplace") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-finance" d="M 720,350 L 990,510" fill="none"
              stroke={isPathActiveDesktop("hub-finance") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActiveDesktop("hub-finance") ? 2.5 : 1}
              strokeDasharray="4 4" />

            <path id="path-hub-carbon" d="M 720,350 L 1270,350" fill="none"
              stroke={isPathActiveDesktop("hub-carbon") ? "#10b981" : "rgba(16, 185, 129, 0.08)"}
              strokeWidth={isPathActiveDesktop("hub-carbon") ? 2.5 : 1}
              strokeDasharray="4 4" />

            {/* Ambient Conveyor Data Packets */}
            {hoveredSlice === null && (
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

            {/* Active flow animations on hover */}
            {isPathActiveDesktop("farmer-traceability") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 170,350 L 450,190" />
              </circle>
            )}
            {isPathActiveDesktop("traceability-gis") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450,190 L 450,510" />
              </circle>
            )}
            {isPathActiveDesktop("gis-ai") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450,510 L 720,130" />
              </circle>
            )}
            {isPathActiveDesktop("ai-marketplace") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 720,130 L 990,190" />
              </circle>
            )}
            {isPathActiveDesktop("marketplace-finance") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 990,190 L 990,510" />
              </circle>
            )}
            {isPathActiveDesktop("finance-carbon") && (
              <circle r="4.5" fill="#10b981" className="filter drop-shadow-sm">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 990,510 L 1270,350" />
              </circle>
            )}
            {isPathActiveDesktop("carbon-payout") && (
              <g>
                <circle r="5.5" fill="#10b981" className="filter drop-shadow-md">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 1270,350 C 720,680 170,680 170,350" />
                </circle>
                <text fill="#fff" fontSize="5.5" fontWeight="bold" textAnchor="middle" dy="2.0">
                  $
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 1270,350 C 720,680 170,680 170,350" />
                </text>
              </g>
            )}

            {SLICES.map((s, i) => {
              if (!isPathActiveDesktop(`hub-${s.id}`)) return null;
              return (
                <circle key={`hub-pulse-${i}`} r="3.5" fill="#10b981">
                  <animateMotion dur="1.4s" repeatCount="indefinite" path={`M 720,350 L ${s.x},${s.y}`} />
                </circle>
              );
            })}

            {/* Concentric rings behind hub */}
            <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="115" fill="none" stroke="rgba(16, 185, 129, 0.06)" strokeWidth="1" />
            <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="95" fill="none" stroke="#004D26" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" />
            
            <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y - 95} r="3" fill="#10b981" className="pulse-node-desk" />
            <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y + 95} r="3" fill="#10b981" className="pulse-node-desk" style={{ animationDelay: "1s" }} />
            <circle cx={HUB_DESKTOP.x - 95} cy={HUB_DESKTOP.y} r="3" fill="#10b981" className="pulse-node-desk" style={{ animationDelay: "0.5s" }} />
            <circle cx={HUB_DESKTOP.x + 95} cy={HUB_DESKTOP.y} r="3" fill="#10b981" className="pulse-node-desk" style={{ animationDelay: "1.5s" }} />

            <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="70" fill="#ffffff" stroke="#10b981" strokeWidth="4.5" className="filter drop-shadow-md" />
            <circle cx={HUB_DESKTOP.x} cy={HUB_DESKTOP.y} r="60" fill="rgba(16, 185, 129, 0.04)" />
            
            <text x={HUB_DESKTOP.x} y={HUB_DESKTOP.y - 12} textAnchor="middle" fill="#004D26" fontSize="12" fontWeight="900" letterSpacing="0.16em">DATA GREEN</text>
            <text x={HUB_DESKTOP.x} y={HUB_DESKTOP.y + 12} textAnchor="middle" fill="#10b981" fontSize="10.2" fontWeight="900" letterSpacing="0.1em">CORE OS</text>
            <text x={HUB_DESKTOP.x} y={HUB_DESKTOP.y + 26} textAnchor="middle" fill="gray" fontSize="6.5" fontWeight="bold" letterSpacing="0.08em">CENTRAL ROUTER</text>

            {/* ── Detailed Card ForeignObjects (Desktop) ── */}
            {SLICES.map((s, i) => {
              const isH = hoveredSlice === i;
              const dim = hoveredSlice !== null && !isH;
              const SliceIcon = s.icon;

              const W = 240, H = 220;
              const fx = s.x - W / 2;
              const fy = s.y - H / 2;

              return (
                <foreignObject key={`desk-${s.id}`} x={fx} y={fy} width={W} height={H} style={{ overflow: "visible" }}>
                  <div
                    onMouseEnter={() => setHoveredSlice(i)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    className={`w-full h-full rounded-2xl p-5 flex flex-col items-start justify-between text-left transition-all duration-300 border bg-white cursor-pointer relative overflow-hidden ${
                      isH
                        ? "border-[#10b981] shadow-[0_12px_36px_rgba(16,185,129,0.12)] scale-[1.03]"
                        : "border-emerald-800/8 shadow-[0_4px_20px_rgba(0,77,38,0.02)]"
                    } ${dim ? "opacity-35" : "opacity-100"}`}
                  >
                    {/* Goal 1: Generated Contextual Background Illustration (Subtle 4.5% Opacity) */}
                    <div className="absolute inset-0 z-0 opacity-[0.045] pointer-events-none flex items-center justify-center p-2">
                      <img
                        src={BACKGROUND_IMAGES[s.id]}
                        alt=""
                        className="w-[90%] h-[90%] object-contain"
                      />
                    </div>

                    <div className="w-full z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between w-full mb-3 border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: "#004D26" }}>
                            <SliceIcon className="w-5 h-5" />
                          </div>
                          <h4 className="text-base font-black tracking-wider text-[#004D26] uppercase leading-tight">{s.name}</h4>
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div className="flex flex-col gap-2 w-full mt-2.5">
                        {s.capabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                            <Check className="w-4 h-4 text-[#10b981] shrink-0 stroke-[3]" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metric Footer */}
                    <div className="w-full mt-3 pt-2 border-t border-gray-50 flex items-center justify-between z-10">
                      <span className="text-[9.5px] font-black uppercase text-gray-400 tracking-wider">{s.metric}</span>
                      {isH && (
                        <span className="text-[8px] font-black text-[#10b981] uppercase tracking-widest animate-pulse flex items-center gap-0.5">
                          <Activity className="w-3 h-3" />
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

        {/* Dynamic Workflow Story Teller Console (Desktop) */}
        <div className="w-full max-w-[1000px] items-center justify-center min-h-[64px] z-10 px-4 mt-8 flex">
          <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl px-6 py-3.5 text-center shadow-sm w-full transition-all duration-300">
            {hoveredSlice !== null ? (
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#10b981] mb-1 block">Active Operating System Workflow: {SLICES[hoveredSlice].name}</span>
                <div className="flex items-center justify-center gap-2 text-[#004D26] font-extrabold text-sm md:text-base leading-none uppercase">
                  <span>{SLICES[hoveredSlice].workflow}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-1.5 font-medium max-w-3xl mx-auto">{SLICES[hoveredSlice].description}</p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-black tracking-widest text-gray-400 mb-1 block">Data Green OS Status: Monitoring Ambient Flows</span>
                <p className="text-xs md:text-sm text-gray-500 font-semibold">Hover any module card above to trace the chronological data journey from farm onboarding to carbon outcomes.</p>
              </div>
            )}
          </div>
        </div>

      </div>


      {/* ── COMMON COMPLIANCE FOOTER (Visible on all breakpoints) ── */}
      <div className="w-full py-4 px-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-center mt-12 border border-emerald-800/10 shadow-sm max-w-5xl z-10 bg-white">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#10b981]" />
          <span className="font-extrabold text-sm md:text-base tracking-wider text-[#004D26]">SourceTrace Data Green OS</span>
        </div>
        <p className="text-xs font-semibold text-gray-600 max-w-xl md:text-right">
          Ensuring compliance, direct payout verification, and end-to-end supply chain transparency through a unified agricultural operating system.
        </p>
      </div>

    </div>
  );
}
