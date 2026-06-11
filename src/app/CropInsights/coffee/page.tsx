"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Coffee, Sprout, Map, Activity, ShieldCheck, User, Layers, 
  Warehouse, Globe, Award, FileText, ChevronDown, ChevronRight, Check, HelpCircle,
  TrendingUp, Play, ArrowRight, X, Phone, Mail, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Challenges data
const CHALLENGES = [
  { title: "Unknown farm origins", desc: "Difficulty verifying exact plot coordinates and compliance profiles.", icon: Map },
  { title: "Inconsistent quality records", desc: "Paper logs lead to blending anomalies and quality data loss.", icon: FileText },
  { title: "Sustainability reporting gaps", desc: "Lack of field carbon, shade-tree, or child labor proximity metrics.", icon: Activity },
  { title: "Certification compliance risks", desc: "Manual audits risk missing RA, Organic, or EUDR regulations.", icon: ShieldCheck },
  { title: "Limited farmer visibility", desc: "No direct communications or transparent transactions at coffee gates.", icon: User },
  { title: "Supply chain inefficiencies", desc: "Fragmented systems delay milling, processing, and customs clearance.", icon: Layers }
];

// How it works steps
const STEPS = [
  {
    title: "Farmer Registration",
    short: "Profiles & Demographics",
    desc: "Capture farmer profiles, demographics, certifications, and production details at the co-op office or farm gate.",
    detail: "Offline-first mobile registry works in remote mountain elevations, storing household size, socio-economic baseline surveys, and training program participation.",
    metrics: [{ label: "Registry Time", value: "< 3 mins" }, { label: "Offline Sync", value: "Auto-Reconnect" }]
  },
  {
    title: "Farm Mapping",
    short: "GPS Plot Shapes",
    desc: "Map coffee plots using GPS technology and verify sourcing origins against forest boundary databases.",
    detail: "GIS-enabled polygon mapping overlaying farm outlines against Peatland databases and historical deforestation maps to ensure 100% EUDR alignment.",
    metrics: [{ label: "Precision", value: "Sub-5m GPS" }, { label: "Deforest sweep", value: "Sentinel-2" }]
  },
  {
    title: "Harvest Tracking",
    short: "Cherry Collection",
    desc: "Record harvest quantities, quality parameters, and collection events directly at farmer delivery points.",
    detail: "Integrates with Bluetooth BLE scales. Weight, humidity, and defect levels are saved instantly to the grower's ledger, eliminating manual entry errors.",
    metrics: [{ label: "Moisture target", value: "11-12%" }, { label: "Scale sync", value: "Instant BLE" }]
  },
  {
    title: "Processing Visibility",
    short: "Wet & Dry Milling",
    desc: "Track washing, fermentation, drying, grading, and storage activities throughout the cooperative mill.",
    detail: "Monitor fermentation times, washing water pH, drying patio temperature, and hulling sorting grades. Every step creates a traceable parent-child lot record.",
    metrics: [{ label: "Water pH limit", value: "6.5 - 7.5" }, { label: "Trace links", value: "Multi-lot hierarchy" }]
  },
  {
    title: "Export Readiness",
    short: "Phytosanitary & Hash",
    desc: "Maintain complete lot histories, quality grade sheets, and compliance documentation for customs clearance.",
    detail: "Generate automated, tamper-proof digital trace export files containing phytosanitary reports, Bill of Lading, and EUDR Due Diligence Statements.",
    metrics: [{ label: "Export dossier", value: "PDF & XML" }, { label: "Tamper check", value: "Cryptographic hash" }]
  },
  {
    title: "End-To-End Traceability",
    short: "Roaster Traceback",
    desc: "Connect coffee shipments back to individual farms and producer groups for final retail roasters.",
    detail: "Generates customer-facing trace portals. Roasters and consumers scan a package QR code to view the farmer's story, cupping scores, and verified fair premium payouts.",
    metrics: [{ label: "Consumer QR", value: "Active" }, { label: "Fair Trade premium", value: "Fully audited" }]
  }
];

