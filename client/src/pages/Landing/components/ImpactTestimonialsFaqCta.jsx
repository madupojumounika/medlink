import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ShieldCheck, Activity, Star, ChevronDown, ChevronUp, Zap, HelpCircle, ArrowRight, CheckCircle2, Globe, Award } from 'lucide-react';

export function ImpactSection() {
  const stats = [
    {
      value: "94.2%",
      label: "AI Triage Accuracy",
      desc: "Validated clinical accuracy across cardiovascular, trauma, and acute respiratory triage protocols.",
      gradient: "from-emerald-700 to-teal-700 font-mono"
    },
    {
      value: "< 1s",
      label: "Real-Time Telemetry Sync",
      desc: "Sub-second synchronization of ICU beds, ventilators, and specialist availability across networks.",
      gradient: "from-teal-700 to-green-700 font-mono"
    },
    {
      value: "-4.5m",
      label: "Smart EMS Routing",
      desc: "Average reduction in emergency response and patient transport time via GPS traffic optimization.",
      gradient: "from-green-700 to-emerald-700 font-mono"
    },
    {
      value: "500+",
      label: "Connected Networks",
      desc: "Top-tier medical centers and hospital command centers sharing real-time emergency capacity.",
      gradient: "from-emerald-800 to-teal-700 font-mono"
    }
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white relative z-10 border-b border-emerald-200/80 overflow-hidden text-slate-900">
      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1300px]">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-600" /> Proven Clinical Excellence
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Measurable Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">Impact.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Data-driven outcomes demonstrating how intelligent orchestration transforms emergency survival rates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-emerald-200/80 hover:border-emerald-400 shadow-[0_8px_30px_rgba(16,185,129,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} mb-3`}>
                  {item.value}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.label}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                <span>Verified Telemetry Metric</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "MedLink AI brings patient information, referral coordinators, and hospital resources together, helping emergency teams make faster decisions when every second dictates patient survival.",
      author: "Dr. Sarah Jenkins, MD",
      role: "Emergency Physician",
      hospital: "Johns Hopkins Emergency Network",
      avatar: "/images/doctor-smiling.png",
      rating: 5
    },
    {
      quote: "The real-time resource dashboard improves hospital coordination during critical situations. We have eliminated ICU overcrowding and streamlined EMS ambulance handoffs seamlessly.",
      author: "Marcus Vance, MPH",
      role: "Hospital Administrator",
      hospital: "St. Jude Metropolitan Healthcare",
      avatar: "/images/bright_smiling_doctors.png",
      rating: 5
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-[#f0fdf4] to-[#ecfdf5] relative z-10 border-b border-emerald-200/80 overflow-hidden text-slate-900">
      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1200px] space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Endorsed by Healthcare Leaders
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Trusted by Clinical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
              Professionals.
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            See how emergency physicians and hospital administrators rely on MedLink AI in production.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[3rem] bg-gradient-to-r from-emerald-950 via-[#022c22] to-slate-950 text-white p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(16,185,129,0.18)] border border-emerald-500/30 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-emerald-400" /> Clinical Advisory Board Spotlight
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Designed by Doctors. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300">
                  Built for Hospital Excellence.
                </span>
              </h3>

              <div className="flex items-center gap-3 py-1 text-emerald-400 font-mono text-xs font-bold">
                <span className="text-emerald-500 tracking-widest">────</span>
                <svg className="w-20 h-6 text-emerald-400 overflow-visible" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 0 15 L 20 15 L 28 5 L 36 25 L 44 0 L 52 28 L 60 10 L 68 20 L 76 15 L 100 15" />
                </svg>
                <span className="text-emerald-500 tracking-widest">────</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] border border-emerald-500/30 uppercase tracking-wider font-sans font-extrabold flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse text-emerald-400" /> Live Clinical Protocol
                </span>
              </div>

              <p className="text-emerald-100/90 text-sm sm:text-base font-normal leading-relaxed italic max-w-xl bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                "In emergency medicine, every second shaved off triage and transport directly increases survivability. MedLink AI gives our surgical teams and regional hospitals the exact real-time telemetry we need before the ambulance even reaches our doors."
              </p>

              <div className="pt-2 flex items-center justify-between max-w-xl border-t border-emerald-800/60 text-xs">
                <div>
                  <div className="font-extrabold text-white text-sm">Dr. Ananya Sharma, MD, FACS</div>
                  <div className="text-emerald-400 font-medium">Chief Medical Officer & Head of Trauma Surgery</div>
                </div>
                <div className="text-right font-mono text-slate-400 text-[11px]">
                  <span>JOHN HOPKINS / MAYO CLINIC</span>
                  <div className="text-emerald-300 font-bold">ADVISORY COUNCIL</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center relative">
              
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-emerald-400/40 fill-emerald-500/15 filter drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] transform rotate-45 animate-pulse" style={{ animationDuration: '6s' }} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 60 0 L 140 0 C 170 0, 200 30, 200 60 L 200 140 C 200 170, 170 200, 140 200 L 60 200 C 30 200, 0 170, 0 140 L 0 60 C 0 30, 30 0, 60 0 Z" stroke="currentColor" strokeWidth="4" />
                </svg>

                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-teal-300/50 fill-emerald-400/10 transform -rotate-12 scale-105" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 100 10 C 130 10, 150 30, 150 60 C 170 60, 190 80, 190 100 C 190 130, 170 150, 150 150 C 150 170, 130 190, 100 190 C 70 190, 50 170, 50 150 C 30 150, 10 130, 10 100 C 10 80, 30 60, 50 60 C 50 30, 70 10, 100 10 Z" stroke="currentColor" strokeWidth="3" />
                </svg>

                <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-[2.5rem] overflow-hidden border-4 border-white/80 shadow-2xl bg-gradient-to-b from-emerald-100 to-teal-50 group">
                  <img 
                    src="/images/physician-spotlight.png" 
                    alt="Dr. Ananya Sharma - Chief Medical Officer" 
                    className="w-full h-full object-cover object-top transform scale-105 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-3 left-4 right-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                      Verified Clinical Leader
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-6 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-3xl border border-emerald-200/80 shadow-[0_12px_40px_rgba(16,185,129,0.08)] flex flex-col justify-between relative overflow-hidden group hover:border-emerald-400 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(test.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-base sm:text-lg font-medium leading-relaxed italic text-slate-800">
                  "{test.quote}"
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-300 flex-shrink-0 bg-slate-100 shadow-sm">
                  <img src={test.avatar} alt={test.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{test.author}</h4>
                  <p className="text-xs text-emerald-700 font-bold">{test.role}</p>
                  <p className="text-[11px] text-slate-500 font-normal">{test.hospital}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does MedLink AI work in an acute emergency?",
      a: "MedLink AI connects patients, hospitals, doctors, referral coordinators, and ambulance fleets into a synchronized real-time cloud network. When an emergency occurs, our platform collects patient symptoms and vitals, uses machine learning to compute an immediate severity score, cross-references regional hospital ICU bed occupancy, and dispatches the nearest ambulance over GPS-priority traffic routes."
    },
    {
      q: "How does AI predict patient severity and triage priority?",
      a: "Our diagnostic engine uses trained Random Forest ensembles and Neural Networks to evaluate vital signs (heart rate, blood pressure, SpO2), patient age, medical history, and reported symptoms. The system compares these against clinical triage guidelines (ESI and Manchester protocols) to predict acute mortality risks with 94.2% validated accuracy."
    },
    {
      q: "What role does the Referral Coordinator play?",
      a: "Referral coordinators manage the inter-hospital triage queue. Using their dedicated portal, they oversee patient placement requests, evaluate real-time bed capacity across connected hospital departments, and ensure zero delay when transferring trauma or high-severity patients."
    },
    {
      q: "Is healthcare data secure and HIPAA compliant?",
      a: "Yes. Security and patient privacy are paramount. All telemetry and electronic medical records transmitted across MedLink AI are end-to-end encrypted using AES-256 and TLS 1.3 encryption protocols. We operate in strict compliance with HIPAA, GDPR, and HITECH healthcare regulations."
    },
    {
      q: "How can hospitals and ambulance fleets integrate with MedLink AI?",
      a: "Hospitals can connect seamlessly via our secure REST APIs and HL7/FHIR interoperability gateways without disrupting legacy EMR systems. Alternatively, hospitals and EMS teams can deploy our standalone web command center dashboards and tablet interfaces within 24 hours."
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white relative z-10 border-b border-emerald-200/80 text-slate-900">
      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[950px] space-y-14">
        
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" /> Got Questions?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Questions.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Everything you need to know about our emergency healthcare ecosystem and triage protocols.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-emerald-500 shadow-[0_10px_35px_rgba(16,185,129,0.12)]' 
                    : 'bg-white/80 border-emerald-200/60 hover:border-emerald-400 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="text-emerald-700 font-mono text-xs font-black">0{idx + 1}.</span> {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-emerald-100 text-emerald-700'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="w-full py-28 bg-gradient-to-b from-white via-[#f0fdf4] to-[#ecfdf5] relative z-10 overflow-hidden text-slate-900">
      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1150px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-14 lg:p-16 rounded-[3rem] bg-gradient-to-br from-emerald-900 via-[#022c22] to-slate-950 text-white border border-emerald-500/40 shadow-[0_25px_70px_rgba(16,185,129,0.25)] relative overflow-hidden space-y-6"
        >
          <div className="absolute inset-0 z-0 bg-[url('/images/contact-hero.png')] bg-cover bg-center opacity-20 mix-blend-screen pointer-events-none"></div>
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Ready For Enterprise Deployed Care
          </div>

          <h2 className="relative z-10 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12] max-w-3xl mx-auto">
            Transform Emergency Healthcare With <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
              Artificial Intelligence.
            </span>
          </h2>

          <p className="relative z-10 text-emerald-100/90 text-sm sm:text-base font-normal leading-relaxed max-w-xl mx-auto">
            Build a faster, smarter, and connected healthcare ecosystem today. Connect your hospital network or schedule a live technical demonstration.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link to="/auth/register">
              <Button size="md" className="w-full sm:w-auto h-12 px-8 text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_6px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_45px_rgba(16,185,129,0.6)] hover:scale-105 transition-all rounded-xl border-0">
                Deploy MedLink Workspace <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md" className="w-full sm:w-auto h-12 px-8 text-xs sm:text-sm font-bold border-white/20 text-white bg-white/10 hover:bg-white/20 hover:border-emerald-400 backdrop-blur-2xl transition-all rounded-xl">
                Contact Enterprise Sales
              </Button>
            </Link>
          </div>

          <div className="relative z-10 pt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold text-emerald-300/80 uppercase tracking-widest border-t border-white/10">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> HIPAA Compliant</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-teal-400" /> 99.99% SLA Uptime</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> 24/7 Dedicated Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
