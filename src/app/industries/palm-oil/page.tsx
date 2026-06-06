import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "palm_oil",
  title: "The Traceability Challenge",
  logline: "Verified  Forests,  Individual  Yields:  Reforming  Palm  Oil.",
  description: "The page opens on an aerial view of a sustainable, geometric palm plantation. Clean data lines overlay the groves, highlighting mapped plots.",
  colors: {
    primary: "#124E33",
    accent: "#FFBF00",
    accentHex: "#FFBF00",
    bgHex: "#124E33",
    textHex: "#4A4A4A"
  },
  scenes: [
  {
    "title": "The Traceability Challenge",
    "description": "The camera descends to canopy level. Text outlines the challenge of proving deforestation-free sourcing and managing yields.",
    "visualType": "calculator",
    "interactiveTitle": "Deforestation-Free Canopy Verification",
    "parameters": []
  },
  {
    "title": "Tree-Level Yields",
    "description": "The screen shows how field teams map plots and record bunch sizes. 10 It shows how this data helps optimize fertilizer use, reducing chemical runoff.",
    "visualType": "map",
    "interactiveTitle": "Palm Plantation Grid Check",
    "parameters": []
  },
  {
    "title": "Automated Weighing",
    "description": "As the user scrolls, they see a fresh fruit bunch loaded onto automated scales. Weight data is captured and sent directly to the DG Server, preventing manual entry errors.",
    "visualType": "scale",
    "interactiveTitle": "Intake Bunch Weighing",
    "parameters": []
  },
  {
    "title": "The RSPO Certificate",
    "description": "The final section displays an RSPO internal audit dashboard. It shows how the system verifies compliance directly in the field, helping secure international certifications. 12 Dynamic Interactive Animations",
    "visualType": "ledger",
    "interactiveTitle": "RSPO Compliance Dossier Checklist",
    "parameters": [
      {
        "name": "RSPO Check",
        "value": "Compliant"
      },
      {
        "name": "Peatland Drainage",
        "value": "Zero"
      }
    ]
  }
],
  stats: [
  {
    "label": "Smallholder Grooves Mapped",
    "value": "24,000+"
  },
  {
    "label": "RSPO Compliance Audit",
    "value": "Passed 100%"
  },
  {
    "label": "Peatland Drainage Restrictions",
    "value": "Verified zero"
  }
],
  imagePath: "/images/crops/palm_grid.png",
  diagram: ``
};

export default function PalmoilSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
