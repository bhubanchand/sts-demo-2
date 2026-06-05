import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Map, TreePine, Leaf, ShieldCheck, ArrowRight } from "lucide-react";

export default function SustainableSourcingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-white">
      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Sustainable Sourcing</span>
          <AnimatedText 
            el="h1" 
            text="From Origin to Operations." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-[#0B3D2E] leading-tight" 
          />
          <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Ensure every raw material in your supply chain meets the highest standards of environmental and social sustainability. Map the journey, verify the claims, and build trust with your consumers.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full">Book a Consultation</Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">Watch Video</Button>
          </div>
        </div>
      </section>

      {/* Split Screen Sticky Scroll */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 flex flex-col lg:flex-row gap-16 relative">
          {/* Left: Sticky Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 self-start space-y-8">
            <h2 className="text-4xl font-bold text-[#0B3D2E]">The Anatomy of an Ethical Supply Chain</h2>
            <p className="text-lg text-gray-600">
              True sustainability requires visibility down to the farm level. Our platform provides the tools to monitor deforestation, assess living wages, and track carbon emissions at the source.
            </p>
            <ul className="space-y-6 mt-8">
              {[
                { title: "Geospatial Mapping", icon: Map, desc: "Map farm boundaries and assess deforestation risks using satellite imagery." },
                { title: "Deforestation-Free Claims", icon: TreePine, desc: "Verify that raw materials do not contribute to global forest loss." },
                { title: "Regenerative Practices", icon: Leaf, desc: "Track the adoption of regenerative agriculture techniques among smallholders." },
                { title: "Ethical Verification", icon: ShieldCheck, desc: "Ensure compliance with human rights and living wage standards." },
              ].map((feature, idx) => (
                <li key={idx} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#53D769] transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#53D769]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#53D769]/20">
                    <feature.icon className="w-6 h-6 text-[#1F7A53]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right: Scrolling Visuals */}
          <div className="lg:w-1/2 space-y-12">
             <div className="aspect-square bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
                <h3 className="text-2xl font-bold text-[#0B3D2E] mb-6">Real-time Risk Dashboard</h3>
                <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100">
                   <img src="/assets/esg-dashboard.png" alt="ESG Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                </div>
             </div>
             <div className="aspect-square bg-[#0B3D2E] rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col text-white">
                <h3 className="text-2xl font-bold mb-6">Traceability Network</h3>
                <div className="flex-1 rounded-2xl overflow-hidden relative">
                   <img src="/assets/traceability-diagram.png" alt="Traceability Network" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen" />
                </div>
             </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 text-center">
         <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Ready to transform your sourcing?</h2>
         <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join leading enterprises in building transparent, ethical, and sustainable global supply chains.</p>
         <Button size="lg" className="h-14 px-8 text-lg rounded-full inline-flex items-center gap-2">
            Get Started Today <ArrowRight className="w-5 h-5" />
         </Button>
      </section>
    </main>
  );
}
