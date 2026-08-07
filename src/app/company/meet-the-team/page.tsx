"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Award,
  Users,
  Building2,
  ExternalLink,
  X,
  Mail,
  ChevronRight,
  ShieldCheck,
  Zap,
  Leaf,
  Cpu,
  LineChart,
  Layers,
  Search,
  Radar,
  FileCheck,
  TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   LINKEDIN ICON COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL WRAPPER
   ═══════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXECUTIVE DATA (STRICTLY VERIFIED SOURCETRACE LEADERSHIP)
   ═══════════════════════════════════════════════════════════════ */

interface ExecutiveMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  highlights: string[];
  linkedin: string;
}

const EXECUTIVE_LEADERS: ExecutiveMember[] = [
  {
    id: "pannaga-patnayak",
    name: "Pannaga Patnayak",
    role: "Chief Executive Officer (CEO)",
    image: "/images/team/pannaga_patnayak.jpg",
    bio: "Pannaga Patnayak brings extensive executive leadership and strategic vision to SourceTrace, guiding global expansion, enterprise SaaS innovation, and sustainable agriculture technology solutions across complex value chains worldwide.",
    highlights: [
      "20+ years driving global enterprise software & digital agtech solutions",
      "Executive oversight across 37+ country deployments & multi-tier value chains",
      "Strategic authority on agtech innovation, ESG & supply chain compliance",
    ],
    linkedin: "https://www.linkedin.com/company/sourcetrace-systems",
  },
  {
    id: "ravi-sabapathy",
    name: "Ravi Sabapathy",
    role: "Vice President, Software Development",
    image: "/images/team/ravi_sabapathy.jpg",
    bio: "Ravi Sabapathy leads software engineering and architectural innovation at SourceTrace, managing global engineering teams to deliver scalable enterprise SaaS platforms, offline mobile apps, GIS tools, and robust supply chain traceability data pipelines.",
    highlights: [
      "Directs global software R&D and cloud platform architecture",
      "Engineered offline-first mobile data capture & EUDR polygon mapping engines",
      "Expert in enterprise security, GIS data pipelines, and scalable microservices",
    ],
    linkedin: "https://www.linkedin.com/company/sourcetrace-systems",
  },
  {
    id: "kavitha-martin",
    name: "Kavitha Martin",
    role: "Vice President, HR, Finance & General Administration",
    image: "/images/team/kavitha_martin.jpg",
    bio: "Kavitha Martin oversees global human resources, financial governance, and administrative operations at SourceTrace, ensuring operational excellence, talent management, regulatory compliance, and fiscal stewardship across all international operating regions.",
    highlights: [
      "20+ years managing global corporate finance, HR, and administration",
      "Spearheads organizational growth, compliance, and international talent strategy",
      "Drives enterprise governance, fiscal discipline, and operational agility",
    ],
    linkedin: "https://www.linkedin.com/company/sourcetrace-systems",
  },
];

/* ═══════════════════════════════════════════════════════════════
   LEADERSHIP PRINCIPLES DATA
   ═══════════════════════════════════════════════════════════════ */

interface Principle {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  gradient: string;
  iconBg: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Customer Success",
    icon: Users,
    description:
      "We are relentlessly dedicated to empowering agricultural enterprises, cooperatives, and smallholders with digital tools that solve real-world operational challenges and maximize value chain efficiency.",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Innovation",
    icon: Zap,
    description:
      "Pioneering state-of-the-art AI, satellite GIS intelligence, offline field data capture, and carbon accounting to simplify complex first-mile agricultural ecosystems.",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-100 text-blue-800",
  },
  {
    title: "Transparency",
    icon: ShieldCheck,
    description:
      "Building uncompromised, end-to-end traceability and audit-ready data systems that establish trust, satisfy compliance, and eliminate supply chain opacity.",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-100 text-amber-800",
  },
  {
    title: "Sustainability",
    icon: Globe,
    description:
      "Advancing regenerative farming practices, deforestation-free sourcing, Scope 3 carbon reduction, and equitable farmer livelihoods across all operating regions.",
    gradient: "from-teal-500/10 via-teal-500/5 to-transparent",
    iconBg: "bg-teal-100 text-teal-800",
  },
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL IMPACT STATS DATA
   ═══════════════════════════════════════════════════════════════ */

