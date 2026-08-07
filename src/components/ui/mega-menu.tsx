"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Leaf, Target, Map, Shield, Activity, Users, Database,
  Server, Smartphone, BookOpen, FileText, Briefcase, GraduationCap,
  ArrowRight, Menu, X, ArrowLeft, ChevronRight, MapPin, Compass,
  ShieldCheck, Fish, Trees, Carrot, Droplets, Wheat, TreeDeciduous,
  ChevronLeft, Zap, BarChart3, Globe, Lock, Sprout, Search, Apple, Coffee,
  ShoppingBag
} from "lucide-react";
import { Button } from "./button";
import { GlobalSearch } from "./global-search";


/* ═══════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   Calm, intentional motion. No bounce, no spring, no scale.
   ═══════════════════════════════════════════════════════════ */

const mobileSlideVariants = {
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


/* ═══════════════════════════════════════════════════════════
   NAVIGATION DATA
   ═══════════════════════════════════════════════════════════ */

export interface SolutionItem {
  name: string;
  href: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ALL_MERGED_SOLUTIONS: SolutionItem[] = [
  {
    name: "Farm Management",
    href: "/solutions/agriculture/farm-management",
    desc: "Digitize crop logs, field tasks & yield estimations",
    icon: Sprout,
  },
  {
    name: "Digital Advisory",
    href: "/solutions/agriculture/digital-advisory",
    desc: "Agronomic pest, disease & weather alerts",
    icon: Zap,
  },
  {
    name: "Crop Monitoring",
    href: "/solutions/agriculture/crop-monitoring",
    desc: "Phenology & satellite growth stage diagnostics",
    icon: Activity,
  },
  {
    name: "Supply Chain Traceability",
    href: "/solutions/traceability/supply-chain-traceability",
    desc: "First-mile to retail batch chain of custody tracing",
    icon: Map,
  },
  {
    name: "Digital Product Passport",
    href: "/solutions/traceability/digital-product-passport",
    desc: "EU-compliant digital product passports for buyers",
    icon: ShieldCheck,
  },
  {
    name: "QR Consumer Trust",
    href: "/solutions/traceability/qr-consumer-transparency",
    desc: "Scannable packaging origin stories & trust badges",
    icon: Globe,
  },
  {
    name: "EUDR Deforestation",
    href: "/compliance/eudr",
    desc: "Plot polygon screening against satellite alerts",
    icon: Shield,
  },
  {
    name: "Carbon Monitoring",
    href: "/solutions/sustainability/carbon-monitoring",
    desc: "Soil carbon & biomass MRV telemetry",
    icon: Leaf,
  },
  {
    name: "ESG Disclosures",
    href: "/solutions/sustainability/esg-reporting",
    desc: "CSRD, Scope 3 & sustainability disclosures",
    icon: FileText,
  },
  {
    name: "Sourcing Marketplace",
    href: "/solutions/supply-chain/marketplace",
    desc: "Connect verified growers with enterprise buyers",
    icon: ShoppingBag,
  },
  {
    name: "Farmer Payments",
    href: "/solutions/finance/farmer-payments",
    desc: "Direct mobile wallet disbursements & premiums",
    icon: BarChart3,
  },
  {
    name: "Agricultural Value Chain",
    href: "/solutions/agriculture",
    desc: "End-to-end integration across multi-tier value chains",
    icon: Server,
  },
  {
    name: "Carbon Farming",
    href: "/solutions/sustainability/carbon-farming",
    desc: "Incentivize regenerative soil practices & carbon credits",
    icon: Trees,
  },
  {
    name: "Farming System",
    href: "/solutions/agriculture/farming-system",
    desc: "Unified holistic farming practices & smart ag tech",
    icon: Database,
  },
  {
    name: "Food Safety Management",
    href: "/solutions/sustainability/food-safety",
    desc: "HACCP compliance, residue testing & quality control",
    icon: ShieldCheck,
  },
  {
    name: "Monitoring & Evaluation",
    href: "/solutions/sustainability/monitoring-evaluation",
    desc: "Track project impact, KPIs & field team performance",
    icon: Target,
  },
  {
    name: "Supply Chain Management",
    href: "/solutions/supply-chain",
    desc: "Optimize procurement, warehousing & logistics",
    icon: Compass,
  },
];

interface NavigationLink {
  name: string;
  href: string;
  desc: string;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: { name: string; href: string }[];
}

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


/* === Flattened Search Index for GlobalSearch === */
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

  // Solutions (Flat Merged List)
  ...ALL_MERGED_SOLUTIONS.map(sol => ({
    name: sol.name,
    href: sol.href,
    category: "Solutions",
    desc: sol.desc,
  })),

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


/* ═══════════════════════════════════════════════════════════
   UNIFIED NAVIGATION DATA
   ═══════════════════════════════════════════════════════════ */

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
          { name: "Developer SDK", href: "/platform/connectivity/sdk", desc: "JavaScript, Python, & Go libraries" },
          { name: "ERP Connectors", href: "/platform/connectivity/erp-connectors", desc: "SAP, Oracle, & NetSuite connectors" },
          { name: "Enterprise Security", href: "/platform/security/security", desc: "SOC2 Type II & bank-grade encryption" },
          { name: "Data Privacy", href: "/platform/security/privacy", desc: "GDPR outgrower PII consent management" },
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
      linkText: "Read Success Story",
      link: "/case-studies",
    },
    groups: [
      {
        title: "All Solutions",
        items: ALL_MERGED_SOLUTIONS.map(s => ({ name: s.name, href: s.href, desc: s.desc })),
      },
    ],
  },
  industries: {
    id: "industries",
    label: "Commodity Hub",
    heading: "Commodity Intelligence",
    description: "Explore global agricultural commodities, regulations, sustainability frameworks, and market intelligence.",
    featured: {
      title: "2026 Global Coffee Outlook",
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
          { name: "Fruits & Vegetables", href: "/CommodityHub", desc: "Banana, Citrus, Tropical" },
          { name: "Spices & Herbs", href: "/CommodityHub", desc: "Vanilla, Saffron, Pepper" },
          { name: "Beverage Crops", href: "/CommodityHub", desc: "Coffee, Cocoa, Tea" },
        ],
      },
      {
        title: "Featured Commodities",
        items: [
          { name: "Coffee", href: "/CommodityHub/coffee", desc: "Farm to roaster traceability" },
          { name: "Palm Oil", href: "/CommodityHub/palm-oil", desc: "NDPE deforestation-free" },
          { name: "Cocoa", href: "/CommodityHub/cocoa", desc: "Child labor prevention" },
          { name: "Rice", href: "/CommodityHub/rice", desc: "Paddy cultivation monitoring" },
          { name: "Cotton", href: "/CommodityHub/cotton", desc: "Organic & sustainable" },
          { name: "Tea", href: "/CommodityHub/tea", desc: "Fair trade tracking" },
        ],
      },
    ],
  },
  customers: {
    id: "customers",
    label: "Customers",
    heading: "Trusted Ecosystem",
    description: "See how cooperatives, agribusinesses, food brands, and certifiers use SourceTrace.",
    featured: {
      title: "Bayer Agri-Finance Case Study",
      linkText: "View Case Study",
      link: "/case-studies",
    },
    groups: [
      {
        title: "Commercial",
        items: [
          { name: "Agribusinesses", href: "/customers/agribusiness", desc: "Outgrower management & field tech" },
          { name: "Food & Beverage Brands", href: "/customers/food-brands", desc: "Scope 3 & EUDR compliance" },
          { name: "Commodity Exporters", href: "/customers/agribusiness", desc: "First-mile lot tracking" },
        ],
      },
      {
        title: "Public & Institutional",
        items: [
          { name: "Governments", href: "/customers/governments", desc: "National farmer registry mapping" },
          { name: "NGOs & Non-Profits", href: "/customers/ngos", desc: "Impact & livelihood tracking" },
          { name: "Financial Institutions", href: "/customers/financial-institutions", desc: "Agri-credit scoring" },
        ],
      },
      {
        title: "Audits & Standards",
        items: [
          { name: "Certification Bodies", href: "/customers/certification-bodies", desc: "Third-party audit evidence" },
          { name: "Cooperative Associations", href: "/customers/agribusiness", desc: "Member registries & payouts" },
        ],
      },
    ],
  },
  partners: {
    id: "partners",
    label: "Partners",
    heading: "Partner Ecosystem",
    description: "Connect, build, and deploy sustainability solutions through our global partner network.",
    featured: {
      title: "Alliance Partner Program",
      linkText: "Become a Partner",
      link: "/partners/become-a-partner",
    },
    groups: [
      {
        title: "Partner Types",
        items: [
          { name: "Technology Partners", href: "/partners/technology-partners", desc: "IoT & GIS integrations" },
          { name: "Implementation Partners", href: "/partners/channel-partners", desc: "Local sourcing deployments" },
          { name: "Consulting Partners", href: "/partners/consulting-partners", desc: "EUDR & ESG advisory" },
        ],
      },
      {
        title: "Join",
        items: [
          { name: "Become a Partner", href: "/partners/become-a-partner", desc: "Apply to join our alliance" },
          { name: "Developer Network", href: "/platform/connectivity/sdk", desc: "SDK docs & webhooks" },
        ],
      },
    ],
  },
  resources: {
    id: "resources",
    label: "Resources",
    heading: "Intelligence Library",
    description: "Explore whitepapers, API documents, regulatory policy briefs, and developer tools.",
    featured: {
      title: "EUDR Compliance Guide",
      linkText: "Download Guide",
      link: "/resources/whitepapers",
    },
    groups: [
      {
        title: "Insights",
        items: [
          { name: "Blog", href: "/resources/blog", desc: "Agronomic & sustainability insights" },
          { name: "Market Reports", href: "/resources/reports", desc: "Commodity sourcing analysis" },
          { name: "Webinars", href: "/resources/webinars", desc: "Live & on-demand panels" },
          { name: "Newsroom", href: "/resources/newsroom", desc: "Press & announcements" },
        ],
      },
      {
        title: "Technical",
        items: [
          { name: "Whitepapers", href: "/resources/whitepapers", desc: "Technical & compliance papers" },
          { name: "Regulatory Guides", href: "/resources/guides", desc: "EUDR, CSDDD, CSRD" },
          { name: "API Documentation", href: "/resources/api-docs", desc: "Endpoints & payload reference" },
          { name: "Video Tutorials", href: "/resources/videos", desc: "Product walkthroughs" },
        ],
      },
      {
        title: "Support",
        items: [
          { name: "FAQs", href: "/resources/faqs", desc: "Common questions" },
          { name: "Developer Support", href: "/platform/connectivity/apis", desc: "API & integration help" },
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
      linkText: "Contact Our Team",
      link: "/contact",
    },
    groups: [
      {
        title: "About",
        items: [
          { name: "About SourceTrace", href: "/about", desc: "Our mission & vision" },
          { name: "Leadership Team", href: "/company/meet-the-team", desc: "Executive leaders & advisors" },
          { name: "Global Presence", href: "/company/global-offices", desc: "Offices worldwide" },
          { name: "Newsroom", href: "/resources/newsroom", desc: "Press releases" },
        ],
      },
      {
        title: "Careers & Impact",
        items: [
          { name: "Careers", href: "/careers", desc: "Join our team" },
          { name: "Sustainability", href: "/solutions/sustainability", desc: "Smallholder empowerment" },
        ],
      },
      {
        title: "Contact",
        items: [
          { name: "Contact Us", href: "/contact", desc: "Support or sales inquiries" },
          { name: "Schedule a Demo", href: "/contact-sales", desc: "Personalized walkthrough" },
        ],
      },
    ],
  },
};


/* ═══════════════════════════════════════════════════════════
   UNIFIED MEGA MENU CONTENT
   ═══════════════════════════════════════════════════════════ */

function UnifiedMegaMenuContent({ menuId, closeMenu }: { menuId: string; closeMenu: () => void }) {
  const data = UNIFIED_NAVIGATION_DATA[menuId] || UNIFIED_NAVIGATION_DATA.platform;

  // Custom 3-column enterprise grid for Solutions menu (no sub-group headers)
  if (menuId === "solutions") {
    return (
      <div className="px-6 py-8 flex gap-12 text-[#1d1d1f] items-stretch" style={{ minHeight: "400px" }}>
        {/* Left Column — Fixed 220px (Featured) */}
        <motion.div
          className="w-[220px] shrink-0 flex flex-col justify-between border-r border-black/[0.04] pr-8"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.02, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#86868b] mb-2 block">
              {data.label}
            </span>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-3">
              {data.heading}
            </h3>
            <p className="text-sm text-[#86868b] font-normal leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Featured — plain text, separated by subtle border */}
          <div className="pt-6 mt-6 border-t border-black/[0.04]">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#86868b] block mb-1.5">
              Featured Case Study
            </span>
            <span className="text-sm font-medium text-[#1d1d1f] block mb-1">
              {data.featured.title}
            </span>
            <Link
              href={data.featured.link}
              onClick={closeMenu}
              className="group inline-flex items-center gap-1 text-sm text-[#1F7A53] hover:underline font-semibold"
            >
              <span>{data.featured.linkText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>

        {/* Right Side — Responsive 3-Column Enterprise Solution Grid */}
        <div className="flex-1 grid grid-cols-3 gap-x-4 gap-y-2.5 items-stretch">
          {ALL_MERGED_SOLUTIONS.map((sol, idx) => {
            const IconComponent = sol.icon || ChevronRight;
            return (
              <motion.div
                key={sol.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.02 + idx * 0.012,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link
                  href={sol.href}
                  onClick={closeMenu}
                  className="group flex items-start justify-between p-3 rounded-xl border border-transparent hover:border-[#1F7A53]/20 hover:bg-[#EAF5EE]/50 transition-all duration-200 h-full"
                >
                  <div className="flex gap-2.5 items-start">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center shrink-0 group-hover:bg-[#0B3D2E] group-hover:text-white transition-colors duration-200 mt-0.5">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1d1d1f] group-hover:text-[#1F7A53] transition-colors leading-snug block">
                        {sol.name}
                      </span>
                      <span className="text-[11px] text-[#86868b] leading-tight line-clamp-1 block mt-0.5">
                        {sol.desc}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1F7A53] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-1.5 mt-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 flex gap-16 text-[#1d1d1f] items-stretch" style={{ minHeight: '400px' }}>
      {/* Left Column — Fixed 220px */}
      <motion.div
        className="w-[220px] shrink-0 flex flex-col justify-between"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.02, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[#86868b] mb-2 block">
            {data.label}
          </span>
          <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-3">
            {data.heading}
          </h3>
          <p className="text-sm text-[#86868b] font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Featured — plain text, separated by subtle border */}
        <div className="pt-6 mt-6 border-t border-black/[0.04]">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#86868b] block mb-1.5">
            Featured
          </span>
          <span className="text-sm text-[#1d1d1f] block mb-1">
            {data.featured.title}
          </span>
          <Link
            href={data.featured.link}
            onClick={closeMenu}
            className="group inline-flex items-center gap-1 text-sm text-[#1F7A53] hover:underline"
          >
            <span>{data.featured.linkText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </motion.div>

      {/* Right Columns — Fixed 3-column grid with stagger */}
      <div className="flex-1 grid grid-cols-3 gap-10 items-start">
        {data.groups.map((group, gIdx) => (
          <motion.div
            key={gIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.06 + gIdx * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid"
            style={{ gridTemplateRows: '32px 1fr' }}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-[#86868b] self-end pb-2">
              {group.title}
            </span>
            <div className="flex flex-col gap-0">
              {group.items.map((item, iIdx) => (
                <Link
                  key={iIdx}
                  href={item.href}
                  onClick={closeMenu}
                  className="group block py-2"
                >
                  <span className="text-sm text-[#1d1d1f] group-hover:text-[#1F7A53] transition-colors duration-150 leading-snug">
                    {item.name}
                  </span>
                  {item.desc && (
                    <span className="block text-[11px] text-[#86868b] leading-snug mt-0.5">
                      {item.desc}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   MEGA MENU COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function MegaMenu() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [tabletSelectedCategory, setTabletSelectedCategory] = useState<string>("platform");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile navigation drill-down stack
  const [mobileNavStack, setMobileNavStack] = useState<MobileNavStep[]>([
    { type: "root", title: "Menu" },
  ]);
  const [mobileSlideDir, setMobileSlideDir] = useState<number>(1);

  const currentStep = mobileNavStack[mobileNavStack.length - 1];

  const pushMobileNav = (step: MobileNavStep) => {
    setMobileSlideDir(1);
    setMobileNavStack((prev) => [...prev, step]);
  };

  const popMobileNav = () => {
    setMobileSlideDir(-1);
    setMobileNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const menuItems = [
    { id: "platform", label: "Platform", items: PLATFORM_LINKS },
    { id: "solutions", label: "Solutions", items: ALL_MERGED_SOLUTIONS },
    { id: "industries", label: "Commodity Hub", items: INDUSTRIES_LINKS },
    { id: "customers", label: "Customers", items: CUSTOMERS_LINKS },
    { id: "partners", label: "Partners", items: PARTNERS_LINKS },
    { id: "resources", label: "Resources", items: RESOURCES_LINKS },
    { id: "company", label: "Company", items: COMPANY_LINKS },
  ];

  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMenu(id);
    // Close search overlay if mega menu is opened
    setIsSearchOpen(false);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const closeMenu = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMenu(null);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
    setMobileNavStack([{ type: "root", title: "Menu" }]);
  };

  // Prevent scroll when mobile menu is open
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

  // Handle logo click to trigger soft refresh if already on home page
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.04]"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={handleLogoClick}>
            <img
              src="/sourcetrace-logo.png"
              alt="SourceTrace"
              className="h-8 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* ─── DESKTOP NAVIGATION ITEMS ─── */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <div key={item.id} className="relative">
                  <button
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onClick={() => {
                      if (activeMenu === item.id) closeMenu();
                      else handleMouseEnter(item.id);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#1F7A53] bg-black/[0.03]"
                        : "text-[#1d1d1f] hover:text-[#1F7A53] hover:bg-black/[0.02]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#86868b] transition-transform duration-200 ${
                        isActive ? "rotate-180 text-[#1F7A53]" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Global Search Component */}
            <GlobalSearch
              isSearchOpen={isSearchOpen}
              onSearchOpen={() => setIsSearchOpen(true)}
              onSearchClose={() => setIsSearchOpen(false)}
              variant="desktop"
            />

            {/* Contact Sales CTA */}
            <Link href="/contact-sales" className="hidden sm:inline-flex">
              <Button
                size="sm"
                className="bg-[#0B3D2E] hover:bg-[#125c44] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Contact Sales
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 text-gray-700 hover:text-[#1F7A53] focus:outline-hidden cursor-pointer"
                aria-label="Toggle Navigation"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <line
                    x1="3"
                    y1="7"
                    x2="21"
                    y2="7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="origin-center transition-all duration-300"
                    style={{
                      transform: isMobileOpen ? "translateY(5px) rotate(45deg)" : "translateY(0) rotate(0)",
                    }}
                  />
                  <line
                    x1="3"
                    y1="12"
                    x2="21"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-opacity duration-200"
                    style={{ opacity: isMobileOpen ? 0 : 1 }}
                  />
                  <line
                    x1="3"
                    y1="17"
                    x2="21"
                    y2="17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="origin-center transition-all duration-300"
                    style={{
                      transform: isMobileOpen ? "translateY(-5px) rotate(-45deg)" : "translateY(0) rotate(0)",
                    }}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP MEGA MENU DROPDOWN ─── */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 right-0 bg-white border-b border-black/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.06)] hidden lg:block"
            style={{ top: "calc(100% - 1px)" }}
            onMouseEnter={handleDropdownEnter}
          >
            <div
              className={activeMenu === "solutions" ? "max-w-[1240px] mx-auto" : "max-w-[980px] mx-auto"}
              style={{ minHeight: "400px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMenu}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <UnifiedMegaMenuContent menuId={activeMenu} closeMenu={closeMenu} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
