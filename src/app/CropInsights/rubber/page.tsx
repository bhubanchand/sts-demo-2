import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "rubber",
  title: "The Pricing Dispute",
  logline: "Traceable  Latex:  Securing  Decarbonized  Rubber  Supply  Lanes.",
  description: "The screen opens on a close-up of a rubber tree trunk at night. White latex drips slowly into a collection cup under soft moonlight.",
  colors: {
    primary: "#F8F9FA",
    accent: "#1C1C1C",
    accentHex: "#1C1C1C",
    bgHex: "#F8F9FA",
    textHex: "#2B4C7E"
  },
  scenes: [
  {
    "title": "The Pricing Dispute",
    "description": "The camera transitions to a local collection center. Text describes how smallholders often struggle with inaccurate estimates of dry rubber content (DRC %), leading to unfair pricing.",
    "visualType": "calculator",
    "interactiveTitle": "DRC (Dry Rubber Content) Calculator",
    "parameters": []
  },
  {
    "title": "The Liquid Audit",
    "description": "The screen shows how on-site agents test latex, recording actual volume and dry rubber content directly on the DG Remote app.",
    "visualType": "ledger",
    "interactiveTitle": "Latex Intake Log",
    "parameters": [
      {
        "name": "Latex Volume",
        "value": "450 L"
      },
      {
        "name": "DRC %",
        "value": "34.5%"
      }
    ]
  },
  {
    "title": "The Processing Ledger",
    "description": "As the user scrolls, they track the latex through coagulation, washing, and sheet drying, saving weight and quality logs.",
    "visualType": "scale",
    "interactiveTitle": "Sheet Weight Ledger scale",
    "parameters": []
  },
  {
    "title": "The Certified Shipment",
    "description": "The final section displays an export dashboard, showing that the batch meets Forest Stewardship Council (FSC) standards and is fully traceable from the plantation. 7 Dynamic Interactive Animations",
    "visualType": "lineage",
    "interactiveTitle": "FSC Certificate Validation",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Latex Tappers Sourced",
    "value": "9,800+"
  },
  {
    "label": "FSC Sourced Shipments",
    "value": "100% Compliant"
  },
  {
    "label": "DRC Verification Accuracy",
    "value": "99.8% DRC"
  }
],
  imagePath: "/images/crops/rubber_latex.png",
  diagram: ``
};

export default function RubberSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
