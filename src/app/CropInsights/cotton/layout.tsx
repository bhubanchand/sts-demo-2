import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotton Traceability & ESG Compliance Solutions | SourceTrace",
  description: "Gain complete transparency into cotton supply chains from ginning to spinning. Meet organic and ESG certification audit requirements.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/cotton",
  },
  openGraph: {
    title: "Cotton Traceability & ESG Compliance Solutions | SourceTrace",
    description: "Gain complete transparency into cotton supply chains from ginning to spinning. Meet organic and ESG certification audit requirements.",
    url: "https://www.sourcetrace.com/CropInsights/cotton",
  }
};

export default function CottonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
