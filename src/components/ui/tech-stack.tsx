"use client";

import React from "react";
import { Link, CloudLightning, Satellite, Database, Smartphone, ShieldCheck, Activity } from "lucide-react";

const TECHNOLOGIES = [
  {
    id: "blockchain",
    title: "Blockchain Ledger",
    description: "Immutable, decentralized tracking. Every transaction from farm to retail is cryptographically secured, making greenwashing impossible.",
    icon: Link,
    color: "bg-blue-100 text-blue-600",
    gradient: "from-blue-500/20 to-transparent",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-2"
  },
  {
    id: "remote-sensing",
    title: "Remote Sensing AI",
    description: "Automated deforestation analysis using Sentinel-2 and Landsat satellite imagery. Continuous NDVI crop health monitoring.",
    icon: Satellite,
    color: "bg-emerald-100 text-emerald-600",
    gradient: "from-emerald-500/20 to-transparent",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  },
  {
    id: "offline-first",
    title: "Offline-First Sync",
    description: "Built for remote geographies. Field officers can map polygons and log data with zero internet connectivity. Auto-syncs upon connection.",
    icon: CloudLightning,
    color: "bg-orange-100 text-orange-600",
    gradient: "from-orange-500/20 to-transparent",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  },
  {
    id: "data-lake",
    title: "Unified Data Lake",
    description: "Ingests millions of structured and unstructured data points into a single, queryable architecture for ESG and Scope 3 reporting.",
    icon: Database,
    color: "bg-purple-100 text-purple-600",
    gradient: "from-purple-500/20 to-transparent",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-1"
  },
  {
    id: "mobile-extension",
    title: "Mobile Wallets & Extension",
    description: "Send premium payments directly to smallholders. Empower farmers with field diagnostics, market pricing, and weather alerts.",
    icon: Smartphone,
    color: "bg-pink-100 text-pink-600",
    gradient: "from-pink-500/20 to-transparent",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-1"
  },
  {
    id: "compliance-automation",
    title: "Compliance Automation",
    description: "Automate regulatory due diligence filings. Generate verifiable dossiers for EUDR, CSRD, and SBTi guidelines.",
    icon: ShieldCheck,
    color: "bg-teal-100 text-teal-600",
    gradient: "from-teal-500/20 to-transparent",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  },
  {
    id: "iot-telemetry",
    title: "IoT Climate Telemetry",
    description: "Smart scales and IoT sensors track cargo conditions, silo humidity, and weight metrics in real time.",
    icon: Activity,
    color: "bg-rose-100 text-rose-600",
    gradient: "from-rose-500/20 to-transparent",
    span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  }
];

export function TechStackGrid() {
  return (
    <div className="w-full max-w-[1400px] mx-auto py-16 px-4 sm:px-8 snap-center">
      <div className="text-center mb-16">
         <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Our Technology</span>
         <h2 className="text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-6">Engineered for the First Mile.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[880px]">
         {TECHNOLOGIES.map((tech) => (
            <div 
               key={tech.id}
               className={`${tech.span} relative overflow-hidden bg-white rounded-[40px] border border-gray-100 p-6 lg:p-8 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
               {/* Background Flare */}
               <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${tech.gradient} rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-300 opacity-50`}></div>
               
               <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 ${tech.color} rounded-2xl flex items-center justify-center mb-4 lg:mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                     <tech.icon className="w-7 h-7 lg:w-8 lg:h-8" />
                  </div>
                  
                  <div className="mt-auto">
                     <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{tech.title}</h3>
                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{tech.description}</p>
                  </div>
               </div>
               
               {/* Interactive Tech Lines Pattern inside */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0B3D2E 1px, transparent 1px), linear-gradient(90deg, #0B3D2E 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>
         ))}
      </div>
    </div>
  );
}
