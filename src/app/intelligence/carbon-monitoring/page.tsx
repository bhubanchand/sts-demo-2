import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Factory, Leaf, LineChart, Globe } from "lucide-react";

export default function CarbonMonitoringPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-16 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.85), rgba(11, 61, 46, 0.98)), url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Carbon Monitoring</span>
          <AnimatedText 
            el="h1" 
            text="Master Your Scope 3 Emissions." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Agriculture is the primary driver of Scope 3 emissions for most food & beverage brands. We help you accurately measure, track, and ultimately reduce your carbon footprint at the farm level.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Calculate Your Footprint
          </Button>
        </div>
      </section>

      <section className="py-16 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0B3D2E] text-white border border-transparent rounded-3xl p-10 shadow-xl relative overflow-hidden">
               <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 relative z-10"><Factory className="w-8 h-8"/></div>
               <h3 className="text-2xl font-bold mb-4 relative z-10">Primary Data Collection</h3>
               <p className="text-gray-300 leading-relaxed relative z-10">Move away from generic secondary emission factors. We capture exact fertilizer inputs, fuel usage, and crop transport data directly from the source.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-green-50 text-[#1F7A53] rounded-2xl flex items-center justify-center mb-8"><Leaf className="w-8 h-8"/></div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">Sequestration Tracking</h3>
               <p className="text-gray-600 leading-relaxed">Quantify the carbon drawn down into the soil and biomass through agroforestry and regenerative practices, offsetting your total emissions.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8"><Globe className="w-8 h-8"/></div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">SBTi Alignment</h3>
               <p className="text-gray-600 leading-relaxed">Generate reporting outputs that perfectly align with the Science Based Targets initiative (SBTi) FLAG guidance for land-intensive sectors.</p>
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
