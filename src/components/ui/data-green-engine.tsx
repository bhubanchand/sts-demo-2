"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Wallet, Store, Smartphone, BrainCircuit, Leaf,
  Map, Satellite, Check, ShieldCheck, X, ArrowRight,
  MapPin, Globe, Package, TrendingUp, Cloud, Wind,
  Hexagon, CreditCard, ChevronDown
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   DATA STRUCTURES (Emotion-first, minimal text, huge metrics)
   ══════════════════════════════════════════════════════════════ */
interface Counter { target: number; pre: string; suf: string; dec: number }
interface Slice {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  largeMetric: string;
  metricLabel: string;
  capabilities: [string, string];
  workflowSteps: string[];
  orbShadow: string;
  counter: Counter;
  shortDescription: string;
  metric: string;
  receives: string[];
  processes: string[];
  produces: string[];
}

const fmtC = (val: number, cn: Counter) => {
  if (cn.dec > 0) {
    const n = val / Math.pow(10, cn.dec);
    return `${cn.pre}${n.toFixed(cn.dec)}${cn.suf}`;
  }
  return `${cn.pre}${Math.round(val).toLocaleString("en-US")}${cn.suf}`;
};

const SLICES: Slice[] = [
  {
    id: "farmer", name: "Farmer Portal", icon: Smartphone,
    largeMetric: "42,400", metricLabel: "Farmers Profiled",
    capabilities: ["Farm Registry & Profiles", "Offline Mobile Extension"],
    workflowSteps: ["GPS Farm Mapped", "Co-op Verified", "Satellite Linked", "Data Green OS"],
    orbShadow: "shadow-[0_0_28px_rgba(16,185,129,0.25)]",
    counter: { target: 42400, pre: "", suf: "", dec: 0 },
    shortDescription: "Empowers smallholders with offline registration, agronomic advice, and weather alerts.",
    metric: "42,400 Farmers",
    receives: ["Extension Advisories", "Input Packages", "Training Schedules"],
    processes: ["Farmer Registration", "Field Training", "Input Distribution"],
    produces: ["Verified Farmer ID", "Agronomic Records", "Ledger Entries"],
  },
  {
    id: "traceability", name: "Traceability", icon: Search,
    largeMetric: "98.4%", metricLabel: "Lot Custody Verified",
    capabilities: ["First-Mile Reception Gate", "Blockchain Ledger Integrity"],
    workflowSteps: ["QR Scanned", "Weight Verified", "Lot Sealed", "Data Green OS"],
    orbShadow: "shadow-[0_0_28px_rgba(20,184,166,0.25)]",
    counter: { target: 984, pre: "", suf: "%", dec: 1 },
    shortDescription: "Monitors first-mile crop reception, batch weight telemetry, and custody tracking.",
    metric: "98.4% Verified",
    receives: ["Farmer ID & Records", "Transport Details", "Warehouse Data"],
    processes: ["Intake Scale Logs", "Bag Verification", "Ledger Signatures"],
    produces: ["Batch Receipts (QR)", "Lot Numbers", "Custody Signatures"],
  },
  {
    id: "gis", name: "Geo Spatial", icon: Map,
    largeMetric: "142,204", metricLabel: "Hectares Mapped",
    capabilities: ["GPS Polygon Boundaries", "EUDR Deforestation Alerts"],
    workflowSteps: ["Satellite Feed", "NDVI Scored", "Risk Mapped", "Data Green OS"],
    orbShadow: "shadow-[0_0_28px_rgba(6,182,212,0.25)]",
    counter: { target: 142204, pre: "", suf: "", dec: 0 },
    shortDescription: "Analyzes polygon boundaries and forest buffers via satellite telemetry.",
    metric: "142,204 ha Mapped",
    receives: ["Verified Farmer ID", "Agronomic Records", "Satellite Feeds"],
    processes: ["Polygon Mappings", "Forest Buffer Checks", "NDVI Health Scans"],
    produces: ["Deforestation Reports", "Hectares Registry", "NDVI Scores"],
  },
  {
    id: "ai", name: "AI Predictions", icon: BrainCircuit,
    largeMetric: "92%", metricLabel: "Forecast Accuracy",
    capabilities: ["Yield Forecasting Models", "Crop Disease Warnings"],
    workflowSteps: ["Crop Scanned", "Yield Modeled", "Advisory Sent", "Data Green OS"],
    orbShadow: "shadow-[0_0_28px_rgba(99,102,241,0.25)]",
    counter: { target: 92, pre: "", suf: "%", dec: 0 },
    shortDescription: "Aggregates climatic feeds and satellite imagery for yield projections.",
    metric: "92% Accuracy",
    receives: ["NDVI Scores", "Intake Logs", "Weather Feeds"],
    processes: ["Yield Modeling", "Disease Prediction", "Advisory Generation"],
    produces: ["Yield Curves", "Pest Warnings", "Farm Advisories"],
  },
  {
    id: "marketplace", name: "Marketplace", icon: Store,
    largeMetric: "84,240", metricLabel: "Metric Tons Traded",
    capabilities: ["B2B Sourcing Docks", "Global Export Compliance"],
    workflowSteps: ["Quality Checked", "Buyer Matched", "Trade Settled", "Data Green OS"],
    orbShadow: "shadow-[0_0_28px_rgba(245,158,11,0.2)]",
    counter: { target: 84240, pre: "", suf: "", dec: 0 },
    shortDescription: "Aggregates crop volumes and matches them with international buyers.",
    metric: "84,240 Tons Traded",
    receives: ["Batch Receipts", "Yield Projections", "Demand Orders"],
    processes: ["Buyer Matching", "Stock Verification", "Export Tracking"],
    produces: ["Settlement Orders", "Cargo Manifests", "Audit Records"],
  },
  {
    id: "finance", name: "Finance Ledger", icon: Wallet,
    largeMetric: "$4.2M", metricLabel: "Direct Grower Payouts",
    capabilities: ["Digital Wallet Integration", "Agronomic Credit Score"],
    workflowSteps: ["Credit Scored", "Payout Verified", "Wallet Transfer", "Data Green OS"],
    orbShadow: "shadow-[0_0_28px_rgba(16,185,129,0.25)]",
    counter: { target: 42, pre: "$", suf: "M", dec: 1 },
    shortDescription: "Processes premium payouts and micro-loans directly to mobile wallets.",
    metric: "$4.2M Paid Directly",
    receives: ["Settlement Orders", "Agronomic Records", "ESG Offsets"],
    processes: ["Credit Scoring", "Payout Verification", "Premium Math"],
    produces: ["Mobile Receipts", "Micro-Loans", "ESG Disbursements"],
  },
  {
    id: "carbon", name: "Carbon & ESG", icon: Leaf,
    largeMetric: "24,000", metricLabel: "mt CO₂e Certified",
    capabilities: ["Sequestration MRV Engine", "Certified ESG Reports"],
    workflowSteps: ["Biomass MRV", "Credit Issued", "ESG Verified", "Data Green OS"],
    orbShadow: "shadow-[0_0_28px_rgba(5,150,105,0.25)]",
    counter: { target: 24000, pre: "", suf: "", dec: 0 },
    shortDescription: "Tracks carbon absorption across forest boundaries for certified credits.",
    metric: "24,000 mt CO₂e",
    receives: ["Hectares Registry", "Settlement Orders", "Payout Receipts"],
    processes: ["Biomass MRV", "Methane Audits", "ESG Scoring"],
    produces: ["ESG Reports", "Carbon Offsets", "Premium Multipliers"],
  },
];

