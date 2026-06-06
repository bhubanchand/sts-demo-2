import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "rice",
  title: "The Water Footprint",
  logline: "Alternate  Wetting,  Digital  Drying:  Decarbonizing  Global  Rice.",
  description: "The page opens on a sweeping visual of terraced rice fields at dusk, with water reflecting a purple sky.",
  colors: {
    primary: "#D1D5DB",
    accent: "#39FF14",
    accentHex: "#39FF14",
    bgHex: "#D1D5DB",
    textHex: "#FCE38A"
  },
  scenes: [
  {
    "title": "The Water Footprint",
    "description": "The camera transitions to water level standpipes. Text describes how flooding rice paddies generates significant global methane emissions.",
    "visualType": "ledger",
    "interactiveTitle": "Flooded Paddy Methane Footprint",
    "parameters": [
      {
        "name": "Water Level",
        "value": "Flooded"
      },
      {
        "name": "Est. Methane Factor",
        "value": "3.2"
      }
    ]
  },
  {
    "title": "Alternate Wetting and Drying",
    "description": "The screen shows how farmers use the CarbonTrace app to record water levels during Alternate Wetting and Drying (AWD). 4 Satellite overlays show how the system confirms when fields are flooded and dried.",
    "visualType": "calculator",
    "interactiveTitle": "AWD Water Level Sensor Log",
    "parameters": []
  },
  {
    "title": "The Carbon Credit Generation",
    "description": "The user scrolls through a live credit engine, showing how reduced methane emissions are converted into verified carbon credits for smallholder cooperatives.",
    "visualType": "scale",
    "interactiveTitle": "Mill Batch Segregation Weight",
    "parameters": []
  },
  {
    "title": "The Purity Export",
    "description": "The final section displays bulk grain testing at the mill. The TraceNext system checks for pesticide residues and moisture levels, ensuring the crop is ready for international export. 5 Dynamic Interactive Animations",
    "visualType": "scanner",
    "interactiveTitle": "Purity Export NIR Test",
    "parameters": []
  }
],
  stats: [
  {
    "label": "AWD Paddy Farmers",
    "value": "14,200+"
  },
  {
    "label": "Water Savings",
    "value": "30% Reduction"
  },
  {
    "label": "Carbon Offsets Registry",
    "value": "Verified Gold Standard"
  }
],
  imagePath: "/images/crops/rice_terraces.png",
  diagram: `+-------------------+      (Water  Level  Dip)      +-------------------+      (Data  Capture)      
+-------------------+
 
|
 
IoT
 
Level
 
Sensor
  
|
 
------------------------>
 
|
 
CarbonTrace
 
App
   
|
 
--------------------->
 
|
 
Sentinel
 
Satellite|
 

--- Page 15 ---
|  (Paddy  Standpipe)  |                            |  (Tillage  Logs)     |                         |  (Soil  Moisture)    |  
+-------------------+
                           
+-------------------+
                        
+-------------------+
 
                                                                                                       
|
 
+-------------------+
     
(Third-Party
 
Audit)
   
+-------------------+
     
(Methane
 
Abating)
  
|
 
(Combined
 
Logic)
 
|
 
Verified
 
Carbon
   
|
 
<------------------------
 
|
 
Carbon
 
Registry
   
|
 
<------------------------+
 
|
 
Credits
 
Generated
 
|
                           
|
 
(Impact
 
Reports)
  
|
 
+-------------------+
                           
+-------------------+
 
 
Sustainable  Rice  Farming  System  Metrics  
 Cultivation  Metric  Tracking  Engine  Technical  Interface  
Sustainable  Outcome  
Water  Level  (AWD)  Soil  moisture  IoT  standpipes  
CarbonTrace  Mobile  
 4  
30%  reduction  in  water  usage  
 1  
Methane  Mitigation  
Automated  carbon  offset  logic  
Sentinel  satellite  analytics  
 4  
Generation  of  verified  carbon  credits  
 4  
Post-Harvest  Silo  Temperature  &  humidity  sensors  
DG  Server  Analytics  Dashboard  
 8  
Prevents  mold  development,  reducing  food  waste  
 7  
Purity  &  Export  Spectrometer-based  purity  test  
 7  
TraceNext  AI  quality  engine  
 5  
Guaranteed  compliance  with  SE  Asian  trade  
 17`
};

export default function RiceSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
