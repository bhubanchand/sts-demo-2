import { ArrowRight, Workflow, Database, Cloud } from "lucide-react";
import { Button } from "./button";

export function IntegrationsGrid() {
  return (
    <section className="bg-gray-50 py-24 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
               <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Ecosystem Integrations</span>
               <h2 className="text-4xl sm:text-5xl font-bold text-[#0B3D2E] mb-6">Plays well with your existing stack.</h2>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  SourceTrace is not another siloed dashboard. Our open API architecture seamlessly pushes traceability data directly into your ERP, procurement, and legacy systems.
               </p>
               <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full font-bold flex items-center gap-2">
                  View Developer Documentation <ArrowRight className="w-5 h-5"/>
               </Button>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
                  <span className="text-2xl font-black tracking-tighter text-blue-600">SAP</span>
                  <p className="text-sm text-gray-500 font-medium">Native ERP Integration</p>
               </div>
               <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
                  <span className="text-2xl font-black text-red-600">ORACLE</span>
                  <p className="text-sm text-gray-500 font-medium">Supply Chain Cloud</p>
               </div>
               <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
                  <span className="text-2xl font-black text-blue-400">Microsoft</span>
                  <p className="text-sm text-gray-500 font-medium">Dynamics 365</p>
               </div>
               <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="flex gap-2">
                     <Cloud className="text-gray-400"/>
                     <Database className="text-gray-400"/>
                     <Workflow className="text-gray-400"/>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Custom REST API</p>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
