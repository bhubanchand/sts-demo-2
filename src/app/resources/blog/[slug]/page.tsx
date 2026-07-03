import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} | SourceTrace Insights Blog`,
    description: `Read the latest insights and industry articles on ${title} on the SourceTrace Blog.`,
    alternates: {
      canonical: `https://www.sourcetrace.com/resources/blog/${slug}`,
    }
  };
}

export default async function BlogRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPage title={slug.replace(/-/g, " ")} category="Blog Post" />;
}
