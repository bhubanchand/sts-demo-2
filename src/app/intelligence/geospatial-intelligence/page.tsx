import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Map, Layers, Navigation, ScanFace } from "lucide-react";

export default function GeospatialIntelligencePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero with Background Image Overlay */}
      <section 
        className="pt-40 pb-16 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.7), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Geospatial Intelligence</span>
          <AnimatedText 
            el="h1" 
            text="Mapping the World's Agriculture." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Precision polygon mapping meets high-resolution satellite imagery. Pinpoint the exact origin of your raw materials and continuously monitor the land they grow on.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-[#0B3D2E] hover:bg-gray-100 border-none shadow-lg">
            View Live Maps
          </Button>
        </div>
      </section>

      {/* Bento Grid Storytelling */}
      <section className="py-16 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100 flex flex-col justify-center">
               <div className="w-16 h-16 bg-[#1F7A53]/10 text-[#1F7A53] rounded-2xl flex items-center justify-center mb-8"><Navigation className="w-8 h-8"/></div>
               <h2 className="text-3xl font-bold text-[#0B3D2E] mb-6">Sub-Meter Precision Polygons</h2>
               <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Our mobile application allows field agents to walk the perimeter of even the most remote, irregularly shaped smallholder plots, capturing GPS points to create highly accurate digital polygons.
               </p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 font-medium text-gray-700"><ScanFace className="w-5 h-5 text-[#53D769]"/> Offline GPS tracking</li>
                  <li className="flex items-center gap-3 font-medium text-gray-700"><ScanFace className="w-5 h-5 text-[#53D769]"/> Automated error correction for overlapping boundaries</li>
               </ul>
            </div>
            
            <div className="bg-[#0B3D2E] rounded-3xl p-12 border border-gray-100 flex flex-col justify-center text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #53D769 0%, transparent 40%)' }}></div>
               <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 relative z-10"><Layers className="w-8 h-8"/></div>
               <h2 className="text-3xl font-bold mb-6 relative z-10">Satellite Data Overlays</h2>
               <p className="text-lg text-gray-300 leading-relaxed mb-8 relative z-10">
                  We cross-reference farm polygons against Sentinel and Landsat imagery databases, providing historical and real-time views of land use changes, forest cover, and vegetation health.
               </p>
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
