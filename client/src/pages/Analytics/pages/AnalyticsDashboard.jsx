import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { ChartCard } from '@/components/common/ChartCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Bed, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const weekData = [
  { day: 'Mon', emergencies: 142, referrals: 98 },
  { day: 'Tue', emergencies: 156, referrals: 104 },
  { day: 'Wed', emergencies: 125, referrals: 89 },
  { day: 'Thu', emergencies: 189, referrals: 132 },
  { day: 'Fri', emergencies: 210, referrals: 145 },
  { day: 'Sat', emergencies: 245, referrals: 178 },
  { day: 'Sun', emergencies: 200, referrals: 134 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Executive Overview" description="High-level platform metrics and network-wide performance insights." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Emergencies (7d)" value="1,267" description="↑ 12% vs last week" icon={Activity} trend={{ isPositive: false, value: 12 }} />
        <MetricCard title="Avg Response Time" value="4m 12s" description="Time to ambulance dispatch" icon={Clock} trend={{ isPositive: true, value: 8 }} />
        <MetricCard title="Global ICU Occupancy" value="84%" description="Critical threshold: 90%" icon={Bed} trend={{ isPositive: false, value: 3 }} />
        <MetricCard title="Ambulance Utilization" value="68%" description="Active fleet deployed" icon={Truck} trend={{ isPositive: true, value: 5 }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <ChartCard title="Platform Volume (Last 7 Days)" description="Comparison of total emergencies vs inter-hospital referrals">
            <AreaChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEmergencies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="emergencies" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorEmergencies)" name="Emergencies" />
              <Area type="monotone" dataKey="referrals" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorReferrals)" name="Referrals" />
            </AreaChart>
          </ChartCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Regional Status</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">North District</span>
                <span className="text-rose-400 font-bold">Critical Load</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden"><div className="bg-rose-500 h-full w-[92%]"></div></div>
              <p className="text-xs text-slate-500 mt-2">ICU Capacity at 92% • High Trauma Vol.</p>
            </div>
            
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">South District</span>
                <span className="text-emerald-400 font-bold">Stable</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden"><div className="bg-emerald-500 h-full w-[45%]"></div></div>
              <p className="text-xs text-slate-500 mt-2">ICU Capacity at 45%</p>
            </div>
            
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">Metro Center</span>
                <span className="text-amber-400 font-bold">Elevated</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden"><div className="bg-amber-500 h-full w-[78%]"></div></div>
              <p className="text-xs text-slate-500 mt-2">ICU Capacity at 78% • Moderate delays</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
