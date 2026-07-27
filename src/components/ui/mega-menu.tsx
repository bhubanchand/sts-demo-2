"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Leaf, Target, Map, Shield, Activity, Users, Database, Server, Smartphone, BookOpen, FileText, Briefcase, GraduationCap, ArrowRight, Menu, X, ArrowLeft, ChevronRight, MapPin, Compass, ShieldCheck, Fish, Trees, Carrot, Droplets, Wheat, TreeDeciduous, ChevronLeft, Zap, BarChart3, Globe, Lock, Sprout, Search, Apple, Coffee } from "lucide-react";
import { Button } from "./button";
import { GlobalSearch } from "./global-search";


/* Apple Settings-inspired Mobile Slide Variants (280ms) */
const appleSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

type MobileNavStep =
  | { type: "root"; title: string }
  | { type: "category"; id: string; title: string }
  | { type: "subGroup"; categoryId: string; subGroupId: string; title: string };

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
  { name: "Coffee", href: "/CommodityHub/coffee", desc: "Trace every bean from farm to cup." },
  { name: "Rice", href: "/CommodityHub/rice", desc: "Monitor rice cultivation with precision." },
  { name: "Palm Oil", href: "/CommodityHub/palm-oil", desc: "Deforestation-free palm oil supply chains." },
  { name: "Cotton", href: "/CommodityHub/cotton", desc: "Sustainable cotton sourcing and tracking." },
  { name: "Tea", href: "/CommodityHub/tea", desc: "Full visibility across tea supply networks." },
  { name: "Cocoa", href: "/CommodityHub/cocoa", desc: "Ensure ethical cocoa sourcing." },
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


