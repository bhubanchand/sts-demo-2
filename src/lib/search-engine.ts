"use client";

import Fuse, { type IFuseOptions } from "fuse.js";

/* ── Types ────────────────────────────────────────────────── */

export interface SearchEntry {
  url: string;
  title: string;
  metaDescription: string;
  headings: string[];
  bodyText: string;
  category: string;
  keywords: string[];
}

export interface SearchResult {
  item: SearchEntry;
  score: number;
  matches?: ReadonlyArray<{
    indices: ReadonlyArray<readonly [number, number]>;
    key?: string;
    value?: string;
  }>;
}

/* ── Synonym Map ──────────────────────────────────────────── */

const SYNONYMS: Record<string, string[]> = {
  gis: ["geospatial", "satellite", "mapping", "remote sensing"],
  geospatial: ["gis", "satellite", "mapping"],
  ai: ["artificial intelligence", "machine learning", "ml", "deep learning"],
  "artificial intelligence": ["ai", "machine learning"],
  ml: ["machine learning", "ai", "artificial intelligence"],
  eudr: ["eu deforestation regulation", "deforestation"],
  "eu deforestation regulation": ["eudr"],
  esg: ["environmental social governance", "sustainability reporting"],
  csrd: ["corporate sustainability reporting directive"],
  esrs: ["european sustainability reporting standards"],
  cbam: ["carbon border adjustment mechanism", "carbon tax"],
  "scope 3": ["value chain emissions", "supply chain emissions"],
  traceability: ["supply chain", "tracking", "trace", "provenance"],
  farmer: ["smallholder", "grower", "producer", "agriculture"],
  smallholder: ["farmer", "grower"],
  compliance: ["regulation", "regulatory", "audit", "reporting"],
  carbon: ["emissions", "co2", "greenhouse gas", "ghg", "climate"],
  deforestation: ["forest risk", "land use", "eudr"],
  cocoa: ["chocolate", "cacao"],
  palm: ["palm oil"],
  iot: ["internet of things", "sensors", "telemetry"],
  mrv: ["monitoring reporting verification", "carbon monitoring"],
  "supply chain": ["sourcing", "procurement", "logistics", "traceability"],
  sustainable: ["sustainability", "green", "responsible", "ethical"],
  organic: ["certification", "natural", "non-gmo"],
};

/* ── Trending & Popular ───────────────────────────────────── */

export const TRENDING_SEARCHES = [
  "EUDR Compliance",
  "Supply Chain Traceability",
  "AI Engine",
  "Carbon Monitoring",
  "Coffee Traceability",
  "Farmer Engagement",
];

export const POPULAR_PAGES: { title: string; href: string; category: string }[] = [
  { title: "Traceability Cloud", href: "/platform/traceability", category: "Platform" },
  { title: "EUDR Compliance", href: "/solutions/eudr-compliance", category: "Solutions" },
  { title: "AI Engine", href: "/intelligence/ai-engine", category: "Intelligence" },
  { title: "Coffee Insights", href: "/CropInsights/coffee", category: "Crop Insights" },
  { title: "About SourceTrace", href: "/about", category: "Company" },
  { title: "Contact Sales", href: "/contact-sales", category: "Company" },
];

export const SUGGESTED_CATEGORIES = [
  { label: "Platform & Products", query: "platform" },
  { label: "Compliance & Regulations", query: "compliance" },
  { label: "Crop Insights", query: "crop" },
  { label: "AI & Intelligence", query: "intelligence" },
];

/* ── Recent Searches (localStorage) ───────────────────────── */

const RECENT_KEY = "st_recent_searches";
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  if (typeof window === "undefined" || !query.trim()) return;
  try {
    const recent = getRecentSearches().filter(
      (q) => q.toLowerCase() !== query.trim().toLowerCase()
    );
    recent.unshift(query.trim());
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // Ignore localStorage errors
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    // Ignore
  }
}

/* ── Search Engine ────────────────────────────────────────── */

let cachedIndex: SearchEntry[] | null = null;
let cachedFuse: Fuse<SearchEntry> | null = null;

const FUSE_OPTIONS: IFuseOptions<SearchEntry> = {
  keys: [
    { name: "title", weight: 1.0 },
    { name: "headings", weight: 0.7 },
    { name: "keywords", weight: 0.6 },
    { name: "metaDescription", weight: 0.5 },
    { name: "category", weight: 0.4 },
    { name: "bodyText", weight: 0.3 },
  ],
  threshold: 0.35,
  distance: 200,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  useExtendedSearch: false,
};

async function loadIndex(): Promise<SearchEntry[]> {
  if (cachedIndex) return cachedIndex;

  try {
    const res = await fetch("/search-index.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    cachedIndex = await res.json();
    return cachedIndex!;
  } catch (err) {
    console.warn("Search index not found. Run `npm run build` to generate it.", err);
    return [];
  }
}

async function getFuse(): Promise<Fuse<SearchEntry>> {
  if (cachedFuse) return cachedFuse;
  const index = await loadIndex();
  cachedFuse = new Fuse(index, FUSE_OPTIONS);
  return cachedFuse;
}

function expandWithSynonyms(query: string): string {
  const lowerQuery = query.toLowerCase().trim();
  const expansions = new Set<string>();
  expansions.add(query);

  // Check each synonym key
  for (const [key, synonyms] of Object.entries(SYNONYMS)) {
    if (lowerQuery.includes(key)) {
      // Add the first synonym as expansion for broader results
      synonyms.slice(0, 2).forEach((s) => expansions.add(s));
    }
  }

  return Array.from(expansions).join(" ");
}

export async function searchPages(
  query: string,
  limit?: number
): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const fuse = await getFuse();
  const expandedQuery = expandWithSynonyms(query);

  // Search with both original and expanded queries
  const results = fuse.search(expandedQuery);

  // Deduplicate by URL (synonym expansion may cause duplicates)
  const seen = new Set<string>();
  const unique: SearchResult[] = [];
  for (const r of results) {
    if (!seen.has(r.item.url)) {
      seen.add(r.item.url);
      unique.push({
        item: r.item,
        score: r.score ?? 1,
        matches: r.matches,
      });
    }
  }

  return limit ? unique.slice(0, limit) : unique;
}

export async function getAllPages(): Promise<SearchEntry[]> {
  return loadIndex();
}
