import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Share2, Lock, Workflow } from "lucide-react";

export default function TraceabilityGraphPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.9), rgba(11, 61, 46, 0.98)), url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Traceability Graph</span>
          <AnimatedText 
            el="h1" 
            text="The Architecture of Trust." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Our underlying data architecture represents the supply chain not as rows in a database, but as a dynamic graph of interconnected nodes. Every farmer, transaction, and batch is mathematically linked.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-[#0B3D2E] hover:bg-gray-100 border-none shadow-lg">
            Explore the API
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="bg-[#0B3D2E] rounded-[40px] p-12 lg:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-full opacity-20 mix-blend-screen pointer-events-none">
               <img src="/assets/traceability-diagram.png" alt="Graph" className="w-full h-full object-cover" />
            </div>
            
            <h2 className="text-4xl font-bold mb-16 relative z-10">Why Graph Technology?</h2>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
               <div>
                  <div className="w-12 h-12 bg-[#1F7A53] rounded-xl flex items-center justify-center mb-6"><Share2 className="w-6 h-6 text-[#53D769]"/></div>
                  <h3 className="text-xl font-bold mb-3">Complex Relationships</h3>
                  <p className="text-gray-400">Traditional databases fail when tracking a single batch of coffee blended from 500 different farms. Graph databases natively map these complex many-to-many relationships.</p>
               </div>
               <div>
                  <div className="w-12 h-12 bg-[#1F7A53] rounded-xl flex items-center justify-center mb-6"><Workflow className="w-6 h-6 text-[#53D769]"/></div>
                  <h3 className="text-xl font-bold mb-3">Infinite Scalability</h3>
                  <p className="text-gray-400">Whether you are tracking 1,000 farmers or 1,000,000, query times remain millisecond-fast, allowing for real-time visualization of your entire network.</p>
               </div>
               <div>
                  <div className="w-12 h-12 bg-[#1F7A53] rounded-xl flex items-center justify-center mb-6"><Lock className="w-6 h-6 text-[#53D769]"/></div>
                  <h3 className="text-xl font-bold mb-3">Immutable Audit Trails</h3>
                  <p className="text-gray-400">Every node linkage acts as an immutable digital handshake. When an auditor asks for proof of origin, the graph provides an instantaneous, unbreakable chain of custody.</p>
               </div>
            </div>
         </div>
      </section>

      <StatsBanner />
      <IntegrationsGrid />
      <TestimonialsCarousel />
      <CTASection />
    </main>
  );
}
