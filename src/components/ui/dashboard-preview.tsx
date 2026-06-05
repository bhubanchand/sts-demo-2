"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  BarChart3, 
  MapPin, 
  Leaf, 
  ShieldCheck, 
  TrendingUp, 
  Globe2, 
  Activity,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  MoreVertical,
  X,
  Users
} from "lucide-react";

type Tab = 'overview' | 'traceability' | 'eudr' | 'analytics';

const NOTIFICATIONS = [
  { id: 1, title: "Yield anomaly detected", desc: "Region: West Africa", time: "2h ago", type: "warning", icon: Activity },
  { id: 2, title: "EUDR Report Generated", desc: "Batch #4892 ready for download", time: "5h ago", type: "success", icon: ShieldCheck },
  { id: 3, title: "New Polygon Added", desc: "Farm: Cooperative A", time: "1d ago", type: "info", icon: MapPin },
];

const MAP_PINS = [
  { id: 1, top: "33%", left: "25%", title: "Cooperative Alpha", risk: "Low", crop: "Cocoa", color: "bg-[#53D769]" },
  { id: 2, top: "50%", left: "66%", title: "Farm Group Beta", risk: "Low", crop: "Coffee", color: "bg-[#53D769]" },
  { id: 3, top: "66%", left: "33%", title: "Sector Gamma", risk: "High", crop: "Rubber", color: "bg-amber-400" },
];

