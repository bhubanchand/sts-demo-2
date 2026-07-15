"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled down past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={`fixed z-40 flex items-center justify-center rounded-full bg-white text-emerald-800 border border-gray-150 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-emerald-600/30 hover:bg-emerald-50/10 active:scale-95 hover:scale-105 transition-all duration-300 w-11 h-11 md:w-12 md:h-12 cursor-pointer ${
        isVisible
          ? "bottom-4 right-4 md:bottom-6 md:right-6 opacity-100 translate-y-0 pointer-events-auto"
          : "bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-700" />
    </button>
  );
}
