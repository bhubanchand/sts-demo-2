import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Trees, ShieldAlert, GraduationCap, Link } from "lucide-react";

export default function CocoaIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1601005707758-299f059c3a3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Transparent Cocoa Sourcing." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Eradicate deforestation and child labor from your chocolate supply chain. Achieve 100% first-mile traceability in West Africa, Latin America, and beyond.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Cocoa Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl font-bold text-[#0B3D2E]">Tackling the Cocoa Crisis</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                  The cocoa industry faces unprecedented regulatory scrutiny. From the EUDR to the Corporate Sustainability Due Diligence Directive (CSDDD), companies must definitively prove their cocoa is ethically sourced.
               </p>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600"><Trees className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Zero Deforestation</h3><p className="text-gray-600">Cross-reference farm boundaries against protected forest reserves in Cote d'Ivoire and Ghana.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600"><ShieldAlert className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Child Labor Monitoring</h3><p className="text-gray-600">Implement CLMRS (Child Labor Monitoring and Remediation Systems) directly via our mobile app.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600"><Link className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Mass Balance to Segregation</h3><p className="text-gray-600">Transition your supply chain models to fully segregated, identity-preserved cocoa streams.</p></div>
                  </li>
               </ul>
            </div>
            <div className="bg-[#0B3D2E] border border-gray-100 rounded-3xl p-8 h-[600px] flex flex-col relative overflow-hidden">
               <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative group">
                  <img src="/assets/traceability-diagram.png" alt="Cocoa Traceability" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <h4 className="text-white font-bold text-xl mb-2">Live Cooperative Map</h4>
                     <p className="text-gray-400 text-sm">Visualizing 12,000+ smallholder plots mapped in Ashanti Region.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <StatsBanner />
      <IntegrationsGrid />
      <TestimonialsCarousel />
      <TrustBadges />
      <CTASection />
    </main>
  );
}
