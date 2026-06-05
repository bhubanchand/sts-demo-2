import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Sprout, TestTube, Bug } from "lucide-react";

export default function RegenerativeAgriculturePage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.7), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Regenerative Agriculture</span>
          <AnimatedText 
            el="h1" 
            text="Healing the Soil." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Transition your supply base from extractive to regenerative. We provide the intelligence to measure soil health, track biodiversity, and incentivize farmers to adopt nature-positive practices.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Discover the Metrics
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Measuring the Unmeasurable</h2>
            <p className="text-lg text-gray-600">Regenerative agriculture requires moving beyond yield metrics. Our platform digitizes complex ecological indicators to prove the health of the ecosystem.</p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-3xl p-10 text-center hover:-translate-y-2 transition-transform cursor-default border border-emerald-100">
               <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><TestTube className="w-10 h-10"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Soil Organic Carbon</h3>
               <p className="text-gray-600">Track soil test results over time to verify that carbon is actively being returned to the earth.</p>
            </div>
            <div className="bg-yellow-50 rounded-3xl p-10 text-center hover:-translate-y-2 transition-transform cursor-default border border-yellow-100">
               <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6"><Bug className="w-10 h-10"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Biodiversity Indices</h3>
               <p className="text-gray-600">Monitor the presence of indicator species and the integration of shade trees in agroforestry systems.</p>
            </div>
            <div className="bg-blue-50 rounded-3xl p-10 text-center hover:-translate-y-2 transition-transform cursor-default border border-blue-100">
               <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><Sprout className="w-10 h-10"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Cover Cropping</h3>
               <p className="text-gray-600">Use satellite indices to verify year-round ground cover and reductions in tillage practices.</p>
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
