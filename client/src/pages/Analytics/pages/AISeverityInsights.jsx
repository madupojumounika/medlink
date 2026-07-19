import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, AlertTriangle } from 'lucide-react';

export default function AISeverityInsights() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <PageHeader title="AI Severity Insights" description="Performance and predictions of the neural triage engine." />
        <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-semibold flex items-center gap-2">
          <BrainCircuit className="w-3 h-3" /> Model v2.4 (Active)
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px]"></div>
          <h3 className="text-lg font-semibold text-white mb-6">Global Prediction Accuracy</h3>
          <div className="flex items-center justify-center py-6">
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                <circle cx="80" cy="80" r="70" stroke="#a855f7" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="44" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute text-center">
                <span className="text-4xl font-black text-white">94%</span>
                <p className="text-xs text-purple-400 mt-1 font-semibold">Confidence Score</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 h-full flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Categorization (Last 30 Days)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span className="text-slate-300">Level 1 (Critical)</span>
                </div>
                <span className="text-white font-mono">18.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-300">Level 2 (High)</span>
                </div>
                <span className="text-white font-mono">34.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-300">Level 3 (Stable)</span>
                </div>
                <span className="text-white font-mono">47.4%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
