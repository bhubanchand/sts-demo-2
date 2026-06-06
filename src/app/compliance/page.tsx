import { CompliancePageLayout, CompliancePageData } from "@/components/compliance-page-layout";

const pageData: CompliancePageData = {
  category: "Compliance Overview",
  title: "The Cinematic Digital Ecosystem of SourceTrace: Master Compliance Portal",
  description: "Navigate fifteen specialized compliance and environmental solution pages designed to empower smallholder farmers, improve over two million livelihoods, and verify agricultural data across thirty-seven countries.",
  scenes: [
    {
      title: "The Arrival of the Mandatory Compliance Era",
      description: "Agricultural trade corridors are shifting as global ports enforce strict environmental criteria. Unverified shipments face immediate border rejection and massive fines under new regulatory mandates.",
      visualType: "regulatory-timeline",
      visualPrompt: "Dark-mode earth viewport with illuminated shipping corridors. Prompt: \"Cinematic global orthographic map, dark charcoal grid, glowing emerald and red vector lines, 8k resolution, volumetric lighting\"",
      interactiveTitle: "Verify Regulatory Timeline"
    },
    {
      title: "Paper Audits vs. Verified Proof",
      description: "Traditional supply chains rely on disjointed spreadsheets and self-reported PDFs that fail under official customs audits. Only node-level digital evidence guarantees market access.",
      visualType: "split-screen",
      visualPrompt: "High-contrast split-screen representing manual paperwork versus digital records. Prompt: \"Abstract split-screen, left side chaotic stacked paper files, right side glowing clean green digital ledger, high contrast\"",
      interactiveTitle: "Compare Compliance Friction"
    },
    {
      title: "DATAGREEN Compliance Engine",
      description: "Our platform aggregates field-level polygons, traces custody across every value chain node, and compiles verified due diligence dossiers automatically.",
      visualType: "network-nodes",
      visualPrompt: "Animated DATAGREEN core diagram receiving raw farm data and outputting certified compliance documents. Prompt: \"Isometric software core engine, glowing green circuits, translucent data packets, high-tech abstract\"",
      interactiveTitle: "DATAGREEN Node Ledger"
    },
    {
      title: "Proven Value Chain Impact",
      description: "Leading co-ops like Chetna Organic secure compliance advantages by digitizing their smallholder polygons and automating verification.",
      visualType: "payment-simulator",
      visualPrompt: "Testimonial panel featuring Chetna Organic’s value chain success. Prompt: \"Professional agricultural cooperative setting, dark green accents, clean modern UI\"",
      interactiveTitle: "Simulate Smallholder Payout"
    }
  ]
};

export default function ComplianceOverviewPage() {
  return <CompliancePageLayout data={pageData} />;
}
