import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Ambulance, Building2, Activity, Users, Bed, AlertTriangle, CheckCircle2, Clock, MapPin, Navigation, Radio, ArrowUpRight, ShieldCheck, GitBranch, BarChart2 } from 'lucide-react';

export function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState('hospital');

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-[#f0fdf4] to-[#ecfdf5] relative z-10 border-b border-emerald-200/80 overflow-hidden text-slate-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-emerald-400/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1300px] space-y-14">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-3.5 h-3.5 animate-pulse text-emerald-600" /> Live Telemetry Previews
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Live Dashboard <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
              Showcase.
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Explore realistic SaaS command center previews engineered for high-pressure clinical decisions.
          </p>

          <div className="pt-4 flex justify-center">
            <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-white border border-emerald-300 shadow-md gap-1">
              <button
                onClick={() => setActiveTab('hospital')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'hospital'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Building2 className="w-4 h-4" /> Hospital Command
              </button>
              <button
                onClick={() => setActiveTab('ambulance')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'ambulance'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Ambulance className="w-4 h-4" /> EMS Live Map
              </button>
              <button
                onClick={() => setActiveTab('coordinator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'coordinator'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <GitBranch className="w-4 h-4" /> Coordinator Queue
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <BarChart2 className="w-4 h-4" /> System Analytics
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'hospital' && (
            <motion.div
              key="hospital-dash"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-slate-950 border-2 border-emerald-300 shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-5 sm:p-8 backdrop-blur-3xl relative overflow-hidden max-w-5xl mx-auto text-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">HOSPITAL NETWORK NODE #01</div>
                    <div className="text-base font-black text-white">St. Jude Metropolitan ER & Trauma Center</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Telemetry Online
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">SYNCHED: LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">ICU Availability</span>
                    <Bed className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">24 / 30</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-0.5">80% Ready Capacity</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Emergency Wards</span>
                    <Activity className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">12 Active</div>
                  <div className="text-[10px] text-teal-400 font-bold mt-0.5">4 Turnovers in progress</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Doctors On Duty</span>
                    <Users className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">38 Specialists</div>
                  <div className="text-[10px] text-green-400 font-bold mt-0.5">14 Trauma Surgeons</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Incoming Triage</span>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono">3 Transfers</div>
                  <div className="text-[10px] text-rose-400 font-bold mt-0.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-rose-400 animate-pulse"></span> 1 High Severity Alert
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Emergency Referral Triage Queue</h4>
                  <span className="text-[10px] font-mono text-slate-400">AUTO-REFRESH: 1S</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: "REF-9021", patient: "Male, 58 yrs", condition: "Cardiac Arrest / Stroke Protocol", severity: "Critical", score: "94.2%", eta: "3 mins", unit: "EMS-104", badge: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
                    { id: "REF-9022", patient: "Female, 34 yrs", condition: "Multiple Trauma / Fracture", severity: "Urgent", score: "78.5%", eta: "8 mins", unit: "EMS-209", badge: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                    { id: "REF-9023", patient: "Male, 22 yrs", condition: "Acute Respiratory Distress", severity: "Moderate", score: "54.0%", eta: "14 mins", unit: "EMS-088", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" }
                  ].map((row, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-950/90 border border-white/10 hover:border-emerald-500/40 transition-all gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase ${row.badge}`}>
                          {row.severity}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            {row.condition} <span className="text-[10px] font-mono text-slate-400">({row.id})</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{row.patient} • Dispatched via {row.unit}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <div className="text-right">
                          <div className="text-[9px] text-slate-400 uppercase font-mono">AI Score</div>
                          <div className="text-xs font-black text-white font-mono">{row.score}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] text-slate-400 uppercase font-mono">ETA</div>
                          <div className="text-xs font-black text-emerald-400 font-mono">{row.eta}</div>
                        </div>
                        <button className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-bold border border-emerald-500/40 transition-all">
                          Prepare Bay
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ambulance' && (
            <motion.div
              key="ambulance-dash"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-slate-950 border-2 border-emerald-300 shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-5 sm:p-8 backdrop-blur-3xl relative overflow-hidden max-w-5xl mx-auto text-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">EMS LIVE MAP & NAVIGATION UNIT</div>
                    <div className="text-base font-black text-white">Ambulance Fleet Alpha-102 (Code Red Active)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-black flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span> Priority Sirens Active
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">GPS ACCURACY: ±1m</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-white/10 p-5 relative min-h-[300px] flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Current Coordinates</div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" /> 34°05'22"N • 118°14'37"W
                      </div>
                    </div>
                    <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-right">
                      <div className="text-[9px] text-emerald-300 uppercase font-bold">AI Traffic Bypass</div>
                      <div className="text-xs font-black text-emerald-400 font-mono">Priority Corridor Open</div>
                    </div>
                  </div>

                  <div className="relative z-10 my-6 flex items-center justify-between px-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-md">Start</div>
                      <span className="text-[10px] text-slate-400 mt-1 font-bold">Incident Site</span>
                    </div>
                    <div className="flex-1 mx-3 h-2 bg-slate-800 rounded-full relative overflow-hidden">
                      <motion.div initial={{ width: "20%" }} animate={{ width: "75%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 rounded-full"></motion.div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center text-[10px] font-bold animate-pulse shadow-md">ER</div>
                      <span className="text-[10px] text-slate-400 mt-1 font-bold">St. Jude ICU</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between items-end bg-slate-950/90 p-4 rounded-xl border border-white/10">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Next Instruction</div>
                      <div className="text-sm font-black text-white">Turn Right onto Grand Ave (Priority Lane)</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-[10px] text-slate-400">DISTANCE</div>
                      <div className="text-base font-bold text-emerald-400">1.8 km</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3.5">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/25 to-teal-600/15 border border-emerald-500/40 text-center">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 mb-1 font-mono">Estimated Time of Arrival</div>
                    <div className="text-4xl font-black text-white font-mono tracking-tight">03:45</div>
                    <div className="text-[11px] text-slate-200 mt-1.5 flex items-center justify-center gap-1 font-bold">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> ER Surgical Team Standing By
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1.5 border-b border-white/10">Patient Onboard Telemetry</div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Heart Rate (EKG)</span>
                      <span className="font-bold text-rose-400 font-mono">128 BPM (Elevated)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Blood Pressure</span>
                      <span className="font-bold text-amber-400 font-mono">142/92 mmHg</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">SpO2 Saturation</span>
                      <span className="font-bold text-emerald-400 font-mono">96% Normal</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Destination Bay #4 Reserved</span>
                    <span>Ready</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'coordinator' && (
            <motion.div
              key="coordinator-dash"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-slate-950 border-2 border-emerald-300 shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-5 sm:p-8 backdrop-blur-3xl relative overflow-hidden max-w-5xl mx-auto text-white"
            >
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">REFERRAL COORDINATOR TRIAGE QUEUE</div>
                    <div className="text-base font-black text-white">Inter-Hospital Emergency Orchestration</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">14 Active Cases</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center">
                  <div className="text-xs text-slate-400 uppercase font-bold">Matched Rate</div>
                  <div className="text-3xl font-black text-green-400 font-mono mt-1">98.4%</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center">
                  <div className="text-xs text-slate-400 uppercase font-bold">Avg Placement Time</div>
                  <div className="text-3xl font-black text-teal-400 font-mono mt-1">1.2 Mins</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center">
                  <div className="text-xs text-slate-400 uppercase font-bold">Regional Capacity</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono mt-1">420 Beds</div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                <div className="text-xs font-bold uppercase text-slate-300 mb-3">Recent Placement Log</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-white/5">
                    <span>Transfer #884: St. Luke Medical &rarr; Johns Hopkins ICU</span>
                    <span className="text-emerald-400 font-mono font-bold">Accepted (0.9s)</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-white/5">
                    <span>Transfer #885: Metro Trauma &rarr; St. Jude Surgical Ward</span>
                    <span className="text-emerald-400 font-mono font-bold">Accepted (1.1s)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics-dash"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-slate-950 border-2 border-emerald-300 shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-5 sm:p-8 backdrop-blur-3xl relative overflow-hidden max-w-5xl mx-auto text-white"
            >
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">SYSTEM ANALYTICS & SECURITY CONSOLE</div>
                    <div className="text-base font-black text-white">Global Telemetry Stream & Performance</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">HIPAA Compliant Node</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Throughput</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">12,400 req/s</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">AI Latency</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">&lt; 8 ms</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Network SLA</div>
                  <div className="text-2xl font-black text-teal-400 font-mono mt-1">99.99%</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Active Nodes</div>
                  <div className="text-2xl font-black text-green-400 font-mono mt-1">500+ ICU Bays</div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between text-xs text-slate-300 font-bold">
                <span>AES-256 / TLS 1.3 End-to-End Encryption Active Across All Telemetry Streams</span>
                <span className="text-emerald-400 font-mono font-black">SYSTEM SECURE</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
