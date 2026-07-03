import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team | SourceTrace Leadership",
  description: "Meet the leadership team at SourceTrace driving agricultural digitization, ESG compliance, and supply chain transparency.",
  alternates: {
    canonical: "https://www.sourcetrace.com/company/meet-the-team",
  },
  openGraph: {
    title: "Meet the Team | SourceTrace Leadership",
    description: "Meet the leadership team at SourceTrace driving agricultural digitization, ESG compliance, and supply chain transparency.",
    url: "https://www.sourcetrace.com/company/meet-the-team",
    type: "profile",
  }
};

export default function MeetTheTeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
