"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on homepage
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((item) => item !== "");

  // Format segment strings to readable text (e.g. "eudr-compliance" -> "EUDR Compliance")
  const formatSegment = (segment: string) => {
    // Check specific known segments for correct casing
    const lowercase = segment.toLowerCase();
    if (lowercase === "eudr") return "EUDR";
    if (lowercase === "csrd") return "CSRD";
    if (lowercase === "esrs") return "ESRS";
    if (lowercase === "cbam") return "CBAM";
    if (lowercase === "cropinsights") return "Crop Insights";
    if (lowercase === "esg-reporting") return "ESG Reporting";
    if (lowercase === "supply-chain-traceability") return "Supply Chain Traceability";
    if (lowercase === "smallholder-management") return "Smallholder Management";
    if (lowercase === "impact-measurement") return "Impact Measurement";
    if (lowercase === "farmer-livelihoods") return "Farmer Livelihoods";
    if (lowercase === "responsible-sourcing") return "Responsible Sourcing";
    if (lowercase === "sustainable-sourcing") return "Sustainable Sourcing";
    if (lowercase === "ai-engine") return "AI Engine";
    if (lowercase === "carbon-monitoring") return "Carbon Monitoring";
    if (lowercase === "climate-risk") return "Climate Risk";
    if (lowercase === "deforestation-monitoring") return "Deforestation Monitoring";
    if (lowercase === "geospatial-intelligence") return "Geospatial Intelligence";
    if (lowercase === "predictive-insights") return "Predictive Insights";
    if (lowercase === "regenerative-agriculture") return "Regenerative Agriculture";
    if (lowercase === "traceability-graph") return "Traceability Graph";
    
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      name: formatSegment(segment),
      item: url,
    };
  });

  const schemaItems = [
    { name: "Home", item: "/" },
    ...breadcrumbItems,
  ];

  const jsonLd = generateBreadcrumbSchema(schemaItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-[#EAF5EE]/40 border-b border-[#0B3D2E]/5 text-xs font-semibold text-[#1F5946]/80 flex items-center gap-1.5 flex-wrap">
        <Link 
          href="/" 
          className="flex items-center gap-1 hover:text-[#0B3D2E] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <React.Fragment key={item.item}>
              <ChevronRight className="w-3 h-3 text-[#1F5946]/40" />
              {isLast ? (
                <span className="text-[#0B3D2E] font-bold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.item}
                  className="hover:text-[#0B3D2E] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
