import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cocoa Sourcing & Compliance Solutions | SourceTrace",
  description: "Leverage real-time traceability, polygon mapping, and EUDR compliance checkers for cocoa supply chains.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/cocoa",
  },
  openGraph: {
    title: "Cocoa Sourcing & Compliance Solutions | SourceTrace",
    description: "Leverage real-time traceability, polygon mapping, and EUDR compliance checkers for cocoa supply chains.",
    url: "https://www.sourcetrace.com/CropInsights/cocoa",
  }
};

export default function CocoaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
