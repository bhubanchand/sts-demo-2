"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Sprout, Globe, Compass, ArrowRight, ShieldCheck, 
  Leaf, Info, Sparkles, Scale, RefreshCw, BarChart3, AlertTriangle, 
  MapPin, Cpu, Database, Network, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Interfaces
interface CommodityCompareData {
  regions: string;
  climateRisk: string;
  compliance: string;
  carbon: string;
  supplyChain: string;
  yield: string;
  farmerNetwork: string;
  satellite: string;
  challenges: string;
  markets: string;
}

const COMPARISON_DB: Record<string, CommodityCompareData> = {
  coffee: {
    regions: "Brazil, Vietnam, Colombia, Ethiopia, Honduras",
    climateRisk: "High (Extreme temperature sensitivity & rust disease)",
    compliance: "EUDR (Deforestation), Fair Trade, Organic, Rainforest Alliance",
    carbon: "1.2 - 2.5 kg CO2e per kg green coffee (High process footprint)",
    supplyChain: "Highly complex: Smallholder -> Cooperative -> Exporter -> Importer -> Roaster",
    yield: "0.8 - 1.5 tons/hectare",
    farmerNetwork: "25M+ smallholders globally",
    satellite: "Canopy shade density, farm boundary mapping, stress indices",
    challenges: "Price volatility, child labor risk, climate displacement",
    markets: "European Union, United States, Japan, Canada"
  },
  cocoa: {
    regions: "Côte d'Ivoire, Ghana, Indonesia, Ecuador, Nigeria",
    climateRisk: "Very High (Drought & swollen shoot virus vulnerability)",
    compliance: "EUDR (Deforestation), Child Labor Due Diligence, UTZ/Rainforest Alliance",
    carbon: "3.2 - 5.0 kg CO2e per kg cocoa beans (High land use change impact)",
    supplyChain: "Extremely fragmented: Smallholder -> Local Buyer (Pisteurs) -> Co-op -> Exporter -> Chocolate Brand",
    yield: "0.4 - 0.7 tons/hectare",
    farmerNetwork: "6M+ smallholders, primarily West Africa",
    satellite: "Deforestation alerts, tree-cover loss boundary verification",
    challenges: "Systemic poverty, child labor, high rates of deforestation",
    markets: "Europe, North America, Asia-Pacific"
  },
  cotton: {
    regions: "India, China, United States, Brazil, Pakistan",
    climateRisk: "Medium (Water stress & pest vulnerability)",
    compliance: "Better Cotton Initiative (BCI), Organic (OCS/GOTS), Fair Trade",
    carbon: "1.5 - 2.0 kg CO2e per kg lint",
    supplyChain: "Medium: Farmer -> Ginning -> Spinning -> Weaving -> Garment Maker",
    yield: "0.7 - 1.2 tons/hectare",
    farmerNetwork: "10M+ smallholders",
    satellite: "Soil moisture tracking, crop health NDVI monitoring",
    challenges: "Genetically modified seed purity, heavy pesticide/water use",
    markets: "China, Southeast Asia, Turkey, Bangladesh"
  },
  palm_oil: {
    regions: "Indonesia, Malaysia, Thailand, Colombia",
    climateRisk: "Medium (Rainfall pattern changes)",
    compliance: "RSPO (Sustainable Palm Oil), EUDR (High Risk category)",
    carbon: "2.8 - 4.2 kg CO2e per ton crude palm oil",
    supplyChain: "Industrial-integrated: Smallholder/Estate -> Mill -> Refinery -> CPG Brand",
    yield: "3.5 - 4.5 tons/hectare",
    farmerNetwork: "3M+ smallholders & estates",
    satellite: "Real-time deforestation monitoring, peatland drainage alerts",
    challenges: "Peatland destruction, biodiversity loss (orangutan habitat)",
    markets: "India, China, European Union, Pakistan"
  },
  rice: {
    regions: "China, India, Indonesia, Bangladesh, Vietnam",
    climateRisk: "High (Sea level rise in deltas, water scarcity)",
    compliance: "Sustainable Rice Platform (SRP), Methane Reduction Standards",
    carbon: "1.8 - 3.0 kg CO2e per kg (High methane from flooded paddies)",
    supplyChain: "Regional/Local: Farmer -> Local Mill -> Wholesaler -> Retailer",
    yield: "4.0 - 6.5 tons/hectare",
    farmerNetwork: "150M+ smallholders in Asia",
    satellite: "AWD (Alternate Wetting/Drying) water levels, methane emissions model",
    challenges: "Methane emissions, heavy water footprint, soil salinity",
    markets: "China, India, West Africa, Middle East"
  },
  tea: {
    regions: "China, India, Kenya, Sri Lanka, Vietnam",
    climateRisk: "Medium-High (Monsoon shifts & temperature peaks)",
    compliance: "Rainforest Alliance, Ethical Tea Partnership, Fair Trade",
    carbon: "0.5 - 1.0 kg CO2e per kg processed tea",
    supplyChain: "Estate/Co-op: Smallholders -> Factory -> Auction -> Packer -> Brand",
    yield: "1.5 - 2.2 tons/hectare",
    farmerNetwork: "10M+ smallholders & estate workers",
    satellite: "Slope erosion, shade canopy cover, soil health",
    challenges: "Living wage on estates, pesticide residues, soil erosion",
    markets: "United Kingdom, Russia, United States, Middle East"
  },
  soybean: {
    regions: "Brazil, United States, Argentina, China",
    climateRisk: "Medium (Drought susceptibility in South America)",
    compliance: "EUDR, RTRS (Round Table on Responsible Soy), ProTerra",
    carbon: "0.8 - 3.5 kg CO2e per kg (Highly dependent on land conversion)",
    supplyChain: "Commoditized: Farmer -> Silo/Elevator -> Crusher -> Trader -> Feed/Food Brand",
    yield: "2.8 - 3.5 tons/hectare",
    farmerNetwork: "Large-scale commercial & medium outgrowers",
    satellite: "Land cover classification, forest-clearing polygons",
    challenges: "Cerrado deforestation, land concentration, chemical drift",
    markets: "China, European Union, Southeast Asia"
  },
  rubber: {
    regions: "Thailand, Indonesia, Vietnam, Ivory Coast",
    climateRisk: "Medium (Leaf fall disease & wind damage)",
    compliance: "EUDR, FSC (Forest Stewardship Council), GPSNR guidelines",
    carbon: "0.6 - 1.4 kg CO2e per kg dry rubber",
    supplyChain: "Segmented: Smallholder -> Dealer -> Processor -> Tire Manufacturer",
    yield: "1.2 - 1.8 tons/hectare",
    farmerNetwork: "6M+ smallholders",
    satellite: "Agroforestry classification, latex tapping status",
    challenges: "Low farmgate prices, land conversion, leaf blight",
    markets: "China, United States, European Union, Japan"
  },
  banana: {
    regions: "Ecuador, Philippines, Costa Rica, Colombia",
    climateRisk: "Very High (TR4 Panama Disease & hurricane risk)",
    compliance: "GLOBALG.A.P., Organic, Fair Trade, Rainforest Alliance",
    carbon: "0.8 - 1.2 kg CO2e per kg (High logistics cold chain emissions)",
    supplyChain: "Integrated: Smallholder/Estate -> Packing Station -> Port -> Ripening -> Retail",
    yield: "20 - 45 tons/hectare",
    farmerNetwork: "2M+ smallholders & estate workers",
    satellite: "Disease detection, crop health NDVI, storm damage mapping",
    challenges: "TR4 disease threat, heavy pesticide load, labor conditions",
    markets: "United States, European Union, Russia"
  },
  timber: {
    regions: "Canada, United States, Brazil, Russia, Sweden",
    climateRisk: "High (Wildfires, bark beetle infestations)",
    compliance: "EUDR, FSC, PEFC (Programme for the Endorsement of Forest Certification)",
    carbon: "Net carbon sink (if managed sustainably)",
    supplyChain: "Industrial: Forest Owner -> Logger -> Sawmill -> Paper/Furniture -> Consumer",
    yield: "N/A (Decades-long growth cycles)",
    farmerNetwork: "Millions of family forest owners & concession holders",
    satellite: "Tree height Lidar, illegal logging detection, canopy density",
    challenges: "Illegal logging, biodiversity degradation, wildfire risk",
    markets: "United States, China, European Union, Japan"
  }
};

