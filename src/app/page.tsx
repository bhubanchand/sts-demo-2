"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/ui/trust-badges";
import { ShieldCheck, MapPin, ScanFace, Globe, ArrowRight, Activity, Leaf, MousePointerClick, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const ExpandingSlideshow = dynamic(() => import("@/components/ui/expanding-slideshow").then(mod => mod.ExpandingSlideshow), { ssr: false });
const InteractiveMap = dynamic(() => import("@/components/ui/interactive-map").then(mod => mod.InteractiveMap), { ssr: false });
const DataGreenEngine = dynamic(() => import("@/components/ui/data-green-engine").then(mod => mod.DataGreenEngine), { ssr: false });
const TechStackGrid = dynamic(() => import("@/components/ui/tech-stack").then(mod => mod.TechStackGrid));
const CaseStudiesGrid = dynamic(() => import("@/components/ui/case-studies-grid").then(mod => mod.CaseStudiesGrid));
const SecurityCompliance = dynamic(() => import("@/components/ui/security-compliance").then(mod => mod.SecurityCompliance));
const DashboardPreview = dynamic(() => import("@/components/ui/dashboard-preview").then(mod => mod.DashboardPreview), { ssr: false });
const TestimonialsCarousel = dynamic(() => import("@/components/ui/testimonials-carousel").then(mod => mod.TestimonialsCarousel));
const IntegrationsGrid = dynamic(() => import("@/components/ui/integrations-grid").then(mod => mod.IntegrationsGrid));
const StatsBanner = dynamic(() => import("@/components/ui/stats-banner").then(mod => mod.StatsBanner));
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Helper component for tracking scroll position of each challenge block
// Helper component for tracking scroll position of each challenge block
interface ChallengeBlockProps {
  id: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  bgClass: string;
  activeBlock: string;
  setActiveBlock: (id: string) => void;
  image: string;
  quote: string;
  badgeText: string;
}

function ChallengeBlock({ id, title, text, icon: Icon, colorClass, bgClass, activeBlock, setActiveBlock, image, quote, badgeText }: ChallengeBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveBlock(id);
    }
  }, [isInView, id, setActiveBlock]);

  const isActive = activeBlock === id;

  return (
    <div 
      ref={ref} 
      onClick={() => setActiveBlock(id)}
      className={`cursor-pointer bg-white rounded-2xl sm:rounded-[40px] p-5 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 border relative overflow-hidden group ${
        isActive 
          ? 'lg:scale-105 scale-100 shadow-[0_20px_40px_rgb(0,0,0,0.1)] border-emerald-500/30' 
          : 'opacity-60 lg:scale-95 scale-100 border-gray-100'
      }`}
    >
      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${bgClass} ${colorClass} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-8 relative z-10`}>
         <Icon className="w-6 h-6 sm:w-8 sm:h-8"/>
      </div>
      <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-gray-900 relative z-10">{title}</h3>
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed relative z-10">{text}</p>
      
      {/* Mobile Card block (only visible below lg breakpoint) */}
      <div className="lg:hidden mt-6 w-full h-[220px] sm:h-[300px] rounded-2xl overflow-hidden relative shadow-md">
         <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-[#0B3D2E]/25 to-transparent opacity-95"></div>
         <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/25 p-4 rounded-xl">
            <p className="text-white text-xs font-bold leading-relaxed">{quote}</p>
         </div>
         <span className="absolute top-4 right-4 bg-white/95 text-[#0B3D2E] font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {badgeText}
         </span>
      </div>

      <div className={`absolute top-0 right-0 w-32 h-32 ${bgClass} rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-300`}></div>
    </div>
  );
}

const CHALLENGE_IMAGES = {
  regulatory: "/assets/esg-dashboard.png",
  fragmented: "/assets/traceability-diagram.png",
  climate: "/assets/ai-graph.png"
};

const CHALLENGES = [
  {
    id: "regulatory",
    title: "Regulatory Tsunami",
    text: "Regulations like the EUDR, CSDDD, and FSMA 204 are moving from voluntary guidelines to strict legal mandates. Non-compliance now means blocked market access and massive fines.",
    icon: ShieldCheck,
    colorClass: "text-red-600",
    bgClass: "bg-red-100",
    quote: `"EUDR and FSMA 204 require precise geocoordinates. The era of self-reported sustainability is over."`,
    image: "/assets/esg-dashboard.png",
    badgeText: "EUDR Compliance Active"
  },
  {
    id: "fragmented",
    title: "Fragmented Data",
    text: "Commodities pass through millions of unmapped smallholder farms and shadowy middlemen. Aggregating this fragmented data into a unified, auditable database is historically impossible.",
    icon: MapPin,
    colorClass: "text-orange-600",
    bgClass: "bg-orange-100",
    quote: `"Without node-level visibility, discovering the true origin of your raw materials is impossible."`,
    image: "/assets/traceability-diagram.png",
    badgeText: "Traceability Mapped"
  },
  {
    id: "climate",
    title: "Climate Volatility",
    text: "Extreme weather events are disrupting crop yields globally. Procurement teams cannot react to supply shocks if they cannot monitor the weather at their exact sourcing origins.",
    icon: Activity,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-100",
    quote: `"Hyper-local weather anomalies are creating supply shocks. You need predictive intelligence."`,
    image: "/assets/ai-graph.png",
    badgeText: "AI Risk Scoring"
  }
];

const HERO_SLIDES = [
  {
    heading: "Digital Agriculture for Smarter Farming",
    subheading: "Empower farmers, field teams, and agribusinesses with real-time visibility across crop production, field operations, and farmer engagement.",
    cta: "Explore Digital Agriculture",
    link: "/solutions/digital-agriculture",
    isBright: false
  },
  {
    heading: "Complete Farm-to-Market Traceability",
    subheading: "Track every step of the agricultural journey with transparent, verifiable data that builds trust, supports compliance, and strengthens supply chains.",
    cta: "Explore Traceability",
    link: "/solutions/supply-chain-traceability",
    isBright: false
  },
  {
    heading: "Driving Sustainable Agriculture at Scale",
    subheading: "Measure environmental impact, support regenerative practices, and achieve sustainability goals through data-driven agricultural intelligence.",
    cta: "Explore Sustainability",
    link: "/solutions/sustainable-sourcing",
    isBright: false
  },
  {
    heading: "Stronger Connections with Every Farmer",
    subheading: "Digitize farmer onboarding, communication, training, and support programs while improving productivity and field-level outcomes.",
    cta: "Explore Farmer Engagement",
    link: "/solutions/farmer-livelihoods",
    isBright: false
  },
  {
    heading: "Resilient Agricultural Supply Chains",
    subheading: "Monitor sourcing activities, procurement operations, and production risks with actionable insights across the value chain.",
    cta: "Explore Supply Chain Solutions",
    link: "/solutions/responsible-sourcing",
    isBright: false
  },
  {
    heading: "Turn Agricultural Data into Decisions",
    subheading: "Leverage analytics, field intelligence, and AI-powered insights to improve productivity, manage risks, and optimize agricultural operations.",
    cta: "Explore Analytics",
    link: "/solutions/impact-measurement",
    isBright: false
  }
];

const slideVariants = {
  initial: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 100 : -100
  }),
  animate: {
    opacity: 1,
    x: 0
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -100 : 100
  })
};

export default function Home() {
  const [activeChallengeBlock, setActiveChallengeBlock] = useState("regulatory");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next (R-to-L), -1: prev (L-to-R)
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setDirection(1); // Autoplay goes right to left
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const handlePrevSlide = () => {
    setUserInteracted(true);
    setDirection(-1);
    setActiveSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setUserInteracted(true);
    setDirection(1);
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setUserInteracted(true);
    if (index > activeSlideIndex) {
      setDirection(1);
    } else if (index < activeSlideIndex) {
      setDirection(-1);
    }
    setActiveSlideIndex(index);
  };
  
  return (
    <main className="min-h-screen bg-white selection:bg-[#53D769] selection:text-[#0B3D2E]">
      <section className="relative h-[80vh] sm:h-[82vh] md:h-[85vh] lg:h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#0B3D2E] snap-start pt-24 lg:pt-0">
        {/* Continuous looping background video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/assets/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
          src="/assets/hero-background.mp4"
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
        
        {/* Left and Right navigation arrows - Centered vertically and inset responsively */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 hidden md:flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 backdrop-blur-md transition-all group cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 group-hover:text-white transition-colors" />
        </button>
        
        <button
          onClick={handleNextSlide}
          className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 hidden md:flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 backdrop-blur-md transition-all group cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 group-hover:text-white transition-colors" />
        </button>

        {/* Desktop Pagination Controls - Dots only on Desktop (absolute bottom) */}
        <div className="hidden lg:flex absolute bottom-48 left-1/2 -translate-x-1/2 items-center gap-1 z-40">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = activeSlideIndex === index;
            const isBright = !!slide.isBright;
            return (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="relative flex items-center justify-center w-8 h-8 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 h-3 bg-[#53D769]"
                      : `w-3 h-3 ${
                          isBright
                            ? "bg-[#0B3D2E]/55 hover:bg-[#0B3D2E]/85"
                            : "bg-white/75 hover:bg-white/95"
                        }`
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Slide Content with AnimatePresence for smooth cross-fades */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-32 flex flex-col items-center justify-center text-center pt-16 pb-10 md:pt-36 md:pb-20 lg:pt-32 lg:pb-60">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlideIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center max-w-4xl"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
                {HERO_SLIDES[activeSlideIndex].heading}
              </h1>
              
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200/90 max-w-[90%] sm:max-w-3xl mx-auto leading-relaxed mb-8 md:mb-10 font-light">
                {HERO_SLIDES[activeSlideIndex].subheading}
              </p>
              
              <div className="flex justify-center w-full">
                <motion.div
                  className="w-full sm:w-auto flex justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href={HERO_SLIDES[activeSlideIndex].link}
                    className="inline-flex items-center justify-center w-[88%] sm:w-auto h-[54px] sm:h-16 px-8 sm:px-10 text-lg sm:text-xl rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white hover:text-[#0B3D2E] border-none font-bold shadow-[0_0_40px_rgba(83,215,105,0.4)] hover:shadow-[0_0_60px_rgba(83,215,105,0.6)] transition-all transform hover:-translate-y-1 cursor-pointer select-none"
                  >
                    {HERO_SLIDES[activeSlideIndex].cta}
                  </Link>
                </motion.div>
              </div>

              {/* Mobile/Tablet Pagination Controls - Rendered inline below the CTA */}
              <div className="flex lg:hidden items-center justify-center gap-0 sm:gap-1 mt-8">
                {HERO_SLIDES.map((slide, index) => {
                  const isActive = activeSlideIndex === index;
                  const isBright = !!slide.isBright;
                  return (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className="relative flex items-center justify-center w-11 h-11 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-8 h-2.5 bg-[#53D769]"
                            : `w-2.5 h-2.5 ${
                                isBright
                                  ? "bg-[#0B3D2E]/55 hover:bg-[#0B3D2E]/85"
                                  : "bg-white/75 hover:bg-white/95"
                              }`
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Trust Badges Overlay (Absolute bottom) */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-30 w-full">
          <TrustBadges className="bg-[#EBF7F0]/95 backdrop-blur-md" />
        </div>
      </section>

      {/* Mobile/Tablet Trust Badges flows below Hero section */}
      <div className="block lg:hidden w-full relative z-20">
        <TrustBadges className="bg-[#EBF7F0]" />
      </div>

      <section className="bg-gray-50 border-y border-gray-100 flex flex-col justify-center snap-center">
         <ExpandingSlideshow />
      </section>

      {/* 3. The Global Challenge (Dynamic Scroll-Linked Image) */}
      <section className="py-10 lg:py-16 bg-white relative">
         <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
               {/* Left Column (Text Blocks) */}
               <div className="w-full lg:w-1/2 flex flex-col gap-12 relative z-10 py-8 lg:py-16">
                  <div className="mb-6 lg:mb-10">
                     <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">The Challenge</span>
                     <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">Supply chains are broken at the source.</h2>
                     <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                        Enterprises lack visibility into the &ldquo;first mile&rdquo; where raw materials are actually grown. This opacity leads to deforestation risks, human rights violations, and the inability to prove ESG claims.
                     </p>
                  </div>
                  
                  {/* Vertical stack of ChallengeBlocks */}
                  <div className="flex flex-col gap-8 lg:gap-12">
                     {CHALLENGES.map((item) => (
                        <ChallengeBlock 
                           key={item.id}
                           id={item.id} 
                           title={item.title} 
                           text={item.text}
                           icon={item.icon} 
                           colorClass={item.colorClass} 
                           bgClass={item.bgClass} 
                           activeBlock={activeChallengeBlock}
                           setActiveBlock={setActiveChallengeBlock} 
                           image={item.image}
                           quote={item.quote}
                           badgeText={item.badgeText}
                        />
                     ))}
                  </div>
               </div>

               {/* Right Column (Sticky Stack of 3 Cards - Desktop Only) */}
               <div className="hidden lg:block w-full lg:w-1/2 lg:sticky lg:top-40 h-[600px] mt-16 self-start relative">
                  {CHALLENGES.map((item) => {
                     const isActive = activeChallengeBlock === item.id;
                     return (
                        <motion.div
                           key={item.id}
                           initial={false}
                           animate={{
                              opacity: isActive ? 1 : 0,
                              scale: isActive ? 1 : 0.95,
                              y: isActive ? 0 : 20,
                              pointerEvents: isActive ? "auto" : "none"
                           }}
                           transition={{ duration: 0.45, ease: "easeOut" }}
                           className="absolute inset-0 w-full h-full rounded-[40px] overflow-hidden shadow-2xl bg-[#0B3D2E]"
                        >
                           <img 
                              src={item.image} 
                              alt={item.title} 
                              className="absolute inset-0 w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-[#0B3D2E]/25 to-transparent opacity-95"></div>
                           
                           {/* Premium Badge */}
                           <span className="absolute top-6 right-6 bg-white/95 text-[#0B3D2E] font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md z-30">
                              {item.badgeText}
                           </span>

                           {/* Dynamic caption overlay */}
                           <div className="absolute bottom-10 left-10 right-10 z-30">
                              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
                                 <p className="text-white font-bold text-xl leading-relaxed">
                                    {item.quote}
                                 </p>
                              </div>
                           </div>
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         </div>
      </section>

      {/* 4. The SourceTrace DATA GREEN Engine (7-Slice SVG) */}
      <section className="bg-white border-y border-gray-100 overflow-hidden relative">
         <div className="text-center pt-12 pb-2 z-10 relative">
            <span className="font-extrabold tracking-[0.2em] uppercase mb-1.5 block text-[#10b981] text-xs">Data Green Operating System</span>
            <h2 className="text-3xl md:text-[40px] font-black leading-tight text-[#004D26] tracking-tight">Connected Agriculture Ecosystem</h2>
            <p className="text-xs md:text-sm text-gray-400 mt-2 font-semibold max-w-lg mx-auto">Hover any module to trace the living data journey.</p>
         </div>
         <DataGreenEngine />
      </section>

      {/* 5. Command Center */}
       <section className="flex flex-col justify-center py-16 bg-gray-50 border-t border-gray-100">
         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 w-full">
            <div className="text-center max-w-4xl mx-auto mb-16">
               <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">The Platform</span>
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">One platform. End-to-end visibility.</h2>
               <p className="text-base sm:text-xl text-gray-600">We replace fragmented spreadsheets and siloed apps with a single, unified data architecture that connects farmers to the enterprise.</p>
            </div>

            <div className="w-full">
               <DashboardPreview hideHeader={true} />
            </div>
         </div>
      </section>

       {/* 6. Global Presence - Genuine Interactive Map */}
       <section className="flex flex-col justify-center py-16 bg-white overflow-hidden border-t border-gray-100">
         <div className="max-w-[1400px] mx-auto text-center w-full">
            <div className="px-6 sm:px-8 mb-6">
               <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Global Impact</span>
               <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">Powering supply chains worldwide</h2>
            </div>
            
            <InteractiveMap />
         </div>
      </section>

      <StatsBanner />
      <TestimonialsCarousel />
      <IntegrationsGrid />
      <div className="bg-white">
         <TechStackGrid />
      </div>
      <CaseStudiesGrid />
      <SecurityCompliance />
    </main>
  );
}
