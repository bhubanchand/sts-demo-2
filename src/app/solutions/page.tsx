import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agriculture & Supply Chain Solutions | SourceTrace",
  description: "Explore SourceTrace's solutions for agricultural sustainability, EUDR compliance, ESG reporting, and smallholder management.",
  alternates: {
    canonical: "https://www.sourcetrace.com/solutions",
  },
  openGraph: {
    title: "Agriculture & Supply Chain Solutions | SourceTrace",
    description: "Explore SourceTrace's solutions for agricultural sustainability, EUDR compliance, ESG reporting, and smallholder management.",
    url: "https://www.sourcetrace.com/solutions",
  }
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimatedText el="h1" text="Solutions by Industry" className="text-5xl font-bold mb-8 text-[#0B3D2E]" />
        <p className="text-xl text-gray-600 mb-12">Tailored solutions for agriculture, forestry, and global commodities.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
               <div className="h-48 bg-gray-100 rounded-xl mb-6"></div>
               <h3 className="text-xl font-bold text-[#0B3D2E] mb-2">Industry {i}</h3>
               <p className="text-gray-600">Traceability and impact measurement for this specific sector.</p>
             </div>
          ))}
        </div>
      </div>
    </main>
  );
}
