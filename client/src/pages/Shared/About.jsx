import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Target, Users, HeartPulse, Sparkles, Activity, 
  CheckCircle2, Globe2, Award, Clock, ArrowRight, Building, 
  MapPin, Zap, Lock, Cpu
} from 'lucide-react';
import { Button } from '@/components/common/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function About() {
  const leadership = [
    {
      name: "Dr. Elena Rostova, MD, FACS",
      role: "Co-Founder & Chief Executive Officer",
      bio: "Former Chief of Trauma Surgery at Johns Hopkins with 18 years on front-line emergency medical dispatch and mass casualty coordination.",
      img: "https://images.unsplash.com/photo-1594824813571-678b88612959?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Marcus Vance, PhD",
      role: "Co-Founder & Chief Architect",
      bio: "Distributed systems engineer and former AI tech lead at Google Health, specializing in real-time predictive clinical routing and ESI neural algorithms.",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Kenji Sato, MD, PhD",
      role: "VP of Medical Informatics & Telemetry",
      bio: "Pioneer in EMS biometric integration and real-time hospital interoperability, advising global health ministries on disaster response.",
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80"
    }
  ];

  const values = [
    { 
      icon: Shield, 
      title: "Mission-Critical Reliability", 
      desc: "In emergency healthcare, downtime is fatal. Our redundant cloud architectures guarantee 99.999% uptime across all regional dispatch grids." 
    },
    { 
      icon: Target, 
      title: "Clinical Precision First", 
      desc: "Every routing suggestion is mathematically modeled on ESI triage standards and verified surgical bed availability to ensure zero misallocations." 
    },
    { 
      icon: HeartPulse, 
      title: "Patient Outcomes Above All", 
      desc: "We measure our success not by server clicks, but by minutes shaved off critical transport intervals and life-saving intervention speed." 
    },
    { 
      icon: Users, 
      title: "Borderless Collaboration", 
      desc: "Unifying fragmented emergency medical teams—from highway paramedics to ICU nurses and on-call neurosurgeons—into a single synchronized network." 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white text-slate-900 selection:bg-emerald-600 selection:text-white font-sans antialiased pt-28 pb-24">

      <div className="container relative mx-auto px-6 lg:px-12 max-w-[1350px]">
        
        {/* Ambient Gradients */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-400/20 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-teal-300/20 rounded-full blur-[140px] pointer-events-none"></div>

        {/* 1. Hero Header */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger} 
          className="text-center space-y-5 max-w-4xl mx-auto mb-20 relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold tracking-wide backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
            The MedLink AI Origin & Global Mission
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900">
            Our Mission: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 drop-shadow-sm">
              Zero Wasted Minutes
            </span> in Emergency Care
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            We are bridging the gap between first responders and specialized surgical care with autonomous medical routing and real-time clinical intelligence.
          </motion.p>
        </motion.div>

        {/* 2. Impact & Scale Metrics Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24 relative z-10"
        >
          {[
            { metric: "2.4M+", label: "Critical Transfers Routed", sub: "Across 4 continents" },
            { metric: "4.8 Mins", label: "Avg Time Saved Per Triage", sub: "Directly boosting survivability" },
            { metric: "140+", label: "Partner Hospital Networks", sub: "Integrated with Epic & Cerner" },
            { metric: "99.999%", label: "Uptime Reliability SLA", sub: "Zero unplanned outages" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 hover:bg-white border border-emerald-200/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(16,185,129,0.06)] transition-all text-center group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-1 group-hover:scale-105 transition-transform">
                {stat.metric}
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* 3. The Challenge & Why We Built MedLink AI */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-28 relative z-10">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> Why We Built This
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              When Time is Tissue, Archaic Dispatching Cost Lives.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every year, millions of critical minutes are lost due to fragmented communication between paramedics and emergency rooms. Traditional dispatch relies on phone calls, whiteboards, and blind radio chatter—leaving trauma surgeons unprepared until the ambulance arrives at the door.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              MedLink AI was founded in 2024 by a multidisciplinary team of trauma surgeons and distributed systems architects who saw firsthand that solving emergency delays wasn't just a matter of faster ambulances, but intelligent data routing.
            </p>
            
            <div className="pt-2 flex items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1594824813571-678b88612959?w=100&auto=format&fit=crop&q=80" alt="Doctor" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&auto=format&fit=crop&q=80" alt="Engineer" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&auto=format&fit=crop&q=80" alt="Specialist" />
              </div>
              <div className="text-xs font-medium text-slate-700">
                Backed by top clinical advisors from <span className="font-bold text-emerald-800">Johns Hopkins, Mayo Clinic, & Stanford Medicine</span>.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-emerald-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-2xl border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl"></div>
              
              <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" /> Emergency Triage Timeline Comparison
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 border border-red-500/30 rounded-2xl p-4.5 backdrop-blur-md">
                  <div className="flex justify-between items-center text-xs font-bold text-red-400 mb-1.5">
                    <span>LEGACY MANUAL PROTOCOL</span>
                    <span>Avg Time: 18.5 Mins</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Paramedic calls dispatch → Dispatch calls ER desk → Nurse checks whiteboard → On-call specialist paged via phone → Ambulance rerouted due to full ICU.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/60 rounded-2xl p-4.5 backdrop-blur-md shadow-lg">
                  <div className="flex justify-between items-center text-xs font-extrabold text-emerald-300 mb-1.5">
                    <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-400" /> MEDLINK AI AUTONOMOUS ROUTING</span>
                    <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black text-[10px]">45 SECONDS</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 font-medium">
                    AI scans patient ESI vitals → Automatically reserves closest surgical suite & ventilator → Instant EHR telemetry synced to Surgeon's mobile device & ER trauma bay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Core Values Grid */}
        <div className="mb-28 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Our Core Clinical Values</h2>
            <p className="text-slate-600 text-sm">The non-negotiable architectural principles guiding every line of code we write.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div 
                key={i} 
                className="bg-white/80 hover:bg-white p-7 rounded-2xl border border-emerald-200/70 hover:border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.05)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.15)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <val.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">{val.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{val.desc}</p>
                </div>
                <div className="pt-4 mt-6 border-t border-emerald-100/80 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Standard
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Leadership Team Showcase */}
        <div className="mb-28 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-bold uppercase tracking-wider mb-3">
              Executive Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Guided by Clinical Pioneers & Systems Experts</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">Our team brings decades of trauma surgery, healthcare informatics, and high-scale cloud engineering experience.</p>
          </div>

          {/* Flagship Healthcare Team Banner (Inspired by Sample Image 4: "Your Health Our Priority") */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 rounded-[2.5rem] bg-gradient-to-r from-[#01241b] via-emerald-900 to-slate-900 text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-emerald-500/30 relative overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Title & Multi-Point Clinical Commitment (Matching Reference Banner) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <HeartPulse className="w-4 h-4 text-emerald-400 animate-pulse" /> Unified Clinical Excellence
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Your Emergency Care. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300">
                    Our Uncompromised Priority.
                  </span>
                </h3>

                <p className="text-emerald-100/90 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
                  From initial triage diagnosis to emergency ICU recovery, MedLink AI connects multidisciplinary specialist teams across 500+ hospital centers under one synchronized digital roof.
                </p>

                {/* Slanted / Rounded Clinical Badges Strip (Inspired by Sample Image 4 Thumbnails) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl">
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
                    <div className="text-emerald-400 font-black text-sm mb-0.5">24/7 Triage</div>
                    <div className="text-[11px] text-slate-300">Real-time acute care routing</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
                    <div className="text-emerald-400 font-black text-sm mb-0.5">500+ Specialists</div>
                    <div className="text-[11px] text-slate-300">Board-certified physicians</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all col-span-2 sm:col-span-1">
                    <div className="text-emerald-400 font-black text-sm mb-0.5">Patient-First</div>
                    <div className="text-[11px] text-slate-300">Zero latency dispatch</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-emerald-300 border-t border-emerald-800/60 max-w-xl">
                  <span>● ACUTE CARE PROTOCOL</span>
                  <span>● MULTI-HOSPITAL NETWORK</span>
                </div>
              </div>

              {/* Right Column: Full Medical Team Photo in Slanted Arch Showcase Frame */}
              <div className="lg:col-span-5 flex items-center justify-center relative">
                
                {/* Slanted Geometric Backdrop Outline */}
                <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-400/10 rounded-[40px] transform -rotate-3 scale-105 border border-emerald-400/30 animate-pulse" style={{ animationDuration: '7s' }}></div>
                  <div className="absolute inset-0 bg-emerald-950/40 rounded-[40px] transform rotate-3 border border-teal-500/20"></div>

                  {/* Medical Team Photograph */}
                  <div className="relative z-10 w-full h-full rounded-[35px] overflow-hidden border-4 border-white/80 shadow-2xl group">
                    <img 
                      src="/images/medical-team.png" 
                      alt="MedLink Multidisciplinary Medical Team" 
                      className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-70"></div>
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-500/50 flex items-center justify-between text-white shadow-xl">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-white">Clinical Advisory Team</div>
                          <div className="text-[10px] text-emerald-300">Multi-Specialty Healthcare Council</div>
                        </div>
                      </div>
                      <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-2.5 py-1 rounded-full uppercase">Verified</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, idx) => (
              <div key={idx} className="bg-white/90 border border-emerald-200/80 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.18)] transition-all duration-300 group flex flex-col">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img 
                    src={leader.img} 
                    alt={leader.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black uppercase mb-1 shadow-sm">
                      Leadership
                    </span>
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">{leader.name}</h3>
                    <p className="text-xs font-extrabold text-emerald-600 uppercase tracking-wide mb-3">{leader.role}</p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{leader.bio}</p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>MedLink Executive Board</span>
                    <span className="text-emerald-600 flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Certified Fellow</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Global Footprint & Compliance Strip */}
        <div className="bg-gradient-to-r from-emerald-900 via-[#033a2d] to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-500/30 relative z-10 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" /> Global Operations & Trust
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                HIPAA, GDPR, & SOC2 Type II Certified
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
                We operate secure, regional health cloud clusters across North America, Europe, and Asia-Pacific, ensuring patient health records never cross unauthorized jurisdictional boundaries.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {["San Francisco (HQ)", "Zurich (EMEA)", "Tokyo (APAC)", "London (UK)"].map((city, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {city}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-center gap-4">
              <div className="bg-white/10 border border-white/15 p-5 rounded-2xl backdrop-blur-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shrink-0 shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Enterprise Security SLA</div>
                  <div className="text-xs text-emerald-200/80 mt-0.5">Automated end-to-end encryption with zero-knowledge routing pipelines.</div>
                </div>
              </div>

              <div className="bg-white/10 border border-white/15 p-5 rounded-2xl backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-300 font-bold uppercase">Ready to partner with us?</div>
                  <div className="text-sm font-extrabold text-white">Contact our Clinical Tech Team</div>
                </div>
                <Link to="/contact">
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs h-9 px-4 rounded-xl shadow-md">
                    Connect <ArrowRight className="ml-1 w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

