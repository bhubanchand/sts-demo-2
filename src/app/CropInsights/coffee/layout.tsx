import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Sourcing & Traceability Solutions | SourceTrace",
  description: "Track coffee from smallholder cooperatives through wet mills to dry mills with secure mobile payment validation.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/coffee",
  },
  openGraph: {
    title: "Coffee Sourcing & Traceability Solutions | SourceTrace",
    description: "Track coffee from smallholder cooperatives through wet mills to dry mills with secure mobile payment validation.",
    url: "https://www.sourcetrace.com/CropInsights/coffee",
  }
};

export default function CoffeeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
