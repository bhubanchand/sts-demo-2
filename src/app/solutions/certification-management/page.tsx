import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Award, FileSignature, CheckSquare, Layers } from "lucide-react";

export default function CertificationManagementPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-gray-50">
      {/* Header */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Certification Management</span>
        <AnimatedText 
          el="h1" 
          text="Streamlining the Standard." 
          className="text-5xl sm:text-7xl font-extrabold mb-8 text-[#0B3D2E]" 
        />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Reduce audit fatigue. Manage multiple sustainability certifications simultaneously through a centralized, automated compliance workflow.
        </p>
      </section>

      {/* Certification Badges Carousel / Grid */}
      <section className="bg-white border-y border-gray-200 py-12 mb-24 overflow-hidden">
         <div className="flex animate-marquee whitespace-nowrap opacity-60">
            {/* Mock Certification Names */}
            {['Fairtrade International', 'Rainforest Alliance', 'Organic', 'GlobalG.A.P.', 'FSC', 'RSPO', 'Bonsucro'].map((cert, idx) => (
               <span key={idx} className="text-2xl font-bold text-gray-400 mx-12 uppercase tracking-widest">{cert}</span>
            ))}
            {['Fairtrade International', 'Rainforest Alliance', 'Organic', 'GlobalG.A.P.', 'FSC', 'RSPO', 'Bonsucro'].map((cert, idx) => (
               <span key={idx} className="text-2xl font-bold text-gray-400 mx-12 uppercase tracking-widest">{cert}</span>
            ))}
         </div>
      </section>

      {/* Value Prop Cards */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-24">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-[#53D769]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7 text-[#1F7A53]" />
               </div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">Multi-Standard Mapping</h3>
               <p className="text-gray-600 leading-relaxed">
                  Map a single data point (e.g., pesticide use) across multiple certification standards simultaneously to avoid redundant data entry.
               </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <CheckSquare className="w-7 h-7 text-blue-600" />
               </div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">Automated Checklists</h3>
               <p className="text-gray-600 leading-relaxed">
                  Generate digital checklists tailored to specific standards, guiding field agents step-by-step during internal inspections.
               </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-yellow-600" />
               </div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">Non-Conformity Tracking</h3>
               <p className="text-gray-600 leading-relaxed">
                  Instantly flag non-conformities during audits and assign corrective action plans (CAPs) directly to the responsible parties.
               </p>
            </div>
         </div>
      </section>
    </main>
  );
}
