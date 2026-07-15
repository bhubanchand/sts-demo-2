"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Sprout, Map, Activity, ShieldCheck, User, Layers, 
  Warehouse, Globe, Award, FileText, ChevronDown, ChevronRight, Check, HelpCircle,
  TrendingUp, Play, ArrowRight, X, Phone, Mail, Clock, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Challenges data
const CHALLENGES = [
  { title: "Inconsistent leaf quality", desc: "Variegation in plucking standards (e.g. course plucking vs two leaves and a bud).", icon: Sprout },
  { title: "Limited grower visibility", desc: "No direct records of field inputs, shade tree densities, or grower identities.", icon: User },
  { title: "Manual collection processes", desc: "Paper receipts at leaf collection points lead to errors and gate delays.", icon: Layers },
  { title: "Payment transparency challenges", desc: "Delays or discrepancies in sending green leaf payments and quality premiums to growers.", icon: FileText },
  { title: "Sustainability reporting requirements", desc: "Difficulty logging worker housing standards, fair wages, or chemical use.", icon: Activity },
  { title: "Certification compliance risks", desc: "Fulfilling Rain Forest Alliance, Fair Trade, or organic audit perimeters.", icon: ShieldCheck },
  { title: "Supply chain inefficiencies", desc: "Data blindspots between gardens, collection gates, factories, and brokers.", icon: Award }
];

// How it works steps
const STEPS = [
  {
    title: "Grower Registration",
    short: "Grower Register",
    desc: "Create digital profiles for tea growers, estates, and cooperatives.",
    detail: "Capture field acreage, family profiles, worker listings, and certifications directly at the estate office or on grower mobiles.",
    metrics: [{ label: "Registry Time", value: "3 mins avg" }, { label: "Farmer sync", value: "Online/Offline" }]
  },
  {
    title: "Garden Mapping",
    short: "GPS Boundaries",
    desc: "Capture GPS boundaries and production zones.",
    detail: "Map estate perimeters and smallholder garden blocks to verify exact origins and monitor shade canopy cover.",
    metrics: [{ label: "GPS Accuracy", value: "< 4m Precision" }, { label: "GIS overlay", value: "Available" }]
  },
  {
    title: "Leaf Collection Tracking",
    short: "BLE Scale Weighing",
    desc: "Digitize daily collection activities and weighment records.",
    detail: "Logs green leaf weight directly from Bluetooth gate scales, saving transaction records instantly to the grower's digital card.",
    metrics: [{ label: "Intake record", value: "BLE scale auto" }, { label: "Gate delay", value: "-60% reduced" }]
  },
  {
    title: "Quality Assessment",
    short: "Pluck check",
    desc: "Record leaf grades and quality parameters at collection points.",
    detail: "Record fine pluck percentage (two leaves and a bud) and flag coarse leaf ratios, determining quality premiums dynamically.",
    metrics: [{ label: "Fine pluck target", value: "> 85% Ratio" }, { label: "Quality log", value: "Immediate gate" }]
  },
  {
    title: "Factory Processing",
    short: "Factory Monitor",
    desc: "Track tea through withering, rolling, oxidation, drying, and packaging.",
    detail: "Track factory batches dynamically. Record loft humidity, oxidation time, and firing temperatures to associate leaf origins with final made-tea grades.",
    metrics: [{ label: "Batch traceability", value: "Unique Lot ID" }, { label: "Factory logging", value: "Digital Ledger" }]
  },
  {
    title: "Export & Distribution",
    short: "Exporter link",
    desc: "Maintain complete traceability records from estate to buyer.",
    detail: "Create trace dockets showing the exact garden coordinates, harvest dates, and labor compliance certificates for every tea bag or chest.",
    metrics: [{ label: "Exporter ready", value: "100% Verified" }, { label: "Customs file", value: "Digital dossier" }]
  }
];

