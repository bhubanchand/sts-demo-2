"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
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
   DATA STRUCTURES
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

interface LeaderMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

interface RegionalLeaderMember {
  flag: string;
  region: string;
  name: string;
  role: string;
  image: string;
  bgImage: string;
  linkedin: string;
}

const EXECUTIVE_LEADERS: ExecutiveMember[] = [
  {
    id: "venkat-maroju",
    name: "Dr. Venkat Maroju",
    role: "Chief Executive Officer (CEO)",
    image: "/images/team/member_male_1.png",
    bio: "A visionary leader in agricultural tech and supply chain digitization with over 20 years of experience empowering enterprise brands, smallholder farmers, and global cooperatives.",
    highlights: [
      "20+ years driving global enterprise SaaS and digital ag solutions",
      "Pioneered first-mile digital transformation across 44+ countries",
      "Keynote speaker on EUDR, carbon MRV, and ag supply chain ethics",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "david-chen",
    name: "David Chen",
    role: "Chief Technology Officer (CTO)",
    image: "/images/team/member_male_2.png",
    bio: "Pioneers enterprise AI, satellite GIS data engines, and scalable SaaS infrastructure for multi-tier global supply chain traceability across complex agricultural value chains.",
    highlights: [
      "Former Principal Architect for enterprise cloud platforms",
      "Architected SourceTrace's real-time EUDR polygon mapping engine",
      "Expert in offline-first mobile data capture for rural farming hubs",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "aris-van-veen",
    name: "Dr. Aris van Veen",
    role: "Chief Sustainability Officer (CSO)",
    image: "/images/team/member_female_1.png",
    bio: "Leading researcher and strategist in EUDR compliance, carbon MRV frameworks, and regenerative agriculture systems for global enterprise value chains.",
    highlights: [
      "Advisor to international ESG standards bodies and multilateral agencies",
      "Published authority on Scope 3 carbon accounting in agriculture",
      "Spearheads regenerative sourcing frameworks for Fortune 500 brands",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    id: "michael-oconnor",
    name: "Michael O'Connor",
    role: "Chief Operations Officer (COO)",
    image: "/images/team/member_male_1.png",
    bio: "Oversees global operations, multi-country delivery, and enterprise partner ecosystems to ensure flawless deployment across first-mile to last-mile operations.",
    highlights: [
      "Scaled international operations across APAC, LATAM, and EMEA",
      "Built SourceTrace's 24/7 global customer success framework",
      "20+ years in complex enterprise software delivery and logistics",
    ],
    linkedin: "https://www.linkedin.com",
  },
];

const FUNCTIONAL_LEADERS: LeaderMember[] = [
  {
    name: "Priya Patel",
    role: "VP of Product Engineering",
    image: "/images/team/member_female_2.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Jessica Kuan",
    role: "Head of Data Platform & AI",
    image: "/images/team/member_female_1.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Prof. Marcus Aurelius",
    role: "Senior AI & Analytics Advisor",
    image: "/images/team/member_male_2.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Sarah Jenkins",
    role: "Director of Regenerative Strategy",
    image: "/images/team/member_female_2.png",
    linkedin: "https://www.linkedin.com",
  },
];

const REGIONAL_LEADERS: RegionalLeaderMember[] = [
  {
    flag: "🇺🇸",
    region: "North America",
    name: "Olivia Thompson",
    role: "ESG Compliance Lead, North America",
    image: "/images/team/member_female_2.png",
    bgImage: "/images/coffee_farm_1780769033391.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    flag: "🇪🇺",
    region: "Europe",
    name: "Chloe Dubois",
    role: "Head of EUDR Sourcing, Europe",
    image: "/images/team/member_female_1.png",
    bgImage: "/images/grain_silos_1780769310206.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    flag: "🌏",
    region: "Asia & APAC",
    name: "Rajesh Kumar",
    role: "Head of First-Mile Operations, South Asia",
    image: "/images/team/member_male_1.png",
    bgImage: "/images/rice_terraces_1780769098706.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    flag: "🌍",
    region: "Africa & Latin America",
    name: "John Mwangi",
    role: "Regional Director, East Africa & LatAm",
    image: "/images/team/member_male_2.png",
    bgImage: "/images/cocoa_pods_1780769052084.png",
    linkedin: "https://www.linkedin.com",
  },
];

const THOUGHT_LEADERS: LeaderMember[] = [
  {
    name: "Elena Rostova",
    role: "VP of Climate Research & Deforestation",
    image: "/images/team/member_female_1.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Gabriel Barbosa",
    role: "Deforestation Canopy Lead, Brazil",
    image: "/images/team/member_male_2.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Dr. Kenji Tanaka",
    role: "Regional Traceability Lead, APAC",
    image: "/images/team/member_female_2.png",
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Amina Al-Farsi",
    role: "Regional Director, Middle East & Impact",
    image: "/images/team/member_female_1.png",
    linkedin: "https://www.linkedin.com",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE CONTENT
   ═══════════════════════════════════════════════════════════════ */

function MeetTheTeamContent() {
  const searchParams = useSearchParams();
  const [selectedExecutive, setSelectedExecutive] = useState<ExecutiveMember | null>(null);

  // Deep-linking scroll support for section parameters
  useEffect(() => {
    const sectionParam = searchParams.get("section");
    const hashParam =
      typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const targetId = sectionParam || hashParam;

    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-white">
      {/* ═════════════════════════════════════════════════
          SECTION 1 – MODERN SPLIT HERO
          ═════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-[#FAFDF8] via-white to-white pt-24 sm:pt-32 pb-16 sm:pb-24 border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF5EE] text-[#1F7A53] text-xs font-extrabold uppercase tracking-wider mb-6 border border-[#1F7A53]/20 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  OUR LEADERSHIP
                </span>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.3rem] font-extrabold text-[#0B3D2E] leading-[1.12] tracking-tight mb-6">
                  Leadership That Drives Global Agricultural Transformation
                </h1>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
                  Our leaders combine expertise in agriculture, sustainability, AI, enterprise software and global supply chains to help organizations build transparent, resilient and future-ready value chains.
                </p>
              </Reveal>

              {/* 3 Feature Badges */}
              <Reveal delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                  <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                    <Award className="w-4.5 h-4.5 text-[#1F7A53] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#0B3D2E]">
                      20+ Years of Innovation
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                    <Globe className="w-4.5 h-4.5 text-[#1F7A53] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#0B3D2E]">
                      Global Industry Expertise
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                    <Users className="w-4.5 h-4.5 text-[#1F7A53] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#0B3D2E]">
                      Customer-Centric Leadership
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={0.25}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact-sales"
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0B3D2E] text-white text-sm font-bold hover:bg-[#125c44] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                  >
                    Contact Sales
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#executive-leadership"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-[#0B3D2E] text-[#0B3D2E] text-sm font-bold hover:bg-[#0B3D2E] hover:text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Explore Leadership
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Agriculture Landscape Graphic */}
            <div className="lg:col-span-5">
              <Reveal delay={0.2} className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#53D769]/20 via-[#1F7A53]/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

                <div className="relative rounded-[28px] overflow-hidden border border-gray-200/90 shadow-2xl bg-white p-2">
                  <div className="relative rounded-[24px] overflow-hidden h-[360px] sm:h-[440px]">
                    <img
                      src="/images/coffee_farm_1780769033391.png"
                      alt="Global Sustainable Agriculture"
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay & Animated Connection Dots */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E]/80 via-[#0B3D2E]/20 to-transparent" />

                    {/* Global Connection Nodes Graphic */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                          🌐 44+ Countries Digitized
                        </span>
                        <span className="w-3 h-3 rounded-full bg-[#53D769] animate-ping" />
                      </div>

                      <div className="text-white space-y-1">
                        <p className="text-xs uppercase tracking-widest text-[#53D769] font-bold">
                          Empowering Enterprise Value Chains
                        </p>
                        <p className="text-xl font-bold">
                          First-Mile to Enterprise Governance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 2 – EXECUTIVE LEADERSHIP (4 LARGE CARDS)
          ═════════════════════════════════════════════════ */}
      <section
        id="executive-leadership"
        className="py-20 sm:py-28 bg-white scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                EXECUTIVE LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] tracking-tight mb-4">
                Guiding Strategy. Driving Global Impact.
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Meet the executive leaders steering SourceTrace towards enterprise innovation and sustainable supply chain governance.
              </p>
            </div>
          </Reveal>

          {/* 4 Large Executive Profile Cards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {EXECUTIVE_LEADERS.map((exec, idx) => (
              <Reveal key={exec.id} delay={idx * 0.1}>
                <div className="group bg-gradient-to-br from-white via-white to-[#EAF5EE]/40 rounded-[24px] border border-gray-200 p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#53D769]/10 to-transparent rounded-bl-full pointer-events-none" />

                  <div>
                    {/* Top Row: Portrait + Details */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-emerald-100 group-hover:ring-[#1F7A53] transition-all duration-300 flex-shrink-0">
                        <img
                          src={exec.image}
                          alt={exec.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B3D2E] group-hover:text-[#1F7A53] transition-colors mb-1">
                          {exec.name}
                        </h3>
                        <p className="text-sm font-bold text-[#1F7A53]">
                          {exec.role}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {exec.bio}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
                    <button
                      onClick={() => setSelectedExecutive(exec)}
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0B3D2E] hover:text-[#1F7A53] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      View Profile
                      <ChevronRight className="w-4 h-4 text-[#1F7A53]" />
                    </button>

                    <a
                      href={exec.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-[#0A66C2] text-[#1F7A53] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
                      aria-label={`LinkedIn Profile for ${exec.name}`}
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 3 – FUNCTIONAL LEADERSHIP (4 MEDIUM CARDS)
          ═════════════════════════════════════════════════ */}
      <section
        id="functional-leaders"
        className="py-20 sm:py-24 bg-gray-50/70 border-y border-gray-100 scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header with View All Right side */}
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                  FUNCTIONAL LEADERSHIP
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight">
                  Experts Across Every Capability.
                </h2>
              </div>

              <a
                href="#functional-leaders"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1F7A53] hover:text-[#0B3D2E] transition-colors"
              >
                View All Functional Leaders
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          {/* 4 Medium Profile Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FUNCTIONAL_LEADERS.map((member, idx) => (
              <Reveal key={member.name} delay={idx * 0.08}>
                <div className="group bg-white rounded-[24px] border border-gray-200/90 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/30 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-[#53D769] transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-extrabold text-[#0B3D2E] text-lg mb-1 group-hover:text-[#1F7A53] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 min-h-[36px] mb-5">
                    {member.role}
                  </p>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0A66C2] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 4 – REGIONAL LEADERSHIP (LANDSCAPE CARDS)
          ═════════════════════════════════════════════════ */}
      <section
        id="regional-leaders"
        className="py-20 sm:py-28 bg-white scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                REGIONAL LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight mb-3">
                Local Expertise. Global Reach.
              </h2>
              <p className="text-gray-600 text-base">
                On-the-ground regional directors ensuring seamless implementation across key agricultural producing and consuming continents.
              </p>
            </div>
          </Reveal>

          {/* 4 Landscape Style Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {REGIONAL_LEADERS.map((reg, idx) => (
              <Reveal key={reg.region} delay={idx * 0.1}>
                <div className="group relative bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 transition-all duration-300 flex flex-col sm:flex-row h-full">
                  {/* Left Regional Image */}
                  <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden">
                    <img
                      src={reg.bgImage}
                      alt={reg.region}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 to-transparent" />
                    <span className="absolute top-4 left-4 text-3xl drop-shadow-md">
                      {reg.flag}
                    </span>
                  </div>

                  {/* Right Details */}
                  <div className="sm:w-3/5 p-6 sm:p-7 flex flex-col justify-between bg-white">
                    <div>
                      <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-1 block">
                        {reg.region}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0B3D2E] mb-1 group-hover:text-[#1F7A53] transition-colors">
                        {reg.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 mb-4">
                        {reg.role}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400">
                        Regional Director
                      </span>
                      <a
                        href={reg.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0A66C2] text-gray-500 hover:text-white flex items-center justify-center transition-colors"
                        aria-label={`LinkedIn for ${reg.name}`}
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 5 – THOUGHT LEADERS (COMPACT CARDS)
          ═════════════════════════════════════════════════ */}
      <section
        id="thought-leaders"
        className="py-20 sm:py-24 bg-gray-50/70 border-t border-gray-100 scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                  THOUGHT LEADERS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight">
                  Shaping the Future of Agriculture.
                </h2>
              </div>

              <a
                href="#thought-leaders"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1F7A53] hover:text-[#0B3D2E] transition-colors"
              >
                View All Thought Leaders
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          {/* Compact Horizontal Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {THOUGHT_LEADERS.map((tl, idx) => (
              <Reveal key={tl.name} delay={idx * 0.08}>
                <div className="group bg-white rounded-[24px] border border-gray-200/90 p-5 shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-[#1F7A53]/30 transition-all duration-300 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xs flex-shrink-0 ring-2 ring-emerald-100 group-hover:ring-[#1F7A53] transition-all">
                    <img
                      src={tl.image}
                      alt={tl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-[#0B3D2E] text-sm truncate group-hover:text-[#1F7A53] transition-colors">
                      {tl.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-500 line-clamp-2 mb-1.5">
                      {tl.role}
                    </p>
                    <a
                      href={tl.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A66C2] hover:underline"
                    >
                      <LinkedinIcon className="w-3 h-3" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 6 – BOTTOM ENTERPRISE CTA
          ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="relative rounded-[32px] bg-gradient-to-br from-[#EAF5EE] via-[#F2FAF4] to-[#EAF5EE] border border-[#1F7A53]/25 p-8 sm:p-14 shadow-2xl overflow-hidden text-center max-w-5xl mx-auto">
              {/* Floating Avatars Background Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between items-center px-12">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1F7A53]">
                  <img src="/images/team/member_male_1.png" alt="" />
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1F7A53] mb-20">
                  <img src="/images/team/member_female_1.png" alt="" />
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1F7A53]">
                  <img src="/images/team/member_female_2.png" alt="" />
                </div>
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F7A53]/10 text-[#1F7A53] text-xs font-extrabold uppercase tracking-wider mb-5 border border-[#1F7A53]/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  START THE CONVERSATION
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] tracking-tight mb-4">
                  Partner With the Leaders Behind SourceTrace
                </h2>

                <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                  Whether you&rsquo;re building traceable supply chains, preparing for EUDR compliance, or accelerating sustainable sourcing, our leadership team is ready to help.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact-sales"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0B3D2E] text-white text-base font-extrabold hover:bg-[#125c44] transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-[0.98] cursor-pointer shadow-lg"
                  >
                    Contact Sales
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#53D769]" />
                  </Link>

                  <Link
                    href="/contact-sales"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white border-2 border-[#0B3D2E] text-[#0B3D2E] text-base font-extrabold hover:bg-[#0B3D2E] hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
                  >
                    Book a Meeting
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          EXECUTIVE PROFILE MODAL
          ═════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedExecutive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setSelectedExecutive(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#EAF5EE] flex-shrink-0 shadow-sm">
                  <img
                    src={selectedExecutive.image}
                    alt={selectedExecutive.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B3D2E]">
                    {selectedExecutive.name}
                  </h3>
                  <p className="text-sm font-bold text-[#1F7A53] mb-2">
                    {selectedExecutive.role}
                  </p>
                  <a
                    href={selectedExecutive.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedExecutive.bio}
                </p>

                <div className="bg-[#EAF5EE]/60 p-4 rounded-2xl border border-[#1F7A53]/15">
                  <h4 className="text-xs font-extrabold text-[#0B3D2E] uppercase tracking-wider mb-2.5">
                    Career & Leadership Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedExecutive.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1F7A53] mt-0.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedExecutive(null)}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/contact-sales"
                  className="px-6 py-2.5 rounded-full bg-[#0B3D2E] text-white text-xs font-bold hover:bg-[#125c44] transition-colors"
                >
                  Connect with Leadership
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function MeetTheTeamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#1F7A53] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-gray-500">
              Loading Leadership...
            </span>
          </div>
        </div>
      }
    >
      <MeetTheTeamContent />
    </Suspense>
  );
}
