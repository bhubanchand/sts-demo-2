"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8CCB9B] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    
    const variants = {
      primary: "bg-[#0B3D2E] text-white hover:bg-[#1F7A53] shadow-md",
      secondary: "bg-[#1F7A53] text-white hover:bg-[#0B3D2E] shadow-sm",
      outline: "border border-[#0B3D2E]/20 text-[#0B3D2E] hover:border-[#1F7A53] hover:bg-[#EBF7F0] hover:text-[#0B3D2E]",
      ghost: "hover:bg-[#EBF7F0] text-[#0B3D2E]",
    };

    const sizes = {
      sm: "h-9 px-3",
      md: "h-11 px-8",
      lg: "h-14 px-10 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
