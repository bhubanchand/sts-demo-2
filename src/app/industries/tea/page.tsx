import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Leaf, Award, Building2 } from "lucide-react";

export default function TeaIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="Ethical Tea Estates." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            From large estates to outgrower networks, manage the complexities of tea sourcing. Verify worker welfare, manage Rainforest Alliance certifications, and track plucking data in real-time.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Tea Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-100">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-8"><Building2 className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Estate & Outgrower Management</h3>
               <p className="text-gray-600">Tea supply chains often mix large estate production with smallholder outgrowers. Our platform manages both structures seamlessly in a unified database.</p>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-8"><Award className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Worker Welfare</h3>
               <p className="text-gray-600">Track living wage metrics, housing conditions, and grievance reporting mechanisms for estate pluckers to ensure compliance with human rights standards.</p>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-16 h-16 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mb-8"><Leaf className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Plucking Traceability</h3>
               <p className="text-gray-600">Digitally log daily green leaf intake weights at the collection center, tying quality and volume data directly back to specific plots or outgrowers.</p>
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
