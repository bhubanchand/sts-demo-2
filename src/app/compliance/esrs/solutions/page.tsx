import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "ESRS Solutions",
  title: "Explore ESRS Solutions: Satellite Audits & Biodiversity Mapping",
  description: "Learn how the DATAGREEN platform maps and validates ESRS E4 requirements: from habitat connectivity and Space for Nature metrics to Natura 2000 proximity checks.",
  scenes: [
    {
      title: "GIS Habitat Mapping and Classification",
      description: "Map agricultural boundaries and classify raw satellite imagery into distinct habitat categories (woodlands, wetlands, and hedgerows).",
      visualType: "satellite-slider",
      visualPrompt: "3D terrain mesh showing a farm boundary and satellite monitoring sweep. Prompt: \"High-resolution satellite view of agricultural land, transforming into colored classified zones, digital interface\"",
      interactiveTitle: "Run Habitat Swipe"
    },
    {
      title: "Space for Nature Calculator",
      description: "Verifies whether at least 10% of a supplier's agricultural land is managed as natural habitat, satisfying conservation criteria.",
      visualType: "carbon-calculator",
      visualPrompt: "3D farm model showing a cross-section of tree lines and agricultural crops. Prompt: \"Farm map overlay highlighting natural tree rows and grassy wetlands in glowing emerald\"",
      interactiveTitle: "Space for Nature Calculator"
    },
    {
      title: "Ecological Pathway & Wildlife Corridors",
      description: "Visualize and map wildlife corridors connecting fragmented forest patches on farm maps, documenting corridor size and health.",
      visualType: "network-nodes",
      visualPrompt: "Abstract representation of ecological corridors connecting forest patches. Prompt: \"Abstract glowing vector lines connecting isolated patches of forest on a farm map\"",
      interactiveTitle: "Verify Connectivity Nodes"
    },
    {
      title: "Natura 2000 Proximity Audit",
      description: "Measure farm polygon proximity to national parks and protected Natura 2000 conservation zones to prevent encroachment.",
      visualType: "risk-heatmap",
      visualPrompt: "Regional map displaying critical biodiversity habitats and protected areas. Prompt: \"Sleek regional map, glowing orange protected boundaries, farm coordinate pins\"",
      interactiveTitle: "Distance Check Tool"
    },
    {
      title: "Request Land Biodiversity Snapshot",
      description: "Request a custom land biodiversity snapshot by submitting your sourcing coordinates and consenting to our data agreement.",
      visualType: "payment-simulator",
      visualPrompt: "Dark panel featuring case studies on corporate biodiversity action plans. Prompt: \"Professional contact block, map interface with a glowing green location pin\"",
      interactiveTitle: "Request Biodiversity Snapshot"
    }
  ]
};

export default function EsrsSolutionsPage() {
  return <CompliancePageLayout data={pageData} />;
}
