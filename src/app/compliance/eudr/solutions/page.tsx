import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "EUDR Solutions",
  title: "Explore EUDR Solutions: GPS, Satellite, and Blockchain Technology",
  description: "Walk through the full technological integration of the DATAGREEN platform: from polygon field mapping to orbital Sentinel checks, blockchain custody tracking, and customs reporting.",
  scenes: [
    {
      title: "DATAGREEN Mobile GPS Polygon Mapping",
      description: "Field agents map farm coordinates in real-time, overlaying polygons on farm plots to create transparent, verified land boundaries.",
      visualType: "gps-polygon",
      visualPrompt: "3D rendering of the DATAGREEN mobile application overlaying a farm plot. Prompt: \"Modern mobile app mockup displaying a green vector farm map, transparent glass layers, dark green environment\"",
      interactiveTitle: "Mobile GPS Polygon Mapping"
    },
    {
      title: "GIS Mapping and Polygon Calculation",
      description: "Automatic calculation of total land area in hectares based on coordinate pins, ensuring compliance with land mapping guidelines.",
      visualType: "satellite-slider",
      visualPrompt: "Isometric model of smallholder plots with corner coordinate pins. Prompt: \"Clean 3D land plot, distinct green boundaries, shining location marker pins, abstract digital mesh\"",
      interactiveTitle: "Verify Boundary Overlay"
    },
    {
      title: "Sentinel Satellite Deforestation Scan",
      description: "Sentinel scans mapped coordinates to verify zero deforestation against historical records, comparing forest cover before and after 2020.",
      visualType: "eudr-scrubber",
      visualPrompt: "Satellite sweep visual showing historical forest cover comparison. Prompt: \"Orbital view of agricultural plots, glowing laser scanner, data overlays displaying forest density\"",
      interactiveTitle: "Run Satellite Audit Scrubber"
    },
    {
      title: "Blockchain Custody and Transaction Audit",
      description: "Connected blocks trace agricultural commodity custody from farm to port, ensuring a tamper-proof digital ledger.",
      visualType: "network-nodes",
      visualPrompt: "Blockchain node animation tracing commodity custody from farm to cooperative. Prompt: \"Connected blocks in 3D space, luminous green data flow, modern industrial logistics aesthetic\"",
      interactiveTitle: "Verify Custody Nodes"
    },
    {
      title: "Automated TRACES Due Diligence Statements",
      description: "Generate audit-ready EU TRACES compliance documents on button click, avoiding customs hold delays and penalties.",
      visualType: "document-parser",
      visualPrompt: "Mockup of the official EU TRACES portal interface displaying automated form completion. Prompt: \"Modern software interface, official European regulatory styling, automated form filling, glowing checkmark\"",
      interactiveTitle: "Generate TRACES Dossier"
    },
    {
      title: "Empower Sourcing with DATAGREEN",
      description: "Schedule a demo with our team to align your coffee, cocoa, or palm oil value chains with international compliance mandates.",
      visualType: "payment-simulator",
      visualPrompt: "Clean corporate footer with client success stories from Cargill and NEI. Prompt: \"Elegant corporate contact panel, dark green charcoal gradients, minimalist typography\"",
      interactiveTitle: "Schedule Compliance Assessment"
    }
  ]
};

export default function EudrSolutionsPage() {
  return <CompliancePageLayout data={pageData} />;
}
