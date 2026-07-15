import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tea Sustainable Sourcing & Traceability | SourceTrace",
  description: "Track tea leaves from estate pluckers through factories to blending points with detailed carbon and labor audits.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CommodityHub/tea",
  },
  openGraph: {
    title: "Tea Sustainable Sourcing & Traceability | SourceTrace",
    description: "Track tea leaves from estate pluckers through factories to blending points with detailed carbon and labor audits.",
    url: "https://www.sourcetrace.com/CommodityHub/tea",
  }
};

export default function TeaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
