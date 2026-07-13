"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Leaf, Target, Map, Shield, Activity, Users, Database, Server, Smartphone, BookOpen, FileText, Briefcase, GraduationCap, ArrowRight, Menu, X, ArrowLeft, ChevronRight, Zap, BarChart3, Globe, Lock, Sprout, Search } from "lucide-react";
import { Button } from "./button";
import { GlobalSearch } from "./global-search";

/* === Slide variants with spring-like ease === */
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
  subItems?: { name: string; href: string }[];
}

/* === Navigation Data v2.0 === */
const PLATFORM_LINKS: NavigationLink[] = [
  {
    name: "Intelligence",
    href: "/platform/intelligence",
    icon: Zap,
    desc: "AI diagnostics & satellite monitoring",
    subItems: [
      { name: "AI Engine", href: "/intelligence/ai-engine" },
      { name: "Satellite Monitoring", href: "/intelligence/satellite-monitoring" },
      { name: "Geospatial Intelligence", href: "/intelligence/geospatial-intelligence" },
      { name: "Analytics Dashboard", href: "/intelligence/analytics-dashboard" }
    ]
  },
  {
    name: "Operations",
    href: "/platform/operations",
    icon: Activity,
    desc: "Automate field workflows & reports",
    subItems: [
      { name: "Workflow Automation", href: "/platform/operations/workflow-automation" },
      { name: "Reporting", href: "/platform/operations/reporting" },
      { name: "Mobile Apps", href: "/platform/operations/mobile-apps" },
      { name: "Document Management", href: "/platform/operations/document-management" }
    ]
  },
  {
    name: "Connectivity",
    href: "/platform/connectivity",
    icon: Server,
    desc: "Integrate ERPs and GIS layers",
    subItems: [
      { name: "API Registry", href: "/platform/connectivity/apis" },
      { name: "Developer SDK", href: "/platform/connectivity/sdk" },
      { name: "ERP Connectors", href: "/platform/connectivity/erp-connectors" },
      { name: "GIS Integrations", href: "/platform/connectivity/gis-integrations" }
    ]
  },
  {
    name: "Security",
    href: "/platform/security",
    icon: Shield,
    desc: "SOC2 compliance & user privacy",
    subItems: [
      { name: "Enterprise Security", href: "/platform/security/security" },
      { name: "Data Privacy", href: "/platform/security/privacy" },
      { name: "Cloud Deployment", href: "/platform/security/deployment" },
      { name: "Compliance Standards", href: "/platform/security/compliance" }
    ]
  },
  {
    name: "Architecture",
    href: "/platform/platform-architecture",
    icon: Map,
    desc: "High-availability cloud stack",
    subItems: [
      { name: "Platform Overview", href: "/platform" },
      { name: "Infrastructure Map", href: "/platform/platform-architecture" },
      { name: "Cloud Scalability", href: "/platform/platform-architecture" }
    ]
  }
];

const SOLUTIONS_LINKS: NavigationLink[] = [
  {
    name: "Grow",
    href: "/solutions/agriculture",
    icon: Leaf,
    desc: "Optimize farm yield & advising",
    subItems: [
      { name: "Farm Management", href: "/solutions/agriculture/farm-management" },
      { name: "Digital Advisory", href: "/solutions/agriculture/digital-advisory" },
      { name: "Crop Monitoring", href: "/solutions/agriculture/crop-monitoring" }
    ]
  },
  {
    name: "Track",
    href: "/solutions/traceability",
    icon: Map,
    desc: "Trace shipments & products",
    subItems: [
      { name: "Supply Chain Traceability", href: "/solutions/traceability/supply-chain-traceability" },
      { name: "Digital Product Passport", href: "/solutions/traceability/digital-product-passport" },
      { name: "QR Consumer Transparency", href: "/solutions/traceability/qr-consumer-transparency" }
    ]
  },
  {
    name: "Protect",
    href: "/solutions/sustainability",
    icon: Sprout,
    desc: "Carbon audits & ESG compliance",
    subItems: [
      { name: "EUDR Deforestation", href: "/compliance/eudr" },
      { name: "Carbon Monitoring", href: "/solutions/sustainability/carbon-monitoring" },
      { name: "ESG Reporting", href: "/solutions/sustainability/esg-reporting" },
      { name: "Regenerative Agriculture", href: "/solutions/sustainability/regenerative-agriculture" }
    ]
  },
  {
    name: "Scale",
    href: "/solutions/supply-chain",
    icon: Server,
    desc: "Marketplace trading & payments",
    subItems: [
      { name: "Sourcing Marketplace", href: "/solutions/supply-chain/marketplace" },
      { name: "Farmer Payments", href: "/solutions/finance/farmer-payments" },
      { name: "Direct Procurement", href: "/solutions/supply-chain/procurement" }
    ]
  }
];

const INDUSTRIES_LINKS: NavigationLink[] = [
  { name: "Coffee", href: "/CropInsights/coffee", desc: "Trace every bean from farm to cup." },
  { name: "Rice", href: "/CropInsights/rice", desc: "Monitor rice cultivation with precision." },
  { name: "Palm Oil", href: "/CropInsights/palm-oil", desc: "Deforestation-free palm oil supply chains." },
  { name: "Cotton", href: "/CropInsights/cotton", desc: "Sustainable cotton sourcing and tracking." },
  { name: "Tea", href: "/CropInsights/tea", desc: "Full visibility across tea supply networks." },
  { name: "Cocoa", href: "/CropInsights/cocoa", desc: "Ensure ethical cocoa sourcing." },
];

const CUSTOMERS_LINKS: NavigationLink[] = [
  { name: "Agribusiness", href: "/customers/agribusiness", desc: "Digital first-mile outgrower networks." },
  { name: "Food Brands", href: "/customers/food-brands", desc: "End-to-end supply chain transparency." },
  { name: "Governments", href: "/customers/governments", desc: "Regional farmer registry mapping." },
  { name: "NGOs", href: "/customers/ngos", desc: "Socio-environmental impact measurement." },
  { name: "Financial Institutions", href: "/customers/financial-institutions", desc: "Micro-finance credit scoring tools." },
  { name: "Certification Bodies", href: "/customers/certification-bodies", desc: "Streamline audit-ready compliance data." },
];

