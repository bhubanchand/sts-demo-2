"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ringWrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Position coordinates
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  const dotCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Accessibility Checks: Disable on touch devices and respect reduced motion
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    // Add active class to body to hide default pointer
    document.documentElement.classList.add("custom-cursor-active");

    // 2. Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 3. Animation loop (lerp)
    let animationFrameId = 0;
    const updateCursor = () => {
      // Smooth interpolation factors
      const ringLerpFactor = 0.15;
      const dotLerpFactor = 0.45;

      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ringLerpFactor;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ringLerpFactor;

      dotCoords.current.x += (mouseCoords.current.x - dotCoords.current.x) * dotLerpFactor;
      dotCoords.current.y += (mouseCoords.current.y - dotCoords.current.y) * dotLerpFactor;

      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCoords.current.x}px, ${dotCoords.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    // 4. Context-Aware Hover State Detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest interactive element
      const hoverable = target.closest<HTMLElement>("a, button, [data-cursor-label]");
      if (!hoverable) {
        setIsHovered(false);
        setHoverLabel(null);
        return;
      }

      setIsHovered(true);

      // Check explicit data-cursor-label first
      const explicitLabel = hoverable.getAttribute("data-cursor-label");
      if (explicitLabel) {
        setHoverLabel(explicitLabel);
        return;
      }

      // Auto-detect label based on path, content, or types
      const href = hoverable.getAttribute("href") || "";
      const text = (hoverable.textContent || "").toLowerCase();
      const className = hoverable.className || "";

      // AI Engine
      if (
        href.includes("/intelligence/ai-engine") ||
        text.includes("ai engine") ||
        text.includes("copilot") ||
        className.includes("ai-")
      ) {
        setHoverLabel("AI");
        return;
      }

      // Commodity Hub
      if (href.includes("/CommodityHub") || text.includes("commodity hub") || text.includes("crop insights")) {
        // Special case: Interactive Maps (if inside map sections of Commodity Hub)
        if (text.includes("map") || className.includes("map")) {
          setHoverLabel("MAP");
          return;
        }
        setHoverLabel("EXPLORE");
        return;
      }

      // Interactive Maps
      if (text.includes("map") || className.includes("map") || href.includes("map") || hoverable.closest(".rsm-geography")) {
        setHoverLabel("MAP");
        return;
      }

      // Request Demo / Book / Contact Sales
      if (
        href.includes("/contact-sales") ||
        text.includes("book demo") ||
        text.includes("request demo") ||
        text.includes("contact sales")
      ) {
        setHoverLabel("BOOK");
        return;
      }

      // Videos / Media
      if (
        hoverable.tagName === "VIDEO" ||
        text.includes("watch") ||
        text.includes("play") ||
        className.includes("play-btn")
      ) {
        setHoverLabel("PLAY");
        return;
      }

      // Case Studies
      if (href.includes("/case-studies") || text.includes("case study") || text.includes("read case")) {
        setHoverLabel("READ");
        return;
      }

      // Contact / Support
      if (href.includes("/contact") || href.includes("/support") || text.includes("talk to")) {
        setHoverLabel("TALK");
        return;
      }

      // Standard generic hover (no text, just clean ring expansion)
      setHoverLabel(null);
    };

    const handleMouseOut = () => {
      setIsHovered(false);
      setHoverLabel(null);
    };

    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    // 5. Magnetic Button Effect (5-8px subtle pull)
    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const btn = target.closest<HTMLElement>("a, button, [data-magnetic]");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.12;

      // Clamp to max 7px
      const clampX = Math.max(-7, Math.min(7, x));
      const clampY = Math.max(-7, Math.min(7, y));

      btn.style.transform = `translate3d(${clampX}px, ${clampY}px, 0)`;
      btn.style.transition = "none";
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const btn = target.closest<HTMLElement>("a, button, [data-magnetic]");
      if (!btn) return;

      btn.style.transform = "";
      btn.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    };

    document.body.addEventListener("mousemove", handleMagneticMove);
    document.body.addEventListener("mouseout", handleMagneticLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      document.body.removeEventListener("mousemove", handleMagneticMove);
      document.body.removeEventListener("mouseout", handleMagneticLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        /* Hide standard cursor only on fine pointer (desktop) when JS cursor is active */
        @media (pointer: fine) {
          .custom-cursor-active,
          .custom-cursor-active * {
            cursor: none !important;
          }
        }

        .custom-cursor-ring-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .custom-cursor-ring {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 1.5px solid rgba(83, 215, 105, 0.35); /* SourceTrace green */
          border-radius: 50%;
          transition: 
            width 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), 
            height 0.25s cubic-bezier(0.215, 0.61, 0.355, 1), 
            background-color 0.25s ease, 
            border-color 0.25s ease, 
            border-radius 0.25s ease,
            box-shadow 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          background-color: transparent;
        }

        .custom-cursor-ring.is-hovered {
          width: 28px;
          height: 28px;
          border-color: rgba(83, 215, 105, 0.6);
          background-color: rgba(83, 215, 105, 0.05);
        }

        .custom-cursor-ring.has-label {
          width: auto;
          height: 34px;
          min-width: 34px;
          padding: 0 14px;
          border-radius: 17px;
          background-color: rgba(11, 61, 46, 0.95); /* Deep SourceTrace green */
          border-color: rgba(83, 215, 105, 0.8);
          box-shadow: 
            0 10px 20px -5px rgba(11, 61, 46, 0.3), 
            0 0 12px rgba(83, 215, 105, 0.2);
          backdrop-filter: blur(4px);
        }

        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background-color: #53D769; /* SourceTrace green dot */
          border-radius: 50%;
          pointer-events: none;
          z-index: 100000;
          transform: translate3d(-50%, -50%, 0);
          will-change: transform;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .custom-cursor-dot.is-hovered {
          opacity: 0;
          transform: translate3d(-50%, -50%, 0) scale(0);
        }

        .custom-cursor-text {
          color: #ffffff;
          font-family: var(--font-inter-tight), sans-serif;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          opacity: 0;
          white-space: nowrap;
          pointer-events: none;
          display: none;
        }

        .custom-cursor-ring.has-label .custom-cursor-text {
          display: block;
          opacity: 1;
          animation: cursorTextFadeIn 0.2s ease forwards;
        }

        @keyframes cursorTextFadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Ring wrapper (positioned via lerp) */}
      <div ref={ringWrapperRef} className="custom-cursor-ring-wrapper">
        <div 
          className={`custom-cursor-ring ${isHovered ? "is-hovered" : ""} ${hoverLabel ? "has-label" : ""}`}
        >
          <span className="custom-cursor-text">{hoverLabel}</span>
        </div>
      </div>

      {/* Center dot (positioned via faster lerp) */}
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isHovered ? "is-hovered" : ""}`}
      />
    </>
  );
}
