import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Ambulance, Users, CheckCircle2, ShieldAlert, ArrowRight, Activity, Globe, MapPin, Zap } from 'lucide-react';

export function PlatformOverview() {
  const cards = [
    {
      badge: "Global Healthcare Network",
      title: "Connected Hospital Command Centers",
      desc: "Hospitals share real-time resource availability through a secure, borderless healthcare network. Instant synchronization of ICU occupancy, emergency surgical wards, ventilator status, and incoming patient referral pipelines.",
      image: "/images/hospital_building.png",
      icon: Building2,
      accentColor: "text-emerald-700 bg-emerald-50 border-emerald-300",
      stats: [
        { label: "Active ICUs Synced", val: "14,200+" },
        { label: "Data Telemetry", val: "< 10ms" },
        { label: "Network Uptime", val: "99.99%" }
      ],
      layout: "left",
      floatingBadge: { title: "Live ICU Telemetry", val: "24/28 Beds Active • HL7 Synced", color: "bg-emerald-600 text-white" }
    },
    {
      badge: "Dynamic EMS Navigation",
      title: "Smart Ambulance Fleet & Live Map",
      desc: "GPS-enabled ambulances equipped with AI-powered routing for faster emergency response. Automatic avoidance of municipal traffic gridlocks with real-time ETA broadcasting directly to receiving ER triage teams.",
      image: "/images/ambulance.png",
      icon: Ambulance,
      accentColor: "text-teal-700 bg-teal-50 border-teal-300",
      stats: [
        { label: "Average Time Shaved", val: "4.5 Min" },
        { label: "GPS Priority Routes", val: "Live Sync" },
        { label: "Fleet Coverage", val: "24/7 Active" }
      ],
      layout: "right",
      floatingBadge: { title: "AI Traffic Bypass", val: "Code Red Siren • ETA 3m 45s", color: "bg-teal-700 text-white" }
    },
    {
      badge: "Precision Clinical Triage",
      title: "Doctor Clinical Triage & Patient Handoff",
      desc: "Patients are matched with the optimal hospital and specialist doctor based on AI severity classification and real-time capability matching. Eliminating secondary transfers during critical trauma window.",
      image: "/images/patient-care.png",
      icon: Users,
      accentColor: "text-green-700 bg-green-50 border-green-300",
      stats: [
        { label: "Triage Accuracy", val: "94.2%" },
        { label: "Handoff Speed", val: "Instant" },
        { label: "Patient Survival", val: "+38% Improved" }
      ],
      layout: "left",
      floatingBadge: { title: "Diagnostic Handoff", val: "AI Severity Score: 94% Critical", color: "bg-green-700 text-white" }
    }
  ];

  return (
    <section id="platform-overview" className="w-full py-24 bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white relative z-10 border-b border-emerald-200/80 overflow-hidden text-slate-900">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1300px] space-y-20">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-600" /> Core Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">Overview.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Three interconnected pillars forming the world's most advanced emergency response infrastructure.
          </p>
        </div>

        <div className="space-y-16">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-white/90 border border-emerald-200/80 shadow-[0_15px_45px_rgba(16,185,129,0.08)] hover:shadow-xl transition-all backdrop-blur-2xl relative overflow-hidden group`}
            >
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>

              <div className={`lg:col-span-6 space-y-5 ${card.layout === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${card.accentColor} shadow-sm`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {card.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {card.desc}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                  {card.stats.map((st, i) => (
                    <div key={i} className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-center shadow-sm">
                      <div className="text-sm sm:text-base font-black text-slate-900 font-mono">{st.val}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`lg:col-span-6 ${card.layout === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                <motion.div 
                  whileHover={{ scale: 1.02, rotateY: card.layout === 'right' ? 3 : -3 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-[2rem] overflow-hidden border-2 border-emerald-200/80 shadow-2xl bg-slate-900 aspect-[16/10] sm:aspect-[4/3] group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity"></div>
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-300 shadow-lg flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Production Node Active</span>
                  </div>

                  <div className={`absolute bottom-4 left-4 right-4 z-20 ${card.floatingBadge.color} backdrop-blur-md p-3 rounded-xl shadow-xl flex items-center justify-between border border-white/20`}>
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-white animate-bounce" />
                      <div>
                        <div className="text-[9px] uppercase tracking-wider opacity-80 font-bold">{card.floatingBadge.title}</div>
                        <div className="text-xs font-black">{card.floatingBadge.val}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-black/20 px-2 py-0.5 rounded font-bold">VERIFIED</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