/* ── Positioning coordinates inside 1440x520 viewport ── */
const HUB = { x: 720, y: 270 };
const COORDS: Record<string, { x: number; y: number }> = {
  farmer: { x: 160, y: 270 },
  traceability: { x: 415, y: 110 },
  gis: { x: 415, y: 430 },
  ai: { x: 720, y: 65 },
  marketplace: { x: 1025, y: 110 },
  finance: { x: 1025, y: 430 },
  carbon: { x: 1280, y: 270 },
};
const p = (id: string) => COORDS[id] || HUB;

/* ── Ambient color palette for day-to-night transitions ── */
const HUES: Record<string, string> = {
  farmer: "#f6fdf8", traceability: "#f4fcfa", gis: "#f3fafd",
  ai: "#f5f4fb", marketplace: "#fdfbf4", finance: "#f4fdf6", carbon: "#f2fdf4",
};

/* ── Floating tooltip positioning rules ── */
const TTS: Record<string, string> = {
  farmer: "left-[calc(100%+14px)] top-1",
  traceability: "left-[calc(100%+14px)] top-1",
  gis: "left-[calc(100%+14px)] bottom-1",
  ai: "top-[calc(100%+14px)] left-1/2 -translate-x-1/2",
  marketplace: "right-[calc(100%+14px)] top-1",
  finance: "right-[calc(100%+14px)] bottom-1",
  carbon: "right-[calc(100%+14px)] top-1",
};

/* ── Floating background particles ── */
const PARTS = [
  { s: 7, t: "11%", l: "9%", d: "9s", dl: "0s" },
  { s: 11, t: "26%", l: "84%", d: "14s", dl: "1.5s" },
  { s: 5, t: "48%", l: "18%", d: "11s", dl: "3.2s" },
  { s: 9, t: "67%", l: "72%", d: "16s", dl: "0.6s" },
  { s: 6, t: "82%", l: "38%", d: "10s", dl: "2.4s" },
  { s: 13, t: "14%", l: "58%", d: "18s", dl: "4.1s" },
  { s: 8, t: "53%", l: "91%", d: "12s", dl: "1.2s" },
  { s: 10, t: "73%", l: "46%", d: "15s", dl: "3.8s" },
];

/* ── SVG Path definitions for sequential loop ── */
const SEQ = [
  { id: "farmer-trace", d: `M${p("farmer").x},${p("farmer").y}L${p("traceability").x},${p("traceability").y}` },
  { id: "trace-gis", d: `M${p("traceability").x},${p("traceability").y}L${p("gis").x},${p("gis").y}` },
  { id: "gis-hub", d: `M${p("gis").x},${p("gis").y}L${HUB.x},${HUB.y}` },
  { id: "hub-ai", d: `M${HUB.x},${HUB.y}L${p("ai").x},${p("ai").y}` },
  { id: "ai-market", d: `M${p("ai").x},${p("ai").y}L${p("marketplace").x},${p("marketplace").y}` },
  { id: "market-fin", d: `M${p("marketplace").x},${p("marketplace").y}L${p("finance").x},${p("finance").y}` },
  { id: "fin-carbon", d: `M${p("finance").x},${p("finance").y}L${p("carbon").x},${p("carbon").y}` },
  { id: "payout", d: `M${p("carbon").x},${p("carbon").y}C720,560 160,560 ${p("farmer").x},${p("farmer").y}` },
];

