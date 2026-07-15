import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Natural Rubber Traceability & Compliance | SourceTrace",
  description: "Verify FSC-compliant, deforestation-free natural rubber sourcing. Map smallholder latex tappers and track quality metrics in real-time.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CommodityHub/rubber",
  },
  openGraph: {
    title: "Natural Rubber Traceability & Compliance | SourceTrace",
    description: "Verify FSC-compliant, deforestation-free natural rubber sourcing. Map smallholder latex tappers and track quality metrics in real-time.",
    url: "https://www.sourcetrace.com/CommodityHub/rubber",
  }
};

export default function RubberLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