const STATS = [
  {
    value: "20+",
    label: "Years of Innovation",
    subtext: "Pioneering agtech SaaS and global first-mile digitization.",
  },
  {
    value: "37+",
    label: "Countries Served",
    subtext: "Active supply chain traceability across global sourcing hubs.",
  },
  {
    value: "Enterprise SaaS",
    label: "Bank-Grade Platform",
    subtext: "ISO-aligned, cloud-scale architecture trusted by global brands.",
  },
  {
    value: "Millions",
    label: "Farmers Digitized",
    subtext: "Empowering smallholders with digital identity and fair trade access.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   LEADERSHIP EXPERTISE DATA
   ═══════════════════════════════════════════════════════════════ */

const EXPERTISE_AREAS = [
  {
    title: "Digital Agriculture",
    desc: "Farm management, offline mobile field capture, and agtech SaaS.",
    icon: Cpu,
  },
  {
    title: "Traceability",
    desc: "End-to-end batch tracking, chain of custody, and Digital Product Passports.",
    icon: Layers,
  },
  {
    title: "GIS & Satellite Intelligence",
    desc: "Deforestation screening, plot polygon mapping, and spatial land analysis.",
    icon: Radar,
  },
  {
    title: "AI & Analytics",
    desc: "Predictive yield modeling, crop risk detection, and automated reporting.",
    icon: LineChart,
  },
  {
    title: "Food Safety",
    desc: "Harvest verification, quality assurance, and hazard compliance.",
    icon: FileCheck,
  },
  {
    title: "ESG",
    desc: "Scope 3 carbon MRV, CSRD reporting, and ethical sourcing audits.",
    icon: Leaf,
  },
  {
    title: "Climate Intelligence",
    desc: "Carbon farming, soil health monitoring, and weather risk models.",
    icon: Globe,
  },
  {
    title: "Supply Chain Visibility",
    desc: "Multi-tier supplier mapping, real-time logistics, and audit trails.",
    icon: Search,
  },
  {
    title: "Farmer Digitization",
    desc: "Smallholder profiling, digital IDs, and transparent mobile payments.",
    icon: Users,
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN LEADERSHIP PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function LeadershipPage() {
  const [selectedExecutive, setSelectedExecutive] = useState<ExecutiveMember | null>(null);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#53D769]/20 selection:text-[#0B3D2E]">
      
      {/* ─────────────────────────────────────────────────────────
          1. HERO SECTION
          ───────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-[#F4F9F6] via-white to-white overflow-hidden border-b border-gray-100">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#53D769]/10 via-[#1F7A53]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Small Label */}
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3D2E]/5 border border-[#0B3D2E]/10 text-[#0B3D2E] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-4 h-4 text-[#1F7A53]" />
                OUR LEADERSHIP
              </div>
            </Reveal>

            {/* Main Headline */}
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3D2E] tracking-tight leading-[1.12] mb-6">
                Leadership Driving Digital Agriculture Worldwide
              </h1>
            </Reveal>

            {/* Subtitle / Description */}
            <Reveal delay={0.15}>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal mb-8">
                Our leadership team combines decades of expertise in digital agriculture, enterprise software, sustainability, traceability, and global supply chain transformation to help organizations build transparent, resilient, and future-ready value chains.
              </p>
            </Reveal>

            {/* Three Small Trust Badges */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-gray-700 font-medium mb-10">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#1F7A53]" />
                  <span>20+ Years of Innovation</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-xs">
                  <Globe className="w-4 h-4 text-[#1F7A53]" />
                  <span>Global Agricultural Expertise</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#1F7A53]" />
                  <span>Trusted Across 37+ Countries</span>
                </div>
              </div>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={0.25}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact-sales"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0B3D2E] text-white font-semibold text-base hover:bg-[#125c44] transition-all shadow-md hover:shadow-lg group cursor-pointer"
                >
                  <span>Contact Sales</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0B3D2E] font-semibold text-base border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer"
                >
                  <span>About SourceTrace</span>
                </Link>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. EXECUTIVE LEADERSHIP SECTION
          ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3D2E] tracking-tight mb-4">
                Executive Leadership
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base sm:text-lg text-gray-600">
                Meet the executives steering SourceTrace's mission to digitize agricultural value chains globally.
              </p>
            </Reveal>
          </div>

          {/* Cards Grid (3 Columns Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXECUTIVE_LEADERS.map((executive, idx) => (
              <Reveal key={executive.id} delay={0.1 * (idx + 1)}>
                <div className="h-full bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
                  
                  {/* Portrait Container */}
                  <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={executive.image}
                      alt={executive.name}
                      fill
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E]/80 via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Designation Banner on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold tracking-tight text-white mb-0.5">
                        {executive.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#53D769]">
                        {executive.role}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    
                    {/* 40-word Bio */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                      {executive.bio}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-3">
                      
                      {/* View Profile Button */}
                      <button
                        onClick={() => setSelectedExecutive(executive)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B3D2E] hover:text-[#1F7A53] transition-colors cursor-pointer group/btn"
                      >
                        <span>View Profile</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>

                      {/* LinkedIn Button */}
                      <a
                        href={executive.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0A66C2] text-gray-600 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        aria-label={`${executive.name} LinkedIn Profile`}
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>

                    </div>

                  </div>

                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. LEADERSHIP PRINCIPLES SECTION
          ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3D2E] tracking-tight mb-4">
                Leadership Principles
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base sm:text-lg text-gray-600">
                Our core values shape every product we build, every field team we support, and every customer partnership we nurture.
              </p>
            </Reveal>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PRINCIPLES.map((principle, idx) => {
              const IconComponent = principle.icon;
              return (
                <Reveal key={principle.title} delay={0.1 * (idx + 1)}>
                  <div className="relative p-8 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col justify-between group">
                    
                    {/* Top row: Icon & Title */}
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`w-12 h-12 rounded-2xl ${principle.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0B3D2E]">
                          {principle.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-base text-gray-600 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>

                    {/* Accent bar bottom */}
                    <div className="mt-8 h-1 w-16 bg-[#1F7A53] rounded-full group-hover:w-24 transition-all duration-300" />
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. GLOBAL IMPACT SECTION
          ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#0B3D2E] text-white relative overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#53D769_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Global Impact
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base sm:text-lg text-emerald-100/80">
                Measurable results driven by executive leadership and field-proven agtech infrastructure.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <Reveal key={stat.label} delay={0.1 * (idx + 1)}>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs text-center flex flex-col justify-center h-full hover:bg-white/10 transition-colors">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#53D769] tracking-tight mb-3">
                    {stat.value}
                  </div>
                  <div className="text-lg font-bold text-white mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-100/70 leading-normal">
                    {stat.subtext}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. LEADERSHIP EXPERTISE SECTION
          ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3D2E] tracking-tight mb-4">
                Leadership Expertise
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base sm:text-lg text-gray-600">
                Decades of specialized domain knowledge powering first-mile digital transformation worldwide.
              </p>
            </Reveal>
          </div>

          {/* 9 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERTISE_AREAS.map((area, idx) => {
              const IconComp = area.icon;
              return (
                <Reveal key={area.title} delay={0.05 * (idx + 1)}>
                  <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-gray-200/80 hover:border-[#1F7A53]/40 hover:bg-white hover:shadow-md transition-all duration-300 h-full flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[#0B3D2E]/10 text-[#0B3D2E] group-hover:bg-[#0B3D2E] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0B3D2E] mb-1">
                        {area.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. BOTTOM CTA SECTION
          ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="p-10 sm:p-14 rounded-3xl bg-white border border-gray-200 shadow-xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#53D769]/10 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight mb-4">
                Partner With the Leadership Behind SourceTrace
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Whether you're digitizing agricultural operations, improving traceability, preparing for EUDR, or scaling sustainable sourcing, our leadership team is ready to help.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact-sales"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0B3D2E] text-white font-semibold text-base hover:bg-[#125c44] transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Contact Sales</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-sales"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-50 text-[#0B3D2E] font-semibold text-base hover:bg-emerald-100 transition-all border border-emerald-200 cursor-pointer"
                >
                  <span>Book a Demo</span>
                </Link>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          EXECUTIVE PROFILE MODAL (INTERACTIVE DRAWER)
          ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedExecutive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-r from-[#0B3D2E] to-[#1F7A53] p-6 flex items-end">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedExecutive(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-end gap-4 relative z-10 translate-y-6 sm:translate-y-8">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-md flex-shrink-0 bg-gray-100">
                    <Image
                      src={selectedExecutive.image}
                      alt={selectedExecutive.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="pb-1 text-white">
                    <h3 className="text-2xl font-bold leading-tight">
                      {selectedExecutive.name}
                    </h3>
                    <p className="text-sm font-medium text-[#53D769]">
                      {selectedExecutive.role}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 pt-12 sm:pt-14 overflow-y-auto space-y-6">
                
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Executive Biography
                  </h4>
                  <p className="text-base text-gray-700 leading-relaxed font-normal">
                    {selectedExecutive.bio}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Key Leadership Achievements
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedExecutive.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#1F7A53] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                  <a
                    href={selectedExecutive.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#084e96] transition-colors shadow-xs"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>

                  <button
                    onClick={() => setSelectedExecutive(null)}
                    className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
