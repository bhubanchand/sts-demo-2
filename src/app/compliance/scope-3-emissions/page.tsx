import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "Scope 3 Compliance",
  title: "Scope 3 Emissions: Tracing Carbon Across the Sourcing Map",
  description: "Navigate the GHG Protocol Land Sector and Removals Standard. Ditch high-level carbon factor estimates. Trace emissions directly to specific supplier land plots.",
  scenes: [
    {
      title: "Corporate Walls to Sourcing Maps",
      description: "Sourcing region boundaries display regional carbon emission footprints, helping food companies trace emissions back to specific lands.",
      visualType: "regulatory-timeline",
      visualPrompt: "Minimalist office space transitioning into a global agricultural map. Prompt: \"Modern corporate office boardroom, walls splitting open to reveal a massive glowing green world map, high contrast\"",
      interactiveTitle: "Verify Emissions Boundaries"
    },
    {
      title: "The Scope 3 Emissions Challenge",
      description: "Agricultural sourcing represents 40% to 60% of total food industry emissions. Sliders reveal the Scope 3 emissions split.",
      visualType: "scope3-slider",
      visualPrompt: "Bar chart comparing Scope 1, 2, and 3 emissions for food companies. Prompt: \"Graphic 3D pie chart, dark gray background, high-contrast slices, largest slice glowing green\"",
      interactiveTitle: "Run Sourcing Emissions Split"
    },
    {
      title: "GHG Protocol Land Sector Standard",
      description: "Timeline highlights land management, land use change, and carbon removals accounting milestones for the GHG Protocol LSR Standard.",
      visualType: "regulatory-timeline",
      visualPrompt: "Digital timeline displaying implementation milestones for the GHG Protocol LSR Standard. Prompt: \"Sleek timeline graphic, modern typography, highlighted future milestone markers, clean style\"",
      interactiveTitle: "Verify LSR Timeline"
    },
    {
      title: "Scope 3 Compliance Evaluation",
      description: "Request a custom Scope 3 compliance evaluation to align your sourcing operations with GHG Protocol carbon accounting guidelines.",
      visualType: "payment-simulator",
      visualPrompt: "Clean corporate footer with a downloadable guide to land sector carbon accounting. Prompt: \"Elegant corporate contact panel, dark green charcoal gradients, minimalist typography\"",
      interactiveTitle: "Request Carbon Audit"
    }
  ]
};

export default function Scope3OverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
