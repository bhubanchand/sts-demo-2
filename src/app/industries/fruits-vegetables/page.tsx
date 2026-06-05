import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Thermometer, CalendarClock, ShieldCheck } from "lucide-react";

export default function FruitsVegetablesIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Freshness, Guaranteed." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Track perishables from farm to fork. Manage cold chain logistics, predict harvest windows, and maintain GlobalG.A.P. certifications to ensure food safety and reduce waste.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Fresh Produce Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-3xl p-10 border border-red-100">
               <div className="w-16 h-16 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mb-8"><Thermometer className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Cold Chain Tracking</h3>
               <p className="text-gray-600">Integrate IoT temperature sensors to track the journey of highly perishable goods, ensuring optimal conditions are maintained to minimize spoilage.</p>
            </div>
            <div className="bg-blue-50 rounded-3xl p-10 border border-blue-100">
               <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-8"><CalendarClock className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Harvest Forecasting</h3>
               <p className="text-gray-600">Use predictive models based on weather data and planting dates to accurately forecast harvest volumes and coordinate logistics efficiently.</p>
            </div>
            <div className="bg-green-50 rounded-3xl p-10 border border-green-100">
               <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mb-8"><ShieldCheck className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Food Safety Audits</h3>
               <p className="text-gray-600">Digitize hygiene checklists, pesticide residue testing records, and GlobalG.A.P compliance documents for instantaneous recall readiness.</p>
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
