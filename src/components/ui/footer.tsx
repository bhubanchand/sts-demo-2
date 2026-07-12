"use client";

import Link from "next/link";
import { Leaf, ArrowRight, ShieldCheck, HelpCircle, Mail, MapPin, Globe } from "lucide-react";
import { Button } from "./button";

export function Footer() {
  return (
    <footer className="relative bg-[#0B3D2E] text-white overflow-hidden mt-32 border-t border-[#125c44]">
      {/* Cinematic Top Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
         {/* Fade to dark green gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/40 via-[#0B3D2E]/90 to-[#0B3D2E]"></div>
      </div>

      {/* Dynamic Background SVG Watermark (Contour curves, geospatial lattices) */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025] text-white">
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="50%" cy="100%" r="350" strokeDasharray="4 8" />
          <circle cx="50%" cy="100%" r="550" />
          <circle cx="50%" cy="100%" r="750" strokeDasharray="8 8" />
          <path d="M-100,380 C200,320 400,480 700,400 T1500,460" />
          <path d="M-100,480 C200,420 400,580 700,500 T1500,560" strokeDasharray="3 6" />
          <path d="M-100,580 C200,520 400,680 700,600 T1500,660" />
          <line x1="5%" y1="5%" x2="95%" y2="95%" strokeDasharray="12 12" />
          <line x1="95%" y1="5%" x2="5%" y2="95%" strokeDasharray="12 12" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 pt-24 pb-12">
        
        {/* ═══════════════════════════════════════
            TOP COLUMN: VALUE PROP & CTA
            ═══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-12 gap-8 items-center pb-16 border-b border-white/10 mb-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight tracking-tight text-white">
              Drive predictable outcomes across your agricultural operations.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Transform your supply chain with real-time first-mile visibility, predictive yield analytics, and automated regulatory compliance tools.
            </p>
            <Link href="/contact-sales" className="shrink-0">
              <Button className="rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white hover:text-[#0B3D2E] font-bold px-8 py-6 shadow-[0_4px_20px_rgba(83,215,105,0.25)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                Contact Sales →
              </Button>
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            MIDDLE COLUMN: PREMIUM NEWSLETTER CARD
            ═══════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-12 mb-20 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#53D769]/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[#53D769] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Weekly Intel Digest</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Join the Future of Sourcing</h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                Get expert analysis on global supply chain compliance, EUDR timelines, and agricultural AI diagnostics delivered to your inbox.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md md:ml-auto">
              <input 
                type="email" 
                placeholder="Enter your business email" 
                className="w-full bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#53D769] text-sm backdrop-blur-sm transition-all"
              />
              <button 
                type="submit"
                className="shrink-0 h-[48px] px-8 rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white hover:text-[#0B3D2E] font-bold text-sm shadow-[0_4px_20px_rgba(83,215,105,0.25)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            MIDDLE ROW: NAVIGATION COLUMNS
            ═══════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 mb-20">
          
          {/* Logo & Brand Statement Anchor */}
          <div className="col-span-2 lg:col-span-2 flex flex-col justify-start">
            <Link href="/" className="flex items-center gap-2 mb-4 shrink-0">
              <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-10 object-contain brightness-0 invert" />
            </Link>
            <p className="text-gray-300 text-[13px] leading-relaxed max-w-[240px] mb-6">
              Sensing the first mile, securing the value chain. Enabling predictable agricultural supply chains globally.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {["linkedin", "twitter", "facebook"].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#53D769] hover:border-[#53D769] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-xs font-bold uppercase tracking-tighter">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className="font-extrabold text-[#53D769] tracking-wider uppercase text-xs mb-6 select-none">Products</h4>
            <ul className="space-y-4 text-[13px] text-gray-300">
              {["Traceability Cloud", "Farmer Apps", "Data Hub", "Intelligence"].map((item, idx) => {
                const paths = ["/platform/traceability", "/platform/mobile-app", "/platform/reporting-analytics", "/intelligence/ai-engine"];
                return (
                  <li key={idx}>
                    <Link href={paths[idx]} className="group flex items-center gap-2 hover:text-[#53D769] transition-all duration-300">
                      <Leaf className="w-3 h-3 text-[#53D769] shrink-0" />
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2: Industry */}
          <div>
            <h4 className="font-extrabold text-[#53D769] tracking-wider uppercase text-xs mb-6 select-none">Industry</h4>
            <ul className="space-y-4 text-[13px] text-gray-300">
              {["Food Retail", "CPG/FMCG", "Seed Manufacturing", "Development Agencies", "Others"].map((item, idx) => {
                const paths = ["/CropInsights/coffee", "/CropInsights/cocoa", "/CropInsights/seed-production", "/CropInsights", "/CropInsights"];
                return (
                  <li key={idx}>
                    <Link href={paths[idx]} className="group flex items-center hover:text-white transition-all duration-300">
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="font-extrabold text-[#53D769] tracking-wider uppercase text-xs mb-6 select-none">Solutions</h4>
            <ul className="space-y-4 text-[13px] text-gray-300">
              {["Digital Transformation", "AI Sourcing Intel", "Food Supply Chain", "Sustainable Agriculture", "Compliance & Regs"].map((item, idx) => {
                const paths = ["/solutions/supply-chain-traceability", "/intelligence/ai-engine", "/solutions/eudr-compliance", "/solutions/sustainable-sourcing", "/compliance/eudr"];
                return (
                  <li key={idx}>
                    <Link href={paths[idx]} className="group flex items-center hover:text-white transition-all duration-300">
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="font-extrabold text-[#53D769] tracking-wider uppercase text-xs mb-6 select-none">Quick Links</h4>
            <ul className="space-y-4 text-[13px] text-gray-300">
              {["About Us", "Case Study", "Glossary", "Become a Partner", "Connect With Us", "Newsroom"].map((item, idx) => {
                const paths = ["/company/about", "/customers/case-studies", "/resources/glossary", "/company/partners", "/company/contact", "/resources/newsroom"];
                return (
                  <li key={idx}>
                    <Link href={paths[idx]} className="group flex items-center hover:text-white transition-all duration-300">
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* ═══════════════════════════════════════
            TRUST & COMPLIANCE BADGES
            ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 pb-12 border-t border-white/10 mb-8 z-10 relative">
          
          {/* Badge 1: B Corp */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-black text-lg text-[#53D769] shrink-0">B</div>
            <div className="text-[11px] text-gray-300 leading-tight">
              <span className="font-bold text-white block mb-0.5">Certified B Corp</span>
              Meets high standards of social & environmental impact.
            </div>
          </div>
          
          {/* Badge 2: SOC2 Type II */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-[#53D769] shrink-0 tracking-tighter">SOC2</div>
            <div className="text-[11px] text-gray-300 leading-tight">
              <span className="font-bold text-white block mb-0.5">Enterprise Security</span>
              SOC2 Type II audited data lake architecture.
            </div>
          </div>
          
          {/* Badge 3: EUDR Ready */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-[#53D769] shrink-0 tracking-tighter">EUDR</div>
            <div className="text-[11px] text-gray-300 leading-tight">
              <span className="font-bold text-white block mb-0.5">EUDR Aligned</span>
              Zero-deforestation check tools built-in.
            </div>
          </div>
          
          {/* Badge 4: GDPR Safeguards */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-[#53D769] shrink-0 tracking-tighter">GDPR</div>
            <div className="text-[11px] text-gray-300 leading-tight">
              <span className="font-bold text-white block mb-0.5">Data Privacy Secured</span>
              Strict grower profile consent safeguards.
            </div>
          </div>
          
        </div>

        {/* ═══════════════════════════════════════
            CLEAN COPYRIGHT SECTION
            ═══════════════════════════════════════ */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left z-10 relative">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SourceTrace Technology Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/legal/privacy-policy" className="hover:text-[#53D769] transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-[#53D769] transition-colors">Terms of Service</Link>
            <button className="hover:text-[#53D769] transition-colors">Cookie Settings</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
