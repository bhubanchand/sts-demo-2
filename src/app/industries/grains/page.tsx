import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "grains",
  title: "The Spoilage Risk",
  logline: "Safe  Silos:  Optimizing  Bulk  Grain  Quality  and  Global  Trade.",
  description: "The page opens on a sweeping visual of grain elevators. Trains and trucks load bulk wheat grains under a dramatic evening sky.",
  colors: {
    primary: "#DAA520",
    accent: "#1E252B",
    accentHex: "#1E252B",
    bgHex: "#DAA520",
    textHex: "#F1C40F"
  },
  scenes: [
  {
    "title": "The Spoilage Risk",
    "description": "The camera transitions inside a storage silo. Text describes the risk of mold and toxic spoilage from incorrect moisture levels.",
    "visualType": "ledger",
    "interactiveTitle": "Silo Spoilage / Mold Risk Tracker",
    "parameters": [
      {
        "name": "Moisture Level",
        "value": "13.4%"
      },
      {
        "name": "Silo Temp",
        "value": "22 C"
      }
    ]
  },
  {
    "title": "The Purity Audit",
    "description": "The screen shows how grain elevators test intake moisture, recording weight and quality data directly on the platform.",
    "visualType": "scale",
    "interactiveTitle": "Grain Intake Scale Weighing",
    "parameters": []
  },
  {
    "title": "Safe Storage",
    "description": "As the user scrolls, they see a 3D model of a storage silo. The interface displays live climate data, showing how aeration systems keep grain safe.",
    "visualType": "calculator",
    "interactiveTitle": "3D Silo Aeration Tracker",
    "parameters": []
  },
  {
    "title": "The Export Approval",
    "description": "The final section displays shipping clearance at the port. The TraceNext system verifies safety and quality parameters, ensuring the crop is ready for international trade. 2 Dynamic Interactive Animations",
    "visualType": "ledger",
    "interactiveTitle": "Port Clearance Checklists",
    "parameters": [
      {
        "name": "Export Safety",
        "value": "Cleared"
      },
      {
        "name": "Mycotoxin Check",
        "value": "Negative"
      }
    ]
  }
],
  stats: [
  {
    "label": "Silos Monitored",
    "value": "120+ Bulk Silos"
  },
  {
    "label": "Grains Loss Mitigated",
    "value": "-14% Year-over-Year"
  },
  {
    "label": "Grains Export Volume",
    "value": "1.2M Tons Traced"
  }
],
  imagePath: "/images/crops/grain_silos.png",
  diagram: ``
};

export default function GrainsSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
