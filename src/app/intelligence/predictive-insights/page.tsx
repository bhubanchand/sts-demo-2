import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { TrustBadges } from "@/components/ui/trust-badges";
import { LineChart, Search, Eye, AlertTriangle } from "lucide-react";

export default function PredictiveInsightsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero with Background Image Overlay */}
      <section 
        className="pt-40 pb-32 px-4 sm:px-8 relative z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(11, 61, 46, 0.85), rgba(11, 61, 46, 0.98)), url("https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#53D769] font-bold tracking-widest uppercase mb-4 block">Predictive Insights</span>
          <AnimatedText 
            el="h1" 
            text="See the Future of Your Supply Chain." 
            className="text-5xl sm:text-7xl font-extrabold mb-8 text-white leading-tight" 
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Stop reacting to supply shocks. Utilize our forecasting models to predict harvest volumes, anticipate climate disruptions, and secure your raw material procurement months in advance.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#53D769] text-[#0B3D2E] hover:bg-white border-none">
            Request Forecast Demo
          </Button>
        </div>
      </section>

      {/* Storytelling Content */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 sm:px-8">
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B3D2E] mb-6">From Hindsight to Foresight</h2>
            <p className="text-lg text-gray-600">Move beyond static reports looking at what happened yesterday. Our platform analyzes weather patterns, historical yields, and real-time farmer inputs to model what will happen tomorrow.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><LineChart className="w-7 h-7"/></div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">Yield Forecasting</h3>
               <p className="text-gray-600 leading-relaxed">Combine agronomic data with satellite vegetation indices to predict total harvest outputs across regions with up to 92% accuracy.</p>
            </div>
            <div className="bg-[#0B3D2E] text-white border border-transparent rounded-3xl p-8 shadow-xl relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1F7A53] rounded-full blur-3xl opacity-50"></div>
               <div className="w-14 h-14 bg-white/10 text-[#53D769] rounded-2xl flex items-center justify-center mb-6 relative z-10"><AlertTriangle className="w-7 h-7"/></div>
               <h3 className="text-2xl font-bold mb-4 relative z-10">Early Warning Systems</h3>
               <p className="text-gray-300 leading-relaxed relative z-10">Receive automated alerts for impending droughts, pest outbreaks, or logistical bottlenecks before they impact your procurement.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
               <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6"><Search className="w-7 h-7"/></div>
               <h3 className="text-2xl font-bold text-[#0B3D2E] mb-4">Market Intelligence</h3>
               <p className="text-gray-600 leading-relaxed">Overlay global commodity pricing trends with local supply constraints to optimize your purchasing windows and reduce cost volatility.</p>
            </div>
         </div>
      </section>

      <StatsBanner />
      <IntegrationsGrid />
      <TestimonialsCarousel />
      <TrustBadges />
      <CTASection />
    </main>
  );
}
