import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palm Oil Sourcing & RSPO Traceability | SourceTrace",
  description: "Verify deforestation-free palm oil production. Trace supply chains to palm oil mill and smallholder plantation level.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/palm-oil",
  },
  openGraph: {
    title: "Palm Oil Sourcing & RSPO Traceability | SourceTrace",
    description: "Verify deforestation-free palm oil production. Trace supply chains to palm oil mill and smallholder plantation level.",
    url: "https://www.sourcetrace.com/CropInsights/palm-oil",
  }
};

export default function PalmOilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
