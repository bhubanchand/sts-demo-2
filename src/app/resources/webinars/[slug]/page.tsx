import { DynamicPage } from "@/components/dynamic-page";

export default async function WebinarsRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPage title={slug.replace(/-/g, " ")} category="Webinar" />;
}
