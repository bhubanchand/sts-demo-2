"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Leaf, Sprout, Tractor } from "lucide-react";
import Link from "next/link";

const CASE_STUDIES = [
  {
    id: "cocoa",
    title: "Ghana Cocoa Traceability",
    company: "Global Chocolate Corp",
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Farmers Mapped", value: "45,000+" },
      { label: "Deforestation-Free", value: "100%" }
    ],
    color: "emerald"
  },
  {
    id: "coffee",
    title: "Colombian Coffee Fairtrade",
    company: "Premium Roasters",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Income Increase", value: "+32%" },
      { label: "Premium Paid", value: "$1.2M" }
    ],
    color: "amber"
  },
  {
    id: "cotton",
    title: "Indian Organic Cotton",
    company: "EcoFashion Brand",
    icon: Tractor,
    image: "https://images.unsplash.com/photo-1589146168925-e51c89dbf5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    metrics: [
      { label: "Water Saved", value: "40%" },
      { label: "Yield Increase", value: "18%" }
    ],
    color: "sky"
  }
];

export function CaseStudiesGrid() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section className="py-32 bg-white relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#53D769] blur-[150px] rounded-full opacity-10 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Proven Impact</span>
          <h2 className="text-5xl md:text-6xl font-black text-[#0B3D2E] leading-tight mb-6 tracking-tighter">
            Real stories. Real results.
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Discover how leading global brands use SourceTrace to transform their supply chains, ensure compliance, and empower farming communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className="group relative h-[500px] rounded-[40px] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className={`w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 transform group-hover:-translate-y-2 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h4 className="text-white/80 font-medium text-sm tracking-wider uppercase mb-2">
                    {study.company}
                  </h4>
                  <h3 className="text-3xl font-bold text-white mb-6 leading-tight transform group-hover:-translate-y-2 transition-transform duration-300 delay-75">
                    {study.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-8 transform group-hover:-translate-y-2 transition-transform duration-300 delay-100">
                    {study.metrics.map((metric, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <div className="text-2xl font-black text-white mb-1">{metric.value}</div>
                        <div className="text-xs text-white/70 uppercase tracking-wider">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-white font-bold group-hover:text-[#53D769] transition-colors transform group-hover:-translate-y-2 duration-300 delay-150">
                    Read Case Study <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
