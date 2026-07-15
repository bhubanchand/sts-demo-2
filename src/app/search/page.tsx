"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, ArrowLeft, Filter } from "lucide-react";
import {
  searchPages,
  addRecentSearch,
  type SearchResult,
} from "@/lib/search-engine";

/* ── Category Colors ──────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  Platform: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
  Intelligence: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500", border: "border-indigo-200" },
  Solutions: { bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-500", border: "border-cyan-200" },
  "Commodity Hub": { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", border: "border-green-200" },
  Compliance: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-200" },
  Resources: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", border: "border-amber-200" },
  Company: { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500", border: "border-violet-200" },
  Home: { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-500", border: "border-gray-200" },
};

function getCategoryStyle(category: string) {
  return (
    CATEGORY_COLORS[category] || {
      bg: "bg-gray-50",
      text: "text-gray-600",
      dot: "bg-gray-400",
      border: "border-gray-200",
    }
  );
}

/* ── Highlight Helper ─────────────────────────────────────── */

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;
  const terms = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (terms.length === 0) return <>{text}</>;
  const regex = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = terms.some((t) => part.toLowerCase() === t.toLowerCase());
        return isMatch ? (
          <mark
            key={i}
            className="bg-[#53D769]/20 text-[#0B3D2E] rounded-sm px-0.5 font-semibold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

/* ── Search Results Content ───────────────────────────────── */

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    addRecentSearch(q.trim());
    const res = await searchPages(q);
    setResults(res);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (initialQuery) {
      queueMicrotask(() => performSearch(initialQuery));
    }
  }, [initialQuery, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    // Update URL without full navigation
    window.history.replaceState(
      null,
      "",
      `/search?q=${encodeURIComponent(query.trim())}`
    );
  };

  // Group results by category
  const grouped = results.reduce<Record<string, SearchResult[]>>(
    (acc, result) => {
      const cat = result.item.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(result);
      return acc;
    },
    {}
  );

  const categories = Object.keys(grouped).sort();
  const filteredResults = activeCategory
    ? grouped[activeCategory] || []
    : results;
  const totalResults = results.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white pt-28 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0B3D2E] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center h-14 sm:h-16 bg-white border-2 border-gray-200 rounded-2xl px-5 gap-4 focus-within:border-[#53D769] focus-within:ring-4 focus-within:ring-[#53D769]/10 transition-all shadow-sm">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, solutions, compliance..."
                className="flex-1 bg-transparent text-base sm:text-lg text-gray-900 placeholder-gray-400 outline-none min-w-0"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#0B3D2E] text-white text-sm font-semibold rounded-xl hover:bg-[#1F7A53] transition-colors flex-shrink-0 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Meta */}
        {!isLoading && query.trim() && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-sm text-gray-500">
              {totalResults > 0 ? (
                <>
                  Found <strong className="text-gray-900">{totalResults}</strong>{" "}
                  result{totalResults !== 1 ? "s" : ""} for{" "}
                  <strong className="text-[#0B3D2E]">
                    &quot;{query.trim()}&quot;
                  </strong>
                </>
              ) : (
                <>
                  No results for{" "}
                  <strong className="text-gray-900">
                    &quot;{query.trim()}&quot;
                  </strong>
                </>
              )}
            </p>

            {/* Category filter pills */}
            {categories.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                    !activeCategory
                      ? "bg-[#0B3D2E] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All ({totalResults})
                </button>
                {categories.map((cat) => {
                  const style = getCategoryStyle(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() =>
                        setActiveCategory(activeCategory === cat ? null : cat)
                      }
                      className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                        activeCategory === cat
                          ? `${style.bg} ${style.text} ring-1 ${style.border}`
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat} ({grouped[cat].length})
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center gap-3 py-16 justify-center">
            <div className="w-6 h-6 border-2 border-[#53D769] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-400">Searching...</span>
          </div>
        )}

        {/* Results List */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="space-y-3">
            {filteredResults.map((result, index) => {
              const style = getCategoryStyle(result.item.category);
              return (
                <motion.div
                  key={result.item.url}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: Math.min(index * 0.03, 0.3),
                  }}
                >
                  <Link
                    href={result.item.url}
                    className="group block bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:border-[#53D769]/30 hover:shadow-lg hover:shadow-[#53D769]/5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 w-2.5 h-2.5 rounded-full ${style.dot} flex-shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text} uppercase tracking-wider`}
                          >
                            {result.item.category}
                          </span>
                          <span className="text-[10px] text-gray-300 font-mono">
                            {result.item.url}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#0B3D2E] transition-colors mb-1">
                          <HighlightMatch
                            text={result.item.title}
                            query={query}
                          />
                        </h3>
                        {result.item.metaDescription && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            <HighlightMatch
                              text={result.item.metaDescription}
                              query={query}
                            />
                          </p>
                        )}
                        {result.item.headings.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {result.item.headings.slice(0, 3).map((h, i) => (
                              <span
                                key={i}
                                className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full"
                              >
                                {h.length > 40
                                  ? h.substring(0, 40) + "..."
                                  : h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-[#1F7A53] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && query.trim() && results.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No results found
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              We couldn&apos;t find any pages matching your search. Try
              different keywords, check your spelling, or browse our popular
              pages below.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Traceability", "EUDR", "AI Engine", "Coffee", "Compliance"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      performSearch(term);
                      window.history.replaceState(
                        null,
                        "",
                        `/search?q=${encodeURIComponent(term)}`
                      );
                    }}
                    className="px-4 py-2 text-sm font-medium text-[#0B3D2E] bg-[#53D769]/10 rounded-full hover:bg-[#53D769]/20 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Initial State (no query) */}
        {!isLoading && !query.trim() && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#53D769]/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#1F7A53]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Search SourceTrace
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Find platform features, solutions, compliance guides, crop
              insights, and more.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

/* ── Page Export (with Suspense for useSearchParams) ───────── */

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-28 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#53D769] border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
