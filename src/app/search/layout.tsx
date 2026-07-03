import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | SourceTrace Site Search",
  description: "Search the SourceTrace website for agricultural solutions, traceability platforms, compliance standards, and resources.",
  alternates: {
    canonical: "https://www.sourcetrace.com/search",
  }
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
