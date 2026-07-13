import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fruits & Vegetables Traceability Solutions | SourceTrace",
  description: "Track fresh produce from smallholder farms to global retail shelves. Ensure food safety, cold chain integrity, and quality compliance.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/fruits-vegetables",
  },
  openGraph: {
    title: "Fruits & Vegetables Traceability Solutions | SourceTrace",
    description: "Track fresh produce from smallholder farms to global retail shelves. Ensure food safety, cold chain integrity, and quality compliance.",
    url: "https://www.sourcetrace.com/CropInsights/fruits-vegetables",
  }
};

export default function FruitsVegetablesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
