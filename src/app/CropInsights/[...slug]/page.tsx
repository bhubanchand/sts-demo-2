import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  const title = lastSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const fullPath = slug.join("/");
  return {
    title: `${title} Sourcing & Traceability | SourceTrace`,
    description: `Track and verify your ${title} value chain. Real-time data from smallholder farms to global ports.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/CropInsights/${fullPath}`,
    }
  };
}

export default async function CropInsightsRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  return <DynamicPage title={lastSlug.replace(/-/g, " ")} category="Crop" />;
}
