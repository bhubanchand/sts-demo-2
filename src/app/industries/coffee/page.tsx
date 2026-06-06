import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "coffee",
  title: "The Quality Gap",
  logline: "Provenance  in  Every  Cup:  Tracking  Coffee  to  the  Micro-Plot.",
  description: "The screen opens on a high-altitude volcanic coffee estate at sunrise. Soft mountain mist drifts across the green leaves and red coffee cherries.",
  colors: {
    primary: "#160C0A",
    accent: "#C5A059",
    accentHex: "#C5A059",
    bgHex: "#160C0A",
    textHex: "#123524"
  },
  scenes: [
  {
    "title": "The Quality Gap",
    "description": "The camera zooms in on a picker's hands selecting ripe cherries. Text describes the challenge of bulk blending, which hides premium micro-lots and keeps smallholder incomes low.",
    "visualType": "map",
    "interactiveTitle": "Sourcing Data Gaps Check",
    "parameters": [
      {
        "name": "Consolidated Lots",
        "value": "34"
      },
      {
        "name": "Avg Farm Size",
        "value": "1.4 ha"
      }
    ]
  },
  {
    "title": "Digital Intake",
    "description": "The picker places a basket on a digital scale linked via Bluetooth to the DG Remote app, immediately saving the weight, farmer ID, and location.",
    "visualType": "scale",
    "interactiveTitle": "Intake Bluetooth Scale",
    "parameters": []
  },
  {
    "title": "The Washing Mill Ledger",
    "description": "The screen transitions to a detailed wet-mill tracking interface. Users see parameters like fermentation hours and drying patio temperatures recorded on a secure ledger.",
    "visualType": "ledger",
    "interactiveTitle": "Washing Mill Ledger",
    "parameters": [
      {
        "name": "Water pH",
        "value": "6.8"
      },
      {
        "name": "Fermentation Time",
        "value": "24 hrs"
      },
      {
        "name": "Moisture %",
        "value": "11.8%"
      }
    ]
  },
  {
    "title": "The Cup Profile",
    "description": "The final section displays an interactive specialty cupping card, linking sensory scores with the grower's profile and initiating an direct payment. 8 Dynamic Interactive Animations",
    "visualType": "calculator",
    "interactiveTitle": "Sensory Cupping Radar Chart",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Growers Sourced",
    "value": "12,480+"
  },
  {
    "label": "Direct Payouts Made",
    "value": "$1.4M+"
  },
  {
    "label": "EUDR Compliant Lots",
    "value": "100% Verified"
  }
],
  imagePath: "/images/crops/coffee_farm.png",
  diagram: `+------------------+      (Bluetooth  Sync)       +-------------------+      (Batch  QR  Print)      
+------------------+
 
|
 
Bluetooth
 
Scale
  
|
 
------------------------>
 
|
  
DATAGREEN
 
Mobile
 
|
 
----------------------->
 
|
  
Wet
 
Mill
 
Silo
   
|
 
|
 
(Raw
 
Weight,
 
kg)
 
|
                           
|
  
(Farmer
 
Profile)
 
|
                          
|
  
(Lot
 
Assignment)|
 
+------------------+
                           
+-------------------+
                          
+------------------+
 
                                                                                                       
|
 
+------------------+
     
(Secure
 
API
 
Link)
     
+-------------------+
     
(Purity
 
Scan
 
Log)
    
|
 
(Logistics
 
Track)
 
|
 
Global
 
Distributor
 
<------------------------
 
|
  
Dry
 
Mill
 
Portal
  
|
 
<------------------------+
 
|
 
(Traceback
 
Scan)
 
|
                           
|
  
(Cupping
 
Grade)
  
|
 
+------------------+
                           
+-------------------+`
};

export default function CoffeeSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
