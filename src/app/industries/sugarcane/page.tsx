import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Map, Scale, Factory } from "lucide-react";

export default function SugarcaneIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1596435345914-7226f982d634?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Traceable Sugarcane." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Monitor harvest practices, verify labor conditions, and ensure Bonsucro certification compliance from the cane field to the sugar mill.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Sugarcane Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-8"><Scale className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Labor Rights Verification</h3>
               <p className="text-gray-600">Sugarcane harvesting is labor-intensive. Use digital surveys to monitor working conditions, verify fair wages, and ensure the absence of forced or child labor.</p>
            </div>
            <div className="bg-[#0B3D2E] rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F7A53] rounded-full blur-3xl opacity-50"></div>
               <div className="w-16 h-16 bg-white/10 text-[#53D769] rounded-2xl flex items-center justify-center mb-8 relative z-10"><Factory className="w-8 h-8"/></div>
               <h3 className="font-bold text-2xl mb-4 relative z-10">Mill Traceability</h3>
               <p className="text-gray-300 relative z-10">Track the intake of cane at the mill, linking weighbridge data directly to the specific farmer or estate plot to maintain a verifiable chain of custody.</p>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mb-8"><Map className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Burn vs. Green Harvest</h3>
               <p className="text-gray-600">Utilize satellite imagery to monitor pre-harvest cane burning practices and track the transition towards sustainable green harvesting methods.</p>
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
