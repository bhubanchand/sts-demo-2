"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X, Search, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";

/* ─── Types ─── */
interface FormData {
  firstName: string;
  lastName: string;
  businessEmail: string;
  phonePrefix: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  organizationName: string;
  country: string;
  stateProvince: string;
  zipCode: string;
  productOfInterest: string;
}

/* ─── Static Constants ─── */
const JOB_TITLES = [
  "CEO", "Founder", "Managing Director", "President", "Vice President", "General Manager", "Country Manager", "Regional Manager",
  "Operations Manager", "Supply Chain Manager", "Procurement Manager", "Sustainability Manager", "ESG Manager", "Traceability Manager",
  "Compliance Manager", "Carbon Program Manager", "Agriculture Manager", "Agronomist", "Farm Manager", "Plantation Manager",
  "Commodity Manager", "Quality Assurance Manager", "Food Safety Manager", "Export Manager", "Program Director", "Technical Director",
  "GIS Specialist", "Remote Sensing Specialist", "Data Analyst", "IT Manager", "Digital Transformation Manager", "Product Manager",
  "Project Manager", "Research Scientist", "Consultant", "NGO Representative", "Government Official", "Other"
];

const DEPARTMENTS = [
  "Executive Leadership", "Operations", "Supply Chain", "Procurement", "Sustainability", "ESG", "Compliance", "Agriculture",
  "Farm Operations", "Carbon Programs", "Traceability", "GIS & Remote Sensing", "Technology / IT", "Data & Analytics",
  "Product Management", "Research & Development", "Quality Assurance", "Food Safety", "Finance", "Sales", "Marketing",
  "Customer Success", "Government Relations", "Partnerships", "Consulting", "Other"
];

const PRODUCTS = [
  "Option 1", "Option 2", "Option 3", "Option 4", "Option 5"
];

const COUNTRIES_LIST = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const PHONE_PREFIXES = [
  { code: "US", prefix: "+1" },
  { code: "IN", prefix: "+91" },
  { code: "KE", prefix: "+254" },
  { code: "AU", prefix: "+61" },
  { code: "CA", prefix: "+1" },
  { code: "GB", prefix: "+44" },
  { code: "ZA", prefix: "+27" },
  { code: "SG", prefix: "+65" },
  { code: "DE", prefix: "+49" },
  { code: "FR", prefix: "+33" },
  { code: "JP", prefix: "+81" },
  { code: "AE", prefix: "+971" },
  { code: "BR", prefix: "+55" },
  { code: "NG", prefix: "+234" },
  { code: "NL", prefix: "+31" },
  { code: "CH", prefix: "+41" },
  { code: "NZ", prefix: "+64" },
  { code: "SA", prefix: "+966" },
  { code: "SE", prefix: "+46" },
  { code: "HK", prefix: "+852" },
  { code: "MY", prefix: "+60" },
  { code: "TH", prefix: "+66" },
  { code: "ID", prefix: "+62" },
  { code: "TR", prefix: "+90" },
  { code: "ES", prefix: "+34" },
  { code: "IT", prefix: "+39" },
  { code: "MX", prefix: "+52" },
  { code: "PK", prefix: "+92" },
  { code: "BD", prefix: "+880" },
  { code: "LK", prefix: "+94" },
  { code: "EG", prefix: "+20" }
];

const COUNTRY_TO_PREFIX: Record<string, string> = {
  "United States": "+1", "India": "+91", "Kenya": "+254", "Australia": "+61", "Canada": "+1",
  "United Kingdom": "+44", "South Africa": "+27", "Singapore": "+65", "Germany": "+49", "France": "+33",
  "Japan": "+81", "United Arab Emirates": "+971", "Brazil": "+55", "Nigeria": "+234", "Netherlands": "+31",
  "Switzerland": "+41", "New Zealand": "+64", "Saudi Arabia": "+966", "Sweden": "+46", "Hong Kong": "+852",
  "Malaysia": "+60", "Thailand": "+66", "Indonesia": "+62", "Turkey": "+90", "Spain": "+34",
  "Italy": "+39", "Mexico": "+52", "Pakistan": "+92", "Bangladesh": "+880", "Sri Lanka": "+94", "Egypt": "+20"
};

