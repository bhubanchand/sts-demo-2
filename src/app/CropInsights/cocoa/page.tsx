"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  TreeDeciduous, Sprout, Map, Activity, ShieldCheck, User, Layers, 
  Warehouse, Globe, Award, FileText, ChevronDown, ChevronRight, Check, HelpCircle,
  TrendingUp, Play, ArrowRight, X, Phone, Mail, Clock, ShieldAlert, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Challenges data
const CHALLENGES = [
  { title: "Deforestation risks", desc: "Verifying farm boundaries do not encroach on national parks or protected forests.", icon: TreeDeciduous },
  { title: "Child labor concerns", desc: "Implementing field assessments and proximity tracking near schools.", icon: AlertTriangle },
  { title: "Farm-level visibility gaps", desc: "Collecting accurate geolocation and plot polygon shapes in remote regions.", icon: Map },
  { title: "Certification compliance", desc: "Fulfilling Rain Forest Alliance, UTZ, and organic audit requirements.", icon: Award },
  { title: "Farmer payment transparency", desc: "Ensuring fair premiums reach smallholders without cooperative leakage.", icon: FileText },
  { title: "Complex cooperative networks", desc: "Tracking batches across multi-tier cooperative warehouses.", icon: Layers },
  { title: "EUDR readiness requirements", desc: "Preparing digital custody files and Due Diligence Statements.", icon: ShieldCheck }
];

// How it works steps
const STEPS = [
  {
    title: "Farmer Enrollment",
    short: "Producer Profiles",
    desc: "Register producers, cooperatives, and sourcing communities with detailed profile information.",
    detail: "Collect household demographics, land titles, and certification parameters using offline-capable mobile forms at local co-ops.",
    metrics: [{ label: "Registry Time", value: "Under 4 mins" }, { label: "Data Integrity", value: "100% Verified" }]
  },
  {
    title: "Farm Mapping",
    short: "GPS Polygons",
    desc: "Capture accurate GPS farm boundaries and production areas directly in the field.",
    detail: "Field agents walk farm perimeters to generate high-fidelity GPS polygons, mapping shade trees and multi-crop cocoa parcels.",
    metrics: [{ label: "GPS Accuracy", value: "< 3 meters" }, { label: "Boundary checks", value: "Automated GIS" }]
  },
  {
    title: "Risk Assessment",
    short: "Forest & Social Audit",
    desc: "Monitor environmental and social compliance indicators through active satellite maps.",
    detail: "Compares mapped polygons against historical protected forest overlays. Integrates social surveys for child labor risk profiling.",
    metrics: [{ label: "Canopy swept", value: "24/7 Satellite" }, { label: "Risk Flags", value: "Zero Tolerance" }]
  },
  {
    title: "Procurement Tracking",
    short: "Co-op Gate Intake",
    desc: "Digitize cocoa purchasing, collection, and aggregation at buying stations.",
    detail: "Intake weight is logged from Bluetooth BLE scales. Bag tags are scanned to associate weight with the registered farmer's profile.",
    metrics: [{ label: "Intake Speed", value: "Real-time sync" }, { label: "Tag system", value: "RFID / QR Code" }]
  },
  {
    title: "Payment Transparency",
    short: "Premium Wallet",
    desc: "Record and validate farmer payments and premium distributions securely.",
    detail: "Verifies that certified organic or fair trade premiums are paid directly into the grower's mobile wallet, preventing cooperative cuts.",
    metrics: [{ label: "Disbursement", value: "Direct-to-Wallet" }, { label: "Audit trail", value: "Fully Ledgered" }]
  },
  {
    title: "Traceable Exports",
    short: "Shipment Dossier",
    desc: "Maintain complete shipment histories and compliance records for global trade.",
    detail: "Generates digital trace certificates detailing the exact community farms that contributed to each bulk shipping container.",
    metrics: [{ label: "EUDR ready", value: "100% Compliant" }, { label: "Customs file", value: "Due Diligence Dossier" }]
  }
];

// Capabilities data
const CAPABILITIES = [
  { title: "Farm Mapping & Polygon Verification", desc: "Digitally map cocoa farms and validate sourcing locations.", icon: Map },
  { title: "Deforestation Monitoring", desc: "Monitor farm boundaries against protected forests and conservation areas.", icon: TreeDeciduous },
  { title: "Farmer Management", desc: "Maintain accurate producer profiles and sourcing records.", icon: User },
  { title: "Child Labor Monitoring", desc: "Support social compliance initiatives through structured field assessments.", icon: AlertTriangle },
  { title: "Premium Payment Tracking", desc: "Increase transparency across farmer payment and incentive programs.", icon: FileText },
  { title: "Regulatory Compliance", desc: "Support EUDR, Rainforest Alliance, Fairtrade, and sustainability reporting requirements.", icon: ShieldCheck }
];

