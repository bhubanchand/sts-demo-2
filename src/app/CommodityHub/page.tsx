"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Sprout, Globe, Compass, ArrowRight, ShieldCheck, 
  Leaf, Info, Sparkles, Scale, RefreshCw, BarChart3, AlertTriangle, 
  MapPin, Cpu, Database, Network, ChevronRight, Droplet, Trees, 
  Satellite, Coins, Gauge, Shield, FileText, CheckSquare, Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

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

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const COUNTRY_TO_CONTINENT: Record<string, string> = {
  // --- South America ---
  "Brazil": "South America", "Argentina": "South America", "Colombia": "South America", 
  "Peru": "South America", "Chile": "South America", "Ecuador": "South America", 
  "Paraguay": "South America", "Uruguay": "South America", "Bolivia": "South America", 
  "Venezuela": "South America", "Guyana": "South America", "Suriname": "South America",
  "Falkland Is.": "South America",

  // --- North America ---
  "United States": "North America", "United States of America": "North America",
  "Canada": "North America", "Mexico": "North America", "Guatemala": "North America",
  "Cuba": "North America", "Honduras": "North America", "Nicaragua": "North America",
  "El Salvador": "North America", "Costa Rica": "North America", "Panama": "North America",
  "Belize": "North America", "Haiti": "North America", "Dominican Rep.": "North America",
  "Dominican Republic": "North America", "Jamaica": "North America", "Greenland": "North America",
  "Bahamas": "North America", "Puerto Rico": "North America",

  // --- Europe ---
  "United Kingdom": "Europe", "Germany": "Europe", "France": "Europe", "Italy": "Europe",
  "Spain": "Europe", "Ukraine": "Europe", "Poland": "Europe", "Romania": "Europe",
  "Netherlands": "Europe", "Belgium": "Europe", "Greece": "Europe", "Czech Rep.": "Europe",
  "Czechia": "Europe", "Portugal": "Europe", "Sweden": "Europe", "Hungary": "Europe",
  "Belarus": "Europe", "Austria": "Europe", "Switzerland": "Europe", "Bulgaria": "Europe",
  "Serbia": "Europe", "Denmark": "Europe", "Finland": "Europe", "Slovakia": "Europe",
  "Norway": "Europe", "Ireland": "Europe", "Croatia": "Europe", "Moldova": "Europe",
  "Bosnia and Herz.": "Europe", "Bosnia and Herzegovina": "Europe", "Albania": "Europe",
  "Lithuania": "Europe", "Macedonia": "Europe", "Slovenia": "Europe", "Latvia": "Europe",
  "Estonia": "Europe", "Montenegro": "Europe", "Luxembourg": "Europe", "Iceland": "Europe",
  "Vatican City": "Europe", "Kosovo": "Europe",

  // --- Africa ---
  "Nigeria": "Africa", "Ethiopia": "Africa", "Egypt": "Africa", "Democratic Republic of the Congo": "Africa",
  "Dem. Rep. Congo": "Africa", "Tanzania": "Africa", "South Africa": "Africa", "Kenya": "Africa",
  "Uganda": "Africa", "Algeria": "Africa", "Sudan": "Africa", "Morocco": "Africa",
  "Angola": "Africa", "Mozambique": "Africa", "Ghana": "Africa", "Madagascar": "Africa",
  "Cameroon": "Africa", "Côte d'Ivoire": "Africa", "Ivory Coast": "Africa", "Niger": "Africa",
  "Burkina Faso": "Africa", "Mali": "Africa", "Malawi": "Africa", "Zambia": "Africa",
  "Senegal": "Africa", "Chad": "Africa", "Somalia": "Africa", "Somaliland": "Africa",
  "Zimbabwe": "Africa", "Guinea": "Africa", "Rwanda": "Africa", "Benin": "Africa",
  "Burundi": "Africa", "Tunisia": "Africa", "South Sudan": "Africa", "Togo": "Africa",
  "Sierra Leone": "Africa", "Libya": "Africa", "Congo": "Africa", "Central African Rep.": "Africa",
  "Central African Republic": "Africa", "Eritrea": "Africa", "Namibia": "Africa", "Gambia": "Africa",
  "Botswana": "Africa", "Gabon": "Africa", "Lesotho": "Africa", "Swaziland": "Africa",
  "Equatorial Guinea": "Africa", "Mauritania": "Africa", "Liberia": "Africa", "Guinea-Bissau": "Africa",
  "Djibouti": "Africa", "Western Sahara": "Africa",

  // --- Asia ---
  "China": "Asia", "India": "Asia", "Indonesia": "Asia", "Pakistan": "Asia",
  "Bangladesh": "Asia", "Japan": "Asia", "Philippines": "Asia", "Vietnam": "Asia",
  "Turkey": "Asia", "Iran": "Asia", "Thailand": "Asia", "Myanmar": "Asia",
  "South Korea": "Asia", "Iraq": "Asia", "Afghanistan": "Asia", "Saudi Arabia": "Asia",
  "Uzbekistan": "Asia", "Malaysia": "Asia", "Nepal": "Asia", "Yemen": "Asia",
  "North Korea": "Asia", "Sri Lanka": "Asia", "Kazakhstan": "Asia", "Syria": "Asia",
  "Cambodia": "Asia", "Jordan": "Asia", "Azerbaijan": "Asia", "United Arab Emirates": "Asia",
  "Tajikistan": "Asia", "Israel": "Asia", "Laos": "Asia", "Kyrgyzstan": "Asia",
  "Lebanon": "Asia", "Turkmenistan": "Asia", "Singapore": "Asia", "Oman": "Asia",
  "State of Palestine": "Asia", "Palestine": "Asia", "Kuwait": "Asia", "Mongolia": "Asia",
  "Georgia": "Asia", "Armenia": "Asia", "Qatar": "Asia", "Bahrain": "Asia",
  "Timor-Leste": "Asia", "Taiwan": "Asia", "Brunei": "Asia", "Russia": "Asia",

  // --- Oceania ---
  "Australia": "Oceania", "Papua New Guinea": "Oceania", "New Zealand": "Oceania",
  "Fiji": "Oceania", "Solomon Islands": "Oceania", "Vanuatu": "Oceania",
  "New Caledonia": "Oceania",

  // --- Antarctica ---
  "Antarctica": "Antarctica", "Fr. S. Antarctic Lands": "Antarctica"
};