const STATES_MAP: Record<string, string[]> = {
  India: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ],
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  Australia: [
    "New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania",
    "Australian Capital Territory", "Northern Territory"
  ],
  Kenya: [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
    "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia",
    "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
    "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarwa", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
    "Tharaka-Nithi", "Trans-Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
  ],
  Canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia",
    "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"
  ],
  "United Kingdom": [
    "England", "Scotland", "Wales", "Northern Ireland"
  ]
};

/* ─── Searchable Dropdown Sub-Component ─── */
interface SearchableSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

function SearchableSelect({ label, options, value, onChange, error, placeholder, required }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex flex-col gap-1 w-full" ref={containerRef}>
      <label className="text-xs font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`border rounded-xl px-4 py-3 bg-white text-slate-800 text-sm flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
          error ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <span className={value ? "text-slate-800 font-medium" : "text-slate-400"}>
          {value || placeholder || "Select..."}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-[105%] left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl z-[60] max-h-60 p-2 flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1F7A53] focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="overflow-y-auto max-h-40 flex flex-col scrollbar-thin">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <div
                  key={opt}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`px-3 py-2 text-xs rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${
                    value === opt ? "bg-[#1F7A53]/5 text-[#1F7A53] font-semibold" : "text-slate-700"
                  }`}
                >
                  {opt}
                </div>
              ))
            ) : (
              <span className="text-xs text-slate-400 text-center py-4">No results found</span>
            )}
          </div>
        </div>
      )}
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}

