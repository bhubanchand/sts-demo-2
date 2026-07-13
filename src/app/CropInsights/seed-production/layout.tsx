import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seed Production Traceability & Pedigree | SourceTrace",
  description: "Track pedigree seed multiplication chains from breeder to certified seed bags. Verify purity, germination rate, and grower compliance.",
  alternates: {
    canonical: "https://www.sourcetrace.com/CropInsights/seed-production",
  },
  openGraph: {
    title: "Seed Production Traceability & Pedigree | SourceTrace",
    description: "Track pedigree seed multiplication chains from breeder to certified seed bags. Verify purity, germination rate, and grower compliance.",
    url: "https://www.sourcetrace.com/CropInsights/seed-production",
  }
};

export default function SeedProductionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
