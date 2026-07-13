import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSRD Double Materiality Compliance | SourceTrace",
  description: "Navigate CSRD reporting for value chains. Map double materiality, carbon footprints, and Scope 3 supplier data with farm-level proof.",
  alternates: {
    canonical: "https://www.sourcetrace.com/compliance/csrd",
  },
  openGraph: {
    title: "CSRD Double Materiality Compliance | SourceTrace",
    description: "Navigate CSRD reporting for value chains. Map double materiality, carbon footprints, and Scope 3 supplier data with farm-level proof.",
    url: "https://www.sourcetrace.com/compliance/csrd",
  }
};

const pageData: CompliancePageData = {
  category: "CSRD Compliance",
  title: "CSRD Overview: Double Materiality in Agricultural Sourcing",
  description: "Navigate the Corporate Sustainability Reporting Directive. Transition from high-level estimates to verified farm-level proof, mapping financial risk alongside Scope 3 value chain impacts.",
  scenes: [
    {
      title: "Double Materiality: Financial and Impact",
      description: "CSRD mandates disclosure of climate risks to the balance sheet (Financial) and corporate operations' impacts on ecosystems and society (Impact).",
      visualType: "materiality-quadrant",
      visualPrompt: "Abstract editorial report design transitioning into a 3D landscape. Prompt: \"Graphic design of an annual report, text elements morphing into 3D green land parcels, high-contrast\"",
      interactiveTitle: "Verify Materiality Score"
    },
    {
      title: "The Sourcing Footprint Reality",
      description: "For food, beverage, and agricultural businesses, over 90% of environmental and social impact exists outside corporate facilities, deep within Scope 3 sourcing.",
      visualType: "split-screen",
      visualPrompt: "Double materiality quadrant diagram mapping impact against financial risk. Prompt: \"Modern scientific coordinate graph, clean charcoal axis, highlighted green vector quadrants, minimalist\"",
      interactiveTitle: "Materiality Split"
    },
    {
      title: "Scope 1, 2, and 3 Emissions Analysis",
      description: "Scope 3 emissions comprise up to 60% of total agricultural industry emissions. Mapping supplier practices is key to accounting for this footprint.",
      visualType: "scope3-slider",
      visualPrompt: "3D bar chart highlighting Scope 1, 2, and 3 emissions split. Prompt: \"Graphic 3D bar chart, dark gray background, high-contrast columns, largest column glowing green\"",
      interactiveTitle: "Scope 3 Sourcing Slider"
    },
    {
      title: "CSRD Corporate Preparation Checklist",
      description: "Obtain immediate access to the comprehensive preparation checklist to verify your supply chain readiness under the new CSRD directive.",
      visualType: "payment-simulator",
      visualPrompt: "Editorial block featuring insights on value chain due diligence and CSDDD. Prompt: \"Elegant editorial text card, clean sans-serif  typography, dark gradient accents\"",
      interactiveTitle: "Request CSRD Checklist"
    }
  ]
};

export default function CsrdOverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
