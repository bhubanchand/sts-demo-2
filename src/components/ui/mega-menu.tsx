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
  ChevronLeft, Zap, BarChart3, Globe, Lock, Sprout, Search, Apple, Coffee
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


/* ═══════════════════════════════════════════════════════════
   UNIFIED NAVIGATION DATA
   One data structure. Every menu uses the same shape.
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
        title: "Grow",
        items: [
          { name: "Farm Management", href: "/solutions/agriculture/farm-management", desc: "Digitize crop logs & yield estimations" },
          { name: "Digital Advisory", href: "/solutions/agriculture/digital-advisory", desc: "Agronomic pest & weather alerts" },
          { name: "Crop Monitoring", href: "/solutions/agriculture/crop-monitoring", desc: "Phenology & growth stage tracking" },
        ],
      },
      {
        title: "Track",
        items: [
          { name: "Supply Chain Traceability", href: "/solutions/traceability/supply-chain-traceability", desc: "First-mile to retail origin tracing" },
          { name: "Digital Product Passport", href: "/solutions/traceability/digital-product-passport", desc: "EU-compliant digital product passports" },
          { name: "QR Consumer Trust", href: "/solutions/traceability/qr-consumer-transparency", desc: "Scannable packaging origin stories" },
        ],
      },
      {
        title: "Protect & Scale",
        items: [
          { name: "EUDR Deforestation", href: "/compliance/eudr", desc: "Satellite polygon screening" },
          { name: "Carbon Monitoring", href: "/solutions/sustainability/carbon-monitoring", desc: "Soil carbon & biomass MRV" },
          { name: "ESG Disclosures", href: "/solutions/sustainability/esg-reporting", desc: "CSRD & Scope 3 disclosures" },
          { name: "Sourcing Marketplace", href: "/solutions/supply-chain/marketplace", desc: "Connect growers with buyers" },
          { name: "Farmer Payments", href: "/solutions/finance/farmer-payments", desc: "Direct mobile money payouts" },
        ],
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
   Fixed grid. Staggered columns. Typography-first.
   ═══════════════════════════════════════════════════════════ */

