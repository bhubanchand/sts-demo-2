import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "Forest Risk Compliance",
  title: "Forest Risk Overview: Tracking Global Canopy Integrity",
  description: "Monitor, analyze, and declare forest-risk commodity sourcing. Map your agricultural footprints against global tropical forest loss zones to ensure compliance with international deforestation-free criteria.",
  scenes: [
    {
      title: "Ticking Forest Loss Counter",
      description: "An orbital view of the Amazon basin overlays a ticking counter showing forest loss in square meters, tracing canopy degradation.",
      visualType: "regulatory-timeline",
      visualPrompt: "Photorealistic orbital view of a lush rainforest basin, slow rotational movement. Prompt: \"Photorealistic orbital view of a lush rainforest basin, slow rotational movement, volumetric clouds, dark backdrop\"",
      interactiveTitle: "Run Forest Loss Ticker"
    },
    {
      title: "Forest Canopy Cover Comparison",
      description: "A sliding timeline compares regional forest canopy cover changes from 2000 to the present, highlighting agricultural conversions.",
      visualType: "satellite-slider",
      visualPrompt: "Drone canopy sweep showing conversion borders and forest clearing anomalies. Prompt: \"Drone shot of dense green forest, transitioning to segmented agricultural fields, high contrast\"",
      interactiveTitle: "Slide Forest Canopy Comparison"
    },
    {
      title: "Forest-Risk Commodities Grid",
      description: "Sourcing forest-risk commodities (soy, beef, cocoa, palm oil) faces strict commercial and regulatory bans in global markets.",
      visualType: "eudr-grid",
      visualPrompt: "Structured grid displaying wood, rubber, cattle, and soy products. Prompt: \"Graphic display of palm oil fruit, cattle, and soy plants, clean editorial grid, modern styling\"",
      interactiveTitle: "Verify Commodity Risks"
    },
    {
      title: "Request Supply Chain Risk Evaluation",
      description: "Connect with our team to obtain a detailed supply chain forest-risk evaluation and access a downloadable assessment checklist.",
      visualType: "payment-simulator",
      visualPrompt: "Dark panel featuring case studies on smallholder agroforestry mapping. Prompt: \"Elegant corporate contact panel, dark green charcoal gradients, minimalist typography\"",
      interactiveTitle: "Request Risk Evaluation"
    }
  ]
};

export default function ForestRiskOverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
