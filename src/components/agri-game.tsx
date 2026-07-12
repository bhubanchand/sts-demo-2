"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ArrowRight, 
  Home, 
  Compass, 
  Mail, 
  FileText, 
  Leaf, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  AlertCircle,
  WifiOff,
  Activity,
  Users
} from "lucide-react";
import { searchPages, SearchResult } from "@/lib/search-engine";

interface AgriGameProps {
  mode: "404" | "offline" | "500";
}

const farmQuotes = [
  "The trace ended here... but your journey doesn't have to.",
  "We're checking every field... still no sign of this page.",
  "Looks like this shipment took a scenic route.",
  "The GPS says it's somewhere over that hill.",
  "No crops were harmed while losing this page."
];

export function AgriGame({ mode }: AgriGameProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeQuote, setFadeQuote] = useState(true);

  // Rotating quotes interval
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeQuote(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % farmQuotes.length);
        setFadeQuote(true);
      }, 300);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Handle Search Input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const results = await searchPages(searchQuery, 4);
        setSearchResults(results);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Determine specific details based on state
  const headingInfo = {
    "404": {
      badge: "404 - Route Untraced",
      title: "Oops... even the best supply chains occasionally take a wrong turn.",
      desc: "The page you're looking for may have moved, been renamed, or simply doesn't exist anymore. No worries—we'll help you get back on track.",
      statusText: "All Systems Operational",
      statusColor: "emerald"
    },
    "offline": {
      badge: "Connection Lost",
      title: "Looks like our data truck lost its signal.",
      desc: "We lost contact with the server. While we reconnect automatically, you can search our offline database or explore popular destinations.",
      statusText: "Network Disconnected",
      statusColor: "red"
    },
    "500": {
      badge: "500 - Server Detour",
      title: "Our servers are harvesting fresh data.",
      desc: "Our systems are undergoing a quick digital refresh. They'll be back in a moment with brand new insights. Enjoy the peaceful view in the meantime.",
      statusText: "Partial Service Disruption",
      statusColor: "amber"
    }
  }[mode];

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] bg-[#EAF5EE] overflow-hidden flex flex-col justify-between pt-24 pb-12 font-sans select-none z-10">
      
      {/* ── BACKGROUND: Ambient rolling farmland landscape with GIS details ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#BFE6D2]/60 via-[#EAF5EE] to-[#F4FAF6]" />
        
        {/* Glowing Sun */}
        <div className="absolute top-[5%] left-[25%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#FFF7ED] to-[#FEF3C7] opacity-50 blur-3xl" />

        {/* GIS Lat/Lng Grid Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] text-[#0B3D2E]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* GIS Geolocation pulsing target nodes */}
        <div className="absolute top-[35%] left-[12%] flex flex-col items-center gap-1 opacity-30">
          <div className="relative w-4 h-4">
            <span className="absolute inset-0 rounded-full bg-[#10B981] opacity-75 animate-ping" />
            <span className="relative block w-4 h-4 rounded-full bg-[#0B3D2E] border border-white/50" />
          </div>
          <span className="text-[10px] text-[#1F5946] font-mono tracking-tight">12.9716° N, 77.5946° E</span>
        </div>

        <div className="absolute top-[48%] right-[15%] flex flex-col items-center gap-1 opacity-25">
          <div className="relative w-4 h-4">
            <span className="absolute inset-0 rounded-full bg-[#10B981] opacity-75 animate-ping" style={{ animationDelay: "1s" }} />
            <span className="relative block w-4 h-4 rounded-full bg-[#0B3D2E] border border-white/50" />
          </div>
          <span className="text-[10px] text-[#1F5946] font-mono tracking-tight">40.7128° N, 74.0060° W</span>
        </div>

        {/* GIS Dotted mapping route lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path d="M 172,280 Q 400,100 720,250 T 1220,380" fill="none" stroke="#1F7A53" strokeWidth="2.5" strokeDasharray="6,6" style={{ strokeDashoffset: "20", animation: "driftRoute 30s linear infinite" }} />
          <style>{`
            @keyframes driftRoute {
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </svg>

        {/* Farmland Parcel Boundaries (Faint green polygon bounds) */}
        <svg className="absolute bottom-[10%] inset-x-0 w-full h-[40%] opacity-[0.06] text-[#1F7A53]" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <polygon points="100,280 320,250 480,310 200,360" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="480,310 720,260 880,330 600,380" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="880,330 1120,280 1340,340 1050,390" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Slow Flying Birds */}
        <svg className="absolute top-[15%] right-[22%] w-32 h-16 opacity-30 animate-pulse duration-[10000ms]" viewBox="0 0 120 60">
          <path d="M10,25 Q20,15 30,25 Q40,15 50,25" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" className="animate-bounce duration-[5000ms]" />
          <path d="M60,15 Q68,7 76,15 Q84,7 92,15" fill="none" stroke="#0B3D2E" strokeWidth="1.5" strokeLinecap="round" className="animate-bounce duration-[6000ms]" />
        </svg>

        {/* Slowly drifting clouds */}
        <div className="absolute top-[8%] left-[-15%] w-[400px] h-[150px] bg-white/40 blur-3xl rounded-full animate-pulse duration-[14000ms]" style={{ transform: 'translateX(25vw)' }} />
        <div className="absolute top-[15%] right-[-10%] w-[500px] h-[180px] bg-white/30 blur-3xl rounded-full animate-pulse duration-[20000ms]" />

        {/* Rolling Farmland Hills Layer 3 (Distant) */}
        <svg className="absolute bottom-[10%] left-0 w-full h-[35%] opacity-15 text-[#2B7A58]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,192 C240,230 480,260 720,230 C960,200 1200,240 1440,192 L1440,320 L0,320 Z" />
        </svg>

        {/* Rolling Farmland Hills Layer 2 (Mid-ground) */}
        <svg className="absolute bottom-[4%] left-0 w-full h-[25%] opacity-35 text-[#1F6B47]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,128 C360,192 720,160 1080,224 C1260,256 1380,210 1440,192 L1440,320 L0,320 Z" />
        </svg>

        {/* Distant Windmills with rotating rotors */}
        <div className="absolute bottom-[22%] left-[18%] opacity-30 scale-50 hidden sm:block">
          <div className="w-1.5 h-16 bg-[#0B3D2E]/70 mx-auto" />
          <div className="w-12 h-12 border-2 border-dashed border-[#0B3D2E]/70 rounded-full animate-spin duration-[16000ms] -mt-20 -ml-5" />
        </div>
        <div className="absolute bottom-[26%] right-[22%] opacity-20 scale-[0.4] hidden sm:block">
          <div className="w-1.5 h-16 bg-[#0B3D2E]/70 mx-auto" />
          <div className="w-12 h-12 border-2 border-dashed border-[#0B3D2E]/70 rounded-full animate-spin duration-[24000ms] -mt-20 -ml-5" />
        </div>

        {/* Front rolling hill layer */}
        <svg className="absolute bottom-0 left-0 w-full h-[15%] text-[#0B3D2E]/5" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224 C480,180 960,250 1440,160 L1440,320 L0,320 Z" />
        </svg>
      </div>

      {/* ── CENTERPIECE: Elegant Glassmorphic Recovery Panel ── */}
      <div className="relative z-10 w-full flex justify-center items-center my-auto px-4 py-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 px-6 py-10 sm:p-12 rounded-[32px] shadow-[0_32px_80px_rgba(11,61,46,0.06)] max-w-xl w-full text-center transition-all duration-300 hover:shadow-[0_40px_96px_rgba(11,61,46,0.1)] relative">
          
          {/* Real-time systems status indicator pill inside card */}
          <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-white/60 border border-[#0B3D2E]/5 rounded-full text-[10px] font-bold shadow-sm transition-all hover:bg-white">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              headingInfo.statusColor === "emerald" ? "bg-emerald-500" : 
              headingInfo.statusColor === "amber" ? "bg-amber-500" : "bg-red-500"
            }`} />
            <span className="text-[#1F5946]">{headingInfo.statusText}</span>
          </div>

          {/* Animate-on-hover SourceTrace Leaf Emblem */}
          <div className="flex justify-center mb-6 pt-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0B3D2E] flex items-center justify-center text-white shadow-md shadow-[#0B3D2E]/10 group cursor-pointer transition-transform hover:scale-105 duration-300">
              <Leaf className="w-6 h-6 text-[#86EFAC] transition-transform duration-500 group-hover:rotate-[30deg]" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0B3D2E]/5 border border-[#0B3D2E]/10 text-[#0B3D2E] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            {mode === "offline" ? <WifiOff className="w-3.5 h-3.5 text-[#10B981]" /> : <AlertCircle className="w-3.5 h-3.5 text-[#0B3D2E]" />}
            {headingInfo.badge}
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl font-black text-[#0B3D2E] tracking-tight leading-snug mb-4 px-2">
            {headingInfo.title}
          </h2>

          {/* Conversational Copy */}
          <p className="text-sm text-[#1F5946] font-medium leading-relaxed mb-6 max-w-md mx-auto px-2">
            {headingInfo.desc}
          </p>

          {/* Smart Search Bar (Smoothly expands from max-w-md to max-w-lg on focus) */}
          <div className={`relative mx-auto mb-8 transition-all duration-300 ${isFocused ? 'max-w-lg' : 'max-w-md'}`}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#1F5946]/70" />
            </div>
            <input
              type="text"
              placeholder="Search products, industries, solutions, compliance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full pl-12 pr-4 py-3 bg-white/95 border border-[#0B3D2E]/10 focus:border-[#0B3D2E]/30 focus:ring-4 focus:ring-[#0B3D2E]/5 rounded-2xl text-sm font-semibold text-[#0B3D2E] placeholder-[#1F5946]/50 shadow-sm focus:outline-none transition-all duration-300"
            />
            {isSearching && (
              <div className="absolute right-4 inset-y-0 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0B3D2E] border-t-transparent" />
              </div>
            )}

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 max-h-56 overflow-y-auto text-left py-2 border border-[#0B3D2E]/5">
                <div className="px-4 py-1.5 text-[10px] font-bold text-[#1F7A53] uppercase tracking-wider border-b border-gray-50 mb-1">
                  Matching Destinations
                </div>
                {searchResults.map((result) => (
                  <Link 
                    key={result.item.url} 
                    href={result.item.url}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#EAF5EE]/40 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-bold text-[#0B3D2E]">{result.item.title}</div>
                      <div className="text-[11px] text-[#1F5946]/75 line-clamp-1">{result.item.metaDescription}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#1F7A53] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}
            {searchQuery.trim() && !isSearching && searchResults.length === 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 text-left py-4 px-4 text-xs font-semibold text-gray-400">
                No matching topics found in today's harvest.
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link href="/">
              <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-[#0B3D2E] hover:bg-[#155a44] text-white font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#0B3D2E]/15 active:scale-95 shadow-sm">
                <Home className="w-4 h-4 text-[#86EFAC]" />
                Return Home
              </button>
            </Link>
            
            <Link href="/solutions">
              <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-white border border-[#0B3D2E]/10 hover:border-[#0B3D2E]/20 text-[#0B3D2E] font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95 shadow-sm">
                <Compass className="w-4 h-4 text-[#1F7A53]" />
                Explore Solutions
              </button>
            </Link>

            <Link href="/contact">
              <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-white border border-[#0B3D2E]/10 hover:border-[#0B3D2E]/20 text-[#0B3D2E] font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95 shadow-sm">
                <Mail className="w-4 h-4 text-[#1F7A53]" />
                Contact Sales
              </button>
            </Link>
          </div>

          {/* Rotating One-Liners */}
          <div className="border-t border-[#0B3D2E]/5 pt-6">
            <div className={`text-xs text-[#1F7A53] font-bold italic tracking-wide h-5 transition-all duration-300 ${fadeQuote ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
              “ {farmQuotes[quoteIndex]} ”
            </div>
          </div>

        </div>
      </div>

      {/* ── FOOTER: Trust Signals & Destinations Grid ── */}
      <div className="relative z-10 w-full flex flex-col items-center gap-4 px-4">
        
        {/* Popular Destinations Grid (Focal point navigation) */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { title: "Platform", path: "/solutions/supply-chain-traceability", desc: "First-mile tracking", icon: Cpu },
            { title: "Intelligence", path: "/solutions/impact-measurement", desc: "Predictive nature metrics", icon: Activity },
            { title: "Crop Insights", path: "/CropInsights/coffee", desc: "Farmland crop profiles", icon: Leaf },
            { title: "Compliance", path: "/compliance/eudr", desc: "EUDR Deforestation & ESG", icon: ShieldCheck },
            { title: "Resources", path: "/case-studies", desc: "Whitepapers & cases", icon: FileText },
            { title: "Company", path: "/about", desc: "Our global mission", icon: Globe }
          ].map((dest) => {
            const Icon = dest.icon;
            return (
              <Link 
                key={dest.title} 
                href={dest.path}
                className="bg-white/40 hover:bg-white/95 border border-[#0B3D2E]/5 hover:border-[#0B3D2E]/15 rounded-2xl p-4 text-left transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-[#059669]/5 group relative overflow-hidden"
              >
                {/* Subtle green glow on hover */}
                <div className="absolute inset-0 bg-[#10B981]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-[#0B3D2E]/5 flex items-center justify-center text-[#0B3D2E] mb-3 group-hover:bg-[#0B3D2E] group-hover:text-[#86EFAC] transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-extrabold text-[#0B3D2E] mb-1">{dest.title}</div>
                  <div className="text-[10px] text-[#1F5946]/75 font-semibold leading-normal">{dest.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Corporate Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[10px] font-bold text-[#1F5946]/60 tracking-wider uppercase mt-6 mb-2">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#10B981]/70" />
            Trusted by global food companies
          </span>
          <span className="w-1 h-1 rounded-full bg-[#0B3D2E]/20" />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]/70" />
            Operating across millions of hectares
          </span>
          <span className="w-1 h-1 rounded-full bg-[#0B3D2E]/20" />
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#10B981]/70" />
            Helping organizations build transparent supply chains
          </span>
        </div>
      </div>

    </div>
  );
}
