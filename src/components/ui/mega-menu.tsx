"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Leaf, Target, Map, Shield, Activity, Users, Database, Server, Smartphone, BookOpen, FileText, Briefcase, GraduationCap, ArrowRight, Menu, X, ArrowLeft, ChevronRight, Zap, BarChart3, Globe, Lock, Sprout } from "lucide-react";
import { Button } from "./button";

/* ─── Slide variants with spring-like ease ─── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

interface NavigationLink {
  name: string;
  href: string;
  desc: string;
  icon?: React.ComponentType<{ className?: string }>;
}

/* ─── Navigation Data ─── */
const PLATFORM_LINKS: NavigationLink[] = [
  { name: "Traceability", href: "/platform/traceability", icon: Map, desc: "End-to-end supply chain traceability from farm to fork." },
  { name: "Farmer Engagement", href: "/platform/farmer-engagement", icon: Users, desc: "Digital tools connecting with smallholder farmers worldwide." },
  { name: "Sustainability Intelligence", href: "/platform/sustainability-intelligence", icon: Leaf, desc: "AI-powered insights for sustainable agriculture practices." },
  { name: "Supply Chain Visibility", href: "/platform/supply-chain-visibility", icon: Target, desc: "Real-time visibility across complex supply networks." },
  { name: "ESG Compliance", href: "/platform/esg-compliance", icon: Shield, desc: "Automated ESG compliance monitoring and reporting." },
  { name: "Field Data Collection", href: "/platform/field-data-collection", icon: Database, desc: "Mobile-first data capture from the field." },
  { name: "Risk Monitoring", href: "/platform/risk-monitoring", icon: Activity, desc: "Proactive supply chain risk detection and alerts." },
  { name: "Reporting & Analytics", href: "/platform/reporting-analytics", icon: FileText, desc: "Customizable dashboards and compliance reports." },
  { name: "Integrations", href: "/platform/integrations", icon: Server, desc: "Connect with ERPs, CRMs, and existing systems." },
  { name: "Mobile App", href: "/platform/mobile-app", icon: Smartphone, desc: "Field operations accessible from any device." },
];

const INTELLIGENCE_LINKS: NavigationLink[] = [
  { name: "AI Engine", href: "/intelligence/ai-engine", desc: "Core machine learning models powering our predictions." },
  { name: "Predictive Insights", href: "/intelligence/predictive-insights", desc: "Forecast yields, risks, and market trends." },
  { name: "Geospatial Intelligence", href: "/intelligence/geospatial-intelligence", desc: "Satellite imagery analysis for farm monitoring." },
  { name: "Climate Risk", href: "/intelligence/climate-risk", desc: "Assess climate vulnerability across sourcing regions." },
  { name: "Deforestation Monitoring", href: "/intelligence/deforestation-monitoring", desc: "Real-time forest change detection with AI." },
  { name: "Carbon Monitoring", href: "/intelligence/carbon-monitoring", desc: "Track and verify carbon sequestration at farm level." },
  { name: "Regenerative Agriculture", href: "/intelligence/regenerative-agriculture", desc: "Measure impact of regenerative farming practices." },
  { name: "Traceability Graph", href: "/intelligence/traceability-graph", desc: "Knowledge graph linking every node in the chain." },
];

const SOLUTIONS_LINKS: NavigationLink[] = [
  { name: "Sustainable Sourcing", href: "/solutions/sustainable-sourcing", desc: "Source responsibly with full origin transparency." },
  { name: "EUDR Compliance", href: "/solutions/eudr-compliance", desc: "Meet EU Deforestation Regulation requirements." },
  { name: "ESG Reporting", href: "/solutions/esg-reporting", desc: "Generate audit-ready ESG reports effortlessly." },
  { name: "Supply Chain Traceability", href: "/solutions/supply-chain-traceability", desc: "Track products from origin to destination." },
  { name: "Farmer Livelihoods", href: "/solutions/farmer-livelihoods", desc: "Improve farmer income and living standards." },
  { name: "Smallholder Management", href: "/solutions/smallholder-management", desc: "Manage and support smallholder farmer networks." },
  { name: "Responsible Sourcing", href: "/solutions/responsible-sourcing", desc: "Ethical procurement with verified provenance." },
  { name: "Impact Measurement", href: "/solutions/impact-measurement", desc: "Quantify social and environmental outcomes." },
  { name: "Certification Management", href: "/solutions/certification-management", desc: "Streamline certification workflows and audits." },
];