// Capabilities data
const CAPABILITIES = [
  { title: "Farm-Level Traceability", desc: "Track coffee lots from farm to export with complete transparency.", icon: ShieldCheck },
  { title: "Sustainability Monitoring", desc: "Measure environmental and social impact across sourcing regions.", icon: Activity },
  { title: "Digital Farmer Management", desc: "Manage grower relationships, field activities, and advisory programs.", icon: User },
  { title: "Quality Intelligence", desc: "Capture quality metrics throughout harvesting and processing stages.", icon: Award },
  { title: "Certification Support", desc: "Support Rainforest Alliance, Organic, Fair Trade, and sustainability initiatives.", icon: FileText },
  { title: "Real-Time Dashboards", desc: "Monitor sourcing operations through centralized reporting and analytics.", icon: Globe }
];

// Value Chain Stages
const VALUE_CHAIN_STAGES = [
  { id: "farm", label: "Coffee Farm", desc: "GPS mapping, registration & agronomic inputs." },
  { id: "collection", label: "Farmer Collection Point", desc: "BLE scale weighing & cherry intake logs." },
  { id: "washing", label: "Washing Station", desc: "Fermentation time & drying patio temperature checks." },
  { id: "dry_mill", label: "Dry Mill", desc: "Hulling, sorting, quality grading & bagging." },
  { id: "warehouse", label: "Export Warehouse", desc: "EUDR declarations & lot-level tracking." },
  { id: "buyer", label: "International Buyer", desc: "Customs clearance & shipment receipt." },
  { id: "roaster", label: "Roaster", desc: "Roasting batches linked back to washing lot tags." },
  { id: "consumer", label: "Consumer", desc: "QR scan displaying farm story & premium proofs." }
];

// Business Impact Cards
const IMPACTS = [
  { title: "Stronger Traceability", desc: "Verify product origins with confidence.", metric: "100%", sub: "Verified origin plots" },
  { title: "Better Farmer Engagement", desc: "Improve communication and program participation.", metric: "+40%", sub: "Cooperative loyalty" },
  { title: "Improved Quality Control", desc: "Capture quality insights throughout processing.", metric: "-15%", sub: "Defective lot rates" },
  { title: "Faster Compliance Reporting", desc: "Generate sustainability and certification reports efficiently.", metric: "10x", sub: "Faster audit turnaround" },
  { title: "Reduced Operational Risk", desc: "Increase visibility across sourcing networks.", metric: "-25%", sub: "Gate weight disputes" },
  { title: "Enhanced Buyer Confidence", desc: "Provide verified supply chain transparency.", metric: "+12%", sub: "Roaster premium captured" }
];

// FAQ Data
const FAQS = [
  {
    q: "How does SourceTrace support coffee traceability?",
    a: "SourceTrace records every activity from farm registration through processing and export, creating complete lot-level traceability."
  },
  {
    q: "Can SourceTrace support certification programs?",
    a: "Yes. The platform supports sustainability and certification initiatives including Organic, Fair Trade, and Rainforest Alliance programs."
  },
  {
    q: "How are coffee farms mapped?",
    a: "Field teams use GPS-enabled mobile applications to capture accurate farm boundaries and location data."
  },
  {
    q: "Can coffee buyers verify product origins?",
    a: "Yes. Traceability records connect coffee lots directly back to their source farms and producer groups."
  },
  {
    q: "Does SourceTrace work offline?",
    a: "Yes. Data can be collected in remote regions and synchronized once connectivity becomes available."
  }
];

