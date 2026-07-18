import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { Shield, Globe, HeartPulse, Stethoscope, ChevronRight, Building2, Server, Key, Ambulance, BarChart, Lock, Users, Network, Clock, ActivitySquare, Star, Activity } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const isometricImage = {
  hidden: { opacity: 0, rotateX: 30, rotateY: -20, rotateZ: 10, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    rotateX: 15, 
    rotateY: -10, 
    rotateZ: 5,
    scale: 0.95,
    y: 0,
    transition: { duration: 1, ease: "easeOut" } 
  },
  hover: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1.02,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Landing() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground relative">

      <section className="relative w-full min-h-screen flex items-center pt-24 pb-32 overflow-hidden bg-[#030712] text-slate-50 border-b border-white/5">

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/immersive_ai_hospital_bg.png')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen scale-105 animate-pulse-slow"></div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent w-full md:w-2/3 z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)]"></div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 relative z-20">

              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white">
                Saving Every Second. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700">Connecting Every Hospital.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed max-w-xl font-light">
                The world's first AI-powered emergency referral and hospital resource network. Orchestrating live data across borders to route critical care instantly.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all rounded-lg border-0 group">
                    Request Demo <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-medium border-white/10 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all rounded-lg">
                    Explore Platform
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="pt-12 border-t border-white/5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Trusted by global healthcare networks</p>
                <div className="flex items-center gap-8 md:gap-12 opacity-50 grayscale">

                  <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6"/> WHO Network</div>
                  <div className="flex items-center gap-2 font-bold text-xl"><Building2 className="w-6 h-6"/> Apollo Care</div>
                  <div className="flex items-center gap-2 font-bold text-xl"><ActivitySquare className="w-6 h-6"/> AIIMS Global</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
              className="relative hidden lg:flex justify-center items-center h-full w-full min-h-[600px] perspective-[2000px]"
            >

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15, rotateX: 5 }}
                animate={{ opacity: 1, scale: 1, rotateY: 15, rotateX: 5 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute z-10 w-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-slate-800/50"
              >
                <img src="/images/doctor_team.png" alt="Expert Medical Team" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50, y: -50, rotateY: -15, rotateX: 10 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateY: -15, rotateX: 10 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 right-10 w-72 rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-5 z-20 hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center"><Ambulance className="w-3 h-3 mr-2 text-blue-400"/> Live Tracking</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">Unit Alpha-04</span>
                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">2m away</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ delay: 1, duration: 2 }} className="h-full bg-emerald-500"></motion.div>
                  </div>
                  <p className="text-xs text-slate-500">ETA to Central ER: 02:45 PM</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50, y: 50, rotateY: 25, rotateX: 5 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateY: 25, rotateX: 5 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="absolute top-1/4 -left-10 w-80 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-5 z-30 hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity AI Analysis</span>
                  <Activity className="w-4 h-4 text-rose-500"/>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-rose-500/30 flex items-center justify-center relative">
                    <span className="text-xl font-bold text-white">98<span className="text-xs">%</span></span>
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="175" strokeDashoffset="4" className="text-rose-500"></circle>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-1">Critical Priority</h4>
                    <p className="text-xs text-slate-400">Cardiovascular trauma detected. Auto-routing to nearest equipped ICU.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 100, rotateY: -10, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateY: -10, rotateX: 20 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className="absolute bottom-10 right-20 w-72 rounded-2xl bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-[0_0_50px_rgba(0,100,255,0.1)] p-5 z-10 hover:scale-105 transition-transform"
              >
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/5">Network Resources</div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-sm text-slate-300">Available ICU</span></div>
                    <span className="text-white font-bold text-lg">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-sm text-slate-300">Active Surgeries</span></div>
                    <span className="text-white font-bold text-lg">38</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-sm text-slate-300">Full Capacity</span></div>
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-muted/30 border-b border-border/40 backdrop-blur-md relative z-10">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">Trusted by World-Class Medical Institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-3 font-bold text-2xl"><HeartPulse className="w-8 h-8 text-rose-500"/> GlobalHealth</motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-3 font-bold text-2xl"><Stethoscope className="w-8 h-8 text-blue-500"/> Medico Intl</motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-3 font-bold text-2xl"><Building2 className="w-8 h-8 text-indigo-500"/> European Med</motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-3 font-bold text-2xl"><Globe className="w-8 h-8 text-cyan-500"/> WHO Tech Partner</motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-slate-950 text-white relative z-10">
        <div className="absolute inset-0 bg-[url('/images/auth-bg.png')] bg-cover bg-fixed opacity-10 mix-blend-screen" />
        <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { stat: "14,000+", label: "Hospitals Connected", desc: "Across 45 countries in real-time." },
              { stat: "3.2s", label: "Average Routing Time", desc: "Saving critical minutes on every dispatch." },
              { stat: "99.99%", label: "Uptime Guaranteed", desc: "Enterprise-grade reliability for life-saving systems." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl hover:bg-white/10 transition-colors">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-4">{item.stat}</div>
                <div className="text-xl font-bold text-primary mb-2">{item.label}</div>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full py-32 bg-background relative z-10">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Platform Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">A full-suite enterprise architecture designed for massive scale.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Hospital Management", desc: "Live tracking of bed availability across wards and specialized equipment." },
              { icon: Ambulance, title: "Advanced EMS Dispatch", desc: "Real-time GPS tracking and dynamic route optimization for ambulances." },
              { icon: Network, title: "Patient Referrals", desc: "AI-driven automated matching of critical patients to specialists." },
              { icon: BarChart, title: "Analytics Dashboard", desc: "Comprehensive metrics on transfer times and hospital load." },
              { icon: Lock, title: "Secure Health Records", desc: "End-to-end encrypted, HIPAA-compliant patient data transfer." },
              { icon: Users, title: "Multi-Platform Access", desc: "Dedicated interfaces tailored for Doctors, Admins, and EMTs." }
            ].map((module, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                className="group flex flex-col p-8 bg-card/60 backdrop-blur-md border border-border/40 rounded-[2.5rem] shadow-sm transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all">
                  <module.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24 lg:py-40 bg-muted/20 relative z-10 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl space-y-40">

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={fadeUp} className="flex-1 space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase border border-primary/20">Centralized Operations</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">Universal Data <br/>Synchronization.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                Transform regional health networks into a unified global command center. Our proprietary architecture ingests thousands of data points per second.
              </p>
            </motion.div>
            <div className="flex-1 order-1 lg:order-2 w-full" style={{ perspective: 1500 }}>
              <motion.img 
                variants={isometricImage} initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true, margin: "-10%" }}
                src="/images/features-hero.png" alt="Global Dispatch Center" className="w-full h-auto rounded-3xl shadow-2xl border border-white/20 dark:border-white/10" 
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 w-full" style={{ perspective: 1500 }}>
              <motion.img 
                variants={{
                  hidden: { opacity: 0, rotateX: 30, rotateY: 20, rotateZ: -10, scale: 0.8, y: 50 },
                  visible: { opacity: 1, rotateX: 15, rotateY: 10, rotateZ: -5, scale: 0.95, y: 0, transition: { duration: 1, ease: "easeOut" } },
                  hover: { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.02, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true, margin: "-10%" }}
                src="/images/doctor_team.png" alt="Expert Doctor Team" className="w-full h-auto rounded-3xl shadow-2xl border border-white/20 dark:border-white/10" 
              />
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={fadeUp} className="flex-1 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase border border-primary/20">Elite Care</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">World-Class <br/>Medical Teams.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                Our network connects you with elite, specialized medical professionals equipped with the latest diagnostic technology, ensuring precise and immediate care.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      <section className="w-full py-32 bg-background relative z-10">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">What Medical Leaders Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Trusted by those who make life-or-death decisions every day.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Jenkins", title: "Chief of Emergency", quote: "MedLink AI fundamentally changed how we manage mass casualty incidents. The global view is unparalleled." },
              { name: "James Holden", title: "Director of EMS", quote: "We've shaved an average of 4.5 minutes off our critical transport times. This system unequivocally saves lives." },
              { name: "Dr. Ali Rahman", title: "Head of Operations", quote: "The sheer scale and speed of this platform is breathtaking. It's the nervous system our hospital network always needed." }
            ].map((test, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6, ease: "backOut" }}
                className="p-8 rounded-[2.5rem] bg-card border border-border/60 shadow-lg relative flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex text-amber-400 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-xl italic font-medium leading-relaxed mb-8">"{test.quote}"</p>
                <div>
                  <h4 className="font-bold text-lg">{test.name}</h4>
                  <p className="text-sm text-primary font-semibold">{test.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-40 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 z-0 bg-[url('/images/contact-hero.png')] bg-cover bg-center opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />

        <div className="container px-4 md:px-6 mx-auto text-center max-w-4xl relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black tracking-tight mb-8 drop-shadow-2xl"
          >
            Scale your clinical <br className="hidden md:block"/>operations globally.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }}
            className="text-xl text-slate-300 mb-16 font-light max-w-2xl mx-auto"
          >
            Join the network that is defining the future of borderless healthcare.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/auth/register">
              <Button size="lg" className="h-16 px-12 text-xl font-bold shadow-[0_0_40px_rgba(var(--primary),0.5)] hover:scale-105 transition-transform border-0 rounded-[2rem]">
                Contact Global Sales
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
