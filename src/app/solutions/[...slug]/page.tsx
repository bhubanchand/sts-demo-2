import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  const title = lastSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const fullPath = slug.join("/");
  return {
    title: `${title} Solutions | SourceTrace`,
    description: `Optimize your agricultural operations with SourceTrace's dynamic ${title} solutions. Enabling transparency, compliance, and traceability.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/solutions/${fullPath}`,
    }
  };
}

export default async function SolutionsRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  return <DynamicPage title={lastSlug.replace(/-/g, " ")} category="Solution" />;
}