const SUGGESTIONS = [
  { text: "Show me commodities affected by EUDR.", label: "EUDR Scope" },
  { text: "Show me crops grown in Kenya.", label: "Kenya Sourcing" },
  { text: "Show me carbon projects in cocoa.", label: "Cocoa Carbon" },
  { text: "Show me crops at high deforestation risk.", label: "Deforestation Risk" },
  { text: "Show me commodities exported from India.", label: "India Exports" },
  { text: "Show me crops suitable for regenerative agriculture.", label: "Regenerative" }
];

export function CommodityHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<"category" | "region" | "regulation" | "sustainability">("category");
  
  // A/B Comparison States
  const [compA, setCompA] = useState("coffee");
  const [compB, setCompB] = useState("cocoa");

  // AI Chat Simulation
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Map Hover/Click states
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // autocomplete suggestions based on search query
  const autocompleteOptions = [
    { label: "Coffee (Global)", url: "/CropInsights/coffee" },
    { label: "Coffee (Brazil)", url: "/CropInsights/coffee#growing-regions" },
    { label: "Coffee (Colombia)", url: "/CropInsights/coffee#growing-regions" },
    { label: "Coffee Supply Chain", url: "/CropInsights/coffee#supply-chain" },
    { label: "Coffee Carbon Footprint", url: "/CropInsights/coffee#carbon" },
    { label: "Coffee EUDR Compliance", url: "/CropInsights/coffee#compliance" },
    { label: "Cocoa (Global)", url: "/CropInsights/cocoa" },
    { label: "Cocoa (Cote d'Ivoire)", url: "/CropInsights/cocoa#growing-regions" },
    { label: "Cocoa Deforestation checks", url: "/CropInsights/cocoa#compliance" },
    { label: "Palm Oil (Indonesia)", url: "/CropInsights/palm-oil" },
    { label: "Palm Oil RSPO Verification", url: "/CropInsights/palm-oil#compliance" },
    { label: "Rice Methane Tracking", url: "/CropInsights/rice#carbon" },
    { label: "Tea Sourcing (Kenya)", url: "/CropInsights/tea" },
    { label: "Cotton Traceability", url: "/CropInsights/cotton" },
    { label: "Rubber FSC Sourcing", url: "/CropInsights/rubber" },
    { label: "Sugarcane Outgrowers", url: "/CropInsights/sugarcane" },
    { label: "Fruits & Vegetables Cold Chain", url: "/CropInsights/fruits-vegetables" },
    { label: "Grains Silo Monitoring", url: "/CropInsights/grains" },
    { label: "Seed Production Pedigree", url: "/CropInsights/seed-production" },
    { label: "Spices (Madagascar Vanilla)", url: "/CropInsights/spices" },
  ];

  const filteredSuggestions = searchQuery.trim()
    ? autocompleteOptions.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  // Map region to list of crops
  const regionCrops: Record<string, string[]> = {
    "South America": ["Coffee", "Soybean", "Cocoa", "Fruits"],
    "Africa": ["Cocoa", "Coffee", "Tea", "Rubber", "Spices"],
    "Asia": ["Rice", "Palm Oil", "Tea", "Rubber", "Cotton", "Spices"],
    "North America": ["Grains", "Timber", "Fruits", "Vegetables"],
    "Europe": ["Grains", "Forestry", "Livestock"],
    "Oceania": ["Livestock", "Dairy", "Aquaculture"]
  };

  const handleAiSearch = async (queryText: string) => {
    setAiQuery(queryText);
    setIsTyping(true);
    setAiResponse(null);

    await new Promise(resolve => setTimeout(resolve, 1200));

    setIsTyping(false);
    const q = queryText.toLowerCase();

    if (q.includes("eudr")) {
      setAiResponse(
        "Based on EUDR regulations (EU 2023/1115), the following commodities require full first-mile traceability: **Coffee**, **Cocoa**, **Palm Oil**, **Rubber**, **Soybean**, and **Timber**. SourceTrace provides polygon mapping, farm registry, and real-time deforestation screening for all these commodities. [View EUDR Solutions](/compliance/eudr)"
      );
    } else if (q.includes("kenya")) {
      setAiResponse(
        "In Kenya, SourceTrace manages over 45,000 smallholders. Key commodities tracked include **Tea** (Kericho & Kisii regions) and **Coffee** (Nyeri & Kirinyaga cooperatives). The platform tracks farmgate transactions, moisture levels at collection centers, and verifies fair payout distributions. [View Tea Dashboard](/CropInsights/tea) | [View Coffee Dashboard](/CropInsights/coffee)"
      );
    } else if (q.includes("carbon") || q.includes("cocoa")) {
      setAiResponse(
        "For **Cocoa**, SourceTrace tracks agroforestry carbon sequestration. Using canopy height lidar and NDVI index, the platform verifies carbon offsets for Mars and Cargill in West Africa. [View Cocoa Dashboard](/CropInsights/cocoa) | [View Carbon Monitoring](/intelligence/carbon-monitoring)"
      );
    } else if (q.includes("deforestation") || q.includes("risk")) {
      setAiResponse(
        "High deforestation risk commodities tracked by SourceTrace include **Palm Oil** (Indonesia & Malaysia) and **Soybean** (Brazilian Cerrado). The platform overlays tree-canopy change alerts in real-time to trigger immediate sourcing blocks. [View Deforestation Monitoring](/intelligence/deforestation-monitoring)"
      );
    } else if (q.includes("india")) {
      setAiResponse(
        "In India, key tracked crops include **Rice** (basmati mapping under AWD irrigation), **Cotton** (non-GMO Chetna Organic cooperatives), and **Spices** (turmeric and chili sourcing). [View Rice Dashboard](/CropInsights/rice) | [View Cotton Dashboard](/CropInsights/cotton)"
      );
    } else if (q.includes("regenerative")) {
      setAiResponse(
        "Crops actively enrolled in SourceTrace regenerative programs include **Cotton** (soil organic carbon tracking), **Rice** (AWD water savings), and **Coffee** (shade-grown agroforestry). [View Regenerative Ag](/intelligence/regenerative-agriculture)"
      );
    } else {
      setAiResponse(
        "Found matches for your query. SourceTrace tracks 500+ agricultural commodities across 37 countries, verifying environmental safety and fair trade. [View Sourcing Solutions](/solutions)"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F4FAF6] text-[#0B3D2E] pt-28 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* ─── HERO & HEADER ─── */}
        <section className="text-center py-12 relative overflow-hidden bg-[#0B3D2E] text-white rounded-[32px] px-6 mb-16 shadow-[0_12px_40px_rgba(11,61,46,0.15)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-[#0B3D2E] to-[#0B3D2E]" />
          {/* GIS grid lines background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-[#53D769] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> SourceTrace Sourcing Engine
            </span>
            <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-tight">
              Commodity Intelligence Hub
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
              A real-time geospatial registry monitoring 500+ agricultural commodities for deforestation risks, carbon intensity, and supply chain compliance.
            </p>

            {/* Google Search Style Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <div className={`flex items-center bg-white rounded-full px-6 py-4 shadow-xl transition-all duration-300 ${isFocused ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-[#0B3D2E]' : ''}`}>
                <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 500+ commodities (e.g. Coffee, Cocoa, Soy)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  className="w-full bg-transparent text-gray-800 focus:outline-none placeholder-gray-400 text-base"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 font-medium text-xs uppercase px-2">Clear</button>
                )}
              </div>

              {/* Autocomplete Suggestions */}
              <AnimatePresence>
                {isFocused && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left"
                  >
                    <div className="px-4 py-2 border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Suggested Nodes</div>
                    {filteredSuggestions.map((opt, idx) => (
                      <Link
                        key={idx}
                        href={opt.url}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sprout className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-gray-800 text-sm">{opt.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="text-xs text-gray-400 font-medium">
              Registered Farms: <span className="text-white font-bold">2.4M+</span> &bull; Traced Shipments: <span className="text-white font-bold">120K+ Tons</span>
            </div>
          </div>
        </section>

        {/* ─── INTERACTIVE BROWSER ─── */}
        <section className="grid lg:grid-cols-12 gap-10 mb-20 items-start">
          <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-[#0B3D2E]/8 shadow-sm">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" /> Browse Catalog
            </h3>
            
            <div className="flex border-b border-gray-100 mb-6">
              {(["category", "region", "regulation", "sustainability"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all ${activeTab === tab ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content list */}
            <div className="space-y-1 max-h-[350px] overflow-y-auto pr-2">
              {activeTab === "category" && [
                { icon: "🌾", name: "Cereals", desc: "Wheat, Barley, Rice, Maize" },
                { icon: "☕", name: "Beverage Crops", desc: "Coffee, Cocoa, Tea" },
                { icon: "🌴", name: "Oilseeds", desc: "Palm Oil, Soybean, Sunflower" },
                { icon: "🌶", name: "Spices", desc: "Vanilla, Saffron, Black Pepper" },
                { icon: "🍎", name: "Fruits", desc: "Banana, Apples, Citrus" },
                { icon: "🥕", name: "Vegetables", desc: "Potato, Tomato, Leafy Greens" },
                { icon: "🌳", name: "Plantation", desc: "Sugarcane, Rubber, Coconut" },
                { icon: "🌲", name: "Forestry", desc: "Timber, Pulp, Paper" },
                { icon: "🐄", name: "Livestock", desc: "Beef, Dairy, Poultry" },
                { icon: "🐟", name: "Aquaculture", desc: "Shrimp, Salmon, Seaweed" },
              ].map((item, idx) => (
                <button key={idx} className="w-full text-left p-3 rounded-xl hover:bg-[#F4FAF6] transition-colors flex items-center gap-3 group active:scale-98">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-gray-800 group-hover:text-emerald-700">{item.name}</div>
                    <div className="text-[11px] text-gray-400 font-medium">{item.desc}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}

              {activeTab === "region" && [
                { name: "Global Map Hub", count: "500+ crops" },
                { name: "Africa", count: "124 crops" },
                { name: "Asia", count: "198 crops" },
                { name: "Europe", count: "65 crops" },
                { name: "North America", count: "78 crops" },
                { name: "South America", count: "112 crops" },
                { name: "Oceania", count: "43 crops" },
              ].map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedRegion(item.name === "Global Map Hub" ? null : item.name)}
                  className={`w-full text-left p-3 rounded-xl transition-colors flex items-center justify-between group active:scale-98 ${selectedRegion === item.name ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-[#F4FAF6]'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">{item.count}</span>
                </button>
              ))}

              {activeTab === "regulation" && [
                { name: "EUDR (Deforestation)", desc: "EU 2023/1115 compliance verification" },
                { name: "CSRD", desc: "Corporate Sustainability disclosures" },
                { name: "FSMA 204", desc: "FDA food safety traceability rule" },
                { name: "Organic", desc: "USDA / EU Organic certificates" },
                { name: "Fair Trade", desc: "Ethical pricing & labor audits" },
                { name: "Rainforest Alliance", desc: "Biodiversity & climate audits" },
              ].map((item, idx) => (
                <button key={idx} className="w-full text-left p-3 rounded-xl hover:bg-[#F4FAF6] transition-colors flex items-center justify-between group active:scale-98">
                  <div>
                    <div className="font-bold text-sm text-gray-800 group-hover:text-emerald-700">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{item.desc}</div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </button>
              ))}

              {activeTab === "sustainability" && [
                { name: "Carbon & Scope 3", desc: "Field carbon sequestration tracking" },
                { name: "Biodiversity", desc: "High conservation value area mapping" },
                { name: "Deforestation", desc: "Real-time satellite canopy alerts" },
                { name: "Farmer Livelihood", desc: "Premium payments & Living Income" },
                { name: "Water Conservation", desc: "Water footprints & AWD monitoring" },
                { name: "Climate Resilience", desc: "Climate risk vulnerability scoring" },
              ].map((item, idx) => (
                <button key={idx} className="w-full text-left p-3 rounded-xl hover:bg-[#F4FAF6] transition-colors flex items-center justify-between group active:scale-98">
                  <div>
                    <div className="font-bold text-sm text-gray-800 group-hover:text-emerald-700">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{item.desc}</div>
                  </div>
                  <Leaf className="w-4 h-4 text-emerald-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Featured Commodities Grid */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" /> Featured Commodities
              </h3>
              {selectedRegion && (
                <button onClick={() => setSelectedRegion(null)} className="text-xs font-bold text-emerald-600 hover:text-emerald-800">Clear Region Filter ({selectedRegion})</button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { name: "Coffee", key: "coffee", path: "/CropInsights/coffee", risk: "High Climate Risk", region: "South America, Africa, Asia" },
                { name: "Cocoa", key: "cocoa", path: "/CropInsights/cocoa", risk: "EUDR High Risk", region: "Africa, South America" },
                { name: "Cotton", key: "cotton", path: "/CropInsights/cotton", risk: "Organic Certified", region: "Asia, North America" },
                { name: "Palm Oil", key: "palm_oil", path: "/CropInsights/palm-oil", risk: "EUDR Deforestation Check", region: "Asia, South America" },
                { name: "Rice", key: "rice", path: "/CropInsights/rice", risk: "Methane Monitored", region: "Asia" },
                { name: "Tea", key: "tea", path: "/CropInsights/tea", risk: "Fair Trade Certified", region: "Africa, Asia" },
                { name: "Soybean", key: "soybean", path: "/CropInsights/soybean", risk: "EUDR Land Cover Check", region: "South America, North America" },
                { name: "Rubber", key: "rubber", path: "/CropInsights/rubber", risk: "FSC Certified", region: "Asia, Africa" },
                { name: "Banana", key: "banana", path: "/CropInsights/banana", risk: "Disease Scanned", region: "South America" },
                { name: "Timber", key: "timber", path: "/CropInsights/timber", risk: "Lidar Tree Height", region: "North America, Europe" }
              ]
              .filter(crop => !selectedRegion || crop.region.includes(selectedRegion))
              .map((crop) => (
                <div key={crop.key} className="bg-white p-6 rounded-3xl border border-[#0B3D2E]/8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-emerald-600/30 transition-all duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Sprout className="w-5 h-5 text-emerald-700" />
                      </div>
                      <span className="text-[10px] font-bold bg-[#E2EFE7] text-[#0B3D2E] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {crop.risk}
                      </span>
                    </div>
                    <h4 className="text-xl font-black mb-1">{crop.name}</h4>
                    <p className="text-xs text-gray-400 font-semibold mb-4">{crop.region}</p>
                  </div>
                  <Link href={crop.path} className="inline-flex items-center gap-1.5 text-[#1F7A53] hover:text-[#0B3D2E] text-xs font-bold mt-2 group">
                    View Live Dashboard <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INTERACTIVE GLOBAL MAP ─── */}
        <section className="bg-white rounded-[32px] border border-[#0B3D2E]/8 p-8 md:p-12 mb-20 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">Geospatial Explorer</span>
            <h2 className="text-3xl font-black mb-4">Interactive Global Commodity Map</h2>
            <p className="text-gray-500 text-sm font-medium">
              Click on the active regions to reveal the primary agriculture commodities traced by SourceTrace in that region.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Map Visual */}
            <div className="lg:col-span-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-center relative min-h-[350px]">
              <svg viewBox="0 0 1000 500" className="w-full h-auto text-gray-300">
                {/* Simplified continents as geometric shapes/polygons for clean premium styling */}
                {/* North America */}
                <path
                  d="M100,80 L250,50 L380,180 L280,240 L180,180 Z"
                  fill="currentColor"
                  onClick={() => setSelectedRegion("North America")}
                  className={`cursor-pointer transition-colors duration-200 hover:text-emerald-500/30 ${selectedRegion === "North America" ? 'text-emerald-600/40' : 'text-gray-200'}`}
                />
                {/* South America */}
                <path
                  d="M260,250 L380,270 L340,460 L280,450 Z"
                  fill="currentColor"
                  onClick={() => setSelectedRegion("South America")}
                  className={`cursor-pointer transition-colors duration-200 hover:text-emerald-500/30 ${selectedRegion === "South America" ? 'text-emerald-600/40' : 'text-gray-200'}`}
                />
                {/* Africa */}
                <path
                  d="M480,200 L580,210 L630,300 L560,400 L450,280 Z"
                  fill="currentColor"
                  onClick={() => setSelectedRegion("Africa")}
                  className={`cursor-pointer transition-colors duration-200 hover:text-emerald-500/30 ${selectedRegion === "Africa" ? 'text-emerald-600/40' : 'text-gray-200'}`}
                />
                {/* Europe */}
                <path
                  d="M460,80 L620,70 L580,180 L480,170 Z"
                  fill="currentColor"
                  onClick={() => setSelectedRegion("Europe")}
                  className={`cursor-pointer transition-colors duration-200 hover:text-emerald-500/30 ${selectedRegion === "Europe" ? 'text-emerald-600/40' : 'text-gray-200'}`}
                />
                {/* Asia */}
                <path
                  d="M600,60 L850,80 L880,260 L700,280 L620,180 Z"
                  fill="currentColor"
                  onClick={() => setSelectedRegion("Asia")}
                  className={`cursor-pointer transition-colors duration-200 hover:text-emerald-500/30 ${selectedRegion === "Asia" ? 'text-emerald-600/40' : 'text-gray-200'}`}
                />
                {/* Oceania */}
                <path
                  d="M800,320 L920,330 L880,420 L780,400 Z"
                  fill="currentColor"
                  onClick={() => setSelectedRegion("Oceania")}
                  className={`cursor-pointer transition-colors duration-200 hover:text-emerald-500/30 ${selectedRegion === "Oceania" ? 'text-emerald-600/40' : 'text-gray-200'}`}
                />

                {/* Markers */}
                {/* Brazil (Coffee) */}
                <circle cx="320" cy="320" r="8" className="fill-emerald-600 animate-ping" />
                <circle cx="320" cy="320" r="5" className="fill-[#FFBF00] cursor-pointer" onClick={() => setSelectedRegion("South America")} />
                {/* Indonesia (Palm Oil) */}
                <circle cx="760" cy="300" r="8" className="fill-emerald-600 animate-ping" />
                <circle cx="760" cy="300" r="5" className="fill-[#FFBF00] cursor-pointer" onClick={() => setSelectedRegion("Asia")} />
                {/* India (Rice) */}
                <circle cx="680" cy="200" r="8" className="fill-emerald-600 animate-ping" />
                <circle cx="680" cy="200" r="5" className="fill-[#FFBF00] cursor-pointer" onClick={() => setSelectedRegion("Asia")} />
                {/* Kenya (Tea) */}
                <circle cx="560" cy="280" r="8" className="fill-emerald-600 animate-ping" />
                <circle cx="560" cy="280" r="5" className="fill-[#FFBF00] cursor-pointer" onClick={() => setSelectedRegion("Africa")} />
              </svg>
            </div>

            {/* Region Details Panel */}
            <div className="lg:col-span-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 min-h-[350px] flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-black mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  {selectedRegion ? selectedRegion : "Global View"}
                </h4>
                <p className="text-sm text-gray-500 font-medium mb-6">
                  {selectedRegion 
                    ? `Showing active commodities monitored by SourceTrace in ${selectedRegion}.`
                    : "Select a continent on the map to view regionally tracked commodities."}
                </p>

                <div className="flex flex-wrap gap-2">
                  {(selectedRegion ? regionCrops[selectedRegion] : ["Coffee", "Cocoa", "Tea", "Rice", "Palm Oil", "Cotton", "Sugarcane", "Soybean", "Rubber", "Banana", "Timber", "Spices"]).map((cropName, idx) => {
                    const lowercaseCrop = cropName.toLowerCase().replace(" ", "_");
                    return (
                      <Link
                        key={idx}
                        href={COMPARISON_DB[lowercaseCrop] ? `/CropInsights/${lowercaseCrop.replace("_", "-")}` : "#"}
                        className="px-3.5 py-1.5 bg-white border border-gray-100 hover:border-emerald-600/30 text-xs font-bold rounded-xl shadow-sm text-gray-700 hover:text-emerald-700 flex items-center gap-1 transition-all"
                      >
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        {cropName}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {!selectedRegion && (
                <div className="text-xs text-gray-400 font-medium border-t border-gray-200/50 pt-4 mt-6">
                  Tip: Clicking on the yellow markers will highlight active regional nodes.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── COMMODITY COMPARE (A/B) ─── */}
        <section className="bg-white rounded-[32px] border border-[#0B3D2E]/8 p-8 md:p-12 mb-20 shadow-sm">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">Decision Intelligence</span>
            <h2 className="text-3xl font-black mb-4">Commodity Compare</h2>
            <p className="text-gray-500 text-sm font-medium">
              Compare any two agricultural supply chains to analyze difference in climate risks, compliance mandates, carbon footprint, and yields.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Selector A */}
            <div className="bg-[#F4FAF6] p-5 rounded-2xl border border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Commodity A</label>
              <select 
                value={compA} 
                onChange={(e) => setCompA(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-800"
              >
                {Object.keys(COMPARISON_DB).map((key) => (
                  <option key={key} value={key}>{key.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</option>
                ))}
              </select>
            </div>

            {/* Selector B */}
            <div className="bg-[#F4FAF6] p-5 rounded-2xl border border-gray-100">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Commodity B</label>
              <select 
                value={compB} 
                onChange={(e) => setCompB(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-800"
              >
                {Object.keys(COMPARISON_DB).map((key) => (
                  <option key={key} value={key}>{key.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Metric</th>
                  <th className="p-4 text-sm font-black text-emerald-800 capitalize w-3/8">{compA.replace("_", " ")}</th>
                  <th className="p-4 text-sm font-black text-emerald-800 capitalize w-3/8">{compB.replace("_", " ")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {[
                  { label: "Primary Regions", key: "regions" },
                  { label: "Climate Vulnerability", key: "climateRisk" },
                  { label: "Compliance Mandates", key: "compliance" },
                  { label: "Carbon Footprint", key: "carbon" },
                  { label: "Supply Chain Path", key: "supplyChain" },
                  { label: "Avg Yield", key: "yield" },
                  { label: "Farmer Base", key: "farmerNetwork" },
                  { label: "Satellite Coverage", key: "satellite" },
                  { label: "Core Risks", key: "challenges" },
                  { label: "Key Export Markets", key: "markets" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">{row.label}</td>
                    <td className="p-4 font-medium text-gray-800">{COMPARISON_DB[compA][row.key as keyof CommodityCompareData]}</td>
                    <td className="p-4 font-medium text-gray-800">{COMPARISON_DB[compB][row.key as keyof CommodityCompareData]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── AI COMMODITY SEARCH ─── */}
        <section className="bg-[#0B3D2E] text-white rounded-[32px] p-8 md:p-12 mb-10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mb-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-[#53D769] rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
              <Cpu className="w-3.5 h-3.5" /> AI Agent Search
            </span>
            <h2 className="text-3xl font-black mb-3">AI Commodity Copilot</h2>
            <p className="text-gray-300 text-sm font-medium">
              Ask natural language questions about global crop distributions, carbon sequestration projects, and compliance standards.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 relative z-10">
            {/* Left: Input & Prompt Suggestions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex bg-[#124E33] border border-white/10 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-[#53D769] transition-all">
                <input
                  type="text"
                  placeholder="Ask anything (e.g. show me crops in Kenya)..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiSearch(aiQuery)}
                  className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
                />
                <button 
                  onClick={() => handleAiSearch(aiQuery)}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 font-bold px-4 py-2 rounded-xl text-white transition-all active:scale-95 ml-2"
                >
                  Send
                </button>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Suggested Prompts</span>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAiSearch(sug.text)}
                      className="px-3.5 py-2 bg-[#124E33] border border-white/5 hover:border-emerald-500/30 text-xs font-semibold rounded-xl text-gray-200 hover:text-white transition-all active:scale-98"
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: AI Response Display */}
            <div className="lg:col-span-6 bg-[#07261D] rounded-2xl p-6 border border-white/5 min-h-[220px] flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Copilot Output</div>
                
                {isTyping && (
                  <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                    <span>Analyzing satellite layers and farm registers...</span>
                  </div>
                )}

                {!isTyping && !aiResponse && (
                  <p className="text-sm text-gray-400 font-medium">
                    Choose a suggested prompt or type your query to search the GIS & compliance database.
                  </p>
                )}

                {!isTyping && aiResponse && (
                  <div className="text-sm text-gray-200 leading-relaxed font-medium">
                    {/* Render basic bold formatting and markdown links helper */}
                    {aiResponse.split("\n\n").map((para, pIdx) => {
                      // replace markdown links with real Link component if present
                      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
                      let lastIndex = 0;
                      let match;
                      const children = [];

                      while ((match = linkRegex.exec(para)) !== null) {
                        // Text before link
                        if (match.index > lastIndex) {
                          children.push(para.substring(lastIndex, match.index));
                        }
                        // Link itself
                        const linkText = match[1];
                        const linkUrl = match[2];
                        children.push(
                          <Link key={match.index} href={linkUrl} className="text-[#53D769] hover:underline font-bold">
                            {linkText}
                          </Link>
                        );
                        lastIndex = linkRegex.lastIndex;
                      }

                      if (lastIndex < para.length) {
                        children.push(para.substring(lastIndex));
                      }

                      return (
                        <p key={pIdx} className="mb-3 last:mb-0">
                          {children.length > 0 ? children : para}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

              {aiResponse && (
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold border-t border-white/5 pt-4 mt-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Data verified against active farm polygons.</span>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default CommodityHubPage;
