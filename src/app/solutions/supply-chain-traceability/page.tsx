import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Network, Database, Link as LinkIcon, Search } from "lucide-react";

export default function SupplyChainTraceabilityPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 bg-[#0B3D2E] text-white">
      {/* Dark Theme Hero */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16 relative z-10">
        <div className="max-w-4xl text-center mx-auto">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Supply Chain Traceability</span>
          <AnimatedText 
            el="h1" 
            text="The Connected Network." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Achieve end-to-end visibility from raw material to retail shelf. Map every node, track every transaction, and illuminate the blind spots in your global supply chain.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-[#1F7A53] hover:text-white border-none">
            Explore the Network
          </Button>
        </div>
      </section>

      {/* Hero Asset Full Width */}
      <section className="w-full h-[600px] relative overflow-hidden mb-16 border-y border-white/10">
         <img src="/assets/traceability-diagram.png" alt="Traceability Graph" className="w-full h-full object-cover mix-blend-screen opacity-60" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-transparent to-[#0B3D2E]"></div>
      </section>

      {/* Tiered Deep Dive Accordion (Visualized as Grids here) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16">
         <div className="grid md:grid-cols-2 gap-16">
            <div>
               <h2 className="text-4xl font-bold mb-8">Illuminating Every Tier</h2>
               <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  Most enterprises lack visibility beyond their Tier 1 suppliers. SourceTrace breaks down the silos, enabling you to trace materials back to the very farm where they were grown.
               </p>
               <div className="space-y-6">
                  {[
                     { tier: "Tier 1: Manufacturing", desc: "Track final assembly and processing facilities.", icon: Database },
                     { tier: "Tier 2: Processing", desc: "Monitor the refineries and initial processing plants.", icon: Network },
                     { tier: "Tier 3: Aggregation", desc: "Map the cooperatives, silos, and aggregation points.", icon: LinkIcon },
                     { tier: "Tier 4: Origin", desc: "Trace directly to the smallholder farm and plot of land.", icon: Search },
                  ].map((item, idx) => (
                     <div key={idx} className="flex gap-6 items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-[#53D769]/20 flex items-center justify-center flex-shrink-0">
                           <item.icon className="w-6 h-6 text-[#53D769]" />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold mb-2">{item.tier}</h3>
                           <p className="text-gray-400">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#1F7A53] rounded-full blur-[100px] opacity-20 -z-10"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#53D769] rounded-full blur-[100px] opacity-10 -z-10"></div>
               
               <h3 className="text-2xl font-bold mb-6">Chain of Custody Models</h3>
               <ul className="space-y-6">
                  <li className="border-l-4 border-[#53D769] pl-6 py-2">
                     <h4 className="text-lg font-bold mb-1">Identity Preserved (IP)</h4>
                     <p className="text-sm text-gray-400">Strictly segregated materials from a single, verifiable source throughout the entire chain.</p>
                  </li>
                  <li className="border-l-4 border-[#1F7A53] pl-6 py-2">
                     <h4 className="text-lg font-bold mb-1">Segregation (SG)</h4>
                     <p className="text-sm text-gray-400">Certified materials kept separate from non-certified materials at all stages.</p>
                  </li>
                  <li className="border-l-4 border-gray-600 pl-6 py-2">
                     <h4 className="text-lg font-bold mb-1">Mass Balance (MB)</h4>
                     <p className="text-sm text-gray-400">Administrative monitoring of inputs and outputs when physical mixing is unavoidable.</p>
                  </li>
               </ul>
            </div>
         </div>
      </section>
    </main>
  );
}
