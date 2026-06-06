import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "spices",
  title: "The Fraud Challenge",
  logline: "Pure  Saffron,  Labeled  Vanilla:  Verifying  High-Value  Purity.",
  description: "The page opens on a macro view of deep red saffron threads. Soft light accents scan across the threads, highlighting their purity.",
  colors: {
    primary: "#F26419",
    accent: "#F6BD60",
    accentHex: "#F6BD60",
    bgHex: "#F26419",
    textHex: "#3D1E12"
  },
  scenes: [
  {
    "title": "The Fraud Challenge",
    "description": "The camera focuses on vanilla curing trays. Text describes how high-value spices are vulnerable to adulteration and false labeling.",
    "visualType": "scanner",
    "interactiveTitle": "Saffron Thread Purity Scan",
    "parameters": []
  },
  {
    "title": "The Organic Audit",
    "description": "The screen shows how agents map organic vanilla plots in Madagascar, using the Internal Control System to verify pesticide-free cultivation.",
    "visualType": "map",
    "interactiveTitle": "Madagascar Vanilla Plot Mapping",
    "parameters": []
  },
  {
    "title": "Spectrometer Verification",
    "description": "As the user scrolls, they see how the TraceNext system uses spectrometers to test chemical purity (like vanillin content) right at the procurement center.",
    "visualType": "ledger",
    "interactiveTitle": "Vanilla Curing Loft Log",
    "parameters": [
      {
        "name": "Moisture Target",
        "value": "18%"
      },
      {
        "name": "Curing Days",
        "value": "90 Days"
      }
    ]
  },
  {
    "title": "The Secure Export",
    "description": "The final section displays an export dashboard, proving the spice is pure, organic, and certified for global distribution. 5 Dynamic Interactive Animations ",
    "visualType": "lineage",
    "interactiveTitle": "Vanilla Batch Code Verification",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Vanilla Smallholders",
    "value": "4,200+"
  },
  {
    "label": "Purity Spectrometers Active",
    "value": "38 Stations"
  },
  {
    "label": "Madagascar Organic",
    "value": "100% Traceable"
  }
],
  imagePath: "/images/crops/vanilla_beans.png",
  diagram: ``
};

export default function SpicesSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
