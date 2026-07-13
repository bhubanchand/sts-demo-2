import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grains & Cereals Sourcing Traceability | SourceTrace",
  description: "Monitor grain sourcing, crop storage metrics, and agricultural inputs with verified first-mile digital mapping.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/grains",
  },
  openGraph: {
    title: "Grains & Cereals Sourcing Traceability | SourceTrace",
    description: "Monitor grain sourcing, crop storage metrics, and agricultural inputs with verified first-mile digital mapping.",
    url: "https://www.sourcetrace.com/CropInsights/grains",
  }
};

export default function GrainsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
