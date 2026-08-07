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
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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
    label: "Corporate Headquarters",
    address: [
      "245 First St",
      "Suite 1800",
      "Cambridge",
      "Massachusetts 02142",
      "USA",
    ],
    phone: "+1 978-394-5962",
    email: "info@sourcetrace.com",
    mapUrl:
      "https://www.google.com/maps/search/245+First+St+Suite+1800+Cambridge+MA+02142",
  },
  {
    flag: "🇮🇳",
    country: "India",
    label: "Technology & Operations",
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
    label: "South Asia Operations",
    address: [
      "77/A (4th Floor)",
      "03, F Block",
      "Banani",
      "Dhaka 1213",
      "Bangladesh",
    ],
    phone: "+880 1713105261",
    email: "info@sourcetrace.com",
    mapUrl:
      "https://www.google.com/maps/search/77A+F+Block+Banani+Dhaka+1213",
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
    q: "How quickly can we schedule a demo?",
    a: "We typically schedule demos within 2–3 business days of your request. Our team will reach out to confirm a time that works best for your schedule.",
  },
  {
    q: "Do you work globally?",
    a: "Yes, SourceTrace operates across 44+ countries with regional offices in the USA, India, and Bangladesh. We support customers worldwide through local expertise and regional implementation teams.",
  },
  {
    q: "Can SourceTrace integrate with our ERP?",
    a: "Absolutely. We offer native connectors for SAP, Oracle, Microsoft Dynamics 365, and custom REST API integrations. Our platform is designed to fit seamlessly into your existing technology ecosystem.",
  },
  {
    q: "Do you provide implementation support?",
    a: "Yes, we provide end-to-end implementation, onboarding, training, and ongoing customer success support. Every deployment includes a dedicated project manager.",
  },
  {
    q: "Can you customize solutions?",
    a: "Every deployment is tailored to your specific supply chain, commodities, and compliance requirements. We work closely with your team to configure the platform to your exact needs.",
  },
  {
    q: "How long does deployment take?",
    a: "Typical deployments range from 4–12 weeks depending on scope and complexity. We follow a phased approach to ensure smooth rollouts with minimal disruption.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   FORM INPUT COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

const inputCls =
  "w-full bg-white border border-gray-200 rounded-xl h-12 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#1F7A53] focus:ring-2 focus:ring-[#53D769]/20 transition-all duration-200";
const selectCls =
  "w-full bg-white border border-gray-200 rounded-xl h-12 px-4 text-sm text-gray-900 outline-none focus:border-[#1F7A53] focus:ring-2 focus:ring-[#53D769]/20 transition-all duration-200 appearance-none cursor-pointer";
const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

/* ═══════════════════════════════════════════════════════════════
   FAQ ITEM
   ═══════════════════════════════════════════════════════════════ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-md bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-[#0B3D2E] pr-4">
          {q}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors duration-200 group-hover:bg-gray-200">
          {open ? (
            <ChevronUp className="w-4 h-4 text-[#1F7A53]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    }, 2000);
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
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF5EE] text-[#1F7A53] text-xs font-semibold tracking-wide uppercase mb-6">
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
                <div className="flex flex-wrap gap-3 mb-10">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B3D2E] text-white text-sm font-semibold hover:bg-[#125c44] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] cursor-pointer"
                  >
                    Book a Demo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0B3D2E] text-[#0B3D2E] text-sm font-semibold hover:bg-[#0B3D2E] hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Talk to Sales
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div className="absolute -inset-4 bg-gradient-to-br from-[#53D769]/10 to-[#0B3D2E]/5 rounded-3xl blur-2xl" />
                <img
                  src="/images/contact-sales-hero.jpg"
                  alt="Global agricultural supply chain intelligence — connecting farms, satellites, and enterprise dashboards"
                  className="relative w-full rounded-2xl shadow-2xl border border-gray-100"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 2 – CONTACT FORM
          ═════════════════════════════════════════════════ */}
      <section ref={formRef} id="contact-form" className="bg-gray-50 py-16 sm:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Info */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D2E] mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Fill out the form and our enterprise sales team will reach out
                  to discuss your needs and schedule a personalized
                  demonstration.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="space-y-5">
                  {[
                    {
                      icon: Shield,
                      title: "Secure & Confidential",
                      desc: "Your information is protected with enterprise-grade encryption.",
                    },
                    {
                      icon: Clock,
                      title: "Quick Response",
                      desc: "Expect a reply within 24 business hours from our team.",
                    },
                    {
                      icon: Award,
                      title: "No Obligation",
                      desc: "Free consultation with no commitment required.",
                    },
                    {
                      icon: Building2,
                      title: "Enterprise Ready",
                      desc: "Solutions scaled for organizations of every size.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#1F7A53]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0B3D2E]">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — Form Card */}
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      /* ── Success State ── */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
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
                            delay: 0.2,
                          }}
                          className="w-20 h-20 rounded-full bg-[#EAF5EE] flex items-center justify-center mx-auto mb-6"
                        >
                          <CheckCircle2 className="w-10 h-10 text-[#1F7A53]" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-[#0B3D2E] mb-3">
                          Thank You!
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Your consultation request has been received. Our
                          enterprise sales team will reach out within 24
                          business hours to schedule your personalized
                          demonstration.
                        </p>
                      </motion.div>
                    ) : (
                      /* ── Form ── */
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="firstName" className={labelCls}>
                              First Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="John"
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className={labelCls}>
                              Last Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Doe"
                              className={inputCls}
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className={labelCls}>
                            Business Email{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className={inputCls}
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className={labelCls}>
                            Phone Number
                          </label>
                          <div className="flex gap-2">
                            <select
                              name="phoneCode"
                              value={formData.phoneCode}
                              onChange={handleChange}
                              className={`${selectCls} !w-28 flex-shrink-0`}
                            >
                              {PHONE_CODES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.code} {c.country}
                                </option>
                              ))}
                            </select>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="978-394-5962"
                              className={inputCls}
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div>
                          <label htmlFor="company" className={labelCls}>
                            Company <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company name"
                            className={inputCls}
                          />
                        </div>

                        {/* Country & Industry */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="country" className={labelCls}>
                              Country <span className="text-red-400">*</span>
                            </label>
                            <select
                              id="country"
                              name="country"
                              required
                              value={formData.country}
                              onChange={handleChange}
                              className={selectCls}
                            >
                              <option value="">Select country</option>
                              {COUNTRIES.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="industry" className={labelCls}>
                              Industry
                            </label>
                            <select
                              id="industry"
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              className={selectCls}
                            >
                              <option value="">Select industry</option>
                              {INDUSTRIES.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Company Size & Interest */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="companySize" className={labelCls}>
                              Company Size
                            </label>
                            <select
                              id="companySize"
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleChange}
                              className={selectCls}
                            >
                              <option value="">Select size</option>
                              {COMPANY_SIZES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="interest" className={labelCls}>
                              Area of Interest{" "}
                              <span className="text-red-400">*</span>
                            </label>
                            <select
                              id="interest"
                              name="interest"
                              required
                              value={formData.interest}
                              onChange={handleChange}
                              className={selectCls}
                            >
                              <option value="">Select area</option>
                              {AREAS_OF_INTEREST.map((a) => (
                                <option key={a} value={a}>
                                  {a}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className={labelCls}>
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your goals and requirements..."
                            className={`${inputCls} !h-auto py-3 resize-none`}
                          />
                        </div>

                        {/* Privacy */}
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            name="privacyAgreed"
                            checked={formData.privacyAgreed}
                            onChange={handleChange}
                            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1F7A53] focus:ring-[#53D769] cursor-pointer"
                          />
                          <span className="text-sm text-gray-500">
                            I agree to the{" "}
                            <Link
                              href="/legal/privacy"
                              className="text-[#1F7A53] hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </span>
                        </label>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.privacyAgreed}
                          className="w-full h-14 rounded-2xl bg-[#0B3D2E] text-white text-base font-semibold hover:bg-[#125c44] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
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
                              Submitting...
                            </>
                          ) : (
                            <>
                              Request Consultation
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        {/* Response time */}
                        <p className="text-center text-xs text-gray-400 pt-1">
                          <Clock className="w-3 h-3 inline mr-1 relative -top-px" />
                          Typical response time:{" "}
                          <span className="font-medium text-gray-500">
                            Within 24 Business Hours
                          </span>
                        </p>
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
          SECTION 3 – WHY CONTACT
          ═════════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D2E] mb-4">
                Why Contact SourceTrace
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how our enterprise team delivers measurable value at
                every stage of your journey.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="bg-white border border-gray-100 rounded-2xl p-7 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5EE] flex items-center justify-center mb-5 group-hover:bg-[#0B3D2E] transition-colors duration-300">
                    <card.icon className="w-6 h-6 text-[#1F7A53] group-hover:text-white transition-colors duration-300" />
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
          SECTION 4 – GLOBAL OFFICES
          ═════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D2E] mb-4">
                Global Presence
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Supporting customers worldwide through regional offices and
                local expertise.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {OFFICES.map((office, i) => (
              <Reveal key={office.country} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-gray-100 p-7 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{office.flag}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#0B3D2E]">
                        {office.country}
                      </h3>
                      <p className="text-xs text-[#1F7A53] font-medium">
                        {office.label}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 mb-5">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {office.address.join(", ")}
                    </p>
                  </div>

                  {/* Contact Links */}
                  <div className="space-y-2.5 mb-6">
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#1F7A53] transition-colors"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      {office.phone}
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#1F7A53] transition-colors"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      {office.email}
                    </a>
                  </div>

                  {/* Map Button */}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#0B3D2E] hover:bg-[#EAF5EE] hover:border-[#1F7A53]/20 transition-all duration-200 group-hover:border-[#1F7A53]/30"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on Google Maps
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 5 – TRUST METRICS
          ═════════════════════════════════════════════════ */}
      <section className="bg-[#FAFDF8] py-16 sm:py-24">
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
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] mb-2">
                    <Counter
                      to={m.value}
                      suffix={m.suffix}
                      duration={2.5}
                    />
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 6 – CUSTOMER LOGOS
          ═════════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <Reveal>
            <p className="text-center text-xs font-extrabold tracking-[0.15em] text-[#0B3D2E]/50 uppercase">
              Trusted by Governments, Enterprises, Cooperatives and Global
              Supply Chains
            </p>
          </Reveal>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Gradient edges */}
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
          SECTION 7 – FAQ
          ═════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3D2E] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Everything you need to know about working with SourceTrace.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.06}>
                <FaqItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          FOOTER CONTACT BAR
          ═════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            {/* Phones */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Phone
              </p>
              <div className="space-y-1">
                <a
                  href="tel:+19783945962"
                  className="block text-sm text-gray-600 hover:text-[#1F7A53] transition-colors"
                >
                  🇺🇸 +1-978-394-5962
                </a>
                <a
                  href="tel:+919087339911"
                  className="block text-sm text-gray-600 hover:text-[#1F7A53] transition-colors"
                >
                  🇮🇳 +91-9087339911
                </a>
                <a
                  href="tel:+8801713105261"
                  className="block text-sm text-gray-600 hover:text-[#1F7A53] transition-colors"
                >
                  🇧🇩 +880-1713105261
                </a>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Email
              </p>
              <a
                href="mailto:info@sourcetrace.com"
                className="text-sm text-gray-600 hover:text-[#1F7A53] transition-colors"
              >
                info@sourcetrace.com
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Business Hours
              </p>
              <p className="text-sm text-gray-600">Monday–Friday</p>
              <p className="text-sm text-gray-500">
                9:00 AM–6:00 PM (Regional)
              </p>
            </div>

            {/* Quick Action */}
            <div className="flex items-center justify-center sm:justify-end">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B3D2E] text-white text-sm font-semibold hover:bg-[#125c44] transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Contact Us Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 8 – FINAL CTA
          ═════════════════════════════════════════════════ */}
      <section className="relative bg-[#EAF5EE] py-20 sm:py-28 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#53D769]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#53D769]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] tracking-tight mb-5">
              Ready to Transform Your Agricultural Supply Chain?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-[#1F5946] mb-10 max-w-xl mx-auto">
              Let&rsquo;s discuss your goals and build a solution tailored to
              your organization.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0B3D2E] text-white text-base font-semibold hover:bg-[#125c44] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] cursor-pointer"
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#0B3D2E] text-[#0B3D2E] text-base font-semibold hover:bg-[#0B3D2E] hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
