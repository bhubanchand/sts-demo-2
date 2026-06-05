import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { TreePine, Combine, FileCheck } from "lucide-react";

export default function PalmOilIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1599818815197-017e82bf09aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Deforestation-Free Palm Oil." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Meet the strictest EUDR requirements and RSPO standards. Trace Fresh Fruit Bunches (FFB) directly back to the plantation and verify zero forest encroachment.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Palm Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Traceability to the Mill is No Longer Enough</h2>
            <p className="text-lg text-gray-600">The EUDR demands polygon mapping of the exact land where commodities were produced. We help mills and FMCG brands map the sprawling network of independent smallholders supplying their supply chains.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0B3D2E] text-white border border-transparent rounded-3xl p-8 shadow-xl relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-500 rounded-full blur-3xl opacity-20"></div>
               <div className="w-14 h-14 bg-white/10 text-red-400 rounded-2xl flex items-center justify-center mb-6 relative z-10"><TreePine className="w-7 h-7"/></div>
               <h3 className="text-2xl font-bold mb-4 relative z-10">Deforestation Alerts</h3>
               <p className="text-gray-300 leading-relaxed relative z-10">Cross-reference plantation polygons with global forest watch data to instantly flag if a supplier has expanded into protected peatlands or primary forests.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6"><Combine className="w-7 h-7"/></div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">FFB Dealer Mapping</h3>
               <p className="text-gray-600 leading-relaxed">Dealers aggregate FFB from thousands of unmapped farmers. Digitize these middlemen to bring visibility to the most opaque layer of the palm oil supply chain.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6"><FileCheck className="w-7 h-7"/></div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">RSPO Certification</h3>
               <p className="text-gray-600 leading-relaxed">Automate the documentation required for RSPO Mass Balance and Segregated supply chain models, reducing audit preparation time by 60%.</p>
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
