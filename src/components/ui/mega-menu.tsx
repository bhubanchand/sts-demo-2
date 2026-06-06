"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Leaf, Target, Map, Shield, Activity, Users, Settings, Database, Server, Smartphone, BookOpen, Video, FileText, Briefcase, GraduationCap, ArrowRight, Menu, X, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "-100%" : "100%",
    opacity: 0
  })
};

const PLATFORM_LINKS = [
  { name: "Traceability", href: "/platform/traceability", icon: Map },
  { name: "Farmer Engagement", href: "/platform/farmer-engagement", icon: Users },
  { name: "Sustainability Intelligence", href: "/platform/sustainability-intelligence", icon: Leaf },
  { name: "Supply Chain Visibility", href: "/platform/supply-chain-visibility", icon: Target },
  { name: "ESG Compliance", href: "/platform/esg-compliance", icon: Shield },
  { name: "Field Data Collection", href: "/platform/field-data-collection", icon: Database },
  { name: "Risk Monitoring", href: "/platform/risk-monitoring", icon: Activity },
  { name: "Reporting & Analytics", href: "/platform/reporting-analytics", icon: FileText },
  { name: "Integrations", href: "/platform/integrations", icon: Server },
  { name: "Mobile App", href: "/platform/mobile-app", icon: Smartphone },
];

const INTELLIGENCE_LINKS = [
  { name: "AI Engine", href: "/intelligence/ai-engine" },
  { name: "Predictive Insights", href: "/intelligence/predictive-insights" },
  { name: "Geospatial Intelligence", href: "/intelligence/geospatial-intelligence" },
  { name: "Climate Risk", href: "/intelligence/climate-risk" },
  { name: "Deforestation Monitoring", href: "/intelligence/deforestation-monitoring" },
  { name: "Carbon Monitoring", href: "/intelligence/carbon-monitoring" },
  { name: "Regenerative Agriculture", href: "/intelligence/regenerative-agriculture" },
  { name: "Traceability Graph", href: "/intelligence/traceability-graph" },
];

const SOLUTIONS_LINKS = [
  { name: "Sustainable Sourcing", href: "/solutions/sustainable-sourcing" },
  { name: "EUDR Compliance", href: "/solutions/eudr-compliance" },
  { name: "ESG Reporting", href: "/solutions/esg-reporting" },
  { name: "Supply Chain Traceability", href: "/solutions/supply-chain-traceability" },
  { name: "Farmer Livelihoods", href: "/solutions/farmer-livelihoods" },
  { name: "Smallholder Management", href: "/solutions/smallholder-management" },
  { name: "Responsible Sourcing", href: "/solutions/responsible-sourcing" },
  { name: "Impact Measurement", href: "/solutions/impact-measurement" },
  { name: "Certification Management", href: "/solutions/certification-management" },
];

const INDUSTRIES_LINKS = [
  { name: "Coffee", href: "/industries/coffee" },
  { name: "Cocoa", href: "/industries/cocoa" },
  { name: "Cotton", href: "/industries/cotton" },
  { name: "Rice", href: "/industries/rice" },
  { name: "Tea", href: "/industries/tea" },
  { name: "Spices", href: "/industries/spices" },
  { name: "Palm Oil", href: "/industries/palm-oil" },
  { name: "Rubber", href: "/industries/rubber" },
  { name: "Sugarcane", href: "/industries/sugarcane" },
  { name: "Fruits & Vegetables", href: "/industries/fruits-vegetables" },
  { name: "Grains", href: "/industries/grains" },
  { name: "Seed Production", href: "/industries/seed-production" },
];

const COMPLIANCE_LINKS = [
  { name: "EUDR", href: "/compliance/eudr" },
  { name: "CSRD", href: "/compliance/csrd" },
  { name: "ESRS", href: "/compliance/esrs" },
  { name: "CBAM", href: "/compliance/cbam" },
  { name: "Forest Risk", href: "/compliance/forest-risk" },
  { name: "Scope 3 Emissions", href: "/compliance/scope-3-emissions" },
  { name: "Sustainability Reporting", href: "/compliance/sustainability-reporting" },
];

const RESOURCES_LINKS = [
  { name: "Blog", href: "/resources/blog", icon: BookOpen, desc: "Insights on AI and agriculture trends, innovation, and technology." },
  { name: "Case Studies", href: "/case-studies", icon: Briefcase, desc: "Success stories of AI transforming global agriculture with SourceTrace." },
  { name: "White Papers", href: "/resources/whitepapers", icon: FileText, desc: "Research on AI-driven agriculture & sustainable food system solutions." },
  { name: "Newsroom", href: "/resources/newsroom", icon: Activity, desc: "Latest news and updates on SourceTrace's agri-tech innovations." },
];