// Value Chain Stages
const VALUE_CHAIN_STAGES = [
  { id: "farm", label: "Cocoa Farm", desc: "Polygon mapping, producer registry & risk assessments." },
  { id: "coop", label: "Farmer Cooperative", desc: "Lot consolidation, bagging, and tag printing." },
  { id: "center", label: "Collection Center", desc: "Moisture tests, quality grading & BLE weighing." },
  { id: "warehouse", label: "Warehouse", desc: "Bulk storage management and lot tracking." },
  { id: "facility", label: "Processing Facility", desc: "Hulling, roasting, and butter extraction logs." },
  { id: "exporter", label: "Exporter", desc: "EUDR Due Diligence Statement & customs clearance." },
  { id: "manufacturer", label: "Manufacturer", desc: "Chocolate mass batch verification." },
  { id: "brand", label: "Global Brand", desc: "Complete consumer-facing traceability portals." }
];

// Deforestation list items
const DEFORESTATION_ITEMS = [
  "Verify farm boundaries",
  "Monitor protected areas",
  "Assess sourcing risks",
  "Support sustainability commitments",
  "Prepare for EUDR requirements",
  "Improve audit readiness"
];

// Business Impact Cards
const IMPACTS = [
  { title: "Stronger Supply Chain Transparency", desc: "Track cocoa from producer to export.", metric: "100%", sub: "Full Traceability" },
  { title: "Improved Compliance Readiness", desc: "Support certification and regulatory requirements.", metric: "Zero", sub: "Deforestation Penalties" },
  { title: "Better Farmer Engagement", desc: "Maintain accurate producer records and communication channels.", metric: "35k+", sub: "Registered Smallholders" },
  { title: "Deforestation Risk Reduction", desc: "Monitor sourcing regions and environmental performance.", metric: "48k ha", sub: "Forest canopy mapped" },
  { title: "Transparent Payment Programs", desc: "Digitize and verify farmer transactions.", metric: "+100%", sub: "Auditable premiums" },
  { title: "Increased Buyer Confidence", desc: "Provide trusted sourcing and sustainability data.", metric: "+15%", sub: "Premium margin capture" }
];

// FAQ Data
const FAQS = [
  {
    q: "How does SourceTrace support cocoa traceability?",
    a: "The platform captures sourcing activities from farm registration through procurement, processing, and export."
  },
  {
    q: "Can SourceTrace support EUDR compliance?",
    a: "Yes. SourceTrace helps organizations capture farm geolocation data, monitor sourcing areas, and maintain compliance documentation."
  },
  {
    q: "How are cocoa farms mapped?",
    a: "GPS-enabled mobile tools are used to capture accurate farm boundaries and production areas."
  },
  {
    q: "Can SourceTrace help reduce deforestation risks?",
    a: "Yes. Organizations can compare mapped farms against environmental risk layers and protected areas."
  },
  {
    q: "How does SourceTrace improve farmer payment transparency?",
    a: "The platform records procurement transactions, premium payments, and payment histories to improve visibility and accountability."
  }
];

