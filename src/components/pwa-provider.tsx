"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wifi, WifiOff, RefreshCw, X, Play } from "lucide-react";
import { AgriGame } from "./agri-game";

const PwaContext = createContext<{ isOnline: boolean }>({ isOnline: true });

export const usePwa = () => useContext(PwaContext);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"online" | "offline">("online");
  const [playOfflineGame, setPlayOfflineGame] = useState(false);
  const router = useRouter();

  // Register Service Worker & Listen to network status change events
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set initial network state
    setIsOnline(navigator.onLine);

    // 1. Service Worker Registration
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => {
              console.log("Service Worker registered successfully with scope:", reg.scope);
            })
            .catch((err) => {
              console.error("Service Worker registration failed:", err);
            });
        });
      } else {
        // In development, automatically unregister active service workers to prevent cached Turbopack chunk bugs
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister().then((success) => {
              if (success) {
                console.log("Stale Service Worker unregistered successfully in development mode.");
                window.location.reload();
              }
            });
          }
        });
      }
    }

    // 2. Connectivity Listeners
    const handleOnline = () => {
      setIsOnline(true);
      setToastType("online");
      setShowToast(true);
      setPlayOfflineGame(false); // Close full screen game on return of connection

      // Refresh stale Next.js router route data automatically after reconnection
      router.refresh();

      // Automatically hide "Back Online" alert after 3 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setToastType("offline");
      setShowToast(true);

      // Auto-save form inputs state if user is typing (Browser handles most, but we preserve React state)
      console.warn("User has gone offline. Retaining active session form state in-memory.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  return (
    <PwaContext.Provider value={{ isOnline }}>
      {/* If connection is lost and user chooses to play full screen, render the game overlay */}
      {playOfflineGame ? (
        <div className="fixed inset-0 z-50">
          <AgriGame mode="offline" />
          {/* Close button to return to screen (to see form values/layout offline) */}
          <button 
            onClick={() => setPlayOfflineGame(false)}
            className="absolute top-8 right-44 z-50 px-4 py-2 bg-white/90 hover:bg-white text-[#0B3D2E] font-bold text-xs uppercase tracking-wider rounded-full shadow-md border border-[#0B3D2E]/10"
          >
            Close Game
          </button>
        </div>
      ) : (
        children
      )}

      {/* ── CONNECTION METRIC TOAST NOTIFICATIONS ── */}
      {showToast && (
        <div className={`fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-500 flex gap-3.5 items-start ${
          toastType === "online" 
            ? "bg-[#EAF5EE]/95 border-[#53D769]/30 text-[#0B3D2E]"
            : "bg-white/95 border-[#D13C3C]/20 text-[#0B3D2E]"
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            toastType === "online" ? "bg-[#53D769]/15 text-[#1F7A53]" : "bg-[#D13C3C]/10 text-[#D13C3C]"
          }`}>
            {toastType === "online" ? <Wifi className="w-4.5 h-4.5" /> : <WifiOff className="w-4.5 h-4.5" />}
          </div>

          <div className="flex-1 text-left">
            <h4 className="font-extrabold text-xs uppercase tracking-wider">
              {toastType === "online" ? "Back Online" : "You're Offline"}
            </h4>
            <p className="text-[11px] text-[#1F5946] mt-0.5 leading-relaxed font-semibold">
              {toastType === "online" 
                ? "Connection restored. You can continue browsing without refreshing."
                : "Connection lost. While we reconnect, help deliver today's harvest!"}
            </p>

            {/* Offline Play Button */}
            {toastType === "offline" && (
              <button 
                onClick={() => setPlayOfflineGame(true)}
                className="mt-3 bg-[#0B3D2E] hover:bg-[#125c44] text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-colors duration-200"
              >
                <Play className="w-3 h-3 fill-current" /> Play Tractor Run
              </button>
            )}
          </div>

          <button 
            onClick={() => setShowToast(false)}
            className="text-[#1F5946] hover:text-[#0B3D2E] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </PwaContext.Provider>
  );
}
