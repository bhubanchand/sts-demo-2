"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Sprout, Map, Activity, ShieldCheck, User, Layers, 
  Warehouse, Globe, Award, FileText, ChevronDown, ChevronRight, Check, HelpCircle,
  TrendingUp, Play, ArrowRight, X, Phone, Mail, Clock, Droplet, Leaf, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Challenges data
const CHALLENGES = [
  { title: "Water management inefficiencies", desc: "Traditional flooding drains local aquifers and increases water costs.", icon: Droplet },
  { title: "Climate-related risks", desc: "Unpredictable monsoon shifts and dry spells impact seasonal outputs.", icon: AlertTriangle },
  { title: "Low visibility into field operations", desc: "No direct monitoring of input timings or fertilizer schedules.", icon: Map },
  { title: "Limited farmer engagement", desc: "Hard to communicate best practices or deliver advisory warnings.", icon: User },
  { title: "Sustainability reporting requirements", desc: "High manual audit burden for ESG metrics and carbon credits.", icon: FileText },
  { title: "Traceability gaps", desc: "Mixed milling batches obscure farm origins and certified programs.", icon: Layers },
  { title: "Carbon reduction targets", desc: "Gaps in verifying methane reduction from AWD wetting cycles.", icon: Leaf }
];

// How it works steps
const STEPS = [
  {
    title: "Farmer Registration",
    short: "Farmer Profile",
    desc: "Create comprehensive digital farmer profiles at local cooperative points.",
    detail: "Record producer identification, family details, land tenure documents, and baselines surveys to build unified grower records.",
    metrics: [{ label: "Registry Time", value: "3 mins avg" }, { label: "Farmer sync", value: "Fully Ledgered" }]
  },
  {
    title: "Farm Mapping",
    short: "Plot Polygons",
    desc: "Capture GPS field boundaries and cultivation areas directly in the paddy fields.",
    detail: "GIS-enabled polygon mapping captures exact plot borders, resolving yield estimations and trackingPeatland coordinates.",
    metrics: [{ label: "Map precision", value: "< 3m GPS" }, { label: "Boundary checks", value: "Active GIS" }]
  },
  {
    title: "Crop Monitoring",
    short: "Cultivation Trace",
    desc: "Track planting, irrigation, fertilizer applications, and crop development.",
    detail: "Log input schedules, record water drainage intervals, and trace fertilizer application dosages across growing plots.",
    metrics: [{ label: "Input auditing", value: "100% Logged" }, { label: "Growth records", value: "Dynamic Phases" }]
  },
  {
    title: "Advisory Services",
    short: "Extension SMS",
    desc: "Deliver targeted recommendations and field guidance directly to smallholders.",
    detail: "Automatically push weather warnings, fertilizer advice, and pest alerts tailored to individual plot maturity timelines.",
    metrics: [{ label: "Advisory Delivery", value: "< 10 seconds" }, { label: "Reach standard", value: "Co-op Broadcast" }]
  },
  {
    title: "Harvest Tracking",
    short: "Volume Intake",
    desc: "Record production volumes and harvest activities.",
    detail: "Record weight, moisture level, and crop grade directly at gate intake points using Bluetooth scales connected to the mobile app.",
    metrics: [{ label: "Moisture Limit", value: "13.5% Target" }, { label: "BLE Gate Scale", value: "Stably Synced" }]
  },
  {
    title: "Procurement Visibility",
    short: "Aggregation Log",
    desc: "Digitize collection, aggregation, and sourcing operations.",
    detail: "Logs co-op purchases, aggregates bag batches, prints unique barcodes, and records payment transactions securely.",
    metrics: [{ label: "Purchase record", value: "Verified LEDGER" }, { label: "Bag tracking", value: "Active QR code" }]
  },
  {
    title: "Traceability Management",
    short: "Roaster / Buyer",
    desc: "Maintain end-to-end visibility from farm to final buyer.",
    detail: "Generate product trace sheets. Importers and food brands traceback retail packages back to cooperative grower groups.",
    metrics: [{ label: "Traceability scope", value: "100% Verified" }, { label: "Customs audit", value: "Phytosanitary check" }]
  }
];

// Capabilities data
const CAPABILITIES = [
  { title: "Field-Level Visibility", desc: "Monitor cultivation activities across thousands of rice farms.", icon: Map },
  { title: "Water Management Insights", desc: "Support efficient irrigation and sustainable water use practices.", icon: Droplet },
  { title: "Farmer Engagement", desc: "Strengthen communication and extension services.", icon: User },
  { title: "Climate-Smart Agriculture", desc: "Track sustainable farming practices and environmental outcomes.", icon: Leaf },
  { title: "Carbon Program Enablement", desc: "Support data collection for carbon and regenerative agriculture initiatives.", icon: Activity },
  { title: "Supply Chain Traceability", desc: "Track rice production and sourcing activities from field to market.", icon: ShieldCheck }
];

