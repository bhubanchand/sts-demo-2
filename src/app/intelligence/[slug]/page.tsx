import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} | Agricultural Intelligence | SourceTrace`,
    description: `Unlock environmental insights using SourceTrace's dynamic ${title} solutions. Protect forests, monitor carbon, and track climate risk.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/intelligence/${slug}`,
    }
  };
}

export default async function IntelligenceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPage title={slug.replace(/-/g, " ")} category="AI & Intelligence" />;
}
