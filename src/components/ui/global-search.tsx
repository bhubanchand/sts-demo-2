"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Compass,
  Trash2,
  CornerDownLeft,
} from "lucide-react";
import {
  searchPages,
  TRENDING_SEARCHES,
  POPULAR_PAGES,
  SUGGESTED_CATEGORIES,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  type SearchResult,
} from "@/lib/search-engine";

/* ── Category color mapping ───────────────────────────────── */

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Platform: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Intelligence: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
  Solutions: { bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-500" },
  "Crop Insights": { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  Compliance: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  Resources: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  Company: { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
  Home: { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500" },
};

function getCategoryStyle(category: string) {
  return (
    CATEGORY_COLORS[category] || {
      bg: "bg-gray-50",
      text: "text-gray-600",
      dot: "bg-gray-400",
    }
  );
}

/* ── Highlight matching text ──────────────────────────────── */

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;

  const terms = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (terms.length === 0) return <>{text}</>;

  const regex = new RegExp(`(${terms.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = terms.some((t) => part.toLowerCase() === t.toLowerCase());
        return isMatch ? (
          <mark key={i} className="bg-[#53D769]/20 text-[#0B3D2E] rounded-sm px-0.5 font-semibold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ── Component Props ──────────────────────────────────────── */

interface GlobalSearchProps {
  isSearchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
  variant: "desktop" | "mobile";
}

/* ── Main Component ───────────────────────────────────────── */

export function GlobalSearch({
  isSearchOpen,
  onSearchOpen,
  onSearchClose,
  variant,
}: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    typeof window !== "undefined" ? getRecentSearches() : []
  );
  const [isMounted, setIsMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      // Refresh recent searches on open
      const r = getRecentSearches();
      queueMicrotask(() => setRecentSearches(r));
    } else {
      queueMicrotask(() => {
        setQuery("");
        setResults([]);
        setFocusedIndex(-1);
      });
    }
  }, [isSearchOpen]);

  // Debounced search
  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const res = await searchPages(q, 5);
    setResults(res);
    setFocusedIndex(-1);
    setIsLoading(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => performSearch(value), 120);
    },
    [performSearch]
  );

  // Navigate to a result
  const navigateTo = useCallback(
    (href: string, searchQuery?: string) => {
      if (searchQuery) addRecentSearch(searchQuery);
      onSearchClose();
      router.push(href);
    },
    [onSearchClose, router]
  );

  // "View All Results" navigation
  const viewAllResults = useCallback(() => {
    if (query.trim()) {
      addRecentSearch(query.trim());
      onSearchClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, onSearchClose, router]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const totalItems = results.length + (query.trim() ? 1 : 0); // +1 for "View All" button

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < results.length) {
          navigateTo(results[focusedIndex].item.url, query);
        } else if (focusedIndex === results.length || focusedIndex === -1) {
          viewAllResults();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onSearchClose();
      }
    },
    [results, focusedIndex, query, navigateTo, viewAllResults, onSearchClose]
  );

  // Clear recent
  const handleClearRecent = useCallback(() => {
    clearRecentSearches();
    setRecentSearches([]);
  }, []);

  // Quick search from trending/recent
  const handleQuickSearch = useCallback(
    (term: string) => {
      setQuery(term);
      performSearch(term);
    },
    [performSearch]
  );

  const showSuggestions = isSearchOpen && !query.trim();
  const showResults = isSearchOpen && query.trim().length > 0;

  /* ── Desktop Render ─────────────────────────────────────── */
  if (variant === "desktop") {
    return (
      <>
        {/* Search Toggle Button */}
        {!isSearchOpen && (
          <button
            onClick={onSearchOpen}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-[#0B3D2E] hover:bg-gray-100 transition-all cursor-pointer"
            aria-label="Open search"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
        )}

        {/* Expanded Search Input (inline in nav) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="relative overflow-hidden"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  viewAllResults();
                }}
                className="flex items-center h-10 bg-gray-50 border border-gray-200 rounded-full px-3 gap-2 focus-within:border-[#53D769] focus-within:ring-2 focus-within:ring-[#53D769]/20 transition-all"
              >
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search SourceTrace..."
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none min-w-0"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={onSearchClose}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0 cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed left-0 right-0 bg-white border-b border-gray-100 shadow-2xl overflow-hidden"
              style={{ top: 80, zIndex: 49 }}
              ref={dropdownRef}
            >
              <div className="max-w-[1400px] mx-auto px-8 py-8">
                {/* Suggestions (before typing) */}
                {showSuggestions && (
                  <DesktopSuggestions
                    recentSearches={recentSearches}
                    onQuickSearch={handleQuickSearch}
                    onClearRecent={handleClearRecent}
                    onNavigate={navigateTo}
                  />
                )}

                {/* Search Results (while typing) */}
                {showResults && (
                  <DesktopResults
                    results={results}
                    query={query}
                    isLoading={isLoading}
                    focusedIndex={focusedIndex}
                    onNavigate={navigateTo}
                    onViewAll={viewAllResults}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              style={{ top: 80, zIndex: 48 }}
              onClick={onSearchClose}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  /* ── Mobile Render ──────────────────────────────────────── */
  const mobileOverlay = (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 bg-white lg:hidden flex flex-col"
          style={{ zIndex: 10000, backgroundColor: "white" }}
        >
          {/* Sticky Search Header */}
          <div className="flex-shrink-0 px-4 pt-3 pb-3 border-b border-gray-100 bg-white safe-area-top">
            <div className="flex items-center gap-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) {
                    viewAllResults();
                  } else {
                    inputRef.current?.blur();
                  }
                }}
                className="flex-1 min-w-0 flex items-center h-12 bg-gray-50 border border-gray-200 rounded-2xl px-4 gap-3 focus-within:border-[#53D769] focus-within:ring-2 focus-within:ring-[#53D769]/20 transition-all"
              >
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search SourceTrace..."
                  className="flex-1 w-0 bg-transparent text-base text-gray-900 placeholder-gray-400 outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      inputRef.current?.focus();
                    }}
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-200 text-gray-500 flex-shrink-0 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
              <button
                onClick={onSearchClose}
                className="text-sm font-semibold text-gray-500 hover:text-[#0B3D2E] transition-colors cursor-pointer px-1 flex-shrink-0"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 bg-white" style={{ backgroundColor: "white" }}>
            {showSuggestions && (
              <MobileSuggestions
                recentSearches={recentSearches}
                onQuickSearch={handleQuickSearch}
                onClearRecent={handleClearRecent}
                onNavigate={navigateTo}
              />
            )}

            {showResults && (
              <MobileResults
                results={results}
                query={query}
                isLoading={isLoading}
                focusedIndex={focusedIndex}
                onNavigate={navigateTo}
                onViewAll={viewAllResults}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Mobile Search Button */}
      {!isSearchOpen && (
        <button
          onClick={onSearchOpen}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>
      )}

      {isMounted && typeof window !== "undefined"
        ? createPortal(mobileOverlay, document.body)
        : null}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   DESKTOP SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════ */

function DesktopSuggestions({
  recentSearches,
  onQuickSearch,
  onClearRecent,
  onNavigate,
}: {
  recentSearches: string[];
  onQuickSearch: (q: string) => void;
  onClearRecent: () => void;
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-12">
      {/* Column 1: Trending + Recent */}
      <div className="space-y-6">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> Recent
              </h4>
              <button
                onClick={onClearRecent}
                className="text-[10px] text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => onQuickSearch(term)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-full hover:bg-gray-100 hover:text-[#0B3D2E] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" /> Trending
          </h4>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => onQuickSearch(term)}
                className="px-3 py-1.5 text-xs font-medium text-[#0B3D2E] bg-[#53D769]/10 rounded-full hover:bg-[#53D769]/20 transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2: Popular Pages */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Popular Pages
        </h4>
        <div className="space-y-1">
          {POPULAR_PAGES.map((page) => {
            const style = getCategoryStyle(page.category);
            return (
              <button
                key={page.href}
                onClick={() => onNavigate(page.href)}
                className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors text-left group cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${style.dot} flex-shrink-0`} />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#0B3D2E] transition-colors flex-1">
                  {page.title}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                  {page.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Column 3: Are you looking for... */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Compass className="w-3.5 h-3.5" /> Are you looking for...
        </h4>
        <div className="space-y-2">
          {SUGGESTED_CATEGORIES.map((cat) => (
            <button
              key={cat.query}
              onClick={() => onQuickSearch(cat.query)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 hover:bg-[#53D769]/10 text-left group transition-colors cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#0B3D2E] transition-colors">
                {cat.label}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1F7A53] group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopResults({
  results,
  query,
  isLoading,
  focusedIndex,
  onNavigate,
  onViewAll,
}: {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
  focusedIndex: number;
  onNavigate: (href: string, q?: string) => void;
  onViewAll: () => void;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 py-8 justify-center">
        <div className="w-5 h-5 border-2 border-[#53D769] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Searching...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p className="text-sm text-gray-500 mb-1">
          No results found for &quot;{query}&quot;
        </p>
        <p className="text-xs text-gray-400">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Top Results
        </h4>
        <span className="text-[10px] text-gray-400 flex items-center gap-1">
          <CornerDownLeft className="w-3 h-3" /> to select &nbsp;
          <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-gray-100 rounded border border-gray-200">↑↓</kbd> to navigate &nbsp;
          <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-gray-100 rounded border border-gray-200">esc</kbd> to close
        </span>
      </div>

      <div className="space-y-1">
        {results.map((result, index) => {
          const style = getCategoryStyle(result.item.category);
          const isFocused = focusedIndex === index;
          return (
            <button
              key={result.item.url}
              onClick={() => onNavigate(result.item.url, query)}
              className={`w-full flex items-start gap-4 py-3 px-4 rounded-xl text-left group transition-all cursor-pointer ${
                isFocused ? "bg-[#53D769]/10 ring-1 ring-[#53D769]/30" : "hover:bg-gray-50"
              }`}
            >
              <div className={`mt-0.5 w-2 h-2 rounded-full ${style.dot} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                    {result.item.category}
                  </span>
                  <span className="text-[10px] text-gray-300 font-mono truncate">
                    {result.item.url}
                  </span>
                </div>
                <h5 className={`text-sm font-semibold mb-0.5 transition-colors ${isFocused ? "text-[#0B3D2E]" : "text-gray-900 group-hover:text-[#0B3D2E]"}`}>
                  <HighlightMatch text={result.item.title} query={query} />
                </h5>
                {result.item.metaDescription && (
                  <p className="text-xs text-gray-500 line-clamp-1">
                    <HighlightMatch
                      text={result.item.metaDescription}
                      query={query}
                    />
                  </p>
                )}
              </div>
              <ArrowRight className={`w-4 h-4 mt-1 flex-shrink-0 transition-all ${isFocused ? "text-[#1F7A53] translate-x-0.5" : "text-gray-200 group-hover:text-[#1F7A53] group-hover:translate-x-0.5"}`} />
            </button>
          );
        })}
      </div>

      {/* View All Results */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={onViewAll}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
            focusedIndex === results.length
              ? "bg-[#0B3D2E] text-white"
              : "bg-gray-50 text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white"
          }`}
        >
          View All Results for &quot;{query}&quot;
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MOBILE SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════ */

function MobileSuggestions({
  recentSearches,
  onQuickSearch,
  onClearRecent,
  onNavigate,
}: {
  recentSearches: string[];
  onQuickSearch: (q: string) => void;
  onClearRecent: () => void;
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Recent */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Recent Searches
            </h4>
            <button
              onClick={onClearRecent}
              className="text-[10px] text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => onQuickSearch(term)}
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trending */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5" /> Trending Searches
        </h4>
        <div className="flex flex-wrap gap-2">
          {TRENDING_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => onQuickSearch(term)}
              className="px-3 py-2 text-sm font-medium text-[#0B3D2E] bg-[#53D769]/10 rounded-xl hover:bg-[#53D769]/20 transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Pages */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Popular Pages
        </h4>
        <div className="space-y-1">
          {POPULAR_PAGES.map((page) => {
            const style = getCategoryStyle(page.category);
            return (
              <button
                key={page.href}
                onClick={() => onNavigate(page.href)}
                className="w-full flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-gray-50 transition-colors text-left cursor-pointer"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${style.dot} flex-shrink-0`} />
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {page.title}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                  {page.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Are you looking for */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Compass className="w-3.5 h-3.5" /> Are you looking for...
        </h4>
        <div className="space-y-2">
          {SUGGESTED_CATEGORIES.map((cat) => (
            <button
              key={cat.query}
              onClick={() => onQuickSearch(cat.query)}
              className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl bg-gray-50 hover:bg-[#53D769]/10 text-left transition-colors cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-700">{cat.label}</span>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileResults({
  results,
  query,
  isLoading,
  focusedIndex,
  onNavigate,
  onViewAll,
}: {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
  focusedIndex: number;
  onNavigate: (href: string, q?: string) => void;
  onViewAll: () => void;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 py-12 justify-center">
        <div className="w-6 h-6 border-2 border-[#53D769] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Searching...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-gray-200 mx-auto mb-3" />
        <p className="text-base text-gray-500 mb-1">
          No results for &quot;{query}&quot;
        </p>
        <p className="text-sm text-gray-400">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        Top Results
      </h4>

      <div className="space-y-1">
        {results.map((result, index) => {
          const style = getCategoryStyle(result.item.category);
          const isFocused = focusedIndex === index;
          return (
            <button
              key={result.item.url}
              onClick={() => onNavigate(result.item.url, query)}
              className={`w-full flex items-start gap-3 py-3 px-3 rounded-xl text-left transition-colors cursor-pointer ${
                isFocused ? "bg-[#53D769]/10" : "hover:bg-gray-50"
              }`}
            >
              <div className={`mt-1.5 w-2.5 h-2.5 rounded-full ${style.dot} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                  {result.item.category}
                </span>
                <h5 className="text-sm font-semibold text-gray-900 mt-1">
                  <HighlightMatch text={result.item.title} query={query} />
                </h5>
                {result.item.metaDescription && (
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                    <HighlightMatch text={result.item.metaDescription} query={query} />
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* View All */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={onViewAll}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[#0B3D2E] text-white hover:bg-[#1F7A53] transition-colors cursor-pointer"
        >
          View All Results
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
