import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "Scope 3 Solutions",
  title: "Explore Scope 3 Solutions: CarbonTrace Sourcing Ledger",
  description: "Leverage CarbonTrace. Combine on-farm mobile data capture with Soil Organic Carbon satellite tracing, and generate automated, compliance-aligned Scope 3 emissions reports.",
  scenes: [
    {
      title: "Mobile-to-Orbital Dual Sourcing Scan",
      description: "CarbonTrace combines hand-held mobile app data tracking with orbital satellite mapping to trace farm practices and soil carbon storage.",
      visualType: "satellite-slider",
      visualPrompt: "3D rendering of CarbonTrace's dual-view tracking interface. Prompt: \"Split screen display, left side modern mobile app showing farm checklists, right side detailed satellite map, dark mode\"",
      interactiveTitle: "Verify Dual Sourcing View"
    },
    {
      title: "Verified On-Farm Sourcing Practices",
      description: "Interactive checkboxes log and validate sustainable practices (fertilizer usage, tillage, water management, cover cropping) in real-time.",
      visualType: "eudr-grid",
      visualPrompt: "Real-time tracking of smallholder practices like cover crops. Prompt: \"Sleek SaaS data cards, crop icons, glowing status bars, clean typography\"",
      interactiveTitle: "Verify Sourcing Checkbox"
    },
    {
      title: "Soil Organic Carbon Sequester Calculator",
      description: "Calculator estimates carbon sequestration in soil layers over time, tracking soil organic carbon changes.",
      visualType: "carbon-calculator",
      visualPrompt: "3D model of agricultural soil layers displaying soil organic carbon storage. Prompt: \"Detailed soil profile layers, glowing organic matter particles, healthy root structures\"",
      interactiveTitle: "Run Carbon Calculator"
    },
    {
      title: "Automated Scope 3 Reporting",
      description: "Compile and export verified, audit-ready carbon emissions reports aligned with the GHG Protocol Land Sector and Removals Standard.",
      visualType: "document-parser",
      visualPrompt: "Visual interface of CarbonTrace's reporting dashboard. Prompt: \"Modern data analytics dashboard, clean charts displaying emissions reductions, professional typography\"",
      interactiveTitle: "Compile Sourcing Report"
    },
    {
      title: "Consult with Scope 3 Specialists",
      description: "Schedule a consultation with our Scope 3 agricultural carbon specialists to start calculating actual sourcing footprints.",
      visualType: "payment-simulator",
      visualPrompt: "Sleek dark footer with partner contact options and case studies on Scope 3 carbon reduction. Prompt: \"High-contrast contact panel, minimalist typography, glowing green action buttons\"",
      interactiveTitle: "Schedule Sourcing Audit"
    }
  ]
};

export default function Scope3SolutionsPage() {
  return <CompliancePageLayout data={pageData} />;
}
