import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, ShieldAlert, FileSignature } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsible & Ethical Procurement Solutions | SourceTrace",
  description: "Embed human rights, fair labor practices, and deforestation-free standards into your supply chain procurement workflows.",
  alternates: {
    canonical: "https://www.sourcetrace.com/solutions/responsible-sourcing",
  },
  openGraph: {
    title: "Responsible & Ethical Procurement Solutions | SourceTrace",
    description: "Embed human rights, fair labor practices, and deforestation-free standards into your supply chain procurement workflows.",
    url: "https://www.sourcetrace.com/solutions/responsible-sourcing",
  }
};

export default function ResponsibleSourcingPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 bg-gray-50">
      {/* Header */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16 text-center">
        <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Responsible Sourcing</span>
        <AnimatedText 
          el="h1" 
          text="Ethics Built into Procurement." 
          className="text-5xl sm:text-7xl font-extrabold mb-8 text-[#0B3D2E]" 
        />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Embed human rights, fair labor practices, and ethical standards directly into your procurement workflows. Identify risks before they enter your supply chain.
        </p>
      </section>

      {/* Scorecard Grids (Bento Style) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Col 1 */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
               <div>
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
                     <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B3D2E] mb-4">Supplier Risk Assessment</h2>
                  <p className="text-gray-600 mb-8">
                     Automatically flag high-risk suppliers based on geographical data, historical audits, and real-time grievance reporting.
                  </p>
               </div>
               <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                     <span className="font-bold text-gray-900">Supplier A (Indonesia)</span>
                     <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">High Risk</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Identified forced labor risks in region.</p>
               </div>
            </div>

            {/* Col 2 */}
            <div className="bg-[#0B3D2E] text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F7A53] blur-[50px] rounded-full"></div>
               <div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                     <CheckCircle2 className="w-6 h-6 text-[#53D769]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Living Wage Gap Analysis</h2>
                  <p className="text-gray-300">
                     Compare actual payments to smallholders against verified living income benchmarks.
                  </p>
               </div>
               <div className="mt-8">
                  <div className="text-4xl font-black text-[#53D769] mb-1">94%</div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Gap Closed</div>
               </div>
            </div>

            {/* Col 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <FileSignature className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-bold text-[#0B3D2E] mb-4">Digital Audits</h2>
               <p className="text-gray-600 mb-6 flex-1">
                  Replace paper audits with dynamic, localized digital surveys that function offline in remote regions.
               </p>
               <Button variant="outline" className="w-full">View Audit Templates</Button>
            </div>

            {/* Col 4 */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex gap-8 items-center">
               <div className="flex-1">
                  <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-6">
                     <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B3D2E] mb-4">Grievance Mechanisms</h2>
                  <p className="text-gray-600">
                     Implement anonymous SMS and voice-based grievance reporting tools for workers at the base of the supply chain, ensuring compliance with international labor standards.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
