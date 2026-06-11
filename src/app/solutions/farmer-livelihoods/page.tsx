import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, HandHeart } from "lucide-react";

export default function FarmerLivelihoodsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Emotionally Driven Hero */}
      <section className="pt-32 pb-16 max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
        <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Farmer Livelihoods</span>
        <AnimatedText 
          el="h1" 
          text="Empowering the First Mile." 
          className="text-5xl sm:text-7xl font-extrabold mb-8 text-[#0B3D2E]" 
        />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
          True sustainability begins with the farmer. We provide the tools to measure living income gaps, distribute premium payments directly, and build resilient agricultural communities.
        </p>
        <Button size="lg" className="h-14 px-8 text-lg rounded-full">See the Impact</Button>
      </section>

      {/* Impact Counters & Large Imagery */}
      <section className="bg-gray-50 border-y border-gray-100 py-16 mb-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[50vw] h-full bg-[#0B3D2E] -skew-x-12 translate-x-32 hidden lg:block"></div>
         <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">Bridging the Gap</h2>
               <p className="text-lg text-gray-600 mb-10">
                  Many smallholders live below the poverty line despite producing the world's most valuable commodities. SourceTrace helps you identify these vulnerabilities and implement targeted interventions.
               </p>
               
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <div className="text-5xl font-black text-[#1F7A53] mb-2">$14M+</div>
                     <div className="text-sm font-bold uppercase tracking-wider text-gray-500">Premiums Paid</div>
                  </div>
                  <div>
                     <div className="text-5xl font-black text-[#53D769] mb-2">2M+</div>
                     <div className="text-sm font-bold uppercase tracking-wider text-gray-500">Farmers Reached</div>
                  </div>
               </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
               <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                           <HandHeart className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">Direct Premium Transfers</h3>
                           <p className="text-gray-500 text-sm mt-1">Facilitate and track digital payments directly to farmer mobile wallets, bypassing middlemen.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                           <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">Yield Improvement Programs</h3>
                           <p className="text-gray-500 text-sm mt-1">Deliver customized agronomic advice via SMS to help farmers increase their output and income.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                           <Users className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">Cooperative Strengthening</h3>
                           <p className="text-gray-500 text-sm mt-1">Provide digital ledgers and management tools to local farmer organizations to build institutional capacity.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
