import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "Sustainability Compliance",
  title: "Sustainability Reporting Overview: Consolidating Sourcing Data",
  description: "Ditch scattered spreadsheets, handwritten logs, and dense PDF reports. Aggregate your farm data, compliance certificates, and Scope 3 footprints into a single unified database.",
  scenes: [
    {
      title: "Unified Sourcing Gap Assessment",
      description: "Sourcing gap assessment checklist highlights legacy reporting challenges (scattered spreadsheets, disjointed paper logs, messy code files).",
      visualType: "regulatory-timeline",
      visualPrompt: "Chaotic cluster of legacy data formats (spreadsheets, paper files, disjointed database interfaces). Prompt: \"Abstract 3D display of flying paper files, chaotic spreadsheets, and messy code lines, high contrast\"",
      interactiveTitle: "Verify Sourcing Gap"
    },
    {
      title: "The Friction of Manual Consolidation",
      description: "Manual data consolidation creates reporting lags and compliance risks. Sliders compare manual workflows against automated consolidation.",
      visualType: "split-screen",
      visualPrompt: "Animated workflow showing manual data consolidation steps, illustrating delay and error risks. Prompt: \"Sleek corporate timeline visual, highlighted warning symbols, clean typography\"",
      interactiveTitle: "Run Consolidation Comparison"
    },
    {
      title: "DATAGREEN Consolidated Database",
      description: "A clean visual grid displaying a unified database system. SVG line drawing maps connection paths across storage nodes.",
      visualType: "network-nodes",
      visualPrompt: "Clean visual grid displaying a unified database system. Prompt: \"Modern architectural grid, illuminated data storage nodes, glowing green connections, clean styling\"",
      interactiveTitle: "DATAGREEN Sourcing Grid"
    },
    {
      title: "Sourcing Data-Gap Assessment",
      description: "Request a custom data-gap assessment to evaluate your corporate reporting compliance and download the unified reporting guide.",
      visualType: "payment-simulator",
      visualPrompt: "Clean corporate footer with a downloadable guide to unified sustainability reporting. Prompt: \"Elegant corporate contact panel, dark green charcoal gradients, minimalist typography\"",
      interactiveTitle: "Request Gap Assessment"
    }
  ]
};

export default function SustainabilityReportingOverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
