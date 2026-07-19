import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Network, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-full mb-4">
            <Activity className="w-12 h-12 text-cyan-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">About MedLink AI</h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Revolutionizing emergency healthcare by connecting hospitals, ambulances, and doctors into one intelligent, AI-driven network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <h2 className="text-2xl font-bold text-white text-cyan-400">The Problem</h2>
            <p className="text-slate-300 leading-relaxed">
              During critical emergencies, doctors waste precious time manually calling multiple hospitals to find available ICU beds, specialists, and equipment. This delay in inter-hospital transfer severely impacts patient survivability.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-white text-emerald-400">Our Solution</h2>
            <p className="text-slate-300 leading-relaxed">
              MedLink AI creates a centralized, real-time dispatch system. Our AI evaluates patient severity instantly and matches them to the nearest hospital with available specialized resources, simultaneously routing an ambulance.
            </p>
          </motion.div>
        </div>

        <div className="py-12 border-y border-white/10">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Core Technology</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
                <Network className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Live Network</h3>
              <p className="text-slate-400 text-sm">Real-time sync of ICU beds, ventilators, and ambulances across districts.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Triage</h3>
              <p className="text-slate-400 text-sm">Neural networks process patient vitals to determine severity and required resources instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Enterprise Security</h3>
              <p className="text-slate-400 text-sm">HIPAA-compliant architecture ensuring all patient data is encrypted and secure.</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Future Scope & SDGs</h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            MedLink AI directly contributes to UN Sustainable Development Goal #3 (Good Health and Well-being). Our future scope includes integrating drone delivery for blood transport and predictive analytics for city-wide epidemic preparedness.
          </p>
        </div>
      </div>
    </div>
  );
}
