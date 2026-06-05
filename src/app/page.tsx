"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { ShieldCheck, MapPin, ScanFace, Globe, ArrowRight, Activity, Leaf, MousePointerClick } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const ExpandingSlideshow = dynamic(() => import("@/components/ui/expanding-slideshow").then(mod => mod.ExpandingSlideshow));
const InteractiveMap = dynamic(() => import("@/components/ui/interactive-map").then(mod => mod.InteractiveMap));
const DataGreenEngine = dynamic(() => import("@/components/ui/data-green-engine").then(mod => mod.DataGreenEngine));
const TransparencyFlow = dynamic(() => import("@/components/ui/transparency-flow").then(mod => mod.TransparencyFlow));
const TechStackGrid = dynamic(() => import("@/components/ui/tech-stack").then(mod => mod.TechStackGrid));
const CaseStudiesGrid = dynamic(() => import("@/components/ui/case-studies-grid").then(mod => mod.CaseStudiesGrid));
const SecurityCompliance = dynamic(() => import("@/components/ui/security-compliance").then(mod => mod.SecurityCompliance));
const DashboardPreview = dynamic(() => import("@/components/ui/dashboard-preview").then(mod => mod.DashboardPreview));
const PartnersEcosystem = dynamic(() => import("@/components/ui/partners-ecosystem").then(mod => mod.PartnersEcosystem));
const TestimonialsCarousel = dynamic(() => import("@/components/ui/testimonials-carousel").then(mod => mod.TestimonialsCarousel));
const IntegrationsGrid = dynamic(() => import("@/components/ui/integrations-grid").then(mod => mod.IntegrationsGrid));
const StatsBanner = dynamic(() => import("@/components/ui/stats-banner").then(mod => mod.StatsBanner));
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Helper component for tracking scroll position of each challenge block
function ChallengeBlock({ id, title, text, icon: Icon, colorClass, bgClass, setActiveBlock }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveBlock(id);
    }
  }, [isInView, id, setActiveBlock]);

  return (
    <div ref={ref} className={`bg-white rounded-[40px] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 border border-gray-100 relative overflow-hidden group ${isInView ? 'scale-105 shadow-[0_20px_40px_rgb(0,0,0,0.1)]' : 'opacity-60 scale-95'}`}>
      <div className={`w-16 h-16 ${bgClass} ${colorClass} rounded-2xl flex items-center justify-center mb-8 relative z-10`}>
         <Icon className="w-8 h-8"/>
      </div>
      <h3 className="text-3xl font-bold mb-4 text-gray-900 relative z-10">{title}</h3>
      <p className="text-lg text-gray-600 leading-relaxed relative z-10">{text}</p>
      <div className={`absolute top-0 right-0 w-32 h-32 ${bgClass} rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-300`}></div>
    </div>
  );
}

const CHALLENGE_IMAGES = {
  regulatory: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  fragmented: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5b16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  climate: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
};