export function CommodityHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<"category" | "region" | "regulation" | "sustainability">("category");
  
  // Map Hover/Click states
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  const [selectedSustainability, setSelectedSustainability] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // autocomplete suggestions based on search query
  const autocompleteOptions = [
    { label: "Coffee (Global)", url: "/CommodityHub/coffee" },
    { label: "Coffee (Brazil)", url: "/CommodityHub/coffee#growing-regions" },
    { label: "Coffee (Colombia)", url: "/CommodityHub/coffee#growing-regions" },
    { label: "Coffee Supply Chain", url: "/CommodityHub/coffee#supply-chain" },
    { label: "Coffee Carbon Footprint", url: "/CommodityHub/coffee#carbon" },
    { label: "Coffee EUDR Compliance", url: "/CommodityHub/coffee#compliance" },
    { label: "Cocoa (Global)", url: "/CommodityHub/cocoa" },
    { label: "Cocoa (Cote d'Ivoire)", url: "/CommodityHub/cocoa#growing-regions" },
    { label: "Cocoa Deforestation checks", url: "/CommodityHub/cocoa#compliance" },
    { label: "Palm Oil (Indonesia)", url: "/CommodityHub/palm-oil" },
    { label: "Palm Oil RSPO Verification", url: "/CommodityHub/palm-oil#compliance" },
    { label: "Rice Methane Tracking", url: "/CommodityHub/rice#carbon" },
    { label: "Tea Sourcing (Kenya)", url: "/CommodityHub/tea" },
    { label: "Cotton Traceability", url: "/CommodityHub/cotton" },
    { label: "Rubber FSC Sourcing", url: "/CommodityHub/rubber" },
    { label: "Sugarcane Outgrowers", url: "/CommodityHub/sugarcane" },
    { label: "Fruits & Vegetables Cold Chain", url: "/CommodityHub/fruits-vegetables" },
    { label: "Grains Silo Monitoring", url: "/CommodityHub/grains" },
    { label: "Seed Production Pedigree", url: "/CommodityHub/seed-production" },
    { label: "Spices (Madagascar Vanilla)", url: "/CommodityHub/spices" },
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
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#0B3D2E]/8 shadow-sm">
            <h3 className="text-lg font-black mb-5 flex items-center gap-2 text-[#0b3d2e]">
              <Compass className="w-5 h-5 text-emerald-600" /> Browse Catalog
            </h3>
            
            {/* Segmented Control Pill Tabs */}
            <div className="bg-gray-100/70 p-1.5 rounded-2xl grid grid-cols-2 gap-1.5 mb-6 border border-gray-200/30">
              {(["category", "region", "regulation", "sustainability"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2.5 px-2 rounded-xl text-[11px] font-black uppercase tracking-wide text-center transition-all duration-300 ${activeTab === tab ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100' : 'text-gray-400 hover:text-gray-600 border border-transparent'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content list - Scrollable container */}
            <div 
              className="space-y-2 h-[340px] overflow-y-auto overscroll-contain pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-600/30"
              onWheel={(e) => { e.stopPropagation(); }}
            >
              {activeTab === "category" && [
                { icon: "🌾", name: "Cereals", desc: "Wheat, Barley, Rice, Maize" },
                { icon: "☕", name: "Beverage Crops", desc: "Coffee, Cocoa, Tea" },
                { icon: "🌴", name: "Oilseeds", desc: "Palm Oil, Soybean, Sunflower" },
                { icon: "🌶", name: "Spices", desc: "Vanilla, Saffron, Black Pepper" },
                { icon: "🍎", name: "Fruits", desc: "Banana, Apples, Citrus" },
                { icon: "🌳", name: "Plantation", desc: "Sugarcane, Rubber, Coconut" },
                { icon: "🌲", name: "Forestry", desc: "Timber, Pulp, Paper" },
                { icon: "🐄", name: "Livestock", desc: "Beef, Dairy, Poultry" },
                { icon: "🐟", name: "Aquaculture", desc: "Shrimp, Salmon, Seaweed" },
              ].map((item, idx) => {
                const isSel = selectedCategory === item.name;
                return (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedCategory(isSel ? null : item.name)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 group active:scale-[0.99] ${isSel ? 'bg-emerald-50/60 border-emerald-600/30 text-emerald-900' : 'bg-white border-gray-100 hover:border-emerald-600/20 hover:bg-emerald-50/10'}`}
                  >
                    <span className="text-xl w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm text-gray-800 group-hover:text-emerald-700 transition-colors">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-semibold group-hover:text-emerald-600/70 transition-colors truncate">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}

              {activeTab === "region" && [
                { name: "Global Map Hub", count: "500+ crops" },
                { name: "Africa", count: "124 crops" },
                { name: "Asia", count: "198 crops" },
                { name: "Europe", count: "65 crops" },
                { name: "North America", count: "78 crops" },
                { name: "South America", count: "112 crops" },
                { name: "Oceania", count: "43 crops" },
              ].map((item, idx) => {
                const isSel = selectedRegion === (item.name === "Global Map Hub" ? null : item.name);
                const isGlobal = item.name === "Global Map Hub";
                const isSelRegion = isGlobal ? !selectedRegion : selectedRegion === item.name;
                return (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedRegion(isGlobal ? null : item.name)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group active:scale-[0.99] ${isSelRegion ? 'bg-emerald-50/60 border-emerald-600/30 text-emerald-900' : 'bg-white border-gray-100 hover:border-emerald-600/20 hover:bg-emerald-50/10'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className={`w-4 h-4 ${isSelRegion ? 'text-emerald-700' : 'text-gray-400 group-hover:text-emerald-600'}`} />
                      <span className="font-bold text-sm text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-[9px] bg-gray-100 group-hover:bg-emerald-100/50 text-gray-500 font-bold px-2.5 py-0.5 rounded-full">{item.count}</span>
                  </button>
                );
              })}

              {activeTab === "regulation" && [
                { name: "EUDR (Deforestation)", desc: "EU 2023/1115 compliance verification", icon: FileText, bg: "bg-emerald-500/10", text: "text-emerald-700" },
                { name: "CSRD", desc: "Corporate Sustainability disclosures", icon: CheckSquare, bg: "bg-blue-500/10", text: "text-blue-700" },
                { name: "FSMA 204", desc: "FDA food safety traceability rule", icon: Utensils, bg: "bg-amber-500/10", text: "text-amber-700" },
                { name: "Organic", desc: "USDA / EU Organic certificates", icon: Sprout, bg: "bg-green-500/10", text: "text-green-700" },
                { name: "Fair Trade", desc: "Ethical pricing & labor audits", icon: Scale, bg: "bg-purple-500/10", text: "text-purple-700" },
                { name: "Rainforest Alliance", desc: "Biodiversity & climate audits", icon: Leaf, bg: "bg-teal-500/10", text: "text-teal-700" },
              ].map((item, idx) => {
                const rName = item.name.split(" ")[0]; // "EUDR", "Organic", etc.
                const isSel = selectedRegulation === rName;
                const IconComponent = item.icon;
                return (
                  <button 
                    key={idx}
                    onClick={() => setSelectedRegulation(isSel ? null : rName)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 min-h-[66px] group active:scale-[0.99] ${isSel ? 'bg-emerald-50/60 border-emerald-600/30 text-emerald-900' : 'bg-white border-gray-100 hover:border-emerald-600/20 hover:bg-emerald-50/10'}`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <IconComponent className={`w-4 h-4 ${item.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm text-gray-800 group-hover:text-emerald-700 transition-colors">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-semibold group-hover:text-emerald-600/70 transition-colors leading-tight">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                );
              })}

              {activeTab === "sustainability" && [
                { name: "Carbon & Scope 3", desc: "Field carbon sequestration tracking", icon: Gauge, bg: "bg-indigo-500/10", text: "text-indigo-700" },
                { name: "Biodiversity", desc: "High conservation value area mapping", icon: Trees, bg: "bg-green-500/10", text: "text-green-700" },
                { name: "Deforestation", desc: "Real-time satellite canopy alerts", icon: Satellite, bg: "bg-red-500/10", text: "text-red-700" },
                { name: "Farmer Livelihood", desc: "Premium payments & Living Income", icon: Coins, bg: "bg-amber-500/10", text: "text-amber-700" },
                { name: "Water Conservation", desc: "Water footprints & AWD monitoring", icon: Droplet, bg: "bg-blue-500/10", text: "text-blue-700" },
                { name: "Climate Resilience", desc: "Climate risk vulnerability scoring", icon: Shield, bg: "bg-orange-500/10", text: "text-orange-700" },
              ].map((item, idx) => {
                const isSel = selectedSustainability === item.name;
                const IconComponent = item.icon;
                return (
                  <button 
                    key={idx}
                    onClick={() => setSelectedSustainability(isSel ? null : item.name)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 min-h-[66px] group active:scale-[0.99] ${isSel ? 'bg-emerald-50/60 border-emerald-600/30 text-emerald-900' : 'bg-white border-gray-100 hover:border-emerald-600/20 hover:bg-emerald-50/10'}`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <IconComponent className={`w-4 h-4 ${item.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm text-gray-800 group-hover:text-emerald-700 transition-colors">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-semibold group-hover:text-emerald-600/70 transition-colors leading-tight">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Commodities Grid */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" /> Featured Commodities
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                {selectedRegion && (
                  <button 
                    onClick={() => setSelectedRegion(null)} 
                    className="text-[10px] font-bold bg-[#E2EFE7] text-[#0b3d2e] px-2.5 py-1 rounded-full border border-emerald-600/10 hover:bg-emerald-600/10 transition-colors flex items-center gap-1.5"
                  >
                    Region: {selectedRegion} <span className="opacity-60 text-xs">×</span>
                  </button>
                )}
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)} 
                    className="text-[10px] font-bold bg-emerald-50 text-emerald-750 px-2.5 py-1 rounded-full border border-emerald-600/10 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                  >
                    Category: {selectedCategory} <span className="opacity-60 text-xs">×</span>
                  </button>
                )}
                {selectedRegulation && (
                  <button 
                    onClick={() => setSelectedRegulation(null)} 
                    className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-600/10 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                  >
                    Regulation: {selectedRegulation} <span className="opacity-60 text-xs">×</span>
                  </button>
                )}
                {selectedSustainability && (
                  <button 
                    onClick={() => setSelectedSustainability(null)} 
                    className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-600/10 hover:bg-amber-100 transition-colors flex items-center gap-1.5"
                  >
                    Focus: {selectedSustainability} <span className="opacity-60 text-xs">×</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { name: "Coffee", key: "coffee", path: "/CommodityHub/coffee", risk: "High Climate Risk", region: "South America, Africa, Asia", category: "Beverage Crops", regulations: ["EUDR", "Organic", "Rainforest Alliance"], sustainability: ["Carbon & Scope 3", "Deforestation", "Climate Resilience"] },
                { name: "Cocoa", key: "cocoa", path: "/CommodityHub/cocoa", risk: "EUDR High Risk", region: "Africa, South America", category: "Beverage Crops", regulations: ["EUDR", "Fair Trade", "Rainforest Alliance"], sustainability: ["Carbon & Scope 3", "Deforestation", "Farmer Livelihood"] },
                { name: "Cotton", key: "cotton", path: "/CommodityHub/cotton", risk: "Organic Certified", region: "Asia, North America", category: "Plantation", regulations: ["Organic", "Fair Trade"], sustainability: ["Carbon & Scope 3", "Farmer Livelihood"] },
                { name: "Palm Oil", key: "palm_oil", path: "/CommodityHub/palm-oil", risk: "EUDR Deforestation Check", region: "Asia, South America", category: "Oilseeds", regulations: ["EUDR", "Rainforest Alliance"], sustainability: ["Deforestation", "Biodiversity"] },
                { name: "Rice", key: "rice", path: "/CommodityHub/rice", risk: "Methane Monitored", region: "Asia", category: "Cereals", regulations: ["Organic", "FSMA 204"], sustainability: ["Water Conservation", "Carbon & Scope 3"] },
                { name: "Tea", key: "tea", path: "/CommodityHub/tea", risk: "Fair Trade Certified", region: "Africa, Asia", category: "Beverage Crops", regulations: ["Fair Trade", "Rainforest Alliance"], sustainability: ["Farmer Livelihood", "Climate Resilience"] },
                { name: "Soybean", key: "soybean", path: "/CommodityHub/soybean", risk: "EUDR Land Cover Check", region: "South America, North America", category: "Oilseeds", regulations: ["EUDR"], sustainability: ["Deforestation", "Biodiversity"] },
                { name: "Rubber", key: "rubber", path: "/CommodityHub/rubber", risk: "FSC Certified", region: "Asia, Africa", category: "Plantation", regulations: ["EUDR", "Organic"], sustainability: ["Deforestation", "Biodiversity"] },
                { name: "Banana", key: "banana", path: "/CommodityHub/banana", risk: "Disease Scanned", region: "South America", category: "Fruits", regulations: ["Organic", "Fair Trade"], sustainability: ["Farmer Livelihood", "Climate Resilience"] },
                { name: "Timber", key: "timber", path: "/CommodityHub/timber", risk: "Lidar Tree Height", region: "North America, Europe", category: "Forestry", regulations: ["EUDR"], sustainability: ["Deforestation", "Biodiversity"] }
              ]
              .filter(crop => !selectedRegion || crop.region.includes(selectedRegion))
              .filter(crop => !selectedCategory || crop.category === selectedCategory)
              .filter(crop => !selectedRegulation || crop.regulations.includes(selectedRegulation))
              .filter(crop => !selectedSustainability || crop.sustainability.includes(selectedSustainability))
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
            <div className="lg:col-span-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-center relative min-h-[450px]">
              
              {/* Tooltip Overlay */}
              <AnimatePresence>
                {hoveredRegion && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 pointer-events-none"
                    style={
                      !isMobile
                        ? { 
                            position: 'fixed',
                            left: tooltipPos.x, 
                            top: tooltipPos.y,
                            transform: 'translate(-50%, -120%)'
                          }
                        : {
                            position: 'absolute',
                            left: "50%",
                            top: "16px",
                            transform: 'translateX(-50%)'
                          }
                    }
                  >
                    <div className="flex flex-col gap-0.5 min-w-[145px] text-left">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#1F7A53]" />
                        <span className="font-bold text-[#0B3D2E] text-xs">{hoveredRegion}</span>
                      </div>
                      <span className="text-xs text-emerald-600 font-semibold pl-6 block">
                        {(regionCrops[hoveredRegion] || []).join(", ")}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold pl-6 block uppercase tracking-wider">
                        Active Traced Region
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {mounted && (
                <ComposableMap 
                  projection="geoMercator" 
                  projectionConfig={{ 
                    scale: isMobile ? 110 : 130,
                    center: [10, 10]
                  }}
                  width={800}
                  height={isMobile ? 380 : 420}
                  className="w-full h-full"
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                       geographies.map((geo) => {
                        const countryName = geo.properties.name;
                        const mappedName = countryName === "United States of America" ? "United States" : countryName === "Brazil" ? "Brazil" : countryName;
                        const region = COUNTRY_TO_CONTINENT[mappedName];
                        const isOperating = !!region;
                        const isSelectedRegion = selectedRegion === region;
                        
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={(e) => {
                               if (isOperating) {
                                  setHoveredRegion(region);
                                  setTooltipPos({ x: e.clientX, y: e.clientY });
                                }
                            }}
                            onMouseMove={(e) => {
                               if (isOperating) {
                                  setTooltipPos({ x: e.clientX, y: e.clientY });
                               }
                            }}
                            onMouseLeave={() => {
                               setHoveredRegion(null);
                            }}
                            onClick={() => {
                              if (isOperating) {
                                setSelectedRegion(region);
                              }
                            }}
                            style={{
                              default: {
                                fill: isSelectedRegion 
                                  ? "#1F7A53" 
                                  : (hoveredRegion === region) 
                                    ? "#53D769" 
                                    : isOperating ? "#E2EFE7" : "#f1f5f9",
                                stroke: "#ffffff",
                                strokeWidth: 0.5,
                                outline: "none",
                                transition: "all 0.3s ease"
                              },
                              hover: {
                                fill: isOperating ? "#1F7A53" : "#e2e8f0",
                                stroke: "#ffffff",
                                strokeWidth: 0.5,
                                outline: "none",
                                cursor: isOperating ? "pointer" : "default"
                              },
                              pressed: {
                                fill: isOperating ? "#0B3D2E" : "#e2e8f0",
                                outline: "none",
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
              )}
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
                        href={COMPARISON_DB[lowercaseCrop] ? `/CommodityHub/${lowercaseCrop.replace("_", "-")}` : "#"}
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
                  Tip: Click on any continent on the map to filter commodities by that region.
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