const COMPANY_LINKS = [
  { name: "About SourceTrace", href: "/about", icon: Target, desc: "AI-driven platform transforming agriculture with data, insights, and sustainability." },
  { name: "Careers", href: "/careers", icon: GraduationCap, desc: "Explore opportunities to drive digital farming and sustainable agriculture solutions." },
  { name: "Connect With Us", href: "/contact", icon: Users, desc: "Connect with SourceTrace to explore global partnerships, support, and inquiries." },
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<"root" | "submenu">("root");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction, setDirection] = useState<number>(1);
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      setActiveMenu(null);
      setCurrentLevel("root");
      setActiveCategory(null);
      setDirection(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleMouseEnter = (menu: string) => {
    clearTimeout(timeoutId);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const goToSubmenu = (categoryId: string) => {
    setDirection(1);
    setActiveCategory(categoryId);
    setCurrentLevel("submenu");
  };

  const goToRoot = () => {
    setDirection(-1);
    setCurrentLevel("root");
    setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  };

  const menuItems = [
    { id: "platform", label: "Platform", items: PLATFORM_LINKS, promo: { title: "Traceability Cloud", desc: "See the unified platform in action.", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/platform" } },
    { id: "intelligence", label: "Intelligence", items: INTELLIGENCE_LINKS, promo: { title: "AI Deforestation Models", desc: "How we predict forest loss.", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/intelligence/ai-engine" } },
    { id: "solutions", label: "Solutions", items: SOLUTIONS_LINKS, promo: { title: "EUDR Deadline 2025", desc: "Is your supply chain ready?", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/solutions/eudr-compliance" } },
    { id: "industries", label: "Crop Insights", items: INDUSTRIES_LINKS, promo: { title: "Coffee & Cocoa", desc: "Mapping the world's most complex supply chains.", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/industries/coffee" } },
    { id: "compliance", label: "Compliance", items: COMPLIANCE_LINKS, promo: { title: "State of Compliance Report", desc: "Download the 2026 guidelines.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/resources/reports" } },
    { id: "resources", label: "Resources", items: RESOURCES_LINKS, promo: { title: "Latest Insights", desc: "Read our newest case studies.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/resources/blog" } },
    { id: "company", label: "Company", items: COMPANY_LINKS, promo: { title: "Join Our Team", desc: "Help us transform agriculture.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/careers" } },
  ];

  return (
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

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-full text-gray-600 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

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
                       <div className={`grid gap-x-8 gap-y-6 ${(menu.items[0] as any)?.icon ? 'grid-cols-2' : 'grid-cols-3'}`}>
                         {menu.items.map((link: any, index: number) => (
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-white z-50 flex flex-col lg:hidden"
          >
            {/* Header bar */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
                <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-10 object-contain" />
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-full text-gray-600 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Immersive sliding panel viewport */}
            <div className="flex-1 relative overflow-hidden bg-gray-50/30">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {currentLevel === "root" ? (
                  <motion.div
                    key="root-menu"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute inset-0 px-6 py-8 flex flex-col justify-between overflow-y-auto"
                  >
                    <div className="flex flex-col gap-2">
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => goToSubmenu(item.id)}
                          className="w-full flex items-center justify-between py-4 px-3 text-lg font-bold text-gray-800 border-b border-gray-100 hover:text-[#1F7A53] hover:bg-white hover:shadow-sm rounded-xl transition-all cursor-pointer group text-left"
                        >
                          <span className="tracking-wide">{item.label}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#1F7A53] group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
                      <Link
                        href="/contact-sales"
                        onClick={() => setIsMobileOpen(false)}
                        className="w-full py-3.5 text-center text-gray-700 hover:text-[#0B3D2E] font-semibold border border-gray-200 rounded-full transition-colors bg-white hover:bg-gray-50 shadow-sm"
                      >
                        Contact Sales
                      </Link>
                      <Link href="/request-demo" onClick={() => setIsMobileOpen(false)}>
                        <button className="w-full py-4 text-center font-bold bg-[#0B3D2E] text-white hover:bg-[#1F7A53] rounded-full transition-colors shadow-lg cursor-pointer">
                          Request Demo
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  (() => {
                    const activeCategoryData = menuItems.find(item => item.id === activeCategory);
                    if (!activeCategoryData) return null;

                    return (
                      <motion.div
                        key="submenu-panel"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute inset-0 px-6 py-8 flex flex-col justify-between overflow-y-auto"
                      >
                        <div className="flex flex-col flex-1">
                          {/* Back Button */}
                          <button
                            onClick={goToRoot}
                            className="w-fit flex items-center gap-2 text-xs font-bold text-[#1F7A53] uppercase tracking-wider mb-6 cursor-pointer hover:opacity-80 transition-opacity bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back to Menu</span>
                          </button>

                          <h3 className="text-2xl font-black text-[#0B3D2E] mb-6 tracking-tight">
                            {activeCategoryData.label}
                          </h3>

                          {/* Scrollable sub-links grid */}
                          <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1 pb-4 scrollbar-thin">
                            {activeCategoryData.items.map((link: any, index: number) => (
                              <Link
                                key={index}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="group flex items-start gap-4 p-3 rounded-2xl bg-white border border-gray-50 shadow-sm hover:border-[#53D769]/30 hover:bg-gray-50/20 transition-all"
                              >
                                {link.icon ? (
                                  <div className="w-10 h-10 rounded-xl bg-[#53D769]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#53D769]/20 transition-colors">
                                    <link.icon className="w-5 h-5 text-[#1F7A53]" />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded-xl bg-[#1F7A53]/5 flex items-center justify-center flex-shrink-0 text-[#1F7A53] font-black text-sm">
                                    {link.name.substring(0, 2)}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="font-bold text-gray-900 group-hover:text-[#1F7A53] transition-colors text-sm">
                                    {link.name}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                    {link.desc || `Explore ${link.name.toLowerCase()} solutions`}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* promo card */}
                        {activeCategoryData.promo && (
                          <div className="pt-4 border-t border-gray-100 mt-6 shrink-0">
                            <Link
                              href={activeCategoryData.promo.link}
                              onClick={() => setIsMobileOpen(false)}
                              className="group block relative rounded-2xl overflow-hidden h-28 border border-gray-100 shadow-md"
                            >
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10"></div>
                              <img src={activeCategoryData.promo.image} alt={activeCategoryData.promo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end">
                                <span className="text-[8px] font-bold text-[#53D769] uppercase tracking-widest mb-0.5">Featured</span>
                                <h4 className="text-white font-bold text-sm mb-0.5">{activeCategoryData.promo.title}</h4>
                                <p className="text-gray-200 text-[10px] line-clamp-1">{activeCategoryData.promo.desc}</p>
                              </div>
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    );
                  })()
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
