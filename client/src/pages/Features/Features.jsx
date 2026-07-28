import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, Ambulance, Network, BarChart, Lock, Users, 
  ShieldCheck, Zap, Globe2, CheckCircle2, ArrowRight, Activity, 
  Clock, Shield, Sparkles, Layers, Cpu, Server, Radio, 
  Smartphone, AlertTriangle, ChevronRight, Eye
} from 'lucide-react';
import { Button } from '@/components/common/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function Features() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'command', label: 'Hospital Command' },
    { id: 'ems', label: 'EMS & Dispatch' },
    { id: 'triage', label: 'AI Clinical Triage' },
    { id: 'security', label: 'Security & Compliance' },
  ];

  const features = [
    {
      category: 'command',
      icon: Building2,
      badge: 'Command Center',
      title: 'Hospital Resource Management',
      desc: 'Live tracking of bed availability across ICUs, specialized surgical rooms, ventilators, and real-time on-call staff rosters with automated bottleneck alerts.',
      metric: '88% Avg ICU Efficiency'
    },
    {
      category: 'ems',
      icon: Ambulance,
      badge: 'EMS Telemetry',
      title: 'Advanced EMS Dispatch & GPS',
      desc: 'Real-time GPS tracking for ambulance fleets, dynamic route optimization avoiding traffic congestions, and precise ETA sync directly with hospital trauma bays.',
      metric: '-4.8 mins Avg Transit Time'
    },
    {
      category: 'triage',
      icon: Network,
      badge: 'Neural Engine',
      title: 'Intelligent Patient Referrals',
      desc: 'AI-driven automated matching of critical patients to the correct specialists based on clinical acuity (ESI scoring), facility proximity, and real-time equipment availability.',
      metric: '< 45s Specialist Match'
    },
    {
      category: 'command',
      icon: BarChart,
      badge: 'Global Analytics',
      title: 'Real-Time Telemetry Dashboard',
      desc: 'Comprehensive real-time metrics on transfer times, hospital load distributions, emergency surge predictions, and regional healthcare network capacity.',
      metric: '10M+ Events Analyzed'
    },
    {
      category: 'security',
      icon: Lock,
      badge: 'HIPAA Certified',
      title: 'Secure Health Records & EHR Sync',
      desc: 'End-to-end encrypted, HIPAA and GDPR-compliant patient data transfer between emergency responders, referral coordinators, and receiving hospitals.',
      metric: '256-Bit AES Encryption'
    },
    {
      category: 'triage',
      icon: Users,
      badge: 'Role-Based UI',
      title: 'Multi-Platform Access & Workspaces',
      desc: 'Dedicated, role-based interfaces specifically tailored for Trauma Surgeons, Hospital Administrators, Referral Coordinators, EMTs, and Patients.',
      metric: '6 Synchronized Roles'
    },
    {
      category: 'security',
      icon: ShieldCheck,
      badge: 'Audit & Legal',
      title: 'Automated Regulatory Audit Trails',
      desc: 'Immutable logging of all transfer authorizations, clinical triage communications, and patient record access for seamless regulatory compliance and hospital accreditation.',
      metric: '100% Audit Readiness'
    },
    {
      category: 'command',
      icon: Zap,
      badge: 'Cloud Native',
      title: '48-Hour Regional Network Onboarding',
      desc: 'Zero-downtime cloud-native architecture allows entire regional hospital networks and third-party EMS providers to onboard and go live within 48 hours.',
      metric: '99.999% SLA Uptime'
    },
    {
      category: 'ems',
      icon: Globe2,
      badge: 'Cross-Border',
      title: 'Multi-Language & Cross-Border EMS',
      desc: 'Real-time medical translation and localization for cross-border emergency transports, international air ambulance dispatches, and multi-national clinical teams.',
      metric: '24+ Languages Supported'
    }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(f => f.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white text-slate-900 selection:bg-emerald-600 selection:text-white font-sans antialiased pt-28 pb-24">
      
      {/* 1. Hero Header with Light Green Ambient Gradients */}
      <div className="container relative mx-auto px-6 lg:px-12 max-w-[1350px]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-teal-300/20 rounded-full blur-[140px] pointer-events-none"></div>

        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger} 
          className="text-center space-y-5 max-w-4xl mx-auto mb-16 relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold tracking-wide backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
            Enterprise-Grade Clinical Architecture
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900">
            Platform Features for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 drop-shadow-sm">
              Borderless Healthcare
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover the comprehensive suite of AI-powered tools synchronizing hospital command centers, surgical specialists, and emergency medical services in real time.
          </motion.p>
        </motion.div>

        {/* 2. Interactive Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 relative z-10">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.35)] scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-emerald-700 border border-emerald-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Spotlight Feature Showcase (Glassmorphism Command Banner) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-emerald-900 via-[#033a2d] to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(5,150,105,0.25)] border border-emerald-500/30 mb-20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" /> Live Flagship Capability
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                Global Control Center & Emergency Triage Grid
              </h2>
              <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
                Our 3D command dashboard aggregates millions of live clinical telemetry points. Monitor ambulance transport corridors, regional trauma center workloads, and specialty room availability in real time during mass casualty events.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md">
                  <div className="text-xs text-emerald-300 font-medium mb-0.5">Fleet Telemetry</div>
                  <div className="text-xl font-extrabold text-white flex items-center gap-1.5">
                    100% Real-Time <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md">
                  <div className="text-xs text-emerald-300 font-medium mb-0.5">AI Acuity Matching</div>
                  <div className="text-xl font-extrabold text-white">99.4% Accuracy</div>
                </div>
              </div>
              <div className="pt-2">
                <Link to="/auth/register">
                  <Button size="md" className="h-11 px-7 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    Test Command Center Live <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg bg-slate-900/80 rounded-2xl border border-emerald-500/40 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-800/60 text-xs text-emerald-300 font-mono">
                  <span className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> MEDLINK_EMERGENCY_GRID_v3.4</span>
                  <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 font-bold">ONLINE</span>
                </div>
                <div className="space-y-3">
                  {[
                    { unit: "EMS Unit #402", status: "In Transit -> Memorial Trauma ICU", eta: "3 mins", code: "ESI Level 1", color: "text-red-400 bg-red-950/50 border-red-800" },
                    { unit: "Surgeon On-Call", status: "Dr. Aris Vance (Neuro) Assigned", eta: "Ready", code: "Confirmed", color: "text-emerald-400 bg-emerald-950/50 border-emerald-800" },
                    { unit: "Hospital Ward 4B", status: "2 Ventilator Beds Reserved", eta: "Active", code: "Allocated", color: "text-teal-400 bg-teal-950/50 border-teal-800" }
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                      <div>
                        <div className="font-bold text-white">{row.unit}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{row.status}</div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-bold ${row.color}`}>
                          {row.code}
                        </span>
                        <div className="text-[10px] text-emerald-400 font-mono mt-1">ETA: {row.eta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Flagship Stethoscope & Live ECG Diagnostic Telemetry Banner (Inspired by Sample Image 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(16,185,129,0.2)] border border-emerald-500/30 mb-24 relative overflow-hidden text-white"
        >
          {/* Ambient Background Glows */}
          <div className="absolute top-1/2 left-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[130px] pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Diagnostic Telemetry & ECG Wave (Matching Sample Image 5 Style) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" /> Diagnostic Telemetry Protocol
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Live Biometric Sync & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300">
                  Continuous Vital Diagnostics.
                </span>
              </h2>

              {/* Glowing ECG Heartbeat Pulse Line (Inspired by Sample Image 5) */}
              <div className="flex items-center gap-3 py-2 text-emerald-400 font-mono text-xs font-bold">
                <span className="text-emerald-500 tracking-widest">────</span>
                <svg className="w-28 h-8 text-emerald-400 overflow-visible filter drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 0 15 L 20 15 L 28 5 L 36 25 L 44 0 L 52 28 L 60 10 L 68 20 L 76 15 L 100 15" />
                </svg>
                <span className="text-emerald-500 tracking-widest">────</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] border border-emerald-500/30 uppercase tracking-wider font-sans font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> 100% Real-Time
                </span>
              </div>

              <p className="text-emerald-100/90 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
                MedLink AI interfaces directly with hospital monitors and ambulance defibrillators to transmit SpO2, ECG waveforms, and arterial blood gas metrics directly to awaiting ICU surgical teams before patient arrival.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 max-w-xl">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md">
                  <div className="text-emerald-400 font-black text-sm">HL7 / FHIR</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">Universal EHR Protocol</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md">
                  <div className="text-emerald-400 font-black text-sm">Zero Latency</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">Sub-second vital streaming</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md col-span-2 sm:col-span-1">
                  <div className="text-emerald-400 font-black text-sm">AI Acuity</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">Automated ESI scoring</div>
                </div>
              </div>
            </div>

            {/* Right Column: Stethoscope Close-up in Horizontal Capsule / Oval Frame (Matching Sample Image 5) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              
              <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center">
                
                {/* Glowing Capsule Outline Behind Image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/25 to-teal-400/15 rounded-[60px] filter drop-shadow-[0_0_35px_rgba(16,185,129,0.3)] transform -rotate-3 scale-105 animate-pulse" style={{ animationDuration: '6s' }}></div>
                <div className="absolute inset-0 border-2 border-emerald-400/35 rounded-[60px] transform rotate-2"></div>

                {/* Stethoscope Photograph inside Capsule Frame */}
                <div className="relative z-10 w-full h-full rounded-[50px] overflow-hidden border-4 border-white/85 shadow-2xl group bg-slate-950">
                  <img 
                    src="/images/stethoscope-ecg.png" 
                    alt="Clinical Stethoscope & ECG Waveform Diagnostics" 
                    className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-500/50 flex items-center justify-between text-white shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Activity className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white">Biometric Telemetry</div>
                        <div className="text-[10px] text-emerald-300">Continuous Vital Diagnostics</div>
                      </div>
                    </div>
                    <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-2.5 py-1 rounded-full uppercase">Active Sync</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* 4. Rich Feature Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24"
          >
            {filteredFeatures.map((feature, i) => (
              <div 
                key={i} 
                className="flex flex-col justify-between p-7 bg-white/80 hover:bg-white border border-emerald-200/70 hover:border-emerald-500/80 rounded-2xl shadow-[0_4px_20px_rgba(16,185,129,0.05)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.15)] transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[11px] font-bold tracking-wide">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-normal mb-6">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> {feature.metric}</span>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Learn More <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 5. Enterprise Architectural Comparison Table */}
        <div className="bg-white/90 border border-emerald-200/80 rounded-3xl p-8 sm:p-12 shadow-[0_10px_40px_rgba(16,185,129,0.08)] mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
              Why Healthcare Leaders Choose MedLink AI
            </h2>
            <p className="text-slate-600 text-sm">
              See how autonomous AI referral routing outperforms legacy manual hospital dispatching.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Capability Benchmark</th>
                  <th className="py-4 px-6 text-slate-400">Legacy Manual Dispatch (Phone / Fax)</th>
                  <th className="py-4 px-6 bg-emerald-50/80 text-emerald-800 font-extrabold rounded-t-xl border-t border-x border-emerald-300/80">
                    MedLink AI Platform
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100 text-xs sm:text-sm font-normal text-slate-700">
                {[
                  { bench: "Emergency Triage Matching", leg: "8 - 18 minutes (Manual phone calls)", med: "Instant (< 45 seconds) via ESI Acuity ML" },
                  { bench: "Ambulance Route Optimization", leg: "Static GPS, blind to ER bottlenecks", med: "Live predictive traffic & trauma bay sync" },
                  { bench: "Inter-Hospital EHR Transfer", leg: "Paper faxes, unencrypted email attachments", med: "256-bit AES encrypted HIPAA / GDPR streams" },
                  { bench: "Bed Availability Awareness", leg: "Manual shift reports, often 6h outdated", med: "Real-time automated ward & ICU telemetry" },
                  { bench: "Regulatory Audit Compliance", leg: "Fragmented paper logs & voice recordings", med: "100% automated immutable audit trails" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{row.bench}</td>
                    <td className="py-4 px-6 text-slate-500">{row.leg}</td>
                    <td className="py-4 px-6 bg-emerald-50/50 font-bold text-emerald-900 border-x border-emerald-200/60 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {row.med}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 rounded-3xl p-8 sm:p-14 text-center text-white shadow-[0_15px_45px_rgba(16,185,129,0.3)] relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-2xl sm:text-4xl font-black mb-4 relative z-10">
            Ready to Upgrade Your Regional Healthcare Network?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal relative z-10">
            Deploy your MedLink AI hospital workspace today or schedule a custom clinical simulation with our engineering team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/auth/register">
              <Button size="md" className="h-12 px-8 text-xs font-bold bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg hover:scale-105 transition-all rounded-xl border-0">
                Deploy Workspace Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md" className="h-12 px-8 text-xs font-bold border-white/60 text-white hover:bg-white/10 rounded-xl">
                Contact Enterprise Sales
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

