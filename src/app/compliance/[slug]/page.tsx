import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} Compliance Solutions | SourceTrace`,
    description: `Ensure complete compliance with international regulations such as ${title.toUpperCase()} through SourceTrace's agritech platform.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/compliance/${slug}`,
    }
  };
}

export default async function ComplianceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPage title={slug.replace(/-/g, " ")} category="Regulation & Compliance" />;
}
