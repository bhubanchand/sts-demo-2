import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Clock, ShieldCheck, MapPin, Database, AlertCircle } from "lucide-react";

export default function EUDRCompliancePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      {/* Urgency Hero */}
      <section className="bg-[#0B3D2E] text-white py-20 px-4 sm:px-8 mx-4 sm:mx-8 rounded-[40px] mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-200 rounded-full text-sm font-bold tracking-widest uppercase mb-8 border border-red-500/30">
            <Clock className="w-4 h-4" /> Compliance Deadline Approaching
          </div>
          <AnimatedText 
            el="h1" 
            text="Navigating the Regulatory Frontier." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The EU Deforestation Regulation (EUDR) mandates strict traceability for key commodities entering the European market. Non-compliance is no longer an option.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-[#0B3D2E] hover:bg-gray-100 border-none shadow-lg">
            Assess Your Readiness
          </Button>
        </div>
      </section>

      {/* Compliance Timeline Steps */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-24">
        <h2 className="text-4xl font-bold text-[#0B3D2E] text-center mb-16">The Path to EUDR Compliance</h2>
        <div className="grid md:grid-cols-4 gap-8">
           {[
             { step: "01", title: "Geolocation Data", desc: "Collect polygon data for all plots of land over 1 hectare where commodities were produced.", icon: MapPin },
             { step: "02", title: "Risk Assessment", desc: "Verify that production did not cause deforestation or forest degradation after Dec 31, 2020.", icon: AlertCircle },
             { step: "03", title: "Information System", desc: "Consolidate supplier data, harvest dates, and chain of custody documentation.", icon: Database },
             { step: "04", title: "Due Diligence", desc: "Submit verifiable due diligence statements to the EU Information System.", icon: ShieldCheck },
           ].map((item, idx) => (
              <div key={idx} className="relative group">
                 {idx !== 3 && <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gray-100"></div>}
                 <div className="w-24 h-24 rounded-full bg-gray-50 border-8 border-white shadow-sm flex items-center justify-center mb-6 relative z-10 mx-auto group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-[#1F7A53]" />
                 </div>
                 <div className="text-center">
                    <span className="text-sm font-bold text-[#53D769] mb-2 block">STEP {item.step}</span>
                    <h3 className="text-xl font-bold text-[#0B3D2E] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                 </div>
              </div>
           ))}
        </div>
      </section>

      {/* Deforestation Risk Matrix */}
      <section className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
           <h2 className="text-3xl font-bold text-[#0B3D2E] mb-8 text-center">Deforestation Risk Matrix</h2>
           <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-left">
                 <thead className="bg-[#0B3D2E] text-white">
                    <tr>
                       <th className="p-6 font-semibold">Commodity</th>
                       <th className="p-6 font-semibold">Risk Level</th>
                       <th className="p-6 font-semibold">Required Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                       <td className="p-6 font-medium text-gray-900">Cocoa (Ivory Coast)</td>
                       <td className="p-6"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">High</span></td>
                       <td className="p-6 text-gray-600">Polygon mapping + Satellite verification required.</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                       <td className="p-6 font-medium text-gray-900">Coffee (Brazil)</td>
                       <td className="p-6"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase tracking-wider">Standard</span></td>
                       <td className="p-6 text-gray-600">Standard due diligence and geolocation points.</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                       <td className="p-6 font-medium text-gray-900">Rubber (Vietnam)</td>
                       <td className="p-6"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">High</span></td>
                       <td className="p-6 text-gray-600">Polygon mapping + Labor rights verification.</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </section>
    </main>
  );
}
