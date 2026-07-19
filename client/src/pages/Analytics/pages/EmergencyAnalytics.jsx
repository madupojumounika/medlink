import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { ChartCard } from '@/components/common/ChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const hourlyData = [
  { hour: '00:00', cases: 24 }, { hour: '04:00', cases: 18 },
  { hour: '08:00', cases: 65 }, { hour: '12:00', cases: 89 },
  { hour: '16:00', cases: 112 }, { hour: '20:00', cases: 78 },
];

const typeData = [
  { name: 'Trauma', value: 400 },
  { name: 'Cardiac', value: 300 },
  { name: 'Respiratory', value: 300 },
  { name: 'Neurological', value: 200 },
];
const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

export default function EmergencyAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Emergency Analytics" description="Analysis of incident types, peak hours, and response distribution." />

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <ChartCard title="Peak Emergency Hours" description="Incident volume by time of day (Avg over 30 days)">
            <BarChart data={hourlyData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Incident Types</h3>
            <p className="text-sm text-slate-400 mb-6">Distribution by categorization</p>
          </div>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {typeData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-xs text-slate-300">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
