"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, Clock, MapPin, Send, CheckCircle2, AlertTriangle, 
  HelpCircle, Sprout, ArrowRight, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_INFO = [
  { icon: Phone, title: "Call Us Direct", detail: "+1 (800) 555-TRACE", sub: "Mon-Fri, 9am - 6pm EST" },
  { icon: Mail, title: "Email Sourcing Desk", detail: "sourcing@sourcetrace.com", sub: "Under 24 hour response guaranteed" },
  { icon: MapPin, title: "Global Head Office", detail: "Boston, MA, United States", sub: "Enterprise solutions & field deployment" }
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("General Sourcing & Compliance");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          sourcingInterest: interest,
          message,
          type: "contact"
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
        // Reset fields
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-gradient-to-b from-white via-[#F4FBF7] to-[#EBF7F0] pb-24 text-slate-800">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Marketing Info */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#1F7A53] text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-[#1F7A53]" />
              Connect With Us
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0B3D2E] leading-none">
              Let's Build Trust Together.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Have questions about EUDR compliance, offline-first grower scales, or direct grower payouts? Connect with our global value chain experts.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {CONTACT_INFO.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="flex gap-4 p-5 bg-white border border-emerald-50 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#1F7A53] flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-xs">
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">{item.title}</h4>
                    <span className="text-slate-600 font-semibold block text-sm">{item.detail}</span>
                    <span className="text-gray-400 text-[10px] block mt-0.5">{item.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-emerald-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#53D769]/5 rounded-full blur-3xl pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 space-y-6 font-mono"
                >
                  <CheckCircle2 className="w-16 h-16 text-[#53D769] mx-auto animate-bounce" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#0B3D2E]">Message Transmitted Successfully</h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been logged and sent directly to our team at <span className="font-bold text-[#1F7A53]">bhuban@chand.co.in</span>.
                    </p>
                  </div>

                  {previewUrl && (
                    <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-xs max-w-md mx-auto text-left space-y-3">
                      <span className="text-[#1F7A53] font-bold block uppercase text-[10px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Dev Test Notification
                      </span>
                      <p className="text-slate-600">
                        Since SMTP is running in mock mode, you can inspect the rendered HTML email template sent to Bhuban using the Ethereal inbox link below:
                      </p>
                      <a 
                        href={previewUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 font-bold text-[#1F7A53] hover:underline"
                      >
                        Open Email Sandbox <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  <Button 
                    onClick={() => setStatus("idle")}
                    className="bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold rounded-full px-8 h-12 border-none"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-2 text-center lg:text-left pb-4 border-b border-emerald-50">
                    <h3 className="text-2xl font-bold text-[#0B3D2E]">Direct Inquiry Form</h3>
                    <p className="text-sm text-slate-500">All fields are monitored and routed to sales desk.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-mono font-bold text-slate-500 uppercase">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 px-4 text-sm focus:outline-none focus:border-[#53D769] focus:bg-white transition-all" 
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-mono font-bold text-slate-500 uppercase">Work Email</label>
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 px-4 text-sm focus:outline-none focus:border-[#53D769] focus:bg-white transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-mono font-bold text-slate-500 uppercase">Company Name</label>
                      <input 
                        required
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 px-4 text-sm focus:outline-none focus:border-[#53D769] focus:bg-white transition-all" 
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-mono font-bold text-slate-500 uppercase">Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 px-4 text-sm focus:outline-none focus:border-[#53D769] focus:bg-white transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono font-bold text-slate-500 uppercase">Sourcing Interest / Segment</label>
                    <select 
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl h-12 px-4 text-sm focus:outline-none focus:border-[#53D769] focus:bg-white transition-all"
                    >
                      <option>General Sourcing & Compliance</option>
                      <option>Coffee Supply Chains</option>
                      <option>Cocoa Ethical Audits</option>
                      <option>EUDR Forest Buffer Mapping</option>
                      <option>Cotton & Textiles Traceability</option>
                      <option>Other Commodities</option>
                    </select>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono font-bold text-slate-500 uppercase">How can we help your business?</label>
                    <textarea 
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Detail your traceability, registry, or reporting needs..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#53D769] focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-xs font-mono">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                      <span>Transmission failure. Please check your network and retry.</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={status === "submitting"}
                    className="w-full h-14 bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold font-mono rounded-full border-none shadow-md hover:shadow-emerald-400/20"
                  >
                    {status === "submitting" ? "Transmitting to bhuban@chand.co.in..." : "Submit Inquiry to Bhuban"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </main>
  );
}
