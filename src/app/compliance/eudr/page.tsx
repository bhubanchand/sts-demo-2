import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "EUDR Compliance",
  title: "EUDR Overview: Ensuring Deforestation-Free Supply Chains",
  description: "Understand the strict requirements of the EU Deforestation Regulation. Verify that your soy, beef, palm oil, cocoa, coffee, rubber, and wood imports are not sourced from deforested land post December 31, 2020.",
  scenes: [
    {
      title: "The Forest Cut-Off Date Baseline",
      description: "A single, luminous green horizontal line represents the December 31, 2020 forest cut-off date. Satellite imagery verifies which areas were deforested before and after this timeline.",
      visualType: "eudr-scrubber",
      visualPrompt: "Horizontal timeline overlaying tropical forest canopies. Prompt: \"Aerial drone shot of dense rainforest canopy, divided by a glowing neon-emerald timeline, high-contrast, atmospheric\"",
      interactiveTitle: "Timeline Deforestation Scrubber"
    },
    {
      title: "The Seven Regulated Commodities",
      description: "EUDR targets cocoa, coffee, soy, palm oil, rubber, cattle, and wood. SourceTrace polygon mapping ensures compliance for each value chain.",
      visualType: "eudr-grid",
      visualPrompt: "Detailed grid showcasing the seven regulated commodities: cocoa, coffee, soy, palm, rubber, cattle, wood. Prompt: \"Graphic representation of raw cocoa beans, coffee cherries, and timber, clean editorial grid\"",
      interactiveTitle: "Select Commodity Criteria"
    },
    {
      title: "Country Risk Ratings & Penalties",
      description: "Sourcing countries are rated as High, Standard, or Low Risk. High-risk regions trigger mandatory 9% border inspection rates and cargo seizure risks.",
      visualType: "risk-heatmap",
      visualPrompt: "Global risk heatmap highlighting country-level deforestation ratings. Prompt: \"Minimalist global vector map, high-contrast grays, highlighted regional hotspots in glowing orange\"",
      interactiveTitle: "Risk Heat Calculator"
    },
    {
      title: "EUDR Readiness Assessment",
      description: "Map smallholder polygons in Colombia, Côte d'Ivoire, and other sourcing hubs to secure verified compliance and access the European Union market.",
      visualType: "payment-simulator",
      visualPrompt: "CTA block with background video of coffee mapping in Colombia and cocoa mapping in Côte d'Ivoire. Prompt: \"Sleek contact section, blurred video background of farmers with mobile mapping devices\"",
      interactiveTitle: "Request Readiness Assessment"
    }
  ]
};

export default function EudrOverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
