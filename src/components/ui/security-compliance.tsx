"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Lock, FileKey2, Server } from "lucide-react";

export function SecurityCompliance() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const features = [
    {
      icon: ShieldCheck,
      title: "ISO 27001 Certified",
      description: "Rigorous international standards for information security management systems."
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description: "Strict adherence to data privacy regulations, ensuring farmer and enterprise data rights."
    },
    {
      icon: FileKey2,
      title: "Blockchain Immutability",
      description: "Cryptographically secured audit trails for tamper-proof compliance reporting."
    },
    {
      icon: Server,
      title: "Enterprise-Grade Infrastructure",
      description: "Highly available, scalable architecture deployed on top-tier cloud providers."
    }
  ];

  return (
    <section className="py-16 bg-[#F4FAF6] border-t border-gray-100 relative overflow-hidden" ref={containerRef}>
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#53D769]/5 blur-[200px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #0B3D2E 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block text-sm">Bank-Grade Security</span>
            <h2 className="text-5xl font-extrabold text-[#0B3D2E] leading-tight mb-8 tracking-tight">
              Your data is secured by design.
            </h2>
            <p className="text-lg text-[#1F5946] font-medium leading-relaxed mb-10">
              We understand that supply chain data is your competitive advantage. SourceTrace employs military-grade encryption, role-based access control, and continuous security audits to keep your operations safe.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="px-6 py-3 rounded-full border border-[#0B3D2E]/10 bg-white/60 text-[#0B3D2E] font-semibold backdrop-blur-md text-sm shadow-[0_1px_4px_rgba(0,0,0,0.01)]">
                SOC 2 Type II
              </div>
              <div className="px-6 py-3 rounded-full border border-[#0B3D2E]/10 bg-white/60 text-[#0B3D2E] font-semibold backdrop-blur-md text-sm shadow-[0_1px_4px_rgba(0,0,0,0.01)]">
                End-to-End Encryption
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  className="bg-[#E2EFE7]/30 border border-[#0B3D2E]/8 p-8 rounded-[32px] backdrop-blur-xl hover:bg-[#E2EFE7]/50 hover:border-[#0B3D2E]/12 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#0B3D2E]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1F7A53]/10 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#1F7A53]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B3D2E] mb-3">{feature.title}</h3>
                  <p className="text-[#1F5946] leading-relaxed text-sm font-medium">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
