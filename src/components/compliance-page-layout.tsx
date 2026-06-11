"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Shield, ShieldAlert, Globe, Cpu, FileText, CheckCircle2, 
  ChevronRight, Sliders, Calendar, DollarSign, Leaf, Map, 
  Plus, Check, Sparkles, Upload, Loader2, ArrowRight, Activity, Layers, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
export interface Scene {
  title: string;
  description: string;
  visualType: string;
  visualPrompt: string;
  interactiveTitle: string;
  interactiveDetails?: string;
}

export interface CompliancePageData {
  category: string;
  title: string;
  description: string;
  heroText?: string;
  scenes: Scene[];
}

interface Props {
  data: CompliancePageData;
}

export function CompliancePageLayout({ data }: Props) {
  const [activeScene, setActiveScene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const category = data.category.toLowerCase();
  const isComplianceOverview = category.includes("compliance overview");
  const isCbam = category.includes("cbam");
  const isCsrd = category.includes("csrd");
  const isEsrs = category.includes("esrs");
  const isEudr = category.includes("eudr");
  const isForestRisk = category.includes("forest risk") || category.includes("forest-risk");
  const isScope3 = category.includes("scope 3") || category.includes("scope-3");
  const isSustainability = (category.includes("sustainability") || category.includes("sustainability compliance")) && !isComplianceOverview;

  // Custom widget states (scoped per scene index)
  const [activeRegs, setActiveRegs] = useState<Record<number, string>>({});
  const getActiveReg = (idx: number) => activeRegs[idx] || "EUDR";
  const setActiveReg = (idx: number, val: string) => setActiveRegs(p => ({ ...p, [idx]: val }));

  const [hoveredCards, setHoveredCards] = useState<Record<number, string | null>>({});
  const getHoveredCard = (idx: number) => hoveredCards[idx] || null;
  const setHoveredCard = (idx: number, val: string | null) => setHoveredCards(p => ({ ...p, [idx]: val }));

  const [selectedNodes, setSelectedNodes] = useState<Record<number, string>>({});
  const getSelectedNode = (idx: number) => selectedNodes[idx] || "Farmer Polygon";
  const setSelectedNode = (idx: number, val: string) => setSelectedNodes(p => ({ ...p, [idx]: val }));

  const [eudrYears, setEudrYears] = useState<Record<number, number>>({});
  const getEudrYear = (idx: number) => eudrYears[idx] || 2021;
  const setEudrYear = (idx: number, val: number) => setEudrYears(p => ({ ...p, [idx]: val }));

  const [selectedCommodities, setSelectedCommodities] = useState<Record<number, string>>({});
  const getSelectedCommodity = (idx: number) => selectedCommodities[idx] || "Cocoa";
  const setSelectedCommodity = (idx: number, val: string) => setSelectedCommodities(p => ({ ...p, [idx]: val }));

  const [selectedCountries, setSelectedCountries] = useState<Record<number, string>>({});
  const getSelectedCountry = (idx: number) => selectedCountries[idx] || "Brazil";
  const setSelectedCountry = (idx: number, val: string) => setSelectedCountries(p => ({ ...p, [idx]: val }));

  const [cargoVolumes, setCargoVolumes] = useState<Record<number, number>>({});
  const getCargoVolume = (idx: number) => cargoVolumes[idx] || 100;
  const setCargoVolume = (idx: number, val: number) => setCargoVolumes(p => ({ ...p, [idx]: val }));

  const [verticesMap, setVerticesMap] = useState<Record<number, { x: number; y: number }[]>>({});
  const getVertices = (idx: number) => verticesMap[idx] || [];
  const setVertices = (idx: number, val: { x: number; y: number }[]) => setVerticesMap(p => ({ ...p, [idx]: val }));

  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>({});
  const getSliderPos = (idx: number) => sliderPositions[idx] || 50;
  const setSliderPos = (idx: number, val: number) => setSliderPositions(p => ({ ...p, [idx]: val }));

  const materialityItems = [
    { name: "Coffee Sourcing", financial: 80, impact: 85 },
    { name: "Packaging Waste", financial: 40, impact: 65 },
    { name: "Office Emissions", financial: 15, impact: 25 },
    { name: "Cocoa Biodiversity", financial: 85, impact: 90 },
  ];

  const [selectedMatItems, setSelectedMatItems] = useState<Record<number, string>>({});
  const getSelectedMatItem = (idx: number) => selectedMatItems[idx] || "Coffee Sourcing";
  const setSelectedMatItem = (idx: number, val: string) => setSelectedMatItems(p => ({ ...p, [idx]: val }));

  const [scope3Percents, setScope3Percents] = useState<Record<number, number>>({});
  const getScope3Percent = (idx: number) => scope3Percents[idx] || 60;
  const setScope3Percent = (idx: number, val: number) => setScope3Percents(p => ({ ...p, [idx]: val }));

  const [parserStatuses, setParserStatuses] = useState<Record<number, "idle" | "parsing" | "completed">>({});
  const getParserStatus = (idx: number) => parserStatuses[idx] || "idle";
  const setParserStatus = (idx: number, val: "idle" | "parsing" | "completed") => setParserStatuses(p => ({ ...p, [idx]: val }));

  const [parsedFieldsMap, setParsedFieldsMap] = useState<Record<number, any>>({});
  const getParsedFields = (idx: number) => parsedFieldsMap[idx] || null;
  const setParsedFields = (idx: number, val: any) => setParsedFieldsMap(p => ({ ...p, [idx]: val }));

  const [nitrogenReductions, setNitrogenReductions] = useState<Record<number, number>>({});
  const getNitrogenReduction = (idx: number) => nitrogenReductions[idx] || 20;
  const setNitrogenReduction = (idx: number, val: number) => setNitrogenReductions(p => ({ ...p, [idx]: val }));

  const [soilDepths, setSoilDepths] = useState<Record<number, number>>({});
  const getSoilDepth = (idx: number) => soilDepths[idx] || 30;
  const setSoilDepth = (idx: number, val: number) => setSoilDepths(p => ({ ...p, [idx]: val }));

  const [selectedRegions, setSelectedRegions] = useState<Record<number, string>>({});
  const getSelectedRegion = (idx: number) => selectedRegions[idx] || "Ivory Coast";
  const setSelectedRegion = (idx: number, val: string) => setSelectedRegions(p => ({ ...p, [idx]: val }));

  const [payAmounts, setPayAmounts] = useState<Record<number, number>>({});
  const getPayAmount = (idx: number) => payAmounts[idx] || 1250;
  const setPayAmount = (idx: number, val: number) => setPayAmounts(p => ({ ...p, [idx]: val }));

  const [payStatuses, setPayStatuses] = useState<Record<number, "idle" | "processing" | "success">>({});
  const getPayStatus = (idx: number) => payStatuses[idx] || "idle";
  const setPayStatus = (idx: number, val: "idle" | "processing" | "success") => setPayStatuses(p => ({ ...p, [idx]: val }));

  // CTA Demo Form states
  const [ctaStatuses, setCtaStatuses] = useState<Record<number, "idle" | "submitting" | "success">>({});
  const [ctaName, setCtaName] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaCompany, setCtaCompany] = useState("");

  // Forest loss ticker state (incremented in real-time)
  const [forestLoss, setForestLoss] = useState(14820490);
  useEffect(() => {
    const timer = setInterval(() => {
      setForestLoss(p => p + Math.floor(Math.random() * 5) + 2);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Context-specific Data Helpers
  const getNetworkNodes = (sceneIdx: number) => {
    const title = data.scenes[sceneIdx]?.title || "";
    
    if (isCbam) {
      return [
        { name: "Supplier Plant", desc: "Chemical Plant #4 - scope emissions mapped" },
        { name: "Carbon Footprint", desc: "Primary Scope 1 & 2 carbon footprint calculation logged" },
        { name: "DATAGREEN Cloud", desc: "EU ETS carbon tariff gap verified" },
        { name: "XML Registry Dossier", desc: "CBAM XML report formatted and generated" },
      ];
    }
    
    if (isEsrs && title.toLowerCase().includes("connectivity")) {
      return [
        { name: "Forest Patch A", desc: "5.2 Hectares high-conservation forest canopy" },
        { name: "Migration Corridor", desc: "25m wide shade-tree connectivity link mapped" },
        { name: "Forest Patch B", desc: "3.8 Hectares native forest area" },
        { name: "Ecosystem Integrity", desc: "Wildlife movement corridor verified active" },
      ];
    }
    
    if (isForestRisk && title.toLowerCase().includes("agroforestry")) {
      return [
        { name: "Monoculture Plot", desc: "High soil erosion, low carbon capture" },
        { name: "Shade Tree Canopy", desc: "Tall mahogany & banana shade crops planted" },
        { name: "Understory Crops", desc: "Organic coffee & cocoa bushes integrated" },
        { name: "Agroforestry Yield", desc: "Verified multi-tier crops, high soil organic carbon" },
      ];
    }
    
    if (isSustainability && title.toLowerCase().includes("database")) {
      return [
        { name: "Cooperative APIs", desc: "Direct connection to Chetna and NEI organic portals" },
        { name: "Field Mobile Uploads", desc: "Offline GPS coordinates from localized field agents" },
        { name: "Verification Engine", desc: "AI automated certificate checks and carbon validation" },
        { name: "Unified Dashboard", desc: "Audit-ready corporate ESG reports compiled in one click" },
      ];
    }

    if (isComplianceOverview && title.toLowerCase().includes("engine")) {
      return [
        { name: "Field Polygons", desc: "Farm coordinate maps logged by local co-ops" },
        { name: "Supply Chain Ledger", desc: "Custody transactions and shipping bill matches" },
        { name: "DATAGREEN Engine", desc: "Continuous satellite sweeps and certificate parsing" },
        { name: "Customs Dossier", desc: "EU TRACES and CBAM XML compliance files compiled" },
      ];
    }

    if (isCsrd || isEsrs || isScope3 || isSustainability) {
      return [
        { name: "Farmer Survey", desc: "Smallholder practices and fertilizer logs mapped" },
        { name: "Sourcing Hub", desc: "Batch #8942 - Carbon footprint and organic checks done" },
        { name: "DATAGREEN Cloud", desc: "Scope 3 emissions consolidated automatically" },
        { name: "ESG Report Export", desc: "Audit-ready ESRS E1 and GHG disclosure exported" },
      ];
    }

    if (isForestRisk) {
      return [
        { name: "Farmer Polygon", desc: "1.4 Hectares Mapped Cocoa, Nov 2025" },
        { name: "Canopy Sweep", desc: "Biomass density and deforestation baseline checks" },
        { name: "Ecosystem Score", desc: "Agroforestry carbon sequestration index generated" },
        { name: "Compliance Certificate", desc: "FSC aligned zero-deforestation cert compiled" },
      ];
    }

    // Default EUDR nodes
    return [
      { name: "Farmer Polygon", desc: "1.4 Hectares Coffee, mapped Nov 2025" },
      { name: "Sourcing Hub", desc: "Batch #8942 - Organic Certified, deforestation cleared" },
      { name: "DATAGREEN Cloud", desc: "Embedded emissions and compliance verified" },
      { name: "Registry Export", desc: "EU Customs TRACES file compiled successfully" },
    ];
  };

  const getGridData = (sceneIdx: number) => {
    const title = data.scenes[sceneIdx]?.title || "";

    if (isSustainability && (title.toLowerCase().includes("transaction") || title.toLowerCase().includes("coordinate") || title.toLowerCase().includes("search"))) {
      return {
        options: ["Batch #8942", "Batch #8943", "Batch #8944", "Batch #8945"],
        details: {
          "Batch #8942": "Volume: 12.4 MT. Quality Grade: A. Payment status: Completed via Mobile Payout.",
          "Batch #8943": "Volume: 8.2 MT. Quality Grade: B+. Payment status: Processing via Local Co-op.",
          "Batch #8944": "Volume: 15.0 MT. Quality Grade: A. Payment status: Escrow Held for Quality Check.",
          "Batch #8945": "Volume: 6.8 MT. Quality Grade: A+. Payment status: Completed via Mobile Payout."
        }
      };
    }
    
    if (isCbam) {
      return {
        options: ["Nitrogen", "Ammonia", "Urea", "Nitric Acid"],
        details: {
          "Nitrogen": "Direct Scope 1 plant-level verification required for raw nitrogen imports.",
          "Ammonia": "High-temperature industrial processing emissions tracking required for batch clearances.",
          "Urea": "Embedded carbon dioxide checks from chemical manufacturing and shipping loops.",
          "Nitric Acid": "N2O greenhouse gas monitoring aligned with EU ETS border specifications."
        }
      };
    }
    
    if (isCsrd || isEsrs) {
      return {
        options: ["ESRS E1", "ESRS E4", "ESRS S1", "ESRS G1"],
        details: {
          "ESRS E1": "Scope 1, 2, 3 carbon footprint tracing, SBTi target alignment, and climate mitigation reporting.",
          "ESRS E4": "Supply chain biodiversity checks, zero land conversion mapping, and ecosystem impact disclosures.",
          "ESRS S1": "Smallholder livelihoods surveys, fair value chain transfers, and labor safety checks.",
          "ESRS G1": "Corporate anti-corruption codes, supplier screening policies, and risk management."
        }
      };
    }

    if (isScope3) {
      if (title.toLowerCase().includes("practice") || title.toLowerCase().includes("checkbox")) {
        return {
          options: ["Fertilizer", "Reduced Tillage", "Water Mgmt", "Cover Crops"],
          details: {
            "Fertilizer": "Organic compost transition reduces Scope 3 N2O emissions by 40%.",
            "Reduced Tillage": "Zero-till conservation locks carbon in soil layers.",
            "Water Mgmt": "Drip irrigation reduces methane and fuel pump emissions.",
            "Cover Crops": "Leguminous cover crops capture nitrogen and sequester carbon."
          }
        };
      } else {
        return {
          options: ["Sourcing", "Transport", "Process", "Use Phase"],
          details: {
            "Sourcing": "Primary carbon footprint data collected from farm coordinate polygon boundaries.",
            "Transport": "Logistics ocean shipping and trucking transport fuel emissions factor verification.",
            "Process": "Roasting, milling, and processing facility energy grid factors.",
            "Use Phase": "Downstream product lifecycle usage carbon emission values calculations."
          }
        };
      }
    }

    if (isForestRisk) {
      return {
        options: ["Soy", "Beef", "Palm Oil", "Timber"],
        details: {
          "Soy": "Cerrado farm polygons, land conversion ban certification, and GM vs non-GM verification.",
          "Beef": "Cattle ranch polygons, slaughterhouse tracking, and pasture clearing baseline audits.",
          "Palm Oil": "Sentinel canopy checks, peatland drainage restrictions, and RSPO certifications.",
          "Timber": "FSC logging boundaries, supply chain transit permits, and wood species validations."
        }
      };
    }

    // Default EUDR
    return {
      options: ["Cocoa", "Coffee", "Palm Oil", "Soy"],
      details: {
        "Cocoa": "West African polygon files, child labor checks, Rainforest Alliance audit match.",
        "Coffee": "Latin American smallholder elevation polygons, Fairtrade tracing, organic certificates.",
        "Palm Oil": "High Resolution Sentinel monitoring, peatland drainage restrictions, RSPO alignment.",
        "Soy": "Cerrado farm polygons, land conversion ban certification, GM vs non-GM verification."
      }
    };
  };

  const getRiskHeatmapData = (sceneIdx: number) => {
    const title = data.scenes[sceneIdx]?.title || "";

    if (isCbam) {
      return {
        label: "Chemical Origin",
        countries: ["China", "Russia", "India", "Norway"],
        metricLabel: "Carbon Intensity",
        tariffLabel: "Carbon Tariff",
        getValue: (c: string) => c === "China" || c === "Russia" ? "2.92 kg/kg" : c === "India" ? "1.84 kg/kg" : "0.12 kg/kg",
        getTariff: (c: string, v: number) => `$${(v * (c === "China" ? 220 : c === "Russia" ? 180 : c === "India" ? 120 : 10)).toLocaleString()}`,
        isHighRisk: (c: string) => c === "China" || c === "Russia" || c === "India"
      };
    }

    if (isEsrs && (title.toLowerCase().includes("proximity") || title.toLowerCase().includes("natura"))) {
      return {
        label: "Protected Area Zone",
        countries: ["Natura 2000 Buffer", "National Park boundary", "State Forest edge", "Wildlife Corridor"],
        metricLabel: "Buffer Proximity",
        tariffLabel: "Encroachment Risk",
        getValue: (c: string) => c === "Natura 2000 Buffer" ? "0.05 km" : c === "National Park boundary" ? "0.15 km" : c === "State Forest edge" ? "1.20 km" : "5.40 km",
        getTariff: (c: string, v: number) => c === "Natura 2000 Buffer" || c === "National Park boundary" ? "HIGH (Alert)" : "LOW (Ok)",
        isHighRisk: (c: string) => c === "Natura 2000 Buffer" || c === "National Park boundary"
      };
    }

    if (isCsrd || isEsrs || isScope3 || isSustainability) {
      return {
        label: "Sourcing Origin",
        countries: ["India", "Indonesia", "Kenya", "Spain"],
        metricLabel: "Scope 3 Factor",
        tariffLabel: "Annual Footprint",
        getValue: (c: string) => c === "India" || c === "Indonesia" ? "3.2 kg CO2/kg" : c === "Kenya" ? "1.8 kg CO2/kg" : "0.4 kg CO2/kg",
        getTariff: (c: string, v: number) => `${(v * (c === "India" ? 3.2 : c === "Kenya" ? 1.8 : 0.4)).toFixed(1)} tCO2e`,
        isHighRisk: (c: string) => c === "India" || c === "Indonesia"
      };
    }

    // Default EUDR countries
    return {
      label: "Origin Country",
      countries: ["Brazil", "Ivory Coast", "Colombia", "France"],
      metricLabel: "Inspection Rate",
      tariffLabel: "Risk Tariff",
      getValue: (c: string) => c === "Brazil" || c === "Ivory Coast" ? "9.0%" : c === "Colombia" ? "3.0%" : "1.0%",
      getTariff: (c: string, v: number) => `$${(v * (c === "Brazil" ? 45 : c === "Colombia" ? 15 : 5)).toLocaleString()}`,
      isHighRisk: (c: string) => c === "Brazil" || c === "Ivory Coast"
    };
  };

  const getGpsPolygonData = (sceneIdx: number) => {
    const title = data.scenes[sceneIdx]?.title || "";

    if (isCbam) {
      return {
        label: "Trace Plant Coordinates",
        note: "Click grid to trace manufacturing facility boundaries",
        resultLabel: "Total Facility Area:",
        factor: 0.45,
        suffix: " acres"
      };
    }

    if (isEsrs && (title.toLowerCase().includes("biodiversity") || title.toLowerCase().includes("buffer"))) {
      return {
        label: "Map Biodiversity Buffer",
        note: "Click grid to map buffer zone bordering farm polygon",
        resultLabel: "Conservation Buffer Area:",
        factor: 0.85,
        suffix: " ha"
      };
    }

    if (isCsrd || isEsrs || isScope3 || isSustainability) {
      return {
        label: "Map Smallholder Boundary",
        note: "Click grid to chart agroforestry coordinates",
        resultLabel: "Agroforestry Area:",
        factor: 1.25,
        suffix: " ha"
      };
    }

    if (isForestRisk) {
      return {
        label: "Map Forest Plot Boundary",
        note: "Click grid to place forest-risk farm polygon coordinates",
        resultLabel: "Total Mapped Forest Plot:",
        factor: 1.50,
        suffix: " ha"
      };
    }

    // Default EUDR
    return {
      label: "Map Sourcing Polygon",
      note: "Click grid to place farm polygon boundaries (max 6 points)",
      resultLabel: "Total Hectares Mapped:",
      factor: 1.84,
      suffix: " ha"
    };
  };

  const getSatelliteSliderData = (sceneIdx: number) => {
    const title = data.scenes[sceneIdx]?.title || "";

    if (title.toLowerCase().includes("polygon") || title.toLowerCase().includes("gis")) {
      return {
        label: "GIS Boundary Validation Slider",
        startLabel: "Raw GPS Coordinates",
        endLabel: "Clean Calculated Polygon"
      };
    }

    if (isCbam) {
      return {
        label: "Carbon Footprint Sweep",
        startLabel: "High-Carbon Production",
        endLabel: "Verified Low-Carbon Actuals"
      };
    }

    if (isEsrs && title.toLowerCase().includes("habitat")) {
      return {
        label: "GIS Habitat Classification Swipe",
        startLabel: "Agricultural Crops",
        endLabel: "Natural Habitat"
      };
    }

    if (isForestRisk && title.toLowerCase().includes("loss")) {
      return {
        label: "Forest Canopy Loss Comparison",
        startLabel: "Year 2000 Forest Canopy",
        endLabel: "Cleared Agricultural Land"
      };
    }

    if (isForestRisk && title.toLowerCase().includes("peel")) {
      return {
        label: "Biomass Canopy Layer Peel",
        startLabel: "Upper Canopy (Dense)",
        endLabel: "Understory Layer (Peeled)"
      };
    }

    if (isSustainability && title.toLowerCase().includes("dashboard")) {
      return {
        label: "Dashboard Sourcing Module Toggle",
        startLabel: "Procurement & Payments",
        endLabel: "Emissions Profile"
      };
    }

    if (isCsrd || isEsrs || isScope3 || isSustainability) {
      return {
        label: "Agroforestry Canopy Sweep",
        startLabel: "Monoculture Sourcing",
        endLabel: "Agroforestry Shade Trees"
      };
    }

    // Default EUDR
    return {
      label: "Deforestation Split-Screen Slider",
      startLabel: "Pre-2020 Forest Canopy",
      endLabel: "Agricultural Conversion"
    };
  };

  const getDocumentParserData = (sceneIdx: number) => {
    const title = data.scenes[sceneIdx]?.title || "";

    if (isCbam) {
      return {
        docType: "Supplier Carbon Audit XML",
        farmEntity: "SinoChem Fert Plant #4",
        statusText: "VERIFIED",
        expiryText: "CBAM Registry Dec 2026",
        uploadLabel: "Upload emissions declaration"
      };
    }

    if (isCsrd && title.toLowerCase().includes("cert")) {
      return {
        docType: "Fairtrade / Organic Certificate",
        farmEntity: "Coop Organic Farmers",
        statusText: "AUDITED & VALID",
        expiryText: "Fairtrade Standard 2026",
        uploadLabel: "Upload Fairtrade or Organic Cert"
      };
    }

    if (isSustainability && title.toLowerCase().includes("cert")) {
      return {
        docType: "GlobalG.A.P. Standard Cert",
        farmEntity: "Unified Sourcing Coop",
        statusText: "CERTIFIED OK",
        expiryText: "GlobalG.A.P. 2026",
        uploadLabel: "Upload GlobalG.A.P. certificate"
      };
    }

    if (isScope3 && title.toLowerCase().includes("report")) {
      return {
        docType: "GHG Protocol Scope 3 Report",
        farmEntity: "DATAGREEN Sourcing Hub",
        statusText: "AUDIT READY",
        expiryText: "GHG LSR Standard v1.2",
        uploadLabel: "Compile Sourcing Carbon Data"
      };
    }

    if (isCsrd || isEsrs) {
      return {
        docType: "Supplier ESG Compliance Survey",
        farmEntity: "Coop Agricola Central",
        statusText: "COMPLIANT",
        expiryText: "SBTi FY2026",
        uploadLabel: "Upload supplier ESG survey"
      };
    }

    if (isForestRisk) {
      return {
        docType: "FSC Timber Certificate",
        farmEntity: "Borneo Agro Forestry Ltd",
        statusText: "VERIFIED CLEAN",
        expiryText: "FSC Dec 2027",
        uploadLabel: "Upload forestry certificate"
      };
    }

    if (isScope3) {
      return {
        docType: "Primary Carbon Receipt",
        farmEntity: "Finca La Esmeralda",
        statusText: "S3 VERIFIED",
        expiryText: "GHG FY2026",
        uploadLabel: "Upload farm carbon receipt"
      };
    }

    // Default EUDR
    return {
      docType: "Rainforest Alliance Cert",
      farmEntity: "Finca Santa Maria",
      statusText: "APPROVED",
      expiryText: "Dec 2026",
      uploadLabel: "Upload mock supplier certificate"
    };
  };

  const getCarbonCalculatorData = (sceneIdx: number) => {
    const s1 = getNitrogenReduction(sceneIdx) || 20;
    const s2 = getSoilDepth(sceneIdx) || 30;
    const title = data.scenes[sceneIdx]?.title || "";

    if (isCbam) {
      return {
        label: "Embedded Carbon Calculator",
        slider1Label: "Electricity Coal Grid %",
        slider2Label: "Plant Energy Efficiency %",
        slider1Min: 0, slider1Max: 100,
        slider2Min: 10, slider2Max: 90,
        resultLabel: "Embedded Emissions:",
        value: `${((s1 * 0.024) + ((100 - s2) * 0.038)).toFixed(2)}`,
        unit: "tCO2/ton fertilizer",
        titleLabel: "Carbon Intensity Factor",
        slider1Suffix: "% coal",
        slider2Suffix: "% efficiency",
      };
    }

    if (isEsrs) {
      if (title.toLowerCase().includes("space")) {
        const pct = (s1 / s2) * 100;
        return {
          label: "Space for Nature Conservation Calculator",
          slider1Label: "Managed Natural Area (ha)",
          slider2Label: "Total Farm Plot Area (ha)",
          slider1Min: 0, slider1Max: 50,
          slider2Min: 10, slider2Max: 100,
          resultLabel: "Natural Habitat Ratio:",
          value: `${pct.toFixed(1)}%`,
          unit: pct >= 10 ? "COMPLIANT" : "INSUFFICIENT",
          titleLabel: "Space for Nature Ratio",
          slider1Suffix: " ha",
          slider2Suffix: " ha",
        };
      } else {
        const val = 250 * (1 - s1 / 100) - (s2 * 1.5);
        return {
          label: "E1 Climate Disclosure Calculator",
          slider1Label: "Nitrogen Fertilizer reduction %",
          slider2Label: "Carbon Removal actions %",
          slider1Min: 0, slider1Max: 100,
          slider2Min: 0, slider2Max: 100,
          resultLabel: "Estimated Sourcing Emissions:",
          value: `${val.toFixed(1)}`,
          unit: "tCO2e/yr",
          titleLabel: "ESRS E1 Carbon Footprint",
          slider1Suffix: "% reduction",
          slider2Suffix: "% removals",
        };
      }
    }

    if (isCsrd) {
      return {
        label: "CSRD Compliance checklist completeness",
        slider1Label: "Disclosure Scope 3 %",
        slider2Label: "Audit Ready Verification %",
        slider1Min: 0, slider1Max: 100,
        slider2Min: 0, slider2Max: 100,
        resultLabel: "Compliance Score:",
        value: `${((s1 * 0.6) + (s2 * 0.4)).toFixed(0)}%`,
        unit: "Ready",
        titleLabel: "CSRD Readiness Index",
        slider1Suffix: "% complete",
        slider2Suffix: "% verified",
      };
    }

    if (isScope3) {
      return {
        label: "Soil Organic Carbon Sequestration Calculator",
        slider1Label: "Cover Crop Biomass (ton/ha)",
        slider2Label: "Soil Clay content %",
        slider1Min: 1, slider1Max: 10,
        slider2Min: 5, slider2Max: 50,
        resultLabel: "Est. SOC Sequestration:",
        value: `${((s1 * 0.6) + (s2 * 0.15)).toFixed(2)}`,
        unit: "tCO2e/ha/yr",
        titleLabel: "Yield Sequestration Index",
        slider1Suffix: " ton/ha",
        slider2Suffix: "% clay",
      };
    }

    if (isForestRisk) {
      const val = Math.min(38.0, (s1 * 4.2) + (s2 * 0.18));
      return {
        label: "Soil Sequestration Calculator",
        slider1Label: "Organic Matter %",
        slider2Label: "Soil Profile Depth (cm)",
        slider1Min: 1, slider1Max: 10,
        slider2Min: 10, slider2Max: 100,
        resultLabel: "CO2 Offset Potential:",
        value: `${val.toFixed(1)}`,
        unit: "tCO2e/yr (Max 38.0)",
        titleLabel: "CO2 Offset Potential",
        slider1Suffix: "% OM",
        slider2Suffix: " cm depth",
      };
    }

    if (isEudr) {
      return {
        label: "Canopy Integrity Score",
        slider1Label: "Smallholder Coordinates Mapped %",
        slider2Label: "Sentinel Validation Check %",
        slider1Min: 0, slider1Max: 100,
        slider2Min: 0, slider2Max: 100,
        resultLabel: "Canopy Integrity Score:",
        value: `${((s1 * 0.5) + (s2 * 0.5)).toFixed(0)}%`,
        unit: "Cleared",
        titleLabel: "Canopy Integrity Score",
        slider1Suffix: "% mapped",
        slider2Suffix: "% cleared",
      };
    }

    return {
      label: "Sequestration Potential Calculator",
      slider1Label: "Fertilizer Use",
      slider2Label: "Soil Measurement",
      slider1Min: 0, slider1Max: 50,
      slider2Min: 10, slider2Max: 100,
      resultLabel: "Sequestration Potential:",
      value: `${((s1 * 0.44) + (s2 * 0.22)).toFixed(2)}`,
      unit: "tCO2e/ha/yr",
      titleLabel: "Yield Sequestration Index",
      slider1Suffix: `-${s1}% fertilizer`,
      slider2Suffix: `${s2} cm depth`,
    };
  };

  const getSourcingSelectorData = (sceneIdx: number) => {
    let regions = ["Ivory Coast", "Colombia", "Vietnam"];
    let label = "Sourcing Region Carbon Footprints";
    
    if (isCbam) {
      regions = ["China", "Russia", "Norway"];
      label = "Chemical Sourcing Grid Factors";
    } else if (isCsrd || isEsrs || isScope3 || isSustainability) {
      regions = ["Germany", "France", "Poland"];
      label = "European Supplier Grid Factors";
    }

    const activeRegion = getSelectedRegion(sceneIdx) || regions[0];
    
    let carbonFactor = "3.12 kg/kg";
    let verificationMethod = "Aggregated Reports";

    if (isCbam) {
      if (activeRegion === "China") {
        carbonFactor = "3.24 kg/kg";
        verificationMethod = "Direct Stack Emissions audit";
      } else if (activeRegion === "Russia") {
        carbonFactor = "2.12 kg/kg";
        verificationMethod = "Direct Stack Emissions audit";
      } else {
        carbonFactor = "0.15 kg/kg";
        verificationMethod = "Hydro Energy Grid audit";
      }
    } else if (isCsrd || isEsrs || isScope3 || isSustainability) {
      if (activeRegion === "Germany") {
        carbonFactor = "0.85 kg/kg";
        verificationMethod = "Tier 1 Supplier Audit";
      } else if (activeRegion === "France") {
        carbonFactor = "0.42 kg/kg";
        verificationMethod = "Nuclear Grid actuals";
      } else {
        carbonFactor = "1.25 kg/kg";
        verificationMethod = "Cooperative Survey Match";
      }
    } else {
      if (activeRegion === "Ivory Coast") {
        carbonFactor = "2.84 kg/kg";
        verificationMethod = "Tier 3 GPS Polygons";
      } else if (activeRegion === "Colombia") {
        carbonFactor = "1.95 kg/kg";
        verificationMethod = "Direct GIS Overlay";
      }
    }

    return {
      regions,
      label,
      activeRegion,
      carbonFactor,
      verificationMethod
    };
  };

  const getMaterialityItems = (sceneIdx: number) => {
    if (isCbam) {
      return [
        { name: "Fertilizer Carbon", financial: 80, impact: 90 },
        { name: "Grid Electricity", financial: 60, impact: 55 },
        { name: "Factory Fuel", financial: 40, impact: 70 },
        { name: "Logistics Fuel", financial: 25, impact: 35 },
      ];
    }
    if (isEudr || isForestRisk) {
      return [
        { name: "Canopy Integrity", financial: 90, impact: 95 },
        { name: "Buffer Zones", financial: 50, impact: 65 },
        { name: "Planting logs", financial: 30, impact: 40 },
        { name: "Audit Trail", financial: 85, impact: 80 },
      ];
    }
    return materialityItems;
  };

  // Track active scene based on which scrolly-scene is closest to the viewport center
  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(".scrolly-scene");
    if (elements.length === 0) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const elements = containerRef.current.querySelectorAll(".scrolly-scene");
          if (elements.length === 0) return;

          // Check if at the very top of the page first for quick boundary reset
          const isAtTop = window.scrollY <= 100;

          if (isAtTop) {
            setActiveScene(0);
          } else {
            const viewportCenter = window.innerHeight / 2;
            let closestIndex = 0;
            let minDistance = Infinity;

            elements.forEach((el, idx) => {
              const rect = el.getBoundingClientRect();
              const elementCenter = rect.top + rect.height / 2;
              const distance = Math.abs(elementCenter - viewportCenter);
              if (distance < minDistance) {
                minDistance = distance;
                closestIndex = idx;
              }
            });

            setActiveScene(closestIndex);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [data.scenes]);

  // Determine image source based on visualType to render high-fidelity assets
  const getImageSrc = (visualType: string) => {
    switch (visualType) {
      case "network-nodes":
      case "gps-polygon":
        return "/assets/traceability-diagram.png";
      case "sourcing-selector":
      case "payment-simulator":
      case "document-parser":
        return "/assets/esg-dashboard.png";
      case "satellite-slider":
      case "eudr-scrubber":
      case "risk-heatmap":
      case "materiality-quadrant":
      case "scope3-slider":
      case "carbon-calculator":
        return "/assets/ai-graph.png";
      default:
        return null;
    }
  };

  // Custom Interactive Tool Renderer based on visualType
  const renderInteractiveTool = (visualType: string, sceneIndex: number) => {
    switch (visualType) {
      case "regulatory-timeline": {
        if (isForestRisk && sceneIndex === 0) {
          return (
            <div className="w-full p-1 text-center">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5 font-mono">Live Tropical Forest Loss Ticker</span>
              <div className="bg-red-50/50 border border-red-200 rounded-xl p-3 shadow-inner">
                <span className="text-xl font-mono font-black text-red-650">
                  {forestLoss.toLocaleString()} m²
                </span>
                <span className="block text-[9px] text-red-550 mt-1 font-light">
                  Estimated forest canopy converted to agriculture since Jan 1, 2026.
                </span>
              </div>
            </div>
          );
        }

        if (isSustainability && sceneIndex === 0) {
          return (
            <div className="w-full p-1 text-left">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5 font-mono">Sourcing Data Gaps Check</span>
              <div className="space-y-1.5">
                {[
                  { id: "sheets", label: "Scattered legacy spreadsheets" },
                  { id: "paper", label: "Disjointed hand-written paper logs" },
                  { id: "files", label: "Messy local code & PDF files" }
                ].map(gap => (
                  <label key={gap.id} className="flex items-center gap-2 text-[10px] bg-gray-50 p-1.5 rounded-lg border border-gray-150 cursor-pointer hover:bg-gray-100">
                    <input type="checkbox" defaultChecked className="rounded text-[#0B3D2E] focus:ring-[#0B3D2E]" />
                    <span className="text-gray-750 font-medium">{gap.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }

        if (isScope3 && sceneIndex === 0) {
          return (
            <div className="w-full p-1 text-left">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5 font-mono font-bold">Select Sourcing Boundary</span>
              <div className="grid grid-cols-2 gap-1.5">
                {["Chetna Organic, India", "NEI Coop, Uganda", "Latin Coffee, Peru", "Cacao West, Ghana"].map(b => (
                  <button key={b} className="py-1.5 px-2 text-[9px] font-bold rounded-lg border bg-gray-50 text-gray-550 border-gray-200 hover:bg-gray-100 cursor-pointer text-left flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A53] animate-pulse" />
                    {b}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        let options = ["EUDR", "CSRD", "CBAM"];
        if (isCbam) options = ["Transitional", "Definitive", "Default Penalties"];
        else if (isCsrd || isEsrs) options = ["ESRS E1", "ESRS E4", "ESRS S1"];
        else if (isForestRisk) options = ["HCV Areas", "Intact Baselines", "Restoration"];
        else if (isScope3) options = ["SBTi FLAG", "GHG Protocol", "Supplier Verts"];
        else if (isSustainability) options = ["GRI Disclosures", "SASB reporting", "ESG Targets"];

        const activeOption = getActiveReg(sceneIndex) || options[0];

        return (
          <div className="w-full p-1">
            <div className="flex gap-2 mb-3 bg-gray-100 p-1 rounded-xl">
              {options.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setActiveReg(sceneIndex, reg)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    (getActiveReg(sceneIndex) === reg || (!getActiveReg(sceneIndex) && reg === options[0])) 
                      ? "bg-[#0B3D2E] text-white shadow" 
                      : "text-gray-500 hover:text-gray-800 cursor-pointer"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
            <div className="text-xs bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
              {/* CBAM Timeline */}
              {isCbam && (
                <div>
                  {activeOption === "Transitional" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Oct 2023 - Dec 2025 Transition</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Quarterly reporting of embedded emissions in fertilizer, steel, aluminum imports. No financial tariffs yet.</p>
                    </div>
                  )}
                  {activeOption === "Definitive" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Jan 1, 2026 Definitive Phase</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Importers must purchase CBAM certificates matching embedded emissions. Strict validation and verification by certified auditors.</p>
                    </div>
                  )}
                  {activeOption === "Default Penalties" && (
                    <div>
                      <p className="font-bold text-red-600 mb-0.5">Penalization Risk</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Default carbon emission values assigned to imports. Results in massive tariff surcharges and border delays.</p>
                    </div>
                  )}
                </div>
              )}

              {/* CSRD/ESRS Timeline */}
              {(isCsrd || isEsrs) && (
                <div>
                  {activeOption === "ESRS E1" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">E1 Climate Change Standard</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Mandatory disclosure of Scope 1, 2, and 3 emissions, decarbonization pathways, and SBTi carbon reduction alignment.</p>
                    </div>
                  )}
                  {activeOption === "ESRS E4" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">E4 Biodiversity & Ecosystems</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Disclosure of supply chain impacts on land conversion, forest protection, habitat degradation, and raw material sourcing.</p>
                    </div>
                  )}
                  {activeOption === "ESRS S1" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">S1 Own Workforce & Social Value</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Reporting on smallholder fair livelihoods, working conditions, child labor prevention, and cooperative inclusion.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Forest Risk Timeline */}
              {isForestRisk && (
                <div>
                  {activeOption === "HCV Areas" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">High Conservation Value Mapping</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Identify and map primary forests, critical habitats, and native vegetation zones bordering smallholder farms.</p>
                    </div>
                  )}
                  {activeOption === "Intact Baselines" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Zero Conversion Threshold</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Establish satellite canopies before cut-off baselines, validating that zero forest conversions occurred on mapped farm borders.</p>
                    </div>
                  )}
                  {activeOption === "Restoration" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Agroforestry Corridors</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Trace carbon sink restoration projects, shade crop implementations, and smallholder biodiversity gains.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Scope 3 Timeline */}
              {isScope3 && (
                <div>
                  {activeOption === "SBTi FLAG" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Forest, Land & Agriculture Targets</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">SBTi FLAG requires companies to set specific targets for carbon sequestration and zero land conversion emissions.</p>
                    </div>
                  )}
                  {activeOption === "GHG Protocol" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">LSR Accounting Standard</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Land Sector and Removals Guidance governs how agricultural soil carbon, fertilizers, and deforestation are accounted.</p>
                    </div>
                  )}
                  {activeOption === "Supplier Verts" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Primary Sourcing Audits</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Move from high-level country emission estimates to farm-level polygon audits, reducing database uncertainty.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Sustainability Timeline */}
              {isSustainability && (
                <div>
                  {activeOption === "GRI Disclosures" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">GRI 300 Environmental Series</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Standardized metrics for materials, energy, biodiversity, emissions, waste, and environmental supplier compliance.</p>
                    </div>
                  )}
                  {activeOption === "SASB reporting" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Agricultural Products Standard</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">ESG disclosure indicators focusing on sourcing sustainability, water consumption, and social management of smallholders.</p>
                    </div>
                  )}
                  {activeOption === "ESG Targets" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Unified ESG Consolidation</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Trace corporate progress against Net-Zero targets by aggregating verified sourcing data from cooperative supply nodes.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Default EUDR Timeline */}
              {!isCbam && !isCsrd && !isEsrs && !isForestRisk && !isScope3 && !isSustainability && (
                <div>
                  {activeOption === "EUDR" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Dec 30, 2025 Enforcement</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Required geocoordinate polygon mapping for soy, beef, palm oil, cocoa, coffee, rubber, wood. Penalty: Up to 4% of annual EU turnover.</p>
                    </div>
                  )}
                  {activeOption === "CSRD" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Fiscal Year 2025 Reporting</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Companies must disclose environmental and social value chain impacts. Double Materiality assessment mandated for Scope 3.</p>
                    </div>
                  )}
                  {activeOption === "CBAM" && (
                    <div>
                      <p className="font-bold text-[#0B3D2E] mb-0.5">Jan 1, 2026 Definitive Phase</p>
                      <p className="text-gray-650 text-[11px] leading-relaxed font-light">Importers must purchase CBAM certificates matching embedded emissions in fertilizers, steel, cement. Strict verification rules.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      case "split-screen": {
        let leftTitle = "Legacy Manual";
        let leftDesc = "Self-reported PDF audits, manual spreadsheets, deforestation verification lags. Rejection risk: High.";
        let rightTitle = "DATAGREEN System";
        let rightDesc = "Polygons linked to blockchain custody ledger, instant compliance certificates. Clearance: 100%.";

        if (isCbam) {
          leftTitle = "Default Estimates";
          leftDesc = "Default carbon intensities assigned to chemical imports. High carbon tax penalization. Rejection risk: High.";
          rightTitle = "DATAGREEN Actuals";
          rightDesc = "Primary supplier emissions tracking, minimized carbon adjustments under ETS. Clearance: 100%.";
        } else if (isSustainability) {
          leftTitle = "Manual Consolidation";
          leftDesc = "Scattered spreadsheets, email surveys, and manual calculations. Sourcing data latency: Weeks. Audit Warning risk: High.";
          rightTitle = "DATAGREEN Consolidated";
          rightDesc = "Direct API hooks to cooperative portals, automated Scope 3 footprint aggregation. Sourcing latency: Real-time.";
        } else if (isCsrd || isEsrs || isScope3) {
          leftTitle = "Legacy Audits";
          leftDesc = "Fragmented supplier surveys, secondary database carbon estimates, lack of verified Scope 3 proof. Audit risk: High.";
          rightTitle = "DATAGREEN Consolidated";
          rightDesc = "Audit-ready Scope 3 carbon ledger, verified organic certs, direct smallholder tracking. Audit clearance: 100%.";
        }

        return (
          <div className="grid grid-cols-2 gap-3 w-full p-1">
            <div
              onMouseEnter={() => setHoveredCard(sceneIndex, "manual")}
              onMouseLeave={() => setHoveredCard(sceneIndex, null)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                getHoveredCard(sceneIndex) === "manual" ? "bg-red-50 border-red-200 shadow-sm" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-1.5 text-red-600 mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">{leftTitle}</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-normal font-light">
                {leftDesc}
              </p>
            </div>

            <div
              onMouseEnter={() => setHoveredCard(sceneIndex, "digital")}
              onMouseLeave={() => setHoveredCard(sceneIndex, null)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                getHoveredCard(sceneIndex) === "digital" ? "bg-emerald-50 border-emerald-200 shadow-sm" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[#1F7A53] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">{rightTitle}</span>
              </div>
              <p className="text-[10px] text-gray-550 leading-normal font-light">
                {rightDesc}
              </p>
            </div>
          </div>
        );
      }

      case "network-nodes": {
        const nodes = getNetworkNodes(sceneIndex);
        const activeNode = getSelectedNode(sceneIndex) || nodes[0].name;

        return (
          <div className="w-full p-1">
            <div className="flex flex-col gap-1">
              {nodes.map((node) => (
                <button
                  key={node.name}
                  onClick={() => setSelectedNode(sceneIndex, node.name)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all text-xs border ${
                    (getSelectedNode(sceneIndex) === node.name || (!getSelectedNode(sceneIndex) && node.name === nodes[0].name)) 
                      ? "bg-emerald-50/50 border-emerald-300 cursor-pointer" 
                      : "bg-gray-50 border-gray-150 cursor-pointer"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    (getSelectedNode(sceneIndex) === node.name || (!getSelectedNode(sceneIndex) && node.name === nodes[0].name)) 
                      ? "bg-[#1F7A53] animate-pulse" 
                      : "bg-gray-300"
                  }`} />
                  <div>
                    <p className="font-bold text-gray-800 text-[10px] leading-none">{node.name}</p>
                    {(getSelectedNode(sceneIndex) === node.name || (!getSelectedNode(sceneIndex) && node.name === nodes[0].name)) && (
                      <p className="text-gray-550 mt-0.5 font-light text-[9px] leading-tight">{node.desc}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      }

      case "eudr-scrubber": {
        let label = "Scrub Deforestation Timeline";
        let minVal = 2020;
        let maxVal = 2026;
        let labelStart = "2020 (Cut-Off)";
        let labelMid = "2023";
        let labelEnd = "2026";
        const activeVal = getEudrYear(sceneIndex) || 2021;

        if (isCbam) {
          label = "Scrub ETS Carbon Price Timeline";
          labelStart = "2020 (€25)";
          labelMid = "2023 (€85)";
          labelEnd = "2026 (€100+)";
        } else if (isCsrd || isEsrs || isScope3 || isSustainability) {
          label = "Scope 3 Target Milestone Scrubber";
          labelStart = "2020 (Base)";
          labelMid = "2023 (Review)";
          labelEnd = "2026 (40% Cut)";
        }

        return (
          <div className="w-full p-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase text-gray-400">{label}</span>
              <span className="text-xs font-black text-[#1F7A53] bg-emerald-50 px-2 py-0.5 rounded">{activeVal}</span>
            </div>
            <input
              type="range"
              min={minVal}
              max={maxVal}
              value={activeVal}
              onChange={(e) => setEudrYear(sceneIndex, parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D2E]"
            />
            <div className="flex justify-between text-[8px] text-gray-400 mt-1 font-mono">
              <span>{labelStart}</span>
              <span>{labelMid}</span>
              <span>{labelEnd}</span>
            </div>
            <div className="mt-2.5 p-2 bg-gray-50 rounded-xl text-[10px] border border-gray-100 leading-normal text-gray-600">
              {isCbam ? (
                <div>
                  {activeVal === 2020 && <p className="text-[#1F7A53] font-semibold">✓ Carbon Price: €25/ton. Transitional declarations drafted.</p>}
                  {activeVal > 2020 && activeVal <= 2023 && <p className="text-amber-600 font-semibold">⚠ Carbon Price: €85/ton. Transitional reporting mandatory.</p>}
                  {activeVal > 2023 && <p className="text-red-600 font-semibold">✖ Carbon Price: €100+/ton. Definitive tariff certificates required.</p>}
                </div>
              ) : (isCsrd || isEsrs || isScope3 || isSustainability) ? (
                <div>
                  {activeVal === 2020 && <p className="text-[#1F7A53] font-semibold">✓ Sourcing base inventory. 100% estimated footprints.</p>}
                  {activeVal > 2020 && activeVal <= 2023 && <p className="text-amber-600 font-semibold">⚠ Target Milestone. Primary data collection at 50% suppliers.</p>}
                  {activeVal > 2023 && <p className="text-[#1F7A53] font-semibold">✓ 40% reduction verified. Certified farm carbon offsets logged on ledger.</p>}
                </div>
              ) : (
                <div>
                  {activeVal === 2020 && <p className="text-[#1F7A53] font-semibold">✓ Forest canopy intact. Cut-off baseline established.</p>}
                  {activeVal > 2020 && activeVal <= 2023 && <p className="text-amber-600 font-semibold">⚠ Smallholder expansion detected. Overlap analyzed.</p>}
                  {activeVal > 2023 && <p className="text-red-600 font-semibold">✖ Critical Violation: Deforestation detected after Dec 2020 limit.</p>}
                </div>
              )}
            </div>
          </div>
        );
      }

      case "eudr-grid": {
        const gridData = getGridData(sceneIndex);
        const activeOption = getSelectedCommodity(sceneIndex) || gridData.options[0];

        return (
          <div className="w-full p-1">
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {gridData.options.map((comm) => (
                <button
                  key={comm}
                  onClick={() => setSelectedCommodity(sceneIndex, comm)}
                  className={`py-1.5 text-[9px] font-bold rounded-lg border transition-all ${
                    (getSelectedCommodity(sceneIndex) === comm || (!getSelectedCommodity(sceneIndex) && comm === gridData.options[0])) 
                      ? "bg-[#0B3D2E] text-white border-[#0B3D2E]" 
                      : "bg-gray-50 text-gray-550 border-gray-200 hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  {comm}
                </button>
              ))}
            </div>
            <div className="text-[10px] bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed text-left">
              <p className="font-bold text-[#0B3D2E] mb-0.5">{activeOption} Requirements:</p>
              <p className="text-gray-550 font-light">{(gridData.details as any)[activeOption] || (gridData.details as any)[gridData.options[0]]}</p>
            </div>
          </div>
        );
      }

      case "risk-heatmap": {
        const heatmapData = getRiskHeatmapData(sceneIndex);
        const activeCountry = getSelectedCountry(sceneIndex) || heatmapData.countries[0];
        const volume = getCargoVolume(sceneIndex) || 100;

        return (
          <div className="w-full p-1">
            <div className="flex gap-3 mb-2">
              <div className="flex-1 text-left">
                <label className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">{heatmapData.label}</label>
                <select
                  value={activeCountry}
                  onChange={(e) => setSelectedCountry(sceneIndex, e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg p-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0B3D2E]"
                >
                  {heatmapData.countries.map((c) => (
                    <option key={c} value={c}>
                      {c} {heatmapData.isHighRisk(c) ? "(High Risk)" : "(Low Risk)"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-20 text-left">
                <label className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">Volume (MT)</label>
                <input
                  type="number"
                  value={volume}
                  onChange={(e) => setCargoVolume(sceneIndex, Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-gray-200 rounded-lg p-1 text-xs text-gray-800 focus:outline-none"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-xl grid grid-cols-2 gap-3 text-center border border-gray-100">
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-medium">{heatmapData.metricLabel}</p>
                <p className="text-xs font-black text-gray-800 mt-0.5">
                  {heatmapData.getValue(activeCountry)}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-medium">{heatmapData.tariffLabel}</p>
                <p className="text-xs font-black text-[#1F7A53] mt-0.5">
                  {heatmapData.getTariff(activeCountry, volume)}
                </p>
              </div>
            </div>
          </div>
        );
      }

      case "gps-polygon": {
        const polygonData = getGpsPolygonData(sceneIndex);
        const vertices = getVertices(sceneIndex) || [];

        return (
          <div className="w-full p-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold uppercase text-gray-400">{polygonData.label}</span>
              <button
                onClick={() => setVertices(sceneIndex, [])}
                className="reset-mapper-btn text-[9px] text-red-655 hover:text-red-500 font-bold cursor-pointer"
              >
                Reset Mapper
              </button>
            </div>
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.round(e.clientX - rect.left);
                const y = Math.round(e.clientY - rect.top);
                const currentVertices = getVertices(sceneIndex);
                if (currentVertices.length < 6) {
                  setVertices(sceneIndex, [...currentVertices, { x, y }]);
                }
              }}
              className="w-full h-24 bg-gray-50 rounded-xl relative overflow-hidden border border-gray-200 cursor-crosshair"
            >
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 opacity-5 pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className="border border-gray-800" />
                ))}
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {vertices.length > 1 && (
                  <polyline
                    points={vertices.map(v => `${v.x},${v.y}`).join(" ")}
                    fill="rgba(31,122,83,0.06)"
                    stroke="#1F7A53"
                    strokeWidth="2"
                  />
                )}
                {vertices.length > 2 && (
                  <line
                    x1={vertices[vertices.length - 1].x}
                    y1={vertices[vertices.length - 1].y}
                    x2={vertices[0].x}
                    y2={vertices[0].y}
                    stroke="#1F7A53"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                )}
              </svg>
              {vertices.map((v, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#1F7A53] -translate-x-0.75 -translate-y-0.75 shadow-[0_0_4px_#1F7A53]"
                  style={{ left: v.x, top: v.y }}
                />
              ))}
              {vertices.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-[9px] text-gray-400 font-light">
                  {polygonData.note}
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-1.5 rounded-xl mt-1.5 flex justify-between items-center text-[10px] border border-gray-100">
              <span>{polygonData.resultLabel}</span>
              <span className="font-bold text-[#1F7A53]">
                {vertices.length > 2 ? `${(vertices.length * polygonData.factor).toFixed(2)}${polygonData.suffix}` : `0.00${polygonData.suffix}`}
              </span>
            </div>
          </div>
        );
      }

      case "satellite-slider": {
        const sliderData = getSatelliteSliderData(sceneIndex);
        const activeVal = getSliderPos(sceneIndex) || 50;

        return (
          <div className="w-full p-1">
            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">{sliderData.label}</span>
            <div className="relative w-full h-16 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <div className="absolute inset-0 bg-emerald-50 flex items-center justify-center text-[#1F7A53] font-bold text-xs uppercase select-none">
                {sliderData.startLabel}
              </div>
              <div 
                className="absolute inset-y-0 right-0 bg-amber-50 flex items-center justify-center text-amber-700 font-bold text-xs uppercase select-none border-l-2 border-white"
                style={{ left: `${activeVal}%` }}
              >
                <span className="absolute left-4">{sliderData.endLabel}</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={activeVal}
              onChange={(e) => setSliderPos(sceneIndex, parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D2E] mt-3"
            />
          </div>
        );
      }

      case "materiality-quadrant": {
        const items = getMaterialityItems(sceneIndex);
        let financialLabel = "Financial Materiality";
        let impactLabel = "Impact Materiality";

        if (isCbam) {
          financialLabel = "Tariff Exposure";
          impactLabel = "Carbon Footprint";
        } else if (isEudr || isForestRisk) {
          financialLabel = "Rejection Risk";
          impactLabel = "Ecosystem Impact";
        }

        const activeOption = getSelectedMatItem(sceneIndex) || items[0].name;
        const activeItem = items.find(i => i.name === activeOption) || items[0];

        return (
          <div className="w-full p-1">
            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Select Materiality Focus</span>
            <div className="flex gap-1 mb-2 overflow-x-auto pb-1 scrollbar-thin">
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedMatItem(sceneIndex, item.name)}
                  className={`px-2 py-1 text-[9px] rounded-full border shrink-0 transition-all font-semibold ${
                    (getSelectedMatItem(sceneIndex) === item.name || (!getSelectedMatItem(sceneIndex) && item.name === items[0].name)) 
                      ? "bg-[#0B3D2E] text-white border-[#0B3D2E]" 
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="bg-gray-50 p-2 rounded-xl grid grid-cols-2 gap-3 text-center text-[10px] border border-gray-100">
              <div>
                <p className="text-gray-400 uppercase font-medium">{financialLabel}</p>
                <p className="text-xs font-black text-amber-600 mt-0.5">{activeItem.financial}%</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase font-medium">{impactLabel}</p>
                <p className="text-xs font-black text-[#1F7A53] mt-0.5">{activeItem.impact}%</p>
              </div>
            </div>
          </div>
        );
      }

      case "scope3-slider": {
        let label = "Sourcing Footprint Share";
        let descTemplate = (val: number) => `Sourcing represents **${val}%** of your carbon footprint. Tracing this to smallholder polygons is required to meet SBTi FLAG guidelines.`;

        if (isCbam) {
          label = "Embedded Carbon Share";
          descTemplate = (val: number) => `Chemical fertilizer embedded carbon represents **${val}%** of product footprint. Direct Scope 1 checks are required.`;
        } else if (isEudr || isForestRisk) {
          label = "High-Risk Sourcing Share";
          descTemplate = (val: number) => `High-risk countries represent **${val}%** of supply chain volume. Regular satellite sweeps are required to secure custom clearance.`;
        }

        const activeVal = getScope3Percent(sceneIndex) || 60;

        return (
          <div className="w-full p-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold uppercase text-gray-400">{label}</span>
              <span className="text-xs font-black text-[#1F7A53] bg-emerald-50 px-2 py-0.5 rounded">{activeVal}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={activeVal}
              onChange={(e) => setScope3Percent(sceneIndex, parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D2E]"
            />
            <div className="mt-2.5 p-2 bg-gray-50 rounded-xl text-[10px] border border-gray-100 leading-normal text-gray-500 font-light">
              <p dangerouslySetInnerHTML={{ __html: descTemplate(activeVal) }} />
            </div>
          </div>
        );
      }

      case "document-parser": {
        const parserData = getDocumentParserData(sceneIndex);
        const parserStatus = getParserStatus(sceneIndex) || "idle";
        const parsedFields = getParsedFields(sceneIndex);

        return (
          <div className="w-full p-1">
            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5 text-left">AI Document Ingestion & Verification</span>
            {parserStatus === "idle" && (
              <button
                onClick={() => {
                  setParserStatus(sceneIndex, "parsing");
                  setTimeout(() => {
                    setParserStatus(sceneIndex, "completed");
                    setParsedFields(sceneIndex, {
                      docType: parserData.docType,
                      farmName: parserData.farmEntity,
                      riskStatus: parserData.statusText,
                      expiry: parserData.expiryText,
                    });
                  }, 2500);
                }}
                className="w-full h-16 border-2 border-dashed border-gray-300 hover:border-[#0B3D2E] rounded-xl flex flex-col items-center justify-center gap-1 transition-colors group text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#0B3D2E]" />
                <span className="text-[9px] font-semibold">{parserData.uploadLabel}</span>
              </button>
            )}
            {parserStatus === "parsing" && (
              <div className="h-20 bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-1 border border-gray-100">
                <Loader2 className="w-5 h-5 animate-spin text-[#1F7A53]" />
                <span className="text-[10px] text-gray-500 font-light">AI scanning document text layout...</span>
              </div>
            )}
            {parserStatus === "completed" && parsedFields && (
              <div className="bg-gray-50 rounded-xl p-3 text-xs border border-gray-100">
                <div className="flex justify-between border-b border-gray-200 pb-1.5 mb-1.5">
                  <span className="font-bold text-[#1F7A53] text-[10px]">✓ Verification Success</span>
                  <button onClick={() => {
                    setParserStatus(sceneIndex, "idle");
                    setParsedFields(sceneIndex, null);
                  }} className="clear-parser-btn text-[10px] text-gray-450 hover:text-gray-655 cursor-pointer px-2">Clear</button>
                </div>
                <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-gray-505 text-[10px] font-light text-left">
                  <span>Doc Type:</span> <span className="font-semibold text-gray-800 truncate">{parsedFields.docType}</span>
                  <span>Entity:</span> <span className="font-semibold text-gray-800 truncate">{parsedFields.farmName}</span>
                  <span>Expiry/Standard:</span> <span className="font-semibold text-gray-800 truncate">{parsedFields.expiry}</span>
                  <span>Status:</span> <span className="font-semibold text-[#1F7A53]">{parsedFields.riskStatus}</span>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "carbon-calculator": {
        const calculatorData = getCarbonCalculatorData(sceneIndex);
        const slider1Val = getNitrogenReduction(sceneIndex) || 20;
        const slider2Val = getSoilDepth(sceneIndex) || 30;

        return (
          <div className="w-full p-1 font-sans">
            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5 text-left">{calculatorData.label}</span>
            <div className="flex gap-3 mb-2">
              <div className="flex-1 text-left">
                <label className="text-[9px] text-gray-450 block mb-0.5">{calculatorData.slider1Label}</label>
                <input
                  type="range"
                  min={calculatorData.slider1Min}
                  max={calculatorData.slider1Max}
                  value={slider1Val}
                  onChange={(e) => setNitrogenReduction(sceneIndex, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D2E]"
                />
                <span className="text-[9px] text-gray-550 mt-0.5 block font-bold">
                  {slider1Val}{calculatorData.slider1Suffix}
                </span>
              </div>
              <div className="flex-1 text-left">
                <label className="text-[9px] text-gray-450 block mb-0.5">{calculatorData.slider2Label}</label>
                <input
                  type="range"
                  min={calculatorData.slider2Min}
                  max={calculatorData.slider2Max}
                  value={slider2Val}
                  onChange={(e) => setSoilDepth(sceneIndex, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0B3D2E]"
                />
                <span className="text-[9px] text-gray-555 mt-0.5 block font-bold">
                  {slider2Val}{calculatorData.slider2Suffix}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-xl flex justify-between items-center text-[10px] border border-gray-100">
              <span>{calculatorData.resultLabel}</span>
              <span className="font-black text-[#1F7A53] text-[11px]">
                {calculatorData.value} {calculatorData.unit}
              </span>
            </div>
          </div>
        );
      }

      case "sourcing-selector": {
        const selectorData = getSourcingSelectorData(sceneIndex);

        return (
          <div className="w-full p-1">
            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">{selectorData.label}</span>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {selectorData.regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(sceneIndex, reg)}
                  className={`py-1 text-[9px] font-bold rounded-lg border transition-all ${
                    (getSelectedRegion(sceneIndex) === reg || (!getSelectedRegion(sceneIndex) && reg === selectorData.regions[0])) 
                      ? "bg-[#0B3D2E] text-white border-[#0B3D2E]" 
                      : "bg-gray-50 text-gray-550 border-gray-200 hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
            <div className="bg-gray-50 p-2 rounded-xl text-center grid grid-cols-2 gap-3 text-xs border border-gray-100">
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-medium">Carbon Factor</p>
                <p className="text-xs font-black text-gray-800 mt-0.5">
                  {selectorData.carbonFactor}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase font-medium">Verification Method</p>
                <p className="text-xs font-black text-[#1F7A53] mt-0.5">
                  {selectorData.verificationMethod}
                </p>
              </div>
            </div>
          </div>
        );
      }

      case "payment-simulator": {
        const interactiveTitle = data.scenes[sceneIndex]?.interactiveTitle || "";
        const isCta = !interactiveTitle.toLowerCase().includes("payment") && 
                      !interactiveTitle.toLowerCase().includes("payout") && 
                      !interactiveTitle.toLowerCase().includes("simulate");

        if (isCta) {
          const ctaStatus = ctaStatuses[sceneIndex] || "idle";
          const setCtaStatus = (status: "idle" | "submitting" | "success") => 
            setCtaStatuses(prev => ({ ...prev, [sceneIndex]: status }));

          return (
            <div className="w-full p-1 text-left">
              {ctaStatus === "idle" && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setCtaStatus("submitting");
                  setTimeout(() => {
                    setCtaStatus("success");
                  }, 1800);
                }} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-gray-400 font-bold uppercase block mb-0.5">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Jane Doe"
                        value={ctaName}
                        onChange={(e) => setCtaName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg p-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0B3D2E]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-400 font-bold uppercase block mb-0.5">Company</label>
                      <input
                        required
                        type="text"
                        placeholder="Acme Corp"
                        value={ctaCompany}
                        onChange={(e) => setCtaCompany(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg p-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0B3D2E]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400 font-bold uppercase block mb-0.5">Work Email</label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={ctaEmail}
                      onChange={(e) => setCtaEmail(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg p-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0B3D2E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-8 rounded-lg bg-[#0B3D2E] text-white font-bold text-xs hover:bg-[#1f7a53] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {interactiveTitle || "Submit Request"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              {ctaStatus === "submitting" && (
                <div className="h-28 bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-1.5 border border-gray-100">
                  <Loader2 className="w-5 h-5 animate-spin text-[#1F7A53]" />
                  <span className="text-[10px] text-gray-500 font-light">Processing your compliance request...</span>
                </div>
              )}
              {ctaStatus === "success" && (
                <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-500/10 text-center space-y-1">
                  <CheckCircle2 className="w-7 h-7 text-[#1F7A53] mx-auto mb-1 animate-bounce" />
                  <p className="text-xs font-bold text-[#0B3D2E]">Thank you, {ctaName}!</p>
                  <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                    Your request for {ctaCompany} has been logged. A SourceTrace specialist will contact you at {ctaEmail} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setCtaStatus("idle");
                      setCtaName("");
                      setCtaEmail("");
                      setCtaCompany("");
                    }}
                    className="text-[9px] text-[#1F7A53] hover:underline font-bold mt-1 block mx-auto cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              )}
            </div>
          );
        }

        // Default Payment Simulator
        return (
          <div className="w-full p-1">
            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">Social Payment Simulator</span>
            <div className="flex gap-3 mb-2">
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-2 top-1.5 text-gray-400 text-xs">$</span>
                  <input
                    type="number"
                    value={getPayAmount(sceneIndex)}
                    onChange={(e) => setPayAmount(sceneIndex, Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-gray-200 rounded-lg p-1 pl-4 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0B3D2E]"
                  />
                </div>
              </div>
              <div className="flex items-end">
                {getPayStatus(sceneIndex) === "idle" && (
                  <button
                    onClick={() => {
                      setPayStatus(sceneIndex, "processing");
                      setTimeout(() => {
                        setPayStatus(sceneIndex, "success");
                      }, 2000);
                    }}
                    className="h-7 px-3 rounded-lg bg-[#0B3D2E] text-white font-bold text-xs hover:bg-[#1f7a53] transition-colors cursor-pointer"
                  >
                    Send Payment
                  </button>
                )}
                {getPayStatus(sceneIndex) === "processing" && (
                  <button className="h-7 px-3 rounded-lg bg-gray-100 text-gray-400 font-bold text-xs flex items-center gap-1 cursor-wait border border-gray-200" disabled>
                    <Loader2 className="w-3 h-3 animate-spin text-gray-400" /> Sending...
                  </button>
                )}
                {getPayStatus(sceneIndex) === "success" && (
                  <button onClick={() => setPayStatus(sceneIndex, "idle")} className="h-7 px-3 rounded-lg bg-[#0B3D2E] text-white font-bold text-xs hover:bg-[#1f7a53] transition-colors cursor-pointer">
                    Reset
                  </button>
                )}
              </div>
            </div>
            {getPayStatus(sceneIndex) === "success" && (
              <div className="bg-emerald-50/50 rounded-xl p-1.5 text-xs text-center border border-emerald-500/10">
                <p className="font-bold text-[#1F7A53] text-[9px]">✓ Payment Routed & Logged on Ledger</p>
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  const renderVisualPanel = (sceneIndex: number) => {
    const scene = data.scenes[sceneIndex];
    if (!scene) return null;
    
    const visualType = scene.visualType;
    const imageSrc = getImageSrc(visualType || "");

    return (
      <div className="w-full flex-1 flex flex-col justify-between relative z-10 h-full compliance-touch-controls">
        {/* Decorative graphics matching AI prompts */}
        <div className="w-full h-[220px] rounded-2xl border border-gray-200 bg-gray-50 flex flex-col overflow-hidden relative group shadow-sm">
          
          {/* Contextual Asset Background Image */}
          {imageSrc && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img 
                src={imageSrc} 
                className="w-full h-full object-cover" 
                alt="Background Asset" 
              />
              {/* Overlay backdrop to soften the image for overlay text readability */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] mix-blend-normal" />
            </div>
          )}
          
          {/* Interactive / Animated Overlays on top of the image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {visualType === "regulatory-timeline" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-[#1F7A53]/20 animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#1F7A53]/40 animate-[spin_20s_linear_infinite]" />
                <div className="w-16 h-16 rounded-full bg-[#1F7A53]/10 border border-[#1F7A53]/30 flex items-center justify-center z-10 shadow-lg">
                  <Globe className="w-8 h-8 text-[#1F7A53] animate-[spin_10s_linear_infinite]" />
                </div>
                <div className="absolute bottom-2 font-mono text-[9px] text-[#0B3D2E] tracking-widest font-black uppercase bg-white/85 px-2 py-0.5 rounded border border-gray-100 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#53D769] animate-ping" />
                  {(() => {
                    const options = isCbam ? ["Transitional", "Definitive", "Default Penalties"] :
                                    (isCsrd || isEsrs) ? ["ESRS E1", "ESRS E4", "ESRS S1"] :
                                    isForestRisk ? ["HCV Areas", "Intact Baselines", "Restoration"] :
                                    isScope3 ? ["SBTi FLAG", "GHG Protocol", "Supplier Verts"] :
                                    isSustainability ? ["GRI Disclosures", "SASB reporting", "ESG Targets"] :
                                    ["EUDR", "CSRD", "CBAM"];
                    return getActiveReg(sceneIndex) || options[0];
                  })()}: Verification Active
                </div>
              </div>
            )}
            
            {visualType === "split-screen" && (
              <div className="grid grid-cols-2 gap-4 w-full h-full p-2 items-center">
                <div className={`border rounded-xl flex items-center justify-center flex-col gap-2 p-3 h-full transition-all ${
                  getHoveredCard(sceneIndex) === "manual" ? "bg-red-500/10 border-red-500 shadow-md scale-102" : "border-red-200 bg-red-50/30 opacity-70"
                }`}>
                  <AlertTriangle className="w-6 h-6 text-red-500 animate-bounce" />
                  <span className="text-[10px] font-mono uppercase text-red-700 font-black">
                    {isCbam ? "Default Estimates" : (isCsrd || isEsrs || isScope3 || isSustainability) ? "Spreadsheet Lags" : "Legacy Manual"}
                  </span>
                  <span className="text-[8px] text-red-500 font-medium font-mono">
                    {isCbam ? "High Tariff Risk" : (isCsrd || isEsrs || isScope3 || isSustainability) ? "Audit Risk: High" : "Rejection Risk: High"}
                  </span>
                </div>
                <div className={`border rounded-xl flex items-center justify-center flex-col gap-2 p-3 h-full transition-all ${
                  getHoveredCard(sceneIndex) === "digital" ? "bg-emerald-500/10 border-[#1F7A53] shadow-md scale-102" : "border-emerald-200 bg-emerald-50/30 opacity-70"
                }`}>
                  <Check className="w-6 h-6 text-[#1F7A53] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase text-[#0B3D2E] font-black">
                    {isCbam ? "DATAGREEN Actuals" : (isCsrd || isEsrs || isScope3 || isSustainability) ? "Consolidated ESG" : "DATAGREEN System"}
                  </span>
                  <span className="text-[8px] text-[#1F7A53] font-medium font-mono">
                    Clearance Rate: 100%
                  </span>
                </div>
              </div>
            )}

            {visualType === "network-nodes" && (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {/* Background coordinate grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-[0.03] pointer-events-none">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="border border-gray-900" />
                  ))}
                </div>
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="25%" y1="50%" x2="42%" y2="30%" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="25%" y1="50%" x2="42%" y2="70%" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="42%" y1="30%" x2="65%" y2="30%" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="42%" y1="70%" x2="65%" y2="70%" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="65%" y1="30%" x2="82%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="65%" y1="70%" x2="82%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />

                  {(() => {
                    const nodes = getNetworkNodes(sceneIndex);
                    const selectedNode = getSelectedNode(sceneIndex) || nodes[0].name;
                    const activeNodeIdx = nodes.findIndex(n => n.name === selectedNode);
                    return (
                      <>
                        {activeNodeIdx >= 1 && (
                          <line x1="25%" y1="50%" x2="42%" y2="30%" stroke="#1F7A53" strokeWidth="3" className="animate-pulse" />
                        )}
                        {activeNodeIdx >= 2 && (
                          <line x1="42%" y1="30%" x2="65%" y2="30%" stroke="#1F7A53" strokeWidth="3" className="animate-pulse" />
                        )}
                        {activeNodeIdx >= 3 && (
                          <line x1="65%" y1="30%" x2="82%" y2="50%" stroke="#1F7A53" strokeWidth="3" className="animate-pulse" />
                        )}
                      </>
                    );
                  })()}
                </svg>

                {(() => {
                  const nodes = getNetworkNodes(sceneIndex);
                  const selectedNode = getSelectedNode(sceneIndex) || nodes[0].name;
                  const activeNodeIdx = nodes.findIndex(n => n.name === selectedNode);
                  return (
                    <>
                      <div className={`absolute left-[20%] top-[45%] w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        activeNodeIdx === 0 ? "bg-emerald-50 border-[#1F7A53] shadow-md scale-110 z-20" : "bg-white border-gray-200"
                      }`}>
                        <Map className={`w-4 h-4 ${activeNodeIdx === 0 ? "text-[#1F7A53]" : "text-gray-400"}`} />
                      </div>

                      <div className={`absolute left-[40%] top-[25%] w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        activeNodeIdx === 1 ? "bg-emerald-50 border-[#1F7A53] shadow-md scale-110 z-20" : "bg-white border-gray-200"
                      }`}>
                        <Layers className={`w-4 h-4 ${activeNodeIdx === 1 ? "text-[#1F7A53]" : "text-gray-400"}`} />
                      </div>

                      <div className={`absolute left-[63%] top-[25%] w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        activeNodeIdx === 2 ? "bg-emerald-50 border-[#1F7A53] shadow-md scale-110 z-20" : "bg-white border-gray-200"
                      }`}>
                        <Cpu className={`w-4 h-4 ${activeNodeIdx === 2 ? "text-[#1F7A53]" : "text-gray-400"}`} />
                      </div>

                      <div className={`absolute left-[80%] top-[45%] w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                        activeNodeIdx === 3 ? "bg-emerald-50 border-[#1F7A53] shadow-md scale-110 z-20" : "bg-white border-gray-200"
                      }`}>
                        <FileText className={`w-4 h-4 ${activeNodeIdx === 3 ? "text-[#1F7A53]" : "text-gray-400"}`} />
                      </div>

                      <div className="absolute bottom-2 font-mono text-[8px] text-gray-500 uppercase tracking-widest bg-white/95 px-2 py-0.5 rounded border border-gray-200 shadow-sm font-bold">
                        Active Ledger: <span className="text-[#1F7A53]">
                          {nodes[activeNodeIdx >= 0 ? activeNodeIdx : 0]?.name}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {visualType === "eudr-scrubber" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className={`absolute w-36 h-36 rounded-full border-4 flex items-center justify-center transition-all duration-300 relative shadow-inner ${
                  (getEudrYear(sceneIndex) || 2021) === 2020 ? "border-[#1F7A53] bg-emerald-50/45" : (getEudrYear(sceneIndex) || 2021) <= 2023 ? "border-amber-500 bg-amber-50/45" : "border-red-500 bg-red-50/45"
                }`}>
                  <div className={`absolute inset-0 rounded-full border border-dashed animate-[spin_4s_linear_infinite] ${
                    (getEudrYear(sceneIndex) || 2021) === 2020 ? "border-[#1F7A53]/30" : (getEudrYear(sceneIndex) || 2021) <= 2023 ? "border-amber-500/30" : "border-red-500/30"
                  }`} />
                  
                  <Leaf className={`w-10 h-10 transition-colors duration-300 ${
                    (getEudrYear(sceneIndex) || 2021) === 2020 ? "text-[#1F7A53] animate-pulse" : (getEudrYear(sceneIndex) || 2021) <= 2023 ? "text-amber-600" : "text-red-600 animate-ping"
                  }`} />
                </div>
                <div className="absolute bottom-2 font-mono text-[9px] tracking-widest font-black uppercase bg-white/95 px-2.5 py-1 rounded-md border border-gray-200 shadow-sm flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    (getEudrYear(sceneIndex) || 2021) === 2020 ? "bg-[#1F7A53]" : (getEudrYear(sceneIndex) || 2021) <= 2023 ? "bg-amber-500" : "bg-red-500 animate-ping"
                  }`} />
                  {isCbam ? (
                    `Tariff: ${(getEudrYear(sceneIndex) || 2021) === 2020 ? "Low Surcharge" : (getEudrYear(sceneIndex) || 2021) <= 2023 ? "Transitional Audit" : "Full ETS Tariff"}`
                  ) : (isCsrd || isEsrs || isScope3 || isSustainability) ? (
                    `Milestone: ${(getEudrYear(sceneIndex) || 2021) === 2020 ? "Inventory Base" : (getEudrYear(sceneIndex) || 2021) <= 2023 ? "Data Collection" : "40% Target Met"}`
                  ) : (
                    `${(getEudrYear(sceneIndex) || 2021)} Canopy: ${(getEudrYear(sceneIndex) || 2021) === 2020 ? "Clear (Intact)" : (getEudrYear(sceneIndex) || 2021) <= 2023 ? "Warning Alert" : "VIOLATION DETECTED"}`
                  )}
                </div>
              </div>
            )}

            {visualType === "eudr-grid" && (
              <div className="relative w-full h-full flex flex-col justify-center items-center p-4">
                <div className="bg-white/95 border border-gray-200 rounded-xl p-3 shadow-md w-full max-w-[280px]">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5 mb-2">
                    <span className="text-[10px] font-black text-[#0B3D2E] uppercase tracking-wider text-ellipsis overflow-hidden">
                      {(() => {
                        const gridData = getGridData(sceneIndex);
                        return getSelectedCommodity(sceneIndex) || gridData.options[0];
                      })()} Sourcing Analysis
                    </span>
                    <span className="flex items-center gap-1 text-[8px] bg-emerald-50 text-[#1F7A53] px-1.5 py-0.5 rounded font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-600 font-light leading-relaxed mb-2">
                    {(() => {
                      const gridData = getGridData(sceneIndex);
                      const selected = getSelectedCommodity(sceneIndex) || gridData.options[0];
                      return (gridData.details as any)[selected] || (gridData.details as any)[gridData.options[0]];
                    })()}
                  </p>
                  <div className="flex justify-between text-[7px] font-mono text-gray-400 border-t border-gray-50 pt-1">
                    <span className="truncate mr-2">BATCH EXPORT ID: ST-{((getSelectedCommodity(sceneIndex) || getGridData(sceneIndex).options[0]).toUpperCase().substring(0, 3))}-9042</span>
                    <span>12ms</span>
                  </div>
                </div>
              </div>
            )}

            {visualType === "risk-heatmap" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[#1F7A53]/5 animate-pulse rounded-2xl pointer-events-none" />
                {(() => {
                  const heatmapData = getRiskHeatmapData(sceneIndex);
                  const activeC = getSelectedCountry(sceneIndex) || heatmapData.countries[0];
                  const isHighRisk = heatmapData.isHighRisk(activeC);
                  return (
                    <>
                      <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all shadow-lg ${
                        isHighRisk ? "border-red-500 bg-red-50/90" : "border-[#1F7A53] bg-emerald-50/90"
                      }`}>
                        <Activity className={`w-8 h-8 ${isHighRisk ? "text-red-500 animate-pulse" : "text-[#1F7A53]"}`} />
                      </div>
                      <div className="absolute bottom-2 font-mono text-[9px] tracking-wider font-bold uppercase bg-white/95 px-2 py-0.5 rounded border border-gray-200 shadow-sm flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isHighRisk ? "bg-red-500" : "bg-[#1F7A53]"}`} />
                        {activeC} Risk Index: <span className={isHighRisk ? "text-red-600 font-black" : "text-[#1F7A53] font-black"}>
                          {isHighRisk ? "HIGH" : "LOW"}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {visualType === "gps-polygon" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
                <div className="w-full h-full bg-white/40 rounded-xl relative overflow-hidden border border-dashed border-gray-200">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {getVertices(sceneIndex).length > 1 && (
                      <polyline
                        points={getVertices(sceneIndex).map(v => `${v.x},${v.y * 1.5}`).join(" ")}
                        fill="rgba(31,122,83,0.18)"
                        stroke="#1F7A53"
                        strokeWidth="3"
                      />
                    )}
                    {getVertices(sceneIndex).length > 2 && (
                      <line
                        x1={getVertices(sceneIndex)[getVertices(sceneIndex).length - 1].x}
                        y1={getVertices(sceneIndex)[getVertices(sceneIndex).length - 1].y * 1.5}
                        x2={getVertices(sceneIndex)[0].x}
                        y2={getVertices(sceneIndex)[0].y * 1.5}
                        stroke="#1F7A53"
                        strokeWidth="3"
                        strokeDasharray="4"
                      />
                    )}
                  </svg>
                  {getVertices(sceneIndex).map((v, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-[#1F7A53] -translate-x-2 -translate-y-2 shadow-lg flex items-center justify-center text-[7px] text-white font-bold"
                      style={{ left: v.x, top: v.y * 1.5 }}
                    >
                      {i + 1}
                    </div>
                  ))}
                  {getVertices(sceneIndex).length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-[9px] text-gray-400 font-light text-center p-4">
                      <Map className="w-6 h-6 text-gray-300 animate-bounce" />
                      <span>Trace coordinates on the interactive mapper below</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 font-mono text-[8px] text-[#0B3D2E] font-black uppercase bg-white/80 px-1.5 py-0.5 rounded border border-gray-100 shadow-sm">
                    {(() => {
                      const polyData = getGpsPolygonData(sceneIndex);
                      return getVertices(sceneIndex).length > 2 
                        ? `${polyData.resultLabel.toUpperCase().replace(":", "")}: ${(getVertices(sceneIndex).length * polyData.factor).toFixed(2)}${polyData.suffix}` 
                        : "WAITING FOR COORDINATES";
                    })()}
                  </div>
                </div>
              </div>
            )}

            {visualType === "satellite-slider" && (
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-white/20 border border-gray-200">
                {(() => {
                  const sliderData = getSatelliteSliderData(sceneIndex);
                  return (
                    <>
                      <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-start p-4 text-[#1F7A53] font-black text-[10px] uppercase select-none">
                        <span>{sliderData.startLabel}</span>
                      </div>
                      <div 
                        className="absolute inset-y-0 right-0 bg-amber-500/20 border-l-4 border-white shadow-2xl flex items-center justify-end p-4 text-amber-800 font-black text-[10px] uppercase select-none transition-all duration-75"
                        style={{ left: `${getSliderPos(sceneIndex) || 50}%` }}
                      >
                        <span>{sliderData.endLabel}</span>
                      </div>
                    </>
                  );
                })()}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] bg-white/90 px-2 py-0.5 rounded border border-gray-200 shadow-sm uppercase font-bold tracking-wider text-gray-500">
                  {isCbam ? "Emissions Gap" : isCsrd || isEsrs || isScope3 || isSustainability ? "Canopy Shade Ratio" : "Canopy Ratio"}: {getSliderPos(sceneIndex) || 50}%
                </div>
              </div>
            )}

            {visualType === "materiality-quadrant" && (
              <div className="relative w-full h-full flex flex-col justify-center items-center p-3">
                <div className="w-full h-full bg-white/50 rounded-xl relative p-4 flex flex-col justify-center items-center border border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-0.5 bg-gray-200" />
                    <div className="h-full w-0.5 bg-gray-200 absolute" />
                  </div>
                  {(() => {
                    const activeOpt = getSelectedMatItem(sceneIndex) || (
                      isCbam ? "Fertilizer Carbon" :
                      isEudr || isForestRisk ? "Canopy Integrity" : "Coffee Sourcing"
                    );
                    const items = getMaterialityItems(sceneIndex);
                    const active = items.find(i => i.name === activeOpt) || items[0];
                    return (
                      <div 
                        className="absolute w-5 h-5 rounded-full bg-[#1F7A53] flex items-center justify-center shadow-lg transition-all duration-500"
                        style={{ 
                          left: `${active.financial}%`, 
                          top: `${100 - active.impact}%`,
                          transform: "translate(-50%, -50%)"
                        }}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-white animate-ping" />
                        <Sparkles className="w-2.5 h-2.5 text-white absolute" />
                      </div>
                    );
                  })()}
                  <div className="absolute top-2 left-2 text-[8px] text-gray-400 uppercase font-black tracking-wider">
                    {isCbam ? "Carbon Footprint" : "Impact Materiality"}
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] text-gray-400 uppercase font-black tracking-wider">
                    {isCbam ? "Tariff Exposure" : "Financial Materiality"}
                  </div>
                  <div className="absolute top-2 right-2 font-mono text-[8px] text-[#0B3D2E] bg-white/80 border border-gray-100 shadow-sm px-1.5 py-0.5 rounded font-bold">
                    {getSelectedMatItem(sceneIndex) || (isCbam ? "Fertilizer Carbon" : isEudr || isForestRisk ? "Canopy Integrity" : "Coffee Sourcing")}
                  </div>
                </div>
              </div>
            )}

            {visualType === "scope3-slider" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full border-[10px] border-gray-100/40 flex items-center justify-center relative shadow-md"
                     style={{ background: `conic-gradient(#1F7A53 ${(getScope3Percent(sceneIndex) || 60) * 3.6}deg, rgba(243,244,246,0.3) 0deg)` }}
                >
                  <div className="absolute w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
                    <span className="text-sm font-black text-gray-800">{getScope3Percent(sceneIndex) || 60}%</span>
                  </div>
                </div>
                <div className="absolute bottom-2 font-mono text-[9px] text-[#0B3D2E] uppercase font-black tracking-wider bg-white/90 px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                  {isCbam ? "Embedded Carbon Share" : isEudr || isForestRisk ? "High-Risk Sourcing Share" : "Scope 3 Emission Share"}
                </div>
              </div>
            )}

            {visualType === "document-parser" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
                {getParserStatus(sceneIndex) === "idle" && (
                  <div className="text-center bg-white/80 p-4 rounded-xl shadow-md border border-gray-100 flex flex-col items-center gap-1.5">
                    <FileText className="w-10 h-10 text-gray-300" />
                    <span className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-wider">Awaiting Verification Document</span>
                  </div>
                )}
                {getParserStatus(sceneIndex) === "parsing" && (
                  <div className="relative w-full max-w-[180px] bg-white/90 p-4 rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col gap-2">
                    <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-[bounce_2s_infinite]" />
                    <div className="w-full h-2 bg-gray-200 rounded animate-pulse" />
                    <div className="w-3/4 h-2 bg-gray-200 rounded animate-pulse" />
                    <div className="w-5/6 h-2 bg-gray-200 rounded animate-pulse" />
                    <span className="text-[8px] text-[#1F7A53] font-mono font-black uppercase tracking-wider text-center animate-pulse">OCR Scanning...</span>
                  </div>
                )}
                {getParserStatus(sceneIndex) === "completed" && getParsedFields(sceneIndex) && (
                  <div className="bg-white border border-gray-150 rounded-xl p-3 shadow-lg w-full max-w-[220px] border-l-4 border-l-emerald-500">
                    <p className="font-mono font-black text-[9px] text-[#1F7A53] border-b border-gray-100 pb-1 mb-1.5 uppercase tracking-wider">✓ AI VERIFICATION EXTRACT</p>
                    <div className="flex flex-col gap-1 text-[8px] font-mono text-gray-600">
                      <p>Type: <span className="text-gray-800 font-bold">{getParsedFields(sceneIndex).docType}</span></p>
                      <p>Entity: <span className="text-gray-800 font-bold">{getParsedFields(sceneIndex).farmName}</span></p>
                      <p>Status: <span className="text-emerald-600 font-black">{getParsedFields(sceneIndex).riskStatus}</span></p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {visualType === "carbon-calculator" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {(() => {
                  const calcData = getCarbonCalculatorData(sceneIndex);
                  return (
                    <>
                      <div className="relative w-20 h-20 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center shadow-lg border-b-4 border-b-[#1F7A53]">
                        <span className="text-xl font-black text-[#1F7A53] leading-none mb-1">
                          {calcData.value}
                        </span>
                        <span className="text-[7px] text-gray-400 uppercase font-black tracking-wider">
                          {calcData.unit}
                        </span>
                      </div>
                      <div className="absolute bottom-2 font-mono text-[9px] text-[#0B3D2E] uppercase font-black bg-white/90 px-2 py-0.5 rounded border border-gray-200 shadow-sm tracking-wider">
                        {calcData.titleLabel}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {visualType === "sourcing-selector" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
                {(() => {
                  const selectorData = getSourcingSelectorData(sceneIndex);
                  return (
                    <div className="bg-white/95 border border-gray-200 rounded-xl p-3.5 shadow-md w-full max-w-[240px]">
                      <p className="font-black text-[10px] text-[#0B3D2E] uppercase tracking-wider border-b border-gray-100 pb-1 mb-2">Region: {selectorData.activeRegion}</p>
                      <div className="text-[9px] text-gray-600 font-light flex flex-col gap-1">
                        <p>Carbon factor: <span className="font-mono font-bold text-gray-800">{selectorData.carbonFactor}</span></p>
                        <p>Verification: <span className="text-[#1F7A53] font-bold">{selectorData.verificationMethod}</span></p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {visualType === "payment-simulator" && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Differentiate between payment simulation and CTA block */}
                {!scene.interactiveTitle.toLowerCase().includes("payment") && 
                 !scene.interactiveTitle.toLowerCase().includes("payout") && 
                 !scene.interactiveTitle.toLowerCase().includes("simulate") ? (
                  // CTA Visual Block
                  <div className="text-center w-full max-w-[280px] bg-white/95 p-4 rounded-xl shadow-md border border-gray-100 flex flex-col items-center gap-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#53D769] to-[#1F7A53]" />
                    
                    {(ctaStatuses[sceneIndex] || "idle") === "idle" && (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#1F7A53]/10 flex items-center justify-center text-[#1F7A53] mb-1">
                          <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                        <p className="text-[11px] font-bold text-[#0B3D2E] uppercase tracking-wider leading-none">SourceTrace Intelligence</p>
                        <p className="text-[9px] text-gray-500 font-light leading-normal">
                          Ready to secure your sourcing corridors? Fill out the form below to connect with our compliance experts.
                        </p>
                        <div className="flex gap-1.5 mt-1">
                          <span className="text-[8px] bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-500">Tier 1 Support</span>
                          <span className="text-[8px] bg-emerald-50 px-2 py-0.5 rounded font-mono text-[#1F7A53] font-bold">24/7 Active</span>
                        </div>
                      </>
                    )}
                    {(ctaStatuses[sceneIndex] || "idle") === "submitting" && (
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#1F7A53]/10 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin text-[#1F7A53]" />
                        </div>
                        <p className="text-[11px] font-bold text-[#0B3D2E] uppercase tracking-wider animate-pulse">Establishing Secure Link</p>
                        <p className="text-[9px] text-gray-500 font-light leading-normal">
                          Syncing company credentials with DATAGREEN compliance register...
                        </p>
                      </>
                    )}
                    {(ctaStatuses[sceneIndex] || "idle") === "success" && (
                      <>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#1F7A53]">
                          <Check className="w-5 h-5 animate-bounce" />
                        </div>
                        <p className="text-[11px] font-bold text-[#1F7A53] uppercase tracking-wider">Connection Verified</p>
                        <p className="text-[9px] text-gray-550 font-light leading-normal">
                          Dossier created. Ticket ID: ST-REQ-79042
                        </p>
                        <div className="w-full bg-emerald-50 border border-emerald-100 p-1.5 rounded-lg text-left text-[8px] font-mono text-gray-600 mt-1">
                          <p className="truncate">NAME: {ctaName || "Verified User"}</p>
                          <p className="truncate">COMPANY: {ctaCompany || "Verified Org"}</p>
                          <p className="truncate">STATUS: ASSIGNED_SPECIALIST</p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  // Standard Payment Simulator Visual Block
                  <>
                    {getPayStatus(sceneIndex) === "idle" && (
                      <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-150 animate-pulse">
                        <DollarSign className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    {getPayStatus(sceneIndex) === "processing" && (
                      <div className="relative flex items-center justify-center bg-white p-3 rounded-full shadow-lg border border-gray-150">
                        <div className="w-10 h-10 rounded-full border-4 border-dashed border-[#1F7A53] animate-spin" />
                        <DollarSign className="w-5 h-5 text-[#1F7A53] absolute" />
                      </div>
                    )}
                    {getPayStatus(sceneIndex) === "success" && (
                      <div className="text-center bg-white p-3.5 rounded-xl shadow-lg border border-gray-150 border-l-4 border-l-emerald-500 w-full max-w-[240px]">
                        <CheckCircle2 className="w-7 h-7 text-[#1F7A53] mx-auto mb-1.5 animate-bounce" />
                        <p className="text-[9px] font-mono text-[#1F7A53] font-black uppercase tracking-wider">TRANSACTION BLOCKED & LOGGED</p>
                        <p className="text-[7px] text-gray-400 font-mono mt-1 truncate">HASH: 0x89F2...{getPayAmount(sceneIndex)}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Fallback layout */}
            {(!visualType) && (
              <div className="flex flex-col gap-2 items-center bg-white/70 p-4 rounded-2xl shadow-sm border border-gray-100">
                <Shield className="w-10 h-10 text-[#1F7A53] animate-pulse" />
                <span className="text-[10px] font-mono text-[#0B3D2E] uppercase font-bold">SourceTrace Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider line and Title */}
        <div className="w-full border-t border-gray-100 pt-3 flex items-center gap-2 text-[#1F7A53] mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-wider">{scene.interactiveTitle || "Interactive Control Panel"}</span>
        </div>

        {/* Lower interactive tool card wrapper */}
        <div className="w-full flex-1 flex flex-col justify-center min-h-[160px]">
          {renderInteractiveTool(visualType, sceneIndex)}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 selection:bg-[#53D769] selection:text-[#0B3D2E] pb-16" ref={containerRef}>
      {/* 1. Cinematic Light Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center pt-36 pb-20 px-6 sm:px-8 border-b border-gray-100 overflow-hidden bg-gradient-to-b from-[#E2EFE9]/40 via-white to-gray-50/50">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#53D769]/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1F7A53]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #1F7A53 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#1F7A53] text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#53D769] animate-pulse"></span>
            {data.category}
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0B3D2E] leading-tight tracking-tighter max-w-5xl mb-6">
            {data.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8 font-light">
            {data.description}
          </p>

          <div className="flex gap-4">
            <Link href="/request-demo">
               <Button size="lg" className="rounded-full bg-[#0B3D2E] text-white hover:bg-[#1F7A53] border-none font-bold shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer">
                 Request Demo
               </Button>
            </Link>
            <Link href="/contact">
               <Button size="lg" variant="outline" className="rounded-full border-gray-200 text-[#0B3D2E] hover:bg-gray-50 font-bold cursor-pointer">
                 Contact Sales
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Scrollytelling Storyboard Body */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          
          {/* Left Column: Storyboard Narrative */}
          <div className="w-full lg:w-1/2 flex flex-col gap-16 lg:gap-24 py-12">
            {data.scenes.map((scene, index) => (
              <div 
                key={index}
                onClick={(e) => {
                  if (activeScene === index) return;
                  setActiveScene(index);
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`scrolly-scene min-h-[60vh] flex flex-col justify-center transition-all duration-500 ${
                  activeScene === index ? "opacity-100 translate-x-2" : "opacity-40 scale-95 cursor-pointer hover:opacity-70"
                }`}
              >
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 text-[#1F7A53] flex items-center justify-center text-[10px] font-black">
                    {index + 1}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Storyboard Scene</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] mb-4">
                  {scene.title}
                </h3>
                
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                  {scene.description}
                </p>

                {/* Mobile / Tablet Visual & Interactive Panel */}
                <div className="lg:hidden w-full border border-gray-200 rounded-3xl bg-white shadow-xl overflow-hidden p-5 flex flex-col my-4">
                  {renderVisualPanel(index)}
                </div>
              </div>
            ))}

            {/* Spacer to allow the last scene to scroll to the center of the viewport */}
            <div className="h-[50vh] pointer-events-none" />
          </div>

          {/* Right Column: Sticky Visual & Prompt Viewer */}
          <div className="hidden lg:flex lg:w-1/2 lg:sticky lg:top-36 h-[580px] rounded-3xl border border-gray-200 bg-white shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #0B3D2E 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Displaying corresponding visual screen mock based on active scene */}
            <div className="flex-1 flex flex-col justify-between p-6 relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-full flex flex-col justify-between relative z-10"
                >
                  {renderVisualPanel(activeScene)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