export default function Home() {
  const [activeChallengeBlock, setActiveChallengeBlock] = useState("regulatory");
  
  return (
    <main className="min-h-screen bg-white selection:bg-[#53D769] selection:text-[#0B3D2E]">
      {/* 1. Hero Section - Massive Impact */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-32 px-4 sm:px-8 overflow-hidden bg-[#0B3D2E] snap-start">
        <div className="absolute top-0 right-0 w-[800px] h-full bg-[#1F7A53] blur-[120px] rounded-full opacity-30 mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#53D769] blur-[150px] rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1400px] mx-auto text-center relative z-10 w-full mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#53D769] animate-pulse"></span>
            EUDR Compliance Deadlines Approaching. Are you ready?
          </div>
          
          <AnimatedText 
            el="h1" 
            text="The Operating System for" 
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter" 
          />
          <AnimatedText 
            el="h1" 
            text="Global Agriculture." 
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#53D769] leading-tight mb-8 tracking-tighter" 
          />
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            Digitize the first mile of your supply chain. Ensure regulatory compliance, verify sustainability claims, and improve farmer livelihoods through unshakeable, node-level traceability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/request-demo">
               <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none font-bold shadow-[0_0_40px_rgba(83,215,105,0.4)] hover:shadow-[0_0_60px_rgba(83,215,105,0.6)] transition-all transform hover:-translate-y-1">
                 Request a Demo
               </Button>
            </Link>
            <Link href="/platform">
               <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full border-white/20 text-white hover:bg-white/10 font-bold flex items-center gap-2 transition-all hover:gap-4">
                 Explore Platform <ArrowRight className="w-5 h-5" />
               </Button>
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* 2. Expanding Slideshow (New feature highlights) */}
      <section className="bg-gray-50 border-y border-gray-100 min-h-screen flex flex-col justify-center snap-center">
         <ExpandingSlideshow />
      </section>

      {/* 3. The Global Challenge (Dynamic Scroll-Linked Image) */}
      <section className="py-40 bg-white relative">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row gap-20">
               {/* Scrollable Text Blocks */}
               <div className="lg:w-1/2 flex flex-col gap-32 relative z-10 py-32">
                  <div className="mb-10">
                     <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">The Challenge</span>
                     <h2 className="text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">Supply chains are broken at the source.</h2>
                     <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        Enterprises lack visibility into the "first mile" where raw materials are actually grown. This opacity leads to deforestation risks, human rights violations, and the inability to prove ESG claims.
                     </p>
                  </div>
                  
                  <ChallengeBlock 
                     id="regulatory" 
                     title="Regulatory Tsunami" 
                     text="Regulations like the EUDR, CSDDD, and FSMA 204 are moving from voluntary guidelines to strict legal mandates. Non-compliance now means blocked market access and massive fines."
                     icon={ShieldCheck} 
                     colorClass="text-red-600" 
                     bgClass="bg-red-100" 
                     setActiveBlock={setActiveChallengeBlock} 
                  />
                  <ChallengeBlock 
                     id="fragmented" 
                     title="Fragmented Data" 
                     text="Commodities pass through millions of unmapped smallholder farms and shadowy middlemen. Aggregating this fragmented data into a unified, auditable database is historically impossible."
                     icon={MapPin} 
                     colorClass="text-orange-600" 
                     bgClass="bg-orange-100" 
                     setActiveBlock={setActiveChallengeBlock} 
                  />
                  <ChallengeBlock 
                     id="climate" 
                     title="Climate Volatility" 
                     text="Extreme weather events are disrupting crop yields globally. Procurement teams cannot react to supply shocks if they cannot monitor the weather at their exact sourcing origins."
                     icon={Activity} 
                     colorClass="text-blue-600" 
                     bgClass="bg-blue-100" 
                     setActiveBlock={setActiveChallengeBlock} 
                  />
               </div>

               {/* Sticky Image Container */}
               <div className="lg:w-1/2 lg:sticky lg:top-40 h-[600px] rounded-[40px] overflow-hidden shadow-2xl relative">
                  <AnimatePresence mode="wait">
                     <motion.img 
                        key={activeChallengeBlock}
                        src={CHALLENGE_IMAGES[activeChallengeBlock as keyof typeof CHALLENGE_IMAGES]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                     />
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-[#0B3D2E]/20 to-transparent opacity-90"></div>
                  
                  {/* Dynamic caption overlay */}
                  <div className="absolute bottom-10 left-10 right-10">
                     <AnimatePresence mode="wait">
                        <motion.div 
                           key={activeChallengeBlock}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.3, delay: 0.2 }}
                           className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl"
                        >
                           {activeChallengeBlock === "regulatory" && <p className="text-white font-bold text-xl leading-relaxed">"EUDR and FSMA 204 require precise geocoordinates. The era of self-reported sustainability is over."</p>}
                           {activeChallengeBlock === "fragmented" && <p className="text-white font-bold text-xl leading-relaxed">"Without node-level visibility, discovering the true origin of your raw materials is impossible."</p>}
                           {activeChallengeBlock === "climate" && <p className="text-white font-bold text-xl leading-relaxed">"Hyper-local weather anomalies are creating supply shocks. You need predictive intelligence."</p>}
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. The SourceTrace DATA GREEN Engine (7-Slice SVG) */}
      <section className="bg-[#0B3D2E] border-y border-white/10 overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         <DataGreenEngine />
      </section>

      {/* 5. The Solution: Massive Interactive 3D Bento Box */}
      <section className="min-h-screen flex flex-col justify-center py-32 bg-gray-50 border-t border-gray-100 snap-center">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full">
            <div className="text-center max-w-4xl mx-auto mb-20">
               <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">The Platform</span>
               <h2 className="text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">One platform. End-to-end visibility.</h2>
               <p className="text-xl text-gray-600">We replace fragmented spreadsheets and siloed apps with a single, unified data architecture that connects farmers to the enterprise.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px] perspective-1000">
               {/* Big Traceability Card - Interactive 3D */}
               <div className="md:col-span-2 md:row-span-2 bg-[#0B3D2E] rounded-[40px] p-12 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(11,61,46,0.3)] transition-all duration-300 transform hover:-translate-y-2 hover:rotate-x-2 hover:rotate-y-[-2deg]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D2E] to-[#1F7A53] opacity-80 z-0"></div>
                  <img src="/assets/traceability-diagram.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover mix-blend-screen opacity-20 group-hover:scale-105 transition-transform duration-500 group-hover:opacity-40" alt="Traceability Graph" />
                  
                  {/* Floating Elements inside card for 3D depth */}
                  <div className="absolute right-10 top-10 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white font-bold text-sm transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                     +1.2M Nodes Mapped
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div className="w-16 h-16 bg-[#53D769]/20 text-[#53D769] rounded-2xl flex items-center justify-center backdrop-blur-md transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(83,215,105,0.2)]">
                        <Globe className="w-8 h-8" />
                     </div>
                     <div className="mt-24 transform group-hover:translate-x-4 transition-transform duration-300">
                        <h3 className="text-4xl font-bold text-white mb-4">Supply Chain Traceability</h3>
                        <p className="text-xl text-gray-300 max-w-lg mb-8 leading-relaxed">Visualize your entire supply network as a dynamic graph. Track every batch from the individual farmer polygon through mills, processors, and factories.</p>
                        <Link href="/solutions/supply-chain-traceability">
                           <Button className="rounded-full bg-white text-[#0B3D2E] hover:bg-[#53D769] border-none font-bold transition-colors shadow-xl">Explore Traceability</Button>
                        </Link>
                     </div>
                  </div>
               </div>

               {/* EUDR Card - Interactive */}
               <div className="bg-white rounded-[40px] p-10 border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 group relative overflow-hidden hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-500 opacity-50 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                     <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <ScanFace className="w-7 h-7" />
                     </div>
                     <h3 className="text-2xl font-bold text-[#0B3D2E] mb-3">EUDR Compliance</h3>
                     <p className="text-gray-600 leading-relaxed mb-6">Automated polygon mapping, deforestation analysis, and Due Diligence Statement generation.</p>
                     <Link href="/solutions/eudr-compliance" className="text-[#1F7A53] font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                        View Solution <ArrowRight className="w-4 h-4"/>
                     </Link>
                  </div>
               </div>

               {/* Sustainability Card - Interactive */}
               <div className="bg-white rounded-[40px] p-10 border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 group relative overflow-hidden hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-500 opacity-50 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                     <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                        <Leaf className="w-7 h-7" />
                     </div>
                     <h3 className="text-2xl font-bold text-[#0B3D2E] mb-3">ESG & Scope 3</h3>
                     <p className="text-gray-600 leading-relaxed mb-6">Measure carbon sequestration, track living wages, and align with SBTi FLAG reporting guidelines.</p>
                     <Link href="/solutions/esg-reporting" className="text-[#1F7A53] font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                        View Solution <ArrowRight className="w-4 h-4"/>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Global Presence - Genuine Interactive Map */}
      <section className="min-h-screen flex flex-col justify-center py-32 bg-white overflow-hidden border-t border-gray-100 snap-center">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 text-center w-full">
            <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Global Impact</span>
            <h2 className="text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">Powering supply chains worldwide</h2>
            
            <InteractiveMap />
         </div>
      </section>

      <StatsBanner />
      <TestimonialsCarousel />
      <IntegrationsGrid />
      <div className="bg-gray-50 border-y border-gray-100">
         <TransparencyFlow />
      </div>
      <div className="bg-white">
         <TechStackGrid />
      </div>
      <CaseStudiesGrid />
      <SecurityCompliance />
      <DashboardPreview />
      <PartnersEcosystem />
      <CTASection />
    </main>
  );
}
