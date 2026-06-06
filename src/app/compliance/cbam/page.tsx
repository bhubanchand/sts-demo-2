import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "CBAM Compliance",
  title: "CBAM Overview: Carbon Border Adjustments for Agriculture",
  description: "Navigate the Carbon Border Adjustment Mechanism. Protect your import margins by calculating, verifying, and declaring embedded carbon emissions in agricultural inputs.",
  scenes: [
    {
      title: "The Rise of Carbon Border Barriers",
      description: "From January 1, 2026, the EU CBAM levies import carbon tariffs on carbon-intensive goods, creating a new digital carbon tariff wall.",
      visualType: "regulatory-timeline",
      visualPrompt: "Orbital scanning overlay displaying carbon-intensive shipping routes. Prompt: \"Massive modern container ship, dark blue stormy sea, orange neon glowing light wall rising, cinematic lighting\"",
      interactiveTitle: "Verify CBAM Timeline"
    },
    {
      title: "Chemical Fertilizers Under Scope",
      description: "CBAM targets nitrogen chemical fertilizers. The carbon footprint of agricultural inputs directly impacts import margins.",
      visualType: "eudr-grid",
      visualPrompt: "3D model of agricultural input packaging indicating chemical ingredients. Prompt: \"Close-up of white fertilizer pellets on dark background, glowing chemical formulas, clean design\"",
      interactiveTitle: "Select Fertilizer Type"
    },
    {
      title: "Carbon Border Tariff Exposure",
      description: "Calculates exposure based on carbon pricing gaps between exporter country and EU ETS standards, tracking import duty margins.",
      visualType: "risk-heatmap",
      visualPrompt: "Interactive chart displaying global carbon tariff margins and national tax differentials. Prompt: \"Sleek financial bar chart, high-contrast grays, highlighted regional price gap columns\"",
      interactiveTitle: "Border Cost Calculator"
    },
    {
      title: "CBAM Margin Risk Assessment",
      description: "Request a custom CBAM margin risk assessment to evaluate your agricultural chemical supply chain carbon footprint.",
      visualType: "payment-simulator",
      visualPrompt: "Dark layout featuring a button to request a custom CBAM margin assessment. Prompt: \"Elegant corporate contact panel, dark green charcoal gradients, minimalist typography\"",
      interactiveTitle: "Request Margin Audit"
    }
  ]
};

export default function CbamOverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
