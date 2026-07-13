import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const lastSlug = slug && slug.length > 0 ? slug[slug.length - 1] : "overview";
  const title = lastSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const fullPath = slug ? slug.join("/") : "";
  return {
    title: `${title} | SourceTrace Customer Stories`,
    description: `See how leading organizations leverage SourceTrace to drive sustainability and compliance at origin.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/customers/${fullPath}`,
    }
  };
}

export default async function CustomersRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const lastSlug = slug && slug.length > 0 ? slug[slug.length - 1] : "customer overview";
  return <DynamicPage title={lastSlug.replace(/-/g, " ")} category="Customer segment" />;
}