/* === Flattened Search Index for Instant Search Bar === */
const ALL_SEARCHABLE_PAGES = [
  // Platform
  { name: "Platform Overview", href: "/platform", category: "Platform", desc: "Unified enterprise nature intelligence platform." },
  { name: "Intelligence & AI Diagnostics", href: "/platform/intelligence", category: "Platform", desc: "AI diagnostics & satellite monitoring." },
  { name: "AI Engine", href: "/intelligence/ai-engine", category: "Platform", desc: "Machine learning crop models." },
  { name: "Satellite Monitoring", href: "/intelligence/satellite-monitoring", category: "Platform", desc: "Real-time field canopy & land use alerts." },
  { name: "Geospatial Intelligence", href: "/intelligence/geospatial-intelligence", category: "Platform", desc: "GIS mapping and polygon boundaries." },
  { name: "Analytics Dashboard", href: "/intelligence/analytics-dashboard", category: "Platform", desc: "Impact analytics and custom reports." },
  { name: "Operations & Workflows", href: "/platform/operations", category: "Platform", desc: "Automate field workflows & reporting." },
  { name: "Workflow Automation", href: "/platform/operations/workflow-automation", category: "Platform", desc: "Custom outgrower task triggers." },
  { name: "Reporting & Audits", href: "/platform/operations/reporting", category: "Platform", desc: "Audit-ready reporting modules." },
  { name: "Mobile Apps", href: "/platform/operations/mobile-apps", category: "Platform", desc: "Offline-first field data collection." },
  { name: "Document Management", href: "/platform/operations/document-management", category: "Platform", desc: "Secure digital receipts & certificates." },
  { name: "Connectivity & APIs", href: "/platform/connectivity", category: "Platform", desc: "Integrate ERPs and GIS layers." },
  { name: "API Registry", href: "/platform/connectivity/apis", category: "Platform", desc: "REST & GraphQL developer APIs." },
  { name: "Developer SDK", href: "/platform/connectivity/sdk", category: "Platform", desc: "Mobile & web integration SDKs." },
  { name: "ERP Connectors", href: "/platform/connectivity/erp-connectors", category: "Platform", desc: "SAP, Oracle, & Microsoft Dynamics connectors." },
  { name: "GIS Integrations", href: "/platform/connectivity/gis-integrations", category: "Platform", desc: "Esri ArcGIS & QGIS integrations." },
  { name: "Security & Compliance", href: "/platform/security", category: "Platform", desc: "SOC2 compliance & user privacy." },
  { name: "Enterprise Security", href: "/platform/security/security", category: "Platform", desc: "Bank-grade encryption & SSO." },
  { name: "Data Privacy", href: "/platform/security/privacy", category: "Platform", desc: "GDPR & farmer data privacy standards." },
  { name: "Cloud Deployment", href: "/platform/security/deployment", category: "Platform", desc: "Dedicated single-tenant cloud option." },
  { name: "Compliance Standards", href: "/platform/security/compliance", category: "Platform", desc: "ISO 27001 & SOC 2 Type II certified." },
  { name: "Platform Architecture", href: "/platform/platform-architecture", category: "Platform", desc: "High-availability cloud stack." },

  // Solutions
  { name: "Grow Solutions Overview", href: "/solutions/agriculture", category: "Solutions › Grow", desc: "Optimize farm yield & agronomist advisory." },
  { name: "Farm Management", href: "/solutions/agriculture/farm-management", category: "Solutions › Grow", desc: "Digitize crop logs and yield estimations." },
  { name: "Digital Advisory", href: "/solutions/agriculture/digital-advisory", category: "Solutions › Grow", desc: "Pest & weather alerts directly to farmers." },
  { name: "Crop Monitoring", href: "/solutions/agriculture/crop-monitoring", category: "Solutions › Grow", desc: "Phenology & growth stage tracking." },
  { name: "Track Solutions Overview", href: "/solutions/traceability", category: "Solutions › Track", desc: "Trace shipments & batch chain of custody." },
  { name: "Supply Chain Traceability", href: "/solutions/traceability/supply-chain-traceability", category: "Solutions › Track", desc: "First-mile to retail origin tracing." },
  { name: "Digital Product Passport", href: "/solutions/traceability/digital-product-passport", category: "Solutions › Track", desc: "EU compliant digital product passports." },
  { name: "QR Consumer Transparency", href: "/solutions/traceability/qr-consumer-transparency", category: "Solutions › Track", desc: "Scannable packaging story for buyers." },
  { name: "Protect Solutions Overview", href: "/solutions/sustainability", category: "Solutions › Protect", desc: "Carbon audits & ESG compliance." },
  { name: "EUDR Deforestation Verification", href: "/compliance/eudr", category: "Solutions › Protect", desc: "Plot polygon geo-checks against satellite alerts." },
  { name: "Carbon Monitoring", href: "/solutions/sustainability/carbon-monitoring", category: "Solutions › Protect", desc: "Soil carbon & biomass sequestration MRV." },
  { name: "ESG Reporting", href: "/solutions/sustainability/esg-reporting", category: "Solutions › Protect", desc: "CSRD & Scope 3 carbon footprint disclosures." },
  { name: "Regenerative Agriculture", href: "/solutions/sustainability/regenerative-agriculture", category: "Solutions › Protect", desc: "Promote biodiversity & soil organic matter." },
  { name: "Scale Solutions Overview", href: "/solutions/supply-chain", category: "Solutions › Scale", desc: "Marketplace trading & direct procurement." },
  { name: "Sourcing Marketplace", href: "/solutions/supply-chain/marketplace", category: "Solutions › Scale", desc: "Connect verified growers with enterprise buyers." },
  { name: "Farmer Payments", href: "/solutions/finance/farmer-payments", category: "Solutions › Scale", desc: "Instant mobile wallet disbursements & premiums." },
  { name: "Direct Procurement", href: "/solutions/supply-chain/procurement", category: "Solutions › Scale", desc: "Streamline raw material purchase orders." },

  // Commodity Hub
  { name: "Commodity Hub Overview", href: "/CommodityHub", category: "Commodity Hub", desc: "Explore 500+ global commodity supply chains." },
  { name: "Coffee Sourcing", href: "/CommodityHub/coffee", category: "Commodity Hub", desc: "Trace bean origin from smallholders to roasters." },
  { name: "Rice Sourcing", href: "/CommodityHub/rice", category: "Commodity Hub", desc: "Monitor paddy cultivation & water usage." },
  { name: "Palm Oil Sourcing", href: "/CommodityHub/palm-oil", category: "Commodity Hub", desc: "Deforestation-free NDPE compliant palm oil." },
  { name: "Cotton Sourcing", href: "/CommodityHub/cotton", category: "Commodity Hub", desc: "Organic & sustainable cotton supply chains." },
  { name: "Tea Sourcing", href: "/CommodityHub/tea", category: "Commodity Hub", desc: "Fair trade tea estate & smallholder mapping." },
  { name: "Cocoa Sourcing", href: "/CommodityHub/cocoa", category: "Commodity Hub", desc: "Prevent child labor & deforestation in cocoa." },

  // Customers
  { name: "Agribusinesses", href: "/customers/agribusiness", category: "Customers", desc: "Outgrower management & field tech." },
  { name: "Food & Beverage Brands", href: "/customers/food-brands", category: "Customers", desc: "Scope 3 & EUDR supply chain compliance." },
  { name: "Governments & Ministries", href: "/customers/governments", category: "Customers", desc: "National farmer registry digital mapping." },
  { name: "NGOs & Non-Profits", href: "/customers/ngos", category: "Customers", desc: "Socio-economic impact & livelihood tracking." },
  { name: "Financial Institutions", href: "/customers/financial-institutions", category: "Customers", desc: "Agri-credit scoring & crop insurance." },
  { name: "Certification Bodies", href: "/customers/certification-bodies", category: "Customers", desc: "Streamline third-party audit evidence." },

  // Partners
  { name: "Technology Partners", href: "/partners/technology-partners", category: "Partners", desc: "Integrate specialized IoT & GIS software." },
  { name: "Implementation Partners", href: "/partners/channel-partners", category: "Partners", desc: "Deploy SourceTrace in local sourcing hubs." },
  { name: "Consulting Partners", href: "/partners/consulting-partners", category: "Partners", desc: "Advisory services for EUDR & ESG." },
  { name: "Partner Marketplace", href: "/partners/marketplace", category: "Partners", desc: "Browse pre-built integrations and add-ons." },
  { name: "Partner Portal", href: "/partners/partner-portal", category: "Partners", desc: "Manage registered deals and co-selling." },
  { name: "Become a Partner", href: "/partners/become-a-partner", category: "Partners", desc: "Join SourceTrace's global partner ecosystem." },

  // Resources
  { name: "Resource Library", href: "/resources/blog", category: "Resources", desc: "Whitepapers, market briefs & guides." },
  { name: "Blog Insights", href: "/resources/blog", category: "Resources", desc: "Latest insights on ag-tech & sustainability." },
  { name: "Whitepapers", href: "/resources/whitepapers", category: "Resources", desc: "In-depth technical & compliance papers." },
  { name: "Market Reports", href: "/resources/reports", category: "Resources", desc: "Global commodity sourcing analysis." },
  { name: "Policy Guides", href: "/resources/guides", category: "Resources", desc: "EUDR, CSDDD, and CSRD compliance guides." },
  { name: "API Documentation", href: "/resources/api-docs", category: "Resources", desc: "Developer docs and API reference." },
  { name: "Webinars", href: "/resources/webinars", category: "Resources", desc: "Watch live & recorded industry sessions." },
  { name: "Video Tutorials", href: "/resources/videos", category: "Resources", desc: "Product walkthroughs and field guides." },
  { name: "FAQs", href: "/resources/faqs", category: "Resources", desc: "Common questions about SourceTrace platform." },

  // Company
  { name: "About SourceTrace", href: "/about", category: "Company", desc: "Our mission to digitize the agricultural first-mile." },
  { name: "Leadership Team", href: "/company/meet-the-team", category: "Company", desc: "Meet executive leaders and advisory board." },
  { name: "Global Presence", href: "/company/global-offices", category: "Company", desc: "Offices in North America, Asia, & Africa." },
  { name: "Careers", href: "/careers", category: "Company", desc: "Join our team in driving sustainable agriculture." },
  { name: "Newsroom", href: "/resources/newsroom", category: "Company", desc: "Press releases and media announcements." },
  { name: "Contact Us", href: "/contact", category: "Company", desc: "Get in touch with our team." },
];

/* === UNIFIED NAVIGATION DESIGN SYSTEM (V3.0) === */

interface NavGroupItem {
  name: string;
  href: string;
  desc?: string;
}

interface NavGroup {
  title: string;
  items: NavGroupItem[];
}

interface MenuSystemData {
  id: string;
  label: string;
  heading: string;
  description: string;
  groups: NavGroup[];
  featured: {
    title: string;
    desc: string;
    linkText: string;
    link: string;
  };
}

