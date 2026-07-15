import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commodity Intelligence Hub | SourceTrace",
  description: "Interactive agricultural intelligence platform tracking 500+ global commodities. Discover deforestation checks, ESG compliance, Scope 3 carbon mapping, and market risks.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CommodityHub",
  },
  openGraph: {
    title: "Commodity Intelligence Hub | SourceTrace",
    description: "Interactive agricultural intelligence platform tracking 500+ global commodities. Discover deforestation checks, ESG compliance, Scope 3 carbon mapping, and market risks.",
    url: "https://www.sourcetrace.com/CommodityHub",
  }
};

export default function CommodityHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
