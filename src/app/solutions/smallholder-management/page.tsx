import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Smartphone, WifiOff, Users2, Database } from "lucide-react";

export default function SmallholderManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="lg:w-1/2">
             <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Smallholder Management</span>
             <AnimatedText 
               el="h1" 
               text="Scaling the Unscalable." 
               className="text-5xl sm:text-7xl font-extrabold mb-8 text-[#0B3D2E] leading-tight" 
             />
             <p className="text-xl text-gray-600 mb-10 leading-relaxed">
               Managing a supply chain of hundreds of thousands of fragmented smallholder farmers requires robust, localized technology. Equip your field agents with the tools they need to digitize the first mile.
             </p>
             <Button size="lg" className="h-14 px-8 text-lg rounded-full">Explore the App</Button>
           </div>
           
           {/* Mobile App Mockup */}
           <div className="lg:w-1/2 relative flex justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#53D769] rounded-full blur-[100px] opacity-20"></div>
              <div className="w-[300px] h-[600px] bg-gray-900 rounded-[40px] border-[8px] border-gray-800 relative shadow-2xl overflow-hidden flex flex-col">
                 {/* App Header */}
                 <div className="bg-[#0B3D2E] p-6 text-white text-center">
                    <h4 className="font-bold">Field Agent Pro</h4>
                 </div>
                 {/* App Content */}
                 <div className="bg-gray-50 flex-1 p-4 space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                       <Users2 className="w-8 h-8 text-[#1F7A53]" />
                       <div><div className="font-bold text-sm">Register Farmer</div><div className="text-xs text-gray-500">Collect demographic data</div></div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                       <Smartphone className="w-8 h-8 text-[#1F7A53]" />
                       <div><div className="font-bold text-sm">Map Polygon</div><div className="text-xs text-gray-500">Walk the farm boundary</div></div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                       <Database className="w-8 h-8 text-[#1F7A53]" />
                       <div><div className="font-bold text-sm">Record Transaction</div><div className="text-xs text-gray-500">Log harvest deliveries</div></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features block */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
         <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <h2 className="text-4xl font-bold text-center text-[#0B3D2E] mb-16">Built for the Deepest Rural Realities</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-3xl border border-gray-200">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
                     <WifiOff className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">100% Offline Capability</h3>
                  <p className="text-gray-600">Agents can capture complex data, map polygons, and log transactions entirely offline. The app auto-syncs securely once connectivity is restored.</p>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-gray-200">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                     <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Multi-lingual & Localized</h3>
                  <p className="text-gray-600">Available in over 20 local languages with intuitive UI tailored for varying literacy levels among field staff.</p>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-gray-200">
                  <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-6">
                     <Users2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Agent Performance Tracking</h3>
                  <p className="text-gray-600">Monitor field staff productivity, GPS locations of data capture, and task completion rates via a central dashboard.</p>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
