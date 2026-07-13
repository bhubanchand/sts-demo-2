import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { LineChart, Leaf, Droplets, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability Impact Measurement & Valuation | SourceTrace",
  description: "Track and quantify the ROI of your environmental and social sustainability interventions with reliable field data.",
  alternates: {
    canonical: "https://www.sourcetrace.com/solutions/impact-measurement",
  },
  openGraph: {
    title: "Sustainability Impact Measurement & Valuation | SourceTrace",
    description: "Track and quantify the ROI of your environmental and social sustainability interventions with reliable field data.",
    url: "https://www.sourcetrace.com/solutions/impact-measurement",
  }
};

export default function ImpactMeasurementPage() {
  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Hero */}
      <section className="pt-32 pb-20 max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
        <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Impact Measurement</span>
        <AnimatedText 
          el="h1" 
          text="Proving Your Promise." 
          className="text-5xl sm:text-7xl font-extrabold mb-8 text-[#0B3D2E]" 
        />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
          Move beyond anecdotal stories. Track, quantify, and prove the environmental and social ROI of your sustainability interventions with hard data.
        </p>
      </section>

      {/* KPI Bento Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Top Row: Large Chart */}
            <div className="md:col-span-4 bg-[#0B3D2E] text-white rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[800px] h-full bg-[#1F7A53] -skew-x-12 translate-x-1/4 opacity-20"></div>
               <div className="md:w-1/3 relative z-10">
                  <h2 className="text-3xl font-bold mb-4">Carbon Sequestration Trends</h2>
                  <p className="text-gray-300 mb-8">Track the effectiveness of agroforestry and regenerative agriculture programs over time.</p>
                  <Button variant="outline" className="border-white text-gray-900 bg-white hover:bg-gray-100">View Full Report</Button>
               </div>
               <div className="md:w-2/3 w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-64 flex items-end justify-between gap-2 relative z-10">
                  {/* Mock Bar Chart */}
                  {[30, 45, 40, 60, 75, 85, 100].map((h, i) => (
                     <div key={i} className="w-full bg-[#53D769] rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
               </div>
            </div>

            {/* Bottom Row: 3 Metrics */}
            <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-8 flex items-center justify-between">
               <div>
                  <div className="text-gray-500 font-bold tracking-wider text-sm uppercase mb-2">Water Usage Reduction</div>
                  <div className="text-5xl font-black text-blue-600">-32%</div>
               </div>
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-blue-600" />
               </div>
            </div>
            
            <div className="md:col-span-1 bg-[#1F7A53] text-white rounded-3xl p-8 flex flex-col justify-between">
               <div className="text-green-200 font-bold tracking-wider text-sm uppercase mb-2">Canopy Cover</div>
               <div className="text-4xl font-black">+18%</div>
               <Leaf className="w-8 h-8 opacity-50 mt-4" />
            </div>

            <div className="md:col-span-1 bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm">
               <div className="text-gray-500 font-bold tracking-wider text-sm uppercase mb-2">Yield Variance</div>
               <div className="text-4xl font-black text-[#0B3D2E]">+12.5%</div>
               <LineChart className="w-8 h-8 text-gray-300 mt-4" />
            </div>

         </div>
      </section>

      {/* Baseline VS Endline Section */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
         <div className="max-w-[1000px] mx-auto px-4 sm:px-8 text-center">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8">
               <Target className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Continuous Improvement Framework</h2>
            <p className="text-xl text-gray-600 mb-12">
               Establish a rock-solid baseline during farmer registration. Then, continuously measure progress against your programmatic goals through targeted, localized digital surveys.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
               <div className="bg-white px-8 py-4 rounded-full font-bold shadow-sm border border-gray-200">1. Baseline Setup</div>
               <div className="w-8 h-1 bg-gray-300"></div>
               <div className="bg-white px-8 py-4 rounded-full font-bold shadow-sm border border-gray-200">2. Intervention</div>
               <div className="w-8 h-1 bg-gray-300"></div>
               <div className="bg-[#0B3D2E] text-white px-8 py-4 rounded-full font-bold shadow-md">3. Impact Measurement</div>
            </div>
         </div>
      </section>
    </main>
  );
}
