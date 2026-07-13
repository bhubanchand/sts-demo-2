import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const lastSlug = slug && slug.length > 0 ? slug[slug.length - 1] : "overview";
  const title = lastSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const fullPath = slug ? slug.join("/") : "";
  return {
    title: `${title} Partners | SourceTrace Ecosystem`,
    description: `Partner with SourceTrace to power transparency, traceability, and farmer livelihoods globally.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/partners/${fullPath}`,
    }
  };
}

export default async function PartnersRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const lastSlug = slug && slug.length > 0 ? slug[slug.length - 1] : "partner overview";
  return <DynamicPage title={lastSlug.replace(/-/g, " ")} category="Partner portal" />;
}
