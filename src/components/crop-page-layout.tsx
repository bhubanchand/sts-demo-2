"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Sprout, Leaf, Map, Database, Cpu, Scale, Thermometer, 
  QrCode, CreditCard, CheckCircle2, ChevronRight, Sliders, 
  DollarSign, Activity, AlertTriangle, ArrowRight, Shield, 
  Info, Sparkles, Droplet, Layers, RefreshCw, Eye, Timer, 
  Wind, Lock, TreeDeciduous, ShieldAlert, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Crop specific data interfaces
export interface CropScene {
  title: string;
  description: string;
  visualType: "scale" | "map" | "ledger" | "scanner" | "calculator" | "lineage";
  interactiveTitle: string;
  interactiveDetails?: string;
  parameters?: Array<{ name: string; value: string; status?: "normal" | "warning" | "alert" }>;
}

export interface CropData {
  cropKey: string;
  title: string;
  logline: string;
  description: string;
  colors: {
    primary: string;      // main background / theme color
    accent: string;       // telemetry cyan/gold
    accentHex: string;
    bgHex: string;
    textHex: string;
  };
  scenes: CropScene[];
  stats: Array<{ label: string; value: string }>;
  imagePath: string;
  diagram?: string;
}

interface CropPageLayoutProps {
  data: CropData;
}