const PARTNERS_LINKS: NavigationLink[] = [
  { name: "Technology Partners", href: "/partners/technology-partners", desc: "Integrate specialized GIS and IoT tools." },
  { name: "Implementation Partners", href: "/partners/channel-partners", desc: "Deliver end-to-end trace deployment." },
  { name: "Consulting Partners", href: "/partners/consulting-partners", desc: "Expert advisory for ESG compliance." },
  { name: "Marketplace", href: "/partners/marketplace", desc: "Discover third-party connector tools." },
  { name: "Partner Portal", href: "/partners/partner-portal", desc: "Login to register and manage co-leads." },
  { name: "Become a Partner", href: "/partners/become-a-partner", desc: "Join our global alliance ecosystem." },
];

const RESOURCES_LINKS: NavigationLink[] = [
  {
    name: "Knowledge",
    href: "/resources/blog",
    icon: BookOpen,
    desc: "Research whitepapers & briefs",
    subItems: [
      { name: "Blog Insights", href: "/resources/blog" },
      { name: "Whitepapers", href: "/resources/whitepapers" },
      { name: "Market Reports", href: "/resources/reports" },
      { name: "Policy Guides", href: "/resources/guides" }
    ]
  },
  {
    name: "Learn",
    href: "/docs",
    icon: GraduationCap,
    desc: "Documentation & tutorials",
    subItems: [
      { name: "API Documentation", href: "/resources/api-docs" },
      { name: "Webinars", href: "/resources/webinars" },
      { name: "Video Tutorials", href: "/resources/videos" },
      { name: "Frequently Asked FAQs", href: "/resources/faqs" }
    ]
  }
];

const COMPANY_LINKS: NavigationLink[] = [
  { name: "About SourceTrace", href: "/about", desc: "Learn about our vision and B Corp metrics." },
  { name: "Leadership", href: "/company/meet-the-team", desc: "Meet our global executive leaders." },
  { name: "Global Presence", href: "/company/global-offices", desc: "Our offices across sourcing regions." },
  { name: "Careers", href: "/careers", desc: "Join us in digitizing the first-mile." },
  { name: "News & Releases", href: "/resources/newsroom", desc: "Latest corporate announcements." },
  { name: "Contact Us", href: "/contact", desc: "Reach out for inquiries or support." },
];

/* === Mobile category icons and accent colors === */
const MOBILE_CATEGORY_META: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; gradient: string }> = {
  platform:    { icon: Server,    color: "#1F7A53", gradient: "from-emerald-500/10 to-teal-500/10" },
  solutions:   { icon: Target,    color: "#0891B2", gradient: "from-cyan-500/10 to-sky-500/10" },
  industries:  { icon: Sprout,    color: "#059669", gradient: "from-green-500/10 to-emerald-500/10" },
  customers:   { icon: Users,     color: "#F59E0B", gradient: "from-amber-500/10 to-yellow-500/10" },
  partners:    { icon: Globe,     color: "#EC4899", gradient: "from-pink-500/10 to-rose-500/10" },
  resources:   { icon: BookOpen,  color: "#D97706", gradient: "from-amber-500/10 to-yellow-500/10" },
  company:     { icon: Globe,     color: "#7C3AED", gradient: "from-violet-500/10 to-purple-500/10" },
};

/* === Structured Heroes and Promos for Mega Menu v2.0 === */
const MENU_HEROES: Record<string, { label: string; title: string; desc: string }> = {
  platform: {
    label: "Platform",
    title: "Unified Agricultural Intelligence Platform",
    desc: "Connect farms, supply chains, satellite intelligence, and AI in one enterprise platform."
  },
  solutions: {
    label: "Solutions",
    title: "Purpose-Built Agribusiness Solutions",
    desc: "Achieve compliance, verify carbon neutrality, and build direct outgrower sourcing networks."
  },
  customers: {
    label: "Customers",
    title: "Trusted Across the Sourcing Ecosystem",
    desc: "See how cooperatives, agribusinesses, global food brands, and certifiers use SourceTrace."
  },
  partners: {
    label: "Partners",
    title: "Collaborating for Sustainable Impact",
    desc: "Connect, build, and deploy sustainability solutions through our global partner network."
  },
  resources: {
    label: "Resources",
    title: "Agricultural Intelligence Library",
    desc: "Explore whitepapers, API documents, policy briefs, and developer tools."
  },
  company: {
    label: "Company",
    title: "Transforming the Sourcing First-Mile",
    desc: "Learn about our vision, leadership team, and global footprint across sourcing regions."
  }
};

