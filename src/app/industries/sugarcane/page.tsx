import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "sugarcane",
  title: "The Transit Loss",
  logline: "Harvest  Sync:  Linking  Outgrowers  with  Regional  Sugar  Mills.",
  description: "The page opens on an aerial view of a sugarcane harvest at sunset. Large combines move through golden fields, with harvesting dust backlit by the low sun.",
  colors: {
    primary: "#E5B25D",
    accent: "#2D724F",
    accentHex: "#2D724F",
    bgHex: "#E5B25D",
    textHex: "#5C3D2E"
  },
  scenes: [
  {
    "title": "The Transit Loss",
    "description": "The camera zooms in on cut cane. Text describes how delays in transit lead to rapid sucrose loss, reducing sugar yields and grower payouts.",
    "visualType": "calculator",
    "interactiveTitle": "Transit Sucrose Loss Countdown Timer",
    "parameters": []
  },
  {
    "title": "Outgrower Coordination",
    "description": "The screen shows how outgrower --- Page 28 --- cooperatives schedule harvests, using mobile advisories to match cutting times with mill processing slots.",
    "visualType": "ledger",
    "interactiveTitle": "Outgrower Cutting Schedule Planner",
    "parameters": [
      {
        "name": "Cutting Time",
        "value": "08:00"
      },
      {
        "name": "Est. Mill Transit",
        "value": "4 hrs"
      }
    ]
  },
  {
    "title": "Mill Delivery",
    "description": "As the user scrolls, they track transport trucks. The system records dispatch times and delivery weights, ensuring a transparent, efficient supply chain.",
    "visualType": "scale",
    "interactiveTitle": "Mill Dispatch Gate Weighing",
    "parameters": []
  },
  {
    "title": "Quality-Based Pricing",
    "description": "The final section displays sugar content measurements. The system automatically calculates payouts based on sugar yields, sending payments directly to the outgrower\u2019s account. 8 Dynamic Interactive Animations",
    "visualType": "calculator",
    "interactiveTitle": "Sucrose Yield Payout Calculator",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Sugarcane Outgrowers",
    "value": "11,500+"
  },
  {
    "label": "Mill Transit Saved Hours",
    "value": "-3.2 Hours Avg"
  },
  {
    "label": "Sucrose Extraction Yield",
    "value": "+8.4% Premium"
  }
],
  imagePath: "/images/crops/sugarcane_harvest.png",
  diagram: ``
};

export default function SugarcaneSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
