import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "cotton",
  title: "The Authentication Challenge",
  logline: "The  Seed-to-Bale  Cotton  Road.",
  description: "The page opens on a sunny cotton field under a clear blue sky. Soft animations of cotton fibers drift across the screen.",
  colors: {
    primary: "#F4F1EA",
    accent: "#1A365D",
    accentHex: "#1A365D",
    bgHex: "#F4F1EA",
    textHex: "#6E5041"
  },
  scenes: [
  {
    "title": "The Authentication Challenge",
    "description": "The camera focuses on a cotton boll. Text describes how traditional, complex supply chains often mix organic and GMO cotton, reducing trust for ethical brands.",
    "visualType": "calculator",
    "interactiveTitle": "Non-GMO Seed Validation Slider",
    "parameters": []
  },
  {
    "title": "The Chetna Organic Network",
    "description": "The user is introduced to the Chetna Organic system. The screen shows how smallholders are profiled, using a digital Internal Control System to verify organic practices.",
    "visualType": "map",
    "interactiveTitle": "Chetna Organic plot mapping",
    "parameters": []
  },
  {
    "title": "The Ginning Milestone",
    "description": "As the user scrolls, they track seed cotton into the ginning mill. The system shows how automated scales record weights, print unique QR codes, and issue digital farmer payments.",
    "visualType": "scale",
    "interactiveTitle": "Ginning scale weight capture",
    "parameters": []
  },
  {
    "title": "The Verified Bale",
    "description": "The final section displays an interactive shipping portal where brands can scan any bale's QR code to trace its journey back to the specific farm. 7 Dynamic Interactive Animations",
    "visualType": "lineage",
    "interactiveTitle": "Bale QR Code Origin Tracer",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Organic Growers",
    "value": "8,500+"
  },
  {
    "label": "Cotton Bales Traced",
    "value": "42,000+"
  },
  {
    "label": "Non-GMO Seed Purity",
    "value": "99.9% Verified"
  }
],
  imagePath: "/images/crops/cotton_boll.png",
  diagram: `--- Page 12 ---
 
 +------------------+      (GIS  Mapping)      +------------------+      (QR  Code  Batch)      
+------------------+
 
|
 
Organic
 
Seed
     
|
 
-------------------->
 
|
 
Sowing
 
&
 
Growth
  
|
 
---------------------->
 
|
 
Ginning
 
Mill
     
|
 
|
 
(Non-GMO
 
Ledger)
 
|
                       
|
 
(Advisory
 
Alerts)|
                         
|
 
(Bale
 
Packaging)
 
|
 
+------------------+
                       
+------------------+
                         
+------------------+
 
                                                                                                 
|
 
+------------------+
     
(API
 
Sync)
        
+------------------+
     
(Bale
 
Number
 
Scan)
   
|
 
(Logistics
 
Track)
 
|
 
Fashion
 
Brand
    
|
 
<--------------------
 
|
 
Spinning
 
Unit
    
|
 
<--------------------------+
 
|
 
(Hanger
 
Label)
   
|
                       
|
 
(Yarn
 
Processing)|
 
+------------------+
                       
+------------------+
 
 
Cotton  Value  Chain  Traceability  Checkpoints  
 Supply  Chain  Node  
Monitored  Data  Asset  
Hardware  /  Platform  Interface  
Compliance  Standard  
Sowing  Field  Non-GMO  seed  verification  
Farmer  Enrollment  Profile  
 8  
NOP  /  NPOP  Organic  Cert  
 11  
Cooperative  Gate  Cotton  weight  &  moisture  grade  
Smart  digital  scale  integration  
 16  
Chetna  Organic  Internal  Control  
 16  
Ginning  Facility  Bale  weight  &  gin  operator  
QR/Barcode  Label  Printer  
 7  
Global  Organic  Textile  (GOTS)  
Spinning  Factory  Bale  intake  serial  codes  
Handheld  scanner  +  DG  Adapter  
 4  
Brand  origin  verification`
};

export default function CottonSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