export function CropPageLayout({ data }: CropPageLayoutProps) {
  const [activeScene, setActiveScene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // General interactive states
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [weight, setWeight] = useState(0);
  const [isWeighed, setIsWeighed] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [payoutStatus, setPayoutStatus] = useState<"idle" | "processing" | "success">("idle");
  const [sliderVal1, setSliderVal1] = useState(50);
  const [sliderVal2, setSliderVal2] = useState(30);
  const [qrInput, setQrInput] = useState("");
  const [tracedBatch, setTracedBatch] = useState<any>(null);
  
  // Custom timers/counters
  const [sucrosePurity, setSucrosePurity] = useState(99.4);
  const [fansActive, setFansActive] = useState(false);
  const [siloTemp, setSiloTemp] = useState(26.4);
  const [conveyorRunning, setConveyorRunning] = useState(true);
  const [defectsDetected, setDefectsDetected] = useState(0);
  const [childLaborRisk, setChildLaborRisk] = useState("Compliant");
  const [radarHover, setRadarHover] = useState<string | null>(null);

  const cropKey = data.cropKey.toLowerCase().replace("-", "_");

  // Track active scene based on viewport scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll(".scrolly-scene");
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      setActiveScene(closestIdx);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset interactive widgets when switching scenes
  useEffect(() => {
    setPoints([]);
    setWeight(0);
    setIsWeighed(false);
    setIsScanned(false);
    setPayoutStatus("idle");
    setTracedBatch(null);
    setQrInput("");
    setDefectsDetected(0);
  }, [activeScene]);

  // Sugarcane sucrose decay simulation
  useEffect(() => {
    if (cropKey === "sugarcane" && activeScene === 0) {
      const interval = setInterval(() => {
        setSucrosePurity(p => {
          if (p <= 80) return 80;
          return parseFloat((p - 0.05).toFixed(2));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [cropKey, activeScene]);

  // Grains silo fans simulation
  useEffect(() => {
    if (cropKey === "grains" && activeScene === 2) {
      const interval = setInterval(() => {
        setSiloTemp(t => {
          if (fansActive) {
            return t > 18 ? parseFloat((t - 0.2).toFixed(1)) : 18;
          } else {
            return t < 28 ? parseFloat((t + 0.1).toFixed(1)) : 28;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [fansActive, cropKey, activeScene]);

  // Fruits & vegetables conveyor defect scanner simulation
  useEffect(() => {
    if (cropKey === "fruits_vegetables" && activeScene === 0 && conveyorRunning) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setDefectsDetected(d => d + 1);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [conveyorRunning, cropKey, activeScene]);

  // Polygon Area calculation
  const calculateArea = (): string => {
    if (points.length < 3) return "0.00";
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    return Math.abs(area / 200).toFixed(2);
  };

  // Simulate scale weighing
  const handleWeigh = (targetVal?: number) => {
    setIsWeighed(true);
    let current = 0;
    const target = targetVal || Math.floor(Math.random() * 40) + 50;
    const interval = setInterval(() => {
      current += Math.ceil((target - current) * 0.2);
      setWeight(current);
      if (current >= target) {
        setWeight(target);
        clearInterval(interval);
      }
    }, 40);
  };

  // Simulate digital payout
  const handlePayout = () => {
    setPayoutStatus("processing");
    setTimeout(() => {
      setPayoutStatus("success");
    }, 1500);
  };

  // Custom QR Search tracer database
  const handleQrSearch = (customId?: string) => {
    const id = (customId || qrInput).trim().toUpperCase();
    if (!id) return;

    let payload: any = {
      id,
      farmer: "Kamlesh Patel",
      location: "Madhya Pradesh, India",
      area: "1.8 ha",
      deforestationCheck: "CLEARED (Post-2020 intact)",
      yieldGrade: "Certified Organic (A+)",
      timestamp: new Date().toLocaleDateString()
    };

    if (cropKey === "cocoa") {
      payload = {
        id,
        farmer: "Koffi Yao",
        location: "Agboville, Côte d'Ivoire",
        area: "3.2 ha",
        deforestationCheck: "CLEARED (Zero park breach)",
        yieldGrade: "UTZ / RA Premium",
        timestamp: new Date().toLocaleDateString()
      };
    } else if (cropKey === "cotton") {
      payload = {
        id,
        farmer: "Sunita Bai",
        location: "Adilabad, Chetna Organic",
        area: "2.4 ha",
        deforestationCheck: "NOP/NPOP Verified",
        yieldGrade: "Long Staple Organic",
        timestamp: new Date().toLocaleDateString()
      };
    } else if (cropKey === "rubber") {
      payload = {
        id,
        farmer: "Somchai K.",
        location: "Surat Thani, Thailand",
        area: "4.1 ha",
        deforestationCheck: "FSC certified clean source",
        yieldGrade: "99.8% DRC Sheets",
        timestamp: new Date().toLocaleDateString()
      };
    } else if (cropKey === "seed_production") {
      payload = {
        id,
        farmer: "Dr. Ananya Rao",
        location: "Breeder Vault B-12",
        area: "Lab Lot #9042",
        deforestationCheck: "Genetic Lineage Pure",
        yieldGrade: "Foundation Breeder (98.5% Germ)",
        timestamp: new Date().toLocaleDateString()
      };
    }

    setTracedBatch(payload);
  };

  // Renders the specific interactive widget based on crop key and current act index
  const renderVisualWidget = () => {
    const scene = data.scenes[activeScene] || data.scenes[0];
    const isCoffee = cropKey === "coffee";
    const isCocoa = cropKey === "cocoa";
    const isCotton = cropKey === "cotton";
    const isRice = cropKey === "rice";
    const isTea = cropKey === "tea";
    const isSpices = cropKey === "spices";
    const isPalm = cropKey === "palm_oil";
    const isRubber = cropKey === "rubber";
    const isSugarcane = cropKey === "sugarcane";
    const isFruit = cropKey === "fruits_vegetables";
    const isGrains = cropKey === "grains";
    const isSeeds = cropKey === "seed_production";

    // Standard high-tech console wrapper
    const consoleHeader = (title: string, interfaceName: string) => (
      <div className="flex justify-between items-center mb-4 border-b border-emerald-900/30 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-[#53D769] animate-pulse" />
          {title}
        </span>
        <span className="text-[10px] text-gray-400 font-mono">{interfaceName}</span>
      </div>
    );

    /* ─── COFFEE WIDGETS ─── */
    if (isCoffee) {
      if (activeScene === 0) {
        // Act I: Sourcing Gaps Map
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Coffee Sourcing Map", "GPS Sat-Check")}
            <p className="text-xs text-gray-300 mb-4 font-mono">
              Hover over coordinate blocks to resolve smallholder data blindspots and verify origin parameters.
            </p>
            <div className="grid grid-cols-4 gap-2 bg-slate-950 p-4 border border-emerald-900/10 rounded-2xl relative">
              {Array.from({ length: 16 }).map((_, i) => {
                const isGap = i === 5 || i === 10;
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center border font-mono text-[9px] cursor-pointer transition-all ${
                      isGap 
                        ? "bg-red-950/40 border-red-500/30 text-red-400 hover:bg-red-500/20" 
                        : "bg-emerald-950/20 border-emerald-800/30 text-emerald-400 hover:bg-emerald-500/20"
                    }`}
                  >
                    <span>{isGap ? "GAP" : "VERIFIED"}</span>
                    <span className="text-[7px] text-gray-500">#{8900 + i}</span>
                  </div>
                );
              })}
            </div>
            <div className="bg-slate-900/50 p-4 border border-emerald-900/20 rounded-xl mt-4 text-xs font-mono">
              <span className="text-[10px] text-gray-400 uppercase block mb-1">Mapping Analytics</span>
              <div className="flex justify-between">
                <span>Verified Lots: <span className="text-white">14 Lots</span></span>
                <span>Unmapped Blindspots: <span className="text-red-400">2 Lots</span></span>
              </div>
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Bluetooth BLE Scale
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Bluetooth Cherry Intake scale", "Device: BLE scale")}
            <div className="flex flex-col items-center py-4">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center shadow-inner">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider mb-1">Scale Weight</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-sm text-emerald-400">kg</span>
                </span>
                <span className="text-[8px] font-mono text-gray-500 mt-2">{isWeighed ? "Consensus Stable" : "Zeroed"}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Button onClick={() => handleWeigh(60)} disabled={isWeighed} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
                {isWeighed ? "Weight Saved to Ledger" : "Capture Intake Cherry Weight"}
              </Button>
              {isWeighed && (
                <div className="bg-slate-900/50 p-3 border border-emerald-900/20 rounded-xl text-[10px] font-mono text-gray-400 grid grid-cols-2 gap-2">
                  <div>Grower: <span className="text-white">Juan Valdez</span></div>
                  <div>Lot ID: <span className="text-white">LT-COFFE-9042</span></div>
                  <div>Moisture: <span className="text-emerald-400 font-semibold">12.2% (Ok)</span></div>
                  <div>Payout: <span className="text-[#53D769]">Pending disburse</span></div>
                </div>
              )}
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Wet-Mill parameter logs
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Washing Mill parameter logs", "Engine: DATAGREEN")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Fermentation Hours</span>
                  <span className="text-white font-bold">{sliderVal1} hrs</span>
                </div>
                <input type="range" min="12" max="36" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Drying Temperature</span>
                  <span className="text-white font-bold">{sliderVal2} °C</span>
                </div>
                <input type="range" min="15" max="45" value={sliderVal2} onChange={(e) => setSliderVal2(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-2xl text-xs font-mono grid grid-cols-2 gap-2">
              <div>Consolidated Grade: <span className="text-white font-semibold">Grade A</span></div>
              <div>Quality Status: <span className={sliderVal1 > 30 || sliderVal2 > 38 ? "text-amber-500 font-bold" : "text-emerald-400 font-bold"}>
                {sliderVal1 > 30 || sliderVal2 > 38 ? "Over-ferment warning" : "Optimal"}
              </span></div>
            </div>
            <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 border border-emerald-900/20 text-[#53D769] font-mono rounded-xl">
              Publish batch to secure ledger
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Sensory cupping radar
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Specialty Cupping Radar", "Telemetry: Sensory")}
            <div className="relative aspect-square w-full max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl flex items-center justify-center">
              {/* Radar chart mockup */}
              <div className="absolute w-24 h-24 border border-emerald-900/40 rounded-full"></div>
              <div className="absolute w-16 h-16 border border-emerald-900/40 rounded-full"></div>
              <div className="absolute w-8 h-8 border border-emerald-900/40 rounded-full"></div>
              <svg className="w-full h-full absolute inset-0">
                <polygon points="80,30 130,80 70,110" fill="rgba(83, 215, 105, 0.2)" stroke="#53D769" strokeWidth="1.5" />
              </svg>
              <span className="absolute top-2 text-[8px] font-mono text-gray-400">ACIDITY (8.8)</span>
              <span className="absolute right-2 text-[8px] font-mono text-gray-400">BODY (8.5)</span>
              <span className="absolute left-2 text-[8px] font-mono text-gray-400">AROMA (9.0)</span>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-2xl text-center font-mono">
              <span className="text-[10px] text-gray-500 uppercase block mb-0.5">Calculated Cup Score</span>
              <span className="text-2xl font-bold text-[#53D769]">87.5 / 100 Specialty</span>
            </div>
            <Button onClick={handlePayout} disabled={payoutStatus !== "idle"} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {payoutStatus === "success" ? "✓ $1,250 USD Sent to Wallet" : payoutStatus === "processing" ? "Verifying hash..." : "Disburse grower direct payout"}
            </Button>
          </div>
        );
      }
    }

    /* ─── COCOA WIDGETS ─── */
    if (isCocoa) {
      if (activeScene === 0) {
        // Act I: Compliance Risks
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Compliance Risk Dashboard", "Engine: Auditing")}
            <div className="space-y-3 font-mono text-xs my-2">
              <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl flex justify-between items-center">
                <span>Satellite Deforestation Audit</span>
                <span className="text-emerald-400 font-bold">CLEARED</span>
              </div>
              <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl flex justify-between items-center">
                <span>Child Labor Proximity Indices</span>
                <span className="text-emerald-400 font-bold">COMPLIANT</span>
              </div>
              <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl flex justify-between items-center">
                <span>Farmer living income gap</span>
                <span className="text-amber-500 font-bold">PREMIUM AUDITED</span>
              </div>
            </div>
            <div className="bg-slate-900/50 p-3 border border-emerald-900/20 rounded-xl text-[10px] font-mono text-gray-400">
              Zero national park boundary conflicts verified by active GIS sentinel sweeps.
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Park boundary mapper
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("National Park Boundary Checker", "GIS validation")}
            <p className="text-[10px] text-gray-300 mb-2 font-mono">
              Click coordinates to plot farm. If boundary intersects orange park zone, alert triggers.
            </p>
            <div 
              className="relative w-full aspect-square max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setPoints([...points, { x, y }]);
              }}
            >
              {/* Park warning zone */}
              <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/10 border-l border-b border-amber-500/30 flex items-center justify-center">
                <span className="text-[7px] text-amber-500 font-mono rotate-45">NATIONAL PARK</span>
              </div>
              {points.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <polygon points={points.map(p => `${p.x},${p.y}`).join(" ")} fill="rgba(83, 215, 105, 0.1)" stroke="#53D769" strokeWidth="2" />
                </svg>
              )}
              {points.map((p, idx) => (
                <div key={idx} className="absolute w-2 h-2 -mt-1 -ml-1 bg-emerald-400 rounded-full" style={{ left: p.x, top: p.y }}></div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs font-mono pt-2">
              <span className="text-gray-400">Area: {calculateArea()} ha</span>
              <Button size="sm" className="h-7 px-3 bg-slate-900 border border-emerald-900/20 text-[#53D769]" onClick={() => setPoints([])}>Reset</Button>
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Cargill tag scanner
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Cargill Case Study Scanner", "Barcode BLE Scan")}
            <div className="flex flex-col items-center py-4 font-mono">
              {isScanned ? (
                <div className="w-full bg-slate-950 p-4 border border-emerald-900/10 rounded-xl space-y-2 text-xs">
                  <div className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> BAG REGISTERED</div>
                  <div className="text-gray-400">ID: <span className="text-white">CG-COCOA-8942-CI</span></div>
                  <div className="text-gray-400">Weight: <span className="text-white">62.5 kg Standard</span></div>
                  <div className="text-gray-400">Consolidated Premium: <span className="text-white">+$12.50 USD</span></div>
                </div>
              ) : (
                <div className="w-24 h-24 border border-dashed border-emerald-800/40 rounded-xl flex items-center justify-center text-gray-500">
                  <QrCode className="w-10 h-10 text-emerald-600 animate-pulse" />
                </div>
              )}
            </div>
            <Button onClick={() => setIsScanned(!isScanned)} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isScanned ? "Scan Next Bag" : "Simulate Bag Scan"}
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: RSPO Compliance Dossier
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("UTZ / Rainforest Dossier", "Consensus Audit")}
            <div className="space-y-2 font-mono text-xs my-2">
              <div className="flex justify-between items-center text-gray-400">
                <span>Rainforest Alliance check</span>
                <span className="text-emerald-400 font-semibold">✓ VERIFIED</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Peatland drainage ban</span>
                <span className="text-emerald-400 font-semibold">✓ COMPLIANT</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Fair premiums ledger</span>
                <span className="text-emerald-400 font-semibold">✓ SECURED</span>
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center">
              <span className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Consensus clearance ID</span>
              <span className="text-xs font-mono text-white font-semibold">RA-GH-2026-X8942</span>
            </div>
            <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 border border-emerald-900/20 text-[#53D769] font-mono rounded-xl">
              Export TRACES customs statement
            </Button>
          </div>
        );
      }
    }

    /* ─── COTTON WIDGETS ─── */
    if (isCotton) {
      if (activeScene === 0) {
        // Act I: GMO vs Organic purity
        const isGMO = sliderVal1 > 5;
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Organic Purity Index", "Sensor: DNA check")}
            <div>
              <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                <span>Trace GMO Contamination</span>
                <span className="text-white font-bold">{sliderVal1}%</span>
              </div>
              <input type="range" min="0" max="25" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center font-mono space-y-1">
              <span className="text-[10px] text-gray-500 uppercase block">Genetic Sourcing status</span>
              <span className={`text-xl font-bold ${isGMO ? "text-amber-500" : "text-emerald-400"}`}>
                {isGMO ? "GMO Mixing Risk" : "100% Organic certified"}
              </span>
            </div>
            <div className="bg-slate-900/50 p-3 border border-emerald-900/20 rounded-xl text-[10px] text-gray-400 font-mono">
              NOP and NPOP organic validations verified by DNA checks at cooperative procurement gates.
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Chetna Profile Lookup
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Chetna Organic Lookup", "Database query")}
            <div className="space-y-4 my-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Chetna Grower ID (e.g. CH-8942)"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 h-10 px-3 bg-slate-950 border border-emerald-900/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#53D769]"
                />
                <Button onClick={() => handleQrSearch("CH-8942")} className="h-10 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono px-4 rounded-xl">Search</Button>
              </div>
              {tracedBatch && (
                <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl text-[10px] font-mono text-gray-400 space-y-1">
                  <div>Grower: <span className="text-white">{tracedBatch.farmer}</span></div>
                  <div>Sowing Area: <span className="text-white">{tracedBatch.area}</span></div>
                  <div>Seed Origin: <span className="text-white">{tracedBatch.deforestationCheck}</span></div>
                  <div>Certifications: <span className="text-emerald-400">{tracedBatch.yieldGrade}</span></div>
                </div>
              )}
            </div>
            <div className="text-[9px] text-gray-500 font-mono">
              Try searching: "CH-8942"
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Ginning weight scale
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Ginning Weight Scale", "Ginning integration")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-400 uppercase tracking-wider mb-1">Bale Weight</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-sm text-emerald-400">kg</span>
                </span>
                <span className="text-[8px] text-gray-500 mt-2">{isWeighed ? "Weight Saved" : "Empty"}</span>
              </div>
            </div>
            <Button onClick={() => handleWeigh(220)} disabled={isWeighed} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isWeighed ? "Bale Registered successfully" : "Capture Ginning Bale Weight"}
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Bale origin tracer
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Bale QR Origin Tracer", "Brands Traceback")}
            <div className="space-y-4 my-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Bale QR (e.g. ST-BALE-8942)"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 h-10 px-3 bg-slate-950 border border-emerald-900/10 rounded-xl text-xs font-mono text-white focus:outline-none"
                />
                <Button onClick={() => handleQrSearch("ST-BALE-8942")} className="h-10 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono px-4 rounded-xl">Trace</Button>
              </div>
              {tracedBatch && (
                <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl text-[10px] font-mono text-gray-400 space-y-1">
                  <div className="text-[#53D769] font-bold">✓ BALE ORIGIN VERIFIED</div>
                  <div>Ginning Mill: <span className="text-white">Chetna Ginning Unit #3</span></div>
                  <div>Grower plots: <span className="text-white">Sunita Bai (CH-8942)</span></div>
                  <div>NOP / NPOP standard: <span className="text-white">100% Compliant</span></div>
                </div>
              )}
            </div>
            <div className="text-[9px] text-gray-500 font-mono">Try searching: "ST-BALE-8942"</div>
          </div>
        );
      }
    }

    /* ─── RICE WIDGETS ─── */
    if (isRice) {
      if (activeScene === 0) {
        // Act I: Methane footprint
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Paddy Methane Monitor", "Metric: GHG")}
            <div className="flex flex-col items-center py-4">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-400 uppercase mb-1">Methane Level</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {sliderVal1} <span className="text-sm text-emerald-400">ppm</span>
                </span>
                <span className={`text-[8px] uppercase font-bold mt-2 ${sliderVal1 > 40 ? "text-red-500" : "text-emerald-400"}`}>
                  {sliderVal1 > 40 ? "Traditional flooding" : "AWD Decarbonized"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>AWD Wetting Cycle</span>
                <span>Adjust</span>
              </div>
              <input type="range" min="10" max="80" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: AWD standpipe gauge
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("AWD Standpipe Sensor Log", "IoT standpipe")}
            <div className="flex flex-col items-center py-4">
              {/* Standpipe visual representation */}
              <div className="w-16 h-40 bg-slate-950 border-2 border-emerald-900/30 rounded-xl relative overflow-hidden flex items-end">
                <div 
                  className="w-full bg-cyan-600/40 border-t border-cyan-400 transition-all duration-300"
                  style={{ height: `${sliderVal1}%` }}
                ></div>
                <div className="absolute inset-y-0 right-2 flex flex-col justify-between text-[8px] font-mono text-gray-500 py-2">
                  <span>+15cm</span>
                  <span>0cm</span>
                  <span>-15cm</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Water Level</span>
                <span className="text-white font-bold">{(sliderVal1 - 50) * 0.3} cm</span>
              </div>
              <input type="range" min="0" max="100" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Carbon credit calculator
        const credits = (sliderVal1 * 1.4 + sliderVal2 * 0.6).toFixed(1);
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Carbon Credit disburser", "Engine: CarbonTrace")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>AWD compliance %</span>
                  <span className="text-white font-bold">{sliderVal1}%</span>
                </div>
                <input type="range" min="0" max="100" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Fertilizer reduction %</span>
                  <span className="text-white font-bold">{sliderVal2}%</span>
                </div>
                <input type="range" min="0" max="100" value={sliderVal2} onChange={(e) => setSliderVal2(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center font-mono">
              <span className="text-[10px] text-gray-500 uppercase block">Total carbon credits generated</span>
              <span className="text-2xl font-bold text-[#53D769]">{credits} credits / ha</span>
            </div>
            <Button onClick={handlePayout} disabled={payoutStatus !== "idle"} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {payoutStatus === "success" ? "✓ Carbon Credits Disbursed to Co-op" : payoutStatus === "processing" ? "Verifying offsets..." : "Disburse carbon credit payout"}
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: NIR Spectrometer check
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("NIR Quality test", "Device: Spectrometer")}
            <div className="relative aspect-video w-full max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden flex items-center justify-center p-4">
              {isScanned ? (
                <div className="w-full h-full font-mono text-left text-[10px] space-y-1.5 flex flex-col justify-center">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">✓ QUALITY CLEARED</div>
                  <div>Moisture content: <span className="text-white">13.2% (Standard)</span></div>
                  <div>Pesticide residues: <span className="text-white">0.00% (Not Detected)</span></div>
                  <div>Aflatoxin limits: <span className="text-white">Negative (OK)</span></div>
                </div>
              ) : (
                <div className="text-center font-mono text-gray-500 text-xs">
                  <Droplet className="w-8 h-8 text-cyan-400 animate-bounce mx-auto mb-2" />
                  Ready to scan grain moisture
                </div>
              )}
            </div>
            <Button onClick={() => setIsScanned(!isScanned)} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isScanned ? "Scan Next Batch" : "Initiate NIR Spectrometry scan"}
            </Button>
          </div>
        );
      }
    }

    /* ─── TEA WIDGETS ─── */
    if (isTea) {
      if (activeScene === 0) {
        // Act I: Fine pluck scanner
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Fine Plucking Scanner", "AI Vision check")}
            <div className="relative aspect-video w-full max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden flex items-center justify-center">
              {isScanned ? (
                <div className="text-center font-mono text-xs text-emerald-400 space-y-1">
                  <Award className="w-8 h-8 text-emerald-400 mx-auto mb-1 animate-pulse" />
                  <div>98.4% Fine Pluck Ratio Sourced</div>
                  <span className="text-[10px] text-gray-400">Target two leaves & a bud met</span>
                </div>
              ) : (
                <div className="text-center font-mono text-gray-500 text-xs p-4">
                  <Eye className="w-6 h-6 text-emerald-600 mx-auto mb-1 animate-pulse" />
                  Aim camera at tea basket to analyze leaf grade plucking
                </div>
              )}
            </div>
            <Button onClick={() => setIsScanned(!isScanned)} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isScanned ? "Reset Scanner" : "Scan Pluck Quality"}
            </Button>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Collection Gate Scale
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Garden Gate Intake Weight", "Weigh scale BLE")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-400 uppercase mb-1">Leaf Weight</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-sm text-emerald-400">kg</span>
                </span>
                <span className="text-[8px] text-gray-500 mt-2">{isWeighed ? "Weight Saved" : "Empty"}</span>
              </div>
            </div>
            <Button onClick={() => handleWeigh(45)} disabled={isWeighed} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isWeighed ? "Weight Registered" : "Capture Intake Weigh Scale"}
            </Button>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Withering loft parameters
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Withering parameters log", "Consensus telemetry")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Withering Loft humidity %</span>
                  <span className="text-white font-bold">{sliderVal1}%</span>
                </div>
                <input type="range" min="40" max="90" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Oxidation Temperature</span>
                  <span className="text-white font-bold">{sliderVal2} °C</span>
                </div>
                <input type="range" min="15" max="35" value={sliderVal2} onChange={(e) => setSliderVal2(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center">
              <span className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Oxidation Status</span>
              <span className="text-xs font-mono text-[#53D769] font-bold">Optimal enzyme oxidation active</span>
            </div>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Fair wage payouts
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Fair wage grower payout", "Database: Payments")}
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Plucker ID:</span>
                <span className="text-white">PL-TEA-2934</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total weight:</span>
                <span className="text-white">124 kg this week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Organic Premium:</span>
                <span className="text-emerald-400">+$18.60 USD</span>
              </div>
            </div>
            <Button onClick={handlePayout} disabled={payoutStatus !== "idle"} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {payoutStatus === "success" ? "✓ Wage Premium disburse success" : payoutStatus === "processing" ? "Transmitting..." : "Disburse fair wage premium"}
            </Button>
          </div>
        );
      }
    }

    /* ─── SPICES WIDGETS ─── */
    if (isSpices) {
      if (activeScene === 0) {
        // Act I: Vanilla purity check
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Vanilla/Saffron NIR scan", "Device: Spectrometer")}
            <div className="relative aspect-video w-full max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden flex items-center justify-center p-4">
              {isScanned ? (
                <div className="w-full h-full font-mono text-left text-[10px] space-y-2 flex flex-col justify-center">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">✓ QUALITY CLEARED</div>
                  <div>Vanillin Content: <span className="text-white">2.2% (Premium)</span></div>
                  <div>Moisture Level: <span className="text-white">18.4% (Optimal)</span></div>
                  <div>Adulterants / Fillers: <span className="text-white">Not Detected (ND)</span></div>
                </div>
              ) : (
                <div className="text-center font-mono text-gray-500 text-xs">
                  <Droplet className="w-8 h-8 text-[#53D769] animate-bounce mx-auto mb-2" />
                  Ready to scan spice batch
                </div>
              )}
            </div>
            <Button onClick={() => setIsScanned(!isScanned)} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isScanned ? "Scan Next Batch" : "Initiate Spice Spectrometry Scan"}
            </Button>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Madagascar organic boundary map
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Madagascar organic boundary", "GIS validation")}
            <p className="text-[10px] text-gray-300 mb-2 font-mono">
              Click coordinates to map vanilla smallholder plot boundaries bordering forest margins.
            </p>
            <div 
              className="relative w-full aspect-square max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setPoints([...points, { x, y }]);
              }}
            >
              {points.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <polygon points={points.map(p => `${p.x},${p.y}`).join(" ")} fill="rgba(83, 215, 105, 0.1)" stroke="#53D769" strokeWidth="2" />
                </svg>
              )}
              {points.map((p, idx) => (
                <div key={idx} className="absolute w-2 h-2 -mt-1 -ml-1 bg-emerald-400 rounded-full" style={{ left: p.x, top: p.y }}></div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs font-mono pt-2">
              <span className="text-gray-400">Hectares: {calculateArea()} ha</span>
              <Button size="sm" className="h-7 px-3 bg-slate-900 border border-emerald-900/20 text-[#53D769]" onClick={() => setPoints([])}>Reset</Button>
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Curing telemetry ledger
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Vanilla Curing Loft logs", "Ledger integration")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Curing days in loft</span>
                  <span className="text-white font-bold">{sliderVal1} days</span>
                </div>
                <input type="range" min="60" max="120" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Moisture loss ratio %</span>
                  <span className="text-white font-bold">{sliderVal2}%</span>
                </div>
                <input type="range" min="10" max="60" value={sliderVal2} onChange={(e) => setSliderVal2(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center">
              <span className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Drying Curve Status</span>
              <span className="text-xs font-mono text-[#53D769] font-bold">Stable moisture extraction</span>
            </div>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Export dossier clearance
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Export Phytosanitary clearance", "Consensus Audit")}
            <div className="space-y-2 font-mono text-xs my-2">
              <div className="flex justify-between items-center text-gray-400">
                <span>Organic vanilla clearance certificate</span>
                <span className="text-emerald-400 font-semibold">✓ SIGNED</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Phytosanitary inspection scan</span>
                <span className="text-emerald-400 font-semibold">✓ PASSED</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Madagascar customs export docket</span>
                <span className="text-emerald-400 font-semibold">✓ GENERATED</span>
              </div>
            </div>
            <Button className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl">
              Export verified spice dossier
            </Button>
          </div>
        );
      }
    }

    /* ─── PALM OIL WIDGETS ─── */
    if (isPalm) {
      if (activeScene === 0) {
        // Act I: NDPE Forest Canopy sweep
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("NDPE Canopy Sweep", "GIS verification")}
            <div className="relative aspect-video w-full max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-emerald-900/20 flex items-center justify-center text-xs font-mono text-[#53D769] font-bold uppercase select-none">
                Pre-2020 Forest Canopy
              </div>
              <div 
                className="absolute inset-y-0 right-0 bg-amber-900/20 flex items-center justify-center text-xs font-mono text-amber-500 font-bold uppercase select-none border-l-2 border-white"
                style={{ width: `${sliderVal1}%` }}
              >
                Agricultural Sourcing
              </div>
              <div className="absolute top-2 left-2 bg-slate-900/80 text-[8px] font-mono text-white px-1.5 py-0.5 rounded">
                Canopy Split: {100 - sliderVal1}% vs {sliderVal1}%
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-mono uppercase block">Adjust Swipe Area</span>
              <input type="range" min="10" max="90" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Plantation Bunch size optimizer
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Grove bunch size check", "Precision Agronomy")}
            <p className="text-xs text-gray-300 mb-4 font-mono">
              Hover over palm grove grids to monitor bunch weight projections and soil organic carbon indexes.
            </p>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-4 border border-emerald-900/10 rounded-2xl">
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-video bg-emerald-950/20 border border-emerald-800/30 rounded-lg flex flex-col items-center justify-center font-mono text-[9px] hover:bg-emerald-500/20 cursor-pointer"
                  onMouseEnter={() => setRadarHover(`Grove G-${10+i}`)}
                  onMouseLeave={() => setRadarHover(null)}
                >
                  <span className="text-[#53D769] font-bold">G-{10+i}</span>
                  <span className="text-[7px] text-gray-400">1.8 ha</span>
                </div>
              ))}
            </div>
            <div className="h-8 text-xs font-mono text-gray-400 text-center">
              {radarHover ? (
                <span>Active: <span className="text-white font-bold">{radarHover}</span> | Estimated Bunch Size: <span className="text-emerald-400 font-semibold">24.5 kg</span></span>
              ) : (
                <span>Hover over grid sectors to inspect grove yields</span>
              )}
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Gross bunch scale
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Automated Gross bunch scale", "Platform: DG Remote")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-400 uppercase mb-1">Intake Bunch Weight</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-sm text-emerald-400">kg</span>
                </span>
                <span className="text-[8px] text-gray-500 mt-2">{isWeighed ? "Weight Saved" : "Empty"}</span>
              </div>
            </div>
            <Button onClick={() => handleWeigh(420)} disabled={isWeighed} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isWeighed ? "Weight Registered" : "Capture Intake Bunch Weight"}
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: RSPO Compliance checklist
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("RSPO Verification Checklist", "Consensus Audit")}
            <div className="space-y-2 font-mono text-xs my-2">
              <div className="flex justify-between items-center text-gray-400">
                <span>No Peatland Drainage verified</span>
                <span className="text-emerald-400 font-semibold">✓ COMPLIANT</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Zero deforestation buffer map</span>
                <span className="text-emerald-400 font-semibold">✓ VERIFIED</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>RSPO Chain of Custody</span>
                <span className="text-emerald-400 font-semibold">✓ AUDITED</span>
              </div>
            </div>
            <Button className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl">
              Export verified palm oil dossier
            </Button>
          </div>
        );
      }
    }

    /* ─── RUBBER WIDGETS ─── */
    if (isRubber) {
      if (activeScene === 0) {
        // Act I: DRC Calculator
        const price = (sliderVal1 * 1.8).toFixed(2);
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("DRC % latex calculator", "Telemetry: DRC")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Dry Rubber Content (DRC)</span>
                  <span className="text-[#53D769] font-bold">{sliderVal1}%</span>
                </div>
                <input type="range" min="20" max="60" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center font-mono">
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Calculated Fair Price / kg</span>
              <span className="text-2xl font-bold text-white">${price} USD</span>
            </div>
            <div className="text-[9px] text-gray-500 font-mono">
              Adjusting the DRC % automatically updates the fair trade price calculation for smallholder tappers.
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Latex Intake Log
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Latex Intake Log", "Device: BLE Sensor")}
            <div className="bg-slate-950 border border-emerald-900/10 rounded-xl p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Latex Volume:</span>
                <span className="text-white">450 Liters</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Acid coagulation check:</span>
                <span className="text-emerald-400">Passed (pH 4.8)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Consolidated DRC %:</span>
                <span className="text-white">34.5% Verified</span>
              </div>
            </div>
            <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 border border-emerald-900/20 text-[#53D769] font-mono rounded-xl">
              Write intake to local tapper ledger
            </Button>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Sheet weight scale
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Coagulated Sheet Weight Scale", "Weight scale BLE")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-400 uppercase mb-1">Sheet Weight</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-sm text-emerald-400">kg</span>
                </span>
                <span className="text-[8px] text-gray-500 mt-2">{isWeighed ? "Weight Saved" : "Empty"}</span>
              </div>
            </div>
            <Button onClick={() => handleWeigh(110)} disabled={isWeighed} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isWeighed ? "Sheet weight logged successfully" : "Capture Coagulated Sheet Weight"}
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: FSC Certificate Validator
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("FSC Sourcing Validator", "Consensus: Certified")}
            <div className="space-y-4 my-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter FSC Sourcing Certificate"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 h-10 px-3 bg-slate-950 border border-emerald-900/10 rounded-xl text-xs font-mono text-white focus:outline-none"
                />
                <Button onClick={() => handleQrSearch("FSC-RUBBER-8942")} className="h-10 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono px-4 rounded-xl">Verify</Button>
              </div>
              {tracedBatch && (
                <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl text-[10px] font-mono text-gray-400 space-y-1">
                  <div className="text-[#53D769] font-bold">✓ FSC TIMBER/RUBBER CERTIFIED</div>
                  <div>Sourcing Plantation: <span className="text-white">Surat Thani Green Rubber Ltd</span></div>
                  <div>Audit standard: <span className="text-white">FSC-STD-40-004 v3.1</span></div>
                </div>
              )}
            </div>
            <div className="text-[9px] text-gray-500 font-mono">Try searching: "FSC-RUBBER-8942"</div>
          </div>
        );
      }
    }

    /* ─── SUGARCANE WIDGETS ─── */
    if (isSugarcane) {
      if (activeScene === 0) {
        // Act I: Sucrose Decay Timer
        const isCritical = sucrosePurity < 90;
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Sucrose Purity Decay", "Sensing: Transit time")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="text-center space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block">Transit sucrose purity</span>
                <span className={`text-4xl font-bold ${isCritical ? "text-red-500" : "text-[#53D769]"} tracking-tight`}>
                  {sucrosePurity}%
                </span>
                <span className="text-[8px] text-gray-400 block flex items-center gap-1 justify-center">
                  <Timer className="w-3 h-3 text-cyan-400 animate-spin" />
                  Decaying: -0.05% every 2 seconds
                </span>
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-xs font-mono text-gray-400 text-center">
              Cut cane left in transit without cooperative schedule sync decays quickly, reducing sucrose yield.
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Outgrower milling schedule planner
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Outgrower Milling Dispatch", "Database: Planning")}
            <p className="text-xs text-gray-300 mb-4 font-mono">
              Select mill gate slots to schedule cutting operations, minimizing transit sucrose losses.
            </p>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-4 border border-emerald-900/10 rounded-2xl text-xs font-mono">
              {["Slot A (08:00 - 12:00)", "Slot B (12:00 - 16:00)", "Slot C (16:00 - 20:00)", "Slot D (Closed)"].map((slot, i) => (
                <div 
                  key={i} 
                  className={`p-2 rounded border border-emerald-900/20 cursor-pointer hover:bg-emerald-500/20 text-center ${
                    sliderVal1 === i ? "bg-emerald-950/40 text-[#53D769] border-[#53D769]" : "text-gray-400"
                  }`}
                  onClick={() => setSliderVal1(i)}
                >
                  {slot}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-gray-500 font-mono">
              Scheduling ensures cane arrives within 4 hours of cut time.
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Truck Gate Scale
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Mill Gate Truck Scale", "Weigh scale BLE")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-400 uppercase mb-1">Gross Truck Weight</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-sm text-emerald-400">tons</span>
                </span>
                <span className="text-[8px] text-gray-500 mt-2">{isWeighed ? "Weight Saved" : "Empty scale"}</span>
              </div>
            </div>
            <Button onClick={() => handleWeigh(24)} disabled={isWeighed} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isWeighed ? "Truck payload logged successfully" : "Capture Gross Truck Weight"}
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Sucrose yield payout
        const payout = (sliderVal1 * 240).toLocaleString();
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Sucrose Yield Payout", "Consensus: Payments")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Sucrose Extraction Yield</span>
                  <span className="text-[#53D769] font-bold">{sliderVal1}%</span>
                </div>
                <input type="range" min="8" max="15" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center font-mono">
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Grower payment calculated</span>
              <span className="text-2xl font-bold text-white">${payout} USD</span>
            </div>
            <Button onClick={handlePayout} disabled={payoutStatus !== "idle"} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {payoutStatus === "success" ? "✓ Sucrose Yield Premium paid" : payoutStatus === "processing" ? "Transmitting payment..." : "Disburse quality-based payout"}
            </Button>
          </div>
        );
      }
    }

    /* ─── FRUITS & VEGETABLES WIDGETS ─── */
    if (isFruit) {
      if (activeScene === 0) {
        // Act I: Apples Quality Scanner
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Apple Conveyor belt scan", "AI Vision check")}
            <div className="relative aspect-video w-full max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden flex items-center justify-center p-4">
              <div className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10 animate-bounce"></div>
              <div className="text-center font-mono space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block">Computer Vision sorting</span>
                <span className="text-lg font-bold text-[#53D769]">{defectsDetected} defects bypassed</span>
                <span className="text-[8px] text-gray-400 block">Conveyor Speed: 24 apples/sec</span>
              </div>
            </div>
            <Button onClick={() => setConveyorRunning(!conveyorRunning)} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {conveyorRunning ? "Pause Conveyor belt" : "Resume Conveyor belt"}
            </Button>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Orchard origin map
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Orchard Plot Boundary", "GIS validation")}
            <p className="text-[10px] text-gray-300 mb-2 font-mono">
              Click coordinates to map fresh produce orchard shapes and log harvest timestamps.
            </p>
            <div 
              className="relative w-full aspect-square max-h-40 bg-slate-950 border border-emerald-900/10 rounded-xl overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setPoints([...points, { x, y }]);
              }}
            >
              {points.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <polygon points={points.map(p => `${p.x},${p.y}`).join(" ")} fill="rgba(83, 215, 105, 0.1)" stroke="#53D769" strokeWidth="2" />
                </svg>
              )}
              {points.map((p, idx) => (
                <div key={idx} className="absolute w-2 h-2 -mt-1 -ml-1 bg-emerald-400 rounded-full" style={{ left: p.x, top: p.y }}></div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs font-mono pt-2">
              <span>Area: {calculateArea()} ha</span>
              <Button size="sm" className="h-7 px-3 bg-slate-900 border border-emerald-900/20 text-[#53D769]" onClick={() => setPoints([])}>Reset</Button>
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Cold chain trailer monitor
        const isWarm = sliderVal1 > 8;
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Trailer Climate Monitor", "IoT climate sensor")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="text-center space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block">Trailer temperature</span>
                <span className={`text-4xl font-bold ${isWarm ? "text-red-500" : "text-[#53D769]"} tracking-tight`}>
                  {sliderVal1} °C
                </span>
                <span className="text-[8px] text-gray-400 block">Moisture relative: {sliderVal2}% (Normal)</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Adjust climate dial</span>
                <span>Change</span>
              </div>
              <input type="range" min="1" max="15" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
            </div>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Retail QR Traceback
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Retail QR Traceback Scan", "Consumers trace")}
            <div className="space-y-4 my-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Scan produce QR (e.g. ST-FRUIT-8942)"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 h-10 px-3 bg-slate-950 border border-emerald-900/10 rounded-xl text-xs font-mono text-white focus:outline-none"
                />
                <Button onClick={() => handleQrSearch("ST-FRUIT-8942")} className="h-10 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono px-4 rounded-xl">Trace</Button>
              </div>
              {tracedBatch && (
                <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl text-[10px] font-mono text-gray-400 space-y-1">
                  <div className="text-[#53D769] font-bold">✓ FRESHNESS DOSSIER GENERATED</div>
                  <div>Orchard origin: <span className="text-white">Kashmir Valley Growers (Lot #8942)</span></div>
                  <div>Harvest date: <span className="text-white">Nov 14, 2025</span></div>
                  <div>Cold chain status: <span className="text-white">Continuous 4.2 C verified</span></div>
                </div>
              )}
            </div>
            <div className="text-[9px] text-gray-500 font-mono">Try searching: "ST-FRUIT-8942"</div>
          </div>
        );
      }
    }

    /* ─── GRAINS WIDGETS ─── */
    if (isGrains) {
      if (activeScene === 0) {
        // Act I: Silo moisture gauge
        const isHighRisk = sliderVal1 > 14;
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Silo Moisture Alert Gauge", "Metric: Spoilage")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="text-center space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block">Grain moisture content</span>
                <span className={`text-4xl font-bold ${isHighRisk ? "text-red-500" : "text-[#53D769]"} tracking-tight`}>
                  {sliderVal1}%
                </span>
                <span className={`text-[8px] uppercase font-bold block ${isHighRisk ? "text-red-500" : "text-emerald-400"}`}>
                  {isHighRisk ? "Mold Spoilage threat" : "Safe Storage humidity"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Adjust Moisture Dial</span>
                <span>Change</span>
              </div>
              <input type="range" min="10" max="18" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Bulk grains truck scale
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Bulk Grain Intake Scale", "Weigh scale BLE")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-emerald-950 flex flex-col items-center justify-center">
                <span className="text-[9px] text-emerald-400 uppercase mb-1">Gross Grain Weight</span>
                <span className="text-3xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-sm text-emerald-400">tons</span>
                </span>
                <span className="text-[8px] text-gray-500 mt-2">{isWeighed ? "Weight Saved" : "Scale empty"}</span>
              </div>
            </div>
            <Button onClick={() => handleWeigh(35)} disabled={isWeighed} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {isWeighed ? "Hopper Weight registered successfully" : "Capture Intake Gross Weight"}
            </Button>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: 3D Silo aeration fans
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("3D Silo Aeration Controller", "Aeration Fans")}
            <div className="flex flex-col items-center py-4 font-mono">
              <div className="text-center space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block">Ambient Silo Temperature</span>
                <span className={`text-4xl font-bold tracking-tight ${siloTemp > 24 ? "text-amber-500 animate-pulse" : "text-emerald-400"}`}>
                  {siloTemp} °C
                </span>
                <span className="text-[8px] text-gray-400 block">
                  Fans status: <span className={fansActive ? "text-[#53D769] font-bold" : "text-gray-500"}>{fansActive ? "ACTIVE (Cooling)" : "STANDBY"}</span>
                </span>
              </div>
            </div>
            <Button onClick={() => setFansActive(!fansActive)} className="w-full h-11 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl transition-all">
              {fansActive ? "Deactivate Aeration Fans" : "Activate Aeration Fans"}
            </Button>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Port clearance checklist
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Port Export Clearance checks", "Consensus Audit")}
            <div className="space-y-2 font-mono text-xs my-2">
              <div className="flex justify-between items-center text-gray-400">
                <span>Mycotoxin / Aflatoxin check</span>
                <span className="text-emerald-400 font-semibold">✓ SIGNED CLEAN</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Heavy metal contamination screening</span>
                <span className="text-emerald-400 font-semibold">✓ PASSED</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Customs phytosanitary export dossier</span>
                <span className="text-emerald-400 font-semibold">✓ GENERATED</span>
              </div>
            </div>
            <Button className="w-full h-11 bg-slate-900 hover:bg-slate-800 border border-emerald-900/20 text-[#53D769] font-mono rounded-xl">
              Export Grains customs dossier
            </Button>
          </div>
        );
      }
    }

    /* ─── SEED PRODUCTION WIDGETS ─── */
    if (isSeeds) {
      if (activeScene === 0) {
        // Act I: Breeder seed purity
        const isGMO = sliderVal1 > 1;
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Breeder Seed Purity check", "Metric: Genetics")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Traced genetic contamination %</span>
                  <span className="text-white font-bold">{sliderVal1}%</span>
                </div>
                <input type="range" min="0" max="10" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center font-mono">
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Genetic Pedigree Status</span>
              <span className={`text-xl font-bold ${isGMO ? "text-amber-500" : "text-emerald-400"}`}>
                {isGMO ? "Outcrossing detected" : "Pure Breeder Lineage Verified"}
              </span>
            </div>
          </div>
        );
      }
      if (activeScene === 1) {
        // Act II: Genetic pedigree family tree
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Genetic Lineage Pedigree", "Lineage tree")}
            <div className="flex flex-col justify-between bg-slate-950 p-4 border border-emerald-900/10 rounded-2xl relative font-mono text-[9px] text-gray-400 space-y-4 py-6">
              <div className="flex justify-center">
                <span className="bg-slate-900 border border-emerald-900/30 px-2 py-1 rounded text-white font-bold">BREEDER SEED #9042</span>
              </div>
              <div className="flex justify-around relative">
                <div className="absolute top-[-10px] left-[25%] right-[25%] h-px bg-emerald-900/30"></div>
                <span className="bg-slate-900 border border-emerald-900/30 px-2 py-1 rounded">FOUNDATION SEED A</span>
                <span className="bg-slate-900 border border-emerald-900/30 px-2 py-1 rounded">FOUNDATION SEED B</span>
              </div>
              <div className="flex justify-center">
                <span className="bg-slate-900 border border-[#53D769] px-2 py-1 rounded text-white font-bold">CERTIFIED GROWERS BATCH</span>
              </div>
            </div>
            <div className="text-[9px] text-gray-500 font-mono text-center">
              Consensus adapter verifies pedigree links cryptographically
            </div>
          </div>
        );
      }
      if (activeScene === 2) {
        // Act III: Germination Lab test
        const germRate = (90 + sliderVal1 * 0.1).toFixed(1);
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Germination lab logging", "Lab chamber")}
            <div className="space-y-4 my-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Chamber relative humidity</span>
                  <span className="text-[#53D769] font-bold">{sliderVal1}%</span>
                </div>
                <input type="range" min="60" max="90" value={sliderVal1} onChange={(e) => setSliderVal1(parseInt(e.target.value))} className="w-full accent-[#53D769] h-1 bg-gray-800 rounded-lg cursor-pointer" />
              </div>
            </div>
            <div className="bg-slate-950 p-4 border border-emerald-900/10 rounded-xl text-center font-mono">
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Calculated Germination Rate</span>
              <span className="text-2xl font-bold text-white">{germRate}% Germination</span>
            </div>
            <div className="text-[9px] text-gray-500 font-mono">
              Guarantees high-performing seed profiles before distribution.
            </div>
          </div>
        );
      }
      if (activeScene === 3) {
        // Act IV: Seed Bag QR validator
        return (
          <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex flex-col justify-between shadow-2xl text-left">
            {consoleHeader("Seed bag QR code validator", "QR Traceback")}
            <div className="space-y-4 my-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Seed Bag QR (e.g. ST-SEED-9042)"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 h-10 px-3 bg-slate-950 border border-emerald-900/10 rounded-xl text-xs font-mono text-white focus:outline-none"
                />
                <Button onClick={() => handleQrSearch("ST-SEED-9042")} className="h-10 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono px-4 rounded-xl">Trace</Button>
              </div>
              {tracedBatch && (
                <div className="bg-slate-950 p-3 border border-emerald-900/10 rounded-xl text-[10px] font-mono text-gray-400 space-y-1">
                  <div className="text-[#53D769] font-bold">✓ GENETIC PEDIGREE VALIDATED</div>
                  <div>Lab Breeder ID: <span className="text-white">Breeder Lot B-12</span></div>
                  <div>Germination index: <span className="text-white">98.5% Checked</span></div>
                  <div>Pedigree Chain: <span className="text-white">100% Breeder to Certified</span></div>
                </div>
              )}
            </div>
            <div className="text-[9px] text-gray-500 font-mono">Try searching: "ST-SEED-9042"</div>
          </div>
        );
      }
    }

    return (
      <div className="bg-[#040C08] border border-emerald-900/30 rounded-3xl p-6 h-full flex items-center justify-center text-gray-500 font-mono text-xs">
        Visual element loaded: {scene.interactiveTitle}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#F4FBF7] to-[#EBF7F0] text-slate-800 selection:bg-[#53D769] selection:text-slate-950 overflow-x-hidden">
      {/* Immersive Hero Section */}
      <section 
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 61, 46, 0.75), rgba(7, 43, 31, 0.95)), url("${data.imagePath}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4FBF7] via-transparent to-transparent pointer-events-none"></div>
        
        {/* Glow overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#53D769]/10 blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-[1400px] mx-auto text-center relative z-10 space-y-8 px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-[#53D769] uppercase tracking-widest"
          >
            <Sprout className="w-4 h-4 text-[#53D769]" />
            Crop Insights Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-8xl font-black tracking-tight leading-none text-white max-w-4xl mx-auto"
          >
            {data.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-[#53D769] font-mono font-medium max-w-2xl mx-auto italic"
          >
            "{data.logline}"
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {data.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in"
          >
            <Button 
              size="lg" 
              onClick={() => {
                const el = document.getElementById("scrolly-story-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-14 px-8 text-base font-semibold font-mono rounded-full bg-[#53D769] hover:bg-emerald-500 text-slate-950 transition-all shadow-lg hover:shadow-emerald-400/20 border-none"
            >
              Explore Solutions
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base font-semibold font-mono rounded-full border-gray-400 hover:bg-white/5 text-white transition-all bg-transparent"
            >
              <Link href="/contact" className="w-full h-full flex items-center justify-center">Request Demo</Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating stats banner overlay */}
        <div className="absolute bottom-12 left-0 right-0 max-w-[1200px] mx-auto px-4 z-20 hidden md:block">
          <div className="grid grid-cols-3 gap-6 bg-[#040C08]/90 border border-emerald-950 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="text-center font-mono">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">{stat.label}</span>
                <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrollytelling Story/Act Section */}
      <section id="scrolly-story-section" ref={containerRef} className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left Hand: Scrolly Acts */}
          <div className="lg:col-span-6 space-y-32 py-12 lg:py-16">
            {data.scenes.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <div 
                  key={idx}
                  className={`scrolly-scene transition-all duration-500 p-8 rounded-3xl border ${
                    isActive 
                      ? "bg-white border-emerald-100 shadow-xl opacity-100 scale-100" 
                      : "border-transparent opacity-40 scale-95"
                  }`}
                >
                  <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block mb-4">
                    Act {idx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0B3D2E] mb-4">
                    {scene.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                    {scene.description}
                  </p>
                  
                  {scene.parameters && scene.parameters.length > 0 && (
                    <div className="border border-emerald-50 rounded-xl bg-slate-50 p-4 font-mono text-xs space-y-2">
                      <span className="text-[10px] text-emerald-800 uppercase block font-semibold border-b border-emerald-100 pb-1.5 mb-2">
                        Telemetry Parameters
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {scene.parameters.map((p, pIdx) => (
                          <div key={pIdx} className="flex justify-between items-center pr-3">
                            <span className="text-slate-500">{p.name}:</span>
                            <span className="text-[#0B3D2E] font-semibold">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-2 text-[#1F7A53] font-mono text-xs font-semibold cursor-pointer group">
                    <span>Explore parameter data</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Hand: Sticky Visual Widget */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 h-[500px] lg:h-[600px] mt-8 lg:mt-0 relative z-30">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeScene}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
              >
                {renderVisualWidget()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Dynamic ASCII Diagram Panel */}
      {data.diagram && (
        <section className="py-16 border-t border-b border-emerald-100 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-[#1F7A53] uppercase tracking-widest">
                <Cpu className="w-4 h-4" /> Platform Protocol Map
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3D2E]">Digital Custody Architecture</h2>
            </div>
            
            <div className="p-8 border border-emerald-100 rounded-3xl bg-[#040C08] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
              <div className="overflow-x-auto">
                <pre className="text-left font-mono text-xs leading-relaxed text-[#53D769]/90 whitespace-pre p-4 select-none">
                  {data.diagram}
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Footer Block */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-[#EAF7F0]">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1000px] mx-auto px-4 text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Certified Compliance
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0B3D2E] leading-none">
              Bridge the Farm Data Gap.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Partner with SourceTrace to deploy offline-first mobile scale validation, automated satellite deforestation audits, and direct payout wallets across your values chain.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 text-base font-semibold font-mono rounded-full bg-[#53D769] hover:bg-emerald-500 text-slate-950 transition-all shadow-lg hover:shadow-emerald-400/20 border-none"
            >
              <Link href="/contact" className="w-full h-full flex items-center justify-center">Initiate Enterprise Pilot</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base font-semibold font-mono rounded-full border-gray-300 hover:bg-slate-50 text-slate-700 transition-all bg-transparent"
            >
              <Link href="/request-demo" className="w-full h-full flex items-center justify-center">Talk to a Sourcing Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
