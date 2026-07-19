import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { ChartCard } from '@/components/common/ChartCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const referralData = [
  { month: 'Jul', created: 320, accepted: 290 },
  { month: 'Aug', created: 380, accepted: 340 },
  { month: 'Sep', created: 450, accepted: 410 },
  { month: 'Oct', created: 520, accepted: 480 },
  { month: 'Nov', created: 610, accepted: 550 },
  { month: 'Dec', created: 740, accepted: 690 },
];

export default function ReferralAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Referral Analytics" description="Inter-hospital transfer volumes and acceptance rates." />

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-1">Total Created (YTD)</p>
          <p className="text-2xl font-bold text-white">3,020</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
          <p className="text-emerald-400 text-sm mb-1">Total Accepted</p>
          <p className="text-2xl font-bold text-emerald-400">2,760</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-rose-500/20 rounded-2xl p-6">
          <p className="text-rose-400 text-sm mb-1">Total Rejected</p>
          <p className="text-2xl font-bold text-rose-400">185</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6">
          <p className="text-amber-400 text-sm mb-1">Currently Pending</p>
          <p className="text-2xl font-bold text-amber-400">75</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <ChartCard title="Referral Volume Growth" description="Comparison of created vs accepted referrals over 6 months">
          <AreaChart data={referralData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAccepted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="created" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorCreated)" />
            <Area type="monotone" dataKey="accepted" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAccepted)" />
          </AreaChart>
        </ChartCard>
      </motion.div>
    </div>
  );
}
