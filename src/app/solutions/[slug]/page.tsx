import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} Solutions | SourceTrace`,
    description: `Optimize your agricultural operations with SourceTrace's dynamic ${title} solutions. Enabling transparency, compliance, and traceability.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/solutions/${slug}`,
    }
  };
}

export default async function SolutionsRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPage title={slug.replace(/-/g, " ")} category="Solution" />;
}
