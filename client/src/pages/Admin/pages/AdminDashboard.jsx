import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { ChartCard } from '@/components/common/ChartCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Building, Users, HeartPulse, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const systemLoadData = [
  { time: '00:00', load: 12 }, { time: '04:00', load: 8 },
  { time: '08:00', load: 45 }, { time: '12:00', load: 85 },
  { time: '16:00', load: 72 }, { time: '20:00', load: 55 },
  { time: '24:00', load: 30 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="System Administration" description="Platform overview and global network statistics." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Hospitals" value="124" description="4 onboarding" icon={Building} trend={{ isPositive: true, value: 2 }} />
        <MetricCard title="Registered Doctors" value="2,845" description="1,402 active now" icon={Users} trend={{ isPositive: true, value: 8 }} />
        <MetricCard title="Active Ambulances" value="482" description="12 in maintenance" icon={HeartPulse} trend={{ isPositive: true, value: 1 }} />
        <MetricCard title="System Uptime" value="99.99%" description="Last 30 days" icon={Activity} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <ChartCard title="Global Platform Traffic" description="Concurrent user and API load over 24 hours">
            <AreaChart data={systemLoadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="load" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
            </AreaChart>
          </ChartCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl border border-white/5 bg-slate-950/50 hover:bg-slate-800 transition-colors text-left text-slate-300 font-medium">Approve Pending Hospitals (4)</button>
            <button className="w-full p-4 rounded-xl border border-white/5 bg-slate-950/50 hover:bg-slate-800 transition-colors text-left text-slate-300 font-medium">Review System Logs</button>
            <button className="w-full p-4 rounded-xl border border-white/5 bg-slate-950/50 hover:bg-slate-800 transition-colors text-left text-slate-300 font-medium">Manage API Keys</button>
            <button className="w-full p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 transition-colors text-left text-rose-400 font-medium">Trigger Emergency Broadcast</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
