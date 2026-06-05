import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Share2, CheckCircle2 } from "lucide-react";

export default function ESGReportingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">ESG Reporting</span>
          <AnimatedText 
            el="h1" 
            text="Data that Drives Impact." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-[#0B3D2E] leading-tight" 
          />
          <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Consolidate your environmental, social, and governance metrics into an auditable, boardroom-ready dashboard. Provide investors and regulators with the undeniable proof they demand.
          </p>
        </div>
      </section>

      {/* Dashboard Visualization Feature */}
      <section className="bg-gray-50 border-y border-gray-100 py-24 mb-24">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="bg-white rounded-[40px] p-4 sm:p-8 shadow-xl border border-gray-200">
               <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#0B3D2E] rounded-xl flex items-center justify-center">
                        <BarChart3 className="text-white w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-xl font-bold text-gray-900">Corporate ESG Dashboard</h2>
                        <p className="text-sm text-gray-500">Live metrics across all global supply chains</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex gap-3">
                     <Button variant="outline" size="sm" className="gap-2"><Share2 className="w-4 h-4"/> Share</Button>
                     <Button size="sm" className="gap-2"><Download className="w-4 h-4"/> Export PDF</Button>
                  </div>
               </div>
               
               {/* Embed generated asset here */}
               <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center min-h-[400px]">
                  <img src="/assets/esg-dashboard.png" alt="ESG Dashboard Analytics" className="w-full h-auto object-cover opacity-90" />
               </div>
            </div>
         </div>
      </section>

      {/* Audit & Compliance Features */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Audit-Ready at Any Moment</h2>
               <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Stop scrambling to collect data from disparate spreadsheets at the end of the year. SourceTrace continuously aggregates primary farm-level data, ensuring your reports are always accurate and ready for third-party verification.
               </p>
               <ul className="space-y-4">
                  {['Automated Scope 3 Emissions Calculation', 'Living Wage Gap Verification', 'Deforestation-Free Proof', 'Gender Equality Metrics'].map((item, idx) => (
                     <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#53D769]" />
                        <span className="text-gray-700 font-medium">{item}</span>
                     </li>
                  ))}
               </ul>
            </div>
            <div className="bg-[#0B3D2E] rounded-3xl p-12 text-white relative overflow-hidden">
               <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#1F7A53] blur-[100px] rounded-full"></div>
               <h3 className="text-2xl font-bold mb-4 relative z-10">Generate compliant reports for:</h3>
               <div className="grid grid-cols-2 gap-4 relative z-10 mt-8">
                  {['GRI Standards', 'SASB', 'TCFD', 'CDP', 'UN SDGs', 'B Corp'].map((std, idx) => (
                     <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center font-bold">
                        {std}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
