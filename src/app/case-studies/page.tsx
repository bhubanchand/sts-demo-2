import { AnimatedText } from "@/components/ui/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Success Stories | SourceTrace Case Studies",
  description: "Read case studies on how global food, agriculture, and apparel brands use SourceTrace to achieve sustainability and EUDR compliance.",
  alternates: {
    canonical: "https://www.sourcetrace.com/case-studies",
  }
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimatedText el="h1" text="Enterprise Success Stories" className="text-5xl font-bold mb-8 text-[#0B3D2E]" />
        <p className="text-xl text-gray-600 mb-12">See how global brands are achieving sustainability goals with SourceTrace.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
             <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden">
               <div className="w-1/3 bg-gray-100"></div>
               <div className="w-2/3 p-8">
                 <h3 className="text-xl font-bold text-[#0B3D2E] mb-2">Global Enterprise {i}</h3>
                 <p className="text-gray-600 mb-4">Achieved 100% EUDR compliance across 50,000 smallholder farms.</p>
                 <span className="text-sm font-semibold text-[#1F7A53]">Read Case Study &rarr;</span>
               </div>
             </div>
          ))}
        </div>
      </div>
    </main>
  );
}
