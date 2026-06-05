import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Coffee, MapPin, HandHeart, ShieldCheck } from "lucide-react";

export default function CoffeeIndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1524350876685-274059332603?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Industries</span>
          <AnimatedText 
            el="h1" 
            text="The Future of Coffee." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            From the high-altitude farms of Colombia to the roasteries of Europe. Trace every bean, ensure EUDR compliance, and verify living wages for the farmers who make your morning cup possible.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Explore Coffee Solutions
          </Button>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Solving the Coffee Supply Chain</h2>
            <p className="text-lg text-gray-600">The coffee industry is highly fragmented, relying on millions of smallholder farmers. We bring structure, visibility, and fairness to this complex network.</p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-amber-50 rounded-3xl p-10 border border-amber-100">
               <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-8"><MapPin className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">EUDR Geolocation</h3>
               <p className="text-gray-600">Coffee is a heavily regulated commodity under the new EU Deforestation Regulation. We automate the collection of farm polygons and verify deforestation-free status.</p>
            </div>
            <div className="bg-[#0B3D2E] text-white rounded-3xl p-10 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F7A53] rounded-full blur-3xl opacity-50"></div>
               <div className="w-16 h-16 bg-white/10 text-[#53D769] rounded-2xl flex items-center justify-center mb-8 relative z-10"><HandHeart className="w-8 h-8"/></div>
               <h3 className="font-bold text-2xl mb-4 relative z-10">Living Income Gaps</h3>
               <p className="text-gray-300 relative z-10">Calculate exact living income benchmarks and facilitate direct digital premium payments to coffee farmers to ensure ethical sourcing.</p>
            </div>
            <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-100">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-8"><ShieldCheck className="w-8 h-8"/></div>
               <h3 className="font-bold text-gray-900 text-2xl mb-4">Certification Sync</h3>
               <p className="text-gray-600">Manage Fairtrade, Rainforest Alliance, and Organic certifications simultaneously through our unified digital audit platform.</p>
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