const UNIFIED_NAVIGATION_DATA: Record<string, MenuSystemData> = {
  platform: {
    id: "platform",
    label: "Platform",
    heading: "Unified First-Mile Stack",
    description: "AI-powered diagnostics, satellite telemetry, field workflows, and enterprise ERP integrations.",
    featured: {
      title: "EUDR Deforestation Verifier",
      desc: "Run automated satellite polygon geo-checks and generate Due Diligence Statements.",
      linkText: "Explore EUDR Tool",
      link: "/compliance/eudr",
    },
    groups: [
      {
        title: "Intelligence & AI",
        items: [
          { name: "Platform Overview", href: "/platform", desc: "Unified nature intelligence engine" },
          { name: "AI Diagnostics Engine", href: "/intelligence/ai-engine", desc: "Predictive crop models & disease alerts" },
          { name: "Satellite Monitoring", href: "/intelligence/satellite-monitoring", desc: "Orbit canopy health & land use indexing" },
          { name: "Geospatial Intelligence", href: "/intelligence/geospatial-intelligence", desc: "Polygon boundary & spatial analytics" },
          { name: "Analytics Dashboard", href: "/intelligence/analytics-dashboard", desc: "Operational telemetry & ESG reports" },
        ],
      },
      {
        title: "Operations & Workflows",
        items: [
          { name: "Workflow Automation", href: "/platform/operations/workflow-automation", desc: "No-code outgrower survey logic" },
          { name: "Reporting Console", href: "/platform/operations/reporting", desc: "Audit-ready compliance export templates" },
          { name: "Mobile Field Apps", href: "/platform/operations/mobile-apps", desc: "Offline-first polygon gathering" },
          { name: "Document Management", href: "/platform/operations/document-management", desc: "Encrypted farmer certificate vault" },
        ],
      },
      {
        title: "Connectivity & Security",
        items: [
          { name: "API Registry", href: "/platform/connectivity/apis", desc: "RESTful high-throughput data streams" },
          { name: "Developer SDK", href: "/platform/connectivity/sdk", desc: "JavaScript, Python, & Go integration libraries" },
          { name: "ERP Connectors", href: "/platform/connectivity/erp-connectors", desc: "SAP, Oracle, & NetSuite connectors" },
          { name: "Enterprise Security", href: "/platform/security/security", desc: "SOC2 Type II & bank-grade encryption" },
          { name: "Data Privacy Standards", href: "/platform/security/privacy", desc: "GDPR outgrower PII consent management" },
        ],
      },
    ],
  },
  solutions: {
    id: "solutions",
    label: "Solutions",
    heading: "Agribusiness Solutions",
    description: "Digitize outgrower networks, verify carbon neutrality, and automate global ESG compliance.",
    featured: {
      title: "Nestlé Cocoa Traceability",
      desc: "How Nestlé mapped 120k cocoa smallholder farms for EUDR regulatory compliance.",
      linkText: "Read Success Story",
      link: "/case-studies",
    },
    groups: [
      {
        title: "Grow (Agriculture)",
        items: [
          { name: "Farm Management", href: "/solutions/agriculture/farm-management", desc: "Digitize crop logs & yield estimations" },
          { name: "Digital Advisory", href: "/solutions/agriculture/digital-advisory", desc: "Agronomic pest & weather alerts" },
          { name: "Crop Monitoring", href: "/solutions/agriculture/crop-monitoring", desc: "Phenology & growth stage tracking" },
        ],
      },
      {
        title: "Track (Traceability)",
        items: [
          { name: "Supply Chain Traceability", href: "/solutions/traceability/supply-chain-traceability", desc: "First-mile to retail origin tracing" },
          { name: "Digital Product Passport", href: "/solutions/traceability/digital-product-passport", desc: "EU-compliant digital product passports" },
          { name: "QR Consumer Trust", href: "/solutions/traceability/qr-consumer-transparency", desc: "Scannable packaging origin stories" },
        ],
      },
      {
        title: "Protect & Scale",
        items: [
          { name: "EUDR Deforestation", href: "/compliance/eudr", desc: "Satellite polygon screening against alerts" },
          { name: "Carbon Monitoring", href: "/solutions/sustainability/carbon-monitoring", desc: "Soil carbon & biomass sequestration MRV" },
          { name: "ESG Disclosures", href: "/solutions/sustainability/esg-reporting", desc: "CSRD & Scope 3 carbon disclosures" },
          { name: "Sourcing Marketplace", href: "/solutions/supply-chain/marketplace", desc: "Connect verified growers with buyers" },
          { name: "Farmer Payments", href: "/solutions/finance/farmer-payments", desc: "Direct mobile money payouts & premiums" },
        ],
      },
    ],
  },
  industries: {
    id: "industries",
    label: "Commodity Hub",
    heading: "Commodity Intelligence Hub",
    description: "Explore global agricultural commodities, regulations, sustainability frameworks, and market intelligence.",
    featured: {
      title: "2026 Global Coffee Outlook",
      desc: "In-depth analysis on smallholder supply chain resilience and EUDR compliance rules.",
      linkText: "Read Report",
      link: "/resources/reports",
    },
    groups: [
      {
        title: "Browse by Category",
        items: [
          { name: "Plantation Crops", href: "/CommodityHub", desc: "Sugarcane, Rubber, Coconut" },
          { name: "Cereals & Grains", href: "/CommodityHub", desc: "Wheat, Barley, Rice, Maize" },
          { name: "Oilseeds", href: "/CommodityHub", desc: "Palm Oil, Soybean, Sunflower" },
          { name: "Fruits & Vegetables", href: "/CommodityHub", desc: "Banana, Citrus, Tropical Produce" },
          { name: "Spices & Herbs", href: "/CommodityHub", desc: "Vanilla, Saffron, Black Pepper" },
          { name: "Beverage Crops", href: "/CommodityHub", desc: "Coffee, Cocoa, Tea" },
        ],
      },
      {
        title: "Featured Commodities",
        items: [
          { name: "Coffee Sourcing", href: "/CommodityHub/coffee", desc: "Trace bean origin from farm to roaster" },
          { name: "Palm Oil Traceability", href: "/CommodityHub/palm-oil", desc: "NDPE deforestation-free palm oil" },
          { name: "Cocoa Sourcing", href: "/CommodityHub/cocoa", desc: "Child labor prevention & plot mapping" },
          { name: "Rice Supply Chain", href: "/CommodityHub/rice", desc: "Paddy cultivation & water monitoring" },
          { name: "Cotton Traceability", href: "/CommodityHub/cotton", desc: "Organic & sustainable cotton mapping" },
          { name: "Tea Supply Chain", href: "/CommodityHub/tea", desc: "Fair trade estate & smallholder tracking" },
        ],
      },
      {
        title: "Quick Access Resources",
        items: [
          { name: "Commodity Explorer", href: "/CommodityHub", desc: "Interactive global crop database" },
          { name: "Country Profiles", href: "/company/global-offices", desc: "Sourcing country risk profiles" },
          { name: "Regulations & Policies", href: "/resources/guides", desc: "EUDR, CSDDD, & CSRD guides" },
          { name: "Sustainability Standards", href: "/solutions/sustainability", desc: "Organic & Fair Trade frameworks" },
          { name: "Market Intelligence", href: "/resources/reports", desc: "Sourcing yield & price analytics" },
          { name: "Satellite Risk Maps", href: "/intelligence/geospatial-intelligence", desc: "Deforestation & canopy risk overlays" },
        ],
      },
    ],
  },
  customers: {
    id: "customers",
    label: "Customers",
    heading: "Trusted Ecosystem",
    description: "See how cooperatives, agribusinesses, global food brands, and certifiers use SourceTrace.",
    featured: {
      title: "Bayer Agri-Finance Case",
      desc: "Bayer leveraged first-mile credit scoring to deliver micro-loans to 250k smallholders.",
      linkText: "View Case Study",
      link: "/case-studies",
    },
    groups: [
      {
        title: "Commercial Organizations",
        items: [
          { name: "Agribusinesses", href: "/customers/agribusiness", desc: "Outgrower management & field tech" },
          { name: "Food & Beverage Brands", href: "/customers/food-brands", desc: "Scope 3 & EUDR supply chain compliance" },
          { name: "Commodity Exporters", href: "/customers/agribusiness", desc: "First-mile lot tracking & weighbridge logs" },
        ],
      },
      {
        title: "Public & Institutional",
        items: [
          { name: "Governments & Ministries", href: "/customers/governments", desc: "National farmer registry digital mapping" },
          { name: "NGOs & Non-Profits", href: "/customers/ngos", desc: "Socio-economic impact & livelihood tracking" },
          { name: "Financial Institutions", href: "/customers/financial-institutions", desc: "Agri-credit scoring & crop insurance" },
        ],
      },
      {
        title: "Audits & Standards",
        items: [
          { name: "Certification Bodies", href: "/customers/certification-bodies", desc: "Streamline third-party audit evidence" },
          { name: "Cooperative Associations", href: "/customers/agribusiness", desc: "Member registries & Fair Trade payouts" },
        ],
      },
    ],
  },
  partners: {
    id: "partners",
    label: "Partners",
    heading: "Sustainable Alliance Network",
    description: "Connect, build, and deploy sustainability solutions through our global partner ecosystem.",
    featured: {
      title: "Alliance Partner Program",
      desc: "Co-innovate with top consulting and technology firms globally to accelerate ESG readiness.",
      linkText: "Become a Partner",
      link: "/partners/become-a-partner",
    },
    groups: [
      {
        title: "Partner Categories",
        items: [
          { name: "Technology Partners", href: "/partners/technology-partners", desc: "Integrate specialized IoT & GIS software" },
          { name: "Implementation Partners", href: "/partners/channel-partners", desc: "Deploy SourceTrace in local sourcing hubs" },
          { name: "Consulting Partners", href: "/partners/consulting-partners", desc: "Advisory services for EUDR & ESG" },
        ],
      },
      {
        title: "Marketplace & Programs",
        items: [
          { name: "Partner Marketplace", href: "/partners/marketplace", desc: "Browse pre-built integrations and add-ons" },
          { name: "Co-Sell Registry", href: "/partners/partner-portal", desc: "Register deals & joint client proposals" },
          { name: "Partner Portal", href: "/partners/partner-portal", desc: "Access portal credentials & sandbox APIs" },
        ],
      },
      {
        title: "Join Ecosystem",
        items: [
          { name: "Become a Partner", href: "/partners/become-a-partner", desc: "Apply to join SourceTrace global alliance" },
          { name: "Developer Network", href: "/platform/connectivity/sdk", desc: "SDK docs, webhooks, & API staging" },
        ],
      },
    ],
  },
  resources: {
    id: "resources",
    label: "Resources",
    heading: "Agricultural Intelligence Library",
    description: "Explore whitepapers, API documents, regulatory policy briefs, and developer tools.",
    featured: {
      title: "EUDR Compliance Guide",
      desc: "Complete technical guide for smallholder polygon compliance and Due Diligence files.",
      linkText: "Download Guide",
      link: "/resources/whitepapers",
    },
    groups: [
      {
        title: "Insights & Analysis",
        items: [
          { name: "Resource Library", href: "/resources/blog", desc: "Latest agronomic & sustainability insights" },
          { name: "Blog Insights", href: "/resources/blog", desc: "Articles on EUDR, AI, & field technology" },
          { name: "Market Reports", href: "/resources/reports", desc: "Global commodity sourcing analysis" },
          { name: "Sourcing Webinars", href: "/resources/webinars", desc: "Live & on-demand panel discussions" },
        ],
      },
      {
        title: "Technical & Regulatory",
        items: [
          { name: "Whitepapers Library", href: "/resources/whitepapers", desc: "In-depth technical & compliance papers" },
          { name: "Regulatory Policy Guides", href: "/resources/guides", desc: "EUDR, CSDDD, & CSRD compliance steps" },
          { name: "API Documentation", href: "/resources/api-docs", desc: "Developer API endpoints & payload reference" },
          { name: "Video Tutorials", href: "/resources/videos", desc: "Product walkthroughs and field guides" },
        ],
      },
      {
        title: "Help & Support",
        items: [
          { name: "Platform FAQs", href: "/resources/faqs", desc: "Common questions about SourceTrace platform" },
          { name: "Developer Support", href: "/platform/connectivity/apis", desc: "Technical API & integration assistance" },
          { name: "Newsroom", href: "/resources/newsroom", desc: "Press releases and corporate announcements" },
        ],
      },
    ],
  },
  company: {
    id: "company",
    label: "Company",
    heading: "Digitizing the First-Mile",
    description: "Learn about our vision, leadership team, and global footprint across sourcing regions.",
    featured: {
      title: "First-Mile Impact Report",
      desc: "Delivering transparency and commercial value to over 2 million smallholders globally.",
      linkText: "Contact Our Team",
      link: "/contact",
    },
    groups: [
      {
        title: "About SourceTrace",
        items: [
          { name: "About SourceTrace", href: "/about", desc: "Our mission to digitize agricultural supply chains" },
          { name: "Leadership Team", href: "/company/meet-the-team", desc: "Meet executive leaders & agronomic advisors" },
          { name: "Global Presence", href: "/company/global-offices", desc: "Offices in North America, Asia, & Africa" },
          { name: "Newsroom & Press", href: "/resources/newsroom", desc: "Corporate announcements & press releases" },
        ],
      },
      {
        title: "Careers & Impact",
        items: [
          { name: "Careers", href: "/careers", desc: "Join our team in driving sustainable agriculture" },
          { name: "B Corp Audit Status", href: "/about", desc: "Verified social & environmental performance" },
          { name: "Sustainability Mission", href: "/solutions/sustainability", desc: "Empowering smallholder farm livelihoods" },
        ],
      },
      {
        title: "Get in Touch",
        items: [
          { name: "Contact Us", href: "/contact", desc: "Get in touch with customer support or sales" },
          { name: "Schedule a Demo", href: "/contact-sales", desc: "Book a personalized platform walkthrough" },
        ],
      },
    ],
  },
};

