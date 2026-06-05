import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Droplets, Leaf, ShieldAlert } from "lucide-react";

export default function CottonIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1589146014299-b13155169a6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Ethical Cotton Procurement." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            From seed to shirt. Track water consumption, verify organic certifications, and ensure your cotton supply chain is free from forced labor.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Cotton Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-3xl p-10 border border-blue-100">
               <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-8"><Droplets className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Water Usage Tracking</h3>
               <p className="text-gray-600">Cotton is notoriously water-intensive. Digitize irrigation data and track water usage efficiency at the farm level to meet sustainability targets.</p>
            </div>
            <div className="bg-green-50 rounded-3xl p-10 border border-green-100">
               <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mb-8"><Leaf className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Organic Verification</h3>
               <p className="text-gray-600">Track organic seed distribution and monitor pesticide use via digital field surveys to maintain the integrity of organic cotton claims.</p>
            </div>
            <div className="bg-red-50 rounded-3xl p-10 border border-red-100">
               <div className="w-16 h-16 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mb-8"><ShieldAlert className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Forced Labor Mitigation</h3>
               <p className="text-gray-600">Comply with global import bans by proving origin. Map the exact gins, spinners, and farms to guarantee an ethical chain of custody.</p>
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
