import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Wind, Sprout, Network } from "lucide-react";

export default function RiceIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1595085461947-f39b6910e5bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Sustainable Rice Cultivation." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Monitor methane emissions, track alternative wetting and drying (AWD) practices, and build resilient, climate-smart rice supply chains.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Rice Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-[#0B3D2E] rounded-[40px] p-12 text-white shadow-xl relative overflow-hidden">
               <div className="w-16 h-16 bg-white/10 text-[#53D769] rounded-2xl flex items-center justify-center mb-8 relative z-10"><Wind className="w-8 h-8"/></div>
               <h2 className="text-3xl font-bold mb-6 relative z-10">Methane Emission Tracking</h2>
               <p className="text-gray-300 leading-relaxed relative z-10 mb-8">
                  Traditional flooded rice paddies are a massive source of global methane. Our platform allows you to monitor the implementation of low-emission practices at scale and calculate the resulting carbon offsets.
               </p>
               <Button variant="outline" className="border-[#53D769] text-[#53D769] hover:bg-[#53D769] hover:text-[#0B3D2E]">View Carbon Methodology</Button>
            </div>
            
            <div className="space-y-6">
               <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all cursor-default">
                  <div className="flex items-center gap-4 mb-4">
                     <Sprout className="w-8 h-8 text-[#1F7A53]"/>
                     <h3 className="font-bold text-xl text-gray-900">AWD Practice Verification</h3>
                  </div>
                  <p className="text-gray-600">Digitally verify that farmers are utilizing Alternative Wetting and Drying techniques through mobile surveys and satellite soil moisture indices.</p>
               </div>
               <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all cursor-default">
                  <div className="flex items-center gap-4 mb-4">
                     <Network className="w-8 h-8 text-[#1F7A53]"/>
                     <h3 className="font-bold text-xl text-gray-900">Mill Aggregation Tracking</h3>
                  </div>
                  <p className="text-gray-600">Rice supply chains consolidate heavily at the mill. Use our platform to maintain segregation of sustainable rice from conventional rice during processing.</p>
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
