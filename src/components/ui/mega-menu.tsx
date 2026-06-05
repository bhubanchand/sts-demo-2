"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Leaf, Target, Map, Shield, Activity, Users, Settings, Database, Server, Smartphone, BookOpen, Video, FileText, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "./button";

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

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = (menu: string) => {
    clearTimeout(timeoutId);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const menuItems = [
    { id: "platform", label: "Platform", items: PLATFORM_LINKS, promo: { title: "Traceability Cloud", desc: "See the unified platform in action.", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/platform" } },
    { id: "intelligence", label: "Intelligence", items: INTELLIGENCE_LINKS, promo: { title: "AI Deforestation Models", desc: "How we predict forest loss.", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/intelligence/ai-engine" } },
    { id: "solutions", label: "Solutions", items: SOLUTIONS_LINKS, promo: { title: "EUDR Deadline 2025", desc: "Is your supply chain ready?", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/solutions/eudr-compliance" } },
    { id: "industries", label: "Industries", items: INDUSTRIES_LINKS, promo: { title: "Coffee & Cocoa", desc: "Mapping the world's most complex supply chains.", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/industries/coffee" } },
    { id: "compliance", label: "Compliance", items: COMPLIANCE_LINKS, promo: { title: "State of Compliance Report", desc: "Download the 2026 guidelines.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", link: "/resources/reports" } },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm" onMouseLeave={handleMouseLeave}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-2" onClick={() => setActiveMenu(null)}>
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
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl overflow-hidden"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 flex gap-12">
              {menuItems.map((menu) => (
                activeMenu === menu.id && (
                  <React.Fragment key={menu.id}>
                    {/* Left: Links Grid */}
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">{menu.label} Overview</h3>
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
                               <p className="text-sm text-gray-500 mt-1 line-clamp-1">Explore {link.name.toLowerCase()} solutions</p>
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
  );
}
