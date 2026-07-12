import { notFound } from "next/navigation";

interface DynamicPageProps {
  title: string;
  category: string;
}

export function DynamicPage({ title, category }: DynamicPageProps) {
  // If the page has not been created with static content, automatically trigger the 404 error page
  notFound();
  return null;
}
