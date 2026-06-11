import { Star, Quote } from "lucide-react";

export function TestimonialsCarousel() {
  return (
    <section className="bg-white py-16 border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-16 text-center">
         <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Trusted by the Fortune 500</h2>
         <p className="text-xl text-gray-600 max-w-2xl mx-auto">See how the world's leading enterprises use SourceTrace to secure their supply chains and prove their impact.</p>
      </div>

      {/* CSS Marquee Carousel */}
      <div className="relative w-full overflow-hidden flex flex-col gap-8">
         {/* Row 1 - Left to Right */}
         <div className="flex w-max animate-marquee">
            {/* Track 1 */}
            <div className="flex gap-8 shrink-0 pr-8">
               {[1, 2, 3, 4, 5].map((item, idx) => (
                  <div key={`t1-${idx}`} className="w-[450px] bg-gray-50 border border-gray-100 rounded-3xl p-8 shrink-0 relative">
                     <div className="flex text-yellow-400 mb-6">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current"/>)}
                     </div>
                     <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                        "SourceTrace completely revolutionized our approach to EUDR compliance. We mapped over 50,000 smallholder plots in under 6 months."
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div>
                           <div className="font-bold text-gray-900">Sarah Jenkins</div>
                           <div className="text-sm text-gray-500">VP of Sustainability, Global Ag Co.</div>
                        </div>
                     </div>
                     <Quote className="w-24 h-24 absolute top-4 right-4 text-gray-200 opacity-20 rotate-12 pointer-events-none" />
                  </div>
               ))}
            </div>
            {/* Track 2 */}
            <div className="flex gap-8 shrink-0 pr-8">
               {[1, 2, 3, 4, 5].map((item, idx) => (
                  <div key={`t2-${idx}`} className="w-[450px] bg-gray-50 border border-gray-100 rounded-3xl p-8 shrink-0 relative">
                     <div className="flex text-yellow-400 mb-6">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current"/>)}
                     </div>
                     <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                        "SourceTrace completely revolutionized our approach to EUDR compliance. We mapped over 50,000 smallholder plots in under 6 months."
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div>
                           <div className="font-bold text-gray-900">Sarah Jenkins</div>
                           <div className="text-sm text-gray-500">VP of Sustainability, Global Ag Co.</div>
                        </div>
                     </div>
                     <Quote className="w-24 h-24 absolute top-4 right-4 text-gray-200 opacity-20 rotate-12 pointer-events-none" />
                  </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
}
