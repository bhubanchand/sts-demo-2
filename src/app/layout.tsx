import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SourceTrace | Enterprise Nature Intelligence",
  description: "Visibility Creates Sustainable Supply Chains. Connecting sourcing, sustainability, and smallholder impact through real-time traceability.",
  metadataBase: new URL("https://www.sourcetrace.com"),
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SourceTrace | Enterprise Nature Intelligence",
    description: "Connecting sourcing, sustainability, and smallholder impact through real-time traceability.",
    url: "https://www.sourcetrace.com",
    siteName: "SourceTrace",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "SourceTrace Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SourceTrace | Enterprise Nature Intelligence",
    description: "Connecting sourcing, sustainability, and smallholder impact through real-time traceability.",
    images: ["/icon.png"],
  },
};

import { MegaMenu } from "@/components/ui/mega-menu";
import { Footer } from "@/components/ui/footer";
import { FloatingContact } from "@/components/ui/floating-contact";
import { PwaProvider } from "@/components/pwa-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SourceTrace",
    "url": "https://www.sourcetrace.com",
    "logo": "https://www.sourcetrace.com/icon.png",
    "sameAs": [
      "https://www.linkedin.com/company/sourcetrace-systems"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SourceTrace",
    "url": "https://www.sourcetrace.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.sourcetrace.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${interTight.variable} antialiased`}
      >
        <Providers>
          <PwaProvider>
            <MegaMenu />
            <FloatingContact />
            {children}
            <Footer />
          </PwaProvider>
        </Providers>
      </body>
    </html>
  );
}
