import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} | SourceTrace Traceability Platform`,
    description: `Discover how the SourceTrace platform's core ${title} feature delivers end-to-end supply chain transparency.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/platform/${slug}`,
    }
  };
}

export default async function PlatformRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPage title={slug.replace(/-/g, " ")} category="Platform Feature" />;
}
