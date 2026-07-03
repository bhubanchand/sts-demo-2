import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at SourceTrace | Join the Team",
  description: "Explore career opportunities at SourceTrace and help build technology that creates sustainable agricultural supply chains globally.",
  alternates: {
    canonical: "https://www.sourcetrace.com/careers",
  }
};

export default function CareersPage() {
  return <DynamicPage title="Careers" category="Company" />;
}
