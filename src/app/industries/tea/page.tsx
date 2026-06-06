import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "tea",
  title: "The Leaf Grade Gap",
  logline: "Precision  Plucking,  Fair  Payouts:  Empowering  the  Tea  Garden.",
  description: "The page opens on a tea estate in the early morning mist. Sunlight filters through the hills, highlighting the terraced tea rows.",
  colors: {
    primary: "#0B4F30",
    accent: "#E9ECEF",
    accentHex: "#E9ECEF",
    bgHex: "#0B4F30",
    textHex: "#E5A93C"
  },
  scenes: [
  {
    "title": "The Leaf Grade Gap",
    "description": "The camera focus shifts to a picker selecting tea leaves. Text describes how mixing high-quality leaves with lower-grade  varieties during bulk weighing reduces grower payouts.",
    "visualType": "scanner",
    "interactiveTitle": "Leaf Plucking Grade Scanner",
    "parameters": []
  },
  {
    "title": "Precision Weighing",
    "description": "The screen shows how on-site agents use Bluetooth scales connected to the DG Remote app. They record the weight and assign a leaf-quality grade right at the collection gate.",
    "visualType": "scale",
    "interactiveTitle": "Cooperative Gate Weighing",
    "parameters": []
  },
  {
    "title": "The Factory Traceability",
    "description": "As the user scrolls, they track the tea through the withering, rolling, and drying stages.",
    "visualType": "ledger",
    "interactiveTitle": "Withering Loft Temperature Log",
    "parameters": [
      {
        "name": "Withering Loft Temp",
        "value": "24 C"
      },
      {
        "name": "Oxidation Time",
        "value": "3.5 hrs"
      }
    ]
  },
  {
    "title": "Wage Transparency",
    "description": "The final section displays an direct payment dashboard. It shows how the system ensures fair wages and premiums are paid directly to the grower's digital wallet. 8 Dynamic Interactive Animations",
    "visualType": "calculator",
    "interactiveTitle": "Direct Payment Wallet Simulator",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Tea Garden Sourced",
    "value": "18,400+"
  },
  {
    "label": "Quality Grade Premium",
    "value": "+15% Grower Payout"
  },
  {
    "label": "Fair Trade Checked",
    "value": "100% Certified"
  }
],
  imagePath: "/images/crops/tea_plucking.png",
  diagram: `+------------------+      (Coop  Weigh  Scale)     +------------------+      (Factory  Log)      
+------------------+
 
|
 
Smallholder
 
Plot
 
|
 
-------------------->
 
|
 
Weighing
 
Station
 
|
 
-------------------->
 
|
 
Withering
 
Loft
   
|
 
|
 
(GPS
 
Coordinates)|
                       
|
 
(Leaf
 
Grade
 
Tag)
 
|
                       
|
 
(Humidity
 
Control|
 
+------------------+
                       
+------------------+
                       
+------------------+
 
                                                                                               
|
 
+------------------+
     
(Consensus
 
Engine)
    
+------------------+
     
(Firing
 
Stage)
     
|
 
(Dry
 
Processing)
 
|
 
Global
 
Blender
   
|
 
<--------------------
 
|
 
Blockchain
 
Log
   
|
 
<--------------------------+
 
|
 
(Traceback
 
Code)
 
|
                       
|
 
(Purity
 
Ledger)
  
|
 
+------------------+
                       
+------------------+
 
 
Specialty  Tea  Cooperative  Tracking  Framework  

--- Page 18 ---
 Production  Stage  Target  Telemetry  Sensing  Instrument  
Quality  &  Social  Output  
Harvest  Plucking  Fine  pluck  ratio  %  (two  leaves  &  bud)  
Image  recognition  via  mobile  
 7  
Premium  payout  for  top-grade  leaves  
 12  
Weighing  Station  Total  harvest  weight  
 12  
Bluetooth  scale  integration  
 4  
Shorter  payment  cycles  for  growers  12  
Fermentation  Leaf  oxidation  temperature  
Direct  IoT  probe  integration  
Consistent  color,  aroma,  and  flavor  profiles  
Estate  Audits  Ethical  labor  conditions  
 11  
Farmer  profiling  database  
 8  
Validated  Fair  Trade  &  RainForest  standards  
 11`
};

export default function TeaSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
