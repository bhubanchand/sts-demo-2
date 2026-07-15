"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);

  // Mouse positions
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const magneticOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Detect mobile/touch devices
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

    if (isTouchDevice) {
      return;
    }

    // 2. Detect prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Show custom cursor
    setIsVisible(true);

    // Apply global stylesheet to hide default cursor, except for native inputs and drag states
    const style = document.createElement("style");
    style.id = "custom-cursor-styles";
    style.innerHTML = `
      body, html, a, button, [role="button"], .cursor-pointer {
        cursor: none !important;
      }
      input, textarea, [contenteditable="true"], select, iframe, [data-native-cursor] {
        cursor: auto !important;
      }
    `;
    document.head.appendChild(style);

    let activeMagneticElement: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Find element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 3. Preserve native cursor states (I-beam, resize, etc.)
      const computedStyle = window.getComputedStyle(target);
      const cursorType = computedStyle.cursor;

      const shouldHideCustom = [
        "text",
        "vertical-text",
        "ns-resize",
        "ew-resize",
        "nesw-resize",
        "nwse-resize",
        "col-resize",
        "row-resize",
        "not-allowed",
        "grab",
        "grabbing",
        "move",
        "zoom-in",
        "zoom-out",
        "wait",
        "progress",
        "help",
      ].includes(cursorType);

      if (shouldHideCustom) {
        if (cursorRef.current) {
          cursorRef.current.style.opacity = "0";
        }
        // Force native cursor to show on body
        document.body.style.cursor = "auto";
      } else {
        if (cursorRef.current) {
          cursorRef.current.style.opacity = "1";
        }
        document.body.style.cursor = "none";
      }

      // 4. Hover states on interactive elements
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        ["select", "option"].includes(target.tagName.toLowerCase());

      setIsHovered(!!isInteractive);

      // 5. Magnetic attraction for primary CTA buttons
      // Match classes typical of primary CTA buttons
      const ctaBtn = target.closest(
        'a[href*="/solutions"], button.bg-emerald-600, .bg-\\[\\#53D769\\], button.bg-emerald-500, a.bg-emerald-600, .btn-primary'
      ) as HTMLElement | null;

      if (ctaBtn) {
        activeMagneticElement = ctaBtn;
        setIsMagnetic(true);

        const rect = ctaBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = centerX - e.clientX;
        const distanceY = centerY - e.clientY;

        // Apply a small magnetic offset (max 3-5px)
        const pullFactor = 0.15; // smooth pull intensity
        const maxPull = 5; // maximum 5px pull

        magneticOffsetRef.current = {
          x: Math.min(Math.max(distanceX * pullFactor, -maxPull), maxPull),
          y: Math.min(Math.max(distanceY * pullFactor, -maxPull), maxPull),
        };
      } else {
        activeMagneticElement = null;
        setIsMagnetic(false);
        magneticOffsetRef.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // 6. 120fps Animation Loop for lag-free positioning
    let animationFrameId: number;

    const updateCursorPosition = () => {
      const targetX = mouseRef.current.x + magneticOffsetRef.current.x;
      const targetY = mouseRef.current.y + magneticOffsetRef.current.y;

      if (prefersReducedMotion) {
        cursorPositionRef.current = { x: targetX, y: targetY };
      } else {
        // Linear interpolation for smooth trailing
        const ease = 0.22; // Quick, responsive follow
        cursorPositionRef.current.x += (targetX - cursorPositionRef.current.x) * ease;
        cursorPositionRef.current.y += (targetY - cursorPositionRef.current.y) * ease;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPositionRef.current.x}px, ${cursorPositionRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursorPosition);
    };

    updateCursorPosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      const styleNode = document.getElementById("custom-cursor-styles");
      if (styleNode) {
        styleNode.remove();
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] opacity-0 select-none will-change-transform"
      style={{
        transition: "opacity 0.2s ease, width 0.15s ease-out, height 0.15s ease-out",
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      {/* Glow Effect on Hover */}
      <div
        className="absolute inset-0 rounded-full blur-[10px] -translate-x-[3px] -translate-y-[3px]"
        style={{
          width: "28px",
          height: "28px",
          backgroundColor: "#2E7D32",
          opacity: isHovered ? 0.35 : 0,
          transform: isHovered ? "scale(1.3)" : "scale(0.8)",
          transition: "transform 150ms ease-out, opacity 150ms ease-out",
        }}
      />

      {/* SVG Premium Native-like Cursor Pointer (macOS layout shape) */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25))",
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 150ms ease-out",
        }}
      >
        {/* Precise Apple/Windows macOS style arrow pointer */}
        <path
          d="M4.5 3V20.12L9.21 15.41H16.29L4.5 3Z"
          fill="white"
          stroke="#2E7D32"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
