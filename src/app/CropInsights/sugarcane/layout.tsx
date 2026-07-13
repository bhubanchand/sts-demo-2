import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sugarcane Outgrower Sourcing & Yield | SourceTrace",
  description: "Optimize sugarcane harvest scheduling and mill transit. Verify sucrose content yields and automate outgrower payouts.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/sugarcane",
  },
  openGraph: {
    title: "Sugarcane Outgrower Sourcing & Yield | SourceTrace",
    description: "Optimize sugarcane harvest scheduling and mill transit. Verify sucrose content yields and automate outgrower payouts.",
    url: "https://www.sourcetrace.com/CropInsights/sugarcane",
  }
};

export default function SugarcaneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