export default function CoffeeSolutionsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [dashboardFilter, setDashboardFilter] = useState<"global" | "latam" | "africa">("global");
  const [demoOpen, setDemoOpen] = useState(false);

  // Simulated Dashboard Data based on filter
  const getDashboardData = () => {
    switch (dashboardFilter) {
      case "latam":
        return { farmers: "6,240", mapped: "5,890", volume: "4,120 Tons", score: "88.2 / 100", cert: "RA & Organic Premium" };
      case "africa":
        return { farmers: "4,320", mapped: "3,950", volume: "2,840 Tons", score: "86.9 / 100", cert: "Fair Trade & Organic" };
      default:
        return { farmers: "12,480", mapped: "11,840", volume: "8,420 Tons", score: "87.5 / 100", cert: "All certified sources" };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#F4FBF7] to-[#EBF7F0] text-slate-800 selection:bg-[#53D769] selection:text-slate-950 overflow-x-hidden pt-20">
      
      {/* ─── SECTION 1: HERO SECTION ─── */}
      <section 
        className="relative min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-8 py-16 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 61, 46, 0.75), rgba(7, 43, 31, 0.95)), url("/images/crops/coffee_farm.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4FBF7] via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#53D769]/15 blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10 space-y-8 px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-[#53D769] uppercase tracking-widest"
          >
            <Coffee className="w-4 h-4 text-[#53D769]" />
            Coffee Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-7xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto"
          >
            Coffee Traceability From Farm To Cup
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl text-[#53D769] font-mono font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Build transparent, sustainable, and traceable coffee supply chains with real-time visibility from farmer to roaster.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed space-y-4"
          >
            <p>
              Today&apos;s coffee buyers demand more than quality beans. They require proof of origin, sustainability compliance, farmer engagement, and supply chain transparency.
            </p>
            <p className="text-gray-300">
              SourceTrace helps coffee organizations digitize sourcing operations, track every lot throughout the value chain, verify sustainability programs, and provide complete traceability from farm to final export.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => setDemoOpen(true)}
              className="h-14 px-8 text-base font-semibold font-mono rounded-full bg-[#53D769] hover:bg-emerald-500 text-slate-950 transition-all shadow-lg hover:shadow-emerald-400/20 border-none w-full sm:w-auto"
            >
              Request Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base font-semibold font-mono rounded-full border-gray-400 hover:bg-white/5 text-white transition-all bg-transparent flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={() => {
                const el = document.getElementById("works-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Play className="w-4 h-4 fill-current text-[#53D769]" />
              Watch Platform Overview
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: THE CHALLENGE ─── */}
      <section className="py-16 bg-white border-b border-emerald-100/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                The Sourcing Gap
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Coffee Supply Chains Are More Complex Than Ever
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Coffee travels through multiple stakeholders before reaching consumers. Farmers, cooperatives, washing stations, exporters, importers, and roasters all contribute to the journey.
              </p>
              <p className="text-slate-600 leading-relaxed font-semibold">
                Without reliable data collection and traceability systems, organizations face challenges such as:
              </p>
              <div className="p-5 bg-[#F4FBF7] border-l-4 border-[#53D769] rounded-r-2xl font-mono text-sm text-[#0B3D2E]">
                SourceTrace eliminates these challenges by creating a connected digital ecosystem across the coffee value chain.
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {CHALLENGES.map((ch, idx) => {
                const IconComponent = ch.icon;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-[#FBFDFB] border border-emerald-50 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-left flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F7A53] flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base mb-1">{ch.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{ch.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: HOW SOURCETRACE WORKS ─── */}
      <section id="works-section" className="py-16 bg-gradient-to-b from-[#FBFDFB] to-[#F4FBF7]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Digital Pipeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Digitizing Every Step Of The Coffee Journey
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Step Selection Tabs */}
            <div className="lg:col-span-4 flex flex-col justify-start gap-2">
              {STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 text-left rounded-2xl border transition-all duration-300 font-mono text-sm flex justify-between items-center ${
                    activeStep === idx 
                      ? "bg-[#0B3D2E] text-white border-transparent shadow-xl" 
                      : "bg-white text-slate-600 border-emerald-50 hover:bg-emerald-50/20 hover:border-emerald-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === idx ? "bg-[#53D769] text-[#0B3D2E]" : "bg-emerald-50 text-[#1F7A53]"}`}>
                      {idx + 1}
                    </span>
                    <span>{step.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeStep === idx ? "translate-x-1" : "text-slate-300"}`} />
                </button>
              ))}
            </div>

            {/* Display Active Details */}
            <div className="lg:col-span-8 bg-[#040C08] border border-emerald-950 rounded-3xl p-6 sm:p-10 text-left text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-emerald-900/30 pb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#53D769] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#53D769] animate-pulse" />
                    Process stage {activeStep + 1} / 6
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">{STEPS[activeStep].short}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white">{STEPS[activeStep].title}</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{STEPS[activeStep].desc}</p>
                <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-emerald-950/20">
                  {STEPS[activeStep].detail}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-emerald-900/20 font-mono">
                {STEPS[activeStep].metrics.map((m, mIdx) => (
                  <div key={mIdx} className="bg-slate-950/50 p-3 rounded-lg border border-emerald-950/20">
                    <span className="text-[9px] text-gray-500 block uppercase">{m.label}</span>
                    <span className="text-sm font-semibold text-[#53D769]">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: KEY CAPABILITIES ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Core Modules
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Built For Modern Coffee Supply Chains
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#FBFDFB] border border-emerald-50 rounded-3xl p-8 text-left hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1F7A53] flex items-center justify-center transition-all group-hover:bg-[#53D769] group-hover:text-slate-950">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B3D2E]">{cap.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-emerald-50/50 flex items-center gap-2 text-xs font-mono text-[#1F7A53] font-semibold cursor-pointer group-hover:text-emerald-500 transition-all">
                    <span>Learn more modules</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: VALUE CHAIN VISIBILITY ─── */}
      <section className="py-16 bg-gradient-to-b from-[#F4FBF7] to-[#EBF7F0] border-t border-b border-emerald-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Global Custody Chain
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              From Coffee Cherry To Global Markets
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Every transaction, quality assessment, and movement is digitally recorded and traceable.
            </p>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="relative overflow-x-auto py-8 px-4 flex justify-start lg:justify-center items-center gap-3 select-none scrollbar-thin">
            {VALUE_CHAIN_STAGES.map((st, idx) => (
              <React.Fragment key={st.id}>
                <div 
                  className={`relative p-4 rounded-2xl border transition-all duration-300 w-44 text-center shrink-0 cursor-pointer ${
                    hoveredStage === st.id 
                      ? "bg-[#0B3D2E] text-white border-transparent shadow-lg scale-105" 
                      : "bg-white text-slate-700 border-emerald-100 hover:border-emerald-300"
                  }`}
                  onMouseEnter={() => setHoveredStage(st.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                >
                  <span className={`text-[9px] font-mono font-bold block mb-1 uppercase ${hoveredStage === st.id ? "text-[#53D769]" : "text-emerald-600"}`}>
                    Stage 0{idx + 1}
                  </span>
                  <span className="text-xs font-bold block leading-tight">{st.label}</span>

                  <AnimatePresence>
                    {hoveredStage === st.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 bg-slate-900 border border-emerald-950 p-3 rounded-xl shadow-2xl z-20 text-left text-[10px] text-gray-300 font-mono"
                      >
                        <span className="text-[#53D769] block mb-1 uppercase font-bold text-[8px]">Protocol Track:</span>
                        {st.desc}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {idx < VALUE_CHAIN_STAGES.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-emerald-300 shrink-0 animate-pulse hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 font-mono italic">
            *Hover over any node above to inspect the recorded digital custody protocols.
          </p>
        </div>
      </section>

      {/* ─── SECTION 6: BUSINESS IMPACT ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Proven Outcomes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Create Measurable Outcomes Across Your Coffee Program
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACTS.map((imp, idx) => (
              <div 
                key={idx}
                className="bg-[#FBFDFB] border border-emerald-50 rounded-3xl p-8 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-[#53D769]/10 transition-all"></div>
                
                <div className="space-y-3">
                  <span className="text-4xl font-black text-[#1F7A53] tracking-tight block font-mono">
                    {imp.metric}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold">
                    {imp.sub}
                  </span>
                  <h4 className="font-bold text-[#0B3D2E] text-lg leading-snug">{imp.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{imp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: INSIGHTS DASHBOARD ─── */}
      <section className="py-16 bg-gradient-to-b from-[#FBFDFB] to-[#F4FBF7] border-t border-b border-emerald-100/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                Agri-Intelligence
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Transform Coffee Data Into Actionable Intelligence
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Connect and monitor your field metrics instantly. Evaluate farm registrations, map compliance buffers, audit harvest weights, and generate export documents through a single unified portal.
              </p>

              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-full font-mono text-xs max-w-xs border border-emerald-50">
                <button 
                  onClick={() => setDashboardFilter("global")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "global" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Global
                </button>
                <button 
                  onClick={() => setDashboardFilter("latam")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "latam" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  LatAm
                </button>
                <button 
                  onClick={() => setDashboardFilter("africa")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "africa" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Africa
                </button>
              </div>
            </div>

            {/* Dashboard Mock Visual */}
            <div className="lg:col-span-7 bg-[#040C08] border border-emerald-950 rounded-3xl p-6 sm:p-8 shadow-2xl text-white font-mono text-xs">
              <div className="flex justify-between items-center border-b border-emerald-900/30 pb-4 mb-6">
                <span className="text-[#53D769] uppercase font-bold tracking-wider text-[10px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#53D769] animate-pulse" />
                  SourceTrace Coffee Console
                </span>
                <span className="text-[8px] text-gray-500">Filters: {dashboardFilter.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-950/60 p-4 border border-emerald-900/10 rounded-xl">
                  <span className="text-[8px] text-gray-500 block uppercase mb-1">Coffee Farmers Registered</span>
                  <span className="text-xl font-bold text-white tracking-tight">{dashboardData.farmers}</span>
                </div>
                <div className="bg-slate-950/60 p-4 border border-emerald-900/10 rounded-xl">
                  <span className="text-[8px] text-gray-500 block uppercase mb-1">Mapped Coffee Farms</span>
                  <span className="text-xl font-bold text-white tracking-tight">{dashboardData.mapped}</span>
                  <span className="text-[8px] text-emerald-400 block mt-1">✓ 100% EUDR Compliant</span>
                </div>
                <div className="bg-slate-950/60 p-4 border border-emerald-900/10 rounded-xl">
                  <span className="text-[8px] text-gray-500 block uppercase mb-1">Harvest Volumes</span>
                  <span className="text-xl font-bold text-white tracking-tight">{dashboardData.volume}</span>
                </div>
                <div className="bg-slate-950/60 p-4 border border-emerald-900/10 rounded-xl">
                  <span className="text-[8px] text-gray-500 block uppercase mb-1">Quality Scores (Avg)</span>
                  <span className="text-xl font-bold text-[#53D769] tracking-tight">{dashboardData.score}</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 border border-emerald-900/20 rounded-xl space-y-3">
                <span className="text-[8px] text-gray-500 block uppercase">Real-Time Sourcing Metrics</span>
                <div className="flex justify-between items-center text-[10px]">
                  <span>Certification Status</span>
                  <span className="text-white font-semibold">{dashboardData.cert}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#53D769] rounded-full transition-all duration-500" style={{ width: dashboardFilter === "global" ? "92%" : dashboardFilter === "latam" ? "94%" : "91%" }}></div>
                </div>

                <div className="flex justify-between items-center text-[10px] pt-1.5">
                  <span>Supply Chain Traceability</span>
                  <span className="text-white font-semibold">Active Lots Mapped</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: dashboardFilter === "global" ? "88%" : dashboardFilter === "latam" ? "92%" : "84%" }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FAQ ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Common Queries
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-emerald-50 rounded-2xl overflow-hidden transition-all bg-[#FBFDFB]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center font-bold text-slate-800 text-sm sm:text-base hover:bg-emerald-50/20"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#1F7A53] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5 pt-0 text-sm text-slate-600 border-t border-emerald-50/50 leading-relaxed font-mono">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ─── */}
      <section className="py-16 relative overflow-hidden bg-[#0B3D2E] text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-[#072B1F] via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-[800px] mx-auto px-6 text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono text-[#53D769] uppercase tracking-widest block">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
              Build Trust Through Coffee Traceability
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Connect farmers, cooperatives, processors, exporters, and buyers through one digital platform designed for modern coffee supply chains.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              size="lg" 
              onClick={() => setDemoOpen(true)}
              className="h-14 px-8 text-base font-semibold font-mono rounded-full bg-[#53D769] hover:bg-emerald-500 text-slate-950 transition-all shadow-lg hover:shadow-emerald-400/20 border-none w-full sm:w-auto"
            >
              Request A Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setDemoOpen(true)}
              className="h-14 px-8 text-base font-semibold font-mono rounded-full border-white/20 hover:bg-white/10 text-white transition-all bg-transparent w-full sm:w-auto"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* ─── SIMULATED CONTACT MODAL ─── */}
      <AnimatePresence>
        {demoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDemoOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl z-10 border border-emerald-50 text-slate-800"
            >
              <button 
                onClick={() => setDemoOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3 mb-6">
                <Coffee className="w-10 h-10 text-[#1F7A53] mx-auto" />
                <h3 className="text-2xl font-bold text-[#0B3D2E]">Request Coffee Pilot Demo</h3>
                <p className="text-xs text-slate-500">Connect with a coffee sourcing and compliance expert.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Company Contact Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#53D769]" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Sourcing Interest / Origin</label>
                  <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none">
                    <option>Central/South America</option>
                    <option>East Africa</option>
                    <option>Southeast Asia</option>
                    <option>General Sourcing / Importation</option>
                  </select>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 space-y-2 text-slate-600 font-mono text-[10px] leading-relaxed">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>Global Line: +1 (800) 555-TRACE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>sourcing@sourcetrace.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>Response under 24 hours guaranteed</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setDemoOpen(false)}
                  className="w-full h-12 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-xl border-none"
                >
                  Submit Inquiry
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
