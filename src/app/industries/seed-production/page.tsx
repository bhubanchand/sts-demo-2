import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Dna, ShieldCheck, MapPin } from "lucide-react";

export default function SeedProductionIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Securing Genetic Purity." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Manage contract farmers, enforce isolation distances, and maintain strict Identity Preservation (IP) to guarantee the quality and purity of agricultural seeds.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Seed Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Precision Agriculture starts at the Seed</h2>
            <p className="text-lg text-gray-600">Seed production is a highly controlled process. Our platform provides the digital infrastructure to manage every meticulous step from planting to processing.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-3xl p-10 border border-purple-100">
               <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mb-8"><MapPin className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Isolation Distance Mapping</h3>
               <p className="text-gray-600">Use GPS polygon mapping to ensure contract seed plots are located at safe distances from commercial crops to prevent cross-pollination.</p>
            </div>
            <div className="bg-[#0B3D2E] text-white rounded-3xl p-10 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F7A53] rounded-full blur-3xl opacity-50"></div>
               <div className="w-16 h-16 bg-white/10 text-[#53D769] rounded-2xl flex items-center justify-center mb-8 relative z-10"><Dna className="w-8 h-8"/></div>
               <h3 className="font-bold text-2xl mb-4 relative z-10">Identity Preservation (IP)</h3>
               <p className="text-gray-300 relative z-10">Maintain a rigorous, unbreakable digital chain of custody tracking parental lines, planting, detasseling, harvesting, and final bagging.</p>
            </div>
            <div className="bg-blue-50 rounded-3xl p-10 border border-blue-100">
               <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-8"><ShieldCheck className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Field Inspections</h3>
               <p className="text-gray-600">Equip agronomists with mobile applications to log rogueing activities, pest pressures, and overall crop health during mandatory field inspections.</p>
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
