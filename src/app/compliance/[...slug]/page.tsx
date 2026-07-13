import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  const title = lastSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const fullPath = slug.join("/");
  return {
    title: `${title} Compliance | SourceTrace`,
    description: `Learn how the SourceTrace platform helps you comply with ${title} regulations in your global supply chains.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/compliance/${fullPath}`,
    }
  };
}

export default async function ComplianceRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  return <DynamicPage title={lastSlug.replace(/-/g, " ")} category="Compliance Standard" />;
}
