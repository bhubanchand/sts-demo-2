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
    <section className="py-16 bg-[#051C15] relative overflow-hidden" ref={containerRef}>
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1F7A53] blur-[200px] rounded-full opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #53D769 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Bank-Grade Security</span>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
              Your data is secured by design.
            </h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
              We understand that supply chain data is your competitive advantage. SourceTrace employs military-grade encryption, role-based access control, and continuous security audits to keep your operations safe.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold backdrop-blur-md">
                SOC 2 Type II
              </div>
              <div className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold backdrop-blur-md">
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
                  className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#1F7A53]/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#53D769]/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#53D769]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
