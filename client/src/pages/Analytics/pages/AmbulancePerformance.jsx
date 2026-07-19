import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { ChartCard } from '@/components/common/ChartCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const responseData = [
  { month: 'May', time: 9.5 },
  { month: 'Jun', time: 8.2 },
  { month: 'Jul', time: 7.8 },
  { month: 'Aug', time: 7.1 },
  { month: 'Sep', time: 6.5 },
  { month: 'Oct', time: 5.8 },
];

export default function AmbulancePerformance() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader title="Fleet Performance Tracking" description="Metrics on ambulance dispatch times and unit efficiency." />

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
          <p className="text-slate-400 text-sm mb-2">Total Trips (YTD)</p>
          <p className="text-3xl font-bold text-white">14,284</p>
          <p className="text-emerald-400 text-xs mt-2">↑ 18% vs last year</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
          <p className="text-slate-400 text-sm mb-2">Avg Distance / Trip</p>
          <p className="text-3xl font-bold text-white">6.2 mi</p>
          <p className="text-slate-500 text-xs mt-2">Consistent with avg</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <p className="text-slate-400 text-sm mb-2">Route Optimization Savings</p>
          <p className="text-3xl font-bold text-emerald-400">1,240 hrs</p>
          <p className="text-emerald-500/70 text-xs mt-2">AI-assisted routing impact</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <ChartCard title="Average Dispatch Response Time" description="Minutes from call received to unit arriving on scene">
          <LineChart data={responseData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[4, 12]} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="time" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ChartCard>
      </motion.div>
    </div>
  );
}
