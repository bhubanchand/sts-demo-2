"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Handshake,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  Headphones,
  ShoppingBag,
  Newspaper,
  Users,
  LifeBuoy,
  FileText,
  BookOpen,
  Award,
  Send,
  Globe,
  ShieldCheck,
  Check,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL WRAPPER
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
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA STRUCTURES
   ═══════════════════════════════════════════════════════════════ */

interface Office {
  country: string;
  flag: string;
  type: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapsUrl: string;
}

const GLOBAL_OFFICES: Office[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    type: "Global Headquarters",
    image: "/images/contact-sales-hero.jpg",
    address: "Dallas / Texas, USA",
    phone: "+1-469-4550-6904",
    email: "usa@sourcetrace.com",
    hours: "Mon – Fri: 8:30 AM – 5:30 PM CST",
    mapsUrl: "https://maps.google.com/?q=Dallas+Texas",
  },
  {
    country: "India",
    flag: "🇮🇳",
    type: "Asia-Pacific Innovation Center",
    image: "/images/grain_silos_1780769310206.png",
    address: '"PAVAN PLAZA", D. No.22/3, Puliyakulam Road, Coimbatore 641045, Tamil Nadu, India',
    phone: "+91-9087339911",
    email: "india@sourcetrace.com",
    hours: "Mon – Fri: 9:00 AM – 6:00 PM IST",
    mapsUrl: "https://maps.google.com/?q=Puliyakulam+Road+Coimbatore+Tamil+Nadu+India",
  },
  {
    country: "Bangladesh",
    flag: "🇧🇩",
    type: "Regional Operations Hub",
    image: "/images/rice_terraces_1780769098706.png",
    address: "Road No-02, House-24/A, Apartment-4C, Banani DoHS, Dhaka-1206, Bangladesh",
    phone: "+880-1713105261",
    email: "bangladesh@sourcetrace.com",
    hours: "Mon – Fri: 9:00 AM – 6:00 PM BST",
    mapsUrl: "https://maps.google.com/?q=Banani+DOHS+Dhaka+Bangladesh",
  },
];

const DEPARTMENT_DIRECTORY = [
  {
    icon: ShoppingBag,
    name: "Sales",
    email: "sales@sourcetrace.com",
    desc: "New inquiries & enterprise demo requests",
  },
  {
    icon: Headphones,
    name: "Customer Success",
    email: "support@sourcetrace.com",
    desc: "Platform onboarding & technical support",
  },
  {
    icon: Handshake,
    name: "Partnerships",
    email: "partners@sourcetrace.com",
    desc: "System integrators & channel alliance programs",
  },
  {
    icon: Newspaper,
    name: "Media & PR",
    email: "media@sourcetrace.com",
    desc: "Press releases, brand assets & media inquiries",
  },
  {
    icon: Users,
    name: "Careers",
    email: "careers@sourcetrace.com",
    desc: "Join our global team of ag-tech visionaries",
  },
];

