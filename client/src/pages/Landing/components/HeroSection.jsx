import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ChevronRight, Activity, Ambulance, Building2, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[88vh] flex items-center pt-28 pb-20 overflow-hidden bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-[#e6fcf5] text-slate-900 border-b border-emerald-200/80">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/medical-3d-bg.png')] bg-cover bg-center bg-no-repeat opacity-35 mix-blend-multiply"></div>
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-teal-300/25 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-green-300/20 rounded-full blur-[130px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966908_1px,transparent_1px),linear-gradient(to_bottom,#05966908_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1350px]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left z-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_2px_10px_rgba(16,185,129,0.12)]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
              AI-Powered Emergency Referral & Hospital Resource Network
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-slate-900">
              Saving Critical Minutes. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 drop-shadow-sm">
                Connecting Emergency Care.
              </span>
            </h1>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              MedLink AI synchronizes patients, hospitals, doctors, referral coordinators, and ambulance fleets into one real-time healthcare ecosystem. Built for instant triage decisions and optimized EMS allocation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link to="/auth/register">
                <Button size="md" className="w-full sm:w-auto h-11 px-7 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_6px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_35px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl border-0 group">
                  Deploy Workspace <ChevronRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#platform-overview">
                <Button variant="outline" size="md" className="w-full sm:w-auto h-11 px-7 text-xs font-bold border-emerald-300 text-emerald-900 bg-white/80 hover:bg-white hover:border-emerald-500 shadow-sm backdrop-blur-xl transition-all rounded-xl">
                  Explore Architecture
                </Button>
              </a>
            </div>

            <div className="pt-6 border-t border-emerald-200/80 grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-200/60 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center">94.2%<ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 ml-1" /></div>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">AI Triage Accuracy</div>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-200/60 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center">-4.5m<Clock className="w-3.5 h-3.5 text-teal-600 ml-1" /></div>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Faster Response</div>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-200/60 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center">100%<ShieldCheck className="w-3.5 h-3.5 text-emerald-600 ml-1" /></div>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">HIPAA Compliant</div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-6 relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.88, rotateY: -8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="relative w-full max-w-[420px] aspect-[4/3] rounded-[2.2rem] p-3 bg-white/95 border-2 border-emerald-300/80 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.25)] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="/images/command-center.png" 
                alt="Hospital Command Center" 
                className="w-full h-full object-cover rounded-[1.7rem] transform scale-105 group-hover:scale-110 transition-transform duration-700" 
              />
              
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-emerald-500/40 flex items-center justify-between text-white shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">ICU Telemetry Sync</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Node #01 Active • HL7/FHIR
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-mono text-slate-400">LATENCY</div>
                  <div className="text-xs font-bold font-mono text-emerald-300">8ms • Live</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.08 }}
              className="absolute -top-4 right-4 sm:right-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-2xl overflow-hidden z-30 bg-emerald-100 group flex items-center justify-center"
            >
              <img src="/images/hero-doctors.png" alt="Emergency Specialists" className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute bottom-1 bg-slate-900/90 text-[8px] font-bold text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                42 On Duty
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="absolute top-8 -left-3 sm:-left-8 w-60 sm:w-64 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-emerald-300/80 shadow-[0_15px_35px_rgba(16,185,129,0.18)] z-30 text-slate-900"
            >
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-100">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">AI Severity Triage</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-500/10 text-rose-600 border border-rose-300 uppercase">
                  Critical Risk
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 flex items-center justify-center">
                  <svg className="w-11 h-11 transform -rotate-90">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#e2e8f0" strokeWidth="3.5"></circle>
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="113" strokeDashoffset="7" strokeLinecap="round"></circle>
                  </svg>
                  <span className="absolute text-[11px] font-black text-slate-900">94%</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-extrabold text-slate-900">Score: 94.2% Critical</div>
                  <div className="text-[10px] text-slate-600 line-clamp-1">Acute STEMI / Cath Lab Alerted</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="absolute bottom-6 -right-3 sm:-right-8 w-60 sm:w-68 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-emerald-300/80 shadow-[0_15px_35px_rgba(16,185,129,0.2)] z-30 text-slate-900"
            >
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-100">
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <Ambulance className="w-3.5 h-3.5 text-emerald-600" /> EMS Live Navigation
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ETA: 4 Min</span>
              </div>
              
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-200 flex-shrink-0 bg-slate-100">
                  <img src="/images/ambulance.png" alt="Ambulance Fleet" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 font-mono">Unit Alpha-102</div>
                  <div className="text-[10px] text-slate-600">GPS Priority Traffic Avoidance</div>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-[78%] rounded-full animate-pulse"></div>
              </div>
              <div className="mt-1.5 flex justify-between text-[9px] font-semibold text-slate-500">
                <span>Code Red Siren Active</span>
                <span className="text-emerald-700 font-bold">1.8 km to St. Jude ER</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
