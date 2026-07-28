import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Building2, Ambulance, FileCheck, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Emergency Registration & SOS Alert",
      desc: "Patient, bystander, or EMS dispatcher triggers an emergency alert via the mobile SOS button, web portal, or automated emergency call integration with vital stats.",
      icon: ShieldAlert,
      time: "00:00.00",
      accent: "text-rose-600 border-rose-300 bg-rose-50",
      image: "/images/patient-care.png",
      tag: "Patient Portal / Dispatch"
    },
    {
      step: "02",
      title: "AI Severity Assessment & Triage Scoring",
      desc: "Random Forest and Neural Network algorithms evaluate vital signs (heart rate, blood pressure, SpO2) and EMR history to assign Manchester/ESI triage priority in sub-seconds.",
      icon: Cpu,
      time: "+ 00:00.80",
      accent: "text-emerald-700 border-emerald-300 bg-emerald-50",
      image: "/images/command-center.png",
      tag: "AI Triage Engine (94.2%)"
    },
    {
      step: "03",
      title: "Hospital & ICU Resource Matching",
      desc: "Referral coordinators and automated systems cross-reference patient severity against real-time regional ICU bed occupancy, surgical wards, and specialist doctor availability.",
      icon: Building2,
      time: "+ 00:01.40",
      accent: "text-teal-700 border-teal-300 bg-teal-50",
      image: "/images/hospital_building.png",
      tag: "Hospital Command Center"
    },
    {
      step: "04",
      title: "Smart Ambulance Dispatch & Live Map",
      desc: "The nearest equipped emergency ambulance unit receives automated GPS dispatch with AI-generated priority navigation avoiding municipal traffic gridlocks.",
      icon: Ambulance,
      time: "+ 00:02.10",
      accent: "text-green-700 border-green-300 bg-green-50",
      image: "/images/ambulance.png",
      tag: "EMS Live Map & Navigation"
    },
    {
      step: "05",
      title: "Digital Clinical Patient Handoff",
      desc: "Comprehensive diagnostic vitals, AI triage scoring, and preliminary treatment recommendations are streamed directly to destination ER doctors before arrival at bay.",
      icon: FileCheck,
      time: "+ 00:03.20",
      accent: "text-emerald-800 border-emerald-300 bg-emerald-50",
      image: "/images/bright_smiling_doctors.png",
      tag: "Doctor Dashboard Handoff"
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-[#f0fdf4] to-white relative z-10 border-b border-emerald-200/80 overflow-hidden text-slate-900">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] bg-emerald-400/15 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1150px]">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-emerald-600" /> Automated Triage Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">Works.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            A seamless 5-step automated sequence orchestrated by MedLink AI from initial alert to clinical intervention.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-rose-500 via-emerald-500 via-teal-500 to-green-600 rounded-full opacity-30"></div>

          <div className="space-y-14">
            {steps.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white border-2 border-emerald-400 shadow-xl flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
                    <item.icon className={`w-5 h-5 ${item.accent.split(' ')[0]}`} />
                  </div>

                  <div className="hidden md:block md:w-1/2"></div>

                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-14 md:text-right' : 'md:pl-14 md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-emerald-200/80 hover:border-emerald-400 shadow-[0_12px_35px_rgba(16,185,129,0.08)] hover:shadow-xl relative group transition-all overflow-hidden"
                    >
                      <div className={`flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-black border ${item.accent}`}>
                            STEP {item.step}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 font-bold">
                            ⏱️ {item.time}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>

                      <div className={`my-3.5 flex items-center gap-3.5 p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-emerald-300 flex-shrink-0 bg-slate-200 shadow-sm">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className={`flex-1 min-w-0 ${isEven ? 'md:text-right' : ''}`}>
                          <div className="text-[10px] font-bold text-emerald-700 uppercase font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 inline text-emerald-600" /> Verified Protocol
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>

                      <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono ${isEven ? 'md:justify-end' : ''}`}>
                        <span>System Automated & Synced</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
