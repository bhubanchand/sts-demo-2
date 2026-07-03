import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SourceTrace | Enterprise Nature Intelligence",
  description: "Learn about SourceTrace's mission to digitize agriculture, promote sustainable sourcing, and deliver supply chain visibility.",
  alternates: {
    canonical: "https://www.sourcetrace.com/about",
  }
};

export default function AboutPage() {
  return <DynamicPage title="About SourceTrace" category="Company" />;
}