export default function CocoaSolutionsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [dashboardFilter, setDashboardFilter] = useState<"ivory_coast" | "ghana" | "indonesia">("ivory_coast");
  const [demoOpen, setDemoOpen] = useState(false);

  // Simulated Dashboard Data based on filter
  const getDashboardData = () => {
    switch (dashboardFilter) {
      case "ghana":
        return { farmers: "14,850", mapped: "14,240", risk: "Low (0.2% breach)", coops: "18 Co-ops", premiums: "$420,000", cert: "Fairtrade Certified", volume: "12,450 Tons", trace: "98.5%", compliance: "99.4%" };
      case "indonesia":
        return { farmers: "6,240", mapped: "5,890", risk: "None Detected", coops: "8 Co-ops", premiums: "$180,000", cert: "Organic Premium", volume: "5,820 Tons", trace: "100%", compliance: "100%" };
      default: // Ivory Coast
        return { farmers: "20,400", mapped: "19,850", risk: "Medium (0.8% sweep)", coops: "24 Co-ops", premiums: "$650,000", cert: "UTZ / RA Premium", volume: "18,940 Tons", trace: "99.2%", compliance: "98.8%" };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#F4FBF7] to-[#EBF7F0] text-slate-800 selection:bg-[#53D769] selection:text-slate-950 overflow-x-hidden pt-20">
      
      {/* ─── SECTION 1: HERO SECTION ─── */}
      <section 
        className="relative min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-8 py-16 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 61, 46, 0.75), rgba(7, 43, 31, 0.95)), url("/images/crops/cocoa_pods.png")`,
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
            <TreeDeciduous className="w-4 h-4 text-[#53D769]" />
            Cocoa Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-7xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto"
          >
            Ethical Cocoa. Verified Impact.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl text-[#53D769] font-mono font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Build transparent, deforestation-free cocoa supply chains with full visibility from farm to export.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed space-y-4"
          >
            <p>
              Global cocoa supply chains face increasing pressure to demonstrate sustainability, prevent deforestation, improve farmer livelihoods, and comply with evolving regulations.
            </p>
            <p className="text-gray-300">
              SourceTrace enables cocoa organizations to digitize sourcing operations, verify farm locations, monitor environmental risks, strengthen compliance programs, and deliver complete traceability across the value chain.
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
              Explore Cocoa Solutions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: THE CHALLENGE ─── */}
      <section className="py-24 bg-white border-b border-emerald-100/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                The Sourcing Gap
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                The Future Of Cocoa Requires Transparency
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Consumers, brands, regulators, and certification bodies increasingly demand proof that cocoa is sourced responsibly.
              </p>
              <p className="text-slate-600 leading-relaxed font-semibold">
                Organizations must address complex field requirements:
              </p>
              <div className="p-5 bg-[#F4FBF7] border-l-4 border-[#53D769] rounded-r-2xl font-mono text-sm text-[#0B3D2E]">
                Managing these requirements manually creates significant operational and compliance risks. SourceTrace provides the visibility and data needed to build trusted cocoa supply chains.
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
      <section id="works-section" className="py-24 bg-gradient-to-b from-[#FBFDFB] to-[#F4FBF7]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Cooperative Pipeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Digitizing Cocoa Supply Chains From The Ground Up
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
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Core Modules
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Built For Sustainable Cocoa Programs
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

      {/* ─── SECTION 5: COCOA VALUE CHAIN ─── */}
      <section className="py-24 bg-gradient-to-b from-[#F4FBF7] to-[#EBF7F0] border-t border-b border-emerald-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Global Custody Chain
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              End-To-End Cocoa Traceability
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Every transaction, movement, and compliance record is digitally captured within a single platform.
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
                        <span className="text-[#53D769] block mb-1 uppercase font-bold text-[8px]">Cooperative Trace:</span>
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
            *Hover over any node above to inspect transaction flows.
          </p>
        </div>
      </section>

      {/* ─── SECTION 6: DEFORESTATION & COMPLIANCE ─── */}
      <section className="py-24 bg-white border-b border-emerald-100/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                GIS Deforestation Sweep
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Protect Forests While Strengthening Supply Chains
              </h2>
              <p className="text-slate-600 leading-relaxed">
                SourceTrace combines GPS farm mapping, satellite intelligence, and field verification to help organizations identify environmental risks and support responsible sourcing programs.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-[#0B3D2E]">
                {DEFORESTATION_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#F4FBF7] p-3 rounded-xl border border-emerald-100/20">
                    <Check className="w-4 h-4 text-[#53D769] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual satellite boundary validator */}
            <div className="lg:col-span-6 bg-[#040C08] border border-emerald-950 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-white font-mono text-xs relative overflow-hidden h-[360px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center border-b border-emerald-900/30 pb-3">
                <span className="text-[#53D769] uppercase font-bold text-[9px] flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  GIS Sat-Check Interface
                </span>
                <span className="text-[8px] text-gray-500">Buffer: EUDR standard</span>
              </div>

              {/* Vector GIS Sweep map mockup */}
              <div className="flex-1 bg-slate-950 border border-emerald-900/20 rounded-xl my-4 p-4 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent"></div>
                <div className="w-32 h-32 rounded-full border border-dashed border-emerald-800/20 absolute animate-spin"></div>
                
                {/* Visual crop polygon overlay */}
                <svg className="w-48 h-32 absolute">
                  <polygon points="40,20 160,30 140,110 50,90" fill="rgba(83, 215, 105, 0.15)" stroke="#53D769" strokeWidth="1.5" />
                  <line x1="100" y1="0" x2="100" y2="150" stroke="rgba(239, 68, 68, 0.2)" strokeDasharray="4 4" />
                </svg>

                <div className="absolute top-2 left-2 bg-slate-900/90 p-2 rounded border border-emerald-900/20 text-[7px] space-y-0.5">
                  <div>Plot ID: <span className="text-white">COCOA-LOT-89</span></div>
                  <div>Area: <span className="text-white">2.84 Hectares</span></div>
                  <div>Status: <span className="text-[#53D769] font-bold">✓ Cleared</span></div>
                </div>

                <div className="absolute bottom-2 right-2 bg-slate-900/90 px-1.5 py-0.5 rounded text-[7px] text-red-400 font-bold border border-red-950/50">
                  National Park boundary: 340m Buffer
                </div>
              </div>

              <div className="text-[10px] text-gray-400 bg-slate-900/40 p-3 rounded-lg border border-emerald-950/20">
                Satellite sweeps confirm zero peatland drainage or canopy loss within grower boundaries post-December 2020.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 7: BUSINESS IMPACT ─── */}
      <section className="py-24 bg-gradient-to-b from-[#FBFDFB] to-[#F4FBF7]">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
              Proven Outcomes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E]">
              Deliver Measurable Results Across Cocoa Programs
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
      <section className="py-24 bg-white border-t border-b border-emerald-100/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold font-mono text-[#1F7A53] uppercase tracking-widest block">
                Agri-Intelligence
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0B3D2E] leading-tight">
                Real-Time Cocoa Intelligence
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Unlock complete visibility across buying cooperatives. Analyze registration compliance, deforestation risks, chemical logs, and fair trade disbursements instantly.
              </p>

              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-full font-mono text-xs max-w-xs border border-emerald-50">
                <button 
                  onClick={() => setDashboardFilter("ivory_coast")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "ivory_coast" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Ivory Coast
                </button>
                <button 
                  onClick={() => setDashboardFilter("ghana")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "ghana" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Ghana
                </button>
                <button 
                  onClick={() => setDashboardFilter("indonesia")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all ${dashboardFilter === "indonesia" ? "bg-[#0B3D2E] text-white" : "text-slate-500 hover:text-[#0B3D2E]"}`}
                >
                  Indonesia
                </button>
              </div>
            </div>

            {/* Dashboard Mock Visual */}
            <div className="lg:col-span-7 bg-[#040C08] border border-emerald-950 rounded-3xl p-6 sm:p-8 shadow-2xl text-white font-mono text-xs">
              <div className="flex justify-between items-center border-b border-emerald-900/30 pb-4 mb-6">
                <span className="text-[#53D769] uppercase font-bold tracking-wider text-[10px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#53D769] animate-pulse" />
                  SourceTrace Cocoa Dashboard
                </span>
                <span className="text-[8px] text-gray-500">Region: {dashboardFilter.replace("_", " ").toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Registered Farmers</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.farmers}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Mapped Farms</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.mapped}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Deforestation Risk</span>
                  <span className={`text-xs font-bold tracking-tight ${dashboardData.risk.includes("Medium") ? "text-amber-500" : "text-[#53D769]"}`}>{dashboardData.risk}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Active Co-ops</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.coops}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Premiums Paid</span>
                  <span className="text-base font-bold text-[#53D769] tracking-tight">{dashboardData.premiums}</span>
                </div>
                <div className="bg-slate-950/60 p-3 border border-emerald-900/10 rounded-xl">
                  <span className="text-[7px] text-gray-500 block uppercase mb-0.5">Procurement Vol</span>
                  <span className="text-base font-bold text-white tracking-tight">{dashboardData.volume}</span>
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
      <section className="py-24 bg-[#FBFDFB]">
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
      <section className="py-24 relative overflow-hidden bg-[#0B3D2E] text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-[#072B1F] via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-[800px] mx-auto px-6 text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono text-[#53D769] uppercase tracking-widest block">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
              Build Responsible Cocoa Supply Chains With Confidence
            </h2>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Empower sourcing teams, cooperatives, exporters, and global brands with the visibility needed to deliver sustainable, compliant, and traceable cocoa programs.
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
                <TreeDeciduous className="w-10 h-10 text-[#1F7A53] mx-auto" />
                <h3 className="text-2xl font-bold text-[#0B3D2E]">Request Cocoa Solution Pilot</h3>
                <p className="text-xs text-slate-500">Connect with an EUDR & forestry audit compliance specialist.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Company Contact Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#53D769]" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Sourcing Interest / Origin</label>
                  <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none">
                    <option>Cote d'Ivoire (West Africa)</option>
                    <option>Ghana (West Africa)</option>
                    <option>Indonesia / Southeast Asia</option>
                    <option>Latin America / Specialty Cocoa</option>
                  </select>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 space-y-2 text-slate-600 font-mono text-[10px] leading-relaxed">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>Global Line: +1 (800) 555-TRACE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1F7A53]" />
                    <span>cocoa.compliance@sourcetrace.com</span>
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
