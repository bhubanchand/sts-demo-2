import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { BrainCircuit, Cpu, Network, Zap } from "lucide-react";

export default function AIEnginePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero with Background Image Overlay */}
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.8), rgba(11, 61, 46, 0.95)), url("https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Intelligence Core</span>
          <AnimatedText 
            el="h1" 
            text="The SourceTrace AI Engine." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Transform raw, unstructured farm data into proactive intelligence. Our proprietary AI models analyze millions of data points across global supply chains to predict yields, flag anomalies, and optimize interventions.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            See the AI in Action
          </Button>
        </div>
      </section>

      {/* Storytelling Grid */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl font-bold text-[#0B3D2E]">Turning Noise into Signal</h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                  Supply chains generate massive amounts of fragmented data. From SMS logs in remote villages to complex satellite imagery arrays, our AI Engine ingests, cleanses, and structures this data in real-time.
               </p>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600"><Cpu className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Machine Learning Pipelines</h3><p className="text-gray-600">Continuously training models on a decade of historical harvest data.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600"><Network className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Neural Graph Networks</h3><p className="text-gray-600">Identifying hidden relationships between disparate supplier tiers.</p></div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0 text-yellow-600"><Zap className="w-6 h-6"/></div>
                     <div><h3 className="font-bold text-gray-900 text-xl mb-1">Anomaly Detection</h3><p className="text-gray-600">Instantly flagging fraudulent transactions or unlikely yield spikes.</p></div>
                  </li>
               </ul>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 h-[600px] flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[#0B3D2E] opacity-5"></div>
               <BrainCircuit className="w-64 h-64 text-[#1F7A53] opacity-20" />
               <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-gradient-to-r from-transparent via-[#53D769]/20 to-transparent blur-xl animate-pulse"></div>
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