const HELPFUL_RESOURCES = [
  {
    icon: LifeBuoy,
    title: "Customer Support",
    desc: "Get technical assistance, submit support tickets, and contact our expert engineers.",
    buttonText: "Visit Help Center",
    href: "/contact-sales",
  },
  {
    icon: FileText,
    title: "Documentation",
    desc: "Explore developer APIs, platform integration guides, and security whitepapers.",
    buttonText: "Read Documentation",
    href: "/compliance/eudr",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    desc: "Browse comprehensive articles, FAQs, and step-by-step feature walkthroughs.",
    buttonText: "Browse Knowledge Base",
    href: "/compliance/eudr/solutions",
  },
  {
    icon: Award,
    title: "Case Studies",
    desc: "Discover how Fortune 500 brands achieve EUDR compliance and Scope 3 transparency.",
    buttonText: "Read Case Studies",
    href: "/company/meet-the-team",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "Sales",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const scrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToOffices = () => {
    const el = document.getElementById("global-offices-section");
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ═════════════════════════════════════════════════
          SECTION 1 – HERO SECTION
          ═════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-b from-[#FAFDF8] via-white to-white pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-gray-100 overflow-hidden">
        {/* Subtle World Map Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0B3D2E_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF5EE] text-[#1F7A53] text-xs font-extrabold uppercase tracking-wider mb-6 border border-[#1F7A53]/20 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                GLOBAL CONNECTIVITY
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3D2E] tracking-tight mb-6 leading-[1.12]">
                We&apos;re Here to Help
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Whether you&apos;re a customer, partner, supplier, media representative, or simply want to learn more about SourceTrace, we&apos;ll connect you with the right team.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact-sales"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0B3D2E] text-white text-sm font-extrabold hover:bg-[#125c44] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  Contact Sales
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#53D769]" />
                </Link>

                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-[#0B3D2E] text-[#0B3D2E] text-sm font-extrabold hover:bg-[#0B3D2E] hover:text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  Support Center
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 2 – CONTACT OPTIONS (4 PREMIUM CARDS)
          ═════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Card 1: Call Us */}
            <Reveal delay={0.05}>
              <div className="group bg-gradient-to-br from-white via-white to-[#EAF5EE]/40 rounded-[24px] border border-gray-200 p-7 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center mb-5 group-hover:bg-[#0B3D2E] group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B3D2E] mb-2">
                    Call Us
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Speak directly with our regional teams for immediate inquiries and regional assistance.
                  </p>
                </div>
                <button
                  onClick={scrollToOffices}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1F7A53] group-hover:text-[#0B3D2E] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Phone Numbers
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Card 2: Email Us */}
            <Reveal delay={0.1}>
              <div className="group bg-gradient-to-br from-white via-white to-[#EAF5EE]/40 rounded-[24px] border border-gray-200 p-7 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center mb-5 group-hover:bg-[#0B3D2E] group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B3D2E] mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Send us an email query and our specialists will respond within 24 business hours.
                  </p>
                </div>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1F7A53] group-hover:text-[#0B3D2E] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send an Email
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Card 3: Visit an Office */}
            <Reveal delay={0.15}>
              <div className="group bg-gradient-to-br from-white via-white to-[#EAF5EE]/40 rounded-[24px] border border-gray-200 p-7 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center mb-5 group-hover:bg-[#0B3D2E] group-hover:text-white transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B3D2E] mb-2">
                    Visit an Office
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Connect with our regional offices across North America, India, and Bangladesh.
                  </p>
                </div>
                <button
                  onClick={scrollToOffices}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1F7A53] group-hover:text-[#0B3D2E] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Global Offices
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Card 4: Partnerships */}
            <Reveal delay={0.2}>
              <div className="group bg-gradient-to-br from-white via-white to-[#EAF5EE]/40 rounded-[24px] border border-gray-200 p-7 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center mb-5 group-hover:bg-[#0B3D2E] group-hover:text-white transition-colors">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B3D2E] mb-2">
                    Partnerships
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Explore strategic technology, channel, and implementation partner programs.
                  </p>
                </div>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1F7A53] group-hover:text-[#0B3D2E] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 3 – GLOBAL OFFICES
          ═════════════════════════════════════════════════ */}
      <section
        id="global-offices-section"
        className="py-20 sm:py-28 bg-gray-50/70 border-y border-gray-100 scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                GLOBAL PRESENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight mb-4">
                Our Regional Locations
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                SourceTrace operates across major global agriculture centers to support clients, supply chains, and field teams worldwide.
              </p>
            </div>
          </Reveal>

          {/* Responsive Office Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {GLOBAL_OFFICES.map((office, idx) => (
              <Reveal key={office.country} delay={idx * 0.1}>
                <div className="group bg-white rounded-[24px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#1F7A53]/40 transition-all duration-300 flex flex-col justify-between h-full">
                  {/* Office Image Banner */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={office.image}
                      alt={`${office.country} Office`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="text-2xl drop-shadow-md">{office.flag}</span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0B3D2E] text-xs font-extrabold shadow-sm">
                        {office.type}
                      </span>
                    </div>
                  </div>

                  {/* Office Info */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div className="space-y-4 mb-6">
                      <h3 className="text-2xl font-extrabold text-[#0B3D2E] group-hover:text-[#1F7A53] transition-colors">
                        {office.country}
                      </h3>

                      <div className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[#1F7A53] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{office.address}</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-[#1F7A53] flex-shrink-0" />
                          <a href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-[#1F7A53] font-semibold transition-colors">
                            {office.phone}
                          </a>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-[#1F7A53] flex-shrink-0" />
                          <a href={`mailto:${office.email}`} className="hover:text-[#1F7A53] font-semibold transition-colors">
                            {office.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-2.5 text-gray-500">
                          <Clock className="w-4 h-4 text-[#1F7A53] flex-shrink-0" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 hover:bg-[#EAF5EE] text-[#0B3D2E] hover:text-[#1F7A53] text-xs font-extrabold border border-gray-200 hover:border-[#1F7A53]/30 transition-all cursor-pointer"
                    >
                      View on Google Maps
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 4 – DEPARTMENT DIRECTORY
          ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                DIRECT CONTACT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight">
                Department Directory
              </h2>
            </div>
          </Reveal>

          {/* 5 Small Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {DEPARTMENT_DIRECTORY.map((dept, idx) => {
              const IconComp = dept.icon;
              return (
                <Reveal key={dept.name} delay={idx * 0.06}>
                  <div className="bg-white rounded-[20px] border border-gray-200/90 p-5 shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-[#1F7A53]/30 transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center mb-4">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-[#0B3D2E] text-base mb-1">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4 min-h-[32px]">
                        {dept.desc}
                      </p>
                    </div>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-xs font-bold text-[#1F7A53] hover:underline block truncate"
                    >
                      {dept.email}
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 5 – SIMPLE CONTACT FORM
          ═════════════════════════════════════════════════ */}
      <section
        id="contact-form-section"
        className="py-20 sm:py-28 bg-white scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                  SEND A MESSAGE
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight mb-3">
                  How Can We Assist You?
                </h2>
                <p className="text-gray-600 text-base">
                  Fill out the form below and our regional specialists will get in touch with you promptly.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-white rounded-[28px] border border-gray-200 p-8 sm:p-12 shadow-xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#0B3D2E]">
                        Message Sent Successfully
                      </h3>
                      <p className="text-gray-600 text-sm max-w-md mx-auto">
                        Thank you for contacting SourceTrace. Our team has received your message and will respond within 1 business day.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 px-6 py-2.5 rounded-full bg-[#0B3D2E] text-white text-xs font-bold hover:bg-[#125c44] transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#1F7A53]/30 focus:border-[#1F7A53] transition-all bg-gray-50/50"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#1F7A53]/30 focus:border-[#1F7A53] transition-all bg-gray-50/50"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Department */}
                        <div>
                          <label className="block text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2">
                            Department <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.department}
                            onChange={(e) =>
                              setFormData({ ...formData, department: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#1F7A53]/30 focus:border-[#1F7A53] transition-all bg-gray-50/50 cursor-pointer"
                          >
                            <option value="Sales">Sales</option>
                            <option value="Customer Success">Customer Success</option>
                            <option value="Partnerships">Partnerships</option>
                            <option value="Media">Media & PR</option>
                            <option value="Careers">Careers</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </select>
                        </div>

                        {/* Subject */}
                        <div>
                          <label className="block text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="How can we help?"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({ ...formData, subject: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#1F7A53]/30 focus:border-[#1F7A53] transition-all bg-gray-50/50"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Please provide details about your inquiry..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#1F7A53]/30 focus:border-[#1F7A53] transition-all bg-gray-50/50 resize-y"
                        />
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl bg-[#0B3D2E] text-white text-sm font-extrabold hover:bg-[#125c44] transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <span>Sending Message...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-[#53D769]" />
                              Send Message
                            </>
                          )}
                        </button>
                      </div>

                      {/* Notice */}
                      <p className="text-center text-xs text-gray-500 font-medium pt-2">
                        Average response time: <span className="text-[#0B3D2E] font-bold">Within 1 business day</span>
                      </p>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 6 – BUSINESS HOURS
          ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                REGIONAL SCHEDULES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight mb-3">
                Business Hours Across Timezones
              </h2>
              <p className="text-gray-600 text-base">
                Our global operations run seamlessly across US, European, and Asian business hours to provide round-the-clock continuity.
              </p>
            </div>
          </Reveal>

          {/* Timeline Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#1F7A53] text-[11px] font-extrabold">
                    North America
                  </span>
                </div>
                <h3 className="font-extrabold text-[#0B3D2E] text-lg mb-1">
                  Dallas, TX (CST)
                </h3>
                <p className="text-xs text-gray-500 mb-4">Central Standard Time</p>
                <div className="pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-700 font-semibold">
                  <p>Monday – Friday: 8:30 AM – 5:30 PM</p>
                  <p className="text-gray-400 font-normal">Saturday – Sunday: Closed</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🇮🇳</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#1F7A53] text-[11px] font-extrabold">
                    Asia-Pacific
                  </span>
                </div>
                <h3 className="font-extrabold text-[#0B3D2E] text-lg mb-1">
                  Coimbatore (IST)
                </h3>
                <p className="text-xs text-gray-500 mb-4">Indian Standard Time</p>
                <div className="pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-700 font-semibold">
                  <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p className="text-gray-400 font-normal">Saturday – Sunday: Closed</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">🇧🇩</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#1F7A53] text-[11px] font-extrabold">
                    South Asia Hub
                  </span>
                </div>
                <h3 className="font-extrabold text-[#0B3D2E] text-lg mb-1">
                  Dhaka (BST)
                </h3>
                <p className="text-xs text-gray-500 mb-4">Bangladesh Standard Time</p>
                <div className="pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-700 font-semibold">
                  <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p className="text-gray-400 font-normal">Saturday – Sunday: Closed</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 7 – GLOBAL PRESENCE (INTERACTIVE MAP GRAPHIC)
          ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                WORLDWIDE REACH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight mb-3">
                Global Operating Network
              </h2>
              <p className="text-gray-600 text-base">
                Active deployments across 44+ countries supporting farmers, cooperatives, exporters, and enterprise processors.
              </p>
            </div>
          </Reveal>

          {/* Interactive Graphic Card */}
          <Reveal delay={0.15}>
            <div className="relative bg-gradient-to-br from-[#0B3D2E] via-[#125c44] to-[#0B3D2E] rounded-[32px] p-8 sm:p-14 text-white shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#53D769]/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#53D769] text-xs font-bold border border-white/10">
                    <Globe className="w-3.5 h-3.5" />
                    CONNECTED VALUE CHAINS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Digitizing Agriculture Across 44+ Nations
                  </h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    SourceTrace&apos;s cloud infrastructure connects field managers in Latin America, West Africa, South Asia, and Southeast Asia directly with enterprise compliance dashboards in Europe and North America.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <p className="text-2xl font-extrabold text-[#53D769]">44+</p>
                      <p className="text-emerald-100 font-medium">Countries Operating</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <p className="text-2xl font-extrabold text-[#53D769]">100%</p>
                      <p className="text-emerald-100 font-medium">EUDR & ESG Audit Ready</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="relative w-full max-w-md h-64 sm:h-80 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#53D769]">OPERATIONAL NODES</p>
                        <p className="text-sm font-semibold text-white">Live Data Synchronization</p>
                      </div>
                      <span className="w-3 h-3 rounded-full bg-[#53D769] animate-ping" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs bg-white/10 p-2.5 rounded-xl">
                        <span>🇺🇸 Dallas (Americas Hub)</span>
                        <span className="text-[#53D769] font-bold">Online</span>
                      </div>
                      <div className="flex items-center justify-between text-xs bg-white/10 p-2.5 rounded-xl">
                        <span>🇮🇳 Coimbatore (APAC Hub)</span>
                        <span className="text-[#53D769] font-bold">Online</span>
                      </div>
                      <div className="flex items-center justify-between text-xs bg-white/10 p-2.5 rounded-xl">
                        <span>🇧🇩 Dhaka (South Asia Hub)</span>
                        <span className="text-[#53D769] font-bold">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 8 – HELPFUL RESOURCES (4 RESOURCE CARDS)
          ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold text-[#1F7A53] uppercase tracking-wider mb-2 block">
                SELF SERVICE & KNOWLEDGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] tracking-tight">
                Helpful Resources
              </h2>
            </div>
          </Reveal>

          {/* 4 Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HELPFUL_RESOURCES.map((res, idx) => {
              const IconComp = res.icon;
              return (
                <Reveal key={res.title} delay={idx * 0.08}>
                  <div className="group bg-white rounded-[24px] border border-gray-200 p-6 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1F7A53]/30 transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#EAF5EE] text-[#1F7A53] flex items-center justify-center mb-5 group-hover:bg-[#0B3D2E] group-hover:text-white transition-colors">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#0B3D2E] mb-2">
                        {res.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {res.desc}
                      </p>
                    </div>

                    <Link
                      href={res.href}
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1F7A53] group-hover:text-[#0B3D2E] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {res.buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          SECTION 9 – BOTTOM SOFT GREEN CTA
          ═════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="relative rounded-[32px] bg-gradient-to-br from-[#EAF5EE] via-[#F2FAF4] to-[#EAF5EE] border border-[#1F7A53]/25 p-8 sm:p-14 shadow-2xl overflow-hidden text-center max-w-5xl mx-auto">
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F7A53]/10 text-[#1F7A53] text-xs font-extrabold uppercase tracking-wider mb-5 border border-[#1F7A53]/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  ENTERPRISE AG-TECH
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D2E] tracking-tight mb-4">
                  Looking for an Enterprise Solution?
                </h2>

                <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                  Talk directly with our sales specialists to discover how SourceTrace can help your organization build transparent, compliant, and sustainable agricultural supply chains.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact-sales"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0B3D2E] text-white text-base font-extrabold hover:bg-[#125c44] transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-[0.98] cursor-pointer shadow-lg"
                  >
                    Contact Sales
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#53D769]" />
                  </Link>

                  <Link
                    href="/contact-sales"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white border-2 border-[#0B3D2E] text-[#0B3D2E] text-base font-extrabold hover:bg-[#0B3D2E] hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
                  >
                    Book a Demo
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