function UnifiedMegaMenuContent({ menuId, closeMenu }: { menuId: string; closeMenu: () => void }) {
  const data = UNIFIED_NAVIGATION_DATA[menuId] || UNIFIED_NAVIGATION_DATA.platform;

  return (
    <div className="max-w-[1360px] mx-auto px-8 py-6 flex gap-10 text-[#0B3D2E]">
      {/* Left Column (260px Fixed Width) */}
      <div className="w-[260px] shrink-0 pr-8 border-r border-gray-100 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1F7A53] mb-1.5 block">
            {data.label}
          </span>
          <h3 className="text-xl font-extrabold text-[#0B3D2E] tracking-tight mb-2">
            {data.heading}
          </h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
            {data.description}
          </p>
        </div>

        {/* Unified Featured Resource Card */}
        <Link
          href={data.featured.link}
          onClick={closeMenu}
          className="group block p-4 rounded-xl bg-gray-50/80 hover:bg-[#EBF7F0] border border-gray-100/80 hover:border-[#8CCB9B]/40 transition-all duration-150 shadow-sm"
        >
          <span className="text-[10px] font-extrabold text-[#1F7A53] uppercase tracking-wider block mb-1">
            Featured Resource
          </span>
          <h4 className="text-xs font-bold text-[#0B3D2E] leading-snug mb-1 group-hover:text-[#1F7A53] transition-colors">
            {data.featured.title}
          </h4>
          <p className="text-[11px] text-gray-500 leading-normal line-clamp-2 mb-2">
            {data.featured.desc}
          </p>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1F7A53] group-hover:translate-x-1 transition-transform">
            <span>{data.featured.linkText}</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>

      {/* Right Column (Organized Navigation Groups) */}
      <div className="flex-1 grid grid-cols-3 gap-8">
        {data.groups.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B3D2E]/70 mb-3 block border-b border-gray-100 pb-2">
              {group.title}
            </span>
            <div className="flex flex-col gap-1">
              {group.items.map((item, iIdx) => (
                <Link
                  key={iIdx}
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex flex-col py-1.5 px-2.5 -mx-2.5 rounded-lg hover:bg-[#EBF7F0]/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800 group-hover:text-[#0B3D2E] transition-colors">
                      {item.name}
                    </span>
                    <ChevronRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  {item.desc && (
                    <span className="text-[11px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors mt-0.5 truncate">
                      {item.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MegaMenu() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<"root" | "submenu">("root");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  /* Apple Settings Hierarchical Mobile Navigation States */
  const [mobileNavStack, setMobileNavStack] = useState<MobileNavStep[]>([
    { type: "root", title: "Menu" }
  ]);
  const [mobileSlideDir, setMobileSlideDir] = useState<number>(1);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  /* Tablet Split-Pane Selection State */
  const [tabletSelectedCategory, setTabletSelectedCategory] = useState("platform");

  const resetMobileNav = useCallback(() => {
    setMobileNavStack([{ type: "root", title: "Menu" }]);
    setMobileSlideDir(1);
    setMobileSearchQuery("");
  }, []);

  const pushMobileNav = (step: MobileNavStep) => {
    setMobileSlideDir(1);
    setMobileNavStack((prev) => [...prev, step]);
  };

  const popMobileNav = () => {
    if (mobileNavStack.length > 1) {
      setMobileSlideDir(-1);
      setMobileNavStack((prev) => prev.slice(0, -1));
    }
  };

  const currentStep = mobileNavStack[mobileNavStack.length - 1];

  const filteredSearchPages = mobileSearchQuery.trim()
    ? ALL_SEARCHABLE_PAGES.filter(
        (page) =>
          page.name.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
          page.category.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
          page.desc.toLowerCase().includes(mobileSearchQuery.toLowerCase())
      )
    : [];


  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

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
        resetMobileNav();
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
    resetMobileNav();
  }, [resetMobileNav]);

  const menuItems = [
    { id: "platform", label: "Platform", items: PLATFORM_LINKS, promo: MENU_PROMOS.platform },
    { id: "solutions", label: "Solutions", items: SOLUTIONS_LINKS, promo: MENU_PROMOS.solutions },
    { id: "industries", label: "Commodity Hub", items: INDUSTRIES_LINKS, promo: { title: "Commodity Explorer", desc: "Compare 500+ global agricultural commodities.", link: "/CommodityHub", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" } },
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
            <Link href="/" className="flex items-center gap-2" onClick={(e) => { handleLogoClick(e); setActiveMenu(null); setIsMobileOpen(false); }}>
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
            <UnifiedMegaMenuContent menuId={activeMenu} closeMenu={() => setActiveMenu(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    {/* ═══════════════════════════════════════════════════════════
        APPLE SETTINGS-INSPIRED MOBILE & TABLET NAVIGATION DRAWER
        Rendered OUTSIDE the <nav> to escape stacking context.
       ═══════════════════════════════════════════════════════════ */}
    <AnimatePresence>
      {isMobileOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
            style={{ zIndex: 9998 }}
          />

          {/* Navigation Drawer Container */}
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 right-0 lg:hidden overflow-hidden bg-white shadow-2xl flex flex-col"
            style={{
              zIndex: 9999,
              top: "0px",
              height: "100dvh",
              maxHeight: "100dvh",
            }}
          >
            {/* === Apple Header Bar === */}
            <div className="h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 bg-white border-b border-gray-100 shadow-sm relative z-20">
              {mobileNavStack.length > 1 ? (
                <button
                  onClick={popMobileNav}
                  className="flex items-center gap-1 text-[#1F7A53] hover:text-[#0B3D2E] font-semibold text-[15px] cursor-pointer active:scale-95 transition-all py-2 pr-2"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  <span>{mobileNavStack[mobileNavStack.length - 2]?.title || "Back"}</span>
                </button>
              ) : (
                <Link href="/" className="flex items-center gap-2" onClick={(e) => { handleLogoClick(e); closeMobile(); }}>
                  <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-9 sm:h-10 object-contain" />
                </Link>
              )}

              {/* Panel Title in Center */}
              {mobileNavStack.length > 1 && (
                <span className="text-[15px] sm:text-[16px] font-bold text-gray-900 truncate max-w-[150px] sm:max-w-[220px] text-center">
                  {currentStep.title}
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={closeMobile}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#0B3D2E] bg-gray-100/70 hover:bg-gray-100 transition-all focus:outline-none cursor-pointer active:scale-95"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* === Instant Search Bar at Top of Navigation Body === */}
            <div className="px-4 py-2.5 bg-white border-b border-gray-100 shrink-0 relative z-20">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  placeholder="Search all pages, tools & solutions..."
                  className="w-full pl-10 pr-9 py-2.5 bg-gray-100/80 hover:bg-gray-100 focus:bg-white text-sm text-gray-900 placeholder-gray-400 rounded-xl border border-transparent focus:border-[#8CCB9B] focus:ring-2 focus:ring-[#8CCB9B]/20 outline-none transition-all"
                />
                {mobileSearchQuery && (
                  <button
                    onClick={() => setMobileSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/60"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* === Instant Search Results View === */}
            {mobileSearchQuery.trim() !== "" ? (
              <div className="flex-1 overflow-y-auto overscroll-contain bg-white p-4">
                <div className="flex items-center justify-between px-1 mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {filteredSearchPages.length} {filteredSearchPages.length === 1 ? "Result" : "Results"} Found
                  </span>
                </div>
                {filteredSearchPages.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {filteredSearchPages.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={closeMobile}
                        className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-[#EBF7F0]/60 active:scale-[0.99] border border-gray-100 transition-all bg-white shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#8CCB9B]/20 flex items-center justify-center text-[#1F7A53] flex-shrink-0 font-bold text-xs">
                          {item.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[14px] font-bold text-gray-900 truncate">{item.name}</span>
                            <span className="text-[9px] font-bold text-[#1F7A53] bg-[#EBF7F0] px-2 py-0.5 rounded-full shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                      <Search className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">No matching pages found</p>
                    <p className="text-xs text-gray-400 mt-1">Try searching for coffee, EUDR, AI, or satellite...</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* ── TABLET TWO-PANE SPLIT LAYOUT (768px - 1023px) ── */}
                <div className="hidden md:flex lg:hidden flex-1 overflow-hidden bg-white">
                  {/* Left Sidebar Pane: Top-level Sections */}
                  <div className="w-[280px] border-r border-gray-100 bg-gray-50/50 p-4 flex flex-col gap-1.5 overflow-y-auto shrink-0">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-3 mb-2 block">
                      Navigation Sections
                    </span>
                    {menuItems.map((item) => {
                      const isSelected = tabletSelectedCategory === item.id;
                      const meta = MOBILE_CATEGORY_META[item.id];
                      const CategoryIcon = meta?.icon || ChevronRight;

                      return (
                        <button
                          key={item.id}
                          onClick={() => setTabletSelectedCategory(item.id)}
                          className={`w-full flex items-center gap-3 py-3 px-3.5 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white shadow-sm text-[#0B3D2E] font-bold border-l-4 border-[#1F7A53] pl-2.5"
                              : "text-gray-700 hover:bg-gray-100/70 font-medium"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-[#8CCB9B]/25 text-[#1F7A53]" : "bg-gray-200/60 text-gray-500"
                            }`}
                          >
                            <CategoryIcon className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] flex-1 truncate">{item.label}</span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? "text-[#1F7A53] translate-x-0.5" : "text-gray-300"
                            }`}
                          />
                        </button>
                      );
                    })}

                    <div className="mt-auto pt-4 border-t border-gray-200/60">
                      <Link
                        href="/contact-sales"
                        onClick={closeMobile}
                        className="block w-full py-3 text-center text-xs font-bold bg-[#0B3D2E] text-white hover:bg-[#1F7A53] rounded-xl transition-colors shadow-md active:scale-95"
                      >
                        Contact Sales
                      </Link>
                    </div>
                  </div>

                  {/* Right Pane: Unified Section Items Viewer */}
                  <div className="flex-1 p-6 overflow-y-auto bg-white">
                    {(() => {
                      const data = UNIFIED_NAVIGATION_DATA[tabletSelectedCategory] || UNIFIED_NAVIGATION_DATA.platform;
                      return (
                        <div className="flex flex-col gap-6">
                          <div className="border-b border-gray-100 pb-4">
                            <span className="text-[10px] font-extrabold text-[#1F7A53] uppercase tracking-wider block mb-1">
                              {data.label}
                            </span>
                            <h3 className="text-2xl font-black text-[#0B3D2E]">{data.heading}</h3>
                            <p className="text-xs text-gray-500 font-medium mt-1">{data.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            {data.groups.map((group, gIdx) => (
                              <div key={gIdx} className="flex flex-col">
                                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B3D2E]/70 mb-3 block border-b border-gray-100 pb-2">
                                  {group.title}
                                </span>
                                <div className="flex flex-col gap-1.5">
                                  {group.items.map((item, iIdx) => (
                                    <Link
                                      key={iIdx}
                                      href={item.href}
                                      onClick={closeMobile}
                                      className="group flex flex-col p-2.5 rounded-xl bg-white hover:bg-[#EBF7F0]/60 border border-gray-100 shadow-sm transition-all active:scale-[0.98]"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-800 group-hover:text-[#0B3D2E]">
                                          {item.name}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1F7A53]" />
                                      </div>
                                      {item.desc && (
                                        <span className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">
                                          {item.desc}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-4 border-t border-gray-100">
                            <Link
                              href={data.featured.link}
                              onClick={closeMobile}
                              className="group flex items-center justify-between p-4 rounded-2xl bg-[#EBF7F0]/60 hover:bg-[#EBF7F0] border border-[#8CCB9B]/30 transition-all shadow-sm active:scale-[0.98]"
                            >
                              <div>
                                <span className="text-[10px] font-extrabold text-[#1F7A53] uppercase tracking-wider block mb-0.5">
                                  Featured Resource
                                </span>
                                <h4 className="text-xs font-bold text-[#0B3D2E] group-hover:text-[#1F7A53] transition-colors">
                                  {data.featured.title}
                                </h4>
                              </div>
                              <div className="inline-flex items-center gap-1 text-xs font-bold text-[#1F7A53] group-hover:translate-x-1 transition-transform">
                                <span>{data.featured.linkText}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* ── MOBILE SINGLE-PANE APPLE SLIDING NAVIGATION (< 768px: md:hidden) ── */}
                <div className="block md:hidden flex-1 relative overflow-hidden bg-white">
                  <AnimatePresence mode="popLayout" custom={mobileSlideDir}>
                    {currentStep.type === "root" && (
                      <motion.div
                        key="root"
                        custom={mobileSlideDir}
                        variants={appleSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="w-full h-full overflow-y-auto overscroll-contain px-4 pt-3 pb-8 flex flex-col justify-between"
                      >
                        {/* Level 1 Items: Platform, Solutions, Commodity Hub, Customers, Partners, Resources, Company */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-3 mb-1.5 block">
                            Navigation Menu
                          </span>

                          {menuItems.map((item) => {
                            const meta = MOBILE_CATEGORY_META[item.id];
                            const CategoryIcon = meta?.icon || ChevronRight;

                            return (
                              <button
                                key={item.id}
                                onClick={() =>
                                  pushMobileNav({
                                    type: "category",
                                    id: item.id,
                                    title: item.label,
                                  })
                                }
                                className="w-full flex items-center gap-3.5 py-3.5 px-3.5 rounded-2xl text-left bg-white hover:bg-gray-50 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer active:scale-[0.98]"
                              >
                                <div
                                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta?.gradient || "from-gray-100 to-gray-50"} flex items-center justify-center shrink-0`}
                                >
                                  <CategoryIcon className="w-[19px] h-[19px]" style={{ color: meta?.color || "#1F7A53" }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[15px] font-semibold text-gray-900 block leading-snug">
                                    {item.label}
                                  </span>
                                  <span className="text-[11px] text-gray-400 font-medium truncate block mt-0.5">
                                    {item.id === "solutions"
                                      ? "Grow, Track, Protect, Scale"
                                      : item.id === "platform"
                                      ? "AI, Operations, Security & Arch"
                                      : `${item.items.length} sections`}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 stroke-[2.2]" />
                              </button>
                            );
                          })}
                        </div>

                        {/* Bottom CTA Button */}
                        <div className="mt-8 pt-4 border-t border-gray-100">
                          <Link
                            href="/contact-sales"
                            onClick={closeMobile}
                            className="block w-full py-3.5 text-center text-[14px] font-bold bg-[#0B3D2E] text-white hover:bg-[#1F7A53] rounded-xl transition-colors shadow-lg active:scale-[0.98]"
                          >
                            Contact Sales
                          </Link>
                        </div>
                      </motion.div>
                    )}

                    {/* Level 2: Category Panel */}
                    {currentStep.type === "category" && (
                      <motion.div
                        key={`category-${currentStep.id}`}
                        custom={mobileSlideDir}
                        variants={appleSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="w-full h-full overflow-y-auto overscroll-contain px-4 pt-3 pb-8"
                      >
                        {/* SPECIAL CASE: SOLUTIONS SCREEN -> ONLY GROW, TRACK, PROTECT, SCALE */}
                        {currentStep.id === "solutions" ? (
                          <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-2 mb-1 block">
                              Select Solution Pillar
                            </span>

                            {SOLUTIONS_LINKS.map((sol, solIdx) => {
                              const SolIcon = sol.icon || Leaf;
                              return (
                                <button
                                  key={solIdx}
                                  onClick={() =>
                                    pushMobileNav({
                                      type: "subGroup",
                                      categoryId: "solutions",
                                      subGroupId: sol.name.toLowerCase(),
                                      title: sol.name,
                                    })
                                  }
                                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#EBF7F0]/40 border border-gray-100 shadow-sm transition-all text-left cursor-pointer active:scale-[0.98]"
                                >
                                  <div className="w-12 h-12 rounded-xl bg-[#8CCB9B]/20 flex items-center justify-center text-[#1F7A53] shrink-0">
                                    <SolIcon className="w-6 h-6" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[16px] font-bold text-[#0B3D2E] block">
                                      {sol.name}
                                    </span>
                                    <span className="text-[12px] text-gray-500 font-medium block mt-0.5">
                                      {sol.desc}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-gray-300 shrink-0 stroke-[2.2]" />
                                </button>
                              );
                            })}
                          </div>
                        ) : currentStep.id === "industries" ? (
                          /* SPECIAL CASE: COMMODITY HUB MOBILE APPLE SETTINGS NAVIGATION */
                          <div className="flex flex-col gap-5">
                            <div>
                              <h3 className="text-xl font-bold text-[#0B3D2E] tracking-tight mb-1">
                                Commodity Intelligence Hub
                              </h3>
                              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Explore global agricultural commodities, regulations, sustainability frameworks and market intelligence.
                              </p>
                            </div>

                            {/* Section 1: Browse by Category */}
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2 block">
                                Browse by Category
                              </span>
                              <div className="flex flex-col gap-1.5">
                                {[
                                  { name: "Plantation Crops", icon: TreeDeciduous },
                                  { name: "Cereals & Grains", icon: Wheat },
                                  { name: "Oilseeds", icon: Droplets },
                                  { name: "Fruits", icon: Apple },
                                  { name: "Vegetables", icon: Carrot },
                                  { name: "Spices & Herbs", icon: Sprout },
                                  { name: "Forestry", icon: Trees },
                                  { name: "Aquaculture", icon: Fish },
                                  { name: "Livestock", icon: ShieldCheck },
                                  { name: "Beverage Crops", icon: Coffee },
                                ].map((cat, cIdx) => {
                                  const CatIcon = cat.icon;
                                  return (
                                    <button
                                      key={cIdx}
                                      onClick={() =>
                                        pushMobileNav({
                                          type: "subGroup",
                                          categoryId: "industries",
                                          subGroupId: cat.name.toLowerCase(),
                                          title: cat.name,
                                        })
                                      }
                                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#EBF7F0]/40 border border-gray-100 shadow-sm transition-all text-left cursor-pointer active:scale-[0.98]"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-[#8CCB9B]/20 flex items-center justify-center text-[#1F7A53] shrink-0">
                                          <CatIcon className="w-4 h-4 stroke-[2]" />
                                        </div>
                                        <span className="text-[14px] font-bold text-gray-900">{cat.name}</span>
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 stroke-[2.2]" />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Section 2: Featured Commodities */}
                            <div className="pt-3 border-t border-gray-100">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2.5 block">
                                Featured Commodities
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  { name: "Coffee", href: "/CommodityHub/coffee" },
                                  { name: "Palm Oil", href: "/CommodityHub/palm-oil" },
                                  { name: "Cocoa", href: "/CommodityHub/cocoa" },
                                  { name: "Rice", href: "/CommodityHub/rice" },
                                  { name: "Cotton", href: "/CommodityHub/cotton" },
                                  { name: "Tea", href: "/CommodityHub/tea" },
                                  { name: "Cashew", href: "/CommodityHub" },
                                  { name: "Rubber", href: "/CommodityHub" },
                                ].map((com, fIdx) => (
                                  <Link
                                    key={fIdx}
                                    href={com.href}
                                    onClick={closeMobile}
                                    className="px-3.5 py-1.5 rounded-full bg-gray-100/80 hover:bg-[#EBF7F0] text-gray-800 hover:text-[#0B3D2E] border border-gray-200/50 hover:border-[#8CCB9B]/50 text-xs font-semibold transition-all duration-150 active:scale-95"
                                  >
                                    {com.name}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Section 3: Quick Access */}
                            <div className="pt-3 border-t border-gray-100">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2 block">
                                Quick Access
                              </span>
                              <div className="flex flex-col gap-1.5">
                                {[
                                  { name: "Commodity Explorer", href: "/CommodityHub", icon: Compass },
                                  { name: "Country Profiles", href: "/company/global-offices", icon: Globe },
                                  { name: "Regulations & Policies", href: "/resources/guides", icon: FileText },
                                  { name: "Sustainability Standards", href: "/solutions/sustainability", icon: ShieldCheck },
                                  { name: "Market Intelligence", href: "/resources/reports", icon: BarChart3 },
                                  { name: "Satellite Insights", href: "/platform/intelligence", icon: Activity },
                                  { name: "Risk Maps", href: "/intelligence/geospatial-intelligence", icon: MapPin },
                                  { name: "Reports & Resources", href: "/resources/whitepapers", icon: BookOpen },
                                ].map((res, qIdx) => {
                                  const ResIcon = res.icon;
                                  return (
                                    <Link
                                      key={qIdx}
                                      href={res.href}
                                      onClick={closeMobile}
                                      className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#EBF7F0]/40 border border-gray-100 shadow-sm transition-all active:scale-[0.98]"
                                    >
                                      <div className="flex items-center gap-3">
                                        <ResIcon className="w-4 h-4 text-[#1F7A53] shrink-0" />
                                        <span className="text-[14px] font-bold text-gray-800">{res.name}</span>
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Section 4: Featured Resource */}
                            <div className="pt-3 border-t border-gray-100">
                              <Link
                                href="/resources/reports"
                                onClick={closeMobile}
                                className="group block p-4 rounded-2xl bg-[#EBF7F0]/60 hover:bg-[#EBF7F0] border border-[#8CCB9B]/30 hover:border-[#8CCB9B]/60 transition-all duration-200 shadow-sm active:scale-[0.98]"
                              >
                                <span className="text-[10px] font-extrabold text-[#1F7A53] uppercase tracking-wider block mb-1">
                                  Featured Resource
                                </span>
                                <h4 className="text-sm font-bold text-[#0B3D2E] leading-snug mb-1 group-hover:text-[#1F7A53] transition-colors">
                                  2026 Global Coffee Outlook
                                </h4>
                                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#1F7A53] group-hover:translate-x-1 transition-transform mt-2">
                                  <span>Read Report</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                              </Link>
                            </div>
                          </div>
                        ) : currentStep.id === "platform" || currentStep.id === "resources" ? (
                          /* Level 2 for Platform / Resources (Groups with subItems) */
                          <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-2 mb-1 block">
                              {currentStep.title} Sections
                            </span>
                            {((currentStep.id === "platform" ? PLATFORM_LINKS : RESOURCES_LINKS) as NavigationLink[]).map((link, lIdx) => {
                              const Icon = link.icon || Server;
                              return (
                                <button
                                  key={lIdx}
                                  onClick={() =>
                                    pushMobileNav({
                                      type: "subGroup",
                                      categoryId: currentStep.id,
                                      subGroupId: link.name.toLowerCase(),
                                      title: link.name,
                                    })
                                  }
                                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 shadow-sm transition-all text-left cursor-pointer active:scale-[0.98]"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-[#8CCB9B]/20 flex items-center justify-center text-[#1F7A53] shrink-0">
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[15px] font-bold text-gray-900 block">
                                      {link.name}
                                    </span>
                                    <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                                      {link.desc}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 stroke-[2.2]" />
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          /* Direct links for Customers, Partners, Company */
                          <div className="flex flex-col gap-2.5">
                            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-2 mb-1 block">
                              {currentStep.title} Pages
                            </span>
                            {(() => {
                              const catObj = menuItems.find((m) => m.id === currentStep.id);
                              const links = catObj?.items || [];
                              return links.map((link: NavigationLink, lIdx: number) => (
                                <Link
                                  key={lIdx}
                                  href={link.href}
                                  onClick={closeMobile}
                                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#EBF7F0]/40 border border-gray-100 shadow-sm transition-all active:scale-[0.98]"
                                >
                                  <div>
                                    <span className="text-[14px] font-bold text-[#0B3D2E] block">
                                      {link.name}
                                    </span>
                                    <span className="text-[11px] text-gray-500 font-medium block mt-0.5">
                                      {link.desc}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                                </Link>
                              ));
                            })()}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Level 3: Sub-Group Screen (e.g., Solutions -> Grow / Track / Protect / Scale) */}
                    {currentStep.type === "subGroup" && (
                      <motion.div
                        key={`subGroup-${currentStep.subGroupId}`}
                        custom={mobileSlideDir}
                        variants={appleSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="w-full h-full overflow-y-auto overscroll-contain px-4 pt-3 pb-8"
                      >
                        {(() => {
                          let parentGroup: NavigationLink | undefined;
                          if (currentStep.categoryId === "solutions") {
                            parentGroup = SOLUTIONS_LINKS.find((s) => s.name.toLowerCase() === currentStep.subGroupId);
                          } else if (currentStep.categoryId === "platform") {
                            parentGroup = PLATFORM_LINKS.find((s) => s.name.toLowerCase() === currentStep.subGroupId);
                          } else if (currentStep.categoryId === "resources") {
                            parentGroup = RESOURCES_LINKS.find((s) => s.name.toLowerCase() === currentStep.subGroupId);
                          } else if (currentStep.categoryId === "industries") {
                            // Sub-group category selected under Commodity Hub on Mobile
                            const catTitle = currentStep.title;
                            const relatedLinks = INDUSTRIES_LINKS.filter((item) => {
                              if (catTitle.includes("Beverage")) return ["Coffee", "Tea", "Cocoa"].includes(item.name);
                              if (catTitle.includes("Cereals")) return ["Rice"].includes(item.name);
                              if (catTitle.includes("Oilseeds")) return ["Palm Oil"].includes(item.name);
                              if (catTitle.includes("Plantation") || catTitle.includes("Forestry")) return ["Cotton"].includes(item.name);
                              return true;
                            });

                            return (
                              <div className="flex flex-col gap-3">
                                <Link
                                  href="/CommodityHub"
                                  onClick={closeMobile}
                                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#0B3D2E] to-[#1F7A53] text-white shadow-md transition-all active:scale-[0.98]"
                                >
                                  <div>
                                    <span className="text-[9px] font-bold text-[#53D769] uppercase tracking-widest block mb-0.5">
                                      Overview
                                    </span>
                                    <span className="text-base font-bold block">{catTitle}</span>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-[#53D769]" />
                                </Link>

                                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-2 mt-2 block">
                                  {catTitle} Commodities
                                </span>

                                <div className="flex flex-col gap-2">
                                  {relatedLinks.map((item, iIdx) => (
                                    <Link
                                      key={iIdx}
                                      href={item.href}
                                      onClick={closeMobile}
                                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#EBF7F0]/40 border border-gray-100 shadow-sm transition-all active:scale-[0.98]"
                                    >
                                      <div>
                                        <span className="text-sm font-bold text-gray-800 block">{item.name}</span>
                                        <span className="text-[11px] text-gray-500 block mt-0.5">{item.desc}</span>
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (!parentGroup) return null;

                          return (
                            <div className="flex flex-col gap-3">
                              {/* Main Overview Link */}
                              <Link
                                href={parentGroup.href}
                                onClick={closeMobile}
                                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#0B3D2E] to-[#1F7A53] text-white shadow-md transition-all active:scale-[0.98]"
                              >
                                <div>
                                  <span className="text-[9px] font-bold text-[#53D769] uppercase tracking-widest block mb-0.5">
                                    Overview
                                  </span>
                                  <span className="text-base font-bold block">{parentGroup.name} Solutions</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#53D769]" />
                              </Link>

                              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-2 mt-2 block">
                                Pages in {parentGroup.name}
                              </span>

                              <div className="flex flex-col gap-2">
                                {parentGroup.subItems?.map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={closeMobile}
                                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#EBF7F0]/40 border border-gray-100 shadow-sm transition-all active:scale-[0.98]"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-[#1F7A53]" />
                                      <span className="text-sm font-semibold text-gray-800">{sub.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
