import { CropPageLayout, CropData } from "@/components/crop-page-layout";

const pageData: CropData = {
  cropKey: "seed_production",
  title: "The Quality Risk",
  logline: "Preserving  Seed  Lineages:  Tracking  Genetic  Quality  and  Diversity.",
  description: "The page opens on a modern research laboratory. A green seedling sprouts from dark, rich soil, surrounded by clean botanical data displays.",
  colors: {
    primary: "#FFFFFF",
    accent: "#0288D1",
    accentHex: "#0288D1",
    bgHex: "#FFFFFF",
    textHex: "#43A047"
  },
  scenes: [
  {
    "title": "The Quality Risk",
    "description": "The camera transitions inside a climate-controlled seed bank. Text describes the challenge of preserving seed genetic purity and protecting farmers from poor-quality, uncertified seeds.",
    "visualType": "ledger",
    "interactiveTitle": "Seed Preservation Indicator Check",
    "parameters": [
      {
        "name": "Seed Genus",
        "value": "B. napus"
      },
      {
        "name": "Pedigree Hash",
        "value": "Verified"
      }
    ]
  },
  {
    "title": "Lineage Tracking",
    "description": "The screen shows how seed companies record seed pedigree lineages, using the platform to coordinate grower networks and verify seed origins.",
    "visualType": "lineage",
    "interactiveTitle": "Breeder to Certified Lineage Graph",
    "parameters": []
  },
  {
    "title": "Quality Testing",
    "description": "As the user scrolls, they track seeds through laboratory testing. The system records parameters like germination rates and protective treatments.",
    "visualType": "scanner",
    "interactiveTitle": "Germination Lab Test Scanner",
    "parameters": []
  },
  {
    "title": "The Certified Bag",
    "description": "The final section displays field inspections. It shows how certified seeds improve crop health and boost grower incomes, proving the value of traceable agriculture. 2 Dynamic Interactive Animations",
    "visualType": "lineage",
    "interactiveTitle": "Seed Bag QR Code Validator",
    "parameters": []
  }
],
  stats: [
  {
    "label": "Genotypes Registered",
    "value": "450 Breeder lines"
  },
  {
    "label": "Germination Rate Accuracy",
    "value": "98.5% Lab Check"
  },
  {
    "label": "Pedigree Chain Traced",
    "value": "100% Pedigree Check"
  }
],
  imagePath: "/images/crops/seedling_lab.png",
  diagram: `+------------------+      (Genetic  Pedigree)     +------------------+      (Field  Quality  Check)  
+------------------+
 
|
 
Pure
 
Breeder
 
Seed|
 
------------------------>
 
|
 
Foundation
 
Seed
  
|
 
------------------------>
 
|
 
Certified
 
Seed
   
|
 
|
 
(Silo
 
Bank
 
Vault)|
                           
|
 
(Grower
 
Network)
 
|
                           
|
 
(Cooperative
 
Bag)|
 
+------------------+
                       
+------------------+
                       
+------------------+
 

--- Page 37 ---
                                                                                               |  
+------------------+
     
(QR
 
Traceback
 
Scan)
   
+------------------+
     
(Spectrometer
 
Check)
   
|
 
(Purity
 
Packaging)
 
|
 
Smallholder
 
Farm
 
|
 
<------------------------
 
|
 
Seed
 
Retailer
    
|
 
<--------------------------+
 
|
 
(Healthy
 
Crop
 
Log)
                           
|
 
(Lineage
 
Cert)
   
|
 
+------------------+
                       
+------------------+
 
 
Seed  Purity  and  Bank  Database  System  
 Database  Asset  Capture  Method  Database  Schema  Field  
Agronomic  Output  
Seed  Genus  Lineage  
Scientific  registration  
genus_genetic_lineage_hash  
 20  
Protects  rare  seed  diversity  
 18  
Germination  Rate  %  
Lab-integrated  testing  
germination_percentage_field  
 20  
Guarantees  high-performing  seeds  
 18  
Seed  Treatment  Code  
Processing  plant  interface  
treatment_chemical_dosage_id  
 8  
Protects  against  insect  damage  
 19  
Seed  Bank  Storage  Climate-controlled  vault  
vault_ambient_climate_telemetry  
 4  
Secures  safe,  long-term  storage  18`
};

export default function SeedproductionSolutionsPage() {
  return <CropPageLayout data={pageData} />;
}
