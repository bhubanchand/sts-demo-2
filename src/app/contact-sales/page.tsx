"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Presentation,
  Globe,
  Handshake,
  ArrowRight,
  Shield,
  Award,
  Building2,
  Sparkles,
  Check,
  ExternalLink,
  Lock,
  Zap,
  Target,
  FileCheck,
  Send,
  HelpCircle,
  Cpu,
  Headphones,
  Settings,
  Layers,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */

function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(val) {
        if (ref.current) {
          ref.current.textContent =
            (to >= 1000000
              ? (val / 1000000).toFixed(val >= to * 0.95 ? 0 : 1) + "M"
              : Math.floor(val).toLocaleString()) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL-REVEAL WRAPPER
   ═══════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const COUNTRIES = [
  "United States",
  "India",
  "Bangladesh",
  "Brazil",
  "Colombia",
  "Germany",
  "France",
  "United Kingdom",
  "Netherlands",
  "Indonesia",
  "Vietnam",
  "Kenya",
  "Ethiopia",
  "Ghana",
  "Ivory Coast",
  "Nigeria",
  "Thailand",
  "Malaysia",
  "Australia",
  "Canada",
  "Other",
];

const INDUSTRIES = [
  "Agriculture & Farming",
  "Food & Beverage",
  "Commodities Trading",
  "Retail & Consumer Goods",
  "Government & Public Sector",
  "NGO & Development",
  "Financial Services",
  "Technology",
  "Other",
];

const COMPANY_SIZES = [
  "1–50 employees",
  "51–200 employees",
  "201–1,000 employees",
  "1,001–5,000 employees",
  "5,001–10,000 employees",
  "10,000+ employees",
];

const AREAS_OF_INTEREST = [
  "Traceability",
  "EUDR Compliance",
  "Farmer Digitization",
  "Carbon Monitoring",
  "Deforestation Monitoring",
  "Supply Chain Visibility",
  "AI & Analytics",
  "Other",
];

const PHONE_CODES = [
  { code: "+1", country: "US" },
  { code: "+91", country: "IN" },
  { code: "+880", country: "BD" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+55", country: "BR" },
  { code: "+62", country: "ID" },
  { code: "+84", country: "VN" },
  { code: "+254", country: "KE" },
  { code: "+234", country: "NG" },
  { code: "+61", country: "AU" },
  { code: "+60", country: "MY" },
  { code: "+31", country: "NL" },
  { code: "+57", country: "CO" },
  { code: "+233", country: "GH" },
];

const WHY_CARDS = [
  {
    icon: Users,
    title: "Enterprise Consultation",
    desc: "Speak directly with agriculture and supply chain specialists who understand your industry challenges.",
  },
  {
    icon: Presentation,
    title: "Tailored Demonstration",
    desc: "Receive a personalized walkthrough designed specifically for your business needs and value chain.",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    desc: "Solutions deployed across multiple countries and value chains with local implementation expertise.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    desc: "End-to-end implementation, onboarding, training, and continuous customer success support.",
  },
];

const OFFICES = [
  {
    flag: "🇺🇸",
    country: "United States",
    name: "USA Office",
    type: "Corporate Headquarters",
    address: [
      "245 First St",
      "Suite 1800",
      "Cambridge",
      "Massachusetts 02142",
      "USA",
    ],
    phone: "+1-469-4550-6904",
    email: "info@sourcetrace.com",
    mapUrl:
      "https://www.google.com/maps/search/245+First+St+Suite+1800+Cambridge+MA+02142",
  },
  {
    flag: "🇮🇳",
    country: "India",
    name: "India Office",
    type: "India Operations",
    address: [
      '"PAVAN PLAZA"',
      "D. No.22/3",
      "Puliyakulam Road",
      "Coimbatore 641045",
      "Tamil Nadu, India",
    ],
    phone: "+91 9087339911",
    email: "info@sourcetrace.com",
    mapUrl:
      "https://www.google.com/maps/search/Pavan+Plaza+Puliyakulam+Road+Coimbatore+641045",
  },
  {
    flag: "🇧🇩",
    country: "Bangladesh",
    name: "Bangladesh Office",
    type: "South Asia Operations",
    address: [
      "Road No-02, House-24/A",
      "Apartment-4C",
      "Banani DoHS",
      "Dhaka-1206",
      "Bangladesh",
    ],
    phone: "+880 1713105261",
    email: "info@sourcetrace.com",
    mapUrl:
      "https://www.google.com/maps/search/Road+No-02+House-24A+Banani+DoHS+Dhaka-1206",
  },
];

const METRICS = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 5000000, suffix: "+", label: "Farmers Digitized" },
  { value: 10000000, suffix: "+", label: "Farms Managed" },
  { value: 44, suffix: "+", label: "Countries Served" },
  { value: 100, suffix: "+", label: "Enterprise Deployments" },
];

const LOGOS = [
  { name: "Cargill", color: "#1B5E20", font: "font-serif" },
  { name: "Olam", color: "#E65100", font: "" },
  { name: "Unilever", color: "#0D47A1", font: "font-serif italic" },
  { name: "Nestlé", color: "#006064", font: "tracking-tighter" },
  { name: "Bunge", color: "#004D40", font: "" },
  { name: "Fairtrade Intl.", color: "#1B5E20", font: "" },
  { name: "Rainforest Alliance", color: "#004D40", font: "font-serif" },
  { name: "World Bank", color: "#0D47A1", font: "" },
  { name: "USAID", color: "#E65100", font: "font-serif italic" },
  { name: "Gates Foundation", color: "#006064", font: "tracking-tighter" },
  { name: "Oxfam", color: "#0D47A1", font: "" },
  { name: "Solidaridad", color: "#004D40", font: "" },
  { name: "TechnoServe", color: "#1B5E20", font: "font-serif" },
  { name: "Conservation Intl.", color: "#006064", font: "tracking-tight italic" },
  { name: "WWF", color: "#000000", font: "font-bold" },
];

const FAQS = [
  {
    icon: Clock,
    q: "How quickly can we schedule a demo?",
    a: "We typically schedule demos within 2–3 business days of your request. Our team will reach out to confirm a time that works best for your schedule.",
  },
  {
    icon: Globe,
    q: "Do you work globally?",
    a: "Yes, SourceTrace operates across 44+ countries with regional offices in the USA, India, and Bangladesh. We support customers worldwide through local expertise and regional implementation teams.",
  },
  {
    icon: Cpu,
    q: "Can SourceTrace integrate with our ERP?",
    a: "Absolutely. We offer native connectors for SAP, Oracle, Microsoft Dynamics 365, and custom REST API integrations. Our platform is designed to fit seamlessly into your existing technology ecosystem.",
  },
  {
    icon: Headphones,
    q: "Do you provide implementation support?",
    a: "Yes, we provide end-to-end implementation, onboarding, training, and ongoing customer success support. Every deployment includes a dedicated project manager.",
  },
  {
    icon: Settings,
    q: "Can you customize solutions?",
    a: "Every deployment is tailored to your specific supply chain, commodities, and compliance requirements. We work closely with your team to configure the platform to your exact needs.",
  },
  {
    icon: Layers,
    q: "How long does deployment take?",
    a: "Typical deployments range from 4–12 weeks depending on scope and complexity. We follow a phased approach to ensure smooth rollouts with minimal disruption.",
  },
];

const TIMELINE_STEPS = [
  { num: "①", title: "Submit your request", desc: "Share your business goals & requirements" },
  { num: "②", title: "Enterprise consultation", desc: "Speak with supply chain domain experts" },
  { num: "③", title: "Personalized product demonstration", desc: "See custom workflow & platform capabilities" },
  { num: "④", title: "Solution proposal", desc: "Receive custom scope, timeline & ROI breakdown" },
  { num: "⑤", title: "Successful implementation", desc: "Full onboarding, data migration & go-live" },
];

/* ═══════════════════════════════════════════════════════════════
   FLOATING INPUT COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function FloatingInput({
  id,
  name,
  label,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`w-full bg-white border rounded-2xl h-13 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 shadow-sm ${
          focused
            ? "border-[#1F7A53] ring-4 ring-[#53D769]/15 shadow-md"
            : "border-gray-200 hover:border-gray-300"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-3.5 -top-2.5 bg-white px-1.5 text-xs font-semibold transition-colors ${
          focused ? "text-[#1F7A53]" : "text-gray-500"
        }`}
      >
        {label} {required && <span className="text-emerald-600 font-bold">*</span>}
      </label>
    </div>
  );
}

function FloatingSelect({
  id,
  name,
  label,
  required = false,
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-white border rounded-2xl h-13 px-4 text-sm text-gray-900 outline-none appearance-none cursor-pointer transition-all duration-200 shadow-sm ${
          focused
            ? "border-[#1F7A53] ring-4 ring-[#53D769]/15 shadow-md"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-3.5 -top-2.5 bg-white px-1.5 text-xs font-semibold transition-colors pointer-events-none ${
          focused ? "text-[#1F7A53]" : "text-gray-500"
        }`}
      >
        {label} {required && <span className="text-emerald-600 font-bold">*</span>}
      </label>
      <div className="absolute right-4 top-4 pointer-events-none text-gray-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ContactSalesPage() {
  /* ── Form state ─────────────────────────────────────── */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+1",
    phone: "",
    company: "",
    country: "",
    industry: "",
    companySize: "",
    interest: "",
    message: "",
    privacyAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ── Single-open FAQ accordion state ─────────────────── */
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgreed) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  /* ── Marquee logos ─────────────────────────────────── */
  const repeatedLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <main className="min-h-screen bg-white">
      {/* ═════════════════════════════════════════════════
          SECTION 1 – HERO
          ═════════════════════════════════════════════════ */}
      <section className="bg-white pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF5EE] text-[#1F7A53] text-xs font-semibold tracking-wide uppercase mb-6 border border-[#1F7A53]/20 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  Enterprise Solutions
                </span>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-[#0B3D2E] leading-[1.12] tracking-tight mb-6">
                  Let&rsquo;s Build Smarter Agricultural Supply Chains Together
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                  Whether you&rsquo;re looking for traceability, EUDR
                  compliance, sustainability reporting, farmer digitization, or
                  enterprise agricultural intelligence, our specialists are
                  ready to help.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3.5 mb-10">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0B3D2E] text-white text-sm font-semibold hover:bg-[#125c44] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] cursor-pointer"
                  >
                    Book a Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-[#0B3D2E] text-[#0B3D2E] text-sm font-semibold hover:bg-[#0B3D2E] hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Talk to Sales
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Trusted across multiple continents",
                    "Enterprise-grade security",
                    "Global implementation experience",
                    "Dedicated customer success",
                  ].map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2.5 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-[#53D769] flex-shrink-0" />
                      {badge}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — Hero Image */}
            <Reveal delay={0.3} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#53D769]/15 to-[#0B3D2E]/10 rounded-3xl blur-2xl" />
                <img
                  src="/images/contact-sales-hero.jpg"
                  alt="Global agricultural supply chain intelligence"
                  className="relative w-full rounded-2xl shadow-2xl border border-gray-100/80 object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 2 – CONTACT FORM (PREMIUM SPLIT LAYOUT)
          ═════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        id="contact-form"
        className="bg-gray-50/70 py-16 sm:py-24 scroll-mt-16 border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* LEFT SIDE — Expert Timeline & Trust */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <div>
                  <span className="text-xs font-bold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                    Enterprise Consultation
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight mb-4">
                    Talk to Our Experts
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Whether you&rsquo;re modernizing agricultural supply chains,
                    implementing traceability, meeting EUDR requirements or
                    digitizing farmer operations, our specialists are ready to
                    help.
                  </p>
                </div>
              </Reveal>

              {/* Timeline */}
              <Reveal delay={0.1}>
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0B3D2E] uppercase tracking-wider mb-5 flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#1F7A53]" />
                    What Happens Next?
                  </h3>
                  <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-100">
                    {TIMELINE_STEPS.map((step, idx) => (
                      <div
                        key={step.num}
                        className="relative flex items-start gap-4 z-10"
                      >
                        <span className="w-7 h-7 rounded-full bg-[#EAF5EE] text-[#1F7A53] text-xs font-bold flex items-center justify-center flex-shrink-0 border border-[#1F7A53]/20 shadow-xs">
                          {step.num}
                        </span>
                        <div className="pt-0.5">
                          <p className="text-sm font-bold text-[#0B3D2E]">
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* 4 Premium Trust Cards */}
              <Reveal delay={0.2}>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:border-[#1F7A53]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1 text-sm font-bold text-[#0B3D2E]">
                      <Shield className="w-4 h-4 text-[#1F7A53]" />
                      Secure & Confidential
                    </div>
                    <p className="text-xs text-gray-500">
                      Enterprise-grade data protection.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:border-[#1F7A53]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1 text-sm font-bold text-[#0B3D2E]">
                      <Zap className="w-4 h-4 text-[#1F7A53]" />
                      Fast Response
                    </div>
                    <p className="text-xs text-gray-500">
                      Typical reply within 24 business hours.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:border-[#1F7A53]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1 text-sm font-bold text-[#0B3D2E]">
                      <Target className="w-4 h-4 text-[#1F7A53]" />
                      Tailored Solutions
                    </div>
                    <p className="text-xs text-gray-500">
                      Customized demonstrations for your business.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:border-[#1F7A53]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1 text-sm font-bold text-[#0B3D2E]">
                      <Globe className="w-4 h-4 text-[#1F7A53]" />
                      Global Delivery
                    </div>
                    <p className="text-xs text-gray-500">
                      Serving customers across multiple regions.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Immediate Assistance */}
              <Reveal delay={0.25}>
                <div className="bg-[#EAF5EE]/60 rounded-2xl p-5 border border-[#1F7A53]/15">
                  <p className="text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1F7A53]" />
                    Need Immediate Assistance?
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-gray-700">
                    <a
                      href="tel:+146945506904"
                      className="hover:text-[#1F7A53] transition-colors"
                    >
                      🇺🇸 +1-469-4550-6904
                    </a>
                    <span className="text-gray-300">•</span>
                    <a
                      href="tel:+919087339911"
                      className="hover:text-[#1F7A53] transition-colors"
                    >
                      🇮🇳 +91-9087339911
                    </a>
                    <span className="text-gray-300">•</span>
                    <a
                      href="tel:+8801713105261"
                      className="hover:text-[#1F7A53] transition-colors"
                    >
                      🇧🇩 +880-1713105261
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT SIDE — Premium Form Card */}
            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100/90 p-7 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#53D769]/10 to-transparent pointer-events-none rounded-bl-full" />

                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      /* ── Success State ── */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-16"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.15,
                          }}
                          className="w-20 h-20 rounded-full bg-[#EAF5EE] flex items-center justify-center mx-auto mb-6 border-2 border-[#1F7A53]/20"
                        >
                          <CheckCircle2 className="w-10 h-10 text-[#1F7A53]" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-[#0B3D2E] mb-3">
                          Consultation Requested!
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto leading-relaxed text-sm">
                          Thank you for connecting with SourceTrace. One of our
                          enterprise specialists will review your requirements and
                          reach out within 24 business hours to schedule your
                          personalized walkthrough.
                        </p>
                      </motion.div>
                    ) : (
                      /* ── Premium Form ── */
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="mb-2">
                          <h3 className="text-xl font-extrabold text-[#0B3D2E]">
                            Request a Consultation
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Fields marked with{" "}
                            <span className="text-emerald-600 font-bold">*</span>{" "}
                            are required
                          </p>
                        </div>

                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FloatingInput
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                          />
                          <FloatingInput
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                          />
                        </div>

                        {/* Business Email */}
                        <FloatingInput
                          id="email"
                          name="email"
                          type="email"
                          label="Business Email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                        />

                        {/* Phone with Country Code */}
                        <div className="relative">
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            Phone Number
                          </label>
                          <div className="flex gap-2">
                            <select
                              name="phoneCode"
                              value={formData.phoneCode}
                              onChange={handleChange}
                              className="bg-white border border-gray-200 rounded-2xl h-13 px-3 text-sm text-gray-900 outline-none focus:border-[#1F7A53] focus:ring-4 focus:ring-[#53D769]/15 transition-all w-28 flex-shrink-0 cursor-pointer shadow-sm"
                            >
                              {PHONE_CODES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.code} ({c.country})
                                </option>
                              ))}
                            </select>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="469-4550-6904"
                              className="flex-1 bg-white border border-gray-200 rounded-2xl h-13 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#1F7A53] focus:ring-4 focus:ring-[#53D769]/15 transition-all shadow-sm"
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <FloatingInput
                          id="company"
                          name="company"
                          label="Company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Enterprise Co."
                        />

                        {/* Country & Industry */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FloatingSelect
                            id="country"
                            name="country"
                            label="Country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            options={COUNTRIES}
                            placeholder="Select Country"
                          />
                          <FloatingSelect
                            id="industry"
                            name="industry"
                            label="Industry"
                            value={formData.industry}
                            onChange={handleChange}
                            options={INDUSTRIES}
                            placeholder="Select Industry"
                          />
                        </div>

                        {/* Company Size & Area of Interest */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FloatingSelect
                            id="companySize"
                            name="companySize"
                            label="Company Size"
                            value={formData.companySize}
                            onChange={handleChange}
                            options={COMPANY_SIZES}
                            placeholder="Select Company Size"
                          />
                          <FloatingSelect
                            id="interest"
                            name="interest"
                            label="Area of Interest"
                            required
                            value={formData.interest}
                            onChange={handleChange}
                            options={AREAS_OF_INTEREST}
                            placeholder="Select Primary Need"
                          />
                        </div>

                        {/* Message */}
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Share your specific goals, timelines, or compliance targets..."
                            className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#1F7A53] focus:ring-4 focus:ring-[#53D769]/15 transition-all shadow-sm resize-none"
                          />
                          <label
                            htmlFor="message"
                            className="absolute left-3.5 -top-2.5 bg-white px-1.5 text-xs font-semibold text-gray-500"
                          >
                            Message / Requirements
                          </label>
                        </div>

                        {/* Privacy Checkbox */}
                        <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
                          <input
                            type="checkbox"
                            name="privacyAgreed"
                            checked={formData.privacyAgreed}
                            onChange={handleChange}
                            className="mt-0.5 w-4.5 h-4.5 rounded border-gray-300 text-[#1F7A53] focus:ring-[#53D769] cursor-pointer"
                          />
                          <span className="text-xs text-gray-500 leading-relaxed">
                            I agree to the{" "}
                            <Link
                              href="/legal/privacy"
                              className="text-[#1F7A53] font-medium hover:underline"
                            >
                              Privacy Policy
                            </Link>{" "}
                            and consent to being contacted regarding SourceTrace
                            solutions.
                          </span>
                        </label>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.privacyAgreed}
                          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#0B3D2E] to-[#125c44] text-white text-base font-bold hover:shadow-xl hover:from-[#125c44] hover:to-[#0B3D2E] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 group"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  ease: "linear",
                                }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Processing Request...
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 text-[#53D769] group-hover:scale-110 transition-transform" />
                              Request My Consultation
                              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>

                        {/* Form Guarantees */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-2 border-t border-gray-100 text-xs text-gray-500 font-medium">
                          <div className="flex items-center justify-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#53D769]" />
                            No obligation consultation
                          </div>
                          <div className="flex items-center justify-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#53D769]" />
                            Enterprise experts contact you
                          </div>
                          <div className="flex items-center justify-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#53D769]" />
                            Response in 1 business day
                          </div>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 3 – WHY CONTACT SOURCETRACE
          ═════════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                Why Partner With Us
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D2E] mb-4">
                Why Contact SourceTrace
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Discover how our enterprise team delivers measurable value at
                every stage of your supply chain digitization journey.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-2xl p-7 h-full hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group hover:border-[#1F7A53]/30">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5EE] flex items-center justify-center mb-5 group-hover:bg-[#0B3D2E] transition-colors duration-300 shadow-xs">
                    <card.icon className="w-6 h-6 text-[#1F7A53] group-hover:text-[#53D769] transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B3D2E] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 4 – REDESIGNED GLOBAL PRESENCE
          ═════════════════════════════════════════════════ */}
      <section className="bg-gray-50/80 py-16 sm:py-24 relative overflow-hidden">
        {/* Subtle Animated Map Graphic Background */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none flex items-center justify-center">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full object-cover"
            fill="none"
            stroke="currentColor"
          >
            {/* World Grid Lines */}
            <path
              d="M100 250 Q 300 150 500 250 T 900 250"
              stroke="#0B3D2E"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <path
              d="M150 180 Q 450 300 850 180"
              stroke="#0B3D2E"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Connected Nodes: USA (250, 180), India (700, 240), Bangladesh (740, 230) */}
            <circle cx="250" cy="180" r="8" fill="#1F7A53" />
            <circle cx="700" cy="240" r="8" fill="#1F7A53" />
            <circle cx="740" cy="230" r="8" fill="#1F7A53" />
            {/* Connection Arcs */}
            <path
              d="M250 180 Q 475 100 700 240"
              stroke="#1F7A53"
              strokeWidth="2"
            />
            <path
              d="M700 240 L 740 230"
              stroke="#1F7A53"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                Worldwide Operations
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D2E] mb-3">
                Global Presence
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
                Supporting customers worldwide through regional offices and local agricultural domain expertise.
              </p>
            </div>
          </Reveal>

          {/* Premium Office Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {OFFICES.map((office, i) => (
              <Reveal key={office.country} delay={i * 0.1}>
                <div className="relative bg-gradient-to-br from-white via-white to-emerald-50/30 rounded-3xl border border-gray-200/80 p-7 h-full shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 hover:ring-2 hover:ring-[#1F7A53]/10 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
                  {/* Decorative Globe Watermark */}
                  <Globe className="absolute -right-6 -top-6 w-28 h-28 text-emerald-900/[0.04] pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl drop-shadow-xs">{office.flag}</span>
                        <div>
                          <h3 className="text-lg font-bold text-[#0B3D2E] group-hover:text-[#1F7A53] transition-colors">
                            {office.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#1F7A53] tracking-wide">
                            {office.type}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Address with Location Icon */}
                    <div className="flex items-start gap-3 mb-6 bg-white/80 p-3.5 rounded-2xl border border-gray-100">
                      <MapPin className="w-4 h-4 text-[#1F7A53] mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                        {office.address.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2.5 mb-6">
                      <a
                        href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-semibold hover:text-[#1F7A53] transition-colors"
                      >
                        <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        Tel: {office.phone}
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 hover:text-[#1F7A53] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Google Maps Button */}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-[#0B3D2E] hover:bg-[#EAF5EE] hover:border-[#1F7A53]/30 transition-all duration-200 group/btn shadow-2xs"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1F7A53]" />
                      View on Google Maps
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Slim Horizontal Global Info Bar */}
          <Reveal delay={0.3}>
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4 sm:p-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="flex items-center justify-center sm:justify-start gap-3 px-3">
                  <span className="text-xl">🌎</span>
                  <div>
                    <p className="text-xs font-bold text-[#0B3D2E]">Global Support</p>
                    <p className="text-[11px] text-gray-500">24/7 Enterprise Assistance</p>
                  </div>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3 px-3 pt-3 sm:pt-0">
                  <span className="text-xl">🕒</span>
                  <div>
                    <p className="text-xs font-bold text-[#0B3D2E]">Regional Business Hours</p>
                    <p className="text-[11px] text-gray-500">US, APAC & EMEA Timezones</p>
                  </div>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3 px-3 pt-3 lg:pt-0">
                  <span className="text-xl">🌐</span>
                  <div>
                    <p className="text-xs font-bold text-[#0B3D2E]">Remote Demonstrations</p>
                    <p className="text-[11px] text-gray-500">Personalized Live Walkthroughs</p>
                  </div>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3 px-3 pt-3 lg:pt-0">
                  <span className="text-xl">🤝</span>
                  <div>
                    <p className="text-xs font-bold text-[#0B3D2E]">Worldwide Delivery</p>
                    <p className="text-[11px] text-gray-500">Deployments across 44+ Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 5 – TRUST METRICS
          ═════════════════════════════════════════════════ */}
      <section className="bg-[#FAFDF8] py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D2E] text-center mb-14">
              Why Leading Organizations Choose SourceTrace
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] mb-2 tracking-tight">
                    <Counter
                      to={m.value}
                      suffix={m.suffix}
                      duration={2.2}
                    />
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 6 – CUSTOMER LOGOS MARQUEE
          ═════════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Reveal>
            <p className="text-center text-xs font-extrabold tracking-[0.15em] text-[#0B3D2E]/50 uppercase">
              Trusted by Governments, Enterprises, Cooperatives and Global
              Supply Chains
            </p>
          </Reveal>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className="flex w-max animate-marquee"
            style={{ animationDuration: "90s" }}
          >
            {[0, 1].map((track) => (
              <div
                key={track}
                className="flex gap-10 sm:gap-16 whitespace-nowrap shrink-0 pr-10 sm:pr-16"
              >
                {repeatedLogos.map((logo, idx) => (
                  <span
                    key={`t${track}-${idx}`}
                    style={
                      { "--hover-color": logo.color } as React.CSSProperties
                    }
                    className={`text-sm sm:text-base font-black text-[#0B3D2E]/20 tracking-wider uppercase transition-all duration-300 hover:text-[var(--hover-color)] hover:scale-105 cursor-pointer select-none ${logo.font}`}
                  >
                    {logo.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 7 – REDESIGNED FAQ (ENTERPRISE ACCORDIONS)
          ═════════════════════════════════════════════════ */}
      <section className="bg-gray-50/70 py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                Clear Answers
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D2E] mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Everything you need to know about partnering with SourceTrace.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              const Icon = faq.icon;

              return (
                <Reveal key={faq.q} delay={i * 0.05}>
                  <div
                    className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white ${
                      isOpen
                        ? "border-[#1F7A53]/40 shadow-md ring-2 ring-[#53D769]/10"
                        : "border-gray-200/80 shadow-2xs hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5 pr-4">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            isOpen
                              ? "bg-[#0B3D2E] text-[#53D769]"
                              : "bg-[#EAF5EE] text-[#1F7A53] group-hover:bg-emerald-100"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-base font-bold text-[#0B3D2E]">
                          {faq.q}
                        </span>
                      </div>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors group-hover:bg-gray-200">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#1F7A53]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 pl-16">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 8 – REDESIGNED BOTTOM CONTACT BANNER (LIGHT GREEN THEME)
          ═════════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-[#EAF5EE] via-[#F2FAF4] to-[#EAF5EE] border border-[#1F7A53]/20 p-8 sm:p-12 lg:p-14 shadow-xl overflow-hidden text-[#0B3D2E]">
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#53D769]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#1F7A53]/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Text & Contact Info */}
                <div className="lg:col-span-8">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F7A53]/10 text-[#1F7A53] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#1F7A53]/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    Get Started Today
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 text-[#0B3D2E]">
                    Ready to Discuss Your Project?
                  </h2>
                  <p className="text-[#1F5946] text-sm sm:text-base mb-8 max-w-xl leading-relaxed">
                    Our specialists are available to understand your requirements
                    and recommend the right solution for your organization.
                  </p>

                  {/* 3 Compact Contact Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {/* Call Us */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#1F7A53]/15 shadow-2xs">
                      <p className="font-bold text-[#1F7A53] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        Call Us
                      </p>
                      <div className="space-y-1 text-gray-700 font-semibold">
                        <a href="tel:+146945506904" className="block hover:text-[#1F7A53] transition-colors">
                          🇺🇸 +1-469-4550-6904
                        </a>
                        <a href="tel:+919087339911" className="block hover:text-[#1F7A53] transition-colors">
                          🇮🇳 +91-9087339911
                        </a>
                        <a href="tel:+8801713105261" className="block hover:text-[#1F7A53] transition-colors">
                          🇧🇩 +880-1713105261
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#1F7A53]/15 shadow-2xs">
                      <p className="font-bold text-[#1F7A53] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </p>
                      <a
                        href="mailto:info@sourcetrace.com"
                        className="text-gray-700 font-semibold hover:text-[#1F7A53] transition-colors block truncate"
                      >
                        info@sourcetrace.com
                      </a>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#1F7A53]/15 shadow-2xs">
                      <p className="font-bold text-[#1F7A53] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Business Hours
                      </p>
                      <p className="text-gray-700 font-semibold">Monday–Friday</p>
                      <p className="text-gray-500 text-[11px]">
                        Regional Office Hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center gap-3 px-8 py-5 rounded-full bg-[#0B3D2E] text-white text-base font-extrabold hover:bg-[#125c44] transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-[0.98] cursor-pointer shadow-lg"
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#53D769]" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
