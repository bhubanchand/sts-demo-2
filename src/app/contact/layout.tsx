import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect With Us | Contact SourceTrace",
  description:
    "Get in touch with SourceTrace. Reach out to our global offices in the US, India, and Bangladesh for support, partnerships, or general inquiries.",
  alternates: {
    canonical: "https://www.sourcetrace.com/contact",
  },
  openGraph: {
    title: "Connect With Us | Contact SourceTrace",
    description:
      "Get in touch with SourceTrace. Reach out to our global offices in the US, India, and Bangladesh for support, partnerships, or general inquiries.",
    url: "https://www.sourcetrace.com/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
