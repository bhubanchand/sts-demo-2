import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "./button";

export function Footer() {
  return (
    <footer className="relative bg-[#0B3D2E] text-white overflow-hidden mt-32">
      {/* Cinematic Top Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
         {/* Fade to dark green gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/20 via-[#0B3D2E]/80 to-[#0B3D2E]"></div>
      </div>



      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 pt-32 pb-12">
        
        {/* Top Hero-ish Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
           <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Drive predictable outcomes across your agricultural operations
           </h2>
           <div className="lg:pl-16">
              <p className="text-gray-300 mb-6 text-lg">
                 Transform your agri-business with SourceTrace&apos;s AI-powered solutions. Reach out to us today to accelerate growth and boost yields with data-driven insights.
              </p>
              <Link href="/contact-sales">
                 <Button className="rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none font-bold px-8">
                    Contact Sales →
                 </Button>
              </Link>
           </div>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-12 mb-16 gap-8">
           <div className="flex items-center gap-4">
              <h3 className="text-3xl font-bold">Join Our <span className="text-[#53D769]">Newsletter</span></h3>
           </div>
           <form className="flex w-full md:w-auto gap-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full md:w-80 bg-white rounded-full px-6 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#53D769]"
              />
              <Button className="rounded-full bg-[#0ea5e9] text-white hover:bg-blue-400 border-none px-8 font-bold">
                 Join Now
              </Button>
           </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-32">
          
          {/* Logo & Certs */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <img src="/sourcetrace-logo.png" alt="SourceTrace" className="h-12 object-contain brightness-0 invert" />
            </Link>
            
            <div className="flex items-center gap-4 border border-white/20 p-4 rounded-lg w-fit">
               <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center font-bold text-xl">B</div>
               <div className="text-xs text-gray-300 max-w-[120px]">
                  This company meets high standards of social and environmental impact.
               </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Products</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/platform/traceability" className="hover:text-[#53D769] transition-colors flex items-center gap-2"><Leaf className="w-3 h-3 text-[#53D769]"/> Traceability Cloud</Link></li>
              <li><Link href="/platform/mobile-app" className="hover:text-[#53D769] transition-colors flex items-center gap-2"><Leaf className="w-3 h-3 text-[#53D769]"/> Farmer Apps</Link></li>
              <li><Link href="/platform/reporting-analytics" className="hover:text-[#53D769] transition-colors flex items-center gap-2"><Leaf className="w-3 h-3 text-[#53D769]"/> Data Hub</Link></li>
              <li><Link href="/intelligence/ai-engine" className="hover:text-[#53D769] transition-colors flex items-center gap-2"><Leaf className="w-3 h-3 text-[#53D769]"/> Intelligence</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Industry</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/CropInsights/coffee" className="hover:text-white transition-colors">Food Retail</Link></li>
              <li><Link href="/CropInsights/cocoa" className="hover:text-white transition-colors">CPG/FMCG</Link></li>
              <li><Link href="/CropInsights/seed-production" className="hover:text-white transition-colors">Seed Manufacturing</Link></li>
              <li><Link href="/CropInsights" className="hover:text-white transition-colors">Development Agencies</Link></li>
              <li><Link href="/CropInsights" className="hover:text-white transition-colors">Others</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Solutions</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/solutions/supply-chain-traceability" className="hover:text-white transition-colors">Digital Transformation</Link></li>
              <li><Link href="/intelligence/ai-engine" className="hover:text-white transition-colors">AI Powered Intelligence</Link></li>
              <li><Link href="/solutions/eudr-compliance" className="hover:text-white transition-colors">Food Supply Chain</Link></li>
              <li><Link href="/solutions/sustainable-sourcing" className="hover:text-white transition-colors">Sustainable Agriculture</Link></li>
              <li><Link href="/compliance/eudr" className="hover:text-white transition-colors">Compliance & Regulations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/company/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/customers/case-studies" className="hover:text-white transition-colors">Case Study</Link></li>
              <li><Link href="/resources/glossary" className="hover:text-white transition-colors">Glossary</Link></li>
              <li><Link href="/company/partners" className="hover:text-white transition-colors">Become a Partner</Link></li>
              <li><Link href="/company/contact" className="hover:text-white transition-colors">Connect With Us</Link></li>
              <li><Link href="/resources/newsroom" className="hover:text-white transition-colors">Newsroom</Link></li>
              <li><Link href="/legal/privacy-policy" className="hover:text-white transition-colors">Legal & Compliance</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Giant Outline Text & Socials */}
        <div className="relative flex flex-col items-end pt-8 w-full">
           {/* Giant Background Text */}
           <div 
             className="absolute bottom-0 left-2 sm:left-6 text-[10vw] md:text-[14vw] lg:text-[16vw] xl:text-[18rem] font-black leading-none pointer-events-none select-none"
             style={{
               color: 'transparent',
               WebkitTextStroke: '2px rgba(255,255,255,0.12)',
               whiteSpace: 'nowrap',
               transform: 'translateY(10%)'
             }}
           >
              SourceTrace
           </div>

           <div className="relative z-10 flex flex-col items-end gap-4">
              <p className="text-xs text-gray-500 mt-12">
                 &copy; {new Date().getFullYear()} SourceTrace Technology Solutions. All rights reserved.
              </p>
           </div>
        </div>

      </div>
    </footer>
  );
}
