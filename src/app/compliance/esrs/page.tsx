import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESRS E1 Climate & E4 Biodiversity Compliance | SourceTrace",
  description: "Meet European Sustainability Reporting Standards (ESRS) requirements. Track carbon emissions and verify supply chain biodiversity protection.",
  alternates: {
    canonical: "https://www.sourcetrace.com/compliance/esrs",
  },
  openGraph: {
    title: "ESRS E1 Climate & E4 Biodiversity Compliance | SourceTrace",
    description: "Meet European Sustainability Reporting Standards (ESRS) requirements. Track carbon emissions and verify supply chain biodiversity protection.",
    url: "https://www.sourcetrace.com/compliance/esrs",
  }
};

const pageData: CompliancePageData = {
  category: "ESRS Compliance",
  title: "ESRS Overview: Meeting Climate and Biodiversity Standards",
  description: "Navigate the European Sustainability Reporting Standards. Learn how to address the disclosure requirements of ESRS E1 (Climate Change) and ESRS E4 (Biodiversity and Ecosystems).",
  scenes: [
    {
      title: "The Twelve ESRS Pillars",
      description: "European Sustainability Reporting Standards cover 12 pillars. On scroll, we focus on E1 (Climate Change) and E4 (Biodiversity and Ecosystems).",
      visualType: "regulatory-timeline",
      visualPrompt: "Floating architectural grid representing the twelve ESRS pillars. Prompt: \"Minimalist 3D architectural columns, dark gray blocks, floating in structured grid, glowing green highlights\"",
      interactiveTitle: "Select ESRS Pillar"
    },
    {
      title: "ESRS E1: Climate Disclosures",
      description: "Requires disclosures on Scope 3 carbon emissions, nitrogen fertilizer reduction, land-use transition emissions, and carbon removal actions.",
      visualType: "carbon-calculator",
      visualPrompt: "Atmospheric visual representing carbon emissions and temperature rise. Prompt: \"Abstract representation of rising warm air currents, glowing orange and green wave lines, clean scientific aesthetic\"",
      interactiveTitle: "E1 Sequestration Calculator"
    },
    {
      title: "ESRS E4: Biodiversity & Ecosystems",
      description: "Firms must report impacts on habitats, species conservation, and ecological connectivity, verifying they do not source from protected reserves.",
      visualType: "gps-polygon",
      visualPrompt: "Illustrated ecosystem model showcasing species habitats and water cycles. Prompt: \"Detailed cross-section of a farm ecosystem, root networks, water flow, wildlife indicators, clear graphics\"",
      interactiveTitle: "E4 Polygon Assessment"
    },
    {
      title: "ESRS Materiality Assessment Call",
      description: "Schedule a materiality assessment alignment call with our compliance experts and download the comprehensive ESRS mapping guide.",
      visualType: "payment-simulator",
      visualPrompt: "Receptive, dark panel featuring a downloadable ESRS mapping guide. Prompt: \"Sleek download portal, high contrast charcoal background, emerald green download buttons\"",
      interactiveTitle: "Schedule Alignment Call"
    }
  ]
};

export default function EsrsOverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
