import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "fruits_vegetables",
  title: "The Spoilage Risk",
  logline: "Safe  Cold  Chains:  From  Orchard  Gate  to  Retail  Shelf.",
  description: "The page opens on a packaging line. Deep red apples move along a conveyor, swept by a blue computer-vision scanning light.",
  colors: {
    primary: "#E53935",
    accent: "#43A047",
    accentHex: "#43A047",
    bgHex: "#E53935",
    textHex: "#00ACC1"
  },
  scenes: [
  {
    "title": "The Spoilage Risk",
    "description": "The camera transitions to storage facilities. Text describes how poor climate control leads to significant food loss and safety concerns.",
    "visualType": "ledger",
    "interactiveTitle": "Conveyor Intake Sorting Monitor",
    "parameters": [
      {
        "name": "Intake Sorting",
        "value": "Active"
      },
      {
        "name": "Defect Count",
        "value": "0.02%"
      }
    ]
  },
  {
    "title": "Traceable Sourcing",
    "description": "The screen shows how field agents map orchards and record harvest times. 8 It displays real-time quality grading and batch code assignments.",
    "visualType": "map",
    "interactiveTitle": "Orchard Origin Plot Mapping",
    "parameters": []
  },
  {
    "title": "The Cold Chain Audit",
    "description": "As the user scrolls, they track temperature-controlled trucks. The interface displays live climate data, proving cold chain integrity.",
    "visualType": "ledger",
    "interactiveTitle": "Cold Chain Trailer Temperature Log",
    "parameters": [
      {
        "name": "Trailer Temp",
        "value": "4.2 C"
      },
      {
        "name": "Relative Humidity",
        "value": "85%"
      }
    ]
  },
  {
    "title": "The Safe Retail Scan",
    "description": "The final section displays a retail store. A shopper scans a QR code on an apple carton, instantly viewing its journey and --- Page 31 --- pesticide-free certification. 7 Dynamic Interactive Animations",
    "visualType": "lineage",
    "interactiveTitle": "Retail QR Traceback Validation",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Orchards Sourced",
    "value": "2,800+"
  },
  {
    "label": "IoT Cold Chain Trackers",
    "value": "450 Trailing"
  },
  {
    "label": "Retail Freshness Index",
    "value": "100% QA Verified"
  }
],
  imagePath: "/images/crops/apple_conveyor.png",
  diagram: `+------------------+      (Computer  Vision)      +------------------+      (Barcode  Batch  Print)  
+------------------+
 
|
 
Packing
 
House
    
|
 
------------------------>
 
|
 
AI
 
Grading
 
Scale
 
|
 
------------------------>
 
|
 
Cold
 
Storage
 
Room|
 
|
 
(Intake
 
Sorting)
 
|
                           
|
 
(Visual
 
Sorting)
 
|
                           
|
 
(Continuous
 
Temp)|
 
+------------------+
                       
+------------------+
                       
+------------------+
 
                                                                                               
|
 
+------------------+
     
(QR
 
Traceback
 
Scan)
   
+------------------+
     
(IoT
 
Temperature
 
Scan)
 
|
 
(Logistics
 
Transit)
 
|
 
Global
 
Retailer
  
|
 
<------------------------
 
|
 
Delivery
 
Truck
   
|
 
<--------------------------+
 
|
 
(Freshness
 
Check)|
                           
|
 
(Continuous
 
Temp)|
 
+------------------+
                       
+------------------+
 
 
Fresh  Produce  Value  Chain  Telemetry  Matrix  
 Logistics  Node  Target  Telemetry  Sensing  Technology  
Quality  Output  
Harvest  Sorting  Farm  plot  location  &  yield  
 9  
Farmer  Enrollment  GPS  
 9  
Confirms  regional  origins  
 7  

--- Page 32 ---
Packaging  Yard  Surface  quality  &  blemishes  
Computer-vision  cameras  
 7  
Visual  grading  reports  
 14  
Cold  Storage  Temperature  &  humidity  levels  
Wireless  IoT  sensors  
 7  
Prevents  decay  during  storage  
 14  
Export  Logistics  Trailer  climate  &  route  
 7  
GPS  tracking  &  loggers  
 7  
Verifies  continuous  cold  chain  
 14`
};

export default function FruitsvegetablesSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
