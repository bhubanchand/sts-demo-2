"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, ExternalLink, Sprout } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";

export default function RequestDemoPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
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
          name: `${firstName} ${lastName}`.trim(),
          email,
          company,
          message: `Demo requested on SourceTrace Platform.`,
          type: "demo"
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompany("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-32 px-4 sm:px-8 bg-gradient-to-b from-white via-[#F4FBF7] to-[#EBF7F0] flex justify-center pb-20 text-slate-800">
      <div className="max-w-2xl w-full">
        <AnimatedText el="h1" text="Request a Demo" className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#0B3D2E] text-center" />
        <p className="text-center text-slate-600 mb-12">See how SourceTrace can transform your enterprise supply chain.</p>
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-100/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#53D769]/5 rounded-full blur-2xl pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 space-y-6 font-mono"
              >
                <CheckCircle2 className="w-16 h-16 text-[#53D769] mx-auto animate-bounce" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#0B3D2E]">Demo Request Submitted</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your demo request has been routed to our inbox at <span className="font-bold text-[#1F7A53]">bhuban@chand.co.in</span>.
                  </p>
                </div>

                {previewUrl && (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-left space-y-2 max-w-md mx-auto">
                    <span className="text-[#1F7A53] font-bold block uppercase text-[10px]">Dev Test Email Sandbox</span>
                    <p className="text-slate-500">You can view the processed HTML email notification body here:</p>
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-[#1F7A53] hover:underline">
                      View Email Preview <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <Button 
                  onClick={() => setStatus("idle")}
                  className="bg-[#53D769] hover:bg-emerald-500 text-slate-950 font-bold rounded-full px-8 h-12 border-none"
                >
                  Submit Another Request
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
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono font-bold text-slate-500 uppercase">First Name</label>
                    <input 
                      required
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg h-12 px-4 text-sm outline-none focus:border-[#1F7A53] focus:bg-white transition-all" 
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-mono font-bold text-slate-500 uppercase">Last Name</label>
                    <input 
                      required
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg h-12 px-4 text-sm outline-none focus:border-[#1F7A53] focus:bg-white transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase">Work Email</label>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg h-12 px-4 text-sm outline-none focus:border-[#1F7A53] focus:bg-white transition-all" 
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase">Company</label>
                  <input 
                    required
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg h-12 px-4 text-sm outline-none focus:border-[#1F7A53] focus:bg-white transition-all" 
                  />
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-xs font-mono">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                    <span>Failed to transmit request. Please retry.</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full h-14 text-base font-bold font-mono bg-[#53D769] hover:bg-emerald-500 text-slate-950 rounded-full border-none shadow-md hover:shadow-emerald-400/20"
                >
                  {status === "submitting" ? "Submitting Request..." : "Request Sourcing Demo"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
