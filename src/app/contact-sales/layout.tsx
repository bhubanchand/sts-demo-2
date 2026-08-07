import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sales | SourceTrace — Enterprise Agricultural Intelligence",
  description:
    "Schedule a demo or speak with our enterprise sales team about supply chain traceability, EUDR compliance, farmer digitization, and sustainability solutions.",
  alternates: { canonical: "https://www.sourcetrace.com/contact-sales" },
};

export default function ContactSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