const HPATHS = SLICES.map(s => ({
  id: `hub-${s.id}`,
  d: `M${HUB.x},${HUB.y}L${p(s.id).x},${p(s.id).y}`,
}));

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */
export function DataGreenEngine() {
  const [hov, setHov] = useState<number | null>(null);
  const [sel, setSel] = useState<number | null>(null);
  const [counterVal, setCounterVal] = useState(0);
  const [pulseNode, setPulseNode] = useState<number | "hub" | "to-hub" | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);
  const pulseTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── IntersectionObserver to check visibility ── */
  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  /* ── Counter animation: counts up from zero on hover ── */
  useEffect(() => {
    cancelAnimationFrame(counterRef.current);
    if (hov === null) { setCounterVal(0); return; }
    const target = SLICES[hov].counter.target;
    const start = performance.now();
    const dur = 600;
    const tick = (now: number) => {
      const prog = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3); // easeOutCubic
      setCounterVal(Math.round(target * ease));
      if (prog < 1) counterRef.current = requestAnimationFrame(tick);
    };
    counterRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(counterRef.current);
  }, [hov]);

  /* ── Hero Pulse (starts after 1.5s hover, propagating down the entire ecosystem chain) ── */
  useEffect(() => {
    pulseTimers.current.forEach(clearTimeout);
    pulseTimers.current = [];
    setPulseNode(null);
    if (hov === null) return;

    const startPulse = setTimeout(() => {
      // Step 0: hovered card glows
      setPulseNode(hov);

      // Step 1: pulse travels to Hub
      const t1 = setTimeout(() => {
        setPulseNode("to-hub");
      }, 500);

      // Step 2: Hub pulses
      const t2 = setTimeout(() => {
        setPulseNode("hub");
      }, 1000);

      pulseTimers.current.push(t1, t2);

      // Steps 3-9: propagate sequentially downstream through the circular node list
      const sequence = [
        "farmer",
        "traceability",
        "gis",
        "ai",
        "marketplace",
        "finance",
        "carbon",
      ];
      const startIdx = sequence.indexOf(SLICES[hov].id);

      for (let step = 1; step <= 7; step++) {
        const nextIdx = (startIdx + step) % 7;
        const delay = 1000 + step * 450;
        const tStep = setTimeout(() => {
          setPulseNode(nextIdx);
        }, delay);
        pulseTimers.current.push(tStep);
      }

      // Final step: fade out pulse
      const tEnd = setTimeout(() => {
        setPulseNode(null);
      }, 1000 + 8 * 450);
      pulseTimers.current.push(tEnd);

    }, 1500);

    pulseTimers.current.push(startPulse);
    return () => {
      pulseTimers.current.forEach(clearTimeout);
      pulseTimers.current = [];
    };
  }, [hov]);

  /* ── Mouse tracking (parallax offsets & custom cursor glow) ── */
  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  }, []);

  /* ── Active flow path indicator ── */
  const glow = (pid: string) => {
    if (hov === null) return false;
    const a = SLICES[hov].id;
    // Map active module to its specific system path segments
    const m: Record<string, string[]> = {
      farmer: ["farmer-trace", "hub-farmer", "payout"],
      traceability: ["farmer-trace", "trace-gis", "hub-trace"],
      gis: ["trace-gis", "gis-hub", "hub-gis"],
      ai: ["hub-ai", "ai-market", "hub-ai"],
      marketplace: ["ai-market", "market-fin", "hub-marketplace"],
      finance: ["market-fin", "fin-carbon", "payout", "hub-finance"],
      carbon: ["fin-carbon", "payout", "hub-carbon"],
    };
    return m[a]?.includes(pid) ?? false;
  };

  /* ── Reflected light adjancency helper ── */
  const adj = (hi: number, ci: number) => {
    const d = Math.abs(hi - ci);
    return d === 1 || d === 6;
  };

  /* ── Magnetic pull offset calculation per card ── */
  const getMagneticOffset = (cx: number, cy: number) => {
    if (hov !== null) return { x: 0, y: 0 };
    const mx = mouse.x * 1440;
    const my = mouse.y * 520;
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 180) {
      const pull = (1 - dist / 180) * 12; // Max 12px pull offset
      return { x: (dx / dist) * pull, y: (dy / dist) * pull };
    }
    return { x: 0, y: 0 };
  };

  const ambientBg = hov !== null ? HUES[SLICES[hov].id] : "#ffffff";
  const mobGlow = (idx: number) => sel !== null && sel >= idx;

  /* Parallax translations */
  const px1 = (mouse.x - 0.5) * -8;
  const py1 = (mouse.y - 0.5) * -8;
  const px2 = (mouse.x - 0.5) * 4;
  const py2 = (mouse.y - 0.5) * 4;

  const curSlice = sel === 999
    ? {
        id: "hub", name: "Data Green Core OS", icon: ShieldCheck, metric: "Central Router",
        shortDescription: "Central data router unifying all nodes into one agricultural OS.",
        capabilities: ["Unified Schema Routing", "Cross-Module Tracing"] as [string, string],
        receives: ["Node Signals", "Telemetry Traces"], processes: ["Schema Mapping", "Module Routing"],
        produces: ["Integrated Analytics", "Orchestrated Outputs"],
      }
    : sel !== null && sel >= 0 && sel < SLICES.length ? SLICES[sel] : null;

  /* ── Card Renderer ── */
  const renderCard = (s: Slice, i: number) => {
    const isH = hov === i;
    const dim = hov !== null && !isH;
    const isAdj = hov !== null && !isH && adj(hov, i);
    const isPulse = pulseNode === i;
    const Icon = s.icon;
    const W = 228, H = 200;
    const pos = p(s.id);
    const offset = getMagneticOffset(pos.x, pos.y);

    return (
      <foreignObject key={`d-${s.id}`} x={pos.x - W / 2} y={pos.y - H / 2} width={W} height={H} style={{ overflow: "visible" }}>
        <div
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
          className="relative w-full h-full flex flex-col items-center justify-center text-center cursor-pointer border"
          style={{
            borderRadius: 30,
            background: isH ? "rgba(255,255,255,0.96)" : dim ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.85)",
            backdropFilter: isH ? "blur(24px)" : "blur(16px)",
            borderColor: isH
              ? "rgba(16,185,129,0.3)"
              : isPulse
                ? "rgba(16,185,129,0.4)"
                : isAdj
                  ? "rgba(16,185,129,0.12)"
                  : "rgba(0,77,38,0.06)",
            boxShadow: isH
              ? "0 22px 64px rgba(16,185,129,0.15), 0 0 0 1px rgba(16,185,129,0.06), inset 0 1px 0 rgba(255,255,255,0.85)"
              : isPulse
                ? "0 0 35px rgba(16,185,129,0.22), 0 8px 24px rgba(0,0,0,0.03)"
                : "0 4px 24px rgba(0,77,38,0.02), inset 0 1px 0 rgba(255,255,255,0.6)",
            transform: isH
              ? "scale(1.06) translateY(-14px)"
              : isPulse
                ? "scale(1.05) translateY(-8px)"
                : dim
                  ? "scale(0.86)"
                  : `scale(1) translate(${offset.x}px, ${offset.y}px)`,
            opacity: isH ? 1 : isAdj ? 0.38 : dim ? 0.20 : 1,
            filter: dim && !isAdj ? "blur(0.5px)" : "none",
            transition: "all 550ms cubic-bezier(0.4,0,0.2,1)",
            animation: hov === null && visible ? `dge-breathe 6s ease-in-out infinite` : "none",
            animationDelay: `${i * 0.85}s`,
          }}
        >
          {/* Glass Orb Icon */}
          <div className={`w-[58px] h-[58px] rounded-full bg-gradient-to-br from-white/95 to-emerald-50/50 border border-white/70 flex items-center justify-center transition-all duration-600 ${isH ? s.orbShadow : "shadow-[0_4px_16px_rgba(0,0,0,0.04)]"}`}>
            <Icon className={`w-7 h-7 text-emerald-600 transition-all duration-700 ${isH ? "scale-110 rotate-[8deg]" : ""}`} />
          </div>

          {/* Large statistic */}
          <div className="mt-3 mb-0.5">
            <span className="font-black text-[#004D26] tracking-tighter leading-none block transition-all duration-500"
              style={{ fontSize: isH ? 36 : 30 }}>
              {isH ? fmtC(counterVal, s.counter) : s.largeMetric}
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.16em] mt-1 block">
              {s.metricLabel}
            </span>
          </div>

          {/* Two Capabilities with Checkmarks */}
          <div className="mt-2 pt-2.5 border-t border-gray-100/40 flex flex-col gap-0.5 w-full px-5">
            {s.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center justify-center gap-1.5">
                <span className="text-[#10b981] font-black text-[10px] shrink-0">✓</span>
                <span className={`text-[9.5px] font-medium whitespace-nowrap transition-colors duration-500 ${isH ? "text-gray-600" : "text-gray-400"}`}>{cap}</span>
              </div>
            ))}
          </div>

          {/* Floating Tooltip (Dynamic Island style) */}
          {isH && (
            <div className={`absolute ${TTS[s.id]} w-[168px] bg-white/95 backdrop-blur-2xl border border-emerald-100/50 p-4 z-50 pointer-events-none`}
              style={{
                borderRadius: 20,
                boxShadow: "0 12px 48px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(16,185,129,0.08)",
                animation: "dge-fadeIn 400ms ease-out forwards",
              }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[7px] h-[7px] rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.18em]">Live</span>
              </div>
              <div className="space-y-1.5">
                {s.workflowSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {idx < s.workflowSteps.length - 1
                      ? <ChevronDown className="w-3 h-3 text-emerald-400 shrink-0" />
                      : <ArrowRight className="w-3 h-3 text-emerald-500 shrink-0" />}
                    <span className={`text-[10px] font-semibold ${idx === s.workflowSteps.length - 1 ? "text-emerald-600 font-bold" : "text-gray-500"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </foreignObject>
    );
  };

  return (
    <div ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-between min-h-[580px] select-none overflow-hidden"
      style={{ backgroundColor: ambientBg, transition: "background-color 700ms ease", height: "82vh", maxHeight: "780px" }}>

      <style>{`
        @keyframes dge-float{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-14px) translateX(6px)}}
        @keyframes dge-drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(18px,-8px) scale(1.01)}66%{transform:translate(-12px,6px) scale(0.99)}}
        @keyframes dge-cw{to{transform:rotate(360deg)}}
        @keyframes dge-ccw{to{transform:rotate(-360deg)}}
        @keyframes dge-fadeIn{from{opacity:0;transform:translateY(6px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes dge-flow{to{stroke-dashoffset:-30}}
        .dge-flow-on{animation:dge-flow 1.2s linear infinite}
        @keyframes dge-pulse-ring{0%,100%{opacity:.12;r:48}50%{opacity:.25;r:52}}
        @keyframes dge-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      `}</style>

      {/* ═══════════════════════════════════════
          LAYER 1: AMBIENT NEUTRAL BACKGROUND
          ═══════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        style={{
          transform: `translate(${px1}px,${py1}px)`,
          transition: "transform 800ms ease-out",
          animationPlayState: visible ? "running" : "paused",
        }}>

        {/* Soft radial gradients */}
        <div className="absolute w-[55%] h-[55%] top-[12%] left-[8%] rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse,rgba(16,185,129,0.04),transparent 70%)", animation: "dge-drift 28s ease-in-out infinite" }} />
        <div className="absolute w-[48%] h-[48%] top-[42%] right-[4%] rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse,rgba(59,130,246,0.025),transparent 65%)", animation: "dge-drift 35s ease-in-out infinite", animationDelay: "10s" }} />

        {/* Floating particles */}
        {PARTS.map((q, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: q.s, height: q.s, top: q.t, left: q.l,
              backgroundColor: `rgba(16,185,129,${0.06 + (i % 3) * 0.025})`,
              animation: `dge-float ${q.d} ease-in-out infinite`,
              animationDelay: q.dl,
              animationPlayState: visible ? "running" : "paused",
            }} />
        ))}

        {/* Faint blueprint grid patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015] text-[#004D26]" viewBox="0 0 1440 520">
          <pattern id="dge-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dge-grid)" />
          <circle cx="720" cy="270" r="400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="720" cy="270" r="520" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] text-emerald-800 opacity-[0.012]" />
      </div>

      {/* ═══════════════════════════════════════
          LAYER 2: DISSOLVING ILLUSTRATIONS
          ═══════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
        style={{ transform: `translate(${px1 * 0.6}px,${py1 * 0.6}px)`, transition: "transform 900ms ease-out" }}>

        {/* Farmer Portal: Farmland rows, crop textures, phones */}
        <svg className={`absolute inset-0 w-full h-full transition-all duration-[850ms] ease-in-out ${hov === 0 ? "opacity-[0.045] scale-100 blur-[1px]" : "opacity-0 scale-[0.96] blur-[6px]"}`} viewBox="0 0 1440 520" fill="none" stroke="#004D26" strokeWidth="1.5">
          <path d="M100,450 C300,410 500,430 700,400" />
          <path d="M120,470 C320,430 520,450 720,420" />
          <path d="M80,430 C280,390 480,410 680,380" />
          <circle cx="260" cy="200" r="28" strokeDasharray="3 3" />
          <path d="M260,180 L260,220 M240,200 L280,200" />
        </svg>

        {/* Traceability: QR frames, cargo boxes, magnifying focus */}
        <svg className={`absolute inset-0 w-full h-full transition-all duration-[850ms] ease-in-out ${hov === 1 ? "opacity-[0.045] scale-100 blur-[1px]" : "opacity-0 scale-[0.96] blur-[6px]"}`} viewBox="0 0 1440 520" fill="none" stroke="#004D26" strokeWidth="1.5">
          <rect x="250" y="80" width="80" height="80" rx="8" strokeDasharray="4 4" />
          <rect x="270" y="100" width="40" height="40" rx="4" />
          <path d="M1100,200 L1180,200 L1180,280 L1100,280 Z" />
          <line x1="1100" y1="200" x2="1140" y2="160" />
          <line x1="1180" y1="200" x2="1220" y2="160" />
        </svg>

        {/* Geo Spatial: Satellites, contour lines, earth grid */}
        <svg className={`absolute inset-0 w-full h-full transition-all duration-[850ms] ease-in-out ${hov === 2 ? "opacity-[0.045] scale-100 blur-[1px]" : "opacity-0 scale-[0.96] blur-[6px]"}`} viewBox="0 0 1440 520" fill="none" stroke="#004D26" strokeWidth="1.5">
          <circle cx="415" cy="430" r="140" />
          <path d="M415,290 A140,140 0 0,0 415,570" />
          <path d="M415,290 A140,140 0 0,1 415,570" />
          <line x1="275" y1="430" x2="555" y2="430" />
          <path d="M220,380 Q320,320 420,400 T620,340" strokeDasharray="3 3" />
        </svg>

        {/* AI Predictions: Neural network, predictive bezier curves */}
        <svg className={`absolute inset-0 w-full h-full transition-all duration-[850ms] ease-in-out ${hov === 3 ? "opacity-[0.045] scale-100 blur-[1px]" : "opacity-0 scale-[0.96] blur-[6px]"}`} viewBox="0 0 1440 520" fill="none" stroke="#004D26" strokeWidth="1.5">
          <circle cx="720" cy="180" r="6" fill="#004D26" />
          <circle cx="640" cy="120" r="6" fill="#004D26" />
          <circle cx="800" cy="120" r="6" fill="#004D26" />
          <line x1="720" y1="180" x2="640" y2="120" />
          <line x1="720" y1="180" x2="800" y2="120" />
          <path d="M500,200 Q650,110 800,140 T1100,50" strokeWidth="2.5" />
        </svg>

        {/* Marketplace: shipping routes, B2B ports */}
        <svg className={`absolute inset-0 w-full h-full transition-all duration-[850ms] ease-in-out ${hov === 4 ? "opacity-[0.045] scale-100 blur-[1px]" : "opacity-0 scale-[0.96] blur-[6px]"}`} viewBox="0 0 1440 520" fill="none" stroke="#004D26" strokeWidth="1.5">
          <path d="M720,270 Q920,80 1120,130" strokeDasharray="6 6" />
          <path d="M1025,110 Q1220,90 1380,200" strokeDasharray="4 4" />
          <circle cx="1120" cy="130" r="5" fill="#004D26" />
        </svg>

        {/* Finance: Ledger lines, coins, transaction arrows */}
        <svg className={`absolute inset-0 w-full h-full transition-all duration-[850ms] ease-in-out ${hov === 5 ? "opacity-[0.045] scale-100 blur-[1px]" : "opacity-0 scale-[0.96] blur-[6px]"}`} viewBox="0 0 1440 520" fill="none" stroke="#004D26" strokeWidth="1.5">
          <path d="M1025,430 L720,270" />
          <path d="M1025,430 L1280,270" />
          <circle cx="950" cy="380" r="16" />
          <circle cx="1100" cy="480" r="12" />
        </svg>

        {/* Carbon & ESG: Forests, trees, wind turbines */}
        <svg className={`absolute inset-0 w-full h-full transition-all duration-[850ms] ease-in-out ${hov === 6 ? "opacity-[0.045] scale-100 blur-[1px]" : "opacity-0 scale-[0.96] blur-[6px]"}`} viewBox="0 0 1440 520" fill="none" stroke="#004D26" strokeWidth="1.5">
          <path d="M1210,340 L1230,290 L1250,340 Z" />
          <path d="M1270,350 L1290,300 L1310,350 Z" />
          <line x1="1350" y1="200" x2="1350" y2="150" strokeWidth="2.5" />
          <path d="M1350,150 L1330,140 M1350,150 L1370,140 M1350,150 L1350,170" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════
          LAYER 3: INTENSITY ATTRACTOR CURSOR GLOW
          ═══════════════════════════════════════ */}
      <div className="absolute w-[320px] h-[320px] rounded-full pointer-events-none z-[2] hidden xl:block"
        style={{
          background: "radial-gradient(circle,rgba(16,185,129,0.065) 0%,transparent 70%)",
          left: `calc(${mouse.x * 100}% - 160px)`,
          top: `calc(${mouse.y * 100}% - 160px)`,
          opacity: hov !== null ? 0.95 : 0.3,
          transition: "opacity 500ms ease, left 600ms ease-out, top 600ms ease-out",
        }} />

      {/* ═══════════════════════════════════════
          MOBILE LAYOUT (<1280px viewport)
          ═══════════════════════════════════════ */}
      <div className="block xl:hidden w-full max-w-[420px] mx-auto relative z-20 flex-1 flex flex-col items-center justify-center">
        <div className="w-full aspect-square max-h-[420px] relative">
          <svg viewBox="0 0 420 420" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <circle cx="210" cy="210" r="120" fill="none" stroke="rgba(16,185,129,0.04)" strokeWidth="1" />
            <circle cx="210" cy="210" r="100" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="1" strokeDasharray="6 8" style={{ animation: "dge-cw 22s linear infinite", transformOrigin: "210px 210px" }} />
            <circle cx="210" cy="210" r="80" fill="none" stroke="rgba(16,185,129,0.06)" strokeWidth="1" />
            {[["110", "300", "65", "210"], ["65", "210", "110", "120"], ["110", "120", "210", "65"], ["210", "65", "310", "120"], ["310", "120", "355", "210"], ["355", "210", "310", "300"]].map((pts, idx) => (
              <React.Fragment key={`mp-${idx}`}>
                <line x1={pts[0]} y1={pts[1]} x2={pts[2]} y2={pts[3]} stroke={mobGlow(idx + 1) ? "#10b981" : "rgba(0,77,38,0.06)"} strokeWidth={mobGlow(idx + 1) ? "3" : "1.2"} />
                {mobGlow(idx + 1) && <line x1={pts[0]} y1={pts[1]} x2={pts[2]} y2={pts[3]} stroke="#10b981" strokeWidth="3" className="dge-m-on" />}
              </React.Fragment>
            ))}
            <path d="M310 300 C260 345 160 345 110 300" fill="none" stroke={sel !== null ? "#10b981" : "rgba(0,77,38,0.03)"} strokeWidth={sel !== null ? "2.5" : "1"} strokeDasharray="4 4" className={sel !== null ? "dge-m-on" : ""} />
            {[{ x: 110, y: 300 }, { x: 65, y: 210 }, { x: 110, y: 120 }, { x: 210, y: 65 }, { x: 310, y: 120 }, { x: 355, y: 210 }, { x: 310, y: 300 }].map((coord, i) => (
              <line key={`mr-${i}`} x1="210" y1="210" x2={coord.x} y2={coord.y} stroke={sel === i ? "#10b981" : "rgba(16,185,129,0.03)"} strokeWidth={sel === i ? "2" : "1"} strokeDasharray="3 3" />
            ))}
            <foreignObject x="155" y="155" width="110" height="110" style={{ overflow: "visible" }} className="pointer-events-auto">
              <button onClick={() => setSel(sel === 999 ? null : 999)} className="w-[110px] h-[110px] rounded-full bg-white border-[3px] border-[#10b981] flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(16,185,129,0.18)] transition-transform active:scale-95">
                <ShieldCheck className="w-7 h-7 text-[#10b981] mb-0.5" /><span className="text-[9px] font-black tracking-[0.15em] text-[#004D26] uppercase">Core OS</span>
              </button>
            </foreignObject>
            {[{ x: 110, y: 300 }, { x: 65, y: 210 }, { x: 110, y: 120 }, { x: 210, y: 65 }, { x: 310, y: 120 }, { x: 355, y: 210 }, { x: 310, y: 300 }].map((coord, i) => {
              const s = SLICES[i]; const isSel = sel === i; const dim = sel !== null && !isSel; const Icon = s.icon;
              return (<g key={`mn-${s.id}`}>
                <foreignObject x={coord.x - 26} y={coord.y - 26} width="52" height="52" style={{ overflow: "visible" }} className="pointer-events-auto">
                  <button onClick={() => setSel(sel === i ? null : i)}
                    className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 border ${isSel ? "bg-[#10b981] border-[#10b981] text-white scale-110 shadow-[0_0_18px_rgba(16,185,129,0.4)]" : "bg-white border-emerald-800/12 text-[#004D26]"} ${dim ? "opacity-25" : ""}`}>
                    <Icon className="w-6 h-6" />
                  </button>
                </foreignObject>
                <text x={coord.x} y={coord.y > 250 ? coord.y + 42 : coord.y < 100 ? coord.y - 34 : coord.y + 42} textAnchor="middle" className={`pointer-events-none ${dim ? "opacity-25" : ""}`}>
                  <tspan className={`text-[9px] font-black uppercase tracking-wider ${isSel ? "fill-[#10b981]" : "fill-[#004D26]"}`}>{s.name}</tspan>
                </text>
              </g>);
            })}
          </svg>
        </div>
      </div>

      {/* Mobile Bottom sheet */}
      {sel !== null && curSlice && (
        <><div onClick={() => setSel(null)} className="fixed inset-0 bg-black/30 z-40 block xl:hidden" />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[28px] border-t border-emerald-100 shadow-[0_-12px_40px_rgba(0,0,0,0.1)] z-50 block xl:hidden max-h-[55vh] overflow-hidden">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3" />
            <div className="px-5 pt-3 pb-6 overflow-y-auto max-h-[calc(55vh-24px)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-emerald-50 border border-white/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center justify-center">
                    {React.createElement(curSlice.icon, { className: "w-5 h-5 text-emerald-600" })}
                  </div>
                  <div><h3 className="text-sm font-black text-[#004D26] uppercase tracking-wider">{curSlice.name}</h3>
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">{curSlice.metric}</span></div>
                </div>
                <button onClick={() => setSel(null)} className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:scale-95 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">{curSlice.shortDescription}</p>
              <div className="flex flex-col gap-1.5 mb-4">
                {curSlice.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[3]" />{cap}</div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════
          DESKTOP CANVAS LAYOUT (>=1280px)
          ═══════════════════════════════════════ */}
      <div className="hidden xl:flex w-full max-w-[1440px] flex-col items-center justify-center z-10 flex-1 relative px-4"
        onMouseMove={handleMouse}>

        <div className="w-full h-[510px] relative"
          style={{ transform: `translate(${px2}px,${py2}px)`, transition: "transform 700ms ease-out" }}>

          <svg viewBox="0 0 1440 520" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <filter id="dge-neon" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="dge-soft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>

            {/* Faint wireframe network paths */}
            {[...SEQ, ...HPATHS].map(q => (
              <path key={`g-${q.id}`} d={q.d} fill="none" stroke="rgba(16,185,129,0.035)" strokeWidth="3" />
            ))}

            {/* Glowing animated connection paths */}
            {SEQ.map(q => {
              const isPulseFlow = pulseNode !== null && typeof pulseNode === "number" && (() => {
                const mapIds = ["farmer-trace", "trace-gis", "gis-hub", "hub-ai", "ai-market", "market-fin", "fin-carbon", "payout"];
                return pulseNode === mapIds.indexOf(q.id);
              })();
              const isGlow = glow(q.id) || isPulseFlow;

              return (
                <path key={`s-${q.id}`} d={q.d} fill="none"
                  stroke={isGlow ? "#10b981" : "rgba(0,77,38,0.06)"}
                  strokeWidth={isGlow ? 3 : 1}
                  strokeDasharray={isGlow ? "8 16" : "3 5"}
                  filter={isGlow ? "url(#dge-neon)" : undefined}
                  className={isGlow ? "dge-flow-on" : ""}
                  style={{ transition: "stroke 500ms,stroke-width 500ms" }} />
              );
            })}

            {/* Radial paths from center Hub */}
            {HPATHS.map(q => {
              const isActiveHubPath = pulseNode === "to-hub" && q.id === `hub-${SLICES[hov ?? 0].id}`;
              const isGlow = glow(q.id) || isActiveHubPath;

              return (
                <path key={`h-${q.id}`} d={q.d} fill="none"
                  stroke={isGlow ? "#10b981" : "rgba(16,185,129,0.03)"}
                  strokeWidth={isGlow ? 2.5 : 0.8}
                  strokeDasharray="4 4"
                  filter={isGlow ? "url(#dge-neon)" : undefined}
                  style={{ transition: "stroke 500ms,stroke-width 500ms" }} />
              );
            })}

            {/* Particle Beams -> Core OS Hub */}
            {hov !== null && (() => {
              const src = p(SLICES[hov].id);
              const bp = `M${src.x},${src.y}L${HUB.x},${HUB.y}`;
              return (
                <>
                  <circle r="4.5" fill="#10b981" filter="url(#dge-neon)" opacity="0.85"><animateMotion dur="1.4s" repeatCount="indefinite" path={bp} /></circle>
                  <circle r="3" fill="#10b981" filter="url(#dge-soft)" opacity="0.55"><animateMotion dur="1.4s" begin="0.45s" repeatCount="indefinite" path={bp} /></circle>
                  <circle r="2" fill="#10b981" opacity="0.3"><animateMotion dur="1.4s" begin="0.9s" repeatCount="indefinite" path={bp} /></circle>
                </>
              );
            })()}

            {/* Particle Beams sequentially along the active workflow loop */}
            {hov !== null && SEQ.filter(q => glow(q.id)).map(q => (
              <React.Fragment key={`bm-${q.id}`}>
                <circle r="3" fill="#10b981" filter="url(#dge-soft)" opacity="0.65"><animateMotion dur="2.0s" repeatCount="indefinite" path={q.d} /></circle>
                <circle r="2" fill="#10b981" opacity="0.35"><animateMotion dur="2.0s" begin="1.0s" repeatCount="indefinite" path={q.d} /></circle>
              </React.Fragment>
            ))}

            {/* ── CORE OS HYBRID HUB ── */}
            {/* Dynamic rotating gradient ring */}
            <circle cx={HUB.x} cy={HUB.y} r="130" fill="none" stroke="url(#core-gradient)" strokeWidth="1.5" strokeDasharray="30 150"
              style={{ animation: `dge-cw ${hov !== null ? "10s" : "30s"} linear infinite`, transformOrigin: `${HUB.x}px ${HUB.y}px` }} />

            {/* Outer ring */}
            <circle cx={HUB.x} cy={HUB.y} r="115" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1.5" strokeDasharray="12 28"
              style={{ animation: `dge-cw ${hov !== null ? "16s" : "40s"} linear infinite`, transformOrigin: `${HUB.x}px ${HUB.y}px`, transition: "animation-duration 1.5s" }} />

            {/* Middle ring */}
            <circle cx={HUB.x} cy={HUB.y} r="95" fill="none" stroke="rgba(0,77,38,0.07)" strokeWidth="1.2" strokeDasharray="6 14"
              style={{ animation: `dge-ccw ${hov !== null ? "22s" : "55s"} linear infinite`, transformOrigin: `${HUB.x}px ${HUB.y}px` }} />

            {/* Inner pulse ring */}
            <circle cx={HUB.x} cy={HUB.y} r="76" fill="none" stroke="rgba(16,185,129,0.05)" strokeWidth="1"
              style={{ animation: "dge-pulse-ring 3.5s ease-in-out infinite", transformOrigin: `${HUB.x}px ${HUB.y}px` }} />

            {/* Orbiting core particles & tiny satellites */}
            <circle r="4" fill="#10b981" filter="url(#dge-neon)">
              <animateMotion dur="12s" repeatCount="indefinite" path={`M${HUB.x - 95},${HUB.y}A95,95 0 1,1 ${HUB.x + 95},${HUB.y}A95,95 0 1,1 ${HUB.x - 95},${HUB.y}`} />
            </circle>
            <circle r="3" fill="#004D26" filter="url(#dge-soft)" opacity="0.45">
              <animateMotion dur="18s" repeatCount="indefinite" path={`M${HUB.x + 115},${HUB.y}A115,115 0 1,0 ${HUB.x - 115},${HUB.y}A115,115 0 1,0 ${HUB.x + 115},${HUB.y}`} />
            </circle>
            <circle r="2.5" fill="#10b981" opacity="0.5">
              <animateMotion dur="25s" repeatCount="indefinite" path={`M${HUB.x},${HUB.y - 76}A76,76 0 1,1 ${HUB.x},${HUB.y + 76}A76,76 0 1,1 ${HUB.x},${HUB.y - 76}`} />
            </circle>

            {/* Floating satellite boxes */}
            <g style={{ animation: "dge-cw 40s linear infinite", transformOrigin: `${HUB.x}px ${HUB.y}px` }}>
              <rect x={HUB.x + 112} y={HUB.y - 4} width="8" height="8" rx="2" fill="white" stroke="#10b981" strokeWidth="1" />
              <rect x={HUB.x - 120} y={HUB.y - 4} width="8" height="8" rx="2" fill="white" stroke="#10b981" strokeWidth="1" />
            </g>

            {/* Core operating circle */}
            <circle cx={HUB.x} cy={HUB.y} r="58" fill="white" stroke="#10b981" strokeWidth="3.5"
              style={{
                filter: hov !== null || pulseNode === "hub"
                  ? "drop-shadow(0 0 28px rgba(16,185,129,0.36))"
                  : "drop-shadow(0 0 6px rgba(16,185,129,0.08))",
                transition: "filter 600ms ease",
              }} />
            <circle cx={HUB.x} cy={HUB.y} r="48" fill="rgba(16,185,129,0.025)"
              style={{ animation: "dge-pulse-ring 3s ease-in-out infinite", transformOrigin: `${HUB.x}px ${HUB.y}px` }} />

            <text x={HUB.x} y={HUB.y - 10} textAnchor="middle" fill="#004D26" fontSize="11" fontWeight="900" letterSpacing="0.18em">DATA GREEN</text>
            <text x={HUB.x} y={HUB.y + 10} textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="900" letterSpacing="0.12em">CORE OS</text>
            <text x={HUB.x} y={HUB.y + 24} textAnchor="middle" fill="#999" fontSize="5.5" fontWeight="700" letterSpacing="0.08em">CENTRAL ROUTER</text>

            {/* Cards rendered: non-hovered first, hovered on top */}
            {SLICES.map((s, i) => { if (hov === i) return null; return renderCard(s, i); })}
            {hov !== null && renderCard(SLICES[hov], hov)}

          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          COMPLIANCE FOOTER
          ═══════════════════════════════════════ */}
      <div className="w-full py-3 px-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-2 text-center border border-emerald-800/8 max-w-4xl z-10 bg-white/80 backdrop-blur-md mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#10b981]" />
          <span className="font-extrabold text-xs tracking-wider text-[#004D26]">SourceTrace Data Green OS</span>
        </div>
        <p className="text-[10px] font-medium text-gray-400 max-w-md md:text-right">Ensuring direct grower payouts, compliance audits, and end-to-end supply chain traceability.</p>
      </div>

    </div>
  );
}