// Value Chain Stages
const VALUE_CHAIN_STAGES = [
  { id: "farm", label: "Rice Farm", desc: "GPS mapping, crop monitoring, and water log audits." },
  { id: "group", label: "Farmer Group", desc: "Co-op lot consolidation, extension support & training." },
  { id: "center", label: "Collection Center", desc: "BLE scale weighing, intake logs and moisture checks." },
  { id: "drying", label: "Drying Facility", desc: "Log temperature curves and target moisture levels." },
  { id: "storage", label: "Storage Facility", desc: "Silo aeration status, humidity controls and lot IDs." },
  { id: "mill", label: "Rice Mill", desc: "Hulling, grading, polishing and bag tag printing." },
  { id: "distributor", label: "Distributor", desc: "Shipment customs audits and lot traceability." },
  { id: "market", label: "Retail Market", desc: "Store inventory tracking and consumer QR access." },
  { id: "consumer", label: "Consumer", desc: "QR scan displaying farm details & AWD carbon offsets." }
];

// Climate list items
const CLIMATE_ITEMS = [
  "Monitor irrigation practices",
  "Support Alternate Wetting and Drying (AWD) programs",
  "Measure sustainability performance",
  "Track regenerative agriculture initiatives",
  "Collect carbon program data",
  "Generate ESG and sustainability reports"
];

// Business Impact Cards
const IMPACTS = [
  { title: "Increased Farm Visibility", desc: "Understand what is happening across every production region.", metric: "100%", sub: "Field parameters logged" },
  { title: "Improved Water Efficiency", desc: "Support smarter irrigation and resource management.", metric: "-30%", sub: "Freshwater consumed" },
  { title: "Better Farmer Outcomes", desc: "Provide timely support and advisory services.", metric: "+25%", sub: "Yield per hectare" },
  { title: "Stronger Sustainability Programs", desc: "Measure and report environmental performance.", metric: "-48%", sub: "GHG Methane emissions" },
  { title: "Enhanced Traceability", desc: "Track production from field to market.", metric: "Co-op", sub: "To retail container" },
  { title: "Smarter Decision Making", desc: "Turn field data into actionable intelligence.", metric: "Real-time", sub: "Centralized analytics" }
];

// FAQ Data
const FAQS = [
  {
    q: "How does SourceTrace support rice production programs?",
    a: "SourceTrace digitize farmer engagement, farm mapping, cultivation tracking, and procurement activities across rice supply chains."
  },
  {
    q: "Can SourceTrace support climate-smart agriculture initiatives?",
    a: "Yes. The platform supports sustainable farming practices, water management programs, regenerative agriculture initiatives, and carbon projects."
  },
  {
    q: "How are rice fields mapped?",
    a: "GPS-enabled mobile tools are used to capture accurate field boundaries and production areas."
  },
  {
    q: "Can SourceTrace improve traceability?",
    a: "Yes. Production and sourcing data are recorded throughout the value chain to provide end-to-end visibility."
  },
  {
    q: "Does SourceTrace support carbon programs?",
    a: "Yes. The platform enables data collection, monitoring, verification, and reporting for carbon and sustainability initiatives."
  }
];

