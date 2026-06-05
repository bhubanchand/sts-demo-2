import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Target, Map, ShieldAlert } from "lucide-react";

export default function RubberIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1620822165063-47a2fb2e4f04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Compliant Natural Rubber." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Natural rubber is now under the scope of the EUDR. Overcome the challenge of highly fragmented smallholder networks in Southeast Asia to prove deforestation-free origin.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Rubber Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-50 rounded-[40px] p-12 shadow-sm border border-gray-100 flex flex-col justify-center h-[500px]">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center"><ShieldAlert className="w-6 h-6"/></div>
                  <h3 className="text-2xl font-bold text-gray-900">The EUDR Challenge</h3>
               </div>
               <p className="text-gray-600 leading-relaxed mb-8">
                  Unlike palm oil, rubber is dominated by millions of independent smallholders selling cup lump to complex layers of dealers. Tracing this back to the specific plot of land before the EUDR deadline is an immense data challenge.
               </p>
               <Button variant="outline" className="w-fit">Read the EUDR Rubber Guide</Button>
            </div>
            
            <div className="space-y-6">
               <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                     <Map className="w-8 h-8 text-[#1F7A53]"/>
                     <h3 className="font-bold text-xl text-gray-900">Rapid Polygon Mapping</h3>
                  </div>
                  <p className="text-gray-600">Deploy our mobile app to cooperatives and buying stations to quickly capture farmer GPS polygons when they deliver their cup lump.</p>
               </div>
               <div className="bg-[#0B3D2E] text-white border border-transparent rounded-3xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                     <Target className="w-8 h-8 text-[#53D769]"/>
                     <h3 className="font-bold text-xl">Aggregator Traceability</h3>
                  </div>
                  <p className="text-gray-300">Provide digital ledgers to middlemen, allowing them to digitally link incoming farmer deliveries to outgoing factory shipments, maintaining the chain of custody.</p>
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
