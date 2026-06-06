import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "Forest Risk Solutions",
  title: "Explore Forest Risk Solutions: 3D Mapping & Canopy Analytics",
  description: "Leverage satellite-driven forest monitoring technology. Audit farm canopy cover, transition to carbon-sequestering agroforestry systems, and estimate Soil Organic Carbon values in real-time.",
  scenes: [
    {
      title: "3D Farm Terrain Mesh Mapping",
      description: "Visualize farm plot boundaries on a 3D terrain grid, toggling between canopy density and soil health data views.",
      visualType: "gps-polygon",
      visualPrompt: "3D terrain mesh showing a farm boundary and satellite monitoring sweep. Prompt: \"Luminous green 3D vector landscape mesh, sweeping orbital laser scan, dark gray background, modern tech\"",
      interactiveTitle: "Map 3D Farm Terrain"
    },
    {
      title: "Biomass Density & Canopy Peel",
      description: "Interactive slider tool details tree species diversity and canopy cover percentage, revealing forest layers.",
      visualType: "satellite-slider",
      visualPrompt: "High-resolution forest canopy scan showing biomass density and carbon storage. Prompt: \"Cross-section of dense forest canopy, glowing carbon storage layers, clean data visualization\"",
      interactiveTitle: "Run Canopy Peel Slider"
    },
    {
      title: "Forest-Friendly Agroforestry Transition",
      description: "Transition farms from high-risk monoculture into sustainable agroforestry co-cropping. Trace root growth and carbon absorption.",
      visualType: "network-nodes",
      visualPrompt: "Cross-section model of an agroforestry farm. Prompt: \"3D cross-section of a farm with coffee plants growing under tall shade trees, deep root networks, clean graphics\"",
      interactiveTitle: "Verify Agroforestry Nodes"
    },
    {
      title: "CO2 Sequestration Calculator",
      description: "Calculate carbon offset potential of agricultural soil layers, projecting up to 38 tons of CO2 offset annually.",
      visualType: "carbon-calculator",
      visualPrompt: "3D model of healthy soil structure showing organic matter and carbon sequestration. Prompt: \"Detailed soil profile layers, glowing carbon organic matter particles, healthy root structures\"",
      interactiveTitle: "Run Sequestration Estimator"
    },
    {
      title: "Forest-Risk Platform Demo",
      description: "Submit your value chain details to schedule a custom demo of the SourceTrace forest-risk compliance platform.",
      visualType: "payment-simulator",
      visualPrompt: "Dark layout featuring a button to request a custom forest risk platform Demo. Prompt: \"Sleek contact block, map interface with glowing location pins, professional UI styling\"",
      interactiveTitle: "Register for Demo"
    }
  ]
};

export default function ForestRiskSolutionsPage() {
  return <CompliancePageLayout data={pageData} />;
}
