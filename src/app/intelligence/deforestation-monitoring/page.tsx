import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { TreePine, AlertOctagon, Radar, LineChart } from "lucide-react";

export default function DeforestationMonitoringPage() {
  return (
    <main className="min-h-screen bg-white">
      <section 
        className="pt-40 pb-16 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Deforestation Monitoring</span>
          <AnimatedText 
            el="h1" 
            text="Zero Deforestation. Verified." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Automate your compliance with the EUDR and corporate zero-deforestation pledges. We combine high-frequency satellite imagery with farm polygons to detect tree cover loss in near real-time.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            View Live Alerts
          </Button>
        </div>
      </section>

      <section className="py-16 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 h-[600px] flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #1F7A53 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               <Radar className="w-64 h-64 text-[#1F7A53] opacity-30 animate-[spin_4s_linear_infinite]" />
               <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <div className="space-y-8">
               <h2 className="text-4xl font-bold text-[#0B3D2E]">How the Alert System Works</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                  Our system continuously scans historical and current satellite data to establish a baseline of forest cover. When tree cover loss is detected within or adjacent to your supplier polygons, an alert is triggered immediately.
               </p>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600"><AlertOctagon className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Real-Time Alerts</h3><p className="text-gray-600">Get notified the moment canopy disruption is detected.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600"><TreePine className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Historical Baselines (Dec 2020)</h3><p className="text-gray-600">Prove compliance with EUDR cut-off dates seamlessly.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600"><LineChart className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Risk Buffer Zones</h3><p className="text-gray-600">Monitor indirect supply chain risks by scanning 5km radius buffers around farms.</p></div>
                  </li>
               </ul>
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
