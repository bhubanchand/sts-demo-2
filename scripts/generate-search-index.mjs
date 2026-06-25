#!/usr/bin/env node

/**
 * generate-search-index.mjs
 * 
 * Postbuild script that crawls the Next.js build output and generates
 * a search index JSON file. Runs automatically after `npm run build`.
 * 
 * Zero-maintenance: any page added/removed/renamed is automatically
 * reflected in the search index on the next build.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, relative, sep } from "path";

/* ── Configuration ────────────────────────────────────────── */

const BUILD_DIR = join(process.cwd(), ".next", "server", "app");
const OUTPUT_FILE = join(process.cwd(), "public", "search-index.json");

// Pages to skip (not real content pages)
const SKIP_PATTERNS = [
  /^\/_not-found/,
  /^\/_global-error/,
  /^\/search$/,
  /^\/api\//,
  /\/robots\.txt$/,
  /\/sitemap\.xml$/,
  /\/icon\.png$/,
  /\/_error/,
  /\/favicon/,
  /\/opengraph-image/,
];

// Category inference from URL path segments
const CATEGORY_MAP = {
  platform: "Platform",
  intelligence: "Intelligence",
  solutions: "Solutions",
  CropInsights: "Crop Insights",
  compliance: "Compliance",
  resources: "Resources",
  about: "Company",
  careers: "Company",
  contact: "Company",
  "case-studies": "Resources",
  customers: "Resources",
  docs: "Resources",
  search: "Utility",
  "request-demo": "Company",
  "contact-sales": "Company",
};

/* ── HTML Parsing Helpers ─────────────────────────────────── */

function stripTags(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ");
}

function extractTag(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = html.match(regex);
  return match ? decodeEntities(stripTags(match[1])).trim() : "";
}

function extractMetaContent(html, name) {
  // Match both name="..." and property="..."
  const regex = new RegExp(
    `<meta\\s+(?:name|property)=["']${name}["']\\s+content=["']([^"']*)["']`,
    "i"
  );
  const match = html.match(regex);
  if (match) return decodeEntities(match[1]).trim();

  // Also try content before name (some generators flip the order)
  const regex2 = new RegExp(
    `<meta\\s+content=["']([^"']*)["']\\s+(?:name|property)=["']${name}["']`,
    "i"
  );
  const match2 = html.match(regex2);
  return match2 ? decodeEntities(match2[1]).trim() : "";
}

function extractHeadings(html) {
  const headings = [];
  const regex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = decodeEntities(stripTags(match[2])).trim();
    if (text && text.length > 1) {
      headings.push(text);
    }
  }
  return headings;
}

function extractBodyText(html) {
  // Try to extract from <main> first, fall back to <body>
  let content = "";
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    content = mainMatch[1];
  } else {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      content = bodyMatch[1];
    }
  }

  // Remove script and style tags
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "");
  content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");

  const text = decodeEntities(stripTags(content));
  
  // Truncate to ~600 chars for reasonable index size
  return text.substring(0, 600).trim();
}

function inferCategory(urlPath) {
  const segments = urlPath.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";
  
  const firstSegment = segments[0];
  return CATEGORY_MAP[firstSegment] || firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1).replace(/-/g, " ");
}

function generateKeywords(title, headings, url) {
  const words = new Set();
  
  // Add title words
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  titleWords.forEach(w => words.add(w));
  
  // Add heading words
  headings.forEach(h => {
    h.toLowerCase().split(/\s+/).filter(w => w.length > 2).forEach(w => words.add(w));
  });
  
  // Add URL segments as keywords
  url.split("/").filter(Boolean).forEach(seg => {
    seg.split("-").filter(w => w.length > 2).forEach(w => words.add(w.toLowerCase()));
  });
  
  return Array.from(words).slice(0, 20);
}

/* ── File Discovery ───────────────────────────────────────── */

function findHtmlFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip special Next.js directories
      if (!entry.startsWith("_") && !entry.startsWith(".") && entry !== "api") {
        findHtmlFiles(fullPath, files);
      }
    } else if (entry === "index.html" || entry.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function htmlPathToUrl(htmlPath) {
  let rel = relative(BUILD_DIR, htmlPath);
  // Convert OS separators to URL separators
  rel = rel.split(sep).join("/");
  if (rel === "index.html") {
    return "/";
  }
  // Remove index.html or .html extension
  rel = rel.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  // Ensure leading slash
  const url = "/" + rel;
  return url === "/" ? "/" : url.replace(/\/$/, "");
}

/* ── Main ─────────────────────────────────────────────────── */

function main() {
  console.log("\n🔍 Generating search index...\n");
  
  if (!existsSync(BUILD_DIR)) {
    console.error("❌ Build directory not found:", BUILD_DIR);
    console.error("   Run 'npm run build' first.");
    process.exit(1);
  }
  
  const htmlFiles = findHtmlFiles(BUILD_DIR);
  console.log(`   Found ${htmlFiles.length} HTML files in build output`);
  
  const index = [];
  let skipped = 0;
  
  for (const filePath of htmlFiles) {
    const url = htmlPathToUrl(filePath);
    
    // Check skip patterns
    if (SKIP_PATTERNS.some(pattern => pattern.test(url))) {
      skipped++;
      continue;
    }
    
    try {
      const html = readFileSync(filePath, "utf-8");
      
      const rawTitle = extractTag(html, "title") || "";
      const cleanTitle = rawTitle.replace(/\s*\|.*$/, "").trim();
      const h1 = extractTag(html, "h1") || "";
      const cleanH1 = h1.replace(/\s+/g, " ").trim();
      
      let finalTitle = cleanTitle;
      if (url === "/") {
        finalTitle = "SourceTrace";
      } else if (cleanH1 && (!cleanTitle || cleanTitle.toLowerCase() === "sourcetrace")) {
        finalTitle = cleanH1;
      }
      if (!finalTitle) {
        finalTitle = url === "/" ? "SourceTrace" : url;
      }

      const metaDescription = extractMetaContent(html, "description");
      const headings = extractHeadings(html);
      const bodyText = extractBodyText(html);
      const category = inferCategory(url);
      const keywords = generateKeywords(finalTitle, headings, url);
      
      // Only add pages with meaningful content
      if (finalTitle && (metaDescription || bodyText || headings.length > 0)) {
        index.push({
          url,
          title: finalTitle,
          metaDescription,
          headings: headings.slice(0, 10), // Limit to 10 headings per page
          bodyText,
          category,
          keywords,
        });
      }
    } catch (err) {
      console.warn(`   ⚠️  Skipped ${url}: ${err.message}`);
    }
  }
  
  // Sort by category for readability
  index.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
  
  writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2), "utf-8");
  
  const sizeKB = (Buffer.byteLength(JSON.stringify(index)) / 1024).toFixed(1);
  
  console.log(`   ✅ Indexed ${index.length} pages (skipped ${skipped})`);
  console.log(`   📦 Output: public/search-index.json (${sizeKB} KB)`);
  console.log(`   📂 Categories: ${[...new Set(index.map(e => e.category))].join(", ")}\n`);
}

main();
