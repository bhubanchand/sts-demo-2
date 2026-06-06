import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "CBAM Solutions",
  title: "Explore CBAM Solutions: Embedded Emissions Declarations",
  description: "Ditch default carbon estimates. Use the DATAGREEN platform to collect verified Scope 1 & 2 data from suppliers, simulate border cost adjustments, and export audit-ready CBAM XML registries.",
  scenes: [
    {
      title: "Embedded Sourcing Emissions Tracking",
      description: "Active node selector traces emissions data from chemical plant production directly into agricultural fields, tracking actual emissions.",
      visualType: "network-nodes",
      visualPrompt: "3D rendering of the CBAM compliance dashboard interface. Prompt: \"Detailed software dashboard, clean data columns, highlighted alert flags, professional layout\"",
      interactiveTitle: "Trace Sourcing Nodes"
    },
    {
      title: "Supplier Data Verification",
      description: "Automates supplier data verification, replacing generic carbon default values with verified actual emissions savings.",
      visualType: "document-parser",
      visualPrompt: "Digital document folder mockup displaying incoming supplier emissions declarations. Prompt: \"Mockup of an electronic filing cabinet, glowing green indicator tabs, clean design\"",
      interactiveTitle: "Verify Supplier Data"
    },
    {
      title: "Scope 1 & 2 Molecular Footprints",
      description: "Differentiate between direct Scope 1 production emissions and indirect Scope 2 electricity emissions of the fertilizer manufacturing process.",
      visualType: "carbon-calculator",
      visualPrompt: "Product carbon footprint calculator showing raw materials and processing allocations. Prompt: \"Isometric diagram of product processing, data paths mapping carbon inputs at each stage\"",
      interactiveTitle: "Molecular Scope Calculator"
    },
    {
      title: "Registry XML Compiler",
      description: "Generates compliant, verified XML reports directly format-mapped for the EU CBAM Registry to prevent default border penalty charges.",
      visualType: "document-parser",
      visualPrompt: "AI parser simulator scanning and validating exporter emissions data. Prompt: \"Translucent UI overlay, highlight scanner box reading database values, high contrast\"",
      interactiveTitle: "Generate XML Declaration"
    },
    {
      title: "Connect with CBAM Specialists",
      description: "Connect with SourceTrace CBAM integration specialists to automate your agricultural chemical supply chain carbon reporting.",
      visualType: "payment-simulator",
      visualPrompt: "Sleek dark layout featuring a direct download portal for a CBAM margin calculator. Prompt: \"High-contrast contact panel, minimalist typography, glowing green action buttons\"",
      interactiveTitle: "Schedule CBAM Consultation"
    }
  ]
};

export default function CbamSolutionsPage() {
  return <CompliancePageLayout data={pageData} />;
}