// Capabilities data
const CAPABILITIES = [
  { title: "Grower Management", desc: "Maintain accurate grower records and engagement programs.", icon: User },
  { title: "Collection Center Digitization", desc: "Digitize leaf collection, weighment, and quality assessments.", icon: Layers },
  { title: "Quality Monitoring", desc: "Track tea quality throughout production and processing.", icon: Award },
  { title: "Payment Transparency", desc: "Improve visibility into grower payments and incentive programs.", icon: FileText },
  { title: "Sustainability Compliance", desc: "Support ethical sourcing and certification requirements.", icon: ShieldCheck },
  { title: "End-To-End Traceability", desc: "Track tea from plucking to export with complete confidence.", icon: Globe }
];

// Value Chain Stages
const VALUE_CHAIN_STAGES = [
  { id: "grower", label: "Tea Grower", desc: "GPS mapping, plucking checks, and Extension support." },
  { id: "collection", label: "Collection Center", desc: "BLE scale weighing, leaf grading and grower card sync." },
  { id: "factory", label: "Tea Factory", desc: "Withering, rolling, oxidation, and dryer logging." },
  { id: "processing", label: "Processing & Packaging", desc: "Made-tea grading, cleaning, and barcode bagging." },
  { id: "warehouse", label: "Warehouse", desc: "Inventory lots tracking and pallet codes." },
  { id: "exporter", label: "Exporter", desc: "Phytosanitary reports, trade dockets & customs check." },
  { id: "distributor", label: "Distributor", desc: "Import clearances and consignment trace check." },
  { id: "retail", label: "Retail Brand", desc: "Finished pack codes linked back to garden lots." },
  { id: "consumer", label: "Consumer", desc: "QR scan displaying farm story & premium payout proof." }
];

// Quality list items
const QUALITY_ITEMS = [
  "Monitor leaf quality",
  "Improve collection accuracy",
  "Strengthen grower relationships",
  "Support certification programs",
  "Track sustainability initiatives",
  "Maintain audit readiness",
  "Generate compliance reports"
];

// Business Impact Cards
const IMPACTS = [
  { title: "Better Quality Control", desc: "Capture quality data throughout production and processing.", metric: "92%", sub: "Fine pluck adherence" },
  { title: "Improved Grower Engagement", desc: "Strengthen communication and participation across tea programs.", metric: "+38%", sub: "Co-op loyalty score" },
  { title: "Faster Collection Operations", desc: "Digitize weighment and collection workflows.", metric: "-50%", sub: "Gate check wait times" },
  { title: "Stronger Compliance", desc: "Support sustainability and certification initiatives.", metric: "Zero", sub: "Labor/Forest breaches" },
  { title: "Enhanced Traceability", desc: "Track tea from garden to export.", metric: "Estate", sub: "To export container" },
  { title: "Increased Buyer Confidence", desc: "Provide trusted sourcing and quality information.", metric: "+15%", sub: "Exporter margin premium" }
];

// FAQ Data
const FAQS = [
  {
    q: "How does SourceTrace support tea traceability?",
    a: "SourceTrace records activities from grower registration and leaf collection through factory processing and export."
  },
  {
    q: "Can SourceTrace improve collection center operations?",
    a: "Yes. Collection activities, weighment records, quality grading, and grower transactions can all be digitized."
  },
  {
    q: "How are tea gardens mapped?",
    a: "GPS-enabled mobile applications are used to capture accurate production boundaries and sourcing locations."
  },
  {
    q: "Does SourceTrace support certification programs?",
    a: "Yes. The platform supports sustainability initiatives, ethical sourcing programs, and certification requirements."
  },
  {
    q: "Can tea buyers verify product origins?",
    a: "Yes. Traceability records connect tea products back to growers, gardens, and sourcing regions."
  }
];

