import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { motion } from 'framer-motion';

export default function ResourceUtilization() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader title="Resource & ICU Utilization" description="Network-wide availability of critical medical resources." />

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">ICU Bed Occupancy</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Central General Hospital</span>
                  <span className="text-rose-400 font-medium">95% Full</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-rose-500 h-full w-[95%] rounded-full"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Northside Trauma Center</span>
                  <span className="text-amber-400 font-medium">82% Full</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-amber-500 h-full w-[82%] rounded-full"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">St. Jude Cardiac</span>
                  <span className="text-emerald-400 font-medium">45% Full</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-emerald-500 h-full w-[45%] rounded-full"></div></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Critical Equipment</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                <p className="text-slate-400 text-sm mb-1">Available Ventilators</p>
                <p className="text-2xl font-bold text-emerald-400">142</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                <p className="text-slate-400 text-sm mb-1">Portable Defibs</p>
                <p className="text-2xl font-bold text-amber-400">28</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                <p className="text-slate-400 text-sm mb-1">O2 Supply Status</p>
                <p className="text-xl font-bold text-emerald-400">Adequate</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/20 bg-rose-500/5">
                <p className="text-slate-400 text-sm mb-1">Blood Stock (O-)</p>
                <p className="text-xl font-bold text-rose-400">Critical Low</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