function UnifiedMegaMenuContent({ menuId, closeMenu }: { menuId: string; closeMenu: () => void }) {
  const data = UNIFIED_NAVIGATION_DATA[menuId] || UNIFIED_NAVIGATION_DATA.platform;

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
   Premium interactions. Stable layout. Fluid transitions.
   ═══════════════════════════════════════════════════════════ */

export function MegaMenu() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  /* Mobile hierarchical navigation */
  const [mobileNavStack, setMobileNavStack] = useState<MobileNavStep[]>([
    { type: "root", title: "Menu" }
  ]);
  const [mobileSlideDir, setMobileSlideDir] = useState<number>(1);

  /* Tablet split-pane */
  const [tabletSelectedCategory, setTabletSelectedCategory] = useState("platform");

  const resetMobileNav = useCallback(() => {
    setMobileNavStack([{ type: "root", title: "Menu" }]);
    setMobileSlideDir(1);
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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        resetMobileNav();
      }
      return next;
    });
  }, [resetMobileNav]);

  useEffect(() => {
    if (isMobileOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen, isSearchOpen]);

  /* Smart hover: instant switch, delayed close */
  const handleMouseEnter = (menu: string) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutIdRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const handleDropdownEnter = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    resetMobileNav();
  }, [resetMobileNav]);

  const menuItems = [
    { id: "platform", label: "Platform", items: PLATFORM_LINKS },
    { id: "solutions", label: "Solutions", items: SOLUTIONS_LINKS },
    { id: "industries", label: "Commodity Hub", items: INDUSTRIES_LINKS },
    { id: "customers", label: "Customers", items: CUSTOMERS_LINKS },
    { id: "partners", label: "Partners", items: PARTNERS_LINKS },
    { id: "resources", label: "Resources", items: RESOURCES_LINKS },
    { id: "company", label: "Company", items: COMPANY_LINKS },
  ];

  const closeMenu = useCallback(() => setActiveMenu(null), []);

  return (
    <>
    {/* ─── BACKDROP: blurs page when mega menu is open ─── */}
    <AnimatePresence>
      {activeMenu && (
        <motion.div
          key="mega-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 hidden lg:block"
          style={{
            zIndex: 49,
            top: '48px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          onClick={closeMenu}
        />
      )}
    </AnimatePresence>

    {/* ─── DESKTOP NAVIGATION BAR ─── */}
    <nav
      className="fixed top-0 left-0 right-0 bg-[rgba(255,255,255,0.92)] backdrop-blur-xl border-b border-black/[0.04]"
      style={{ zIndex: 50 }}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`max-w-[980px] mx-auto px-6 transition-transform duration-200 ease-out origin-center ${!activeMenu ? "lg:scale-[1.04]" : "lg:scale-100"}`}>
        <div className="flex items-center justify-between h-[48px]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={(e) => { handleLogoClick(e); setActiveMenu(null); setIsMobileOpen(false); }}>
              <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-7 object-contain" />
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className={`hidden lg:flex items-center h-full transition-opacity duration-200 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <button
                  className={`px-3 py-1.5 text-xs transition-colors duration-200 whitespace-nowrap cursor-default ${
                    activeMenu === item.id
                      ? "text-[#1F7A53]"
                      : "text-[#1d1d1f] hover:text-[#1F7A53]"
                  }`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <GlobalSearch isSearchOpen={isSearchOpen} onSearchOpen={openSearch} onSearchClose={closeSearch} variant="desktop" />
            <Link
              href="/contact-sales"
              className={`transition-opacity duration-200 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <Button size="sm" className="h-7 px-4 rounded-full text-xs font-normal bg-[#0B3D2E] text-white hover:bg-[#1F7A53]">
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-1">
            <GlobalSearch isSearchOpen={isSearchOpen} onSearchOpen={openSearch} onSearchClose={closeSearch} variant="mobile" />
            <button
              onClick={toggleMobileMenu}
              className="relative w-10 h-10 flex items-center justify-center text-[#1d1d1f] focus:outline-none cursor-default"
              aria-label="Toggle menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="overflow-visible">
                <line x1="1" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ transform: isMobileOpen ? "translateY(4px) rotate(45deg)" : "translateY(0) rotate(0)", transformOrigin: "center" }}
                />
                <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  className="transition-opacity duration-200" style={{ opacity: isMobileOpen ? 0 : 1 }}
                />
                <line x1="1" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ transform: isMobileOpen ? "translateY(-4px) rotate(-45deg)" : "translateY(0) rotate(0)", transformOrigin: "center" }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP MEGA MENU DROPDOWN ─── */}
      {/* Fixed container. Stable dimensions. Content animates inside. */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 right-0 bg-white border-b border-black/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.06)] hidden lg:block"
            style={{ top: 'calc(100% - 1px)' }}
            onMouseEnter={handleDropdownEnter}
          >
            <div className="max-w-[980px] mx-auto" style={{ minHeight: '400px' }}>
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

    {/* ═══════════════════════════════════════════════════════════
        MOBILE & TABLET NAVIGATION
       ═══════════════════════════════════════════════════════════ */}
    <AnimatePresence>
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/20 lg:hidden"
            style={{ zIndex: 9998 }}
          />

          {/* Navigation Drawer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 lg:hidden bg-white flex flex-col"
            style={{ zIndex: 9999 }}
          >
            {/* Header Bar */}
            <div className="h-[48px] flex items-center justify-between px-5 flex-shrink-0 border-b border-black/[0.04]">
              {mobileNavStack.length > 1 ? (
                <button
                  onClick={popMobileNav}
                  className="flex items-center gap-0.5 text-[#1F7A53] text-sm cursor-default"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>{mobileNavStack[mobileNavStack.length - 2]?.title || "Back"}</span>
                </button>
              ) : (
                <Link href="/" className="flex items-center" onClick={(e) => { handleLogoClick(e); closeMobile(); }}>
                  <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-7 object-contain" />
                </Link>
              )}

              <button
                onClick={closeMobile}
                className="w-8 h-8 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-default"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <>
              {/* ── TABLET: Two-Pane (768px–1023px) ── */}
              <div className="hidden md:flex lg:hidden flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-[240px] border-r border-black/[0.04] py-6 px-5 flex flex-col overflow-y-auto shrink-0">
                  <div className="flex flex-col">
                    {menuItems.map((item) => {
                      const isSelected = tabletSelectedCategory === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setTabletSelectedCategory(item.id)}
                          className={`w-full text-left py-3 px-0 border-b border-black/[0.04] last:border-b-0 transition-colors duration-150 cursor-default ${
                            isSelected
                              ? "text-[#1F7A53] font-medium"
                              : "text-[#1d1d1f] hover:text-[#1F7A53]"
                          }`}
                        >
                          <span className="text-sm">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-6">
                    <Link href="/contact-sales" onClick={closeMobile} className="text-sm text-[#1F7A53] hover:underline">
                      Contact Sales →
                    </Link>
                  </div>
                </div>

                {/* Right Pane — animated content swap */}
                <div className="flex-1 py-8 px-8 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tabletSelectedCategory}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {(() => {
                        const data = UNIFIED_NAVIGATION_DATA[tabletSelectedCategory] || UNIFIED_NAVIGATION_DATA.platform;
                        return (
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wide text-[#86868b] block mb-2">
                              {data.label}
                            </span>
                            <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-1">
                              {data.heading}
                            </h3>
                            <p className="text-sm text-[#86868b] mb-8">
                              {data.description}
                            </p>

                            <div className="grid grid-cols-2 gap-10">
                              {data.groups.map((group, gIdx) => (
                                <div key={gIdx}>
                                  <span className="text-xs font-semibold uppercase tracking-wide text-[#86868b] mb-4 block">
                                    {group.title}
                                  </span>
                                  <div className="flex flex-col">
                                    {group.items.map((item, iIdx) => (
                                      <Link
                                        key={iIdx}
                                        href={item.href}
                                        onClick={closeMobile}
                                        className="group py-2.5 border-b border-black/[0.04] last:border-b-0"
                                      >
                                        <span className="text-sm text-[#1d1d1f] group-hover:text-[#1F7A53] transition-colors duration-150">
                                          {item.name}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Featured */}
                            <div className="mt-10 pt-6 border-t border-black/[0.04]">
                              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#86868b] block mb-1.5">
                                Featured
                              </span>
                              <span className="text-sm text-[#1d1d1f] block mb-1">{data.featured.title}</span>
                              <Link
                                href={data.featured.link}
                                onClick={closeMobile}
                                className="inline-flex items-center gap-1 text-sm text-[#1F7A53] hover:underline"
                              >
                                <span>{data.featured.linkText}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ── MOBILE: Single-Pane Sliding (< 768px) ── */}
              <div className="block md:hidden flex-1 relative overflow-hidden">
                <AnimatePresence mode="popLayout" custom={mobileSlideDir}>
                  {/* Level 1: Root */}
                  {currentStep.type === "root" && (
                    <motion.div
                      key="root"
                      custom={mobileSlideDir}
                      variants={mobileSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                      className="w-full h-full overflow-y-auto overscroll-contain px-6 pt-8 pb-10 flex flex-col justify-between"
                    >
                      <div className="flex flex-col gap-0">
                        {menuItems.map((item, idx) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.03 + idx * 0.025, ease: [0.25, 0.1, 0.25, 1] }}
                            onClick={() => pushMobileNav({ type: "category", id: item.id, title: item.label })}
                            className="w-full text-left py-3 border-b border-black/[0.04] last:border-b-0 cursor-default"
                          >
                            <span className="text-[28px] font-normal text-[#1d1d1f] leading-tight">
                              {item.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>

                      <motion.div
                        className="mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        <Link href="/contact-sales" onClick={closeMobile} className="text-base text-[#1F7A53]">
                          Contact Sales →
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Level 2: Category */}
                  {currentStep.type === "category" && (
                    <motion.div
                      key={`category-${currentStep.id}`}
                      custom={mobileSlideDir}
                      variants={mobileSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                      className="w-full h-full overflow-y-auto overscroll-contain px-6 pt-6 pb-10"
                    >
                      <motion.h2
                        className="text-2xl font-semibold text-[#1d1d1f] mb-6"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.04 }}
                      >
                        {currentStep.title}
                      </motion.h2>

                      {/* Solutions: show pillars */}
                      {currentStep.id === "solutions" ? (
                        <div className="flex flex-col">
                          {SOLUTIONS_LINKS.map((sol, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.06 + idx * 0.03 }}
                              onClick={() => pushMobileNav({
                                type: "subGroup",
                                categoryId: "solutions",
                                subGroupId: sol.name.toLowerCase(),
                                title: sol.name,
                              })}
                              className="w-full text-left py-4 border-b border-black/[0.04] last:border-b-0 flex items-center justify-between cursor-default"
                            >
                              <div>
                                <span className="text-[22px] font-normal text-[#1d1d1f] block">{sol.name}</span>
                                <span className="text-sm text-[#86868b] mt-0.5 block">{sol.desc}</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-[#86868b] shrink-0 ml-4" />
                            </motion.button>
                          ))}
                        </div>
                      ) : currentStep.id === "industries" ? (
                        /* Commodity Hub */
                        <div className="flex flex-col gap-8">
                          {UNIFIED_NAVIGATION_DATA.industries.groups.map((group, gIdx) => (
                            <motion.div
                              key={gIdx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.06 + gIdx * 0.035 }}
                            >
                              <span className="text-xs font-semibold uppercase tracking-wide text-[#86868b] mb-3 block">
                                {group.title}
                              </span>
                              <div className="flex flex-col">
                                {group.items.map((item, iIdx) => (
                                  <Link
                                    key={iIdx}
                                    href={item.href}
                                    onClick={closeMobile}
                                    className="py-3 border-b border-black/[0.04] last:border-b-0 flex items-center justify-between"
                                  >
                                    <span className="text-base text-[#1d1d1f]">{item.name}</span>
                                    <ChevronRight className="w-4 h-4 text-[#86868b] shrink-0" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : currentStep.id === "platform" || currentStep.id === "resources" ? (
                        /* Platform / Resources */
                        <div className="flex flex-col">
                          {((currentStep.id === "platform" ? PLATFORM_LINKS : RESOURCES_LINKS) as NavigationLink[]).map((link, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.06 + idx * 0.03 }}
                              onClick={() => pushMobileNav({
                                type: "subGroup",
                                categoryId: currentStep.id,
                                subGroupId: link.name.toLowerCase(),
                                title: link.name,
                              })}
                              className="w-full text-left py-4 border-b border-black/[0.04] last:border-b-0 flex items-center justify-between cursor-default"
                            >
                              <div>
                                <span className="text-[22px] font-normal text-[#1d1d1f] block">{link.name}</span>
                                <span className="text-sm text-[#86868b] mt-0.5 block">{link.desc}</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-[#86868b] shrink-0 ml-4" />
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        /* Direct links: Customers, Partners, Company */
                        <div className="flex flex-col">
                          {(() => {
                            const catObj = menuItems.find((m) => m.id === currentStep.id);
                            const links = catObj?.items || [];
                            return links.map((link: NavigationLink, idx: number) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: 0.06 + idx * 0.03 }}
                              >
                                <Link
                                  href={link.href}
                                  onClick={closeMobile}
                                  className="py-4 border-b border-black/[0.04] last:border-b-0 flex items-center justify-between block"
                                >
                                  <div>
                                    <span className="text-base text-[#1d1d1f] block">{link.name}</span>
                                    <span className="text-sm text-[#86868b] mt-0.5 block">{link.desc}</span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-[#86868b] shrink-0 ml-4" />
                                </Link>
                              </motion.div>
                            ));
                          })()}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Level 3: Sub-Group */}
                  {currentStep.type === "subGroup" && (
                    <motion.div
                      key={`subGroup-${currentStep.subGroupId}`}
                      custom={mobileSlideDir}
                      variants={mobileSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
                      className="w-full h-full overflow-y-auto overscroll-contain px-6 pt-6 pb-10"
                    >
                      {(() => {
                        let parentGroup: NavigationLink | undefined;
                        if (currentStep.categoryId === "solutions") {
                          parentGroup = SOLUTIONS_LINKS.find((s) => s.name.toLowerCase() === currentStep.subGroupId);
                        } else if (currentStep.categoryId === "platform") {
                          parentGroup = PLATFORM_LINKS.find((s) => s.name.toLowerCase() === currentStep.subGroupId);
                        } else if (currentStep.categoryId === "resources") {
                          parentGroup = RESOURCES_LINKS.find((s) => s.name.toLowerCase() === currentStep.subGroupId);
                        }

                        if (!parentGroup) return null;

                        return (
                          <div>
                            <motion.h2
                              className="text-xl font-semibold text-[#1d1d1f] mb-6"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.04 }}
                            >
                              {parentGroup.name}
                            </motion.h2>

                            {/* Overview link */}
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.06 }}
                            >
                              <Link
                                href={parentGroup.href}
                                onClick={closeMobile}
                                className="block py-4 border-b border-black/[0.04]"
                              >
                                <span className="text-base text-[#1F7A53]">
                                  {parentGroup.name} Overview →
                                </span>
                              </Link>
                            </motion.div>

                            {/* Sub-items */}
                            <div className="flex flex-col">
                              {parentGroup.subItems?.map((sub, sIdx) => (
                                <motion.div
                                  key={sIdx}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.25, delay: 0.08 + sIdx * 0.03 }}
                                >
                                  <Link
                                    href={sub.href}
                                    onClick={closeMobile}
                                    className="py-4 border-b border-black/[0.04] last:border-b-0 flex items-center justify-between block"
                                  >
                                    <span className="text-base text-[#1d1d1f]">{sub.name}</span>
                                    <ChevronRight className="w-4 h-4 text-[#86868b] shrink-0" />
                                  </Link>
                                </motion.div>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
