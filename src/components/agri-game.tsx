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
  WifiOff
} from "lucide-react";
import { searchPages, SearchResult } from "@/lib/search-engine";

interface AgriGameProps {
  mode: "404" | "offline" | "500";
}

const farmQuotes = [
  "We're checking every field... still no sign of this page.",
  "The GPS coordinates say 'somewhere over that hill.'",
  "Even our AI couldn't convince this page to stay in the supply chain.",
  "Our farmers are better at finding crops than missing URLs.",
  "The trace ended here... but your journey doesn't have to."
];

export function AgriGame({ mode }: AgriGameProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeQuote, setFadeQuote] = useState(true);

  // Rotating quotes interval
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeQuote(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % farmQuotes.length);
        setFadeQuote(true);
      }, 300); // match transition duration
    }, 6000);
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
      footerMessage: "No crops were harmed while losing this page."
    },
    "offline": {
      badge: "Connection Lost",
      title: "Looks like our data truck lost its signal.",
      desc: "We lost contact with the server. While we reconnect automatically, you can search our offline database or explore popular destinations.",
      footerMessage: "Reconnecting to the network automatically..."
    },
    "500": {
      badge: "500 - Server Detour",
      title: "Our servers are harvesting fresh data.",
      desc: "Our systems are undergoing a quick digital refresh. They'll be back in a moment with brand new insights. Enjoy the peaceful view in the meantime.",
      footerMessage: "Fresh data is being synchronized..."
    }
  }[mode];

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none bg-[#EAF5EE] font-sans flex flex-col justify-between p-6 sm:p-10">
      
      {/* ── BACKGROUND: Ambient rolling farmland landscape ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#BFE6D2] via-[#EAF5EE] to-[#F4FAF6]" />
        
        {/* Glowing Sun */}
        <div className="absolute top-[8%] left-[20%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FFF7ED] to-[#FEF3C7] opacity-60 blur-3xl" />

        {/* Slow Flying Birds */}
        <svg className="absolute top-[15%] right-[25%] w-32 h-16 opacity-30 animate-pulse duration-[8000ms]" viewBox="0 0 120 60">
          <path d="M10,25 Q20,15 30,25 Q40,15 50,25" fill="none" stroke="#0B3D2E" strokeWidth="2.5" strokeLinecap="round" className="animate-bounce duration-[4000ms]" />
          <path d="M60,15 Q68,7 76,15 Q84,7 92,15" fill="none" stroke="#0B3D2E" strokeWidth="2" strokeLinecap="round" className="animate-bounce duration-[5000ms]" />
        </svg>

        {/* Slowly drifting clouds */}
        <div className="absolute top-[10%] left-[-10%] w-[350px] h-[120px] bg-white/40 blur-2xl rounded-full animate-pulse duration-[12000ms]" style={{ transform: 'translateX(20vw)' }} />
        <div className="absolute top-[18%] right-[-5%] w-[450px] h-[150px] bg-white/30 blur-2xl rounded-full animate-pulse duration-[18000ms]" />

        {/* Rolling Farmland Hills Layer 3 (Distant) */}
        <svg className="absolute bottom-[10%] left-0 w-full h-[35%] opacity-20 text-[#2B7A58]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,192 C240,230 480,260 720,230 C960,200 1200,240 1440,192 L1440,320 L0,320 Z" />
        </svg>

        {/* Rolling Farmland Hills Layer 2 (Mid-ground) */}
        <svg className="absolute bottom-[4%] left-0 w-full h-[25%] opacity-40 text-[#1F6B47]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,128 C360,192 720,160 1080,224 C1260,256 1380,210 1440,192 L1440,320 L0,320 Z" />
        </svg>

        {/* Distant Windmills with rotating rotors */}
        <div className="absolute bottom-[20%] left-[15%] opacity-35 scale-75 hidden sm:block">
          <div className="w-1.5 h-16 bg-[#0B3D2E]/70 mx-auto" />
          <div className="w-12 h-12 border-2 border-dashed border-[#0B3D2E]/70 rounded-full animate-spin duration-[15000ms] -mt-20 -ml-5" />
        </div>
        <div className="absolute bottom-[24%] right-[18%] opacity-25 scale-50 hidden sm:block">
          <div className="w-1.5 h-16 bg-[#0B3D2E]/70 mx-auto" />
          <div className="w-12 h-12 border-2 border-dashed border-[#0B3D2E]/70 rounded-full animate-spin duration-[20000ms] -mt-20 -ml-5" />
        </div>

        {/* Front rolling hill layer */}
        <svg className="absolute bottom-0 left-0 w-full h-[15%] text-[#0B3D2E]/10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224 C480,180 960,250 1440,160 L1440,320 L0,320 Z" />
        </svg>
      </div>

      {/* ── HEADER: Elegant Minimalist Branding ── */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-all">
          <div className="w-9 h-9 rounded-xl bg-[#0B3D2E] flex items-center justify-center text-white shadow-md shadow-[#0B3D2E]/10 group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-[#86EFAC]" />
          </div>
          <span className="font-extrabold text-lg text-[#0B3D2E] tracking-tight group-hover:opacity-90 transition-opacity">SourceTrace</span>
        </Link>
        
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0B3D2E]/5 rounded-full text-xs font-semibold text-[#1F5946] border border-[#0B3D2E]/5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Systems fully operational</span>
        </div>
      </div>

      {/* ── CENTERPIECE: Elegant Glassmorphic Panel ── */}
      <div className="relative z-10 w-full flex justify-center items-center my-auto py-8">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 px-6 py-10 sm:p-12 rounded-[32px] shadow-[0_32px_80px_rgba(11,61,46,0.06)] max-w-xl w-full text-center transition-all duration-300">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0B3D2E]/5 border border-[#0B3D2E]/10 text-[#0B3D2E] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            {mode === "offline" ? <WifiOff className="w-3.5 h-3.5 text-[#10B981]" /> : <AlertCircle className="w-3.5 h-3.5 text-[#0B3D2E]" />}
            {headingInfo.badge}
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] tracking-tight leading-tight mb-4">
            {headingInfo.title}
          </h2>

          {/* Conversational Copy */}
          <p className="text-sm sm:text-base text-[#1F5946] font-medium leading-relaxed mb-6 max-w-lg mx-auto">
            {headingInfo.desc}
          </p>

          {/* Smart Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#1F5946]/70" />
            </div>
            <input
              type="text"
              placeholder="Search products, industries, solutions, compliance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#0B3D2E]/10 focus:border-[#0B3D2E]/30 focus:ring-2 focus:ring-[#0B3D2E]/5 rounded-2xl text-sm font-semibold text-[#0B3D2E] placeholder-[#1F5946]/50 shadow-sm focus:outline-none transition-all"
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
              <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-[#0B3D2E] hover:bg-[#155a44] text-white font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 shadow-md shadow-[#0B3D2E]/10">
                <Home className="w-4 h-4 text-[#86EFAC]" />
                Return Home
              </button>
            </Link>
            
            <Link href="/solutions">
              <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-white border border-[#0B3D2E]/10 hover:border-[#0B3D2E]/20 text-[#0B3D2E] font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm">
                <Compass className="w-4 h-4 text-[#1F7A53]" />
                Explore Solutions
              </button>
            </Link>

            <Link href="/company/contact">
              <button className="flex items-center gap-2 h-11 px-6 rounded-full bg-white border border-[#0B3D2E]/10 hover:border-[#0B3D2E]/20 text-[#0B3D2E] font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm">
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

      {/* ── FOOTER: Trust Signals & Empathy Note ── */}
      <div className="relative z-10 w-full flex flex-col items-center gap-4">
        
        {/* Popular Destinations Grid (Focal point navigation) */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "EUDR Compliance", path: "/solutions/eudr-compliance", desc: "Deforestation traceability" },
            { title: "ESG Reporting", path: "/solutions/esg-reporting", desc: "Carbon & nature metrics" },
            { title: "Smallholder Mgmt", path: "/solutions/smallholder-management", desc: "First-mile connectivity" },
            { title: "Traceability Flow", path: "/solutions/supply-chain-traceability", desc: "Interactive mapping" }
          ].map((dest) => (
            <Link 
              key={dest.title} 
              href={dest.path}
              className="bg-white/40 hover:bg-white/95 border border-[#0B3D2E]/5 hover:border-[#0B3D2E]/15 rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-sm group"
            >
              <div className="text-xs font-extrabold text-[#0B3D2E] mb-1 group-hover:text-[#10B981] transition-colors">{dest.title}</div>
              <div className="text-[10px] text-[#1F5946]/75 font-semibold leading-normal">{dest.desc}</div>
            </Link>
          ))}
        </div>

        {/* Clever conditional bottom text */}
        <div className="text-[11px] text-[#1F7A53] font-bold tracking-wide mt-2">
          {headingInfo.footerMessage}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-[#0B3D2E]/10" />

        {/* Corporate Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[10px] font-bold text-[#1F5946]/60 tracking-wider uppercase mb-2">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#10B981]/70" />
            Trusted by global food leaders
          </span>
          <span className="w-1 h-1 rounded-full bg-[#0B3D2E]/20" />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]/70" />
            Active across millions of hectares
          </span>
          <span className="w-1 h-1 rounded-full bg-[#0B3D2E]/20" />
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#10B981]/70" />
            Real-time digital traceability
          </span>
        </div>
      </div>

    </div>
  );
}
