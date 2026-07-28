import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building2, Ambulance, Stethoscope, CheckCircle2, ShieldAlert, Activity, Navigation, HeartPulse, FileText, Smartphone, LayoutDashboard, Radio, ArrowRight, ShieldCheck, GitBranch } from 'lucide-react';

export function UserRolesSection() {
  const [activeRole, setActiveRole] = useState(0);

  const roles = [
    {
      id: "hospital_admin",
      title: "Hospital Admin",
      icon: Building2,
      badge: "Command Center",
      desc: "Complete operational control over ICU beds, surgical wards, emergency equipment, and incoming patient referral triage queues.",
      image: "/images/command-center.png",
      features: [
        { title: "ICU Bed Availability", detail: "Live telemetry tracking ventilator status, blood bank supplies, and bed occupancy across departments." },
        { title: "Emergency Triage Queue", detail: "Automated prioritization of incoming patient transfers based on AI severity classification." },
        { title: "Resource Management", detail: "Real-time dashboard displaying critical capacity and staff workload distribution." }
      ],
      mockupTitle: "Hospital Command Center Node #01",
      mockupData: { icu: "24/28 Beds Active", ventilators: "18/20 Ready", queue: "3 Incoming Transfers", status: "Optimal Load" },
      accent: "text-emerald-700 bg-emerald-50 border-emerald-300"
    },
    {
      id: "doctor",
      title: "Doctor",
      icon: Stethoscope,
      badge: "Clinical Triage",
      desc: "Equipping emergency physicians and specialists with AI severity predictions, historical EMRs, and diagnostic vitals before arrival.",
      image: "/images/doctor-smiling.png",
      features: [
        { title: "AI Severity Insights", detail: "Sub-second machine learning triage analysis highlighting immediate mortality risks and ESI protocols." },
        { title: "Patient Clinical History", detail: "Instant access to pre-existing conditions, allergies, medications, and vital telemetry trends." },
        { title: "Referral Management", detail: "Pre-arrival surgical team notification and automated lab testing requisitions upon acceptance." }
      ],
      mockupTitle: "Physician Clinical Dashboard",
      mockupData: { patient: "John Doe, 45M", condition: "Acute Myocardial Infarction", aiScore: "94.2% Critical Risk", action: "Cath Lab Alerted" },
      accent: "text-teal-700 bg-teal-50 border-teal-300"
    },
    {
      id: "referral_coordinator",
      title: "Referral Coordinator",
      icon: GitBranch,
      badge: "Triage Orchestration",
      desc: "Orchestrating inter-hospital patient transfers and matching acute emergency cases with real-time regional hospital capabilities.",
      image: "/images/bright_smiling_doctors.png",
      features: [
        { title: "Internal Triage Queue", detail: "Cross-referencing high-severity patient needs against regional specialist availability." },
        { title: "Assigned Request Tracking", detail: "Continuous oversight of active transfers from initial broadcast to ER handoff." },
        { title: "Emergency Monitoring", detail: "Instant resolution of transport bottlenecks and automated secondary capacity matching." }
      ],
      mockupTitle: "Coordinator Triage Workspace",
      mockupData: { activeTransfers: "14 In Transit", pendingQueue: "2 High Priority", matchedRate: "98.4%", avgTime: "1.2 Mins" },
      accent: "text-green-700 bg-green-50 border-green-300"
    },
    {
      id: "ambulance",
      title: "Ambulance EMS",
      icon: Ambulance,
      badge: "Live Map & Fleet",
      desc: "GPS-enabled fleet navigation, automated emergency dispatching, and dynamic traffic avoidance for emergency medical technicians.",
      image: "/images/ambulance.png",
      features: [
        { title: "Live Map GPS Tracking", detail: "Continuous telemetry syncing vehicle location, speed, and emergency status with central dispatch." },
        { title: "Smart Priority Routing", detail: "AI-calculated priority navigation avoiding municipal gridlocks and road closures." },
        { title: "Available Request Queue", detail: "Automated assignment of closest available EMS units based on patient condition and onboard gear." }
      ],
      mockupTitle: "Ambulance Driver Unit Alpha-102",
      mockupData: { speed: "68 km/h", priority: "Code Red Siren", route: "AI Traffic Bypass Active", eta: "3 min 45s to ER" },
      accent: "text-emerald-800 bg-emerald-50 border-emerald-300"
    },
    {
      id: "system_admin",
      title: "System Admin",
      icon: ShieldCheck,
      badge: "Security & Analytics",
      desc: "Enterprise governance, real-time healthcare telemetry analytics, security compliance, and network-wide hospital performance monitoring.",
      image: "/images/network-abstract.png",
      features: [
        { title: "Analytics Overview", detail: "High-throughput stream processing analyzing regional hospital ICU load and referral latency." },
        { title: "Hospital & Driver Management", detail: "Centralized onboarding, credential verification, and role access control across networks." },
        { title: "Security & Export Center", detail: "HIPAA-compliant audit logs, end-to-end encryption monitoring, and clinical data exports." }
      ],
      mockupTitle: "Enterprise Admin Console",
      mockupData: { hospitals: "500+ Connected", uptime: "99.99% SLA", reqRate: "12,000 req/sec", compliance: "HIPAA Verified" },
      accent: "text-teal-800 bg-teal-50 border-teal-300"
    },
    {
      id: "patient",
      title: "Patient Portal",
      icon: Users,
      badge: "Emergency Access",
      desc: "Empowering patients and bystanders with immediate emergency SOS broadcasting, GPS hospital discovery, and live ambulance tracking.",
      image: "/images/patient-care.png",
      features: [
        { title: "Emergency SOS Button", detail: "One-click emergency broadcast transmitting GPS coordinates and vital symptoms to dispatch." },
        { title: "Live Ambulance Tracking", detail: "Track dispatched emergency units on an interactive live map with accurate ETAs." },
        { title: "Hospital Wait Times", detail: "Real-time visibility into nearby emergency room capacity and specialist availability." }
      ],
      mockupTitle: "Patient Emergency SOS Interface",
      mockupData: { status: "Ambulance Dispatched", unit: "EMS-409", eta: "3 mins", destination: "St. Jude Medical ER" },
      accent: "text-green-800 bg-green-50 border-green-300"
    }
  ];

  const current = roles[activeRole];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-[#f0fdf4] via-white to-[#ecfdf5] relative z-10 border-b border-emerald-200/80 overflow-hidden text-slate-900">
      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1350px] space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-emerald-600" /> Tailored Ecosystem Interfaces
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Built For All 6 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
              Healthcare Stakeholders.
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Explore dedicated platform features and real interactive workspaces built directly into our project.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {roles.map((role, idx) => {
            const isActive = activeRole === idx;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(idx)}
                className={`flex flex-col items-center p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 text-center relative overflow-hidden group ${
                  isActive 
                    ? 'bg-white border-emerald-500 shadow-[0_8px_25px_rgba(16,185,129,0.2)] scale-[1.03] z-10' 
                    : 'bg-white/70 border-emerald-200/60 hover:border-emerald-400 hover:bg-white'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="roleTabHighlight"
                    className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none"
                  />
                )}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 ${role.accent}`}>
                  <role.icon className="w-5 h-5" />
                </div>
                <h3 className={`text-xs sm:text-sm font-black mb-0.5 transition-colors ${isActive ? 'text-emerald-950' : 'text-slate-700'}`}>
                  {role.title}
                </h3>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  {role.badge}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-white/95 border border-emerald-300/80 shadow-[0_15px_50px_rgba(16,185,129,0.12)] backdrop-blur-2xl"
          >
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-emerald-300 bg-slate-100 flex-shrink-0 shadow-sm">
                  <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                    <current.icon className="w-3 h-3 text-emerald-700" /> Dedicated Role Interface
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mt-1">
                    {current.title} Workspace
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {current.desc}
              </p>

              <div className="space-y-3.5 pt-2">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5">{feat.title}</h4>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">{feat.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md rounded-3xl bg-slate-950 border-2 border-emerald-300/80 p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.4)] relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500"></div>

                <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${current.accent} text-slate-900 font-black`}>
                      <current.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Live Project Portal</div>
                      <div className="text-sm font-black text-white">{current.mockupTitle}</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Active Sync
                  </span>
                </div>

                <div className="space-y-3">
                  {Object.entries(current.mockupData).map(([k, v], idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-white/10">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{k}</span>
                      <span className="text-xs sm:text-sm font-bold text-white font-mono">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-3">
                  <button className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5">
                    Launch {current.title} Portal <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
