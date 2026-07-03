import { DynamicPage } from "@/components/dynamic-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect With Us | Contact SourceTrace",
  description: "Get in touch with SourceTrace systems. Reach out to our global offices for support, partnership opportunities, or general queries.",
  alternates: {
    canonical: "https://www.sourcetrace.com/contact",
  }
};

export default function ContactPage() {
  return <DynamicPage title="Connect With Us" category="Company" />;
}
