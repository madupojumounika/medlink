import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="relative"
        >
          <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full"></div>
          <div className="w-32 h-32 mx-auto bg-slate-900/50 border border-white/10 rounded-full flex items-center justify-center relative z-10 shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Settings className="w-16 h-16 text-amber-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h1 className="text-4xl font-black text-white tracking-tight">System Maintenance</h1>
          <p className="text-slate-400 text-lg leading-relaxed">MedLink AI is currently undergoing scheduled network maintenance to upgrade our AI triage engine. Active emergencies are being handled via backup protocol.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold mb-2">
            <Clock className="w-5 h-5" /> Estimated Completion
          </div>
          <p className="text-white text-2xl font-black tracking-widest font-mono">01:45:00</p>
        </motion.div>
      </div>
    </div>
  );
}