export default function TeaSolutionsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [dashboardFilter, setDashboardFilter] = useState<"kenya" | "sri_lanka" | "india">("kenya");
  const [demoOpen, setDemoOpen] = useState(false);

  // Simulated Dashboard Data based on filter
  const getDashboardData = () => {
    switch (dashboardFilter) {
      case "sri_lanka":
        return { farmers: "8,240", mapped: "7,890", volume: "4,820 Tons", grade: "OP / BOP Premium", processing: "3,890 Tons", payments: "$320,000", cert: "Organic Ceylon Tea", trace: "99.2%", compliance: "100%" };
      case "india":
        return { farmers: "12,480", mapped: "11,540", volume: "8,920 Tons", grade: "CTC / Orthodox", processing: "6,920 Tons", payments: "$540,000", cert: "Darjeeling / Assam RA", trace: "98.7%", compliance: "99.4%" };
      default: // Kenya (Kericho)
        return { farmers: "15,840", mapped: "14,950", volume: "12,450 Tons", grade: "BP1 Fine Pluck", processing: "9,850 Tons", payments: "$780,000", cert: "BCI & Rainforest Premium", trace: "100%", compliance: "99.8%" };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#F4FBF7] to-[#EBF7F0] text-slate-800 selection:bg-[#53D769] selection:text-slate-950 overflow-x-hidden pt-20">
      
      {/* ─── SECTION 1: HERO SECTION ─── */}
      <section 
        className="relative min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-8 py-16 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 61, 46, 0.75), rgba(7, 43, 31, 0.95)), url("/images/crops/tea_plucking.png")`,
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
            <Sprout className="w-4 h-4 text-[#53D769]" />
            Tea Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-7xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto"
          >
            Every Leaf. Every Grower. Fully Traceable.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl text-[#53D769] font-mono font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Digitize tea sourcing, improve quality control, strengthen grower engagement, and build transparent tea supply chains from estate to cup.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed space-y-4"
          >
            <p>
              Tea producers, exporters, and brands face increasing pressure to deliver consistent quality, verify sourcing origins, ensure ethical labor practices, and maintain supply chain transparency.
            </p>
            <p className="text-gray-300">
              SourceTrace enables tea organizations to connect growers, field operations, collection centers, factories, and buyers through a single digital platform that delivers real-time visibility and traceability.
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
              Explore Tea Solutions
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
                Managing Modern Tea Supply Chains Requires Complete Visibility
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Tea quality is influenced by every stage of production—from plucking and collection to processing, packaging, and export.
              </p>
              <p className="text-slate-600 leading-relaxed font-semibold">
                Without accurate field-level data and traceability systems, organizations face significant hurdles:
              </p>
              <div className="p-5 bg-[#F4FBF7] border-l-4 border-[#53D769] rounded-r-2xl font-mono text-sm text-[#0B3D2E]">
                SourceTrace helps tea organizations transform disconnected operations into a connected digital ecosystem.
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
              Garden & Factory Pipeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Connecting The Entire Tea Value Chain
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
              Built For Modern Tea Operations
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

      {/* ─── SECTION 5: TEA VALUE CHAIN ─── */}
      <section className="py-16 bg-gradient-to-b from-[#F4FBF7] to-[#EBF7F0] border-t border-b border-emerald-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Global Custody Chain
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              From Tea Garden To Global Markets
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Every transaction, quality record, and movement is digitally captured and traceable.
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

      {/* ─── SECTION 6: QUALITY & SUSTAINABILITY ─── */}
      <section className="py-16 bg-white border-b border-emerald-100/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                Social & Quality Audit
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Deliver Premium Quality Through Better Visibility
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Tea buyers increasingly demand proof of quality, ethical sourcing, and sustainability performance. By digitizing field operations and processing activities, organizations can improve quality while reducing operational risk.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-[#0B3D2E]">
                {QUALITY_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#F4FBF7] p-3 rounded-xl border border-emerald-100/20">
                    <Check className="w-4 h-4 text-[#53D769] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Leaf Quality Scanner Simulator */}
            <div className="lg:col-span-6 bg-[#040C08] border border-emerald-950 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-white font-mono text-xs relative overflow-hidden h-[360px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center border-b border-emerald-900/30 pb-3">
                <span className="text-[#53D769] uppercase font-bold text-[9px] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  AI Vision Leaf Analyzer
                </span>
                <span className="text-[8px] text-gray-500">Device: Edge Camera</span>
              </div>

              {/* Graphic leaf scanner */}
              <div className="flex-1 bg-slate-950 border border-emerald-900/20 rounded-xl my-4 p-4 relative overflow-hidden flex flex-col items-center justify-center space-y-4">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(83,215,105,0.8)] z-10 animate-bounce"></div>
                
                <div className="text-center z-20">
                  <span className="text-[10px] text-gray-400 block uppercase mb-1">Fine Plucking Grade</span>
                  <span className="text-2xl font-bold text-[#53D769] tracking-tight">88.4% Purity</span>
                  <span className="text-[8px] text-emerald-400 block mt-1 uppercase font-bold">✓ Two Leaves & A Bud Met</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full text-[8px] text-gray-400 z-20 pt-2 border-t border-emerald-900/10">
                  <div>Coarse Leaf: <span className="text-white">11.6% (Low)</span></div>
                  <div>Moisture status: <span className="text-[#53D769]">Passed (Clean)</span></div>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 bg-slate-900/40 p-3 rounded-lg border border-emerald-950/20">
                Vision analysis automatically flags coarse leaf ratios at garden intake gates to secure premiums.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 7: BUSINESS IMPACT ─── */}
      <section className="py-16 bg-gradient-to-b from-[#FBFDFB] to-[#F4FBF7]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Proven Outcomes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Create Value Across Every Stage Of Tea Production
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
                Real-Time Tea Supply Chain Intelligence
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Connect and monitor your leaf weights, factory dryers, and compliance parameters on a single dashboard screen.
              </p>

              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-full font-mono text-xs max-w-xs border border-emerald-50">
                <button 
                  onClick={() => setDashboardFilter("kenya")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "kenya" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Kenya
                </button>
                <button 
                  onClick={() => setDashboardFilter("sri_lanka")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "sri_lanka" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Sri Lanka
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
                  SourceTrace Tea Console
                </span>
                <span className="text-[8px] text-gray-500">Region: {dashboardFilter.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Registered Tea Growers</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.farmers}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Mapped Gardens</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.mapped}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Daily Collection</span>
                  <span className="text-base font-bold text-[#53D769] tracking-tight">{dashboardData.volume}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Quality Grades</span>
                  <span className="text-xs font-bold text-white tracking-tight truncate block">{dashboardData.grade}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Factory Volume</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.processing}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Payments Disbursed</span>
                  <span className="text-xs font-bold text-[#53D769] tracking-tight truncate block">{dashboardData.payments}</span>
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
              Build Transparent And Sustainable Tea Supply Chains
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Connect growers, collection centers, factories, exporters, and buyers through a single platform designed for modern tea operations.
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
                <Sprout className="w-10 h-10 text-[#1F7A53] mx-auto" />
                <h3 className="text-2xl font-bold text-[#0B3D2E]">Request Tea Solution Demo</h3>
                <p className="text-xs text-slate-500">Connect with an estate traceability & quality check expert.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Company Contact Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#53D769]" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Sourcing Interest / Origin</label>
                  <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none">
                    <option>East Africa (Kenya Kericho)</option>
                    <option>Sri Lanka (Ceylon Organic)</option>
                    <option>India (Darjeeling/Assam)</option>
                    <option>Other / Ethical labor tracking</option>
                  </select>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 space-y-2 text-slate-600 font-mono text-[10px] leading-relaxed">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>Global Line: +1 (800) 555-TRACE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>tea.sourcing@sourcetrace.com</span>
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
