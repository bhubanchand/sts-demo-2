"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled down past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check footer overlap dynamically
      const footerElement = document.querySelector("footer");
      const isMobile = window.innerWidth < 768;
      const defaultMargin = isMobile ? 16 : 24;

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If the top of the footer enters the viewport
        if (footerRect.top < windowHeight) {
          const overlap = windowHeight - footerRect.top;
          setBottomOffset(overlap + defaultMargin);
        } else {
          setBottomOffset(defaultMargin);
        }
      } else {
        setBottomOffset(defaultMargin);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Run once initially to set the correct margin
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
      style={{ bottom: `${bottomOffset}px` }}
      className={`fixed right-4 md:right-6 z-40 flex items-center justify-center rounded-full bg-white text-emerald-800 border border-gray-150 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-emerald-600/30 hover:bg-emerald-50/10 active:scale-95 hover:scale-105 transition-all duration-300 w-11 h-11 md:w-12 md:h-12 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-700" />
    </button>
  );
}
