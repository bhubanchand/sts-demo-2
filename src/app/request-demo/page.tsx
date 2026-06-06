import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";

export default function RequestDemoPage() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-white flex justify-center pb-20">
      <div className="max-w-2xl w-full">
        <AnimatedText el="h1" text="Request a Demo" className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#0B3D2E] text-center" />
        <p className="text-center text-gray-600 mb-12">See how SourceTrace can transform your enterprise supply chain.</p>
        
        <form className="space-y-6 bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">First Name</label>
                 <input type="text" className="w-full bg-white border border-gray-200 rounded-lg h-12 px-4 outline-none focus:border-[#1F7A53] focus:ring-1 focus:ring-[#1F7A53] transition-all" />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Last Name</label>
                 <input type="text" className="w-full bg-white border border-gray-200 rounded-lg h-12 px-4 outline-none focus:border-[#1F7A53] focus:ring-1 focus:ring-[#1F7A53] transition-all" />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Work Email</label>
              <input type="email" className="w-full bg-white border border-gray-200 rounded-lg h-12 px-4 outline-none focus:border-[#1F7A53] focus:ring-1 focus:ring-[#1F7A53] transition-all" />
           </div>
           <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-lg h-12 px-4 outline-none focus:border-[#1F7A53] focus:ring-1 focus:ring-[#1F7A53] transition-all" />
           </div>
           <Button type="submit" className="w-full h-14 text-lg">Submit Request</Button>
        </form>
      </div>
    </main>
  );
}