const INDUSTRIES_LINKS: NavigationLink[] = [
  { name: "Coffee", href: "/CropInsights/coffee", desc: "Trace every bean from farm to cup." },
  { name: "Cocoa", href: "/CropInsights/cocoa", desc: "Ensure ethical sourcing of cocoa supply chains." },
  { name: "Cotton", href: "/CropInsights/cotton", desc: "Sustainable cotton sourcing and tracking." },
  { name: "Rice", href: "/CropInsights/rice", desc: "Monitor rice cultivation with precision." },
  { name: "Tea", href: "/CropInsights/tea", desc: "Full visibility across tea supply networks." },
  { name: "Spices", href: "/CropInsights/spices", desc: "Authentic spice sourcing with traceability." },
  { name: "Palm Oil", href: "/CropInsights/palm-oil", desc: "Deforestation-free palm oil supply chains." },
  { name: "Rubber", href: "/CropInsights/rubber", desc: "Sustainable rubber procurement solutions." },
  { name: "Sugarcane", href: "/CropInsights/sugarcane", desc: "Monitor sugarcane from field to refinery." },
  { name: "Fruits & Vegetables", href: "/CropInsights/fruits-vegetables", desc: "Fresh produce traceability and quality." },
  { name: "Grains", href: "/CropInsights/grains", desc: "Grain sourcing with sustainability insights." },
  { name: "Seed Production", href: "/CropInsights/seed-production", desc: "Seed-to-harvest production management." },
];

const COMPLIANCE_LINKS: NavigationLink[] = [
  { name: "EUDR", href: "/compliance/eudr", desc: "EU Deforestation Regulation readiness." },
  { name: "CSRD", href: "/compliance/csrd", desc: "Corporate Sustainability Reporting Directive." },
  { name: "ESRS", href: "/compliance/esrs", desc: "European Sustainability Reporting Standards." },
  { name: "CBAM", href: "/compliance/cbam", desc: "Carbon Border Adjustment Mechanism compliance." },
  { name: "Forest Risk", href: "/compliance/forest-risk", desc: "Forest risk commodity due diligence." },
  { name: "Scope 3 Emissions", href: "/compliance/scope-3-emissions", desc: "Value chain emissions tracking and reporting." },
  { name: "Sustainability Reporting", href: "/compliance/sustainability-reporting", desc: "Comprehensive sustainability disclosure." },
];

const RESOURCES_LINKS: NavigationLink[] = [
  { name: "Blog", href: "/resources/blog", icon: BookOpen, desc: "Insights on AI and agriculture trends, innovation, and technology." },
  { name: "Case Studies", href: "/case-studies", icon: Briefcase, desc: "Success stories of AI transforming global agriculture with SourceTrace." },
  { name: "White Papers", href: "/resources/whitepapers", icon: FileText, desc: "Research on AI-driven agriculture & sustainable food system solutions." },
  { name: "Newsroom", href: "/resources/newsroom", icon: Activity, desc: "Latest news and updates on SourceTrace's agri-tech innovations." },
];

const COMPANY_LINKS: NavigationLink[] = [
  { name: "About SourceTrace", href: "/about", icon: Target, desc: "AI-driven platform transforming agriculture with data, insights, and sustainability." },
  { name: "Careers", href: "/careers", icon: GraduationCap, desc: "Explore opportunities to drive digital farming and sustainable agriculture solutions." },
  { name: "Connect With Us", href: "/contact", icon: Users, desc: "Connect with SourceTrace to explore global partnerships, support, and inquiries." },
];

