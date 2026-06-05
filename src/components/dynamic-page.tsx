import { AnimatedText } from "@/components/ui/animated-text";
import { notFound } from "next/navigation";

interface DynamicPageProps {
  title: string;
  category: string;
}

export function DynamicPage({ title, category }: DynamicPageProps) {
  // In a real app, this would fetch from Payload CMS using the slug
  if (!title) return notFound();

  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#1F7A53] font-semibold tracking-wider uppercase mb-4 block">
          {category}
        </span>
        <AnimatedText el="h1" text={title} className="text-4xl sm:text-6xl font-extrabold mb-8 text-[#0B3D2E] capitalize" />
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 min-h-[500px]">
          <div className="prose prose-lg prose-green max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              This is a dynamic page generated for the <strong>{title}</strong> topic. In production, this content will be populated directly from the Payload Headless CMS.
            </p>
            <div className="h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-8">
               <span className="text-gray-400 font-medium">Dynamic Content Area</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
