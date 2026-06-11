import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { CloudLightning, ThermometerSun, Droplets, Wind } from "lucide-react";

export default function ClimateRiskPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero with Background Image Overlay */}
      <section 
        className="pt-40 pb-16 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Climate Risk</span>
          <AnimatedText 
            el="h1" 
            text="Adapting to a Volatile World." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Climate change poses the greatest threat to global agricultural supply chains. Identify vulnerable regions, assess water stress, and build resilience at the farm level before disaster strikes.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Run a Vulnerability Assessment
          </Button>
        </div>
      </section>

      {/* Storytelling Content */}
      <section className="py-16 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Quantifying Climate Vulnerability</h2>
            <p className="text-lg text-gray-600">Our platform layers meteorological data over your specific supplier network to generate actionable risk scores for every plot of land in your supply chain.</p>
         </div>

         <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-red-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform cursor-default border border-red-100">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><ThermometerSun className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-lg mb-2">Temperature Stress</h3>
               <p className="text-sm text-gray-600">Mapping prolonged heatwaves affecting crop viability.</p>
            </div>
            <div className="bg-blue-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform cursor-default border border-blue-100">
               <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><Droplets className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-lg mb-2">Water Scarcity</h3>
               <p className="text-sm text-gray-600">Identifying regions facing critical groundwater depletion.</p>
            </div>
            <div className="bg-yellow-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform cursor-default border border-yellow-100">
               <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6"><CloudLightning className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-lg mb-2">Extreme Events</h3>
               <p className="text-sm text-gray-600">Calculating exposure to cyclones, floods, and frost.</p>
            </div>
            <div className="bg-emerald-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform cursor-default border border-emerald-100">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><Wind className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-lg mb-2">Micro-Climates</h3>
               <p className="text-sm text-gray-600">Modeling shift in optimal growing zones over decades.</p>
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
