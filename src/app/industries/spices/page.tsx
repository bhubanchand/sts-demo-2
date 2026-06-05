import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { SearchCheck, PackageOpen, Network } from "lucide-react";

export default function SpicesIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Unlocking Spice Origin." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Spice supply chains are notoriously fragmented and vulnerable to adulteration. Ensure food safety, guarantee origin, and protect your brand's integrity.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Spice Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl font-bold text-[#0B3D2E]">Defending Integrity</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                  When spices pass through dozens of middlemen before reaching the processor, the risk of adulteration skyrockets. SourceTrace bypasses the opacity.
               </p>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600"><SearchCheck className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Quality & Adulteration Checks</h3><p className="text-gray-600">Digitally log quality parameters (moisture, foreign matter) at the exact moment of procurement.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600"><Network className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Disintermediation</h3><p className="text-gray-600">Connect directly with farmer groups, recording transactions digitally to build transparent sourcing hubs.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600"><PackageOpen className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Batch Serialization</h3><p className="text-gray-600">Print unique QR codes at the collection point to ensure identity preservation through processing.</p></div>
                  </li>
               </ul>
            </div>
            <div className="bg-[#0B3D2E] rounded-[40px] p-12 text-white text-center shadow-xl">
               <h3 className="text-3xl font-bold mb-6">Traceability from Seed to Shelf</h3>
               <p className="text-gray-300 mb-8 leading-relaxed">Allow consumers to scan a QR code on the final spice jar to see the exact cooperative where the vanilla, pepper, or turmeric was grown.</p>
               <Button variant="outline" className="border-white text-gray-900 bg-white hover:bg-gray-100 w-full">View Consumer App Demo</Button>
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
