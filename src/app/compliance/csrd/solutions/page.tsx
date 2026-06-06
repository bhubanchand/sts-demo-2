import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "CSRD Solutions",
  title: "Explore CSRD Solutions: Farm-to-Enterprise ESG Mapping",
  description: "Learn how the DATAGREEN platform bridges the supply chain data gap: from mapping Tier 3 cooperatives to aggregating satellite audits, and running AI document checks.",
  scenes: [
    {
      title: "Global Supplier Network Mapping",
      description: "Visualize and query your global value chain map from Tier 1 importers down to Tier 3 smallholder cooperatives, aggregating multi-country ESG metrics.",
      visualType: "sourcing-selector",
      visualPrompt: "Stylized geographic network map showing global supplier nodes. Prompt: \"Abstract world network, interconnected luminous green nodes, dark grays, premium SaaS UI style\"",
      interactiveTitle: "Sourcing Region Query"
    },
    {
      title: "Farm-level Data Aggregation",
      description: "Automatically collect and parse farmer profiles, GIS mapping data, and harvest records from diverse sources (APIs, spreadsheets, and mobile devices).",
      visualType: "document-parser",
      visualPrompt: "Central data hub receiving multiple inputs: spreadsheets, photos, and satellite data. Prompt: \"Central modern server hub, glowing green vector paths, diverse incoming data icons, high-tech\"",
      interactiveTitle: "AI Document Ingestion"
    },
    {
      title: "AI Certificate Auditing",
      description: "SourceTrace's AI automatically scans, parses, and validates supplier-submitted ESG certificates (ISO 14001, Fairtrade, Organic) to compile audit-ready profiles.",
      visualType: "document-parser",
      visualPrompt: "Abstract visualization of an AI engine analyzing supplier ESG documents. Prompt: \"Clean UI overlay, scanning lasers, highlighting text areas in a digital document, dark mode\"",
      interactiveTitle: "Run Document Parse"
    },
    {
      title: "Supplier Compliance Tracking",
      description: "Monitor supplier compliance levels and maturity rankings against ESRS disclosure standards. Track corrective actions and compliance gaps in real-time.",
      visualType: "eudr-grid",
      visualPrompt: "Visual checklist tracking supplier compliance against ESRS disclosure standards. Prompt: \"Sleek SaaS compliance checklist, glowing green checkmarks, professional UI typography\"",
      interactiveTitle: "Verify Supplier Status"
    },
    {
      title: "Launch Sourcing ESG Pilot",
      description: "Set up a customized ESG data collection pilot for your value chain to ensure compliance and bridge the supplier data gap.",
      visualType: "payment-simulator",
      visualPrompt: "Dark editorial section displaying case studies on sustainable value chain management. Prompt: \"High-contrast contact panel, minimalist typography, green glowing buttons\"",
      interactiveTitle: "Request CSRD Pilot"
    }
  ]
};

export default function CsrdSolutionsPage() {
  return <CompliancePageLayout data={pageData} />;
}
