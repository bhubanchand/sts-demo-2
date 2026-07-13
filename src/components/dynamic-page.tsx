"use client";

import { AgriGame } from "@/components/agri-game";

interface DynamicPageProps {
  title: string;
  category: string;
}

export function DynamicPage({ title, category }: DynamicPageProps) {
  // If the page content has not been built/created with static content yet, 
  // render the beautiful, brand-aligned "not-available" recovery page.
  return <AgriGame mode="not-available" />;
}