export function DashboardPreview() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  // Filter alerts based on search
  const filteredAlerts = NOTIFICATIONS.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderOverview = () => (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 flex flex-col h-full"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 shrink-0">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Farmers Mapped</div>
          <div className="text-3xl font-black text-gray-900 mb-3">1,245,890</div>
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 w-fit px-2 py-1 rounded-md">
            <TrendingUp className="w-4 h-4" /> +12% this month
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-gray-500 text-sm font-medium mb-1">EUDR Compliance Rate</div>
          <div className="text-3xl font-black text-gray-900 mb-3">98.4%</div>
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 w-fit px-2 py-1 rounded-md">
            <ShieldCheck className="w-4 h-4" /> 450 plots cleared
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-gray-500 text-sm font-medium mb-1">Carbon Sequestered</div>
          <div className="text-3xl font-black text-gray-900 mb-3">2.4M Tons</div>
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold bg-emerald-50 w-fit px-2 py-1 rounded-md">
            <Leaf className="w-4 h-4" /> Above SBTi target
          </div>
        </div>
      </div>

      {/* Map & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[250px]">
        {/* Map Area */}
        <div className="lg:col-span-2 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative group h-full">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Map View" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-[#0B3D2E]/20"></div>
          
          {/* Interactive Map Pins */}
          {MAP_PINS.map(pin => (
            <div 
              key={pin.id}
              className="absolute group/pin cursor-pointer" 
              style={{ top: pin.top, left: pin.left }}
              onMouseEnter={() => setHoveredPin(pin.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <div className={`w-4 h-4 ${pin.color} rounded-full border-2 border-white shadow-lg animate-pulse relative z-10`}></div>
              
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredPin === pin.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-20 pointer-events-none"
                  >
                    <p className="font-bold text-gray-900 text-sm mb-1">{pin.title}</p>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Crop:</span>
                      <span className="font-semibold">{pin.crop}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Deforestation Risk:</span>
                      <span className={`font-semibold ${pin.risk === 'Low' ? 'text-emerald-600' : 'text-amber-600'}`}>{pin.risk}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg font-bold text-sm text-gray-900 flex items-center gap-2 pointer-events-none">
            <MapPin className="w-4 h-4 text-[#1F7A53]" /> Live Polygon Tracking
          </div>
        </div>

        {/* List Area */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="text-gray-900 font-bold mb-4 flex justify-between items-center shrink-0">
            Recent Alerts <span className="text-[#1F7A53] text-xs cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3 pr-2 flex-1">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <div key={alert.id} className="flex gap-3 items-start border-b border-gray-50 pb-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${alert.type === 'warning' ? 'bg-amber-50 text-amber-600' : alert.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    <alert.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.desc} • {alert.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">No alerts match "{searchQuery}"</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderTraceability = () => (
    <motion.div
      key="traceability"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Supply Chain Graph: Batch #8922</h3>
        <button className="text-sm text-[#1F7A53] font-bold flex items-center gap-1 hover:underline">
          View Map <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Mock Graph Timeline */}
      <div className="flex-1 flex items-center justify-center py-10 relative">
        <div className="absolute top-1/2 left-[15%] right-[15%] h-1 bg-emerald-100 -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 left-[15%] right-[50%] h-1 bg-emerald-500 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        
        <div className="w-full flex justify-between z-10 px-[10%]">
          {[
            { step: "Farm", desc: "Plot #442", status: "completed", icon: Leaf },
            { step: "Collection", desc: "Coop Alpha", status: "completed", icon: Users },
            { step: "Processing", desc: "Mill B", status: "current", icon: Activity },
            { step: "Export", desc: "Port of Abidjan", status: "pending", icon: Globe2 },
          ].map((node, i) => (
            <div key={i} className="flex flex-col items-center group cursor-pointer">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-md border-4 border-white ${node.status === 'completed' ? 'bg-emerald-500 text-white' : node.status === 'current' ? 'bg-white border-emerald-500 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                <node.icon className="w-5 h-5" />
              </div>
              <p className={`font-bold text-sm ${node.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>{node.step}</p>
              <p className="text-xs text-gray-500">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Data Table */}
      <div className="mt-auto border border-gray-100 rounded-xl overflow-hidden">
         <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 uppercase grid grid-cols-4">
           <div>Date</div><div>Event</div><div>Location</div><div>Verified</div>
         </div>
         <div className="divide-y divide-gray-50">
           <div className="px-4 py-3 text-sm grid grid-cols-4 items-center hover:bg-gray-50 cursor-pointer">
             <div className="text-gray-500">Oct 24, 09:41</div>
             <div className="font-medium text-gray-900">Received at Mill</div>
             <div>Facility B</div>
             <div><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
           </div>
           <div className="px-4 py-3 text-sm grid grid-cols-4 items-center hover:bg-gray-50 cursor-pointer">
             <div className="text-gray-500">Oct 22, 14:20</div>
             <div className="font-medium text-gray-900">Quality Check</div>
             <div>Coop Alpha</div>
             <div><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
           </div>
         </div>
      </div>
    </motion.div>
  );

  const renderEUDR = () => (
    <motion.div
      key="eudr"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Deforestation Risk Assessment</h3>
          <p className="text-sm text-gray-500">Analysis run on 1,240 plots</p>
        </div>
        <button className="bg-[#1F7A53] hover:bg-[#0B3D2E] transition-colors text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Download DDS Report
        </button>
      </div>
      
      <div className="flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 sticky top-0 z-10">
              <th className="px-6 py-3 font-semibold">Plot ID</th>
              <th className="px-6 py-3 font-semibold">Farmer</th>
              <th className="px-6 py-3 font-semibold">Area (Ha)</th>
              <th className="px-6 py-3 font-semibold">Risk Status</th>
              <th className="px-6 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { id: "PLT-8991", name: "Kofi Mensah", area: "2.4", risk: "Low", code: "text-emerald-600 bg-emerald-50" },
              { id: "PLT-8992", name: "Abena Osei", area: "1.8", risk: "Low", code: "text-emerald-600 bg-emerald-50" },
              { id: "PLT-8993", name: "Kwame Yeboah", area: "4.2", risk: "High", code: "text-red-600 bg-red-50", alert: true },
              { id: "PLT-8994", name: "Ama Serwaa", area: "1.5", risk: "Low", code: "text-emerald-600 bg-emerald-50" },
              { id: "PLT-8995", name: "Yaw Boakye", area: "3.1", risk: "Medium", code: "text-amber-600 bg-amber-50" },
            ].map((plot, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{plot.id}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{plot.name}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{plot.area}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${plot.code}`}>
                    {plot.alert && <AlertTriangle className="w-3 h-3" />}
                    {plot.risk} Risk
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <button className="text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      key="analytics"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-gray-900">Yield Prediction vs Actuals</h3>
        <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-[#53D769]">
          <option>2023 Season</option>
          <option>2022 Season</option>
        </select>
      </div>

      {/* Mock Bar Chart using HTML/CSS */}
      <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-8 pt-10 border-b border-gray-100 relative">
        {/* Y Axis Guides */}
        <div className="absolute top-0 left-0 right-0 border-t border-dashed border-gray-200 h-0"></div>
        <div className="absolute top-1/4 left-0 right-0 border-t border-dashed border-gray-200 h-0"></div>
        <div className="absolute top-2/4 left-0 right-0 border-t border-dashed border-gray-200 h-0"></div>
        <div className="absolute top-3/4 left-0 right-0 border-t border-dashed border-gray-200 h-0"></div>

        {[
          { month: "Jan", p: 40, a: 35 },
          { month: "Feb", p: 50, a: 45 },
          { month: "Mar", p: 70, a: 80 },
          { month: "Apr", p: 90, a: 85 },
          { month: "May", p: 100, a: 110 },
          { month: "Jun", p: 80, a: 85 },
          { month: "Jul", p: 60, a: 65 },
        ].map((data, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group z-10 w-full">
            <div className="flex items-end gap-1 w-full justify-center h-48 relative">
              {/* Predicted Bar */}
              <div 
                className="w-1/3 max-w-[20px] bg-[#EAF6EC] border border-[#53D769] rounded-t-sm transition-all duration-500 group-hover:brightness-95" 
                style={{ height: `${data.p}%` }}
              ></div>
              {/* Actual Bar */}
              <div 
                className="w-1/3 max-w-[20px] bg-[#1F7A53] rounded-t-sm transition-all duration-500 group-hover:bg-[#0B3D2E]" 
                style={{ height: `${data.a}%` }}
              ></div>
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Pred: {data.p}k | Act: {data.a}k
              </div>
            </div>
            <span className="text-xs text-gray-500 font-medium">{data.month}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-gray-600">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#EAF6EC] border border-[#53D769] rounded-sm"></div> Predicted Yield</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1F7A53] rounded-sm"></div> Actual Yield</div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-32 bg-gray-50 border-y border-gray-100 relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#53D769] blur-[200px] rounded-full opacity-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#1F7A53] font-bold tracking-widest uppercase mb-4 block">Command Center</span>
          <h2 className="text-5xl md:text-6xl font-black text-[#0B3D2E] leading-tight mb-6 tracking-tighter">
            Your supply chain at a glance.
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Actionable intelligence, real-time compliance tracking, and predictive ESG analytics, unified in one powerful interface. Try interacting with it below.
          </p>
        </div>

        {/* Browser Window Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
          className="rounded-[2rem] bg-white border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col min-h-[600px]"
        >
          {/* Mac OS Header */}
          <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-6 gap-2 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="mx-auto bg-white border border-gray-200 rounded-md px-16 sm:px-32 py-1 text-xs text-gray-400 font-mono shadow-sm flex items-center gap-2 truncate">
              <ShieldCheck className="w-3 h-3 text-[#53D769]" /> platform.sourcetrace.com
            </div>
          </div>

          {/* Dashboard Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-100 p-6 hidden md:flex flex-col justify-between shrink-0">
              <div>
                <div className="text-[#0B3D2E] font-black text-xl mb-10 flex items-center gap-2 tracking-tight">
                  <Leaf className="w-6 h-6 text-[#53D769]" /> SourceTrace
                </div>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'overview' ? 'bg-[#EAF6EC] text-[#1F7A53]' : 'text-gray-500 hover:bg-white hover:text-gray-900'}`}
                  >
                    <Activity className="w-5 h-5" /> Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('traceability')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'traceability' ? 'bg-[#EAF6EC] text-[#1F7A53]' : 'text-gray-500 hover:bg-white hover:text-gray-900'}`}
                  >
                    <Globe2 className="w-5 h-5" /> Traceability
                  </button>
                  <button 
                    onClick={() => setActiveTab('eudr')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'eudr' ? 'bg-[#EAF6EC] text-[#1F7A53]' : 'text-gray-500 hover:bg-white hover:text-gray-900'}`}
                  >
                    <ShieldCheck className="w-5 h-5" /> EUDR Compliance
                  </button>
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'analytics' ? 'bg-[#EAF6EC] text-[#1F7A53]' : 'text-gray-500 hover:bg-white hover:text-gray-900'}`}
                  >
                    <BarChart3 className="w-5 h-5" /> Analytics
                  </button>
                </div>
              </div>
              
              {/* User profile */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1F7A53] to-[#53D769] text-white flex items-center justify-center font-bold">
                  JS
                </div>
                <div className="text-sm">
                  <p className="font-bold text-gray-900 leading-tight">Jane Smith</p>
                  <p className="text-gray-500 text-xs">Sustainability Lead</p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white p-4 sm:p-8 flex flex-col relative">
              {/* Top Nav */}
              <div className="flex justify-between items-center mb-8 shrink-0 flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-black text-gray-900 capitalize">
                    {activeTab === 'eudr' ? 'EUDR Compliance' : activeTab}
                  </h1>
                  <p className="text-gray-500 text-sm">Last updated: Just now</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="relative hidden sm:block">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm w-64 focus:outline-none focus:border-[#53D769] transition-colors" 
                    />
                    {searchQuery && (
                      <X className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-600" onClick={() => setSearchQuery("")} />
                    )}
                  </div>

                  {/* Notification Bell with Dropdown */}
                  <div className="relative">
                    <div 
                      className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className="w-5 h-5" />
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                    
                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                        >
                          <div className="p-3 border-b border-gray-50 bg-gray-50/50 font-bold text-sm text-gray-900 flex justify-between items-center">
                            Notifications
                            <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowNotifications(false)}><X className="w-4 h-4" /></button>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {NOTIFICATIONS.map(alert => (
                              <div key={alert.id} className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${alert.type === 'warning' ? 'bg-amber-50 text-amber-600' : alert.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                  <alert.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 leading-tight">{alert.title}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">{alert.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Dynamic Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'traceability' && renderTraceability()}
                {activeTab === 'eudr' && renderEUDR()}
                {activeTab === 'analytics' && renderAnalytics()}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
