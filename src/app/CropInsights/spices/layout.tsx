import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spice Value Chain Traceability & Purity | SourceTrace",
  description: "Secure high-value spice supply chains. Trace pepper, vanilla, and ginger sourcing, ensuring purity tests and smallholder premiums.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/spices",
  },
  openGraph: {
    title: "Spice Value Chain Traceability & Purity | SourceTrace",
    description: "Secure high-value spice supply chains. Trace pepper, vanilla, and ginger sourcing, ensuring purity tests and smallholder premiums.",
    url: "https://www.sourcetrace.com/CropInsights/spices",
  }
};

export default function SpicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