const MENU_PROMOS: Record<string, { title: string; desc: string; bullets: string[]; linkText: string; link: string; image: string }> = {
  platform: {
    title: "Traceability Cloud",
    desc: "Monitor every product from farm to consumer.",
    bullets: [
      "2M+ Farmers Registered",
      "4M+ Hectares Monitored",
      "AI-Powered Crop Yields",
      "Real-time Satellite Layers"
    ],
    linkText: "Explore Platform",
    link: "/platform",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  solutions: {
    title: "Nestlé Sourcing Success",
    desc: "How Nestlé tracked West African cocoa shipments for compliance.",
    bullets: [
      "120k Cocoa Farms Mapped",
      "100% Deforestation Screened",
      "Automated ESG Disclosures"
    ],
    linkText: "Read Customer Story",
    link: "/case-studies",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  customers: {
    title: "Bayer Agri-Finance",
    desc: "Bayer leverages first-mile credit scoring to deliver micro-loans.",
    bullets: [
      "250k Smallholders Registered",
      "98% Repayment Rates",
      "Direct Digital Payouts"
    ],
    linkText: "View Success Stories",
    link: "/case-studies",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  partners: {
    title: "Alliance Ecosystem",
    desc: "Co-innovating with top consulting and technology firms globally.",
    bullets: [
      "API integration tooling",
      "Exclusive co-marketing benefits",
      "Verified consultant directories"
    ],
    linkText: "Become a Partner",
    link: "/partners/become-a-partner",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  resources: {
    title: "EUDR Readiness Report",
    desc: "Download our newest analysis detailing mapping standards.",
    bullets: [
      "EUDR Compliance Checklists",
      "Smallholder Consent Guidelines",
      "Deforestation Polygon Formats"
    ],
    linkText: "Download Report",
    link: "/resources/whitepapers",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  company: {
    title: "First-Mile Impact",
    desc: "Delivering transparency and commercial value.",
    bullets: [
      "B Corp Impact Audited",
      "37 Sourcing Countries Active",
      "Local Teams in 8 Offices"
    ],
    linkText: "Contact Our Team",
    link: "/contact",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
};

/* === Sub-menu renderers for Mega Menu v2.0 === */
function CommodityHubDropdownContent({ closeMenu }: { closeMenu: () => void }) {
  const [hubQuery, setHubQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hubQuery.trim()) {
      router.push(`/CropInsights?q=${encodeURIComponent(hubQuery.trim())}`);
      closeMenu();
    }
  };

  const categories = [
    { label: "🌾 Cereals & Grains", href: "/CropInsights" },
    { label: "☕ Beverage Crops", href: "/CropInsights" },
    { label: "🌴 Oilseeds", href: "/CropInsights" },
    { label: "🌶 Spices & Herbs", href: "/CropInsights" },
    { label: "🍎 Fruits", href: "/CropInsights" },
    { label: "🥕 Vegetables", href: "/CropInsights" },
    { label: "🌳 Plantation Crops", href: "/CropInsights" },
    { label: "🌲 Forestry", href: "/CropInsights" },
    { label: "🐄 Livestock", href: "/CropInsights" },
    { label: "🐟 Aquaculture", href: "/CropInsights" },
    { label: "🌍 Multi Commodity", href: "/CropInsights" },
  ];

  const popular = [
    { name: "Coffee", href: "/CropInsights/coffee" },
    { name: "Rice", href: "/CropInsights/rice" },
    { name: "Palm Oil", href: "/CropInsights/palm-oil" },
    { name: "Cotton", href: "/CropInsights/cotton" },
    { name: "Tea", href: "/CropInsights/tea" },
    { name: "Cocoa", href: "/CropInsights/cocoa" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 flex gap-12 text-[#0B3D2E]">
      <div className="flex-1">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">Commodity Intelligence Hub</span>
          <h3 className="text-3xl font-black mb-1">Global Commodity Explorer</h3>
          <p className="text-base text-gray-500 max-w-2xl font-medium">
            Explore more than 500 global commodities using AI-powered search and interactive filters.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mb-6">
          <div className="flex items-center bg-gray-50 border border-[#0B3D2E]/10 focus-within:border-emerald-600 rounded-full px-5 py-3 shadow-sm transition-all">
            <Search className="w-5 h-5 text-gray-400 mr-2.5" />
            <input
              type="text"
              placeholder="Search 500+ commodities (e.g. Coffee, Rice, Soy)..."
              value={hubQuery}
              onChange={(e) => setHubQuery(e.target.value)}
              className="w-full bg-transparent text-base focus:outline-none placeholder-gray-400 text-gray-800"
            />
            <button type="submit" className="text-sm bg-[#0B3D2E] text-white hover:bg-[#1F7A53] font-bold px-5 py-2 rounded-full transition-all">
              Explore
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-2 px-1">
            <span className="text-[12px] font-bold text-gray-400 uppercase mr-1">Examples:</span>
            {popular.slice(0, 4).map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="text-[12px] font-bold text-gray-600 hover:text-emerald-700 bg-gray-100 px-3 py-1 rounded-md hover:bg-emerald-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </form>

        <div className="grid grid-cols-2 gap-8 mb-6 border-t border-gray-100 pt-6">
          <div>
            <h4 className="text-sm font-black uppercase text-gray-400 tracking-wider mb-3">Browse by Category</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.href}
                  onClick={closeMenu}
                  className="text-sm font-bold text-gray-600 hover:text-emerald-700 transition-colors py-0.5 flex items-center gap-1.5 hover:translate-x-0.5 transition-transform"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase text-gray-400 tracking-wider mb-3">Popular Commodities</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {popular.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-sm font-bold text-gray-600 hover:text-emerald-700 transition-colors py-0.5 flex items-center gap-1.5 hover:translate-x-0.5 transition-transform"
                >
                  <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-4 flex items-center">
          <Link
            href="/CropInsights"
            onClick={closeMenu}
            className="inline-flex items-center gap-1.5 text-base font-extrabold text-[#1F7A53] hover:text-[#0B3D2E] group"
          >
            Explore All 500+ Commodities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="w-[350px] shrink-0 border-l border-gray-100 pl-12 hidden xl:block">
        <div className="bg-gradient-to-br from-[#0B3D2E] to-[#1F7A53] p-6 rounded-3xl text-white h-full relative overflow-hidden flex flex-col justify-between shadow-lg group">
          <div className="absolute inset-0 bg-[#86EFAC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="currentColor">
              <path d="M20,60 L60,40 L100,80 L80,120 L40,100 Z" />
              <path d="M110,130 L160,110 L180,160 L140,170 Z" />
              <circle cx="80" cy="80" r="15" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2,2" />
              <circle cx="140" cy="140" r="10" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2,2" />
            </svg>
          </div>

          <div className="relative z-10">
            <span className="text-[11px] font-bold text-[#86EFAC] uppercase tracking-[0.2em] block mb-2">Interactive App</span>
            <h4 className="text-2xl font-black mb-2">Commodity Explorer</h4>
            <p className="text-sm text-gray-200 leading-relaxed mb-6 font-medium">
              Explore 500+ commodities with satellite risk layers, regulation checks, and comparison matrices.
            </p>

            <ul className="space-y-2 mb-8">
              {[
                "AI Search",
                "Country Filters",
                "Regulation Filters",
                "Sustainability Filters",
                "Satellite Layers",
                "Commodity Comparison"
              ].map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-center gap-2 text-sm font-semibold text-gray-100">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-[#86EFAC] flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/CropInsights"
            onClick={closeMenu}
            className="relative z-10 w-full py-3 text-center bg-white text-[#0B3D2E] hover:bg-[#86EFAC] hover:text-[#0B3D2E] font-bold text-sm rounded-xl transition-all shadow-md active:scale-98"
          >
            Launch Explorer →
          </Link>
        </div>
      </div>
    </div>
  );
}

interface LinkPreviewData {
  title: string;
  desc: string;
  bullets: string[];
  linkText: string;
  link: string;
}

const LINK_PREVIEWS: Record<string, LinkPreviewData> = {
  // PLATFORM -> Intelligence
  "AI Engine": {
    title: "AI Engine",
    desc: "Predictive crop models and disease detection.",
    bullets: [
      "Real-time agronomic disease diagnoses",
      "Predictive yield forecasting models",
      "Automated growth stage alerts",
      "Soil moisture telemetry analysis"
    ],
    linkText: "Explore AI Engine",
    link: "/intelligence/ai-engine"
  },
  "Satellite Monitoring": {
    title: "Satellite Monitoring",
    desc: "Continuous crop health monitoring from orbit.",
    bullets: [
      "Daily NDVI crop vigor indexing",
      "Deforestation polygon screening",
      "Acreage expansion verification",
      "Post-hazard damage assessments"
    ],
    linkText: "Explore Satellite Intel",
    link: "/intelligence/satellite-monitoring"
  },
  "Geospatial Intelligence": {
    title: "Geospatial Intelligence",
    desc: "Interactive parcel mapping and spatial analytics.",
    bullets: [
      "Grower parcel boundary mapping",
      "Spatial risk overlay matrices",
      "Interactive regional dashboards",
      "Dynamic field heatmapping"
    ],
    linkText: "Explore GIS Intel",
    link: "/intelligence/geospatial-intelligence"
  },
  "Analytics Dashboard": {
    title: "Analytics Dashboard",
    desc: "Operational telemetry and executive KPIs.",
    bullets: [
      "Custom sourcing analytics panels",
      "Unified operational dashboards",
      "Exportable stakeholder reports",
      "Carbon accounting integrations"
    ],
    linkText: "View Analytics",
    link: "/intelligence/analytics-dashboard"
  },
  // PLATFORM -> Operations
  "Workflow Automation": {
    title: "Workflow Automation",
    desc: "Automate outgrower operations and audits.",
    bullets: [
      "No-code field survey logic",
      "Automated digital audit trails",
      "Supervisor alert queues",
      "Sourcing weight ticket logging"
    ],
    linkText: "Explore Workflows",
    link: "/platform/operations/workflow-automation"
  },
  "Reporting": {
    title: "Reporting Console",
    desc: "Instant compliance and exportable logs.",
    bullets: [
      "One-click EUDR audit templates",
      "Custom stakeholder disclosures",
      "PDF and spreadsheet logging",
      "Real-time alert summary logs"
    ],
    linkText: "View Reporting Tools",
    link: "/platform/operations/reporting"
  },
  "Mobile Apps": {
    title: "Mobile Field Apps",
    desc: "Offline-first polygon gathering and outgrower profiling.",
    bullets: [
      "100% offline survey operations",
      "GPS polygon boundary drawing",
      "Multi-language field interface",
      "Automatic data syncing protocols"
    ],
    linkText: "View Mobile Solutions",
    link: "/platform/operations/mobile-apps"
  },
  "Document Management": {
    title: "Document Cloud",
    desc: "Secure compliance certificates and grower receipts.",
    bullets: [
      "Encrypted cloud document vault",
      "Automated farmer receipt matching",
      "Organic certificates cataloging",
      "Third-party auditor portal"
    ],
    linkText: "Explore Documents",
    link: "/platform/operations/document-management"
  },
  // PLATFORM -> Connectivity
  "API Registry": {
    title: "Platform APIs",
    desc: "Connect sourcing data to any enterprise systems.",
    bullets: [
      "RESTful API endpoints",
      "High-throughput payload streams",
      "Webhooks for field transactions",
      "Audited transaction histories"
    ],
    linkText: "View Developer Docs",
    link: "/platform/connectivity/apis"
  },
  "Developer SDK": {
    title: "Developer SDK",
    desc: "Build custom outgrower integrations.",
    bullets: [
      "JavaScript, Python, and Go libraries",
      "Pre-built GIS mapping widgets",
      "Sample field survey templates",
      "Developer staging environments"
    ],
    linkText: "Explore SDK Tools",
    link: "/platform/connectivity/sdk"
  },
  "ERP Connectors": {
    title: "ERP Integrations",
    desc: "Sync transactions directly to SAP, NetSuite, or Dynamics.",
    bullets: [
      "Bi-directional payment syncs",
      "Sourcing invoice generation",
      "Automatic inventory updates",
      "Supplier ledger reconciliations"
    ],
    linkText: "Explore ERP Connectors",
    link: "/platform/connectivity/erp-connectors"
  },
  "GIS Integrations": {
    title: "GIS Connections",
    desc: "Overlay custom spatial databases.",
    bullets: [
      "Esri ArcGIS and QGIS compatibilities",
      "Custom WMS and WFS map layers",
      "Dynamic GeoJSON imports",
      "Cadastral boundary alignments"
    ],
    linkText: "View GIS Connectors",
    link: "/platform/connectivity/gis-integrations"
  },
  // PLATFORM -> Security
  "Enterprise Security": {
    title: "Enterprise Security",
    desc: "SOC2 Type II data safeguards.",
    bullets: [
      "End-to-end data encryption",
      "Single Sign-On (SSO) protocols",
      "Granular role access filters",
      "Continuous threat monitoring"
    ],
    linkText: "View Security Center",
    link: "/platform/security/security"
  },
  "Data Privacy": {
    title: "Grower Data Privacy",
    desc: "GDPR outgrower consent management.",
    bullets: [
      "Grower profile consent forms",
      "Encrypted PII data hashing",
      "Automated profile deletions",
      "Auditable privacy trails"
    ],
    linkText: "Read Privacy Details",
    link: "/platform/security/privacy"
  },
  "Cloud Deployment": {
    title: "Cloud Deployment",
    desc: "SaaS or dedicated private cloud setups.",
    bullets: [
      "AWS, Azure, and GCP hosting options",
      "Multi-tenant or single-tenant",
      "99.99% uptime SLA guarantee",
      "Geo-redundant DB replication"
    ],
    linkText: "Explore Deployments",
    link: "/platform/security/deployment"
  },
  "Compliance Standards": {
    title: "Compliance Standard Audits",
    desc: "Traceability audit trails certified globally.",
    bullets: [
      "ISO 27001 data protection",
      "Certified ESG metrics export",
      "Audit-ready regulatory files",
      "Global compliance standards check"
    ],
    linkText: "Explore Standards",
    link: "/platform/security/compliance"
  },
  // PLATFORM -> Architecture
  "Platform Overview": {
    title: "Platform Overview",
    desc: "Discover the unified agricultural first-mile stack.",
    bullets: [
      "GIS and IoT tracking systems",
      "Interactive global outgrower maps",
      "First-mile transaction ledger",
      "Unified compliance portal"
    ],
    linkText: "Explore Platform",
    link: "/platform"
  },
  "Infrastructure Map": {
    title: "Infrastructure Map",
    desc: "Our high-availability global cloud stack.",
    bullets: [
      "Edge caching in sourcing hubs",
      "Serverless spatial calculation databases",
      "Automated scaling protocols",
      "Real-time database replication"
    ],
    linkText: "View Infrastructure",
    link: "/platform/platform-architecture"
  },
  "Cloud Scalability": {
    title: "Cloud Scalability",
    desc: "Architected to scale to millions of farmers.",
    bullets: [
      "Dynamic load balancing",
      "Distributed outgrower databases",
      "Optimized offline data queues",
      "Ultra-low latency edge servers"
    ],
    linkText: "Read Architecture Brief",
    link: "/platform/platform-architecture"
  },
  // SOLUTIONS -> Grow
  "Farm Management": {
    title: "Farm Management",
    desc: "Digitize growers and monitor yield.",
    bullets: [
      "Individual farmer profile directories",
      "Geo-spatially mapped parcel grids",
      "Sowing and harvest tracking",
      "Dynamic input cost logs"
    ],
    linkText: "Explore Farm Mgmt",
    link: "/solutions/agriculture/farm-management"
  },
  "Digital Advisory": {
    title: "Digital Advisory",
    desc: "Deliver personalized weather and pest advice.",
    bullets: [
      "Automated SMS weather alerts",
      "Customized pest warning models",
      "Sustainable fertilizer advice",
      "Grower training feedback logs"
    ],
    linkText: "Explore Advisory",
    link: "/solutions/agriculture/digital-advisory"
  },
  "Crop Monitoring": {
    title: "Crop Monitoring",
    desc: "Satellite NDVI crop performance screening.",
    bullets: [
      "Weekly satellite vegetation scans",
      "Automated water stress mapping",
      "Historical yield indexes",
      "Extreme weather risk detection"
    ],
    linkText: "Explore Monitoring",
    link: "/solutions/agriculture/crop-monitoring"
  },
  // SOLUTIONS -> Track
  "Supply Chain Traceability": {
    title: "Supply Chain Traceability",
    desc: "Trace products from harvest to consumer.",
    bullets: [
      "Bag-level barcode scanning",
      "First-mile scale integration",
      "Interactive route maps",
      "Digital custody chains"
    ],
    linkText: "Explore Traceability",
    link: "/solutions/traceability/supply-chain-traceability"
  },
  "Digital Product Passport": {
    title: "Digital Product Passport",
    desc: "Prepare for upcoming EU transparency regulations.",
    bullets: [
      "EU DPP data schema matching",
      "Traceability ledger hashes",
      "Deforestation compliance codes",
      "Carbon footprints disclosure"
    ],
    linkText: "Read DPP Passport Details",
    link: "/solutions/traceability/digital-product-passport"
  },
  "QR Consumer Transparency": {
    title: "QR Transparency",
    desc: "Engage retail customers with farm origins.",
    bullets: [
      "Scannable QR codes on packs",
      "Farmer storytelling profiles",
      "Interactive sourcing maps",
      "Verified compliance statements"
    ],
    linkText: "Explore QR Trust",
    link: "/solutions/traceability/qr-consumer-transparency"
  },
  // SOLUTIONS -> Protect
  "EUDR Deforestation": {
    title: "EUDR Deforestation",
    desc: "Automated deforestation checks for EU compliance.",
    bullets: [
      "1-click polygon overlay audits",
      "Interactive country risk flags",
      "Smallholder polygon imports",
      "Due Diligence Statement files"
    ],
    linkText: "Explore EUDR Tool",
    link: "/compliance/eudr"
  },
  "Carbon Monitoring": {
    title: "Carbon Monitoring",
    desc: "Verify carbon offsets and inset parameters.",
    bullets: [
      "Regenerative agriculture carbon tracking",
      "Soil organic carbon data logs",
      "Satellite carbon sequestration maps",
      "Scope 3 emissions accounting"
    ],
    linkText: "Explore Carbon Monitoring",
    link: "/solutions/sustainability/carbon-monitoring"
  },
  "ESG Reporting": {
    title: "ESG Reporting",
    desc: "Unified sustainability metrics dashboard.",
    bullets: [
      "GRI and CSRD schema compliance",
      "Outgrower payment parity audits",
      "Water footprint logging",
      "Exportable stakeholder matrices"
    ],
    linkText: "View ESG Solutions",
    link: "/solutions/sustainability/esg-reporting"
  },
  "Regenerative Agriculture": {
    title: "Regenerative Agriculture",
    desc: "Verify soil health and cover crop compliance.",
    bullets: [
      "No-till verification mapping",
      "Cover crop satellite validation",
      "Biodiversity index monitoring",
      "Premium price payout matching"
    ],
    linkText: "Explore Regenerative Ag",
    link: "/solutions/sustainability/regenerative-agriculture"
  },
  // SOLUTIONS -> Scale
  "Sourcing Marketplace": {
    title: "Sourcing Marketplace",
    desc: "Procure directly from verified cooperatives.",
    bullets: [
      "Verified digital crop catalogs",
      "Cooperative seller listings",
      "Direct trading portals",
      "Sourcing quality verification reports"
    ],
    linkText: "Explore Marketplace",
    link: "/solutions/supply-chain/marketplace"
  },
  "Farmer Payments": {
    title: "Farmer Payments",
    desc: "Direct digital payout models to growers.",
    bullets: [
      "Direct mobile money integrations",
      "Fair Trade premium logging",
      "Transaction receipt catalogs",
      "Instant field scales verification"
    ],
    linkText: "Explore Payments",
    link: "/solutions/finance/farmer-payments"
  },
  "Direct Procurement": {
    title: "Direct Procurement",
    desc: "Streamline field purchases and contracts.",
    bullets: [
      "Field contract digital signing",
      "Scale weighbridge integrations",
      "Instant invoice calculations",
      "Automatic supplier ledgers"
    ],
    linkText: "Explore Procurement",
    link: "/solutions/supply-chain/procurement"
  },
  // CUSTOMERS
  "Agribusiness": {
    title: "Agribusinesses",
    desc: "Scale outgrower networks with transparent tools.",
    bullets: [
      "Map thousands of smallholder grids",
      "Automated digital audit logs",
      "Optimize supply logistics routes",
      "Track compliance certificates"
    ],
    linkText: "View Agribusiness Solutions",
    link: "/customers/agribusiness"
  },
  "Food Brands": {
    title: "Global Food Brands",
    desc: "Mitigate supply chain reputational risks.",
    bullets: [
      "100% first-mile cargo tracking",
      "EUDR deforestation screening",
      "Consumer trust transparency codes",
      "Global ESG audits support"
    ],
    linkText: "View Brand Solutions",
    link: "/customers/food-brands"
  },
  "Governments": {
    title: "Governments & Agencies",
    desc: "Build national registry databases for crop assets.",
    bullets: [
      "National farmer registry maps",
      "Agricultural land use surveys",
      "EUDR compliance support systems",
      "Outgrower subsidy payouts sync"
    ],
    linkText: "View Government Solutions",
    link: "/customers/governments"
  },
  "NGOs": {
    title: "NGOs & Foundations",
    desc: "Verify sustainability impact KPIs.",
    bullets: [
      "Smallholder farmer income tracking",
      "Local forest boundary screening",
      "Educational training program logs",
      "Impact validation dashboards"
    ],
    linkText: "View NGO Solutions",
    link: "/customers/ngos"
  },
  "Financial Institutions": {
    title: "Financial Institutions",
    desc: "Deliver credit score options to growers.",
    bullets: [
      "Sourcing history credit scores",
      "Automatic loan payments syncs",
      "Crop yield risk valuations",
      "Interactive crop insurance links"
    ],
    linkText: "View Financial Solutions",
    link: "/customers/financial-institutions"
  },
  "Certification Bodies": {
    title: "Certification Bodies",
    desc: "Audit certification standards faster.",
    bullets: [
      "Digital organic receipt trails",
      "Rainforest Alliance standards overlay",
      "Secure auditable polygon files",
      "Direct auditor cloud vaults"
    ],
    linkText: "View Certification Solutions",
    link: "/customers/certification-bodies"
  },
  // PARTNERS
  "Technology Partners": {
    title: "Technology Partners",
    desc: "Integrate specialized IoT devices and sensors.",
    bullets: [
      "Sensors and weather stations APIs",
      "GIS spatial analytical layers",
      "Automated serverless payload streams",
      "Verified vendor program access"
    ],
    linkText: "Learn about Tech Partners",
    link: "/partners/technology-partners"
  },
  "Implementation Partners": {
    title: "Implementation Partners",
    desc: "Deploy SourceTrace software in sourcing countries.",
    bullets: [
      "Technical integration manuals",
      "Local setup support resources",
      "System integration checklists",
      "Dedicated account team access"
    ],
    linkText: "Learn about Implementation",
    link: "/partners/channel-partners"
  },
  "Consulting Partners": {
    title: "Consulting Partners",
    desc: "Deliver regulatory compliance audits.",
    bullets: [
      "EUDR compliance review formats",
      "ESG reporting guidelines",
      "Carbon accounting frameworks",
      "Auditor tool dashboard reviews"
    ],
    linkText: "Learn about Consulting",
    link: "/partners/consulting-partners"
  },
  "Marketplace": {
    title: "Partner Marketplace",
    desc: "Browse third-party plugin components.",
    bullets: [
      "Weather forecast connectors",
      "GIS file converting widgets",
      "Custom payment portal modules",
      "Certified grow tools catalog"
    ],
    linkText: "Visit Marketplace",
    link: "/partners/marketplace"
  },
  "Partner Portal": {
    title: "Partner Portal",
    desc: "Secure co-sell registry and portal credentials.",
    bullets: [
      "Lead generation registry forms",
      "Joint client case templates",
      "Direct communication dashboards",
      "Commission logs overview"
    ],
    linkText: "Access Portal",
    link: "/partners/partner-portal"
  },
  "Become a Partner": {
    title: "Become a Partner",
    desc: "Join our global sourcing software alliance.",
    bullets: [
      "Priority customer lead share",
      "Sales tool and demo sandbox access",
      "Co-marketing webinar schedules",
      "Technical support certifications"
    ],
    linkText: "Register as Partner",
    link: "/partners/become-a-partner"
  },
  // RESOURCES
  "Blog Insights": {
    title: "Blog Insights",
    desc: "Our latest updates on agronomic compliance.",
    bullets: [
      "EUDR compliance timeline reviews",
      "Smallholder farmer tech briefings",
      "GIS spatial calculation updates",
      "New carbon farming features"
    ],
    linkText: "Read Blog",
    link: "/resources/blog"
  },
  "Whitepapers": {
    title: "Whitepapers Library",
    desc: "Deep research papers on first-mile tracking.",
    bullets: [
      "Polygon data formatting guides",
      "CSRD ESG disclosure standards",
      "Smallholder privacy consent rules",
      "Blockchain ledger security reviews"
    ],
    linkText: "Download Whitepapers",
    link: "/resources/whitepapers"
  },
  "Market Reports": {
    title: "Market Reports",
    desc: "Sourcing risk maps for core crops.",
    bullets: [
      "West Africa cocoa compliance charts",
      "Southeast Asia palm oil forest audits",
      "East Africa coffee weather outlooks",
      "South America soy parcel mappings"
    ],
    linkText: "Explore Reports",
    link: "/resources/reports"
  },
  "Policy Guides": {
    title: "Regulatory Policy Guides",
    desc: "Interactive checklists for upcoming laws.",
    bullets: [
      "EU Deforestation Regulation rules",
      "Corporate Sustainability reports checklist",
      "German Supply Chain Act steps",
      "US Lacey Act timber checks"
    ],
    linkText: "Explore Guides",
    link: "/resources/guides"
  },
  "API Documentation": {
    title: "API Documentation",
    desc: "Comprehensive REST API endpoint directories.",
    bullets: [
      "Farmer registry payload formats",
      "Weighbridge webhook specifications",
      "Spatial GeoJSON payload schemas",
      "Authentication and token rules"
    ],
    linkText: "Read API Docs",
    link: "/resources/api-docs"
  },
  "Webinars": {
    title: "Sourcing Webinars",
    desc: "Expert panel discussions on supply chain trust.",
    bullets: [
      "Auditor polygon checks step-by-steps",
      "Agri-lending credit scoring reviews",
      "Outgrower digital money rollouts",
      "Customer case study deep-dives"
    ],
    linkText: "Watch Webinars",
    link: "/resources/webinars"
  },
  "Video Tutorials": {
    title: "Video Tutorials",
    desc: "Step-by-step videos for setup.",
    bullets: [
      "Mobile outgrower survey builder walk",
      "Polygon GIS import setup steps",
      "Connecting weighbridge API scales",
      "ESG disclosure sheet exports"
    ],
    linkText: "Watch Videos",
    link: "/resources/videos"
  },
  "Frequently Asked FAQs": {
    title: "Support FAQs",
    desc: "Frequently asked questions from developers and auditors.",
    bullets: [
      "Offline mobile data storage limits",
      "Polygon coordinate formats accepted",
      "Data privacy grower deletion rules",
      "ERP connection timing queries"
    ],
    linkText: "View FAQs",
    link: "/resources/faqs"
  },
  // COMPANY
  "About SourceTrace": {
    title: "About SourceTrace",
    desc: "Our mission to bring transparency to the first-mile.",
    bullets: [
      "B Corp Impact certified metrics",
      "Operating across 37 global nations",
      "Outgrower software market leader",
      "ESG and carbon audit alignment"
    ],
    linkText: "Read Our Story",
    link: "/about"
  },
  "Leadership": {
    title: "Executive Leadership",
    desc: "Meet our global executive team.",
    bullets: [
      "Agriculture technology specialists",
      "Outgrower software engineers",
      "ESG policy consulting advisors",
      "Global scaling project leaders"
    ],
    linkText: "Meet the Team",
    link: "/company/meet-the-team"
  },
  "Global Presence": {
    title: "Global Presence",
    desc: "Our offices in core sourcing regions.",
    bullets: [
      "Bhubaneswar, India tech center",
      "Nairobi, Kenya regional center",
      "New York, USA corporate office",
      "Abidjan, Ivory Coast field hub"
    ],
    linkText: "View Offices",
    link: "/company/global-offices"
  },
  "Careers": {
    title: "Careers at SourceTrace",
    desc: "Join us in digitizing agricultural supply chains.",
    bullets: [
      "Remote-first global developer teams",
      "Competitive compensation & health benefits",
      "Sabbatical carbon offset programs",
      "Active open-source community support"
    ],
    linkText: "View Open Roles",
    link: "/careers"
  },
  "News & Releases": {
    title: "News & Releases",
    desc: "Latest corporate announcements.",
    bullets: [
      "New satellite compliance features release",
      "Joint cooperatives software pilots success",
      "Corporate awards and B Corp ratings",
      "Press kits and image assets"
    ],
    linkText: "Read Press Releases",
    link: "/resources/newsroom"
  },
  "Contact Us": {
    title: "Contact Us",
    desc: "Get in touch with local support or sales.",
    bullets: [
      "24/7 technical customer support",
      "Consultant scheduling request forms",
      "Product demo setup appointments",
      "Local field office phone numbers"
    ],
    linkText: "Contact Us",
    link: "/contact"
  }
};

function StandardDropdownContent({ menu, closeMenu }: { menu: any; closeMenu: () => void }) {
  const hero = MENU_HEROES[menu.id];
  const promo = MENU_PROMOS[menu.id];
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const currentPromo = (hoveredLink && LINK_PREVIEWS[hoveredLink]) || promo;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 flex gap-12 text-[#0B3D2E]">
      <div className="flex-1">
        {hero && (
          <div className="border-b border-gray-100 pb-4 mb-6">
            <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">{hero.label}</span>
            <h3 className="text-3xl font-black mb-1">{hero.title}</h3>
            <p className="text-base text-gray-500 max-w-3xl font-medium">
              {hero.desc}
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {menu.items.map((link: NavigationLink, idx: number) => {
            const hasSubItems = !!link.subItems;
            return (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="group flex flex-col justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 hover:shadow-sm transition-all min-h-[150px] border border-transparent hover:border-[#0B3D2E]/5"
              >
                <div>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="font-bold text-base text-gray-900 group-hover:text-emerald-700 transition-colors block mb-1"
                  >
                    {link.name}
                  </Link>
                  <p className="text-sm text-gray-500 leading-snug line-clamp-2">{link.desc}</p>
                </div>
                {hasSubItems ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {link.subItems!.slice(0, 3).map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={closeMenu}
                        onMouseEnter={() => setHoveredLink(sub.name)}
                        onMouseLeave={() => setHoveredLink(link.name)}
                        className="text-xs font-bold text-gray-600 hover:text-[#0B3D2E] bg-white border border-gray-100 hover:border-emerald-600/30 px-3 py-1 rounded-md transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="pt-2">
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="text-xs font-black text-emerald-600 hover:text-emerald-800 flex items-center gap-1 group"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {currentPromo && (
        <div className="w-[350px] shrink-0 border-l border-gray-100 pl-12 hidden xl:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredLink || "default"}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="bg-[#EAF5EE]/40 border border-[#0B3D2E]/5 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#0B3D2E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] block mb-2">
                  {hoveredLink ? "Preview" : "Featured"}
                </span>
                <h4 className="text-xl font-black mb-2 text-[#0B3D2E] group-hover:text-emerald-800 transition-colors">{currentPromo.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                  {currentPromo.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {currentPromo.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={currentPromo.link}
                onClick={closeMenu}
                className="relative z-10 w-full py-3 text-center bg-[#0B3D2E] text-white hover:bg-[#1F7A53] font-bold text-sm rounded-xl transition-all shadow-md group-hover:shadow-lg active:scale-98"
              >
                {currentPromo.linkText || "Explore"} →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<"root" | "submenu">("root");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    setActiveMenu(null);
    if (isMobileOpen) setIsMobileOpen(false);
  }, [isMobileOpen]);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

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
    if (isMobileOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isSearchOpen]);

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

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const menuItems = [
    { id: "platform", label: "Platform", items: PLATFORM_LINKS, promo: MENU_PROMOS.platform },
    { id: "solutions", label: "Solutions", items: SOLUTIONS_LINKS, promo: MENU_PROMOS.solutions },
    { id: "industries", label: "Commodity Hub", items: INDUSTRIES_LINKS, promo: { title: "Commodity Explorer", desc: "Compare 500+ global agricultural commodities.", link: "/CropInsights", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" } },
    { id: "customers", label: "Customers", items: CUSTOMERS_LINKS, promo: MENU_PROMOS.customers },
    { id: "partners", label: "Partners", items: PARTNERS_LINKS, promo: MENU_PROMOS.partners },
    { id: "resources", label: "Resources", items: RESOURCES_LINKS, promo: MENU_PROMOS.resources },
    { id: "company", label: "Company", items: COMPANY_LINKS, promo: MENU_PROMOS.company },
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

          <div className={`hidden lg:flex items-center h-full transition-all duration-250 ease-[cubic-bezier(0.32,0.72,0,1)] ${isSearchOpen ? "gap-0" : "gap-1"}`}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`relative h-full flex items-center transition-all duration-250 ${isSearchOpen ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100"}`}
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <button className={`px-4 py-2 rounded-full text-base font-semibold transition-colors flex items-center gap-1 whitespace-nowrap ${activeMenu === item.id ? "bg-gray-100 text-[#0B3D2E]" : "text-gray-600 hover:text-[#0B3D2E]"}`}>
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === item.id ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <GlobalSearch isSearchOpen={isSearchOpen} onSearchOpen={openSearch} onSearchClose={closeSearch} variant="desktop" />
            <Link href="/contact-sales" className={`transition-all duration-250 ${isSearchOpen ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100"}`}>
              <Button size="sm" className="h-10 px-6 rounded-full font-semibold bg-[#0B3D2E] text-white hover:bg-[#1F7A53]">Contact Sales</Button>
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <GlobalSearch isSearchOpen={isSearchOpen} onSearchOpen={openSearch} onSearchClose={closeSearch} variant="mobile" />
            <button
              onClick={toggleMobileMenu}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer active:scale-95"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="overflow-visible">
                <line x1="2" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="origin-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ transform: isMobileOpen ? "translateY(5px) rotate(45deg)" : "translateY(0) rotate(0)", transformOrigin: "center" }} />
                <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="transition-opacity duration-200" style={{ opacity: isMobileOpen ? 0 : 1 }} />
                <line x1="2" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="origin-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ transform: isMobileOpen ? "translateY(-5px) rotate(-45deg)" : "translateY(0) rotate(0)", transformOrigin: "center" }} />
              </svg>
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
            {activeMenu === "industries" ? (
              <CommodityHubDropdownContent closeMenu={() => setActiveMenu(null)} />
            ) : (
              menuItems.map((menu) => (
                activeMenu === menu.id && (
                  <StandardDropdownContent key={menu.id} menu={menu} closeMenu={() => setActiveMenu(null)} />
                )
              ))
            )}
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
            {/* === Fixed Header === */}
            <div className="h-20 flex items-center justify-between px-6 flex-shrink-0 bg-white border-b border-gray-100 shadow-sm">
              <Link href="/" className="flex items-center gap-2" onClick={closeMobile}>
                <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-10 object-contain" />
              </Link>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={openSearch}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors cursor-pointer active:scale-95"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={closeMobile}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#0B3D2E] bg-gray-50 hover:bg-gray-100 transition-all focus:outline-none cursor-pointer active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* === Scrollable Dropdown Body === */}
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
                                      {!link.subItems && <ArrowRight className="w-3 h-3 text-gray-200 group-hover:text-[#1F7A53] ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />}
                                    </Link>
                                    {link.subItems && (
                                      <div className="pl-12 flex flex-col gap-0.5 border-l border-gray-100 ml-6 mb-2 mt-1">
                                        {link.subItems.map((sub, sIdx) => (
                                          <Link
                                            key={sIdx}
                                            href={sub.href}
                                            onClick={closeMobile}
                                            className="group flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-white transition-all text-xs font-semibold text-gray-500 hover:text-[#0B3D2E]"
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#53D769] transition-colors" />
                                            <span>{sub.name}</span>
                                          </Link>
                                        ))}
                                      </div>
                                    )}
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
                  <Link
                    href="/contact-sales"
                    onClick={closeMobile}
                    className="block w-full py-3.5 text-center text-[13px] font-bold bg-[#0B3D2E] text-white hover:bg-[#1F7A53] rounded-xl transition-colors shadow-lg shadow-[#0B3D2E]/20 active:scale-[0.98]"
                  >
                    Contact Sales
                  </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
