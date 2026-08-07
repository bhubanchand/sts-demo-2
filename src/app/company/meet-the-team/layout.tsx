import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership | SourceTrace Executive Team",
  description: "Meet the executive leadership team at SourceTrace driving agricultural digitization, ESG compliance, EUDR traceability, and global supply chain transformation.",
  alternates: {
    canonical: "https://www.sourcetrace.com/company/meet-the-team",
  },
  openGraph: {
    title: "Leadership | SourceTrace Executive Team",
    description: "Meet the executive leadership team at SourceTrace driving agricultural digitization, ESG compliance, EUDR traceability, and global supply chain transformation.",
    url: "https://www.sourcetrace.com/company/meet-the-team",
    type: "profile",
  }
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
