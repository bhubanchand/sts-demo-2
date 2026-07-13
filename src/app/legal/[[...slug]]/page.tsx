import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const lastSlug = slug && slug.length > 0 ? slug[slug.length - 1] : "privacy policy";
  const title = lastSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const fullPath = slug ? slug.join("/") : "";
  return {
    title: `${title} | SourceTrace Legal & Compliance`,
    description: `Review the privacy policies, terms of service, and compliance commitments of SourceTrace.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/legal/${fullPath}`,
    }
  };
}

export default async function LegalRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const lastSlug = slug && slug.length > 0 ? slug[slug.length - 1] : "privacy policy";
  return <DynamicPage title={lastSlug.replace(/-/g, " ")} category="Legal document" />;
}
