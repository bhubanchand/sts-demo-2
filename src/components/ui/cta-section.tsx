import Link from "next/link";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="bg-[#0B3D2E] rounded-[40px] p-12 md:p-24 relative overflow-hidden text-center flex flex-col items-center">
            <div className="absolute top-0 right-0 w-[800px] h-full bg-[#1F7A53] blur-[120px] rounded-full opacity-40 mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#53D769] blur-[150px] rounded-full opacity-20 pointer-events-none"></div>
            
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-8 relative z-10 max-w-4xl">
               Ready to build a transparent, resilient supply chain?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl relative z-10 leading-relaxed">
               Join hundreds of leading global enterprises who trust SourceTrace to digitize their first mile, ensure compliance, and prove their impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
               <Link href="/contact-sales">
                  <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none font-bold flex items-center gap-2">
                     Contact Sales <ArrowRight className="w-5 h-5" />
                  </Button>
               </Link>
            </div>
         </div>
      </div>
    </section>
  );
}