export default function RiceSolutionsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [dashboardFilter, setDashboardFilter] = useState<"vietnam" | "thailand" | "india">("vietnam");
  const [demoOpen, setDemoOpen] = useState(false);

  // Simulated Dashboard Data based on filter
  const getDashboardData = () => {
    switch (dashboardFilter) {
      case "thailand":
        return { farmers: "6,240", mapped: "5,890", acreage: "18,450 ha", irrigation: "Optimal AWD active", volume: "14,840 Tons", cert: "Shade/Organic Rice Premium", trace: "99.1%", compliance: "100%" };
      case "india":
        return { farmers: "12,480", mapped: "11,240", acreage: "28,920 ha", irrigation: "Rainfed checks", volume: "22,500 Tons", cert: "NPOP Organic Rice", trace: "98.5%", compliance: "99.2%" };
      default: // Vietnam (Mekong Delta)
        return { farmers: "8,940", mapped: "8,520", acreage: "24,800 ha", irrigation: "AWD Wetting Cycle 3", volume: "18,920 Tons", cert: "Decarbonized Carbon-Trace", trace: "100%", compliance: "99.6%" };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#F4FBF7] to-[#EBF7F0] text-slate-800 selection:bg-[#53D769] selection:text-slate-950 overflow-x-hidden pt-20">
      
      {/* ─── SECTION 1: HERO SECTION ─── */}
      <section 
        className="relative min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-8 py-16 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 61, 46, 0.75), rgba(7, 43, 31, 0.95)), url("/images/crops/rice_terraces.png")`,
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
            <Droplet className="w-4 h-4 text-[#53D769]" />
            Rice Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-7xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto"
          >
            Smarter Rice Cultivation. Sustainable Outcomes.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl text-[#53D769] font-mono font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Improve productivity, optimize water use, strengthen traceability, and support climate-smart rice programs from field to market.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed space-y-4"
          >
            <p>
              Rice feeds more than half of the world&apos;s population, yet producers face increasing challenges from climate change, water scarcity, rising input costs, and sustainability requirements.
            </p>
            <p className="text-gray-300">
              SourceTrace helps organizations digitize rice production systems, monitor cultivation activities, support farmer engagement, improve procurement visibility, and generate actionable insights across the rice value chain.
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
              Explore Rice Solutions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: THE CHALLENGE ─── */}
      <section className="py-16 bg-white border-b border-emerald-100/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                The Sourcing Gap
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Rice Production Faces Growing Pressure
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Rice producers and sourcing organizations must balance productivity, profitability, and sustainability while managing large networks of farmers.
              </p>
              <p className="text-slate-600 leading-relaxed font-semibold">
                Without accurate field-level data, organizations face growing pressure:
              </p>
              <div className="p-5 bg-[#F4FBF7] border-l-4 border-[#53D769] rounded-r-2xl font-mono text-sm text-[#0B3D2E]">
                SourceTrace provides the intelligence needed to improve outcomes at every stage of production.
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {CHALLENGES.map((ch, idx) => {
                const IconComponent = ch.icon;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 bg-[#FBFDFB] border border-emerald-50 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-left flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F7A53] flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{ch.title}</h4>
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
              Paddy Management Pipeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Digitizing The Rice Production Journey
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
                    Process stage {activeStep + 1} / 7
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
              Purpose-Built For Modern Rice Programs
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
                    <span>Explore module</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: RICE VALUE CHAIN ─── */}
      <section className="py-16 bg-gradient-to-b from-[#F4FBF7] to-[#EBF7F0] border-t border-b border-emerald-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Global Custody Chain
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Visibility Across The Entire Rice Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Every stage is connected through a single digital platform, providing complete operational visibility.
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
                        <span className="text-[#53D769] block mb-1 uppercase font-bold text-[8px]">Custody check:</span>
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
            *Hover over any node above to verify digital custody logs.
          </p>
        </div>
      </section>

      {/* ─── SECTION 6: CLIMATE & SUSTAINABILITY ─── */}
      <section className="py-16 bg-white border-b border-emerald-100/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                Climate Action
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Advance Sustainable Rice Cultivation
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Rice cultivation plays an important role in water stewardship and climate action. alternate wetting and drying (AWD) programs help reduce greenhouse methane levels significantly.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-[#0B3D2E]">
                {CLIMATE_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#F4FBF7] p-3 rounded-xl border border-emerald-100/20">
                    <Check className="w-4 h-4 text-[#53D769] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual AWD standpipe simulation */}
            <div className="lg:col-span-6 bg-[#040C08] border border-emerald-950 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-white font-mono text-xs relative overflow-hidden h-[360px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center border-b border-emerald-900/30 pb-3">
                <span className="text-[#53D769] uppercase font-bold text-[9px] flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                  IoT AWD Standpipe sensor
                </span>
                <span className="text-[8px] text-gray-500">Mekong Delta B-12</span>
              </div>

              {/* Graphic standpipe */}
              <div className="flex-1 bg-slate-950 border border-emerald-900/20 rounded-xl my-4 p-4 relative overflow-hidden flex items-center justify-center gap-8">
                <div className="w-12 h-32 bg-slate-900 border border-emerald-900/30 rounded-lg relative overflow-hidden flex items-end">
                  <div className="w-full h-1/2 bg-cyan-600/30 border-t border-cyan-400 animate-pulse"></div>
                  <div className="absolute inset-y-0 right-1.5 flex flex-col justify-between text-[7px] text-gray-500 py-1">
                    <span>+15cm</span>
                    <span>0cm</span>
                    <span>-15cm</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-[8px] text-gray-300">
                  <div>Active phase: <span className="text-white font-bold">Drainage (AWD)</span></div>
                  <div>Water Level: <span className="text-cyan-400 font-bold">-5.2 cm</span></div>
                  <div>Estimated Methane: <span className="text-[#53D769] font-bold">Low (-38% baseline)</span></div>
                  <div>Carbon Credits generated: <span className="text-[#53D769]">1.8 / ha</span></div>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 bg-slate-900/40 p-3 rounded-lg border border-emerald-950/20">
                Alt-Wetting & Drainage cycles are logged automatically by field IoT nodes to verify carbon reduction.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 7: BUSINESS IMPACT ─── */}
      <section className="py-16 bg-[#FBFDFB]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Proven Outcomes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Deliver Better Results Across Rice Programs
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

      {/* ─── SECTION 8: INSIGHTS DASHBOARD ─── */}
      <section className="py-16 bg-white border-t border-b border-emerald-100/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                Agri-Intelligence
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Real-Time Rice Intelligence
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Connect and monitor paddy parameters in one dashboard. Evaluate water savings, methane curves, and grower volumes instantly.
              </p>

              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-full font-mono text-xs max-w-xs border border-emerald-50">
                <button 
                  onClick={() => setDashboardFilter("vietnam")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "vietnam" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Vietnam
                </button>
                <button 
                  onClick={() => setDashboardFilter("thailand")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "thailand" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Thailand
                </button>
                <button 
                  onClick={() => setDashboardFilter("india")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "india" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  India
                </button>
              </div>
            </div>

            {/* Dashboard Mock Visual */}
            <div className="lg:col-span-7 bg-[#040C08] border border-emerald-950 rounded-3xl p-6 sm:p-8 shadow-2xl text-white font-mono text-xs">
              <div className="flex justify-between items-center border-b border-emerald-900/30 pb-4 mb-6">
                <span className="text-[#53D769] uppercase font-bold tracking-wider text-[10px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#53D769] animate-pulse" />
                  SourceTrace Rice Console
                </span>
                <span className="text-[8px] text-gray-500">Region: {dashboardFilter.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Registered Rice Farmers</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.farmers}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Mapped Fields</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.mapped}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Planted Acreage</span>
                  <span className="text-base font-bold text-[#53D769] tracking-tight">{dashboardData.acreage}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Irrigation Status</span>
                  <span className="text-xs font-bold text-white tracking-tight truncate block">{dashboardData.irrigation}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Harvest Volumes</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.volume}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Carbon Program</span>
                  <span className="text-xs font-bold text-white tracking-tight truncate block">{dashboardData.cert}</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 border border-emerald-900/20 rounded-xl space-y-3">
                <span className="text-[8px] text-gray-500 block uppercase">Key Sourcing Indicators</span>
                <div className="flex justify-between items-center text-[9px]">
                  <span>Traceability Coverage</span>
                  <span className="text-[#53D769] font-bold">{dashboardData.trace}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#53D769] rounded-full transition-all duration-500" style={{ width: dashboardData.trace }}></div>
                </div>

                <div className="flex justify-between items-center text-[9px] pt-1">
                  <span>Compliance Performance</span>
                  <span className="text-cyan-400 font-bold">{dashboardData.compliance}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: dashboardData.compliance }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 9: FAQ ─── */}
      <section className="py-16 bg-[#FBFDFB]">
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
                  className="border border-emerald-50 rounded-2xl overflow-hidden transition-all bg-white"
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
              Build More Sustainable Rice Supply Chains
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Empower farmers, field teams, sourcing organizations, and buyers with the data needed to improve productivity, sustainability, and traceability.
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
              Speak To An Expert
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
                <Leaf className="w-10 h-10 text-[#1F7A53] mx-auto animate-pulse" />
                <h3 className="text-2xl font-bold text-[#0B3D2E]">Request Rice Solution Demo</h3>
                <p className="text-xs text-slate-500">Connect with an agronomy extension & carbon audit specialist.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Company Contact Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#53D769]" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Sourcing Interest / Origin</label>
                  <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none">
                    <option>Vietnam (Mekong Delta AWD)</option>
                    <option>Thailand (Organic Rice)</option>
                    <option>India / South Asia</option>
                    <option>Other / Carbon offsets verification</option>
                  </select>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 space-y-2 text-slate-600 font-mono text-[10px] leading-relaxed">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>Global Line: +1 (800) 555-TRACE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>rice.sourcing@sourcetrace.com</span>
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
