"use client";

import React, { useEffect } from "react";
import { AgriGame } from "@/components/agri-game";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the server error details to console
    console.error("Internal Server Error (500) Intercepted:", error);
  }, [error]);

  return <AgriGame mode="500" />;
}
