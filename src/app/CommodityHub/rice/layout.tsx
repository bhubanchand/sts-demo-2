import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rice Traceability & Smallholder Management Solutions | SourceTrace",
  description: "Improve water efficiency, monitor methane emissions, and manage smallholder paddy networks with smart agritech tools.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CommodityHub/rice",
  },
  openGraph: {
    title: "Rice Traceability & Smallholder Management Solutions | SourceTrace",
    description: "Improve water efficiency, monitor methane emissions, and manage smallholder paddy networks with smart agritech tools.",
    url: "https://www.sourcetrace.com/CommodityHub/rice",
  }
};

export default function RiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