/* ─── Main Floating Demo Component ─── */
export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const firstNameInputRef = useRef<HTMLInputElement>(null);

  // Initialize Form State with Session Storage Fallback
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("request_demo_form_data");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // parse error fallback
        }
      }
    }
    return {
      firstName: "", lastName: "", businessEmail: "", phonePrefix: "+1", phoneNumber: "",
      jobTitle: "", department: "", organizationName: "", country: "", stateProvince: "",
      zipCode: "", productOfInterest: ""
    };
  });

  // Preserve entered data inside session storage
  useEffect(() => {
    sessionStorage.setItem("request_demo_form_data", JSON.stringify(formData));
  }, [formData]);

  // Autofocus on first name on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        firstNameInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // lock page scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCountryChange = (countryName: string) => {
    const newPrefix = COUNTRY_TO_PREFIX[countryName] || formData.phonePrefix;
    setFormData((prev) => ({
      ...prev,
      country: countryName,
      phonePrefix: newPrefix,
      stateProvince: "" // reset state when country changes
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid business email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Business Phone is required";
    } else if (formData.phoneNumber.replace(/\D/g, "").length < 7) {
      newErrors.phoneNumber = "Please enter a valid phone number (min 7 digits)";
    }

    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.organizationName.trim()) newErrors.organizationName = "Organization Name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.stateProvince.trim()) newErrors.stateProvince = "State / Province is required";
    if (!formData.productOfInterest) newErrors.productOfInterest = "Primary Product of Interest is required";

    // Dynamic postal code validation
    if (formData.zipCode.trim()) {
      if (formData.country === "United States" && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        newErrors.zipCode = "Invalid US ZIP code format (5 digits)";
      } else if (formData.country === "India" && !/^\d{6}$/.test(formData.zipCode)) {
        newErrors.zipCode = "Invalid Indian Pin Code (6 digits)";
      } else if (formData.country === "Canada" && !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(formData.zipCode)) {
        newErrors.zipCode = "Invalid Canadian Postal Code";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);

    try {
      // ─── Backend ready placeholder ───
      // Here you can add integrations with HubSpot, Salesforce, Zoho, API, etc.
      // Example payload:
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.businessEmail,
        phone: `${formData.phonePrefix} ${formData.phoneNumber}`,
        jobTitle: formData.jobTitle,
        department: formData.department,
        company: formData.organizationName,
        country: formData.country,
        stateProvince: formData.stateProvince,
        zipCode: formData.zipCode,
        interest: formData.productOfInterest,
        submittedAt: new Date().toISOString(),
        source: "Floating Demo Modal"
      };
      
      console.log("Submitting Request Demo Payload to CRM Integration point:", payload);
      
      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      
      // Clear session preservation on successful submission
      sessionStorage.removeItem("request_demo_form_data");
      setFormData({
        firstName: "", lastName: "", businessEmail: "", phonePrefix: "+1", phoneNumber: "",
        jobTitle: "", department: "", organizationName: "", country: "", stateProvince: "",
        zipCode: "", productOfInterest: ""
      });
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // wait for transition, then reset success state
    setTimeout(() => {
      setSuccess(false);
    }, 300);
  }, []);

  const hasStatesList = formData.country && !!STATES_MAP[formData.country];

  return (
    <>
      {/* Floating Demo Trigger Button */}
      <div className="fixed right-0 top-[72%] -translate-y-1/2 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-[#53D769] hover:bg-[#0B3D2E] border-l-2 md:border-l-4 border-white transition-all duration-300 shadow-2xl rounded-l-xl md:rounded-l-2xl flex flex-col items-center justify-center py-3 px-2.5 md:py-6 md:px-3 cursor-pointer select-none"
        >
          <CalendarDays className="w-4.5 h-4.5 md:w-6 md:h-6 text-[#0B3D2E] group-hover:text-white mb-2 md:mb-4 transition-colors" />
          <span
            className="text-[#0B3D2E] group-hover:text-white font-black text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase transition-colors"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Request Demo
          </span>
        </button>
      </div>

      {/* Modal Popup & Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col overflow-hidden relative border border-slate-100 z-10"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!success ? (
                <>
                  {/* Header Title & Subtitle */}
                  <div className="p-6 md:p-8 pb-4 border-b border-slate-100 pr-12">
                    <h2 className="text-2xl font-black text-[#0B3D2E]">Request a Demo</h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                      See how SourceTrace can help your organization improve traceability, compliance, sustainability, and supply chain visibility.
                    </p>
                  </div>

                  {/* Scrollable Form Body */}
                  <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 scrollbar-thin">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* First Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          ref={firstNameInputRef}
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`border rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
                            errors.firstName ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                          placeholder="Jane"
                        />
                        {errors.firstName && <span className="text-xs text-red-500 mt-0.5">{errors.firstName}</span>}
                      </div>

                      {/* Last Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`border rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
                            errors.lastName ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && <span className="text-xs text-red-500 mt-0.5">{errors.lastName}</span>}
                      </div>

                      {/* Business Email */}
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs font-semibold text-slate-700">
                          Business Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.businessEmail}
                          onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                          className={`border rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
                            errors.businessEmail ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                          placeholder="jane.doe@company.com"
                        />
                        {errors.businessEmail && <span className="text-xs text-red-500 mt-0.5">{errors.businessEmail}</span>}
                      </div>

                      {/* Business Phone with Prefix */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Business Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={formData.phonePrefix}
                            onChange={(e) => setFormData({ ...formData, phonePrefix: e.target.value })}
                            className="w-24 border border-slate-200 rounded-xl px-2 py-3 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent cursor-pointer"
                          >
                            {PHONE_PREFIXES.map((item) => (
                              <option key={`${item.code}-${item.prefix}`} value={item.prefix}>
                                {item.code} ({item.prefix})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className={`flex-1 border rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
                              errors.phoneNumber ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                            }`}
                            placeholder="555-0199"
                          />
                        </div>
                        {errors.phoneNumber && <span className="text-xs text-red-500 mt-0.5">{errors.phoneNumber}</span>}
                      </div>

                      {/* Organization Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Organization Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.organizationName}
                          onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                          className={`border rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
                            errors.organizationName ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                          placeholder="Acme Corp"
                        />
                        {errors.organizationName && <span className="text-xs text-red-500 mt-0.5">{errors.organizationName}</span>}
                      </div>

                      {/* Job Title / Role */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Job Title / Role <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          className={`border rounded-xl px-4 py-3 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all cursor-pointer ${
                            errors.jobTitle ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <option value="">Select Role...</option>
                          {JOB_TITLES.map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))}
                        </select>
                        {errors.jobTitle && <span className="text-xs text-red-500 mt-0.5">{errors.jobTitle}</span>}
                      </div>

                      {/* Department */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className={`border rounded-xl px-4 py-3 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all cursor-pointer ${
                            errors.department ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <option value="">Select Department...</option>
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        {errors.department && <span className="text-xs text-red-500 mt-0.5">{errors.department}</span>}
                      </div>

                      {/* Country Searchable Dropdown */}
                      <SearchableSelect
                        label="Country"
                        options={COUNTRIES_LIST}
                        value={formData.country}
                        onChange={handleCountryChange}
                        error={errors.country}
                        placeholder="Search & select country..."
                        required
                      />

                      {/* Dynamic State / Province Dropdown or input fallback */}
                      <div className="flex flex-col gap-1">
                        {hasStatesList ? (
                          <SearchableSelect
                            label={
                              formData.country === "Kenya" ? "County" : "State / Province"
                            }
                            options={STATES_MAP[formData.country]}
                            value={formData.stateProvince}
                            onChange={(val) => setFormData({ ...formData, stateProvince: val })}
                            error={errors.stateProvince}
                            placeholder={
                              formData.country === "Kenya"
                                ? "Select county..."
                                : "Select state/province..."
                            }
                            required
                          />
                        ) : (
                          <>
                            <label className="text-xs font-semibold text-slate-700">
                              State / Province <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.stateProvince}
                              onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                              placeholder="e.g. British Columbia"
                              className={`border rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
                                errors.stateProvince ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                              }`}
                            />
                            {errors.stateProvince && <span className="text-xs text-red-500 mt-0.5">{errors.stateProvince}</span>}
                          </>
                        )}
                      </div>

                      {/* ZIP / Postal Code */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className={`border rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all ${
                            errors.zipCode ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                          placeholder="e.g. 90210"
                        />
                        {errors.zipCode && <span className="text-xs text-red-500 mt-0.5">{errors.zipCode}</span>}
                      </div>

                      {/* Primary Product of Interest */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Primary Product of Interest <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.productOfInterest}
                          onChange={(e) => setFormData({ ...formData, productOfInterest: e.target.value })}
                          className={`border rounded-xl px-4 py-3 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F7A53] focus:border-transparent transition-all cursor-pointer ${
                            errors.productOfInterest ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <option value="">Select Option...</option>
                          {PRODUCTS.map((prod) => (
                            <option key={prod} value={prod}>
                              {prod}
                            </option>
                          ))}
                        </select>
                        {errors.productOfInterest && <span className="text-xs text-red-500 mt-0.5">{errors.productOfInterest}</span>}
                      </div>

                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#53D769] hover:bg-[#0B3D2E] text-[#0B3D2E] hover:text-white font-bold text-base py-4 rounded-2xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed select-none"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Processing Request...</span>
                          </>
                        ) : (
                          <span>Request Demo</span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success Message Screen */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 md:p-12 flex flex-col items-center text-center justify-center my-auto min-h-[350px]"
                >
                  <div className="w-20 h-20 rounded-full bg-[#53D769]/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-[#1F7A53]" />
                  </div>
                  <h2 className="text-3xl font-black text-[#0B3D2E] mb-3">Thank You!</h2>
                  <p className="text-slate-600 text-sm max-w-md leading-relaxed mb-8">
                    Your demo request has been received. Our team will contact you shortly to schedule a personalized demonstration of SourceTrace.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-[#0B3D2E] hover:bg-[#1F7A53] text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer select-none"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
