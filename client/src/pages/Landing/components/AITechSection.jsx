import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Sparkles, Activity, GitBranch, ArrowRight, ArrowDown, Network, BarChart2, Zap, CheckCircle2 } from 'lucide-react';

export function AITechSection() {
  const pipeline = [
    {
      step: "01",
      title: "Patient Data Collection",
      desc: "Ingesting live symptom reports, EMS vital telemetry, blood oxygen saturation, and electronic medical records in real time.",
      icon: Database,
      color: "from-emerald-600/20 to-teal-500/10 border-emerald-500/40 text-emerald-700 bg-emerald-50"
    },
    {
      step: "02",
      title: "Machine Learning Processing",
      desc: "Random Forest ensembles and Neural Networks evaluate clinical markers against 500k+ historical emergency trauma cases.",
      icon: Brain,
      color: "from-teal-600/20 to-green-500/10 border-teal-500/40 text-teal-700 bg-teal-50"
    },
    {
      step: "03",
      title: "Severity Prediction & Scoring",
      desc: "Sub-second computation of acute mortality risk, assigning Manchester/ESI triage priority scores with 94.2% accuracy.",
      icon: Activity,
      color: "from-green-600/20 to-emerald-500/10 border-green-500/40 text-green-700 bg-green-50"
    },
    {
      step: "04",
      title: "Smart Recommendation & Routing",
      desc: "Automated routing of ambulance fleet and instant digital referral broadcast to the optimal specialized hospital ICU.",
      icon: GitBranch,
      color: "from-emerald-600/20 to-teal-500/10 border-emerald-500/40 text-emerald-800 bg-emerald-50"
    }
  ];

  const technologies = [
    {
      icon: Network,
      title: "Random Forest Ensembles",
      desc: "Multi-tree decision classification trained on clinical emergency datasets to eliminate diagnostic variances.",
      badge: "Clinical Ensembles"
    },
    {
      icon: Cpu,
      title: "Neural Network Architectures",
      desc: "Deep learning models processing non-linear vital sign telemetry and physiological deterioration trends.",
      badge: "Deep Learning"
    },
    {
      icon: BarChart2,
      title: "Real-Time Telemetry Analytics",
      desc: "High-throughput stream processing analyzing hospital ICU load and regional capacity at 12,000 req/sec.",
      badge: "Sub-Second Telemetry"
    },
    {
      icon: Sparkles,
      title: "Proactive Triage Intelligence",
      desc: "Predictive resource allocation forecasting emergency room surges 4 hours before capacity bottlenecks occur.",
      badge: "Predictive Triage"
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white relative z-10 border-b border-emerald-200/80 overflow-hidden text-slate-900">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:36px_36px] opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-emerald-300/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container relative z-10 px-6 lg:px-12 mx-auto max-w-[1300px] space-y-20">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5 animate-pulse text-emerald-600" /> Proprietary Triage Engine
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            AI Technology <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
              Under The Hood.
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Enterprise predictive intelligence combining clinical machine learning with real-time telemedical streaming.
          </p>
        </div>

        <div className="relative">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-300">
              Automated Diagnostic & Decision Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {pipeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-emerald-200/80 shadow-[0_10px_30px_rgba(16,185,129,0.08)] hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color.split(' ')[2]} ${item.color.split(' ')[3]} ${item.color.split(' ')[4]} shadow-sm`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                      STAGE {item.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {idx < pipeline.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-2 border-emerald-400 shadow-md items-center justify-center z-20 text-emerald-700">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
                {idx < pipeline.length - 1 && (
                  <div className="flex lg:hidden justify-center my-3 text-emerald-600">
                    <ArrowDown className="w-6 h-6 animate-bounce" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-emerald-900 to-[#022c22] text-white shadow-2xl overflow-hidden relative">
          <div className="lg:col-span-6 space-y-4 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-800/60 px-3 py-1 rounded-full border border-emerald-600">
              Neural Telemetry Engine
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Deep Learning That Understands Acute Clinical Deterioration.
            </h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
              Our neural network models continuously evaluate patient vital signs in transit—alerting hospital teams instantly if a patient's condition shifts from urgent to critical before arrival.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 500,000+ Cases Trained
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ESI & Manchester Verified
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-2xl relative group">
              <img src="/images/network-abstract.png" alt="AI Neural Telemetry" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-xs font-bold text-emerald-200 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                Live Inference Rate: 12,000 req/sec
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Core Machine Learning Architectures</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, borderColor: "rgba(16,185,129,0.6)" }}
                className="p-6 rounded-3xl bg-white/95 border border-emerald-200/80 hover:bg-white shadow-[0_8px_25px_rgba(16,185,129,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <tech.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                      {tech.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">{tech.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{tech.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-[10px] font-bold text-emerald-700 uppercase font-mono">
                  <Zap className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Production Deployed
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
