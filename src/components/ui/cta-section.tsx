import Link from "next/link";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="bg-[#EAF5EE] border border-[#0B3D2E]/10 rounded-[40px] p-12 md:p-24 relative overflow-hidden text-center flex flex-col items-center shadow-[0_12px_40px_rgba(0,77,38,0.02)]">
            <div className="absolute top-0 right-0 w-[800px] h-full bg-[#53D769]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#53D769]/10 blur-[150px] rounded-full pointer-events-none"></div>
            
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#0B3D2E] mb-8 relative z-10 max-w-4xl tracking-tight">
               Ready to build a transparent, resilient supply chain?
            </h2>
            <p className="text-xl text-[#1F5946] mb-12 max-w-2xl relative z-10 leading-relaxed font-medium">
               Join hundreds of leading global enterprises who trust SourceTrace to digitize their first mile, ensure compliance, and prove their impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
               <Link href="/contact-sales">
                  <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-[#0B3D2E] text-white hover:bg-[#125c44] hover:text-white border-none font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(11,61,46,0.15)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                     Contact Sales <ArrowRight className="w-5 h-5" />
                  </Button>
               </Link>
            </div>
         </div>
      </div>
    </section>
  );
}
