"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-text";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

interface TeamSection {
  id: string;
  title: string;
  members: TeamMember[];
}

const TEAM_SECTIONS: TeamSection[] = [
  {
    id: "thought-leaders",
    title: "Thought Leaders",
    members: [
      {
        name: "Dr. Aris van Veen",
        role: "Chief Sustainability Officer (CSO)",
        image: "/images/team/member_male_1.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Elena Rostova",
        role: "VP of Climate Research",
        image: "/images/team/member_female_1.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Prof. Marcus Aurelius",
        role: "Senior AI Advisor",
        image: "/images/team/member_male_2.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Sarah Jenkins",
        role: "Director of Regenerative Strategy",
        image: "/images/team/member_female_2.png",
        linkedin: "https://www.linkedin.com"
      }
    ]
  },
  {
    id: "functional-leaders",
    title: "Functional Leaders",
    members: [
      {
        name: "David Chen",
        role: "Chief Technology Officer (CTO)",
        image: "/images/team/member_male_2.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Priya Patel",
        role: "VP of Product Engineering",
        image: "/images/team/member_female_2.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Michael O'Connor",
        role: "Chief Operations Officer (COO)",
        image: "/images/team/member_male_1.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Jessica Kuan",
        role: "Head of Data Platform",
        image: "/images/team/member_female_1.png",
        linkedin: "https://www.linkedin.com"
      }
    ]
  },
  {
    id: "regional-leaders",
    title: "Regional Leaders",
    members: [
      {
        name: "John Mwangi",
        role: "Regional Director, East Africa",
        image: "/images/team/member_male_1.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Lucas Silva",
        role: "Regional Director, Latin America",
        image: "/images/team/member_male_2.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Dr. Kenji Tanaka",
        role: "Regional Director, APAC",
        image: "/images/team/member_female_2.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Amina Al-Farsi",
        role: "Regional Director, Middle East",
        image: "/images/team/member_female_1.png",
        linkedin: "https://www.linkedin.com"
      }
    ]
  },
  {
    id: "geographical-leaders",
    title: "Geographical Leaders",
    members: [
      {
        name: "Chloe Dubois",
        role: "Head of EUDR Sourcing, Europe",
        image: "/images/team/member_female_1.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Rajesh Kumar",
        role: "Head of First-Mile Operations, South Asia",
        image: "/images/team/member_male_1.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Gabriel Barbosa",
        role: "Deforestation Canopy Lead, Brazil",
        image: "/images/team/member_male_2.png",
        linkedin: "https://www.linkedin.com"
      },
      {
        name: "Olivia Thompson",
        role: "ESG Compliance Lead, North America",
        image: "/images/team/member_female_2.png",
        linkedin: "https://www.linkedin.com"
      }
    ]
  }
];

function MeetTheTeamContent() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>("thought-leaders");

  // Read section query parameter or location hash on mount and when query changes
  useEffect(() => {
    const sectionParam = searchParams.get("section");
    const hashParam = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const activeId = sectionParam || hashParam;

    if (activeId && TEAM_SECTIONS.some((s) => s.id === activeId)) {
      setActiveSection(activeId);
      // Smooth scroll to the active section
      setTimeout(() => {
        const element = document.getElementById(activeId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [searchParams]);

  const handleToggle = (id: string) => {
    // If clicking the already active section, do not collapse (keep one open at all times as requested)
    if (activeSection === id) return;
    setActiveSection(id);
    
    // Update hash or query param in URL dynamically
    window.history.replaceState(null, "", `/company/meet-the-team?section=${id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50/80 to-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#1F7A53] font-semibold tracking-wider uppercase mb-3 block text-sm sm:text-base">
            Our Leadership
          </span>
          <AnimatedText
            el="h1"
            text="Meet The Team"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B3D2E] mb-6 leading-tight"
          />
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
            SourceTrace is driven by global visionaries, technologists, and agricultural specialists committed to building transparent, compliant, and resilient value chains.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-6">
          {TEAM_SECTIONS.map((section) => {
            const isOpen = activeSection === section.id;
            return (
              <div
                key={section.id}
                id={section.id}
                className={`rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 ${
                  isOpen ? "bg-white border-[#1F7A53]/25 shadow-md border-l-4 border-l-[#1F7A53]" : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(section.id)}
                  className={`w-full flex items-center justify-between px-8 py-7 text-left font-extrabold text-xl sm:text-2xl transition-colors select-none cursor-pointer ${
                    isOpen ? "bg-gradient-to-r from-[#0B3D2E]/5 to-transparent text-[#0B3D2E]" : "text-slate-800 hover:bg-slate-50/50"
                  }`}
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#1F7A53]" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-12 pt-6 border-t border-slate-100/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                          {section.members.map((member, mIdx) => (
                            <motion.div
                              key={member.name}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: mIdx * 0.05 }}
                              className="flex flex-col items-center text-center group bg-slate-50/40 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-md rounded-3xl p-6 transition-all duration-300"
                            >
                              {/* Photo container */}
                              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md ring-2 ring-slate-100 group-hover:ring-[#53D769] transition-all duration-300 flex-shrink-0">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>

                              {/* Details */}
                              <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-1 group-hover:text-[#0B3D2E] transition-colors leading-tight">
                                {member.name}
                              </h3>
                              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-normal mb-4 min-h-[40px] flex items-center justify-center max-w-[170px] mx-auto">
                                {member.role}
                              </p>
                              
                              {/* Always Visible LinkedIn Icon */}
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0A66C2] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90"
                                aria-label={`Visit ${member.name}'s LinkedIn profile`}
                              >
                                <LinkedinIcon className="w-4 h-4" />
                              </a>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default function MeetTheTeamPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1F7A53] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-gray-500">Loading Team...</span>
        </div>
      </div>
    }>
      <MeetTheTeamContent />
    </Suspense>
  );
}
