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
};

import { MegaMenu } from "@/components/ui/mega-menu";

import { Footer } from "@/components/ui/footer";
import { FloatingContact } from "@/components/ui/floating-contact";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} antialiased`}
      >
        <Providers>
          <MegaMenu />
          <FloatingContact />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
