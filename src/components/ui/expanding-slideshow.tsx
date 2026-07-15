"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LineChart, Shield, Leaf, Users, Satellite, Smartphone } from "lucide-react";
import Link from "next/link";

interface SlideNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  gradient: string;
  accentColor: string;
  iconBg: string;
  link: string;
  stats: { label: string; value: string }[];
}

const SLIDES: SlideNode[] = [
  {
    id: "traceability",
    title: "Traceability Graph",
    subtitle: "Origin to Shelf",
    description: "Map your entire supply network from farm origin to factory floor with full chain-of-custody visibility across every tier.",
    icon: LineChart,
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-600/95 via-emerald-700/80 to-transparent",
    accentColor: "text-emerald-400",
    iconBg: "bg-emerald-500",
    link: "/intelligence/traceability-graph",
    stats: [{ label: "Supply Tiers", value: "6+" }, { label: "Data Points", value: "140M+" }],
  },
  {
    id: "eudr",
    title: "EUDR Compliance",
    subtitle: "Zero Deforestation",
    description: "Automated polygon mapping and geolocation-based deforestation risk checks aligned with EU Regulation 2023/1115.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600/95 via-blue-700/80 to-transparent",
    accentColor: "text-blue-400",
    iconBg: "bg-blue-500",
    link: "/compliance/eudr",
    stats: [{ label: "Polygons Mapped", value: "2.4M" }, { label: "Alerts/Day", value: "12K" }],
  },
  {
    id: "esg",
    title: "ESG Reporting",
    subtitle: "Scope 1–3 Emissions",
    description: "Real-time Scope 3 emissions tracking, living wage gap analysis, and automated CSRD-ready sustainability disclosures.",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-teal-600/95 via-teal-700/80 to-transparent",
    accentColor: "text-teal-400",
    iconBg: "bg-teal-500",
    link: "/solutions/esg-reporting",
    stats: [{ label: "KPIs Tracked", value: "200+" }, { label: "Frameworks", value: "GRI, ESRS" }],
  },
  {
    id: "farmers",
    title: "Farmer Engagement",
    subtitle: "Direct-to-Farmer",
    description: "Digital payments, advisory services, and real-time communication channels connecting enterprises to 2.4M+ smallholders.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5b16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-amber-600/95 via-amber-700/80 to-transparent",
    accentColor: "text-amber-400",
    iconBg: "bg-amber-500",
    link: "/solutions/farmer-livelihoods",
    stats: [{ label: "Farmers", value: "2.4M+" }, { label: "Payments", value: "$120M+" }],
  },
  {
    id: "geospatial",
    title: "Geospatial AI",
    subtitle: "Satellite Intelligence",
    description: "Satellite-driven insights for yield prediction, weather alerts, deforestation monitoring, and farm boundary verification.",
    icon: Satellite,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-violet-600/95 via-violet-700/80 to-transparent",
    accentColor: "text-violet-400",
    iconBg: "bg-violet-500",
    link: "/intelligence/geospatial-intelligence",
    stats: [{ label: "Resolution", value: "10m" }, { label: "Revisit", value: "5 Days" }],
  },
  {
    id: "mobile",
    title: "Mobile Field App",
    subtitle: "Offline-First",
    description: "Offline-capable application for agronomists and extension workers with GPS capture, photo verification, and instant sync.",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    gradient: "from-rose-600/95 via-rose-700/80 to-transparent",
    accentColor: "text-rose-400",
    iconBg: "bg-rose-500",
    link: "/solutions/smallholder-management",
    stats: [{ label: "Languages", value: "40+" }, { label: "Uptime", value: "99.9%" }],
  },
];

export function ExpandingSlideshow() {
  const [activeSlide, setActiveSlide] = useState(SLIDES[0].id);

  const handleHover = useCallback((id: string) => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
      setActiveSlide(id);
    }
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[#1F7A53] font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3 block">Platform Capabilities</span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] leading-tight">
          One platform, end-to-end visibility
        </h2>
      </div>

      {/* Expanding Panels */}
      <div className="flex flex-col md:flex-row gap-2 sm:gap-3 w-full h-auto md:h-[520px]" style={{ touchAction: 'pan-y' }}>
        {SLIDES.map((slide) => {
          const isActive = activeSlide === slide.id;
          const Icon = slide.icon;

          return (
            <motion.div
              key={slide.id}
              onHoverStart={() => handleHover(slide.id)}
              onClick={() => setActiveSlide(slide.id)}
              layout
              initial={false}
              animate={{ flex: isActive ? 6 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group md:min-h-0 min-w-0 md:min-w-[72px] ${isActive ? 'min-h-[320px]' : 'min-h-[64px]'} transition-all`}
            >
              {/* Background Image */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: isActive ? 1.05 : 1.15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Dark overlay – collapsed panels get much darker */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                isActive
                  ? `bg-gradient-to-r ${slide.gradient}`
                  : "bg-black/60 hover:bg-black/50"
              }`} />

              {/* Content */}
              <AnimatePresence mode="wait">
                {isActive ? (
                  /* ── EXPANDED STATE ── */
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-10"
                  >
                    {/* Subtitle badge */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${slide.accentColor} bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10`}>
                        <Icon className="w-3 h-3" />
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight mb-2 sm:mb-3 tracking-tight">
                      {slide.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-5 max-w-lg font-medium">
                      {slide.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-5">
                      {slide.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-white font-black text-base sm:text-lg lg:text-xl">{stat.value}</span>
                          <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/20 w-fit transition-all duration-300 group/cta"
                    >
                      Explore Module
                      <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ) : (
                  /* ── COLLAPSED STATE ── */
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-row md:flex-col items-center justify-center gap-3 md:gap-4 p-3 z-10"
                  >
                    {/* Icon circle */}
                    <div className={`w-11 h-11 rounded-full ${slide.iconBg} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Vertical title (desktop) */}
                    <span
                      className="hidden md:block text-[11px] font-black text-white/90 uppercase tracking-[0.2em] whitespace-nowrap group-hover:text-white transition-colors duration-300"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {slide.title}
                    </span>

                    {/* Horizontal title (mobile) */}
                    <span className="block md:hidden text-xs font-black text-white/90 uppercase tracking-widest">
                      {slide.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
