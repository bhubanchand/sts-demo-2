import { AnimatedText } from "@/components/ui/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Documentation & Guides | SourceTrace API",
  description: "Access API references, authentication guides, integration instructions, and tutorials for the SourceTrace Traceability Platform.",
  alternates: {
    canonical: "https://www.sourcetrace.com/docs",
  }
};

export default function DocsPage() {
  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-white flex">
      <aside className="w-64 border-r pr-8 hidden md:block">
         <h4 className="font-bold text-gray-900 mb-4">Getting Started</h4>
         <ul className="space-y-2 text-gray-600 text-sm">
           <li>Introduction</li>
           <li>Authentication</li>
           <li>API Reference</li>
         </ul>
      </aside>
      <div className="max-w-4xl mx-auto flex-1 md:pl-12">
        <AnimatedText el="h1" text="Documentation" className="text-4xl font-bold mb-8 text-[#0B3D2E]" />
        <div className="prose prose-lg prose-green max-w-none">
          <p>Welcome to the SourceTrace developer documentation.</p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl mt-8">
            <code>curl https://api.sourcetrace.com/v1/traceability</code>
          </pre>
        </div>
      </div>
    </main>
  );
}