/* ─── Mobile category icons and accent colors ─── */
const MOBILE_CATEGORY_META: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; gradient: string }> = {
  platform:    { icon: Server,    color: "#1F7A53", gradient: "from-emerald-500/10 to-teal-500/10" },
  intelligence:{ icon: Zap,       color: "#6366F1", gradient: "from-indigo-500/10 to-violet-500/10" },
  solutions:   { icon: Target,    color: "#0891B2", gradient: "from-cyan-500/10 to-sky-500/10" },
  industries:  { icon: Sprout,    color: "#059669", gradient: "from-green-500/10 to-emerald-500/10" },
  compliance:  { icon: Lock,      color: "#DC2626", gradient: "from-red-500/10 to-rose-500/10" },
  resources:   { icon: BookOpen,  color: "#D97706", gradient: "from-amber-500/10 to-yellow-500/10" },
  company:     { icon: Globe,     color: "#7C3AED", gradient: "from-violet-500/10 to-purple-500/10" },
};

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<"root" | "submenu">("root");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen((prev) => {
      const next = !prev;
      if (next) {
        setActiveMenu(null);
        setCurrentLevel("root");
        setActiveCategory(null);
        setDirection(1);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleMouseEnter = (menu: string) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutIdRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const goToSubmenu = useCallback((categoryId: string) => {
    setDirection(1);
    setActiveCategory(categoryId);
    setCurrentLevel("submenu");
  }, []);

  const goToRoot = useCallback(() => {
    setDirection(-1);
    setCurrentLevel("root");
    setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const menuItems = [
    { id: "platform", label: "Platform", items: PLATFORM_LINKS, promo: { title: "Traceability Cloud", desc: "See the unified platform in action.", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/platform" } },
    { id: "intelligence", label: "Intelligence", items: INTELLIGENCE_LINKS, promo: { title: "AI Deforestation Models", desc: "How we predict forest loss.", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/intelligence/ai-engine" } },
    { id: "solutions", label: "Solutions", items: SOLUTIONS_LINKS, promo: { title: "EUDR Deadline 2025", desc: "Is your supply chain ready?", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/solutions/eudr-compliance" } },
    { id: "industries", label: "Crop Insights", items: INDUSTRIES_LINKS, promo: { title: "Coffee & Cocoa", desc: "Mapping the world's most complex supply chains.", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/CropInsights/coffee" } },
    { id: "compliance", label: "Compliance", items: COMPLIANCE_LINKS, promo: { title: "State of Compliance Report", desc: "Download the 2026 guidelines.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/resources/reports" } },
    { id: "resources", label: "Resources", items: RESOURCES_LINKS, promo: { title: "Latest Insights", desc: "Read our newest case studies.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/resources/blog" } },
    { id: "company", label: "Company", items: COMPANY_LINKS, promo: { title: "Join Our Team", desc: "Help us transform agriculture.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/careers" } },
  ];

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm" onMouseLeave={handleMouseLeave}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-2" onClick={() => { setActiveMenu(null); setIsMobileOpen(false); }}>
              <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-10 object-contain" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1 h-full">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${activeMenu === item.id ? "bg-gray-100 text-[#0B3D2E]" : "text-gray-600 hover:text-[#0B3D2E]"}`}>
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === item.id ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact-sales" className="text-sm font-medium text-gray-600 hover:text-[#0B3D2E] transition-colors">Contact Sales</Link>
            <Link href="/request-demo">
              <Button size="sm" className="h-10 px-6 rounded-full font-semibold bg-[#0B3D2E] text-white hover:bg-[#1F7A53]">Request Demo</Button>
            </Link>
          </div>

          {/* Mobile Menu Button — Animated hamburger ↔ X */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer active:scale-95"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="overflow-visible">
                <line
                  x1="2" y1="5" x2="18" y2="5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{
                    transform: isMobileOpen ? "translateY(5px) rotate(45deg)" : "translateY(0) rotate(0)",
                    transformOrigin: "center",
                  }}
                />
                <line
                  x1="2" y1="10" x2="18" y2="10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="transition-opacity duration-200"
                  style={{ opacity: isMobileOpen ? 0 : 1 }}
                />
                <line
                  x1="2" y1="15" x2="18" y2="15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{
                    transform: isMobileOpen ? "translateY(-5px) rotate(-45deg)" : "translateY(0) rotate(0)",
                    transformOrigin: "center",
                  }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Desktop Dropdown ─── */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl overflow-hidden hidden lg:block"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 flex gap-12">
              {menuItems.map((menu) => (
                activeMenu === menu.id && (
                  <React.Fragment key={menu.id}>
                    {/* Left: Links Grid */}
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
                         {menu.id === 'industries' ? 'Crop Insights' : `${menu.label} Overview`}
                       </h3>
                       <div className={`grid gap-x-8 gap-y-6 ${(menu.items[0] as NavigationLink)?.icon ? 'grid-cols-2' : 'grid-cols-3'}`}>
                         {menu.items.map((link: NavigationLink, index: number) => (
                           <Link
                             key={index}
                             href={link.href}
                             onClick={() => setActiveMenu(null)}
                             className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                           >
                             {link.icon && (
                               <div className="mt-1 w-10 h-10 rounded-lg bg-[#53D769]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#53D769]/20 transition-colors">
                                 <link.icon className="w-5 h-5 text-[#1F7A53]" />
                               </div>
                             )}
                             <div>
                               <div className="font-semibold text-gray-900 group-hover:text-[#1F7A53] transition-colors">
                                 {link.name}
                                </div>
                               <p className="text-sm text-gray-500 mt-1 line-clamp-2">{link.desc || `Explore ${link.name.toLowerCase()} solutions`}</p>
                             </div>
                           </Link>
                         ))}
                       </div>
                    </div>

                    {/* Right: Promotional Card */}
                    {menu.promo && (
                       <div className="w-[350px] shrink-0 border-l border-gray-100 pl-12 hidden xl:block">
                          <Link href={menu.promo.link} onClick={() => setActiveMenu(null)} className="group block relative rounded-2xl overflow-hidden h-full min-h-[300px]">
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                             <img src={menu.promo.image} alt={menu.promo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                             <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <h4 className="text-white font-bold text-2xl mb-2">{menu.promo.title}</h4>
                                <p className="text-gray-200 text-sm mb-4">{menu.promo.desc}</p>
                                <div className="text-[#53D769] font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-sm uppercase tracking-wider">
                                   Learn More <ArrowRight className="w-4 h-4" />
                                </div>
                             </div>
                          </Link>
                       </div>
                    )}
                  </React.Fragment>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    {/* ═══════════════════════════════════════════════════════════
        MOBILE PREMIUM DROPDOWN NAVIGATION
        Rendered OUTSIDE the <nav> to escape its stacking context.
        z-[9999] guarantees it sits above ALL page content.
       ═══════════════════════════════════════════════════════════ */}
    <AnimatePresence>
      {isMobileOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden"
            style={{ zIndex: 9998 }}
          />

          {/* Dropdown Panel */}
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 right-0 lg:hidden overflow-hidden"
            style={{
              zIndex: 9999,
              top: "0px",
              maxHeight: "100dvh",
            }}
          >
            {/* ─── Fixed Header ─── */}
            <div className="h-20 flex items-center justify-between px-6 flex-shrink-0 bg-white border-b border-gray-100 shadow-sm">
              <Link href="/" className="flex items-center gap-2" onClick={closeMobile}>
                <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-10 object-contain" />
              </Link>
              <button
                onClick={closeMobile}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#0B3D2E] bg-gray-50 hover:bg-gray-100 transition-all focus:outline-none cursor-pointer active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ─── Scrollable Dropdown Body ─── */}
            <div
              className="overflow-y-auto overscroll-contain bg-white"
              style={{ maxHeight: "calc(100dvh - 80px)" }}
            >
              {/* Accordion Categories */}
              <div className="px-4 pt-3 pb-2">
                {menuItems.map((item, menuIdx) => {
                  const meta = MOBILE_CATEGORY_META[item.id];
                  const CategoryIcon = meta?.icon || ChevronRight;
                  const isExpanded = activeCategory === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: menuIdx * 0.04, ease: "easeOut" }}
                    >
                      {/* Category Header Button */}
                      <button
                        onClick={() => {
                          if (isExpanded) {
                            setActiveCategory(null);
                          } else {
                            setActiveCategory(item.id);
                          }
                        }}
                        className={`w-full flex items-center gap-3.5 py-3.5 px-3 rounded-xl text-left transition-all cursor-pointer group active:scale-[0.99] ${
                          isExpanded
                            ? "bg-gray-50"
                            : "hover:bg-gray-50/60"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta?.gradient || "from-gray-100 to-gray-50"} flex items-center justify-center flex-shrink-0 transition-transform ${isExpanded ? "scale-105" : "group-hover:scale-105"}`}
                        >
                          <CategoryIcon className="w-[18px] h-[18px]" style={{ color: meta?.color || "#374151" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-[15px] font-semibold transition-colors block ${isExpanded ? "text-[#0B3D2E]" : "text-gray-800 group-hover:text-[#0B3D2E]"}`}>
                            {item.label}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                            {item.items.length} {item.items.length === 1 ? "page" : "pages"}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-300 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180 text-[#1F7A53]" : ""}`}
                        />
                      </button>

                      {/* Expanded Sub-links */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-1 pb-3 pt-1">
                              <div className="border-l-2 border-gray-100 pl-4 flex flex-col gap-0.5">
                                {item.items.map((link: NavigationLink, linkIdx: number) => (
                                  <motion.div
                                    key={linkIdx}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: linkIdx * 0.03, ease: "easeOut" }}
                                  >
                                    <Link
                                      href={link.href}
                                      onClick={closeMobile}
                                      className="group flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white hover:shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all active:scale-[0.98]"
                                    >
                                      {link.icon ? (
                                        <div className="w-7 h-7 rounded-md bg-[#53D769]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#53D769]/20 transition-colors">
                                          <link.icon className="w-3.5 h-3.5 text-[#1F7A53]" />
                                        </div>
                                      ) : (
                                        <div
                                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] font-black"
                                          style={{
                                            backgroundColor: `${meta?.color || "#1F7A53"}12`,
                                            color: meta?.color || "#1F7A53"
                                          }}
                                        >
                                          {link.name.substring(0, 2).toUpperCase()}
                                        </div>
                                      )}
                                      <span className="text-[13px] font-medium text-gray-700 group-hover:text-[#0B3D2E] transition-colors truncate">
                                        {link.name}
                                      </span>
                                      <ArrowRight className="w-3 h-3 text-gray-200 group-hover:text-[#1F7A53] ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Featured promo card */}
                              {item.promo && (
                                <motion.div
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: 0.15 }}
                                  className="mt-3"
                                >
                                  <Link
                                    href={item.promo.link}
                                    onClick={closeMobile}
                                    className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#0B3D2E] to-[#1F7A53] transition-all active:scale-[0.98]"
                                  >
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/20">
                                      <img
                                        src={item.promo.image}
                                        alt={item.promo.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-[8px] font-bold text-[#53D769] uppercase tracking-[0.15em]">Featured</span>
                                      <h4 className="text-white font-bold text-[12px] leading-tight">{item.promo.title}</h4>
                                      <p className="text-white/50 text-[10px] mt-0.5 truncate">{item.promo.desc}</p>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                  </Link>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Divider */}
                      {menuIdx < menuItems.length - 1 && !isExpanded && (
                        <div className="mx-3 border-b border-gray-50" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA area */}
              <div className="px-5 py-5 border-t border-gray-100 bg-gray-50/50">
                <div className="flex gap-3">
                  <Link
                    href="/contact-sales"
                    onClick={closeMobile}
                    className="flex-1 py-3 text-center text-[13px] text-gray-700 font-semibold border border-gray-200 rounded-xl transition-colors bg-white hover:bg-gray-50 active:scale-[0.98]"
                  >
                    Contact Sales
                  </Link>
                  <Link
                    href="/request-demo"
                    onClick={closeMobile}
                    className="flex-1 py-3 text-center text-[13px] font-bold bg-[#0B3D2E] text-white hover:bg-[#1F7A53] rounded-xl transition-colors shadow-lg shadow-[#0B3D2E]/20 active:scale-[0.98]"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
