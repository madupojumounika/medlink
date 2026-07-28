import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Unplug, Activity, CheckCircle2, ShieldAlert, Cpu, GitBranch, HeartPulse, Building2, Ambulance, Users } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: "Delayed Emergency Referrals",
      desc: "Legacy phone-based referrals and uncoordinated triage cause critical delays during the golden hour, increasing preventable patient mortality.",
      badge: "Critical Bottleneck",
      image: "/images/medical_tools_bg.png",
      stat: "+45 Min Delay"
    },
    {
      icon: Unplug,
      title: "Fragmented ICU Resource Visibility",
      desc: "Hospitals operate in data silos without real-time synchronization of ICU bed occupancy, emergency surgical wards, or ventilator availability.",
      badge: "Siloed Telemetry",
      image: "/images/hospital_building.png",
      stat: "No Real-Time Sync"
    },
    {
      icon: AlertTriangle,
      title: "Blind Ambulance Dispatching",
      desc: "EMS units lack live hospital capacity updates and AI traffic routing, often transporting critical patients to overcrowded or ill-equipped emergency bays.",
      badge: "Inefficient Routing",
      image: "/images/ambulance.png",
      stat: "Secondary Transfers"
    },
    {
      icon: Activity,
      title: "Unstructured Clinical Triage",
      desc: "Emergency ER physicians lack automated pre-arrival diagnostic vitals and machine learning severity classification before patient handoff.",
      badge: "Manual Triage",
      image: "/images/doctors_masks.png",
      stat: "High Cognitive Load"
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-[#e6fcf5] via-[#f0fdf4] to-white relative z-10 border-b border-emerald-200/80 text-slate-900 overflow-hidden">
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-rose-400/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1300px] space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-300 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" /> The Emergency Healthcare Bottleneck
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Why Traditional Emergency <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-600 to-rose-500">
              Referrals Fail Patients.
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            During acute medical emergencies, disconnected systems and manual telephone coordination cost precious clinical minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, borderColor: "rgba(244,63,94,0.4)" }}
              className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-emerald-200/80 shadow-[0_10px_30px_rgba(16,185,129,0.08)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform">
                    <prob.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider">
                    {prob.badge}
                  </span>
                </div>

                <div className="my-3 flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300 flex-shrink-0">
                    <img src={prob.image} alt={prob.title} className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Legacy Metric</div>
                    <div className="text-xs font-black text-rose-600 truncate">{prob.stat}</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
                  {prob.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {prob.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-[10px] font-bold uppercase tracking-wider text-rose-500 font-mono">
                <span>⚠️ Clinical Risk Factor</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function SolutionSection() {
  const pillars = [
    {
      icon: Cpu,
      title: "Real-Time AI Severity Assessment",
      desc: "Random Forest and Neural Network algorithms compute acute mortality risks, assigning instant ESI triage priorities in sub-seconds.",
      badge: "94.2% Accuracy",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-300"
    },
    {
      icon: Building2,
      title: "Hospital ICU Resource Synchronization",
      desc: "Live telemetry tracking ventilator status, emergency ward occupancy, and surgical availability across connected regional networks.",
      badge: "HL7/FHIR Synced",
      accent: "text-teal-700 bg-teal-50 border-teal-300"
    },
    {
      icon: Ambulance,
      title: "Smart Ambulance GPS Navigation",
      desc: "Automated EMS unit dispatching with priority traffic-avoidance routing and real-time ETA broadcasting directly to receiving ER teams.",
      badge: "4.5 Min Shaved",
      accent: "text-green-700 bg-green-50 border-green-300"
    },
    {
      icon: Users,
      title: "Digital Clinical Patient Handoff",
      desc: "Streamed EMR vitals, symptom telemetry, and AI treatment recommendations delivered to ER physicians before patient arrival.",
      badge: "Instant Transfer",
      accent: "text-emerald-800 bg-emerald-50 border-emerald-300"
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-[#f0fdf4] to-[#ecfdf5] relative z-10 border-b border-emerald-200/80 text-slate-900 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[45rem] h-[25rem] bg-emerald-400/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1300px] space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> One Unified Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            How MedLink AI Connects The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
              Emergency Healthcare Chain.
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            We replace manual phone referrals with an intelligent, autonomous emergency routing network.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 rounded-[2.5rem] bg-white/90 backdrop-blur-2xl border border-emerald-200 shadow-xl relative overflow-hidden">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
              <GitBranch className="w-3.5 h-3.5" /> End-to-End Orchestration
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Real-Time Interoperability For High-Stakes Emergencies.
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              When a patient experiences an acute emergency, MedLink AI instantly cross-references patient symptoms against regional hospital ICU bed occupancy, dispatches the nearest equipped ambulance, and streams diagnostic telemetry directly to destination ER doctors.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-lg font-black text-emerald-700 font-mono">0.8s</div>
                <div className="text-xs font-bold text-slate-700">AI Triage Speed</div>
              </div>
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
                <div className="text-lg font-black text-teal-700 font-mono">99.99%</div>
                <div className="text-xs font-bold text-slate-700">Network Uptime</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
            
            <div className="absolute right-0 top-0 w-4/5 aspect-[16/10] rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-lg transform rotate-2 opacity-90 group">
              <img src="/images/network-abstract.png" alt="Neural Network Telemetry" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 px-2.5 py-1 rounded-lg border border-white/20">
                AI Neural Telemetry Network
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ duration: 0.4 }}
              className="absolute left-0 bottom-0 w-4/5 aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white shadow-[0_20px_50px_rgba(16,185,129,0.25)] transform -rotate-2 z-20 bg-slate-900"
            >
              <img src="/images/immersive_ai_hospital_bg.png" alt="Hospital ICU Network" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs font-bold">
                <span className="flex items-center gap-1.5 bg-emerald-600 px-2.5 py-1 rounded-lg shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> Live ER Capacity Synced
                </span>
                <span className="font-mono text-[11px] text-emerald-300 bg-slate-950/80 px-2 py-1 rounded border border-white/10">
                  Node #04 Active
                </span>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: "rgba(16,185,129,0.5)" }}
              className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-emerald-200/80 shadow-[0_8px_25px_rgba(16,185,129,0.06)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${item.accent}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-[10px] font-bold text-emerald-700 uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Active in Production
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
