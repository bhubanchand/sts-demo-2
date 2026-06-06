"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Sprout, Leaf, Map, Database, Cpu, Scale, Thermometer, 
  QrCode, CreditCard, CheckCircle2, ChevronRight, Sliders, 
  DollarSign, Activity, AlertTriangle, ArrowRight, Shield, 
  Info, Sparkles, Droplet, Layers, RefreshCw
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

  // Custom interactive states
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [weight, setWeight] = useState(0);
  const [isWeighed, setIsWeighed] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [payoutStatus, setPayoutStatus] = useState<"idle" | "processing" | "success">("idle");
  const [radarHover, setRadarHover] = useState<string | null>(null);
  const [sliderVal1, setSliderVal1] = useState(50);
  const [sliderVal2, setSliderVal2] = useState(30);
  const [qrInput, setQrInput] = useState("");
  const [tracedBatch, setTracedBatch] = useState<any>(null);

  // Demo variables
  const primaryColor = data.colors.primary;
  const accentColor = data.colors.accent;

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
    setRadarHover(null);
    setTracedBatch(null);
    setQrInput("");
  }, [activeScene]);

  // Polygon Area calculation (fake multiplier)
  const calculateArea = (): string => {
    if (points.length < 3) return "0.00";
    // Calculate simple area of polygon
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    return Math.abs(area / 200).toFixed(2);
  };

  // Simulate scale weighing
  const handleWeigh = () => {
    setIsWeighed(true);
    let current = 0;
    const target = Math.floor(Math.random() * 80) + 40;
    const interval = setInterval(() => {
      current += Math.ceil((target - current) * 0.2);
      setWeight(current);
      if (current >= target) {
        setWeight(target);
        clearInterval(interval);
      }
    }, 50);
  };

  // Simulate digital payout
  const handlePayout = () => {
    setPayoutStatus("processing");
    setTimeout(() => {
      setPayoutStatus("success");
    }, 1500);
  };

  // Simulate QR Code search
  const handleQrSearch = () => {
    if (!qrInput.trim()) return;
    setTracedBatch({
      id: qrInput.toUpperCase(),
      farmer: "Ebenezer Mensah",
      location: "East Region, Ghana",
      area: "2.4 ha",
      deforestationCheck: "CLEARED (Post-2020 intact)",
      yieldGrade: "Premium (A+)",
      timestamp: new Date().toLocaleDateString()
    });
  };

  // Render crop specific interactive widgets
  const renderVisualWidget = () => {
    const scene = data.scenes[activeScene] || data.scenes[0];
    const visualType = scene.visualType;

    switch (visualType) {
      case "map": {
        const isAlert = points.length >= 4 && parseFloat(calculateArea()) > 3.5;
        return (
          <div className="bg-[#0b1329] border border-gray-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  {scene.interactiveTitle}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">GPS Status: Active</span>
              </div>
              <p className="text-xs text-gray-300 mb-4 font-mono">
                Click inside the grid below to plot the farm polygon boundaries (Requires minimum 3 points).
              </p>
            </div>

            {/* Interactive Grid Canvas */}
            <div 
              className="relative w-full aspect-square bg-slate-950 border border-gray-800 rounded-2xl cursor-crosshair overflow-hidden"
              onClick={(e) => {
                if (points.length >= 6) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setPoints([...points, { x, y }]);
              }}
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border-t border-l border-cyan-500/30"></div>
                ))}
              </div>

              {/* Polygon Path */}
              {points.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <polygon
                    points={points.map(p => `${p.x},${p.y}`).join(" ")}
                    fill="rgba(16, 185, 129, 0.15)"
                    stroke={isAlert ? "#ef4444" : "#10b981"}
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                </svg>
              )}

              {/* Coordinates Markers */}
              {points.map((p, idx) => (
                <div 
                  key={idx}
                  className="absolute w-3 h-3 -mt-1.5 -ml-1.5 bg-[#53D769] rounded-full border border-white shadow-lg animate-pulse"
                  style={{ left: p.x, top: p.y }}
                >
                  <span className="absolute left-4 top-0 bg-slate-900 text-[9px] text-gray-300 font-mono px-1 rounded border border-gray-700">
                    P{idx+1}
                  </span>
                </div>
              ))}

              {points.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                  <p className="text-xs text-gray-500 font-mono">Click to place farm coordinate coordinates</p>
                </div>
              )}
            </div>

            {/* Telemetry Output */}
            <div className="mt-4 bg-slate-900/50 p-4 border border-gray-800 rounded-xl">
              <div className="grid grid-cols-2 gap-4 text-left font-mono">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">Total Vertices</span>
                  <span className="text-sm font-semibold text-white">{points.length} nodes</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block">Calculated Hectares</span>
                  <span className="text-sm font-semibold text-emerald-400">{calculateArea()} ha</span>
                </div>
              </div>
              {points.length >= 3 && (
                <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-mono flex items-center gap-1.5">
                    {isAlert ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-red-500 font-semibold">Boundary Alert: Exceeds threshold</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Valid Forest Buffer Sourced</span>
                      </>
                    )}
                  </span>
                  <Button 
                    size="sm" 
                    className="h-7 px-3 bg-slate-800 text-[10px] font-mono hover:bg-slate-700 text-white"
                    onClick={() => setPoints([])}
                  >
                    Reset Map
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      }

      case "scale": {
        return (
          <div className="bg-[#0b1329] border border-gray-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  {scene.interactiveTitle}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Interface: Bluetooth BLE</span>
              </div>
              <p className="text-xs text-gray-300 mb-6 font-mono">
                Simulate cocoa/coffee bag intake weight calculation. Trigger digital scale to record.
              </p>
            </div>

            {/* Scale Visual representation */}
            <div className="flex flex-col items-center py-6">
              <div className="relative w-48 h-48 bg-slate-950 rounded-full border-4 border-gray-800 flex flex-col items-center justify-center shadow-inner">
                <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent rounded-full pointer-events-none"></div>
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase mb-1">Scale Telemetry</span>
                <span className="text-4xl font-mono text-white font-bold tracking-tight">
                  {weight} <span className="text-lg text-cyan-400">kg</span>
                </span>
                <span className="text-[9px] font-mono text-gray-500 mt-2">
                  {isWeighed ? "Stabilized" : "Empty / Zeroed"}
                </span>
              </div>

              {/* Bluetooth Link flow */}
              <div className="w-full flex items-center justify-center gap-2 mt-6">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
                <span className="text-[10px] font-mono text-gray-400 uppercase">Intake Stream Active</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleWeigh}
                disabled={isWeighed}
                className="w-full h-11 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold font-mono rounded-xl transition-all"
              >
                {isWeighed ? "Weight Saved to Ledger" : "Capture Intake Weight"}
              </Button>
              {isWeighed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/50 p-4 border border-emerald-800/30 rounded-xl text-left font-mono"
                >
                  <div className="flex justify-between items-center text-xs text-emerald-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> Transaction Synced</span>
                    <span className="text-[10px] text-gray-400">Lot: #LT-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                    <div>Gross Weight: <span className="text-white">{weight} kg</span></div>
                    <div>Farmer ID: <span className="text-white">ST-GH-8942</span></div>
                    <div>Location: <span className="text-white">05.2934, -01.3829</span></div>
                    <div>Status: <span className="text-white">Encrypted / Saved</span></div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      }

      case "ledger": {
        return (
          <div className="bg-[#0b1329] border border-gray-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  {scene.interactiveTitle}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Engine: DATAGREEN v4</span>
              </div>
              <p className="text-xs text-gray-300 mb-4 font-mono">
                Interactive real-time parameter tracking ledger. Hover to review warning/alert thresholds.
              </p>
            </div>

            {/* Table layout */}
            <div className="overflow-x-auto my-4 border border-gray-800 rounded-xl bg-slate-950 font-mono text-xs">
              <table className="min-w-full divide-y divide-gray-800 text-left">
                <thead className="bg-slate-900 text-gray-400 text-[10px] uppercase">
                  <tr>
                    <th className="px-4 py-3">Parameter</th>
                    <th className="px-4 py-3">Telemetry</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {scene.parameters?.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50">
                      <td className="px-4 py-3 font-semibold text-white">{p.name}</td>
                      <td className="px-4 py-3">{p.value}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          p.status === "alert" 
                            ? "bg-red-500/10 text-red-500" 
                            : p.status === "warning" 
                            ? "bg-amber-500/10 text-amber-500" 
                            : "bg-emerald-500/10 text-emerald-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            p.status === "alert" ? "bg-red-500" : p.status === "warning" ? "bg-amber-500" : "bg-emerald-500"
                          }`}></span>
                          {p.status || "Normal"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-900/50 p-4 border border-gray-800 rounded-xl font-mono text-xs">
              <span className="text-[10px] text-gray-500 uppercase block mb-1">Ledger Consensus Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-white text-xs font-semibold">12 Independent Nodes Verified</span>
              </div>
            </div>
          </div>
        );
      }

      case "scanner": {
        return (
          <div className="bg-[#0b1329] border border-gray-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  {scene.interactiveTitle}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Mode: NIR Spectrometry</span>
              </div>
              <p className="text-xs text-gray-300 mb-4 font-mono">
                Click "Scan Batch" to simulate spectrometer verification of organic purity.
              </p>
            </div>

            {/* Scanner Animation Viewport */}
            <div className="relative w-full aspect-[4/3] bg-slate-950 border border-gray-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4">
              <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent pointer-events-none"></div>

              {/* Laser line animation */}
              {isScanned && (
                <motion.div 
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10"
                ></motion.div>
              )}

              {isScanned ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col justify-center font-mono space-y-3"
                >
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 uppercase block">Purity Analysis</span>
                    <span className="text-xl font-bold text-cyan-400">99.8% Purity Verified</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400 bg-slate-900/50 p-3 rounded-lg border border-gray-800">
                    <div>Moisture: <span className="text-white">11.8% (OK)</span></div>
                    <div>Pesticides: <span className="text-white">0.00% (ND)</span></div>
                    <div>Toxins: <span className="text-white">Negative</span></div>
                    <div>Organic Cert: <span className="text-white">USDA/EU Valid</span></div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center font-mono space-y-2">
                  <div className="w-12 h-12 rounded-full border border-dashed border-cyan-500/50 flex items-center justify-center mx-auto mb-2 animate-spin">
                    <RefreshCw className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-xs text-gray-500">Device Ready. Place batch under scan envelope.</p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <Button 
                onClick={() => setIsScanned(!isScanned)}
                className="w-full h-11 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold font-mono rounded-xl transition-all"
              >
                {isScanned ? "Scan Another Batch" : "Initiate Spectrometer Scan"}
              </Button>
            </div>
          </div>
        );
      }

      case "calculator": {
        const value = ((sliderVal1 * 0.44) + (sliderVal2 * 0.22)).toFixed(2);
        const isCompliant = parseFloat(value) > 30.0;
        
        return (
          <div className="bg-[#0b1329] border border-gray-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  {scene.interactiveTitle}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Metric: Carbon Intensity</span>
              </div>
              <p className="text-xs text-gray-300 mb-6 font-mono">
                Adjust sliders to simulate changes in farming practices and estimate methane mitigation or carbon sequestration outputs.
              </p>
            </div>

            {/* Custom Sliders */}
            <div className="space-y-6 my-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Alternate Wetting (AWD) Implementation</span>
                  <span className="text-white font-semibold">{sliderVal1}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderVal1}
                  onChange={(e) => setSliderVal1(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>Nitrogen Fertilizer Reduction</span>
                  <span className="text-white font-semibold">{sliderVal2}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderVal2}
                  onChange={(e) => setSliderVal2(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 border border-gray-800 rounded-2xl font-mono text-center space-y-1 my-4">
              <span className="text-[10px] text-gray-500 uppercase block">Est. Sequestration/Mitigation</span>
              <span className="text-3xl font-bold text-cyan-400">
                {value} <span className="text-sm">tCO2e/ha/yr</span>
              </span>
              <span className={`inline-block text-[9px] uppercase font-semibold px-2 py-0.5 rounded ${
                isCompliant ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
              }`}>
                {isCompliant ? "Carbon Credit Compliant" : "Below Offset Threshold"}
              </span>
            </div>

            <div>
              <Button 
                onClick={handlePayout}
                disabled={payoutStatus !== "idle"}
                className={`w-full h-11 font-bold font-mono rounded-xl transition-all ${
                  payoutStatus === "success" 
                    ? "bg-emerald-500 text-white" 
                    : payoutStatus === "processing" 
                    ? "bg-slate-800 text-gray-400" 
                    : "bg-cyan-500 hover:bg-cyan-600 text-slate-950"
                }`}
              >
                {payoutStatus === "success" 
                  ? "✓ Premium Transferred to Farmer Wallet" 
                  : payoutStatus === "processing" 
                  ? "Securing Transaction Hash..." 
                  : "Disburse direct organic premium"}
              </Button>
            </div>
          </div>
        );
      }

      case "lineage": {
        return (
          <div className="bg-[#0b1329] border border-gray-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  {scene.interactiveTitle}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Consensus: Verified</span>
              </div>
              <p className="text-xs text-gray-300 mb-4 font-mono">
                Trace seed packaging details from the breeder lot to the final grower bag. Enter batch code.
              </p>
            </div>

            {/* Input and Search Box */}
            <div className="space-y-4 my-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter QR / Batch ID (e.g. ST-SEED-9042)" 
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 h-10 px-3 bg-slate-950 border border-gray-800 rounded-xl text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
                <Button 
                  onClick={handleQrSearch}
                  className="h-10 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold font-mono px-4 rounded-xl"
                >
                  Search
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {tracedBatch ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-950 border border-gray-800 rounded-2xl p-4 font-mono text-left space-y-3"
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-emerald-400 border-b border-gray-800 pb-2">
                      <span>✓ Seed Lineage Verified</span>
                      <span className="text-white">{tracedBatch.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[10px] text-gray-400">
                      <div>Grower Coop: <span className="text-white">{tracedBatch.farmer}</span></div>
                      <div>Region: <span className="text-white">{tracedBatch.location}</span></div>
                      <div>Mapped Area: <span className="text-white">{tracedBatch.area}</span></div>
                      <div>Purity Check: <span className="text-emerald-400 font-semibold">{tracedBatch.deforestationCheck}</span></div>
                      <div>Yield Grade: <span className="text-white">{tracedBatch.yieldGrade}</span></div>
                      <div>Audit Date: <span className="text-white">{tracedBatch.timestamp}</span></div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-slate-950/50 border border-dashed border-gray-800 rounded-2xl p-8 text-center text-gray-500 font-mono text-xs">
                    Try searching: "ST-SEED-9042" to trace pedigree lineage history.
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-slate-900/50 p-4 border border-gray-800 rounded-xl font-mono text-[10px] text-gray-400 space-y-1">
              <span className="text-gray-500 uppercase block font-semibold">Consensus Engine Validation</span>
              <p>Cryptographic hash verified by 3 separate processing loops in DATAGREEN adapter node.</p>
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="bg-[#0b1329] border border-gray-800 rounded-3xl p-6 h-full flex items-center justify-center text-gray-500 font-mono text-xs">
            Visual element loaded: {scene.interactiveTitle}
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* Immersive Hero Section */}
      <section 
        className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 19, 41, 0.7), rgba(7, 11, 25, 0.95)), url("${data.imagePath}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Particle/Glow overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-[1400px] mx-auto text-center relative z-10 space-y-8 px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-cyan-400 uppercase tracking-widest"
          >
            <Sprout className="w-4 h-4 text-emerald-400" />
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
            className="text-xl sm:text-2xl text-cyan-400 font-mono font-medium max-w-2xl mx-auto italic"
          >
            "{data.logline}"
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {data.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => {
                const el = document.getElementById("scrolly-story-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-14 px-8 text-base font-semibold font-mono rounded-full bg-cyan-400 hover:bg-cyan-500 text-slate-950 transition-all shadow-lg hover:shadow-cyan-400/20"
            >
              Explore Solutions
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base font-semibold font-mono rounded-full border-gray-700 hover:bg-white/5 hover:text-white transition-all"
            >
              <Link href="/contact" className="w-full h-full flex items-center justify-center">Request Demo</Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating stats banner overlay */}
        <div className="absolute bottom-12 left-0 right-0 max-w-[1200px] mx-auto px-4 z-20 hidden md:block">
          <div className="grid grid-cols-3 gap-6 bg-slate-900/60 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
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
      <section id="scrolly-story-section" ref={containerRef} className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left Hand: Scrolly Acts */}
          <div className="lg:col-span-6 space-y-32 py-12 lg:py-24">
            {data.scenes.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <div 
                  key={idx}
                  className={`scrolly-scene transition-all duration-500 p-8 rounded-3xl border ${
                    isActive 
                      ? "bg-slate-900/60 border-cyan-500/30 shadow-xl opacity-100 scale-100" 
                      : "border-transparent opacity-40 scale-95"
                  }`}
                >
                  <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest block mb-4">
                    Act {idx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {scene.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                    {scene.description}
                  </p>
                  
                  {scene.parameters && (
                    <div className="border border-gray-800 rounded-xl bg-slate-950 p-4 font-mono text-xs space-y-2">
                      <span className="text-[10px] text-gray-500 uppercase block font-semibold border-b border-gray-900 pb-1.5 mb-2">
                        Telemetry Parameters
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {scene.parameters.map((p, pIdx) => (
                          <div key={pIdx} className="flex justify-between items-center pr-3">
                            <span className="text-gray-400">{p.name}:</span>
                            <span className="text-white font-semibold">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold cursor-pointer group">
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
        <section className="py-20 border-t border-b border-gray-900 bg-slate-950">
          <div className="max-w-[1200px] mx-auto px-4 text-center space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-cyan-400 uppercase tracking-widest">
                <Cpu className="w-4 h-4" /> Platform Protocol Map
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Digital Custody Architecture</h2>
            </div>
            
            <div className="p-8 border border-gray-800 rounded-3xl bg-[#070b16] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
              <div className="overflow-x-auto">
                <pre className="text-left font-mono text-xs leading-relaxed text-cyan-400/90 whitespace-pre p-4 select-none">
                  {data.diagram}
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Footer Block */}
      <section className="py-24 relative overflow-hidden bg-slate-950">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-[1000px] mx-auto px-4 text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest block">
              Certified Compliance
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
              Bridge the Farm Data Gap.
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Partner with SourceTrace to deploy offline-first mobile scale validation, automated satellite deforestation audits, and direct payout wallets across your values chain.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 text-base font-semibold font-mono rounded-full bg-cyan-400 hover:bg-cyan-500 text-slate-950 transition-all shadow-lg hover:shadow-cyan-400/20"
            >
              <Link href="/contact" className="w-full h-full flex items-center justify-center">Initiate Enterprise Pilot</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base font-semibold font-mono rounded-full border-gray-800 hover:bg-white/5 hover:text-white transition-all text-gray-300"
            >
              <Link href="/request-demo" className="w-full h-full flex items-center justify-center">Talk to a Sourcing Expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
